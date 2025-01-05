import { api } from "../apis/api";

export const loginUser = async (loginData) => {
  //console.log(loginData);
  const response = await fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    body: JSON.stringify({
      email: loginData?.email,
      password: loginData?.password,
    }),
  });
  console.log("LOGIN ACTION", response.json());
};
// Register user
export const registerUser = async (formData) => {
  try {
    const response = await api.post("register", { json: formData });
  } catch (error) {
    console.log("Registration error", error);
  }
};

//Get movies using api.get
export const getMovies = async () => {
  try {
    const response = await api.get("movies", { cache: "no-store" });

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
