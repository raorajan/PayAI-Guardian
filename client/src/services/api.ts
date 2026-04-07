import axios, { AxiosRequestConfig, Method } from "axios";
// @ts-ignore
import { getToken } from "./utils";

type RequestType = "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "MULTIPART" | "MULTIPART_PUT" | "JSON";

const fetchFromApiServer = (
  requestType: RequestType,
  url: string,
  data?: any,
  options?: Record<string, any>,
  Authorization?: string | null
) => {
  return fetchApiWrapper(url, requestType, data, options, Authorization);
};

function getHeaderConfig(
  requestType: RequestType,
  options?: Record<string, any>,
  Authorization?: string | null
): AxiosRequestConfig {
  const token = getToken();

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type":
        requestType === "MULTIPART" || requestType === "MULTIPART_PUT"
          ? "multipart/form-data"
          : "application/json",
      ...(Authorization
        ? { Authorization }
        : token
        ? { Authorization: "Bearer " + token }
        : {}),
      Accept: "*/*",
      ...(requestType === "GET" ? {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      } : {}),
    },
    params: { ...options },
    timeout: 60 * 10 * 1000,
  };
  return config;
}

const fetchApiWrapper = (
  uri: string,
  requestType: RequestType,
  data?: any,
  options: Record<string, any> = {},
  Authorization?: string | null
) => {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  baseUrl = baseUrl.replace(/\/+$/, "");
  const normalizedUri = uri.startsWith("/") ? uri : `/${uri}`;
  const url = `${baseUrl}${normalizedUri}`;
  
  const config = getHeaderConfig(requestType, options, Authorization);
  // Disable credentials since we're using JWT tokens in Authorization header
  config.withCredentials = false;
  
  const methodMap: Record<RequestType, Method> = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
    PATCH: "PATCH",
    MULTIPART: "POST",
    MULTIPART_PUT: "PUT",
    JSON: "GET",
  };

  const method = methodMap[requestType];

  return axios({
    url,
    method,
    data,
    ...config,
  });
};

export default fetchFromApiServer;
