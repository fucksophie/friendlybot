const Discord = require('discord.js');
const rp = require('request-promise');

module.exports = {
    name: "bird",
    category: "Images",
    run: async (client, message, args) => {
        const bird = await rp("http://shibe.online/api/birds?urls=true&httpsUrls=true", { json: true, gzip: true });
        message.channel.send(new Discord.MessageEmbed().setImage(bird[0]));
    }
}