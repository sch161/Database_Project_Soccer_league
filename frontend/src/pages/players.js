let showForm = false;
let currentFilter = "ALL";

export async function renderPlayers() {
    const content = document.querySelector("#content");

    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1>선수 관리</h1>
                <p id="playerCount">총 0명 등록됨</p>
            </div>

            <button id="toggleFormBtn" class="primary-btn">
                + 선수 등록
            </button>
        </div>

        <div class="filter-row">
            <button class="filter-btn" data-filter="ALL">
                전체
            </button>

            <button class="filter-btn" data-filter="GK">
                GK
            </button>

            <button class="filter-btn" data-filter="DF">
                DF
            </button>

            <button class="filter-btn" data-filter="MF">
                MF
            </button>

            <button class="filter-btn" data-filter="FW">
                FW
            </button>
        </div>

        <div id="playerFormContainer"></div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>등번호</th>
                        <th>선수명</th>
                        <th>소속팀</th>
                        <th>포지션</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody id="playerTableBody"></tbody>
            </table>
        </div>
    `;

    if (showForm) {
        await renderPlayerForm();
    }

    document
        .getElementById("toggleFormBtn")
        .addEventListener("click", () => {
            showForm = !showForm;
            renderPlayers();
        });

    document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => {
            btn.addEventListener("click", () => {
                currentFilter = btn.dataset.filter;
                loadPlayers();
            });
        });

    await loadPlayers();
}

async function renderPlayerForm() {
    const formContainer =
        document.getElementById("playerFormContainer");

    formContainer.innerHTML = `
        <div class="team-form-card">

            <div class="team-form-header">
                <h2>새 선수 등록</h2>

                <button id="closeFormBtn">
                    ✕
                </button>
            </div>

            <div class="team-form-row">

                <input
                    class="form-input"
                    id="playerName"
                    placeholder="선수 이름"
                >

                <input
                    class="form-input"
                    id="jerseyNumber"
                    type="number"
                    placeholder="등번호"
                >

                <select
                    class="form-select"
                    id="teamSelect"
                >
                    <option value="">
                        팀 선택
                    </option>
                </select>

                <select
                    class="form-select"
                    id="positionSelect"
                >
                    <option value="">
                        포지션 선택
                    </option>
                </select>

                <button
                    id="addPlayerBtn"
                    class="primary-btn"
                >
                    등록
                </button>

            </div>

        </div>
    `;

    await loadTeams();
    await loadPositions();

    document
        .getElementById("addPlayerBtn")
        .addEventListener("click", addPlayer);

    document
        .getElementById("closeFormBtn")
        .addEventListener("click", () => {
            showForm = false;
            renderPlayers();
        });
}

async function loadPlayers() {
    try {
        const res = await fetch(
            "http://localhost:3000/players"
        );

        let players = await res.json();

        if (currentFilter !== "ALL") {
            players = players.filter(
                (player) =>
                    player.position_name === currentFilter
            );
        }

        const tbody =
            document.getElementById("playerTableBody");

        const count =
            document.getElementById("playerCount");

        tbody.innerHTML = "";

        count.textContent =
            `총 ${players.length}명 등록됨`;

        players.forEach((player) => {

            let badgeClass = "";

            if (player.position_name === "GK")
                badgeClass = "gk";

            if (player.position_name === "DF")
                badgeClass = "df";

            if (player.position_name === "MF")
                badgeClass = "mf";

            if (player.position_name === "FW")
                badgeClass = "fw";

            tbody.innerHTML += `
                <tr>
                    <td>#${player.id}</td>

                    <td>
                        ${player.jersey_number}
                    </td>

                    <td>
                        ${player.player_name}
                    </td>

                    <td>
                        ${player.team_name}
                    </td>

                    <td>
                        <span class="${badgeClass}">
                            ${player.position_name}
                        </span>
                    </td>

                    <td>
                        <button
                            class="edit-btn"
                            data-id="${player.id}"
                        >
                            수정
                        </button>

                        <button
                            class="delete-btn"
                            data-id="${player.id}"
                        >
                            삭제
                        </button>
                    </td>
                </tr>
            `;
        });

        document
            .querySelectorAll(".edit-btn")
            .forEach((btn) => {
                btn.addEventListener("click", () => {
                    const player = players.find(
                        p => p.id == btn.dataset.id
                    );

                    openEditModal(player);
                });
            });

        document
            .querySelectorAll(".delete-btn")
            .forEach((btn) => {
                btn.addEventListener("click", () => {
                    deletePlayer(btn.dataset.id);
                });
            });

    } catch (err) {
        console.error(err);
    }
}

async function loadTeams() {
    const res = await fetch(
        "http://localhost:3000/teams"
    );

    const teams = await res.json();

    const select =
        document.getElementById("teamSelect");

    teams.forEach((team) => {
        select.innerHTML += `
            <option value="${team.id}">
                ${team.team_name}
            </option>
        `;
    });
}

async function loadPositions() {
    const res = await fetch(
        "http://localhost:3000/positions"
    );

    const positions = await res.json();

    const select =
        document.getElementById("positionSelect");

    positions.forEach((position) => {
        select.innerHTML += `
            <option value="${position.id}">
                ${position.position_name}
            </option>
        `;
    });
}

async function addPlayer() {
    const playerName =
        document.getElementById("playerName").value;

    const jerseyNumber =
        document.getElementById("jerseyNumber").value;

    const teamId =
        document.getElementById("teamSelect").value;

    const positionId =
        document.getElementById("positionSelect").value;

    if (
        !playerName ||
        !jerseyNumber ||
        !teamId ||
        !positionId
    ) {
        alert("모든 값을 입력하세요.");
        return;
    }

    try {
        await fetch(
            "http://localhost:3000/players",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    player_name: playerName,
                    jersey_number:
                        Number(jerseyNumber),
                    team_id:
                        Number(teamId),
                    position_id:
                        Number(positionId),
                }),
            }
        );

        showForm = false;

        renderPlayers();

    } catch (err) {
        console.error(err);
        alert("등록 실패");
    }
}

async function deletePlayer(id) {
    const ok = confirm(
        "정말 삭제하시겠습니까?"
    );

    if (!ok) return;

    try {
        await fetch(
            `http://localhost:3000/players/${id}`,
            {
                method: "DELETE",
            }
        );

        loadPlayers();

    } catch (err) {
        console.error(err);
        alert("삭제 실패");
    }
}

async function openEditModal(player) {

    const newName = prompt(
        "선수 이름",
        player.player_name
    );

    if (newName === null) return;

    const newNumber = prompt(
        "등번호",
        player.jersey_number
    );

    if (newNumber === null) return;

    try {

        await fetch(
            `http://localhost:3000/players/${player.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    player_name: newName,
                    jersey_number: Number(newNumber),

                    team_id:
                        await getTeamId(
                            player.team_name
                        ),

                    position_id:
                        await getPositionId(
                            player.position_name
                        ),
                }),
            }
        );

        loadPlayers();

    } catch (err) {

        console.error(err);

    }

}

async function getTeamId(teamName) {

    const res = await fetch(
        "http://localhost:3000/teams"
    );

    const teams = await res.json();

    const team =
        teams.find(
            t => t.team_name === teamName
        );

    return team.id;
}

async function getPositionId(positionName) {

    const res = await fetch(
        "http://localhost:3000/positions"
    );

    const positions =
        await res.json();

    const position =
        positions.find(
            p =>
                p.position_name ===
                positionName
        );

    return position.id;
}