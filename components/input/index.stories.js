import React from "react";
import { storiesOf } from "@storybook/react";
import { Form } from "react-final-form";
import _ from "lodash";

import Input from ".";

const InputElement = () => (
  <Form
    onSubmit={_.noop}
    render={() => (
      <form>
        <Input name="testInput" label="Test input" />
      </form>
    )}
  ></Form>
);

const selectOptions = [
  { text: 'First value', value: 1 },
  { text: 'Second value', value: 2 },
  { text: 'Third value', value: 3 }
];

const SelectElement = () => (
  <Form
    onSubmit={_.noop}
    render={() => (
      <form>
        <Input name="testInput" type="select" label="Test input" options={selectOptions} />
      </form>
    )}
  ></Form>
);

const CheckboxElement = () => (
  <Form
    onSubmit={_.noop}
    render={() => (
      <form>
        <Input name="testInput" type="checkbox" label="Test input" options={selectOptions} />
      </form>
    )}
  ></Form>
);


storiesOf("Input", module)
  .add("Input", () => <InputElement />)
  .add("Select", () => <SelectElement />)
  .add("Checkbox", () => <CheckboxElement />);
