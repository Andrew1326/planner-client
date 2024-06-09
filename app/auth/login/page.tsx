'use client';

import {Title} from "@mantine/core";
import LoginForm from "@/app/auth/_component/LoginForm";

const LoginPage = () => {
    return <>
        <Title order={1} mb={'lg'}>Welcome back!</Title>
        <LoginForm />
    </>
}

export default LoginPage