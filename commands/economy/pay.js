const Discord = require('discord.js');
const utils = require("./../../util");
const config = require("./../../config.json");

const db = new utils.Friendlycoin();

module.exports = {
    name: "pay",
    category: "Economy",
    run: async (client, message, args) => {
        args.shift();

        const me = await db.getUser(message.author.id);
        const themm = message.mentions.members.first();
    
        if(isNaN(args[0]) || !args.length || !themm) {
            message.channel.send(":x: | Format: send <user> <amount>")
            return;
        }
    
        const amount = parseInt(args[0]);
        const them = await db.getUser(themm.id);
    
        if(me.coins < amount) {
            message.channel.send(`:x: | You don't have enough ${config.coin}.`)
            return;
        }
    
        them.coins += amount;
        me.coins -= amount;
    
        message.channel.send(new Discord.MessageEmbed().setTitle(`Sent ${config.coin} to ${themm.user.username}`).setDescription(`You have sent ${args[0]}${config.coin} to ${themm.user.username}.`))
    
        db.setUser(themm.id, them);
        db.setUser(message.author.id, me);
    }
}
