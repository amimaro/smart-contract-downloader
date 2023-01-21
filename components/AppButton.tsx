import { cn } from "../utils/helpers";

export const AppButton: React.FC<{
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e: any) => void;
  loading?: boolean;
  icon?: any;
  children: any;
}> = ({
  type = "button",
  onClick = () => {},
  loading = false,
  icon,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={cn(
        "bg-action-500 text-action-100",
        "min-w-max rounded-md px-4 py-2 font-semibold tracking-wider shadow-md",
        loading
          ? "cursor-wait opacity-50"
          : "active:opacity-90 active:shadow-none"
      )}
      onClick={onClick}
    >
      <div className={cn("flex")}>
        {icon}
        <span className={cn("pl-2", children?.props?.className)}>
          {children}
        </span>
      </div>
    </button>
  );
};
