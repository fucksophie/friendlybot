const Discord = require('discord.js');

module.exports = async (client, message, args) => {
    const voice = client.voice.connections.get(message.guild.id)

    if(voice && !isNaN(args[0])) {
        message.channel.send(new Discord.MessageEmbed().setTitle(`Set volume to ${args[0]}`));
        voice.dispatcher.setVolume(args[0]/100);
    } else {
        message.channel.send(":x: | I am not in a voice channel.")
    }
}