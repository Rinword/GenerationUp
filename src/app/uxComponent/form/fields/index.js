import FieldWrapperHOC from '../fieldWrapper';
import FormikFieldWrapperHOC from '../fieldWrapper/FormikFieldWrapper';

import _TextField from './TextField';
import _IconCellPicker from './IconCellPicker';

export const TextField = FormikFieldWrapperHOC(FieldWrapperHOC(_TextField));
export const IconCellPicker = FormikFieldWrapperHOC(FieldWrapperHOC(_IconCellPicker));
