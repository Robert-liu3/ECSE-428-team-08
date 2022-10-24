import axios from "axios"


const route = axios.create({
    baseURL: "http://localhost:5000"
})

export const getUser = async () => {
    console.log("hi")
    const response = await route.get("/getUsers")
    console.log(response.data);
}