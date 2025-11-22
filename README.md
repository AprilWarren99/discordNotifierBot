# Discord Notifier Bot

Can be run on its own by configuring a .env file or via docker

You can use a variety of environmental variables to configure it, such as 
BOT_TOKEN=[Your discord bot token]
CLIENT_ID=[Your discord bot client ID]
PORT=3000

ENABLE_DEBUGGING=false

DEFAULT_CHANNEL_ID=[The channel ID you'd like to send messages to]
DEFAULT_USER_ID=[The user ID you wish to ping]

BOT_STATUS=online

ACTIVITY_TYPE=PLAYING
ACTIVITY_NAME=Notifier

Below is an example of a curl command useable to trigger the bot.
curl -X POST http://localhost:3000/send-message \
          -H "Content-Type: application/json" \
          -d '{
      "message": "Cute cat test: https://imgs.search.brave.com/olMrfrYEOekR67E-ofB5OZ5a5ghF1TX45NblgVKFMRw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/ejJsNkJCQ0ZnVFlB/QUFBTS9jdXRlLWNh/dHMtbWVtZXMuZ2lm.jpeg <@USER_ID>"
    }'

## You can also define the channel ID and user ID you wish to notify in the HTTP request itself.

curl -X POST http://localhost:3000/send-message \
          -H "Content-Type: application/json" \
          -d '{
          "userId": [The user ID you wish to ping]
          "cannelId": [The channel ID you'd like to send this message to]
      "message": "Cute cat test: https://imgs.search.brave.com/olMrfrYEOekR67E-ofB5OZ5a5ghF1TX45NblgVKFMRw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/ejJsNkJCQ0ZnVFlB/QUFBTS9jdXRlLWNh/dHMtbWVtZXMuZ2lm.jpeg <@USER_ID>"
    }'
