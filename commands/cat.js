const Discord = require('discord.js');
const rp = require('request-promise');

module.exports = async (client, message, args) => {
    const cat = await rp("https://api.thecatapi.com/v1/images/search", { json: true, gzip: true });
    message.channel.send(new Discord.MessageEmbed().setImage(cat[0].url));
}