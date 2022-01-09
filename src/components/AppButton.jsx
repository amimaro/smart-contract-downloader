export const AppButton = ({
  type = "button",
  onClick = () => {},
  isSubmitting = false,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      className={`px-4 py-2 min-w-max text-white font-semibold tracking-wider rounded-md shadow-md active:bg-blue-800 active:shadow-none ${
        isSubmitting ? "bg-gray-700 cursor-wait" : "bg-blue-700 cursor-pointer"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
