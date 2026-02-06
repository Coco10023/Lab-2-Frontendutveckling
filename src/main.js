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
    tableBody.innerHTML = "<tr><td colspan='3'>Kunde inte hämta data</td></tr>";
  }
}

// Render + filtrering + sortering
function renderTable() {
  const searchValue = searchInput.value.toLowerCase();

  const filteredCourses = courses.filter(course =>
    course.code.toLowerCase().includes(searchValue) ||
    course.coursename.toLowerCase().includes(searchValue)
  )
  .sort((a, b) => {
    const aVal = a[sortKey].toLowerCase();
    const bVal = b[sortKey].toLowerCase();
    
    return sortAsc
    ? aVal.localeCompare(bVal)
    : bVal.localeCompare(aVal);
  });

  tableBody.innerHTML = filteredCourses.map(course => `
    <tr>
      <td>${course.code}</td>
      <td>${course.coursename}</td>
      <td>${course.progression}</td>
    </tr>
  `).join("");
}

// Live-filtrering
searchInput.addEventListener("input", renderTable);

// Sortering vid klick
headers.forEach(header => {
  header.addEventListener("click", () => {
    const key = header.dataset.sort;

    if (key === sortKey) {
      sortAsc = !sortAsc;
    } else {
      sortKey = key;
      sortAsc = true;
    }

    renderTable();
  });
})

fetchCourses();

