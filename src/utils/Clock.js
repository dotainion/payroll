import $ from 'jquery';

export class Clock{
    days = 0;
    hr = 0;
    min = 0;
    sec = 0;
    reference = null;
    timeIntervalRef = null;
    timerIntervalRef = null;
    interval = 1;

    setTimeAt(days, hr, min, sec){
        this.days = days || 0;
        this.hr = hr || 0;
        this.min = min || 0;
        this.sec = sec || 0;
    }

    setNowTime(){
        const date = new Date();
        this.days = 0;
        this.hr = date.getHours();
        this.min = date.getMinutes();
        this.sec = date.getSeconds();
    }

    setReference(reference){
        this.reference = reference;
    }

    updateUi(value){
        if(this.reference){
            $(this.reference).text(value);
        }
    }

    reset(){
        this.days = 0;
        this.hr = 0;
        this.min = 0;
        this.sec = 0;
    }

    stopTimer() {
        clearInterval(this.timerIntervalRef);
        this.reset();
    }

    startTimer(callBack) {
        this.timerIntervalRef = setInterval(()=>{
            this.days = parseInt(this.days);
            this.sec = parseInt(this.sec);
            this.min = parseInt(this.min);
            this.hr = parseInt(this.hr);

            this.sec = this.sec + 1;

            if (this.sec == 60) {
                this.min = this.min + 1;
                this.sec = 0;
            }
            if (this.min == 60) {
                this.hr = this.hr + 1;
                this.min = 0;
                this.sec = 0;
            }
            if (this.hr == 24){
                this.days = this.days + 1;
                this.hr = 0;
                this.min = 0;
                this.sec = 0;
            }

            this.paresValue();

            let object = this.value();

            this.updateUi(object.value);

            callBack?.(object);
        }, (1000 * this.interval));
    }

    paresValue(){
        if (this.sec < 10 || this.sec == 0) this.sec = '0' + this.sec;
        if (this.min < 10 || this.min == 0) this.min = '0' + this.min;
        if (this.hr < 10 || this.hr == 0) this.hr = '0' + this.hr;
    }

    setInterval(seconds){
        this.interval = seconds;
    }

    value(){
        let object = {
            element: this.reference,
            value: `${this.hr}:${this.min}:${this.sec}`,
        }
        if(this.days == 1) object.value = `${this.days} day, ${object.value}`;
        if(this.days > 1) object.value = `${this.days} days, ${object.value}`;
        return object;
    }

    pauseTimer(){
        clearInterval(this.timerIntervalRef);
        this.updateUi('Pause');
    }

    startTime(callBack){
        this.timeIntervalRef = setTimeout(()=>{
            const d = new Date();

            const object = {
                element: this.reference,
                value: d.toLocaleTimeString(),
            }

            this.updateUi(object.value);

            callBack?.(object);
        }, 1000);
    }

    stopTime(){
        clearInterval(this.timeIntervalRef);
        this.reset();
    }

    pauseTime(){
        clearInterval(this.timeIntervalRef);
        this.updateUi('Pause');
    }
}