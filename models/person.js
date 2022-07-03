const mongoose = require("mongoose")

const url = process.env.MONGODB_URI
console.log(url)
mongoose.connect(url)
    .then(() => {
        console.log("Connected!")
    })
    .catch(error => {
        console.log("Failed to connect: ", error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function (v) {
                // Numero minimissään joko 2+6 tai 3+5 pituudelta eli 8
                return /\d{2}-\d{6}/.test(v) || /\d{3}-\d{5}/.test(v)
            },
            message: "Not a valid number! Please enter in xx-xxxx or xxx-xxxx format"
        },
        required: true
    }
})


personSchema.set("toJSON", {
    transform: (document, returned) => {
        returned.id = returned._id.toString()
        delete returned._id
        delete returned.__v
    }
})

module.exports = mongoose.model("Person", personSchema)