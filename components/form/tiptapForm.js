import { Field, Form, Formik } from "formik";
import { Button } from "../ui/button";
import LoadingDots from "../icons/loading-dots";
import TipTap from "./tiptap";

const TipTapForm = ({
  inputValue,
  buttonAction,
  placeholder,
  description,
  validationSchema,
  updateSupabase,
}) => {
  return (
    <Formik
      initialValues={{ description: description }}
      // validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // updateSupabase({ ...values });
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
      }) => {
        return (
          <>
            <Form
            // onSubmit={handleSubmit}
            >
              <TipTap
                description={values.description}
                placeholder={placeholder}
                handleChange={handleChange}
              />

              <Button
                type="submit"
                onSubmit={handleSubmit}
                disabled={isSubmitting && !(dirty && isValid)}
                className="w-32"
                variant="outline"
              >
                {isSubmitting ? (
                  <LoadingDots color="#FF6A95" />
                ) : (
                  <p>{buttonAction}</p>
                )}
              </Button>
            </Form>
            <pre className="mt-10 mb-40 bg-slate-200/20 p-5">
              {JSON.stringify(
                { values, errors, touched, isSubmitting, dirty, isValid },
                null,
                4
              )}
            </pre>
          </>
        );
      }}
    </Formik>
  );
};

export default TipTapForm;
