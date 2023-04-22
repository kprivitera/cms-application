import React from "react";

const InputField = (props) => {
  console.log('input props', props)
  // const isNumberInput = type === "number";
  return (
            <input { ...props } />
            // {error && touched && (
            //   <span className={styles.errorLabel}>{error}</span>
            // )}
            // {validating && <span>loading</span>}
        );
};

export default InputField;
