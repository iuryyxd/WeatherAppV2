export const sidebarAnimation = {
  initial: { opacity: 0, x: -window.innerWidth },
  animate: { opacity: 1, x: 0 },
};

export const sidebarSearchAnimation = {
  initial: { opacity: 0, x: -window.innerWidth },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -window.innerWidth },
};

export const mainAnimation = {
    initial: { opacity: 0, x: window.innerWidth },
    animate: { opacity: 1, x: 0 },
}
