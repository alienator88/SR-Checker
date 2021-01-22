var d = new Date();
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
var defaultSettings = {toggle: false};

msg.voice = voices[7]; 
msg.text = "Service requests need attention";

document.getElementById('addWidgetsControl').insertAdjacentHTML('beforebegin', '<span id="timer" style="font-weight: bold;vertical-align: middle;padding: 2px;border: 1px;border-style: solid;border-color: black;border-radius: 2px;"></span><span style="display:inline-block; width: 10px;"></span>');

function checkStoredSettings(storedSettings) {

  if (!storedSettings.toggle) {
    browser.storage.local.set(defaultSettings);
  }

  if (storedSettings.toggle == false) {
    msg.volume = 0;
  } else {
    msg.volume = 1;
  }
};

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);


var time = 180, $timer = document.querySelector('#timer');
startTimer(time, $timer);

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  var count = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          timer = duration;
          clearInterval(count);
          reload();
      }
  }, 1000);
} 


setTimeout(check, 5000);

function check() {
    var SR = document.evaluate('/html/body/form/span/div/table[3]/tbody/tr/td[1]/table/tbody/tr[1]/td/table/tbody/tr/td/div/div[2]/div/div/div/div/div/div[1]/span[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML.toString().substring(14, 16);
    if (SR > 0) {
        window.speechSynthesis.speak(msg);
    }
};

function reload() {
    document.location.reload();
    setTimeout(check, 5000);
};

function onError(e) {
console.error(e);
};
  


 


