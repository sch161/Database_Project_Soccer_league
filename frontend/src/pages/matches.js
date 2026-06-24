export async function renderMatches() {
    const content = document.querySelector("#content");

    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1>경기 관리</h1>
                <p id="matchCount">총 0경기</p>
            </div>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>시즌</th>
                        <th>홈팀</th>
                        <th>스코어</th>
                        <th>원정팀</th>
                        <th>결과</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody id="matchTableBody"></tbody>
            </table>
        </div>
    `;

    await loadMatches();
}

async function loadMatches() {
    try {
        const res = await fetch(
            "http://localhost:3000/matches"
        );

        const matches = await res.json();

        document.getElementById(
            "matchCount"
        ).textContent =
            `총 ${matches.length}경기`;

        const tbody =
            document.getElementById(
                "matchTableBody"
            );

        tbody.innerHTML = "";

        matches.forEach((match) => {

            let result = "무승부";

            if (
                match.home_score >
                match.away_score
            ) {
                result = "홈승";
            } else if (
                match.home_score <
                match.away_score
            ) {
                result = "원정승";
            }

            tbody.innerHTML += `
                <tr>
                    <td>#${match.id}</td>

                    <td>
                        ${match.season_name}
                    </td>

                    <td>
                        ${match.home_team}
                    </td>

                    <td>
                        ${match.home_score}
                        :
                        ${match.away_score}
                    </td>

                    <td>
                        ${match.away_team}
                    </td>

                    <td>
                        ${result}
                    </td>
                </tr>
            `;
        });

        document
            .querySelectorAll(".delete-btn")
            .forEach((btn) => {

                btn.addEventListener(
                    "click",
                    () => {
                        deleteMatch(
                            btn.dataset.id
                        );
                    }
                );

            });

    } catch (err) {
        console.error(err);
    }
}

async function deleteMatch(id) {

    if (
        !confirm(
            "정말 삭제하시겠습니까?"
        )
    ) {
        return;
    }

    try {

        await fetch(
            `http://localhost:3000/matches/${id}`,
            {
                method: "DELETE",
            }
        );

        loadMatches();

    } catch (err) {

        console.error(err);

        alert("삭제 실패");

    }

}