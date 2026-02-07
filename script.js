// alert("hello world")
// console.log("code is runnning")
// var a = prompt("enter your number")
// var istrue=confirm("are you sure to leave this page")
// if (istrue){
//     console.log("computer is blasting")

// }
// else{
//     console.log("computer is not blasting")
// }
// console.log("your number is" +a)
const pairs = [
  ["🌞","🌙"], ["🐱","🐟"], ["🍎","🍏"], ["⚽","🥅"],
  ["🚗","🛣️"], ["📚","✏️"], ["🎵","🎤"], ["🔥","💧"]
];

let board = document.getElementById("game-board");
let attempts = 0, matches = 0;
let firstCard = null;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function initGame() {
  board.innerHTML = "";
  attempts = 0; matches = 0;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("matches").textContent = matches;

  let deck = shuffle(pairs.flat());
  deck.forEach(symbol => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.textContent = "?";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard(e) {
  let card = e.target;
  if (card.classList.contains("flipped")) return;

  card.textContent = card.dataset.symbol;
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
  } else {
    attempts++;
    document.getElementById("attempts").textContent = attempts;

    if (checkPair(firstCard.dataset.symbol, card.dataset.symbol)) {
      matches++;
      document.getElementById("matches").textContent = matches;
      firstCard = null;
    } else {
      setTimeout(() => {
        firstCard.textContent = "?";
        card.textContent = "?";
        firstCard.classList.remove("flipped");
        card.classList.remove("flipped");
        firstCard = null;
      }, 1000);
    }
  }
}

function checkPair(a, b) {
  return pairs.some(pair => pair.includes(a) && pair.includes(b));
}

document.getElementById("restart").addEventListener("click", initGame);

initGame();
