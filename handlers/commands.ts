import fs from 'fs'
import { ChatInputCommandInteraction, ContextMenuCommandInteraction, AutocompleteInteraction } from 'discord.js'


const slashCommands: any = {};
const contexCommands: any = {};
const autocomplateCommands: any = {};

fs.readdirSync('./dist/commands').forEach(async file => {
    if (file.endsWith('_s.js')) {
        const command = (await import(`../commands/${file}`)).default;
        const commandName = command.name;
        slashCommands[commandName] = command;
    }
});

fs.readdirSync('./dist/commands').forEach(async file => {
    if (file.endsWith('_c.js')) {
        const command = (await import(`../commands/${file}`)).default;
        const commandName = command.name;
        contexCommands[commandName] = command;
    }
});

fs.readdirSync('./dist/commands').forEach(async file => {
    if (file.endsWith('a_s.js')) {
        const command = (await import(`../commands/${file}`)).default
        const commandName = command.name
        autocomplateCommands[commandName] = command;
    }
})


export default {
    async slashHandler(interaction: ChatInputCommandInteraction)  {
        const { commandName } = interaction;
        try {
            if (slashCommands[commandName]) {
                await slashCommands[commandName].execute(interaction);
            }
        } catch (error) {
            console.error(error)
        }
    },
    async contextHandler(interaction: ContextMenuCommandInteraction) {
        const { commandName } = interaction;
        try {
            if (contexCommands[commandName]) {
                await contexCommands[commandName].execute(interaction);
            }
        } catch (error) {
            console.error(error)
        }
    },
    async autocomplate(autocomplate: AutocompleteInteraction) {
        const {commandName} = autocomplate;
        try {
            if (autocomplateCommands[commandName]) {
                await autocomplateCommands[commandName].autocomplate(autocomplate);
            }
        } catch (error) {
            console.error(error)
        }
    }
}




