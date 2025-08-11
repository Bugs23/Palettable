let colorsArray = [];
const select = document.querySelector(".select");
const selected = select.querySelector(".select__selected");
const list = select.querySelector(".select__list");
const getColorSchemeBtn = document.getElementById("get-color-scheme-btn");
let selectedScheme = "";

select.addEventListener("click", () => {
  select.classList.toggle("open");
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    selected.textContent = e.target.textContent;
    select.classList.remove("open");
    selectedScheme = e.target.dataset.value;
  }

  return selectedScheme;
});

document.addEventListener("click", (e) => {
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});

getColorSchemeBtn.addEventListener("click", (e) => {
  e.target.blur();
  const chosenColor = document
    .getElementById("color-picker-input")
    .value.slice(1);

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${chosenColor}&mode=${selectedScheme}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      colorsArray = data.colors;
      renderColorsBlocks();
    });
});

function renderColorsBlocks() {
  let colorBlocksHtml = ``;
  for (let color of colorsArray) {
    colorBlocksHtml += `
      <div class="scheme-colors__block">
        <div
          class="scheme-colors__block__color"
          style="background-color: ${color.hex.value}"
        ></div>
        <div class="scheme-colors__block__color-code">${color.hex.value}</div>
      </div>
    `;
  }

  document.getElementById("scheme-colors-container").innerHTML =
    colorBlocksHtml;
}
