import { Field, Form, Formik } from "formik";
import ErrorMessage from "./errorMessage";
import { Button } from "../ui/button";
import LoadingDots from "../icons/loading-dots";

const InputForm = ({
  input,
  inputValue,
  variant,
  title,
  description,
  helpMessage,
  buttonAction,
  placeholder,
  validationSchema,
  updateSupabase,
}) => {
  let formClasses =
    "rounded border border-stone-200 bg-white dark:border-stone-700 dark:bg-black";

  let titleClasses = "text-xl font-bold";

  if (variant === "delete") {
    formClasses = "rounded border bg-white  dark:bg-black border-red-800";
    titleClasses = "text-xl font-bold text-red-800";
  }

  return (
    <Formik
      initialValues={{ [input]: inputValue }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          updateSupabase({ ...values });
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
            <Form onSubmit={handleSubmit} className={formClasses}>
              <div className="grid p-8 gap-4 sm:w-2/3">
                <h2 htmlFor="" className={titleClasses}>
                  {title}
                </h2>
                <label className="text-sm text-stone-500 dark:text-stone-400">
                  {description}
                </label>
                <Field
                  type="text"
                  name={input}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={Object.values(values)[0]}
                  placeholder={placeholder}
                  className="z-2 p-2 flex-1 rounded border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
                />
                {Object.values(errors)[0] && Object.values(touched)[0] ? (
                  <ErrorMessage errorMessage={Object.values(errors)[0]} />
                ) : null}
              </div>

              <div className="flex flex-col items-center justify-center space-y-2 rounded-b border-t border-stone-200 bg-stone-100 p-2 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-8">
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {helpMessage}
                </p>
                <Button
                  type="submit"
                  variant={variant === "delete" ? "destructive" : ""}
                  onSubmit={handleSubmit}
                  disabled={isSubmitting && !(dirty && isValid)}
                  className="w-32"
                >
                  {isSubmitting ? (
                    <LoadingDots color="#FF6A95" />
                  ) : (
                    <p>{buttonAction}</p>
                  )}
                </Button>
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
        );
      }}
    </Formik>
  );
};

export default InputForm;
