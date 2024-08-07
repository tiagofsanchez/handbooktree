import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const ListingImage = ({ url, width, height }) => {
  const supabase = useSupabaseClient();
  const [imageUrl, setImageUrl] = useState(null);
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

  return (
    <>
      {imageUrl ? (
        <Image
          width={width}
          height={height}
          src={imageUrl}
          alt="listing image"
        />
      ) : (
        <Skeleton className="h-[125px] w-[250px] rounded m-auto mt-3" />
      )}
    </>
  );
};

export default ListingImage;
