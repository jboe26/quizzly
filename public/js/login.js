//required files
const express = require('express');
const router = express.Router();

//bcryptjs
const bcrypt = require('bcryptjs');

//User modal of mongoDB
const User = require('../../models/user');

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        //if user does not exist than return status 400
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json({ email: 'User not found' });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, firstname: user.firstname, lastname: user.lastname };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
                }else {
                    errors.password = "Incorrect Passsword";
                    return res.status(400).json(errors);
                } 
        }); 
    });
});
