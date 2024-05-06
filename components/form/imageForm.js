import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast, Toaster } from "sonner";

const ImageForm = ({ url }) => {
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

  console.log({ imageUrl, uploading });

  return (
    <>
      <div>
        {imageUrl ? (
          <p>here will be the image</p>
        ) : (
          <div>
            <Input type="file" id="single" accept="image/*" />
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default ImageForm;
