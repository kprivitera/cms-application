import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { INPUT_TYPES } from '../../../constants';

export type InputType = typeof INPUT_TYPES[keyof typeof INPUT_TYPES];

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  type?: InputType;
};

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  type?: InputType;
};

type Option = {
  label: string;
  value: string | boolean | number;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  type?: InputType;
  options?: Option[];
};

export type CombinedProps = InputProps & TextareaProps & SelectProps;
