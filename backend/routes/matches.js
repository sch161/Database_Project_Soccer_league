const express = require("express");

const router = express.Router();

const db = require("../db");


// 경기 조회
router.get("/", (req, res) => {

    const sql = `
        SELECT
            m.id,

            s.season_name,

            home.team_name AS home_team,

            away.team_name AS away_team,

            m.home_score,
            m.away_score,

            m.match_date

        FROM matches m

        JOIN seasons s
        ON m.season_id = s.id

        JOIN teams home
        ON m.home_team_id = home.id

        JOIN teams away
        ON m.away_team_id = away.id
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


// 경기 추가
router.post("/", (req, res) => {

    const {
        season_id,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        match_date
    } = req.body;

    const sql = `
        INSERT INTO matches
        (
            season_id,
            home_team_id,
            away_team_id,
            home_score,
            away_score,
            match_date
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            season_id,
            home_team_id,
            away_team_id,
            home_score,
            away_score,
            match_date
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