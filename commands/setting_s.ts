import { ChatInputCommandInteraction } from "discord.js";
import settingTemporaryChannel from "../etc/embeds/embedsTempChannel.js";
import createMusicPlayer from "../modules/VkMusic/createMusicPlayer.js";





export default {
    name: 'setting',
    async execute(interaction: ChatInputCommandInteraction) {
        await createMusicPlayer.createAudioPlayer(interaction, null)
        await interaction.reply({embeds: [settingTemporaryChannel.listParamTempVoiceChannel.embed], components: [settingTemporaryChannel.listParamTempVoiceChannel.component]})
    }
}