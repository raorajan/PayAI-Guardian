import { createAction } from '@reduxjs/toolkit';

export const fraudShieldAction = createAction<string>('fraud-shield/action');
