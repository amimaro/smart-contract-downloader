import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, Formik } from "formik";
import { Search } from "lucide-react";
import Link from "next/link";
import { NETWORKS } from "../networks";
import { useAppContext } from "../utils/useAppContext";

export default function AppForm() {
  const { fetchContract } = useAppContext();
  const networkOptions = Object.entries(
    Object.entries(NETWORKS).reduce(
      (acc: Record<number, any[]>, [chainId, networkOption]) => {
        const section = networkOption.section || "Other";
        if (!(section in acc)) {
          acc[section] = [];
        }
        acc[section].push({
          id: chainId,
          ...networkOption,
        });
        return acc;
      },
      {}
    )
  );

  return (
    <Formik
      initialValues={{
        chainId: Number(process.env.NEXT_PUBLIC_DEFAULT_NETWORK) || 1,
        contractAddress: process.env.NEXT_PUBLIC_TEST_CONTRACT_ADDRESS || "",
      }}
      onSubmit={(values) =>
        fetchContract(values.chainId, values.contractAddress)
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
      {({
        isSubmitting,
        values,
        handleChange,
        setFieldValue,
        isValid,
        errors,
      }) => (
        <Form className="flex flex-col items-center gap-4 md:flex-row md:items-end">
          <div className="flex w-full flex-col gap-2 md:w-1/2">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="network"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Network
              </label>
              <Link
                href={NETWORKS[values.chainId].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                site →
              </Link>
            </div>
            <Select
              value={values.chainId.toString()}
              onValueChange={(value) => setFieldValue("chainId", value)}
            >
              <SelectTrigger id="network" className="w-full">
                <SelectValue placeholder="Select a network" />
              </SelectTrigger>
              <SelectContent className="max-h-80 overflow-y-auto">
                {networkOptions.map(([sectionName, networkOpts]: any) => (
                  <SelectGroup key={sectionName}>
                    <SelectLabel>{sectionName}</SelectLabel>
                    {networkOpts.map((networkOption: any) => (
                      <SelectItem
                        key={networkOption.id}
                        value={networkOption.id}
                      >
                        {networkOption.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full flex-1 flex-col gap-2 md:flex-row md:items-end md:gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="contractAddress"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Contract address
              </label>
              <Input
                id="contractAddress"
                name="contractAddress"
                type="text"
                autoComplete="off"
                placeholder="0x..."
                value={values.contractAddress}
                onChange={handleChange}
                className="md:min-w-[280px]"
                aria-invalid={!!errors.contractAddress}
              />
              {errors.contractAddress && (
                <p className="text-sm text-destructive">
                  {errors.contractAddress}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="h-9 w-9 shrink-0"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
