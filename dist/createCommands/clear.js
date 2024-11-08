import { ApplicationIntegrationType, InteractionContextType, PermissionsBitField, SlashCommandBuilder } from "discord.js";
export function data() {
    return (new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Очистка чата')
        .setNameLocalization('ru', 'очистить')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .setContexts([InteractionContextType.Guild])
        .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
        .addIntegerOption((option) => option
        .setName('count')
        .setNameLocalization('ru', 'количество')
        .setDescription('Количество сообщений для удаления')
        .setMinValue(1)
        .setMaxValue(100))
        .addUserOption((option) => option
        .setName('user')
        .setNameLocalization('ru', 'пользователь')
        .setDescription('Пользователь, чьи сообщения нужно удалить'))
        .addNumberOption((option) => option
        .setName('time')
        .setDescription('Время в минутах, за которое нужно удалить сообщения')
        .setNameLocalization('ru', 'время'))
        .addStringOption((option) => option
        .setName('reason')
        .setDescription('Причина удаления сообщений')
        .setNameLocalization('ru', 'причина')));
}
