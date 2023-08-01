export const env = {
    port: process.env.PORT ?? 3000,
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/quotes',
    apiUrl: process.env.API_URL,
}