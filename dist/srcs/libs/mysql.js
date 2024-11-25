import { createPool } from "mysql2/promise";
export async function mySQL() {
    const db = createPool({
        database: 's211871_Noelle',
        user: 'u211871_IPnKLZB3ST',
        password: 'e0Gp@4nXWEi+hArV@3s38=ti',
        host: 'us.mysql.db.bot-hosting.net',
        port: 3306
    });
    return db;
}
