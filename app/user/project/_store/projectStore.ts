'use client';

import { IBaseStore } from '@/app/_util/store/store';
import { create } from 'zustand';
import sendRequest from '@/app/_util/request/request';
import { produce } from 'immer';
import { set as lset } from 'lodash';

export interface IProject {
  id: string;
  name: string;
  description: string;
}

interface IProjectStore extends IBaseStore {
  projects: IProject[];
  projectGetByCurrentUser: () => Promise<void>;
}

const userProjectStore = create<IProjectStore>((set) => ({
  loading: {},
  error: {},
  projects: [],

  // method for receiving projects by current user
  projectGetByCurrentUser: async () => {
    // send request to get projects
    const projectGetRes = await sendRequest<undefined, IProject[]>({
      path: '/user/current/project',
      method: 'GET',
      parser: 'json',
    });

    // save error if was received
    if (projectGetRes.fail) {
      set(
        produce((state) =>
          lset(state, 'error.projectGetByCurrentUser', projectGetRes),
        ),
      );
    }

    // define projects
    const projects = projectGetRes.payload as IProject[];

    // save projects
    set({ projects });
  },
}));

export default userProjectStore;
