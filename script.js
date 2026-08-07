(function () {
  var WEDDING_DATE = new Date('2026-09-15T17:00:00+05:00');

  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function updateCountdown() {
    var now = new Date();
    var diff = WEDDING_DATE.getTime() - now.getTime();

    var fallback = document.getElementById('countdown-fallback');
    var timer = document.getElementById('countdown-timer');
    var message = document.getElementById('countdown-message');

    if (diff <= 0) {
      fallback.hidden = true;
      timer.hidden = true;
      message.hidden = false;
      return;
    }

    fallback.hidden = true;
    timer.hidden = false;
    message.hidden = true;

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    document.getElementById('countdown-days').textContent = pad(days);
    document.getElementById('countdown-hours').textContent = pad(hours);
    document.getElementById('countdown-minutes').textContent = pad(minutes);
    document.getElementById('countdown-seconds').textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// NEXT_SCRIPT
