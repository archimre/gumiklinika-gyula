const pad = (value) => String(value).padStart(2, '0');

const els = {
  header: document.getElementById('siteHeader'),
  navToggle: document.getElementById('navToggle'),
  navMenu: document.getElementById('navMenu'),
  seasonButtons: Array.from(document.querySelectorAll('[data-season]')),
  heroSeason: document.getElementById('heroSeason'),
  range: document.getElementById('treadRange'),
  gaugeMm: document.getElementById('gaugeMm'),
  verdict: document.getElementById('verdict'),
  verdictTag: document.getElementById('verdictTag'),
  verdictText: document.getElementById('verdictText'),
  bookingForm: document.getElementById('bookingForm'),
  bookingGrid: document.getElementById('bookingGrid'),
  bookingSuccess: document.getElementById('bookingSuccess'),
  service: document.getElementById('service'),
  name: document.getElementById('name'),
  phone: document.getElementById('phone'),
  car: document.getElementById('car'),
  size: document.getElementById('size'),
  date: document.getElementById('date'),
  note: document.getElementById('note'),
  errName: document.getElementById('errName'),
  errPhone: document.getElementById('errPhone'),
  errSize: document.getElementById('errSize'),
  errDate: document.getElementById('errDate'),
  errSlot: document.getElementById('errSlot'),
  sumService: document.getElementById('sumService'),
  sumCode: document.getElementById('sumCode'),
  sumDuration: document.getElementById('sumDuration'),
  sumSize: document.getElementById('sumSize'),
  sumDateTime: document.getElementById('sumDateTime'),
  sumPrice: document.getElementById('sumPrice'),
  newBooking: document.getElementById('newBooking'),
  successNo: document.getElementById('successNo'),
  doneService: document.getElementById('doneService'),
  doneDateTime: document.getElementById('doneDateTime'),
  doneSize: document.getElementById('doneSize'),
  donePrice: document.getElementById('donePrice'),
  toast: document.getElementById('toast')
};

let season = 'winter';
let toastTimer;

function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function nextOpenDayISO() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  while (date.getDay() === 0) date.setDate(date.getDate() + 1);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatDate(value) {
  if (!value) return '—';
  const [year, month, day] = value.split('-');
  return `${year}. ${month}. ${day}.`;
}

function currentSlot() {
  const checked = document.querySelector('input[name="slot"]:checked');
  return checked ? checked.value : '';
}

function serviceData() {
  const option = els.service.selectedOptions[0];
  return {
    code: option.dataset.code,
    duration: option.dataset.duration,
    price: option.dataset.price,
    name: option.textContent.split('—')[1].trim()
  };
}

function updateSummary() {
  const data = serviceData();
  const size = els.size.value.trim() || '—';
  const dateText = formatDate(els.date.value);
  const slot = currentSlot();
  const dateTime = dateText === '—' ? '—' : `${dateText} · ${slot}`;

  els.sumService.textContent = data.name;
  els.sumCode.textContent = data.code;
  els.sumDuration.textContent = data.duration;
  els.sumSize.textContent = size.toUpperCase();
  els.sumDateTime.textContent = dateTime;
  els.sumPrice.textContent = data.price;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('is-visible'), 2600);
}

function verdictFor(mm, winter) {
  const value = mm.toFixed(1).replace('.', ',');
  if (mm < 1.6) {
    return {
      state: 'red',
      tag: 'Csere / jogi határ',
      text: `${value} mm: a profilmélység a jogi minimum (1,6 mm) alatt van. A gumi közúti használatra nem alkalmas.`
    };
  }
  if (winter && mm < 4) {
    return {
      state: 'amber',
      tag: 'Csere / téli',
      text: `${value} mm: téli viszonyokra 4 mm alatt cserét javaslunk. A jogi minimum megvan, a tapadás nem.`
    };
  }
  if (!winter && mm < 2.5) {
    return {
      state: 'amber',
      tag: 'Kopott / nyári',
      text: `${value} mm: nyári használatra kopott. Vizes úton megnő az aquaplaning kockázata.`
    };
  }
  if (winter && mm < 6) {
    return {
      state: 'green',
      tag: 'Megfelelő / téli',
      text: `${value} mm: a jogi minimum felett van. Téli viszonyokra 6 mm alatt érdemes figyelni a tapadást.`
    };
  }
  return {
    state: 'green',
    tag: 'Megfelelő',
    text: `${value} mm: ${winter ? 'téli' : 'nyári'} használatra megfelelő profilmélység.`
  };
}

