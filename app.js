// Require the necessary discord.js classes
const { Collection, Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { APP_ID, DISCORD_TOKEN, PUBLIC_KEY } = require('dotenv').config().parsed;
const fs = require('fs');
const path = require("path");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Create an array listing all commands
const commands = []

async function run() {
	fs.readdir(path.resolve(__dirname, './events/'), (error, files) => {
        if(error)
			return console.error(error);

        files.forEach((file) => {
            let events = require(`./events/${file}`);
            let event = file.split('.')[0];
            client.on(event, events.bind(null, client));
        });
        console.log(`${files.length} events loaded`);
    });

    await client.login(DISCORD_TOKEN).catch(error => console.log("Error on connection: " + error));
    await loadCommands();
}

async function loadCommands() {
    let total = 0;
    let directories = fs.readdirSync(path.resolve(__dirname, './commands/'));

    directories.forEach((directory) => {
        let files = fs.readdirSync(path.resolve(__dirname, `./commands/${directory}`));
        files = files.filter(f => f.split('.').pop() === 'js');
        let command;
        files.forEach((file) => {
            command = require(`./commands/${directory}/${file}`);
            loadCommand(command)
            total++;
        });
    });

    const rest = new REST({version: '9'}).setToken(DISCORD_TOKEN);
    await(async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        }
        catch(error) {
		    console.error(error);
		}
    })();
    console.log(`${total} commands loaded!`);
}

function loadCommand(command) {
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

run();
