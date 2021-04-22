const Discord = require('discord.js');
const rp = require('request-promise');

module.exports = {
    name: "github",
    category: "Miscellaneous",
    run: async (client, message, args) => {
        const error = ":x: | Format: github [user]";
        
        if(!args.length) {
            message.channel.send(error);
            return;
        };
    
        const account = await rp({
            method: 'GET',
            uri: `https://api.github.com/users/${args.join(" ")}`,
            json: true,
            gzip: true,
            headers: {'user-agent': "friendlybot"}
        });

        if(account.message) {
            message.channel.send(error);
            return;
        }

        const repos = await rp({
            method: 'GET',
            uri: account.repos_url,
            json: true,
            gzip: true,
            headers: {'user-agent': "friendlybot"}
        })

        const githubembed = new Discord.MessageEmbed()
            .setTitle(`${account.login}'s profile`)
            .addFields([
                {name: "repos", value: repos.map(e => e.name).join(", "), inline: true},
                {name: "created at", value: account.created_at.replace(/T/, ' ').replace(/\..+/, ''), inline: true},
                {name: "followers", value: account.followers, inline: true},
                {name: "following", value: account.following, inline: true}           
            ])
            .setThumbnail(account.avatar_url)
        message.channel.send(githubembed)
    }
}