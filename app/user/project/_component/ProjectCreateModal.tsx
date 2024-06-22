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
import userProjectStore from '@/app/user/project/_store/projectStore';

interface IProjectCreateFormValues {
  name: string;
  description: string;
}

export const PROJECT_CREATE_MODAL_ID = 'PROJECT_CREATE';

const { projectCreate } = userProjectStore.getState();
const { modalClose } = useModalStore.getState();

const ProjectCreateModal = () => {
  const isOpen = useModalStore((state) =>
    get(state, `modals.${PROJECT_CREATE_MODAL_ID}.isOpen`, false),
  );

  const form = useForm<IProjectCreateFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
    },
  });

  // form submit
  const handleSubmit = async (values: IProjectCreateFormValues) => {
    // close modal
    modalClose(PROJECT_CREATE_MODAL_ID);

    // create project
    await projectCreate(values);
  };

  return (
    <Modal
      title={'Create project'}
      opened={isOpen}
      onClose={() => modalClose(PROJECT_CREATE_MODAL_ID)}
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
              Create
            </Button>
            <Button
              type="button"
              mt="sm"
              size={'md'}
              variant={'default'}
              onClick={() => modalClose(PROJECT_CREATE_MODAL_ID)}
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
