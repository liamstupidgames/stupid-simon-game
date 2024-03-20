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

function randomCard(values = ["", "green", "red", "yellow", "blue"]) {
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
    setTimeout(makeBlink($(`#${pattern[card]}`), 2, false), 3000);
  }
}

function displayLevel(currentLevel) {
  $("#level").text("Level " + currentLevel.toString());
}

function startingAlert() {
  executeSound("opening");
  makeBlink($("#level").text("Starting"), 5);
}

function saveStartingPoint() {
  return $("body").html;
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

function readPattern() {
  let userPattern = []
  
  $("#green").click(function(){
    userPattern.push("green")
  });

  $("#red").click(function(){
    userPattern.push("red")
  });
  
  $("#yellow").click(function(){
    userPattern.push("yellow")
  });

  $("#blue").click(function(){
    userPattern.push("blue")
  });

}

function playRound(levelPassed = 1, patternPassed = [], gameStatus = true) {
  let level = levelPassed;
  let pattern = patternPassed;
  let playable = gameStatus;

  if (playable) {
    displayLevel(level);

    let newCard = randomCard();

    pattern.push(newCard);

    showPattern(pattern);

    let userPattern = readPattern();

    alert(userPattern)

    waitFor(3000).then(function () {
      if (userWon(pattern, userPattern)) {
        playRound(level + 1, pattern, true);
      } else {
        userLost();
      }
    });
  }
}

$(document).keypress(function (key) {
  if (key.keyCode == 32) {
    startingAlert();
    waitFor(3000).then(playRound);
  }
});
