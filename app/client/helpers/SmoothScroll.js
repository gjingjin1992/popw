function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) {
    return self.pageYOffset;
  }
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop) {
    return document.documentElement.scrollTop;
  }
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) {
    return document.body.scrollTop;
  }
  return 0;
}

function elmYPosition(eID) {
  let elm = document.getElementById(eID);
  if (elm === null) {
    console.warn('#dfd4s cant smooth scroll to non existing element id: ' + eID);
  } else {
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }
    return y;
  }
  return 0;
}

export const ElementInViewport = ({eID}) => {
  let el = document.getElementById(eID);
  let top = el.offsetTop;
  let left = el.offsetLeft;

  const width = el.offsetWidth;
  const height = el.offsetHeight;

  while (el.offsetParent) {

    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
};

export const SmoothScroll = ({eID, padding = 0}) => {
  let startY = currentYPosition();
  let stopY = elmYPosition(eID);
  stopY += padding;
  let distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  let speed = Math.round(distance / 100);
  if (speed >= 20) {
    speed = 20;
  }
  let step = Math.round(distance / 25);
  let leapY = stopY > startY ? startY + step : startY - step;
  let timer = 0;
  if (stopY > startY) {
    for (let i = startY; i < stopY; i += step) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
      leapY += step;
      if (leapY > stopY) {
        leapY = stopY;
      }
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
    leapY -= step;
    if (leapY < stopY) {
      leapY = stopY;
    }
    timer++;
  }
  return false;
};
