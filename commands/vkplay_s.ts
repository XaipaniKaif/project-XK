import { ChatInputCommandInteraction, ComponentType } from "discord.js";
import { Options, PythonShell } from "python-shell";
import axios from "axios";
import getTracksVK from "../modules/VkMusic/getTracksVK.js";
import createMusicPlayer from "../modules/VkMusic/createMusicPlayer.js";


export default {
    name: 'vkplay',
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.guild) return;
        await interaction.deferReply({fetchReply: true})
        const search = interaction.options.getString('search', true)
        const param = interaction.options.getString('params', true)
        const count = interaction.options.getInteger('count')
        let get:track[];
        
        if (param === 'user') {
            const getVkUser:string | undefined =  await axios({
                method: 'POST',
                url: `https://api.vk.com/method/users.get?user_ids=${encodeURIComponent(search)}&fields=bdate&access_token=${process.env.VKTOKEN}&v=5.199`
            }).then((response) => response.data.response[0].id).catch((err) => {console.error(err)})
            if (!getVkUser) return await interaction.editReply({content: 'Такого пользователя не существует'});
            get = await getTracksVK.getTracksVKUser(search, param, count, getVkUser)
            
        } else if (param === 'playlist') {
            const {embed, components} = await getTracksVK.getVKPlaylist(search, param, count)

            const reply = await interaction.editReply({embeds: [embed],components: [components]})
            
            const collector = reply.createMessageComponentCollector({time: 60_000, componentType: ComponentType.StringSelect})
            .on('collect', async (iString) => {
                const value = iString.values[0]
                const g = await getTracksVK.getTrackPlaylistVK(value)
                console.log(g)
            })
        }
        
        
    }
}