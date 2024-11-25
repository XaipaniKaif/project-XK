import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";




export default {
    titlePlayer: () => {
        return {
            components: new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                .setCustomId('back')
                .setEmoji('⏮️')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('pause')
                .setEmoji('⏸️')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('next')
                .setEmoji('⏭️')
                .setStyle(ButtonStyle.Primary)
            )
        }
        
    }
}