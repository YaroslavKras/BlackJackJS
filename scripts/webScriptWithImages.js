//Card Variables
const suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

//Game Variables
let deck = [];
let playersHand = [];
let dealersHand = [];
let playersPts = 0;
let dealersPts = 0;
let isGameOver = false;
let isGameStarted = false;
let hasPlayerWon = false;

//DOM Variables
let cardRoundsCounter = 0;
const textArea = document.getElementById('text-area');
const dealerTextArea = document.getElementById('dealer-text-area');
const playerTextArea = document.getElementById('player-text-area');
const dealerImgArea = document.getElementById("dealer-img-area");
const playerImgArea = document.getElementById("player-img-area");
const newGameButton = document.getElementById("new-game-button");
const hitButton = document.getElementById('hit-button');
const stayButton = document.getElementById('stay-button');


newGameButton.style.display = 'block';
hitButton.style.display = 'none';
stayButton.style.display = 'none';

newGameButton.addEventListener('click', function () {
    refresh();
    display();
});


hitButton.addEventListener('click', function () {
    removeImages();
    playersHand.push(deck.pop());
    checkWinCondition();
    display();
});

stayButton.addEventListener('click', function () {
    removeImages();
    isGameOver = true;
    checkWinCondition();
    display();
});

/**
 * @param suit -- Card's suit (look in suits array for possible values).
 * @param rank -- Card's rand (look in ranks array for possible values).
 * @param ptsValue -- Card's points value (look in cardValues array for possible values).
 * @constructor -- Card object constructor.
 */
function Card(suit, rank, ptsValue) {
    this.suit = suit;
    this.rank = rank;
    this.ptsValue = ptsValue;
}

/**
 * Populates deck array with Card objects. Cards are created dynamically, by rank (4 Aces, 4 Kings, 4 Queens, etc...)
 * and are added in deck array in the same way.
 * @returns {Array} -- ordered array of Cards.
 */
function createDeck() {
    deck = [];
    for (let i = 0; i < ranks.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let card = new Card(suits[j], ranks[i], cardValues[i]);
            deck.push(card);
        }
    }
    return deck;
}

/**
 * Randomly shuffles array of Card objects. Typically doesn't depend on size of deck array, but might encounter
 * some issues later if size changes (this issue was not tested).
 * @param deck -- array populated with Card objects.
 * @returns {Array} -- same array but instead of ordered (by rank -- 4 Aces, 4 Kings, 4 Queens, etc...), is now randomly shuffled.
 */
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

/**
 * Deals each player a number of cards from deck. Both player and dealers hands arrays add a last (top) element from deck array.
 * It is assumed, though not needed, that deck array is shuffled before calling this function.
 * @param deck -- array populated with Card objects. Assumed that it has 52 cards and shuffled.
 * @param number -- number of cards to be dealt to each player.
 */
function dealFrom(deck, number) {
    for (let i = 0; i < number; i++) {
        playersHand.push(deck.pop());
        dealersHand.push(deck.pop());
    }
}

/**
 * Calculate number of points on given set of cards ("hand"). Writes it to console.
 * @param hand -- Array of cards.
 * @returns {number} -- total pts value.
 */
function calculateHand(hand) {
    let result = 0;
    console.log(hand);
    hand.forEach(card => result += card.ptsValue);
    return result;
}

/**
 Displays the hand to a player (Alert) and also prints it to console. Goes through hand array, takes each card suit
 and rank, adds ' of ' between them, to make it readable for a player (e.g. "Ace of Spades").
 Displays info to a player through alert and writes it to console.
 @param hand -- hand to be displayed.
 */
function getCardsOnHandString(hand) {
    let cards = [];
    hand.forEach(card => cards.push(" " + card.rank + " of " + card.suit));
    return cards;
}

/**
 * Updates scores for player and dealer.
 * Utility function, so you don't have to call @function calculateHand 2 times every time separately.
 */
function updateScores() {
    dealersPts = calculateHand(dealersHand);
    playersPts = calculateHand(playersHand);
}

/**
 * Displays state of a game to a player.
 */
function display() {
    if (!isGameStarted) {
        textArea.innerText = "Welcome to BlackJack!";
        return;
    }

    let playerHandString, dealerHandString;
    playerHandString = "Player has:\n" + getCardsOnHandString(playersHand);
    dealerHandString = "Dealer has:\n" + getCardsOnHandString(dealersHand);
    updateScores();
    textArea.style.display = 'none';

    dealerTextArea.innerText = dealerHandString + "\n" + dealersPts + " points.\n\n";

    dealersHand.forEach(card => displayCard(card, dealerImgArea));

    playerTextArea.innerText = playerHandString + "\n" + playersPts + " points.\n\n";

    playersHand.forEach(card => displayCard(card, playerImgArea));

    if (isGameOver) {
        newGameButton.style.display = 'block';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
        if (hasPlayerWon) {
            playerTextArea.innerText += "\n\t\tYou won!";
        } else {
            dealerTextArea.innerText += "\n\t\tDealer won!";
        }
    }
}

/**
 * Checks win conditions for both dealer and player.
 */
function checkWinCondition() {
    updateScores();

    if (isGameOver) {
        while (dealersPts < playersPts && playersPts <= 21 && dealersPts <= 21) {
            dealersHand.push(deck.pop());
            updateScores();
        }
    }
    if (playersPts > 21) {
        isGameOver = true;
        hasPlayerWon = false;
    } else if (dealersPts > 21) {
        isGameOver = true;
        hasPlayerWon = true;
    }
}

/**
 * Empties both player's and dealer's hand, resets all boolean values back to state that corresponds to a game beginning. Hides 'Hit' and 'Stay' buttons, shows only 'New Game' button.
 * Creates and shuffles and new deck and deals two cards for each player.
 */
function refresh() {
    isGameStarted = true;
    isGameOver = false;
    hasPlayerWon = false;
    playersHand = [];
    dealersHand = [];
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';

    removeImages();
    deck = shuffle(createDeck());
    dealFrom(deck, 2);
}

function displayCard(card, area) {
    let img = document.createElement("img");
    img.src = "res/imgs/cards/" + getCardImgPath(card);
    img.setAttribute('id', "card-images-" + cardRoundsCounter);
    img.style.width = '50px';
    img.style.height = '90px';
    area.appendChild(img);
}

function getCardImgPath(card) {
    let suit = card.suit;
    return suit.toLowerCase() + "/" + card.rank + ".jpg";
}

function removeImages() {
    let images = [].slice.call(document.getElementsByTagName('img'), 0); // get the images as array like object, and turn it into an array using slice

    images.forEach(function (img) { // iterate the images array
        img.parentNode.removeChild(img); // remove the child node via the parent node
    });
}
display();