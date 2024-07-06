require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'accessremover',
        description: 'Times out a user',
        options: [
            {
                name: 'user',
                description: 'the user you wish to banish',
                type: ApplicationCommandOptionType.Mentionable,
                required: true,
            },
            {
                name: 'duration',
                description: 'amount of time to timeout',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'reason',
                description: 'reason for timeout',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ]
    },
    {
        name: 'femboyefy',
        description: 'femboy',
        options: [
            {
                name: 'username',
                description: 'the user you wish to banish',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'channel',
                description: 'the channel in which you wish to send a message!',
                type: ApplicationCommandOptionType.Channel,
                required: true,
            },
        ]
    },
    {
        name: 'logfile',
        description: 'sends the current log file (must be director)',
    },

]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('regestering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log('commands regestered sucsessfully');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();