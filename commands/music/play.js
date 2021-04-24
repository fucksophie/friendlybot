const Discord = require('discord.js');
const config = require("./../../config.json");
const util = require('../../util');

const search = require("util").promisify(require('youtube-search'));

module.exports = {
    name: "play",
    category: "Music",
    run: async (client, message, args) => {
        const videos = await search(args.join(" "), { maxResults: 1, key: config.yt });
        
        if(videos.length === 0) {
            message.channel.send(":x: | Couldn't find any videos with your query.");
            return;
        }

        if (!client.music[message.guild.id]) client.music[message.guild.id] = {queue: []};
        let server = client.music[message.guild.id];

        if(server.queue.length) {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle(`Added \`${videos[0].title}\` to queue`)
                    .setDescription(`Video posted by ${videos[0].channelTitle}`)
                    .setThumbnail(videos[0].thumbnails.default.url)
            );
        }

        server.queue.push(videos[0]);

        if (!message.guild.me.voice.channel) message.member.voice.channel.join().then(function (connection) {
            util.play(connection, message, client);
        });
    }
}