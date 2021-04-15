const Discord = require('discord.js');

module.exports = async (client, message, args) => {
    let member = message.mentions.members.first();
    
    if(member) {
        if(message.member.hasPermission("KICK_MEMBERS")) {
            try {
                member.kick();

                message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Kicked ${member.user.username}.`));
            } catch {
                message.channel.send(":x: | I do not have permissions to kick!");
            }
        } else {
            message.channel.send(":x: | You don't have permissions to kick.");
        }
    } else {
        message.channel.send(":x: | Mention a member to kick.")
    }
}