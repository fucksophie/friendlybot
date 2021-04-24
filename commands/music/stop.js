module.exports = {
    name: "stop",
    category: "Music",
    run: async (client, message, args) => {
        if(message.guild.voice.connection) {
            message.guild.voice.connection.disconnect();
        } else {
            message.channel.send(":x: | I am not in a voice channel.")
        }
    }
}