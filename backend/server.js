const express = require("express");
const bodyParser = require("body-parser");
const { handler } = require("./handler");

const app = express();
app.use(bodyParser.json());

// Route for /state
app.get("/state", async (req, res) => {
    const event = {
        rawPath: "/state",
        requestContext: {
            http: {
                path: "/state"
            }
        }
    };

    const response = await handler(event);
    res.status(response.statusCode).send(JSON.parse(response.body));
});

// Route for function calls
app.post("/function", async (req, res) => {
    const event = req.body;

    const response = await handler(event);
    res.send(response);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});