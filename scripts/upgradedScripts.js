let deck = [];
let suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
let cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let playersHand = [];
let dealersHand = [];


function createDeck() {
    for (let i = 0; i < ranks.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let cards = [];
            cards[0] = ranks[i];
            cards[1] = suits[j];
            deck.push(cards);
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealFrom(deck) {
    playersHand.push(deck.pop());
    dealersHand.push(deck.pop());
}

function calculateHand(hand) {
    let result = 0;
    hand.forEach(card => result += cardValues[ranks.indexOf(card[0])]);
    return result;
}

function compareFinalHands(playerPts, dealerPts) {
    checkWinCondition(playerPts, dealerPts);
    if (playerPts > dealerPts) {
        if (confirm("You won! Another one?")) {
            window.location.reload(false);
        }
    } else {
        if (confirm("You lost! Another one?")) {
            window.location.reload(false);
        }
    }
}

function checkWinCondition(playerPts, dealerPts) {
   //TODO: Refactor checks, rough draft
    if (playerPts > 21) {
        if (confirm("You lost, another one?")) {
            window.location.reload(false);
        }
    } else if (dealerPts > 21) {
        if (confirm("Dealer bust out! Another one?")) {
            window.location.reload(false);
        }
    } else if (playerPts === 21 || dealerPts === 21) {
        if (playerPts > dealerPts) {
            if (confirm("You won! Another one?")) {
                window.reload();
            } else {
                if (confirm("You lost! Another one?")) {
                    window.location.reload(false);
                }
            }
        }
    }
}

function play() {
    while (true) {
        let playDeck = shuffle(createDeck());

        dealFrom(playDeck);
        dealFrom(playDeck);

        console.log(`Player's hand is: ${playersHand[0][0]} of ${playersHand[0][1]} and ${playersHand[1][0]} of ${playersHand[1][1]}`);
        alert(`Player's hand is: ${playersHand[0][0]} of ${playersHand[0][1]} and ${playersHand[1][0]} of ${playersHand[1][1]}`);
        console.log(`Dealer's hand is: ${dealersHand[0][0]} of ${dealersHand[0][1]} and ${dealersHand[1][0]} of ${dealersHand[1][1]}`);
        alert(`Dealer's hand is: ${dealersHand[0][0]} of ${dealersHand[0][1]} and ${dealersHand[1][0]} of ${dealersHand[1][1]}`);

        let playersPts = calculateHand(playersHand);
        let dealerPts = calculateHand(dealersHand);

        alert(`You have ${playersPts}, and Dealer has ${dealerPts}`);
        console.log(`You have ${playersPts}, and Dealer has ${dealerPts}`);

        checkWinCondition(playersPts, dealerPts);

        let hitMe = confirm("Do you want another card?");
        if (hitMe) {
            dealFrom(playDeck);
            playersPts = calculateHand(playersHand);
            dealerPts = calculateHand(dealerPts);
            checkWinCondition(playersPts, dealerPts);
        } else {
            compareFinalHands(playersPts, dealerPts);
            break;
        }
    }
}

play();


