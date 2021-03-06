require('dotenv').config({ path: process.env.ENV_PATH });

module.exports = {
	type: 'postgresql',
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	dbName: process.env.POSTGRES_DB,
	entities: ['dist/**/*.entity.js'],
	entitiesTs: ['src/**/*.entity.ts'],
	debug: true,
};
