module.exports = {
    name: "w",
    category: "Moderation",
    run: async (client, message, args) => {
        message.react("👍").then(() => { message.react("👎"); })
    }
}