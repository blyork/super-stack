# super-stack v0.0.0

> Error wrapping in Javascript.

## Getting Started

### NPM

```shell
npm install super-stack --save
```

```javascript
var superStack = require('super-stack');

superStack.attachToErrorPrototype();

try {
    someAction()
} catch (err) {
    throw new RangeError('Object mode!').wrap(err);
}
```

### Bower

```shell
bower install super-stack --save
```

```html
<script type="text/javascript" src="bower_components/super-stack.min.js"></script>
<script type="text/javascript">
    try {
        someAction()
    } catch (err) {
        throw superStack.wrap(new TypeError('Wrap away!'), err);
    }

</script>
```

### Browser

```html
<script type="text/javascript" src="super-stack.min.js"></script>
<script type="text/javascript">
    try {
        someAction()
    } catch (err) {
        throw superStack.messageWrap('More readable message!', err);
    }

</script>
```

## Function-based API

<a name="attachToPrototype" />
### attachToPrototype(prototype)

Actives the object-based API for one specific error superclass. Useful if you want to avoid modifying the prototype of standard Error objects.

<a name="attachToErrorPrototype" />
### attachToErrorPrototype()

Actives the object-based API for all Error objects. It is the equivalent to `attachToPrototype(Error.prototype)`. 

<a name="getChild" />
### getChild(err)

Returns the first child of the error or null.

<a name="getErrors" />
### getErrors(err)

Returns an array of wrapped errors from the outside in. The current error is included. 

<a name="getMessageArray" />
### getMessageArray(err)

Returns an array of wrapped error messages from the outside in. The current error message is included.

<a name="getMessages" />
### getMessages(err, [delimiter=' -> '])

Returns a delimited string of all wrapped error messages from the outside in. The current error message is included.
 
<a name="getStackArray" />
### getStackArray(err)

Returns an array of wrapped error stacks from the outside in. The current error stack is included.

<a name="getStacks" />
### getStacks(err, [delimiter='\n-> '])

Returns a delimited string of all wrapped error stacks from the outside in. The current error stack is included.

<a name="messageWrap" />
### messageWrap(message, err)

Wraps the error into an new error of the same type with the given message. This is a useful tool for storing a more context specific error message while still retaining the original error.

Returns the newly created error. Useful for returning directly to a throw statement.

<a name="wrap" />
### wrap(parentError, childError)

Wraps the parent error around the child error.

Returns the parent error. Useful for returning directly to a throw statement.

## Object-based API

Most of the function-based API can be optionally mapped onto the Error object prototype with the [`attachToErrorPrototype`](#attachToErrorPrototype). Without activating this API the Error object modifications are kept down to a single variable that is namespaced to avoid collisions. An Error subclass can be activate instead by passing its prototype to [`attachToPrototype`](#attachToPrototype).

### API Mapping

| Object-based                         | Function-based                                               |
|--------------------------------------|--------------------------------------------------------------|
| err.child                            | [superStack.getChild(err)](#getChild)                        |
| err.errors                           | [superStack.getErrors(err)](#getErrors)                      |
| err.messageArray                     | [superStack.getMessageArray(err)](#getMessageArray)          |
| err.messages                         | [superStack.getMessages(err)](#getMessages)                  |
| err.stackArray                       | [superStack.getStackArray(err)](#getStackArray)              |
| err.stacks                           | [superStack.getStacks(err)](#getStacks)                      |
| throw new Error('message').wrap(err) | [throw superStack.wrap(new Error('message'), err)](#wrap)    |
| throw err.messageWrap('message')     | [throw superStack.messageWrap('message', err)](#messageWrap) |