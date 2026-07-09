const verifyToken = async (req, res) => {

    try {

        res.status(200).json({
            success: true,
            message: "Token is valid",
            user: req.user
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};


module.exports = verifyToken;