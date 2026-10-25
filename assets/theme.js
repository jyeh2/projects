// Light/dark theme: follows the system setting until the visitor picks one with
// the toggle; the choice is remembered. Loaded in <head> so there's no flash.
(function () {
  var KEY = "theme", root = document.documentElement;
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}

  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    function label() {
      var next = current() === "dark" ? "light" : "dark";
      btn.textContent = next === "dark" ? "Dark mode" : "Light mode";
      btn.setAttribute("aria-label", "Switch to " + next + " mode");
    }
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
    label();
    document.body.appendChild(btn);
  });
})();
