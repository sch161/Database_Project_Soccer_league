const express = require("express");

const router = express.Router();

const db = require("../db");


// 팀 조회
// 팀 조회
router.get("/", (req, res) => {

    const sql = `
        SELECT
            t.id,
            t.team_name,
            r.region_name,

            COUNT(p.id) AS player_count

        FROM teams t

        JOIN regions r
        ON t.region_id = r.id

        LEFT JOIN players p
        ON p.team_id = t.id

        GROUP BY
            t.id,
            t.team_name,
            r.region_name
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


// 팀 추가
router.post("/", (req, res) => {

    const {
        team_name,
        region_id
    } = req.body;

    const sql = `
        INSERT INTO teams
        (
            team_name,
            region_id
        )
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [team_name, region_id],
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