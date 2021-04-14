const Discord = require('discord.js');

module.exports = (client, message, args) => {
    const helpembed = new Discord.MessageEmbed()
        .addField("Invite", "https://discord.com/api/oauth2/authorize?client_id=830729890889990194&permissions=0&scope=bot", true);

    message.channel.send(":e_mail: | I've sent you a DM.")
    message.author.send(helpembed);
}