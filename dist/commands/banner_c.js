import { EmbedBuilder } from "discord.js";
export default {
    name: 'banner',
    async execute(interaction) {
        await interaction.deferReply();
        const targetUser = interaction.targetUser;
        const user = await interaction.guild?.members.fetch(targetUser.id);
        const bannerFetch = await interaction.client.users.fetch(targetUser.id, { force: true });
        const callUser = await interaction.guild?.members.fetch(interaction.user) || interaction.user;
        let embed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: callUser.nickname || callUser.displayName, iconURL: callUser.displayAvatarURL() })
            .setTitle(`Баннер: ${user?.nickname || targetUser.displayName}`);
        if (bannerFetch.banner) {
            embed.setImage(user?.user.bannerURL({ size: 2048 }));
        }
        else {
            embed.setDescription('\*У пользователя нет баннера\*');
        }
        await interaction.editReply({ embeds: [embed] });
    }
};
