////////////////////////////////////////////////处理牌的逻辑//////////////////////////////////////

let choosePlayCard = false;
let plusCard = false;
let cardSelectedType = null;
let cardCountValue = null;

function checkABCombinationValidity(player, hand, aIndex, bIndex) {
  const atype = hand[aIndex].cardType;
  const btype = hand[bIndex].cardType;
  const aValue = hand[aIndex].cardValue;
  const bValue = hand[bIndex].cardValue;

  if (atype === "A") {
    if (atype === "A" && btype === "B") {
      // 检查 B 卡的值是否在 A 卡对应的合法值列表中
      if (validBValuesForA[aValue]?.includes(bValue)) {
        const removedCards = [
          hand.splice(aIndex, 1)[0],
          hand.splice(bIndex > aIndex ? bIndex - 1 : bIndex, 1)[0],
        ];
        console.log(
          `玩家 ${player} 出牌: ${removedCards
            .map((card) => card.cardType + card.cardValue)
            .join(" + ")}`
        );
        return removedCards; // 返回已移除的卡牌
      }
    }
  } else {
    if (atype === "B" && btype === "A") {
      // 检查 B 卡的值是否在 A 卡对应的合法值列表中
      if (validBValuesForA[bValue]?.includes(aValue)) {
        const removedCards = [
          hand.splice(bIndex, 1)[0],
          hand.splice(aIndex > bIndex ? aIndex - 1 : bIndex, 1)[0],
        ];
        console.log(
          `玩家 ${player} 出牌: ${removedCards
            .map((card) => card.cardType + card.cardValue)
            .join(" + ")}`
        );
        return removedCards; // 返回已移除的卡牌
      }
    }
  }

  return null; // 如果没有有效组合
}

function checkAorBValidity(player, hand, userSelectedCards) {
  const [first, second, third] = userSelectedCards;
  let type = cardSelectedType === "katakerja" ? "A" : "B";
  if (cardCountValue == 2 && first != null && second != null) {
    const aIndex = first.index;
    const bIndex = second.index;
    const atype = hand[aIndex].cardType;
    const btype = hand[bIndex].cardType;

    let removedCards = [{ ...hand[aIndex] }, { ...hand[bIndex] }];

    console.log("removedCards:", removedCards);
    console.log("atype:", atype, "btype:", btype, "type:", type);

    if (atype === type && btype === type) {
      hand.splice(aIndex, 1);
      hand.splice(bIndex > aIndex ? bIndex - 1 : bIndex, 1);

      console.log(
        `玩家 ${player} 出牌: ${removedCards
          .map((card) => card.cardType + card.cardValue)
          .join(" + ")}`
      );
      return removedCards;
    } else {
      console.log(
        `${removedCards
          .map((card) => card.cardType + card.cardValue)
          .join(" + ")}不被接受。`
      );
      return null;
    }
  } else if (
    cardCountValue === 3 &&
    first != null &&
    second != null &&
    third != null
  ) {
    const aIndex = first.index;
    const bIndex = second.index;
    const cIndex = third.index;

    const atype = hand[aIndex].cardType;
    const btype = hand[bIndex].cardType;
    const ctype = hand[cIndex].cardType;

    let removedCards = [
      { ...hand[aIndex] },
      { ...hand[bIndex] },
      { ...hand[cIndex] },
    ];

    console.log("removedCards:", removedCards);
    console.log("atype:", atype, "btype:", btype, "type:", type);

    if (atype === type && btype === type && ctype === type) {
      hand.splice(aIndex, 1);
      hand.splice(bIndex > aIndex ? bIndex - 1 : bIndex, 1);
      hand.splice(cIndex > bIndex ? cIndex - 1 : cIndex, 1);

      console.log(
        `玩家 ${player} 出牌: ${removedCards
          .map((card) => card.cardType + card.cardValue)
          .join(" + ")}`
      );
      return removedCards;
    } else {
      console.log(
        `${removedCards
          .map((card) => card.cardType + card.cardValue)
          .join(" + ")}不被接受。`
      );
      return null;
    }
  } else {
    console.log(`牌数不够。`);
    return null;
  }
}

