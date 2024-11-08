import { ChatInputCommandInteraction } from "discord.js";



export default {
    name: 'clear',
    async execute(interaction: ChatInputCommandInteraction) {
        const count = interaction.options.getInteger('count')
        const user = interaction.options.getUser('user')
        const time = interaction.options.getNumber('time')
        const reason = interaction.options.getString('reason')
    }
}