/*
 * assistant-state.js
 * -----------------------------------------------------------------------------
 * Mintlify runs any .js file in the repo on every page. This one adds the CSS
 * state signal that the theme itself doesn't expose: it toggles an
 * `assistant-open` class on <html> whenever the "Ask Assistant" panel
 * (#chat-assistant-sheet) is visible.
 *
 * style.css uses `html:not(.assistant-open)` to apply the centered-band layout
 * only while the Assistant is closed, and to stand down (fall back to the
 * theme's native, Assistant-safe layout) the moment it opens — so the content
 * no longer gets shoved sideways.
 *
 * The panel element is always in the DOM; it's ~0px wide when closed and wide
 * when open, so we key off its rendered width. See STYLE_NOTES.md.
 */
(function () {
  if (window.__tokiosAssistantState) return;
  window.__tokiosAssistantState = true;

  var root = document.documentElement;

  function assistantIsOpen() {
    var panel = document.getElementById("chat-assistant-sheet");
    return !!panel && panel.getBoundingClientRect().width > 100;
  }

  var queued = false;
  function apply() {
    queued = false;
    root.classList.toggle("assistant-open", assistantIsOpen());
  }
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  }

  schedule();

  try {
    new MutationObserver(schedule).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });
  } catch (e) {
    /* no-op: if observation fails, the layout simply stays in its default state */
  }

  window.addEventListener("resize", schedule);
})();
