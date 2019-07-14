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
    if (time.minute === 0) {
      if (time.second === 10) count10.play();
      else if (time.second === 1) count1.play();
      else if (time.second === 2) count2.play();
      else if (time.second === 3) count3.play();
      else if (time.second === 4) count4.play();
      else if (time.second === 5) count5.play();
    }
    const strmin = time.minute < 10 ? '0' + time.minute : time.minute;
    const strsec = time.second < 10 ? '0' + time.second : time.second;
    $('current-time-display').innerHTML = `${strmin}:${strsec}`;
  }
}
