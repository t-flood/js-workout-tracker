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
        this.loading = false;
        this.error = error;
        this.render();
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

    const list = document.createElement("div");
    list.classList.add("list-group");
    this.element.appendChild(list);

    this.workouts.forEach((workout) => {
      const link = createLink(
        workout.date
          ? `${workout.name}: ${new Date(workout.date).toLocaleDateString()}`
          : workout.name,
        `/workouts/${workout.id}`
      );
      link.classList.add("list-group-item");
      list.appendChild(link);
    });
  }
}
