'use client';

import {
  Button,
  Title,
  Container,
  List,
  Group,
  Text,
  ThemeIcon,
  Image,
  rem,
} from '@mantine/core';
import classes from './page.module.css';
import { IconCheck } from '@tabler/icons-react';

const pros: string[] = [
  'Responsible for teams and personal usage',
  'You workflow depends on how you are willing to organize it - you are creator',
  'No useless instruments, only simple required tools',
  'Effective management using sync notification system',
  'Prioritize your tasks, complete important tasks first',
];

const Page = () => {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>modern</span> task organizer.
          </Title>
          <Text c="dimmed" mt="md">
            Solve your tasks 5x faster - right planning reveals solutions.
          </Text>

          {/* displaying list of pros */}
          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            {pros.map((el, i) => (
              <List.Item key={i}>{el}</List.Item>
            ))}
          </List>

          {/* action buttons, register or login */}
          <Group>
            <Button
              mt={30}
              radius="xl"
              size="md"
              className={classes.control}
              component={'a'}
              href={'/auth/register'}
            >
              Get started
            </Button>
            <Button
              variant={'default'}
              mt={30}
              radius="xl"
              size="md"
              className={classes.control}
              component={'a'}
              href={'/auth/login'}
            >
              Login
            </Button>
          </Group>
        </div>
        <Image src={'/task-deal.png'} className={classes.image} />
      </div>
    </Container>
  );
};

export default Page;
