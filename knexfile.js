import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrations = {
    directory: path.join(__dirname, 'src', 'migrations'),
};

export const development = {
    client: 'sqlite3',
    connection: {
        filename: './database.sqlite',
    },
    useNullAsDefault: true,
    migrations,
};

export const production = {
    client: 'pg',
    connection: {
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    },
    useNullAsDefault: true,
    migrations,
};

export const knexConfig = {
    development,
    production,
};
