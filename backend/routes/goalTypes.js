const express = require("express");

const router = express.Router();

const db = require("../db");


// 골 타입 조회
router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM goal_types
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


// 골 타입 추가
router.post("/", (req, res) => {

    const { type_name } = req.body;

    const sql = `
        INSERT INTO goal_types (type_name)
        VALUES (?)
    `;

    db.query(sql, [type_name], (err, result) => {

        if (err) {
            console.log(err);
            res.send("추가 실패");
        } else {
            res.send("추가 성공");
        }

    });

});


module.exports = router;