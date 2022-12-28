let easyWords =
  "against open in run stand she ask that end long man head for new number run now of might own state large take both it year you without year and turn place like however school there when write other only own large into right present first time during home for in use tell show ask general again he give of during hold one state at use should use no large between at a begin such from than word have person day good way some thing play run may part call much problem possible but through think seem system so much long thing";
let normalWords =
  "wide describe master high run than broad won't which fun wrong note root soil drink garden verb horse wood colony believe bird danger shoulder store bread design element cut friend air soft card land shape plain wire proper quiet land engine summer over it join connect strange occur edge change bring far day went grand hundred hope size bottom bright ot neighbor moon felt order oil long reply hunt believe poem afraid eat cause pair save thing nature ship capital dark have cent liquid yes path way go flower mouth fill both ear song could night favor race test save rail substance stand way music mile talk subject team agree die break arrive will original feed heat hill hold";
let hardWords =
  "take album handful collector receiver leaflet accent mechanic kiss biology neglect investor plunge benefit whatever tin commitment fashionable earth courtesy wall prosecute sector chain afford rise compelling force bold speed outdoors alcohol boat march lip round mobilize weekend retire forever ticket sell only conserve assistance separation basement hierarchy angel electronics homeland explore bank soul camping capitalism stem depressed rally urban rope tide satellite necessity finger assistance separation basement hierarchy angel electronics homeland explore bank soul camping capitalism stem depressed rally urban rope tide satellite necessity finger canvas cost dub resident politics impact remove universe terrorist president fiber television incredibly litter politician soup tough footage suite viable campaign";
easyWords = easyWords.split(" ");
normalWords = normalWords.split(" ");
hardWords = hardWords.split(" ");

let words = [];

let messageLevel = document.querySelector(".message .lvls");
let messageSecond = document.querySelector(".message .seconds");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeft = document.querySelector(".time span");
let spanGot = document.querySelector(".score .got");
let spanTotal = document.querySelector(".score .total");
let finish = document.querySelector(".finish");
let finishGot = document.querySelector(".finish-got");
let finishTotal = document.querySelector(".finish-total");
let finishButton = document.querySelector(".finish button");
let finishScore = document.querySelector(".finish .finish-score");
let settingIcon = document.querySelector(".settings i");
let settingSelect = document.querySelector(".select");
let settingWordsNumber = document.querySelector(".select .words-number");
let settingLevels = document.querySelector(".select .levels");
let traffic = true;
let trafficFirstWord = true;
let trafficForSpaceButton = true;
let counter;

let levels = {
  easy: 5,
  normal: 3,
  hard: 2,
};
if (localStorage.getItem("defaultLevel")) {
  var defaultLevel = localStorage.getItem("defaultLevel");
  var defaultTime = levels[defaultLevel];
  settingLevels.value = defaultLevel;
} else {
  defaultLevel = "normal";
  defaultTime = levels[defaultLevel];
}

if (localStorage.getItem("defaultWordNumber")) {
  defaultWordNumber = localStorage.getItem("defaultWordNumber");
  settingWordsNumber.value = defaultWordNumber;
} else {
  defaultWordNumber = "30";
  settingWordsNumber.value = defaultWordNumber;
}

settingLevels.onchange = function () {
  defaultLevel = settingLevels.value;
  localStorage.setItem("defaultLevel", settingLevels.value);
  location.reload();
};
settingWordsNumber.onchange = function () {
  var defaultWordNumber = settingWordsNumber.value;
  localStorage.setItem("defaultWordNumber", defaultWordNumber);
  location.reload();
};

function wordsGenerator() {
  if (settingLevels.value === "easy") {
    for (let i = 0; i < defaultWordNumber; i++) {
      words[i] = easyWords[Math.floor(Math.random() * easyWords.length)];
    }
  } else if (settingLevels.value === "normal") {
    for (let i = 0; i < defaultWordNumber; i++) {
      words[i] = normalWords[Math.floor(Math.random() * normalWords.length)];
    }
  } else {
    for (let i = 0; i < defaultWordNumber; i++) {
      words[i] = hardWords[Math.floor(Math.random() * hardWords.length)];
    }
  }
}
messageLevel.innerHTML = defaultLevel;
messageSecond.innerHTML = defaultTime;
timeLeft.innerHTML = defaultTime;
spanTotal.innerHTML = words.length;
startButton.onclick = function () {
  this.remove();
  wordsGenerator();
  input.focus();
  wordGen();
};
input.onpaste = function () {
  return false;
};

finishButton.onclick = function () {
  location.reload();
  
};
settingIcon.addEventListener("click", function () {
  if (settingSelect.style.display === "flex") {
    settingSelect.style.display = "none";
  } else {
    settingSelect.style.display = "flex";
  }
});
//
window.addEventListener("click", (e) => {
  if (e.target.parentElement.id == null) {
    return;
  }
  console.log(e.target.parentElement.id);
  if (e.target.parentElement.id != "side") {
    console.log("hey");
    if (settingSelect.style.display === "flex") {
      settingSelect.style.display = "none";
    }
  }
});

function wordGen() {
  let randomWord = words[0];
  theWord.innerHTML = randomWord;
  words.splice(0, 1);
  upcomingWords.innerHTML = "";
  for (i in words) {
    let div = document.createElement("div");
    let text = document.createTextNode(words[i]);
    div.appendChild(text);
    upcomingWords.appendChild(div);
  }

  timer();
}

function timer() {
  timeLeft.innerHTML = defaultTime;
  if (trafficFirstWord) {
    timeLeft.innerHTML = 2 * defaultTime;
  }
  trafficFirstWord = false;
  counter = setInterval(function () {
    console.log("slaam");
    timeLeft.innerHTML--;

    window.addEventListener("keypress", (e) => {
      if (e.code === "Space" && input.value.trim() != "") {
        clearInterval(counter);
        checker();
      }
    });
    if (timeLeft.innerHTML == 0) {
      clearInterval(counter);
      checker();
    }
  }, 1000);
}

function checker() {
  if (theWord.innerHTML === input.value.trim()) {
    input.value = "";
    spanGot.innerHTML++;
    if (words.length > 0) {
      trafficForSpaceButton = true;
      wordGen();
    } else {
      if (traffic) {
        finishGot.innerHTML = spanGot.innerHTML;
        finishTotal.innerHTML = spanTotal.innerHTML;
        finish.style.display = "block";
        finish.style.animation = "visible 0.3s ease";
        let div = document.createElement("div");
        let text = document.createTextNode("Congratulation");
        div.appendChild(text);
        div.className = "winner";
        finishScore.before(div);
      }
      traffic = false;
    }
  } else {
    if (traffic) {
      input.addEventListener("keypress", function (e) {
        e.preventDefault();
      });
      finishGot.innerHTML = spanGot.innerHTML;
      finishTotal.innerHTML = spanTotal.innerHTML;
      finish.style.display = "block";
      finish.style.animation = "visible 0.3s ease";
      let div = document.createElement("div");
      let text = document.createTextNode("Game Over");
      div.appendChild(text);
      div.className = "looser";
      finishScore.before(div);
    }
    traffic = false;
  }
}
