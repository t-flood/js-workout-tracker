class WorkoutDetails {
  constructor(element, id) {
    this.element = element;
    this.id = id;
    this.workout = undefined;
    this.loading = false;
    this.error = undefined;

    // The exercise that we're currently editing
    this.currentExercise = undefined;
  }

  fetchAndRender() {
    this.loading = true;
    this.render();

    fetch(baseUrl + `/workouts/${this.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.loading = false;
        this.workout = data;
        this.render();
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
        this.error = error;
        this.render();
      });
  }

  submitExercise() {
    const name = document.getElementById("exercise_name");
    const sets = document.getElementById("exercise_sets");
    const reps = document.getElementById("exercise_reps");
    const weight = document.getElementById("exercise_weight");
    const notes = document.getElementById("exercise_notes");

    const params = {
      exercise: {
        workout_id: this.id,
        name: name.value,
        sets: sets.value,
        reps: reps.value,
        weight: weight.value,
        notes: notes.value,
      },
    };

    if (this.currentExercise) {
      this.updateExercise(params);
    } else {
      this.createExercise(params);
    }
  }

  deleteWorkout() {
    fetch(baseUrl + "/workouts/" + this.id, {
      method: "DELETE",
    }).then(() => router.navigate(`/`));
  }

  createExercise(params) {
    fetch(baseUrl + "/exercises", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((exercise) => {
        this.workout.exercises.push(exercise);
        this.render();
      });
  }

  updateExercise(params) {
    fetch(baseUrl + "/exercises/" + this.currentExercise.id, {
      body: JSON.stringify(params),
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((exercise) => {
        const index = this.workout.exercises.findIndex(
          (e) => e.id === exercise.id
        );

        this.workout.exercises[index] = exercise;
        this.currentExercise = undefined;
        this.render();
      });
  }

  editExercise(exercise) {
    this.currentExercise = exercise;
    this.render();
  }

  render() {
    this.element.innerHTML = "<h1>Workout</h1>";

    if (this.loading) {
      this.element.innerHTML += `<p>Loading...</p>`;
      return;
    }

    if (this.error) {
      this.element.innerHTML += `<p>Error: ${this.error.message}</p>`;
      return;
    }

    const title = document.createElement("h4");
    title.innerText = `${this.workout.name}: ${new Date(
      this.workout.date
    ).toLocaleDateString()}`;
    this.element.appendChild(title);

    const notes = document.createElement("p");
    notes.innerText = this.workout.notes;
    this.element.appendChild(notes);

    const exerciseList = document.createElement("ul");
    exerciseList.classList.add("list-group");
    this.element.appendChild(exerciseList);

    this.workout.exercises.forEach((exercise) => {
      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.classList.add("btn", "btn-warning");
      editButton.addEventListener("click", () => this.editExercise(exercise));

      const item = document.createElement("li");
      item.classList.add("list-group-item");
      item.innerText = `${exercise.name}: ${exercise.reps} x ${exercise.sets} @ ${exercise.weight}lbs: ${exercise.notes}   `;
      exerciseList.appendChild(item);
      item.append(editButton);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete workout";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => this.deleteWorkout());
    this.element.appendChild(deleteButton);

    const form = document.createElement("form");
    const values = this.currentExercise || {
      name: "",
      reps: "",
      sets: "",
      weight: "",
      notes: "",
    };

    form.innerHTML = `
      <div class="mb-3">
        <label for="exercise_name" class="form-label">Name</label>
        <input type="text" class="form-control" id="exercise_name" value="${values.name}">
      </div>

      <div class="mb-3">
        <label for="exercise_sets" class="form-label">Sets</label>
        <input type="number" class="form-control" id="exercise_sets" value="${values.sets}">
      </div>

      <div class="mb-3">
        <label for="exercise_reps" class="form-label">Reps</label>
        <input type="number" class="form-control" id="exercise_reps" value="${values.reps}">
      </div>

      <div class="mb-3">
        <label for="exercise_weight" class="form-label">Weight</label>
        <input type="number" class="form-control" id="exercise_weight" value="${values.weight}">
      </div>

      <div class="mb-3">
        <label for="exercise_notes" class="form-label">Notes</label>
        <textarea class="form-control" id="exercise_notes" rows="3" value="${values.notes}"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
    `;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submitExercise();
    });

    this.element.appendChild(form);
  }
}
