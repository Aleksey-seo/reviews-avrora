document.addEventListener("DOMContentLoaded", () => {
  const dealerSelect = document.getElementById("dealerSelect");
  const mapBlock = document.querySelector(".map");

  function toggleMap() {
    if (dealerSelect.value !== "") {
      mapBlock.style.display = "block";
    } else {
      mapBlock.style.display = "none";
    }
  }

  toggleMap();
  dealerSelect.addEventListener("change", toggleMap);
});