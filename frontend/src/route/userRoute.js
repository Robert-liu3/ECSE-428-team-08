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


export const login = async (user) => {
    console.log("I am here for login")
    const response = await route.get(`/login/${user.username}/${user.passwoed}`,user)
    console.log(response.data)
    return response.data
}