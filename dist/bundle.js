(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
var arrays = require("./arrays");
var LinkedList = /** @class */ (function () {
    /**
    * Creates an empty Linked List.
    * @class A linked list is a data structure consisting of a group of nodes
    * which together represent a sequence.
    * @constructor
    */
    function LinkedList() {
        /**
        * First node in the list
        * @type {Object}
        * @private
        */
        this.firstNode = null;
        /**
        * Last node in the list
        * @type {Object}
        * @private
        */
        this.lastNode = null;
        /**
        * Number of elements in the list
        * @type {number}
        * @private
        */
        this.nElements = 0;
    }
    /**
    * Adds an element to this list.
    * @param {Object} item element to be added.
    * @param {number=} index optional index to add the element. If no index is specified
    * the element is added to the end of this list.
    * @return {boolean} true if the element was added or false if the index is invalid
    * or if the element is undefined.
    */
    LinkedList.prototype.add = function (item, index) {
        if (util.isUndefined(index)) {
            index = this.nElements;
        }
        if (index < 0 || index > this.nElements || util.isUndefined(item)) {
            return false;
        }
        var newNode = this.createNode(item);
        if (this.nElements === 0 || this.lastNode === null) {
            // First node in the list.
            this.firstNode = newNode;
            this.lastNode = newNode;
        }
        else if (index === this.nElements) {
            // Insert at the end.
            this.lastNode.next = newNode;
            this.lastNode = newNode;
        }
        else if (index === 0) {
            // Change first node.
            newNode.next = this.firstNode;
            this.firstNode = newNode;
        }
        else {
            var prev = this.nodeAtIndex(index - 1);
            if (prev == null) {
                return false;
            }
            newNode.next = prev.next;
            prev.next = newNode;
        }
        this.nElements++;
        return true;
    };
    /**
    * Returns the first element in this list.
    * @return {*} the first element of the list or undefined if the list is
    * empty.
    */
    LinkedList.prototype.first = function () {
        if (this.firstNode !== null) {
            return this.firstNode.element;
        }
        return undefined;
    };
    /**
    * Returns the last element in this list.
    * @return {*} the last element in the list or undefined if the list is
    * empty.
    */
    LinkedList.prototype.last = function () {
        if (this.lastNode !== null) {
            return this.lastNode.element;
        }
        return undefined;
    };
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index desired index.
     * @return {*} the element at the given index or undefined if the index is
     * out of bounds.
     */
    LinkedList.prototype.elementAtIndex = function (index) {
        var node = this.nodeAtIndex(index);
        if (node === null) {
            return undefined;
        }
        return node.element;
    };
    /**
     * Returns the index in this list of the first occurrence of the
     * specified element, or -1 if the List does not contain this element.
     * <p>If the elements inside this list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {number} the index in this list of the first occurrence
     * of the specified element, or -1 if this list does not contain the
     * element.
     */
    LinkedList.prototype.indexOf = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (util.isUndefined(item)) {
            return -1;
        }
        var currentNode = this.firstNode;
        var index = 0;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                return index;
            }
            index++;
            currentNode = currentNode.next;
        }
        return -1;
    };
    /**
       * Returns true if this list contains the specified element.
       * <p>If the elements inside the list are
       * not comparable with the === operator a custom equals function should be
       * provided to perform searches, the function must receive two arguments and
       * return true if they are equal, false otherwise. Example:</p>
       *
       * <pre>
       * const petsAreEqualByName = function(pet1, pet2) {
       *  return pet1.name === pet2.name;
       * }
       * </pre>
       * @param {Object} item element to search for.
       * @param {function(Object,Object):boolean=} equalsFunction Optional
       * function used to check if two elements are equal.
       * @return {boolean} true if this list contains the specified element, false
       * otherwise.
       */
    LinkedList.prototype.contains = function (item, equalsFunction) {
        return (this.indexOf(item, equalsFunction) >= 0);
    };
    /**
     * Removes the first occurrence of the specified element in this list.
     * <p>If the elements inside the list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to be removed from this list, if present.
     * @return {boolean} true if the list contained the specified element.
     */
    LinkedList.prototype.remove = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (this.nElements < 1 || util.isUndefined(item)) {
            return false;
        }
        var previous = null;
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                if (previous == null) {
                    this.firstNode = currentNode.next;
                    if (currentNode === this.lastNode) {
                        this.lastNode = null;
                    }
                }
                else if (currentNode === this.lastNode) {
                    this.lastNode = previous;
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                else {
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                this.nElements--;
                return true;
            }
            previous = currentNode;
            currentNode = currentNode.next;
        }
        return false;
    };
    /**
     * Removes all of the elements from this list.
     */
    LinkedList.prototype.clear = function () {
        this.firstNode = null;
        this.lastNode = null;
        this.nElements = 0;
    };
    /**
     * Returns true if this list is equal to the given list.
     * Two lists are equal if they have the same elements in the same order.
     * @param {LinkedList} other the other list.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function used to check if two elements are equal. If the elements in the lists
     * are custom objects you should provide a function, otherwise
     * the === operator is used to check equality between elements.
     * @return {boolean} true if this list is equal to the given list.
     */
    LinkedList.prototype.equals = function (other, equalsFunction) {
        var eqF = equalsFunction || util.defaultEquals;
        if (!(other instanceof LinkedList)) {
            return false;
        }
        if (this.size() !== other.size()) {
            return false;
        }
        return this.equalsAux(this.firstNode, other.firstNode, eqF);
    };
    /**
    * @private
    */
    LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
        while (n1 !== null && n2 !== null) {
            if (!eqF(n1.element, n2.element)) {
                return false;
            }
            n1 = n1.next;
            n2 = n2.next;
        }
        return true;
    };
    /**
     * Removes the element at the specified position in this list.
     * @param {number} index given index.
     * @return {*} removed element or undefined if the index is out of bounds.
     */
    LinkedList.prototype.removeElementAtIndex = function (index) {
        if (index < 0 || index >= this.nElements || this.firstNode === null || this.lastNode === null) {
            return undefined;
        }
        var element;
        if (this.nElements === 1) {
            //First node in the list.
            element = this.firstNode.element;
            this.firstNode = null;
            this.lastNode = null;
        }
        else {
            var previous = this.nodeAtIndex(index - 1);
            if (previous === null) {
                element = this.firstNode.element;
                this.firstNode = this.firstNode.next;
            }
            else if (previous.next === this.lastNode) {
                element = this.lastNode.element;
                this.lastNode = previous;
            }
            if (previous !== null && previous.next !== null) {
                element = previous.next.element;
                previous.next = previous.next.next;
            }
        }
        this.nElements--;
        return element;
    };
    /**
     * Executes the provided function once for each element present in this list in order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    LinkedList.prototype.forEach = function (callback) {
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (callback(currentNode.element) === false) {
                break;
            }
            currentNode = currentNode.next;
        }
    };
    /**
     * Reverses the order of the elements in this linked list (makes the last
     * element first, and the first element last).
     */
    LinkedList.prototype.reverse = function () {
        var previous = null;
        var current = this.firstNode;
        var temp = null;
        while (current !== null) {
            temp = current.next;
            current.next = previous;
            previous = current;
            current = temp;
        }
        temp = this.firstNode;
        this.firstNode = this.lastNode;
        this.lastNode = temp;
    };
    /**
     * Returns an array containing all of the elements in this list in proper
     * sequence.
     * @return {Array.<*>} an array containing all of the elements in this list,
     * in proper sequence.
     */
    LinkedList.prototype.toArray = function () {
        var array = [];
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            array.push(currentNode.element);
            currentNode = currentNode.next;
        }
        return array;
    };
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list.
     */
    LinkedList.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements.
     */
    LinkedList.prototype.isEmpty = function () {
        return this.nElements <= 0;
    };
    LinkedList.prototype.toString = function () {
        return arrays.toString(this.toArray());
    };
    /**
     * @private
     */
    LinkedList.prototype.nodeAtIndex = function (index) {
        if (index < 0 || index >= this.nElements) {
            return null;
        }
        if (index === (this.nElements - 1)) {
            return this.lastNode;
        }
        var node = this.firstNode;
        for (var i = 0; i < index && node != null; i++) {
            node = node.next;
        }
        return node;
    };
    /**
     * @private
     */
    LinkedList.prototype.createNode = function (item) {
        return {
            element: item,
            next: null
        };
    };
    return LinkedList;
}()); // End of linked list
exports.default = LinkedList;

},{"./arrays":3,"./util":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkedList_1 = require("./LinkedList");
var Queue = /** @class */ (function () {
    /**
     * Creates an empty queue.
     * @class A queue is a First-In-First-Out (FIFO) data structure, the first
     * element added to the queue will be the first one to be removed. This
     * implementation uses a linked list as a container.
     * @constructor
     */
    function Queue() {
        this.list = new LinkedList_1.default();
    }
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.enqueue = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.add = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Retrieves and removes the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.dequeue = function () {
        if (this.list.size() !== 0) {
            var el = this.list.first();
            this.list.removeElementAtIndex(0);
            return el;
        }
        return undefined;
    };
    /**
     * Retrieves, but does not remove, the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.peek = function () {
        if (this.list.size() !== 0) {
            return this.list.first();
        }
        return undefined;
    };
    /**
     * Returns the number of elements in this queue.
     * @return {number} the number of elements in this queue.
     */
    Queue.prototype.size = function () {
        return this.list.size();
    };
    /**
     * Returns true if this queue contains the specified element.
     * <p>If the elements inside this stack are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName (pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} elem element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function to check if two elements are equal.
     * @return {boolean} true if this queue contains the specified element,
     * false otherwise.
     */
    Queue.prototype.contains = function (elem, equalsFunction) {
        return this.list.contains(elem, equalsFunction);
    };
    /**
     * Checks if this queue is empty.
     * @return {boolean} true if and only if this queue contains no items; false
     * otherwise.
     */
    Queue.prototype.isEmpty = function () {
        return this.list.size() <= 0;
    };
    /**
     * Removes all of the elements from this queue.
     */
    Queue.prototype.clear = function () {
        this.list.clear();
    };
    /**
     * Executes the provided function once for each element present in this queue in
     * FIFO order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    Queue.prototype.forEach = function (callback) {
        this.list.forEach(callback);
    };
    return Queue;
}()); // End of queue
exports.default = Queue;

},{"./LinkedList":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
/**
 * Returns the position of the first occurrence of the specified item
 * within the specified array.4
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the first occurrence of the specified element
 * within the specified array, or -1 if not found.
 */
function indexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.indexOf = indexOf;
/**
 * Returns the position of the last occurrence of the specified element
 * within the specified array.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the last occurrence of the specified element
 * within the specified array or -1 if not found.
 */
function lastIndexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = length - 1; i >= 0; i--) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.lastIndexOf = lastIndexOf;
/**
 * Returns true if the specified array contains the specified element.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the specified array contains the specified element.
 */
function contains(array, item, equalsFunction) {
    return indexOf(array, item, equalsFunction) >= 0;
}
exports.contains = contains;
/**
 * Removes the first ocurrence of the specified element from the specified array.
 * @param {*} array the array in which to search element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the array changed after this call.
 */
function remove(array, item, equalsFunction) {
    var index = indexOf(array, item, equalsFunction);
    if (index < 0) {
        return false;
    }
    array.splice(index, 1);
    return true;
}
exports.remove = remove;
/**
 * Returns the number of elements in the specified array equal
 * to the specified object.
 * @param {Array} array the array in which to determine the frequency of the element.
 * @param {Object} item the element whose frequency is to be determined.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the number of elements in the specified array
 * equal to the specified object.
 */
function frequency(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    var freq = 0;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            freq++;
        }
    }
    return freq;
}
exports.frequency = frequency;
/**
 * Returns true if the two specified arrays are equal to one another.
 * Two arrays are considered equal if both arrays contain the same number
 * of elements, and all corresponding pairs of elements in the two
 * arrays are equal and are in the same order.
 * @param {Array} array1 one array to be tested for equality.
 * @param {Array} array2 the other array to be tested for equality.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between elemements in the arrays.
 * @return {boolean} true if the two arrays are equal
 */
function equals(array1, array2, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    if (array1.length !== array2.length) {
        return false;
    }
    var length = array1.length;
    for (var i = 0; i < length; i++) {
        if (!equals(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
/**
 * Returns shallow a copy of the specified array.
 * @param {*} array the array to copy.
 * @return {Array} a copy of the specified array
 */
function copy(array) {
    return array.concat();
}
exports.copy = copy;
/**
 * Swaps the elements at the specified positions in the specified array.
 * @param {Array} array The array in which to swap elements.
 * @param {number} i the index of one element to be swapped.
 * @param {number} j the index of the other element to be swapped.
 * @return {boolean} true if the array is defined and the indexes are valid.
 */
function swap(array, i, j) {
    if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
        return false;
    }
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return true;
}
exports.swap = swap;
function toString(array) {
    return '[' + array.toString() + ']';
}
exports.toString = toString;
/**
 * Executes the provided function once for each element present in this array
 * starting from index 0 to length - 1.
 * @param {Array} array The array in which to iterate.
 * @param {function(Object):*} callback function to execute, it is
 * invoked with one argument: the element value, to break the iteration you can
 * optionally return false.
 */
function forEach(array, callback) {
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var ele = array_1[_i];
        if (callback(ele) === false) {
            return;
        }
    }
}
exports.forEach = forEach;

},{"./util":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _hasOwnProperty = Object.prototype.hasOwnProperty;
exports.has = function (obj, prop) {
    return _hasOwnProperty.call(obj, prop);
};
/**
 * Default function to compare element order.
 * @function
 */
function defaultCompare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else {
        return 1;
    }
}
exports.defaultCompare = defaultCompare;
/**
 * Default function to test equality.
 * @function
 */
function defaultEquals(a, b) {
    return a === b;
}
exports.defaultEquals = defaultEquals;
/**
 * Default function to convert an object to a string.
 * @function
 */
function defaultToString(item) {
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return '$s' + item;
    }
    else {
        return '$o' + item.toString();
    }
}
exports.defaultToString = defaultToString;
/**
* Joins all the properies of the object using the provided join string
*/
function makeString(item, join) {
    if (join === void 0) { join = ','; }
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return item.toString();
    }
    else {
        var toret = '{';
        var first = true;
        for (var prop in item) {
            if (exports.has(item, prop)) {
                if (first) {
                    first = false;
                }
                else {
                    toret = toret + join;
                }
                toret = toret + prop + ':' + item[prop];
            }
        }
        return toret + '}';
    }
}
exports.makeString = makeString;
/**
 * Checks if the given argument is a function.
 * @function
 */
function isFunction(func) {
    return (typeof func) === 'function';
}
exports.isFunction = isFunction;
/**
 * Checks if the given argument is undefined.
 * @function
 */
function isUndefined(obj) {
    return (typeof obj) === 'undefined';
}
exports.isUndefined = isUndefined;
/**
 * Checks if the given argument is a string.
 * @function
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
exports.isString = isString;
/**
 * Reverses a compare function.
 * @function
 */
function reverseCompareFunction(compareFunction) {
    if (isUndefined(compareFunction) || !isFunction(compareFunction)) {
        return function (a, b) {
            if (a < b) {
                return 1;
            }
            else if (a === b) {
                return 0;
            }
            else {
                return -1;
            }
        };
    }
    else {
        return function (d, v) {
            return compareFunction(d, v) * -1;
        };
    }
}
exports.reverseCompareFunction = reverseCompareFunction;
/**
 * Returns an equal function given a compare function.
 * @function
 */
