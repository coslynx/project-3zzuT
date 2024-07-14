const { Client, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ignore') {
    // Logic for ignore command
    try {
      // Implement logic to handle ignore command
    } catch (error) {
      console.error('Error handling ignore command:', error);
      await interaction.reply({ content: 'An error occurred while processing your command.', ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);