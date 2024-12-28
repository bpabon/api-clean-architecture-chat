import { get }  from 'env-var';
import 'dotenv/config';
import { config as dotenvConfig, DotenvConfigOptions } from 'dotenv';

const env: string = process.env.NODE_ENV || 'development';

const envs: { [key: string]: string } = {
    'development': '.env',
    'e2e': '.env.e2e'
};

const options: DotenvConfigOptions = {};

if (envs[env]) {
    options.path = envs[env];
}

dotenvConfig(options);

interface Config {
    env: string;
    isProd: boolean;
    isDev: boolean;
    PORT: number;
    dbUrl: string;
    apiKey?: string;
    jwtSecret: string;
    smtpEmail?: string;
    smtpPassword?: string;
    urlPublic: string;
}

export const config: Config = {
    env,
    isProd: process.env.NODE_ENV === 'production',
    isDev: env === 'development',
    PORT: get('PORT').required().asPortNumber(),
    dbUrl:  get('DATABASE_URL').required().asString(),
    apiKey: process.env.API_KEY || '',
    jwtSecret:  get('JWT_SECRET').required().asString(),
    smtpEmail: process.env.SMTP_EMAIL || '',
    smtpPassword: process.env.SMTP_PASSWORD || '',
    urlPublic: process.env.URL_PUBLIC || '',
};

