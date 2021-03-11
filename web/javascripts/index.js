const exercise = [];

const list = () => {
  return document.getElementById("list");
};

const main = () => {
  return document.getElementById("main");
};

function nameInput() {
  return document.getElementById("name");
}

function setsInput() {
  return document.getElementById("sets");
}

function repsInput() {
  return document.getElementById("reps");
}

function weightInput() {
  return document.getElementById("weight");
}

function notesInput() {
  return document.getElementById("notes");
}

function resetFormInputs() {
  nameInput().innerHTML = "";
  setsInput().innerHTML = "";
  repsInput().innerHTML = "";
  weightInput().innerHTML = "";
  notesInput().innerHTML = "";
}

const resetMain = () => {
  main().innerHTML = "";
};

function form() {
  return document.getElementById("form");
}

const formTemplate = () => {
  return `
  <form id="form">
  <div class="input-field">
  <label for="title">Exercise</label>
  <input type="text" name="name" id="name" />
  <label for="sets">Sets</label>
  <input type="text" name="sets" id="sets" />
  <label for="reps">Reps</label>
  <input type="text" name="reps" id="reps" />
  <label for="reps">Weight</label>
  <input type="text" name="weight" id="weight" />
  <label for="notes">Notes</label>
  <input type="text" name="notes" id="notes" />
  <input type="submit" />
  </div>
</form>`;
};

function renderForm() {
  resetMain();
  main().innerHTML = formTemplate();
  form().addEventListener("submit", submitForm);
}

function submitForm(event) {
  event.preventDefault();

  exercise.push({
    name: nameInput().value,
    sets: setsInput().value,
    reps: repsInput().value,
    weight: weightInput().value,
    notes: notesInput().value,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderForm();
});
