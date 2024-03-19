const ErrorMessage = ({ errorMessage }) => {
  return (
    <span className=" inline-block  -mt-2  text-red-600 text-sm">
      {errorMessage}
    </span>
  );
};

export default ErrorMessage;
