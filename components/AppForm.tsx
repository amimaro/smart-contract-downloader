import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppButton } from "./AppButton";
import { AppSelect } from "./AppSelect";
import { DocumentIcon } from "./icons/DocumentIcon";
import { NETWORKS } from "../common/lib/helpers";

export const AppForm: React.FC<{
  submitForm: (network: string, contractAddres: string) => void;
}> = ({ submitForm }) => {
  return (
    <Formik
      initialValues={{
        network: process.env.APP_NETWORK || "ethmain",
        contractAddress: process.env.APP_CONTRACT_ADDRESS || "",
      }}
      validate={(values) => {
        const errors: { apiKey?: string; contractAddress?: string } = {};
        if (!values.contractAddress) {
          errors.contractAddress = "Contract address is Required";
        } else if (values.contractAddress.length !== 42) {
          errors.contractAddress = "Invalid Contract Address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          await submitForm(values.network, values.contractAddress);
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
                Network
              </label>
              <AppSelect name="network">
                {NETWORKS.map((network) => (
                  <option
                    key={network.id}
                    value={network.id}
                    className="text-center"
                  >
                    {network.label}
                  </option>
                ))}
              </AppSelect>
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
                autoComplete="off"
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
                <span>Find Contract</span>
              </div>
            </AppButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
