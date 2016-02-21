var StyleData = require('./Stylesheets');
var BoardStructure = require('./Board');
var Sounds = require('./Sounds');
var StyleData = require('./Stylesheets');

var styles = StyleData.styles;

var BOARD_PADDING = StyleData.BOARD_PADDING;
var CELL_SIZE = StyleData.CELL_SIZE;
var BOARD_SIZE = StyleData.BOARD_SIZE;
var CELL_MARGIN = StyleData.CELL_MARGIN;

var t = require('tcomb-form-native');

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  username: t.String,              // a required string 
  password: t.String,              // a required number
  existingUser: t.Boolean          // a boolean
});

// Local file storage. Use it as a "db"
var db = {};

db.getUserData = function(cb) {
  AsyncStorage.getItem("userdata", function(err, result){
    cb(err, result);
  })
}

db.writeUserData = function(data, cb) {
  AsyncStorage.setItem("userdata", JSON.stringify(data), function(err, result){
    cb(err, result);
  })
}

import React, {
  Animated,
  Component,
  AsyncStorage,
  Text,
  View,
  Navigator
} from 'react-native';

import Button from 'apsl-react-native-button'

// A hack for socket.io to work on RN
window.navigator.userAgent = "react-native";

var io = require('socket.io-client/socket.io');

var socket = io.connect('http://localhost:8000');


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

    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
      direction = deltaY > 0 ? 3 : 1;
    }

    var r = this.props.tile.getRow();
    var c = this.props.tile.getCol();

    if (direction === 1 || direction === 3) {
      direction === 1 ? this.props.increment(r, c) : this.props.decrement(r, c);
    } else {
      this.props.increment(r, c);
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
      tileValue > 1 && styles.whiteText,
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

class BlottoGame extends React.Component {

  constructor (props: {}) {
    super(props);

    this.state = {
      board: BoardStructure(BOARD_SIZE, 10, this.props.passedProps.rules)
    }
    
    this.state.alertText = "Rule Board";
  }

  componentDidMount() {
    setTimeout(function (argument) {
      var newBoard = BoardStructure(BOARD_SIZE, 10);
      this.setState({board: newBoard, alertText: "Peices Remaining: " + newBoard.getPeicesLeft()});
    }.bind(this), 5000);
  }

  incrementTile (row, col) {
    var newBoard = this.state.board;
    var incremented = newBoard.incrementTile(row, col);

    if (incremented) {
      Sounds.pop.play();
    }

    if (!this.state.board.isImmutable()) {
      this.setState({board: newBoard, alertText: "Peices Remaining: " + newBoard.getPeicesLeft()});
    }

  }

  decrementTile (row, col) {
    var newBoard = this.state.board;
    var decremented = newBoard.decrementTile(row, col);

    if (!decremented) {
      Sounds.click.play();
    }

    if (!this.state.board.isImmutable()) {
      this.setState({board: newBoard, alertText: "Peices Remaining: " + newBoard.getPeicesLeft()});
    }

  }

  renderButton() {
    if (this.state.board.isImmutable()) {
      return ;
    }
    return (
      <Button
        style={styles.submitButton} 
        textStyle={styles.submitButtonText}
        onPress={() => {
          this.props.navigator.popToTop();
        }}>
        Done
      </Button>
    );
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


    return (
      <View
        style={styles.container}>

        <Text style={styles.remainingMessage}>{this.state.alertText}</Text>

        <Board>
          {tiles}
        </Board>


        {this.renderButton()}

      </View>
    );
  }
}

class Login extends React.Component {
  constructor (props: {}) {
    super(props);
  }

  render () {
    return (
      <View />
    )
  }


}

class Home extends React.Component {

  constructor (props: {}) {
    super(props);

    this.state = {
      loading: true
    }

    var that = this;

    var nextView = function() {
      that.props.navigator.push({
        component: Login
      });
    }

    db.getUserData(function(err, res){
      if (!res) {
        nextView();
      }
    })

  }

  componentDidMount () {
    socket.on('ready', this.handleGameReady.bind(this))
  }

  componentWillUnmount () {
    socket.removeListener('ready', this.handleGameReady);
  }

  handleGameReady (data) {
    var that = this;
    that.setState({loading: false});

    var nextView = function() {
      that.props.navigator.push({
        component: BlottoGame,
        passProps: {rules: [[1, 1, 1], 
                            [1, 1, 1], 
                            [1, 1, 1]]}
      });
    }

    console.log("RULES FROM SERVER");
    console.log(data.rules);
    nextView();

  }

  onPressStart () {
    this.setState({loading: true});

    socket.emit('startGame');

  }

  onPressHelp () {

  }

  render() {
    return (
      <View
        style={styles.container}>

        <Text style={styles.remainingMessage}>Colonel Blotto</Text>

        <Button
          isLoading={this.state.loading}
          style={styles.submitButton} textStyle={styles.submitButtonText}
          onPress={() => {
            this.onPressStart();
          }}>
          Start
        </Button>

        <Button
          style={styles.submitButton} textStyle={styles.submitButtonText}
          onPress={() => {
            
          }}>
          Help
        </Button>

      </View>
    )
  }
}

class ColonelBlotto extends React.Component {

  render() {
    return (
      <Navigator
        initialRoute={{name: 'home', component: Home}}
        configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
            // count the number of func calls

          if (route.component) {
            // I love react.
            return <route.component passedProps={route.passProps} navigator={navigator} />
        }
      }}/>
    );
  }

}

module.exports = {
  tile: Tile,
  cell: Cell,
  board: Board,
  blotto: BlottoGame,
  game: ColonelBlotto,
  home: Home
}
