(()=>{"use strict";(()=>{function e(e,t){let n=!1;return n=e.test(t),n}document.getElementById("submit").addEventListener("click",(()=>{const t=![e(/\S+/,document.getElementById("titleInput").value),Number(document.getElementById("priceInput").value)>=0,Number(document.getElementById("sizeInput").value)>0,e(/[0-9]{13}/,document.getElementById("isbnInput").value)].includes(!1);console.log(t)}))})()})();