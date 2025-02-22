const bank = [];
const odds = [];
const evens = [];

function addNumberToBank() {
  if (typeof n !== "number") return;

  bank.push(n);
  render();
}

function moveNumberFromBank() {
  if (bank.length === 0) return;
  const n = bank.shift();
  if (n % 2 === 0) {
    evens.push(n);
  } else {
    odds.push(n);
  }
  render();
}

// === Components ===

function NumberFormA() {
  const $form = document.createElement("form");

  $form.innerHTML = `
    <label>
      Add a number to the bank
      <input name="number" type="number" />
    </label>
    <button id="add" type="button">Add number</button>
    <button id="sort1">Sort 1</button>
    <button id="sortAll">Sort All</button>
  `;

  const $add = $form.querySelector("#add");
  $add.addEventListener("click", () => {
    const data = new FormData($form);
    const number = data.get("number");
    addNumberToBank(Number(number));
  });

  const $sort1 = $form.querySelector("#sort1");
  $sort1.addEventListener("click", moveNumberFromBank);

  const $sortAll = $form.querySelector("#sortAll");
  $sortAll.addEventListener("click", () => {
    while (bank.length > 0) {
      moveNumberFromBank();
    }
  });

  return $form;
}

function NumberForm() {
  const $form = document.createElement("form");

  $form.innerHTML = `
    <label>
      Add a number to the bank
      <input name="number" type="number" />
    </label>
    <button value="add">Add number</button>
    <button value="sort1">Sort 1</button>
    <button value="sortAll">Sort All</button>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = event.submitter.value;
    if (action === "add") {
      const data = new FormData($form);
      const number = data.get("number");
      addNumberToBank(+number);
    } else if (action === "sort1") {
      moveNumberFromBank();
    } else if (action === "sortAll") {
      while (bank.length > 0) {
        moveNumberFromBank();
      }
    }
  });

  return $form;
}

function Numbers(numbers) {
  const $numbers = document.createElement("p");
  $numbers.classList.add("numbers");
  const $numberSpans = [];
  for (const number of numbers) {
    const $number = document.createElement("span");
    $number.textContent = number;
    $numberSpans.push($number);
  }

  $numbers.replaceChildren(...$numberSpans);

  return $numbers;
}

function NumberList(title, numbers) {
  const $section = document.createElement("section");

  $section.innerHTML = `
    <h2>${title}</h2>
    <Numbers></Numbers>
  `;

  $section.querySelector("Numbers").replaceWith(Numbers(numbers));

  return $section;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
    <NumberForm></NumberForm>
    <NumberList id="bank"></NumberList>
    <NumberList id="odds"></NumberList>
    <NumberList id="evens"></NumberList>
  `;
  $app.querySelector("NumberForm").replaceWith(NumberForm());
  $app.querySelector("NumberList#bank").replaceWith(NumberList("Bank", bank));
  $app.querySelector("NumberList#odds").replaceWith(NumberList("Odds", odds));
  $app
    .querySelector("NumberList#evens")
    .replaceWith(NumberList("Evens", evens));
}

render();
