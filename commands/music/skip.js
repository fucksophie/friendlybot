module.exports = {
    name: "skip",
    category: "Music",
    run: async (client, message, args) => {
        let server = client.music[message.guild.id];

        if(server.dispatcher) {
            server.dispatcher.end();
        } else {
            message.channel.send(":x: | I am not in a voice channel.")
        }
    }
}