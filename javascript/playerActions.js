function handleUserCardClick(player, cardIndex) {
  if (currentPlayer !== player) {
    alert("Bukan giliran Anda!");
    return;
  }

  const card = playerHands[player][cardIndex];
  const playerCardsDiv = document.getElementById(`player-${player}-cards`);
  const cardButtons = playerCardsDiv.querySelectorAll("button");
  const selectedCard = cardButtons[cardIndex];

  selectedCard.style.position = "relative";

  const selectedIndex = userSelectedCards.findIndex(
    (selected) => selected.index === cardIndex
  );

  if (selectedIndex !== -1) {
    userSelectedCards.splice(selectedIndex, 1);
    selectedCard.style.marginTop = "0px";
    selectedCard.style.zIndex = "1";

    return;
  }

  userSelectedCards.push({ card, index: cardIndex });
  selectedCard.style.marginTop = "-10px";
  selectedCard.style.zIndex = "100";
}

function resetUserSelection(player) {
  userSelectedCards = [];

  const playerCardsDiv = document.getElementById(`player-${player}-cards`);
  const cardButtons = playerCardsDiv.querySelectorAll("button");

  cardButtons.forEach((button) => {
    button.style.marginTop = "0px";
    button.style.zIndex = "1";
  });
}

function resetCardHighlight(player, cardIndex) {
  const playerCardsDiv = document.getElementById(`player-${player}-cards`);
  const cardButtons = playerCardsDiv.querySelectorAll("button");
  cardButtons[cardIndex].style.border = "none";
}

document.getElementById("play-card-btn").addEventListener("click", function () {
  const player = "A";

  if (choosePlayCard === true) {
    const removedCards = checkAorBValidity(
      player,
      playerHands[player],
      userSelectedCards
    );

    if (removedCards) {
      playerScores[player] += cardCountValue;
      updateScore(player);
      choosePlayCard = false;
      cardSelectedType = null;
      cardCountValue = null;
      updateLastCard(player, removedCards);
      updateDiscardPile(removedCards);
      resetUserSelection(player);
      document.getElementById("draw-require-card-btn").style.display = "none";
      document.getElementById("draw-card-btn").style.display = "inline-block";
      checkIsGame(player);
      nextTurn();
    } else {
      alert(`Gabungan ini tidak diterima!`);

      resetUserSelection(player);
      updatePlayerHandDisplay(player, playerHands[player]);
    }
  } else if (plusCard === true) {
    const removedCards = checkPowerCardValidity(
      player,
      playerHands[player],
      userSelectedCards
    );

    if (removedCards) {
      playerScores[player] += 2;
      updateScore(player);
      updateLastCard(player, removedCards);
      updateDiscardPile(removedCards);
      resetUserSelection(player);
      document.getElementById("draw-require-card-btn").style.display = "none";
      document.getElementById("draw-card-btn").style.display = "inline-block";
      checkIsGame(player);
      nextTurn();
    } else {
      alert(`Kad ini tidak diterima!`);
      resetUserSelection(player);
      updatePlayerHandDisplay(player, playerHands[player]);
    }
  } else {
    if (userSelectedCards.length === 0) {
      alert("Sila pilih kad!");
      return;
    } else if (userSelectedCards.length === 2) {
      const [first, second] = userSelectedCards;

      const removedCards = checkABCombinationValidity(
        player,
        playerHands[player],
        first.index,
        second.index
      );

      if (removedCards) {
        playerScores[player] += 2;
        updateScore(player);
        updateLastCard(player, removedCards);
        updateDiscardPile(removedCards);
        resetUserSelection(player);
        checkIsGame(player);
        nextTurn();
      } else {
        alert(`Gabungan ini tidak diterima!`);

        resetUserSelection(player);
        updatePlayerHandDisplay(player, playerHands[player]);
      }
    } else if (userSelectedCards.length === 1) {
      const [first] = userSelectedCards;

      if (first.card.cardType === "C") {
        const removedCard = playerHands[player].splice(first.index, 1)[0];
        handlePowerCardEffect(removedCard.cardValue);
        playerScores[player] += 2;
        updateScore(player);
        updateLastCard(player, removedCard);
        updateDiscardPile([removedCard]);
        resetUserSelection(player);
        checkIsGame(player);
        nextTurn();
      } else {
        alert("Gabungan ini tidak diterima!");
        resetUserSelection(player);
        updatePlayerHandDisplay(player, playerHands[player]);
      }
    } else {
      alert(`Gabungan ini tidak diterima!`);
    }
  }

  updatePlayerHandDisplay(player, playerHands[player]);
});
