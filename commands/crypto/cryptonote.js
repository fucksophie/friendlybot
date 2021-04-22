const Discord = require('discord.js');
const rp = require('request-promise');

const round = (number, decimalPlaces) => Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)

module.exports = {
    name: "cryptonote",
    category: "Crypto",
    run: async (client, message, args) => {
        const error = ":x: | Format: cryptonote [user]";

        if(!args.length) {
            message.channel.send(error);
            return;
        };
    
        const stats = await rp({
            method: 'GET',
            uri: 'https://cryptonote.social/pool/stats/wow/' + args[0],
            json: true,
            gzip: true
        });
    
        if(!stats.rigs) {
            message.channel.send(error);
            return;
        };
    
        const cryptonoteembed = new Discord.MessageEmbed()
            .setTitle(`${args[0]}'s Cryptonote Status`)
            .addField("working towards ", `${round(stats.rewardProgress, 4)}wow`, true)
            .addField("h/s", `${round(stats.hashRate, 4)}`, true)
            .addField("ever owed", `${round(stats.owed, 4)}wow`, true)
            .addField("paid in total", `${round(stats.paid, 4)}wow`, true)
            .addField("donating", stats.donate < 0.5 ? `${stats.donate} 😢` : `${stats.donate} 🆒`, true)
            .addField("amount of rigs", stats.rigs.length, true);
    
        message.channel.send(cryptonoteembed)
    }
}