import * as Yup from 'yup';

export const taskValidationSchemaUtils = Yup.object({
  status: Yup.string().required('Status is required'),
  title: Yup.string().required('Title is required'),
  text: Yup.string().required('Text is required')
});
