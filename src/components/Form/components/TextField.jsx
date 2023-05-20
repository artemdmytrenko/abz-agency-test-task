import React, { useContext } from "react";
import { FormContext } from "../Form";

const TextField = ({
  type,
  id,
  pattern,
  desc,
  children,
  minLength,
  maxLength,
}) => {
  const { register } = useContext(FormContext);
  const handleFocus = (e) => {
    e.currentTarget.classList.add("touched");
  };
  return (
    <div className="text-field">
      <input
        type={type}
        id={id}
        onFocus={handleFocus}
        aria-describedby={desc}
        {...register(id, {
          required: {
            value: true,
            message: "This field is required",
          },
          pattern,
          minLength,
          maxLength,
        })}
      />
      {children}
    </div>
  );
};

export default TextField;
