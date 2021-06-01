'use strict';

class CountdownTimer {
  constructor ({ selector, targetDate }){
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    
    this.start();
  }

  createTimeMarkup() {
    const timerTemplate = `<div class="timer" id="${this.selector}">
    <div class="field">
      <span class="value" data-value="days"></span>
      <span class="label">Days</span>
    </div>
  
    <div class="field">
      <span class="value" data-value="hours"></span>
      <span class="label">Hours</span>
    </div>
  
    <div class="field">
      <span class="value" data-value="mins"></span>
      <span class="label">Minutes</span>
    </div>
  
    <div class="field">
      <span class="value" data-value="secs"></span>
      <span class="label">Seconds</span>
    </div>
  </div>
    `
    return document.body.insertAdjacentHTML('afterbegin', timerTemplate);
  }

  start() {
    this.createTimeMarkup();
    let deltaTime;

    this.intervalId = setInterval(() => {    
      const currentTime = Date.now();
      deltaTime = this.targetDate - currentTime ;
      const time = this.getTimeComponents(deltaTime);
      this.updateClock(time);
      if(deltaTime < 1000) {
          clearInterval(this.intervalId);
          const selectorRef = document.getElementById(this.selector);
          selectorRef.style.display = `none`;
        }
    },1000)   
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2,'0');
  }

  updateClock({ days, hours, mins, secs }) {
    document.querySelector(`#${this.selector} span[data-value="days"]`).textContent = days;
    document.querySelector(`#${this.selector} span[data-value="hours"]`).textContent = hours;
    document.querySelector(`#${this.selector} span[data-value="mins"]`).textContent = mins;
    document.querySelector(`#${this.selector} span[data-value="secs"]`).textContent = secs;
  }
}

const timer1 = new CountdownTimer({
  selector: 'timer-1',
  targetDate: new Date('September 14, 2021')
})

const timer2 = new CountdownTimer({
  selector: 'timer-2',
  targetDate: new Date('Jule 1, 2021')
})

const timer3 = new CountdownTimer({
  selector: 'timer-3',
  targetDate: new Date('June 7,2021')
})

