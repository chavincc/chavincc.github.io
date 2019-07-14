class Time {
  constructor(minute, second) {
    if (isNaN(minute) || isNaN(second)) throw new Error('not a number');
    if (minute < 0 || second < 0) throw new Error('negative number');
    else {
      minute = parseInt(minute);
      second = parseInt(second);
      if (second < 60) {
        this.minute = minute;
        this.second = second;
      } else {
        this.minute = minute + parseInt(second / 60);
        this.second = second % 60;
      }
      this.defMinute = this.minute;
      this.defSecond = this.second;
    }
  }

  tick() {
    if (this.minute === 0 && this.second === 0) return true;
    else {
      if (this.second === 0) {
        this.minute--;
        this.second = 59;
      } else {
        this.second--;
      }
      console.log('ok');
      UI.showTime(this);
      return false;
    }
  }

  totalTime() {
    return this.defMinute * 60 + this.defSecond;
  }
}
