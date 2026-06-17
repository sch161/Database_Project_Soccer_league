import { renderDashboard } from "../pages/dashboard.js";
import { renderTeams } from "../pages/teams.js";
import { renderPlayers } from "../pages/players.js";
import { renderMatches } from "../pages/matches.js";
import { renderGoals } from "../pages/goals.js";
import { renderStandings } from "../pages/standings.js";
import { renderScorers } from "../pages/scorers.js";

export function renderSidebar() {
    document.querySelector("#sidebar").innerHTML = `
        <h2 class="logo">⚽ Soccer League</h2>

        <button id="dashboardBtn">대시보드</button>
        <button id="teamsBtn">팀 관리</button>
        <button id="playersBtn">선수 관리</button>
        <button id="matchesBtn">경기 관리</button>
        <button id="goalsBtn">골 기록</button>
        <button id="standingsBtn">순위표</button>
        <button id="scorersBtn">득점 순위</button>
    `;

    document.getElementById("dashboardBtn").onclick = renderDashboard;
    document.getElementById("teamsBtn").onclick = renderTeams;
    document.getElementById("playersBtn").onclick = renderPlayers;
    document.getElementById("matchesBtn").onclick = renderMatches;
    document.getElementById("goalsBtn").onclick = renderGoals;
    document.getElementById("standingsBtn").onclick = renderStandings;
    document.getElementById("scorersBtn").onclick = renderScorers;
}