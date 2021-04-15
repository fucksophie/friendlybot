const Discord = require('discord.js');
const Josh = require("@joshdb/core");
const provider = require('@joshdb/sqlite');

const db = new Josh({
    name: 'music',
    provider,
});

module.exports = async (client, message, args) => {
    const voice = client.voice.connections.get(message.guild.id)

    if(voice) {
        const guild = await db.get(message.guild.id);

        message.channel.send(new Discord.MessageEmbed().setTitle(`Stopped playing ${guild.playing.title}`));

        voice.disconnect();
    } else {
        message.channel.send(":x: | I am not in a voice channel.")
    }
}