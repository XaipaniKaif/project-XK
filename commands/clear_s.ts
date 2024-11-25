import { ChatInputCommandInteraction, Collection, EmbedBuilder, GuildMember, Message, TextChannel } from "discord.js";




export default {
    name: 'clear',
    async execute(interaction: ChatInputCommandInteraction) {
        const count = interaction.options.getInteger('count')
        const user = interaction.options.getUser('user')
        const time = interaction.options.getInteger('time')
        const reason = interaction.options.getString('reason')

        if (!interaction.channel) return

        if (!count && !time) {
            const embed = new EmbedBuilder()
            .setAuthor({name: interaction.client.user.displayName, iconURL: interaction.client.user.displayAvatarURL()})
            .setTitle('Помощь по команде')
            .setDescription(`
                Для удаления сообщений в канале необходимо задать количество или время, за которое сообщения будут удалены
                Используйте следующие параметры:
                \`/clear --количество <кол-во сообщений>\` - удалить указанное кол-во сообщений
                \`/clear --время <время в минутах>\` - удалить сообщения за указанное время
                \`/clear --количество <кол-во сообщений> --время <время в минутах>\` - удалить сообщения за указанное время и кол-во
                \`/clear --пользователь <упоминание пользователя>\` - удалить сообщения указанного пользователя
                \`/clear --причина <причина>\` - указать причину удаления сообщений
            `)
            return await interaction.reply({embeds: [embed], ephemeral: true})           
        }

        await interaction.deferReply()

        const messagesFetchNoFilter = await interaction.channel.messages.fetch({limit: 100, before: interaction.id})
        
  
        
        let filterMessage: Collection<string, Message<boolean>> | Message<boolean>[] = [];

        const timeRangeMessage = time ? time * 60_000 : null;

        filterMessage = messagesFetchNoFilter.filter((message) => {
            const withinTimeRange = timeRangeMessage ? (Date.now() - message.createdTimestamp) <= timeRangeMessage : true;
            const isUserMatch = user ? message.author.id === user.id : true;
            return withinTimeRange && isUserMatch;
        });

        if (count) {
            filterMessage = filterMessage.first(count);
        }


        const result = await (interaction.channel as TextChannel).bulkDelete(filterMessage, true)
        const callUser = await interaction.guild?.members.fetch(interaction.user) as GuildMember

        const targetUser = user && `<@${user?.id}>`
        const noReason = !reason ? '\`Не указана\`' : reason

        let embed = new EmbedBuilder()
        if (result.size !== 0) {
            embed.setColor('Green')
            embed.setTitle('Отчет об удалении сообщений')
            embed.setDescription(`
                Удалено сообщений: \`${result.size}\`
                Пользователь, чьи сообщения были удалены: ${ targetUser || '\`его нет)\`'}
                Модератор: <@${callUser.id}>
                Причина: ${noReason}
            `)
            embed.setFooter({text: `Удалено с помощью меня`, iconURL: interaction.client.user?.displayAvatarURL()})
        } else {
            embed.setColor('Red')
            embed.setTitle('Отчет об удалении сообщений')
            embed.setDescription(`
                \`Сообщения не были удалены по возможно следующим причинам:\`
                \- Сообещения в канале страрше 14 дней
                \- У меня нет доступа к каналу
                \- Сообщения не найдены по заданным параметрам
            `)
            embed.setFooter({text: `Попытался удалить | ${callUser.nickname || callUser.displayName}`, iconURL: callUser.displayAvatarURL()})
        }
        
        await interaction.editReply({embeds: [embed]})
        
    }
}