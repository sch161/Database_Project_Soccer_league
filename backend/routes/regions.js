const express = require("express");

const router = express.Router();

const db = require("../db");


// 전체 조회
router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM regions
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


// 추가
router.post("/", (req, res) => {

    const { region_name } = req.body;

    const sql = `
        INSERT INTO regions (region_name)
        VALUES (?)
    `;

    db.query(sql, [region_name], (err, result) => {

        if (err) {
            console.log(err);
            res.send("추가 실패");
        } else {
            res.send("추가 성공");
        }

    });

});


module.exports = router;