function renderGauge() {
  const mm = Number(els.range.value);
  const winter = season === 'winter';
  const result = verdictFor(mm, winter);

  els.gaugeMm.textContent = mm.toFixed(1).replace('.', ',');
  els.heroSeason.textContent = winter ? 'Téli üzemmód' : 'Nyári üzemmód';
  els.verdict.dataset.state = result.state;
  els.verdictTag.textContent = result.tag;
  els.verdictText.textContent = result.text;
}

function setSeason(next) {
  season = next;
  els.seasonButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.season === next);
    button.setAttribute('aria-pressed', String(button.dataset.season === next));
  });
  renderGauge();
}

function clearErrors() {
  [els.errName, els.errPhone, els.errSize, els.errDate, els.errSlot].forEach((el) => {
    el.textContent = '';
  });
  [els.name, els.phone, els.size, els.date].forEach((input) => {
    input.removeAttribute('aria-invalid');
  });
  document.querySelectorAll('input[name="slot"]').forEach((input) => {
    input.removeAttribute('aria-invalid');
  });
}

function setError(input, target, message) {
  target.textContent = message;
  input.setAttribute('aria-invalid', 'true');
}

function validateBooking() {
  clearErrors();
  const errors = [];

  if (els.name.value.trim().length < 2) {
    setError(els.name, els.errName, 'Add meg a nevet.');
    errors.push(els.name);
  }

  const digits = els.phone.value.replace(/\D/g, '');
  if (digits.length < 9 || digits.length > 15) {
    setError(els.phone, els.errPhone, 'Érvényes telefonszámot adj meg.');
    errors.push(els.phone);
  }

  const size = els.size.value.trim();
  if (size) {
    const normalized = size.replace(/\s+/g, '').toUpperCase();
    if (!/^\d{3}\/\d{2}R\d{2}$/.test(normalized)) {
      setError(els.size, els.errSize, 'Formátum: 205/55 R16.');
      errors.push(els.size);
    }
  }

  if (!els.date.value) {
    setError(els.date, els.errDate, 'Válassz dátumot.');
    errors.push(els.date);
  } else if (els.date.value < todayISO()) {
    setError(els.date, els.errDate, 'A dátum nem lehet korábbi a mainál.');
    errors.push(els.date);
  } else if (new Date(`${els.date.value}T00:00:00`).getDay() === 0) {
    setError(els.date, els.errDate, 'Vasárnap zárva vagyunk – válassz másik napot.');
    errors.push(els.date);
  } else if (new Date(`${els.date.value}T00:00:00`).getDay() === 6) {
    const slot = currentSlot();
    if (slot === '13:00–15:00' || slot === '15:00–17:00') {
      els.errSlot.textContent = 'Szombaton csak délelőtti idősávot tudunk vállalni.';
      const checked = document.querySelector('input[name="slot"]:checked');
      if (checked) checked.setAttribute('aria-invalid', 'true');
      errors.push(checked || els.errSlot);
    }
  }

  return errors;
}

function jobNumber() {
  const now = new Date();
  const stamp = String(now.getFullYear()).slice(2)
    + pad(now.getMonth() + 1)
    + pad(now.getDate());
  return `GK-${stamp}-${Math.floor(100 + Math.random() * 900)}`;
}

