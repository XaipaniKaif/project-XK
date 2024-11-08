import { AttachmentBuilder, ChatInputCommandInteraction, ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import axios from "axios";
import steam from "../etc/embeds/steam.js";


export default {
    name: 'steam',
    async execute(interaction: ChatInputCommandInteraction) {
        const name = interaction.options.getString('name', true)
        const currency = interaction.options.getString('currency')

        const searchURL = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(name)}&l=russian&cc=${currency || 'us'}`;

        console.log(currency)
        await interaction.deferReply()

        const resultSeach: ResultSeachSteam = await axios.get(searchURL)
            .then((response) => response.data)
            .catch((err) => console.error(err))
        
        if (resultSeach.total === 0) {
            return await interaction.editReply({embeds: [steam.nullTotal]})
        }
        
        
        const selectGame = steam.listGames(resultSeach, interaction)
        
        const reply = await interaction.editReply({embeds: [selectGame.embed], components: [selectGame.component]})

        const collector = reply.createMessageComponentCollector({componentType: ComponentType.StringSelect, time: 60_000})
        collector.on('collect', async (i) => {
            await i.deferReply()
            const id = i.values[0]
            const gameDetailsUrl = `https://store.steampowered.com/api/appdetails?appids=${id}&l=russian&cc=${currency || 'us'}`
            const checkGames: DetailsGame = (await axios.get(gameDetailsUrl)).data[id]

            let dataGame: DetailsGame
            let detailsGame: {embed: EmbedBuilder, component: ActionRowBuilder<StringSelectMenuBuilder>}

            if (!checkGames.success) { 
                const gameDetailsUrlRepit = `https://store.steampowered.com/api/appdetails?appids=${id}&l=russian&cc=us`
                dataGame = (await axios.get(gameDetailsUrlRepit)).data[id]
                detailsGame = steam.gameDetails(dataGame, false)
            } else {
                detailsGame = steam.gameDetails(checkGames)
                dataGame = checkGames
            }

            const reply = await i.editReply({embeds: [detailsGame.embed], components: [detailsGame.component]})

            const collector = reply.createMessageComponentCollector({componentType: ComponentType.StringSelect, time: 120_000})
            
            collector.on('collect', async (i) => {
                await i.deferReply({ephemeral: true})
                const value = i.values[0]
                if (value === 'website') {
                    await i.editReply({content: dataGame.data?.website || 'Сайт отсуствует или не найден'})
                } else if (value === 'sysreq') {
                    await i.editReply({embeds: [steam.pcRecomendations(dataGame).embed]})
                } else if (value === 'screenshots') {
                    const count = dataGame.data.screenshots.slice(0, 10)
                    const screenshots = count.map((screenshot) => {return new AttachmentBuilder(screenshot.path_full)})
                    await i.editReply({files: screenshots})
                } else if (value === 'videos') {
                    const videos = dataGame.data.movies.map((video) => {return video.webm['480']})
                    await i.editReply({content: videos.join('\n')})
                } else if (value === 'store') {
                    await i.editReply({content: `https://store.steampowered.com/app/${id}`})
                }
            })
            collector.on('end', async () => {
                await reply.edit({components: []}).catch(() => {})
            })
        });

        collector.on('end', async () => {
            await reply.delete().catch(() => {})
        });
    }
}