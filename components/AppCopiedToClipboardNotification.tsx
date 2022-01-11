import { forwardRef, useImperativeHandle, useState } from "react";

// eslint-disable-next-line react/display-name
export const AppCopiedToClipboardNotification = forwardRef((_props, ref) => {
  const animationIn = "animate__animated animate__fadeInDown";
  const animationOut = "animate__animated animate__fadeOutUp";
  const [animation, setAnimation] = useState("");
  const [copied, setCopied] = useState(false);

  useImperativeHandle(ref, () => ({
    showNotification() {
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
            className={`text-center text-green-700 bg-green-200 rounded-md p-2 tracking-widest w-60 ${animation}`}
          >
            Copied to clipboard!
          </div>
        </div>
      )}
    </>
  );
});
