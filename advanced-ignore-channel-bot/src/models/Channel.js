const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true,
  },
  serverId: {
    type: String,
    required: true,
  },
  ignored: {
    type: Boolean,
    default: false,
  },
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;