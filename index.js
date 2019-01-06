const Bot = require('keybase-bot')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const bot = new Bot()

const username = process.env.KB_USERNAME
const paperkey = process.env.KB_PAPERKEY
const port = parseInt(process.env.PORT || "3000")

var init = false;
var initcounter = 0;

function initbot() {
  bot.init(username, paperkey, { verbose: true })
  .then(() => {
    init = true;
    console.log(`Your bot is initialized. It is logged in as ${bot.myInfo().username}`)
  })
  .catch((err) => {
    console.error(err)
    if(initcounter++ > 2){
      process.exit()
    }
    initbot()
  })
}

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/greetings', function (req, res) {
  console.dir(req.body)
  if (typeof (req.body || {}).name !== "undefined" && init) {
    sendmessage(req.body.name)
      .then(() => res.send('message sent!'))
      .catch((err) => res.send(err))
  } else {
    res.send('cannot send the message')
  }
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
  initbot();
});


function sendmessage(sendto = "sschoebibot") {
  const channel = { name: `${sendto},` + bot.myInfo().username, public: false, topic_type: 'chat' }
  const message = {
    body: `Hello ${sendto}! This is ${bot.myInfo().username} saying hello from my device ${
      bot.myInfo().devicename
      }`,
  }
  return bot.chat.send(channel, message).then(() => {
    console.log(`Message sent! to ${sendto}`)
    return Promise.resolve()
  }).catch((err) => {
    console.error(err)
    return Promise.reject()
  })
}
