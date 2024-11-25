import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import { PythonShell } from "python-shell";
export default {
    getTracksVKUser: async (search, param, count, idUserVK) => {
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            args: [idUserVK ? idUserVK : search, param, count?.toString() || '50'],
        };
        const py = await PythonShell.run('C:/Users/Денис/Desktop/project_XK/script.py', options);
        const playlistsArray = JSON.parse(py[0].replace(/'/g, '"'));
        const results = playlistsArray.map((playlist) => ({
            title: playlist.title,
            artist: playlist.artist,
            duration: playlist.duration,
            track_id: playlist.track_id,
            owner_id: playlist.owner_id,
            url: playlist.url
        }));
        return results;
    },
    getVKPlaylist: async (search, param, count) => {
        const playlists = await new Promise((resolve, reject) => {
            const pyShell = new PythonShell('C:/Users/Денис/Desktop/project_XK/script.py', { mode: 'text', args: [search, param, count?.toString() || '50'] });
            pyShell.on('message', (message) => {
                resolve(message);
            });
            pyShell.on('error', (err) => {
                reject(err);
            });
            pyShell.end((err) => {
                if (err) {
                    reject(err);
                }
            });
        });
        console.log(playlists);
        const playlistsArray = JSON.parse(playlists.replace(/'/g, '"')); // Заменяем одинарные кавычки на двойные для корректного парсинга JSON
        const results = playlistsArray.map((playlist) => ({
            title: playlist.title,
            photo: playlist.photo,
            playlist_id: playlist.playlist_id,
            description: playlist.description,
            count: parseInt(playlist.count),
            access_key: playlist.access_key,
            owner_id: playlist.owner_id
        }));
        return {
            components: new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
                .setCustomId('selectPlaylistVK')
                .setPlaceholder('Выберите плейлист')
                .addOptions(results.map((value) => { return { label: value.title, value: `${value.owner_id}_${value.access_key}_${value.playlist_id}` }; }))),
            embed: new EmbedBuilder()
                .setTitle('Результат по вашему запросу')
                .setColor('Green')
                .setDescription(results.map((title) => title.title).join('\n'))
        };
    },
    getTrackPlaylistVK: async (value) => {
        const pattern = /^([^_]+)_([^_]+)_([^_]+)/g;
        const parametrs = [...value.matchAll(pattern)].map(match => ({
            owner_id: match[1],
            access_key: match[2],
            playlist_id: match[3]
        }));
        const py = await PythonShell.run('C:/Users/Денис/Desktop/project_XK/script.py', { mode: 'text', args: [parametrs[0].playlist_id, 'getTrackPlaylist', parametrs[0].owner_id, parametrs[0].access_key] });
        return py;
    }
};
