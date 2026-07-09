const User = require("../Database/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Validate fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        // Find user
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }


        // Create JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );




        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


module.exports = login;