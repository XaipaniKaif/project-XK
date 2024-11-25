import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, GuildMember, ModalSubmitInteraction, StringSelectMenuBuilder, StringSelectMenuInteraction, UserSelectMenuBuilder, VoiceChannel } from "discord.js"
import createVoiceChannel from "./createVoiceChannel.js"
import editTemporaryChannel from "../../etc/modals/editTemporaryChannel.js";
import embedsTempChannel from "../../etc/embeds/embedsTempChannel.js";


const channelGet = createVoiceChannel.map


export async function settingVoiceChannel(interaction: StringSelectMenuInteraction) {
    
    if (interaction.customId !== 'settingTemporaryVoiceChannel') return;
    if (!channelGet.has(interaction.user.id)) {
        return await interaction.reply({content: 'Вы не в приватном канале', ephemeral: true})
    }

    switch(interaction.values[0]) {
        case('editNameChannel'): {
            await editNameTempChannel(interaction, channelGet)
            break;
        };
        case('editLimitChannel'): {
            await editLimitTempChannel(interaction, channelGet)
            break;
        };
        case('setOpenChannel'): {
            await openTempCahnnel(interaction, channelGet)
            break;
        };
        case('setCloseChannel'): {
            await closeTempChannel(interaction, channelGet)
            break;
        };
        case('setBlacklist'): {
            await addBlacklistTempChannel(interaction, channelGet)
            break;
        };
        case('setWhitelist'): {
            await addWhitelistTempChannel(interaction, channelGet)
            break;
        };
        case('banUserVoiceChannel'): {
            await banUserTempChannel(interaction, channelGet)
            break;
        }
        case('setOnNFWS'): {
            await setOnNFWS(interaction, channelGet)
            break;
        };
        case('setOffNFWS'): {
            await setOffNFWS(interaction, channelGet)
            break;
        };
        case('setAdminChannel'): {
            await setAdminChannel(interaction, channelGet)
            break;
        };
        case('muteUserVoiceChannel'): {
            await muteUserInTempChannel(interaction, channelGet)
            break;
        };

    }

    async function editNameTempChannel(interaction: StringSelectMenuInteraction, channelGet: Map<string, string>) {
        const channel = await interaction.guild?.channels.fetch(channelGet.get(interaction.user.id) as string)
        
        if (channel instanceof VoiceChannel) { 
            await interaction.showModal(editTemporaryChannel.editNameTemporaryNameChannel).catch((err: Error) => {console.error(err)})
            const modalSumbit = await interaction.awaitModalSubmit({time: 60_000})
            
            const newName = modalSumbit.fields.getTextInputValue('name')

            await channel.setName(newName)

            await modalSumbit.reply({content: `Теперь ваш канал называется <#${channel.id}>. `, ephemeral: true})
        } else {
            await interaction.reply({content: 'Ваш канал не найден, создайте новый', ephemeral: true})
            channelGet.delete(interaction.user.id)
        }
    };

    async function editLimitTempChannel(interaction: StringSelectMenuInteraction, channelGet: Map<string, string>) {
        if (!interaction.guild) return;
        const channel = await interaction.guild?.channels.fetch(channelGet.get(interaction.user.id) as string);

        if (channel instanceof VoiceChannel) {
            await interaction.showModal(editTemporaryChannel.editlimitTemporaryNameChannel);
            const modalSumbit = await interaction.awaitModalSubmit({time: 60_000}).catch((err: Error) => {console.error(err)}) as ModalSubmitInteraction;

            const newLimit = parseInt(modalSumbit.fields.getTextInputValue('limit'));
            
            if (isNaN(newLimit)) {
                return await modalSumbit.reply({content: 'Введите число людей, а не что-то иное. Например: \`5\`', ephemeral: true})
            } else {
                await channel.setUserLimit(newLimit).catch((err: Error) => {console.error(err)})
                await modalSumbit.reply({content: `Теперь в вашем канале могут находится до \`${newLimit}\` человек.\nОбратите внимание что ограничение на лимит могут игнорировать модераторы и хозяин сервера`, ephemeral: true})
            }
        } else {
            await interaction.reply({content: 'Ваш канал не найден, создайте новый', ephemeral: true})
            channelGet.delete(interaction.user.id)
        }
    };

    async function openTempCahnnel(interaction: StringSelectMenuInteraction, channelGet: Map<string, string>) {
        if (!interaction.guild) return;
        const channel = await interaction.guild?.channels.fetch(channelGet.get(interaction.user.id) as string)

        if (channel instanceof VoiceChannel) {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {Connect: null})
            await interaction.reply({content: 'Теперь ваш канал открыт для всех желающих. Приятного общения!', ephemeral: true})
        } else {
            await interaction.reply({content: 'Ваш канал не найден, создайте новый', ephemeral: true})
            channelGet.delete(interaction.user.id)
        }
    };

    async function closeTempChannel(interaction: StringSelectMenuInteraction, channelGet: Map<string, string>) {
        if (!interaction.guild) return;
        const channel = await interaction.guild?.channels.fetch(channelGet.get(interaction.user.id) as string)

        if (channel instanceof VoiceChannel) {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {Connect: false})
            await interaction.reply({content: 'Теперь ваш канал доступен только тем, кому вы разрешите)', ephemeral: true})
        } else {
            await interaction.reply({content: 'Ваш канал не найден, создайте новый', ephemeral: true})
            channelGet.delete(interaction.user.id)
        }
    };

    async function addBlacklistTempChannel(interaction: StringSelectMenuInteraction, channelGet: Map<string, string> ) {
        if (!interaction.guild) return;
        const channel = await interaction.guild?.channels.fetch(channelGet.get(interaction.user.id) as string)

        if (channel instanceof VoiceChannel) {
            await interaction.deferReply({ephemeral: true})
           
            const reply = await interaction.editReply({embeds: [embedsTempChannel.addBlacklistUser.embed], components: [embedsTempChannel.addBlacklistUser.components]})
            const collector = reply.createMessageComponentCollector({componentType: ComponentType.UserSelect, time: 60_000})
                .on('collect', async (i) => {
                const idsUser = i.values

                const usersBlack = (await Promise.allSettled(idsUser.map(u => i.guild?.members.fetch(u)))).filter(res => res.status === 'fulfilled').map(res => res.value) as GuildMember[]
                const createChUser = usersBlack.find(us => us.id === i.user.id)

                const idsUserBlack = usersBlack.filter(u => u.id !== i.user.id).map(us => `<@${us.id}>`)

                await Promise.all(usersBlack.filter(u => u.id !== i.user.id).map(u => channel.permissionOverwrites.edit(u, { Connect: false })))

                const content = `Следующие пользователи не смогут зайти на ваш канал: ${idsUserBlack.join(', ')}${createChUser ? `\n\`И да, себя нельзя добавить в черный список, иначе потеряете доступ к каналу (или нет)\`` : ''}`
                await i.reply({ content, ephemeral: true })
                collector.stop('ok')
                    
            })
            .on('end', async () => {
                await interaction.deleteReply().catch(() => {})
            })

        } else {
            await interaction.reply({content: 'Ваш канал не найден, создайте новый', ephemeral: true})
            channelGet.delete(interaction.user.id)
        }
    };
    async function addWhitelistTempChannel(interaction: StringSelectMenuInteraction, channelGet: Map<string, string> ) {
        if (!interaction.guild) return;
        const channel = await interaction.guild?.channels.fetch(channelGet.get(interaction.user.id) as string)

        if (channel instanceof VoiceChannel) {
            await interaction.deferReply({ephemeral: true})

            const reply = await interaction.editReply({embeds: [embedsTempChannel.addWhitelistUser.embed], components: [embedsTempChannel.addWhitelistUser.components]})
            const collector = reply.createMessageComponentCollector({componentType: ComponentType.UserSelect, time: 60_000})
            .on('collect', async (i) => {
                await i.deferReply({ephemeral: true})
                const idsUser = i.values
                const users = (await Promise.allSettled(idsUser.map(async (u) => await i.guild?.members.fetch(u)))).filter((filter) => filter.status === 'fulfilled').map((result) => result.value) as GuildMember[]
                const createChUser = users.find((user) => user.id === i.user.id)
                await Promise.all(users.filter((user) => user.id !== createChUser?.id).map((user) => channel.permissionOverwrites.edit(user, {Connect: true})))
                const userIds = users.filter((user) => user.id !== i.user.id).map((user) => `<@${user.id}>`)

                await i.editReply({content: `К вашему каналу теперь имеют доступ следующие пользователи: ${userIds.join(', ')}${createChUser ? '\n\`А вам это не нужно, вы и так имеете доступ\`' : ''}`})
                collector.stop('ok')
            })
            .on('end', async () => {
                await interaction.deleteReply().catch(() => {})
            })

        } else {
            await interaction.reply({content: 'Ваш канал не найден, создайте новый', ephemeral: true})
            channelGet.delete(interaction.user.id)
        }
    };

    async function setOnNFWS(interaction: StringSelectMenuInteraction, channelGet: Map<string, string>) {
        if (!interaction.guild) return;
        const channel = await interaction.guild?.channels.fetch(channelGet.get(interaction.user.id) as string)

        if (channel instanceof VoiceChannel) {
            await channel.setNSFW(true)
            await interaction.reply({content: 'Ваш канал помечен как "для больших мальчиков и девочек")', ephemeral: true})
        } else {
            await interaction.reply({content: 'Ваш канал не найден, создайте новый', ephemeral: true})
            channelGet.delete(interaction.user.id)
        }
    };

    async function setOffNFWS(interaction: StringSelectMenuInteraction, channelGet: Map<string, string>) {
        if (!interaction.guild) return;
        const channel = await interaction.guild?.channels.fetch(channelGet.get(interaction.user.id) as string)

        if (channel instanceof VoiceChannel) {
            await channel.setNSFW(false)
            await interaction.reply({content: 'Ваш канал теперь обычный. Надеюсь вы там не шалили)', ephemeral: true})
        } else {
            await interaction.reply({content: 'Ваш канал не найден, создайте новый', ephemeral: true})
            channelGet.delete(interaction.user.id)
        }
    };

    async function banUserTempChannel(interaction: StringSelectMenuInteraction, channelGet: Map<string, string>) {
        if (!interaction.guild) return;
        const channel = await interaction.guild?.channels.fetch(channelGet.get(interaction.user.id) as string)

        if (channel instanceof VoiceChannel) {
            await interaction.deferReply({ephemeral: true})
            const listUsers = channel.members.map((user) => user)
            const {embed, component, flags} = embedsTempChannel.banUserTempChannel(listUsers, interaction.user.id)
            if (flags === true) {
                return await interaction.editReply({content: 'Быть одиноким наверное плохо? Или хорошо? Так или иначе мне банить некого.'})
            }
            const reply = await interaction.editReply({embeds: [embed], components: [component]})
            const collector = reply.createMessageComponentCollector({componentType: ComponentType.StringSelect, time: 60_000})
            .on('collect', async (i) => {
                await i.deferReply({ephemeral: true})
                const value = i.values[0]
                const userBan = await i.guild?.members.fetch(value)
    
                if (userBan?.voice.channel?.id === channel.id) {
                    await channel.permissionOverwrites.edit(userBan, {Connect: false})
                    await userBan.voice.disconnect()
                          
                } else {
                    return await i.editReply({content: 'Этот пользователь не находится в вашем канале'})
                }

                await i.editReply({content: `Теперь <@${userBan.id}> в бане.\nЕсли хотите это исправить добавьте его в \`белый список\``})
                collector.stop('ok')
            })
            .on('end', async (collect, reason) => {
                if ( reason === 'time' || reason === 'ok') {
                    await interaction.deleteReply();
                };
            })
        } else {
            await interaction.reply({content: 'Ваш канал не найден, создайте новый', ephemeral: true})
            channelGet.delete(interaction.user.id)
        }
    };

    async function muteUserInTempChannel(interaction: StringSelectMenuInteraction, channelGet: Map<string, string>) {
        if (!interaction.guild) return;
        const channel = await interaction.guild.channels.fetch(channelGet.get(interaction.user.id) as string)
        
        if (channel instanceof VoiceChannel) {
            await interaction.deferReply({ephemeral: true})

            const listUsers = channel.members.map((user) => user)
            const {embed, component, buttons} = embedsTempChannel.muteUserTempChannel(listUsers)
            const reply = await interaction.editReply({embeds: [embed], components: [component]})
            let button: ActionRowBuilder<ButtonBuilder>

            const collector = reply.createMessageComponentCollector({componentType: ComponentType.StringSelect, time: 60_000})
                .on('collect', async (iSelect) => {
                    await iSelect.deferReply({ephemeral: true, fetchReply: true})
                    const value = iSelect.values[0]
                    const userMute = await iSelect.guild?.members.fetch(value)
                    

                    if (userMute?.voice.channel?.id === channel.id) {
                        const muteState = userMute.voice.mute
                        if (muteState === false) {
                            button = buttons.mute
                        } else if (muteState === true) {
                            button = buttons.unmute
                        }

                        const replyButton = await iSelect.editReply({components: [button]})
                        const collector = replyButton.createMessageComponentCollector({componentType: ComponentType.Button, time: 60_000})
                        .on('collect', async (i) => {
                            if (i.customId === 'mute') {
                                await userMute.voice.setMute(true);

                                await i.reply({content: 'Пользователь в муте', ephemeral: true})
                                await iSelect.editReply({components: [buttons.unmute]})
                            } else if (i.customId === 'unmute') {
                                await userMute.voice.setMute(false)

                                await i.reply({content: 'Пользователь больше не в муте', ephemeral: true})
                                await iSelect.editReply({components: [buttons.mute]})
                            }
                        })

                    }
                })
                .on('end', async () => {

                })
             
        }

    }

    async function setAdminChannel(interaction: StringSelectMenuInteraction, channelGet: Map<string, string>) {
        if (!interaction.guild) return
        const channel = await interaction.guild?.channels.fetch(channelGet.get(interaction.user.id) as string)
        
        if (channel instanceof VoiceChannel) {
            await channel.permissionOverwrites.edit(interaction.user, {ManageChannels: true, ViewChannel: true, MoveMembers: true, DeafenMembers: true, ManageRoles: true, Speak: true})
            await interaction.reply({content: 'Теперь вы можете полностью управлять своим каналом', ephemeral: true})
        } else {
            await interaction.reply({content: 'Ваш канал не найден, создайте новый', ephemeral: true})
            channelGet.delete(interaction.user.id)
        }
    }

    
}