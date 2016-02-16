/**
 *  Colonel Blotto
 *  Lots of love taken from FB 2048 example. Thanks :)
 */
'use strict';

var components = require('./common/Components');

var ColonelBlotto = components.game;

import React, {
  AppRegistry
} from 'react-native';



AppRegistry.registerComponent('ColonelBlotto', () => ColonelBlotto);