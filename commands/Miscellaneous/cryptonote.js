const Discord = require('discord.js');
const rp = require('request-promise');

const round = (number, decimalPlaces) => Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)

module.exports = {
    name: "cryptonote",
    category: "Miscellaneous",
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
            .addFields([
                {name: "working towards ", value: `${round(stats.rewardProgress, 4)}wow`, inline: true},
                {name: "h/s", value: `${round(stats.hashRate, 4)}`, inline: true},
                {name: "ever owed", value: `${round(stats.owed, 4)}wow`, inline: true},
                {name: "paid in total", value: `${round(stats.paid, 4)}wow`, inline: true},
                {name: "donating", value: stats.donate < 0.5 ? `${stats.donate} 😢` : `${stats.donate} 🆒`, inline: true},
                {name: "amount of rigs", value: stats.rigs.length, inline: true}
            ])
    
        message.channel.send(cryptonoteembed)
    }
}