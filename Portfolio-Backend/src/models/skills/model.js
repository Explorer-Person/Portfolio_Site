const {executeQuery} = require('@db');

const skillsTable = async () => {
    try {

         const query =  `
            CREATE TABLE IF NOT EXISTS Skills (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                level VARCHAR(255) NOT NULL,
                imgUrl TEXT NOT NULL,
                url TEXT NOT NULL,
                file LONGTEXT,
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

module.exports = skillsTable