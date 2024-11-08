import { EmbedBuilder, GuildMember, User, UserContextMenuCommandInteraction } from "discord.js"




export default {
    name: 'avatar',
    async execute(interaction: UserContextMenuCommandInteraction) {
        await interaction.deferReply()
        const targetUser = interaction.targetMember || interaction.targetUser
        const calluser = await interaction.guild?.members.fetch(interaction.user) || interaction.user

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setAuthor({name: (calluser as GuildMember).nickname || calluser.displayName, iconURL: calluser.displayAvatarURL()})
        .setTitle(`Аватар: ${(targetUser as GuildMember).nickname || (targetUser as User).displayName}`)
        .setImage((targetUser as GuildMember).displayAvatarURL({size: 2048}) || (targetUser as User).displayAvatarURL({size: 2048}))

        await interaction.editReply({embeds: [embed]})
    }
}