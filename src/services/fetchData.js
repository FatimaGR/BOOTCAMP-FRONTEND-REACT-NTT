// API conection
export async function fetchData(request, options = {}){
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

  return response.json();
};
