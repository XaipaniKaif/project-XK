import 'dotenv/config'
import { Client, Events} from "discord.js";


const client = new Client({
    intents: ['DirectMessages', 'GuildMembers', 'MessageContent', 'Guilds', 'GuildVoiceStates', 'GuildEmojisAndStickers', 'GuildPresences', 'GuildMessages'], 
})



client.on(Events.ClientReady, () => {
    console.log('Ready!')
})
client.login(process.env.TOKEN)