const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
// require("./routes/userRoutes")(app);

app.listen(PORT, () => {
  console.log(`Server running`);
});