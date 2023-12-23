import { forwardRef, useImperativeHandle, useState } from "react";
import { cn } from "../utils/helpers";

// eslint-disable-next-line react/display-name
export const Notification = forwardRef((_props, ref) => {
  const animationIn = "animate__animated animate__fadeInDown";
  const animationOut = "animate__animated animate__fadeOutUp";
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");
  const [animation, setAnimation] = useState("");
  const [copied, setCopied] = useState(false);

  useImperativeHandle(ref, () => ({
    showNotification({
      message = "Ops, something went wront!",
      type = "success",
    }) {
      setMessage(message);
      setCopied(true);
      setAnimation(animationIn);
      setType(type as "success" | "error");
      setTimeout(
        () => {
          setAnimation(animationOut);
        },
        type === "success" ? 1000 : 2000
      );
    },
  }));

  return (
    <>
      {copied && (
        <div className="fixed right-1/2 top-14 z-50 mx-auto -translate-y-1/2 translate-x-1/2 transform">
          <div
            className={cn(
              "w-72 rounded-md p-2 text-center font-bold tracking-widest ",
              animation,
              "bg-warning-400"
            )}
          >
            {message}
          </div>
        </div>
      )}
    </>
  );
});
