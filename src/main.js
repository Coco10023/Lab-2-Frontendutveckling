const url = "https://webbutveckling.miun.se/files/ramschema.json";

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("search");
const headers = document.querySelectorAll("th[data-sort]");

let courses = [];
let sortKey = "code";
let sortAsc = true;

// FETCH + async/await + try/catch
async function fetchCourses() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Nätverksfel");
    }

    courses = await response.json();
    renderTable();
  } catch (error) {
    console.error("Fel vid hämtning av data:", error);
    tableBody.innerHTML = 
      "<tr><td colspan='3'>Kunde inte hämta data</td></tr>";
    console.error(error);
  }
}

