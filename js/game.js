const url_query = new URLSearchParams(window.location.search);
let mem_or_haung = url_query.get('game');
if(mem_or_haung.trim() === 'memory'){
	let memory_gam_div =document.querySelector('.memory-game-div');
	memory_gam_div.style.display = 'block';
	document.querySelector(".control-buttons span").onclick = function () {
		let yourName = prompt("Whats Your Name?");
		if (yourName == null || yourName == "") {
			document.querySelector(".name span").innerHTML = 'Unknown';
		}else{
			document.querySelector(".name span").innerHTML = yourName;
		}
		document.querySelector(".control-buttons").remove();
	}
	let duration = 1000;
	let blocksContainer = document.querySelector(".memory-game-blocks");
	let blocks = Array.from(blocksContainer.children);
	let orderRange = Array.from(Array(blocks.length).keys());
	console.log(orderRange);
	shuffle(orderRange);
	console.log(orderRange);
	blocks.forEach((block, index) =>{
		block.style.order = orderRange[index];
		block.addEventListener('click', function () {
			console.log(block.style.order);
			flipBlock(block);
		});
	});

	function flipBlock(selectedBlock) {
		selectedBlock.classList.add('is-flipped');
		let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
		if (allFlippedBlocks.length === 2) {
			stopClicking();
			checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
		}
	}
	function stopClicking() {
		blocksContainer.classList.add('no-clicking');
		setTimeout(() => {
			blocksContainer.classList.remove('no-clicking');
		}, duration);
	}
	function checkMatchedBlocks(firstBlock, secondBlock) {
		let triesElement = document.querySelector('.tries span');
		if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
			firstBlock.classList.remove('is-flipped');
			secondBlock.classList.remove('is-flipped');
			firstBlock.classList.add('has-match');
			secondBlock.classList.add('has-match');
			document.getElementById('success').play();
			let has_match_count = document.querySelectorAll(".memory-game-blocks .has-match");
			if(has_match_count.length == blocks.length){
				console.log('hiiiii');
				let play_again =document.querySelector('.play-again');
				play_again.style.display = 'block';
			}else{
				console.log('nonononon');
			}
		} else {
			triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
			setTimeout(() => {
				firstBlock.classList.remove('is-flipped');
				secondBlock.classList.remove('is-flipped');
			}, duration);
			document.getElementById('wronge').play();
		}
	}
	function shuffle(array) {
		let current = array.length,
				temp,
				random;
		while (current > 0) {
			random = Math.floor(Math.random() * current);
			current--;
			temp = array[current];
			array[current] = array[random];
			array[random] = temp;
		}
		return array;
	}
}else if(mem_or_haung.trim() === 'haungman'){
	// haungman game------------------------------------------------------------------------
	let haungman_div = document.querySelector('.haungman-container');
	haungman_div.style.display ='block';
	const letrs="abcdefghijklmnopqrstuvwxyz-'";
	let letr_array=Array.from(letrs);
	let letr_container=document.querySelector(".letters");
	letr_array.forEach(letter=>{
			let sp=document.createElement("span");
			let let_tx=document.createTextNode(letter);
			sp.appendChild(let_tx);
			sp.className='letter-box';
			letr_container.appendChild(sp);
	}); 
	const words={
			programming:["c-sharp","python","html","css","java-script","java","php","go","r","mysql"],
			movies:["parasite","predator","vincenzo","game of thrones","don't breathe","tomorrow war","mouse","the ring"],
			people:["keanu reeves","willem dafoe","brad pitt","channing tatum","ryan reynolds"],
			countries:["saudi arabia","egypt","united states","south korea","japanese","qatar","china","germany","canada"],
	}
	let allkeys=Object.keys(words);//تعطيها كائن تجبلك كل الكيز تبعو
	let rand_prop_num=Math.floor(Math.random()*allkeys.length);//0 1 2 3
	let rand_prop_name=allkeys[rand_prop_num];
	let rand_prop_value=words[rand_prop_name];
	let rand_value_num=Math.floor(Math.random()*rand_prop_value.length);
	let rand_value_value=rand_prop_value[rand_value_num];
	document.querySelector(".game-info .category span").innerHTML=rand_prop_name;
	let letr_guess_container = document.querySelector(".letters-guess");
	let letr_to_array=Array.from(rand_value_value);
	letr_to_array .forEach(letter2 =>{
			let empty_span=document.createElement("span");
			if (letter2===" "){
					empty_span.className="has-space";
			}
			letr_guess_container.appendChild(empty_span);
	});
	let guess_spans= document.querySelectorAll(".letters-guess span");
	let wrong_attempts=0;
	let the_draw=document.querySelector(".hangman-draw")
	document.addEventListener("click",(e)=>{
		let thestatus=false;
		if (e.target.className==="letter-box"){
			e.target.classList.add("clicked");
			let clicked_letr=e.target.innerHTML.toLowerCase();
			letr_to_array.forEach((wordletr,letIndex)=>{
				if(clicked_letr == wordletr){
					thestatus=true;
					guess_spans.forEach((span,spanIndex)=>{
						if(letIndex===spanIndex){
							span.innerHTML=clicked_letr;
							let is_all_full = 0;
							guess_spans.forEach((span)=>{
								if(span.innerHTML =='' && !span.classList.contains('has-space')){
									is_all_full++;
								} 
							});
							if(is_all_full == 0){
								let cover_div =document.querySelector('.hugman-cover');
								cover_div.style.display = 'block';
								letr_container.classList.add("finished");
							}
						}
					})
				}
			});
			if(thestatus!==true){
				wrong_attempts+=1;
				the_draw.classList.add(`wrong-${wrong_attempts}`);
				document.getElementById("wronge").play();
				if(wrong_attempts==8){
					endgame();
					letr_container.classList.add("finished");
				}
			}
		}
	});
	function endgame(){
		let div= document.createElement("div");
		// let div_tx=document.createTextNode("game over the word is "+rand_value_value);
		// div.appendChild(div_tx);
		div.innerHTML = `<span>game over the word is ${rand_value_value}</span><a href="game.html?game=haungman">Play Again</a>`;
		document.getElementById("fail").play();
		div.className="popup";
		document.body.appendChild(div);
	}
}



