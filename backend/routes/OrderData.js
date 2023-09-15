const express = require("express")
const orders = require("../models/Orders")
const router = express.Router()

router.post("/orderData", async (req, res) => {
    let data = req.body.order_data

    await data.splice(0, 0, { Order_date: req.body.order_date })

    let eId = await orders.findOne({ "email": req.body.email })

    if (eId == null) {
        try {
            await orders.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }

    else {
        try {
            await orders.findOneAndUpdate({ email: req.body.email }, {
                $push: { order_data: data }
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
})

router.post("/myOrders", async (req, res) => {
    try {
        const myData = await orders.findOne({ email: req.body.email });

        if (myData && myData.order_data) {
            const responseArray = [];

            myData.order_data.sort((a, b) => new Date(b.Order_date) - new Date(a.Order_date));

            myData.order_data.forEach((order) => {
                order.forEach((item) => {
                    if (item.Order_date) {
                        responseArray.push({ date: item.Order_date });
                    } else {
                        responseArray.push({
                            name: item.name,
                            qty: item.qty,
                            price: item.price,
                        });
                    }
                });
            });

            res.json(responseArray);
        } else {
            res.status(404).json({ error: "Data not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





module.exports = router