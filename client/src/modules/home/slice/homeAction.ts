import fetchFromApiServer from "../../../services/api";

export const getHomeStats = async () => {
  const url = `api/v1/home/stats`;
  return await fetchFromApiServer("GET", url, null, {}, null);
};

export const getFeatures = async () => {
  const url = `api/v1/home/features`;
  return await fetchFromApiServer("GET", url, null, {}, null);
};

export const getTestimonials = async () => {
  const url = `api/v1/home/testimonials`;
  return await fetchFromApiServer("GET", url, null, {}, null);
};

export const sendOnboardingMessage = async (data: any) => {
  const url = `api/v1/ai/onboarding`;
  return await fetchFromApiServer("POST", url, data, {}, null);
};
