export {};

declare global{
    namespace NodeJS {
        interface ProcessEnv{
            PORT: number;
            DATABASE_URL: string;
            SHADOW_DATABASE_URL: string;
            TOKEN_SECRET: string;
            REFRESH_TOKEN: string;
            TOKEN_EXPIRES_IN: string;
        }
    }
}