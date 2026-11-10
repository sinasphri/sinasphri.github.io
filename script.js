(function () {
  var root = document.documentElement;

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  // ----- Language -----
  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    root.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.title = lang === 'fa' ? 'سینا سپهری | Sina Sepehri' : 'Sina Sepehri | سینا سپهری';
    save('lang', lang);
  }
  setLang(root.getAttribute('data-lang') === 'en' ? 'en' : 'fa');

  document.getElementById('langBtn').addEventListener('click', function () {
    setLang(root.getAttribute('data-lang') === 'fa' ? 'en' : 'fa');
  });

  // ----- Theme -----
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  document.getElementById('themeBtn').addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    save('theme', next);
  });

  // ----- Nav: the English sections use "-en" ids -----
  document.querySelectorAll('.nav a, .brand').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var target = id === 'top' ? null
        : document.getElementById(root.getAttribute('data-lang') === 'en' ? id + '-en' : id);
      e.preventDefault();
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();
