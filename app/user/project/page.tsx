'use client';

import userProjectStore from '@/app/user/project/_store/projectStore';
import { useEffect } from 'react';
import { Button, Container, Title } from '@mantine/core';
import useModalStore from '@/app/_util/modal/modalStore';
import ProjectList from '@/app/user/project/_component/ProjectList';
import { PROJECT_CREATE_MODAL_ID } from '@/app/user/project/_component/ProjectCreateModal';

const { modalOpen } = useModalStore.getState();
const { projectGetByCurrentUser } = userProjectStore.getState();

const Page = () => {
  const projects = userProjectStore((state) => state.projects);

  // request project after render
  useEffect(() => {
    projectGetByCurrentUser();
  }, []);

  return (
    <Container size={'xl'} my={'xl'}>
      <Title order={1} my={'xl'}>
        Projects
      </Title>

      <Button onClick={() => modalOpen({ modalId: PROJECT_CREATE_MODAL_ID })}>
        Add project
      </Button>

      <ProjectList projects={projects} />
    </Container>
  );
};

export default Page;
