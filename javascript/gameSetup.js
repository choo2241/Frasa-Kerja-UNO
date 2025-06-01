document.getElementById("draw-card-btn").addEventListener("click", function () {
  if (currentPlayer === "A") {
    const hand = playerHands[currentPlayer];
    drawCards(currentPlayer, 2);
    updatePlayerHandDisplay(currentPlayer, hand);
    resetUserSelection(currentPlayer);
    nextTurn();
  } else {
    alert("Bukan giliran Anda!");
  }
});

document.getElementById("draw-require-card-btn").onclick = function () {
  console.log(`玩家 A 选择抽 ${drawCount} 张牌！`);
  for (let i = 0; i < drawCount; i++) {
    const newCard = generateCard();
    nextPlayerHand.push(newCard);
  }
  choosePlayCard = false;

  document.getElementById("draw-require-card-btn").style.display = "none";
  document.getElementById("draw-card-btn").style.display = "inline-block";
  updatePlayerHandDisplay(nextPlayer, playerHands[nextPlayer]);
  nextTurn();
};

function updateScore(player) {
  if (player == "A") {
    document.getElementById(`score-${player}`).innerText =
      ": " + playerScores[player] + " mata";
  } else {
    document.getElementById(`score-${player}`).innerText =
      "Pemain " + player + ": " + playerScores[player] + " mata";
  }

  if (playerScores[player] >= 40) {
    window.location.href = "win.html";
  }
}

const discardPileDiv = document.querySelector(".discard-pile img");
function updateDiscardPile(cards) {
  const discardPileDiv = document.getElementById("discard-pile-cards");

  if (!Array.isArray(cards)) {
    cards = [cards];
  }

  
  discardPile.push(...cards);


  while(discardPile.length > 8) {
    discardPile.shift();
  }


  discardPileDiv.innerHTML = "";
  discardPile.forEach((card) => {
    const img = document.createElement("img");
    img.src = `${imageBasePath}${card.cardType}${card.cardValue}.png`;
    img.alt = `Card: ${card.cardType}${card.cardValue}`;
    discardPileDiv.appendChild(img);
  });
}



function updateLastCard(player, removedCards) {
  const lastCardDiv = document.getElementById("last-player-card");

  if (player == "A") {
    document.getElementById("last-player-name").innerText =
      playerPlaying + " :";
  } else {
    document.getElementById("last-player-name").innerText =
      "Pemain " + player + " :";
  }

  if (!Array.isArray(removedCards)) {
    removedCards = [removedCards];
  }

  lastCards.push(...removedCards);
  lastCardDiv.innerHTML = "";
  lastCards.forEach((card) => {
    const img = document.createElement("img");
    img.src = `${imageBasePath}${card.cardType}${card.cardValue}.png`;
    img.alt = `Card: ${card.cardType}${card.cardValue}`;
    if (lastCards.length >2) {
      img.style.marginLeft = "-50px";
      img.style.position = "relative"; // 让整个组往右移
      img.style.left = "30px"; // 右移 80px
    }
    lastCardDiv.appendChild(img);
  });
  lastCards = [];
}



