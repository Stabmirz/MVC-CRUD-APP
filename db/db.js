const mongoose = require('mongoose')

const databaseName = "library-app"

const mongodbURI = "mongodb://localhost:27017/" + databaseName

mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log(`connected to data base ${mongodbURI}`)
})

mongoose.connection.on("disconnected", () => {
    console.log(`disconnected from data base ${mongodbURI}`)

})

mongoose.connection.on("error", (err) => {
    console.log(`error connecting ${mongodbURI}`)
})


