import { cn } from "cn";
import { ComponentProps } from "react";

function Input({
  className,
  placeholder,
  id,
  name,
  ...props
}: {
  className?: string;
  placeholder?: string;
  id: string;
  name: string;
} & ComponentProps<"input">) {
  return (
    <input
      className={cn(
        className,
        "text-foreground py-2 px-3 border border-foreground focus:border-primary rounded-lg font-semibold",
      )}
      id={id}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
