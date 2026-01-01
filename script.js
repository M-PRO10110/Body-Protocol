const days = 14;

const habitOrder = [
  "Exercise",
  "Nutrition",
  "Sleep",
  "Posture",
  "Mindset"
];

const habitTasks = {
  Exercise: [
    ["Push-ups 4×12", "Pike push-ups 4×10", "Inverted rows 4×8"],
    ["Squats 4×15", "Lunges 3×12/leg", "Calf raises 4×20"],
    ["Rest day"],
    ["Archer push-ups 4×8", "Diamond push-ups 4×10", "Chair dips 3×12"],
    ["Jump squats 4×12", "Bulgarian split squats 3×10", "Glute bridges 4×15"],
    ["Rest day"],
    ["Leg raises 3×12", "Russian twists 3×20", "Superman holds 3×20s"],
    ["Decline push-ups 4×10", "Pike push-ups 4×12", "Inverted rows 4×10"],
    ["Squats 5×12", "Reverse lunges 3×12/leg", "Single-leg calf raises 4×15"],
    ["Rest day"],
    ["Archer push-ups 4×10", "Diamond push-ups 4×12", "Chair dips 3×12"],
    ["Step-ups 3×12/leg", "Jump lunges 3×10/leg", "Glute bridge march 3×15"],
    ["Rest day"],
    ["Plank 3×45s", "Side plank 3×30s", "Bird-dog 3×12"]
  ],

  Nutrition: Array.from({ length: days }, () => [
    "High-protein (~100g)",
    "Calcium & minerals",
    "Water 2–3L"
  ]),

  Sleep: Array.from({ length: days }, () => [
    "Sleep 8–10 hours",
    "Sleep around 22:30",
    "No phone 60 min before bed"
  ]),

  Posture: Array.from({ length: days }, () => [
    "Wall posture check (2×60s)",
    "Neck stretches",
    "Scapular squeeze"
  ]),

  Mindset: Array.from({ length: days }, () => [
    "5-minute body reflection"
  ])
};

const tbody = document.querySelector("#habitTable tbody");
const progressText = document.getElementById("progressText");

function updateProgress() {
  const all = document.querySelectorAll("input[type='checkbox']").length;
  const done = document.querySelectorAll("input[type='checkbox']:checked").length;
  const percent = Math.round((done / all) * 100);

  progressText.textContent = `Completed: ${done} / ${all} tasks (${percent}%)`;
  document.getElementById("progressBar").style.width = percent + "%";

  highlightCompletedDays();
}

function highlightCompletedDays() {
  const rows = document.querySelectorAll("#habitTable tbody tr");

  for (let day = 0; day < days; day++) {
    let allTasks = [];
    let doneTasks = [];

    rows.forEach(row => {
      const cell = row.children[day + 1];
      allTasks.push(...cell.querySelectorAll("input[type='checkbox']"));
      doneTasks.push(...cell.querySelectorAll("input[type='checkbox']:checked"));
    });

    rows.forEach(row => {
      const cell = row.children[day + 1];
      cell.classList.toggle(
        "day-complete",
        allTasks.length > 0 && allTasks.length === doneTasks.length
      );
    });
  }
}

habitOrder.forEach(habit => {
  const row = document.createElement("tr");

  const habitCell = document.createElement("td");
  habitCell.textContent = habit;
  habitCell.className = "habit-name";
  row.appendChild(habitCell);

  for (let d = 0; d < days; d++) {
    const cell = document.createElement("td");

    habitTasks[habit][d].forEach((task, t) => {
      const div = document.createElement("div");
      div.className = "task-item";

      const cb = document.createElement("input");
      cb.type = "checkbox";

      const key = `${habit}-${d}-${t}`;
      cb.checked = localStorage.getItem(key) === "true";

      cb.addEventListener("change", () => {
        localStorage.setItem(key, cb.checked);
        updateProgress();
      });

      const label = document.createElement("span");
      label.textContent = task;

      div.appendChild(cb);
      div.appendChild(label);
      cell.appendChild(div);
    });

    row.appendChild(cell);
  }

  tbody.appendChild(row);
});

updateProgress();
