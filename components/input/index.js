import React from "react";
// import styles from "./styles.module.scss";
// import PropTypes from "prop-types";
import SelectElement from "./components/select";
import InputElement from "./components/input";
import CheckboxElement from "./components/checkbox";

const Input = props => {
  const { label, type } = props;
  const fieldElements = {
    // select: <SelectElement {...props} />,
    text: <InputElement {...props} />,
    // number: <InputElement {...props} />,
    // checkbox: <CheckboxElement {...props} />
  };
  return (
    // <div className="mb-1 text-left">
    //   <label className="block mb-1">{label}</label>
    //   {fieldElements[type]}
    // </div>
    <input {...props} />
  );
};

export default Input;
