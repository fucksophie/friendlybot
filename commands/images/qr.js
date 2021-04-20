const Discord = require('discord.js');

module.exports = {
    name: "qr",
    category: "Images",
    run: async (client, message, args) => {
        message.channel.send(new Discord.MessageEmbed().setImage("https://normal-api.ml/createqr?text=" + encodeURI(args.join(" "))));
    }
}