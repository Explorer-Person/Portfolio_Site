const {executeQuery} = require('@db');


const abilitiesTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS Abilities (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                level VARCHAR(255) NOT NULL,
                fk INT,
                FOREIGN KEY (fk) REFERENCES admin(id)
            );
        `;
        await executeQuery(query);
        console.log('Tables created successfully!');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};
module.exports = abilitiesTable
