'use client';

import { IProject } from '@/app/user/project/_store/projectStore';
import { Box, Flex, Grid, Text } from '@mantine/core';
import ProjectActionMenu from '@/app/user/project/_component/ProjectActionMenu';

interface IProps {
  project: IProject;
}

const ProjectListItem = (props: IProps) => {
  const { id, name, description } = props.project;

  return (
    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
      <Box style={{ border: '1px solid gray' }} p={'md'}>
        <Flex justify={'space-between'}>
          <Text size={'lg'}>{name}</Text>
          <ProjectActionMenu projectId={id} />
        </Flex>
        <Text size={'sm'} mt={'md'}>
          {description}
        </Text>
      </Box>
    </Grid.Col>
  );
};

export default ProjectListItem;
