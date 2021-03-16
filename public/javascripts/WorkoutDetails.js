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
  }
}
