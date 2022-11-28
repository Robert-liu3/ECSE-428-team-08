import { app } from "../index.js"
import request from "supertest"


// Test to verify if function receives articles without an error
test('Get general news', async() => {
    const response = await request(app).get("/news/getNews?query=books")
    expect(response.statusCode).toBe(200)
    expect(response.body.articles.status).toBe("ok")
})

// Test to verify if function gives error for non existent endpoint
test('Get general news from wrong endpoint', async() => {
    const response = await request(app).get("/news/getNews/WrongEndpoint")
    expect(response.statusCode).toBe(404)

})

// Test to verify changing category does not raise an error
test('Get right category for news articles', async() => {
    const response = await request(app).get("/news/getNews?query=&category=entertainment")
    expect(response.statusCode).toBe(200)
})

// Test to verify sources
test('Get source of news', async() => {
    const response = await request(app).get("/news/getNews?query=&sources=BBC-news")
    expect(response.statusCode).toBe(200)
    expect(response.body.articles.articles[0].source.name).toBe("BBC News")
})