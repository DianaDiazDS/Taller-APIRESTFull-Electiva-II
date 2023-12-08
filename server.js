const express = require("express");

require("dotenv").config();

const app = express();

//connect-DB
require('./drivers/connect-db')

// setters
app.set("PORT", process.env.PORT || 3000);

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/medic", require("./routes/Medic"))
app.use("/patient", require("./routes/Patient"))
app.use("/", require("./routes/index"))

app.listen(app.get("PORT"), () =>
  console.log(`Server listen at port ${app.get("PORT")}`)
);
