import { useEffect, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '../../icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { userService } from '../../API/user/User.service';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { userStore } from '../../stores/UserStore.atom';
import { User } from '../../@types/User.type';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/TestLogo.png';
import { validationSchema } from './utils/validationSchema.utils';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);

  const user = useRecoilValue<User | undefined>(userStore);

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const login = async (values: any) => {
    try {
      if (registerForm) {
        console.log('icic');
        console.log(values);
        await userService.register(values).then((res) => {
          console.log(res);
        });
      } else {
        await userService.login(values).then((res) => {
          if (res.status === 201) {
            if (res.data?.code === 400) {
              toast.error('Email ou mots de passe invalide');
            } else {
              toast.success('Connexion réussie');
              setAuth(res.data.access_token);
              navigate('/home');
            }
          }
        });
      }
    } catch (e) {
      toast.error('Email ou mots de passe invalide');
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);

  return (
    <div className="min-h-screen min-w-screen flex md:flex-row flex-col-reverse justify-end">
      <div className="flex w-full justify-center items-center">
        <div className="w-full  flex  flex-col justify-center items-center">
          <div className="w-full z-40 flex justify-center py-2">
            <span className="text-4xl font-semibold flex gap-x-3 items-end">
              Moment <img src={Logo} className="w-10 h-12" alt="Logo" />
            </span>
          </div>

          <div className="sm:w-2/3 w-full z-40">
            <div className="py-8 px-4 sm:px-10 rounded-xl">
              {registerForm && (
                <span
                  className="text-sm opacity-50 w-full flex justify-end cursor-pointer"
                  onClick={() => setRegisterForm(false)}>
                  Deja inscrit ?
                </span>
              )}
              <Formik
                enableReinitialize={true}
                onSubmit={login}
                validationSchema={validationSchema}
                initialValues={{
                  email: '',
                  password: '',
                  firstName: '',
                  lastName: ''
                }}>
                <Form className="h-full w-full flex-col space-y-4">
                  {registerForm && (
                    <div className="flex sm:flex-row flex-col gap-x-3">
                      <div className="flex flex-col w-full">
                        <label htmlFor="lastName" className="mb-1 font-lato text-xs opacity-50">
                          Nom
                        </label>
                        <Field
                          id="lastName"
                          name="lastName"
                          placeholder="Pierre"
                          type="text"
                          className="relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                    text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="flex flex-col w-full mobile:w-full">
                        <label htmlFor="firstName" className="mb-1 font-lato text-xs opacity-50">
                          Prénom
                        </label>
                        <Field
                          id="firstName"
                          name="firstName"
                          placeholder="Alex"
                          type="text"
                          className="relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                    text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm rounded"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col w-full">
                    <label htmlFor="email" className="mb-1 font-lato text-xs opacity-50">
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="jane@exemple.com"
                      type="email"
                      className="relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                    text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm rounded"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="password" className="mb-1 font-lato text-xs opacity-50">
                      Mot de passe
                    </label>
                    <div className="flex w-full relative">
                      <Field
                        id="password"
                        name="password"
                        placeholder="Mot de passe"
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded"
                      />
                      <div
                        className="absolute top-[50%] transform -translate-y-1/2  right-2 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                      </div>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <a href="#" className="font-medium hover:opacity-100 opacity-50 text-black">
                        Mot de passe oublié ?
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="h-[49px] group relative w-full items-center flex justify-center py-2 px-4 border
                    border-transparent text-sm font-medium text-white bg-black hover:bg-white hover:text-black transition-all ease-in delay-100 hover:outline rounded">
                      Connexion
                    </button>
                  </div>
                </Form>
              </Formik>
              <div className="pt-5 px-10">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="pt-5 w-full">
                <span className="w-full flex justify-center gap-x-1">
                  Pas encore de compte ?{' '}
                  <span
                    className="text-indigo-700 underline cursor-pointer"
                    onClick={() => setRegisterForm(true)}>
                    Inscrivez-vous
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-7 h-auto">
        <img
          src="https://cdn.shopify.com/s/files/1/0668/7870/1809/files/Codress-Background2.jpg?v=1717063244"
          alt="logo"
          className="md:w-full md:h-full object-cover rounded-xl sm:w-full sm:h-auto"
        />
      </div>
    </div>
  );
};
