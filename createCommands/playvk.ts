import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";



export function data() {
    return (
        new SlashCommandBuilder()
        .setName('vkplay')
        .setDescription('Пора слушать музыку! Используется сервис ВК')
        .setNameLocalization('ru', 'музыка')
        .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
        .setContexts([InteractionContextType.Guild])
        .addStringOption(option =>
            option
            .setName('search')
            .setDescription('Напишите что вы ищите')
            .setNameLocalization('ru', 'поиск')
            .setRequired(true)
            .setMaxLength(50)
        )
        .addStringOption(option=>
            option
            .setName('params')
            .setDescription('Укажите что вы ищите: песню, музыку пользователя или плейлист')
            .setNameLocalization('ru', 'параметр')
            .setRequired(true)
            .addChoices(
                { name: 'user', name_localizations: {ru: 'пользователь'}, value: 'user' },
                { name: 'track', name_localizations: {ru: 'песня'}, value: 'track'},
                { name: 'playlist', name_localizations: {ru: 'плейлист'}, value: 'playlist'}
            )
        )
        .addIntegerOption(option =>
            option
            .setName('count')
            .setDescription('Количество треков из плейлиста или списка пользователя')
            .setMaxValue(75)
            .setMinValue(1)
            .setNameLocalization('ru', 'количество')
        )
        
    )
}