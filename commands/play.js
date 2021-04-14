const Discord = require('discord.js');
const Josh = require("@joshdb/core");
const provider = require('@joshdb/sqlite');

const config = require("../config.json");

const ytas = require('youtube-audio-stream');
const util = require("util");

const search = util.promisify(require('youtube-search'));

const db = new Josh({
    name: 'music',
    provider,
});

module.exports = async (client, message, args) => {
    const videos = await search(args.join(" "), { maxResults: 1, key: config.yt });

    if(videos.length === 0) {
        message.channel.send(":x: | Couldn't find any videos with your query.");
        return;
    }
    
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(ytas(videos[0].link, {filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25}), {highWaterMark: 1});
        
        connection.voice.setSelfDeaf(true);

        dispatcher.on("start", async () => {
            await db.set(message.guild.id, {playing: videos[0]});
            
            message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Playing ${videos[0].title}`)
                .setDescription(`Video posted by ${videos[0].channelTitle}`)
                .setImage(videos[0].thumbnails.default.url));
        })
        
        dispatcher.on("finish", async () => {
            await db.delete(message.guild.id);

            message.channel.send(new Discord.MessageEmbed().setTitle(`Stopped playing ${videos[0].title}`));
        })
    } else {
        message.channel.send(":x: | Join a VC.");
    }
}