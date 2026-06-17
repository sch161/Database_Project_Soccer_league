export function renderDashboard() {
    document.querySelector("#content").innerHTML = `
        <h1>대시보드</h1>

        <div class="cards">
            <div class="card">
                <h3>총 팀 수</h3>
                <p>0</p>
            </div>

            <div class="card">
                <h3>총 선수 수</h3>
                <p>0</p>
            </div>

            <div class="card">
                <h3>총 경기 수</h3>
                <p>0</p>
            </div>

            <div class="card">
                <h3>총 득점 수</h3>
                <p>0</p>
            </div>
        </div>
    `;
}