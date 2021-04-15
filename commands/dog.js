const Discord = require('discord.js');
const rp = require('request-promise');

module.exports = async (client, message, args) => {
    const dog = await rp("https://api.thedogapi.com/v1/images/search", { json: true, gzip: true });
    message.channel.send(new Discord.MessageEmbed().setImage(dog[0].url));
}