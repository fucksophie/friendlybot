const Discord = require('discord.js');

module.exports = async (client, message, args) => {
    let member = message.mentions.members.first();
    
    if(member) {
        if(message.member.hasPermission("BAN_MEMBERS")) {
            try {
                member.ban();

                message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Banned ${member.user.username}.`));
            } catch {
                message.channel.send(":x: | I do not have permissions to ban!");
            }
        } else {
            message.channel.send(":x: | You don't have permissions to ban.");
        }
    } else {
        message.channel.send(":x: | Mention a member to ban.")
    }
}