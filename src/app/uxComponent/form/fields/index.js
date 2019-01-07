import FieldWrapperHOC from '../fieldWrapper';
import FormikFieldWrapperHOC from '../fieldWrapper/FormikFieldWrapper';

import _TextField from './TextField';

export const TextField = FormikFieldWrapperHOC(FieldWrapperHOC(_TextField));
