// Shamefully stolen from https://codepen.io/Hyperplexed/pen/OJdpEME

let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  snowflakeTimestamp: start,
  snowflakePosition: originPosition,
  mousePosition: originPosition
}

const config = {
  snowflakeAnimationDuration: 1500,
  minimumTimeBetweenSnowflakes: 250,
  minimumDistanceBetweenSnowflakes: 75,
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
}

let count = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const selectRandom = (items) => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`;
const px = value => withUnit(value, "px");
const ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
        diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = (element) => document.body.appendChild(element);
const removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createSnowflake = (position) => {
  const snowflake = document.createElement("span");

  snowflake.className = "snowflake fa-solid fa-snowflake";

  snowflake.style.left = px(position.x);
  snowflake.style.top = px(position.y);
  snowflake.style.fontSize = selectRandom(config.sizes);
  snowflake.style.animationName = config.animations[count++ % 3];
  snowflake.style.snowflakeAnimationDuration = ms(config.snowflakeAnimationDuration);

  appendElement(snowflake);

  removeElement(snowflake, config.snowflakeAnimationDuration);
}


const updateLastSnowflake = position => {
  last.snowflakeTimestamp = new Date().getTime();

  last.snowflakePosition = position;
}

const updateLastMousePosition = (position) => last.mousePosition = position;

const adjustLastMousePosition = (position) => {
  if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const handleOnMove = e => {
  const mousePosition = { x: e.pageX, y: e.pageY }
  adjustLastMousePosition(mousePosition);

  const now = new Date().getTime();
  const hasMovedFarEnough = calcDistance(last.snowflakePosition, mousePosition) >= config.minimumDistanceBetweenSnowflakes;
  const hasBeenLongEnough = calcElapsedTime(last.snowflakeTimestamp, now) > config.minimumTimeBetweenSnowflakes;

  if(hasMovedFarEnough || hasBeenLongEnough) {
    createSnowflake(mousePosition);

    updateLastSnowflake(mousePosition);
  }

  updateLastMousePosition(mousePosition);
}

const DECEMBER = 11;
$(document).ready(() => {
  // let it snow (in december)!
  if (new Date().getMonth() === DECEMBER) {
    window.onmousemove = e => handleOnMove(e);
    window.ontouchmove = e => handleOnMove(e.touches[0]);
    document.body.onmouseleave = () => updateLastMousePosition(originPosition);
  }
});
