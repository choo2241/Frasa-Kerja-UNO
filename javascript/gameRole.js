let currentPlayer = "A";
let turnOrderReversed = false;
let skipOnePlayer = false;

function getNextPlayerIndex(currentIndex, step = 1) {
  const direction = turnOrderReversed ? -1 : 1;
  return (currentIndex + direction * step + players.length) % players.length;
}

function nextTurn() {
  let currentIndex = players.indexOf(currentPlayer);
  checkIsGame(currentPlayer);

  const step = skipOnePlayer ? 2 : 1;
  currentPlayer = players[getNextPlayerIndex(currentIndex, step)];

  if (skipOnePlayer) {
    console.log(`现在轮到 ${currentPlayer}！`);
    skipOnePlayer = false;
  }

  if (currentPlayer === "A") {
    console.log(`回合结束，等待玩家 A 行动！`);
    document.getElementById(`your-turn`).innerText = "~Giliran Anda~";
    if (plusCard) {
      alert(
        `Giliranmu. Pemain harus memilih kelua kad +2 atau +4. Kalau tidak ambil ${totalCardsCount} kad！`
      );

      document.getElementById("draw-card-btn").style.display = "none";
      document.getElementById("draw-require-card-btn").style.display =
        "inline-block";

      plusCard = true;

      document.getElementById("draw-require-card-btn").onclick = function () {
        console.log(`玩家 A 选择抽 ${totalCardsCount} 张牌！`);
        for (let i = 0; i < totalCardsCount; i++) {
          const newCard = generateCard();
          playerHands[currentPlayer].push(newCard);
        }
        plusCard = false;
        totalCardsCount = 0;

        document.getElementById("draw-require-card-btn").style.display = "none";
        document.getElementById("draw-card-btn").style.display = "inline-block";
        updatePlayerHandDisplay(currentPlayer, playerHands[currentPlayer]);
        nextTurn();
      };
    }
  } else if (currentPlayer != "A") {
    document.getElementById(`your-turn`).innerText = "";
    setTimeout(() => {
      playTurn(currentPlayer);
      nextTurn();
    }, 1000);
  }
}
