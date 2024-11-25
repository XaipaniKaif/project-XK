import { createAudioPlayer, NoSubscriberBehavior, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import sodium from 'libsodium-wrappers';
export default {
    async createAudioPlayer(interaction, tracks) {
        if (!interaction.guild)
            return;
        const channel = await interaction.guild?.members.fetch(interaction.user);
        await sodium.ready;
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause
            }
        });
        const resource = createAudioResource('https://cs10-1v4.vkuseraudio.net/s/v1/acmp/-7Zdr7RZpRTGUm7G9gb-0iiz-yBjszITc2Rezjr_iUk5m_1fEIUiVTaCOzjW7AdWkoYVErlPBvryaN-3AZA1XGN9JooyY4x8RKVja1maA2faTCz2ZI7xycgpp4vu2KiFADD9D9F5EtrtQYqJvDtaZtFp-zbQP7HYQgpxnG60tdFAFKbeqQ.mp3?siren=1', { inlineVolume: true });
        player.play(resource);
        const connection = joinVoiceChannel({
            channelId: channel.voice.channelId,
            guildId: channel.guild.id,
            adapterCreator: interaction.guild?.voiceAdapterCreator
        });
        connection.subscribe(player);
    }
};
