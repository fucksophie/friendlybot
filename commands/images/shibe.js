const Discord = require('discord.js');
const rp = require('request-promise');

module.exports = {
    name: "shibe",
    category: "Images",
    run: async (client, message, args) => {
        const shibe = await rp("http://shibe.online/api/shibes?urls=true&httpsUrls=true", { json: true, gzip: true });
        message.channel.send(new Discord.MessageEmbed().setImage(shibe[0]));
    }
}