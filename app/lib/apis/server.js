import { HTTPError } from "ky";
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
} 

export const getMovies = async () => {
    try {
        const response = await api.get("movies");
        return response;
    } catch (error) {
        if (error) {
            const status = error.response.status;
            const responseBody = await error.response.json();
            console.log("HTTPerror", status, responseBody);
            // if (status === 401) {
            //     console.log("Unauthorized, check your credentials.");
            // } else if (status === 500) {
            //     console.log("Server error, please try later.");
            // } else if (status === 404) {
            //     console.log(status, responseBody.message);
            // }
        } else {
            console.log("Unknown error", error);
        }
        return undefined;
    }
};