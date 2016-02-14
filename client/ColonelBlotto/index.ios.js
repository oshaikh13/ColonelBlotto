/**
 *  Colonel Blotto
 *  Lots of code taken from FB 2048 example. Thanks :)
 */
'use strict';

var components = require('./common/Components');

var ColonelBlotto = components.blotto;

import React, {
  AppRegistry
} from 'react-native';

AppRegistry.registerComponent('ColonelBlotto', () => ColonelBlotto);
