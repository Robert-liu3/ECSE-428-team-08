import { app } from "../index.js"
import request from "supertest"


// Test to verify if function receives articles without an error
test('Get general news', async() => {
    const response = await request(app).get("/news/getNews?query=books")
    expect(response.statusCode).toBe(200)
    expect(response.body.articles.status).toBe("ok")
})

//Test to verify with good endpoint
// Test to verify if function gives error for non existent endpoint
test('Get general news from rightendpoint', async() => {
    const response = await request(app).get("/news/getNews/")
    expect(response.statusCode).toBe(200)

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

//Test to verify another type of source 
test('Get another type source of news', async() => {
    const response = await request(app).get("/news/getNews?query=&sources=Independent")
    expect(response.statusCode).toBe(200)
    
})

//Test to verify wrong language of source
test('Get wrong language of source', async() => {
    const response = await request(app).get("/news/getNews=language=fr")
    expect(response.statusCode).toBe(404)
    
})

//Test to verify endpoint of adding favorite news
test('Adding fav news', async() => {
    const response = await request(app).post("/news/addFavNews")
    expect(response.statusCode).toBe(200)
    
})

//Test to verify endpoint of removing news
test('Removing fav news', async() => {
    const response = await request(app).delete("/news/removeFavNews")
    expect(response.statusCode).toBe(200)
    
})

//Test to verify endpoint of gettingAllArticles
test('Getting all the articles in the database', async() => {
    const response = await request(app).get("/news/getAllArticles")
    expect(response.statusCode).toBe(200)
    
})
//Test to verify endpoint of clearing all articles in the databse
test('Clearing all the articles in the database', async() => {
    const response = await request(app).delete("/news/clearArticles")
    expect(response.statusCode).toBe(200)
    
})




