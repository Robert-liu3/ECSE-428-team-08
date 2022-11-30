import { app } from "../index.js";
import request from "supertest";
import {app} from "../index.js"
import request from "supertest"

test("getAllusers", async () => {
  const response = await request(app).get("/getUsers");
  expect(response.statusCode).toBe(200);
});

test("loginUser", async () => {
  const response = await request(app).get("/login/Noah2/123");
  console.log(typeof response.text);
  const result = response.text.split(" ");
  console.log(result[0]);
  expect(result[0]).toBe("Correct");
});

test("createUser", async () => {
  const response = await request(app).post("/createUser", {
    firstName: "Robert",
    lastName: "Liu",
    email: " Robert@mail.ca",
    _id: "Glaceliu",
    password: "123455677",
    image: "dog",
    profileBio: "I like to take long walks at night",
  });
  expect(response.statusCode).toBe(200);
});

test("followUser", async () => {
  const response = await request(app).post("/followUser/Abiola123").send({
    _id: "Noah2",
  });


  expect(response.text).toBe("Already following Noah2");
});

test("followUser", async () => {
  const response = await request(app).post("/followUser/Abiola123").send({
    _id: "Noah00",
  });

  expect(response.text).toBe("user is not found");
});
