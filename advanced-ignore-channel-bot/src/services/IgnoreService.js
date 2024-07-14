const axios = require('axios');
const DiscordService = require('./DiscordService');
const Channel = require('../models/Channel');

class IgnoreService {
  constructor() {
    this.ignoredChannels = [];
  }

  async fetchChannel(channelId) {
    try {
      const response = await axios.get(`https://discord.com/api/channels/${channelId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching channel: ${error.message}`);
      return null;
    }
  }

  async addIgnoredChannel(channelId) {
    const channel = await this.fetchChannel(channelId);
    if (channel) {
      const newChannel = new Channel(channel.id, channel.name);
      this.ignoredChannels.push(newChannel);
      return newChannel;
    }
    return null;
  }

  removeIgnoredChannel(channelId) {
    const index = this.ignoredChannels.findIndex((channel) => channel.id === channelId);
    if (index !== -1) {
      this.ignoredChannels.splice(index, 1);
      return true;
    }
    return false;
  }

  toggleIgnoreChannel(channelId) {
    const channel = this.ignoredChannels.find((channel) => channel.id === channelId);
    if (channel) {
      channel.ignored = !channel.ignored;
      return channel;
    }
    return null;
  }

  getIgnoredChannels() {
    return this.ignoredChannels;
  }

  checkIfIgnored(channelId) {
    const channel = this.ignoredChannels.find((channel) => channel.id === channelId);
    return channel ? channel.ignored : false;
  }
}

module.exports = IgnoreService;