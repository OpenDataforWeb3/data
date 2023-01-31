import { ComponentProps } from "react";

export type SelectValue = {
  label: string;
  name: string;
};

type SelectProps = ComponentProps<"select"> & {
  values: SelectValue[];
};

export default function Select({
  className = "",
  values = [],
  ...props
}: SelectProps) {
  return (
    <select
      className={[
        "nextra-button nx-transition-all active:nx-opacity-50",
        "nx-bg-primary-700/5 nx-border nx-border-black/5 nx-text-gray-600 hover:nx-text-gray-900 nx-rounded-md nx-p-1.5",
        "dark:nx-bg-primary-300/10 dark:nx-border-white/10 dark:nx-text-gray-400 dark:hover:nx-text-gray-50",
        className,
      ].join(" ")}
      {...props}
    >
      {values.map((x, i) => (
        <option key={i} value={x.name}>
          {x.label}
        </option>
      ))}
    </select>
  );
}
