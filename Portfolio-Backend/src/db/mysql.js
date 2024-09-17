// db/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

async function checkDatabaseExists() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(`SHOW DATABASES LIKE '${process.env.DB_NAME}'`);
        return rows.length > 0;
    } catch (error) {
        console.error("Error checking database existence:", error);
        throw error;
    } finally {
        connection.release();
    }
}

async function createDatabase() {
    const connection = await pool.getConnection();
    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        console.log(`DB '${process.env.DB_NAME}' created successfully or already exists`);
    } catch (error) {
        console.error("Error creating database:", error);
        throw error;
    } finally {
        connection.release();
    }
}

async function executeQuery(query, parameters) {
    // Properly await checkDatabaseExists to avoid async issues
    const databaseExists = await checkDatabaseExists();
    
    if (!databaseExists) {
        await createDatabase();
    }
    
    const connection = await pool.getConnection();
    try {
        // Specify the database to use for the current connection
        await connection.query(`USE \`${process.env.DB_NAME}\``);
        // Execute the query
        const [rows, fields] = await connection.query(query, parameters);
        return rows;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    } finally {
        // Ensure the connection is always released
        connection.release();
    }
}

module.exports = { executeQuery, pool };
