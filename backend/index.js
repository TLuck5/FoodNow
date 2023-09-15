require('dotenv').config()

const express = require("express")
const app = express()
const port = 5000
const mongoDB = require("./db")
const cors = require("cors")

app.use(cors())

mongoDB().then(() => {

    app.use(express.json())

    app.use("/api", require("./routes/UserRoutes"))
    app.use("/api", require("./routes/DisplayData"))
    app.use("/api", require("./routes/OrderData"))
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
})