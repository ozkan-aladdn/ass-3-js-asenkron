const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");

/* ---------------------------------- */
/*         //tarihi belirleme         */
/* ---------------------------------- */
const outputDate=()=>{
  let currentDate=new Date();
  let date=currentDate.toLocaleDateString();
  let time = currentDate.toLocaleTimeString();
  
  let currentDateTime=date + " " + time;
  tarih.textContent=currentDateTime;
}
setInterval(outputDate,1000);



/* ---------------------------------- */
/*          loading çalıştır          */
/* ---------------------------------- */
setTimeout(() => {
  loadingDiv.style.display = "none";
  containerDiv.classList.remove("d-none");
  containerDiv.classList.add("d-flex");
  cats();
}, 3000);

/* ---------------------------------- */
/*          veriileri getirme         */
/* ---------------------------------- */

function cats() {
  cardDiv.innerHTML =`<img src="./img/loading.gif"/>`;
  fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then((res) => {
      if (!res.ok) {
        throw new Error("");
      }
      return res.json();
    })
    .then((data) => showCat(data))
    .catch((err) => {
        cardDiv.innerHTML = `<img src="./img/error.gif"/>`;
    });
}


// butona tıklanınca resimlerin gelmesi

btn.onclick = () => {
  
  cats();
};


/* ---------------------------------- */
/*            resimleri çiz           */
/* ---------------------------------- */
function showCat(cat) {
  cardDiv.innerHTML = "";
  cat.forEach(({ url }) => {
    cardDiv.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4">
            <div style="height:200px;">
                <img src="${url}" class="w-100 h-100" alt="...">
            </div>
        </div>
    `;
  });
}