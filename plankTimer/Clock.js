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
            if (time.second == 10) playTarget(count10);
            if (time.second == 5) playTarget(count5);
            if (time.second == 4) playTarget(count4);
            if (time.second == 3) playTarget(count3);
            if (time.second == 2) playTarget(count2);
            if (time.second == 1) playTarget(count1);
          }
          if (this.index < this.timeArray.length)
            UI.showTime(this.timeArray[this.index]);
        }
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
