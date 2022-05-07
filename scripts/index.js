const data = ['a','b','a','b','c','d','c','d','m','n','m','n'];
const box = document.querySelector('.box');
const timer = document.querySelector('.timer');
const level = document.querySelector('.level');
let drawer = new DrawUi();
let element = [];
let element_index = [];
let start = 0;
let time = 30;
let speed = 1500;

function Randomiser(arr){
    let currentIndex = arr.length,randomIndex,currentArr;

    while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        currentArr = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = currentArr;
    }
    return arr;
}




function DrawUi(){
    this.method = function drawer(){
        const data_randomer = Randomiser(data);
        data_randomer.forEach((ele,index) => {
            if(box.children.length < data.length){
                box.innerHTML += `
                <div class="parent" onclick = test(this) index = ${index} >
                    <div class="card _one">${ele}</div>
                    <div class="card _two"></div>
                </div>
                `
            }
        });
    }
}

function timer_method(){
    level.innerHTML = `<span>Speed</span><span>${speed/1000}s</span>`;
    if(time > 0){
        time--;
    }else{
        time = 30;
        Array.from(box.children).forEach(ele => {
            ele.classList.remove('active');
        })
    }
    timer.innerText = handel_timer(time); 
    const timers = setTimeout(timer_method,speed);
}
timer_method();

function handel_timer(data){
    if(data < 10){
        data = `0${data}`;
    }
    return data;
}

class Actions{
    constructor(ele,index){
        this.ele = ele;
        this.index = index;
    }

    show(){
        if(element.length < 2){
            element.push(this.ele.innerText);
            element_index.push(this.index);
            this.ele.classList.add('active');
        }else{
            const elements = box.children;
            if(element[0] != element[1]){
                elements[element_index[0]].classList.remove('active');
                elements[element_index[1]].classList.remove('active');
            }
            element = [];
            element_index = [];
        }
    }
}


window.onload = ()=>{
    drawer.method();
}



function test(e){
    const tester = new Actions(e,e.getAttribute('index'));
    tester.show();
    const elements = document.querySelector('.box').children;
    const active = document.querySelectorAll('.active');
    if(active != undefined && active.length == elements.length){
        if(speed == 500){
            speed = 1500
        }else{
            time = 30;
            speed-=500;
        }
        box.innerHTML = ``;
        drawer.method();
        Array.from(elements).forEach(ele => {
            ele.classList.remove('active');
        })
    }
}