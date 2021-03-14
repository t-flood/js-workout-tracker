let exercise = [];
const baseUrl = "http://localhost:3000";
function main() {
  return document.getElementById("main");
}

function exercises() {
  return document.getElementById("exercises");
}

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

function form() {
  return document.getElementById("form");
}

function getExercises() {
  fetch(baseUrl + "/exercises")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      exercise = data;
      renderExercises();
    });
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

  let strongParams = {
    exercise: {
      name: nameInput().value,
      sets: setsInput().value,
      reps: repsInput().value,
      weight: weightInput().value,
      notes: notesInput().value,
    },
  };
  fetch(baseUrl + "/exercises", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(strongParams),
    method: "POST",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  renderExercises();
  renderForm();
}

function exercisesTemplate() {
  return `
  <div>
    <h2>List of Exercises</h2>
  </div>`;
}

function renderExercise(exercise) {
  let div = document.createElement("div");
  let name = document.createElement("h4");
  let sets = document.createElement("h4");
  let reps = document.createElement("h4");
  let weight = document.createElement("h4");
  let notes = document.createElement("p");

  let exercisesDiv = document.getElementById("exercises");

  name.innerText = `Name: ${exercise.name}`;
  sets.innerText = `Sets: ${exercise.sets}`;
  reps.innerText = `Reps: ${exercise.reps}`;
  weight.innerText = `Weight: ${exercise.weight}`;
  notes.innerText = `Notes: ${exercise.notes}`;

  div.appendChild(name);
  div.appendChild(sets);
  div.appendChild(reps);
  div.appendChild(weight);
  div.appendChild(notes);

  exercisesDiv.appendChild(div);
}

function renderExercises() {
  //resetMain();
  exercises().innerHTML = exercisesTemplate();

  exercise.forEach(function (exercise) {
    renderExercise(exercise);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderForm();
  getExercises();
  renderExercises();
});
