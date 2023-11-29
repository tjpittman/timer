class Timer{
    constructor(durationInput, startButton, pauseButton, callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;            
        
        //set the total duration so if we start / stop is does not reset the 'dial'.
        this.totalDuration = parseFloat(this.durationInput.value);
     
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete; 
        }       

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {         
        
        //prevent multiple starts from happening.
        if(this.started){
            return;
        }
        this.started = true;

        if(this.onStart){
            this.onStart(this.totalDuration);
        }        
        this.tick();
        this.interval = setInterval(this.tick, 10);       
    }
    pause = () => { 
        this.started = false;
        clearInterval(this.interval);
        console.log("pause");
    }
    finish = () =>{   
        this.started = false; 
        clearInterval(this.interval);

        if(this.onComplete){
            this.onComplete();
        } 
        console.log("finish");                 
    }
    tick = () => {       
        if(this.timeRemaining <= 0){     
            this.finish();
        }
        else{
            this.timeRemaining = this.timeRemaining -  0.01;

            if(this.onTick){
                this.onTick(this.timeRemaining);
            }
        }            
    }    

    get timeRemaining(){
        return  parseFloat(this.durationInput.value);
    }

    set timeRemaining(time){
        this.durationInput.value = time.toFixed(2);
    }
}

