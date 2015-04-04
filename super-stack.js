/*
 * super-stack
 * https://github.com/blyork/super-stack
 *
 * Copyright (c) 2015 Benjamin York
 * Licensed under the MIT license.
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);

    } else if (typeof exports === 'object') {
        factory(exports);

    } else {
        factory((root.superStack = {}));
    }
})(this, function(exports) {
    'use strict';

    var childProperty = '_super_stack_child_';

    function addPrivate(object, property, value) {
        if (!(property in object)) {
            Object.defineProperty(object, property, {
                configurable: false,
                enumerable: false,
                value: value,
                writable: true
            });
        }
    }

    exports.attachToPrototype = function(prototype) {
        Object.defineProperty(prototype, 'child', {
            get: function() {
                return exports.getChild(this);
            }
        });

        Object.defineProperty(prototype, 'errors', {
            get: function() {
                return exports.getErrors(this);
            }
        });

        Object.defineProperty(prototype, 'messageArray', {
            get: function() {
                return exports.getMessageArray(this);
            }
        });

        Object.defineProperty(prototype, 'messages', {
            get: function() {
                return exports.getMessages(this);
            }
        });

        Object.defineProperty(prototype, 'stackArray', {
            get: function() {
                return exports.getStackArray(this);
            }
        });

        Object.defineProperty(prototype, 'stacks', {
            get: function() {
                return exports.getStacks(this);
            }
        });

        prototype.wrap = function(error) {
            return exports.wrap(this, error);
        };

        prototype.messageWrap = function(message) {
            return exports.messageWrap(message, this);
        }
    };

    exports.attachToErrorPrototype = function() {
        exports.attachToPrototype(Error.prototype);
    };

    exports.getChild = function(error) {
        addPrivate(error, childProperty, null);
        return error[childProperty];
    };

    exports.getErrors = function(error) {
        var errors = [];
        var current = error;

        while (current != null) {
            errors.push(current);
            current = exports.getChild(current);
        }

        return errors;
    };

    exports.getMessageArray = function(error) {
        return exports.getErrors(error).map(function(error) {
            return error.message;
        });
    };

    exports.getMessages = function(error, delimiter) {
        return exports.getMessageArray(error).join((delimiter == null) ? ' -> ' : delimiter);
    };

    exports.getStackArray = function(error) {
        return exports.getErrors(error).map(function(error) {
            return error.stack;
        });
    };

    exports.getStacks = function(error, delimiter) {
        return exports.getStackArray(error).join((delimiter == null) ? '\n-> ' : delimiter);
    };

    exports.messageWrap = function(message, error) {
        return exports.wrap(new error.constructor(message), error);
    };

    exports.wrap = function(parent, child) {
        addPrivate(parent, childProperty, null);

        if (child instanceof Error) {
            parent[childProperty] = child;

        } else if (typeof child === 'string') {
            parent[childProperty] = new parent.constructor(child);

        } else {
            parent[childProperty] = new parent.constructor(JSON.stringify(child));
        }

        return parent;
    };

});
