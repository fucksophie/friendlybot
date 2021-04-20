const Discord = require('discord.js');
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
const utils = require("./util");

const commands = (new utils.Utils()).getCommands("./commands");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    client.user.setActivity(config.prefix + "help" + (fs.existsSync(".git/FETCH_HEAD") ? " | " + fs.readFileSync(".git/FETCH_HEAD").toString().split(" ")[0].split("\t")[0] : "")); // CryptoAggregator
});

client.on('message', async message => {
    const args = message.content.split(" ");

    let command = args.shift().toLowerCase();

    if(command.startsWith(config.prefix)) command = command.substring(config.prefix.length); else return;

    const node_command = commands.find(e => e.name == command);

    if(node_command) {
        node_command.run(client, message, args);
    }
});

client.login(config.token);