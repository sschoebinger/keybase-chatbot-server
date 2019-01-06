# Keybase Chat Bot Server

This is a dockerized server version of the [keybase chat bot example](https://github.com/keybase/keybase-bot).
You can define endpoints and if you call them the chat bot will drop someone a message.

# how to start

1. clone from github
2. `npm i`
3. `docker build .`
4. let it run somewhere (heroku for example)

Be sure that the two envs `KB_USERNAME` and `KB_PAPERKEY` are set.