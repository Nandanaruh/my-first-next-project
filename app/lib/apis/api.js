import ky from "ky"

export const api = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URI,
    timeout: 6000,
    retry: 0
});