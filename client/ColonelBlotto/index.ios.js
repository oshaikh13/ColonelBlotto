/**
 *  Colonel Blotto
 *  Lots of code taken from FB 2048 example. Thanks :)
 */
'use strict';

var components = require('./common/Components');

var BlottoGame = components.BlottoGame;

import React, {
  AppRegistry,
  Navigator
} from 'react-native';

class ColonelBlotto extends React.Component {

  render() {
    return (
      <Navigator
        initialRoute={{name: 'welcome', component: components.welcome}}
        configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
            // count the number of func calls
          console.log(route, navigator); 

          if (route.component) {
            return React.createElement(route.component, { navigator });
        }
      }}/>
    );
  }

}

AppRegistry.registerComponent('ColonelBlotto', () => ColonelBlotto);
