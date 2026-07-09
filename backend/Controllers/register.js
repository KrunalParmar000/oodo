const User = require("../Database/usermodel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");


const register = async (req, res) => {

    try {

        const { fullname, email, password, role } = req.body;

        console.log(fullname, email, password, role);

        // Check required fields
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required1"
            });
        }


        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }


        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user
        const newUser = await User.create({
            id: uuidv4(),
            fullname,
            email,
            password: hashedPassword,
            role: role || "customer"
        });


        res.status(201).json({
            message: "Registration successful",
            user: {
                id: newUser.id,
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role
            }
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


module.exports = register;