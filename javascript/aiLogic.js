function playTurn(player) {
  const hand = playerHands[player];
  let validCombination = false;
  let removedCards = [];
  let choosePlayCardFail = false;

  if (player === "A") {
    updatePlayerHandDisplay(player, hand);
    return;
  }
  if (plusCard) {
    removedCards = checkAndHandlePlusPowerCard(player, hand);
    if (removedCards) {
      validCombination = true;
    }
  } else if(choosePlayCard){
    removedCards = checkAndHandleRemovedCard(player, hand);
    if (removedCards) {
      validCombination = true;
    }else{
      choosePlayCardFail = true;
    }
    
  }else{
    if (!validCombination) {
      removedCards = checkAndHandleABCombination(player, hand);
      if (removedCards) {
        validCombination = true;
      }
    }
    if (!validCombination) {
      removedCards = checkAndHandlePowerCard(player, hand);
      if (removedCards) {
        validCombination = true;
      }
    }
  }


  if (!validCombination && plusCard && totalCardsCount > 0) {
    drawCards(player, totalCardsCount);
    plusCard = false;
    totalCardsCount = 0;
  } else if (choosePlayCardFail && !validCombination) {
    drawCards(player, cardCountValue);
    choosePlayCard = false;
    cardSelectedType = null;
    cardCountValue = null;

  } else if (!validCombination) {
    drawCards(player, 2);
  } else {
    playerScores[player] += 2;
    updateScore(player);
    updateLastCard(player, removedCards);
    updateDiscardPile(removedCards);
  }
  updatePlayerHandDisplay(player, hand);
}

function checkAndHandlePowerCard(player, hand) {
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].cardType === "C") {
      const removedCard = hand.splice(i, 1)[0];
      console.log(
        `玩家 ${player} 出了一张 Power Card: ${
          removedCard.cardType + removedCard.cardValue
        }`
      );
      handlePowerCardEffect(removedCard.cardValue);
      return removedCard;
    }
  }
  return null;
}

function checkAndHandleABCombination(player, hand) {
  for (let i = 0; i < hand.length; i++) {
    for (let j = 0; j < hand.length; j++) {
      if (i !== j && hand[i].cardType === "A" && hand[j].cardType === "B") {
        const removedCards = checkABCombinationValidity(player, hand, i, j);
        if (removedCards) {
          return removedCards;
        }
      }
    }
  }
  return null;
}

function checkAndHandlePlusPowerCard(player, hand) {
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].cardType === "C") {
      if (hand[i].cardValue >= 1 && hand[i].cardValue <= 4) {
        const removedCard = hand.splice(i, 1)[0];
        console.log(
          `玩家 ${player} 出了一张 Power Card: ${
            removedCard.cardType + removedCard.cardValue
          } +2`
        );
        totalCardsCount = totalCardsCount + 2;
        console.log(`现在需要抽 ${totalCardsCount} 张牌！`);
        return removedCard;
      } else if (hand[i] >= 5 && hand[i] <= 8) {
        const removedCard = hand.splice(i, 1)[0];
        console.log(
          `玩家 ${player} 出了一张 Power Card: ${
            removedCard.cardType + removedCard.cardValue
          } +4`
        );
        totalCardsCount = totalCardsCount + 4;
        console.log(`现在需要抽 ${totalCardsCount} 张牌！`);
        return removedCard;
      }
    }
  }
  return null;
}



function checkAndHandleRemovedCard(player, hand) {
  let removedCards = [];
  let type = cardSelectedType === "katakerja" ? "A" : "B";

  for (let i = 0; i < hand.length; i++) {
    if (hand[i].cardType === type) {
      removedCards.push(hand[i]); 
      hand.splice(i, 1);
      i--; 
    }
    if (removedCards.length >= cardCountValue) {
      console.log(
        `玩家 ${player} 出牌: ${removedCards
          .map((card) => card.cardType + card.cardValue)
          .join(" + ")}`  
      );
      choosePlayCard = false;
      cardSelectedType = null;
      cardCountValue = null;
      return removedCards;
    }
  }

}
