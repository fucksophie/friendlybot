const fs = require("fs");
const path = require("path");
const Josh = require("@joshdb/core");
const Discord = require('discord.js');
const ytas = require('youtube-audio-stream');


class Utils {
    getCommands(dir) {
        const commands = [];
        const command_files = this.getFiles(dir);
    
        command_files.forEach(command_file => {
            commands.push(require(`./${path.join(dir, command_file)}`))
        })

        return commands;
    }

    getFiles(path) {
        const files = []
        for (const file of fs.readdirSync(path)) {
            const fullPath = path + '/' + file
            if(fs.lstatSync(fullPath).isDirectory())
                this.getFiles(fullPath).forEach(x => files.push(file + '/' + x))
            else files.push(file)
        }
        return files
    }
}

class Friendlycoin {
    constructor() {
        this.db = new Josh({
            name: 'friendcoin',
            provider: require('@joshdb/sqlite'),
        });
    }

    get defaultUser() {
        return { coins: 0, inventory: [], speed: 300, mining: false };
    }

    async ensureUser(id) {
        const user = await this.db.get(id);
    
        if(!user) {
            this.setUser(id, this.defaultUser)
        }
    }

    async setUser(id, object) {
        await this.db.set(id, object);    
    }

    async getUser(id) {
        await this.ensureUser(id);
    
        return await this.db.get(id);
    }
}

function play(connection, message, client) {
    let server = client.music[message.guild.id];

    server.dispatcher = connection.play(ytas(server.queue[0].link, {filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25}), {highWaterMark: 1});
    
    connection.voice.setSelfDeaf(true);
    
    server.dispatcher.on("start", async () => {
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(`Playing \`${server.queue[0].title}\``)
                .setDescription(`Video posted by ${server.queue[0].channelTitle}`)
                .setThumbnail(server.queue[0].thumbnails.default.url)
        );
    })
    
    server.dispatcher.on("finish", function () {
        server.queue.shift();

        if (server.queue[0]) {
            play(connection, message, client);
        } else {
            message.channel.send(":x: | Queue is empty.")
            connection.disconnect();
            client.music[message.guild.id] = {queue: []};
        };

    });
}

module.exports = {Friendlycoin, Utils, play}