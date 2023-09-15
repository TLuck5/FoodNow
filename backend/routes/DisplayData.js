const express = require("express");
const router = express.Router();
const data = require("../Databases/Food_Items.json")
const dataCat = require("../Databases/Category.json")

router.post("/fooditems", async (req, res) => {
    try {
        res.json([data, dataCat])
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
