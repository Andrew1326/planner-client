'use client';

import { useForm } from '@mantine/form';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import useAuthStore from '@/app/auth/_store/authStore';
import { useRouter } from 'next/navigation';

export interface ILoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { login, userGetInfo } = useAuthStore.getState();

  const form = useForm<ILoginFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
  });

  // form submit
  const handleSubmit = async (values: ILoginFormValues) => {
    // login user
    await login(values);

    // define if auth token was generated
    const authToken = useAuthStore.getState().authToken;

    // don't collect user info token doesn't exist
    if (!authToken) return;

    // get user info
    await userGetInfo();

    // redirect to projects page
    router.push('/user/project');
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={'md'}>
        <TextInput
          size={'md'}
          label="Email"
          placeholder="Enter your email address"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          size={'md'}
          label="Password"
          placeholder="Enter your password"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Button type="submit" mt="sm" size={'md'}>
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
