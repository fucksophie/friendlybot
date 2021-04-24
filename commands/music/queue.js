const Discord = require('discord.js');

module.exports = {
    name: "queue",
    category: "Music",
    run: async (client, message, args) => {
        let server = client.music[message.guild.id];
        if(server) {
            const mappedQueue = server.queue.map(e=>e.title)
            
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle(`Queue`)
                    .setDescription(mappedQueue.length ? `\`${mappedQueue.join("\`, \`")}\`` : "Queue is empty.")
            );
        } else {
            message.channel.send(":x: | I am not in a voice channel.")
        }
    }
}