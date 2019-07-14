class Clock {
  constructor(timeArray) {
    this.timeArray = timeArray;
    this.index = 0;
  }

  push(x) {
    this.timeArray.push(x);
  }

  tick() {
    if (this.index === this.timeArray.length) return true;
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
            if (time.second == 10) count10.play();
            if (time.second == 5) count5.play();
            if (time.second == 4) count4.play();
            if (time.second == 3) count3.play();
            if (time.second == 2) count2.play();
            if (time.second == 1) count1.play();
          }
        }
        if (this.index < this.timeArray.length)
          UI.showTime(this.timeArray[this.index]);
      }
    }
  }

  reset() {
    this.index = 0;
  }

  skipTime() {
    this.index++;
  }
}
