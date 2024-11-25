import { ChannelType, PermissionsBitField } from "discord.js";
const channelOBJ = new Map();
export default {
    createVoiceTemporaryChannel: async function (oldState, newState) {
        const channelCreateID = '1238373603594997816';
        const categoryCreateId = '1238373603594997814';
        if (newState.channelId === channelCreateID) {
            if (!newState.member)
                return;
            if (newState.member.user.bot)
                return;
            if (channelOBJ.has(newState.member.id)) {
                const key = channelOBJ.get(newState.member.id);
                const channelGet = await newState.guild.channels.fetch(key);
                await newState.member.voice.setChannel(channelGet);
                return;
            }
            const channel = await newState.guild.channels.create({
                name: `${newState.member?.nickname || newState.member?.displayName} - Приватный канал`,
                type: ChannelType.GuildVoice,
                parent: categoryCreateId,
                permissionOverwrites: [
                    {
                        id: newState.guild.id,
                        deny: [PermissionsBitField.Flags.Connect],
                    },
                    {
                        id: newState.member.id,
                        allow: [PermissionsBitField.Flags.Connect],
                    }
                ]
            });
            await newState.member.voice.setChannel(channel);
            channelOBJ.set(newState.member.id, channel.id);
        }
        if (oldState.channelId !== newState.channelId && oldState.channelId === channelOBJ.get(oldState.member?.id || '') && oldState.channelId !== channelCreateID) {
            if (!oldState.member)
                return;
            const channel = channelOBJ.get(oldState.member?.id);
            const channelTemporary = await oldState.guild.channels.fetch(channel);
            await channelTemporary?.delete();
            channelOBJ.delete(oldState.member?.id);
        }
    },
    map: channelOBJ
};
