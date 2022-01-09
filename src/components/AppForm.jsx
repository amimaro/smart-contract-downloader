import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppButton } from "./AppButton";
import { DocumentIcon } from "./icons/DocumentIcon";

export const AppForm = ({ submitForm }) => {
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
          await submitForm(values.apiKey, values.contractAddress);
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        })();
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <div className="flex flex-col gap-4 items-center">
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-center" htmlFor="apiKey">
                Etherscan API Key
              </label>
              <Field
                id="apiKey"
                type="text"
                name="apiKey"
                className={`border-2 w-full p-2 rounded-md text-center ${
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
              <label
                className="font-semibold text-center"
                htmlFor="contractAddress"
              >
                Contract Address
              </label>
              <Field
                id="contractAddress"
                type="text"
                name="contractAddress"
                className={`border-2 w-full p-2 rounded-md text-center ${
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
            <AppButton type="submit" isSubmitting={isSubmitting}>
              <div className="flex gap-2">
                <DocumentIcon />
                <span>Fetch Contract</span>
              </div>
            </AppButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
