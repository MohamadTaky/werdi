import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ placeholder, id, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        id={id}
        placeholder={placeholder ?? " "}
        className="peer w-full rounded-md border border-gray-200 placeholder-transparent transition focus:ring-0"
        {...props}
      />
      {placeholder && (
        <label
          className="pointer-events-none absolute right-3 top-2 -translate-y-[18px] text-sm text-gray-500 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:text-blue-500"
          htmlFor={id}
        >
          <div className="absolute bottom-1 left-1/2 -z-10 h-2 w-[110%] -translate-x-1/2 rounded-lg bg-white" />
          {placeholder}
        </label>
      )}
    </div>
  );
}
