'use client';

import RegisterForm from "@/app/auth/_component/RegisterForm";
import {Title} from "@mantine/core";

const RegisterPage = () => {
    return <>
        <Title order={1} mb={'lg'}>Register in seconds and start organizing your tasks</Title>
        <RegisterForm />
    </>
}

export default RegisterPage;