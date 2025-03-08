import { cva } from "class-variance-authority";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary"; 
};

export default function Button({ variant = "primary", ...props }: ButtonProps) {
  return <button {...props} className={buttonVariant({ variant })} />;
}

const buttonVariant = cva(
  "relative leading-none text-white hoverElement bg-black px-4 py-2 hoverElement rounded-full hover:scale-105 duration-200",
  {
    variants: {
      variant: {
        primary:
          "py-3 w-full relative leading-none text-white bg-black px-4 py-2 rounded-full hover:scale-105 duration-200",
        secondary: "",
      },
    },
  }
);