function compareToEquals(compareFunction) {
    return function (a, b) {
        return compareFunction(a, b) === 0;
    };
}
exports.compareToEquals = compareToEquals;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* /// <reference path="scripting.ts"/> */
var scripting_1 = require("./scripting");
var util_1 = require("typescript-collections/dist/lib/util");
// 1. Define State
// Locations
var STORAGE = "STORAGE";
var DOCTORS_OFFICE = "DOCTORS OFFICE";
var ENGINES = "ENGINES";
var COCKPIT = "COCKPIT";
var ESCAPE_POD = "ESCAPE POD";
var TRANSPORT_ROOM = "TRANSPORT ROOM";
var MONITORING_ROOM = "MONITORING ROOM";
var MAIN_AREA = "MAIN AREA";
var FEM_BEDROOM = "FEM BEDROOM";
var MALE_BEDROOM = "MALE BEDROOM";
var BATHROOM = "BATHROOM";
var UNKNOWN = "UNKNOWN";
// Add Locations
scripting_1.addLocation(ENGINES, [STORAGE, MAIN_AREA]);
scripting_1.addLocation(STORAGE, [ENGINES, DOCTORS_OFFICE]);
scripting_1.addLocation(DOCTORS_OFFICE, [STORAGE, MAIN_AREA, COCKPIT, MONITORING_ROOM]);
scripting_1.addLocation(COCKPIT, [DOCTORS_OFFICE]);
scripting_1.addLocation(ESCAPE_POD, [MAIN_AREA]);
scripting_1.addLocation(TRANSPORT_ROOM, [MONITORING_ROOM, MAIN_AREA]);
scripting_1.addLocation(MONITORING_ROOM, [TRANSPORT_ROOM, DOCTORS_OFFICE]);
scripting_1.addLocation(MAIN_AREA, [ENGINES, STORAGE, DOCTORS_OFFICE, TRANSPORT_ROOM, ESCAPE_POD]);
scripting_1.addLocation(FEM_BEDROOM, [MAIN_AREA, BATHROOM]);
scripting_1.addLocation(MALE_BEDROOM, [MAIN_AREA, BATHROOM]);
scripting_1.addLocation(BATHROOM, [MAIN_AREA, FEM_BEDROOM, MALE_BEDROOM]);
// agents
var Caleb = scripting_1.addAgent("Caleb");
var Quinn = scripting_1.addAgent("Quinn");
var Mark = scripting_1.addAgent("Mark");
var Eddie = scripting_1.addAgent("Eddie");
var Beatrice = scripting_1.addAgent("Beatrice");
// items
var wires1 = scripting_1.addItem("wires1");
var wires2 = scripting_1.addItem("wires2");
wires1.setCurrentLocation(STORAGE);
wires2.setCurrentLocation(MONITORING_ROOM);
// setItemVariable(wires1, "currentLocation", STORAGE);
// setItemVariable(wires2, "currentLocation", MONITORING_ROOM);
// var wiresCollected = setVariable("wiresCollected", 0);
// // variables
//Caleb
// setAgentVariable(Caleb, "currentLocation", COCKPIT);
Caleb.setCurrentLocation(COCKPIT);
//Quinn
// setAgentVariable(Quinn, "currentLocation", DOCTORS_OFFICE);
Quinn.setCurrentLocation(DOCTORS_OFFICE);
//Mark
// setAgentVariable(Mark, "currentLocation", TRANSPORT_ROOM);
Mark.setCurrentLocation(TRANSPORT_ROOM);
//Eddie
// setAgentVariable(Eddie, "currentLocation", STORAGE);
Eddie.setCurrentLocation(STORAGE);
//Beatrice
// setAgentVariable(Beatrice, "currentLocation", ENGINES);
Beatrice.setCurrentLocation(ENGINES);
// Player
var playerLocation = scripting_1.setVariable("playerLocation", MAIN_AREA);
var wiresCollected = scripting_1.setVariable("wiresCollected", 0);
// Knowledge 
Caleb.setLastSawItemAtLocation(wires1, UNKNOWN);
Quinn.setLastSawItemAtLocation(wires1, UNKNOWN);
Mark.setLastSawItemAtLocation(wires1, UNKNOWN);
Eddie.setLastSawItemAtLocation(wires1, UNKNOWN);
Beatrice.setLastSawItemAtLocation(wires1, UNKNOWN);
// setAgentVariable(Caleb, "lastSeen:wires1", UNKNOWN)
// setAgentVariable(Caleb, "lastSeen:wires2", UNKNOWN)
// setAgentVariable(Caleb, "lastSeen:player", UNKNOWN)
Caleb.setLastSawItemAtLocation(wires2, UNKNOWN);
// Caleb.setLastSawPersonAtLocation(player, UNKNOWN);
Quinn.setLastSawItemAtLocation(wires2, UNKNOWN);
// Quinn.setLastSawPersonAtLocation(player, UNKNOWN);
Mark.setLastSawItemAtLocation(wires2, UNKNOWN);
// Mark.setLastSawPersonAtLocation(player, UNKNOWN);
Eddie.setLastSawItemAtLocation(wires2, UNKNOWN);
// Eddie.setLastSawPersonAtLocation(player, UNKNOWN);
Beatrice.setLastSawItemAtLocation(wires2, UNKNOWN);
// Beatrice.setLastSawPersonAtLocation(player, UNKNOWN);
// Goals for the player
// 0: Unknown/Initial State
// 1: Found out about Fault:1. New Goal. (only occurs if status=0)
// 2: Fixed Fault:1 (only occurs if status=1)
// 3: Found out about Fault:2. New Goal (only occurs if status=2)
// 4: Fixed Fault:2 (only occurs if status=3) 
// etc. etc.
var goal_broken_transport = scripting_1.setVariable("TRANSPORT_ROOM:Broken", 0); // max:4
var goal_broken_engines = scripting_1.setVariable("ENGINES:Broken", 0);
var goal_broken_storage = scripting_1.setVariable("STORAGE:Broken", 0);
var goal_broken_cockpit = scripting_1.setVariable("COCKPIT:Broken", 0);
var goal_broken_main = scripting_1.setVariable("MAIN_ROOM:Broken", 0);
var goal_broken_dr = scripting_1.setVariable("DR_OFFICE:Broken", 0);
var goal_broken_monitoring = scripting_1.setVariable("MONITORING_ROOM:Broken", 0);
var goal_broken_escape = scripting_1.setVariable("ESCAPE_POD:Broken", 0);
// // 2. Define BTs
// // create ground actions
// Todo from here
// function function_name(argument) {
// 	// body...
// }
function setNextDestinationForAgent(agent, destination) {
    if (destination === void 0) { destination = "UNKNOWN"; }
    if (destination == "UNKNOWN") {
        var setRandNumber = scripting_1.action(function () { return true; }, function () { return agent.randNumber = scripting_1.getRandNumber(1, 11); }, 0);
        // Sasha Todo: Work on using the Agent/Item types for destinations
        var chooseENGINES = scripting_1.action(function () { return agent.randNumber == 1; }, function () { return agent.destination = ENGINES; }, 0);
        var chooseSTORAGE = scripting_1.action(function () { return agent.randNumber == 2; }, function () { return agent.destination = STORAGE; }, 0);
        var chooseDOCTORS_OFFICE = scripting_1.action(function () { return agent.randNumber == 3; }, function () { return agent.destination = DOCTORS_OFFICE; }, 0);
        var chooseCOCKPIT = scripting_1.action(function () { return agent.randNumber == 4; }, function () { return agent.destination = COCKPIT; }, 0);
        var chooseESCAPE_POD = scripting_1.action(function () { return agent.randNumber == 5; }, function () { return agent.destination = ESCAPE_POD; }, 0);
        var chooseTRANSPORT_ROOM = scripting_1.action(function () { return agent.randNumber == 6; }, function () { return agent.destination = TRANSPORT_ROOM; }, 0);
        var chooseMONITORING_ROOM = scripting_1.action(function () { return agent.randNumber == 7; }, function () { return agent.destination = MONITORING_ROOM; }, 0);
        var chooseMAIN_AREA = scripting_1.action(function () { return agent.randNumber == 8; }, function () { return agent.destination = MAIN_AREA; }, 0);
        var chooseFEM_BEDROOM = scripting_1.action(function () { return agent.randNumber == 9; }, function () { return agent.destination = FEM_BEDROOM; }, 0);
        var chooseMALE_BEDROOM = scripting_1.action(function () { return agent.randNumber == 10; }, function () { return agent.destination = MALE_BEDROOM; }, 0);
        var chooseBATHROOM = scripting_1.action(function () { return agent.randNumber == 11; }, function () { return agent.destination = BATHROOM; }, 0);
        var setNextDestination = scripting_1.sequence([
            setRandNumber,
            scripting_1.selector([
                chooseENGINES,
                chooseCOCKPIT,
                chooseSTORAGE,
                chooseDOCTORS_OFFICE,
                chooseBATHROOM,
                chooseMALE_BEDROOM,
                chooseFEM_BEDROOM,
                chooseMAIN_AREA,
                chooseMONITORING_ROOM,
                chooseTRANSPORT_ROOM,
                chooseESCAPE_POD
            ])
        ]);
        return setNextDestination;
    }
    else {
        return scripting_1.sequence([
        // let setDestinationPrecond: Precondition = () => isUndefined(agent.destination) || agent.destination == agent.currentLocation;
        ]);
        // let chooseENGINES = action(() => destination == ENGINES, () => agent.destination = ENGINES, 0);
        // let chooseSTORAGE = action(() => destination == STORAGE, () => agent.destination = STORAGE, 0);
        // let chooseDOCTORS_OFFICE = action(() => destination == DOCTORS_OFFICE, () => agent.destination = DOCTORS_OFFICE, 0);
        // let chooseCOCKPIT = action(() => destination == COCKPIT, () => agent.destination = COCKPIT, 0);
        // let chooseESCAPE_POD = action(() => destination == ESCAPE_POD, () => agent.destination = ESCAPE_POD, 0);
        // let chooseTRANSPORT_ROOM = action(() => destination == TRANSPORT_ROOM, () => agent.destination = TRANSPORT_ROOM, 0);
        // let chooseMONITORING_ROOM = action(() => destination == MONITORING_ROOM, () => agent.destination = MONITORING_ROOM, 0);
        // let chooseMAIN_AREA = action(() => destination == MAIN_AREA, () => agent.destination = MAIN_AREA, 0);
        // let chooseFEM_BEDROOM = action(() => destination == FEM_BEDROOM, () => agent.destination = FEM_BEDROOM, 0);
        // let chooseMALE_BEDROOM = action(() => destination == MALE_BEDROOM, () => agent.destination = MALE_BEDROOM, 0);
        // let chooseBATHROOM = action(() => destination == BATHROOM, () => agent.destination = BATHROOM, 0);
        // let setNextDestination = selector([
        // 	chooseENGINES,
        // 	chooseCOCKPIT,
        // 	chooseSTORAGE,
        // 	chooseDOCTORS_OFFICE,
        // 	chooseBATHROOM,
        // 	chooseMALE_BEDROOM,
        // 	chooseFEM_BEDROOM,
        // 	chooseMAIN_AREA,
        // 	chooseMONITORING_ROOM,
        // 	chooseTRANSPORT_ROOM,
        // 	chooseESCAPE_POD
        // ]);
        // return setNextDestination;
    }
}
var setDestinationPrecondForAgent = function (agent) {
    var setDestinationPrecond = function () { return util_1.isUndefined(agent.destination) || agent.destination == agent.currentLocation; };
    return setDestinationPrecond;
};
// // create behavior trees
// let gotoNextLocationForAgent = function(agent: Agent){
// 	return agent.getNextLocation()
// 	// return  action(
// 	// 	() => true,
// 	// 	() => {
// 	// 		agent.currentLocation = getNextLocation(agent.currentLocation, agent.destination);
// 	// 		console.log(agent, " at: ", agent.currentLocation);
// 	// 	},
// 	// 	0
// 	// );
// }
var lastSeenByAgent = function (agent) {
    return scripting_1.sequence([
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return agent.currentLocation == wires1.currentLocation; }, 
            // () => getAgentVariable(agent, 'currentLocation') == getItemVariable(wires1, "currentLocation"),
            //effect
            function () {
                console.log(agent + " sees - Item: wires1 | Location: " + agent.currentLocation);
                // console.log(agentName + " sees - Item: wires1 | Location: "+ getAgentVariable(agentName, 'currentLocation'));
                // setAgentVariable(agentName, "lastSeen:wires1",  getAgentVariable(agentName, 'currentLocation'))
                agent.setLastSawItemAtLocation(wires1, agent.currentLocation);
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ]),
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return agent.currentLocation == wires2.currentLocation; }, 
            // () => getAgentVariable(agentName, 'currentLocation') == getItemVariable(wires2, "currentLocation"),
            //effect
            function () {
                console.log(agent + " sees - Item: wires2 | Location: " + agent.currentLocation);
                // console.log(agentName + "sees - Item: wires2 | Location: "+getAgentVariable(agentName, 'currentLocation'));
                agent.setLastSawItemAtLocation(wires2, agent.currentLocation);
                // setAgentVariable(agentName, "lastSeen:wires2",  getAgentVariable(agentName, 'currentLocation'))
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ]),
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return agent.currentLocation == scripting_1.getVariable("playerLocation"); }, 
            // () => getAgentVariable(agentName, 'currentLocation') == getVariable("playerLocation"),
            //effect
            function () {
                console.log(agent + " sees - Person: Player | Location: " + agent.currentLocation);
                // console.log(agentName + "sees - Person: Player | Location: "+getAgentVariable(agentName, 'currentLocation'));
                // agent.setLastSawItemAtLocation(wires1, agent.currentLocation);
                agent.setLastSawPersonAtLocation('player', agent.currentLocation);
                // setAgentVariable(agentName, "lastSeen:player",  getAgentVariable(agentName, 'currentLocation'))
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ])
    ]);
};
// Todo: Has to be a better way to return a behaviour tree to go to the next destination for an agent. 
// Todo: Move to scripting under Agent instead. 
var searchForAgent = function (agent, destination) {
    if (destination === void 0) { destination = "UNKNOWN"; }
    if (destination == "UNKNOWN") {
        var search = scripting_1.sequence([
            scripting_1.selector([
                scripting_1.guard(setDestinationPrecondForAgent(agent), setNextDestinationForAgent(agent)),
                scripting_1.action(function () { return true; }, function () {
                }, 0)
            ]),
            agent.getNextLocation()
            // gotoNextLocationForAgent(agent),
        ]);
        return search;
    }
    else {
        var search = scripting_1.sequence([
            scripting_1.selector([
                scripting_1.guard(setDestinationPrecondForAgent(agent), setNextDestinationForAgent(agent, destination)),
                scripting_1.action(function () { return true; }, function () {
                }, 0)
            ]),
            agent.getNextLocation()
            // gotoNextLocationForAgent(agent),
        ]);
        return search;
    }
};
var CalebBT = scripting_1.sequence([
    lastSeenByAgent(Caleb),
    scripting_1.sequence([
        searchForAgent(Caleb), lastSeenByAgent(Caleb)
    ])
]);
var QuinnBT = scripting_1.sequence([
    lastSeenByAgent(Quinn),
    scripting_1.sequence([
        searchForAgent(Quinn), lastSeenByAgent(Quinn)
    ])
]);
var MarkBT = scripting_1.sequence([
    lastSeenByAgent(Mark),
    scripting_1.sequence([
        searchForAgent(Mark), lastSeenByAgent(Mark)
    ])
]);
var EddieBT = scripting_1.sequence([
    lastSeenByAgent(Eddie),
    scripting_1.sequence([
        searchForAgent(Eddie), lastSeenByAgent(Eddie)
    ])
]);
var BeatriceBT = scripting_1.sequence([
    lastSeenByAgent(Beatrice),
    scripting_1.sequence([
        searchForAgent(Beatrice), lastSeenByAgent(Beatrice)
    ])
]);
// //attach behaviour trees to agents
scripting_1.attachTreeToAgent(Caleb, CalebBT);
scripting_1.attachTreeToAgent(Quinn, QuinnBT);
scripting_1.attachTreeToAgent(Mark, MarkBT);
scripting_1.attachTreeToAgent(Eddie, EddieBT);
scripting_1.attachTreeToAgent(Beatrice, BeatriceBT);
// // 3. Construct story
// // create user actions
scripting_1.setVariable("theStart", 0);
scripting_1.setVariable("EngineStart", 0);
scripting_1.setVariable("StorageStart", 0);
scripting_1.setVariable("DrOfficeStart", 0);
scripting_1.setVariable("CockpitStart", 0);
scripting_1.setVariable("MonitoringStart", 0);
scripting_1.setVariable("TransportStart", 0);
scripting_1.setVariable("EscapeStart", 0);
var MainBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MAIN_AREA; }, scripting_1.sequence([
    // displayDescriptionAction("You enter the ship's main area."),
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("theStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("It was a simple mission: land on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Everything went awry during phase two. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed to have been lost in space. The commander comes to as the ship is plummeting from orbit, their crewmates yelling at each other. There is only one escape pod remaining. As commander, you are equipped with a special interactive map allowing you to see the positions of your crewmates at all times. You must utilize the map in order to take control of the ship and remaining crew to save everyone from certain death."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("theStart", 1);
                console.log("This is: ", scripting_1.getVariable(goal_broken_main));
                console.log(scripting_1.getVariable("MAIN_ROOM:Broken"), scripting_1.getVariable("MAIN_ROOM:Broken") == 0);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("theStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the ship's main area."),
            scripting_1.addUserAction("Go north to enter the engine room.", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
            scripting_1.addUserAction("Go northeast to enter the storage room.", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
            scripting_1.addUserAction("Go east to enter the cockpit.", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
            scripting_1.addUserAction("Go southeast to enter the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
            scripting_1.addUserAction("Go south into the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
            scripting_1.addUserAction("Go south into the transport room.", function () { return scripting_1.setVariable(playerLocation, TRANSPORT_ROOM); }),
            scripting_1.addUserAction("Go southwest to enter the escape pod.", function () { return scripting_1.setVariable(playerLocation, ESCAPE_POD); }),
            scripting_1.addUserAction("Go west to enter the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
        ])),
        scripting_1.selector([
            scripting_1.guard(function () { return scripting_1.getVariable("MAIN_ROOM:Broken") == 0; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("It has been hours since the crew last ate. The resident ship mom could help prepare some food."),
                scripting_1.action(function () { return true; }, function () {
                    scripting_1.setVariable("MAIN_ROOM:Broken", 1);
                }, 0)
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("MAIN_ROOM:Broken") == 1; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Find someone to prepare food for the crew."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("MAIN_ROOM:Broken") == 2; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("The crew was able to eat, but the kitchen was left a mess. Someone needs to clean it."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("MAIN_ROOM:Broken") == 3; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("You need to find someone to clean the kitchen."),
            ])),
        ]),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(MainBT);
var EngineBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ENGINES; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("EngineStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("The engine room is where Beatrice spends most of her time. She’s a natural when it comes to problem solving, but her unapproachable and unfriendly personality turned many influential commanders away from her. Despite her personality, her engineering skills are second-to-none...granted she is the only engineer left."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("EngineStart", 1);
                console.log("This is: ", scripting_1.getVariable(goal_broken_engines));
                console.log(scripting_1.getVariable("ENGINES:Broken"), scripting_1.getVariable("ENGINES:Broken") == 0);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("EngineStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the engine room."),
            scripting_1.addUserAction("Head east into the storage room.", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        scripting_1.selector([
            scripting_1.guard(function () { return scripting_1.getVariable("ENGINES:Broken") == 0; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("In order to fix the engines, replacement wires must be found. An engineer or janitor should know where they are."),
                scripting_1.action(function () { return true; }, function () {
                    scripting_1.setVariable("ENGINES:Broken", 1);
                }, 0)
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("ENGINES:Broken") == 1; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("You need to find replacement wires."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("ENGINES:Broken") == 2; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("The wires were found, but the tool box seems to be missing. Caleb might have taken it."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("ENGINES:Broken") == 3; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Before the engines can be fixed, you need to find a tool box."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("ENGINES:Broken") == 4; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("With box acquired, the wires can now be replaced. An engineer should know how to do it."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("ENGINES:Broken") == 5; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("You need to have the wires replaced in the engine room."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("ENGINES:Broken") == 6; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("The engine's now fixed, but it still needs to be restarted."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("ENGINES:Broken") == 7; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("You need to find someone to restart the teleporter."),
            ])),
        ]),
        //Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(EngineBT);
var StorageBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == STORAGE; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("StorageStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("The storage room is where Eddie spends his time and stores his janitor equipment. Old as he is, he still does his best to contribute to the team in whatever way he can, despite lacking technical skills the other crewmates employ. Although he is a well-known hero among military personnel, his crewmates continue to remain oblivious to the fact that the man who scrubs their toilets had been one of the most accomplished military officers the universe had ever seen."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("StorageStart", 1);
                console.log("This is: ", scripting_1.getVariable(goal_broken_storage));
                console.log(scripting_1.getVariable("STORAGE:Broken"), scripting_1.getVariable("STORAGE:Broken") == 0);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("StorageStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You moved into the storage room."),
            scripting_1.addUserAction("Move west into the engine room.", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        scripting_1.selector([
            scripting_1.guard(function () { return scripting_1.getVariable("STORAGE:Broken") == 0; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("The storage room is a mess. A janitor would be able to make sense of it all."),
                scripting_1.action(function () { return true; }, function () {
                    scripting_1.setVariable("STORAGE:Broken", 1);
                }, 0)
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("STORAGE:Broken") == 1; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Find someone to reorganize the storage room."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("STORAGE:Broken") == 2; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Now that the storage room is clean, the replacement wires can by found."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("STORAGE:Broken") == 3; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Find someone to retrieve the wires."),
            ])),
        ]),
        //Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(StorageBT);
var DrOfficeBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == DOCTORS_OFFICE; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("DrOfficeStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("Dr. Quinn spends a lot of time in her office looking after patients. She puts all others above herself; she is constantly concerned with the well-being of her crewmates. The prospect of her patients dying still keeps her up at night, but her determination to save as many people as she can is what keeps her going. Her maternal instincts follow her from her house to the ship."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("DrOfficeStart", 1);
                console.log("This is: ", scripting_1.getVariable(goal_broken_dr));
                console.log(scripting_1.getVariable("DR_OFFICE:Broken"), scripting_1.getVariable("DR_OFFICE:Broken") == 0);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("DrOfficeStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the doctor's office."),
            scripting_1.addUserAction("Move northeast into the cockpit.", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
            scripting_1.addUserAction("Go west into the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        scripting_1.selector([
            scripting_1.guard(function () { return scripting_1.getVariable("DR_OFFICE:Broken") == 0; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Some crewmates may have sustained injuries. Find the doctor."),
                scripting_1.action(function () { return true; }, function () {
                    scripting_1.setVariable("DR_OFFICE:Broken", 1);
                }, 0)
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("DR_OFFICE:Broken") == 1; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Find someone to check the crew's health."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("DR_OFFICE:Broken") == 2; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Some minor injuries were sustained. Find the doctor to heal the crew's injuries."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("DR_OFFICE:Broken") == 3; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Find someone to heal the crew's injuries."),
            ])),
        ]),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(DrOfficeBT);
var CockpitBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == COCKPIT; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("CockpitStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("The cockpit is where Taylor pilots the ship, but Caleb spends a lot of his time there as well. Caleb runs things very differently from Taylor; he is a demanding leader who harshly criticizes his crewmates when failures occur. He secretly loathes Taylor; their personalities clash all-too-frequently, and their position on the ship despite his older age is a constant source of anger to the officer."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("CockpitStart", 1);
                console.log("This is: ", scripting_1.getVariable(goal_broken_cockpit));
                console.log(scripting_1.getVariable("COCKPIT:Broken"), scripting_1.getVariable("COCKPIT:Broken") == 0);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("CockpitStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You move forward into the cockpit."),
            scripting_1.addUserAction("Move southwest into the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        scripting_1.selector([
            scripting_1.guard(function () { return scripting_1.getVariable("COCKPIT:Broken") == 0; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Now that the ship is back online, you will need to contact a support ship. An officer would be perfect for the job."),
                scripting_1.action(function () { return true; }, function () {
                    scripting_1.setVariable("COCKPIT:Broken", 1);
                }, 0)
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("COCKPIT:Broken") == 1; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("You need to find someone to contact a support ship."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("COCKPIT:Broken") == 2; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("A support ship has now been contacted, but the ship must get ready to be moved."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("COCKPIT:Broken") == 3; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("You need to find someone to prepare the ship to move."),
            ])),
        ]),
    ]),
]));
scripting_1.addUserInteractionTree(CockpitBT);
var MonitoringBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MONITORING_ROOM; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("MonitoringStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("The monitoring room is purposed to see into the transport room, thus watching for signs of trouble with the transporter."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("MonitoringStart", 1);
                console.log("This is: ", scripting_1.getVariable(goal_broken_monitoring));
                console.log(scripting_1.getVariable("MONITORING_ROOM:Broken"), scripting_1.getVariable("MONITORING_ROOM:Broken") == 0);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("MonitoringStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the monitoring room."),
            scripting_1.addUserAction("Move east into the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
            scripting_1.addUserAction("Go west into the transport room.", function () { return scripting_1.setVariable(playerLocation, TRANSPORT_ROOM); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        scripting_1.selector([
            scripting_1.guard(function () { return scripting_1.getVariable("MONITORING_ROOM:Broken") == 0; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("The monitoring room needs to be inspected to note any malfunctions."),
                scripting_1.action(function () { return true; }, function () {
                    scripting_1.setVariable("MONITORING_ROOM:Broken", 1);
                }, 0)
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("MONITORING_ROOM:Broken") == 1; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("You need to find someone to inspect the monitoring room."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("MONITORING_ROOM:Broken") == 2; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("Nothing is wrong in the monitoring room, but some broken shards flew in from the adjacent room. A janitor would have it cleaned up in no time."),
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("MONITORING_ROOM:Broken") == 3; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("You need to find someone to clean the monitoring room."),
            ])),
        ]),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(MonitoringBT);
var TransportBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TRANSPORT_ROOM; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("TransportStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("Where the transporter is located and where the failure occurred. Mark the transport officer often works in here. Mark is an older crewmate who avoids the spotlight like the plague. His anxiety levels shot up rapidly after the failure, and he is excessively worried that the rest of the crew blames the failure on him."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("TransportStart", 1);
                console.log("This is: ", scripting_1.getVariable(goal_broken_transport));
                console.log(scripting_1.getVariable("TRANSPORT_ROOM:Broken"), scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 0);
            }),
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("TransportStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the transport room where the teleporter is located."),
            scripting_1.addUserAction("Move east into the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
            scripting_1.addUserAction("Exit to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
            // Goal options for the room -> Only showing these when the main help text is off. 
            scripting_1.selector([
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 0; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("There seems to be a problem with the teleporter software. Maybe a transport officer could check it out."),
                    scripting_1.action(function () { return true; }, function () {
                        // Hint given: Ask Mark
                        scripting_1.setVariable("TRANSPORT_ROOM:Broken", 1);
                    }, 0)
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 1; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("You need to find someone to look at the teleporter sofware."),
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 2; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("The software was looked over, but before it can be restarted, the room must be cleaned. Sounds like a janitor's job."),
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 3; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("You need to clean the room before any other progress is made."),
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 4; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("The room is cleaned, so now the teleporter software can be restarted."),
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 5; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("You need to find someone to restart the teleporter software."),
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 6; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("The teleporter software was restarted, but now it needs to be reconfigured to match the settings of the ship."),
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 7; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("You need to find someone to reconfigure the software."),
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 8; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("The teleporter software is now good to go, so all that is left is to restart the teleporter itself."),
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 9; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("You need to find someone to restart the teleporter."),
                ])),
            ])
        ]))
        // Optional
        // displayDescriptionAction("Something seems to have gone wrong...")
    ])
]));
scripting_1.addUserInteractionTree(TransportBT);
var EscapePodBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ESCAPE_POD; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("EscapeStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("There is only one escape pod aboard this ship. If any crewmate becomes too fearful of their current situation, they will attempt to leave in it."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("EscapeStart", 1);
                console.log("This is: ", scripting_1.getVariable(goal_broken_escape));
                console.log(scripting_1.getVariable("ESCAPE_POD:Broken"), scripting_1.getVariable("ESCAPE_POD:Broken") == 0);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("EscapeStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the escape pod."),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        scripting_1.selector([
            scripting_1.guard(function () { return scripting_1.getVariable("ESCAPE_POD:Broken") == 0; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("The escape pod needs to be inspected for signs of malfunctions."),
                scripting_1.action(function () { return true; }, function () {
                    scripting_1.setVariable("ESCAPE_POD:Broken", 1);
                }, 0)
            ])),
            scripting_1.guard(function () { return scripting_1.getVariable("ESCAPE_POD:Broken") == 1; }, scripting_1.sequence([
                scripting_1.displayDescriptionAction("You need to find someone to inspect the escape pod."),
            ])),
        ]),
    ]),
]));
scripting_1.addUserInteractionTree(EscapePodBT);
var FBedroomBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == FEM_BEDROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move into the females' bedroom."),
    scripting_1.addUserAction("Return to the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
]));
scripting_1.addUserInteractionTree(FBedroomBT);
var BathroomBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BATHROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move into the bathroom."),
    scripting_1.addUserAction("Move south into the males' bedroom.", function () { return scripting_1.setVariable(playerLocation, MALE_BEDROOM); }),
    scripting_1.addUserAction("Move north into the females' bedroom.", function () { return scripting_1.setVariable(playerLocation, FEM_BEDROOM); }),
    scripting_1.addUserAction("Enter the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(BathroomBT);
var MBedroomBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MALE_BEDROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move into the males' bedroom."),
    scripting_1.addUserAction("Return to bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
]));
scripting_1.addUserInteractionTree(MBedroomBT);
var wires1BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == wires1.currentLocation; }, //  getItemVariable(wires1, "currentLocation")
scripting_1.sequence([
    scripting_1.displayDescriptionAction("You notice wires on the ground."),
    scripting_1.addUserActionTree("Pick up the wires.", scripting_1.sequence([
        scripting_1.action(function () { return true; }, function () {
            scripting_1.displayActionEffectText("You pick up the wires.");
            scripting_1.setItemVariable(wires1, "currentLocation", "player");
            scripting_1.setVariable(wiresCollected, scripting_1.getVariable(wiresCollected) + 1);
        }, 0),
    ]))
]));
scripting_1.addUserInteractionTree(wires1BT);
var wires2BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == wires2.currentLocation; }, // getItemVariable(wires2, "currentLocation"),
scripting_1.sequence([
    scripting_1.displayDescriptionAction("You notice wires on the ground."),
    scripting_1.addUserAction("Pick up the wires.", function () {
        scripting_1.displayActionEffectText("You pick up the wires.");
        scripting_1.setItemVariable(wires2, "currentLocation", "player");
        scripting_1.setVariable(wiresCollected, scripting_1.getVariable(wiresCollected) + 1);
    })
]));
scripting_1.addUserInteractionTree(wires2BT);
var addGoalToAgent = function (goal, agent, destination) {
    var newAgentTree = scripting_1.sequence([
        lastSeenByAgent(agent),
        scripting_1.sequence([
            searchForAgent(agent, destination), lastSeenByAgent(agent)
        ])
    ]);
    scripting_1.attachTreeToAgent(agent, newAgentTree);
};
var playerSeesAgent = function (agent) {
    var playerSeesAgent = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == agent.currentLocation; }, scripting_1.sequence([
        scripting_1.displayDescriptionAction("You see " + agent.name),
        scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 1; }, scripting_1.sequence([
            scripting_1.addUserAction("Tell " + agent.name + " to go fix the teleporter software.", function () { return addGoalToAgent("TRANSPORT_ROOM:Broken", agent, TRANSPORT_ROOM); }),
        ])),
        // Add this (1)
        scripting_1.guard(function () { return scripting_1.getVariable("ENGINE_ROOM:Broken") == 1; }, scripting_1.sequence([
            scripting_1.addUserAction("Tell " + agent.name + " to go fix the that other problem software.", function () { return addGoalToAgent("ENGINE_ROOM:Broken", agent, ENGINES); }),
        ])),
    ]));
    scripting_1.addUserInteractionTree(playerSeesAgent);
};
playerSeesAgent(Caleb);
playerSeesAgent(Quinn);
playerSeesAgent(Mark);
playerSeesAgent(Beatrice);
// //4. Run the world
scripting_1.initialize();
var userInteractionObject = scripting_1.getUserInteractionObject();
// //RENDERING-----
var displayPanel = { x: 250, y: 0 };
var textPanel = { x: 270, y: 501 };
var actionsPanel = { x: 520, y: 550 };
var canvas = document.getElementById('display');
var context = canvas.getContext('2d');
var spaceshipImage = new Image();
spaceshipImage.onload = render;
var playerImage = new Image();
var calebImage = new Image();
var quinnImage = new Image();
var markImage = new Image();
var eddieImage = new Image();
var beatriceImage = new Image();
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 1000, 500);
    displayPlayer();
    displayCaleb();
    displayQuinn();
    displayMark();
    displayEddie();
    displayBeatrice();
    displayTextAndActions();
}
var mapPositions = {
    "ENGINES": { x: 285, y: 108 },
    "COCKPIT": { x: 860, y: 230 },
    "STORAGE": { x: 550, y: 106 },
    "DOCTORS OFFICE": { x: 725, y: 350 },
    "MAIN AREA": { x: 480, y: 240 },
    "ESCAPE POD": { x: 224, y: 408 },
    "TRANSPORT ROOM": { x: 370, y: 358 },
    "MONITORING ROOM": { x: 535, y: 360 },
    "BATHROOM": { x: 85, y: 240 },
    "MALE BEDROOM": { x: 85, y: 330 },
    "FEM BEDROOM": { x: 85, y: 150 }
};
function displayPlayer() {
    var currLocation = scripting_1.getVariable(playerLocation);
    if (!util_1.isUndefined(mapPositions[currLocation]))
        context.drawImage(playerImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
function displayCaleb() {
    var currLocation = Caleb.currentLocation;
    context.drawImage(calebImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
function displayQuinn() {
    var currLocation = Quinn.currentLocation;
    context.drawImage(quinnImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
function displayMark() {
    var currLocation = Mark.currentLocation;
    context.drawImage(markImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
function displayEddie() {
    var currLocation = Eddie.currentLocation;
    context.drawImage(eddieImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
function displayBeatrice() {
    var currLocation = Beatrice.currentLocation;
    context.drawImage(beatriceImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
spaceshipImage.src = "../images/ship.png";
playerImage.src = "../images/Taylor3.png";
calebImage.src = "../images/Caleb.png";
quinnImage.src = "../images/Quinn.png";
markImage.src = "../images/Mark.png";
eddieImage.src = "../images/Eddie.png";
beatriceImage.src = "../images/Beatrice.png";
var currentSelection;
var yOffset = actionsPanel.y + 25;
var yOffsetIncrement = 25;
function wrapText(text) {
    console.log("Wrap Text");
    var wa = text.split(" "), phraseArray = [], lastPhrase = wa[0], measure = 0, splitChar = " ";
    if (wa.length <= 1) {
        return wa;
    }
    for (var i = 1; i < wa.length; i++) {
        var w = wa[i];
        measure = context.measureText(lastPhrase + splitChar + w).width;
        if (measure < 1000) {
            lastPhrase += (splitChar + w);
        }
        else {
            phraseArray.push(lastPhrase);
            lastPhrase = w;
        }
        if (i === wa.length - 1) {
            phraseArray.push(lastPhrase);
            break;
        }
    }
    return phraseArray;
}
function displayTextAndActions() {
    context.clearRect(textPanel.x, textPanel.y, 500, 1000);
    context.font = "15pt Calibri";
    context.fillStyle = 'pink';
    console.log("Actions effect text: " + userInteractionObject.actionEffectsText);
    var textToDisplay = userInteractionObject.actionEffectsText.length != 0 ? wrapText(userInteractionObject.actionEffectsText) : wrapText(userInteractionObject.text);
    // console.log(textToDisplay);
    actionsPanel.y = textToDisplay.length * 25 + textPanel.y + 20;
    yOffset = actionsPanel.y + 25;
    for (var i = 0; i < textToDisplay.length; i++) {
        context.fillText(textToDisplay[i], textPanel.x, textPanel.y + 25 * i + 20);
    }
    context.font = "15pt Calibri";
    context.fillStyle = 'white';
    for (var i = 0; i < userInteractionObject.userActionsText.length; i++) {
        var userActionText = userInteractionObject.userActionsText[i];
        context.fillText(userActionText, actionsPanel.x + 20, yOffset);
        if (i == 0) {
            currentSelection = i;
        }
        yOffset += yOffsetIncrement;
    }
    displayArrow();
    console.log("wires: " + scripting_1.getVariable(wiresCollected));
}
function displayArrow() {
    if (userInteractionObject.userActionsText.length != 0) {
        context.clearRect(actionsPanel.x, actionsPanel.y, 20, 1000);
        context.fillText("> ", 520, actionsPanel.y + 25 + (currentSelection * yOffsetIncrement));
    }
}
//User input
function keyPress(e) {
    if (e.keyCode == 13) {
        var selectedAction = userInteractionObject.userActionsText[currentSelection];
        if (!util_1.isUndefined(selectedAction)) {
            scripting_1.executeUserAction(selectedAction);
            scripting_1.worldTick();
            render();
        }
    }
}
function keyDown(e) {
    if (e.keyCode == 40) { //down
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection++;
            currentSelection = currentSelection % userInteractionObject.userActionsText.length;
            displayArrow();
        }
    }
    else if (e.keyCode == 38) { //up
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection--;
            if (currentSelection < 0)
                currentSelection = userInteractionObject.userActionsText.length - 1;
            displayArrow();
        }
    }
}
document.addEventListener("keypress", keyPress, false);
document.addEventListener("keydown", keyDown, false);

},{"./scripting":6,"typescript-collections/dist/lib/util":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue_1 = require("typescript-collections/dist/lib/Queue");
var util_1 = require("typescript-collections/dist/lib/util");
var Status;
(function (Status) {
    Status[Status["RUNNING"] = 0] = "RUNNING";
    Status[Status["SUCCESS"] = 1] = "SUCCESS";
    Status[Status["FAILURE"] = 2] = "FAILURE";
})(Status = exports.Status || (exports.Status = {}));
function terminateAndReturn(id, blackboard, status) {
    delete blackboard[id];
    return status;
}
var blackboard = {};
function getActionTick(id) {
    return function (precondition, effect, ticksRequired) {
        if (ticksRequired === void 0) { ticksRequired = 1; }
        return function () {
            if (precondition()) {
                if (!blackboard[id]) {
                    blackboard[id] = {};
                    blackboard[id].ticksDone = ticksRequired;
                }
                if (blackboard[id].ticksDone > 0) {
                    blackboard[id].ticksDone--;
                    return Status.RUNNING;
                }
                else {
                    effect();
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                }
            }
            else {
                return Status.FAILURE;
            }
        };
    };
}
function getGuardTick() {
    return function (precondition, astTick, negate) {
        if (negate === void 0) { negate = false; }
        return function () {
            var proceed = negate ? !precondition() : precondition();
            return proceed ? execute(astTick) : Status.FAILURE;
        };
    };
}
function getSequenceTick(id) {
    return function (astTicks) {
        return function () {
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }
            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex]);
                if (childStatus == Status.RUNNING)
                    return Status.RUNNING;
                else if (childStatus == Status.FAILURE)
                    return terminateAndReturn(id, blackboard, Status.FAILURE);
                else if (childStatus == Status.SUCCESS)
                    blackboard[id].currentIndex += 1;
            }
            return terminateAndReturn(id, blackboard, Status.SUCCESS);
        };
    };
}
function getSelectorTick(id) {
    return function (astTicks) {
        return function () {
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }
            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex]);
                if (childStatus == Status.RUNNING)
                    return Status.RUNNING;
                else if (childStatus == Status.SUCCESS)
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                else if (childStatus == Status.FAILURE)
                    blackboard[id].currentIndex += 1;
            }
            return terminateAndReturn(id, blackboard, Status.FAILURE);
        };
    };
}
function execute(astTick) {
    return astTick();
}
exports.execute = execute;
var globalIdCounter = 0;
function action(precondition, effect, ticksRequired) {
    return getActionTick(globalIdCounter++)(precondition, effect, ticksRequired);
}
exports.action = action;
function guard(precondition, astTick) {
    return getGuardTick()(precondition, astTick);
}
exports.guard = guard;
function neg_guard(precondition, astTick) {
    return getGuardTick()(precondition, astTick, true);
}
exports.neg_guard = neg_guard;
/**
 * Cycles over its children: iterates to the next child on success of a child
 * Succeeds if all succeed, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
function sequence(astTicks) {
    return getSequenceTick(globalIdCounter++)(astTicks);
}
exports.sequence = sequence;
/**
 * Cycles over its children: iterates to the next child on failure of a child(think of it as if-else blocks)
 * Succeeds if even one succeeds, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
function selector(astTicks) {
    return getSelectorTick(globalIdCounter++)(astTicks);
}
exports.selector = selector;
/*--------------- APIs --------------- */
//0. utilities
// min and max are inclusive
function getRandNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandNumber = getRandNumber;
//1. story instance
//1.1 locations
// var locationGraph: Dictionary<Location> = {};
var locationGraph = {};
// // 
// class Location {
//     adjacentLocations: Dictionary<Location[]>;
//     constructor(public name: string, adjacentLocations: string[]) {
//         this.name = name;
//         for (var i = 0; i < adjacentLocations.length; i++) {
//             if(adjacentLocations[i] in locationGraph){
//             }
//             else{
//                 var new_location = new Location()
//             }
//         }
//     }
// }
//add to both sides
function addLocation(locationName, adjacentLocations) {
    if (locationGraph[locationName] == undefined)
        locationGraph[locationName] = [];
    locationGraph[locationName] = locationGraph[locationName].concat(adjacentLocations);
    for (var i = 0; i < adjacentLocations.length; i++) {
        if (locationGraph[adjacentLocations[i]] == undefined)
            locationGraph[adjacentLocations[i]] = [];
        locationGraph[adjacentLocations[i]].push(locationName);
    }
}
exports.addLocation = addLocation;
function areAdjacent(location1, location2) {
    console.log("Are adjacent: " + location1 + ", " + location2);
    if (locationGraph[location1] == undefined || locationGraph[location2] == undefined) {
        console.log("Either one/both locations undefined");
        return false;
    }
    for (var i = 0; i < locationGraph[location1].length; i++) {
        if (locationGraph[location1][i] == location2) {
            return true;
        }
    }
    return false;
}
exports.areAdjacent = areAdjacent;
//pathfinding primitives
function getNextLocation(start, destination) {
    var visited = {};
    var previous = {};
    for (var key in locationGraph) {
        visited[key] = false;
    }
    visited[start] = true;
    var myQueue = new Queue_1.default();
    myQueue.enqueue(start);
    while (!myQueue.isEmpty()) {
        var current = myQueue.dequeue();
        if (current === destination) {
            break;
        }
        var neighbors = locationGraph[current];
        for (var i = 0; i < neighbors.length; i++) {
            if (!visited[neighbors[i]]) {
                myQueue.enqueue(neighbors[i]);
                visited[neighbors[i]] = true;
                previous[neighbors[i]] = current;
            }
        }
    }
    var current = destination;
    if (current == start)
        return current;
    while (previous[current] != start) {
        current = previous[current];
    }
    return current;
}
exports.getNextLocation = getNextLocation;
//1.2 agents
var Agent = /** @class */ (function () {
    function Agent(name) {
        this.name = name;
        // Specific to Maddie's game? Move to lib fn? 
        this.lastSeenItem = {};
        this.lastSeenPerson = {};
        this.randNumber = 0;
        this.name = name;
        console.log(this.name + " constructor");
    }
    Agent.prototype.setCurrentLocation = function (currentlocation) {
        this.currentLocation = currentlocation;
    };
    Agent.prototype.getNextLocation = function () {
        var _this = this;
        return action(function () { return true; }, function () {
            _this.currentLocation = getNextLocation(_this.currentLocation, _this.destination);
            console.log(_this.name, " at: ", _this.currentLocation);
        }, 0);
    };
    Agent.prototype.setDestination = function (destination) {
        this.destination = destination;
    };
    Agent.prototype.setBehaviorTree = function (behaviorTree) {
        this.currentBehaviorTree = behaviorTree;
    };
    // Seems specific to Maddie's game? Move to a lib function?
    Agent.prototype.setLastSawItemAtLocation = function (item, atLocation) {
        this.lastSeenItem[item.name] = atLocation;
    };
    Agent.prototype.setLastSawPersonAtLocation = function (agentName, atLocation) {
        this.lastSeenPerson[agentName] = atLocation;
    };
    Agent.prototype.hasSeenItem = function (item) {
        if (item.name in this.lastSeenItem) {
            console.log(this.name + ": saw item:" + item.name);
            return true; //this.lastSeenItem[item.name]
        }
        else {
            return false;
        }
    };
    Agent.prototype.whereIsItem = function (item) {
        if (item.name in this.lastSeenItem) {
            console.log(this.name + ": saw item:" + item.name + " at location:" + this.lastSeenItem[item.name]);
            return this.lastSeenItem[item.name];
        }
        else {
            return false;
        }
    };
    return Agent;
}());
exports.Agent = Agent;
var agents = new Array();
// var agents = [];
function addAgent(agentName) {
    // console.log("Adding: "+agentName);
    var agent = new Agent(agentName);
    console.log(agent);
    agents.push(agent);
    return agent;
}
exports.addAgent = addAgent;
//1.3 items
// Todo
var Item = /** @class */ (function () {
    function Item(name) {
        this.name = name;
        this.name = name;
    }
    Item.prototype.setCurrentLocation = function (currentlocation) {
        this.currentLocation = currentlocation;
    };
    return Item;
}());
var items = new Array();
// var items = [];
function addItem(itemName) {
    var item = new Item(itemName);
    items.push(item);
    return item;
}
exports.addItem = addItem;
//1.4 variables
var variables = {};
var agentVariables = {};
var itemVariables = {};
function setVariable(varName, value) {
    variables[varName] = value;
    return varName;
}
exports.setVariable = setVariable;
function setAgentVariable(agent, varName, value) {
    if (util_1.isUndefined(agentVariables[agent]))
        agentVariables[agent] = {};
    agentVariables[agent][varName] = value;
    return value;
}
exports.setAgentVariable = setAgentVariable;
function getVariable(varName) {
    if (util_1.isUndefined(variables[varName])) {
        console.log("Variable " + varName + " not set!");
        return;
    }
    return variables[varName];
}
exports.getVariable = getVariable;
function getAgentVariable(agent, varName) {
    if (util_1.isUndefined(agentVariables[agent]) || util_1.isUndefined(agentVariables[agent][varName])) {
        console.log("Variable " + varName + " for agent " + agent + " not set!");
        return;
    }
    return agentVariables[agent][varName];
}
exports.getAgentVariable = getAgentVariable;
function isVariableNotSet(varName) {
    return util_1.isUndefined(variables[varName]);
}
exports.isVariableNotSet = isVariableNotSet;
function isAgentVariableNotSet(agent, varName) {
    return util_1.isUndefined(agentVariables[agent]) || util_1.isUndefined(agentVariables[agent][varName]);
}
exports.isAgentVariableNotSet = isAgentVariableNotSet;
// todo
function setItemVariable(item, varName, value) {
    if (util_1.isUndefined(itemVariables[item.name]))
        itemVariables[item.name] = {};
    itemVariables[item.name][varName] = value;
    return value;
}
exports.setItemVariable = setItemVariable;
function getItemVariable(item, varName) {
    if (util_1.isUndefined(itemVariables[item]) || util_1.isUndefined(itemVariables[item][varName])) {
        console.log("Variable " + varName + " for item " + item + " not set!");
        return;
    }
    return itemVariables[item][varName];
}
exports.getItemVariable = getItemVariable;
//2
//agent-behavior tree mapping
var agentTrees = {};
// var agentTrees = {};
function attachTreeToAgent(agent, tree) {
    agentTrees[agent.name] = tree;
}
exports.attachTreeToAgent = attachTreeToAgent;
//3.1
//user actions
//TODO add variables to user action texts
var userInteractionObject = {
    text: "",
    userActionsText: [],
    actionEffectsText: ""
};
var userInteractionTrees = [];
var userActions = {};
function runUserInteractionTrees() {
    userInteractionObject.text = "";
    userInteractionObject.userActionsText = [];
    userActions = {}; //{"Go to location X" : effect
    for (var i = 0; i < userInteractionTrees.length; i++) {
        execute(userInteractionTrees[i]);
    }
}
exports.displayDescriptionAction = function (text) {
    return action(function () { return true; }, function () { return userInteractionObject.text += "\n" + text; }, 0);
};
exports.displayActionEffectText = function (text) { return userInteractionObject.actionEffectsText += "\n" + text; };
exports.addUserActionTree = function (text, effectTree) { return action(function () { return true; }, function () { return mapUserActionToTree(text, effectTree); }, 0); };
exports.addUserAction = function (text, effect) {
    return action(function () { return true; }, function () { return mapUserActionToTree(text, action(function () { return true; }, effect, 0)); }, 0);
};
//     return 
// }
function mapUserActionToTree(text, tree) {
    userActions[text] = tree;
    userInteractionObject.userActionsText.push(text);
}
function addUserInteractionTree(tick) {
    userInteractionTrees.push(tick);
}
exports.addUserInteractionTree = addUserInteractionTree;
function executeUserAction(text) {
    //execute the user action
    userInteractionObject.actionEffectsText = "";
    var userActionEffectTree = userActions[text];
    execute(userActionEffectTree);
}
exports.executeUserAction = executeUserAction;
//4.
function initialize() {
    runUserInteractionTrees();
}
exports.initialize = initialize;
function getUserInteractionObject() {
    return userInteractionObject;
}
exports.getUserInteractionObject = getUserInteractionObject;
function worldTick() {
    //all agent ticks
    for (var i = 0; i < agents.length; i++) {
        var tree = agentTrees[agents[i].name];
        if (!util_1.isUndefined(tree)) {
            setVariable("executingAgent", agents[i].name);
            execute(tree);
        }
    }
    runUserInteractionTrees();
}
exports.worldTick = worldTick;

},{"typescript-collections/dist/lib/Queue":2,"typescript-collections/dist/lib/util":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL21hZGRpZS50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFVO0lBQzdDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRkQsd0RBRUM7QUFFRCwyQkFBa0MsSUFBWTtJQUMxQyx5QkFBeUI7SUFDekIscUJBQXFCLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzdDLElBQUksb0JBQW9CLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFMRCw4Q0FLQztBQUVELElBQUk7QUFDSjtJQUNJLHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQUZELGdDQUVDO0FBRUQ7SUFDSSxPQUFPLHFCQUFxQixDQUFDO0FBQ2pDLENBQUM7QUFGRCw0REFFQztBQUVEO0lBQ0ksaUJBQWlCO0lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQVZELDhCQVVDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgYXJyYXlzID0gcmVxdWlyZShcIi4vYXJyYXlzXCIpO1xudmFyIExpbmtlZExpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgKiBDcmVhdGVzIGFuIGVtcHR5IExpbmtlZCBMaXN0LlxuICAgICogQGNsYXNzIEEgbGlua2VkIGxpc3QgaXMgYSBkYXRhIHN0cnVjdHVyZSBjb25zaXN0aW5nIG9mIGEgZ3JvdXAgb2Ygbm9kZXNcbiAgICAqIHdoaWNoIHRvZ2V0aGVyIHJlcHJlc2VudCBhIHNlcXVlbmNlLlxuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKi9cbiAgICBmdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xuICAgICAgICAvKipcbiAgICAgICAgKiBGaXJzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAqIExhc3Qgbm9kZSBpbiB0aGUgbGlzdFxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICogQHByaXZhdGVcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAqIE51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbGlzdFxuICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICogQHByaXZhdGVcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEFkZHMgYW4gZWxlbWVudCB0byB0aGlzIGxpc3QuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIGFkZGVkLlxuICAgICogQHBhcmFtIHtudW1iZXI9fSBpbmRleCBvcHRpb25hbCBpbmRleCB0byBhZGQgdGhlIGVsZW1lbnQuIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZFxuICAgICogdGhlIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGlzIGxpc3QuXG4gICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBhZGRlZCBvciBmYWxzZSBpZiB0aGUgaW5kZXggaXMgaW52YWxpZFxuICAgICogb3IgaWYgdGhlIGVsZW1lbnQgaXMgdW5kZWZpbmVkLlxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGluZGV4KSkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5FbGVtZW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5uRWxlbWVudHMgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdOb2RlID0gdGhpcy5jcmVhdGVOb2RlKGl0ZW0pO1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDAgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgLy8gSW5zZXJ0IGF0IHRoZSBlbmQuXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlLm5leHQgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIC8vIENoYW5nZSBmaXJzdCBub2RlLlxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSBwcmV2Lm5leHQ7XG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubkVsZW1lbnRzKys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xuICAgICogZW1wdHkuXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlyc3ROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICogQHJldHVybiB7Kn0gdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcbiAgICAqIGVtcHR5LlxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGRlc2lyZWQgaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXNcbiAgICAgKiBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCk7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlXG4gICAgICogc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoZSBMaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhpcyBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZVxuICAgICAqIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhpcyBsaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcbiAgICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgICAqXG4gICAgICAgKiA8cHJlPlxuICAgICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgICAqIH1cbiAgICAgICAqIDwvcHJlPlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcbiAgICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgZmFsc2VcbiAgICAgICAqIG90aGVyd2lzZS5cbiAgICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pbmRleE9mKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSByZW1vdmVkIGZyb20gdGhpcyBsaXN0LCBpZiBwcmVzZW50LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGxpc3QgY29udGFpbmVkIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA8IDEgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXG4gICAgICogQHBhcmFtIHtMaW5rZWRMaXN0fSBvdGhlciB0aGUgb3RoZXIgbGlzdC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xuICAgICAqIGFyZSBjdXN0b20gb2JqZWN0cyB5b3Ugc2hvdWxkIHByb3ZpZGUgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlXG4gICAgICogdGhlID09PSBvcGVyYXRvciBpcyB1c2VkIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIExpbmtlZExpc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlci5zaXplKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHNBdXgodGhpcy5maXJzdE5vZGUsIG90aGVyLmZpcnN0Tm9kZSwgZXFGKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFsc0F1eCA9IGZ1bmN0aW9uIChuMSwgbjIsIGVxRikge1xuICAgICAgICB3aGlsZSAobjEgIT09IG51bGwgJiYgbjIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghZXFGKG4xLmVsZW1lbnQsIG4yLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbjEgPSBuMS5uZXh0O1xuICAgICAgICAgICAgbjIgPSBuMi5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZ2l2ZW4gaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gcmVtb3ZlZCBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXMgb3V0IG9mIGJvdW5kcy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzIHx8IHRoaXMuZmlyc3ROb2RlID09PSBudWxsIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMSkge1xuICAgICAgICAgICAgLy9GaXJzdCBub2RlIGluIHRoZSBsaXN0LlxuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5maXJzdE5vZGUubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzLm5leHQgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gbnVsbCAmJiBwcmV2aW91cy5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHByZXZpb3VzLm5leHQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gcHJldmlvdXMubmV4dC5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubkVsZW1lbnRzLS07XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgbGlzdCBpbiBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soY3VycmVudE5vZGUuZWxlbWVudCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldmVyc2VzIHRoZSBvcmRlciBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaW5rZWQgbGlzdCAobWFrZXMgdGhlIGxhc3RcbiAgICAgKiBlbGVtZW50IGZpcnN0LCBhbmQgdGhlIGZpcnN0IGVsZW1lbnQgbGFzdCkuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xuICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGVtcCA9IGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IHByZXZpb3VzO1xuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xuICAgICAgICAgICAgY3VycmVudCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMubGFzdE5vZGU7XG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSB0ZW1wO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0IGluIHByb3BlclxuICAgICAqIHNlcXVlbmNlLlxuICAgICAqIEByZXR1cm4ge0FycmF5LjwqPn0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCxcbiAgICAgKiBpbiBwcm9wZXIgc2VxdWVuY2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goY3VycmVudE5vZGUuZWxlbWVudCk7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzIDw9IDA7XG4gICAgfTtcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5cy50b1N0cmluZyh0aGlzLnRvQXJyYXkoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLm5vZGVBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gKHRoaXMubkVsZW1lbnRzIC0gMSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgbm9kZSAhPSBudWxsOyBpKyspIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWxlbWVudDogaXRlbSxcbiAgICAgICAgICAgIG5leHQ6IG51bGxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5rZWRMaXN0O1xufSgpKTsgLy8gRW5kIG9mIGxpbmtlZCBsaXN0XG5leHBvcnRzLmRlZmF1bHQgPSBMaW5rZWRMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlua2VkTGlzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMaW5rZWRMaXN0XzEgPSByZXF1aXJlKFwiLi9MaW5rZWRMaXN0XCIpO1xudmFyIFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW1wdHkgcXVldWUuXG4gICAgICogQGNsYXNzIEEgcXVldWUgaXMgYSBGaXJzdC1Jbi1GaXJzdC1PdXQgKEZJRk8pIGRhdGEgc3RydWN0dXJlLCB0aGUgZmlyc3RcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBxdWV1ZSB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xuICAgICAqIGltcGxlbWVudGF0aW9uIHVzZXMgYSBsaW5rZWQgbGlzdCBhcyBhIGNvbnRhaW5lci5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBRdWV1ZSgpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpbmtlZExpc3RfMS5kZWZhdWx0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMubGlzdC5maXJzdCgpO1xuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZUVsZW1lbnRBdEluZGV4KDApO1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMsIGJ1dCBkb2VzIG5vdCByZW1vdmUsIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgc3RhY2sgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yLCBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsXG4gICAgICogZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChlbGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmNvbnRhaW5zKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpIDw9IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5saXN0LmNsZWFyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBxdWV1ZSBpblxuICAgICAqIEZJRk8gb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBRdWV1ZTtcbn0oKSk7IC8vIEVuZCBvZiBxdWV1ZVxuZXhwb3J0cy5kZWZhdWx0ID0gUXVldWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBpdGVtXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMDtcbn1cbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcbi8qKlxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBjaGFuZ2VkIGFmdGVyIHRoaXMgY2FsbC5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheSBlcXVhbFxuICogdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB3aG9zZSBmcmVxdWVuY3kgaXMgdG8gYmUgZGV0ZXJtaW5lZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKiBlcXVhbCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZnJlcXVlbmN5KGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgZnJlcSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgZnJlcSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmcmVxO1xufVxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIHNwZWNpZmllZCBhcnJheXMgYXJlIGVxdWFsIHRvIG9uZSBhbm90aGVyLlxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxuICogb2YgZWxlbWVudHMsIGFuZCBhbGwgY29ycmVzcG9uZGluZyBwYWlycyBvZiBlbGVtZW50cyBpbiB0aGUgdHdvXG4gKiBhcnJheXMgYXJlIGVxdWFsIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgdGhlIG90aGVyIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHR3byBhcnJheXMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5MS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWVxdWFscyhhcnJheTFbaV0sIGFycmF5MltpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuZXF1YWxzID0gZXF1YWxzO1xuLyoqXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSB0byBjb3B5LlxuICogQHJldHVybiB7QXJyYXl9IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKi9cbmZ1bmN0aW9uIGNvcHkoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KCk7XG59XG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuLyoqXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBzd2FwIGVsZW1lbnRzLlxuICogQHBhcmFtIHtudW1iZXJ9IGkgdGhlIGluZGV4IG9mIG9uZSBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGlzIGRlZmluZWQgYW5kIHRoZSBpbmRleGVzIGFyZSB2YWxpZC5cbiAqL1xuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xuICAgIGlmIChpIDwgMCB8fCBpID49IGFycmF5Lmxlbmd0aCB8fCBqIDwgMCB8fCBqID49IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0ZW1wID0gYXJyYXlbaV07XG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICBhcnJheVtqXSA9IHRlbXA7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnN3YXAgPSBzd2FwO1xuZnVuY3Rpb24gdG9TdHJpbmcoYXJyYXkpIHtcbiAgICByZXR1cm4gJ1snICsgYXJyYXkudG9TdHJpbmcoKSArICddJztcbn1cbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcbiAqIHN0YXJ0aW5nIGZyb20gaW5kZXggMCB0byBsZW5ndGggLSAxLlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIGl0ZXJhdGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGVsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5leHBvcnRzLmhhcyA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn07XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29tcGFyZSBlbGVtZW50IG9yZGVyLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlKGEsIGIpIHtcbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0Q29tcGFyZSA9IGRlZmF1bHRDb21wYXJlO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG59XG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICckcycgKyBpdGVtO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICckbycgKyBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0VG9TdHJpbmcgPSBkZWZhdWx0VG9TdHJpbmc7XG4vKipcbiogSm9pbnMgYWxsIHRoZSBwcm9wZXJpZXMgb2YgdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgam9pbiBzdHJpbmdcbiovXG5mdW5jdGlvbiBtYWtlU3RyaW5nKGl0ZW0sIGpvaW4pIHtcbiAgICBpZiAoam9pbiA9PT0gdm9pZCAwKSB7IGpvaW4gPSAnLCc7IH1cbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHRvcmV0ID0gJ3snO1xuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLmhhcyhpdGVtLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIGpvaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBwcm9wICsgJzonICsgaXRlbVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9yZXQgKyAnfSc7XG4gICAgfVxufVxuZXhwb3J0cy5tYWtlU3RyaW5nID0gbWFrZVN0cmluZztcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYykge1xuICAgIHJldHVybiAodHlwZW9mIGZ1bmMpID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyB1bmRlZmluZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqKSA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBzdHJpbmcuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcbi8qKlxuICogUmV2ZXJzZXMgYSBjb21wYXJlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHJldmVyc2VDb21wYXJlRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGNvbXBhcmVGdW5jdGlvbikgfHwgIWlzRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGQsIHYpICogLTE7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5yZXZlcnNlQ29tcGFyZUZ1bmN0aW9uID0gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbjtcbi8qKlxuICogUmV0dXJucyBhbiBlcXVhbCBmdW5jdGlvbiBnaXZlbiBhIGNvbXBhcmUgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gY29tcGFyZVRvRXF1YWxzKGNvbXBhcmVGdW5jdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGEsIGIpID09PSAwO1xuICAgIH07XG59XG5leHBvcnRzLmNvbXBhcmVUb0VxdWFscyA9IGNvbXBhcmVUb0VxdWFscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiLyogLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNjcmlwdGluZy50c1wiLz4gKi9cbmltcG9ydCB7XG5cdGFkZEFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxuXHRnZXRSYW5kTnVtYmVyLCBnZXRWYXJpYWJsZSwgc2VxdWVuY2UsIHNlbGVjdG9yLCBleGVjdXRlLCBQcmVjb25kaXRpb24sIGdldEFnZW50VmFyaWFibGUsIG5lZ19ndWFyZCwgZ3VhcmQsXG5cdGlzVmFyaWFibGVOb3RTZXQsIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiwgYWRkVXNlckFjdGlvbiwgYWRkVXNlckludGVyYWN0aW9uVHJlZSwgaW5pdGlhbGl6ZSxcblx0Z2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXG5cdGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0LCBhcmVBZGphY2VudCwgYWRkVXNlckFjdGlvblRyZWUsIEFnZW50XG59IGZyb20gXCIuL3NjcmlwdGluZ1wiO1xuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xuXG4vLyAxLiBEZWZpbmUgU3RhdGVcblxuLy8gTG9jYXRpb25zXG52YXIgU1RPUkFHRSA9IFwiU1RPUkFHRVwiO1xudmFyIERPQ1RPUlNfT0ZGSUNFID0gXCJET0NUT1JTIE9GRklDRVwiO1xudmFyIEVOR0lORVMgPSBcIkVOR0lORVNcIjtcbnZhciBDT0NLUElUID0gXCJDT0NLUElUXCI7XG52YXIgRVNDQVBFX1BPRCA9IFwiRVNDQVBFIFBPRFwiO1xudmFyIFRSQU5TUE9SVF9ST09NID0gXCJUUkFOU1BPUlQgUk9PTVwiO1xudmFyIE1PTklUT1JJTkdfUk9PTSA9IFwiTU9OSVRPUklORyBST09NXCI7XG52YXIgTUFJTl9BUkVBID0gXCJNQUlOIEFSRUFcIjtcbnZhciBGRU1fQkVEUk9PTSA9IFwiRkVNIEJFRFJPT01cIjtcbnZhciBNQUxFX0JFRFJPT00gPSBcIk1BTEUgQkVEUk9PTVwiO1xudmFyIEJBVEhST09NID0gXCJCQVRIUk9PTVwiO1xudmFyIFVOS05PV04gPSBcIlVOS05PV05cIjtcblxuLy8gQWRkIExvY2F0aW9uc1xuYWRkTG9jYXRpb24oRU5HSU5FUywgW1NUT1JBR0UsIE1BSU5fQVJFQV0pO1xuYWRkTG9jYXRpb24oU1RPUkFHRSwgW0VOR0lORVMsIERPQ1RPUlNfT0ZGSUNFXSk7XG5hZGRMb2NhdGlvbihET0NUT1JTX09GRklDRSwgW1NUT1JBR0UsIE1BSU5fQVJFQSwgQ09DS1BJVCwgTU9OSVRPUklOR19ST09NXSk7XG5hZGRMb2NhdGlvbihDT0NLUElULCBbRE9DVE9SU19PRkZJQ0VdKTtcbmFkZExvY2F0aW9uKEVTQ0FQRV9QT0QsIFtNQUlOX0FSRUFdKTtcbmFkZExvY2F0aW9uKFRSQU5TUE9SVF9ST09NLCBbTU9OSVRPUklOR19ST09NLCBNQUlOX0FSRUFdKTtcbmFkZExvY2F0aW9uKE1PTklUT1JJTkdfUk9PTSwgW1RSQU5TUE9SVF9ST09NLCBET0NUT1JTX09GRklDRV0pO1xuYWRkTG9jYXRpb24oTUFJTl9BUkVBLCBbRU5HSU5FUywgU1RPUkFHRSwgRE9DVE9SU19PRkZJQ0UsIFRSQU5TUE9SVF9ST09NLCBFU0NBUEVfUE9EXSk7XG5hZGRMb2NhdGlvbihGRU1fQkVEUk9PTSwgW01BSU5fQVJFQSwgQkFUSFJPT01dKTtcbmFkZExvY2F0aW9uKE1BTEVfQkVEUk9PTSwgW01BSU5fQVJFQSwgQkFUSFJPT01dKTtcbmFkZExvY2F0aW9uKEJBVEhST09NLCBbTUFJTl9BUkVBLCBGRU1fQkVEUk9PTSwgTUFMRV9CRURST09NXSk7XG5cbi8vIGFnZW50c1xudmFyIENhbGViID0gYWRkQWdlbnQoXCJDYWxlYlwiKTtcbnZhciBRdWlubiA9IGFkZEFnZW50KFwiUXVpbm5cIik7XG52YXIgTWFyayA9IGFkZEFnZW50KFwiTWFya1wiKTtcbnZhciBFZGRpZSA9IGFkZEFnZW50KFwiRWRkaWVcIik7XG52YXIgQmVhdHJpY2UgPSBhZGRBZ2VudChcIkJlYXRyaWNlXCIpO1xuXG4vLyBpdGVtc1xudmFyIHdpcmVzMSA9IGFkZEl0ZW0oXCJ3aXJlczFcIik7XG52YXIgd2lyZXMyID0gYWRkSXRlbShcIndpcmVzMlwiKTtcblxuXG53aXJlczEuc2V0Q3VycmVudExvY2F0aW9uKFNUT1JBR0UpO1xud2lyZXMyLnNldEN1cnJlbnRMb2NhdGlvbihNT05JVE9SSU5HX1JPT00pO1xuXG4vLyBzZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBTVE9SQUdFKTtcbi8vIHNldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIsIE1PTklUT1JJTkdfUk9PTSk7XG5cbi8vIHZhciB3aXJlc0NvbGxlY3RlZCA9IHNldFZhcmlhYmxlKFwid2lyZXNDb2xsZWN0ZWRcIiwgMCk7XG5cbi8vIC8vIHZhcmlhYmxlc1xuLy9DYWxlYlxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJjdXJyZW50TG9jYXRpb25cIiwgQ09DS1BJVCk7XG5DYWxlYi5zZXRDdXJyZW50TG9jYXRpb24oQ09DS1BJVCk7XG5cbi8vUXVpbm5cbi8vIHNldEFnZW50VmFyaWFibGUoUXVpbm4sIFwiY3VycmVudExvY2F0aW9uXCIsIERPQ1RPUlNfT0ZGSUNFKTtcblF1aW5uLnNldEN1cnJlbnRMb2NhdGlvbihET0NUT1JTX09GRklDRSk7XG5cbi8vTWFya1xuLy8gc2V0QWdlbnRWYXJpYWJsZShNYXJrLCBcImN1cnJlbnRMb2NhdGlvblwiLCBUUkFOU1BPUlRfUk9PTSk7XG5NYXJrLnNldEN1cnJlbnRMb2NhdGlvbihUUkFOU1BPUlRfUk9PTSk7XG5cbi8vRWRkaWVcbi8vIHNldEFnZW50VmFyaWFibGUoRWRkaWUsIFwiY3VycmVudExvY2F0aW9uXCIsIFNUT1JBR0UpO1xuRWRkaWUuc2V0Q3VycmVudExvY2F0aW9uKFNUT1JBR0UpO1xuXG4vL0JlYXRyaWNlXG4vLyBzZXRBZ2VudFZhcmlhYmxlKEJlYXRyaWNlLCBcImN1cnJlbnRMb2NhdGlvblwiLCBFTkdJTkVTKTtcbkJlYXRyaWNlLnNldEN1cnJlbnRMb2NhdGlvbihFTkdJTkVTKTtcblxuLy8gUGxheWVyXG52YXIgcGxheWVyTG9jYXRpb24gPSBzZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIsIE1BSU5fQVJFQSk7XG52YXIgd2lyZXNDb2xsZWN0ZWQgPSBzZXRWYXJpYWJsZShcIndpcmVzQ29sbGVjdGVkXCIsIDApO1xuXG5cbi8vIEtub3dsZWRnZSBcbkNhbGViLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xuUXVpbm4uc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XG5NYXJrLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xuRWRkaWUuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XG5CZWF0cmljZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcblxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJsYXN0U2Vlbjp3aXJlczFcIiwgVU5LTk9XTilcbi8vIHNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46d2lyZXMyXCIsIFVOS05PV04pXG4vLyBzZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImxhc3RTZWVuOnBsYXllclwiLCBVTktOT1dOKVxuXG5DYWxlYi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcbi8vIENhbGViLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5RdWlubi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcbi8vIFF1aW5uLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5NYXJrLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIFVOS05PV04pO1xuLy8gTWFyay5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xuRWRkaWUuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XG4vLyBFZGRpZS5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xuQmVhdHJpY2Uuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XG4vLyBCZWF0cmljZS5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xuXG5cbi8vIEdvYWxzIGZvciB0aGUgcGxheWVyXG5cbi8vIDA6IFVua25vd24vSW5pdGlhbCBTdGF0ZVxuLy8gMTogRm91bmQgb3V0IGFib3V0IEZhdWx0OjEuIE5ldyBHb2FsLiAob25seSBvY2N1cnMgaWYgc3RhdHVzPTApXG4vLyAyOiBGaXhlZCBGYXVsdDoxIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9MSlcbi8vIDM6IEZvdW5kIG91dCBhYm91dCBGYXVsdDoyLiBOZXcgR29hbCAob25seSBvY2N1cnMgaWYgc3RhdHVzPTIpXG4vLyA0OiBGaXhlZCBGYXVsdDoyIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9MykgXG4vLyBldGMuIGV0Yy5cbnZhciBnb2FsX2Jyb2tlbl90cmFuc3BvcnQgPSBzZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiLCAwKTtcdFx0Ly8gbWF4OjRcbnZhciBnb2FsX2Jyb2tlbl9lbmdpbmVzID0gc2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiLCAwKTtcbnZhciBnb2FsX2Jyb2tlbl9zdG9yYWdlID0gc2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiLCAwKTtcbnZhciBnb2FsX2Jyb2tlbl9jb2NrcGl0ID0gc2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiLCAwKTtcbnZhciBnb2FsX2Jyb2tlbl9tYWluID0gc2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIsIDApO1xudmFyIGdvYWxfYnJva2VuX2RyID0gc2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIsIDApO1xudmFyIGdvYWxfYnJva2VuX21vbml0b3JpbmcgPSBzZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIiwgMCk7XG52YXIgZ29hbF9icm9rZW5fZXNjYXBlID0gc2V0VmFyaWFibGUoXCJFU0NBUEVfUE9EOkJyb2tlblwiLCAwKTtcblxuLy8gLy8gMi4gRGVmaW5lIEJUc1xuLy8gLy8gY3JlYXRlIGdyb3VuZCBhY3Rpb25zXG5cbi8vIFRvZG8gZnJvbSBoZXJlXG4vLyBmdW5jdGlvbiBmdW5jdGlvbl9uYW1lKGFyZ3VtZW50KSB7XG4vLyBcdC8vIGJvZHkuLi5cbi8vIH1cblxuXG5mdW5jdGlvbiBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudDogQWdlbnQsIGRlc3RpbmF0aW9uOiBzdHJpbmcgPSBcIlVOS05PV05cIikge1xuXG5cdGlmKGRlc3RpbmF0aW9uID09IFwiVU5LTk9XTlwiKXtcblx0XHRsZXQgc2V0UmFuZE51bWJlciA9IGFjdGlvbihcblx0XHRcdCgpID0+IHRydWUsXG5cdFx0XHQoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID0gZ2V0UmFuZE51bWJlcigxLCAxMSksXG5cdFx0XHQwXG5cdFx0KTtcblxuXHRcdC8vIFNhc2hhIFRvZG86IFdvcmsgb24gdXNpbmcgdGhlIEFnZW50L0l0ZW0gdHlwZXMgZm9yIGRlc3RpbmF0aW9uc1xuXHRcdGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFTkdJTkVTLCAwKTtcblx0XHRsZXQgY2hvb3NlU1RPUkFHRSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDIsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gU1RPUkFHRSwgMCk7XG5cdFx0bGV0IGNob29zZURPQ1RPUlNfT0ZGSUNFID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBET0NUT1JTX09GRklDRSwgMCk7XG5cdFx0bGV0IGNob29zZUNPQ0tQSVQgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA0LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IENPQ0tQSVQsIDApO1xuXHRcdGxldCBjaG9vc2VFU0NBUEVfUE9EID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFU0NBUEVfUE9ELCAwKTtcblx0XHRsZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA2LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IFRSQU5TUE9SVF9ST09NLCAwKTtcblx0XHRsZXQgY2hvb3NlTU9OSVRPUklOR19ST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNT05JVE9SSU5HX1JPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNQUlOX0FSRUEgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA4LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BSU5fQVJFQSwgMCk7XG5cdFx0bGV0IGNob29zZUZFTV9CRURST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gOSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBGRU1fQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZU1BTEVfQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDEwLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZUJBVEhST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMTEsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQkFUSFJPT00sIDApO1xuXG5cdFx0bGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlcXVlbmNlKFtcblx0XHRcdHNldFJhbmROdW1iZXIsXG5cdFx0XHRzZWxlY3RvcihbXG5cdFx0XHRcdGNob29zZUVOR0lORVMsXG5cdFx0XHRcdGNob29zZUNPQ0tQSVQsXG5cdFx0XHRcdGNob29zZVNUT1JBR0UsXG5cdFx0XHRcdGNob29zZURPQ1RPUlNfT0ZGSUNFLFxuXHRcdFx0XHRjaG9vc2VCQVRIUk9PTSxcblx0XHRcdFx0Y2hvb3NlTUFMRV9CRURST09NLFxuXHRcdFx0XHRjaG9vc2VGRU1fQkVEUk9PTSxcblx0XHRcdFx0Y2hvb3NlTUFJTl9BUkVBLFxuXHRcdFx0XHRjaG9vc2VNT05JVE9SSU5HX1JPT00sXG5cdFx0XHRcdGNob29zZVRSQU5TUE9SVF9ST09NLFxuXHRcdFx0XHRjaG9vc2VFU0NBUEVfUE9EXG5cdFx0XHRdKVxuXHRcdF0pO1xuXHRcdHJldHVybiBzZXROZXh0RGVzdGluYXRpb247XG5cblx0fVxuXHRlbHNle1xuXHRcdHJldHVybiBzZXF1ZW5jZShbXG5cdFx0XHQvLyBsZXQgc2V0RGVzdGluYXRpb25QcmVjb25kOiBQcmVjb25kaXRpb24gPSAoKSA9PiBpc1VuZGVmaW5lZChhZ2VudC5kZXN0aW5hdGlvbikgfHwgYWdlbnQuZGVzdGluYXRpb24gPT0gYWdlbnQuY3VycmVudExvY2F0aW9uO1xuXHRcdF0pXG5cdFx0Ly8gbGV0IGNob29zZUVOR0lORVMgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRU5HSU5FUywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFTkdJTkVTLCAwKTtcblx0XHQvLyBsZXQgY2hvb3NlU1RPUkFHRSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBTVE9SQUdFLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IFNUT1JBR0UsIDApO1xuXHRcdC8vIGxldCBjaG9vc2VET0NUT1JTX09GRklDRSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBET0NUT1JTX09GRklDRSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBET0NUT1JTX09GRklDRSwgMCk7XG5cdFx0Ly8gbGV0IGNob29zZUNPQ0tQSVQgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gQ09DS1BJVCwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBDT0NLUElULCAwKTtcblx0XHQvLyBsZXQgY2hvb3NlRVNDQVBFX1BPRCA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBFU0NBUEVfUE9ELCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEVTQ0FQRV9QT0QsIDApO1xuXHRcdC8vIGxldCBjaG9vc2VUUkFOU1BPUlRfUk9PTSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBUUkFOU1BPUlRfUk9PTSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBUUkFOU1BPUlRfUk9PTSwgMCk7XG5cdFx0Ly8gbGV0IGNob29zZU1PTklUT1JJTkdfUk9PTSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBNT05JVE9SSU5HX1JPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gTU9OSVRPUklOR19ST09NLCAwKTtcblx0XHQvLyBsZXQgY2hvb3NlTUFJTl9BUkVBID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IE1BSU5fQVJFQSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNQUlOX0FSRUEsIDApO1xuXHRcdC8vIGxldCBjaG9vc2VGRU1fQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBGRU1fQkVEUk9PTSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBGRU1fQkVEUk9PTSwgMCk7XG5cdFx0Ly8gbGV0IGNob29zZU1BTEVfQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBNQUxFX0JFRFJPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gTUFMRV9CRURST09NLCAwKTtcblx0XHQvLyBsZXQgY2hvb3NlQkFUSFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gQkFUSFJPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQkFUSFJPT00sIDApO1xuXG5cblx0XHQvLyBsZXQgc2V0TmV4dERlc3RpbmF0aW9uID0gc2VsZWN0b3IoW1xuXHRcdC8vIFx0Y2hvb3NlRU5HSU5FUyxcblx0XHQvLyBcdGNob29zZUNPQ0tQSVQsXG5cdFx0Ly8gXHRjaG9vc2VTVE9SQUdFLFxuXHRcdC8vIFx0Y2hvb3NlRE9DVE9SU19PRkZJQ0UsXG5cdFx0Ly8gXHRjaG9vc2VCQVRIUk9PTSxcblx0XHQvLyBcdGNob29zZU1BTEVfQkVEUk9PTSxcblx0XHQvLyBcdGNob29zZUZFTV9CRURST09NLFxuXHRcdC8vIFx0Y2hvb3NlTUFJTl9BUkVBLFxuXHRcdC8vIFx0Y2hvb3NlTU9OSVRPUklOR19ST09NLFxuXHRcdC8vIFx0Y2hvb3NlVFJBTlNQT1JUX1JPT00sXG5cdFx0Ly8gXHRjaG9vc2VFU0NBUEVfUE9EXG5cdFx0Ly8gXSk7XG5cblx0XHQvLyByZXR1cm4gc2V0TmV4dERlc3RpbmF0aW9uO1xuXHR9XG5cbn1cblxuXG5sZXQgc2V0RGVzdGluYXRpb25QcmVjb25kRm9yQWdlbnQgPSBmdW5jdGlvbihhZ2VudDogQWdlbnQpe1xuXHRsZXQgc2V0RGVzdGluYXRpb25QcmVjb25kOiBQcmVjb25kaXRpb24gPSAoKSA9PiBpc1VuZGVmaW5lZChhZ2VudC5kZXN0aW5hdGlvbikgfHwgYWdlbnQuZGVzdGluYXRpb24gPT0gYWdlbnQuY3VycmVudExvY2F0aW9uO1xuXHRyZXR1cm4gc2V0RGVzdGluYXRpb25QcmVjb25kO1x0XG59XG5cbi8vIC8vIGNyZWF0ZSBiZWhhdmlvciB0cmVlc1xuXG5cbi8vIGxldCBnb3RvTmV4dExvY2F0aW9uRm9yQWdlbnQgPSBmdW5jdGlvbihhZ2VudDogQWdlbnQpe1xuLy8gXHRyZXR1cm4gYWdlbnQuZ2V0TmV4dExvY2F0aW9uKClcblxuLy8gXHQvLyByZXR1cm4gIGFjdGlvbihcbi8vIFx0Ly8gXHQoKSA9PiB0cnVlLFxuLy8gXHQvLyBcdCgpID0+IHtcbi8vIFx0Ly8gXHRcdGFnZW50LmN1cnJlbnRMb2NhdGlvbiA9IGdldE5leHRMb2NhdGlvbihhZ2VudC5jdXJyZW50TG9jYXRpb24sIGFnZW50LmRlc3RpbmF0aW9uKTtcbi8vIFx0Ly8gXHRcdGNvbnNvbGUubG9nKGFnZW50LCBcIiBhdDogXCIsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG4vLyBcdC8vIFx0fSxcbi8vIFx0Ly8gXHQwXG4vLyBcdC8vICk7XG4vLyB9XG5cblxubGV0IGxhc3RTZWVuQnlBZ2VudCA9IGZ1bmN0aW9uKGFnZW50KXtcblx0cmV0dXJuIHNlcXVlbmNlKFtcblx0XHRzZWxlY3RvcihbXG5cdFx0XHRhY3Rpb24oXG5cdFx0XHRcdFx0Ly9wcmVjb25kaXRpb25cblx0XHRcdFx0XHQoKSA9PiBhZ2VudC5jdXJyZW50TG9jYXRpb24gPT0gd2lyZXMxLmN1cnJlbnRMb2NhdGlvbixcblx0XHRcdFx0XHQvLyAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50LCAnY3VycmVudExvY2F0aW9uJykgPT0gZ2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIiksXG5cdFx0XHRcdFx0Ly9lZmZlY3Rcblx0XHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhhZ2VudCArIFwiIHNlZXMgLSBJdGVtOiB3aXJlczEgfCBMb2NhdGlvbjogXCIrIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhhZ2VudE5hbWUgKyBcIiBzZWVzIC0gSXRlbTogd2lyZXMxIHwgTG9jYXRpb246IFwiKyBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcblx0XHRcdFx0XHRcdC8vIHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImxhc3RTZWVuOndpcmVzMVwiLCAgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSlcblx0XHRcdFx0XHRcdGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvL3RpbWUgdGFrZW5cblx0XHRcdFx0XHQwXG5cdFx0XHRcdCksXG5cdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge30sMClcblx0XHRdKSxcblx0XHRzZWxlY3RvcihbXG5cdFx0XHRhY3Rpb24oXG5cdFx0XHRcdFx0Ly9wcmVjb25kaXRpb25cblx0XHRcdFx0XHQoKSA9PiBhZ2VudC5jdXJyZW50TG9jYXRpb24gPT0gd2lyZXMyLmN1cnJlbnRMb2NhdGlvbixcblx0XHRcdFx0XHQvLyAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuXHRcdFx0XHRcdC8vZWZmZWN0XG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gSXRlbTogd2lyZXMyIHwgTG9jYXRpb246IFwiKyBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coYWdlbnROYW1lICsgXCJzZWVzIC0gSXRlbTogd2lyZXMyIHwgTG9jYXRpb246IFwiK2dldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpO1xuXHRcdFx0XHRcdFx0YWdlbnQuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdC8vIHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImxhc3RTZWVuOndpcmVzMlwiLCAgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vdGltZSB0YWtlblxuXHRcdFx0XHRcdDBcblx0XHRcdFx0KSxcblx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7fSwwKVxuXHRcdF0pLFxuXHRcdHNlbGVjdG9yKFtcblx0XHRcdGFjdGlvbihcblx0XHRcdFx0XHQvL3ByZWNvbmRpdGlvblxuXHRcdFx0XHRcdCgpID0+IGFnZW50LmN1cnJlbnRMb2NhdGlvbiAgPT0gZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSxcblx0XHRcdFx0XHQvLyAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIiksXG5cdFx0XHRcdFx0Ly9lZmZlY3Rcblx0XHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhhZ2VudCArIFwiIHNlZXMgLSBQZXJzb246IFBsYXllciB8IExvY2F0aW9uOiBcIisgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwic2VlcyAtIFBlcnNvbjogUGxheWVyIHwgTG9jYXRpb246IFwiK2dldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpO1xuXHRcdFx0XHRcdFx0Ly8gYWdlbnQuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdGFnZW50LnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKCdwbGF5ZXInLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdFx0XHRcdFx0Ly8gc2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsIFwibGFzdFNlZW46cGxheWVyXCIsICBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXG5cdFx0XHRcdFx0MFxuXHRcdFx0XHQpLFxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXG5cdFx0XSlcblx0XSk7XG59O1xuXG5cbi8vIFRvZG86IEhhcyB0byBiZSBhIGJldHRlciB3YXkgdG8gcmV0dXJuIGEgYmVoYXZpb3VyIHRyZWUgdG8gZ28gdG8gdGhlIG5leHQgZGVzdGluYXRpb24gZm9yIGFuIGFnZW50LiBcbi8vIFRvZG86IE1vdmUgdG8gc2NyaXB0aW5nIHVuZGVyIEFnZW50IGluc3RlYWQuIFxuXG5sZXQgc2VhcmNoRm9yQWdlbnQgPSBmdW5jdGlvbihhZ2VudDogQWdlbnQsIGRlc3RpbmF0aW9uOiBzdHJpbmcgPSBcIlVOS05PV05cIil7XG5cdGlmKGRlc3RpbmF0aW9uID09IFwiVU5LTk9XTlwiKXtcblx0XHRsZXQgc2VhcmNoID0gc2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuXHRcdFx0XHRndWFyZChzZXREZXN0aW5hdGlvblByZWNvbmRGb3JBZ2VudChhZ2VudCksIHNldE5leHREZXN0aW5hdGlvbkZvckFnZW50KGFnZW50KSksXG5cdFx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XG5cdFx0XHRcdH0sMClcblx0XHRcdF0pLFxuXHRcdFx0YWdlbnQuZ2V0TmV4dExvY2F0aW9uKClcblx0XHRcdC8vIGdvdG9OZXh0TG9jYXRpb25Gb3JBZ2VudChhZ2VudCksXG5cdFx0XSk7XHRcblx0XHRyZXR1cm4gc2VhcmNoXG5cdH1cblx0ZWxzZXtcblx0XHRsZXQgc2VhcmNoID0gc2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuXHRcdFx0XHRndWFyZChzZXREZXN0aW5hdGlvblByZWNvbmRGb3JBZ2VudChhZ2VudCksIHNldE5leHREZXN0aW5hdGlvbkZvckFnZW50KGFnZW50LCBkZXN0aW5hdGlvbikpLFxuXHRcdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge1xuXHRcdFx0XHR9LDApXG5cdFx0XHRdKSxcblx0XHRcdGFnZW50LmdldE5leHRMb2NhdGlvbigpXG5cdFx0XHQvLyBnb3RvTmV4dExvY2F0aW9uRm9yQWdlbnQoYWdlbnQpLFxuXHRcdF0pO1x0XG5cdFx0cmV0dXJuIHNlYXJjaFxuXHR9XG59XG5cbmxldCBDYWxlYkJUID0gc2VxdWVuY2UoW1xuXHRsYXN0U2VlbkJ5QWdlbnQoQ2FsZWIpLFxuXHRzZXF1ZW5jZShbXG5cdFx0c2VhcmNoRm9yQWdlbnQoQ2FsZWIpLCBsYXN0U2VlbkJ5QWdlbnQoQ2FsZWIpXG5cdF0pXG5dKTtcblxubGV0IFF1aW5uQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlBZ2VudChRdWlubiksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChRdWlubiksIGxhc3RTZWVuQnlBZ2VudChRdWlubilcblx0XSlcbl0pO1xuXG5sZXQgTWFya0JUID0gc2VxdWVuY2UoW1xuXHRsYXN0U2VlbkJ5QWdlbnQoTWFyayksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChNYXJrKSwgbGFzdFNlZW5CeUFnZW50KE1hcmspXG5cdF0pXG5dKTtcblxubGV0IEVkZGllQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlBZ2VudChFZGRpZSksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChFZGRpZSksIGxhc3RTZWVuQnlBZ2VudChFZGRpZSlcblx0XSlcbl0pO1xuXG5sZXQgQmVhdHJpY2VCVCA9IHNlcXVlbmNlKFtcblx0bGFzdFNlZW5CeUFnZW50KEJlYXRyaWNlKSxcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaEZvckFnZW50KEJlYXRyaWNlKSwgbGFzdFNlZW5CeUFnZW50KEJlYXRyaWNlKVxuXHRdKVxuXSk7XG5cbi8vIC8vYXR0YWNoIGJlaGF2aW91ciB0cmVlcyB0byBhZ2VudHNcbmF0dGFjaFRyZWVUb0FnZW50KENhbGViLCBDYWxlYkJUKTtcbmF0dGFjaFRyZWVUb0FnZW50KFF1aW5uLCBRdWlubkJUKTtcbmF0dGFjaFRyZWVUb0FnZW50KE1hcmssIE1hcmtCVCk7XG5hdHRhY2hUcmVlVG9BZ2VudChFZGRpZSwgRWRkaWVCVCk7XG5hdHRhY2hUcmVlVG9BZ2VudChCZWF0cmljZSwgQmVhdHJpY2VCVCk7XG5cbi8vIC8vIDMuIENvbnN0cnVjdCBzdG9yeVxuLy8gLy8gY3JlYXRlIHVzZXIgYWN0aW9uc1xuXG5cbnNldFZhcmlhYmxlKFwidGhlU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiU3RvcmFnZVN0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiQ29ja3BpdFN0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIk1vbml0b3JpbmdTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiLDApO1xuXG5cbnZhciBNYWluQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTUFJTl9BUkVBLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgc2hpcCdzIG1haW4gYXJlYS5cIiksXG4gICAgICAgICAgICBzZWxlY3RvcihbXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJJdCB3YXMgYSBzaW1wbGUgbWlzc2lvbjogbGFuZCBvbiB0aGUgbmV3bHktZGlzY292ZXJlZCBwbGFuZXQgU2lndXJvbiwgdGVsZXBvcnQgY3JldyBtZW1iZXJzIGRvd24gdG8gaXRzIHN1cmZhY2UsIGFuZCBzZWN1cmUgYW5kIGRvY3VtZW50IG5ldyBpbmZvcm1hdGlvbi4gRXZlcnl0aGluZyB3ZW50IGF3cnkgZHVyaW5nIHBoYXNlIHR3by4gQXMgbW9zdCBvZiB0aGUgY3JldyBnYXRoZXJlZCBpbnRvIHRoZSB0cmFuc3BvcnQgYmF5LCB0aGUgY29tbWFuZGVyIGFuZCBhIGZldyBvdGhlcnMgc3RheWVkIGJlaGluZCB0byBtb25pdG9yIHRoZSBleHBsb3JhdGlvbi4gVGhlIHRlbGVwb3J0YXRpb24gcHJvY2VzcyBiZWdhbiwgeWV0IGltbWVkaWF0ZWx5IGEgbWFzc2l2ZSBzeXN0ZW1zIGZhaWx1cmUgb2NjdXJyZWQuIFRob3NlIHdobyBoYWQgYmVlbiBhd2FpdGluZyB0ZWxlcG9ydGF0aW9uIHdlcmUgZ29uZSwgYXNzdW1lZCB0byBoYXZlIGJlZW4gbG9zdCBpbiBzcGFjZS4gVGhlIGNvbW1hbmRlciBjb21lcyB0byBhcyB0aGUgc2hpcCBpcyBwbHVtbWV0aW5nIGZyb20gb3JiaXQsIHRoZWlyIGNyZXdtYXRlcyB5ZWxsaW5nIGF0IGVhY2ggb3RoZXIuIFRoZXJlIGlzIG9ubHkgb25lIGVzY2FwZSBwb2QgcmVtYWluaW5nLiBBcyBjb21tYW5kZXIsIHlvdSBhcmUgZXF1aXBwZWQgd2l0aCBhIHNwZWNpYWwgaW50ZXJhY3RpdmUgbWFwIGFsbG93aW5nIHlvdSB0byBzZWUgdGhlIHBvc2l0aW9ucyBvZiB5b3VyIGNyZXdtYXRlcyBhdCBhbGwgdGltZXMuIFlvdSBtdXN0IHV0aWxpemUgdGhlIG1hcCBpbiBvcmRlciB0byB0YWtlIGNvbnRyb2wgb2YgdGhlIHNoaXAgYW5kIHJlbWFpbmluZyBjcmV3IHRvIHNhdmUgZXZlcnlvbmUgZnJvbSBjZXJ0YWluIGRlYXRoLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9tYWluKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwidGhlU3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBzaGlwJ3MgbWFpbiBhcmVhLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJHbyBub3J0aCB0byBlbnRlciB0aGUgZW5naW5lIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFTkdJTkVTKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gbm9ydGhlYXN0IHRvIGVudGVyIHRoZSBzdG9yYWdlIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBTVE9SQUdFKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gZWFzdCB0byBlbnRlciB0aGUgY29ja3BpdC5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIENPQ0tQSVQpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBzb3V0aGVhc3QgdG8gZW50ZXIgdGhlIGRvY3RvcidzIG9mZmljZS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIERPQ1RPUlNfT0ZGSUNFKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGggaW50byB0aGUgbW9uaXRvcmluZyByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTU9OSVRPUklOR19ST09NKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGggaW50byB0aGUgdHJhbnNwb3J0IHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUUkFOU1BPUlRfUk9PTSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHNvdXRod2VzdCB0byBlbnRlciB0aGUgZXNjYXBlIHBvZC5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEVTQ0FQRV9QT0QpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyB3ZXN0IHRvIGVudGVyIHRoZSBiYXRocm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJBVEhST09NKSksXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcbiAgICAgICAgICAgICAgIFx0XHRcdHNlbGVjdG9yKFtcblx0XHRcdCAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIpID09IDAsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkl0IGhhcyBiZWVuIGhvdXJzIHNpbmNlIHRoZSBjcmV3IGxhc3QgYXRlLiBUaGUgcmVzaWRlbnQgc2hpcCBtb20gY291bGQgaGVscCBwcmVwYXJlIHNvbWUgZm9vZC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9Pntcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIsIDEpO1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSA9PSAxLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gcHJlcGFyZSBmb29kIGZvciB0aGUgY3Jldy5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIikgPT0gMixcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGNyZXcgd2FzIGFibGUgdG8gZWF0LCBidXQgdGhlIGtpdGNoZW4gd2FzIGxlZnQgYSBtZXNzLiBTb21lb25lIG5lZWRzIHRvIGNsZWFuIGl0LlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSA9PSAzLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gY2xlYW4gdGhlIGtpdGNoZW4uXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICBdKSwgICAgXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoTWFpbkJUKTtcblxudmFyIEVuZ2luZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEVOR0lORVMsXG5cdHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVuZ2luZVN0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBlbmdpbmUgcm9vbSBpcyB3aGVyZSBCZWF0cmljZSBzcGVuZHMgbW9zdCBvZiBoZXIgdGltZS4gU2hl4oCZcyBhIG5hdHVyYWwgd2hlbiBpdCBjb21lcyB0byBwcm9ibGVtIHNvbHZpbmcsIGJ1dCBoZXIgdW5hcHByb2FjaGFibGUgYW5kIHVuZnJpZW5kbHkgcGVyc29uYWxpdHkgdHVybmVkIG1hbnkgaW5mbHVlbnRpYWwgY29tbWFuZGVycyBhd2F5IGZyb20gaGVyLiBEZXNwaXRlIGhlciBwZXJzb25hbGl0eSwgaGVyIGVuZ2luZWVyaW5nIHNraWxscyBhcmUgc2Vjb25kLXRvLW5vbmUuLi5ncmFudGVkIHNoZSBpcyB0aGUgb25seSBlbmdpbmVlciBsZWZ0LlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJFbmdpbmVTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9lbmdpbmVzKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFbmdpbmVTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZW5naW5lIHJvb20uXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkhlYWQgZWFzdCBpbnRvIHRoZSBzdG9yYWdlIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBTVE9SQUdFKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuICAgICAgICAgICAgICAgXHRcdFx0c2VsZWN0b3IoW1xuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDAsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkluIG9yZGVyIHRvIGZpeCB0aGUgZW5naW5lcywgcmVwbGFjZW1lbnQgd2lyZXMgbXVzdCBiZSBmb3VuZC4gQW4gZW5naW5lZXIgb3IgamFuaXRvciBzaG91bGQga25vdyB3aGVyZSB0aGV5IGFyZS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9Pntcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiLCAxKTtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDEsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgcmVwbGFjZW1lbnQgd2lyZXMuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgd2lyZXMgd2VyZSBmb3VuZCwgYnV0IHRoZSB0b29sIGJveCBzZWVtcyB0byBiZSBtaXNzaW5nLiBDYWxlYiBtaWdodCBoYXZlIHRha2VuIGl0LlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDMsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkJlZm9yZSB0aGUgZW5naW5lcyBjYW4gYmUgZml4ZWQsIHlvdSBuZWVkIHRvIGZpbmQgYSB0b29sIGJveC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSA0LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJXaXRoIGJveCBhY3F1aXJlZCwgdGhlIHdpcmVzIGNhbiBub3cgYmUgcmVwbGFjZWQuIEFuIGVuZ2luZWVyIHNob3VsZCBrbm93IGhvdyB0byBkbyBpdC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSA1LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBoYXZlIHRoZSB3aXJlcyByZXBsYWNlZCBpbiB0aGUgZW5naW5lIHJvb20uXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gNixcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGVuZ2luZSdzIG5vdyBmaXhlZCwgYnV0IGl0IHN0aWxsIG5lZWRzIHRvIGJlIHJlc3RhcnRlZC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSA3LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gcmVzdGFydCB0aGUgdGVsZXBvcnRlci5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgIF0pLCAgICBcbiAgICAgICAgICAgICAgIFx0Ly9PcHRpb25hbFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEVuZ2luZUJUKTtcblxudmFyIFN0b3JhZ2VCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBTVE9SQUdFLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRzZWxlY3RvcihbXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTdG9yYWdlU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHN0b3JhZ2Ugcm9vbSBpcyB3aGVyZSBFZGRpZSBzcGVuZHMgaGlzIHRpbWUgYW5kIHN0b3JlcyBoaXMgamFuaXRvciBlcXVpcG1lbnQuIE9sZCBhcyBoZSBpcywgaGUgc3RpbGwgZG9lcyBoaXMgYmVzdCB0byBjb250cmlidXRlIHRvIHRoZSB0ZWFtIGluIHdoYXRldmVyIHdheSBoZSBjYW4sIGRlc3BpdGUgbGFja2luZyB0ZWNobmljYWwgc2tpbGxzIHRoZSBvdGhlciBjcmV3bWF0ZXMgZW1wbG95LiBBbHRob3VnaCBoZSBpcyBhIHdlbGwta25vd24gaGVybyBhbW9uZyBtaWxpdGFyeSBwZXJzb25uZWwsIGhpcyBjcmV3bWF0ZXMgY29udGludWUgdG8gcmVtYWluIG9ibGl2aW91cyB0byB0aGUgZmFjdCB0aGF0IHRoZSBtYW4gd2hvIHNjcnVicyB0aGVpciB0b2lsZXRzIGhhZCBiZWVuIG9uZSBvZiB0aGUgbW9zdCBhY2NvbXBsaXNoZWQgbWlsaXRhcnkgb2ZmaWNlcnMgdGhlIHVuaXZlcnNlIGhhZCBldmVyIHNlZW4uXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHsgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJTdG9yYWdlU3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fc3RvcmFnZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU3RvcmFnZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmVkIGludG8gdGhlIHN0b3JhZ2Ugcm9vbS5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSB3ZXN0IGludG8gdGhlIGVuZ2luZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRU5HSU5FUykpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcbiAgICAgICAgICAgICAgIFx0c2VsZWN0b3IoW1xuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpID09IDAsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBzdG9yYWdlIHJvb20gaXMgYSBtZXNzLiBBIGphbml0b3Igd291bGQgYmUgYWJsZSB0byBtYWtlIHNlbnNlIG9mIGl0IGFsbC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9Pntcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiLCAxKTtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpID09IDEsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkZpbmQgc29tZW9uZSB0byByZW9yZ2FuaXplIHRoZSBzdG9yYWdlIHJvb20uXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJOb3cgdGhhdCB0aGUgc3RvcmFnZSByb29tIGlzIGNsZWFuLCB0aGUgcmVwbGFjZW1lbnQgd2lyZXMgY2FuIGJ5IGZvdW5kLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIikgPT0gMyxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiRmluZCBzb21lb25lIHRvIHJldHJpZXZlIHRoZSB3aXJlcy5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgIF0pLCAgICBcblxuICAgICAgICAgICAgICAgXHQvL09wdGlvbmFsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoU3RvcmFnZUJUKTtcblxudmFyIERyT2ZmaWNlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRE9DVE9SU19PRkZJQ0UsXG5cdHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiRHIuIFF1aW5uIHNwZW5kcyBhIGxvdCBvZiB0aW1lIGluIGhlciBvZmZpY2UgbG9va2luZyBhZnRlciBwYXRpZW50cy4gU2hlIHB1dHMgYWxsIG90aGVycyBhYm92ZSBoZXJzZWxmOyBzaGUgaXMgY29uc3RhbnRseSBjb25jZXJuZWQgd2l0aCB0aGUgd2VsbC1iZWluZyBvZiBoZXIgY3Jld21hdGVzLiBUaGUgcHJvc3BlY3Qgb2YgaGVyIHBhdGllbnRzIGR5aW5nIHN0aWxsIGtlZXBzIGhlciB1cCBhdCBuaWdodCwgYnV0IGhlciBkZXRlcm1pbmF0aW9uIHRvIHNhdmUgYXMgbWFueSBwZW9wbGUgYXMgc2hlIGNhbiBpcyB3aGF0IGtlZXBzIGhlciBnb2luZy4gSGVyIG1hdGVybmFsIGluc3RpbmN0cyBmb2xsb3cgaGVyIGZyb20gaGVyIGhvdXNlIHRvIHRoZSBzaGlwLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJEck9mZmljZVN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX2RyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIkRSX09GRklDRTpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRHJPZmZpY2VTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIG5vcnRoZWFzdCBpbnRvIHRoZSBjb2NrcGl0LlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQ09DS1BJVCkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHdlc3QgaW50byB0aGUgbW9uaXRvcmluZyByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTU9OSVRPUklOR19ST09NKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuICAgICAgICAgICAgICAgXHRcdFx0c2VsZWN0b3IoW1xuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkRSX09GRklDRTpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZSBjcmV3bWF0ZXMgbWF5IGhhdmUgc3VzdGFpbmVkIGluanVyaWVzLiBGaW5kIHRoZSBkb2N0b3IuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiLCAxKTtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkRSX09GRklDRTpCcm9rZW5cIikgPT0gMSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiRmluZCBzb21lb25lIHRvIGNoZWNrIHRoZSBjcmV3J3MgaGVhbHRoLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21lIG1pbm9yIGluanVyaWVzIHdlcmUgc3VzdGFpbmVkLiBGaW5kIHRoZSBkb2N0b3IgdG8gaGVhbCB0aGUgY3JldydzIGluanVyaWVzLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAzLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gaGVhbCB0aGUgY3JldydzIGluanVyaWVzLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICBdKSwgICAgICAgIFxuXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoRHJPZmZpY2VCVCk7XG5cbnZhciBDb2NrcGl0QlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQ09DS1BJVCxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ29ja3BpdFN0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBjb2NrcGl0IGlzIHdoZXJlIFRheWxvciBwaWxvdHMgdGhlIHNoaXAsIGJ1dCBDYWxlYiBzcGVuZHMgYSBsb3Qgb2YgaGlzIHRpbWUgdGhlcmUgYXMgd2VsbC4gQ2FsZWIgcnVucyB0aGluZ3MgdmVyeSBkaWZmZXJlbnRseSBmcm9tIFRheWxvcjsgaGUgaXMgYSBkZW1hbmRpbmcgbGVhZGVyIHdobyBoYXJzaGx5IGNyaXRpY2l6ZXMgaGlzIGNyZXdtYXRlcyB3aGVuIGZhaWx1cmVzIG9jY3VyLiBIZSBzZWNyZXRseSBsb2F0aGVzIFRheWxvcjsgdGhlaXIgcGVyc29uYWxpdGllcyBjbGFzaCBhbGwtdG9vLWZyZXF1ZW50bHksIGFuZCB0aGVpciBwb3NpdGlvbiBvbiB0aGUgc2hpcCBkZXNwaXRlIGhpcyBvbGRlciBhZ2UgaXMgYSBjb25zdGFudCBzb3VyY2Ugb2YgYW5nZXIgdG8gdGhlIG9mZmljZXIuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkNvY2twaXRTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9jb2NrcGl0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDb2NrcGl0U3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGludG8gdGhlIGNvY2twaXQuXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgc291dGh3ZXN0IGludG8gdGhlIGRvY3RvcidzIG9mZmljZS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIERPQ1RPUlNfT0ZGSUNFKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRdKSksXG5cdFx0XHRcdFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiTm93IHRoYXQgdGhlIHNoaXAgaXMgYmFjayBvbmxpbmUsIHlvdSB3aWxsIG5lZWQgdG8gY29udGFjdCBhIHN1cHBvcnQgc2hpcC4gQW4gb2ZmaWNlciB3b3VsZCBiZSBwZXJmZWN0IGZvciB0aGUgam9iLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIsIDEpO1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIikgPT0gMSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGNvbnRhY3QgYSBzdXBwb3J0IHNoaXAuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJBIHN1cHBvcnQgc2hpcCBoYXMgbm93IGJlZW4gY29udGFjdGVkLCBidXQgdGhlIHNoaXAgbXVzdCBnZXQgcmVhZHkgdG8gYmUgbW92ZWQuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSA9PSAzLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gcHJlcGFyZSB0aGUgc2hpcCB0byBtb3ZlLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBdKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShDb2NrcGl0QlQpO1xuXG52YXIgTW9uaXRvcmluZ0JUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1PTklUT1JJTkdfUk9PTSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTW9uaXRvcmluZ1N0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBtb25pdG9yaW5nIHJvb20gaXMgcHVycG9zZWQgdG8gc2VlIGludG8gdGhlIHRyYW5zcG9ydCByb29tLCB0aHVzIHdhdGNoaW5nIGZvciBzaWducyBvZiB0cm91YmxlIHdpdGggdGhlIHRyYW5zcG9ydGVyLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJNb25pdG9yaW5nU3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fbW9uaXRvcmluZykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIikgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1vbml0b3JpbmdTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgbW9uaXRvcmluZyByb29tLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIGVhc3QgaW50byB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRE9DVE9SU19PRkZJQ0UpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyB3ZXN0IGludG8gdGhlIHRyYW5zcG9ydCByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVFJBTlNQT1JUX1JPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuXHRcdFx0XSkpLFxuICAgICAgICAgICAgICAgXHRcdFx0c2VsZWN0b3IoW1xuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIG1vbml0b3Jpbmcgcm9vbSBuZWVkcyB0byBiZSBpbnNwZWN0ZWQgdG8gbm90ZSBhbnkgbWFsZnVuY3Rpb25zLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIiwgMSk7XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIpID09IDEsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBpbnNwZWN0IHRoZSBtb25pdG9yaW5nIHJvb20uXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIpID09IDIsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIk5vdGhpbmcgaXMgd3JvbmcgaW4gdGhlIG1vbml0b3Jpbmcgcm9vbSwgYnV0IHNvbWUgYnJva2VuIHNoYXJkcyBmbGV3IGluIGZyb20gdGhlIGFkamFjZW50IHJvb20uIEEgamFuaXRvciB3b3VsZCBoYXZlIGl0IGNsZWFuZWQgdXAgaW4gbm8gdGltZS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIikgPT0gMyxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGNsZWFuIHRoZSBtb25pdG9yaW5nIHJvb20uXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICBdKSxcblxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKE1vbml0b3JpbmdCVCk7XG5cbnZhciBUcmFuc3BvcnRCVCA9IGd1YXJkKFxuXHQoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gVFJBTlNQT1JUX1JPT00sXG5cdHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRyYW5zcG9ydFN0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIldoZXJlIHRoZSB0cmFuc3BvcnRlciBpcyBsb2NhdGVkIGFuZCB3aGVyZSB0aGUgZmFpbHVyZSBvY2N1cnJlZC4gTWFyayB0aGUgdHJhbnNwb3J0IG9mZmljZXIgb2Z0ZW4gd29ya3MgaW4gaGVyZS4gTWFyayBpcyBhbiBvbGRlciBjcmV3bWF0ZSB3aG8gYXZvaWRzIHRoZSBzcG90bGlnaHQgbGlrZSB0aGUgcGxhZ3VlLiBIaXMgYW54aWV0eSBsZXZlbHMgc2hvdCB1cCByYXBpZGx5IGFmdGVyIHRoZSBmYWlsdXJlLCBhbmQgaGUgaXMgZXhjZXNzaXZlbHkgd29ycmllZCB0aGF0IHRoZSByZXN0IG9mIHRoZSBjcmV3IGJsYW1lcyB0aGUgZmFpbHVyZSBvbiBoaW0uXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIlRyYW5zcG9ydFN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX3RyYW5zcG9ydCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVHJhbnNwb3J0U3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICBcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgdHJhbnNwb3J0IHJvb20gd2hlcmUgdGhlIHRlbGVwb3J0ZXIgaXMgbG9jYXRlZC5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBlYXN0IGludG8gdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1PTklUT1JJTkdfUk9PTSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkV4aXQgdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuXG5cdFx0XHRcdFx0XHQvLyBHb2FsIG9wdGlvbnMgZm9yIHRoZSByb29tIC0+IE9ubHkgc2hvd2luZyB0aGVzZSB3aGVuIHRoZSBtYWluIGhlbHAgdGV4dCBpcyBvZmYuIFxuXHRcdFx0XHRcdFx0c2VsZWN0b3IoW1xuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAwLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGVyZSBzZWVtcyB0byBiZSBhIHByb2JsZW0gd2l0aCB0aGUgdGVsZXBvcnRlciBzb2Z0d2FyZS4gTWF5YmUgYSB0cmFuc3BvcnQgb2ZmaWNlciBjb3VsZCBjaGVjayBpdCBvdXQuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBcdC8vIEhpbnQgZ2l2ZW46IEFzayBNYXJrXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIsIDEpO1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDEsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBsb29rIGF0IHRoZSB0ZWxlcG9ydGVyIHNvZndhcmUuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMixcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHNvZnR3YXJlIHdhcyBsb29rZWQgb3ZlciwgYnV0IGJlZm9yZSBpdCBjYW4gYmUgcmVzdGFydGVkLCB0aGUgcm9vbSBtdXN0IGJlIGNsZWFuZWQuIFNvdW5kcyBsaWtlIGEgamFuaXRvcidzIGpvYi5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAzLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBjbGVhbiB0aGUgcm9vbSBiZWZvcmUgYW55IG90aGVyIHByb2dyZXNzIGlzIG1hZGUuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gNCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHJvb20gaXMgY2xlYW5lZCwgc28gbm93IHRoZSB0ZWxlcG9ydGVyIHNvZnR3YXJlIGNhbiBiZSByZXN0YXJ0ZWQuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gNSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIHJlc3RhcnQgdGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gNixcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUgd2FzIHJlc3RhcnRlZCwgYnV0IG5vdyBpdCBuZWVkcyB0byBiZSByZWNvbmZpZ3VyZWQgdG8gbWF0Y2ggdGhlIHNldHRpbmdzIG9mIHRoZSBzaGlwLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDcsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byByZWNvbmZpZ3VyZSB0aGUgc29mdHdhcmUuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gOCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUgaXMgbm93IGdvb2QgdG8gZ28sIHNvIGFsbCB0aGF0IGlzIGxlZnQgaXMgdG8gcmVzdGFydCB0aGUgdGVsZXBvcnRlciBpdHNlbGYuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gOSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIHJlc3RhcnQgdGhlIHRlbGVwb3J0ZXIuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHRcdFx0XHRdKVxuXHRcdFx0XHRcdF0pLFxuXHRcdFx0XHQpXG5cbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgXG5cdFx0XSlcblx0KTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoVHJhbnNwb3J0QlQpO1xuXG52YXIgRXNjYXBlUG9kQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRVNDQVBFX1BPRCxcblx0c2VxdWVuY2UoW1xuXHRcdHNlbGVjdG9yKFtcbiAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRXNjYXBlU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZXJlIGlzIG9ubHkgb25lIGVzY2FwZSBwb2QgYWJvYXJkIHRoaXMgc2hpcC4gSWYgYW55IGNyZXdtYXRlIGJlY29tZXMgdG9vIGZlYXJmdWwgb2YgdGhlaXIgY3VycmVudCBzaXR1YXRpb24sIHRoZXkgd2lsbCBhdHRlbXB0IHRvIGxlYXZlIGluIGl0LlwiKSxcbiAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiRXNjYXBlU3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9lc2NhcGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0VmFyaWFibGUoXCJFU0NBUEVfUE9EOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJFU0NBUEVfUE9EOkJyb2tlblwiKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXHRdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVzY2FwZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgIFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBlc2NhcGUgcG9kLlwiKSxcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRcdFx0XSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBcdFx0c2VsZWN0b3IoW1xuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIpID09IDAsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBlc2NhcGUgcG9kIG5lZWRzIHRvIGJlIGluc3BlY3RlZCBmb3Igc2lnbnMgb2YgbWFsZnVuY3Rpb25zLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIsIDEpO1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIikgPT0gMSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGluc3BlY3QgdGhlIGVzY2FwZSBwb2QuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgIF0pLFxuICAgICAgICBdKSxcblx0XSlcbik7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEVzY2FwZVBvZEJUKTtcblxudmFyIEZCZWRyb29tQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRkVNX0JFRFJPT00sXG5cdHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgaW50byB0aGUgZmVtYWxlcycgYmVkcm9vbS5cIiksXG5cdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgYmF0aHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQVRIUk9PTSkpLFxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdCk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEZCZWRyb29tQlQpO1xuXG52YXIgQmF0aHJvb21CVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBCQVRIUk9PTSxcblx0c2VxdWVuY2UoW1xuICAgICAgICAgICAgIFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBpbnRvIHRoZSBiYXRocm9vbS5cIiksXG5cdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgc291dGggaW50byB0aGUgbWFsZXMnIGJlZHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUxFX0JFRFJPT00pKSxcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBub3J0aCBpbnRvIHRoZSBmZW1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRkVNX0JFRFJPT00pKSxcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdCk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEJhdGhyb29tQlQpO1xuXG52YXIgTUJlZHJvb21CVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBNQUxFX0JFRFJPT00sXG5cdHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBpbnRvIHRoZSBtYWxlcycgYmVkcm9vbS5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIGJhdGhyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkFUSFJPT00pKSxcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHQpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShNQmVkcm9vbUJUKTtcblxudmFyIHdpcmVzMUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IHdpcmVzMS5jdXJyZW50TG9jYXRpb24sIC8vICBnZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiKVxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugbm90aWNlIHdpcmVzIG9uIHRoZSBncm91bmQuXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvblRyZWUoXCJQaWNrIHVwIHRoZSB3aXJlcy5cIixcblx0XHRcdFx0c2VxdWVuY2UoW1xuXHRcdFx0XHRcdGFjdGlvbigoKT0+dHJ1ZSwgKCkgPT4ge1xuXHRcdFx0XHRcdFx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgd2lyZXMuXCIpO1xuXHRcdFx0XHRcdFx0c2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIik7XG5cdFx0XHRcdFx0XHRzZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCwgZ2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQpICsgMSk7XG5cdFx0XHRcdFx0fSwgMCksXG5cdFx0XHRcdFx0Ly8gYWN0aW9uKCgpPT50cnVlLCAoKSA9PiB7XG5cdFx0XHRcdFx0Ly8gICAgIGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiV293IHlvdSBrbm93IGhvdyB0byBwaWNrIHVwIHRoaW5ncy5cIil9LCAwKVxuXHRcdFx0XHRdKVxuXHRcdFx0KVxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHdpcmVzMUJUKTtcblxudmFyIHdpcmVzMkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IHdpcmVzMi5jdXJyZW50TG9jYXRpb24sIC8vIGdldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugbm90aWNlIHdpcmVzIG9uIHRoZSBncm91bmQuXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIlBpY2sgdXAgdGhlIHdpcmVzLlwiLCAoKSA9PiB7XG5cdFx0XHRcdGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiWW91IHBpY2sgdXAgdGhlIHdpcmVzLlwiKTtcblx0XHRcdFx0c2V0SXRlbVZhcmlhYmxlKHdpcmVzMiwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIik7XG5cdFx0XHRcdHNldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkLCBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkgKyAxKTtcblx0XHRcdH0pXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUod2lyZXMyQlQpO1xuXG5sZXQgYWRkR29hbFRvQWdlbnQgPSBmdW5jdGlvbihnb2FsLCBhZ2VudCwgZGVzdGluYXRpb24pIHtcblx0bGV0IG5ld0FnZW50VHJlZSA9IHNlcXVlbmNlKFtcblx0XHRsYXN0U2VlbkJ5QWdlbnQoYWdlbnQpLFxuXHRcdHNlcXVlbmNlKFtcblx0XHRcdHNlYXJjaEZvckFnZW50KGFnZW50LCBkZXN0aW5hdGlvbiksIGxhc3RTZWVuQnlBZ2VudChhZ2VudClcblx0XHRdKVxuXHRdKTtcblx0YXR0YWNoVHJlZVRvQWdlbnQoYWdlbnQsIG5ld0FnZW50VHJlZSk7XG59XG5cblxubGV0IHBsYXllclNlZXNBZ2VudCA9IGZ1bmN0aW9uKGFnZW50KSB7XG5cdHZhciBwbGF5ZXJTZWVzQWdlbnQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gYWdlbnQuY3VycmVudExvY2F0aW9uLFxuXHQgICAgc2VxdWVuY2UoW1xuXHQgICAgXHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugc2VlIFwiK2FnZW50Lm5hbWUpLFxuXHQgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAxLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gZ28gZml4IHRoZSB0ZWxlcG9ydGVyIHNvZnR3YXJlLlwiLCAoKSA9PiBhZGRHb2FsVG9BZ2VudChcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiLCBhZ2VudCwgVFJBTlNQT1JUX1JPT00pKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcblxuICAgICAgICAgICAgLy8gQWRkIHRoaXMgKDEpXG4gICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORV9ST09NOkJyb2tlblwiKSA9PSAxLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gZ28gZml4IHRoZSB0aGF0IG90aGVyIHByb2JsZW0gc29mdHdhcmUuXCIsICgpID0+IGFkZEdvYWxUb0FnZW50KFwiRU5HSU5FX1JPT006QnJva2VuXCIsIGFnZW50LCBFTkdJTkVTKSksXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG5cdFx0XSlcblx0KTtcblx0YWRkVXNlckludGVyYWN0aW9uVHJlZShwbGF5ZXJTZWVzQWdlbnQpO1xufVxuXG5wbGF5ZXJTZWVzQWdlbnQoQ2FsZWIpXG5wbGF5ZXJTZWVzQWdlbnQoUXVpbm4pXG5wbGF5ZXJTZWVzQWdlbnQoTWFyaylcbnBsYXllclNlZXNBZ2VudChCZWF0cmljZSlcblxuXG4vLyAvLzQuIFJ1biB0aGUgd29ybGRcbmluaXRpYWxpemUoKTtcbnZhciB1c2VySW50ZXJhY3Rpb25PYmplY3QgPSBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKTtcblxuLy8gLy9SRU5ERVJJTkctLS0tLVxudmFyIGRpc3BsYXlQYW5lbCA9IHt4OiAyNTAsIHk6IDB9O1xudmFyIHRleHRQYW5lbCA9IHt4OiAyNzAsIHk6IDUwMX07XG52YXIgYWN0aW9uc1BhbmVsID0ge3g6IDUyMCwgeTogNTUwfTtcblxudmFyIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXknKTtcbnZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbnZhciBzcGFjZXNoaXBJbWFnZSA9IG5ldyBJbWFnZSgpO1xuc3BhY2VzaGlwSW1hZ2Uub25sb2FkID0gcmVuZGVyO1xudmFyIHBsYXllckltYWdlID0gbmV3IEltYWdlKCk7XG52YXIgY2FsZWJJbWFnZSA9IG5ldyBJbWFnZSgpO1xudmFyIHF1aW5uSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBtYXJrSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBlZGRpZUltYWdlID0gbmV3IEltYWdlKCk7XG52YXIgYmVhdHJpY2VJbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG5cdGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cdGNvbnRleHQuZHJhd0ltYWdlKHNwYWNlc2hpcEltYWdlLCBkaXNwbGF5UGFuZWwueCwgZGlzcGxheVBhbmVsLnksIDEwMDAsIDUwMCk7XG5cdGRpc3BsYXlQbGF5ZXIoKTtcblx0ZGlzcGxheUNhbGViKCk7XG5cdGRpc3BsYXlRdWlubigpO1xuXHRkaXNwbGF5TWFyaygpO1xuXHRkaXNwbGF5RWRkaWUoKTtcblx0ZGlzcGxheUJlYXRyaWNlKCk7XG5cdGRpc3BsYXlUZXh0QW5kQWN0aW9ucygpO1xufVxuXG52YXIgbWFwUG9zaXRpb25zID0ge1xuXHRcIkVOR0lORVNcIjoge3g6IDI4NSwgeTogMTA4fSxcblx0XCJDT0NLUElUXCI6IHt4OiA4NjAsIHk6IDIzMH0sXG5cdFwiU1RPUkFHRVwiOiB7eDogNTUwLCB5OiAxMDZ9LFxuXHRcIkRPQ1RPUlMgT0ZGSUNFXCI6IHt4OiA3MjUsIHk6IDM1MH0sXG5cdFwiTUFJTiBBUkVBXCI6IHt4OiA0ODAsIHk6IDI0MH0sXG5cdFwiRVNDQVBFIFBPRFwiOiB7eDogMjI0LCB5OiA0MDh9LFxuXHRcIlRSQU5TUE9SVCBST09NXCI6IHt4OiAzNzAsIHk6IDM1OH0sXG5cdFwiTU9OSVRPUklORyBST09NXCI6IHt4OiA1MzUsIHk6IDM2MH0sXG5cdFwiQkFUSFJPT01cIjoge3g6IDg1LCB5OiAyNDB9LFxuXHRcIk1BTEUgQkVEUk9PTVwiOiB7eDogODUsIHk6IDMzMH0sXG5cdFwiRkVNIEJFRFJPT01cIjoge3g6IDg1LCB5OiAxNTB9XG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5UGxheWVyKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pO1xuXHRpZiAoIWlzVW5kZWZpbmVkKG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dKSlcblx0XHRjb250ZXh0LmRyYXdJbWFnZShwbGF5ZXJJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlDYWxlYigpIHtcblx0dmFyIGN1cnJMb2NhdGlvbiA9IENhbGViLmN1cnJlbnRMb2NhdGlvbjtcblx0Y29udGV4dC5kcmF3SW1hZ2UoY2FsZWJJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlRdWlubigpIHtcblx0dmFyIGN1cnJMb2NhdGlvbiA9IFF1aW5uLmN1cnJlbnRMb2NhdGlvbjtcblx0Y29udGV4dC5kcmF3SW1hZ2UocXVpbm5JbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlNYXJrKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gTWFyay5jdXJyZW50TG9jYXRpb247XG5cdGNvbnRleHQuZHJhd0ltYWdlKG1hcmtJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlFZGRpZSgpIHtcblx0dmFyIGN1cnJMb2NhdGlvbiA9IEVkZGllLmN1cnJlbnRMb2NhdGlvbjtcblx0Y29udGV4dC5kcmF3SW1hZ2UoZWRkaWVJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlCZWF0cmljZSgpIHtcblx0dmFyIGN1cnJMb2NhdGlvbiA9IEJlYXRyaWNlLmN1cnJlbnRMb2NhdGlvbjtcblx0Y29udGV4dC5kcmF3SW1hZ2UoYmVhdHJpY2VJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbnNwYWNlc2hpcEltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL3NoaXAucG5nXCI7XG5wbGF5ZXJJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9UYXlsb3IzLnBuZ1wiO1xuY2FsZWJJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9DYWxlYi5wbmdcIjtcbnF1aW5uSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvUXVpbm4ucG5nXCI7XG5tYXJrSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvTWFyay5wbmdcIjtcbmVkZGllSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvRWRkaWUucG5nXCI7XG5iZWF0cmljZUltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL0JlYXRyaWNlLnBuZ1wiO1xuXG52YXIgY3VycmVudFNlbGVjdGlvbjtcbnZhciB5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcbnZhciB5T2Zmc2V0SW5jcmVtZW50ID0gMjU7XG5cblxuXG5mdW5jdGlvbiB3cmFwVGV4dCh0ZXh0KSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIldyYXAgVGV4dFwiKTtcbiAgICB2YXIgd2E9dGV4dC5zcGxpdChcIiBcIiksXG4gICAgICAgIHBocmFzZUFycmF5PVtdLFxuICAgICAgICBsYXN0UGhyYXNlPXdhWzBdLFxuICAgICAgICBtZWFzdXJlPTAsXG4gICAgICAgIHNwbGl0Q2hhcj1cIiBcIjtcbiAgICBpZiAod2EubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgcmV0dXJuIHdhXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaT0xO2k8d2EubGVuZ3RoO2krKykge1xuICAgICAgICB2YXIgdz13YVtpXTtcbiAgICAgICAgbWVhc3VyZT1jb250ZXh0Lm1lYXN1cmVUZXh0KGxhc3RQaHJhc2Urc3BsaXRDaGFyK3cpLndpZHRoO1xuICAgICAgICBpZiAobWVhc3VyZTwxMDAwKSB7XG4gICAgICAgICAgICBsYXN0UGhyYXNlKz0oc3BsaXRDaGFyK3cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGhyYXNlQXJyYXkucHVzaChsYXN0UGhyYXNlKTtcbiAgICAgICAgICAgIGxhc3RQaHJhc2U9dztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaT09PXdhLmxlbmd0aC0xKSB7XG4gICAgICAgICAgICBwaHJhc2VBcnJheS5wdXNoKGxhc3RQaHJhc2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcGhyYXNlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUZXh0QW5kQWN0aW9ucygpIHtcblx0Y29udGV4dC5jbGVhclJlY3QodGV4dFBhbmVsLngsIHRleHRQYW5lbC55LCA1MDAsIDEwMDApO1xuXHRcblxuXHRjb250ZXh0LmZvbnQgPSBcIjE1cHQgQ2FsaWJyaVwiO1xuXHRjb250ZXh0LmZpbGxTdHlsZSA9ICdwaW5rJztcblx0Y29uc29sZS5sb2coXCJBY3Rpb25zIGVmZmVjdCB0ZXh0OiBcIiArIHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCk7XG5cdHZhciB0ZXh0VG9EaXNwbGF5ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0Lmxlbmd0aCAhPSAwID8gd3JhcFRleHQodXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0KSA6IHdyYXBUZXh0KHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0KTtcblxuXG5cdC8vIGNvbnNvbGUubG9nKHRleHRUb0Rpc3BsYXkpO1xuXHRhY3Rpb25zUGFuZWwueSA9IHRleHRUb0Rpc3BsYXkubGVuZ3RoKjI1K3RleHRQYW5lbC55KzIwO1xuXHR5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcblxuXHRmb3IodmFyIGk9MDsgaTx0ZXh0VG9EaXNwbGF5Lmxlbmd0aDsgaSsrKXtcblx0XHRcdGNvbnRleHQuZmlsbFRleHQodGV4dFRvRGlzcGxheVtpXSwgdGV4dFBhbmVsLngsIHRleHRQYW5lbC55KzI1KmkrMjApO1x0XG5cdH1cblx0XG5cblx0Y29udGV4dC5mb250ID0gXCIxNXB0IENhbGlicmlcIjtcblx0Y29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdXNlckFjdGlvblRleHQgPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0W2ldO1xuXHRcdGNvbnRleHQuZmlsbFRleHQodXNlckFjdGlvblRleHQsIGFjdGlvbnNQYW5lbC54ICsgMjAsIHlPZmZzZXQpO1xuXHRcdGlmIChpID09IDApIHtcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSBpO1xuXHRcdH1cblx0XHR5T2Zmc2V0ICs9IHlPZmZzZXRJbmNyZW1lbnQ7XG5cdH1cblxuXHRkaXNwbGF5QXJyb3coKTtcblx0Y29uc29sZS5sb2coXCJ3aXJlczogXCIgKyBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5QXJyb3coKSB7XG5cdGlmKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApe1xuXHRcdGNvbnRleHQuY2xlYXJSZWN0KGFjdGlvbnNQYW5lbC54LCBhY3Rpb25zUGFuZWwueSwgMjAsIDEwMDApO1xuXHRcdGNvbnRleHQuZmlsbFRleHQoXCI+IFwiLCA1MjAsIGFjdGlvbnNQYW5lbC55ICsgMjUgKyAoY3VycmVudFNlbGVjdGlvbiAqIHlPZmZzZXRJbmNyZW1lbnQpKTtcblx0fVxufVxuXG4vL1VzZXIgaW5wdXRcbmZ1bmN0aW9uIGtleVByZXNzKGUpIHtcblx0aWYgKGUua2V5Q29kZSA9PSAxMykge1xuXHRcdHZhciBzZWxlY3RlZEFjdGlvbiA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHRbY3VycmVudFNlbGVjdGlvbl07XG5cdFx0aWYoIWlzVW5kZWZpbmVkKHNlbGVjdGVkQWN0aW9uKSl7XG5cdFx0XHRleGVjdXRlVXNlckFjdGlvbihzZWxlY3RlZEFjdGlvbik7XG5cdFx0XHR3b3JsZFRpY2soKTtcblx0XHRcdHJlbmRlcigpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBrZXlEb3duKGUpIHtcblx0aWYgKGUua2V5Q29kZSA9PSA0MCkgey8vZG93blxuXHRcdGlmICh1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKSB7XG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uKys7XG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uID0gY3VycmVudFNlbGVjdGlvbiAlIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoO1xuXHRcdFx0ZGlzcGxheUFycm93KCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzOCkgey8vdXBcblx0XHRpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xuXHRcdFx0Y3VycmVudFNlbGVjdGlvbi0tO1xuXHRcdFx0aWYgKGN1cnJlbnRTZWxlY3Rpb24gPCAwKVxuXHRcdFx0XHRjdXJyZW50U2VsZWN0aW9uID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggLSAxO1xuXHRcdFx0ZGlzcGxheUFycm93KCk7XG5cdFx0fVxuXHR9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBrZXlQcmVzcywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93biwgZmFsc2UpOyIsImltcG9ydCBRdWV1ZSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9RdWV1ZVwiO1xuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xuXG5pbnRlcmZhY2UgRGljdGlvbmFyeTxUPiB7IFtrZXk6IHN0cmluZ106IFQ7IH1cblxuZXhwb3J0IGVudW0gU3RhdHVzIHtcbiAgICBSVU5OSU5HLFxuICAgIFNVQ0NFU1MsXG4gICAgRkFJTFVSRVxufVxuXG5mdW5jdGlvbiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQ6IG51bWJlciwgYmxhY2tib2FyZDogYW55LCBzdGF0dXM6IFN0YXR1cykge1xuICAgIGRlbGV0ZSBibGFja2JvYXJkW2lkXTtcbiAgICByZXR1cm4gc3RhdHVzO1xufVxuXG5leHBvcnQgdHlwZSBFZmZlY3QgPSAoKSA9PiB2b2lkXG5leHBvcnQgdHlwZSBQcmVjb25kaXRpb24gPSAoKSA9PiBib29sZWFuXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXG5leHBvcnQgdHlwZSBBY3Rpb25UaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcikgPT4gVGlja1xuLyoqXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xuICovXG5leHBvcnQgdHlwZSBHdWFyZFRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2ssIG5lZ2F0ZT86IGJvb2xlYW4pID0+IFRpY2tcbi8qKlxuICogU2VxdWVuY2UvU2VsZWN0b3JcbiAqL1xuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXG5cbnZhciBibGFja2JvYXJkID0ge307XG5cbmZ1bmN0aW9uIGdldEFjdGlvblRpY2soaWQ6IG51bWJlcik6IEFjdGlvblRpY2sge1xuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQgPSAxKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJlY29uZGl0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA9IHRpY2tzUmVxdWlyZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgYXN0VGljaywgbmVnYXRlID0gZmFsc2UpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2VlZCA/IGV4ZWN1dGUoYXN0VGljaykgOiBTdGF0dXMuRkFJTFVSRTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3RvclRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlKGFzdFRpY2s6IFRpY2spOiBTdGF0dXMge1xuICAgIHJldHVybiBhc3RUaWNrKCk7XG59XG5cbnZhciBnbG9iYWxJZENvdW50ZXIgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gYWN0aW9uKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcik6IFRpY2sge1xuICAgIHJldHVybiBnZXRBY3Rpb25UaWNrKGdsb2JhbElkQ291bnRlcisrKShwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1YXJkKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrKTogVGljayB7XG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBDeWNsZXMgb3ZlciBpdHMgY2hpbGRyZW46IGl0ZXJhdGVzIHRvIHRoZSBuZXh0IGNoaWxkIG9uIHN1Y2Nlc3Mgb2YgYSBjaGlsZFxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xuICogQHJldHVybnMge1RpY2t9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZShhc3RUaWNrczogVGlja1tdKTogVGljayB7XG4gICAgcmV0dXJuIGdldFNlcXVlbmNlVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xufVxuXG4vKipcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxuICogU3VjY2VlZHMgaWYgZXZlbiBvbmUgc3VjY2VlZHMsIGVsc2UgZmFpbHNcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xuICogQHJldHVybnMge1RpY2t9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Rvcihhc3RUaWNrczogVGlja1tdKTogVGljayB7XG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xufVxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tIEFQSXMgLS0tLS0tLS0tLS0tLS0tICovXG5cbi8vMC4gdXRpbGl0aWVzXG4vLyBtaW4gYW5kIG1heCBhcmUgaW5jbHVzaXZlXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZE51bWJlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xufVxuXG4vLzEuIHN0b3J5IGluc3RhbmNlXG5cbi8vMS4xIGxvY2F0aW9uc1xuLy8gdmFyIGxvY2F0aW9uR3JhcGg6IERpY3Rpb25hcnk8TG9jYXRpb24+ID0ge307XG5cbnZhciBsb2NhdGlvbkdyYXBoID0ge307XG5cbi8vIC8vIFxuLy8gY2xhc3MgTG9jYXRpb24ge1xuLy8gICAgIGFkamFjZW50TG9jYXRpb25zOiBEaWN0aW9uYXJ5PExvY2F0aW9uW10+O1xuXG4vLyAgICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgYWRqYWNlbnRMb2NhdGlvbnM6IHN0cmluZ1tdKSB7XG4vLyAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbi8vICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICAgICAgaWYoYWRqYWNlbnRMb2NhdGlvbnNbaV0gaW4gbG9jYXRpb25HcmFwaCl7XG5cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGVsc2V7XG4vLyAgICAgICAgICAgICAgICAgdmFyIG5ld19sb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cblxuLy8gICAgIH1cbi8vIH1cblxuXG4vL2FkZCB0byBib3RoIHNpZGVzXG5leHBvcnQgZnVuY3Rpb24gYWRkTG9jYXRpb24obG9jYXRpb25OYW1lOiBzdHJpbmcsIGFkamFjZW50TG9jYXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPT0gdW5kZWZpbmVkKVxuICAgICAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBbXTtcbiAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0uY29uY2F0KGFkamFjZW50TG9jYXRpb25zKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnRMb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID0gW107XG5cbiAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0ucHVzaChsb2NhdGlvbk5hbWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFkamFjZW50KGxvY2F0aW9uMTogc3RyaW5nLCBsb2NhdGlvbjI6IHN0cmluZyk6Ym9vbGVhbiB7XG4gICAgY29uc29sZS5sb2coXCJBcmUgYWRqYWNlbnQ6IFwiICsgbG9jYXRpb24xICsgXCIsIFwiK2xvY2F0aW9uMik7XG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXSA9PSB1bmRlZmluZWQgfHwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjJdID09IHVuZGVmaW5lZCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWl0aGVyIG9uZS9ib3RoIGxvY2F0aW9ucyB1bmRlZmluZWRcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdW2ldID09IGxvY2F0aW9uMil7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8vcGF0aGZpbmRpbmcgcHJpbWl0aXZlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRMb2NhdGlvbihzdGFydDogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YXIgdmlzaXRlZCA9IHt9O1xuICAgIHZhciBwcmV2aW91cyA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiBsb2NhdGlvbkdyYXBoKSB7XG4gICAgICAgIHZpc2l0ZWRba2V5XSA9IGZhbHNlO1xuICAgIH1cbiAgICB2aXNpdGVkW3N0YXJ0XSA9IHRydWU7XG5cbiAgICB2YXIgbXlRdWV1ZSA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XG4gICAgbXlRdWV1ZS5lbnF1ZXVlKHN0YXJ0KTtcblxuICAgIHdoaWxlICghbXlRdWV1ZS5pc0VtcHR5KCkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IG15UXVldWUuZGVxdWV1ZSgpO1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSBsb2NhdGlvbkdyYXBoW2N1cnJlbnRdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXZpc2l0ZWRbbmVpZ2hib3JzW2ldXSkge1xuICAgICAgICAgICAgICAgIG15UXVldWUuZW5xdWV1ZShuZWlnaGJvcnNbaV0pO1xuICAgICAgICAgICAgICAgIHZpc2l0ZWRbbmVpZ2hib3JzW2ldXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNbbmVpZ2hib3JzW2ldXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY3VycmVudDogc3RyaW5nID0gZGVzdGluYXRpb247XG4gICAgaWYgKGN1cnJlbnQgPT0gc3RhcnQpXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIHdoaWxlIChwcmV2aW91c1tjdXJyZW50XSAhPSBzdGFydCkge1xuICAgICAgICBjdXJyZW50ID0gcHJldmlvdXNbY3VycmVudF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbi8vMS4yIGFnZW50c1xuXG5leHBvcnQgY2xhc3MgQWdlbnQge1xuICAgIGN1cnJlbnRMb2NhdGlvbjogc3RyaW5nO1xuICAgIGRlc3RpbmF0aW9uOiBzdHJpbmc7XG4gICAgY3VycmVudEJlaGF2aW9yVHJlZTogVGlja1tdO1xuXG4gICAgLy8gU3BlY2lmaWMgdG8gTWFkZGllJ3MgZ2FtZT8gTW92ZSB0byBsaWIgZm4/IFxuICAgIGxhc3RTZWVuSXRlbToge1tpdGVtTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIGxhc3RTZWVuUGVyc29uOiB7W2l0ZW1OYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgcmFuZE51bWJlcjogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBjb25zdHJ1Y3RvclwiKVxuICAgIH1cblxuICAgIHNldEN1cnJlbnRMb2NhdGlvbihjdXJyZW50bG9jYXRpb246IHN0cmluZyl7XG4gICAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gY3VycmVudGxvY2F0aW9uO1xuICAgIH1cblxuICAgIGdldE5leHRMb2NhdGlvbigpe1xuICAgICAgICByZXR1cm4gYWN0aW9uKFxuICAgICAgICAgICAgKCkgPT4gdHJ1ZSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGdldE5leHRMb2NhdGlvbih0aGlzLmN1cnJlbnRMb2NhdGlvbiwgdGhpcy5kZXN0aW5hdGlvbik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lLCBcIiBhdDogXCIsIHRoaXMuY3VycmVudExvY2F0aW9uKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIDBcbiAgICApO1xuICAgIH1cblxuICAgIHNldERlc3RpbmF0aW9uKGRlc3RpbmF0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgfVxuXG4gICAgc2V0QmVoYXZpb3JUcmVlKGJlaGF2aW9yVHJlZTogVGlja1tdKXtcbiAgICAgICAgdGhpcy5jdXJyZW50QmVoYXZpb3JUcmVlID0gYmVoYXZpb3JUcmVlO1xuICAgIH1cblxuICAgIC8vIFNlZW1zIHNwZWNpZmljIHRvIE1hZGRpZSdzIGdhbWU/IE1vdmUgdG8gYSBsaWIgZnVuY3Rpb24/XG4gICAgc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKGl0ZW06IEl0ZW0sIGF0TG9jYXRpb246IHN0cmluZyl7XG4gICAgICAgIHRoaXMubGFzdFNlZW5JdGVtW2l0ZW0ubmFtZV0gPSBhdExvY2F0aW9uO1xuICAgIH1cblxuICAgIHNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKGFnZW50TmFtZTogc3RyaW5nLCBhdExvY2F0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmxhc3RTZWVuUGVyc29uW2FnZW50TmFtZV0gPSBhdExvY2F0aW9uO1xuICAgIH1cblxuICAgIGhhc1NlZW5JdGVtKGl0ZW06IEl0ZW0pe1xuICAgICAgICBpZihpdGVtLm5hbWUgaW4gdGhpcy5sYXN0U2Vlbkl0ZW0pe1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCI6IHNhdyBpdGVtOlwiK2l0ZW0ubmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy90aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdoZXJlSXNJdGVtKGl0ZW06IEl0ZW0pe1xuICAgICAgICBpZihpdGVtLm5hbWUgaW4gdGhpcy5sYXN0U2Vlbkl0ZW0pe1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCI6IHNhdyBpdGVtOlwiK2l0ZW0ubmFtZSArIFwiIGF0IGxvY2F0aW9uOlwiK3RoaXMubGFzdFNlZW5JdGVtW2l0ZW0ubmFtZV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdFNlZW5JdGVtW2l0ZW0ubmFtZV1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbnZhciBhZ2VudHM6IEFycmF5PEFnZW50PiA9IG5ldyBBcnJheTxBZ2VudD4oKTtcbi8vIHZhciBhZ2VudHMgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFnZW50KGFnZW50TmFtZTogc3RyaW5nKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJBZGRpbmc6IFwiK2FnZW50TmFtZSk7XG4gICAgdmFyIGFnZW50ID0gbmV3IEFnZW50KGFnZW50TmFtZSk7XG4gICAgY29uc29sZS5sb2coYWdlbnQpO1xuICAgIGFnZW50cy5wdXNoKGFnZW50KTtcbiAgICByZXR1cm4gYWdlbnQ7XG59XG5cbi8vMS4zIGl0ZW1zXG5cbi8vIFRvZG9cbmNsYXNzIEl0ZW0ge1xuICAgIGN1cnJlbnRMb2NhdGlvbjogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIHNldEN1cnJlbnRMb2NhdGlvbihjdXJyZW50bG9jYXRpb246IHN0cmluZyl7XG4gICAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gY3VycmVudGxvY2F0aW9uO1xuICAgIH1cbn1cblxudmFyIGl0ZW1zOiBBcnJheTxJdGVtPiA9IG5ldyBBcnJheTxJdGVtPigpO1xuLy8gdmFyIGl0ZW1zID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJdGVtKGl0ZW1OYW1lOiBzdHJpbmcpIHtcbiAgICB2YXIgaXRlbSA9IG5ldyBJdGVtKGl0ZW1OYW1lKTtcbiAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuICAgIHJldHVybiBpdGVtO1xufVxuXG4vLzEuNCB2YXJpYWJsZXNcbnZhciB2YXJpYWJsZXMgPSB7fTtcbnZhciBhZ2VudFZhcmlhYmxlcyA9IHt9O1xudmFyIGl0ZW1WYXJpYWJsZXMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZhcmlhYmxlKHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHZhcmlhYmxlc1t2YXJOYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB2YXJOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSlcbiAgICAgICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdID0ge307XG5cbiAgICBhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgbm90IHNldCFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHZhcmlhYmxlc1t2YXJOYW1lXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFnZW50VmFyaWFibGUoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBhZ2VudCBcIiArIGFnZW50ICsgXCIgbm90IHNldCFcIilcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYXJpYWJsZU5vdFNldCh2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNVbmRlZmluZWQodmFyaWFibGVzW3Zhck5hbWVdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWdlbnRWYXJpYWJsZU5vdFNldChhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSB8fCBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0pO1xufVxuXG4vLyB0b2RvXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbVZhcmlhYmxlKGl0ZW06IEl0ZW0sIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW0ubmFtZV0pKVxuICAgICAgICBpdGVtVmFyaWFibGVzW2l0ZW0ubmFtZV0gPSB7fTtcblxuICAgIGl0ZW1WYXJpYWJsZXNbaXRlbS5uYW1lXVt2YXJOYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSB8fCBpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBpdGVtIFwiICsgaXRlbSArIFwiIG5vdCBzZXQhXCIpXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV07XG59XG5cblxuLy8yXG4vL2FnZW50LWJlaGF2aW9yIHRyZWUgbWFwcGluZ1xuXG52YXIgYWdlbnRUcmVlczoge1thZ2VudE5hbWU6IHN0cmluZ10gOiBUaWNrfSA9IHt9O1xuLy8gdmFyIGFnZW50VHJlZXMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFRyZWVUb0FnZW50KGFnZW50OiBBZ2VudCwgdHJlZTogVGljaykge1xuICAgIGFnZW50VHJlZXNbYWdlbnQubmFtZV0gPSB0cmVlO1xufVxuXG4vLzMuMVxuLy91c2VyIGFjdGlvbnNcbi8vVE9ETyBhZGQgdmFyaWFibGVzIHRvIHVzZXIgYWN0aW9uIHRleHRzXG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0ge1xuICAgIHRleHQ6IFwiXCIsXG4gICAgdXNlckFjdGlvbnNUZXh0OiBbXSxcbiAgICBhY3Rpb25FZmZlY3RzVGV4dDogXCJcIlxufVxudmFyIHVzZXJJbnRlcmFjdGlvblRyZWVzID0gW107XG52YXIgdXNlckFjdGlvbnMgPSB7fTtcblxuZnVuY3Rpb24gcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKSB7XG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgPSBcIlwiO1xuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQgPSBbXTtcbiAgICB1c2VyQWN0aW9ucyA9IHt9Oy8ve1wiR28gdG8gbG9jYXRpb24gWFwiIDogZWZmZWN0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25UcmVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBleGVjdXRlKHVzZXJJbnRlcmFjdGlvblRyZWVzW2ldKTtcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uID0gKHRleHQ6IHN0cmluZykgPT5cbiAgICBhY3Rpb24oXG4gICAgICAgICgpID0+IHRydWUsXG4gICAgICAgICgpID0+IHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ICs9IFwiXFxuXCIgKyB0ZXh0LFxuICAgICAgICAwXG4gICAgKTtcbmV4cG9ydCBsZXQgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQgPSAodGV4dDogc3RyaW5nKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgKz0gXCJcXG5cIiArIHRleHQ7XG5cbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvblRyZWUgPSAodGV4dDogc3RyaW5nLCBlZmZlY3RUcmVlOiBUaWNrKSA9PiBhY3Rpb24oXG4gICAgKCkgPT4gdHJ1ZSxcbiAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGVmZmVjdFRyZWUpLCAwXG4pO1xuXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb24gPSAodGV4dDogc3RyaW5nLCBlZmZlY3Q6ICgpID0+IGFueSkgPT5cbiAgICBhY3Rpb24oXG4gICAgICAgICgpID0+IHRydWUsXG4gICAgICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgYWN0aW9uKCgpPT50cnVlLCBlZmZlY3QsIDApKSwgMFxuICAgICk7XG5cblxuXG5cblxuLy8gICAgIHJldHVybiBcbi8vIH1cblxuXG5mdW5jdGlvbiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQ6IHN0cmluZywgdHJlZTogVGljaykge1xuICAgIHVzZXJBY3Rpb25zW3RleHRdID0gdHJlZTtcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0LnB1c2godGV4dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRVc2VySW50ZXJhY3Rpb25UcmVlKHRpY2s6IFRpY2spIHtcbiAgICB1c2VySW50ZXJhY3Rpb25UcmVlcy5wdXNoKHRpY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVVzZXJBY3Rpb24odGV4dDogc3RyaW5nKSB7XG4gICAgLy9leGVjdXRlIHRoZSB1c2VyIGFjdGlvblxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCA9IFwiXCI7XG4gICAgdmFyIHVzZXJBY3Rpb25FZmZlY3RUcmVlID0gdXNlckFjdGlvbnNbdGV4dF07XG4gICAgZXhlY3V0ZSh1c2VyQWN0aW9uRWZmZWN0VHJlZSk7XG59XG5cbi8vNC5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKSB7XG4gICAgcmV0dXJuIHVzZXJJbnRlcmFjdGlvbk9iamVjdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdvcmxkVGljaygpIHtcbiAgICAvL2FsbCBhZ2VudCB0aWNrc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWdlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmVlID0gYWdlbnRUcmVlc1thZ2VudHNbaV0ubmFtZV07XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodHJlZSkpIHtcbiAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiZXhlY3V0aW5nQWdlbnRcIiwgYWdlbnRzW2ldLm5hbWUpO1xuICAgICAgICAgICAgZXhlY3V0ZSh0cmVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xufVxuXG5cblxuIl19
