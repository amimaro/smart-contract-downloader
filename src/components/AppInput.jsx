export const AppInput = ({
  id,
  className,
  value,
  type,
  label,
  placeholder,
  onChange,
  readOnly,
  disabled,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`border-2 w-full p-2 focus:ring-4 rounded-md ${className}`}
        type={type ?? "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};
