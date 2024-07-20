import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email('email invalide').required("L'email est requis"),
  password: Yup.string().required('Le mots de passe est requis'),
  firstName: Yup.string(),
  lastName: Yup.string()
});
