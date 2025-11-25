export enum FormFieldType {
  SHORT_TEXT = 'SHORT_TEXT',
  LONG_TEXT = 'LONG_TEXT',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  DROPDOWN = 'DROPDOWN',
  MULTI_SELECT = 'MULTI_SELECT',
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  FILE_UPLOAD = 'FILE_UPLOAD'
}

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
}
