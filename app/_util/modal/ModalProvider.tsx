'use client';

import useModalStore from '@/app/_util/modal/modalStore';
import modalMap from '@/app/_util/modal/modalMap';
import { get, set } from 'lodash';

const ModalProvider = () => {
  const modals = useModalStore((state) => state.modals);

  // define opened modal
  const openedModalTuple = Object.entries(modals).find((el) => el[1].isOpen);

  // null if no modal is opened
  if (!openedModalTuple) return null;

  // define opened modal id
  const openedModalId = openedModalTuple[0];

  // define modal props
  const modalProps = get(openedModalTuple, '[1].data', {}) as Record<
    string,
    unknown
  >;

  // attach modal id to props
  set(modalProps, 'modalId', openedModalId);

  // define modal
  const Modal = modalMap[openedModalId];

  return <Modal {...modalProps} />;
};

export default ModalProvider;
