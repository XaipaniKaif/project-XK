import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
export default {
    titlePlayer: () => {
        return {
            components: new ActionRowBuilder().addComponents(new ButtonBuilder()
                .setCustomId('back')
                .setEmoji('⏮️')
                .setStyle(ButtonStyle.Primary), new ButtonBuilder()
                .setCustomId('pause')
                .setEmoji('⏸️')
                .setStyle(ButtonStyle.Primary), new ButtonBuilder()
                .setCustomId('next')
                .setEmoji('⏭️')
                .setStyle(ButtonStyle.Primary))
        };
    }
};
