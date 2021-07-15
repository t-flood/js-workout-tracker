class WorkoutForm {
  constructor(element) {
    this.element = element;
  }

  submit() {
    const name = document.getElementById("workout_name");
    const date = document.getElementById("workout_date");
    const notes = document.getElementById("workout_notes");

    const params = {
      workout: {
        name: name.value,
        date: date.value,
        notes: notes.value,
      },
    };

    fetch(baseUrl + "/workouts", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      method: "POST",
    })
      .then((response) => response.json())
      .then((workout) => router.navigate(`/workouts/${workout.id}`));
  }

  render() {
    const form = document.createElement("form");

    form.innerHTML = `
      <div class="mb-3">
        <label for="workout_name" class="form-label">Name</label>
        <input type="text" class="form-control" id="workout_name">
      </div>

      <div class="mb-3">
        <label for="workout_date" class="form-label">Date</label>
        <input type="date" class="form-control" id="workout_date">
      </div>

      <div class="mb-3">
        <label for="workout_notes" class="form-label">Notes</label>
        <textarea class="form-control" id="workout_notes" rows="3"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Save</button>
    `;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submit();
    });

    this.element.innerHTML = "";
    this.element.appendChild(form);
  }
}
