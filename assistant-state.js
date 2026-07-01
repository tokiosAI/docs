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
 * when open, so we key off its rendered width. Because it *animates* open via a
 * CSS transition (and CSS transitions don't emit DOM mutations), we re-check on
 * `transitionend` and after a short settle delay in addition to the mutation
 * observer — otherwise the check runs mid-animation and misses the open state.
 * See STYLE_NOTES.md.
 */
(function () {
  if (window.__tokiosAssistantState) return;
  window.__tokiosAssistantState = true;

  var root = document.documentElement;

  function assistantIsOpen() {
    var panel = document.getElementById("chat-assistant-sheet");
    return !!panel && panel.getBoundingClientRect().width > 100;
  }

  function apply() {
    root.classList.toggle("assistant-open", assistantIsOpen());
  }

  var rafPending = false;
  var settleTimer = null;
  function schedule() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(function () {
        rafPending = false;
        apply();
      });
    }
    // The panel slides open/closed with a CSS transition, which emits no
    // mutations — so re-check once things settle to catch the final width.
    clearTimeout(settleTimer);
    settleTimer = setTimeout(apply, 400);
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

  // Fires when the panel finishes sliding open or closed.
  document.addEventListener("transitionend", schedule, true);
  window.addEventListener("resize", schedule);
})();
