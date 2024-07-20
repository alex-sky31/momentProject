import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userStore } from '../stores/UserStore.atom';
import { userService } from '../API/user/User.service';
import { toast } from 'react-toastify';
import { User } from '../@types/User.type';

export interface AuthContextProps {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  const setUser = useSetRecoilState<User | undefined>(userStore);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await userService.getUserId().then(async (res) => {
          await userService.getUser(res.data.sub).then((result) => setUser(result?.data));
        });
      } catch (error: any) {
        toast.error(`Une erreur d'authentification s'est produite`);
        localStorage.removeItem('auth');
        console.error('Error fetching data:', error);
      }
    };

    if (auth) {
      fetchData();
    }
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
