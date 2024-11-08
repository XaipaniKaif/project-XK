import 'dotenv/config'
import { regCommands } from './regCommands.js';
import commands from '../handlers/commands.js';
import {  ActivityOptions, ActivityType, Client, Events, Partials } from "discord.js";


const client = new Client({
    intents: ['DirectMessages', 'GuildMembers', 'MessageContent', 'Guilds', 'GuildVoiceStates', 'GuildEmojisAndStickers', 'GuildPresences', 'GuildMessages', 'DirectMessageTyping', 'GuildScheduledEvents'],
    partials: [Partials.Channel, Partials.User, Partials.Message, Partials.GuildMember, Partials.GuildScheduledEvent]
})



client.on(Events.ClientReady, async () => {
    const actyvity = ():ActivityOptions => { return {name: 'Привет Привет', type: ActivityType.Custom}}
    client.user?.setActivity(actyvity())
    setInterval(() => client.user?.setActivity(actyvity()), 1000 * 60 * 60)
    //await regCommands()
    console.log('Ready!')
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
        await commands.slashHandler(interaction)
    }
    if (interaction.isContextMenuCommand()) {
        await commands.contextHandler(interaction)
    }
})
client.login(process.env.TOKEN)