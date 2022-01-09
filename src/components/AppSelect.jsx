import { useField } from "formik";

export const AppSelect = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select
        {...field}
        {...props}
        className={`border-2 w-full p-2 rounded-md ${
          meta.error && meta.touched
            ? "ring-2 ring-red-500"
            : "focus:ring-2 ring-blue-500"
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 pl-2 pt-2">{meta.error}</div>
      ) : null}
    </div>
  );
};
