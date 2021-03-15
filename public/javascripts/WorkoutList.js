class WorkoutList {
  constructor(element) {
    this.element = element;
    this.loading = false;
    this.error = undefined;
    this.workouts = [];
  }

  fetchAndRender() {
    this.loading = true;
    this.render();

    fetch(baseUrl + "/workouts")
      .then((response) => response.json())
      .then((data) => {
        this.loading = false;
        this.workouts = data;
        this.render();
      })
      .catch((error) => {
        this.loading = true;
        this.error = error;
      });
  }

  render() {
    this.element.innerHTML = "<h1>Workouts</h1>";

    if (this.loading) {
      this.element.innerHTML += `<p>Loading...</p>`;
      return;
    }

    if (this.error) {
      this.element.innerHTML += `<p>Error: ${this.error.message}</p>`;
      return;
    }

    this.workouts.forEach((workout) => {
      this.element.innerHTML += workout.name;
    });
  }
}
