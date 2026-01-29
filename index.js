"use strict";

function toastMessage(message, color = "black", duration = 2000) {
      Toastify({
        text: message,
        duration: duration,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: `linear-gradient(to right, ${color}, black)`,
          color: "green",
          border: "1px solid green",
          boxShadow: "0 0 12px rgba(0, 255, 0, 0.6)"
      }
    }).showToast();
  }

  Toastify({
    text: "University Finder API ga xush kelibsiz !",
    duration: 3500,
    gravity: "top",
    position: "center",
    close: true,
    style: {
      background: "linear-gradient(to right, black, black)",
      color: "red",
      border: "1px solid red",
      boxShadow: "0 0 12px rgba(255, 0, 0, 0.6)"
    }
  }).showToast();

  Toastify({
    text: "Assalomu alaykum",
    duration: 3500,
    gravity: "top",
    position: "center",
    close: true,
    style: {
      background: "linear-gradient(to right, black, black)",
      color: "green",
      border: "1px solid green",
      boxShadow: "0 0 12px rgba(0, 255, 0, 0.6)"
    }
  }).showToast();


const api = "http://universities.hipolabs.com/search";
const elList = document.getElementById("universityList");
const loading = document.getElementById("loading");
const notFound = document.getElementById("notFound");
const input = document.getElementById("countryInput");
const btn = document.getElementById("searchBtn");

fetchUniversities("Uzbekistan");

btn.addEventListener("click", () => {
  const country = input.value.trim();
  if (country) {
    fetchUniversities(country);
  }
});

async function fetchUniversities(country) {
  elList.innerHTML = "";
  notFound.classList.add("hidden");
  loading.classList.remove("hidden");

  try {
    const response = await fetch(`${api}?country=${country}`);
    const data = await response.json();
    loading.classList.add("hidden");
    console.log(data);

    if (data.length === 0) {
      notFound.classList.remove("hidden");
      return;
    }
     renderUniversities(data);
    } catch (error) {
    loading.classList.remove("hidden");
    loading.textContent = "Error loading data ❌";
    console.error(error);
  }
}

function renderUniversities(universities) {
  elList.innerHTML = universities.map((university) => `
      <div class="card">
        <h3> ${university.name} </h3>
        <p> <strong> Country: </strong> ${university.country} </p>
        <p> <strong> Domains: </strong> ${university.domains[0]} </p>
        <a href="${university.web_pages[0]}"> ${university.name} </a>
      </div> <!-- card -->`).join("");
}