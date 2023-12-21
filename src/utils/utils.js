export function hasUrlParameter(paramName) {
  const url = window.location.search || window.location.hash;
  if (window.URLSearchParams) {
    const urlParams = new URLSearchParams(url);
    return urlParams.has(paramName);
  } else {
    // if browser doesn't support URLSearchParams
    const hasUrlParam = (name) => {
      name = name
        .replace(new RegExp("[\\[]"), "\\[")
        .replace(new RegExp("[\\]]"), "\\]");
      var regex = new RegExp("[\\?&]" + name + "[&|=]([^&#]*)");
      var results = regex.exec(url);
      return !!results;
    };
    return hasUrlParam(paramName);
  }
}

export function getUrlParameter(paramName) { 
  let value = "";
  const splitted = (window.location.search || window.location.hash).split('?', 2);
  if(splitted.length !== 2) return '';

  const url = `?${splitted[1]}`;
  if (window.URLSearchParams) {
    const urlParams = new URLSearchParams(url);
    if (urlParams.has(paramName)) {
      const values = urlParams.getAll(paramName);
      // use the latest one
      value = values.length > 0 ? values[values.length - 1] : "";
    }
  } else {
    // if browser doesn't support URLSearchParams
    const getUrlParam = (name) => {
      name = name
        .replace(new RegExp("[\\[]"), "\\[")
        .replace(new RegExp("[\\]]"), "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(url);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    value = getUrlParam(paramName);
  }
  return value;
}

export function getAllUrlParameterValues(paramName) {
  const url = window.location.search || window.location.hash;
  let values = [];
  if (window.URLSearchParams) {
    const urlParams = new URLSearchParams(url);
    if (urlParams.has(paramName)) 
      values = urlParams.getAll(paramName);
  } else {
      // if browser doesn't support URLSearchParams
    const getUrlParams = (name) => {
      const res = [];
      name = name
        .replace(new RegExp("[\\[]"), "\\[")
        .replace(new RegExp("[\\]]"), "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      let results;
      let str = url;
      while((results = regex.exec(str)) != null) {
        console.log('results', results);
        str = str.substring(results.index+1);
        console.log(str);
        res.push(decodeURIComponent(results[1].replace(/\+/g, " ")));
      }
      return res;
    };
    values = getUrlParams(paramName);    
  }

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
