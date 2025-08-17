const nodemailer =  require("nodemailer");
const User = require('../database/schema/user');
const jwt = require('jsonwebtoken');

class UserController {

    static createUser = async (req, res) => {
        const data = req.body;
        console.log(data);

        try {

            if (data.confirmPassword !== data.password) {
                res.json(400).json({ message: 'Password does not matches' });
            }

            const users = new User({
                username: data.username,
                email: data.email,
                password: data.password
            })

            await users.save();

            const transporter = nodemailer.createTransport({
                service: "gmail", 
                auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASS, 
                },
            });

            const mailOptions = {
                from: `"My App" <${process.env.MAIL_USER}>`,
                to: users.email,
                subject: "Thank you for registering!",
                html: `
                <h2>Hello ${users.username},</h2>
                <p>Thank you for registering on our platform 🎉</p>
                <p>We’re excited to have you onboard.</p>
                <br/>
                <p>— The Team</p>
                `,
            };

            await transporter.sendMail(mailOptions);
            
            res.status(201).json(users);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static loginUser = async (req, res) => {
        const data = req.body;

        try {

            const user = await User.findOne({
                username: data.username,
            })

            if (!user) return res.status(404).json({ message: 'User not found' });

            const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET_USER,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Login successful', token, username: user.username });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    }

}

module.exports = UserController;