import FieldWrapperHOC from '../fieldWrapper';
import FormikFieldWrapperHOC from '../fieldWrapper/FormikFieldWrapper';

import _TextField from './TextField';
import _Counter from './Counter';
import _IconCellPicker from './IconCellPicker';

export const TextField = FormikFieldWrapperHOC(FieldWrapperHOC(_TextField));
export const Counter = FormikFieldWrapperHOC(FieldWrapperHOC(_Counter));
export const IconCellPicker = FormikFieldWrapperHOC(FieldWrapperHOC(_IconCellPicker));
