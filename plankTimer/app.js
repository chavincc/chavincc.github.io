const count1 = new Sound('sound/count1.mp3');
const count2 = new Sound('sound/count2.mp3');
const count3 = new Sound('sound/count3.mp3');
const count4 = new Sound('sound/count4.mp3');
const count5 = new Sound('sound/count5.mp3');
const count10 = new Sound('sound/count10.mp3');

let x;

let showingExample = false;
$('view-example-btn').addEventListener('click', function() {
  if (showingExample) {
    $('example').style.display = 'none';
    $('view-example-btn').innerHTML = 'view example';
  } else {
    $('example').style.display = 'block';
    $('view-example-btn').innerHTML = 'hide example';
  }
  showingExample = !showingExample;
});

$('start-btn').addEventListener('click', function(e) {
  e.preventDefault();
  try {
    setsCount = parseInt($('number-of-sets').value);
    if (setsCount <= 0) throw new Error('no set');

    const timeArray = [new Time(0, 10)];
    for (let i = 0; i < setsCount; i++) {
      timeArray.push(
        new Time(
          $('plank-duration-minute').value,
          $('plank-duration-second').value
        )
      );
      timeArray.push(
        new Time(
          $('side-plank-duration-minute').value,
          $('side-plank-duration-second').value
        )
      );
      timeArray.push(
        new Time(
          $('side-plank-duration-minute').value,
          $('side-plank-duration-second').value
        )
      );
      timeArray.push(
        new Time(
          $('plank-duration-minute').value,
          $('plank-duration-second').value
        )
      );
      timeArray.push(
        new Time(
          $('rest-between-sets-minute').value,
          $('rest-between-sets-second').value
        )
      );
    }
    const clock = new Clock(timeArray);
    console.log(clock);

    x = setInterval(function() {
      console.log('x');
      if (clock.tick()) clearInterval(x);
    }, 1000);

    UI.enlargeClock();
  } catch (error) {
    alert(error);
  }
});

$('exit-clock').addEventListener('click', function() {
  UI.minimizeClock();
  clearInterval(x);
});

// $('btn-play').addEventListener('click', function() {
//   count.play();
// });

// $('btn-stop').addEventListener('click', function() {
//   count.pause();
// });
