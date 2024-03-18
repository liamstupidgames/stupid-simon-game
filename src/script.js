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

function showPattern(pattern) {
  for (let card = 0; card < pattern.length; card++) {
    $(`#${pattern[card]}`).fadeIn(100).fadeOut(100).fadeIn(100);
  }
}

function displayLevel(level, timeout = false) {
  if (timeout) {
    setTimeout(function () {
      $("#level").text(level);
    }, timeout);
  } else {
    $("#level").text(level);
  }
}

function startingAlert() {
  displayLevel("Starting");
  displayLevel("Starting.", 500);
  displayLevel("Starting..", 1000);
  displayLevel("Starting...", 1500);
  executeSound("opening");
}

function startGame() {
  startingAlert();
}

$(document).keypress(function (key) {
  if (key.keyCode == 32) {
    startGame();
  }
});
