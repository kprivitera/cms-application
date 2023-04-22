import _ from "lodash";
// import { Field } from "react-final-form";
import React from "react";

const CheckboxField = ({ name, options }) => {
  return (
    <>
      {_.map(options, option => {
        const { text, value } = option;
        return (
          <label>
            <Field name={name} component="input" type="checkbox" value={value}>
              {({ input }) => {
                return (
                  <>
                    <input type="checkbox" {...input} />
                    <span>{text}</span>
                  </>
                );
              }}
            </Field>
          </label>
        );
      })}
    </>
  );
};

export default CheckboxField;
