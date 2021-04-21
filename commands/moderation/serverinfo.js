const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    category: "Moderation",
    run: async (client, message, args) => {
        
        const serverinfoembed = new Discord.MessageEmbed()
            .setTitle(`Info about **${message.guild.name}**`)
            .addFields([
                { name: "channels", value: message.guild.channels.cache.size, inline: true},
                { name: "emojis", value: message.guild.emojis.cache.size, inline: true},
                { name: "owner", value: message.guild.owner.user.username, inline: true},
                { name: "server created", value: message.guild.createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, ''), inline: true},
                { name: "members", value: message.guild.memberCount, inline: true},
                { name: "roles", value: message.guild.roles.cache.size, inline: true}
            ]);

        message.channel.send(serverinfoembed);
    }
}