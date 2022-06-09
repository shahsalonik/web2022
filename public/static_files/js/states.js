const UNSTARTED = 0;
const RUNNING = 1;
const FINISHED = 2;
    
const CORRECT = 0;
const INCORRECT = 1;
const GUESSED = 2;
    		
var score = 0;

var state_list = document.querySelectorAll('#outlines > path');
var array_state_list = Array.from(state_list);
            
array_state_list.forEach(function(elem) {
    elem.addEventListener("click", on_game_event);
});
            
var game_object = {
    'lifecycle' : UNSTARTED,
    'timer' : {
        'handle' : null,
        'callback' : timer_event,
        'seconds' : null
    }
};
            
function begin() {
    document.querySelector('#begin').disabled = true;
    document.querySelector('#reset').disabled = true;
    game_object.lifecycle = RUNNING;
                
    var state_num = Math.floor( array_state_list.length * Math.random() );
	game_object.correct_answer = array_state_list[state_num].getAttribute('name');
	console.log(game_object.correct_answer);
				
	game_object['timer'].seconds = 20;
	get_timer_and_display()
	game_object['timer'].handle = setInterval(game_object['timer'].callback, 1000)
                
    fetchFromServer(state_num);
}
            
function fetchFromServer(num) {
    var ajax_params = {
        'url'     : `https://user.tjhsst.edu/2023sshah/states/state?getState=${num}`,
        'type'    : "get",
        'dataType' : "json",
        'success' : doSomethingWhenYouGetDataBack    // the name of the callback function to call
    }
    // run AJAX function 
    $.ajax( ajax_params )
}

function doSomethingWhenYouGetDataBack(response) {
    var text = "";
    var state_response = Object.values(response)
    console.log(state_response)
                
    text += state_response;
                
    var quest = document.getElementById('question');
    quest.innerHTML = "Click on " + array_state_list[text].getAttribute('name') + "!";
    on_game_event();
}
            
function reset() {
    if (game_object.lifecycle === FINISHED) {
        array_state_list.forEach( function(elem){
            elem.style['fill']="#D3D3D3"
        });

        document.getElementById('result').innerHTML="";
        document.getElementById('question').innerHTML="";
        document.querySelector('#begin').disabled = false;
        				
        score = 0;
        				
        game_object.lifecycle = UNSTARTED;
	}
}
            
function on_game_event(e) {
    if (game_object.lifecycle === RUNNING) {
    	console.log(this);
    	var guess_res = process_guess(this);
    	console.log(guess_res);
    				
    	if(guess_res===CORRECT) {
    		score++;
    		document.getElementById('answer').innerHTML = "";
    	}
    	else {
    	    document.getElementById('answer').innerHTML = "You clicked on " + this.getAttribute('name') + " :(";
    	}
    				
    	var state_num = Math.floor( array_state_list.length * Math.random() );
    	game_object.correct_answer = array_state_list[state_num].getAttribute('name');
    	fetchFromServer(state_num);
    }
    else {
        post_game();
    }
}
		    
function process_guess(path) {
	var choice = path.getAttribute('name');
	if (game_object.correct_answer==choice) {
		path.style['fill'] = "green";		//correct
			return CORRECT;
	} else {
		path.style['fill'] = "red"		//incorrect
		return INCORRECT;
	}
				
}
            
function timer_event() {
	// decrement the timer
    game_object['timer'].seconds -= 1;
    
	// update the display
	get_timer_and_display()
    
	// end the game if time is up
	if (game_object['timer'].seconds == 0) {
	    document.querySelector('#reset').disabled = false;
	    end_game()
    }
}

function get_timer_and_display() {
	// create a date object
	var display_time = new Date(
		2000, 0, 0, 0, 0, game_object['timer'].seconds, 0
	);
    
	// create a date formatter object
	var date_formatter = new Intl.DateTimeFormat('en', { minute: '2-digit', second: '2-digit'} );
    			
	// the time to be displayed in 02:30 format
	var time_string =  date_formatter.format(display_time) 
    
	// query the html element and set the time
	document.querySelector('#remaining_time').innerHTML = time_string;
}
    		
function end_game() {
	document.getElementById('question').innerHTML= "Your got " + score + " questions correct!";
	clearInterval(game_object['timer'].handle);
	game_object.lifecycle = FINISHED;
	post_game();
}

function post_game() {
    document.getElementById('question').innerHTML = "You clicked on " + this.getAttribute('name') + "!";
}