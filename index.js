const Discord = require('discord.js');
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
const commands = fs.readdirSync("./commands").map(command => command.split(".")[0]);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    client.user.setActivity(config.prefix + "help" + (fs.existsSync(".git/FETCH_HEAD") ? " | " + fs.readFileSync(".git/FETCH_HEAD").toString().split(" ")[0].split("\t")[0] : "")); // CryptoAggregator
});

client.on('message', async message => {
    const args = message.content.split(" ");

    let command = args.shift().toLowerCase();

    if(command.startsWith(config.prefix)) command = command.substring(config.prefix.length); else return;

    if(commands.includes(command)) {
        const node_command = require("./commands/" + command);

        node_command(client, message, args);
    }
});

client.login(config.token);