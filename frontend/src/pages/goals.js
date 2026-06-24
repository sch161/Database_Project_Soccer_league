let showForm = false;

export async function renderGoals() {

    const content =
        document.querySelector("#content");

    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1>골 기록</h1>
                <p id="goalCount">
                    총 0개 기록
                </p>
            </div>

            <button
                id="toggleFormBtn"
                class="primary-btn"
            >
                + 골 기록
            </button>
        </div>

        <div id="goalFormContainer"></div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>경기</th>
                        <th>선수</th>
                        <th>골 종류</th>
                        <th>시간</th>
                    </tr>
                </thead>

                <tbody id="goalTableBody"></tbody>
            </table>
        </div>
    `;

    if (showForm) {
        await renderGoalForm();
    }

    document
        .getElementById("toggleFormBtn")
        .addEventListener("click", () => {

            showForm = !showForm;

            renderGoals();

        });

    await loadGoals();
}

async function renderGoalForm() {

    const formContainer =
        document.getElementById(
            "goalFormContainer"
        );

    formContainer.innerHTML = `
        <div class="team-form-card">

            <div class="team-form-header">
                <h2>골 기록 등록</h2>

                <button id="closeFormBtn">
                    ✕
                </button>
            </div>

            <div class="team-form-row">

                <select
                    id="matchSelect"
                    class="form-select"
                >
                    <option value="">
                        경기 선택
                    </option>
                </select>

                <select
                    id="playerSelect"
                    class="form-select"
                >
                    <option value="">
                        선수 선택
                    </option>
                </select>

                <select
                    id="goalTypeSelect"
                    class="form-select"
                >
                    <option value="">
                        골 종류
                    </option>
                </select>

                <input
                    id="minute"
                    type="number"
                    class="form-input"
                    placeholder="득점 시간"
                >

                <button
                    id="addGoalBtn"
                    class="primary-btn"
                >
                    등록
                </button>

            </div>
        </div>
    `;

    await loadMatches();
    await loadPlayers();
    await loadGoalTypes();

    document
        .getElementById("addGoalBtn")
        .addEventListener(
            "click",
            addGoal
        );

    document
        .getElementById("closeFormBtn")
        .addEventListener(
            "click",
            () => {

                showForm = false;

                renderGoals();

            }
        );
}

async function loadGoals() {

    const res = await fetch(
        "http://localhost:3000/goals"
    );

    const goals =
        await res.json();

    const tbody =
        document.getElementById(
            "goalTableBody"
        );

    const count =
        document.getElementById(
            "goalCount"
        );

    tbody.innerHTML = "";

    count.textContent =
        `총 ${goals.length}개 기록`;

    goals.forEach((goal) => {

        tbody.innerHTML += `
            <tr>
                <td>
                    #${goal.id}
                </td>

                <td>
                    경기 ${goal.match_id}
                </td>

                <td>
                    ${goal.player_name}
                </td>

                <td>
                    ${goal.type_name}
                </td>

                <td>
                    ${goal.minute}'
                </td>
            </tr>
        `;

    });
}

async function loadMatches() {

    const res = await fetch(
        "http://localhost:3000/matches"
    );

    const matches =
        await res.json();

    const select =
        document.getElementById(
            "matchSelect"
        );

    matches.forEach((match) => {

        select.innerHTML += `
            <option value="${match.id}">
                ${match.home_team}
                vs
                ${match.away_team}
            </option>
        `;

    });
}

async function loadPlayers() {

    const res = await fetch(
        "http://localhost:3000/players"
    );

    const players =
        await res.json();

    const select =
        document.getElementById(
            "playerSelect"
        );

    players.forEach((player) => {

        select.innerHTML += `
            <option value="${player.id}">
                ${player.player_name}
            </option>
        `;

    });
}

async function loadGoalTypes() {

    const res = await fetch(
        "http://localhost:3000/goal-types"
    );

    const types =
        await res.json();

    const select =
        document.getElementById(
            "goalTypeSelect"
        );

    types.forEach((type) => {

        select.innerHTML += `
            <option value="${type.id}">
                ${type.type_name}
            </option>
        `;

    });
}

async function addGoal() {

    const matchId =
        document.getElementById(
            "matchSelect"
        ).value;

    const playerId =
        document.getElementById(
            "playerSelect"
        ).value;

    const goalTypeId =
        document.getElementById(
            "goalTypeSelect"
        ).value;

    const minute =
        document.getElementById(
            "minute"
        ).value;

    if (
        !matchId ||
        !playerId ||
        !goalTypeId ||
        !minute
    ) {
        alert(
            "모든 값을 입력하세요."
        );
        return;
    }

    try {

        await fetch(
            "http://localhost:3000/goals",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify({
                    match_id:
                        Number(matchId),

                    player_id:
                        Number(playerId),

                    goal_type_id:
                        Number(goalTypeId),

                    minute:
                        Number(minute),
                }),
            }
        );

        showForm = false;

        renderGoals();

    } catch (err) {

        console.error(err);

        alert("등록 실패");

    }
}