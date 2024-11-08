import { SlashCommandBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";



export function data() {
    return ( 
        new SlashCommandBuilder()
        .setName('info')
        .setNameLocalization('ru', 'инфо')
        .setDescription('Моя информация')
        .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel])
        .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
        .addStringOption(option => 
            option
                .setName('private')
                .setNameLocalization('ru', 'отображение')
                .setDescription('Хотите получить информацию лично?')
                .setRequired(true)
                .addChoices(
                    {name: 'yes', name_localizations: {ru: 'Да'}, value: 'true'},
                    {name: 'no', name_localizations: {ru: 'Нет'}, value: 'false'}
                )
        )
    )
}