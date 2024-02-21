import { CombinedProps, InputProps, SelectProps, TextareaProps } from './types';
import { INPUT_TYPES } from '../../constants';
import Input from './components/input';
import Select from './components/select';
import Textarea from './components/textarea';

const Field: React.FC<CombinedProps> = ({ id, label, type = INPUT_TYPES.INPUT, ...props }) => {
  let inputElement = null;

  switch (type) {
    case INPUT_TYPES.TEXTAREA:
      inputElement = <Textarea id={id} {...(props as TextareaProps)} />;
      break;
    case INPUT_TYPES.SELECT:
      const selectProps = props as SelectProps;
      inputElement = <Select id={id} {...selectProps} />;
      break;
    case INPUT_TYPES.RADIO:
      inputElement = <input type="radio" id={id} {...(props as InputProps)} />;
      break;
    default:
      inputElement = <Input id={id} {...(props as InputProps)} />;
  }

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      {inputElement}
    </>
  );
};

export default Field;
