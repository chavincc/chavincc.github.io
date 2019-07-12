const count = new Sound('../images/count-test.mp3');

$('btn-play').addEventListener('click', function() {
  count.play();
});

$('btn-stop').addEventListener('click', function() {
  count.pause();
});
