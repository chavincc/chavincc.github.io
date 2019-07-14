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

const prepareTime = new Time(0, 10);
let setsCount, plankLength, sidePlankLength, restLength;
$('start-btn').addEventListener('click', function(e) {
  e.preventDefault();
  try {
    setsCount = parseInt($('number-of-sets').value);
    if (setsCount <= 0) throw new Error('no set');
    plankLength = new Time(
      $('plank-duration-minute').value,
      $('plank-duration-second').value
    );
    sidePlankLength = new Time(
      $('side-plank-duration-minute').value,
      $('side-plank-duration-second').value
    );
    restLength = new Time(
      $('rest-between-sets-minute').value,
      $('rest-between-sets-second').value
    );
    // console.log(setsCount, plankLength, sidePlankLength, restLength);
    UI.enlargeClock();
  } catch (error) {
    alert(error);
  }
});

$('exit-clock').addEventListener('click', function() {
  UI.minimizeClock();
});

// const count = new Sound('../images/count-test.mp3');

// $('btn-play').addEventListener('click', function() {
//   count.play();
// });

// $('btn-stop').addEventListener('click', function() {
//   count.pause();
// });
