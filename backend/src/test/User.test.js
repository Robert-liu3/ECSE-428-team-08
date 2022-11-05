import {app} from "../index.js"
import request from "supertest"
import {getUser} from "../controllers/userController.js"

 test('getAllusers',async () => {
         const response = await request(app).get("/getUsers")
         expect(response.statusCode).toBe(200);
})

test('loginUser',async () => {
    const response = await request(app).get("/login/Noah2/123")
    console.log( response.text)
    expect(response.text).toBe("\"Correct\"");
})

test('createUser',async () => {
    const response = await request(app).post("/createUser", {
        firstName: "Robert",
        lastName: "Liu",
        email: " Robert@mail.ca",
        _id: "Glaceliu",
        password: "123455677",
        image: "dog",
        profileBio: "I like to take long walks at night"
    })
    expect(response.statusCode).toBe(200);
})

test('followUser',async () => {
    const response = await request(app).post("/followUser", {
        
    })
    expect(response.statusCode).toBe(200);
})