import { DocumentIcon } from "@heroicons/react/20/solid";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NETWORKS } from "../networks";
import { cn } from "../utils/helpers";
import { useAppContext } from "../utils/useAppContext";
import { AppButton } from "./AppButton";
import { AppSelect } from "./AppSelect";
import ExternalLink from "./ExternalLink";

export default function AppForm() {
  const { fetchContract } = useAppContext();
  return (
    <div className="w-full">
      <Formik
        initialValues={{
          network: process.env.NEXT_PUBLIC_DEFAULT_NETWORK || "ethmain",
          contractAddress: process.env.NEXT_PUBLIC_TEST_CONTRACT_ADDRESS || "",
        }}
        validate={(values) => {
          const errors: { apiKey?: string; contractAddress?: string } = {};
          if (!values.contractAddress) {
            errors.contractAddress = "Contract address is required";
          } else if (values.contractAddress.length !== 42) {
            errors.contractAddress = "Invalid Contract Address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            await fetchContract(values.network, values.contractAddress);
            setSubmitting(false);
            return null;
          })();
        }}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form>
            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full flex-col">
                <ExternalLink href={NETWORKS[values.network].url}>
                  <span>Blockchain explorer</span>
                </ExternalLink>
                <AppSelect
                  name="network"
                  options={Object.entries(NETWORKS).map(
                    ([networkId, networkOption]) => ({
                      value: networkId,
                      label: networkOption.label,
                    })
                  )}
                />
              </div>
              <div className="flex w-full flex-col">
                <label className=" font-semibold" htmlFor="contractAddress">
                  Contract address
                </label>
                <Field
                  id="contractAddress"
                  type="text"
                  name="contractAddress"
                  autoComplete="off"
                  className={cn(
                    "w-full rounded-md border-2 bg-app-800 p-2",
                    errors.contractAddress &&
                      touched.contractAddress &&
                      errors.contractAddress
                      ? "ring-2 ring-error-500"
                      : "outline-action-300"
                  )}
                />
                <ErrorMessage
                  name="contractAddress"
                  component="div"
                  className="pl-2 pt-2 text-sm text-error-500"
                />
              </div>
              <div className="pt-2">
                <AppButton
                  type="submit"
                  loading={isSubmitting}
                  icon={<DocumentIcon width={20} />}
                >
                  Find contract
                </AppButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
