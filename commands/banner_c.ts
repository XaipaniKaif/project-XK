import { GuildMember, User, UserContextMenuCommandInteraction, EmbedBuilder } from "discord.js";



export default {
    name: 'banner',
    async execute(interaction: UserContextMenuCommandInteraction) {
        await interaction.deferReply()
        const user = interaction.targetMember || interaction.targetUser
        const callUser = await interaction.guild?.members.fetch(interaction.user) || interaction.user
        const fetchUser = await interaction.client.users.fetch((user as User).id, {force: true})
      
        let embed = new EmbedBuilder()
        .setColor('Random')
        .setAuthor({name: (callUser as GuildMember).nickname || callUser.displayName, iconURL: callUser.displayAvatarURL()})
        .setTitle(`Баннер: ${(user as GuildMember).nickname || (user as User).displayName}`)
        if (fetchUser.banner) {
            embed.setImage(fetchUser.bannerURL({size: 2048}) as string)
        } else {
            embed.setDescription('\*У пользователя нет баннера\*')
        }

        await interaction.editReply({embeds: [embed]})
    }
}