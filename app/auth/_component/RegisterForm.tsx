'use client';

import { isEmail, matches, useForm } from '@mantine/form';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import useAuthStore from '@/app/auth/_store/authStore';
import { useRouter } from 'next/navigation';

export interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const { register, userGetInfo } = useAuthStore.getState();

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<IRegisterFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
    validate: {
      name: matches(
        /^[A-Za-z\s]+$/,
        'Name should include only letters and space',
      ),
      email: isEmail('Invalid email address'),
      password: matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password should contain: minimum eight characters, at least one letter, one number and one special character',
      ),
      passwordRepeat: (value: string) => {
        const passwordMatch: boolean = value === form.getValues().password;
        return passwordMatch ? null : 'Passwords not match';
      },
    },
  });

  // form submit
  const handleSubmit = async (values: IRegisterFormValues): Promise<void> => {
    // register user
    await register(values);

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
          label="Name"
          placeholder="Enter your name"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
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
        <PasswordInput
          size={'md'}
          label="Confirm password"
          placeholder="Repeat entered password"
          key={form.key('passwordRepeat')}
          {...form.getInputProps('passwordRepeat')}
        />
        <Button type="submit" mt="sm" size={'md'}>
          Create account
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
