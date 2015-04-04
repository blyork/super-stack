/*
 * super-stack
 * https://github.com/blyork/super-stack
 *
 * Copyright (c) 2015 Benjamin York
 * Licensed under the MIT license.
 */

describe('functions', function() {
    'use strict';

    var expect, superStack;

    expect = require('chai').expect;
    superStack = require('../super-stack');

    describe('superStack.attachToErrorPrototype', function() {
        superStack.attachToErrorPrototype();
    });
});
