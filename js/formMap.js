document.addEventListener("DOMContentLoaded", () => {
  const dealerSelect = document.getElementById("dealerSelect");
  const mapBlock = document.querySelector(".map");
  const formReviw = document.querySelector('.form-reviw');

  function toggleMap() {
    if (dealerSelect.value !== "") {
      mapBlock.style.display = "block";
      formReviw.style.marginLeft = "40px";

    } else {
      mapBlock.style.display = "none";
      formReviw.style.marginLeft = "0px";
    }
  }

  toggleMap();
  dealerSelect.addEventListener("change", toggleMap);
});