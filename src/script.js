function executeSound(sound) {
  var audio = new Audio(
    `https://raw.githubusercontent.com/liamstupidgames/stupid-simon-game/master/assets/sounds/${sound}.mp3`
  );

  audio.play();
}

function animatePress(card) {
  $(`#${card}`).addClass("pressed");
  setTimeout(function () {
    $(`#${card}`).removeClass("pressed");
  }, 100);
}

function randomCard(values = ["green", "red", "yellow", "blue"]) {
  var card = Math.ceil(Math.random * 4);
  return values[card];
}

function makeBlink(object, times) {
  for (let time = 0; time < times; time++) {

    object.fadeIn(100).fadeOut(100).fadeIn(100);
    object.fadeIn(100).fadeOut(100).fadeIn(100);
    
  }
}

function showPattern(pattern) {
  for (let card = 0; card < pattern.length; card++) {

    makeBlink($(`#${pattern[card]}`));

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

function isPlayable(level) {
  if (level === 30) {
    return false;
  }
  return true;
}

function startGame(playable = true) {
  startingAlert();

  setTimeout(function () {
    let level = 1;
    let pattern = [];

    while (playable) {
      displayLevel(level);

      let newCard = randomCard;

      pattern.push(newCard);

      showPattern(pattern);

      playable = setTimeout(isPlayable(level), 3000);

      level++;
    }
  }, 3000);
}

$(document).keypress(function (key) {
  if (key.keyCode == 32) {
    startGame();
  }
});
