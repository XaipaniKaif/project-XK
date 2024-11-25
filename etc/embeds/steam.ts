import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, StringSelectMenuBuilder } from "discord.js"
import { htmlToText } from "html-to-text"




export default {
    nullTotal: new EmbedBuilder()
    .setColor('Red')
    .setDescription(`
        По вашему запоосу ничего не найдено( Проверьте правильность
    `),

    listGames: function(data: ResultSeachSteam, interaction: ChatInputCommandInteraction) {
        const values = data.items.map((item) => {return {value: item.id.toString(), label: item.name.slice(0, 100)}})
        return {
            embed: new EmbedBuilder()
            .setAuthor({name: interaction.client.user.displayName, iconURL: interaction.client.user.displayAvatarURL()})
            .setTitle(`Результаты поиска`)
            .setColor('Green')
            .setDescription(`
                По вашему запросу было найдено игр: \`${data.total} \` 
            `),

            component: new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('listGamesSteam')
                .setPlaceholder('Выберите игру')
                .addOptions(values)
            )

        }
    },

    gameDetails: function(data: DetailsGame, success?: boolean) {
        const description = htmlToText(data.data.detailed_description, { wordwrap: 130 , preserveNewlines: true})
        let embed = new EmbedBuilder()
            .setAuthor({name: `Разработчики: ${data.data.developers.join(', ')}\nИздатель: ${data.data.publishers.join(', ')}`})
            .setTitle(data.data.name)
            .setImage(data.data.header_image)
            .setColor('Random')
            .setDescription(description.slice(0, 4096))
            .addFields(
                {name: 'Дата выхода', value: data.data.release_date.date, inline: true},
            )
        if (data.data.metacritic) { 
            embed.addFields({name: 'Metacritic', value: data.data.metacritic.score.toString(), inline: true})
        }
        
        if (data.data.price_overview && data.data.is_free === false) {
            embed.addFields(
                {name: 'Цена', value: `${data.data.price_overview.final_formatted} ${data.data.price_overview.currency}`, inline: true},
                {name: 'Скидка', value: `${data.data.price_overview.discount_percent}%`, inline: true},
            )
        } else if (!data.data.price_overview && data.data.is_free === false) {
            embed.addFields({name: 'Цена', value: 'В настоящее время неизвестна', inline: true})
        } else {
            embed.addFields({name: 'Цена', value: 'Бесплатно', inline: true})
        }
        if (success === false) {  
            embed.setFooter({text: 'В этой ценовой зоне игра недоступна, игра была показана в USD'})
        }
        
        return {
            embed: embed,
            component: new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
               new StringSelectMenuBuilder()
                .setCustomId('gameDetailsSteam')
                .setPlaceholder('Выберите конкретную информацию')
                .addOptions(
                    {label: 'Официальный сайт', value: 'website', emoji: '🌐'},
                    {label: 'Системные требования', value: 'sysreq', emoji: '🖥️'},
                    {label: 'Скриншоты', value: 'screenshots', emoji: '🖼️'},
                    {label: 'Видео', value: 'videos', emoji: '🎥'},
                    {label: 'Перейти в магазин', value: 'store', emoji: '🛒'},
                )
            )
        }
    },
    pcRecomendations: function(data: DetailsGame) {
        const minimum = htmlToText(data.data.pc_requirements.minimum, {wordwrap: 130, preserveNewlines: true})
        const maximum = htmlToText(data.data.pc_requirements.recommended, {wordwrap: 130, preserveNewlines: true})
        return {
            embed: new EmbedBuilder()
            .setTitle('Системные требования')
            .setColor('Random')
            .setDescription(`
                ${minimum}
                ${maximum}
            `)
        }
    }

}