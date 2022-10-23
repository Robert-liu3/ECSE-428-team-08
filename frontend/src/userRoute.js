import axios from "axios"

const route = axios.create({
    baseURL: "http://localhost:5000"
})

export const getUser = async() => {
    const response = await route.get("/")
    return response.data;
}