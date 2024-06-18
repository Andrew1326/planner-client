'use client';

import userProjectStore from '@/app/user/project/_store/projectStore';
import { useEffect } from 'react';

const Page = () => {
  const { projectGetByCurrentUser } = userProjectStore.getState();

  // request project after render
  useEffect(() => {
    projectGetByCurrentUser();
  }, []);

  return <h1>HERE</h1>;
};

export default Page;
