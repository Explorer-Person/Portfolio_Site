const {executeQuery} = require('@db');

const projectImagesTable = async () => {
    try {

        const query = `
            CREATE TABLE IF NOT EXISTS projectImages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                url MEDIUMTEXT,
                file LONGTEXT,  
                fk INT NOT NULL, 
                FOREIGN KEY (fk) REFERENCES projects(id)
            );
        `
        executeQuery(query);
        console.log('Tables created successfully!');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};

module.exports = projectImagesTable