const express = require('express');
const router = express.Router();
const Password = require('../model/passwordSchema');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Key should be 32 bytes (256 bits)
const ENCRYPTION_KEY = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'learningisfun', 'salt', 32);
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
function decrypt(text) {
    let textParts = text.split(':');
    let iv =     # Ignore node_modules directory
    node_modules/
    
    # Other files and directories to ignore
    .DS_Store
    .env
    dist/
    build/    # Ignore node_modules directory
    node_modules/
    
    # Other files and directories to ignore
    .DS_Store
    .env
    dist/
    build/    # Ignore node_modules directory
    node_modules/
    
    # Other files and directories to ignore
    .DS_Store
    .env
    dist/
    build/Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
router.post('/addpass', async(req, res) => {
    try {
        const userExist = await Password.findOne({userName: req.body.userName});
        if(userExist) {
            return res.status(400).json({
                success: false,
                message: 'User already Exists'
            });
        }
        const encryptedPassword = encrypt(req.body.password);
        console.log('Encrypted password is ', encryptedPassword);
        const newUser = new Password({
            userName: req.body.userName,
            password: encryptedPassword
        });
        console.log('user details', newUser);
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/getpass', async (req, res) => {
    try {
        const userName = req.body.userName; // Use query parameters for GET request
        console.log(userName);
        
        if (!userName) {
            return res.status(400).json({ success: false, message: 'User name is required' });
        }        
        const user = await Password.findOne({ userName: userName });        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const decryptedPassword = decrypt(user.password);
        console.log('Decrypted password : ',decryptedPassword);
        
        return res.status(200).json({ 
            success: true, 
            user: user.userName, 
            password: decryptedPassword 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;