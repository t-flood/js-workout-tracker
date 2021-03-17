const baseUrl = "http://localhost:3000/api";
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

document.addEventListener("DOMContentLoaded", function () {
  const main = document.getElementById("main");

  router.on("/workouts/new", (route) => {
    const form = new WorkoutForm(main);
    form.render();
  });

  router.on("/workouts/:id", (route) => {
    const page = new WorkoutDetails(main, route.data.id);
    page.fetchAndRender();
  });

  router.on("/", () => {
    const list = new WorkoutList(main);
    list.fetchAndRender();
  });

  router.resolve();
});
