var Sound = require('react-native-sound');

var pop = new Sound('pop.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
  }
});


var click = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
  }
});

module.exports = {click: click, pop: pop};