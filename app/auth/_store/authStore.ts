import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import sendRequest from '@/app/util_/request/request';
import { IRegisterFormValues } from '@/app/auth/_component/RegisterForm';
import { get, omit, set as lset } from 'lodash';
import { ILoginFormValues } from '@/app/auth/_component/LoginForm';
import { IAnalytics } from '@/app/util_/analytics/analytics';
import { IBaseStore } from '@/app/util_/store/store';
import { produce } from 'immer';

interface IAuthStore extends IBaseStore {
  user?: Record<string, string>;
  authToken: string | null;
  login: (userData: ILoginFormValues) => Promise<void>;
  register: (userData: IRegisterFormValues) => Promise<void>;
}

type TRegisterData = Omit<IRegisterFormValues, 'passwordRepeat'>;

const useAuthStore = create(persist<IAuthStore>((set) => ({
  loading: {},
  error: {},
  authToken: null,

  // method performs user login
  // sends request for jwt token generation
  login: async (userData) => {
  // send request to create jwt
    const response = await sendRequest<ILoginFormValues, IAnalytics<string | Error>>({
      path: '/auth/login',
      method: 'POST',
      data: userData,
      parser: 'json'
    });

    // if fail, we should save it
    if (response.fail) {
      set(produce(state => lset(state, 'login', response)));
      return;
    }

    const authToken = response.payload as string;

  // save auth token
    set({ authToken });
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
