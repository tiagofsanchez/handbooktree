import Layout from "@/components/app/Layout";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import ErrorMessage from "@/components/form/ErrorMessage";
import LoadingDots from "@/components/icons/loading-dots";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

// done: button styling
// done: loading
// done: error message on the form
// and toast for when you receive the insert the information in supabase
// abstract this away from the page into a reusable form component
// connect to full_name on supabase
// connect to email on supabase

const fullNameSchema = Yup.object().shape({
  full_name: Yup.string().required("Required"),
});

const settingsPage = ({ userData }) => {
  console.log(userData)
  return (
    <Layout>
      <div className="p-5 space-y-8">
        <h1 className="text-3xl">The settings page</h1>
        <div>
          <Formik
            initialValues={{
              full_name: "",
            }}
            validationSchema={fullNameSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                //   updateFunction({ ...values });
                setSubmitting(false);
              }, 800);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              dirty,
              isValid,
            }) => (
              <>
                <Form
                  onSubmit={handleSubmit}
                  className=" rounded border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
                >
                  <div className="grid p-8 gap-4 sm:w-2/3">
                    <h2 htmlFor="" className="text-xl font-bold">
                      Name
                    </h2>
                    <label className="text-sm text-stone-500 dark:text-stone-400">
                      Your name for this application
                    </label>
                    <Field
                      type="text"
                      name="full_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.full_name}
                      placeholder="your name ... "
                      className="z-2   p-2 flex-1 rounded border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
                    />
                    {errors.full_name && touched.full_name ? (
                      <ErrorMessage errorMessage={errors.full_name} />
                    ) : null}
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-2 rounded-b border-t border-stone-200 bg-stone-100 p-2 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-8">
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Please use 32 characters maximum.
                    </p>
                    <button
                      type="submit"
                      onSubmit={handleSubmit}
                      disabled={isSubmitting && !(dirty && isValid)}
                      className=" px-2 py-2 w-32 text-white  rounded justify-self-end hover:bg-stone-600 border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
                    >
                      {isSubmitting ? (
                        <LoadingDots color="#FF6A95" />
                      ) : (
                        <p>Save changes</p>
                      )}
                    </button>
                  </div>
                </Form>
                {/* <pre className="mt-10 mb-40 bg-slate-200/20 p-5">
                  {JSON.stringify(
                    { values, errors, touched, isSubmitting, dirty, isValid },
                    null,
                    4
                  )}
                </pre> */}
              </>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};


export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  // const { data: user } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    // .eq("id", user.user.id);

  return {
    props: {
      userData: data || "",
    },
  };
};


export default settingsPage;
