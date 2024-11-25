import { ApplicationIntegrationType, ContextMenuCommandBuilder, InteractionContextType } from "discord.js";


export function data() {
    return (
        new ContextMenuCommandBuilder()
        .setName('avatar')
        .setNameLocalization('ru', 'аватар')
        .setContexts([InteractionContextType.Guild, InteractionContextType.PrivateChannel])
        .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
        .setType(2)
        
        
    )
}