function setupBooking() {
  document.querySelectorAll('.pick').forEach((button) => {
    button.addEventListener('click', () => {
      const code = button.dataset.code;
      els.service.value = code;
      els.service.dispatchEvent(new Event('change', { bubbles: true }));
      document.getElementById('idoppont').scrollIntoView({ behavior: 'smooth', block: 'start' });
      els.bookingForm.classList.remove('is-flash');
      void els.bookingForm.offsetWidth;
      els.bookingForm.classList.add('is-flash');
      showToast(`${code} kiválasztva – töltsd ki a munkalapot.`);
      setTimeout(() => els.service.focus({ preventScroll: true }), 450);
    });
  });

  els.service.addEventListener('change', updateSummary);
  els.size.addEventListener('input', updateSummary);
  els.date.addEventListener('change', updateSummary);
  document.querySelectorAll('input[name="slot"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      els.errSlot.textContent = '';
      radio.removeAttribute('aria-invalid');
      updateSummary();
    });
  });

  ['name', 'phone', 'size', 'date'].forEach((key) => {
    const input = els[key];
    input.addEventListener('input', () => {
      input.removeAttribute('aria-invalid');
      const error = els[`err${key.charAt(0).toUpperCase()}${key.slice(1)}`];
      if (error) error.textContent = '';
      els.errSlot.textContent = '';
    });
  });

  els.bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const errors = validateBooking();
    if (errors.length) {
      errors[0].focus();
      return;
    }

    const data = serviceData();
    const dateTime = `${formatDate(els.date.value)} · ${currentSlot()}`;
    const size = els.size.value.trim() || '—';
    const number = jobNumber();

    els.successNo.textContent = number;
    els.doneService.textContent = `${data.code} — ${data.name}`;
    els.doneDateTime.textContent = dateTime;
    els.doneSize.textContent = size.toUpperCase();
    els.donePrice.textContent = data.price;

    els.bookingGrid.hidden = true;
    els.bookingSuccess.hidden = false;
    els.bookingSuccess.querySelector('h3').setAttribute('tabindex', '-1');
    els.bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    els.bookingSuccess.querySelector('h3').focus({ preventScroll: true });
  });

  els.newBooking.addEventListener('click', () => {
    els.bookingForm.reset();
    els.date.value = nextOpenDayISO();
    els.date.min = todayISO();
    clearErrors();
    updateSummary();
    els.bookingGrid.hidden = false;
    els.bookingSuccess.hidden = true;
    document.getElementById('idoppont').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  els.date.min = todayISO();
  els.date.value = nextOpenDayISO();
  updateSummary();
}

function setupNav() {
  const close = () => {
    els.header.classList.remove('is-open');
    els.navToggle.setAttribute('aria-expanded', 'false');
    els.navToggle.setAttribute('aria-label', 'Menü megnyitása');
    els.navMenu.hidden = true;
  };

  els.navToggle.addEventListener('click', () => {
    const open = !els.header.classList.contains('is-open');
    els.header.classList.toggle('is-open', open);
    els.navToggle.setAttribute('aria-expanded', String(open));
    els.navToggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    els.navMenu.hidden = !open;
  });

  els.navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));

  document.addEventListener('click', (event) => {
    if (!els.header.classList.contains('is-open')) return;
    if (!els.header.contains(event.target)) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}

function setupHours() {
  const day = new Date().getDay();
  document.querySelectorAll(`.hours div[data-day="${day}"]`).forEach((row) => {
    row.classList.add('is-today');
  });
}

function setupSeason() {
  const month = new Date().getMonth();
  const winter = month >= 9 || month <= 2;
  els.seasonButtons.forEach((button) => {
    button.addEventListener('click', () => setSeason(button.dataset.season));
  });
  els.range.addEventListener('input', renderGauge);
  setSeason(winter ? 'winter' : 'summer');
}

setupNav();
setupHours();
setupSeason();
setupBooking();
