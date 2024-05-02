import Layout from "@/components/app/Layout";
import GuidePageHeader from "@/components/app/guidePageHeader";
import InputForm from "@/components/form/inputForm";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Notebook } from "lucide-react";
import * as Yup from "yup";
import { Toaster, toast } from "sonner";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

// TODO
// Delete the guide on the settings

const SettingsPage = ({ guideData, id }) => {
  const supabase = useSupabaseClient(); 
  const router = useRouter()

  const deleteSchema = Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .matches(
        new RegExp(`^${guideData.title}$`, "i"),
        `You need to type "${guideData.title}" to delete the listing'`
      ),
  });


  async function deleteGuide({ title }) {
    try {
      let { error } = await supabase.from("guides").delete().eq("title", title);
      if (error) throw error;
      toast.success("You have deleted your guide");
      setTimeout(() => router.push(`/listing/${guideData.listing_id}`), 3000);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Layout listing_id={guideData.listing_id}>
      <div className="p-5">
        <GuidePageHeader
          title={guideData.title}
          icon={<Notebook width={32} />}
          description="You will be able to delete your guide"
        />
        <div className="mt-5">
          <InputForm
            input="title"
            variant="delete"
            inputValue=""
            title="Delete this guide"
            description="Delete this guide"
            placeholder={`Type "${guideData.title}" to delete`}
            helpMessage="Deleting this listing will remove it completely."
            buttonAction="Delete"
            validationSchema={deleteSchema}
            updateSupabase={deleteGuide}
          />
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const supabase = createPagesServerClient(ctx);

  const { data } = await supabase
    .from("guides")
    .select("id, title,listing_id")
    .eq("id", id);

  return {
    props: {
      guideData: data[0],
      id,
    },
  };
};

export default SettingsPage;
