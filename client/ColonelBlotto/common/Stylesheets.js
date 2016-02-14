import {StyleSheet} from 'react-native';

module.exports.BOARD_PADDING = 3;
module.exports.CELL_MARGIN = 4;
module.exports.CELL_SIZE = 80;
module.exports.BOARD_SIZE = 3;

module.exports.styles = StyleSheet.create({

  submitButton: {
    borderColor: '#ffbb87',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 3,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },

  submitButtonText: {
    color: '#ffbb87',
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },

  remainingMessage: {
    color: '#ffbb87',
    fontWeight: '800',
    fontSize: 30,
    marginBottom: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    padding: module.exports.BOARD_PADDING,
    backgroundColor: '#bbaaaa',
    borderRadius: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(221, 221, 221, 0.5)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayMessage: {
    fontSize: 40,
    marginBottom: 20,
  },
  tryAgain: {
    backgroundColor: '#887761',
    padding: 20,
    borderRadius: 5,
  },
  tryAgainText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
  },
  cell: {
    width: module.exports.CELL_SIZE,
    height: module.exports.CELL_SIZE,
    borderRadius: 5,
    backgroundColor: '#ddccbb',
    margin: module.exports.CELL_MARGIN,
  },
  row: {
    flexDirection: 'row',
  },
  tile: {
    position: 'absolute',
    width: module.exports.CELL_SIZE,
    height: module.exports.CELL_SIZE,
    backgroundColor: '#ddccbb',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    color: '#776666',
    fontFamily: 'Verdana',
    fontWeight: '500',
  },
  tile1: {
    backgroundColor: '#eeeeee',
  },
  tile2: {
    backgroundColor: '#eeeecc',
  },
  tile3: {
    backgroundColor: '#ffbb87',
  },
  tile4: {
    backgroundColor: '#ff9966',
  },
  tile5: {
    backgroundColor: '#ff7755',
  },
  tile6: {
    backgroundColor: '#ff5533',
  },
  tile7: {
    backgroundColor: '#eecc77',
  },
  tile8: {
    backgroundColor: '#eecc66',
  },
  tile9: {
    backgroundColor: '#eecc55',
  },
  tile10: {
    backgroundColor: '#eecc33',
  },
  tile11: {
    backgroundColor: '#eecc22',
  },
  whiteText: {
    color: '#ffffff',
  },
  threeDigits: {
    fontSize: 20,
  },
  fourDigits: {
    fontSize: 18,
  },
});
