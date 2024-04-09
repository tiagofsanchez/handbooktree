import Layout from "@/components/app/Layout";
import ListingPageHeader from "@/components/app/listingPageHeader";
import InputForm from "@/components/form/inputForm";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Settings } from "lucide-react";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";
import * as Yup from "yup";

// TODO
// Need to create a form that will help with deleting
// DONE: The forms that I will be using here is the same form as in the other pages where I will need a form

const nameSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const subdomainSchema = Yup.object().shape({
  subdomain: Yup.string()
    .required("Required")
    .matches(
      /^[a-z0-9-]+$/,
      "Must only contain lowercase letters, numbers, and hyphens"
    ),
});

const SettingsPage = ({ listingData, id }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const refreshData = () => {
    void router.replace(router.asPath, undefined, {
      scroll: false,
    });
  };

  const deleteSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .matches(
        new RegExp(`^${listingData.name}$`, "i"),
        `You need to type '${listingData.name} to delete the listing'`
      ),
  });
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
  async function updateListingSubdomain({ subdomain }) {
    try {
      const updates = {
        id: id,
        subdomain,
        updated_at: new Date().toISOString(),
      };
      let { error } = await supabase
        .from("listings")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
      toast.success("You have update your listing subdomain");
      setTimeout(refreshData(), 2500);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function deleteListing({ name }) {
    try {
      let { error } = await supabase.from("listings").delete().eq("name", name);
      if (error) throw error;
      toast.success("You have deleted your listing");
      setTimeout(() => router.push("/listings"), 3000);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Layout>
      <div className="p-5 ">
        <ListingPageHeader
          listingData={listingData}
          icon={<Settings width={32} />}
          title="Settings"
        />
        <div className="mt-5 grid gap-5">
          <InputForm
            input="name"
            inputValue={listingData.name}
            title="Name"
            description="Redefine the name of your listing"
            placeholder="The name of your app..."
            helpMessage="This will be used for SEO."
            buttonAction="Save changes"
            validationSchema={nameSchema}
            updateSupabase={updateListingName}
          />
          <InputForm
            input="subdomain"
            inputValue={listingData.subdomain}
            title="Subdomain"
            description="Redefine the subdomain of your listing"
            placeholder="The subdomain of your app..."
            helpMessage="Subdomain must only contain lowercase letters, numbers, and hyphens."
            buttonAction="Save changes"
            validationSchema={subdomainSchema}
            updateSupabase={updateListingSubdomain}
          />
          <InputForm
            input="name"
            variant="delete"
            inputValue=""
            title="Delete this listing"
            description="Delete this listing"
            placeholder={`Type ${listingData.name} to delete`}
            helpMessage="Deleting this listing will remove it completely."
            buttonAction="Delete"
            validationSchema={deleteSchema}
            updateSupabase={deleteListing}
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
