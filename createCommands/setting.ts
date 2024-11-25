import { ApplicationIntegrationType, InteractionContextType, PermissionsBitField, SlashCommandBuilder } from "discord.js";


export function data() {
    return (
        new SlashCommandBuilder()
        .setName('setting')
        .setDescription('Настройки моих возможностей')
        .setNameLocalization('ru', 'настройки')
        .setContexts([InteractionContextType.Guild])
        .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    )
}