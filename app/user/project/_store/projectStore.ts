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

interface IProjectCreatePayload
  extends Pick<IProject, 'name' | 'description'> {}

interface IProjectUpdatePayload {
  projectId: string;
  data: Partial<IProjectCreatePayload>;
}

interface IProjectStore extends IBaseStore {
  projects: IProject[];
  projectGetByCurrentUser: () => Promise<void>;
  projectCreate: (payload: IProjectCreatePayload) => Promise<void>;
  projectUpdate: (payload: IProjectUpdatePayload) => Promise<void>;
  projectRemove: (projectId: string) => Promise<void>;
}

const userProjectStore = create<IProjectStore>((set, get) => ({
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

      return;
    }

    // define projects
    const projects = projectGetRes.payload as IProject[];

    // save projects
    set({ projects });
  },

  // method for project creation
  projectCreate: async (data) => {
    // send request to create project
    const projectCreateRes = await sendRequest<IProjectCreatePayload, string>({
      path: '/project',
      method: 'POST',
      data,
      parser: 'json',
    });

    // save error if was received
    if (projectCreateRes.fail) {
      set(
        produce((state) =>
          lset(state, 'error.projectCreate', projectCreateRes),
        ),
      );

      return;
    }

    // get projects by current user
    await get().projectGetByCurrentUser();
  },

  // method for project modification
  projectUpdate: async ({ projectId, data }) => {
    // send request to update project
    const projectUpdateRes = await sendRequest<
      IProjectUpdatePayload['data'],
      string
    >({
      path: `/project/${projectId}`,
      method: 'PATCH',
      data,
      parser: 'json',
    });

    // save error if was received
    if (projectUpdateRes.fail) {
      set(
        produce((state) =>
          lset(state, 'error.projectUpdate', projectUpdateRes),
        ),
      );

      return;
    }

    // get projects by current user
    await get().projectGetByCurrentUser();
  },

  // method for project deletion
  projectRemove: async (projectId: string) => {
    // send request to remove project
    const projectRemoveRes = await sendRequest<undefined, string>({
      path: `/project/${projectId}`,
      method: 'DELETE',
      parser: 'json',
    });

    // save error if was received
    if (projectRemoveRes.fail) {
      set(
        produce((state) =>
          lset(state, 'error.projectRemove', projectRemoveRes),
        ),
      );

      return;
    }

    // get projects by current user
    await get().projectGetByCurrentUser();
  },
}));

export default userProjectStore;
