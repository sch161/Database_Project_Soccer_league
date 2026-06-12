const express = require("express");

const router = express.Router();

const db = require("../db");


// 골 기록 조회
router.get("/", (req, res) => {

    const sql = `
        SELECT
            g.id,

            p.player_name,

            gt.type_name,

            m.id AS match_id,

            g.minute

        FROM goals g

        JOIN players p
        ON g.player_id = p.id

        JOIN goal_types gt
        ON g.goal_type_id = gt.id

        JOIN matches m
        ON g.match_id = m.id
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


// 골 기록 추가
router.post("/", (req, res) => {

    const {
        match_id,
        player_id,
        goal_type_id,
        minute
    } = req.body;

    const sql = `
        INSERT INTO goals
        (
            match_id,
            player_id,
            goal_type_id,
            minute
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            match_id,
            player_id,
            goal_type_id,
            minute
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("추가 실패");
            } else {
                res.send("추가 성공");
            }

        }
    );

});


module.exports = router;