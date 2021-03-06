const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully !'
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
};

exports.login = (req, res, next) => {
    //  Check if user exist in database
    User.findOne({ email: req.body.email }).then(
        user => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found')
                });
            }
            // Check password
            bcrypt.compare(req.body.password, user.password).then(
                valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect password')
                        });
                    }
                    // If password is valid
                    const token = jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' });
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                }
            // If Bcrypt failed
            ).catch(
                error => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    // If Mongoose failed
    ).catch(
        error => {
            res.status(500).json({
                error: error
            });
        }
    );
};