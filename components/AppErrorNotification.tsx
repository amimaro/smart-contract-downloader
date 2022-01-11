import { forwardRef, useImperativeHandle, useState } from "react";

// eslint-disable-next-line react/display-name
export const AppErrorNotification = forwardRef((_props, ref) => {
  const animationIn = "animate__animated animate__fadeInDown";
  const animationOut = "animate__animated animate__fadeOutUp";
  const [message, setMessage] = useState("");
  const [animation, setAnimation] = useState("");
  const [copied, setCopied] = useState(false);

  useImperativeHandle(ref, () => ({
    showNotification(message = "Ops, something went wront!") {
      setMessage(message);
      setCopied(true);
      setAnimation(animationIn);
      setTimeout(() => {
        setAnimation(animationOut);
      }, 2000);
    },
  }));

  return (
    <>
      {copied && (
        <div className="fixed top-14 mx-auto right-1/2 transform translate-x-1/2 -translate-y-1/2 z-50">
          <div
            className={`text-center text-red-700 bg-red-200 rounded-md p-2 tracking-widest w-72 ${animation}`}
          >
            {message}
          </div>
        </div>
      )}
    </>
  );
});
