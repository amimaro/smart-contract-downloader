export const AppButton = ({ className, onClick, children }) => {
  return (
    <button
      className={`px-4 py-2 min-w-max text-white font-semibold tracking-wider rounded-md shadow-md active:bg-blue-800 active:shadow-none ${
        className ? className : "bg-blue-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
