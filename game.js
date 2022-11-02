let randomNumber = Math.round(Math.random() * 100);
console.log(randomNumber);

let score = 10;

let topScore = localStorage.getItem("topScore") || 0;
document.querySelector(".top-score").textContent = topScore;

document.querySelector(".check-btn").addEventListener("click", () => {
  const guessInput = Number(document.querySelector(".guess-input").value);
  const msg = document.querySelector(".msg");
  const body = document.querySelector("body");

  if (!guessInput) {
    msg.innerText = "Please enter your guess";
  } else if (randomNumber === guessInput) {
    msg.innerHTML = `Congratulations! You Win... <i class="fa-solid fa-face-grin-hearts fa-2x"></i>`;
    body.className = "bg-success";
    document.querySelector(".check-btn").disabled = true;

    if (score >= topScore) {
      localStorage.setItem("topScore", score);
      document.querySelector(".top-score").textContent = score;
    }

    document.querySelector(".secret-number").textContent = randomNumber;
  } else {
    score--;
    if (score > 0) {
      guessInput > randomNumber
        ? (msg.innerHTML = `<i class="fa-solid fa-arrow-trend-down fa-2x"></i> DECREASE `)
        : (msg.innerHTML = `<i class="fa-solid fa-arrow-trend-up fa-2x"></i> INCREASE `);
      document.querySelector(".guess-input").value = "";
    } else {
      msg.innerHTML = `"Sorry you lost" <i class="fa-regular fa-face-sad-tear fa-2x"></i>`;
      body.className = "bg-danger";
      document.querySelector(".check-btn").disabled = true;
      document.querySelector(".secret-number").textContent = randomNumber;
    }

    document.querySelector(".score").textContent = score;
  }
});

document.querySelector(".again-btn").addEventListener("click", () => {
  score = 10;
  document.querySelector(".score").textContent = score;
  randomNumber = Math.round(Math.random() * 100);
  console.log(randomNumber);
  document.querySelector(".check-btn").disabled = false;
  document.querySelector(".secret-number").textContent = "?";
  document.querySelector("body").classList.remove("bg-success", "bg-danger");
  document.querySelector(".guess-input").value = "";
  document.querySelector(".msg").innerText = `Starting..`;
});

document.querySelector(".guess-input").addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    document.querySelector(".check-btn").click();
  }
});
