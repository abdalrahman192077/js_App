// show and hide authentication btns
let login_a = document.querySelector('.main-header ul li #login');
let signup_a = document.querySelector('.main-header ul li #signup');
let logout_a = document.querySelector('.main-header ul li #logout');
if(sessionStorage.getItem('login') != null){
  login_a.style.display ="none";
  signup_a.style.display ="none";
  logout_a.style.display ="block";
}else{
  login_a.style.display ="block";
  signup_a.style.display ="block";
  logout_a.style.display ="none";
}
// images part
var sliderImages = Array.from(document.querySelectorAll('.header-imgs img'));
var slidesCount = sliderImages.length;
var currentSlide = 1;

// Previous and Next icons
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

// Create The Main UL Element
var paginationElement = document.createElement('ul');
paginationElement.setAttribute('id', 'pagination-ul');
// create li
for (var i = 1; i <= slidesCount; i++) {
  var paginationItem = document.createElement('li');
  paginationItem.setAttribute('data-index', i);
  paginationItem.appendChild(document.createTextNode(i));
  paginationElement.appendChild(paginationItem);
}
document.getElementById('indicators').appendChild(paginationElement);

// Get The New Created UL and li
var paginationCreatedUl = document.getElementById('pagination-ul');
var paginationsBullets = Array.from(document.querySelectorAll('#pagination-ul li'));
for (var i = 0; i < paginationsBullets.length; i++) {
  paginationsBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute('data-index'));
    theChecker();
  }
}
// Trigger The Checker Function
theChecker();

function nextSlide() {
  if (nextButton.classList.contains('disabled')) {
    return false;
  } else{
    currentSlide++;
    theChecker();
  }
}

function prevSlide() {
  if (prevButton.classList.contains('disabled')) {
    return false;
  } else {
    currentSlide--;
    theChecker();
  }
}

function theChecker() {
  removeAllActive();

  sliderImages[currentSlide - 1].classList.add('active');
  paginationCreatedUl.children[currentSlide - 1].classList.add('active');
	// first img
  if (currentSlide == 1) {
		prevButton.classList.add('disabled');
  }else{
		prevButton.classList.remove('disabled');
  }
	
	// last img
  if (currentSlide == slidesCount) {
    nextButton.classList.add('disabled');
  }else{
    nextButton.classList.remove('disabled');
  }
}

// Remove All Active Classes 
function removeAllActive() {
  // from Images
  sliderImages.forEach(function (img) {
    img.classList.remove('active');
  });
  // from Pagination Bullets
  paginationsBullets.forEach(function (bullet) {
    bullet.classList.remove('active');
  });
}

// to do section---------------
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value.trim() != "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")){
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    let title_span = document.createElement("span");
    div.setAttribute("data-id", task.id);
    title_span.appendChild(document.createTextNode(task.title));
    div.appendChild(title_span);
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

// coins section 
fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=4305994a528c48019a638aacd08fdd93")
.then((result) => result.json())
.then((currency) => {
    console.log(currency.rates);
    let all_country_coins = Object.entries(currency.rates).sort();
    console.log(all_country_coins);
    let from_select = document.querySelector('.coins #from-select');
    let to_select = document.querySelector('.coins #to-select');

    all_country_coins.forEach((arr) => {
        add_option_to_select(from_select, arr, 'USD');
        add_option_to_select(to_select, arr, 'EUR');
    });
});

function add_option_to_select(selected_ele, arr, selected_coin) {
    let new_option = document.createElement('option');
    new_option.setAttribute('data-val', arr[1]);
    new_option.textContent = arr[0];
    if (arr[0] === selected_coin) {
        new_option.selected = true;
    }
    selected_ele.appendChild(new_option);
}

// calc resolt
let submit_coin = document.querySelector('.submit-coin');
if (submit_coin != null) {
	let from_select = document.querySelector('.coins #from-select');
	let to_select = document.querySelector('.coins #to-select');
	submit_coin.addEventListener('click', (e) => {
		let resolt_div = document.querySelector('.respons_is');
		let amount = document.querySelector('.request_is input').value;
		let from_option = from_select.options[from_select.selectedIndex];
		let to_option = to_select.options[to_select.selectedIndex];
		let from_text = from_option.value;
		let from_val = parseFloat(from_option.getAttribute('data-val'));
		let to_text = to_option.value;
		let to_val = parseFloat(to_option.getAttribute('data-val'));
		let respons_label = document.querySelector('.respons_is label');
		let respons_span = document.querySelector('.respons_is span');
		respons_label.textContent = amount + ' ' + from_text + ' =';
		respons_span.textContent = parseFloat(amount) * (to_val / from_val) + ' ' +to_text ;
		resolt_div.classList.add('show');
	});
}


// github part
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// Get Repos Function
function getRepos() {

  if (theInput.value == "") { // If Value Is Empty

    reposData.innerHTML = "<span>Please Write Github Username.</span>";

  } else {

    fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((response) => response.json())
    .then((repositories) => {
      reposData.innerHTML = '';
      repositories.forEach(repo => {
        let mainDiv = document.createElement("div");
        let mainDiv_span = document.createElement("span");
        let repoName = document.createTextNode(repo.name);
        mainDiv_span.appendChild(repoName);
        mainDiv.appendChild(mainDiv_span);
        let a_span_div = document.createElement('div');
        let theUrl = document.createElement('a');
        let theUrlText = document.createTextNode("Visit");
        theUrl.appendChild(theUrlText);
        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
        theUrl.setAttribute('target', '_blank');
        a_span_div.appendChild(theUrl);
        let starsSpan = document.createElement("span");
        let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
        starsSpan.appendChild(starsText);
        a_span_div.appendChild(starsSpan);
        mainDiv.append(a_span_div);
        mainDiv.className = 'repo-box';
        reposData.appendChild(mainDiv);
      });
    });
  }
}


