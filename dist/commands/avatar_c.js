import { EmbedBuilder } from "discord.js";
export default {
    name: 'avatar',
    async execute(interaction) {
        await interaction.deferReply();
        const targetUser = interaction.targetUser;
        const user = await interaction.guild?.members.fetch(targetUser.id);
        const calluser = await interaction.guild?.members.fetch(interaction.user) || interaction.user;
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: calluser.nickname || calluser.displayName, iconURL: calluser.displayAvatarURL() })
            .setTitle(`Аватар: ${user?.nickname || targetUser.displayName}`)
            .setImage(user?.displayAvatarURL({ size: 2048 }) || targetUser.displayAvatarURL({ size: 2048 }));
        await interaction.editReply({ embeds: [embed] });
    }
};
