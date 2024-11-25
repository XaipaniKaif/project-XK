import 'dotenv/config';
import commands from '../handlers/commands.js';
import { ActivityType, Client, Events, Partials } from "discord.js";
import { GuildVoiceStates } from '../handlers/voice.js';
import { settingVoiceChannel } from '../modules/temporaryChannel/settingVoiceChannel.js';
const client = new Client({
    intents: ['DirectMessages', 'GuildMembers', 'MessageContent', 'Guilds', 'GuildVoiceStates', 'GuildEmojisAndStickers',
        'GuildPresences', 'GuildMessages', 'DirectMessageTyping', 'GuildScheduledEvents', 'GuildModeration'],
    partials: [Partials.Channel, Partials.User, Partials.Message, Partials.GuildMember, Partials.GuildScheduledEvent]
});
client.once(Events.ClientReady, async () => {
    const actyvity = () => { return { name: 'Привет Привет', type: ActivityType.Custom }; };
    client.user?.setActivity(actyvity());
    setInterval(() => client.user?.setActivity(actyvity()), 1000 * 60 * 60);
    //await regCommands()
    console.log('Ready!');
});
client.on(Events.Error, (err) => {
    console.error(err);
});
client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand()) {
        await commands.slashHandler(interaction);
    }
    if (interaction.isContextMenuCommand()) {
        await commands.contextHandler(interaction);
    }
    if (interaction.isStringSelectMenu()) {
        await settingVoiceChannel(interaction);
    }
});
client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
    await GuildVoiceStates(oldState, newState);
});
client.login(process.env.TOKEN);
