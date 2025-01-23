export function hasUrlParameter(paramName) {
  const url = window.location.search || window.location.hash;
  const urlParams = new URLSearchParams(url);
  return urlParams.has(paramName);
}

export function getUrlParameter(paramName) { 
  let value = "";
  const splitted = (window.location.search || window.location.hash).split('?', 2);
  if(splitted.length !== 2) return '';

  const url = `?${splitted[1]}`;
  const urlParams = new URLSearchParams(url);
  if (urlParams.has(paramName)) {
    const values = urlParams.getAll(paramName);
    // use the latest one
    value = values.length > 0 ? values[values.length - 1] : "";
  }
  return value;
}

export function getAllUrlParameterValues(paramName) {
  const url = window.location.search || window.location.hash;
  let values = [];
  const urlParams = new URLSearchParams(url);
  if (urlParams.has(paramName)) 
    values = urlParams.getAll(paramName);

  return values;
}

export function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

export function dispatchTouchEvent(e, eventType) {
  const target = document.elementFromPoint(
    e.srcEvent.clientX,
    e.srcEvent.clientY
  );
  if (target) {
    const touchObj = new Touch({
      identifier: Date.now(),
      target: target,
      clientX: e.srcEvent.clientX,
      clientY: e.srcEvent.clientY,
      pageX: e.srcEvent.pageX,
      pageY: e.srcEvent.pageY,
      screenX: e.srcEvent.screenX,
      screenY: e.srcEvent.screenY,
      // radiusX: 2.5,
      // radiusY: 2.5,
      // rotationAngle: 10,
      // force: 0.5,
    });

    const te = new TouchEvent(eventType, {
      cancelable: true,
      bubbles: true,
      touches: [touchObj],
      targetTouches: [touchObj],
      changedTouches: [touchObj],
      clientX: e.srcEvent.clientX,
      clientY: e.srcEvent.clientY,
    });
    target.dispatchEvent(te);
  }
}

export function dispatchPointerEvent(e, eventType) {
  const target = document.elementFromPoint(
    e.srcEvent.clientX,
    e.srcEvent.clientY
  );
  if (target) {
    const pe = new PointerEvent(eventType, {
      bubbles: true,
      cancelable: true,
      composed: true,
      pointerId: e.srcEvent.pointerId,
      pointerType: e.srcEvent.pointerType,
      clientX: e.srcEvent.clientX,
      clientY: e.srcEvent.clientY,
    });
    target.dispatchEvent(pe);
  }
}
