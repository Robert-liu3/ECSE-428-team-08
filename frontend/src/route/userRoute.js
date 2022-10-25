import axios from "axios"


const route = axios.create({
    baseURL: "http://localhost:5000"
})

export const getUser = async () => {
    console.log("hi")
    const response = await route.get("/getUsers")
    console.log(response.data)
    return response.data
}


export async function loginUser(credentials) {
    console.log("login user")
    console.log(credentials.username)
    const response = await route.get(`/login/${credentials.username}/${credentials.password}`)
    return response.data;
   }