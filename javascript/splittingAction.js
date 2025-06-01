function dealCard(player) {
  let card = document.createElement("img");
  card.src = "image/cardback.png";
  card.className = "card";
  card.style.width = "100px";
  card.style.height = "150px";
  card.style.borderRadius = "5px";
  card.style.position = "absolute"; // Needed for proper movement
  card.style.zIndex = "1000"; // Ensure it stays on top

  // Get game container
  const gameContainer = document.querySelector(".game-container");
  if (!gameContainer) {
    console.error("Game container not found!");
    return;
  }

  // Get start and end positions relative to .game-container
  const deck = document.querySelector(".deck");
  const playerCards = document.querySelector(`#player-${player}-cards`);

  if (!deck || !playerCards) {
    console.error("Deck or player card container not found!");
    return;
  }

  const gameRect = gameContainer.getBoundingClientRect();
  const deckRect = deck.getBoundingClientRect();
  const playerRect = playerCards.getBoundingClientRect();

  // Append the card inside gameContainer
  gameContainer.appendChild(card);

  // Set initial position inside gameContainer
  card.style.left = `${
    deckRect.left - gameRect.left + deckRect.width / 2 - 50
  }px`;
  card.style.top = `${
    deckRect.top - gameRect.top + deckRect.height / 2 - 75
  }px`;

  let startX = deckRect.left - gameRect.left + deckRect.width / 2 - 50;
  let startY = deckRect.top - gameRect.top + deckRect.height / 2 - 75;
  let endX = playerRect.left - gameRect.left + playerRect.width / 2 - 50;
  let endY = playerRect.top - gameRect.top + playerRect.height / 2 - 75;

  let duration = 200; // Animation duration (ms)
  let startTime = null;

  function animateCard(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = (timestamp - startTime) / duration;
    if (progress > 1) progress = 1;

    let x = startX + (endX - startX) * progress;
    let y = startY + (endY - startY) * progress;

    card.style.transform = `translate(${x - startX}px, ${y - startY}px)`;

    if (progress < 1) {
      requestAnimationFrame(animateCard);
    } else {
      setTimeout(() => {
        card.remove();
      }, 100);
    }
  }

  requestAnimationFrame(animateCard);
}
