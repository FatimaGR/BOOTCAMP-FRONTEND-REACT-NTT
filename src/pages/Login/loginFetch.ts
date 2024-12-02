import { UserCredentials } from "@/domain/interfaces";

export const loginFetch = async (credentials: UserCredentials) => {
  const user = await fetchData("/auth/login", {method: "POST", body: credentials});
  console.log(user);
  return user
}

interface FetchOptions{
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}
// API conection
export async function fetchData<T>(request:string, options: FetchOptions = {}): Promise<T>{
  const response = await fetch("https://dummyjson.com" + request, {
    method: options.method || "GET",
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: options.body ? JSON.stringify(options.body) : null
  });

  if (!response.ok){
    throw new Error('Network response was not ok');
  }

  console.log(response.json());
  return response.json();
};