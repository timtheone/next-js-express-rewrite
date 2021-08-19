// const { createServer } = require('http')
// const { parse } = require('url')
// const next = require('next')

// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// app.prepare().then(() => {
//   createServer((req, res) => {
//     // Be sure to pass `true` as the second argument to `url.parse`.
//     // This tells it to parse the query portion of the URL.
//     const parsedUrl = parse(req.url, true)
//     const { pathname, query } = parsedUrl

//     if (pathname === '/black-friday') {
//       // res.setHeader('x-page-type', 'event')
//       req.headers = {...req.headers, 'x-page-type': 'event'}
//       // app.render(req, res, '/events/:event', query)
//     } else if (pathname === '/computer') {
//       // res.setHeader('x-page-type', 'category')
//       // app.render(req, res, '/category', query)
//     }

//     handle(req, res, parsedUrl)
//   }).listen(3000, (err) => {
//     if (err) throw err
//     console.log('> Ready on http://localhost:3000')
//   })
// })


const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare().then(() => {
  const server = express()

  const cache = {
    "/black-friday": "event",
    "/category": "category"
  }


  server.all('*', (req, res) => {
    console.log(req.path);
    if (cache[req.path]) {
      req.headers['x-page-type'] = cache[req.path]
    }

    // if (cache[req.path] === 'event') {
    
    // }

    // if (cache[req.path] === 'category') {
    //   req.headers['x-page-type'] = 'category'
    // }

    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})