$ docker build -t juandiegombr/puppeteer-news .
$ docker run -p 8080:8080 -d juandiegombr/puppeteer-news
$ heroku create -a puppeteer-news
$ heroku container:push web -a puppeteer-news
$ heroku container:release web -a puppeteer-news