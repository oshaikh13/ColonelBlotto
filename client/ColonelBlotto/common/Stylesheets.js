import {StyleSheet} from 'react-native';

module.exports.BOARD_PADDING = 3;
module.exports.CELL_MARGIN = 4;
module.exports.CELL_SIZE = 80;
module.exports.BOARD_SIZE = 3;

module.exports.styles = StyleSheet.create({

  submitButton: {
    borderColor: '#000066',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 3,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },

  submitButtonText: {
    color: '#000066',
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },

  remainingMessage: {
    color: '#000066',
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
    backgroundColor: '#000033',
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
    backgroundColor: '#000066',
    margin: module.exports.CELL_MARGIN,
  },
  row: {
    flexDirection: 'row',
  },
  tile: {
    position: 'absolute',
    width: module.exports.CELL_SIZE,
    height: module.exports.CELL_SIZE,
    backgroundColor: '#000066',
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
    backgroundColor: '#4d4dff',
  },
  tile3: {
    backgroundColor: '#1a1aff',
  },
  tile4: {
    backgroundColor: '#003399',
  },
  tile5: {
    backgroundColor: '#004de6',
  },
  tile6: {
    backgroundColor: '#007a99',
  },
  tile7: {
    backgroundColor: '#005266',
  },
  tile8: {
    backgroundColor: '#2f2fb6',
  },
  tile9: {
    backgroundColor: '#25258e',
  },
  tile10: {
    backgroundColor: '#3434cb',
  },
  tile11: {
    backgroundColor: '#004d80',
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
