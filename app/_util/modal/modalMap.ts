'use client';

import { FunctionComponent } from 'react';
import ProjectCreateModal, {
  PROJECT_CREATE_MODAL_ID,
} from '@/app/user/project/_component/ProjectCreateModal';
import ProjectUpdateModal, {
  PROJECT_UPDATE_MODAL_ID,
} from '@/app/user/project/_component/ProjectUpdateModal';

interface ModalMap {
  [id: string]: FunctionComponent;
}

const modalMap: ModalMap = {
  [PROJECT_CREATE_MODAL_ID]: ProjectCreateModal,
  [PROJECT_UPDATE_MODAL_ID]: ProjectUpdateModal,
};

export default modalMap;
