const Discord = require('discord.js');
const utils = require("./../../util");

module.exports = {
    name: "help",
    category: "System",
    run: async (client, message, args) => {
        const commands = (new utils.Utils()).getCommands("./commands");
        const categories = {};

        const HelpEmbed = new Discord.MessageEmbed()
            .setDescription("Bot made by yourfriend for community servers. Contains tons of interesting stuff.")
            .addField("Source code available at", "https://github.com/yourfriendoss/friendlybot", true);

        commands.forEach(command => {
            if(!categories[command.category]) categories[command.category] = [];

            categories[command.category].push(command.name)
        })

        for (const [k, v] of Object.entries(categories)) {
            HelpEmbed.addField(k, v.join(", "), true)
        }
        
        message.channel.send(HelpEmbed);
    }
}