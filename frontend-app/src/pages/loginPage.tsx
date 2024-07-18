import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '../icons';
import { Formik, Field, Form } from 'formik';
export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const login = async (values: any) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen min-w-screen">
      <img
        src="https://cdn.shopify.com/s/files/1/0668/7870/1809/files/Codress-Background2.jpg?v=1717063244
"
        alt="logo"
        className="w-full h-full object-cover absolute z-0"
      />
      <div className="min-h-screen bg-gray-400 flex flex-col justify-center sm:px-6 lg:px-8 z-40">
        <div className="sm:mx-auto sm:w-full sm:max-w-md w-1/2 z-40">
          {/* eslint-disable-next-line no-undef */}
          {/*
          <img src={require('../../asset/images/agapeeLogo.png')} alt="logo" />
*/}
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md z-40">
          <div className="bg-white py-8 px-4 shadow sm:px-10">
            <Formik
              enableReinitialize={true}
              onSubmit={login}
              initialValues={{
                email: '',
                password: ''
              }}>
              <Form className="h-full w-full flex-col space-y-4">
                <div className="flex flex-col w-full mobile:w-full">
                  <label htmlFor="email" className="mb-1 font-lato text-xs opacity-50">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="jane@exemple.com"
                    type="email"
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
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
                      className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                    />
                    <div
                      className="absolute top-[50%] transform -translate-y-1/2  right-2 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                    </div>
                  </div>
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
                    className="h-[49px] group relative w-full items-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                    Connexion
                  </button>
                </div>
              </Form>
            </Formik>
            <div className="">
              <div className="relative p-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
