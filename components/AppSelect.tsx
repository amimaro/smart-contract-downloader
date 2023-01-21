import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useField } from "formik";
import { Fragment } from "react";
import { cn } from "../utils/helpers";

interface AppSelectProps {
  name: string;
  options: { value: string; label: string }[];
}

export const AppSelect = ({ name, options }: AppSelectProps) => {
  const [field] = useField({ name });
  return (
    <Listbox
      name={name}
      value={field.value}
      onChange={(value: string) => {
        field.onChange({ target: { value, name } });
      }}
    >
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-md border-2 bg-app-800 p-2 text-left text-inherit">
          <span className="block truncate">
            {options.find((option) => option.value === field.value)!.label}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-app-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 max-h-80 w-full overflow-auto rounded-md bg-app-800 py-2 shadow-md">
            {options.map((option: any) => (
              <Listbox.Option
                key={option.value}
                className={({ active }) =>
                  `group relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-app-100 text-app-900" : "text-inherit"
                  }`
                }
                value={option.value}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span
                        className={cn(
                          "absolute inset-y-0 left-0 flex items-center pl-3 group-hover:text-app-900",
                          active ? "text-app-900" : "text-app-50"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
