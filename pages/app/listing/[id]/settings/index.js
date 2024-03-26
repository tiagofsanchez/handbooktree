import Layout from "@/components/app/Layout";
import ListingPageHeader from "@/components/app/listinPageHeader";
import InputForm from "@/components/form/inputForm";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";
import * as Yup from "yup";

// TODO
// DONE: Need to create a form that will help with renaming the app
// DONE: Connect to the database
// DONE: The header of this pages
// DONE: Need to create a form that will be used to change the subdomain
// Need to create a form that will help with deleting
// The forms that I will be using here is the same form as in the other pieces

const nameSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const SettingsPage = ({ listingData, id }) => {
  const supabase = useSupabaseClient();
  const router = useRouter()
  const refreshData = () => {
    void router.replace(router.asPath, undefined, {
      scroll: false,
    });
  };

  async function updateListingName({ name }) {
    try {
      const updates = {
        id: id,
        name,
        updated_at: new Date().toISOString(),
      };
      let { error } = await supabase
        .from("listings")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
      toast.success("You have update your listing name");
      setTimeout(refreshData(), 2500);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Layout>
      <div className="p-5 ">
        <ListingPageHeader listingData={listingData} />
        <div className="mt-5">
          <InputForm
            input="name"
            inputValue={listingData.name}
            title="Name"
            description="Redefine the name of your app"
            placeholder="The name your app..."
            helpMessage="This will be used for SEO."
            buttonAction="Save changes"
            validationSchema={nameSchema}
            updateSupabase={updateListingName}
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
    .from("listings")
    .select("name , subdomain")
    .eq("id", id);

  return {
    props: {
      listingData: data[0],
      id,
    },
  };
};

export default SettingsPage;
