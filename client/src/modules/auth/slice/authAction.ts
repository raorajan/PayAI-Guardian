import fetchFromApiServer from "../../../services/api";

export const loginUser = async (data: any) => {
  const url = `api/v1/login`;
  return await fetchFromApiServer("POST", url, data, {}, null);
};

export const registerUser = async (data: any) => {
  const url = `api/v1/register`;
  return await fetchFromApiServer("POST", url, data, {}, null);
};

export const forgetPassword = async (data: any) => {
  const url = `api/v1/forgot-password`;
  return await fetchFromApiServer("POST", url, data, {}, null);
};

export const resetPassword = async ({ token, password }: any) => {
  const url = `api/v1/reset-password`;
  return await fetchFromApiServer("POST", url, { token, newPassword: password }, {}, null);
};

export const emailVerification = async (token: any) => {
  const url = `api/v1/verify?token=${token}`;
  return await fetchFromApiServer("GET", url, null, {}, null);
};

export const resendVerification = async (data: any) => {
  const url = `api/v1/resend-verification`;
  return await fetchFromApiServer("POST", url, data, {}, null);
};
