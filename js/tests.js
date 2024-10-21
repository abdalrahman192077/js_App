const url_query = new URLSearchParams(window.location.search);
let typing_or_programming = url_query.get('test');
if(typing_or_programming.trim() === 'typing'){
	let typing_div = document.querySelector('.typing-test');
	typing_div.style.display ='block';
	const words = [
		"Hello",
		"Programming",
		"Code",
		"Javascript",
		"Town",
		"Country",
		"Testing",
		"Youtube",
		"Linkedin",
		"Twitter",
		"Github",
		"Leetcode",
		"Internet",
		"Python", 
		"Scala",
		"Destructuring",
		"Paradigm",
		"Styling",
		"Cascade",
		"Documentation",
		"Coding",
		"Funny",
		"Working",
		"Dependencies",
		"Task",
		"Runner",
		"Roles",
		"Test",
		"Rust",
		"Playing"
	];

	const lvls = {
		"Easy": 7,
		"Normal": 5,
		"Hard": 3
	};
	let select_level = document.querySelector('#level-select');
	let select_val = select_level.value;
	let defaultLevelName = select_val;
	let defaultLevelSeconds = lvls[defaultLevelName];

	let startButton = document.querySelector(".start");
	let lvlNameSpan = document.querySelector(".message .lvl");
	let secondsSpan = document.querySelector(".message .seconds");
	let theWord = document.querySelector(".the-word");
	let upcomingWords = document.querySelector(".upcoming-words");
	let input = document.querySelector(".input");
	let timeLeftSpan = document.querySelector(".time span");
	let scoreGot = document.querySelector(".score .got");
	let scoreTotal = document.querySelector(".score .total");
	let finishMessage = document.querySelector(".finish");

	lvlNameSpan.innerHTML = defaultLevelName;
	secondsSpan.innerHTML = defaultLevelSeconds;
	timeLeftSpan.innerHTML = defaultLevelSeconds;
	scoreTotal.innerHTML = words.length;

	input.onpaste = function () {
		return false;
	}
	let is_gmae_started = 0;
	select_level.addEventListener('input',(e)=>{
		if(is_gmae_started == 0){
			defaultLevelName = e.target.value;
			defaultLevelSeconds =lvls[defaultLevelName];
			lvlNameSpan.innerHTML = defaultLevelName;
			secondsSpan.innerHTML = defaultLevelSeconds;
			timeLeftSpan.innerHTML = defaultLevelSeconds;
			scoreTotal.innerHTML = words.length;
		}
	});
	 
	startButton.onclick = function () {
		this.remove();
		input.focus();
		is_gmae_started = 1;
		genWords();
	}

	function genWords() {
		let randomWord = words[Math.floor(Math.random() * words.length)];
		let wordIndex = words.indexOf(randomWord);
		words.splice(wordIndex, 1);
		theWord.innerHTML = randomWord;
		upcomingWords.innerHTML = '';
		for (let i = 0; i < words.length; i++) {
			let div = document.createElement("div");
			let txt = document.createTextNode(words[i]);
			div.appendChild(txt);
			upcomingWords.appendChild(div);
		}
		
		startPlay();
	}

	function startPlay() {
		timeLeftSpan.innerHTML = defaultLevelSeconds;
		let start = setInterval(() => {
			timeLeftSpan.innerHTML--;
			if (timeLeftSpan.innerHTML === "0") {
				clearInterval(start);
				if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
					input.value = '';
					scoreGot.innerHTML++;
					if (words.length > 0) {
						genWords();
					} else {
						let span = document.createElement("span");
						span.className = 'good';
						let spanText = document.createTextNode("Congratz");
						span.appendChild(spanText);
						finishMessage.appendChild(span);
						let link = document.createElement("a");
						link.setAttribute("href","test.html?test=typing");
						let linkText = document.createTextNode("Play Again");
						link.appendChild(linkText);
						finishMessage.appendChild(link);
						upcomingWords.remove();
					}
				} else {
					let span = document.createElement("span");
					span.className = 'bad';
					let spanText = document.createTextNode("Game Over");
					span.appendChild(spanText);
					finishMessage.appendChild(span);
					let link = document.createElement("a");
					link.setAttribute("href","test.html?test=typing");
					let linkText = document.createTextNode("Play Again");
					link.appendChild(linkText);
					finishMessage.appendChild(link);
				}
			}
		}, 1000);
	}
}else if(typing_or_programming.trim() === 'propramming'){
	let programming_test_div = document.querySelector(".quiz-app");
	programming_test_div.style.display ='block';
	let countSpan = document.querySelector(".count span"); 
	let bullets = document.querySelector(".bullets");
	let bulletsSpanContainer = document.querySelector(".bullets .spans"); 
	let quizArea = document.querySelector(".quiz-area"); this 
	let answersArea = document.querySelector(".answers-area");
	let submitButton = document.querySelector(".submit-button"); 
	let resultsContainer = document.querySelector(".results");
	let countdownElement = document.querySelector(".countdown"); 

	let currentIndex = 0;
	let rightAnswers = 0;
	let countdownInterval;

	function getQuestions() {
		let myRequest = new XMLHttpRequest();
		
		myRequest.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				let questionsObject = JSON.parse(this.responseText);
				let qCount = questionsObject.length;
				createBullets(qCount);
				addQuestionData(questionsObject[currentIndex], qCount);
				countdown(30, qCount);
				submitButton.onclick = () => {
					let theRightAnswer = questionsObject[currentIndex].right_answer;
					currentIndex++;
					checkAnswer(theRightAnswer, qCount);
					quizArea.innerHTML = "";
					answersArea.innerHTML = "";
					addQuestionData(questionsObject[currentIndex], qCount);
					handleBullets();
					clearInterval(countdownInterval);
					countdown(30, qCount);
					showResults(qCount);
				}; 
			}
		};
		myRequest.open("GET", "html_questions.json", true);
		myRequest.send();
	}

	getQuestions();

	function createBullets(num) {
		countSpan.innerHTML = num;
		for (let i = 0; i < num; i++) {
			let theBullet = document.createElement("span");
			if (i === 0) {
				theBullet.className = "on";
			}
			bulletsSpanContainer.appendChild(theBullet);
		}
	}

	function addQuestionData(obj, count) {
		if (currentIndex < count) {
			let questionTitle = document.createElement("h2");
			let questionText = document.createTextNode(obj["title"]);
			questionTitle.appendChild(questionText);
			quizArea.appendChild(questionTitle);
			for (let i = 1; i <= 4; i++) {
				let mainDiv = document.createElement("div");
				mainDiv.className = "answer";
				let radioInput = document.createElement("input");
				radioInput.name = "question";
				radioInput.type = "radio";
				radioInput.id = `answer_${i}`;
				radioInput.dataset.answer = obj[`answer_${i}`];
				if (i === 1) {
					radioInput.checked = true;
				}
				let theLabel = document.createElement("label");
				theLabel.htmlFor = `answer_${i}`;
				let theLabelText = document.createTextNode(obj[`answer_${i}`]);
				theLabel.appendChild(theLabelText);
				mainDiv.appendChild(radioInput);
				mainDiv.appendChild(theLabel);
				answersArea.appendChild(mainDiv);
			}
		}
	}

	function checkAnswer(rAnswer, count) {
		let answers = document.getElementsByName("question");
		let theChoosenAnswer;

		for (let i = 0; i < answers.length; i++) {
			if (answers[i].checked) {
				theChoosenAnswer = answers[i].dataset.answer;
			}
		}

		if (rAnswer === theChoosenAnswer) {
			rightAnswers++;
		}
	}

	function handleBullets() {
		let bulletsSpans = document.querySelectorAll(".bullets .spans span");
		let arrayOfSpans = Array.from(bulletsSpans);
		arrayOfSpans.forEach((span, index) => {
			if (currentIndex === index) {
				span.className = "on";
			}
		});
	}

	function showResults(count) {
		let theResults;
		if (currentIndex === count) {
			quizArea.remove();
			answersArea.remove();
			submitButton.remove();
			bullets.remove();

			if (rightAnswers > count / 2 && rightAnswers < count) {
				theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
			} else if (rightAnswers === count) {
				theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
			} else {
				theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
			}

			resultsContainer.innerHTML = theResults;
			resultsContainer.style.padding = "10px";
			resultsContainer.style.backgroundColor = "white";
			resultsContainer.style.marginTop = "10px";
		}
	}

	function countdown(duration, count) {
		if (currentIndex < count) {
			let minutes, seconds;
			countdownInterval = setInterval(function () {
				minutes = parseInt(duration / 60);
				seconds = parseInt(duration % 60);

				minutes = minutes < 10 ? `0${minutes}` : minutes;
				seconds = seconds < 10 ? `0${seconds}` : seconds;

				countdownElement.innerHTML = `${minutes}:${seconds}`;

				if (--duration < 0) {
					clearInterval(countdownInterval);
					submitButton.click();
				}
			}, 1000);
		}
	}
}




