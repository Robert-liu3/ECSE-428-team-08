import {app} from "../index.js"
import request from "supertest"
import {getUser} from "../controllers/userController.js"

 test('getAllusers',async () => {
         const response = await request(app).get("/getUsers")
         expect(response.statusCode).toBe(200);
})



  
