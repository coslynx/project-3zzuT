const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Channel } = require('../../models/Channel');
const { IgnoreService } = require('../../services/IgnoreService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ignore')
        .setDescription('Ignore specific channels'),

    async execute(interaction) {
        const guildId = interaction.guildId;
        const channelId = interaction.options.getChannel('channel').id;

        try {
            const channel = await Channel.findOne({ guildId: guildId, channelId: channelId });

            if (!channel) {
                await Channel.create({ guildId: guildId, channelId: channelId });
                await interaction.reply(`Channel <#${channelId}> has been added to the ignore list.`);
            } else {
                await channel.remove();
                await interaction.reply(`Channel <#${channelId}> has been removed from the ignore list.`);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('There was an error while processing your request.');
        }
    }
};