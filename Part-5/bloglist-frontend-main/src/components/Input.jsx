import React from "react";

const Input = ({ label, id, isPassword, onchange, value }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={isPassword ? "password" : "text"}
        name={id}
        value={value}
        autoComplete="current-password"
        onChange={onchange}
      />
    </div>
  );
};

export default Input;
