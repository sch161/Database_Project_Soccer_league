import { renderSidebar } from "./components/sidebar.js";
import { renderDashboard } from "./pages/dashboard.js";

document.querySelector("#app").innerHTML = `
<div id="layout">
    <aside id="sidebar"></aside>
    <main id="content"></main>
</div>
`;

renderSidebar();
renderDashboard();