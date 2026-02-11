(() => {
  const cards = document.querySelectorAll(".projectCard");
  if (!cards.length) {
    return;
  }

  const isTabletOrMobile = () => window.matchMedia("(max-width: 1024px)").matches;
  if (!isTabletOrMobile()) {
    return;
  }

  const timers = new WeakMap();

  const startCycle = (card) => {
    if (timers.has(card)) {
      return;
    }

    const state = { timeouts: [] };
    timers.set(card, state);

    const schedule = (showSecondCycle) => {
      if (!timers.has(card)) {
        return;
      }

      if (showSecondCycle) {
        card.classList.add("isAutoScroll");
        state.timeouts.push(window.setTimeout(() => schedule(false), 5000));
      } else {
        card.classList.remove("isAutoScroll");
        state.timeouts.push(window.setTimeout(() => schedule(true), 3000));
      }
    };

    state.timeouts.push(window.setTimeout(() => schedule(true), 4500));
  };

  const stopCycle = (card) => {
    const state = timers.get(card);
    if (!state) {
      return;
    }

    state.timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timers.delete(card);
    card.classList.remove("isAutoScroll");
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        const scrollTarget = card.querySelector(".projectDescriptionText.isScrollable");
        if (!scrollTarget) {
          stopCycle(card);
          return;
        }

        if (entry.isIntersecting) {
          startCycle(card);
        } else {
          stopCycle(card);
        }
      });
    },
    { threshold: 0.6 }
  );

  cards.forEach((card) => observer.observe(card));
})();
