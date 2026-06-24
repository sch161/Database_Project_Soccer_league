export async function renderStandings() {

    const content =
        document.querySelector("#content");

    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1>순위표</h1>
                <p>리그 순위 현황</p>
            </div>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>팀</th>
                        <th>경기</th>
                        <th>승</th>
                        <th>무</th>
                        <th>패</th>
                        <th>득점</th>
                        <th>실점</th>
                        <th>승점</th>
                    </tr>
                </thead>

                <tbody id="standingsTableBody"></tbody>
            </table>
        </div>
    `;

    await loadStandings();
}

async function loadStandings() {

    try {

        const res = await fetch(
            "http://localhost:3000/standings"
        );

        const standings =
            await res.json();

        const tbody =
            document.getElementById(
                "standingsTableBody"
            );

        tbody.innerHTML = "";

        standings.forEach((team, index) => {

            tbody.innerHTML += `
                <tr>
                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${team.team_name}
                    </td>

                    <td>
                        ${team.played}
                    </td>

                    <td>
                        ${team.win}
                    </td>

                    <td>
                        ${team.draw}
                    </td>

                    <td>
                        ${team.loss}
                    </td>

                    <td>
                        ${team.goals_for ?? 0}
                    </td>

                    <td>
                        ${team.goals_against ?? 0}
                    </td>

                    <td>
                        <strong>
                            ${team.points}
                        </strong>
                    </td>
                </tr>
            `;

        });

    } catch (err) {

        console.error(err);

    }

}