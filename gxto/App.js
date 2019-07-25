import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState:
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
    });
  }

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Icon name="close" style={styles.tileX} />;
      case -1: return <Icon name="circle-outline" style={styles.tileO} />;
      default: return <View />;
    }
  }

  //Will return 1 if P1 won, -1 if P2 won and 0 if nobody won
  getWinner = () => {
    const NUM_TILES = 3;
    let arr = this.state.gameState;
    let sum;

    //Check rows
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    //Check columns
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }
    
    //Check diagonally left-to-right
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    //Check diagonally right-to-left
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    //Nobody won
    return 0;
  }

  onTilePress = (row, col) => {
    //Block tile change on double-tap
    let value = this.state.gameState[row][col];
    if (value !==0) {return;}

    //Select player
    let currentPlayer= this.state.currentPlayer;

    //Select a tile
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    //Swap players
    let nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    //Check for winner
    let winner = this.getWinner();
    if (winner == 1) {
      Alert.alert(
        "Felicidades jugador X",
        "Has ganado la partida");
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert(
        "Felicidades jugador O",
        "Has ganado la partida");
      this.initializeGame();
    } 
  }

  onNewGamePress = () => {
    this.initializeGame();
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: "row" }}>

          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: "row" }}>

          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: "row" }}>

          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>

        </View>

        <View style={{paddingTop:100}} />
        <Button title="Jugar de nuevo" onPress={this.onNewGamePress} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderColor: "white",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
  },

  tileX: {
    color: 'red',
    fontSize: 60,
    textShadowColor: 'rgba(255, 33, 28, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 30
  },

  tileO: {
    color: 'green',
    fontSize: 60,
    textShadowColor: 'rgba(81, 255, 13, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 30
  },

});
