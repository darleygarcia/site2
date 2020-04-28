const hamburger = document.querySelector('.hamburger');
const lineOne = hamburger.querySelector('.line-one');
const lineTwo = hamburger.querySelector('.line-two');
const lineThree = hamburger.querySelector('.line-three');

const lines = [lineOne, lineTwo, lineThree];

var tl = gsap.timeline();

var toggleMenu = gsap.timeline({ paused: true });
toggleMenu.reversed(true); // IMPORTANT to set the init state to true

const nextStateMap = {
  true: () => {
    toggleMenu.play();
    toggleMenu.reversed(false);
  },
  false: () => {
    toggleMenu.reverse();
    toggleMenu.reversed(true);
  }
}

toggleMenu
    .to(lineTwo, .25, {transformOrigin: "50% 50%", scale: 0}, 0)
    .to(lineThree, .25, {transformOrigin: "50% 50%"}, "change")
    .to(lineOne, .25, {transformOrigin: "50% 50%"}, "change")
    .to(lineThree, .25, {y: -15}, 0)
    .to(lineOne, .25, {y: 15}, 0)
    .to(lineThree, .25, {rotation: -45}, "cross")
    .to(lineOne, .25, {rotation: 45}, "cross");

hamburger.addEventListener('click', () => {
  const isReversed = toggleMenu.reversed();
  hamburger.classList.toggle('js-x');
  nextStateMap[isReversed]();
})