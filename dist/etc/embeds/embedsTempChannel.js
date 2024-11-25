import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
export default {
    listParamTempVoiceChannel: {
        embed: new EmbedBuilder()
            .setTitle('Настройка временного канала')
            .setDescription('хз что тут написать'),
        component: new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
            .setCustomId('settingTemporaryVoiceChannel')
            .setPlaceholder('Выберите настройку')
            .addOptions({ label: 'Изменить название канала', value: 'editNameChannel', emoji: '📝' }, { label: 'Изменить лимит участников канала', value: 'editLimitChannel', emoji: '🔢' }, { label: 'Открыть канал для всех', value: 'setOpenChannel' }, { label: 'Закрыть канал для всех', value: 'setCloseChannel' }, { label: 'Добавить в черный список', value: 'setBlacklist' }, { label: 'Добавить в белый список', value: 'setWhitelist' }, { label: 'Выгнать и забанить участника', value: 'banUserVoiceChannel' }, { label: 'Установить метку NFWS', value: 'setOnNFWS' }, { label: 'Убрать метку NFWS', value: 'setOffNFWS' }, { label: 'Получить полное управление над каналом', value: 'setAdminChannel' }, { label: 'Замутить/Размутить пользователя', value: 'muteUserVoiceChannel' }))
    },
    addBlacklistUser: {
        embed: new EmbedBuilder()
            .setTitle('Добавление пользователя в черный список')
            .setDescription(`
            Этот параметр позволяет заблокировать доступ к вашему каналу определенным людям (до 5 за 1 раз!).
            Имейте ввиду, чтобы удалить пользователя из черного списка вам нужно будет добавить его в \`белый список\`.
        `)
            .setColor('DarkBlue')
            .setFooter({ text: 'На модераторов и хозяина сервера ограничение не распростроняется' }),
        components: new ActionRowBuilder().addComponents(new UserSelectMenuBuilder()
            .setCustomId('choiseUserblockInTempVoiceChannel')
            .setMaxValues(5)
            .setMinValues(1)
            .setPlaceholder('Выберите пользователей'))
    },
    addWhitelistUser: {
        embed: new EmbedBuilder()
            .setTitle('Добавление пользователя в белый список')
            .setColor('White')
            .setDescription(`
            Этот параметр позволяет дать пользователям доступ к вашему каналу.
            Имейте ввиду, чтобы удалить пользователя из белого списка вам нужно будет добавить его в \`черный список\`.
        `)
            .setFooter({ text: 'Р.S. модератором и создателю сервера это не нужно' }),
        components: new ActionRowBuilder().addComponents(new UserSelectMenuBuilder()
            .setCustomId('choiseUserAccessTempVoiceChannel')
            .setMaxValues(5)
            .setMinValues(1)
            .setPlaceholder('Выберите пользователей'))
    },
    banUserTempChannel: (user, createChUser) => {
        const listUsers = user.filter((user) => user.id !== createChUser).map((user) => { return { label: user.nickname || user.displayName, value: user.id }; });
        let nullUsers = false;
        if (listUsers.length === 0)
            nullUsers = true;
        return {
            embed: new EmbedBuilder()
                .setTitle('Выгнать и забанить пользователя')
                .setColor('Red')
                .setDescription(`
                В случае если какой-то человек вам мешает или досаждает вы можете выгнать и закрыть ему доступ к каналу.
                Если вы вдруг передумаете, вы можете добавить его в \`белый список\` чтобы открыть доступ к каналу.
            `)
                .setFooter({ text: 'Обратите внимание что мне по силам отключить даже хозяева сервера, но закрыть ему доступ я увыб не могу :(' }),
            component: new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
                .setCustomId('banUserTempChannel')
                .setPlaceholder('Выберите пользователя')
                .addOptions(listUsers)),
            flags: nullUsers
        };
    },
    muteUserTempChannel: (users) => {
        return {
            embed: new EmbedBuilder()
                .setColor('Red')
                .setTitle('Замутить/размутить пользователя в канале')
                .setDescription(`
                Это опция позволяет вам отключить возможность говорить кому-либо на канале или включить ее обратно.
            `)
                .setFooter({ text: 'Я конечено могу отключать звук модератором, но они могут его включить себе обратно сами.' }),
            component: new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
                .setCustomId('selectUserMuteTempChannel')
                .setPlaceholder('Выберите пользователя')
                .addOptions(users.map((user) => { return { label: user.nickname || user.displayName, value: user.id }; }))),
            buttons: {
                mute: new ActionRowBuilder().addComponents(new ButtonBuilder()
                    .setCustomId('mute')
                    .setLabel('Замьютить')
                    .setStyle(ButtonStyle.Danger)),
                unmute: new ActionRowBuilder().addComponents(new ButtonBuilder()
                    .setCustomId('unmute')
                    .setLabel('Размьютить')
                    .setStyle(ButtonStyle.Secondary))
            }
        };
    }
};
