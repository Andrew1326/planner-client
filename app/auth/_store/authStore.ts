import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import sendRequest from '@/app/util_/request/request';
import { IRegisterFormValues } from '@/app/auth/_component/RegisterForm';
import { omit } from 'lodash';
import { ILoginFormValues } from '@/app/auth/_component/LoginForm';

interface IAuthStore {
  user?: Record<string, string>;
  accessToken: string | null;
  login: (userData: ILoginFormValues) => Promise<void>;
  register: (userData: IRegisterFormValues) => Promise<void>;
}

type TRegisterData = Omit<IRegisterFormValues, 'passwordRepeat'>;

const useAuthStore = create(persist<IAuthStore>(() => ({
  accessToken: null,

  // method performs user login
  // sends request for jwt token generation
  login: async (userData) => {
  // send request to create jwt
    const response = await sendRequest<ILoginFormValues, unknown>({
      path: '/auth/login',
      method: 'POST',
      data: userData,
      parser: 'json'
    });

    console.log(response)
  },

  // method performs user registration
  // sends request for user creation and then authentication
  register: async (userData) => {
    const data = omit(userData, ['passwordRepeat']) as TRegisterData;

    // send request to create user
    const response = await sendRequest<TRegisterData, unknown>({ path: '/user', method: 'POST', data, parser: 'json' });

    console.log(response)
  },
}), {
  name: 'auth',
  storage: createJSONStorage(() => localStorage)
}))

export default useAuthStore
