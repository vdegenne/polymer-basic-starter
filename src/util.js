export function purifyFormObject(object, nullToUndefined = true, emptyStringToUndefined = true) {
  for (const p in object) {
    if (object[p] === null && nullToUndefined) {
      object[p] = undefined;
    }
    if (object[p] === '' && emptyStringToUndefined) {
      object[p] = undefined;
    }

    // convert string number to number
    if (parseInt(object[p]).toString() === object[p]) {
      object[p] = parseInt(object[p]);
    }
  }
}


function createMap(object, id = 'id') {
  const map = {};
  for (const e of object) {
    map[e[id]] = e;
  }
  return map;
}