'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import sendRequest from '@/app/_util/request/request';
import { IRegisterFormValues } from '@/app/auth/_component/RegisterForm';
import { omit, set as lset } from 'lodash';
import { ILoginFormValues } from '@/app/auth/_component/LoginForm';
import { IBaseStore } from '@/app/_util/store/store';
import { produce } from 'immer';

export interface IUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

interface IAuthStore extends IBaseStore {
  user?: IUser;
  authToken: string | null;
  login: (userData: ILoginFormValues) => Promise<void>;
  register: (userData: IRegisterFormValues) => Promise<void>;
  userGetInfo: () => Promise<void>;
}

type TRegisterData = Omit<IRegisterFormValues, 'passwordRepeat'>;

const useAuthStore = create(
  persist<IAuthStore>(
    (set, get) => ({
      loading: {},
      error: {},
      authToken: null,

      // method performs user login
      // sends request for jwt token generation
      login: async (userData) => {
        // send request to create jwt
        const response = await sendRequest<ILoginFormValues, string>({
          path: '/auth/login',
          method: 'POST',
          data: userData,
          parser: 'json',
        });

        // if fail, we should save it
        if (response.fail) {
          set(produce((state) => lset(state, 'login', response)));
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
        const userCreateRes = await sendRequest<TRegisterData, string>({
          path: '/user',
          method: 'POST',
          data,
          parser: 'json',
        });

        // save error if user wasn't created successfully
        if (userCreateRes.fail) {
          set(produce((state) => lset(state, 'error.register', userCreateRes)));

          return;
        }

        // login user
        await get().login(data);
      },

      // method for receiving user info
      userGetInfo: async () => {
        // send request to get user info
        const userInfoRes = await sendRequest<undefined, IUser>({
          path: '/user/current',
          method: 'GET',
          parser: 'json',
        });

        // save error if was received
        if (userInfoRes.fail) {
          set(
            produce((state) => lset(state, 'error.userGetInfo', userInfoRes)),
          );

          return;
        }

        // define user
        const user = userInfoRes.payload as IUser;

        // save user
        set({ user });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
