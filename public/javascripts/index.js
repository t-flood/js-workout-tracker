const baseUrl = "http://localhost:3000/api";

function fetchAndRenderExercises() {
  fetch(baseUrl + "/exercises")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderExercises(data);
    });
}

function resetFormInputs() {
  getNameInput().innerHTML = "";
  getSetsInput().innerHTML = "";
  getRepsInput().innerHTML = "";
  getWeightInput().innerHTML = "";
  getNotesInput().innerHTML = "";
}

const resetMain = () => {
  getMainElement().innerHTML = "";
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
  getMainElement().innerHTML = formTemplate();
  getFormElement().addEventListener("submit", submitExercise);
}

function submitExercise(event) {
  event.preventDefault();

  let strongParams = {
    exercise: {
      name: getNameInput().value,
      sets: getSetsInput().value,
      reps: getRepsInput().value,
      weight: getWeightInput().value,
      notes: getNotesInput().value,
      workout_id: 1,
    },
  };
  renderForm();

  fetch(baseUrl + "/exercises", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(strongParams),
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => renderExercise(data));
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

function renderExercises(exercises) {
  //resetMain();
  getExercisesElement().innerHTML = exercisesTemplate();

  exercises.forEach(function (exercise) {
    renderExercise(exercise);
  });
}

const router = new Navigo("/");

function createLink(label, href) {
  const link = document.createElement("a");
  link.innerHTML = label;
  link.href = href;
  link.addEventListener("click", (event) => {
    event.preventDefault();
    router.navigate(href);
  });
  return link;
}

router.on("/workouts/new", (route) => {
  const main = getMainElement();
  const form = new WorkoutForm(main);
  form.render();
});

router.on("/workouts/:id", (route) => {
  const main = getMainElement();
  const page = new WorkoutDetails(main, route.data.id);
  page.fetchAndRender();
});

router.on("/", () => {
  const main = getMainElement();
  const list = new WorkoutList(main);
  list.fetchAndRender();
});

document.addEventListener("DOMContentLoaded", function () {
  router.resolve();
});
