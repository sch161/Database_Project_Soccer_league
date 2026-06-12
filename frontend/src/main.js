import { renderSidebar } from "./components/sidebar.js";
import { renderDashboard } from "./pages/dashboard.js";

document.querySelector("#app").innerHTML = `
    <div id="layout"></div>
`;

renderSidebar();
renderDashboard();