import { createAction } from '@reduxjs/toolkit';

export const chatAction = createAction<string>('chat/action');
