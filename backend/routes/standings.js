const express = require("express");

const router = express.Router();

const db = require("../db");


router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM standings",
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("조회 실패");
            } else {
                res.json(result);
            }

        }
    );

});


module.exports = router;