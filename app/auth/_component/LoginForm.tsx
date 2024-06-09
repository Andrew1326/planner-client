'use client'

import {useForm} from "@mantine/form";
import {Button, PasswordInput, Stack, TextInput} from "@mantine/core";

interface ILoginFormValues {
    nameOrEmail: string;
    password: string;
}

const LoginForm = () => {
    const form = useForm<ILoginFormValues>({
        mode: 'uncontrolled',
        initialValues: {
            nameOrEmail: '',
            password: ''
        },
    });

    // form submit
    const handleSubmit = (values: ILoginFormValues): void => {
        console.log(values)
    }

    return <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={'md'}>
            <TextInput
                size={'md'}
                label="Name or email"
                placeholder="Enter your name or email address"
                key={form.key('nameOrEmail')}
                {...form.getInputProps('nameOrEmail')}
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
}

export default LoginForm