import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
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
      {({ isSubmitting, values, handleChange, isValid }) => (
        <Form className="flex flex-col items-center gap-4 md:flex-row md:items-end">
          <div className="flex w-full flex-col gap-2 md:w-1/2">
            <Link href={NETWORKS[values.network].url} isExternal showAnchorIcon>
              <span className="text-lg font-semibold">Blockchain explorer</span>
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
          </div>
          <Input
            className="md:w-1/2"
            id="contractAddress"
            name="contractAddress"
            type="test"
            autoComplete="off"
            label="Contract address"
            value={values.contractAddress}
            onChange={handleChange}
            isRequired
            endContent={
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="p-2"
                isIconOnly
                isDisabled={!isValid}
              >
                <MagnifyingGlassIcon />
              </Button>
            }
          />
        </Form>
      )}
    </Formik>
  );
}
