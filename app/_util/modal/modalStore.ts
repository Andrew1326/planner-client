'use client';

import { create } from 'zustand';
import { produce } from 'immer';
import { set as lset } from 'lodash';

export interface IModals {
  [id: string]: {
    isOpen: boolean;
    data: unknown;
  };
}

interface IModalOpenPayload {
  modalId: string;
  data?: unknown;
}

interface IModalStore {
  modals: IModals;
  modalOpen: (payload: IModalOpenPayload) => void;
  modalClose: (modalId: string) => void;
}

const useModalStore = create<IModalStore>((set) => ({
  modals: {},

  // method opens modal
  modalOpen: ({ modalId, data }) => {
    set(
      produce((state) => {
        lset(state, `modals.${modalId}`, { isOpen: true, data });
      }),
    );
  },

  // method closes modal
  modalClose: (modalId: string) => {
    set(
      produce((state) => {
        lset(state, `modals.${modalId}`, { isOpen: false });
      }),
    );
  },
}));

export default useModalStore;
