import Layout from "@/components/app/Layout";
import InputForm from "@/components/form/inputForm";
import * as Yup from "yup";

// TODO
// Need to create a for that will help with deleting
// Need to create a for that will help with renaming the platform
// The forms that I will be using here is the same form as in the other pieces
const nameSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const SettingsPage = () => {
  return (
    <Layout>
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-extrabold">Settings Page</h1>
        <div>
          <InputForm
            input="name"
            inputValue="Tiago"
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

export default SettingsPage;
