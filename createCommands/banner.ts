import { ContextMenuCommandBuilder, ApplicationIntegrationType, InteractionContextType } from 'discord.js';


export function data() { 
    return (
        new ContextMenuCommandBuilder()
        .setName('banner')
        .setNameLocalization('ru', 'баннер')
        .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
        .setContexts([InteractionContextType.Guild, InteractionContextType.PrivateChannel])
        .setType(2)
    )
}