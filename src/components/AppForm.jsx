import {
  exportContractContentsToZip,
  getContractContentList,
  getContractSourceCode,
} from "../lib/helpers";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const AppForm = () => {
  return (
    <Formik
      initialValues={{
        apiKey: process.env.REACT_APP_ETHERSCAN_APIKEY || "",
        contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS || "",
      }}
      validate={(values) => {
        const errors: { apiKey?: string, contractAddress?: string } = {};
        if (!values.apiKey) {
          errors.apiKey = "API key is Required";
        } else if (values.apiKey.length !== 34) {
          errors.apiKey = "Invalid API key";
        }
        if (!values.contractAddress) {
          errors.contractAddress = "Contract address is Required";
        } else if (values.contractAddress.length !== 42) {
          errors.contractAddress = "Invalid Contract Address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          const result = await getContractSourceCode(
            values.apiKey,
            values.contractAddress
          );
          const sourceCodes = result.data.result;
          const contractContents = getContractContentList(sourceCodes);
          exportContractContentsToZip(contractContents, values.contractAddress);
          setSubmitting(false);
        })();
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <div className="flex flex-col gap-4 items-center">
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold" htmlFor="apiKey">
                Etherscan API Key
              </label>
              <Field
                id="apiKey"
                type="text"
                name="apiKey"
                className={`border-2 w-full p-2 rounded-md ${
                  errors.apiKey && touched.apiKey && errors.apiKey
                    ? "ring-2 ring-red-500"
                    : "focus:ring-2 ring-blue-500"
                }`}
              />
              <ErrorMessage
                name="apiKey"
                component="div"
                className="text-xs text-red-500 pl-2"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold" htmlFor="contractAddress">
                Contract Address
              </label>
              <Field
                id="contractAddress"
                type="text"
                name="contractAddress"
                className={`border-2 w-full p-2 rounded-md ${
                  errors.contractAddress &&
                  touched.contractAddress &&
                  errors.contractAddress
                    ? "ring-2 ring-red-500"
                    : "focus:ring-2 ring-blue-500"
                }`}
              />
              <ErrorMessage
                name="contractAddress"
                component="div"
                className="text-xs text-red-500 pl-2"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 min-w-max text-white font-semibold tracking-wider rounded-md shadow-md active:bg-blue-800 active:shadow-none ${
                isSubmitting
                  ? "bg-gray-700 cursor-wait"
                  : "bg-blue-700 cursor-pointer"
              }`}
            >
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>{" "}
                <span>Download Contract</span>
              </div>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
