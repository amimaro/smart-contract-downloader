import { useField } from "formik";

interface AppSelectProps {
  options: { value: string; label: string }[];
  [key: string]: any;
}

export const AppSelect = ({ options, ...props }: AppSelectProps) => {
  const [field, meta] = useField(props as any);
  return (
    <div>
      <select
        {...field}
        {...props}
        className={`bg-inherit text-inherit border-2 w-full p-2 rounded-md ${
          meta.error && meta.touched
            ? "ring-2 ring-red-500"
            : "focus:ring-2 ring-blue-500"
        }`}
      >
        {options.map((option: any) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-slate-700 text-inherit"
          >
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 pl-2 pt-2">{meta.error}</div>
      ) : null}
    </div>
  );
};
