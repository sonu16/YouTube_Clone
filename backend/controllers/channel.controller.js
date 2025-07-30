import Channel from '../models/channel.model.js';

export const createChannel = async (req, res) => {
    const { channelName, description, channelBanner } = req.body;
    if(!channelName) {
      return res.status(400).json({ message: "Channel name is required" });
    }
    try {
      const existingChannel = await Channel.findOne({ channelName, owner: req.user._id });
      if (existingChannel) {
        return res.status(400).json({ message: "Channel already exists" });
      }
      const channel = await Channel.create({
        channelName,
        description,
        channelBanner,
        owner: req.user._id, // Assuming req.user is populated with the authenticated user's info
      });
    res.status(201).json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating channel" });
  }
};

export const getChannelByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const channel = await Channel.findOne({ owner: ownerId }).populate('owner', 'username avatar createdAt');
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.status(200).json(channel);
  } catch (error) {
    console.error("Error fetching channel by owner:", error);
    res.status(500).json({ message: "Error fetching channel by owner", error });
  }
};

export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId).populate('owner', 'username avatar createdAt');
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.status(200).json(channel);
  } catch (error) {
    console.error("Error fetching channel:", error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: "Invalid channel ID format" });
    }   
    res.status(500).json({ message: "Error fetching channel", error });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;
    let channel = await Channel.findById(req.params.channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    // Only allow updates if the user is the owner of the channel
    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this channel" });
    }
    channel.channelName = channelName || channel.channelName;
    channel.description = description || channel.description;
    await channel.save();
    res.status(200).json(channel);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: "Invalid channel ID format" });
    }
    res.status(500).json({ message: "Error updating channel" });
  }
};

export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    // Only allow deletion if the user is the owner of the channel
    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this channel" });
    }
    await channel.deleteOne({ _id: req.params.channelId });
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: "Invalid channel ID format" });
    }
    res.status(500).json({ message: "Error deleting channel" });
  }
};
