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
        var chooseENGINES = scripting_1.action(function () { return destination == ENGINES; }, function () { return agent.destination = ENGINES; }, 0);
        var chooseSTORAGE = scripting_1.action(function () { return destination == STORAGE; }, function () { return agent.destination = STORAGE; }, 0);
        var chooseDOCTORS_OFFICE = scripting_1.action(function () { return destination == DOCTORS_OFFICE; }, function () { return agent.destination = DOCTORS_OFFICE; }, 0);
        var chooseCOCKPIT = scripting_1.action(function () { return destination == COCKPIT; }, function () { return agent.destination = COCKPIT; }, 0);
        var chooseESCAPE_POD = scripting_1.action(function () { return destination == ESCAPE_POD; }, function () { return agent.destination = ESCAPE_POD; }, 0);
        var chooseTRANSPORT_ROOM = scripting_1.action(function () { return destination == TRANSPORT_ROOM; }, function () { return agent.destination = TRANSPORT_ROOM; }, 0);
        var chooseMONITORING_ROOM = scripting_1.action(function () { return destination == MONITORING_ROOM; }, function () { return agent.destination = MONITORING_ROOM; }, 0);
        var chooseMAIN_AREA = scripting_1.action(function () { return destination == MAIN_AREA; }, function () { return agent.destination = MAIN_AREA; }, 0);
        var chooseFEM_BEDROOM = scripting_1.action(function () { return destination == FEM_BEDROOM; }, function () { return agent.destination = FEM_BEDROOM; }, 0);
        var chooseMALE_BEDROOM = scripting_1.action(function () { return destination == MALE_BEDROOM; }, function () { return agent.destination = MALE_BEDROOM; }, 0);
        var chooseBATHROOM = scripting_1.action(function () { return destination == BATHROOM; }, function () { return agent.destination = BATHROOM; }, 0);
        var setNextDestination = scripting_1.selector([
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
        ]);
        return setNextDestination;
    }
}
var setDestinationPrecondForAgent = function (agent) {
    var setDestinationPrecond = function () { return util_1.isUndefined(agent.destination) || agent.destination == agent.currentLocation; };
    return setDestinationPrecond;
};
// // create behavior trees
var gotoNextLocationForAgent = function (agent) {
    return scripting_1.action(function () { return true; }, function () {
        agent.currentLocation = scripting_1.getNextLocation(agent.currentLocation, agent.destination);
        console.log(agent, " at: ", agent.currentLocation);
    }, 0);
};
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
// let findItem = action(
//     () => getAgentVariable(Caleb, 'currentLocation') == getItemVariable(wires1, "currentLocation"),
//     () => {
//         console.log("Caleb found - Item: wires1")
//         // console.log("hello");
//         // console.log(getAgentVariable(Caleb, 'currentLocation') == getItemVariable(wires1, "currentLocation"));
//         // displayDescriptionAction("Caleb found the wires1.")
//     }, 
//     0
// );
// let eatPlayer = action(() => getAgentVariable(Caleb, "currentLocation") == getVariable(playerLocation),
//     () => {
//         setVariable("endGame", "lose");
//         setVariable(playerLocation, "NA");
//     }, 0
// );
//this mess
// let conversation = action(() => getAgentVariable(Caleb, "currentLocation") == getVariable(playerLocation),
//     () => {
//             displayDescriptionAction("You happen to run into Caleb."),
//             displayDescriptionAction("Caleb: Have you not found the wires yet? Did you not check storage?"),
//     },
// );
// let search = selector([
//     findItem,
//     sequence([
//         selector([
//             guard(setDestinationPrecond, {}, setNextDestination),
//             action(() => true, () => {
//             }, {}, 0)
//         ]),
//         gotoNextLocation,
//         findItem
//     ])
// ]);
var searchForAgent = function (agent) {
    var search = scripting_1.sequence([
        scripting_1.selector([
            scripting_1.guard(setDestinationPrecondForAgent(agent), setNextDestinationForAgent(agent)),
            scripting_1.action(function () { return true; }, function () {
            }, 0)
        ]),
        gotoNextLocationForAgent(agent),
    ]);
    return search;
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
            scripting_1.displayDescriptionAction("It was a simple mission: and on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Part two was when everything went awry. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed dead. The commander comes to as the ship is plummeting from orbit, his crewmates yelling at each other. There is only one escape pod remaining. You must take control of the ship and remaining crew to save everyone from certain death."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("theStart", 1);
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
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("EngineStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the engine room."),
            scripting_1.addUserAction("Head east into the storage room.", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
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
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("StorageStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You moved into the storage room."),
            scripting_1.addUserAction("Move into the engine room.", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        //Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(StorageBT);
var DrOfficeBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == DOCTORS_OFFICE; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("DrOfficeStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("Dr. Quinn spends a lot of time in her office looking after patients. She puts all others above herself; she is constantly concerned with the well-being of her crewmates. The prospect of her patients dying still keeps her up at night, but her determination to save as many people as she can is what keeps her going."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("DrOfficeStart", 1);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("DrOfficeStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the doctor's office."),
            scripting_1.addUserAction("Move into the cockpit.", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
            scripting_1.addUserAction("Go to the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
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
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("CockpitStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You move forward into the cockpit."),
            scripting_1.addUserAction("Move to the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(CockpitBT);
var MonitoringBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MONITORING_ROOM; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("MonitoringStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("The monitoring room is purposed to see into the transport room, thus watching for signs of trouble with the transporter."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("MonitoringStart", 1);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("MonitoringStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the monitoring room."),
            scripting_1.addUserAction("Move to the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
            scripting_1.addUserAction("Go to the transport room.", function () { return scripting_1.setVariable(playerLocation, TRANSPORT_ROOM); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(MonitoringBT);
var TransportBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TRANSPORT_ROOM; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("TransportStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("Where the transporter is located and where the failure occurred. Mark often works in here. Mark is an older crewmate who avoids the spotlight like the plague. His anxiety levels shot up rapidly after the failure, and he is excessively worried that the rest of the crew blames the failure on him."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("TransportStart", 1);
                console.log("This is: ", scripting_1.getVariable(goal_broken_transport));
                console.log(scripting_1.getVariable("TRANSPORT_ROOM:Broken"), scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 0);
            }),
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("TransportStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the transport room where the teleporter is located."),
            scripting_1.addUserAction("Move into the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
            scripting_1.addUserAction("Exit to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
            // Goal options for the room -> Only showing these when the main help text is off. 
            scripting_1.selector([
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 0; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("Oh No, the first thing broke. XYZ can fix it the best. But ABC is also a good person to ask for help"),
                    scripting_1.action(function () { return true; }, function () {
                        scripting_1.setVariable("TRANSPORT_ROOM:Broken", 1);
                    }, 0)
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 1; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("The first thing is still broken. Go find someone to fix it.")
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 2; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("The first thing was fixed, but now the second thing is broken? Go find EFG to fix the same.")
                ])),
            ])
        ]))
        // Optional
        // displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(TransportBT);
var EscapePodBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ESCAPE_POD; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("EscapeStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("There is only one escape pod aboard this ship. If any crewmate becomes too fearful of their current situation, they will attempt to leave in it."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("EscapeStart", 1);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("EscapeStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the escape pod."),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(EscapePodBT);
var FBedroomBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == FEM_BEDROOM; }, scripting_1.sequence([
    // selector([
    //              guard(() => getVariable("theStart") == 0,
    //                  sequence([
    //                      displayDescriptionAction("It was a simple mission: and on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Part two was when everything went awry. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed dead. The commander comes to as the ship is plummeting from orbit, his crewmates yelling at each other. There is only one escape pod remaining. You must take control of the ship and remaining crew to save everyone from certain death."),
    //                      addUserAction("Next.", () => {
    //                          setVariable("theStart", 1);
    //                      })
    //                  ])),
    //             	guard(() => getVariable("theStart") == 1,
    //                  sequence([
    scripting_1.displayDescriptionAction("You move into the females' bedroom."),
    scripting_1.addUserAction("Return to the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
]));
scripting_1.addUserInteractionTree(FBedroomBT);
var BathroomBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BATHROOM; }, scripting_1.sequence([
    // selector([
    //              guard(() => getVariable("theStart") == 0,
    //                  sequence([
    //                      displayDescriptionAction("It was a simple mission: and on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Part two was when everything went awry. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed dead. The commander comes to as the ship is plummeting from orbit, his crewmates yelling at each other. There is only one escape pod remaining. You must take control of the ship and remaining crew to save everyone from certain death."),
    //                      addUserAction("Next.", () => {
    //                          setVariable("theStart", 1);
    //                      })
    //                  ])),
    //             	guard(() => getVariable("theStart") == 1,
    //                  sequence([
    scripting_1.displayDescriptionAction("You move into the bathroom."),
    scripting_1.addUserAction("Move south into the males' bedroom.", function () { return scripting_1.setVariable(playerLocation, MALE_BEDROOM); }),
    scripting_1.addUserAction("Move north into the females' bedroom.", function () { return scripting_1.setVariable(playerLocation, FEM_BEDROOM); }),
    scripting_1.addUserAction("Enter the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(BathroomBT);
var MBedroomBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MALE_BEDROOM; }, scripting_1.sequence([
    // selector([
    //              guard(() => getVariable("theStart") == 0,
    //                  sequence([
    //                      displayDescriptionAction("It was a simple mission: and on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Part two was when everything went awry. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed dead. The commander comes to as the ship is plummeting from orbit, his crewmates yelling at each other. There is only one escape pod remaining. You must take control of the ship and remaining crew to save everyone from certain death."),
    //                      addUserAction("Next.", () => {
    //                          setVariable("theStart", 1);
    //                      })
    //                  ])),
    //             	guard(() => getVariable("theStart") == 1,
    //                  sequence([
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
    "ENGINES": { x: 275, y: 110 },
    "COCKPIT": { x: 860, y: 230 },
    "STORAGE": { x: 545, y: 110 },
    "DOCTORS OFFICE": { x: 725, y: 350 },
    "MAIN AREA": { x: 480, y: 240 },
    "ESCAPE POD": { x: 224, y: 408 },
    "TRANSPORT ROOM": { x: 370, y: 360 },
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
        this.lastSeenItem = {};
        this.lastSeenPerson = {};
        this.randNumber = 0;
        this.name = name;
        console.log(this.name + " constructor");
    }
    Agent.prototype.setCurrentLocation = function (currentlocation) {
        this.currentLocation = currentlocation;
    };
    Agent.prototype.setLastSawItemAtLocation = function (item, atLocation) {
        this.lastSeenItem[item.name] = atLocation;
    };
    Agent.prototype.setLastSawPersonAtLocation = function (agentName, atLocation) {
        this.lastSeenPerson[agentName] = atLocation;
    };
    Agent.prototype.setDestination = function (destination) {
        this.destination = destination;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL21hZGRpZS50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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WUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztJQUN6QyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNySSxDQUFDO0FBRUQ7SUFDQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BJLENBQUM7QUFFRDtJQUNDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDekMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUM1QyxPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENB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LFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDekIscUJBQXFCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsZ0NBQXVDLElBQVU7SUFDN0Msb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFGRCx3REFFQztBQUVELDJCQUFrQyxJQUFZO0lBQzFDLHlCQUF5QjtJQUN6QixxQkFBcUIsQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDN0MsSUFBSSxvQkFBb0IsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUxELDhDQUtDO0FBRUQsSUFBSTtBQUNKO0lBQ0ksdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBRkQsZ0NBRUM7QUFFRDtJQUNJLE9BQU8scUJBQXFCLENBQUM7QUFDakMsQ0FBQztBQUZELDREQUVDO0FBRUQ7SUFDSSxpQkFBaUI7SUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQixXQUFXLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtLQUNKO0lBQ0QsdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBVkQsOEJBVUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbnZhciBhcnJheXMgPSByZXF1aXJlKFwiLi9hcnJheXNcIik7XG52YXIgTGlua2VkTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAqIENyZWF0ZXMgYW4gZW1wdHkgTGlua2VkIExpc3QuXG4gICAgKiBAY2xhc3MgQSBsaW5rZWQgbGlzdCBpcyBhIGRhdGEgc3RydWN0dXJlIGNvbnNpc3Rpbmcgb2YgYSBncm91cCBvZiBub2Rlc1xuICAgICogd2hpY2ggdG9nZXRoZXIgcmVwcmVzZW50IGEgc2VxdWVuY2UuXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqL1xuICAgIGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAqIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICogTGFzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0XG4gICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICogQWRkcyBhbiBlbGVtZW50IHRvIHRoaXMgbGlzdC5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgYWRkZWQuXG4gICAgKiBAcGFyYW0ge251bWJlcj19IGluZGV4IG9wdGlvbmFsIGluZGV4IHRvIGFkZCB0aGUgZWxlbWVudC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkXG4gICAgKiB0aGUgZWxlbWVudCBpcyBhZGRlZCB0byB0aGUgZW5kIG9mIHRoaXMgbGlzdC5cbiAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGFkZGVkIG9yIGZhbHNlIGlmIHRoZSBpbmRleCBpcyBpbnZhbGlkXG4gICAgKiBvciBpZiB0aGUgZWxlbWVudCBpcyB1bmRlZmluZWQuXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaW5kZXgpKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMubkVsZW1lbnRzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLm5FbGVtZW50cyB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld05vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoaXRlbSk7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMCB8fCB0aGlzLmxhc3ROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBGaXJzdCBub2RlIGluIHRoZSBsaXN0LlxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IHRoaXMubkVsZW1lbnRzKSB7XG4gICAgICAgICAgICAvLyBJbnNlcnQgYXQgdGhlIGVuZC5cbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUubmV4dCA9IG5ld05vZGU7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gQ2hhbmdlIGZpcnN0IG5vZGUuXG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgaWYgKHByZXYgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHByZXYubmV4dDtcbiAgICAgICAgICAgIHByZXYubmV4dCA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uRWxlbWVudHMrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICogQHJldHVybiB7Kn0gdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXG4gICAgKiBlbXB0eS5cbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5maXJzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXG4gICAgKiBAcmV0dXJuIHsqfSB0aGUgbGFzdCBlbGVtZW50IGluIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xuICAgICogZW1wdHkuXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5sYXN0Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZGVzaXJlZCBpbmRleC5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpc1xuICAgICAqIG91dCBvZiBib3VuZHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZWxlbWVudEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4KTtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGVcbiAgICAgKiBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhlIExpc3QgZG9lcyBub3QgY29udGFpbiB0aGlzIGVsZW1lbnQuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIGxpc3QgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlXG4gICAgICogb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGlzIGxpc3QgZG9lcyBub3QgY29udGFpbiB0aGVcbiAgICAgKiBlbGVtZW50LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxuICAgICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAgICpcbiAgICAgICAqIDxwcmU+XG4gICAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAgICogfVxuICAgICAgICogPC9wcmU+XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxuICAgICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBmYWxzZVxuICAgICAgICogb3RoZXJ3aXNlLlxuICAgICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmluZGV4T2YoaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpc3QsIGlmIHByZXNlbnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgbGlzdCBjb250YWluZWQgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzIDwgMSB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubkVsZW1lbnRzLS07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnROb2RlO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgbGlzdC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cbiAgICAgKiBUd28gbGlzdHMgYXJlIGVxdWFsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBvcmRlci5cbiAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3R9IG90aGVyIHRoZSBvdGhlciBsaXN0LlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLiBJZiB0aGUgZWxlbWVudHMgaW4gdGhlIGxpc3RzXG4gICAgICogYXJlIGN1c3RvbSBvYmplY3RzIHlvdSBzaG91bGQgcHJvdmlkZSBhIGZ1bmN0aW9uLCBvdGhlcndpc2VcbiAgICAgKiB0aGUgPT09IG9wZXJhdG9yIGlzIHVzZWQgdG8gY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiBlbGVtZW50cy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob3RoZXIsIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcUYgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgTGlua2VkTGlzdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVyLnNpemUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsc0F1eCh0aGlzLmZpcnN0Tm9kZSwgb3RoZXIuZmlyc3ROb2RlLCBlcUYpO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAcHJpdmF0ZVxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzQXV4ID0gZnVuY3Rpb24gKG4xLCBuMiwgZXFGKSB7XG4gICAgICAgIHdoaWxlIChuMSAhPT0gbnVsbCAmJiBuMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFlcUYobjEuZWxlbWVudCwgbjIuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuMSA9IG4xLm5leHQ7XG4gICAgICAgICAgICBuMiA9IG4yLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBnaXZlbiBpbmRleC5cbiAgICAgKiBAcmV0dXJuIHsqfSByZW1vdmVkIGVsZW1lbnQgb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZUVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMgfHwgdGhpcy5maXJzdE5vZGUgPT09IG51bGwgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAxKSB7XG4gICAgICAgICAgICAvL0ZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmZpcnN0Tm9kZS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJldmlvdXMubmV4dCA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByZXZpb3VzICE9PSBudWxsICYmIHByZXZpb3VzLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcHJldmlvdXMubmV4dC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBwcmV2aW91cy5uZXh0Lm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBsaXN0IGluIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhjdXJyZW50Tm9kZS5lbGVtZW50KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV2ZXJzZXMgdGhlIG9yZGVyIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpbmtlZCBsaXN0IChtYWtlcyB0aGUgbGFzdFxuICAgICAqIGVsZW1lbnQgZmlyc3QsIGFuZCB0aGUgZmlyc3QgZWxlbWVudCBsYXN0KS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgdGVtcCA9IG51bGw7XG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0ZW1wID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gcHJldmlvdXM7XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBjdXJyZW50ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5sYXN0Tm9kZTtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHRlbXA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QgaW4gcHJvcGVyXG4gICAgICogc2VxdWVuY2UuXG4gICAgICogQHJldHVybiB7QXJyYXkuPCo+fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0LFxuICAgICAqIGluIHByb3BlciBzZXF1ZW5jZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChjdXJyZW50Tm9kZS5lbGVtZW50KTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHMgPD0gMDtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJyYXlzLnRvU3RyaW5nKHRoaXMudG9BcnJheSgpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubm9kZUF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAodGhpcy5uRWxlbWVudHMgLSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleCAmJiBub2RlICE9IG51bGw7IGkrKykge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY3JlYXRlTm9kZSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbGVtZW50OiBpdGVtLFxuICAgICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIExpbmtlZExpc3Q7XG59KCkpOyAvLyBFbmQgb2YgbGlua2VkIGxpc3RcbmV4cG9ydHMuZGVmYXVsdCA9IExpbmtlZExpc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MaW5rZWRMaXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIExpbmtlZExpc3RfMSA9IHJlcXVpcmUoXCIuL0xpbmtlZExpc3RcIik7XG52YXIgUXVldWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBxdWV1ZS5cbiAgICAgKiBAY2xhc3MgQSBxdWV1ZSBpcyBhIEZpcnN0LUluLUZpcnN0LU91dCAoRklGTykgZGF0YSBzdHJ1Y3R1cmUsIHRoZSBmaXJzdFxuICAgICAqIGVsZW1lbnQgYWRkZWQgdG8gdGhlIHF1ZXVlIHdpbGwgYmUgdGhlIGZpcnN0IG9uZSB0byBiZSByZW1vdmVkLiBUaGlzXG4gICAgICogaW1wbGVtZW50YXRpb24gdXNlcyBhIGxpbmtlZCBsaXN0IGFzIGEgY29udGFpbmVyLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFF1ZXVlKCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBuZXcgTGlua2VkTGlzdF8xLmRlZmF1bHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhbmQgcmVtb3ZlcyB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlRWxlbWVudEF0SW5kZXgoMCk7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcywgYnV0IGRvZXMgbm90IHJlbW92ZSwgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3QuZmlyc3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBzdGFjayBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IsIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSAocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCxcbiAgICAgKiBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuY29udGFpbnMoZWxlbSwgZXF1YWxzRnVuY3Rpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBhbmQgb25seSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIG5vIGl0ZW1zOyBmYWxzZVxuICAgICAqIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCkgPD0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgcXVldWUuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxpc3QuY2xlYXIoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHF1ZXVlIGluXG4gICAgICogRklGTyBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goY2FsbGJhY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXVlO1xufSgpKTsgLy8gRW5kIG9mIHF1ZXVlXG5leHBvcnRzLmRlZmF1bHQgPSBRdWV1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGl0ZW1cbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LjRcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXksIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZXhwb3J0cy5pbmRleE9mID0gaW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5IG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbGFzdEluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZXhwb3J0cy5sYXN0SW5kZXhPZiA9IGxhc3RJbmRleE9mO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAqL1xuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwO1xufVxuZXhwb3J0cy5jb250YWlucyA9IGNvbnRhaW5zO1xuLyoqXG4gKiBSZW1vdmVzIHRoZSBmaXJzdCBvY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGZyb20gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGNoYW5nZWQgYWZ0ZXIgdGhpcyBjYWxsLlxuICovXG5mdW5jdGlvbiByZW1vdmUoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5yZW1vdmUgPSByZW1vdmU7XG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5IGVxdWFsXG4gKiB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBkZXRlcm1pbmUgdGhlIGZyZXF1ZW5jeSBvZiB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHdob3NlIGZyZXF1ZW5jeSBpcyB0byBiZSBkZXRlcm1pbmVkLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXlcbiAqIGVxdWFsIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmcmVxdWVuY3koYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBmcmVxID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICBmcmVxKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZyZXE7XG59XG5leHBvcnRzLmZyZXF1ZW5jeSA9IGZyZXF1ZW5jeTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gc3BlY2lmaWVkIGFycmF5cyBhcmUgZXF1YWwgdG8gb25lIGFub3RoZXIuXG4gKiBUd28gYXJyYXlzIGFyZSBjb25zaWRlcmVkIGVxdWFsIGlmIGJvdGggYXJyYXlzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyXG4gKiBvZiBlbGVtZW50cywgYW5kIGFsbCBjb3JyZXNwb25kaW5nIHBhaXJzIG9mIGVsZW1lbnRzIGluIHRoZSB0d29cbiAqIGFycmF5cyBhcmUgZXF1YWwgYW5kIGFyZSBpbiB0aGUgc2FtZSBvcmRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBvbmUgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiB0aGUgb3RoZXIgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVtZW50cyBpbiB0aGUgYXJyYXlzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgdHdvIGFycmF5cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gZXF1YWxzKGFycmF5MSwgYXJyYXkyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkxLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZXF1YWxzKGFycmF5MVtpXSwgYXJyYXkyW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5lcXVhbHMgPSBlcXVhbHM7XG4vKipcbiAqIFJldHVybnMgc2hhbGxvdyBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IHRvIGNvcHkuXG4gKiBAcmV0dXJuIHtBcnJheX0gYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXlcbiAqL1xuZnVuY3Rpb24gY29weShhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5jb25jYXQoKTtcbn1cbmV4cG9ydHMuY29weSA9IGNvcHk7XG4vKipcbiAqIFN3YXBzIHRoZSBlbGVtZW50cyBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9ucyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIHN3YXAgZWxlbWVudHMuXG4gKiBAcGFyYW0ge251bWJlcn0gaSB0aGUgaW5kZXggb2Ygb25lIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBqIHRoZSBpbmRleCBvZiB0aGUgb3RoZXIgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgaXMgZGVmaW5lZCBhbmQgdGhlIGluZGV4ZXMgYXJlIHZhbGlkLlxuICovXG5mdW5jdGlvbiBzd2FwKGFycmF5LCBpLCBqKSB7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gYXJyYXkubGVuZ3RoIHx8IGogPCAwIHx8IGogPj0gYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcbiAgICBhcnJheVtpXSA9IGFycmF5W2pdO1xuICAgIGFycmF5W2pdID0gdGVtcDtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuc3dhcCA9IHN3YXA7XG5mdW5jdGlvbiB0b1N0cmluZyhhcnJheSkge1xuICAgIHJldHVybiAnWycgKyBhcnJheS50b1N0cmluZygpICsgJ10nO1xufVxuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuLyoqXG4gKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBhcnJheVxuICogc3RhcnRpbmcgZnJvbSBpbmRleCAwIHRvIGxlbmd0aCAtIDEuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gaXRlcmF0ZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBhcnJheV8xID0gYXJyYXk7IF9pIDwgYXJyYXlfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGVsZSA9IGFycmF5XzFbX2ldO1xuICAgICAgICBpZiAoY2FsbGJhY2soZWxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZm9yRWFjaCA9IGZvckVhY2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmV4cG9ydHMuaGFzID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuICAgIHJldHVybiBfaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufTtcbi8qKlxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb21wYXJlIGVsZW1lbnQgb3JkZXIuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmUoYSwgYikge1xuICAgIGlmIChhIDwgYikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHRDb21wYXJlID0gZGVmYXVsdENvbXBhcmU7XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gdGVzdCBlcXVhbGl0eS5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWZhdWx0RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSA9PT0gYjtcbn1cbmV4cG9ydHMuZGVmYXVsdEVxdWFscyA9IGRlZmF1bHRFcXVhbHM7XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29udmVydCBhbiBvYmplY3QgdG8gYSBzdHJpbmcuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdFRvU3RyaW5nKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuICAgICAgICByZXR1cm4gJyRzJyArIGl0ZW07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJyRvJyArIGl0ZW0udG9TdHJpbmcoKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHRUb1N0cmluZyA9IGRlZmF1bHRUb1N0cmluZztcbi8qKlxuKiBKb2lucyBhbGwgdGhlIHByb3BlcmllcyBvZiB0aGUgb2JqZWN0IHVzaW5nIHRoZSBwcm92aWRlZCBqb2luIHN0cmluZ1xuKi9cbmZ1bmN0aW9uIG1ha2VTdHJpbmcoaXRlbSwgam9pbikge1xuICAgIGlmIChqb2luID09PSB2b2lkIDApIHsgam9pbiA9ICcsJzsgfVxuICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdG9yZXQgPSAneyc7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gaXRlbSkge1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuaGFzKGl0ZW0sIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgam9pbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIHByb3AgKyAnOicgKyBpdGVtW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3JldCArICd9JztcbiAgICB9XG59XG5leHBvcnRzLm1ha2VTdHJpbmcgPSBtYWtlU3RyaW5nO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZnVuYykgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIHVuZGVmaW5lZC5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvYmopID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHN0cmluZy5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuLyoqXG4gKiBSZXZlcnNlcyBhIGNvbXBhcmUgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoY29tcGFyZUZ1bmN0aW9uKSB8fCAhaXNGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQsIHYpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oZCwgdikgKiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLnJldmVyc2VDb21wYXJlRnVuY3Rpb24gPSByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uO1xuLyoqXG4gKiBSZXR1cm5zIGFuIGVxdWFsIGZ1bmN0aW9uIGdpdmVuIGEgY29tcGFyZSBmdW5jdGlvbi5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBjb21wYXJlVG9FcXVhbHMoY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYSwgYikgPT09IDA7XG4gICAgfTtcbn1cbmV4cG9ydHMuY29tcGFyZVRvRXF1YWxzID0gY29tcGFyZVRvRXF1YWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCIvKiAvLy8gPHJlZmVyZW5jZSBwYXRoPVwic2NyaXB0aW5nLnRzXCIvPiAqL1xuaW1wb3J0IHtcblx0YWRkQWdlbnQsIHNldEFnZW50VmFyaWFibGUsIGFkZEl0ZW0sIGFkZExvY2F0aW9uLCBzZXRWYXJpYWJsZSwgZ2V0TmV4dExvY2F0aW9uLCBhY3Rpb24sXG5cdGdldFJhbmROdW1iZXIsIGdldFZhcmlhYmxlLCBzZXF1ZW5jZSwgc2VsZWN0b3IsIGV4ZWN1dGUsIFByZWNvbmRpdGlvbiwgZ2V0QWdlbnRWYXJpYWJsZSwgbmVnX2d1YXJkLCBndWFyZCxcblx0aXNWYXJpYWJsZU5vdFNldCwgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uLCBhZGRVc2VyQWN0aW9uLCBhZGRVc2VySW50ZXJhY3Rpb25UcmVlLCBpbml0aWFsaXplLFxuXHRnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QsIGV4ZWN1dGVVc2VyQWN0aW9uLCB3b3JsZFRpY2ssIGF0dGFjaFRyZWVUb0FnZW50LCBzZXRJdGVtVmFyaWFibGUsIGdldEl0ZW1WYXJpYWJsZSxcblx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQsIGFyZUFkamFjZW50LCBhZGRVc2VyQWN0aW9uVHJlZSwgQWdlbnRcbn0gZnJvbSBcIi4vc2NyaXB0aW5nXCI7XG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsXCI7XG5cbi8vIDEuIERlZmluZSBTdGF0ZVxuXG4vLyBMb2NhdGlvbnNcbnZhciBTVE9SQUdFID0gXCJTVE9SQUdFXCI7XG52YXIgRE9DVE9SU19PRkZJQ0UgPSBcIkRPQ1RPUlMgT0ZGSUNFXCI7XG52YXIgRU5HSU5FUyA9IFwiRU5HSU5FU1wiO1xudmFyIENPQ0tQSVQgPSBcIkNPQ0tQSVRcIjtcbnZhciBFU0NBUEVfUE9EID0gXCJFU0NBUEUgUE9EXCI7XG52YXIgVFJBTlNQT1JUX1JPT00gPSBcIlRSQU5TUE9SVCBST09NXCI7XG52YXIgTU9OSVRPUklOR19ST09NID0gXCJNT05JVE9SSU5HIFJPT01cIjtcbnZhciBNQUlOX0FSRUEgPSBcIk1BSU4gQVJFQVwiO1xudmFyIEZFTV9CRURST09NID0gXCJGRU0gQkVEUk9PTVwiO1xudmFyIE1BTEVfQkVEUk9PTSA9IFwiTUFMRSBCRURST09NXCI7XG52YXIgQkFUSFJPT00gPSBcIkJBVEhST09NXCI7XG52YXIgVU5LTk9XTiA9IFwiVU5LTk9XTlwiO1xuXG4vLyBBZGQgTG9jYXRpb25zXG5hZGRMb2NhdGlvbihFTkdJTkVTLCBbU1RPUkFHRSwgTUFJTl9BUkVBXSk7XG5hZGRMb2NhdGlvbihTVE9SQUdFLCBbRU5HSU5FUywgRE9DVE9SU19PRkZJQ0VdKTtcbmFkZExvY2F0aW9uKERPQ1RPUlNfT0ZGSUNFLCBbU1RPUkFHRSwgTUFJTl9BUkVBLCBDT0NLUElULCBNT05JVE9SSU5HX1JPT01dKTtcbmFkZExvY2F0aW9uKENPQ0tQSVQsIFtET0NUT1JTX09GRklDRV0pO1xuYWRkTG9jYXRpb24oRVNDQVBFX1BPRCwgW01BSU5fQVJFQV0pO1xuYWRkTG9jYXRpb24oVFJBTlNQT1JUX1JPT00sIFtNT05JVE9SSU5HX1JPT00sIE1BSU5fQVJFQV0pO1xuYWRkTG9jYXRpb24oTU9OSVRPUklOR19ST09NLCBbVFJBTlNQT1JUX1JPT00sIERPQ1RPUlNfT0ZGSUNFXSk7XG5hZGRMb2NhdGlvbihNQUlOX0FSRUEsIFtFTkdJTkVTLCBTVE9SQUdFLCBET0NUT1JTX09GRklDRSwgVFJBTlNQT1JUX1JPT00sIEVTQ0FQRV9QT0RdKTtcbmFkZExvY2F0aW9uKEZFTV9CRURST09NLCBbTUFJTl9BUkVBLCBCQVRIUk9PTV0pO1xuYWRkTG9jYXRpb24oTUFMRV9CRURST09NLCBbTUFJTl9BUkVBLCBCQVRIUk9PTV0pO1xuYWRkTG9jYXRpb24oQkFUSFJPT00sIFtNQUlOX0FSRUEsIEZFTV9CRURST09NLCBNQUxFX0JFRFJPT01dKTtcblxuLy8gYWdlbnRzXG52YXIgQ2FsZWIgPSBhZGRBZ2VudChcIkNhbGViXCIpO1xudmFyIFF1aW5uID0gYWRkQWdlbnQoXCJRdWlublwiKTtcbnZhciBNYXJrID0gYWRkQWdlbnQoXCJNYXJrXCIpO1xudmFyIEVkZGllID0gYWRkQWdlbnQoXCJFZGRpZVwiKTtcbnZhciBCZWF0cmljZSA9IGFkZEFnZW50KFwiQmVhdHJpY2VcIik7XG5cbi8vIGl0ZW1zXG52YXIgd2lyZXMxID0gYWRkSXRlbShcIndpcmVzMVwiKTtcbnZhciB3aXJlczIgPSBhZGRJdGVtKFwid2lyZXMyXCIpO1xuXG5cbndpcmVzMS5zZXRDdXJyZW50TG9jYXRpb24oU1RPUkFHRSk7XG53aXJlczIuc2V0Q3VycmVudExvY2F0aW9uKE1PTklUT1JJTkdfUk9PTSk7XG5cbi8vIHNldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIsIFNUT1JBR0UpO1xuLy8gc2V0SXRlbVZhcmlhYmxlKHdpcmVzMiwgXCJjdXJyZW50TG9jYXRpb25cIiwgTU9OSVRPUklOR19ST09NKTtcblxuLy8gdmFyIHdpcmVzQ29sbGVjdGVkID0gc2V0VmFyaWFibGUoXCJ3aXJlc0NvbGxlY3RlZFwiLCAwKTtcblxuLy8gLy8gdmFyaWFibGVzXG4vL0NhbGViXG4vLyBzZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImN1cnJlbnRMb2NhdGlvblwiLCBDT0NLUElUKTtcbkNhbGViLnNldEN1cnJlbnRMb2NhdGlvbihDT0NLUElUKTtcblxuLy9RdWlublxuLy8gc2V0QWdlbnRWYXJpYWJsZShRdWlubiwgXCJjdXJyZW50TG9jYXRpb25cIiwgRE9DVE9SU19PRkZJQ0UpO1xuUXVpbm4uc2V0Q3VycmVudExvY2F0aW9uKERPQ1RPUlNfT0ZGSUNFKTtcblxuLy9NYXJrXG4vLyBzZXRBZ2VudFZhcmlhYmxlKE1hcmssIFwiY3VycmVudExvY2F0aW9uXCIsIFRSQU5TUE9SVF9ST09NKTtcbk1hcmsuc2V0Q3VycmVudExvY2F0aW9uKFRSQU5TUE9SVF9ST09NKTtcblxuLy9FZGRpZVxuLy8gc2V0QWdlbnRWYXJpYWJsZShFZGRpZSwgXCJjdXJyZW50TG9jYXRpb25cIiwgU1RPUkFHRSk7XG5FZGRpZS5zZXRDdXJyZW50TG9jYXRpb24oU1RPUkFHRSk7XG5cbi8vQmVhdHJpY2Vcbi8vIHNldEFnZW50VmFyaWFibGUoQmVhdHJpY2UsIFwiY3VycmVudExvY2F0aW9uXCIsIEVOR0lORVMpO1xuQmVhdHJpY2Uuc2V0Q3VycmVudExvY2F0aW9uKEVOR0lORVMpO1xuXG4vLyBQbGF5ZXJcbnZhciBwbGF5ZXJMb2NhdGlvbiA9IHNldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIiwgTUFJTl9BUkVBKTtcbnZhciB3aXJlc0NvbGxlY3RlZCA9IHNldFZhcmlhYmxlKFwid2lyZXNDb2xsZWN0ZWRcIiwgMCk7XG5cblxuLy8gS25vd2xlZGdlIFxuQ2FsZWIuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XG5RdWlubi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcbk1hcmsuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XG5FZGRpZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcbkJlYXRyaWNlLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xuXG4vLyBzZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImxhc3RTZWVuOndpcmVzMVwiLCBVTktOT1dOKVxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJsYXN0U2Vlbjp3aXJlczJcIiwgVU5LTk9XTilcbi8vIHNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46cGxheWVyXCIsIFVOS05PV04pXG5cbkNhbGViLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIFVOS05PV04pO1xuLy8gQ2FsZWIuc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24ocGxheWVyLCBVTktOT1dOKTtcblF1aW5uLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIFVOS05PV04pO1xuLy8gUXVpbm4uc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24ocGxheWVyLCBVTktOT1dOKTtcbk1hcmsuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XG4vLyBNYXJrLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5FZGRpZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcbi8vIEVkZGllLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5CZWF0cmljZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcbi8vIEJlYXRyaWNlLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5cblxuLy8gR29hbHMgZm9yIHRoZSBwbGF5ZXJcblxuLy8gMDogVW5rbm93bi9Jbml0aWFsIFN0YXRlXG4vLyAxOiBGb3VuZCBvdXQgYWJvdXQgRmF1bHQ6MS4gTmV3IEdvYWwuIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9MClcbi8vIDI6IEZpeGVkIEZhdWx0OjEgKG9ubHkgb2NjdXJzIGlmIHN0YXR1cz0xKVxuLy8gMzogRm91bmQgb3V0IGFib3V0IEZhdWx0OjIuIE5ldyBHb2FsIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9Milcbi8vIDQ6IEZpeGVkIEZhdWx0OjIgKG9ubHkgb2NjdXJzIGlmIHN0YXR1cz0zKSBcbi8vIGV0Yy4gZXRjLlxudmFyIGdvYWxfYnJva2VuX3RyYW5zcG9ydCA9IHNldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIsIDApO1x0XHQvLyBtYXg6NFxuXG5cblxuLy8gLy8gMi4gRGVmaW5lIEJUc1xuLy8gLy8gY3JlYXRlIGdyb3VuZCBhY3Rpb25zXG5cbi8vIFRvZG8gZnJvbSBoZXJlXG4vLyBmdW5jdGlvbiBmdW5jdGlvbl9uYW1lKGFyZ3VtZW50KSB7XG4vLyBcdC8vIGJvZHkuLi5cbi8vIH1cblxuXG5mdW5jdGlvbiBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudDogQWdlbnQsIGRlc3RpbmF0aW9uOiBzdHJpbmcgPSBcIlVOS05PV05cIikge1xuXG5cdGlmKGRlc3RpbmF0aW9uID09IFwiVU5LTk9XTlwiKXtcblx0XHRsZXQgc2V0UmFuZE51bWJlciA9IGFjdGlvbihcblx0XHRcdCgpID0+IHRydWUsXG5cdFx0XHQoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID0gZ2V0UmFuZE51bWJlcigxLCAxMSksXG5cdFx0XHQwXG5cdFx0KTtcblxuXHRcdC8vIFNhc2hhIFRvZG86IFdvcmsgb24gdXNpbmcgdGhlIEFnZW50L0l0ZW0gdHlwZXMgZm9yIGRlc3RpbmF0aW9uc1xuXHRcdGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFTkdJTkVTLCAwKTtcblx0XHRsZXQgY2hvb3NlU1RPUkFHRSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDIsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gU1RPUkFHRSwgMCk7XG5cdFx0bGV0IGNob29zZURPQ1RPUlNfT0ZGSUNFID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBET0NUT1JTX09GRklDRSwgMCk7XG5cdFx0bGV0IGNob29zZUNPQ0tQSVQgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA0LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IENPQ0tQSVQsIDApO1xuXHRcdGxldCBjaG9vc2VFU0NBUEVfUE9EID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFU0NBUEVfUE9ELCAwKTtcblx0XHRsZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA2LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IFRSQU5TUE9SVF9ST09NLCAwKTtcblx0XHRsZXQgY2hvb3NlTU9OSVRPUklOR19ST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNT05JVE9SSU5HX1JPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNQUlOX0FSRUEgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA4LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BSU5fQVJFQSwgMCk7XG5cdFx0bGV0IGNob29zZUZFTV9CRURST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gOSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBGRU1fQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZU1BTEVfQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDEwLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZUJBVEhST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMTEsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQkFUSFJPT00sIDApO1xuXG5cdFx0bGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlcXVlbmNlKFtcblx0XHRcdHNldFJhbmROdW1iZXIsXG5cdFx0XHRzZWxlY3RvcihbXG5cdFx0XHRcdGNob29zZUVOR0lORVMsXG5cdFx0XHRcdGNob29zZUNPQ0tQSVQsXG5cdFx0XHRcdGNob29zZVNUT1JBR0UsXG5cdFx0XHRcdGNob29zZURPQ1RPUlNfT0ZGSUNFLFxuXHRcdFx0XHRjaG9vc2VCQVRIUk9PTSxcblx0XHRcdFx0Y2hvb3NlTUFMRV9CRURST09NLFxuXHRcdFx0XHRjaG9vc2VGRU1fQkVEUk9PTSxcblx0XHRcdFx0Y2hvb3NlTUFJTl9BUkVBLFxuXHRcdFx0XHRjaG9vc2VNT05JVE9SSU5HX1JPT00sXG5cdFx0XHRcdGNob29zZVRSQU5TUE9SVF9ST09NLFxuXHRcdFx0XHRjaG9vc2VFU0NBUEVfUE9EXG5cdFx0XHRdKVxuXHRcdF0pO1xuXHRcdHJldHVybiBzZXROZXh0RGVzdGluYXRpb247XG5cblx0fVxuXHRlbHNle1xuXHRcdGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEVOR0lORVMsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRU5HSU5FUywgMCk7XG5cdFx0bGV0IGNob29zZVNUT1JBR0UgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gU1RPUkFHRSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBTVE9SQUdFLCAwKTtcblx0XHRsZXQgY2hvb3NlRE9DVE9SU19PRkZJQ0UgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRE9DVE9SU19PRkZJQ0UsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRE9DVE9SU19PRkZJQ0UsIDApO1xuXHRcdGxldCBjaG9vc2VDT0NLUElUID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IENPQ0tQSVQsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQ09DS1BJVCwgMCk7XG5cdFx0bGV0IGNob29zZUVTQ0FQRV9QT0QgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRVNDQVBFX1BPRCwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFU0NBUEVfUE9ELCAwKTtcblx0XHRsZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gVFJBTlNQT1JUX1JPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gVFJBTlNQT1JUX1JPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNT05JVE9SSU5HX1JPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gTU9OSVRPUklOR19ST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1PTklUT1JJTkdfUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZU1BSU5fQVJFQSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBNQUlOX0FSRUEsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gTUFJTl9BUkVBLCAwKTtcblx0XHRsZXQgY2hvb3NlRkVNX0JFRFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRkVNX0JFRFJPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRkVNX0JFRFJPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNQUxFX0JFRFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gTUFMRV9CRURST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZUJBVEhST09NID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEJBVEhST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEJBVEhST09NLCAwKTtcblxuXG5cdFx0bGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlbGVjdG9yKFtcblx0XHRcdGNob29zZUVOR0lORVMsXG5cdFx0XHRjaG9vc2VDT0NLUElULFxuXHRcdFx0Y2hvb3NlU1RPUkFHRSxcblx0XHRcdGNob29zZURPQ1RPUlNfT0ZGSUNFLFxuXHRcdFx0Y2hvb3NlQkFUSFJPT00sXG5cdFx0XHRjaG9vc2VNQUxFX0JFRFJPT00sXG5cdFx0XHRjaG9vc2VGRU1fQkVEUk9PTSxcblx0XHRcdGNob29zZU1BSU5fQVJFQSxcblx0XHRcdGNob29zZU1PTklUT1JJTkdfUk9PTSxcblx0XHRcdGNob29zZVRSQU5TUE9SVF9ST09NLFxuXHRcdFx0Y2hvb3NlRVNDQVBFX1BPRFxuXHRcdF0pO1xuXG5cdFx0cmV0dXJuIHNldE5leHREZXN0aW5hdGlvbjtcblx0fVxuXG59XG5cblxubGV0IHNldERlc3RpbmF0aW9uUHJlY29uZEZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50KXtcblx0bGV0IHNldERlc3RpbmF0aW9uUHJlY29uZDogUHJlY29uZGl0aW9uID0gKCkgPT4gaXNVbmRlZmluZWQoYWdlbnQuZGVzdGluYXRpb24pIHx8IGFnZW50LmRlc3RpbmF0aW9uID09IGFnZW50LmN1cnJlbnRMb2NhdGlvbjtcblx0cmV0dXJuIHNldERlc3RpbmF0aW9uUHJlY29uZDtcdFxufVxuXG4vLyAvLyBjcmVhdGUgYmVoYXZpb3IgdHJlZXNcblxuXG5sZXQgZ290b05leHRMb2NhdGlvbkZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50KXtcblx0cmV0dXJuICBhY3Rpb24oXG5cdFx0KCkgPT4gdHJ1ZSxcblx0XHQoKSA9PiB7XG5cdFx0XHRhZ2VudC5jdXJyZW50TG9jYXRpb24gPSBnZXROZXh0TG9jYXRpb24oYWdlbnQuY3VycmVudExvY2F0aW9uLCBhZ2VudC5kZXN0aW5hdGlvbik7XG5cdFx0XHRjb25zb2xlLmxvZyhhZ2VudCwgXCIgYXQ6IFwiLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdH0sXG5cdFx0MFxuXHQpO1xufVxuXG5cbmxldCBsYXN0U2VlbkJ5QWdlbnQgPSBmdW5jdGlvbihhZ2VudCl7XG5cdHJldHVybiBzZXF1ZW5jZShbXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0YWN0aW9uKFxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uID09IHdpcmVzMS5jdXJyZW50TG9jYXRpb24sXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudCwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuXHRcdFx0XHRcdC8vZWZmZWN0XG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gSXRlbTogd2lyZXMxIHwgTG9jYXRpb246IFwiKyBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coYWdlbnROYW1lICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMSB8IExvY2F0aW9uOiBcIisgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSk7XG5cdFx0XHRcdFx0XHQvLyBzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczFcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXG5cdFx0XHRcdFx0XHRhZ2VudC5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXG5cdFx0XHRcdFx0MFxuXHRcdFx0XHQpLFxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXG5cdFx0XSksXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0YWN0aW9uKFxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uID09IHdpcmVzMi5jdXJyZW50TG9jYXRpb24sXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMyLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcblx0XHRcdFx0XHQvL2VmZmVjdFxuXHRcdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50ICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMiB8IExvY2F0aW9uOiBcIisgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwic2VlcyAtIEl0ZW06IHdpcmVzMiB8IExvY2F0aW9uOiBcIitnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcblx0XHRcdFx0XHRcdGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHQvLyBzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczJcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvL3RpbWUgdGFrZW5cblx0XHRcdFx0XHQwXG5cdFx0XHRcdCksXG5cdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge30sMClcblx0XHRdKSxcblx0XHRzZWxlY3RvcihbXG5cdFx0XHRhY3Rpb24oXG5cdFx0XHRcdFx0Ly9wcmVjb25kaXRpb25cblx0XHRcdFx0XHQoKSA9PiBhZ2VudC5jdXJyZW50TG9jYXRpb24gID09IGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIiksXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpLFxuXHRcdFx0XHRcdC8vZWZmZWN0XG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gUGVyc29uOiBQbGF5ZXIgfCBMb2NhdGlvbjogXCIrIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhhZ2VudE5hbWUgKyBcInNlZXMgLSBQZXJzb246IFBsYXllciB8IExvY2F0aW9uOiBcIitnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcblx0XHRcdFx0XHRcdC8vIGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHRhZ2VudC5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbigncGxheWVyJywgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdC8vIHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImxhc3RTZWVuOnBsYXllclwiLCAgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vdGltZSB0YWtlblxuXHRcdFx0XHRcdDBcblx0XHRcdFx0KSxcblx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7fSwwKVxuXHRcdF0pXG5cdF0pO1xufTtcblxuXG4vLyBsZXQgZmluZEl0ZW0gPSBhY3Rpb24oXG4vLyAgICAgKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuLy8gICAgICgpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJDYWxlYiBmb3VuZCAtIEl0ZW06IHdpcmVzMVwiKVxuXG5cbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoZWxsb1wiKTtcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcbi8vICAgICAgICAgLy8gZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiQ2FsZWIgZm91bmQgdGhlIHdpcmVzMS5cIilcbi8vICAgICB9LCBcbi8vICAgICAwXG4vLyApO1xuXG4vLyBsZXQgZWF0UGxheWVyID0gYWN0aW9uKCgpID0+IGdldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSxcbi8vICAgICAoKSA9PiB7XG4vLyAgICAgICAgIHNldFZhcmlhYmxlKFwiZW5kR2FtZVwiLCBcImxvc2VcIik7XG4vLyAgICAgICAgIHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBcIk5BXCIpO1xuLy8gICAgIH0sIDBcbi8vICk7XG5cbi8vdGhpcyBtZXNzXG4vLyBsZXQgY29udmVyc2F0aW9uID0gYWN0aW9uKCgpID0+IGdldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSxcbi8vICAgICAoKSA9PiB7XG4vLyAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgaGFwcGVuIHRvIHJ1biBpbnRvIENhbGViLlwiKSxcbi8vICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkNhbGViOiBIYXZlIHlvdSBub3QgZm91bmQgdGhlIHdpcmVzIHlldD8gRGlkIHlvdSBub3QgY2hlY2sgc3RvcmFnZT9cIiksXG4vLyAgICAgfSxcbi8vICk7XG5cbi8vIGxldCBzZWFyY2ggPSBzZWxlY3RvcihbXG4vLyAgICAgZmluZEl0ZW0sXG4vLyAgICAgc2VxdWVuY2UoW1xuLy8gICAgICAgICBzZWxlY3RvcihbXG4vLyAgICAgICAgICAgICBndWFyZChzZXREZXN0aW5hdGlvblByZWNvbmQsIHt9LCBzZXROZXh0RGVzdGluYXRpb24pLFxuLy8gICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcbi8vICAgICAgICAgICAgIH0sIHt9LCAwKVxuLy8gICAgICAgICBdKSxcbi8vICAgICAgICAgZ290b05leHRMb2NhdGlvbixcbi8vICAgICAgICAgZmluZEl0ZW1cbi8vICAgICBdKVxuLy8gXSk7XG5cbmxldCBzZWFyY2hGb3JBZ2VudCA9IGZ1bmN0aW9uKGFnZW50OiBBZ2VudCl7XG5cdGxldCBzZWFyY2ggPSBzZXF1ZW5jZShbXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0Z3VhcmQoc2V0RGVzdGluYXRpb25QcmVjb25kRm9yQWdlbnQoYWdlbnQpLCBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudCkpLFxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcblx0XHRcdH0sMClcblx0XHRdKSxcblx0XHRnb3RvTmV4dExvY2F0aW9uRm9yQWdlbnQoYWdlbnQpLFxuXHRdKTtcblxuXHRyZXR1cm4gc2VhcmNoXG59XG5cbmxldCBDYWxlYkJUID0gc2VxdWVuY2UoW1xuXHRsYXN0U2VlbkJ5QWdlbnQoQ2FsZWIpLFxuXHRzZXF1ZW5jZShbXG5cdFx0c2VhcmNoRm9yQWdlbnQoQ2FsZWIpLCBsYXN0U2VlbkJ5QWdlbnQoQ2FsZWIpXG5cdF0pXG5dKTtcblxubGV0IFF1aW5uQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlBZ2VudChRdWlubiksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChRdWlubiksIGxhc3RTZWVuQnlBZ2VudChRdWlubilcblx0XSlcbl0pO1xuXG5sZXQgTWFya0JUID0gc2VxdWVuY2UoW1xuXHRsYXN0U2VlbkJ5QWdlbnQoTWFyayksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChNYXJrKSwgbGFzdFNlZW5CeUFnZW50KE1hcmspXG5cdF0pXG5dKTtcblxubGV0IEVkZGllQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlBZ2VudChFZGRpZSksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChFZGRpZSksIGxhc3RTZWVuQnlBZ2VudChFZGRpZSlcblx0XSlcbl0pO1xuXG5sZXQgQmVhdHJpY2VCVCA9IHNlcXVlbmNlKFtcblx0bGFzdFNlZW5CeUFnZW50KEJlYXRyaWNlKSxcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaEZvckFnZW50KEJlYXRyaWNlKSwgbGFzdFNlZW5CeUFnZW50KEJlYXRyaWNlKVxuXHRdKVxuXSk7XG5cbi8vIC8vYXR0YWNoIGJlaGF2aW91ciB0cmVlcyB0byBhZ2VudHNcbmF0dGFjaFRyZWVUb0FnZW50KENhbGViLCBDYWxlYkJUKTtcbmF0dGFjaFRyZWVUb0FnZW50KFF1aW5uLCBRdWlubkJUKTtcbmF0dGFjaFRyZWVUb0FnZW50KE1hcmssIE1hcmtCVCk7XG5hdHRhY2hUcmVlVG9BZ2VudChFZGRpZSwgRWRkaWVCVCk7XG5hdHRhY2hUcmVlVG9BZ2VudChCZWF0cmljZSwgQmVhdHJpY2VCVCk7XG5cbi8vIC8vIDMuIENvbnN0cnVjdCBzdG9yeVxuLy8gLy8gY3JlYXRlIHVzZXIgYWN0aW9uc1xuXG5cbnNldFZhcmlhYmxlKFwidGhlU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiU3RvcmFnZVN0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiQ29ja3BpdFN0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIk1vbml0b3JpbmdTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiLDApO1xuXG52YXIgTWFpbkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1BSU5fQVJFQSxcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHNoaXAncyBtYWluIGFyZWEuXCIpLFxuICAgICAgICAgICAgc2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwidGhlU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSXQgd2FzIGEgc2ltcGxlIG1pc3Npb246IGFuZCBvbiB0aGUgbmV3bHktZGlzY292ZXJlZCBwbGFuZXQgU2lndXJvbiwgdGVsZXBvcnQgY3JldyBtZW1iZXJzIGRvd24gdG8gaXRzIHN1cmZhY2UsIGFuZCBzZWN1cmUgYW5kIGRvY3VtZW50IG5ldyBpbmZvcm1hdGlvbi4gUGFydCB0d28gd2FzIHdoZW4gZXZlcnl0aGluZyB3ZW50IGF3cnkuIEFzIG1vc3Qgb2YgdGhlIGNyZXcgZ2F0aGVyZWQgaW50byB0aGUgdHJhbnNwb3J0IGJheSwgdGhlIGNvbW1hbmRlciBhbmQgYSBmZXcgb3RoZXJzIHN0YXllZCBiZWhpbmQgdG8gbW9uaXRvciB0aGUgZXhwbG9yYXRpb24uIFRoZSB0ZWxlcG9ydGF0aW9uIHByb2Nlc3MgYmVnYW4sIHlldCBpbW1lZGlhdGVseSBhIG1hc3NpdmUgc3lzdGVtcyBmYWlsdXJlIG9jY3VycmVkLiBUaG9zZSB3aG8gaGFkIGJlZW4gYXdhaXRpbmcgdGVsZXBvcnRhdGlvbiB3ZXJlIGdvbmUsIGFzc3VtZWQgZGVhZC4gVGhlIGNvbW1hbmRlciBjb21lcyB0byBhcyB0aGUgc2hpcCBpcyBwbHVtbWV0aW5nIGZyb20gb3JiaXQsIGhpcyBjcmV3bWF0ZXMgeWVsbGluZyBhdCBlYWNoIG90aGVyLiBUaGVyZSBpcyBvbmx5IG9uZSBlc2NhcGUgcG9kIHJlbWFpbmluZy4gWW91IG11c3QgdGFrZSBjb250cm9sIG9mIHRoZSBzaGlwIGFuZCByZW1haW5pbmcgY3JldyB0byBzYXZlIGV2ZXJ5b25lIGZyb20gY2VydGFpbiBkZWF0aC5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwidGhlU3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHNoaXAncyBtYWluIGFyZWEuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkdvIG5vcnRoIHRvIGVudGVyIHRoZSBlbmdpbmUgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEVOR0lORVMpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBub3J0aGVhc3QgdG8gZW50ZXIgdGhlIHN0b3JhZ2Ugcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFNUT1JBR0UpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBlYXN0IHRvIGVudGVyIHRoZSBjb2NrcGl0LlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQ09DS1BJVCkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHNvdXRoZWFzdCB0byBlbnRlciB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRE9DVE9SU19PRkZJQ0UpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBzb3V0aCBpbnRvIHRoZSBtb25pdG9yaW5nIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNT05JVE9SSU5HX1JPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBzb3V0aCBpbnRvIHRoZSB0cmFuc3BvcnQgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRSQU5TUE9SVF9ST09NKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGh3ZXN0IHRvIGVudGVyIHRoZSBlc2NhcGUgcG9kLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRVNDQVBFX1BPRCkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHdlc3QgdG8gZW50ZXIgdGhlIGJhdGhyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkFUSFJPT00pKSxcblxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShNYWluQlQpO1xuXG52YXIgRW5naW5lQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRU5HSU5FUyxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGVuZ2luZSByb29tIGlzIHdoZXJlIEJlYXRyaWNlIHNwZW5kcyBtb3N0IG9mIGhlciB0aW1lLiBTaGXigJlzIGEgbmF0dXJhbCB3aGVuIGl0IGNvbWVzIHRvIHByb2JsZW0gc29sdmluZywgYnV0IGhlciB1bmFwcHJvYWNoYWJsZSBhbmQgdW5mcmllbmRseSBwZXJzb25hbGl0eSB0dXJuZWQgbWFueSBpbmZsdWVudGlhbCBjb21tYW5kZXJzIGF3YXkgZnJvbSBoZXIuIERlc3BpdGUgaGVyIHBlcnNvbmFsaXR5LCBoZXIgZW5naW5lZXJpbmcgc2tpbGxzIGFyZSBzZWNvbmQtdG8tbm9uZS4uLmdyYW50ZWQgc2hlIGlzIHRoZSBvbmx5IGVuZ2luZWVyIGxlZnQuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkVuZ2luZVN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGVuZ2luZSByb29tLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJIZWFkIGVhc3QgaW50byB0aGUgc3RvcmFnZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgU1RPUkFHRSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHQvL09wdGlvbmFsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoRW5naW5lQlQpO1xuXG52YXIgU3RvcmFnZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFNUT1JBR0UsXG5cdHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlN0b3JhZ2VTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgc3RvcmFnZSByb29tIGlzIHdoZXJlIEVkZGllIHNwZW5kcyBoaXMgdGltZSBhbmQgc3RvcmVzIGhpcyBqYW5pdG9yIGVxdWlwbWVudC4gT2xkIGFzIGhlIGlzLCBoZSBzdGlsbCBkb2VzIGhpcyBiZXN0IHRvIGNvbnRyaWJ1dGUgdG8gdGhlIHRlYW0gaW4gd2hhdGV2ZXIgd2F5IGhlIGNhbiwgZGVzcGl0ZSBsYWNraW5nIHRlY2huaWNhbCBza2lsbHMgdGhlIG90aGVyIGNyZXdtYXRlcyBlbXBsb3kuIEFsdGhvdWdoIGhlIGlzIGEgd2VsbC1rbm93biBoZXJvIGFtb25nIG1pbGl0YXJ5IHBlcnNvbm5lbCwgaGlzIGNyZXdtYXRlcyBjb250aW51ZSB0byByZW1haW4gb2JsaXZpb3VzIHRvIHRoZSBmYWN0IHRoYXQgdGhlIG1hbiB3aG8gc2NydWJzIHRoZWlyIHRvaWxldHMgaGFkIGJlZW4gb25lIG9mIHRoZSBtb3N0IGFjY29tcGxpc2hlZCBtaWxpdGFyeSBvZmZpY2VycyB0aGUgdW5pdmVyc2UgaGFkIGV2ZXIgc2Vlbi5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4geyAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIlN0b3JhZ2VTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlN0b3JhZ2VTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlZCBpbnRvIHRoZSBzdG9yYWdlIHJvb20uXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgaW50byB0aGUgZW5naW5lIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFTkdJTkVTKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdC8vT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShTdG9yYWdlQlQpO1xuXG52YXIgRHJPZmZpY2VCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBET0NUT1JTX09GRklDRSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRHJPZmZpY2VTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJEci4gUXVpbm4gc3BlbmRzIGEgbG90IG9mIHRpbWUgaW4gaGVyIG9mZmljZSBsb29raW5nIGFmdGVyIHBhdGllbnRzLiBTaGUgcHV0cyBhbGwgb3RoZXJzIGFib3ZlIGhlcnNlbGY7IHNoZSBpcyBjb25zdGFudGx5IGNvbmNlcm5lZCB3aXRoIHRoZSB3ZWxsLWJlaW5nIG9mIGhlciBjcmV3bWF0ZXMuIFRoZSBwcm9zcGVjdCBvZiBoZXIgcGF0aWVudHMgZHlpbmcgc3RpbGwga2VlcHMgaGVyIHVwIGF0IG5pZ2h0LCBidXQgaGVyIGRldGVybWluYXRpb24gdG8gc2F2ZSBhcyBtYW55IHBlb3BsZSBhcyBzaGUgY2FuIGlzIHdoYXQga2VlcHMgaGVyIGdvaW5nLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJEck9mZmljZVN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRHJPZmZpY2VTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIGludG8gdGhlIGNvY2twaXQuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT0NLUElUKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gdG8gdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1PTklUT1JJTkdfUk9PTSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKERyT2ZmaWNlQlQpO1xuXG52YXIgQ29ja3BpdEJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IENPQ0tQSVQsXG5cdHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNvY2twaXRTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgY29ja3BpdCBpcyB3aGVyZSBUYXlsb3IgcGlsb3RzIHRoZSBzaGlwLCBidXQgQ2FsZWIgc3BlbmRzIGEgbG90IG9mIGhpcyB0aW1lIHRoZXJlIGFzIHdlbGwuIENhbGViIHJ1bnMgdGhpbmdzIHZlcnkgZGlmZmVyZW50bHkgZnJvbSBUYXlsb3I7IGhlIGlzIGEgZGVtYW5kaW5nIGxlYWRlciB3aG8gaGFyc2hseSBjcml0aWNpemVzIGhpcyBjcmV3bWF0ZXMgd2hlbiBmYWlsdXJlcyBvY2N1ci4gSGUgc2VjcmV0bHkgbG9hdGhlcyBUYXlsb3I7IHRoZWlyIHBlcnNvbmFsaXRpZXMgY2xhc2ggYWxsLXRvby1mcmVxdWVudGx5LCBhbmQgdGhlaXIgcG9zaXRpb24gb24gdGhlIHNoaXAgZGVzcGl0ZSBoaXMgb2xkZXIgYWdlIGlzIGEgY29uc3RhbnQgc291cmNlIG9mIGFuZ2VyIHRvIHRoZSBvZmZpY2VyLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJDb2NrcGl0U3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDb2NrcGl0U3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGludG8gdGhlIGNvY2twaXQuXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgdG8gdGhlIGRvY3RvcidzIG9mZmljZS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIERPQ1RPUlNfT0ZGSUNFKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRdKSksXG5cbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShDb2NrcGl0QlQpO1xuXG52YXIgTW9uaXRvcmluZ0JUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1PTklUT1JJTkdfUk9PTSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTW9uaXRvcmluZ1N0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBtb25pdG9yaW5nIHJvb20gaXMgcHVycG9zZWQgdG8gc2VlIGludG8gdGhlIHRyYW5zcG9ydCByb29tLCB0aHVzIHdhdGNoaW5nIGZvciBzaWducyBvZiB0cm91YmxlIHdpdGggdGhlIHRyYW5zcG9ydGVyLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJNb25pdG9yaW5nU3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNb25pdG9yaW5nU3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRE9DVE9SU19PRkZJQ0UpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyB0byB0aGUgdHJhbnNwb3J0IHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUUkFOU1BPUlRfUk9PTSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXG5cdFx0XHRdKSksXG5cbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShNb25pdG9yaW5nQlQpO1xuXG52YXIgVHJhbnNwb3J0QlQgPSBndWFyZChcblx0KCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFRSQU5TUE9SVF9ST09NLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRzZWxlY3RvcihbXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJXaGVyZSB0aGUgdHJhbnNwb3J0ZXIgaXMgbG9jYXRlZCBhbmQgd2hlcmUgdGhlIGZhaWx1cmUgb2NjdXJyZWQuIE1hcmsgb2Z0ZW4gd29ya3MgaW4gaGVyZS4gTWFyayBpcyBhbiBvbGRlciBjcmV3bWF0ZSB3aG8gYXZvaWRzIHRoZSBzcG90bGlnaHQgbGlrZSB0aGUgcGxhZ3VlLiBIaXMgYW54aWV0eSBsZXZlbHMgc2hvdCB1cCByYXBpZGx5IGFmdGVyIHRoZSBmYWlsdXJlLCBhbmQgaGUgaXMgZXhjZXNzaXZlbHkgd29ycmllZCB0aGF0IHRoZSByZXN0IG9mIHRoZSBjcmV3IGJsYW1lcyB0aGUgZmFpbHVyZSBvbiBoaW0uXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIlRyYW5zcG9ydFN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX3RyYW5zcG9ydCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVHJhbnNwb3J0U3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICBcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgdHJhbnNwb3J0IHJvb20gd2hlcmUgdGhlIHRlbGVwb3J0ZXIgaXMgbG9jYXRlZC5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBpbnRvIHRoZSBtb25pdG9yaW5nIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNT05JVE9SSU5HX1JPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFeGl0IHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblxuXHRcdFx0XHRcdFx0Ly8gR29hbCBvcHRpb25zIGZvciB0aGUgcm9vbSAtPiBPbmx5IHNob3dpbmcgdGhlc2Ugd2hlbiB0aGUgbWFpbiBoZWxwIHRleHQgaXMgb2ZmLiBcblx0XHRcdFx0XHRcdHNlbGVjdG9yKFtcblx0XHRcdCAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiT2ggTm8sIHRoZSBmaXJzdCB0aGluZyBicm9rZS4gWFlaIGNhbiBmaXggaXQgdGhlIGJlc3QuIEJ1dCBBQkMgaXMgYWxzbyBhIGdvb2QgcGVyc29uIHRvIGFzayBmb3IgaGVscFwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiLCAxKTtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAxLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgZmlyc3QgdGhpbmcgaXMgc3RpbGwgYnJva2VuLiBHbyBmaW5kIHNvbWVvbmUgdG8gZml4IGl0LlwiKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMixcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGZpcnN0IHRoaW5nIHdhcyBmaXhlZCwgYnV0IG5vdyB0aGUgc2Vjb25kIHRoaW5nIGlzIGJyb2tlbj8gR28gZmluZCBFRkcgdG8gZml4IHRoZSBzYW1lLlwiKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHRcdFx0XHRdKVxuXHRcdFx0XHRcdF0pLFxuXHRcdFx0XHQpXG5cbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblxuICAgICAgICAgICAgLy8gT3dhaXMgOiBTYW5pdHkgQ2hlY2sgXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgXHQvLyBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMSwgKCk9PntcbiAgICAgICAgICAgIFx0Ly8gXHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGlzIHJvb20gaXMgc3RpbGwgYnJva2VuLiBHbyBmaW5kIHNvbWVvbmUgdG8gZml4IGl0LlwiKTtcbiAgICAgICAgICAgIFx0Ly8gfSwgMCksXG5cbiAgICAgICAgICAgIFx0Ly8gZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiRGVmYXVsdCBoZXJlXCIpXG4gICAgICAgIFx0XG4gICAgICAgICAgICBcblx0XHRdKVxuXHQpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShUcmFuc3BvcnRCVCk7XG5cbnZhciBFc2NhcGVQb2RCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBFU0NBUEVfUE9ELFxuXHRzZXF1ZW5jZShbXG5cdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlcmUgaXMgb25seSBvbmUgZXNjYXBlIHBvZCBhYm9hcmQgdGhpcyBzaGlwLiBJZiBhbnkgY3Jld21hdGUgYmVjb21lcyB0b28gZmVhcmZ1bCBvZiB0aGVpciBjdXJyZW50IHNpdHVhdGlvbiwgdGhleSB3aWxsIGF0dGVtcHQgdG8gbGVhdmUgaW4gaXQuXCIpLFxuICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFx0XSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICBcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZXNjYXBlIHBvZC5cIiksXG5cdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXG5cdFx0XHRcdF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgLy8gT3B0aW9uYWxcblx0XHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgXSksXG5cdF0pXG4pO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShFc2NhcGVQb2RCVCk7XG5cbnZhciBGQmVkcm9vbUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEZFTV9CRURST09NLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHQvLyBzZWxlY3RvcihbXG4gICAvLyAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiKSA9PSAwLFxuICAgLy8gICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAvLyAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJJdCB3YXMgYSBzaW1wbGUgbWlzc2lvbjogYW5kIG9uIHRoZSBuZXdseS1kaXNjb3ZlcmVkIHBsYW5ldCBTaWd1cm9uLCB0ZWxlcG9ydCBjcmV3IG1lbWJlcnMgZG93biB0byBpdHMgc3VyZmFjZSwgYW5kIHNlY3VyZSBhbmQgZG9jdW1lbnQgbmV3IGluZm9ybWF0aW9uLiBQYXJ0IHR3byB3YXMgd2hlbiBldmVyeXRoaW5nIHdlbnQgYXdyeS4gQXMgbW9zdCBvZiB0aGUgY3JldyBnYXRoZXJlZCBpbnRvIHRoZSB0cmFuc3BvcnQgYmF5LCB0aGUgY29tbWFuZGVyIGFuZCBhIGZldyBvdGhlcnMgc3RheWVkIGJlaGluZCB0byBtb25pdG9yIHRoZSBleHBsb3JhdGlvbi4gVGhlIHRlbGVwb3J0YXRpb24gcHJvY2VzcyBiZWdhbiwgeWV0IGltbWVkaWF0ZWx5IGEgbWFzc2l2ZSBzeXN0ZW1zIGZhaWx1cmUgb2NjdXJyZWQuIFRob3NlIHdobyBoYWQgYmVlbiBhd2FpdGluZyB0ZWxlcG9ydGF0aW9uIHdlcmUgZ29uZSwgYXNzdW1lZCBkZWFkLiBUaGUgY29tbWFuZGVyIGNvbWVzIHRvIGFzIHRoZSBzaGlwIGlzIHBsdW1tZXRpbmcgZnJvbSBvcmJpdCwgaGlzIGNyZXdtYXRlcyB5ZWxsaW5nIGF0IGVhY2ggb3RoZXIuIFRoZXJlIGlzIG9ubHkgb25lIGVzY2FwZSBwb2QgcmVtYWluaW5nLiBZb3UgbXVzdCB0YWtlIGNvbnRyb2wgb2YgdGhlIHNoaXAgYW5kIHJlbWFpbmluZyBjcmV3IHRvIHNhdmUgZXZlcnlvbmUgZnJvbSBjZXJ0YWluIGRlYXRoLlwiKSxcbiAgIC8vICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiLCAxKTtcbiAgIC8vICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAvLyAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgLy8gICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIpID09IDEsXG4gICAvLyAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBpbnRvIHRoZSBmZW1hbGVzJyBiZWRyb29tLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIGJhdGhyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkFUSFJPT00pKSxcbi8vIF0pKSxcblxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdC8vIF1cblx0XHQpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShGQmVkcm9vbUJUKTtcblxudmFyIEJhdGhyb29tQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQkFUSFJPT00sXG5cdHNlcXVlbmNlKFtcblx0XHRcdC8vIHNlbGVjdG9yKFtcbiAgIC8vICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIpID09IDAsXG4gICAvLyAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgIC8vICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkl0IHdhcyBhIHNpbXBsZSBtaXNzaW9uOiBhbmQgb24gdGhlIG5ld2x5LWRpc2NvdmVyZWQgcGxhbmV0IFNpZ3Vyb24sIHRlbGVwb3J0IGNyZXcgbWVtYmVycyBkb3duIHRvIGl0cyBzdXJmYWNlLCBhbmQgc2VjdXJlIGFuZCBkb2N1bWVudCBuZXcgaW5mb3JtYXRpb24uIFBhcnQgdHdvIHdhcyB3aGVuIGV2ZXJ5dGhpbmcgd2VudCBhd3J5LiBBcyBtb3N0IG9mIHRoZSBjcmV3IGdhdGhlcmVkIGludG8gdGhlIHRyYW5zcG9ydCBiYXksIHRoZSBjb21tYW5kZXIgYW5kIGEgZmV3IG90aGVycyBzdGF5ZWQgYmVoaW5kIHRvIG1vbml0b3IgdGhlIGV4cGxvcmF0aW9uLiBUaGUgdGVsZXBvcnRhdGlvbiBwcm9jZXNzIGJlZ2FuLCB5ZXQgaW1tZWRpYXRlbHkgYSBtYXNzaXZlIHN5c3RlbXMgZmFpbHVyZSBvY2N1cnJlZC4gVGhvc2Ugd2hvIGhhZCBiZWVuIGF3YWl0aW5nIHRlbGVwb3J0YXRpb24gd2VyZSBnb25lLCBhc3N1bWVkIGRlYWQuIFRoZSBjb21tYW5kZXIgY29tZXMgdG8gYXMgdGhlIHNoaXAgaXMgcGx1bW1ldGluZyBmcm9tIG9yYml0LCBoaXMgY3Jld21hdGVzIHllbGxpbmcgYXQgZWFjaCBvdGhlci4gVGhlcmUgaXMgb25seSBvbmUgZXNjYXBlIHBvZCByZW1haW5pbmcuIFlvdSBtdXN0IHRha2UgY29udHJvbCBvZiB0aGUgc2hpcCBhbmQgcmVtYWluaW5nIGNyZXcgdG8gc2F2ZSBldmVyeW9uZSBmcm9tIGNlcnRhaW4gZGVhdGguXCIpLFxuICAgLy8gICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIsIDEpO1xuICAgLy8gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgIC8vICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAvLyAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwidGhlU3RhcnRcIikgPT0gMSxcbiAgIC8vICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIGJhdGhyb29tLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHNvdXRoIGludG8gdGhlIG1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFMRV9CRURST09NKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBub3J0aCBpbnRvIHRoZSBmZW1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRkVNX0JFRFJPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXG4vLyBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHQvLyBdXG5cdFx0KTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoQmF0aHJvb21CVCk7XG5cbnZhciBNQmVkcm9vbUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1BTEVfQkVEUk9PTSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0Ly8gc2VsZWN0b3IoW1xuICAgLy8gICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwidGhlU3RhcnRcIikgPT0gMCxcbiAgIC8vICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgLy8gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSXQgd2FzIGEgc2ltcGxlIG1pc3Npb246IGFuZCBvbiB0aGUgbmV3bHktZGlzY292ZXJlZCBwbGFuZXQgU2lndXJvbiwgdGVsZXBvcnQgY3JldyBtZW1iZXJzIGRvd24gdG8gaXRzIHN1cmZhY2UsIGFuZCBzZWN1cmUgYW5kIGRvY3VtZW50IG5ldyBpbmZvcm1hdGlvbi4gUGFydCB0d28gd2FzIHdoZW4gZXZlcnl0aGluZyB3ZW50IGF3cnkuIEFzIG1vc3Qgb2YgdGhlIGNyZXcgZ2F0aGVyZWQgaW50byB0aGUgdHJhbnNwb3J0IGJheSwgdGhlIGNvbW1hbmRlciBhbmQgYSBmZXcgb3RoZXJzIHN0YXllZCBiZWhpbmQgdG8gbW9uaXRvciB0aGUgZXhwbG9yYXRpb24uIFRoZSB0ZWxlcG9ydGF0aW9uIHByb2Nlc3MgYmVnYW4sIHlldCBpbW1lZGlhdGVseSBhIG1hc3NpdmUgc3lzdGVtcyBmYWlsdXJlIG9jY3VycmVkLiBUaG9zZSB3aG8gaGFkIGJlZW4gYXdhaXRpbmcgdGVsZXBvcnRhdGlvbiB3ZXJlIGdvbmUsIGFzc3VtZWQgZGVhZC4gVGhlIGNvbW1hbmRlciBjb21lcyB0byBhcyB0aGUgc2hpcCBpcyBwbHVtbWV0aW5nIGZyb20gb3JiaXQsIGhpcyBjcmV3bWF0ZXMgeWVsbGluZyBhdCBlYWNoIG90aGVyLiBUaGVyZSBpcyBvbmx5IG9uZSBlc2NhcGUgcG9kIHJlbWFpbmluZy4gWW91IG11c3QgdGFrZSBjb250cm9sIG9mIHRoZSBzaGlwIGFuZCByZW1haW5pbmcgY3JldyB0byBzYXZlIGV2ZXJ5b25lIGZyb20gY2VydGFpbiBkZWF0aC5cIiksXG4gICAvLyAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwidGhlU3RhcnRcIiwgMSk7XG4gICAvLyAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgLy8gICAgICAgICAgICAgICAgICBdKSksXG5cbiAgIC8vICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiKSA9PSAxLFxuICAgLy8gICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgaW50byB0aGUgbWFsZXMnIGJlZHJvb20uXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byBiYXRocm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJBVEhST09NKSksXG4vLyBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHQvLyBdXG5cdFx0KTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoTUJlZHJvb21CVCk7XG5cbnZhciB3aXJlczFCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSB3aXJlczEuY3VycmVudExvY2F0aW9uLCAvLyAgZ2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIilcblx0c2VxdWVuY2UoW1xuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5vdGljZSB3aXJlcyBvbiB0aGUgZ3JvdW5kLlwiKSxcblx0XHRcdGFkZFVzZXJBY3Rpb25UcmVlKFwiUGljayB1cCB0aGUgd2lyZXMuXCIsXG5cdFx0XHRcdHNlcXVlbmNlKFtcblx0XHRcdFx0XHRhY3Rpb24oKCk9PnRydWUsICgpID0+IHtcblx0XHRcdFx0XHRcdGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiWW91IHBpY2sgdXAgdGhlIHdpcmVzLlwiKTtcblx0XHRcdFx0XHRcdHNldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpO1xuXHRcdFx0XHRcdFx0c2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQsIGdldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkKSArIDEpO1xuXHRcdFx0XHRcdH0sIDApLFxuXHRcdFx0XHRcdC8vIGFjdGlvbigoKT0+dHJ1ZSwgKCkgPT4ge1xuXHRcdFx0XHRcdC8vICAgICBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIldvdyB5b3Uga25vdyBob3cgdG8gcGljayB1cCB0aGluZ3MuXCIpfSwgMClcblx0XHRcdFx0XSlcblx0XHRcdClcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZSh3aXJlczFCVCk7XG5cbnZhciB3aXJlczJCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSB3aXJlczIuY3VycmVudExvY2F0aW9uLCAvLyBnZXRJdGVtVmFyaWFibGUod2lyZXMyLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5vdGljZSB3aXJlcyBvbiB0aGUgZ3JvdW5kLlwiKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJQaWNrIHVwIHRoZSB3aXJlcy5cIiwgKCkgPT4ge1xuXHRcdFx0XHRkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIllvdSBwaWNrIHVwIHRoZSB3aXJlcy5cIik7XG5cdFx0XHRcdHNldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpO1xuXHRcdFx0XHRzZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCwgZ2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQpICsgMSk7XG5cdFx0XHR9KVxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHdpcmVzMkJUKTtcblxuXG4vLyAvLzQuIFJ1biB0aGUgd29ybGRcbmluaXRpYWxpemUoKTtcbnZhciB1c2VySW50ZXJhY3Rpb25PYmplY3QgPSBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKTtcblxuLy8gLy9SRU5ERVJJTkctLS0tLVxudmFyIGRpc3BsYXlQYW5lbCA9IHt4OiAyNTAsIHk6IDB9O1xudmFyIHRleHRQYW5lbCA9IHt4OiAyNzAsIHk6IDUwMX07XG52YXIgYWN0aW9uc1BhbmVsID0ge3g6IDUyMCwgeTogNTUwfTtcblxudmFyIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXknKTtcbnZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbnZhciBzcGFjZXNoaXBJbWFnZSA9IG5ldyBJbWFnZSgpO1xuc3BhY2VzaGlwSW1hZ2Uub25sb2FkID0gcmVuZGVyO1xudmFyIHBsYXllckltYWdlID0gbmV3IEltYWdlKCk7XG52YXIgY2FsZWJJbWFnZSA9IG5ldyBJbWFnZSgpO1xudmFyIHF1aW5uSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBtYXJrSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBlZGRpZUltYWdlID0gbmV3IEltYWdlKCk7XG52YXIgYmVhdHJpY2VJbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG5cdGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cdGNvbnRleHQuZHJhd0ltYWdlKHNwYWNlc2hpcEltYWdlLCBkaXNwbGF5UGFuZWwueCwgZGlzcGxheVBhbmVsLnksIDEwMDAsIDUwMCk7XG5cdGRpc3BsYXlQbGF5ZXIoKTtcblx0ZGlzcGxheUNhbGViKCk7XG5cdGRpc3BsYXlRdWlubigpO1xuXHRkaXNwbGF5TWFyaygpO1xuXHRkaXNwbGF5RWRkaWUoKTtcblx0ZGlzcGxheUJlYXRyaWNlKCk7XG5cdGRpc3BsYXlUZXh0QW5kQWN0aW9ucygpO1xufVxuXG52YXIgbWFwUG9zaXRpb25zID0ge1xuXHRcIkVOR0lORVNcIjoge3g6IDI3NSwgeTogMTEwfSxcblx0XCJDT0NLUElUXCI6IHt4OiA4NjAsIHk6IDIzMH0sXG5cdFwiU1RPUkFHRVwiOiB7eDogNTQ1LCB5OiAxMTB9LFxuXHRcIkRPQ1RPUlMgT0ZGSUNFXCI6IHt4OiA3MjUsIHk6IDM1MH0sXG5cdFwiTUFJTiBBUkVBXCI6IHt4OiA0ODAsIHk6IDI0MH0sXG5cdFwiRVNDQVBFIFBPRFwiOiB7eDogMjI0LCB5OiA0MDh9LFxuXHRcIlRSQU5TUE9SVCBST09NXCI6IHt4OiAzNzAsIHk6IDM2MH0sXG5cdFwiTU9OSVRPUklORyBST09NXCI6IHt4OiA1MzUsIHk6IDM2MH0sXG5cdFwiQkFUSFJPT01cIjoge3g6IDg1LCB5OiAyNDB9LFxuXHRcIk1BTEUgQkVEUk9PTVwiOiB7eDogODUsIHk6IDMzMH0sXG5cdFwiRkVNIEJFRFJPT01cIjoge3g6IDg1LCB5OiAxNTB9XG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5UGxheWVyKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pO1xuXHRpZiAoIWlzVW5kZWZpbmVkKG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dKSlcblx0XHRjb250ZXh0LmRyYXdJbWFnZShwbGF5ZXJJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlDYWxlYigpIHtcblx0dmFyIGN1cnJMb2NhdGlvbiA9IENhbGViLmN1cnJlbnRMb2NhdGlvbjtcblx0Y29udGV4dC5kcmF3SW1hZ2UoY2FsZWJJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlRdWlubigpIHtcblx0dmFyIGN1cnJMb2NhdGlvbiA9IFF1aW5uLmN1cnJlbnRMb2NhdGlvbjtcblx0Y29udGV4dC5kcmF3SW1hZ2UocXVpbm5JbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlNYXJrKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gTWFyay5jdXJyZW50TG9jYXRpb247XG5cdGNvbnRleHQuZHJhd0ltYWdlKG1hcmtJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlFZGRpZSgpIHtcblx0dmFyIGN1cnJMb2NhdGlvbiA9IEVkZGllLmN1cnJlbnRMb2NhdGlvbjtcblx0Y29udGV4dC5kcmF3SW1hZ2UoZWRkaWVJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlCZWF0cmljZSgpIHtcblx0dmFyIGN1cnJMb2NhdGlvbiA9IEJlYXRyaWNlLmN1cnJlbnRMb2NhdGlvbjtcblx0Y29udGV4dC5kcmF3SW1hZ2UoYmVhdHJpY2VJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XG59XG5cbnNwYWNlc2hpcEltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL3NoaXAucG5nXCI7XG5wbGF5ZXJJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9UYXlsb3IzLnBuZ1wiO1xuY2FsZWJJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9DYWxlYi5wbmdcIjtcbnF1aW5uSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvUXVpbm4ucG5nXCI7XG5tYXJrSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvTWFyay5wbmdcIjtcbmVkZGllSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvRWRkaWUucG5nXCI7XG5iZWF0cmljZUltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL0JlYXRyaWNlLnBuZ1wiO1xuXG52YXIgY3VycmVudFNlbGVjdGlvbjtcbnZhciB5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcbnZhciB5T2Zmc2V0SW5jcmVtZW50ID0gMjU7XG5cblxuXG5mdW5jdGlvbiB3cmFwVGV4dCh0ZXh0KSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIldyYXAgVGV4dFwiKTtcbiAgICB2YXIgd2E9dGV4dC5zcGxpdChcIiBcIiksXG4gICAgICAgIHBocmFzZUFycmF5PVtdLFxuICAgICAgICBsYXN0UGhyYXNlPXdhWzBdLFxuICAgICAgICBtZWFzdXJlPTAsXG4gICAgICAgIHNwbGl0Q2hhcj1cIiBcIjtcbiAgICBpZiAod2EubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgcmV0dXJuIHdhXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaT0xO2k8d2EubGVuZ3RoO2krKykge1xuICAgICAgICB2YXIgdz13YVtpXTtcbiAgICAgICAgbWVhc3VyZT1jb250ZXh0Lm1lYXN1cmVUZXh0KGxhc3RQaHJhc2Urc3BsaXRDaGFyK3cpLndpZHRoO1xuICAgICAgICBpZiAobWVhc3VyZTwxMDAwKSB7XG4gICAgICAgICAgICBsYXN0UGhyYXNlKz0oc3BsaXRDaGFyK3cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGhyYXNlQXJyYXkucHVzaChsYXN0UGhyYXNlKTtcbiAgICAgICAgICAgIGxhc3RQaHJhc2U9dztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaT09PXdhLmxlbmd0aC0xKSB7XG4gICAgICAgICAgICBwaHJhc2VBcnJheS5wdXNoKGxhc3RQaHJhc2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcGhyYXNlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUZXh0QW5kQWN0aW9ucygpIHtcblx0Y29udGV4dC5jbGVhclJlY3QodGV4dFBhbmVsLngsIHRleHRQYW5lbC55LCA1MDAsIDEwMDApO1xuXHRcblxuXHRjb250ZXh0LmZvbnQgPSBcIjE1cHQgQ2FsaWJyaVwiO1xuXHRjb250ZXh0LmZpbGxTdHlsZSA9ICdwaW5rJztcblx0Y29uc29sZS5sb2coXCJBY3Rpb25zIGVmZmVjdCB0ZXh0OiBcIiArIHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCk7XG5cdHZhciB0ZXh0VG9EaXNwbGF5ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0Lmxlbmd0aCAhPSAwID8gd3JhcFRleHQodXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0KSA6IHdyYXBUZXh0KHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0KTtcblxuXG5cdC8vIGNvbnNvbGUubG9nKHRleHRUb0Rpc3BsYXkpO1xuXHRhY3Rpb25zUGFuZWwueSA9IHRleHRUb0Rpc3BsYXkubGVuZ3RoKjI1K3RleHRQYW5lbC55KzIwO1xuXHR5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcblxuXHRmb3IodmFyIGk9MDsgaTx0ZXh0VG9EaXNwbGF5Lmxlbmd0aDsgaSsrKXtcblx0XHRcdGNvbnRleHQuZmlsbFRleHQodGV4dFRvRGlzcGxheVtpXSwgdGV4dFBhbmVsLngsIHRleHRQYW5lbC55KzI1KmkrMjApO1x0XG5cdH1cblx0XG5cblx0Y29udGV4dC5mb250ID0gXCIxNXB0IENhbGlicmlcIjtcblx0Y29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdXNlckFjdGlvblRleHQgPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0W2ldO1xuXHRcdGNvbnRleHQuZmlsbFRleHQodXNlckFjdGlvblRleHQsIGFjdGlvbnNQYW5lbC54ICsgMjAsIHlPZmZzZXQpO1xuXHRcdGlmIChpID09IDApIHtcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSBpO1xuXHRcdH1cblx0XHR5T2Zmc2V0ICs9IHlPZmZzZXRJbmNyZW1lbnQ7XG5cdH1cblxuXHRkaXNwbGF5QXJyb3coKTtcblx0Y29uc29sZS5sb2coXCJ3aXJlczogXCIgKyBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5QXJyb3coKSB7XG5cdGlmKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApe1xuXHRcdGNvbnRleHQuY2xlYXJSZWN0KGFjdGlvbnNQYW5lbC54LCBhY3Rpb25zUGFuZWwueSwgMjAsIDEwMDApO1xuXHRcdGNvbnRleHQuZmlsbFRleHQoXCI+IFwiLCA1MjAsIGFjdGlvbnNQYW5lbC55ICsgMjUgKyAoY3VycmVudFNlbGVjdGlvbiAqIHlPZmZzZXRJbmNyZW1lbnQpKTtcblx0fVxufVxuXG4vL1VzZXIgaW5wdXRcbmZ1bmN0aW9uIGtleVByZXNzKGUpIHtcblx0aWYgKGUua2V5Q29kZSA9PSAxMykge1xuXHRcdHZhciBzZWxlY3RlZEFjdGlvbiA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHRbY3VycmVudFNlbGVjdGlvbl07XG5cdFx0aWYoIWlzVW5kZWZpbmVkKHNlbGVjdGVkQWN0aW9uKSl7XG5cdFx0XHRleGVjdXRlVXNlckFjdGlvbihzZWxlY3RlZEFjdGlvbik7XG5cdFx0XHR3b3JsZFRpY2soKTtcblx0XHRcdHJlbmRlcigpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBrZXlEb3duKGUpIHtcblx0aWYgKGUua2V5Q29kZSA9PSA0MCkgey8vZG93blxuXHRcdGlmICh1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKSB7XG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uKys7XG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uID0gY3VycmVudFNlbGVjdGlvbiAlIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoO1xuXHRcdFx0ZGlzcGxheUFycm93KCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzOCkgey8vdXBcblx0XHRpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xuXHRcdFx0Y3VycmVudFNlbGVjdGlvbi0tO1xuXHRcdFx0aWYgKGN1cnJlbnRTZWxlY3Rpb24gPCAwKVxuXHRcdFx0XHRjdXJyZW50U2VsZWN0aW9uID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggLSAxO1xuXHRcdFx0ZGlzcGxheUFycm93KCk7XG5cdFx0fVxuXHR9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBrZXlQcmVzcywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93biwgZmFsc2UpOyIsImltcG9ydCBRdWV1ZSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9RdWV1ZVwiO1xuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xuXG5pbnRlcmZhY2UgRGljdGlvbmFyeTxUPiB7IFtrZXk6IHN0cmluZ106IFQ7IH1cblxuZXhwb3J0IGVudW0gU3RhdHVzIHtcbiAgICBSVU5OSU5HLFxuICAgIFNVQ0NFU1MsXG4gICAgRkFJTFVSRVxufVxuXG5mdW5jdGlvbiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQ6IG51bWJlciwgYmxhY2tib2FyZDogYW55LCBzdGF0dXM6IFN0YXR1cykge1xuICAgIGRlbGV0ZSBibGFja2JvYXJkW2lkXTtcbiAgICByZXR1cm4gc3RhdHVzO1xufVxuXG5leHBvcnQgdHlwZSBFZmZlY3QgPSAoKSA9PiB2b2lkXG5leHBvcnQgdHlwZSBQcmVjb25kaXRpb24gPSAoKSA9PiBib29sZWFuXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXG5leHBvcnQgdHlwZSBBY3Rpb25UaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcikgPT4gVGlja1xuLyoqXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xuICovXG5leHBvcnQgdHlwZSBHdWFyZFRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2ssIG5lZ2F0ZT86IGJvb2xlYW4pID0+IFRpY2tcbi8qKlxuICogU2VxdWVuY2UvU2VsZWN0b3JcbiAqL1xuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXG5cbnZhciBibGFja2JvYXJkID0ge307XG5cbmZ1bmN0aW9uIGdldEFjdGlvblRpY2soaWQ6IG51bWJlcik6IEFjdGlvblRpY2sge1xuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQgPSAxKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJlY29uZGl0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA9IHRpY2tzUmVxdWlyZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgYXN0VGljaywgbmVnYXRlID0gZmFsc2UpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2VlZCA/IGV4ZWN1dGUoYXN0VGljaykgOiBTdGF0dXMuRkFJTFVSRTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3RvclRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlKGFzdFRpY2s6IFRpY2spOiBTdGF0dXMge1xuICAgIHJldHVybiBhc3RUaWNrKCk7XG59XG5cbnZhciBnbG9iYWxJZENvdW50ZXIgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gYWN0aW9uKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcik6IFRpY2sge1xuICAgIHJldHVybiBnZXRBY3Rpb25UaWNrKGdsb2JhbElkQ291bnRlcisrKShwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1YXJkKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrKTogVGljayB7XG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBDeWNsZXMgb3ZlciBpdHMgY2hpbGRyZW46IGl0ZXJhdGVzIHRvIHRoZSBuZXh0IGNoaWxkIG9uIHN1Y2Nlc3Mgb2YgYSBjaGlsZFxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xuICogQHJldHVybnMge1RpY2t9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZShhc3RUaWNrczogVGlja1tdKTogVGljayB7XG4gICAgcmV0dXJuIGdldFNlcXVlbmNlVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xufVxuXG4vKipcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxuICogU3VjY2VlZHMgaWYgZXZlbiBvbmUgc3VjY2VlZHMsIGVsc2UgZmFpbHNcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xuICogQHJldHVybnMge1RpY2t9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Rvcihhc3RUaWNrczogVGlja1tdKTogVGljayB7XG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xufVxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tIEFQSXMgLS0tLS0tLS0tLS0tLS0tICovXG5cbi8vMC4gdXRpbGl0aWVzXG4vLyBtaW4gYW5kIG1heCBhcmUgaW5jbHVzaXZlXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZE51bWJlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xufVxuXG4vLzEuIHN0b3J5IGluc3RhbmNlXG5cbi8vMS4xIGxvY2F0aW9uc1xuLy8gdmFyIGxvY2F0aW9uR3JhcGg6IERpY3Rpb25hcnk8TG9jYXRpb24+ID0ge307XG5cbnZhciBsb2NhdGlvbkdyYXBoID0ge307XG5cbi8vIC8vIFxuLy8gY2xhc3MgTG9jYXRpb24ge1xuLy8gICAgIGFkamFjZW50TG9jYXRpb25zOiBEaWN0aW9uYXJ5PExvY2F0aW9uW10+O1xuXG4vLyAgICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgYWRqYWNlbnRMb2NhdGlvbnM6IHN0cmluZ1tdKSB7XG4vLyAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbi8vICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICAgICAgaWYoYWRqYWNlbnRMb2NhdGlvbnNbaV0gaW4gbG9jYXRpb25HcmFwaCl7XG5cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGVsc2V7XG4vLyAgICAgICAgICAgICAgICAgdmFyIG5ld19sb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cblxuLy8gICAgIH1cbi8vIH1cblxuXG4vL2FkZCB0byBib3RoIHNpZGVzXG5leHBvcnQgZnVuY3Rpb24gYWRkTG9jYXRpb24obG9jYXRpb25OYW1lOiBzdHJpbmcsIGFkamFjZW50TG9jYXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPT0gdW5kZWZpbmVkKVxuICAgICAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBbXTtcbiAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0uY29uY2F0KGFkamFjZW50TG9jYXRpb25zKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnRMb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID0gW107XG5cbiAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0ucHVzaChsb2NhdGlvbk5hbWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFkamFjZW50KGxvY2F0aW9uMTogc3RyaW5nLCBsb2NhdGlvbjI6IHN0cmluZyk6Ym9vbGVhbiB7XG4gICAgY29uc29sZS5sb2coXCJBcmUgYWRqYWNlbnQ6IFwiICsgbG9jYXRpb24xICsgXCIsIFwiK2xvY2F0aW9uMik7XG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXSA9PSB1bmRlZmluZWQgfHwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjJdID09IHVuZGVmaW5lZCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWl0aGVyIG9uZS9ib3RoIGxvY2F0aW9ucyB1bmRlZmluZWRcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdW2ldID09IGxvY2F0aW9uMil7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8vcGF0aGZpbmRpbmcgcHJpbWl0aXZlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRMb2NhdGlvbihzdGFydDogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YXIgdmlzaXRlZCA9IHt9O1xuICAgIHZhciBwcmV2aW91cyA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiBsb2NhdGlvbkdyYXBoKSB7XG4gICAgICAgIHZpc2l0ZWRba2V5XSA9IGZhbHNlO1xuICAgIH1cbiAgICB2aXNpdGVkW3N0YXJ0XSA9IHRydWU7XG5cbiAgICB2YXIgbXlRdWV1ZSA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XG4gICAgbXlRdWV1ZS5lbnF1ZXVlKHN0YXJ0KTtcblxuICAgIHdoaWxlICghbXlRdWV1ZS5pc0VtcHR5KCkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IG15UXVldWUuZGVxdWV1ZSgpO1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSBsb2NhdGlvbkdyYXBoW2N1cnJlbnRdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXZpc2l0ZWRbbmVpZ2hib3JzW2ldXSkge1xuICAgICAgICAgICAgICAgIG15UXVldWUuZW5xdWV1ZShuZWlnaGJvcnNbaV0pO1xuICAgICAgICAgICAgICAgIHZpc2l0ZWRbbmVpZ2hib3JzW2ldXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNbbmVpZ2hib3JzW2ldXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY3VycmVudDogc3RyaW5nID0gZGVzdGluYXRpb247XG4gICAgaWYgKGN1cnJlbnQgPT0gc3RhcnQpXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIHdoaWxlIChwcmV2aW91c1tjdXJyZW50XSAhPSBzdGFydCkge1xuICAgICAgICBjdXJyZW50ID0gcHJldmlvdXNbY3VycmVudF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbi8vMS4yIGFnZW50c1xuXG5leHBvcnQgY2xhc3MgQWdlbnQge1xuICAgIGN1cnJlbnRMb2NhdGlvbjogc3RyaW5nO1xuICAgIGRlc3RpbmF0aW9uOiBzdHJpbmc7XG4gICAgbGFzdFNlZW5JdGVtOiB7W2l0ZW1OYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgbGFzdFNlZW5QZXJzb246IHtbaXRlbU5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICByYW5kTnVtYmVyOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZyl7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiIGNvbnN0cnVjdG9yXCIpXG4gICAgfVxuXG4gICAgc2V0Q3VycmVudExvY2F0aW9uKGN1cnJlbnRsb2NhdGlvbjogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjdXJyZW50bG9jYXRpb247XG4gICAgfVxuXG4gICAgc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKGl0ZW06IEl0ZW0sIGF0TG9jYXRpb246IHN0cmluZyl7XG4gICAgICAgIHRoaXMubGFzdFNlZW5JdGVtW2l0ZW0ubmFtZV0gPSBhdExvY2F0aW9uO1xuICAgIH1cblxuICAgIHNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKGFnZW50TmFtZTogc3RyaW5nLCBhdExvY2F0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmxhc3RTZWVuUGVyc29uW2FnZW50TmFtZV0gPSBhdExvY2F0aW9uO1xuICAgIH1cblxuICAgIHNldERlc3RpbmF0aW9uKGRlc3RpbmF0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgfVxuXG4gICAgaGFzU2Vlbkl0ZW0oaXRlbTogSXRlbSl7XG4gICAgICAgIGlmKGl0ZW0ubmFtZSBpbiB0aGlzLmxhc3RTZWVuSXRlbSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIjogc2F3IGl0ZW06XCIraXRlbS5uYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAvL3RoaXMubGFzdFNlZW5JdGVtW2l0ZW0ubmFtZV1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2hlcmVJc0l0ZW0oaXRlbTogSXRlbSl7XG4gICAgICAgIGlmKGl0ZW0ubmFtZSBpbiB0aGlzLmxhc3RTZWVuSXRlbSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIjogc2F3IGl0ZW06XCIraXRlbS5uYW1lICsgXCIgYXQgbG9jYXRpb246XCIrdGhpcy5sYXN0U2Vlbkl0ZW1baXRlbS5uYW1lXSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0U2Vlbkl0ZW1baXRlbS5uYW1lXVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxudmFyIGFnZW50czogQXJyYXk8QWdlbnQ+ID0gbmV3IEFycmF5PEFnZW50PigpO1xuLy8gdmFyIGFnZW50cyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQWdlbnQoYWdlbnROYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFkZGluZzogXCIrYWdlbnROYW1lKTtcbiAgICB2YXIgYWdlbnQgPSBuZXcgQWdlbnQoYWdlbnROYW1lKTtcbiAgICBjb25zb2xlLmxvZyhhZ2VudCk7XG4gICAgYWdlbnRzLnB1c2goYWdlbnQpO1xuICAgIHJldHVybiBhZ2VudDtcbn1cblxuLy8xLjMgaXRlbXNcblxuLy8gVG9kb1xuY2xhc3MgSXRlbSB7XG4gICAgY3VycmVudExvY2F0aW9uOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudExvY2F0aW9uKGN1cnJlbnRsb2NhdGlvbjogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjdXJyZW50bG9jYXRpb247XG4gICAgfVxufVxuXG52YXIgaXRlbXM6IEFycmF5PEl0ZW0+ID0gbmV3IEFycmF5PEl0ZW0+KCk7XG4vLyB2YXIgaXRlbXMgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEl0ZW0oaXRlbU5hbWU6IHN0cmluZykge1xuICAgIHZhciBpdGVtID0gbmV3IEl0ZW0oaXRlbU5hbWUpO1xuICAgIGl0ZW1zLnB1c2goaXRlbSk7XG4gICAgcmV0dXJuIGl0ZW07XG59XG5cbi8vMS40IHZhcmlhYmxlc1xudmFyIHZhcmlhYmxlcyA9IHt9O1xudmFyIGFnZW50VmFyaWFibGVzID0ge307XG52YXIgaXRlbVZhcmlhYmxlcyA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdmFyaWFibGVzW3Zhck5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhck5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pKVxuICAgICAgICBhZ2VudFZhcmlhYmxlc1thZ2VudF0gPSB7fTtcblxuICAgIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhcmlhYmxlKHZhck5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBub3Qgc2V0IVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdmFyaWFibGVzW3Zhck5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSB8fCBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGFnZW50IFwiICsgYWdlbnQgKyBcIiBub3Qgc2V0IVwiKVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhcmlhYmxlTm90U2V0KHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBZ2VudFZhcmlhYmxlTm90U2V0KGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSk7XG59XG5cbi8vIHRvZG9cbmV4cG9ydCBmdW5jdGlvbiBzZXRJdGVtVmFyaWFibGUoaXRlbTogSXRlbSwgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbS5uYW1lXSkpXG4gICAgICAgIGl0ZW1WYXJpYWJsZXNbaXRlbS5uYW1lXSA9IHt9O1xuXG4gICAgaXRlbVZhcmlhYmxlc1tpdGVtLm5hbWVdW3Zhck5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbVZhcmlhYmxlKGl0ZW06IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pIHx8IGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGl0ZW0gXCIgKyBpdGVtICsgXCIgbm90IHNldCFcIilcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXTtcbn1cblxuXG4vLzJcbi8vYWdlbnQtYmVoYXZpb3IgdHJlZSBtYXBwaW5nXG5cbnZhciBhZ2VudFRyZWVzOiB7W2FnZW50TmFtZTogc3RyaW5nXSA6IFRpY2t9ID0ge307XG4vLyB2YXIgYWdlbnRUcmVlcyA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoVHJlZVRvQWdlbnQoYWdlbnQ6IEFnZW50LCB0cmVlOiBUaWNrKSB7XG4gICAgYWdlbnRUcmVlc1thZ2VudC5uYW1lXSA9IHRyZWU7XG59XG5cbi8vMy4xXG4vL3VzZXIgYWN0aW9uc1xuLy9UT0RPIGFkZCB2YXJpYWJsZXMgdG8gdXNlciBhY3Rpb24gdGV4dHNcbnZhciB1c2VySW50ZXJhY3Rpb25PYmplY3QgPSB7XG4gICAgdGV4dDogXCJcIixcbiAgICB1c2VyQWN0aW9uc1RleHQ6IFtdLFxuICAgIGFjdGlvbkVmZmVjdHNUZXh0OiBcIlwiXG59XG52YXIgdXNlckludGVyYWN0aW9uVHJlZXMgPSBbXTtcbnZhciB1c2VyQWN0aW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpIHtcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCA9IFwiXCI7XG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dCA9IFtdO1xuICAgIHVzZXJBY3Rpb25zID0ge307Ly97XCJHbyB0byBsb2NhdGlvbiBYXCIgOiBlZmZlY3RcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVzZXJJbnRlcmFjdGlvblRyZWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGV4ZWN1dGUodXNlckludGVyYWN0aW9uVHJlZXNbaV0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGxldCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24gPSAodGV4dDogc3RyaW5nKSA9PlxuICAgIGFjdGlvbihcbiAgICAgICAgKCkgPT4gdHJ1ZSxcbiAgICAgICAgKCkgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgKz0gXCJcXG5cIiArIHRleHQsXG4gICAgICAgIDBcbiAgICApO1xuZXhwb3J0IGxldCBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dCA9ICh0ZXh0OiBzdHJpbmcpID0+IHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCArPSBcIlxcblwiICsgdGV4dDtcblxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uVHJlZSA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdFRyZWU6IFRpY2spID0+IGFjdGlvbihcbiAgICAoKSA9PiB0cnVlLFxuICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgZWZmZWN0VHJlZSksIDBcbik7XG5cbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdDogKCkgPT4gYW55KSA9PlxuICAgIGFjdGlvbihcbiAgICAgICAgKCkgPT4gdHJ1ZSxcbiAgICAgICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBhY3Rpb24oKCk9PnRydWUsIGVmZmVjdCwgMCkpLCAwXG4gICAgKTtcblxuXG5cblxuXG4vLyAgICAgcmV0dXJuIFxuLy8gfVxuXG5cbmZ1bmN0aW9uIG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dDogc3RyaW5nLCB0cmVlOiBUaWNrKSB7XG4gICAgdXNlckFjdGlvbnNbdGV4dF0gPSB0cmVlO1xuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQucHVzaCh0ZXh0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGljazogVGljaykge1xuICAgIHVzZXJJbnRlcmFjdGlvblRyZWVzLnB1c2godGljayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlVXNlckFjdGlvbih0ZXh0OiBzdHJpbmcpIHtcbiAgICAvL2V4ZWN1dGUgdGhlIHVzZXIgYWN0aW9uXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ID0gXCJcIjtcbiAgICB2YXIgdXNlckFjdGlvbkVmZmVjdFRyZWUgPSB1c2VyQWN0aW9uc1t0ZXh0XTtcbiAgICBleGVjdXRlKHVzZXJBY3Rpb25FZmZlY3RUcmVlKTtcbn1cblxuLy80LlxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCgpIHtcbiAgICByZXR1cm4gdXNlckludGVyYWN0aW9uT2JqZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd29ybGRUaWNrKCkge1xuICAgIC8vYWxsIGFnZW50IHRpY2tzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyZWUgPSBhZ2VudFRyZWVzW2FnZW50c1tpXS5uYW1lXTtcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0cmVlKSkge1xuICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJleGVjdXRpbmdBZ2VudFwiLCBhZ2VudHNbaV0ubmFtZSk7XG4gICAgICAgICAgICBleGVjdXRlKHRyZWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XG59XG5cblxuXG4iXX0=
