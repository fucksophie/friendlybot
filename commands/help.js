const Discord = require('discord.js');
const fs = require("fs");

const commands = fs.readdirSync("./commands").map(command => command.split(".")[0]);

module.exports = async (client, message, args) => {
    const HelpEmbed = new Discord.MessageEmbed()
        .setDescription("Bot made by yourfriend for community servers. Contains tons of interesting stuff.")
        .addField("Source code available at", "https://github.com/yourfriendoss/friendlybot", true)
        .addField("Commands", commands.join(", "), true);
    
    message.channel.send(HelpEmbed);
}