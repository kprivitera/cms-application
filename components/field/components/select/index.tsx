import { map } from 'lodash/fp';

import { SelectProps } from '../../types';

const Select: React.FC<SelectProps> = ({ id, ...props }) => {
  return (
    <>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        id={id}
        {...props}
      >
        {map(
          (option) => (
            <option key={option.value as string | number} value={option.value as string | number}>
              {option.label}
            </option>
          ),
          props.options,
        )}
      </select>
    </>
  );
};

export default Select;
