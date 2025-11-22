require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const debugging = process.env.ENABLE_DEBUGGING === false

app.use(bodyParser.json());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.BOT_TOKEN);

app.post('/send-message', async (req, res) => {
  try {
    if (debugging) console.log('Received request body:', req.body);

    const { message, channelId, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Missing message in request body.' });
    }

    const finalUserId = userId || process.env.DEFAULT_USER_ID;

    const finalChannelId = channelId || process.env.DEFAULT_CHANNEL_ID;

    if (!/^\d+$/.test(finalChannelId) || !/^\d+$/.test(finalUserId)) {
      return res.status(400).json({ error: 'Invalid channelId or userId format.' });
    }
    if(debugging){
        console.log('Message:', message);
        console.log('User ID:', finalUserId);
        console.log('Channel ID:', finalChannelId);
    }

    const channel = await client.channels.fetch(finalChannelId);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found.' });
    }

    const messageWithMention = message.replace('<@USER_ID>', `<@${finalUserId}>`);

    if (debugging) console.log(`Sending message: ${messageWithMention}`);

    await channel.send(messageWithMention);

    res.status(200).json({ success: true, message: 'Message sent to Discord!' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
