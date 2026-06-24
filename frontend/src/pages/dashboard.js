export async function renderDashboard() {

    const content =
        document.querySelector("#content");

    const [
        teamsRes,
        playersRes,
        matchesRes,
        goalsRes
    ] = await Promise.all([
        fetch("http://localhost:3000/teams"),
        fetch("http://localhost:3000/players"),
        fetch("http://localhost:3000/matches"),
        fetch("http://localhost:3000/goals")
    ]);

    const teams =
        await teamsRes.json();

    const players =
        await playersRes.json();

    const matches =
        await matchesRes.json();

    const goals =
        await goalsRes.json();

    content.innerHTML = `
        <h1>대시보드</h1>

        <div class="dashboard-grid">

            <div class="stat-card">
                <h3>팀</h3>
                <p>${teams.length}</p>
            </div>

            <div class="stat-card">
                <h3>선수</h3>
                <p>${players.length}</p>
            </div>

            <div class="stat-card">
                <h3>경기</h3>
                <p>${matches.length}</p>
            </div>

            <div class="stat-card">
                <h3>골</h3>
                <p>${goals.length}</p>
            </div>

        </div>

        <div class="table-card">
            <h2>최근 경기</h2>

            <table>
                <thead>
                    <tr>
                        <th>홈팀</th>
                        <th>스코어</th>
                        <th>원정팀</th>
                    </tr>
                </thead>

                <tbody>
                    ${matches
            .slice(0, 5)
            .map(
                (match) => `
                            <tr>
                                <td>${match.home_team}</td>

                                <td>
                                    ${match.home_score}
                                    :
                                    ${match.away_score}
                                </td>

                                <td>${match.away_team}</td>
                            </tr>
                        `
            )
            .join("")}
                </tbody>
            </table>
        </div>
    `;
}