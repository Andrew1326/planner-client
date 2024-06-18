'use client';

import { Modal } from '@mantine/core';
import useModalStore from '@/app/_util/modal/modalStore';
import { get } from 'lodash';

const ProjectCreateModal = () => {
  const { modalClose } = useModalStore.getState();
  const isOpen = useModalStore((state) =>
    get(state, 'modals.PROJECT_CREATE.isOpen', false),
  );

  return (
    <Modal opened={isOpen} onClose={() => modalClose('PROJECT_CREATE')}>
      HI there!
    </Modal>
  );
};

export default ProjectCreateModal;
