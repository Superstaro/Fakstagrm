const express = require("express")
const app = express()

const posts = [...Array(1000000).keys()].map(id => {
  return(
    {
      id: id + 1,
      text: `My favorite number today is ${id + 1}!`,
      photo: `https://picsum.photos/id/${id+ 1 }/300`
    }
  )
})

app.get('/posts', (request, response) => {
  const page    = Number(request.query.page || 1)
  const perPage = 20
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const totalPages = Math.ceil(posts.length / perPage)
  response.json({
    posts: posts.slice(startIndex, endIndex),
    page,
    totalPages
  })
})

app.listen(8080)

console.log("API is up and running....")
