function generateCard() {
  let cardType = "";
  let cardValue = 0;

  const rand = Math.random();
  if (rand < KATA_KERJA_PROBABILITY) {
    cardType = "A";
    cardValue = Math.floor(Math.random() * 30 + 1);
  } else if (rand < KATA_KERJA_PROBABILITY + KATA_NAMA_PROBABILITY) {
    cardType = "B";
    cardValue = Math.floor(Math.random() * 30 + 1);
  } else if (rand <KATA_KERJA_PROBABILITY + KATA_NAMA_PROBABILITY + POWER_CARD_PROBABILITY) {
    cardType = "C";
    cardValue = Math.floor(Math.random() * 24 + 1);

    //         cardType = "C"; 
    //         cardValue = Math.floor(Math.random() * 4 + 9);
    //     } else {
    //         cardType = "C"; 
    //         cardValue = Math.floor(Math.random() * 4 + 20);

    //    
  }
  return { cardType, cardValue };
}

players.forEach((player) => {
  const playerCardsDiv = document.getElementById(`player-${player}-cards`);
  const playerCardsCountDiv = document.getElementById(
    `player-${player}-card-count`
  );
  const marginLeftValue = -40;
  for (let i = 0; i < 7; i++) {
    const card = generateCard();
    playerHands[player].push(card);
    const button = document.createElement("button");
    button.style.border = "none";
    button.style.padding = "0";
    button.style.background = "none";

    if (player === "A") {
      const img = document.createElement("img");
      img.src = `${imageBasePath}${card.cardType}${card.cardValue}.png`;
      img.alt = `Card: ${card.cardType}${card.cardValue}`;
      img.style.display = "block";
      button.appendChild(img);

      button.addEventListener("click", () => {
        console.log(`Clicked card: ${card.cardType}${card.cardValue}`);
      });
      button.addEventListener("click", () => handleUserCardClick(player, i));
    } else {
      const img = document.createElement("img");
      img.src = `image/cardback.png`;
      img.alt = `Card: ${card.cardType}${card.cardValue}`;
      img.style.display = "block";
      img.style.marginLeft = `${marginLeftValue}px`;
      button.appendChild(img);
    }

    playerCardsDiv.appendChild(button);
  }

  if (playerCardsCountDiv) {
    playerCardsCountDiv.textContent = `Bilangan kad : ${playerHands[player].length}`;
  }
});
