import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";
export function data() {
    return (new SlashCommandBuilder()
        .setName('steam')
        .setDescription('быстрое получение информации об игре из Steam')
        .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
        .setContexts([InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel])
        .addStringOption(name => name
        .setName('name')
        .setRequired(true)
        .setDescription('Введите название продукта')
        .setNameLocalization('ru', 'название')
        .setMaxLength(100))
        .addStringOption(currency => currency
        .setName('currency')
        .setDescription('Выберите валюту')
        .setNameLocalization('ru', 'валюта')
        .addChoices({ name: 'RUB', value: 'ru' }, { name: 'TRY', value: 'tr' }, { name: 'KZH', value: 'kz' }, { name: 'USD', value: 'us' })));
}
