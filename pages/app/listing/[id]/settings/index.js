import Layout from "@/components/app/Layout";
import ListingPageHeader from "@/components/app/listinPageHeader";
import InputForm from "@/components/form/inputForm";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import * as Yup from "yup";

// TODO
// DONE: Need to create a form that will help with renaming the app
// DONE: Connect to the database
// The header of this pages
// Need to create a form that will be used to change the subdomain
// Need to create a form that will help with deleting
// The forms that I will be using here is the same form as in the other pieces

const nameSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const SettingsPage = ({ listingData }) => {
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
          />
        </div>
      </div>
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
    },
  };
};

export default SettingsPage;
