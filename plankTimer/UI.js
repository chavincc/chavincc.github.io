class UI {
  static enlargeClock() {
    $('clock').style.display = 'block';
    setTimeout(() => {
      $('clock').style.height = '100vh';
      $('clock').style.width = '100vw';
    }, 100);

    setTimeout(() => this.showClockChild(), 550);
  }

  static minimizeClock() {
    this.hideClockChild();
    $('clock').style.height = '0';
    $('clock').style.width = '0';
    setTimeout(() => {
      $('clock').style.display = 'none';
    }, 550);
  }

  static hideClockChild() {
    $('main-footer').style.display = 'block';
    $('exit-clock-container').style.display = 'none';
    $('exit-clock').style.display = 'none';
    $('time-display').style.display = 'none';
    $('excercise-continue').style.display = 'none';
  }

  static showClockChild() {
    $('main-footer').style.display = 'none';
    $('exit-clock-container').style.display = 'block';
    $('exit-clock').style.display = 'block';
    $('time-display').style.display = 'block';
    $('excercise-continue').style.display = 'block';
  }

  static showTime(time) {
    // if (time.minute === 0) {
    //   if (time.second === 10) count10.play();
    //   else if (time.second === 1) count1.play();
    //   else if (time.second === 2) count2.play();
    //   else if (time.second === 3) count3.play();
    //   else if (time.second === 4) count4.play();
    //   else if (time.second === 5) count5.play();
    // }

    if (time.autoContinue) {
      $('current-time-display').style.display = 'block';
      const strmin = time.minute < 10 ? '0' + time.minute : time.minute;
      const strsec = time.second < 10 ? '0' + time.second : time.second;
      $('current-time-display').innerHTML = `${strmin}:${strsec}`;
      // $('excercise-continue').style.display = 'none';
    } else {
      $('current-time-display').style.display = 'none';
      // $('excercise-continue').style.display = 'block';
    }

    $('clock').style.backgroundColor = time.color;
    $('excercise-header').innerHTML = time.header;
  }
}
