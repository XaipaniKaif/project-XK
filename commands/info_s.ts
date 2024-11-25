import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";


export default {
    name: 'info',
    async execute(interaction: ChatInputCommandInteraction) {
        const boolean = interaction.options.getString('private', true)
        const ping = Math.round(interaction.client.ws.ping)
        const guilds = (await interaction.client.guilds.fetch()).size
        const users = (interaction.client.users.cache).filter((user) => !user.bot).size

        const embed = new EmbedBuilder()
        .setAuthor({name: interaction.client.user.displayName, iconURL: interaction.client.user.displayAvatarURL()})
        .setColor('Random')
        .setTitle('Моя информация')
        .setDescription(`
        Скорость моих ответов: \`${ping} ms\`
        На скольких я серверах: \`${guilds}\`
        Количество моих пользователей: \`${users}\`
        `)
        const components = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
            .setLabel('Сервер поддержки')
            .setURL('https://discord.gg/5wQSHbap')
            .setStyle(ButtonStyle.Link)
        )
        if (boolean === 'true') {
            await interaction.reply({embeds: [embed], components: [components], ephemeral: true})
        } else {
            await interaction.reply({embeds: [embed], components: [components]})
        }
        
    }
}