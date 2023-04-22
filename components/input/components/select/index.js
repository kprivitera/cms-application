import _ from "lodash";
import React from "react";
// import { Field } from "react-final-form";

const SelectField = ({ name, placeholder, options }) => {
  return (
    <Field name={name} component="select">
      {({ input }) => {
        return (
          <>
            <select {...input} placeholder={placeholder}>
              {options &&
                _.map(options, option => {
                  return <option value={option.value}>{option.text}</option>;
                })}
            </select>
          </>
        );
      }}
    </Field>
  );
};

export default SelectField;
