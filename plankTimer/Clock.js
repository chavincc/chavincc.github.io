class Clock {
  constructor(timeArray) {
    this.timeArray = timeArray;
    this.index = 0;
  }

  push(x) {
    this.timeArray.push(x);
  }

  tick() {
    if (this.index === this.timeArray.length)
      return {
        stop: true,
        count: null
      };
    else {
      let time = this.timeArray[this.index];
      if (time.autoContinue) {
        if (time.minute === 0 && time.second === 0) {
          this.index++;
        } else {
          if (time.second === 0) {
            time.minute--;
            time.second = 59;
          } else {
            time.second--;
          }
        }
        if (this.index < this.timeArray.length)
          UI.showTime(this.timeArray[this.index]);
      }
      return {
        stop: false,
        count: time.second
      };
    }
  }

  reset() {
    this.index = 0;
  }

  skipTime() {
    this.index++;
  }
}
