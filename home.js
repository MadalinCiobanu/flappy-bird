const highscore = document.querySelector(".score");
const screen = document.querySelector(".screen");
const back = document.querySelector("#back");
const first = document.getElementById("1st")
const second = document.getElementById("2nd");
const third = document.getElementById("3rd");

 highscore.addEventListener('click', function () {

        if (highscore.getAttribute("class") === "score") {

               screen.removeAttribute("class");
               highscore.setAttribute("class", "game_over");
               highscore.classList.add("appear");

               if (localStorage.getItem("1st") !== null) {
                      let node = document.createTextNode(`1st - ${localStorage.getItem("1st")} points`);
                     first.appendChild(node);
               }
               if (localStorage.getItem("2nd") !== null) {
                      let node = document.createTextNode(`2nd - ${localStorage.getItem("2nd")} points`);
                      second.appendChild(node);
               }
               if (localStorage.getItem("3rd") !== null) {
                      let node3 = document.createTextNode(`3rd - ${localStorage.getItem("3rd")} points`);
                     third.appendChild(node3);
               }
        }

    })

back.addEventListener('click', ()=>{location.reload()});