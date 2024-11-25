import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";




export default {
    editNameTemporaryNameChannel: new ModalBuilder()
    .setCustomId('setNameTempChannel')
    .setTitle('Изменение названия канала')
    .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
            .setCustomId('name')
            .setLabel('Введите новое название канала.')
            .setMinLength(1)
            .setMaxLength(30)
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder('Название канала')
        ) 
    ),
    editlimitTemporaryNameChannel: new ModalBuilder()
    .setCustomId('setLimitTempChannel')
    .setTitle('Изменение лимита участников канала')
    .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
            .setCustomId('limit')
            .setLabel('Введите лимит людей в канале.')
            .setMinLength(1)
            .setMaxLength(2)
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setPlaceholder('от 0 до 99')
        ) 
    )   
} 
