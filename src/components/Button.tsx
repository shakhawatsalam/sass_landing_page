"use client";
import { HTMLAttributes, useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  block?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const classes = cva(
  "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg",
  {
    variants: {
      block: {
        true: "w-full",
      },
      variant: {
        primary: "border-gradient",
        secondary: "bg-gray-100 text-gray-950",
        tertiary: "bg-gray-800 text-gray-200",
      },
    },

    defaultVariants: {
      variant: "primary",
      block: false,
    },
  }
);
export const Button = (props: ButtonProps) => {
  const {
    className = "",
    children,
    variant = "primary",
    ...otherProps
  } = props;
  const [isHover, setIsHover] = useState(false);
  const angle = useMotionValue(45);
  const background = useMotionTemplate`linear-gradient(var(--color-gray-950),var(--color-gray-950)) padding-box, conic-gradient(from ${angle}deg,var(--color-violet-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400)) border-box`;
  // [background:linear-gradient(var(--color-gray-950),var(--color-gray-950))_padding-box,conic-gradient(from_45deg,var(--color-violet-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400))_border-box]

  useEffect(() => {
    if (isHover) {
      animate(angle, angle.get() + 360, {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      });
    } else {
      animate(angle, 45, { duration: 0.5 });
    }
  }, [isHover, angle]);
  return (
    <motion.button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={classes({ ...otherProps, variant, className })}
      style={variant === "primary" ? { background: background } : undefined}
    >
      {children}
    </motion.button>
  );
};
