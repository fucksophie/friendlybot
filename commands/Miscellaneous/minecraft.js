const Discord = require('discord.js');
const rp = require('request-promise');

module.exports = {
    name: "minecraft",
    category: "Miscellaneous",
    run: async (client, message, args) => {
        const error = ":x: | Format: minecraft [ip:port]";
        const serverIP = args[0].split(":");
        let server;

        if(serverIP.length < 2) {
            message.channel.send(error);
            return;
        };
        try {
            server = await rp({
                method: 'GET',
                uri: `https://mcapi.us/server/status?ip=${serverIP[0]}&port=${serverIP[1]}`,
                json: true,
                gzip: true
            });
        } catch {
            message.channel.send(error);
            return;
        }

        if(server.status !== "success") {
            message.channel.send(`${error} (${server.error})`)
            return;
        }

        const minecraftembed = new Discord.MessageEmbed()
            .setTitle(args[0])
            .addFields([
                {name: "online", value: `${server.players.now}/${server.players.max}`, inline: true},
                {name: "server", value: `${server.server.name} (P${server.server.protocol})` , inline: true},
                {name: "motd", value: server.motd.length ? server.motd : "no motd found", inline: true}
            ]);

        message.channel.send(minecraftembed)
    }
}