const {executeQuery} = require('@db');

const projectsTable = async () => {
    try {

        const query = `
            CREATE TABLE IF NOT EXISTS Projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                kinds VARCHAR(255) NOT NULL,
                detail TEXT NOT NULL,
                url VARCHAR(255),
                imgUrl MEDIUMTEXT,
                videoUrl MEDIUMTEXT,
                file LONGTEXT,
                fk INT NOT NULL, 
                FOREIGN KEY (fk) REFERENCES Skills(id)
            );
        `
        executeQuery(query);
        console.log('Tables created successfully!');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};

module.exports = projectsTable