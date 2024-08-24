const {executeQuery} = require('@db');

async function adminModel (){
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS admin (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) ,
                surname VARCHAR(255) ,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                bornDate DATE ,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(255) ,
                location VARCHAR(255) ,
                major VARCHAR(255) ,
                speciality VARCHAR(255) ,
                praise TEXT,
                socials TEXT,
                file LONGTEXT
            );
        `;

        await executeQuery(query);
        console.log('Tables created successfully!');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};

module.exports = adminModel;