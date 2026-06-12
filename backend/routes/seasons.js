const express = require("express");

const router = express.Router();

const db = require("../db");


// 시즌 전체 조회
router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM seasons
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            res.send("조회 실패");
        } else {
            res.json(result);
        }

    });

});


// 시즌 추가
router.post("/", (req, res) => {

    const { season_name } = req.body;

    const sql = `
        INSERT INTO seasons (season_name)
        VALUES (?)
    `;

    db.query(sql, [season_name], (err, result) => {

        if (err) {
            console.log(err);
            res.send("추가 실패");
        } else {
            res.send("추가 성공");
        }

    });

});


module.exports = router;