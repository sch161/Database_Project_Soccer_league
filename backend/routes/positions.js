const express = require("express");

const router = express.Router();

const db = require("../db");


router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM positions",
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


router.post("/", (req, res) => {

    const { position_name } = req.body;

    const sql = `
        INSERT INTO positions (position_name)
        VALUES (?)
    `;

    db.query(sql, [position_name], (err, result) => {

        if (err) {
            console.log(err);
            res.send("추가 실패");
        } else {
            res.send("추가 성공");
        }

    });

});


module.exports = router;