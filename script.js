(function () {
  var WEDDING_DATE = new Date('2026-09-11T19:00:00+05:00');

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

    setValue('countdown-days', pad(days));
    setValue('countdown-hours', pad(hours));
    setValue('countdown-minutes', pad(minutes));
    setValue('countdown-seconds', pad(seconds));
  }

  function setValue(id, value) {
    var el = document.getElementById(id);
    if (el.textContent === value) {
      return;
    }
    el.textContent = value;
    el.classList.remove('tick');
    void el.offsetWidth;
    el.classList.add('tick');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

(function () {
  var copyButton = document.getElementById('gift-copy-button');
  var cardNumber = document.getElementById('gift-card-number');
  var originalLabel = copyButton.textContent;

  copyButton.addEventListener('click', function () {
    var text = cardNumber.textContent.trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        copyButton.textContent = 'Nusxalandi!';
        setTimeout(function () {
          copyButton.textContent = originalLabel;
        }, 2000);
      });
    }
  });
})();

(function () {
  function tryPhotoBackground(sectionId, filename) {
    var img = new Image();
    img.onload = function () {
      var section = document.getElementById(sectionId);
      section.style.backgroundImage =
        "linear-gradient(180deg, rgba(20,14,12,0.22), rgba(20,14,12,0.72)), url('" + filename + "')";
      section.classList.add('photo-bg');
    };
    img.src = filename;
  }

  tryPhotoBackground('hero', 'images/hero-bg.jpg');
  tryPhotoBackground('location', 'images/location-bg.jpg');
})();

(function () {
  var revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('in-view');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();

(function () {
  var music = document.getElementById('bg-music');
  var toggle = document.getElementById('music-toggle');
  var overlay = document.getElementById('intro-overlay');
  var openButton = document.getElementById('intro-open');

  document.body.classList.add('intro-locked');

  function setPlayingUI(isPlaying) {
    toggle.classList.toggle('playing', isPlaying);
  }

  function startMusic() {
    music.play().then(function () {
      setPlayingUI(true);
    }).catch(function () {});
  }

  toggle.addEventListener('click', function (event) {
    event.stopPropagation();
    if (music.paused) {
      startMusic();
    } else {
      music.pause();
      setPlayingUI(false);
    }
  });

  openButton.addEventListener('click', function () {
    overlay.classList.add('opening');
    document.body.classList.remove('intro-locked');
    startMusic();
    setTimeout(function () {
      overlay.setAttribute('hidden', '');
    }, 1000);
  });
})();

(function () {
  var MONTHS_UZ = [
    'YANVAR', 'FEVRAL', 'MART', 'APREL', 'MAY', 'IYUN',
    'IYUL', 'AVGUST', 'SENTYABR', 'OKTABR', 'NOYABR', 'DEKABR'
  ];
  var YEAR = 2026;
  var MONTH_INDEX = 8; /* September, 0-based */
  var WEDDING_DAY = 11;

  var monthLabel = document.getElementById('calendar-month');
  var grid = document.getElementById('calendar-grid');

  monthLabel.textContent = MONTHS_UZ[MONTH_INDEX] + ' ' + YEAR;

  var firstWeekday = new Date(YEAR, MONTH_INDEX, 1).getDay();
  var leadingEmpty = (firstWeekday + 6) % 7; /* Monday-first offset */
  var daysInMonth = new Date(YEAR, MONTH_INDEX + 1, 0).getDate();

  for (var i = 0; i < leadingEmpty; i++) {
    var empty = document.createElement('span');
    empty.className = 'calendar-day empty';
    grid.appendChild(empty);
  }

  for (var day = 1; day <= daysInMonth; day++) {
    var cell = document.createElement('span');
    cell.className = 'calendar-day' + (day === WEDDING_DAY ? ' highlight' : '');
    cell.textContent = day;
    grid.appendChild(cell);
  }
})();
