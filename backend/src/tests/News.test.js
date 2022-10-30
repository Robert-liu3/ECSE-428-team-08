import { app } from "../index.js"
import request from "supertest"

// Test to verify if function receives articles without an error
test('Get stock-related news', async() => {
    const response = await request(app).get("/news")
    expect(response.statusCode).toBe(200)
    expect(response.body.articles.status).toBe("ok")
})


