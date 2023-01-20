import { cn } from "../common/lib/helpers";

export const AppButton: React.FC<{
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e: any) => void;
  loading?: boolean;
  children: any;
  className?: string;
}> = ({
  type = "button",
  onClick = () => {},
  loading = false,
  children,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={cn(
        className,
        "px-4 py-2 min-w-max text-white font-semibold tracking-wider rounded-md shadow-md",
        loading
          ? "bg-gray-700 cursor-wait"
          : "bg-blue-700 active:bg-blue-800 active:shadow-none"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
