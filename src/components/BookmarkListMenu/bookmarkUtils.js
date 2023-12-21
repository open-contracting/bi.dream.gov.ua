// function createSpan(text, classes) {
//   const span = document.createElement('SPAN');
//   span.innerText = text;
//   span.classList.add(classes);
//   return span;
// }

import ReactGA from "react-ga4";

export function GASendEvent(eventCategory, eventAction, eventLabel) {
  // window.ga && 
  //   window.ga('send', 'event', eventCategory, eventAction, eventLabel);
  ReactGA.event({
    category: eventCategory,
    action: eventAction,
    label: eventLabel, // optional
    // value: 99, // optional, must be a number
    // nonInteraction: true, // optional, true/false
    // transport: "xhr", // optional, beacon/xhr/image
  });
  
}


function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = '-100';
  textArea.style.left = '-100';
  textArea.style.position = 'absolute';

  document.body.appendChild(textArea);
  let successful = false;
  try {
    textArea.focus();
    textArea.select();
    try {
      successful = document.execCommand('copy');
    } catch (err) {
      successful = false;
    }
  } finally {
    document.body.removeChild(textArea);
  }

  return successful;
}

export async function copyTextToClipboard(text) {
  let isCopied = false;
  if (!navigator.clipboard) {
    isCopied = fallbackCopyTextToClipboard(text);
    return isCopied;
  }
  try {
    isCopied = await navigator.clipboard.writeText(text);
  } catch(err) {
    fallbackCopyTextToClipboard(text);
  }
  return isCopied;
}

export async function CopyAndNotify(e, valueToCopy) {
  //const x = e.clientX, y = e.clientY;
  window.focus();
  // Remove focus from any focused element
  if (document.activeElement) {
    document.activeElement.blur();
  }
  await copyTextToClipboard(valueToCopy);
  // animate copy
  // const copiedSpan = createSpan('Copied', 'bm-copied');
  // copiedSpan.style.top = `${y - 30}px`;
  // copiedSpan.style.left = `${x}px`;
  // copiedSpan.style.position = 'fixed';
  // copiedSpan.style.zIndex = 1001;
  // document.body.appendChild(copiedSpan);
  // copiedSpan.classList.add('animate');
  // //copiedSpan.style.top = `${y - 50}px`;
  // copiedSpan.addEventListener('animationend', () => {
  //   document.body.removeChild(copiedSpan);
  // });
}

function pushDates(a) {
  const aDates = [];
  if(a.qMeta.createdDate) aDates.push(new Date(a.qMeta.createdDate));
  if(a.qMeta.modifiedDate) aDates.push(new Date(a.qMeta.modifiedDate));
  if(a.qMeta.publishTime) aDates.push(new Date(a.qMeta.publishTime));
  return aDates;
}

export function sortByDate(a, b) {
  const date1 = Math.max(...pushDates(a));
  const date2 = Math.max(...pushDates(b));
  return date2 - date1;
}

export function sortByDateReverse(a, b) {
  return - sortByDate(a, b);
}

export function sortAtoZ(a, b) {
  return a.qMeta.title.localeCompare(b.qMeta.title);
}

export function sortZtoA(a, b) {
  return - sortAtoZ(a, b);
}