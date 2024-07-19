import { useContext } from 'react';
import AuthContext, { AuthContextProps } from '../context/AuthProvider';

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context as AuthContextProps;
};

export default useAuth;
