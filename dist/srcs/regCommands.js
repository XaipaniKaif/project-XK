import { REST, Routes } from "discord.js";
import fs from 'fs';
export async function regCommands() {
    let commands = [];
    const files = fs.readdirSync('./dist/createCommands');
    await Promise.all(files.map(async (file) => {
        if (file.endsWith('.js')) {
            const command = await import(`../createCommands/${file}`);
            if ('data' in command) {
                commands.push(command.data().toJSON());
            }
        }
    }));
    if (process.env.TOKEN && process.env.CLIENTID) {
        const rest = new REST().setToken(process.env.TOKEN);
        console.log(`Регистрация команд. Команд в очереди: ${commands.length}`);
        await rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
            .then((result) => console.log(`Готово! Команд зарегистировано: ${result.length}`))
            .catch((err) => console.error(err));
    }
    else {
        process.exit('Критическая ошибка! Не найдено данных авторизации');
    }
}
