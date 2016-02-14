/**
 *  Colonel Blotto
 *  Lots of code taken from FB 2048 example. Thanks :)
 */
'use strict';

var BoardStructure = require('./common/Board');
var Sounds = require('./common/Sounds');
var StyleData = require('./common/Stylesheets')

var styles = StyleData.styles;

var BOARD_PADDING = StyleData.BOARD_PADDING;
var CELL_SIZE = StyleData.CELL_SIZE;
var BOARD_SIZE = StyleData.BOARD_SIZE;
var CELL_MARGIN = StyleData.CELL_MARGIN;

import React, {
  AppRegistry,
  Animated,
  Component,
  Text,
  View
} from 'react-native';

import Button from 'apsl-react-native-button'


class Board extends React.Component {
  render() {
    // This must be edited manually for board size :(
    return (
      <View style={styles.board}>
        <View style={styles.row}><Cell/><Cell/><Cell/></View>
        <View style={styles.row}><Cell/><Cell/><Cell/></View>
        <View style={styles.row}><Cell/><Cell/><Cell/></View>
        {this.props.children}
      </View>
    );
  }
}

class Tile extends React.Component {

  static _getPosition(index): number {
    return BOARD_PADDING + (index * (CELL_SIZE + CELL_MARGIN * 2) + CELL_MARGIN);
  }

  constructor(props: {}) {
    super(props);

    var tile = this.props.tile;

    this.state = {
      opacity: new Animated.Value(0),
      top: new Animated.Value(Tile._getPosition(tile.getRow())),
      left: new Animated.Value(Tile._getPosition(tile.getCol()))
    };

    this.startX = 0;
    this.startY = 0;
  }

  handleTouchStart(event) {
    this.startX = event.nativeEvent.pageX;
    this.startY = event.nativeEvent.pageY;
  }

  handleTouchEnd(event) {

    var deltaX = event.nativeEvent.pageX - this.startX;
    var deltaY = event.nativeEvent.pageY - this.startY;

    var direction = -1;
    if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      direction = deltaX > 0 ? 2 : 0;
    } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
      direction = deltaY > 0 ? 3 : 1;
    }

    var r = this.props.tile.getRow();
    var c = this.props.tile.getCol();

    if (direction === 1 || direction === 3) {
      direction === 1 ? this.props.increment(r, c) : this.props.decrement(r, c);
    }

  }


  calculateOffset(): {top: number; left: number; opacity: number} {
    var tile = this.props.tile;

    var offset = {
      top: this.state.top,
      left: this.state.left,
      opacity: this.state.opacity,
    };

    Animated.timing(this.state.opacity, {
      duration: 100,
      toValue: 1,
    }).start();

    return offset;
  }

  render() {
    var tile = this.props.tile;
    var tileValue = tile.getValue() === 0 ? undefined : tile.getValue();

    var tileStyles = [
      styles.tile,
      // styles['tile' + tile.value],
      styles['tile' + tileValue],
      this.calculateOffset(),
    ];

    var textStyles = [
      styles.value,
      tileValue > 4 && styles.whiteText,
      tileValue > 100 && styles.threeDigits,
      tileValue > 1000 && styles.fourDigits,
    ];

    return (
      <Animated.View style={tileStyles} 
        onTouchStart={(event) => this.handleTouchStart(event)}
        onTouchEnd={(event) => this.handleTouchEnd(event)}
      >
        <Text style={textStyles}>{tileValue}</Text>
      </Animated.View>
    );
  }
}


class Cell extends React.Component {
  render() {
    return <View style={styles.cell} />;
  }
}

class ColonelBlotto extends Component {

  constructor (props: {}) {
    super(props);
    this.state = {
      board: BoardStructure(BOARD_SIZE, 10)
    }
  }

  incrementTile (row, col) {
    var newBoard = this.state.board;
    var incremented = newBoard.incrementTile(row, col);

    if (incremented) {
      Sounds.pop.play();
    }

    this.setState({board: newBoard})
  }

  decrementTile (row, col) {
    var newBoard = this.state.board;
    var decremented = newBoard.decrementTile(row, col);

    if (decremented) {
      Sounds.click.play();
    }

    this.setState({board: newBoard});
  }

  render () {

    var tiles = [];
    var currentBoard = this.state.board.getBoard();
    for (var i = 0; i < currentBoard.length; i++) {
      for (var j = 0; j < currentBoard[i].length; j++) {
        var tile = currentBoard[i][j];
        tiles.push(<Tile ref={tile.id} key={tile.id} tile={tile} 
          increment={this.incrementTile.bind(this)} 
          decrement={this.decrementTile.bind(this)}/
        >);
      }
    }

    var left = this.state.board.getPeicesLeft();

    return (
      <View
        style={styles.container}>

        <Text style={styles.remainingMessage}>Pieces Remaining: {left}</Text>

        <Board>
          {tiles}
        </Board>

        <Button
          style={styles.submitButton} textStyle={styles.submitButtonText}
          onPress={() => {
            console.log('Submit!')
          }}>
          Done
        </Button>

      </View>
    );
  }
}


AppRegistry.registerComponent('ColonelBlotto', () => ColonelBlotto);
