'use client';

import { FunctionComponent } from 'react';
import ProjectCreateModal from '@/app/user/project/_modal/ProjectCreateModal';

interface ModalMap {
  [id: string]: FunctionComponent;
}

const modalMap: ModalMap = {
  PROJECT_CREATE: ProjectCreateModal,
};

export default modalMap;
