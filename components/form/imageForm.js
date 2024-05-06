import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const ImageForm = ({ url, uid }) => {
  const supabase = useSupabaseClient();

  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage
          .from("public/listing_avatar")
          .download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setImageUrl(url);
      } catch (error) {
        toast.error("Error downloading image: ", error);
      }
    }
    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadImage = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = event.target.files[0];
      const filePath = `${uid}-${Math.random()}.${file.name}`;
      let { error: uploadError } = await supabase.storage
        .from("listing_avatar")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      //   onUpload(filePath);
      // I will need to updated the URL on the listings table and this will come HOC
    } catch (uploadError) {
      toast.error("Error downloading image: ", uploadError);
    } finally {
      setUploading(false);
    }
  };

  console.log({ imageUrl, uploading, url, uid });

  return (
    <>
      <div className="space-y-4">
        {imageUrl ? (
          <Image
            width={100}
            height={100}
            src={imageUrl}
            alt="listing image"
            className=""
          />
        ) : (
          <Skeleton className="h-[125px] w-[250px] rounded" />
        )}
        <div>
          <Input
            type="file"
            id="single"
            accept="image/*"
            className="w-100"
            onChange={uploadImage}
            disabled={uploading}
          />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ImageForm;
