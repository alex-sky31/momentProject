import { atom } from 'recoil';
import { User } from '../@types/User.type';

export const userStore = atom<User | undefined>({
  key: 'userStore', // unique ID (with respect to other atoms/selectors)
  default: undefined
});
