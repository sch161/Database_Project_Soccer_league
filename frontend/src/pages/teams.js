let showForm = false;

export async function renderTeams() {
    const content = document.querySelector("#content");

    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1>팀 관리</h1>
                <p id="teamCount">총 0개 팀 등록됨</p>
            </div>

            <button
                id="toggleFormBtn"
                class="primary-btn"
            >
                + 팀 등록
            </button>
        </div>

        <div id="teamFormContainer"></div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>팀 이름</th>
                        <th>지역</th>
                        <th>선수 수</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody id="teamTableBody"></tbody>
            </table>
        </div>
    `;

    if (showForm) {
        await renderTeamForm();
    }

    document
        .getElementById("toggleFormBtn")
        .addEventListener("click", () => {
            showForm = !showForm;
            renderTeams();
        });

    await loadTeams();
}

async function renderTeamForm() {
    const formContainer =
        document.getElementById(
            "teamFormContainer"
        );

    formContainer.innerHTML = `
        <div class="team-form-card">

            <div class="team-form-header">
                <h2>새 팀 등록</h2>

                <button id="closeFormBtn">
                    ✕
                </button>
            </div>

            <div class="team-form-row">

                <input
                    class="form-input"
                    id="teamName"
                    placeholder="팀 이름"
                >

                <select
                    class="form-select"
                    id="regionSelect"
                >
                    <option value="">
                        지역 선택
                    </option>
                </select>

                <button
                    id="addTeamBtn"
                    class="primary-btn"
                >
                    등록
                </button>

            </div>

        </div>
    `;

    await loadRegions();

    document
        .getElementById("addTeamBtn")
        .addEventListener("click", addTeam);

    document
        .getElementById("closeFormBtn")
        .addEventListener("click", () => {
            showForm = false;
            renderTeams();
        });
}

async function loadTeams() {
    try {
        const res = await fetch(
            "http://localhost:3000/teams"
        );

        const teams = await res.json();

        const tbody =
            document.getElementById(
                "teamTableBody"
            );

        const count =
            document.getElementById(
                "teamCount"
            );

        tbody.innerHTML = "";

        count.textContent =
            `총 ${teams.length}개 팀 등록됨`;

        teams.forEach((team) => {
            tbody.innerHTML += `
                <tr>
                    <td>
                        #${String(team.id).padStart(
                3,
                "0"
            )}
                    </td>

                    <td class="team-name">
                        ${team.team_name}
                    </td>

                    <td>
                        <span class="region-badge">
                            ${team.region_name}
                        </span>
                    </td>

                    <td>
                        ${team.player_count}명
                    </td>
                </tr>
            `;
        });

    } catch (err) {
        console.error(err);
    }
}

async function loadRegions() {
    const res = await fetch(
        "http://localhost:3000/regions"
    );

    const regions = await res.json();

    const select =
        document.getElementById(
            "regionSelect"
        );

    regions.forEach((region) => {
        select.innerHTML += `
            <option value="${region.id}">
                ${region.region_name}
            </option>
        `;
    });
}

async function addTeam() {
    const teamName =
        document.getElementById(
            "teamName"
        ).value;

    const regionId =
        document.getElementById(
            "regionSelect"
        ).value;

    if (!teamName || !regionId) {
        alert("모든 값을 입력하세요.");
        return;
    }

    try {
        await fetch(
            "http://localhost:3000/teams",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    team_name: teamName,
                    region_id: Number(
                        regionId
                    ),
                }),
            }
        );

        showForm = false;

        renderTeams();

    } catch (err) {
        console.error(err);
        alert("등록 실패");
    }
}