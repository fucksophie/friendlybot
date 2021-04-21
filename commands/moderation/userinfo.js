const Discord = require('discord.js');

module.exports = {
    name: "userinfo",
    category: "Moderation",
    run: async (client, message, args) => {
        let person = message.mentions.users.first();

        if(!person) person = message.author;

        const serverinfoembed = new Discord.MessageEmbed()
            .setTitle(`Info about **${person.username}**`)
            .addField("user created", person.createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, ''), true);

        message.channel.send(serverinfoembed);
    }
}