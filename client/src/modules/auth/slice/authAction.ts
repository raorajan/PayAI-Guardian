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

export const getMe = async () => {
  const url = `api/v1/auth/me`;
  return await fetchFromApiServer("GET", url, null, {}, null);
};

export const logoutUser = async () => {
  const url = `api/v1/logout`;
  return await fetchFromApiServer("POST", url, null, {}, null);
};

export const updateProfile = async (data: any) => {
  const url = `api/v1/auth/profile`;
  return await fetchFromApiServer("PUT", url, data, {}, null);
};

export const uploadAvatar = async (formData: FormData) => {
  const url = `api/v1/auth/avatar`;
  return await fetchFromApiServer("MULTIPART", url, formData, {}, null);
};

export const changePassword = async (data: any) => {
  const url = `api/v1/auth/change-password`;
  return await fetchFromApiServer("POST", url, data, {}, null);
};

export const updateNotificationPreferences = async (data: any) => {
  const url = `api/v1/auth/notifications`;
  return await fetchFromApiServer("PUT", url, data, {}, null);
};
