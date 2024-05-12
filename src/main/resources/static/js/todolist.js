// -----------------------------------------------------------------------------------------------
// timer time input backend

window.addEventListener("DOMContentLoaded", (event) => {
    if(document.getElementById("addTime")) {
        let input = document.getElementById("addTime");
        input.addEventListener('keydown', function (event) {
            const key = event.key;
            if ((key === "Backspace" || key === "Delete") && input.value.length == 6) {
                document.getElementById("addTime").value = document.getElementById("addTime").value.slice(0,3);
            } else if((key === "Backspace" || key === "Delete") && input.value.length == 11){ 
                document.getElementById("addTime").value = document.getElementById("addTime").value.slice(0,8);
            }
        });
    }
});

function addTab() {
    var timeInput = document.getElementById("addTime").value;
    if(timeInput.length == 3) { 
        document.getElementById("addTime").value = timeInput.slice(0,2)+ " : " + timeInput.slice(2, timeInput.length);
    } else if(timeInput.length == 8) {
        document.getElementById("addTime").value = timeInput.slice(0,7) + " : " + timeInput.slice(7, timeInput.length);
    }
}

// -----------------------------------------------------------------------------------------------
// timer functionality 

class Timer {
    constructor(root, timerTime) {
        root.innerHTML = Timer.getHTML();
        this.el = {
            seconds: root.querySelector(".timer__part--seconds"),
            minutes: root.querySelector(".timer__part--minutes"),
            hours: root.querySelector(".timer__part--hours"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset"),
        };
        
        this.interval = null;
        this.remainingSeconds = timerTime;
        this.updateInterfaceTime();
        
        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            } else {
                    this.stop();
            }
        });
        
        this.el.reset.addEventListener("click", () => {
            if(!(this.el.hours.innerText == "00" && this.el.minutes.innerText == "00" && this.el.seconds.innerText == "00")) {
                this.stop();
                this.remainingSeconds = timerTime;
                this.updateInterfaceTime();
            }
        });
    }
        
    updateInterfaceTime() {
        const hours = Math.floor(this.remainingSeconds / 3600);
        const remainder = this.remainingSeconds - hours * 3600;
        const minutes = Math.floor(remainder / 60);
        const seconds = remainder - (minutes * 60);
            
        this.el.hours.textContent = hours.toString().padStart(2, "0");
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
        
    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }
        
    start() {
        if (this.remainingSeconds === 0) return;
        this.interval = setInterval(() => {
            this.remainingSeconds--;
                this.updateInterfaceTime();
                if (this.remainingSeconds === 0) {
                    this.stop();
                    this.el.hours.parentElement.parentElement.style.filter = "brightness(50%)";
                    const a = this.el.hours.parentElement.parentElement;
                    const b = a.querySelector(".fa-regular");
                    const c = a.querySelector(".timer__time").textContent;
                    b.style.visibility = "";
                    console.log(b);

                    b.addEventListener("click", () => {
                        this.el.hours.parentElement.parentElement.style.filter = "brightness(100%)";
                        b.style.visibility = "hidden";
                        this.remainingSeconds = c;
                        this.updateInterfaceTime();
                    });
                }
            }, 1000);
        
        this.updateInterfaceControls();
    }
        
    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    }
    
    static getHTML() {
        return `
            <span class="timer__part timer__part--hours">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
            <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                <span class="material-icons">play_arrow</span>
            </button>
            <button type="button" class="timer__btn timer__btn--reset">
                <span class="material-icons">timer</span>
            </button>
        `;
    }
}

const divList = document.querySelector('.listHolder');
    
    
const listUl = document.querySelector('.list');
const lis = listUl.children;

function createTimer(li) {
	const del_buttons = document.querySelectorAll(".delete__button");
	const remove = document.createElement('button');
    remove.className = "fa-solid fa-trash-can";
    del_buttons[i].appendChild(remove);

    const some_buttons = document.createElement("button");
    some_buttons.className = "fa-regular fa-circle-xmark";
    some_buttons.style.visibility = "hidden";
    li.appendChild(some_buttons);
	
    const specTimer = document.querySelectorAll(".timer");
    const timerTime = document.querySelectorAll(".timer__time");
    

    new Timer(specTimer[i], timerTime[i].textContent);
    return li;
}

//////////////////////////////////////////////////////////////////////
for (var i = 0; i < lis.length; i++) {
	createTimer(lis[i]);
}
//////////////////////////////////////////////////////////////////////

divList.addEventListener('click', (event) => {
	if (event.target.tagName === 'BUTTON') {
    	const button = event.target;
    	const li = button.parentNode;
    	const ul = li.parentNode;
        if (button.className === "fa-solid fa-trash-can") {
        	ul.removeChild(li);
          	counter--;
    	} 
    }
});

// -----------------------------------------------------------------------------------------------
// search bar functionality

function search() {
    let searchbar = document.getElementById("search-item").value.toUpperCase();
    let task = document.querySelectorAll(".task");
    let text = document.getElementsByClassName("task__name");

    for(var i = 0;i<=text.length;i++){
        let a=task[i].getElementsByClassName("task__name")[0];
        let value=a.innerHTML || a.innerText || a.textContent;

        if(value.toUpperCase().indexOf(searchbar) > -1) {
            task[i].style.display="";
        } else {
            task[i].style.display="none";
        }
    }
}

// -----------------------------------------------------------------------------------------------
// filtering / sorting functionality

let field = document.querySelector(".list");
let li = Array.from(field.children);
let select = document.getElementById("select");
let ar = [];
let ar1 = [];
let ar2 = [];
let a = 0;

for(let i of li) {
    const first = i.getElementsByTagName("p")[0];
    const x = first.textContent.trim();
    const y = Number(x.substring());
    i.setAttribute("data-time",y);
    ar.push(i);
}

for(let z of li) {
    const last = z.getElementsByTagName("p")[1];
    const x1 = last.textContent.trim();
    const y1 = String(x1.substring());
    z.setAttribute("data-name",y1);
    ar1.push(z);
}

for(let v of li) {
    v.setAttribute("data-id",a);
    a++;
    ar2.push(v);
}

select.onchange = sortingValue;

function sortingValue() {
    
    if (this.value === 'Default') {
        SortElem2(field, li, true)
    }
    if (this.value === 'a-z') {
        SortElem1(field, li, true)
    }
    if (this.value === 'z-a') {
        SortElem1(field, li, false)
    }
    if (this.value === 'LowToHigh') {
        SortElem(field, li, true)
    }
    if (this.value === 'HighToLow') {
        SortElem(field, li, false)
    }
}

function SortElem(field,li, asc) {
    let sortli;
    sortli = li.sort((a, b)=>{
        const ax = a.getAttribute('data-time');
        const bx = b.getAttribute('data-time');
        return asc ? ax - bx : bx - ax;
        // ax > bx ? (1*dm) : (-1*dm);
    });
    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }
    field.append(...sortli);	
}
        
function SortElem1(field,li,asc) {
    let  dm, sortli;
    dm = asc ? 1 : -1;
    sortli = li.sort((a, b)=>{
        const ay = a.getAttribute('data-name');
        const by = b.getAttribute('data-name');
        return ay > by ? (1*dm) : (-1*dm);
    });
    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }
    field.append(...sortli);
}

function SortElem2(field,li,asc) {
    let  dm, sortli;
    dm = asc ? 1 : -1;
    sortli = li.sort((a, b)=>{
        const ay = a.getAttribute('data-id');
        const by = b.getAttribute('data-id');
        return ay > by ? (1*dm) : (-1*dm);
    });
    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }
    field.append(...sortli);
}