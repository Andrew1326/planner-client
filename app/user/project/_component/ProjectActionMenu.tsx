'use client';

import { Menu, rem } from '@mantine/core';
import { IconSettings, IconTrash, IconMenu2 } from '@tabler/icons-react';
import userProjectStore from '@/app/user/project/_store/projectStore';
import useModalStore from '@/app/_util/modal/modalStore';
import { PROJECT_UPDATE_MODAL_ID } from '@/app/user/project/_component/ProjectUpdateModal';
import { pick } from 'lodash';

interface IProps {
  projectId: string;
}

const { projectRemove } = userProjectStore.getState();
const { modalOpen } = useModalStore.getState();

const ProjectActionMenu = ({ projectId }: IProps) => {
  const project = userProjectStore((state) =>
    state.projects.find((project) => project.id === projectId),
  );

  return (
    <Menu shadow="md" width={'auto'}>
      <Menu.Target>
        <IconMenu2 />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() =>
            modalOpen({
              modalId: PROJECT_UPDATE_MODAL_ID,
              data: {
                projectId,
                defaultValues: pick(project, 'name', 'description'),
              },
            })
          }
        >
          Edit
        </Menu.Item>

        <Menu.Item
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => projectRemove(projectId)}
        >
          Remove
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProjectActionMenu;
