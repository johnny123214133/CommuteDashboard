import mysql from 'mysql2/promise'

var pool;
export function getPool() {
	if (pool) {
		return pool
	}
	const config = {
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DB
	};
	pool = mysql.createPool(config)
	return pool
};
