const modal = document.getElementById("modal")
const modalContent = document.getElementById("modal-details")

let currentLoc = document.getElementById("currentLoc")

let ip = ""

 function autocomplete(inp) {
  var currentFocus;
  var arr = []
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
        fetch("http://127.0.0.1:8000/search/", {
          method: "POST",
          body: JSON.stringify({
            query: val
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(res => res.json())
          .then((data) => {
            arr = [...data.names]
          })
          .then(() => {
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);

      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }

          })
        
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {

    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });



function Day1More() {
  fetch("http://127.0.0.1:8000/today/", { 
  method: "POST",
  body: JSON.stringify({
    location: document.getElementById("myInput").value ? document.getElementById("myInput").value : ip
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(res => res.json())
  .then((data) => {
      modalContent.innerHTML = `
      <h1>Ma</h1>
      <img src="http://${data.condition_img}" alt="weather pic" style="width:150px; height:150px;">
      <p><u><strong>${data.condition_text}</strong></u></p>
      <p><strong>Hőmérséklet: ${data.temp}°C</strong></p>
      <p>Hőérzet: ${data.feelslike}°C</p>
      <p>Csapadék valószínűsége: ${data.humidity}%</p>
      <p>Szélsebesség: ${data.windspeed}km/h</p>
      <p>Napkelte: ${data.sunrise}</p>
      <p>Napnyugta: ${data.sunset}</p>
      `;
  })
  modal.classList.remove('hidden');
}


function Day2More() {
fetch("http://127.0.0.1:8000/forecast/", {
  method: "POST",
  body: JSON.stringify({
    location: document.getElementById("myInput").value ? document.getElementById("myInput").value : ip,
    days: 1
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(res => res.json())
  .then((data) => {
      modalContent.innerHTML = `
      <h1>Holnap</h1>
      <img src="http://${data.days[0].condition_icon}" alt="weather pic" style="width:150px; height:150px;">
      <p><u><strong>${data.days[0].condition_text}</strong></u></p>
      <p><strong>Hőmérséklet: ${data.days[0].mintemp}-${data.days[0].maxtemp}°C</strong></p>
      <p>Átlagosan: ${data.days[0].avgtemp}°C</p>
      <p>UV sugárzás ${data.days[0].uv}</p>
      <p>Csapadék valószínűsége: ${data.days[0].avghumidity}%</p>
      <p>Szélsebesség: ${data.days[0].maxwind_kph}km/h</p>
      <p>Napkelte: ${data.days[0].sunrise}</p>
      <p>Napnyugta: ${data.days[0].sunset}</p>
      `;
    })
        modal.classList.remove('hidden');
}


function Day3More() {
fetch("http://127.0.0.1:8000/forecast/", {
  method: "POST",
  body: JSON.stringify({
    location: document.getElementById("myInput").value ? document.getElementById("myInput").value : ip,
    days: 2
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(res => res.json())
  .then((data) => {
      modalContent.innerHTML = `
      <h1>Holnap</h1>
      <img src="http://${data.days[1].condition_icon}" alt="weather pic" style="width:150px; height:150px;">
      <p><u><strong>${data.days[1].condition_text}</strong></u></p>
      <p><strong>Hőmérséklet: ${data.days[1].mintemp}-${data.days[1].maxtemp}°C</strong></p>
      <p>Átlagosan: ${data.days[1].avgtemp}°C</p>
      <p>UV sugárzás: ${data.days[1].uv}</p>
      <p>Csapadék valószínűsége: ${data.days[1].avghumidity}%</p>
      <p>Szélsebesség: ${data.days[1].maxwind_kph}km/h</p>
      <p>Napkelte: ${data.days[1].sunrise}</p>
      <p>Napnyugta: ${data.days[1].sunset}</p>
      `;

    })
        modal.classList.remove('hidden');
}


function Close(){
      modal.classList.add('hidden');
}

//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠛⠛⠲⢦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣄⠀⠀⠀⠈⠳⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠴⠒⠒⠒⠒⠒⠻⢦⡀⠀⠀⠀⠈⠻⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢧⣀⠀⠀⠀⠀⠀⠀⣀⣙⣷⣤⣀⣀⣀⣈⣳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⣳⣶⡶⠟⠛⠋⠉⠉⠉⠉⠉⠉⠉⠛⠻⠷⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣦⡀⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣦⡀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣄⠀⠀⠀
//⠀⠀⠀⠀⣀⠀⠀⢠⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⡆⠀⠀
//⢀⡀⠀⣾⣿⣆⢠⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣶⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣴⣿⡄⠀
//⣾⣿⣶⣽⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣷⣦⣤⣀⣠⣤⣶⣾⣿⣿⣿⣿⣿⣧⠀
//⠿⠿⠿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡽⠉⠛⠛⢿⣿⣿⣿⣿⣿⡿⠿⠟⠻⡟⠉⠉⣿⠀
//⠀⠀⣾⣿⡿⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⣿⣿⠂⣹⡵⣿⣷⠀⠀⠀⣽⠀⠀⣿⡇
//⠀⠀⠈⠋⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⡀⠀⠀⢀⣠⠞⠋⠛⠿⣄⡀⢀⡼⠃⠀⠀⣿⠁
//⠀⠀⠀⠀⠀⠸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢙⡶⠋⠀⠀⠀⠀⠀⠈⠙⢧⡀⠀⠀⢠⡿⠀
//⠀⠀⠀⠀⠀⠀⢻⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣯⣀⡀⠀⠀⠀⠀⠀⠀⠀⠈⢳⡄⠀⣼⠃⠀
//⠀⠀⠀⠀⠀⠀⠈⢿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢯⡉⠙⠓⠒⠒⠒⠶⢶⡶⠶⠿⣾⠏⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠈⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣄⠀⠀⠀⣠⠴⠋⠀⢠⣾⠋⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⡤⠞⠁⠀⣀⣴⠟⠁⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠷⣦⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⠾⠋⠁⠀⠀⠀⠀⠀⠀
//⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠷⢶⣤⣤⣤⣤⣤⣤⣤⡴⠶⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
//MATEEEEE!!!!!!!!!!!!
//mielott probalkozni kezdel inditsd el a backendet
//https://github.com/SzGeryX/weather-backend readme-ben minden le van irva :), apikulcsot atkuldtem dc-n
//igy mukodik:

let changeBtn = document.getElementById("changeBtn")
changeBtn.addEventListener("click", () => {
  setCards()
})

function setCards() {
fetch("http://127.0.0.1:8000/today/", { //erre az url-re kuldod a kerest, amivel neked foglalkozni kell az a "today/"-re es a "forecast/"-re vegzodo
  method: "POST",
  body: JSON.stringify({
    //ide irod azt amit el akarsz kuldeni a servernek mint informacio, ha "today/"-re akarsz akkor csak egy "location" kell, ha a "forecast/"-re akkor kell egy "location" es egy "days"(hany napra kered az elorejelzest) is 
    location: document.getElementById("myInput").value ? document.getElementById("myInput").value : ip
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(res => res.json())
  .then((data) => {
    //ide irod, hogy mit szeretnel az informacioval baszni amit a server visszakuldott 
    //ha egyesevel akarod az informaciokat kiszedni akkor az igy nez ki
    currentLoc.innerText = data.location
    let firstPicEl = document.getElementById("firstPic");
    firstPicEl.src="http://" + data.condition_img;
    let tempNum1El = document.getElementById("tempNum1");
    tempNum1El.innerText = data.temp;
    let humNum1El = document.getElementById("humNum1");
    humNum1El.innerText = data.humidity;
  })

fetch("http://127.0.0.1:8000/forecast/", { //erre az url-re kuldod a kerest, amivel neked foglalkozni kell az a "today/"-re es a "forecast/"-re vegzodo
  method: "POST",
  body: JSON.stringify({
    //ide irod azt amit el akarsz kuldeni a servernek mint informacio, ha "today/"-re akarsz akkor csak egy "location" kell, ha a "forecast/"-re akkor kell egy "location" es egy "days"(hany napra kered az elorejelzest) is 
    location: document.getElementById("myInput").value ? document.getElementById("myInput").value : ip,
    days: 2
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(res => res.json())
  .then((data) => {
    //ide irod, hogy mit szeretnel az informacioval baszni amit a server visszakuldott 
    //ha egyesevel akarod az informaciokat kiszedni akkor az igy nez ki

        let secondPicEl = document.getElementById("secondPic");
        secondPicEl.src="http://" + data.days[0].condition_icon;
        let tempNum2El = document.getElementById("tempNum2");
        tempNum2El.innerText = data.days[0].avgtemp;
        let humNum2El = document.getElementById("humNum2");
        humNum2El.innerText = data.days[0].avghumidity;

        let thirdPicEl = document.getElementById("thirdPic");
        thirdPicEl.src="http://" + data.days[1].condition_icon;
        let tempNum3El = document.getElementById("tempNum3");
        tempNum3El.innerText = data.days[1].avgtemp;
        let humNum3El = document.getElementById("humNum3");
        humNum3El.innerText = data.days[1].avghumidity;
  })

}

fetch("https://api.ipify.org?format=json")
                .then(response => response.json())
                .then(data => {
                  ip = data.ip
                })
  .then(() => {
    setCards()
  })