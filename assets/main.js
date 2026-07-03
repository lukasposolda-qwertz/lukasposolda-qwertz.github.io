// Lukas Posolda · personal site

// ---- flip word in hero ----
(function () {
  const words = ["ANALYST", "ADVISOR", "RUNNER", "BUILDER", "NAIVE REALIST"];
  const el = document.getElementById("flipword");
  if (!el) return;
  let i = 0;
  setInterval(function () {
    i = (i + 1) % words.length;
    el.classList.add("flip");
    setTimeout(function () { el.textContent = words[i]; }, 240);
    setTimeout(function () { el.classList.remove("flip"); }, 520);
  }, 2600);
})();

// ---- runner marker on the route strip ----
(function () {
  const runner = document.getElementById("roadRunner");
  if (!runner) return;
  function update() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    runner.style.top = (p * 100).toFixed(2) + "%";
  }
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

// ---- reveal on scroll ----
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();

// ---- count-up stats ----
(function () {
  const nums = document.querySelectorAll(".stat-num");
  if (!nums.length) return;
  function animate(el) {
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + (t === 1 ? suffix : "");
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (!("IntersectionObserver" in window)) {
    nums.forEach(function (el) {
      el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  nums.forEach(function (el) { io.observe(el); });
})();
