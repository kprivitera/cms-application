export enum FriendStatus {
  None = 0,
  Pending = 1,
  Accepted = 2,
  Rejected = 3,
}

export const API_URL = 'http://localhost:4000';

export const DEFAULT_WORD_PAGE = '/dashboard/words/a';

export const ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const INPUT_TYPES = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  RADIO: 'radio',
} as const;
