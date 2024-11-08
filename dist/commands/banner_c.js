import { EmbedBuilder } from "discord.js";
export default {
    name: 'banner',
    async execute(interaction) {
        const user = interaction.targetMember || interaction.targetUser;
        const callUser = await interaction.guild?.members.fetch(interaction.user) || interaction.user;
        const fetchUser = await interaction.client.users.fetch(user.id, { force: true });
        let embed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: callUser.nickname || callUser.displayName, iconURL: callUser.displayAvatarURL() })
            .setTitle(`Баннер: ${user.nickname || user.displayName}`);
        if (fetchUser.banner) {
            embed.setImage(fetchUser.bannerURL({ size: 2048 }));
        }
        else {
            embed.setDescription('\*У пользователя нет баннера\*');
        }
        await interaction.reply({ embeds: [embed] });
    }
};
