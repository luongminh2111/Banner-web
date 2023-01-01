type AxiosRequestHeaders = Record<string, string | number | boolean>;
export default function authHeader(): AxiosRequestHeaders {
  const userStr = localStorage.getItem("user");
  let user: any = null;
  if (userStr)
    user = JSON.parse(userStr);
  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
  } else {
    return {};
  }
}