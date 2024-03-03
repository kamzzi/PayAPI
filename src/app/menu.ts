import { ALL_FOCUSABLE_ELEMENTS } from "./utils";

const hamburgerButton = document.querySelector("[data-hamburger]");
const navigation = document.querySelector(".navigation");

const navigationLinks = navigation?.querySelectorAll<HTMLAnchorElement>(
  ALL_FOCUSABLE_ELEMENTS
);

const firstLink = navigationLinks && navigationLinks[0];
const lastLink = navigationLinks && navigationLinks[navigationLinks.length - 1];

const toggleMenu = () => {
  toggleARIA();
  navigation?.classList.toggle("active");

  if (navigation?.classList.contains("active")) {
    firstLink?.focus();
    document.addEventListener("keydown", trapFocus);
  } else {
    document.removeEventListener("keydown", trapFocus);
  }
};

const toggleARIA = () => {
  const isExpanded = hamburgerButton?.getAttribute("aria-expanded");

  hamburgerButton?.setAttribute(
    "aria-expanded",
    isExpanded === "true" ? "false" : "true"
  );
  hamburgerButton?.setAttribute(
    "aria-label",
    isExpanded === "true" ? "Open navigation" : "Close navigation"
  );
};

const trapFocus = (event: KeyboardEvent) => {
  if (event.key === "Tab") {
    if (event.shiftKey) {
      if (document.activeElement === firstLink) {
        event.preventDefault();
        lastLink?.focus();
      }
    } else {
      if (document.activeElement === lastLink) {
        event.preventDefault();
        firstLink?.focus();
      }
    }
  }

  if (event.key === "Escape") {
    toggleMenu();
  }
};

hamburgerButton?.addEventListener("click", toggleMenu);
