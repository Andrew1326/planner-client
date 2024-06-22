'use client';

import {
  Button,
  Group,
  Modal,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import useModalStore from '@/app/_util/modal/modalStore';
import { get } from 'lodash';
import { useForm } from '@mantine/form';
import userProjectStore, {
  IProject,
} from '@/app/user/project/_store/projectStore';

interface IProjectUpdateFormValues {
  name: string;
  description: string;
}

interface IModalData {
  projectId: string;
  defaultValues: Pick<IProject, 'name' | 'description'>;
}

export const PROJECT_UPDATE_MODAL_ID = 'PROJECT_UPDATE';

const { projectUpdate } = userProjectStore.getState();
const { modalClose } = useModalStore.getState();

const ProjectCreateModal = () => {
  const isOpen = useModalStore((state) =>
    get(state, `modals.${PROJECT_UPDATE_MODAL_ID}.isOpen`, false),
  );

  const modalData = useModalStore((state) =>
    get(state, `modals.${PROJECT_UPDATE_MODAL_ID}.data`, {}),
  ) as IModalData;

  const form = useForm<IProjectUpdateFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: get(modalData, 'defaultValues.name', ''),
      description: get(modalData, 'defaultValues.description', ''),
    },
  });

  // form submit
  const handleSubmit = async (values: IProjectUpdateFormValues) => {
    // close modal
    modalClose(PROJECT_UPDATE_MODAL_ID);

    // create project
    await projectUpdate({ projectId: modalData.projectId, data: values });
  };

  return (
    <Modal
      title={'Create project'}
      opened={isOpen}
      onClose={() => modalClose(PROJECT_UPDATE_MODAL_ID)}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={'md'}>
          <TextInput
            size={'md'}
            label="Name"
            placeholder="Enter project name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Textarea
            size={'md'}
            label="Description"
            placeholder="Enter project description"
            minRows={4}
            autosize
            key={form.key('description')}
            {...form.getInputProps('description')}
          />
          <Group mb={'md'}>
            <Button type="submit" mt="sm" size={'md'}>
              Saves
            </Button>
            <Button
              type="button"
              mt="sm"
              size={'md'}
              variant={'default'}
              onClick={() => modalClose(PROJECT_UPDATE_MODAL_ID)}
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default ProjectCreateModal;
