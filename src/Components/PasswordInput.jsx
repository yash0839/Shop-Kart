import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";

// Password box with a show/hide button. Spread React Hook Form's register() into it.
// (In React 19 `ref` is a normal prop, so register's ref works without forwardRef.)
export default function PasswordInput({ id, hasError, ...inputProps }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        className={`form-control pr-11 ${hasError ? "is-invalid" : ""}`}
        {...inputProps}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-red-600"
      >
        {visible ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
      </button>
    </div>
  );
}
