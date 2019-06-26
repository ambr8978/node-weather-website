const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Tony"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Baby",
        name: "Tony"
    })
})

app.get("/weather", (req, res) => {
    let address = req.query.address
    if (!address) {
        return res.send({
            error: "You must specify an address"
        })
    }

    geocode(address, (geocodeError, { latitude, longitude, location } = {}) => {
        if (geocodeError) {
            return res.send({
                error: geocodeError
            })
        }

        forecast(latitude, longitude, (forecastError, { forecast } = {}) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }

            res.send({
                location,
                latitude,
                longitude,
                forecast
            })
        })
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log("Product search was: " + req.query.search)
    res.send({
        products: []
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        description: "You're fucked",
        name: "Tony"
    })
})

app.get("/help/*", (req, res) => {
    res.render("pageNotFound", {
        title: "404 page not found",
        name: "Tony",
        errorMessage: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("pageNotFound", {
        title: "404 page not found",
        name: "Tony",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server now listening on port 3000");
})