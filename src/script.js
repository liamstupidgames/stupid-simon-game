let level = 1;
let pattern = [];
let playable = true;
let userSelectedColors = [];
let currentCard = 0;

function executeSound(sound) {
  var audio = new Audio(
    `https://raw.githubusercontent.com/liamstupidgames/stupid-simon-game/master/assets/sounds/${sound}.mp3`
  );

  audio.play();
}

function waitFor(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function animatePress(card) {
  $(`#${card}`).addClass("pressed");
  setTimeout(function () {
    $(`#${card}`).removeClass("pressed");
  }, 100);
}

function randomCard(values = ["#PLACEHOLDER_IGNORE", "green", "red", "yellow", "blue"]) {
  var card = Math.ceil(Math.random() * 4);
  return values[card];
}

function makeBlink(object, times, twice = true) {
  for (let time = 0; time < times; time++) {
    object.fadeIn(100).fadeOut(100).fadeIn(100);
    if (twice) {
      object.fadeIn(100).fadeOut(100).fadeIn(100);
    }
  }
}

function showPattern(pattern) {
  for (let card = 0; card < pattern.length; card++) {
    waitFor(14000).then(makeBlink($(`#${pattern[card]}`), 1, false));
  }
}

function displayLevel(currentLevel) {
  $("#level").text("Level " + currentLevel.toString());
}

function startingAlert() {
  executeSound("opening");
  makeBlink($("#level").text("Starting"), 5);
}

function userWon(pattern) {
  if (pattern.length === 30) {
    return false;
  }
  return true;
}

function userLost() {
  alert("lost");
}

function verifyGame(userSelection) {
    
  userSelectedColors.push(userSelection);

    if (userSelectedColors.length <= pattern.length) {
      if (userSelectedColors[currentCard] === pattern[currentCard]) {
        currentCard++;
      } else {
        userLost();
      }
    } else {
      level++;
      userWon();
      playRound();
    }
  }

function playRound() {
  displayLevel(level);

  currentCard = 0;
  userSelectedColors = [];

  let newCard = randomCard();

  pattern.push(newCard);

  showPattern(pattern);
}

function gameStarded() {
  return $("#level").text() !== "Press SPACE to start";
}

$(document).keypress(function (key) {
  if (key.keyCode == 32 && !gameStarded()) {
    startingAlert();
    waitFor(2000).then(function () {
      playRound();
    });
  }
});

$(".card").on("click", function (btn) {
  if (gameStarded()) {
    verifyGame(this.id);
  }
});
