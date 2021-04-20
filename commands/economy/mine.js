const Discord = require('discord.js');
const utils = require("./../../util");
const config = require("./../../config.json");

const db = new utils.Friendlycoin();

module.exports = {
    name: "mine",
    category: "Economy",
    run: async (client, message, args) => {
        let totalHashes = 0;

        const user = await db.getUser(message.author.id);
        const speed = user.speed + Math.floor(Math.random() * 100);
        const hashesNeeded = Math.floor(Math.random() * 100);
    
        if(user.mining) {
            message.channel.send(":x: | You are already mining.")
            return;
        }
    
        message.channel.send(new Discord.MessageEmbed().setTitle("Started mining.").setDescription(`You should recive your 1${config.coin} in ${speed * hashesNeeded}s`))
    
        user.mining = true;
    
        const hashes = setInterval(() => {
            if(totalHashes === hashesNeeded) {
                clearInterval(hashes)
    
                message.channel.send(new Discord.MessageEmbed().setTitle(`Mined 1${config.coin}.`).setDescription(`${speed}s/h | ${hashesNeeded}h`))
                
                user.coins += 1;
                user.mining = false;
    
                db.setUser(message.author.id, user);
            }
            totalHashes += 1;
        }, speed)
    
        db.setUser(message.author.id, user);
    }
}