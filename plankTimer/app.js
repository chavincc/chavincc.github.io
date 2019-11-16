const count1 = new Audio('sound/count1.mp3');
const count2 = new Audio('sound/count2.mp3');
const count3 = new Audio('sound/count3.mp3');
const count4 = new Audio('sound/count4.mp3');
const count5 = new Audio('sound/count5.mp3');
const count10 = new Audio('sound/count10.mp3');
count1.volume = 0;
count2.volume = 0;
count3.volume = 0;
count4.volume = 0;
count5.volume = 0;
count10.volume = 0;
function playTarget(target) {
  target.play();
}
let x;
let clock;

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
    count1.play();
    count2.play();
    count3.play();
    count4.play();
    count5.play();
    count10.play();
    setTimeout(function() {
      count1.volume = 1;
      count2.volume = 1;
      count3.volume = 1;
      count4.volume = 1;
      count5.volume = 1;
      count10.volume = 1;
    }, 1000);

    setsCount = parseInt($('number-of-sets').value);
    if (setsCount <= 0) throw new Error('no set');

    const timeArray = [
      new Time(0, 5, loading, 'testing audio', true),
      new Time(0, 10, setup, 'get ready', true)
    ];
    for (let i = 0; i < setsCount; i++) {
      timeArray.push(
        new Time(
          $('plank-duration-minute').value,
          $('plank-duration-second').value,
          group1,
          'plank',
          true
        )
      );
      timeArray.push(
        new Time(
          $('side-plank-duration-minute').value,
          $('side-plank-duration-second').value,
          group1,
          'side plank (left)',
          true
        )
      );
      timeArray.push(
        new Time(
          $('side-plank-duration-minute').value,
          $('side-plank-duration-second').value,
          group1,
          'side plank (right)',
          true
        )
      );
      timeArray.push(
        new Time(
          $('plank-duration-minute').value,
          $('plank-duration-second').value,
          group1,
          'plank',
          true
        )
      );
      timeArray.push(
        new Time(
          $('rest-between-sets-minute').value,
          $('rest-between-sets-second').value,
          rest,
          'rest',
          true
        )
      );
    }
    for (let i = 0; i < setsCount; i++) {
      timeArray.push(new Time(99, 59, group2, 'cruch kicks & pulse up', true));
      timeArray.push(
        new Time(
          $('rest-between-sets-minute').value,
          $('rest-between-sets-second').value,
          rest,
          'rest',
          true
        )
      );
    }
    timeArray.pop();

    clock = new Clock(timeArray);

    x = setInterval(function() {
      if (clock.tick()) {
        clearInterval(x);
        UI.minimizeClock();
      }
    }, 1000);

    UI.enlargeClock();
  } catch (error) {
    alert(error);
  }
});

$('exit-clock-container').addEventListener('click', function() {
  UI.minimizeClock();
  clearInterval(x);
});

$('excercise-continue').addEventListener('click', function() {
  clock.skipTime();
});
