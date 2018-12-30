const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

app.post('/scrape', async (req, res) => {
  const { links } = req.body
  const titles = await scrapePages(links)
  res.status(200).jsonp(titles)
})

const scrapePages = async links => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  const elements = []
  for (let i = 0; i < links.length; i++) {
    const url = links[i]
    await page.goto(`${url}`, { timeout: 10000 })
    const result = await page.evaluate(() => {
      let el = document.querySelectorAll('h1')[0].innerText
      if (el === '') {
        el = document.querySelectorAll('h1')[1].innerText
      }
      return { title: el }
    })
    elements.push({...result, url})
  }
  browser.close()
  return elements
}

app.listen(8080, () => {
  console.log('Example app listening on port 8080!')
})
