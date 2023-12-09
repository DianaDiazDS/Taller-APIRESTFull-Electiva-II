const mongoose = require("mongoose");

//conexión remota (MongoDB Atlas)
const URI =
  "mongodb+srv://admin:admin@cluster0.cvqzcco.mongodb.net/consultorio?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose
  .connect(URI)
  .then(() => console.log("Connect DB Success"))
  .catch((e) => console.log(e));

module.exports = mongoose;
