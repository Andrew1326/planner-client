'use client'

import {ReactNode} from "react";
import {Container} from "@mantine/core";

const Layout = ({ children }: { children: ReactNode }) => {
    return <Container px={'md'} size="35rem" my={'10rem'}>
        {children}
    </Container>
}

export default Layout