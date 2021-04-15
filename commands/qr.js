const Discord = require('discord.js');

module.exports = async (client, message, args) => {
    message.channel.send(new Discord.MessageEmbed().setImage("https://normal-api.ml/createqr?text=" + encodeURI(args.join(" "))));
}