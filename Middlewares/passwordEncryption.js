const bcrypt = require("bcrypt");
const saltRounds = 10;



export async function EncryptPassword(plainPassword) {
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        // Store hash in your password DB.
    });
}