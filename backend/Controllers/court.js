const Court = require("../Database/courtmodel");


// Create court
const createCourt = async (req, res) => {

    try {

        const {
            venueId,
            name,
            sport,
            pricePerhour,
            indoor
        } = req.body;


        if (!venueId || !name || !sport || !pricePerhour) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // Only owner/admin
        if (
            req.user.role !== "owner" &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }


        const court = await Court.create({
            venueId,
            name,
            sport,
            pricePerhour,
            indoor
        });


        res.status(201).json({
            message: "Court created successfully",
            court
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};



// Get all courts
const getCourts = async (req, res) => {

    try {

        const courts = await Court.find()
            .populate("venueId", "name location");


        res.status(200).json({
            success: true,
            courts
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};



// Get courts by venue
const getVenueCourts = async (req, res) => {

    try {

        const { venueId } = req.params;


        const courts = await Court.find({
            venueId
        });


        res.status(200).json({
            success: true,
            courts
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};



// Get single court
const getCourtById = async (req, res) => {

    try {

        const court = await Court.findById(req.params.id)
            .populate("venueId");


        if (!court) {
            return res.status(404).json({
                message: "Court not found"
            });
        }


        res.status(200).json(court);


    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};



// Update court
const updateCourt = async (req, res) => {

    try {

        if (
            req.user.role !== "owner" &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }


        const court = await Court.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                updatedAt: Date.now()
            },
            {
                new: true
            }
        );


        res.status(200).json({
            message: "Court updated",
            court
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};



// Delete court
const deleteCourt = async (req, res) => {

    try {

        if (
            req.user.role !== "owner" &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }


        await Court.findByIdAndDelete(req.params.id);


        res.status(200).json({
            message: "Court deleted"
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

};



module.exports = {
    createCourt,
    getCourts,
    getVenueCourts,
    getCourtById,
    updateCourt,
    deleteCourt
};