(() => {
  const promo = "BUCK";
  const copyBtn = document.getElementById("copyPromo");
  const toast = document.getElementById("toast");
  const multEl = document.getElementById("multiplier");
  const playersEl = document.getElementById("playersOnline");

  const isEn = document.documentElement.lang?.toLowerCase().startsWith("en");
  const locale = isEn ? "en-US" : "ru-RU";
  const copiedMsg = isEn ? "Promo code copied" : "Промокод скопирован";
  const failedMsg = isEn ? "Failed to copy promo code" : "Не удалось скопировать промокод";

  let toastTimer = null;

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {}

    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (_) {
      return false;
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const ok = await copyText(promo);
      showToast(ok ? copiedMsg : failedMsg);
    });
  }

  function initPlayers() {
    if (!playersEl) return;
    const base = 1800 + Math.floor(Math.random() * 700);
    let current = base;
    playersEl.textContent = current.toLocaleString(locale);

    window.setInterval(() => {
      const step = Math.floor((Math.random() - 0.48) * 42);
      current = Math.max(900, Math.min(9999, current + step));
      playersEl.textContent = current.toLocaleString(locale);
    }, 1800);
  }

  function initMultiplier() {
    if (!multEl) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    let start = performance.now();
    let crashAt = 1.7 + Math.random() * 6.8;

    function frame(t) {
      if (document.hidden) {
        requestAnimationFrame(frame);
        return;
      }
      const seconds = (t - start) / 1000;
      const x = 1 + (Math.exp(seconds / 2.45) - 1) * 0.42;

      if (x >= crashAt) {
        multEl.textContent = `${crashAt.toFixed(2)}x`;
        multEl.style.color = "#ff2bd6";
        multEl.style.textShadow = "0 0 18px rgba(255,43,214,.35), 0 0 26px rgba(34,211,238,.18)";
        window.setTimeout(() => {
          multEl.style.color = "";
          multEl.style.textShadow = "";
          start = performance.now();
          crashAt = 1.6 + Math.random() * 7.4;
          requestAnimationFrame(frame);
        }, 650);
        return;
      }

      multEl.textContent = `${x.toFixed(2)}x`;
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  initPlayers();
  initMultiplier();
})();
