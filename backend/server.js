const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// routes
const regionRoutes = require("./routes/regions");
const teamRoutes = require("./routes/teams");
const positionRoutes = require("./routes/positions");
const playerRoutes = require("./routes/players");
const seasonRoutes = require("./routes/seasons");
const matchRoutes = require("./routes/matches");
const goalTypeRoutes = require("./routes/goalTypes");
const goalRoutes = require("./routes/goals");
const standingsRoutes = require("./routes/standings");
const scorersRoutes = require("./routes/scorers");


// use routes
app.use("/regions", regionRoutes);
app.use("/teams", teamRoutes);
app.use("/positions", positionRoutes);
app.use("/players", playerRoutes);
app.use("/seasons", seasonRoutes);
app.use("/matches", matchRoutes);
app.use("/goal-types", goalTypeRoutes);
app.use("/goals", goalRoutes);
app.use("/standings", standingsRoutes);
app.use("/scorers", scorersRoutes);


app.get("/", (req, res) => {
    res.send("Soccer League API");
});


app.listen(process.env.PORT, () => {
    console.log(`서버 실행 중 : ${process.env.PORT}`);
});