'use client';

import { IProject } from '@/app/user/project/_store/projectStore';
import ProjectListItem from '@/app/user/project/_component/ProjectListItem';
import { Grid } from '@mantine/core';

interface IProps {
  projects: IProject[];
}

const ProjectList = ({ projects }: IProps) => {
  return (
    <Grid my={'lg'} gutter={'md'}>
      {projects.map((project) => (
        <ProjectListItem key={project.id} project={project} />
      ))}
    </Grid>
  );
};

export default ProjectList;
