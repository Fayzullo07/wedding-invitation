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
  var TELEGRAM_BOT_TOKEN = '8668532128:AAHLseefkFeI3l9UKNRgD6MH3s9cwVYgDg8';
  var TELEGRAM_CHAT_ID = '-1004324183848';

  var form = document.getElementById('rsvp-form');
  var attendButtons = form.querySelectorAll('.attend-btn');
  var guestsField = document.getElementById('rsvp-guests-field');
  var attending = 'yes';

  attendButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      attendButtons.forEach(function (b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
      attending = btn.dataset.value;
      guestsField.hidden = attending !== 'yes';
    });
  });

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function sendRsvpToTelegram(data) {
    if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
      return Promise.resolve();
    }

    var attendingYes = data.attending === 'yes';
    var lines = [
      attendingYes ? '🎉 <b>Yangi mehmon tasdiqladi!</b>' : '💌 <b>Yangi javob keldi</b>',
      '',
      '👤 <b>Ism:</b> ' + escapeHtml(data.name),
      (attendingYes ? '✅' : '❌') + ' <b>Keladimi:</b> ' + (attendingYes ? 'Ha, albatta' : "Afsuski, yo'q")
    ];
    if (attendingYes) {
      lines.push('👥 <b>Mehmonlar soni:</b> ' + escapeHtml(data.guests));
    }
    if (data.message) {
      lines.push('💬 <b>Xabar:</b> ' + escapeHtml(data.message));
    }

    var url = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage';
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: lines.join('\n'), parse_mode: 'HTML' })
    }).catch(function (err) {
      console.error('Telegramga yuborishda xatolik:', err);
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var submitBtn = form.querySelector('.rsvp-submit');
    var data = {
      name: document.getElementById('rsvp-name').value.trim(),
      attending: attending,
      guests: document.getElementById('rsvp-guests').value,
      message: document.getElementById('rsvp-message').value.trim()
    };

    submitBtn.disabled = true;

    sendRsvpToTelegram(data).finally(function () {
      form.hidden = true;
      document.getElementById('rsvp-thanks').classList.add('show');
    });
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
