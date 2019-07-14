class UI {
  static enlargeClock() {
    $('clock').style.display = 'block';
    $('clock').style.height = '100vh';
    $('clock').style.width = '100vw';
    setTimeout(() => {
      //   $('nav').style.backgroundColor = primary;
      this.showClockChild();
    }, 550);
  }

  static minimizeClock() {
    this.hideClockChild();
    $('clock').style.height = '0';
    $('clock').style.width = '0';
    setTimeout(() => {
      //   $('nav').style.backgroundColor = nav;
      $('clock').style.display = 'none';
    }, 550);
  }

  static hideClockChild() {
    $('exit-clock').style.display = 'none';
    $('time-display').style.display = 'none';
    $('excercise-continue').style.display = 'none';
  }

  static showClockChild() {
    $('exit-clock').style.display = 'block';
    $('time-display').style.display = 'block';
    $('excercise-continue').style.display = 'block';
  }

  static showTime(time) {
    $('current-time').innerHTML = `${time.minute}:${time.second}`;
  }
}