function checkPowerCardValidity(player, hand, userSelectedCards) {
  let [first] = userSelectedCards;

  const { card, i } = first;

  if (card.cardType === "C" && card.cardValue >= 1 && card.cardValue <= 4) {
    const removedCard = hand.splice(i, 1)[0];
    console.log(
      `玩家 ${player} 出了一张 Power Card: ${
        removedCard.cardType + removedCard.cardValue
      }`
    );
    totalCardsCount += 2;
    return removedCard;
  } else if (
    card.cardType === "C" &&
    card.cardValue >= 5 &&
    card.cardValue <= 8
  ) {
    const removedCard = hand.splice(i, 1)[0];
    console.log(
      `玩家 ${player} 出了一张 Power Card: ${
        removedCard.cardType + removedCard.cardValue
      }`
    );
    totalCardsCount += 4;
    return removedCard;
  } else {
    console.log(`此牌不对要求。`);
    return null;
  }
}

function handlePowerCardEffect(cardValue) {
  if (cardValue >= 1 && cardValue <= 4) {
    //console.log(`N/A +2`);
    nextPlayerDrawCards(2);
  } else if (cardValue >= 5 && cardValue <= 8) {
    //console.log(`N/A +4`);
    nextPlayerDrawCards(4);
  } else if (cardValue >= 9 && cardValue <= 10) {
    //console.log(`N/A 2 , katakerja`);
    nextPlayerChoose(2, "katakerja", 2);
  } else if (cardValue >= 11 && cardValue <= 12) {
    //console.log(` 3 , katakerja`);
    nextPlayerChoose(3, "katakerja", 3);
  } else if (cardValue >= 13 && cardValue <= 16) {
    //console.log(`N/A reverse`);
    reverseTurnOrder();
  } else if (cardValue >= 17 && cardValue <= 20) {
    //console.log(`N/A skip`);
    skipNextPlayer();
  } else if (cardValue >= 21 && cardValue <= 22) {
    //console.log(`N/A 2 , katanama`);
    nextPlayerChoose(2, "katanama", 2);
  } else if (cardValue >= 23 && cardValue <= 24) {
    //console.log(`N/A 3 , katanama`);
    nextPlayerChoose(3, "katanama", 3);
  }
}

function nextPlayerDrawCards(count) {
  plusCard = true;
  totalCardsCount += count;

  // const currentIndex = players.indexOf(currentPlayer);
  // const nextIndex = (currentIndex + 1) % players.length; // 计算下一个玩家索引
  // const nextPlayer = players[nextIndex];
  // console.log(`玩家 ${nextPlayer} 抽 ${count} 张牌！`);
  // for (let i = 0; i < count; i++) {
  //     const newCard = generateCard();
  //     playerHands[nextPlayer].push(newCard);
  // }
}

function nextPlayerChoose(cardCount, cardType, drawCount) {
  const currentIndex = players.indexOf(currentPlayer);
  const nextIndex = getNextPlayerIndex(currentIndex);
  const nextPlayer = players[nextIndex];

  console.log(
    `轮到玩家 ${nextPlayer}。 玩家 ${nextPlayer} 必须选择出${cardCount} 张 ${cardType} 或抽 ${drawCount} 张牌！`
  );

  if (nextPlayer === "A") {
    alert(
      `Giliranmu. Pemain ${nextPlayer} sila pilih ${cardCount} kad ${cardType} atau ambil ${drawCount} kad！`
    );

    document.getElementById("draw-card-btn").style.display = "none";
    document.getElementById("draw-require-card-btn").style.display =
      "inline-block";

    choosePlayCard = true;
    cardSelectedType = cardType;
    cardCountValue = cardCount;

    document.getElementById("draw-require-card-btn").onclick = function () {
      console.log(`玩家 A 选择抽 ${drawCount} 张牌！`);
      drawCards(nextPlayer, drawCount);
      choosePlayCard = false;

      document.getElementById("draw-require-card-btn").style.display = "none";
      document.getElementById("draw-card-btn").style.display = "inline-block";
      updatePlayerHandDisplay(nextPlayer, playerHands[nextPlayer]);
      nextTurn();
    };
  } else {
    choosePlayCard = true;
    cardSelectedType = cardType;
    cardCountValue = cardCount;
  }
}

