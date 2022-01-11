
window.findChain = (h, data) => {
  let arr = [];

  function getNames(obj) {
    if (obj && data && obj.code === data.code && obj.type === data.type) {
      var pos = arr.map(function (e) {
        return e.code;
      }).indexOf(obj.code);
      if (pos === -1) {
        arr.push(obj);
        return true;
      }
    } else {
      if (obj && data && obj.children && obj.children.length > 0) {
        return Object.values(obj.children).filter(e => {
          let res = getNames(e);
          if (res) {
            arr.push(obj);
            return true
          }
        }).length > 0
      }
    }
  }
  getNames(h);
  return arr;
}



