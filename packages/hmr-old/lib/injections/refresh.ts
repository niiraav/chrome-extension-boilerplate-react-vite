import initClient from '../initClient';

function addRefresh() {
  let pendingReload = false;

  initClient({
    onUpdate: () => {
      // disable reload when tab is hidden
      if (document.hidden) {
        pendingReload = true;
        return;
      }
      reload();
    },
  });

  // reload
  function reload(): void {
    pendingReload = false;
    window.location.reload();
  }

  // reload when tab is visible
  function reloadWhenTabIsVisible(): void {
    !document.hidden && pendingReload && reload();
  }
  document.addEventListener('visibilitychange', reloadWhenTabIsVisible);
}

addRefresh();