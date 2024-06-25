import { getPool } from '../db/index.js'

export async function getLocationById(id) {
	const [rows] = await getPool().execute(`
		select * from location where id = ?;
		`, [id])
	return rows.length ? rows[0] : {}
}

export async function getLocationByAddress(address) {
	const [rows] = await getPool().execute(`
		select * from location where address = ?;
		`, [address])
	return rows.length ? rows[0] : {}
}

export async function getLocationByLatLng(lat, lng) {
	const [rows] = await getPool().execute(`
		select * from location where lat = ? and lng = ?;
		`, [lat, lng])
	return rows.length ? rows[0] : {}
}

export async function createLocation(params) {
	await getPool().execute(`
		insert into location (address, lat, lng) values (?, ?, ?);
		`, [params.address, params.lat, params.lng])
	// return rows[0]
}

export async function deleteLocationById(id) {
	await getPool().execute(`
		delete from location where id = ?;
		`, [id])
	// return
}