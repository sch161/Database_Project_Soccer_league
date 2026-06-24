export async function renderScorers() {

    const content =
        document.querySelector("#content");

    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1>득점 순위</h1>
                <p>선수 득점 랭킹</p>
            </div>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>선수</th>
                        <th>팀</th>
                        <th>득점</th>
                    </tr>
                </thead>

                <tbody id="scorersTableBody"></tbody>
            </table>
        </div>
    `;

    await loadScorers();
}

async function loadScorers() {

    try {

        const res = await fetch(
            "http://localhost:3000/scorers"
        );

        const scorers =
            await res.json();

        const tbody =
            document.getElementById(
                "scorersTableBody"
            );

        tbody.innerHTML = "";

        scorers.forEach((player, index) => {

            let medal = "";

            if (index === 0) {
                medal = "🥇";
            } else if (index === 1) {
                medal = "🥈";
            } else if (index === 2) {
                medal = "🥉";
            }

            tbody.innerHTML += `
                <tr>
                    <td>
                        ${medal}
                        ${index + 1}
                    </td>

                    <td>
                        ${player.player_name}
                    </td>

                    <td>
                        ${player.team_name}
                    </td>

                    <td>
                        <strong>
                            ${player.goals}
                        </strong>
                    </td>
                </tr>
            `;

        });

    } catch (err) {

        console.error(err);

    }

}