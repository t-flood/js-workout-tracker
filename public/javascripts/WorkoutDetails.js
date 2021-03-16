class WorkoutDetails {
  constructor(element, id) {
    this.element = element;
    this.id = id;
    this.workout = undefined;
    this.loading = false;
    this.error = undefined;
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
        this.loading = false;
        this.error = error;
        this.render();
      });
  }

  submit() {
    const name = document.getElementById("exercise_name");
    const sets = document.getElementById("exercise_sets");
    const reps = document.getElementById("exercise_reps");
    const weight = document.getElementById("exercise_weight");
    const notes = document.getElementById("exercise_notes");

    // Assemble our params
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

    fetch(baseUrl + "/exercises", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      method: "POST",
    })
      .then((response) => response.json())
      .then((exercise) => {
        this.workout.exercises.push(exercise);
        this.render();
      });
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
    title.innerText = `${this.workout.name}: ${this.workout.date}`;
    this.element.appendChild(title);

    const notes = document.createElement("p");
    notes.innerText = this.workout.notes;
    this.element.appendChild(notes);

    const exerciseList = document.createElement("ul");
    this.element.appendChild(exerciseList);

    this.workout.exercises.forEach((exercise) => {
      const item = document.createElement("li");

      item.innerText = exercise.name;
      exerciseList.appendChild(item);
    });

    const exerciseForm = document.createElement("form");

    exerciseForm.innerHTML = `
      <div class="mb-3">
        <label for="exercise_name" class="form-label">Name</label>
        <input type="text" class="form-control" id="exercise_name">
      </div>

      <div class="mb-3">
        <label for="exercise_sets" class="form-label">Sets</label>
        <input type="number" class="form-control" id="exercise_sets">
      </div>

      <div class="mb-3">
        <label for="exercise_reps" class="form-label">Reps</label>
        <input type="number" class="form-control" id="exercise_reps">
      </div>

      <div class="mb-3">
        <label for="exercise_weight" class="form-label">Weight</label>
        <input type="number" class="form-control" id="exercise_weight">
      </div>

      <div class="mb-3">
        <label for="exercise_notes" class="form-label">Notes</label>
        <textarea class="form-control" id="exercise_notes" rows="3"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
    `;

    exerciseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submit();
    });

    this.element.appendChild(exerciseForm);
  }
}
