import { api } from "@/app/lib/api";

export const loginUser = async (loginData) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginData?.email,
        password: loginData?.password,
      }),
    });
    const data = await response.json();
    console.log("LOGIN ACTION", data);
    return response.ok ? data : undefined;
  } catch (error) {
    console.error("Login Error", error);
    return undefined;
  }
};
// Register user
export const registerUser = async (formData) => {
  try {
    const response = await api.post("v1/register", { json: formData });
    if (response.ok) {
      return response.json();
    } else {
      return undefined;
    }
  } catch (error) {
    const status = error.response.status;
    const responseBody = await error.response.json();
    if (status && responseBody) {
      if (status === 409) {
        return responseBody;
      } else {
        return undefined;
      }
    }
    return undefined;
  }
};

//Get movies using api.get
export const getMovies = async () => {
  try {
    const response = await api.get("v1/movies", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // Ensures fresh data
    });

    if (response.ok) {
      return response.json();
    } else {
      console.log("error");
    }
  } catch (error) {
    if (error?.response) {
      const { status } = error.response;
      const responseBody = await error?.response?.json();
      if (status === 401) {
        console.log("Unauthorized, check your credentials");
      } else if (status === 500) {
        console.log("Server error, please try again later.");
      } else if (status === 404) {
        console.log(status, responseBody.message);
      }
    } else {
      console.log("Unknown error", error);
    }
    return undefined;
  }
};

// export const getMovies = async () => {
//   try {
//     const response = await api.get("v1/movies", {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       cache: "no-store", // Ensures fresh data
//     });

//     // Check if response is valid JSON before parsing
//     const contentType = response.headers.get("content-type");
//     if (!response.ok) {
//       console.error(`API Error: ${response.status} ${response.statusText}`);
//       return []; // Return an empty array on failure
//     }

//     if (contentType && contentType.includes("application/json")) {
//       return await response.json();
//     } else {
//       console.error("Received non-JSON response:", await response.text());
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     return [];
//   }
// };
