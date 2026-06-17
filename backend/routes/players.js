const express = require("express");

const router = express.Router();

const db = require("../db");


// 선수 조회
router.get("/", (req, res) => {

    const sql = `
        SELECT
            p.id,
            p.player_name,
            p.jersey_number,

            t.team_name,

            pos.position_name

        FROM players p

        JOIN teams t
        ON p.team_id = t.id

        JOIN positions pos
        ON p.position_id = pos.id
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


// 선수 추가
router.post("/", (req, res) => {

    const {
        player_name,
        jersey_number,
        team_id,
        position_id
    } = req.body;

    const sql = `
        INSERT INTO players
        (
            player_name,
            jersey_number,
            team_id,
            position_id
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            player_name,
            jersey_number,
            team_id,
            position_id
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

// 선수 삭제
router.delete("/:id", (req, res) => {

    const playerId = req.params.id;

    db.query(
        "DELETE FROM goals WHERE player_id = ?",
        [playerId],
        (err) => {

            if (err) {
                console.log(err);
                return res.send("골 기록 삭제 실패");
            }

            db.query(
                "DELETE FROM players WHERE id = ?",
                [playerId],
                (err) => {

                    if (err) {
                        console.log(err);
                        res.send("선수 삭제 실패");
                    } else {
                        res.send("삭제 성공");
                    }

                }
            );

        }
    );

});

// 선수 수정
router.put("/:id", (req, res) => {

    const {
        player_name,
        jersey_number,
        team_id,
        position_id
    } = req.body;

    const sql = `
        UPDATE players
        SET
            player_name = ?,
            jersey_number = ?,
            team_id = ?,
            position_id = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            player_name,
            jersey_number,
            team_id,
            position_id,
            req.params.id
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.send("수정 실패");
            } else {
                res.send("수정 성공");
            }

        }
    );

});


module.exports = router;