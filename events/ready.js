module.exports = async (client) => {
    console.log(`${client.user.tag} is running with ${client.users.cache.size} users, in ${client.channels.cache.size} channels and ${client.guilds.cache.size} servers.`);
};
