import { createAction } from '@reduxjs/toolkit';

export const paymentsAction = createAction<string>('payments/action');
