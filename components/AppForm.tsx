import { Button, Input, Link, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { NETWORKS } from "../networks";
import { useAppContext } from "../utils/useAppContext";

export default function AppForm() {
  const { fetchContract } = useAppContext();
  return (
    <Formik
      initialValues={{
        network: process.env.NEXT_PUBLIC_DEFAULT_NETWORK || "ethmain",
        contractAddress: process.env.NEXT_PUBLIC_TEST_CONTRACT_ADDRESS || "",
      }}
      onSubmit={(values) =>
        fetchContract(values.network, values.contractAddress)
      }
      validate={(values) => {
        const errors: { apiKey?: string; contractAddress?: string } = {};
        if (!values.contractAddress) {
          errors.contractAddress = "Contract address is required";
        } else if (values.contractAddress.length !== 42) {
          errors.contractAddress = "Invalid Contract Address";
        }
        return errors;
      }}
    >
      {({ isSubmitting, errors, touched, values, handleChange, isValid }) => (
        <Form className="flex flex-col gap-4">
          <Link href={NETWORKS[values.network].url} isExternal showAnchorIcon>
            Blockchain explorer
          </Link>
          <Select
            id="network"
            name="network"
            label="Network"
            placeholder="Select a network"
            value={values.network}
            onChange={handleChange}
            defaultSelectedKeys={[values.network]}
          >
            {Object.entries(NETWORKS).map(([networkId, networkOption]) => (
              <SelectItem key={networkId} value={networkId}>
                {networkOption.label}
              </SelectItem>
            ))}
          </Select>
          <Input
            id="contractAddress"
            name="contractAddress"
            type="test"
            autoComplete="off"
            label="Contract address"
            errorMessage={touched.contractAddress && errors.contractAddress}
            value={values.contractAddress}
            onChange={handleChange}
            isRequired
          />
          <Button
            color="primary"
            type="submit"
            isLoading={isSubmitting}
            className="mx-auto max-w-fit"
          >
            Find contract
          </Button>
        </Form>
      )}
    </Formik>
  );
}
