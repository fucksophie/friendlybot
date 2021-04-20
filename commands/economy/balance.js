const Discord = require('discord.js');
const utils = require("./../../util");
const config = require("./../../config.json");

const db = new utils.Friendlycoin();

module.exports = {
    name: "balance",
    category: "Economy",
    run: async (client, message, args) => {
        const user = await db.getUser(message.author.id);
    
        message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.username}'s profile`).setDescription(`You have ${user.coins}${config.coin}.\nYou are ${user.mining?"":"not"} mining`))    
    }
}