function reverseTurnOrder() {
  console.log(`回合反转！`);
  turnOrderReversed = !turnOrderReversed;
}

function skipNextPlayer() {
  skipOnePlayer = true;
  const currentIndex = players.indexOf(currentPlayer);

  if (turnOrderReversed) {
    skipPlayer = players[(currentIndex - 1 + players.length) % players.length];
  } else {
    skipPlayer = players[(currentIndex + 1) % players.length];
  }
  console.log(`跳过玩家 ${skipPlayer}！`);
  setTimeout(() => {
    document.getElementById(
      "last-player-name"
    ).innerHTML = `Skip Pemain ${skipPlayer}`;
    document.getElementById("last-player-card").innerHTML = "";
  }, 1000);
}

function drawCards(player, count) {
  document.getElementById("last-player-name").innerText =
    " Pemain " + player + " ambil " + count + " kad";
  document.getElementById("last-player-card").innerHTML = "";
  setTimeout(() => {
    document.getElementById("last-player-name").innerText =
      " Pemain " + player + " ambil " + count + " kad";
    document.getElementById("last-player-card").innerHTML = "";
  }, 1000);

  console.log(`玩家 ${player} 没有可出的组合或 Power Card，抽${count}张牌。`);
  for (let i = 0; i < count; i++) {
    const newCard = generateCard();
    dealCard(player);
    playerHands[player].push(newCard);
  }

  if (player === "A" && playerHands[player].length > 20) {
    window.location.href = "lose.html";
  } else if (player === "A" && playerHands[player].length > 15) {
    alert(`Anda sudah memiliki lebih daripada 16 kad dan lebih daripada 20 kad akan kalah!`);
  }
  updatePlayerHandDisplay(player, playerHands[player]);
}

function updatePlayerHandDisplay(player, hand) {
  const playerCardsDiv = document.getElementById(`player-${player}-cards`);
  playerCardsDiv.innerHTML = "";

  const playerCardsCountDiv = document.getElementById(
    `player-${player}-card-count`
  );

  let maxCardsToShow = player === "A" ? hand.length : 15;

  let marginLeftValue = -40;
  if (hand.length > 9) {
    marginLeftValue -= 3;
  }
  if (hand.length > 12) {
    marginLeftValue -= 3;
  }

  hand.slice(0, maxCardsToShow).forEach((card, index) => {
    if (player === "A") {
      const button = document.createElement("button");
      button.style.border = "none";
      button.style.padding = "0";
      button.style.background = "none";

      const img = document.createElement("img");
      img.src = `${imageBasePath}${card.cardType}${card.cardValue}.png`;
      img.alt = `Card: ${card.cardType}${card.cardValue}`;
      img.style.display = "block";
      button.appendChild(img);

      button.addEventListener("click", () =>
        handleUserCardClick(player, index)
      );

      playerCardsDiv.appendChild(button);
    } else {
      const img = document.createElement("img");
      img.src = `image/cardback.png`;
      img.alt = `Hidden Card`;

      img.style.marginLeft = `${marginLeftValue}px`;
      playerCardsDiv.appendChild(img);
    }
  });

  playerCardsCountDiv.textContent = `Bilangan kad : ${hand.length}`;
}

function checkIsGame(player) {
  if (player === "A" && playerHands[player] <= 0) {
    playerScores[player] = 50;
    updateScore(player);
  }
}
