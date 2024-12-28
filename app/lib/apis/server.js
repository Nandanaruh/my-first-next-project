import { api } from "../apis/api"

export const loginUser = async (loginData) => {
  //console.log(loginData);
  const response = await fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    body: JSON.stringify({
      email: loginData?.email,
      password: loginData?.password,
    })
  });
  console.log("LOGIN ACTION", response.json());
};

// export const getMovies = async () => {
//   try {
//     const response = await api.get("movies");
//     return response;
//   } catch (error) {
//     if (error) {
//       const status = error?.response?.status;
//       const responseBody = await error?.response?.json();
//       if (status === 401) {
//         console.log("Unauthorized, check your credentials");
//       } else if (status === 500) {
//         console.log("Server error, please try again later.");
//       } else if (status === 404) {
//         console.log(status, responseBody.message);
//       }
//     }
//     else {
//         console.log("Unknown error",error);
//       }
//       return undefined;
//   }
// };

//code from chatgpt

export const getMovies = async () => {
  try {
    const response = await api.get("movies"); // Assuming `api.get` sends a fetch-like request
    return response; // Assuming `api.get` already parses JSON responses
  } catch (error) {
    if (error.response) {
      const status = error?.response?.status;
      let responseBody;

      // Check if the response is JSON
      const contentType = error?.response?.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        try {
          responseBody = await error?.response?.json();
        } catch (jsonError) {
          console.log("Failed to parse JSON response");
        }
      } else {
        responseBody = "Non-JSON response received";
      }

      // Handle based on status code
      if (status === 401) {
        console.log("Unauthorized, check your credentials");
      } else if (status === 500) {
        console.log("Server error, please try again later.");
      } else if (status === 404) {
        console.log(status, responseBody);
      } else {
        console.log("HTTP Error", status, responseBody);
      }
    } else {
      console.log("Unknown error:", error);
    }
    return undefined;
  }
};