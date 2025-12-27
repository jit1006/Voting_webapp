"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false);
        const [hasValue, setHasValue] = React.useState(false);

        const handleFocus = () => setIsFocused(true);
        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
        }

        return (
            <div className="relative mb-6">
                <div className="relative">
                    <input
                        type={type}
                        className={cn(
                            "peer w-full px-4 py-3 rounded-xl border-2 bg-white/50 dark:bg-black/20 outline-none transition-all duration-300 placeholder-transparent",
                            error
                                ? "border-red-400 focus:border-red-500 ring-red-200"
                                : "border-gray-200 focus:border-[hsl(var(--primary))] focus:ring-4 focus:ring-[hsl(var(--primary))]/10",
                            className
                        )}
                        placeholder={label} // Placeholder required for peer-placeholder-shown, but hidden via class
                        ref={ref}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        {...props}
                    />
                    <label
                        className={cn(
                            "absolute left-4 transition-all duration-200 pointer-events-none text-gray-500",
                            isFocused || hasValue || props.value
                                ? "-top-2.5 text-xs bg-white dark:bg-slate-900 px-1 text-[hsl(var(--primary))]"
                                : "top-3.5 text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[hsl(var(--primary))]"
                        )}
                    >
                        {label}
                    </label>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className="text-red-500 text-sm mt-1 ml-1"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
