var guy = {
  time: {
    minutes: 0,
    seconds: 0
  },
  active: false
};

var notGuy = {
  time: {
    minutes: 0,
    seconds: 0
  },
  active: false
};

var guyTime;
var notGuyTime;
var interruptions = 0;
var $guy = $("#guy");
var $notGuy = $("#notGuy");
var $interrupt = $("#interrupt");

function num_pad(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}
function add(tally, timerDisplay) {
  tally.seconds++;
  if (tally.seconds >= 60) {
    tally.minutes++;
    tally.seconds = 0;
  }
  $(timerDisplay).html(num_pad(tally.minutes) + ":" + num_pad(tally.seconds));
}

$guy.click(function() {
  $guy.toggleClass("pressed");

  if (guy.active == true) {
    guy.active = false;
    clearInterval(guyTime);
  } else {
    guy.active = true;
    if (notGuy.active == true) {
      $notGuy.toggleClass("pressed");
      notGuy.active = false;
      clearInterval(notGuyTime);
    }
    guyTime = setInterval(function() {
      add(guy.time, "#guyTime");
    }, 1000);
  }
});

$notGuy.click(function() {
  $notGuy.toggleClass("pressed");

  if (notGuy.active == true) {
    notGuy.active = false;
    clearInterval(notGuyTime);
  } else {
    notGuy.active = true;
    if (guy.active == true) {
      $guy.toggleClass("pressed");
      guy.active = false;
      clearInterval(guyTime);
    }
    notGuyTime = setInterval(function() {
      add(notGuy.time, "#notGuyTime");
    }, 1000);
  }
});

$interrupt.click(function(){
  if (guy.active){
      interruptions++;
    $notGuy.trigger("click");
  } else if (notGuy.active) {
      interruptions++;
  $guy.trigger("click");
  };
  $('#interrupts').html(interruptions);
});

$("body").keydown(function(e) {
  if (e.keyCode === 37) {
    // left
    $guy.trigger("click");
  } else if (e.keyCode === 39) {
    //right
    $notGuy.trigger("click");
  }
});

$("input").on("click", function() {
  var theme = $("input:checked").val();
  if (theme == 'dark') {
      document.documentElement.style.setProperty("--theme-color", "var(--night)"
  );
          document.documentElement.style.setProperty("--theme-color-pressed", "var(--night-pressed)"
  );
  document.documentElement.style.setProperty("--theme-font", "var(--angry-font)");
    document.documentElement.style.setProperty("--theme-button-text", "white");
  } else {
    document.documentElement.style.setProperty("--theme-font", "var(--happy-font)");
        document.documentElement.style.setProperty("--theme-button-text", "black");
    if (theme == 'pink') {
        document.documentElement.style.setProperty("--theme-color", "var(--pink)"
  );
        document.documentElement.style.setProperty("--theme-color-pressed", "var(--pink-pressed)"
  );
    } else {
              document.documentElement.style.setProperty("--theme-color", "var(--aqua)"
  );
        document.documentElement.style.setProperty("--theme-color-pressed", "var(--aqua-pressed)"
  );
    }
  }
});
