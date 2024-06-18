'use client';

import userProjectStore from '@/app/user/project/_store/projectStore';
import { useEffect } from 'react';

const Page = () => {
  const { projectGetByCurrentUser } = userProjectStore.getState();

  // request project after render
  useEffect(() => {
    projectGetByCurrentUser();
  }, []);

  return null;
};

export default Page;
