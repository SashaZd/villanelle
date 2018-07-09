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
scripting_1.setItemVariable(wires1, "currentLocation", STORAGE);
scripting_1.setItemVariable(wires2, "currentLocation", MONITORING_ROOM);
var wiresCollected = scripting_1.setVariable("wiresCollected", 0);
// // variables
scripting_1.setAgentVariable(Caleb, "currentLocation", COCKPIT);
//Quinn
scripting_1.setAgentVariable(Quinn, "currentLocation", DOCTORS_OFFICE);
//Mark
scripting_1.setAgentVariable(Mark, "currentLocation", TRANSPORT_ROOM);
//Eddie
scripting_1.setAgentVariable(Eddie, "currentLocation", STORAGE);
//Beatrice
scripting_1.setAgentVariable(Beatrice, "currentLocation", ENGINES);
// Player
var playerLocation = scripting_1.setVariable("playerLocation", MAIN_AREA);
var wiresCollected = scripting_1.setVariable("wiresCollected", 0);
// Knowledge for Caleb 
scripting_1.setAgentVariable(Caleb, "lastSeen:wires1", UNKNOWN);
scripting_1.setAgentVariable(Caleb, "lastSeen:wires2", UNKNOWN);
scripting_1.setAgentVariable(Caleb, "lastSeen:player", UNKNOWN);
// // 2. Define BTs
// // create ground actions
// Todo from here
// function function_name(argument) {
// 	// body...
// }
var setRandNumber = scripting_1.action(function () { return true; }, function () { return scripting_1.setVariable("randNumber", scripting_1.getRandNumber(1, 11)); }, 0);
// function chooseDestinationForAgent(agent, destinationNumber=getVariable("randNumber")) {
// 	// body...
// }
var chooseENGINES = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 1; }, function () { return scripting_1.setVariable("destination", ENGINES); }, 0);
var chooseSTORAGE = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 2; }, function () { return scripting_1.setVariable("destination", STORAGE); }, 0);
var chooseDOCTORS_OFFICE = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 3; }, function () { return scripting_1.setVariable("destination", DOCTORS_OFFICE); }, 0);
var chooseCOCKPIT = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 4; }, function () { return scripting_1.setVariable("destination", COCKPIT); }, 0);
var chooseESCAPE_POD = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 5; }, function () { return scripting_1.setVariable("destination", ESCAPE_POD); }, 0);
var chooseTRANSPORT_ROOM = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 6; }, function () { return scripting_1.setVariable("destination", TRANSPORT_ROOM); }, 0);
var chooseMONITORING_ROOM = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 7; }, function () { return scripting_1.setVariable("destination", MONITORING_ROOM); }, 0);
var chooseMAIN_AREA = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 8; }, function () { return scripting_1.setVariable("destination", MAIN_AREA); }, 0);
var chooseFEM_BEDROOM = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 9; }, function () { return scripting_1.setVariable("destination", FEM_BEDROOM); }, 0);
var chooseMALE_BEDROOM = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 10; }, function () { return scripting_1.setVariable("destination", MALE_BEDROOM); }, 0);
var chooseBATHROOM = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 11; }, function () { return scripting_1.setVariable("destination", BATHROOM); }, 0);
var atDestinationAgent = function (agentName) {
    return function () { return scripting_1.getAgentVariable(agentName, "destination") == scripting_1.getAgentVariable(agentName, "currentLocation"); };
};
var atDestinationCaleb = atDestinationAgent(Caleb);
var setDestinationCalebPrecond = function () { return scripting_1.isVariableNotSet("destination") || atDestinationCaleb(); };
// // create behavior trees
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
var gotoNextLocationAgent = function (agentName) {
    return scripting_1.action(function () { return true; }, function () {
        scripting_1.setAgentVariable(agentName, "currentLocation", scripting_1.getNextLocation(scripting_1.getAgentVariable(agentName, "currentLocation"), scripting_1.getVariable("destination")));
        console.log(agentName + " is at: " + scripting_1.getAgentVariable(agentName, "currentLocation"));
        // console.log("Hello: " + getAgentVariable(Caleb, 'currentLocation') == getItemVariable(wires1, "currentLocation"));
    }, 0);
};
var gotoNextLocationCaleb = gotoNextLocationAgent(Caleb);
var gotoNextLocationQuinn = gotoNextLocationAgent(Quinn);
var gotoNextLocationMark = gotoNextLocationAgent(Mark);
var gotoNextLocationEddie = gotoNextLocationAgent(Eddie);
var gotoNextLocationBeatrice = gotoNextLocationAgent(Beatrice);
var lastSeenByAgent = function (agentName) {
    return scripting_1.sequence([
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return scripting_1.getAgentVariable(agentName, 'currentLocation') == scripting_1.getItemVariable(wires1, "currentLocation"); }, 
            //effect
            function () {
                console.log(agentName + " sees - Item: wires1 | Location: " + scripting_1.getAgentVariable(agentName, 'currentLocation'));
                scripting_1.setAgentVariable(agentName, "lastSeen:wires1", scripting_1.getAgentVariable(agentName, 'currentLocation'));
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ]),
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return scripting_1.getAgentVariable(agentName, 'currentLocation') == scripting_1.getItemVariable(wires2, "currentLocation"); }, 
            //effect
            function () {
                console.log(agentName + "sees - Item: wires2 | Location: " + scripting_1.getAgentVariable(agentName, 'currentLocation'));
                scripting_1.setAgentVariable(agentName, "lastSeen:wires2", scripting_1.getAgentVariable(agentName, 'currentLocation'));
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ]),
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return scripting_1.getAgentVariable(agentName, 'currentLocation') == scripting_1.getVariable("playerLocation"); }, 
            //effect
            function () {
                console.log(agentName + "sees - Person: Player | Location: " + scripting_1.getAgentVariable(agentName, 'currentLocation'));
                scripting_1.setAgentVariable(agentName, "lastSeen:player", scripting_1.getAgentVariable(agentName, 'currentLocation'));
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ])
    ]);
};
var lastSeenByCaleb = lastSeenByAgent(Caleb);
var lastSeenByQuinn = lastSeenByAgent(Quinn);
var lastSeenByMark = lastSeenByAgent(Mark);
var lastSeenByEddie = lastSeenByAgent(Eddie);
var lastSeenByBeatrice = lastSeenByAgent(Beatrice);
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
var search = scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(setDestinationCalebPrecond, setNextDestination),
        scripting_1.action(function () { return true; }, function () {
        }, 0)
    ]),
    gotoNextLocationCaleb,
]);
// let search = sequence([
//         selector([
//             guard(setDestinationPrecond, setNextDestination),
//             action(() => true, () => {
//             },0)
//         ]),
//         gotoNextLocation,
//     ]);
var CalebBT = scripting_1.sequence([
    lastSeenByCaleb,
    scripting_1.sequence([
        search, lastSeenByCaleb
    ])
]);
var QuinnBT = scripting_1.sequence([
    lastSeenByQuinn,
    scripting_1.sequence([
        search, lastSeenByQuinn
    ])
]);
var MarkBT = scripting_1.sequence([
    lastSeenByMark,
    scripting_1.sequence([
        search, lastSeenByMark
    ])
]);
var EddieBT = scripting_1.sequence([
    lastSeenByEddie,
    scripting_1.sequence([
        search, lastSeenByEddie
    ])
]);
var BeatriceBT = scripting_1.sequence([
    lastSeenByBeatrice,
    scripting_1.sequence([
        search, lastSeenByBeatrice
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
var startStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MAIN_AREA; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the ship's main area."),
    scripting_1.addUserAction("Go forward to enter the engine room.", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
    scripting_1.addUserAction("Go east to enter the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
    scripting_1.addUserAction("Go west to enter the females' bedroom.", function () { return scripting_1.setVariable(playerLocation, FEM_BEDROOM); }),
    scripting_1.addUserAction("Go west to enter the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
    scripting_1.addUserAction("Go west to enter the males' bedroom.", function () { return scripting_1.setVariable(playerLocation, MALE_BEDROOM); }),
    scripting_1.addUserAction("Go south to enter the escape pod.", function () { return scripting_1.setVariable(playerLocation, ESCAPE_POD); }),
    scripting_1.addUserAction("Go into the transport room.", function () { return scripting_1.setVariable(playerLocation, TRANSPORT_ROOM); }),
]));
scripting_1.addUserInteractionTree(startStateBT);
var bcStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ENGINES; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the engine room."),
    scripting_1.addUserAction("Head east into the storage room.", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
    scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(bcStateBT);
var brStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == STORAGE; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You moved into the storage room."),
    scripting_1.addUserAction("Enter the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
    scripting_1.addUserAction("Move back into the engine room.", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
]));
scripting_1.addUserInteractionTree(brStateBT);
var quarters1BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == DOCTORS_OFFICE; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the doctor's office."),
    scripting_1.addUserAction("Return to the storage room.", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
    scripting_1.addUserAction("Move into the cockpit.", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
    scripting_1.addUserAction("Go to the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
    scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(quarters1BT);
var mrStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == COCKPIT; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward into the cockpit."),
    scripting_1.addUserAction("Return to the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
]));
scripting_1.addUserInteractionTree(mrStateBT);
var quarters2BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MONITORING_ROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the monitoring room."),
    scripting_1.addUserAction("Return to the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
    scripting_1.addUserAction("Go to the transport room.", function () { return scripting_1.setVariable(playerLocation, TRANSPORT_ROOM); }),
]));
scripting_1.addUserInteractionTree(quarters2BT);
var medicalBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TRANSPORT_ROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the transport room where the teleporter is located."),
    scripting_1.addUserAction("Exit to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
    scripting_1.addUserAction("Return to the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
]));
scripting_1.addUserInteractionTree(medicalBT);
var labBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ESCAPE_POD; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the escape pod."),
    scripting_1.addUserAction("Exit into the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(labBT);
var trStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == FEM_BEDROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move into the females' bedroom."),
    scripting_1.addUserAction("Move south to the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
    scripting_1.addUserAction("Exit into the main room.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(trStateBT);
var tcStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BATHROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move into the bathroom."),
    scripting_1.addUserAction("Move south into the males' bedroom.", function () { return scripting_1.setVariable(playerLocation, MALE_BEDROOM); }),
    scripting_1.addUserAction("Enter the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
    scripting_1.addUserAction("Move north into the females' bedroom.", function () { return scripting_1.setVariable(playerLocation, FEM_BEDROOM); }),
]));
scripting_1.addUserInteractionTree(tcStateBT);
var tlStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MALE_BEDROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move into the males' bedroom."),
    scripting_1.addUserAction("Enter the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
    scripting_1.addUserAction("Enter the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(tlStateBT);
var wires1BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getItemVariable(wires1, "currentLocation"); }, scripting_1.sequence([
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
var wires2BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getItemVariable(wires2, "currentLocation"); }, scripting_1.sequence([
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
var textPanel = { x: 500, y: 501 };
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
    "MAIN AREA": { x: 465, y: 240 },
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
    var currLocation = scripting_1.getAgentVariable(Caleb, "currentLocation");
    context.drawImage(calebImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
function displayQuinn() {
    var currLocation = scripting_1.getAgentVariable(Quinn, "currentLocation");
    context.drawImage(quinnImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
function displayMark() {
    var currLocation = scripting_1.getAgentVariable(Mark, "currentLocation");
    context.drawImage(markImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
function displayEddie() {
    var currLocation = scripting_1.getAgentVariable(Eddie, "currentLocation");
    context.drawImage(eddieImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
function displayBeatrice() {
    var currLocation = scripting_1.getAgentVariable(Beatrice, "currentLocation");
    context.drawImage(beatriceImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}
spaceshipImage.src = "../images/ship_maybe.png";
playerImage.src = "../images/Taylor.png";
calebImage.src = "../images/Caleb.png";
quinnImage.src = "../images/Quinn.png";
markImage.src = "../images/Mark.png";
eddieImage.src = "../images/Eddie.png";
beatriceImage.src = "../images/Beatrice.png";
var currentSelection;
var yOffset = actionsPanel.y + 25;
var yOffsetIncrement = 25;
function displayTextAndActions() {
    context.clearRect(textPanel.x, textPanel.y, 500, 1000);
    yOffset = actionsPanel.y + 25;
    context.font = "15pt Calibri";
    context.fillStyle = 'pink';
    console.log("Actions effect text: " + userInteractionObject.actionEffectsText);
    var textToDisplay = userInteractionObject.actionEffectsText.length != 0 ? userInteractionObject.actionEffectsText : userInteractionObject.text;
    context.fillText(textToDisplay, textPanel.x, textPanel.y + 20);
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
var locationGraph = {};
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
        this.name = name;
        console.log(this.name + " constructor");
    }
    return Agent;
}());
var agents;
// var agents = [];
function addAgent(agentName) {
    var agent = new Agent(agentName);
    agents.push(agent);
    // console.log(agent.name + " created")
    return agent;
}
exports.addAgent = addAgent;
//1.3 items
var Item = /** @class */ (function () {
    function Item(name) {
        this.name = name;
        this.name = name;
    }
    return Item;
}());
var items;
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
function setItemVariable(item, varName, value) {
    if (util_1.isUndefined(itemVariables[item]))
        itemVariables[item] = {};
    itemVariables[item][varName] = value;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL21hZGRpZS50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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T0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsNEJBQWdCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDN0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsNEJBQWdCLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDOUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsNEJBQWdCLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDakUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENB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QUFJLENBQUMsQ0FBQztJQUM3QyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBTEQsOENBS0M7QUFFRCxJQUFJO0FBQ0o7SUFDSSx1QkFBdUIsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFGRCxnQ0FFQztBQUVEO0lBQ0ksT0FBTyxxQkFBcUIsQ0FBQztBQUNqQyxDQUFDO0FBRkQsNERBRUM7QUFFRDtJQUNJLGlCQUFpQjtJQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGtCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtLQUNKO0lBQ0QsdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBVkQsOEJBVUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbnZhciBhcnJheXMgPSByZXF1aXJlKFwiLi9hcnJheXNcIik7XHJcbnZhciBMaW5rZWRMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAqIENyZWF0ZXMgYW4gZW1wdHkgTGlua2VkIExpc3QuXHJcbiAgICAqIEBjbGFzcyBBIGxpbmtlZCBsaXN0IGlzIGEgZGF0YSBzdHJ1Y3R1cmUgY29uc2lzdGluZyBvZiBhIGdyb3VwIG9mIG5vZGVzXHJcbiAgICAqIHdoaWNoIHRvZ2V0aGVyIHJlcHJlc2VudCBhIHNlcXVlbmNlLlxyXG4gICAgKiBAY29uc3RydWN0b3JcclxuICAgICovXHJcbiAgICBmdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdFxyXG4gICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBMYXN0IG5vZGUgaW4gdGhlIGxpc3RcclxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBOdW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGxpc3RcclxuICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEFkZHMgYW4gZWxlbWVudCB0byB0aGlzIGxpc3QuXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgYWRkZWQuXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyPX0gaW5kZXggb3B0aW9uYWwgaW5kZXggdG8gYWRkIHRoZSBlbGVtZW50LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWRcclxuICAgICogdGhlIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGFkZGVkIG9yIGZhbHNlIGlmIHRoZSBpbmRleCBpcyBpbnZhbGlkXHJcbiAgICAqIG9yIGlmIHRoZSBlbGVtZW50IGlzIHVuZGVmaW5lZC5cclxuICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpbmRleCkpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5FbGVtZW50cztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMubkVsZW1lbnRzIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3Tm9kZSA9IHRoaXMuY3JlYXRlTm9kZShpdGVtKTtcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDAgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBGaXJzdCBub2RlIGluIHRoZSBsaXN0LlxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gdGhpcy5uRWxlbWVudHMpIHtcclxuICAgICAgICAgICAgLy8gSW5zZXJ0IGF0IHRoZSBlbmQuXHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUubmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyBDaGFuZ2UgZmlyc3Qgbm9kZS5cclxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xyXG4gICAgICAgICAgICBpZiAocHJldiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gcHJldi5uZXh0O1xyXG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5FbGVtZW50cysrO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cclxuICAgICogQHJldHVybiB7Kn0gdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXHJcbiAgICAqIGVtcHR5LlxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cclxuICAgICogQHJldHVybiB7Kn0gdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcclxuICAgICogZW1wdHkuXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5sYXN0Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBkZXNpcmVkIGluZGV4LlxyXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXNcclxuICAgICAqIG91dCBvZiBib3VuZHMuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4KTtcclxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZS5lbGVtZW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZVxyXG4gICAgICogc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoZSBMaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhpcyBlbGVtZW50LlxyXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIGxpc3QgYXJlXHJcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxyXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxyXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgKlxyXG4gICAgICogPHByZT5cclxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcclxuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XHJcbiAgICAgKiB9XHJcbiAgICAgKiA8L3ByZT5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXHJcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2VcclxuICAgICAqIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhpcyBsaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhlXHJcbiAgICAgKiBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICAgICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcclxuICAgICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxyXG4gICAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cclxuICAgICAgICpcclxuICAgICAgICogPHByZT5cclxuICAgICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xyXG4gICAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICAgKiB9XHJcbiAgICAgICAqIDwvcHJlPlxyXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXHJcbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXHJcbiAgICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cclxuICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBmYWxzZVxyXG4gICAgICAgKiBvdGhlcndpc2UuXHJcbiAgICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuaW5kZXhPZihpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxyXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XHJcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICogfVxyXG4gICAgICogPC9wcmU+XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpc3QsIGlmIHByZXNlbnQuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBsaXN0IGNvbnRhaW5lZCB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA8IDEgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5uZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubkVsZW1lbnRzLS07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnROb2RlO1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgbGlzdC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXHJcbiAgICAgKiBUd28gbGlzdHMgYXJlIGVxdWFsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBvcmRlci5cclxuICAgICAqIEBwYXJhbSB7TGlua2VkTGlzdH0gb3RoZXIgdGhlIG90aGVyIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxyXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLiBJZiB0aGUgZWxlbWVudHMgaW4gdGhlIGxpc3RzXHJcbiAgICAgKiBhcmUgY3VzdG9tIG9iamVjdHMgeW91IHNob3VsZCBwcm92aWRlIGEgZnVuY3Rpb24sIG90aGVyd2lzZVxyXG4gICAgICogdGhlID09PSBvcGVyYXRvciBpcyB1c2VkIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVudHMuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBlcUYgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICAgICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBMaW5rZWRMaXN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXIuc2l6ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXF1YWxzQXV4KHRoaXMuZmlyc3ROb2RlLCBvdGhlci5maXJzdE5vZGUsIGVxRik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzQXV4ID0gZnVuY3Rpb24gKG4xLCBuMiwgZXFGKSB7XHJcbiAgICAgICAgd2hpbGUgKG4xICE9PSBudWxsICYmIG4yICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICghZXFGKG4xLmVsZW1lbnQsIG4yLmVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbjEgPSBuMS5uZXh0O1xyXG4gICAgICAgICAgICBuMiA9IG4yLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBnaXZlbiBpbmRleC5cclxuICAgICAqIEByZXR1cm4geyp9IHJlbW92ZWQgZWxlbWVudCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzIG91dCBvZiBib3VuZHMuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZUVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cyB8fCB0aGlzLmZpcnN0Tm9kZSA9PT0gbnVsbCB8fCB0aGlzLmxhc3ROb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBlbGVtZW50O1xyXG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMSkge1xyXG4gICAgICAgICAgICAvL0ZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xyXG4gICAgICAgICAgICBpZiAocHJldmlvdXMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmZpcnN0Tm9kZS5uZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzLm5leHQgPT09IHRoaXMubGFzdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzICE9PSBudWxsICYmIHByZXZpb3VzLm5leHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBwcmV2aW91cy5uZXh0LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gcHJldmlvdXMubmV4dC5uZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzLS07XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBsaXN0IGluIG9yZGVyLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXHJcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXHJcbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soY3VycmVudE5vZGUuZWxlbWVudCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV2ZXJzZXMgdGhlIG9yZGVyIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpbmtlZCBsaXN0IChtYWtlcyB0aGUgbGFzdFxyXG4gICAgICogZWxlbWVudCBmaXJzdCwgYW5kIHRoZSBmaXJzdCBlbGVtZW50IGxhc3QpLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB2YXIgdGVtcCA9IG51bGw7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGVtcCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgY3VycmVudCA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlbXAgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMubGFzdE5vZGU7XHJcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHRlbXA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QgaW4gcHJvcGVyXHJcbiAgICAgKiBzZXF1ZW5jZS5cclxuICAgICAqIEByZXR1cm4ge0FycmF5LjwqPn0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCxcclxuICAgICAqIGluIHByb3BlciBzZXF1ZW5jZS5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChjdXJyZW50Tm9kZS5lbGVtZW50KTtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzIDw9IDA7XHJcbiAgICB9O1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5cy50b1N0cmluZyh0aGlzLnRvQXJyYXkoKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5ub2RlQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gKHRoaXMubkVsZW1lbnRzIC0gMSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleCAmJiBub2RlICE9IG51bGw7IGkrKykge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IGl0ZW0sXHJcbiAgICAgICAgICAgIG5leHQ6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBMaW5rZWRMaXN0O1xyXG59KCkpOyAvLyBFbmQgb2YgbGlua2VkIGxpc3RcclxuZXhwb3J0cy5kZWZhdWx0ID0gTGlua2VkTGlzdDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlua2VkTGlzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgTGlua2VkTGlzdF8xID0gcmVxdWlyZShcIi4vTGlua2VkTGlzdFwiKTtcclxudmFyIFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IHF1ZXVlLlxyXG4gICAgICogQGNsYXNzIEEgcXVldWUgaXMgYSBGaXJzdC1Jbi1GaXJzdC1PdXQgKEZJRk8pIGRhdGEgc3RydWN0dXJlLCB0aGUgZmlyc3RcclxuICAgICAqIGVsZW1lbnQgYWRkZWQgdG8gdGhlIHF1ZXVlIHdpbGwgYmUgdGhlIGZpcnN0IG9uZSB0byBiZSByZW1vdmVkLiBUaGlzXHJcbiAgICAgKiBpbXBsZW1lbnRhdGlvbiB1c2VzIGEgbGlua2VkIGxpc3QgYXMgYSBjb250YWluZXIuXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUXVldWUoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpbmtlZExpc3RfMS5kZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuYWRkKGVsZW0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBhbmQgcmVtb3ZlcyB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMubGlzdC5maXJzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlRWxlbWVudEF0SW5kZXgoMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcywgYnV0IGRvZXMgbm90IHJlbW92ZSwgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LmZpcnN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBzdGFjayBhcmVcclxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciwgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxyXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxyXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgKlxyXG4gICAgICogPHByZT5cclxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSAocGV0MSwgcGV0Mikge1xyXG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAqIH1cclxuICAgICAqIDwvcHJlPlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcclxuICAgICAqIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LFxyXG4gICAgICogZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoZWxlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmNvbnRhaW5zKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBhbmQgb25seSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIG5vIGl0ZW1zOyBmYWxzZVxyXG4gICAgICogb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKSA8PSAwO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIGVsZW1lbnRzIGZyb20gdGhpcyBxdWV1ZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubGlzdC5jbGVhcigpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgcXVldWUgaW5cclxuICAgICAqIEZJRk8gb3JkZXIuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcclxuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cclxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGNhbGxiYWNrKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUXVldWU7XHJcbn0oKSk7IC8vIEVuZCBvZiBxdWV1ZVxyXG5leHBvcnRzLmRlZmF1bHQgPSBRdWV1ZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UXVldWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBpdGVtXHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LjRcclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcclxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXksIG9yIC0xIGlmIG5vdCBmb3VuZC5cclxuICovXHJcbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn1cclxuZXhwb3J0cy5pbmRleE9mID0gaW5kZXhPZjtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5IG9yIC0xIGlmIG5vdCBmb3VuZC5cclxuICovXHJcbmZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn1cclxuZXhwb3J0cy5sYXN0SW5kZXhPZiA9IGxhc3RJbmRleE9mO1xyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICByZXR1cm4gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDA7XHJcbn1cclxuZXhwb3J0cy5jb250YWlucyA9IGNvbnRhaW5zO1xyXG4vKipcclxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgYXJyYXkuXHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgY2hhbmdlZCBhZnRlciB0aGlzIGNhbGwuXHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmUoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbik7XHJcbiAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXkgZXF1YWxcclxuICogdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBkZXRlcm1pbmUgdGhlIGZyZXF1ZW5jeSBvZiB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgd2hvc2UgZnJlcXVlbmN5IGlzIHRvIGJlIGRldGVybWluZWQuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheVxyXG4gKiBlcXVhbCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cclxuICovXHJcbmZ1bmN0aW9uIGZyZXF1ZW5jeShhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgdmFyIGZyZXEgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGZyZXErKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnJlcTtcclxufVxyXG5leHBvcnRzLmZyZXF1ZW5jeSA9IGZyZXF1ZW5jeTtcclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIHNwZWNpZmllZCBhcnJheXMgYXJlIGVxdWFsIHRvIG9uZSBhbm90aGVyLlxyXG4gKiBUd28gYXJyYXlzIGFyZSBjb25zaWRlcmVkIGVxdWFsIGlmIGJvdGggYXJyYXlzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyXHJcbiAqIG9mIGVsZW1lbnRzLCBhbmQgYWxsIGNvcnJlc3BvbmRpbmcgcGFpcnMgb2YgZWxlbWVudHMgaW4gdGhlIHR3b1xyXG4gKiBhcnJheXMgYXJlIGVxdWFsIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBvbmUgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIHRoZSBvdGhlciBhcnJheSB0byBiZSB0ZXN0ZWQgZm9yIGVxdWFsaXR5LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVtZW50cyBpbiB0aGUgYXJyYXlzLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSB0d28gYXJyYXlzIGFyZSBlcXVhbFxyXG4gKi9cclxuZnVuY3Rpb24gZXF1YWxzKGFycmF5MSwgYXJyYXkyLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5MS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFlcXVhbHMoYXJyYXkxW2ldLCBhcnJheTJbaV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLmVxdWFscyA9IGVxdWFscztcclxuLyoqXHJcbiAqIFJldHVybnMgc2hhbGxvdyBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgdG8gY29weS5cclxuICogQHJldHVybiB7QXJyYXl9IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5XHJcbiAqL1xyXG5mdW5jdGlvbiBjb3B5KGFycmF5KSB7XHJcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KCk7XHJcbn1cclxuZXhwb3J0cy5jb3B5ID0gY29weTtcclxuLyoqXHJcbiAqIFN3YXBzIHRoZSBlbGVtZW50cyBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9ucyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gc3dhcCBlbGVtZW50cy5cclxuICogQHBhcmFtIHtudW1iZXJ9IGkgdGhlIGluZGV4IG9mIG9uZSBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIHRoZSBpbmRleCBvZiB0aGUgb3RoZXIgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBpcyBkZWZpbmVkIGFuZCB0aGUgaW5kZXhlcyBhcmUgdmFsaWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBzd2FwKGFycmF5LCBpLCBqKSB7XHJcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBhcnJheS5sZW5ndGggfHwgaiA8IDAgfHwgaiA+PSBhcnJheS5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgdGVtcCA9IGFycmF5W2ldO1xyXG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcclxuICAgIGFycmF5W2pdID0gdGVtcDtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydHMuc3dhcCA9IHN3YXA7XHJcbmZ1bmN0aW9uIHRvU3RyaW5nKGFycmF5KSB7XHJcbiAgICByZXR1cm4gJ1snICsgYXJyYXkudG9TdHJpbmcoKSArICddJztcclxufVxyXG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmc7XHJcbi8qKlxyXG4gKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBhcnJheVxyXG4gKiBzdGFydGluZyBmcm9tIGluZGV4IDAgdG8gbGVuZ3RoIC0gMS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIGl0ZXJhdGUuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xyXG4gKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXHJcbiAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxyXG4gKi9cclxuZnVuY3Rpb24gZm9yRWFjaChhcnJheSwgY2FsbGJhY2spIHtcclxuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIGVsZSA9IGFycmF5XzFbX2ldO1xyXG4gICAgICAgIGlmIChjYWxsYmFjayhlbGUpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZm9yRWFjaCA9IGZvckVhY2g7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuZXhwb3J0cy5oYXMgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XHJcbiAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcclxufTtcclxuLyoqXHJcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29tcGFyZSBlbGVtZW50IG9yZGVyLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlKGEsIGIpIHtcclxuICAgIGlmIChhIDwgYikge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdENvbXBhcmUgPSBkZWZhdWx0Q29tcGFyZTtcclxuLyoqXHJcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gdGVzdCBlcXVhbGl0eS5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0RXF1YWxzKGEsIGIpIHtcclxuICAgIHJldHVybiBhID09PSBiO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdEVxdWFscyA9IGRlZmF1bHRFcXVhbHM7XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtKSB7XHJcbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiAnJHMnICsgaXRlbTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAnJG8nICsgaXRlbS50b1N0cmluZygpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdFRvU3RyaW5nID0gZGVmYXVsdFRvU3RyaW5nO1xyXG4vKipcclxuKiBKb2lucyBhbGwgdGhlIHByb3BlcmllcyBvZiB0aGUgb2JqZWN0IHVzaW5nIHRoZSBwcm92aWRlZCBqb2luIHN0cmluZ1xyXG4qL1xyXG5mdW5jdGlvbiBtYWtlU3RyaW5nKGl0ZW0sIGpvaW4pIHtcclxuICAgIGlmIChqb2luID09PSB2b2lkIDApIHsgam9pbiA9ICcsJzsgfVxyXG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIHRvcmV0ID0gJ3snO1xyXG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChleHBvcnRzLmhhcyhpdGVtLCBwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBqb2luO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIHByb3AgKyAnOicgKyBpdGVtW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b3JldCArICd9JztcclxuICAgIH1cclxufVxyXG5leHBvcnRzLm1ha2VTdHJpbmcgPSBtYWtlU3RyaW5nO1xyXG4vKipcclxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYykge1xyXG4gICAgcmV0dXJuICh0eXBlb2YgZnVuYykgPT09ICdmdW5jdGlvbic7XHJcbn1cclxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgdW5kZWZpbmVkLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xyXG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqKSA9PT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xyXG4vKipcclxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHN0cmluZy5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcclxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XHJcbn1cclxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xyXG4vKipcclxuICogUmV2ZXJzZXMgYSBjb21wYXJlIGZ1bmN0aW9uLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIHJldmVyc2VDb21wYXJlRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoY29tcGFyZUZ1bmN0aW9uKSB8fCAhaXNGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYSA9PT0gYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkLCB2KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oZCwgdikgKiAtMTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucmV2ZXJzZUNvbXBhcmVGdW5jdGlvbiA9IHJldmVyc2VDb21wYXJlRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGVxdWFsIGZ1bmN0aW9uIGdpdmVuIGEgY29tcGFyZSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlVG9FcXVhbHMoY29tcGFyZUZ1bmN0aW9uKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGEsIGIpID09PSAwO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmNvbXBhcmVUb0VxdWFscyA9IGNvbXBhcmVUb0VxdWFscztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCIvKiAvLy8gPHJlZmVyZW5jZSBwYXRoPVwic2NyaXB0aW5nLnRzXCIvPiAqL1xyXG5pbXBvcnQge1xyXG5cdGFkZEFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxyXG5cdGdldFJhbmROdW1iZXIsIGdldFZhcmlhYmxlLCBzZXF1ZW5jZSwgc2VsZWN0b3IsIGV4ZWN1dGUsIFByZWNvbmRpdGlvbiwgZ2V0QWdlbnRWYXJpYWJsZSwgbmVnX2d1YXJkLCBndWFyZCxcclxuXHRpc1ZhcmlhYmxlTm90U2V0LCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24sIGFkZFVzZXJBY3Rpb24sIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUsIGluaXRpYWxpemUsXHJcblx0Z2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXHJcblx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQsIGFyZUFkamFjZW50LCBhZGRVc2VyQWN0aW9uVHJlZVxyXG59IGZyb20gXCIuL3NjcmlwdGluZ1wiO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsXCI7XHJcblxyXG4vLyAxLiBEZWZpbmUgU3RhdGVcclxuXHJcbi8vIExvY2F0aW9uc1xyXG52YXIgU1RPUkFHRSA9IFwiU1RPUkFHRVwiO1xyXG52YXIgRE9DVE9SU19PRkZJQ0UgPSBcIkRPQ1RPUlMgT0ZGSUNFXCI7XHJcbnZhciBFTkdJTkVTID0gXCJFTkdJTkVTXCI7XHJcbnZhciBDT0NLUElUID0gXCJDT0NLUElUXCI7XHJcbnZhciBFU0NBUEVfUE9EID0gXCJFU0NBUEUgUE9EXCI7XHJcbnZhciBUUkFOU1BPUlRfUk9PTSA9IFwiVFJBTlNQT1JUIFJPT01cIjtcclxudmFyIE1PTklUT1JJTkdfUk9PTSA9IFwiTU9OSVRPUklORyBST09NXCI7XHJcbnZhciBNQUlOX0FSRUEgPSBcIk1BSU4gQVJFQVwiO1xyXG52YXIgRkVNX0JFRFJPT00gPSBcIkZFTSBCRURST09NXCI7XHJcbnZhciBNQUxFX0JFRFJPT00gPSBcIk1BTEUgQkVEUk9PTVwiO1xyXG52YXIgQkFUSFJPT00gPSBcIkJBVEhST09NXCI7XHJcbnZhciBVTktOT1dOID0gXCJVTktOT1dOXCI7XHJcblxyXG4vLyBBZGQgTG9jYXRpb25zXHJcbmFkZExvY2F0aW9uKEVOR0lORVMsIFtTVE9SQUdFLCBNQUlOX0FSRUFdKTtcclxuYWRkTG9jYXRpb24oU1RPUkFHRSwgW0VOR0lORVMsIERPQ1RPUlNfT0ZGSUNFXSk7XHJcbmFkZExvY2F0aW9uKERPQ1RPUlNfT0ZGSUNFLCBbU1RPUkFHRSwgTUFJTl9BUkVBLCBDT0NLUElULCBNT05JVE9SSU5HX1JPT01dKTtcclxuYWRkTG9jYXRpb24oQ09DS1BJVCwgW0RPQ1RPUlNfT0ZGSUNFXSk7XHJcbmFkZExvY2F0aW9uKEVTQ0FQRV9QT0QsIFtNQUlOX0FSRUFdKTtcclxuYWRkTG9jYXRpb24oVFJBTlNQT1JUX1JPT00sIFtNT05JVE9SSU5HX1JPT00sIE1BSU5fQVJFQV0pO1xyXG5hZGRMb2NhdGlvbihNT05JVE9SSU5HX1JPT00sIFtUUkFOU1BPUlRfUk9PTSwgRE9DVE9SU19PRkZJQ0VdKTtcclxuYWRkTG9jYXRpb24oTUFJTl9BUkVBLCBbRU5HSU5FUywgU1RPUkFHRSwgRE9DVE9SU19PRkZJQ0UsIFRSQU5TUE9SVF9ST09NLCBFU0NBUEVfUE9EXSk7XHJcbmFkZExvY2F0aW9uKEZFTV9CRURST09NLCBbTUFJTl9BUkVBLCBCQVRIUk9PTV0pO1xyXG5hZGRMb2NhdGlvbihNQUxFX0JFRFJPT00sIFtNQUlOX0FSRUEsIEJBVEhST09NXSk7XHJcbmFkZExvY2F0aW9uKEJBVEhST09NLCBbTUFJTl9BUkVBLCBGRU1fQkVEUk9PTSwgTUFMRV9CRURST09NXSk7XHJcblxyXG4vLyBhZ2VudHNcclxudmFyIENhbGViID0gYWRkQWdlbnQoXCJDYWxlYlwiKTtcclxudmFyIFF1aW5uID0gYWRkQWdlbnQoXCJRdWlublwiKTtcclxudmFyIE1hcmsgPSBhZGRBZ2VudChcIk1hcmtcIik7XHJcbnZhciBFZGRpZSA9IGFkZEFnZW50KFwiRWRkaWVcIik7XHJcbnZhciBCZWF0cmljZSA9IGFkZEFnZW50KFwiQmVhdHJpY2VcIik7XHJcblxyXG4vLyBpdGVtc1xyXG52YXIgd2lyZXMxID0gYWRkSXRlbShcIndpcmVzMVwiKTtcclxudmFyIHdpcmVzMiA9IGFkZEl0ZW0oXCJ3aXJlczJcIik7XHJcblxyXG5zZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBTVE9SQUdFKTtcclxuc2V0SXRlbVZhcmlhYmxlKHdpcmVzMiwgXCJjdXJyZW50TG9jYXRpb25cIiwgTU9OSVRPUklOR19ST09NKTtcclxuXHJcbi8vIC8vIHZhcmlhYmxlc1xyXG5zZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImN1cnJlbnRMb2NhdGlvblwiLCBDT0NLUElUKTtcclxudmFyIHdpcmVzQ29sbGVjdGVkID0gc2V0VmFyaWFibGUoXCJ3aXJlc0NvbGxlY3RlZFwiLCAwKTtcclxuXHJcbi8vUXVpbm5cclxuc2V0QWdlbnRWYXJpYWJsZShRdWlubiwgXCJjdXJyZW50TG9jYXRpb25cIiwgRE9DVE9SU19PRkZJQ0UpO1xyXG5cclxuLy9NYXJrXHJcbnNldEFnZW50VmFyaWFibGUoTWFyaywgXCJjdXJyZW50TG9jYXRpb25cIiwgVFJBTlNQT1JUX1JPT00pO1xyXG5cclxuLy9FZGRpZVxyXG5zZXRBZ2VudFZhcmlhYmxlKEVkZGllLCBcImN1cnJlbnRMb2NhdGlvblwiLCBTVE9SQUdFKTtcclxuXHJcbi8vQmVhdHJpY2Vcclxuc2V0QWdlbnRWYXJpYWJsZShCZWF0cmljZSwgXCJjdXJyZW50TG9jYXRpb25cIiwgRU5HSU5FUyk7XHJcblxyXG4vLyBQbGF5ZXJcclxudmFyIHBsYXllckxvY2F0aW9uID0gc2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiLCBNQUlOX0FSRUEpO1xyXG52YXIgd2lyZXNDb2xsZWN0ZWQgPSBzZXRWYXJpYWJsZShcIndpcmVzQ29sbGVjdGVkXCIsIDApO1xyXG5cclxuXHJcbi8vIEtub3dsZWRnZSBmb3IgQ2FsZWIgXHJcbnNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46d2lyZXMxXCIsIFVOS05PV04pXHJcbnNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46d2lyZXMyXCIsIFVOS05PV04pXHJcbnNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46cGxheWVyXCIsIFVOS05PV04pXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyAvLyAyLiBEZWZpbmUgQlRzXHJcbi8vIC8vIGNyZWF0ZSBncm91bmQgYWN0aW9uc1xyXG5sZXQgc2V0UmFuZE51bWJlciA9IGFjdGlvbihcclxuXHQoKSA9PiB0cnVlLFxyXG5cdCgpID0+IHNldFZhcmlhYmxlKFwicmFuZE51bWJlclwiLCBcclxuXHRcdFx0Z2V0UmFuZE51bWJlcigxLCAxMSkpLFxyXG5cdFx0XHQwXHJcbik7XHJcblxyXG5sZXQgY2hvb3NlRU5HSU5FUyA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMSwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBFTkdJTkVTKSwgMCk7XHJcbmxldCBjaG9vc2VTVE9SQUdFID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAyLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIFNUT1JBR0UpLCAwKTtcclxubGV0IGNob29zZURPQ1RPUlNfT0ZGSUNFID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAzLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIERPQ1RPUlNfT0ZGSUNFKSwgMCk7XHJcbmxldCBjaG9vc2VDT0NLUElUID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSA0LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIENPQ0tQSVQpLCAwKTtcclxubGV0IGNob29zZUVTQ0FQRV9QT0QgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDUsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgRVNDQVBFX1BPRCksIDApO1xyXG5sZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDYsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgVFJBTlNQT1JUX1JPT00pLCAwKTtcclxubGV0IGNob29zZU1PTklUT1JJTkdfUk9PTSA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gNywgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBNT05JVE9SSU5HX1JPT00pLCAwKTtcclxubGV0IGNob29zZU1BSU5fQVJFQSA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gOCwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBNQUlOX0FSRUEpLCAwKTtcclxubGV0IGNob29zZUZFTV9CRURST09NID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSA5LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIEZFTV9CRURST09NKSwgMCk7XHJcbmxldCBjaG9vc2VNQUxFX0JFRFJPT00gPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDEwLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIE1BTEVfQkVEUk9PTSksIDApO1xyXG5sZXQgY2hvb3NlQkFUSFJPT00gPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDExLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIEJBVEhST09NKSwgMCk7XHJcblxyXG5sZXQgYXREZXN0aW5hdGlvbkFnZW50ID0gZnVuY3Rpb24oYWdlbnROYW1lKXtcclxuXHRyZXR1cm4gKCkgPT4gZ2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiKSA9PSBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJjdXJyZW50TG9jYXRpb25cIik7XHJcbn1cclxuXHJcblxyXG5sZXQgYXREZXN0aW5hdGlvbkNhbGViOiBQcmVjb25kaXRpb24gPSBhdERlc3RpbmF0aW9uQWdlbnQoQ2FsZWIpXHJcbmxldCBzZXREZXN0aW5hdGlvbkNhbGViUHJlY29uZDogUHJlY29uZGl0aW9uID0gKCkgPT4gaXNWYXJpYWJsZU5vdFNldChcImRlc3RpbmF0aW9uXCIpIHx8IGF0RGVzdGluYXRpb25DYWxlYigpO1xyXG5cclxuLy8gLy8gY3JlYXRlIGJlaGF2aW9yIHRyZWVzXHJcbmxldCBzZXROZXh0RGVzdGluYXRpb24gPSBzZXF1ZW5jZShbXHJcblx0c2V0UmFuZE51bWJlcixcclxuXHRzZWxlY3RvcihbXHJcblx0XHRjaG9vc2VFTkdJTkVTLFxyXG5cdFx0Y2hvb3NlQ09DS1BJVCxcclxuXHRcdGNob29zZVNUT1JBR0UsXHJcblx0XHRjaG9vc2VET0NUT1JTX09GRklDRSxcclxuXHRcdGNob29zZUJBVEhST09NLFxyXG5cdFx0Y2hvb3NlTUFMRV9CRURST09NLFxyXG5cdFx0Y2hvb3NlRkVNX0JFRFJPT00sXHJcblx0XHRjaG9vc2VNQUlOX0FSRUEsXHJcblx0XHRjaG9vc2VNT05JVE9SSU5HX1JPT00sXHJcblx0XHRjaG9vc2VUUkFOU1BPUlRfUk9PTSxcclxuXHRcdGNob29zZUVTQ0FQRV9QT0RcclxuXHRcdFx0ICAgXHJcblx0XSlcclxuXSk7XHJcblxyXG5sZXQgZ290b05leHRMb2NhdGlvbkFnZW50ID0gZnVuY3Rpb24oYWdlbnROYW1lKXtcclxuXHRyZXR1cm4gIGFjdGlvbihcclxuXHRcdCgpID0+IHRydWUsXHJcblx0XHQoKSA9PiB7XHJcblx0XHRcdHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImN1cnJlbnRMb2NhdGlvblwiLCBnZXROZXh0TG9jYXRpb24oZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsIFwiY3VycmVudExvY2F0aW9uXCIpLCBnZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIpKSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwiIGlzIGF0OiBcIiArIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiSGVsbG86IFwiICsgZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuXHRcdH0sXHJcblx0XHQwXHJcblx0KTtcclxufVxyXG5cclxuXHJcbmxldCBnb3RvTmV4dExvY2F0aW9uQ2FsZWIgPSBnb3RvTmV4dExvY2F0aW9uQWdlbnQoQ2FsZWIpO1xyXG5sZXQgZ290b05leHRMb2NhdGlvblF1aW5uID0gZ290b05leHRMb2NhdGlvbkFnZW50KFF1aW5uKTtcclxubGV0IGdvdG9OZXh0TG9jYXRpb25NYXJrID0gZ290b05leHRMb2NhdGlvbkFnZW50KE1hcmspO1xyXG5sZXQgZ290b05leHRMb2NhdGlvbkVkZGllID0gZ290b05leHRMb2NhdGlvbkFnZW50KEVkZGllKTtcclxubGV0IGdvdG9OZXh0TG9jYXRpb25CZWF0cmljZSA9IGdvdG9OZXh0TG9jYXRpb25BZ2VudChCZWF0cmljZSk7XHJcblxyXG5cclxubGV0IGxhc3RTZWVuQnlBZ2VudCA9IGZ1bmN0aW9uKGFnZW50TmFtZSl7XHJcblx0cmV0dXJuIHNlcXVlbmNlKFtcclxuXHRcdHNlbGVjdG9yKFtcclxuXHRcdFx0YWN0aW9uKFxyXG5cdFx0XHRcdFx0Ly9wcmVjb25kaXRpb25cclxuXHRcdFx0XHRcdCgpID0+IGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykgPT0gZ2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIiksXHJcblx0XHRcdFx0XHQvL2VmZmVjdFxyXG5cdFx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhhZ2VudE5hbWUgKyBcIiBzZWVzIC0gSXRlbTogd2lyZXMxIHwgTG9jYXRpb246IFwiKyBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcclxuXHRcdFx0XHRcdFx0c2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsIFwibGFzdFNlZW46d2lyZXMxXCIsICBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdC8vdGltZSB0YWtlblxyXG5cdFx0XHRcdFx0MFxyXG5cdFx0XHRcdCksXHJcblx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7fSwwKVxyXG5cdFx0XSksXHJcblx0XHRzZWxlY3RvcihbXHJcblx0XHRcdGFjdGlvbihcclxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXHJcblx0XHRcdFx0XHQoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIpLFxyXG5cdFx0XHRcdFx0Ly9lZmZlY3RcclxuXHRcdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnROYW1lICsgXCJzZWVzIC0gSXRlbTogd2lyZXMyIHwgTG9jYXRpb246IFwiK2dldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpO1xyXG5cdFx0XHRcdFx0XHRzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczJcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXHJcblx0XHRcdFx0XHQwXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXHJcblx0XHRdKSxcclxuXHRcdHNlbGVjdG9yKFtcclxuXHRcdFx0YWN0aW9uKFxyXG5cdFx0XHRcdFx0Ly9wcmVjb25kaXRpb25cclxuXHRcdFx0XHRcdCgpID0+IGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykgPT0gZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSxcclxuXHRcdFx0XHRcdC8vZWZmZWN0XHJcblx0XHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwic2VlcyAtIFBlcnNvbjogUGxheWVyIHwgTG9jYXRpb246IFwiK2dldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpO1xyXG5cdFx0XHRcdFx0XHRzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2VlbjpwbGF5ZXJcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXHJcblx0XHRcdFx0XHQwXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXHJcblx0XHRdKVxyXG5cdF0pO1xyXG59O1xyXG5cclxuXHJcblxyXG5sZXQgbGFzdFNlZW5CeUNhbGViID0gbGFzdFNlZW5CeUFnZW50KENhbGViKVxyXG5sZXQgbGFzdFNlZW5CeVF1aW5uID0gbGFzdFNlZW5CeUFnZW50KFF1aW5uKVxyXG5sZXQgbGFzdFNlZW5CeU1hcmsgPSBsYXN0U2VlbkJ5QWdlbnQoTWFyaylcclxubGV0IGxhc3RTZWVuQnlFZGRpZSA9IGxhc3RTZWVuQnlBZ2VudChFZGRpZSlcclxubGV0IGxhc3RTZWVuQnlCZWF0cmljZSA9IGxhc3RTZWVuQnlBZ2VudChCZWF0cmljZSlcclxuXHJcblxyXG4vLyBsZXQgZmluZEl0ZW0gPSBhY3Rpb24oXHJcbi8vICAgICAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKENhbGViLCAnY3VycmVudExvY2F0aW9uJykgPT0gZ2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIiksXHJcbi8vICAgICAoKSA9PiB7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJDYWxlYiBmb3VuZCAtIEl0ZW06IHdpcmVzMVwiKVxyXG5cclxuXHJcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoZWxsb1wiKTtcclxuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhnZXRBZ2VudFZhcmlhYmxlKENhbGViLCAnY3VycmVudExvY2F0aW9uJykgPT0gZ2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4vLyAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkNhbGViIGZvdW5kIHRoZSB3aXJlczEuXCIpXHJcbi8vICAgICB9LCBcclxuLy8gICAgIDBcclxuLy8gKTtcclxuXHJcbi8vIGxldCBlYXRQbGF5ZXIgPSBhY3Rpb24oKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pLFxyXG4vLyAgICAgKCkgPT4ge1xyXG4vLyAgICAgICAgIHNldFZhcmlhYmxlKFwiZW5kR2FtZVwiLCBcImxvc2VcIik7XHJcbi8vICAgICAgICAgc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFwiTkFcIik7XHJcbi8vICAgICB9LCAwXHJcbi8vICk7XHJcblxyXG4vL3RoaXMgbWVzc1xyXG4vLyBsZXQgY29udmVyc2F0aW9uID0gYWN0aW9uKCgpID0+IGdldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSxcclxuLy8gICAgICgpID0+IHtcclxuLy8gICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGhhcHBlbiB0byBydW4gaW50byBDYWxlYi5cIiksXHJcbi8vICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkNhbGViOiBIYXZlIHlvdSBub3QgZm91bmQgdGhlIHdpcmVzIHlldD8gRGlkIHlvdSBub3QgY2hlY2sgc3RvcmFnZT9cIiksXHJcbi8vICAgICB9LFxyXG4vLyApO1xyXG5cclxuLy8gbGV0IHNlYXJjaCA9IHNlbGVjdG9yKFtcclxuLy8gICAgIGZpbmRJdGVtLFxyXG4vLyAgICAgc2VxdWVuY2UoW1xyXG4vLyAgICAgICAgIHNlbGVjdG9yKFtcclxuLy8gICAgICAgICAgICAgZ3VhcmQoc2V0RGVzdGluYXRpb25QcmVjb25kLCB7fSwgc2V0TmV4dERlc3RpbmF0aW9uKSxcclxuLy8gICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcclxuLy8gICAgICAgICAgICAgfSwge30sIDApXHJcbi8vICAgICAgICAgXSksXHJcbi8vICAgICAgICAgZ290b05leHRMb2NhdGlvbixcclxuLy8gICAgICAgICBmaW5kSXRlbVxyXG4vLyAgICAgXSlcclxuLy8gXSk7XHJcblxyXG5sZXQgc2VhcmNoID0gc2VxdWVuY2UoW1xyXG5cdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHRndWFyZChzZXREZXN0aW5hdGlvbkNhbGViUHJlY29uZCwgc2V0TmV4dERlc3RpbmF0aW9uKSxcclxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcclxuXHRcdFx0fSwwKVxyXG5cdFx0XSksXHJcblx0XHRnb3RvTmV4dExvY2F0aW9uQ2FsZWIsXHJcblx0XSk7XHJcblxyXG5cclxuLy8gbGV0IHNlYXJjaCA9IHNlcXVlbmNlKFtcclxuLy8gICAgICAgICBzZWxlY3RvcihbXHJcbi8vICAgICAgICAgICAgIGd1YXJkKHNldERlc3RpbmF0aW9uUHJlY29uZCwgc2V0TmV4dERlc3RpbmF0aW9uKSxcclxuLy8gICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcclxuLy8gICAgICAgICAgICAgfSwwKVxyXG4vLyAgICAgICAgIF0pLFxyXG4vLyAgICAgICAgIGdvdG9OZXh0TG9jYXRpb24sXHJcbi8vICAgICBdKTtcclxuXHJcbmxldCBDYWxlYkJUID0gc2VxdWVuY2UoW1xyXG5cdGxhc3RTZWVuQnlDYWxlYixcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRzZWFyY2gsIGxhc3RTZWVuQnlDYWxlYlxyXG5cdF0pXHJcbl0pO1xyXG5cclxubGV0IFF1aW5uQlQgPSBzZXF1ZW5jZShbXHJcblx0bGFzdFNlZW5CeVF1aW5uLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdHNlYXJjaCwgbGFzdFNlZW5CeVF1aW5uXHJcblx0XSlcclxuXSk7XHJcblxyXG5sZXQgTWFya0JUID0gc2VxdWVuY2UoW1xyXG5cdGxhc3RTZWVuQnlNYXJrLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdHNlYXJjaCwgbGFzdFNlZW5CeU1hcmtcclxuXHRdKVxyXG5dKTtcclxuXHJcbmxldCBFZGRpZUJUID0gc2VxdWVuY2UoW1xyXG5cdGxhc3RTZWVuQnlFZGRpZSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRzZWFyY2gsIGxhc3RTZWVuQnlFZGRpZVxyXG5cdF0pXHJcbl0pO1xyXG5cclxubGV0IEJlYXRyaWNlQlQgPSBzZXF1ZW5jZShbXHJcblx0bGFzdFNlZW5CeUJlYXRyaWNlLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdHNlYXJjaCwgbGFzdFNlZW5CeUJlYXRyaWNlXHJcblx0XSlcclxuXSk7XHJcblxyXG4vLyAvL2F0dGFjaCBiZWhhdmlvdXIgdHJlZXMgdG8gYWdlbnRzXHJcbmF0dGFjaFRyZWVUb0FnZW50KENhbGViLCBDYWxlYkJUKTtcclxuYXR0YWNoVHJlZVRvQWdlbnQoUXVpbm4sIFF1aW5uQlQpO1xyXG5hdHRhY2hUcmVlVG9BZ2VudChNYXJrLCBNYXJrQlQpO1xyXG5hdHRhY2hUcmVlVG9BZ2VudChFZGRpZSwgRWRkaWVCVCk7XHJcbmF0dGFjaFRyZWVUb0FnZW50KEJlYXRyaWNlLCBCZWF0cmljZUJUKTtcclxuXHJcbi8vIC8vIDMuIENvbnN0cnVjdCBzdG9yeVxyXG4vLyAvLyBjcmVhdGUgdXNlciBhY3Rpb25zXHJcblxyXG52YXIgc3RhcnRTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1BSU5fQVJFQSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgc2hpcCdzIG1haW4gYXJlYS5cIiksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBmb3J3YXJkIHRvIGVudGVyIHRoZSBlbmdpbmUgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEVOR0lORVMpKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIGVhc3QgdG8gZW50ZXIgdGhlIGRvY3RvcidzIG9mZmljZS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIERPQ1RPUlNfT0ZGSUNFKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyB3ZXN0IHRvIGVudGVyIHRoZSBmZW1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRkVNX0JFRFJPT00pKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHdlc3QgdG8gZW50ZXIgdGhlIGJhdGhyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkFUSFJPT00pKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHdlc3QgdG8gZW50ZXIgdGhlIG1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFMRV9CRURST09NKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBzb3V0aCB0byBlbnRlciB0aGUgZXNjYXBlIHBvZC5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEVTQ0FQRV9QT0QpKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIGludG8gdGhlIHRyYW5zcG9ydCByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVFJBTlNQT1JUX1JPT00pKSxcclxuXHRcdF1cclxuXHQpKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShzdGFydFN0YXRlQlQpO1xyXG52YXIgYmNTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEVOR0lORVMsXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGVuZ2luZSByb29tLlwiKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkhlYWQgZWFzdCBpbnRvIHRoZSBzdG9yYWdlIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBTVE9SQUdFKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxyXG5cdFx0XVxyXG5cdCkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGJjU3RhdGVCVCk7XHJcbnZhciBiclN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gU1RPUkFHRSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlZCBpbnRvIHRoZSBzdG9yYWdlIHJvb20uXCIpLFxyXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIGRvY3RvcidzIG9mZmljZS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIERPQ1RPUlNfT0ZGSUNFKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIGJhY2sgaW50byB0aGUgZW5naW5lIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFTkdJTkVTKSksXHJcblx0XHRdXHJcblx0KSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoYnJTdGF0ZUJUKTtcclxudmFyIHF1YXJ0ZXJzMUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IERPQ1RPUlNfT0ZGSUNFLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIpLFxyXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBzdG9yYWdlIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBTVE9SQUdFKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIGludG8gdGhlIGNvY2twaXQuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT0NLUElUKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyB0byB0aGUgbW9uaXRvcmluZyByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTU9OSVRPUklOR19ST09NKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxyXG5cdFx0XVxyXG5cdCkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHF1YXJ0ZXJzMUJUKTtcclxudmFyIG1yU3RhdGVCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBDT0NLUElULFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgZm9yd2FyZCBpbnRvIHRoZSBjb2NrcGl0LlwiKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRE9DVE9SU19PRkZJQ0UpKSxcclxuXHRcdF1cclxuXHQpKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShtclN0YXRlQlQpO1xyXG52YXIgcXVhcnRlcnMyQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTU9OSVRPUklOR19ST09NLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBtb25pdG9yaW5nIHJvb20uXCIpLFxyXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBET0NUT1JTX09GRklDRSkpLFxyXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gdG8gdGhlIHRyYW5zcG9ydCByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVFJBTlNQT1JUX1JPT00pKSxcclxuXHRcdF1cclxuXHQpKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShxdWFydGVyczJCVCk7XHJcbnZhciBtZWRpY2FsQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gVFJBTlNQT1JUX1JPT00sXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHRyYW5zcG9ydCByb29tIHdoZXJlIHRoZSB0ZWxlcG9ydGVyIGlzIGxvY2F0ZWQuXCIpLFxyXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiRXhpdCB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1PTklUT1JJTkdfUk9PTSkpLFxyXG5cdFx0XVxyXG5cdCkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKG1lZGljYWxCVCk7XHJcbnZhciBsYWJCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBFU0NBUEVfUE9ELFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBlc2NhcGUgcG9kLlwiKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkV4aXQgaW50byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXHJcblx0XHRdXHJcblx0KSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUobGFiQlQpO1xyXG52YXIgdHJTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEZFTV9CRURST09NLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgaW50byB0aGUgZmVtYWxlcycgYmVkcm9vbS5cIiksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHNvdXRoIHRvIHRoZSBiYXRocm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJBVEhST09NKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFeGl0IGludG8gdGhlIG1haW4gcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxyXG5cdFx0XVxyXG5cdCkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHRyU3RhdGVCVCk7XHJcbnZhciB0Y1N0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQkFUSFJPT00sXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBpbnRvIHRoZSBiYXRocm9vbS5cIiksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHNvdXRoIGludG8gdGhlIG1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFMRV9CRURST09NKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIG5vcnRoIGludG8gdGhlIGZlbWFsZXMnIGJlZHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBGRU1fQkVEUk9PTSkpLFxyXG5cdFx0XVxyXG5cdCkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHRjU3RhdGVCVCk7XHJcblxyXG52YXIgdGxTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1BTEVfQkVEUk9PTSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIG1hbGVzJyBiZWRyb29tLlwiKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBiYXRocm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJBVEhST09NKSksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXHJcblx0XHRdXHJcblx0KSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGxTdGF0ZUJUKTtcclxuXHJcbnZhciB3aXJlczFCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBub3RpY2Ugd2lyZXMgb24gdGhlIGdyb3VuZC5cIiksXHJcblx0XHRcdGFkZFVzZXJBY3Rpb25UcmVlKFwiUGljayB1cCB0aGUgd2lyZXMuXCIsXHJcblx0XHRcdFx0c2VxdWVuY2UoW1xyXG5cdFx0XHRcdFx0YWN0aW9uKCgpPT50cnVlLCAoKSA9PiB7XHJcblx0XHRcdFx0XHRkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIllvdSBwaWNrIHVwIHRoZSB3aXJlcy5cIik7XHJcblx0XHRcdFx0XHRzZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInBsYXllclwiKTtcclxuXHRcdFx0XHRcdHNldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkLCBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkgKyAxKTtcclxuXHRcdFx0XHR9LCAwKSxcclxuXHRcdFx0XHRcdC8vIGFjdGlvbigoKT0+dHJ1ZSwgKCkgPT4ge1xyXG5cdFx0XHRcdFx0Ly8gICAgIGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiV293IHlvdSBrbm93IGhvdyB0byBwaWNrIHVwIHRoaW5ncy5cIil9LCAwKVxyXG5cdFx0XHRcdF0pXHJcblx0XHRcdClcclxuXHRcdF1cclxuXHQpKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZSh3aXJlczFCVCk7XHJcblxyXG52YXIgd2lyZXMyQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gZ2V0SXRlbVZhcmlhYmxlKHdpcmVzMiwgXCJjdXJyZW50TG9jYXRpb25cIiksXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugbm90aWNlIHdpcmVzIG9uIHRoZSBncm91bmQuXCIpLFxyXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiUGljayB1cCB0aGUgd2lyZXMuXCIsICgpID0+IHtcclxuXHRcdFx0XHRkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIllvdSBwaWNrIHVwIHRoZSB3aXJlcy5cIik7XHJcblx0XHRcdFx0c2V0SXRlbVZhcmlhYmxlKHdpcmVzMiwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIik7XHJcblx0XHRcdFx0c2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQsIGdldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkKSArIDEpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XVxyXG5cdCkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHdpcmVzMkJUKTtcclxuXHJcblxyXG4vLyAvLzQuIFJ1biB0aGUgd29ybGRcclxuaW5pdGlhbGl6ZSgpO1xyXG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCk7XHJcblxyXG4vLyAvL1JFTkRFUklORy0tLS0tXHJcbnZhciBkaXNwbGF5UGFuZWwgPSB7eDogMjUwLCB5OiAwfTtcclxudmFyIHRleHRQYW5lbCA9IHt4OiA1MDAsIHk6IDUwMX07XHJcbnZhciBhY3Rpb25zUGFuZWwgPSB7eDogNTIwLCB5OiA1NTB9O1xyXG5cclxudmFyIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXknKTtcclxudmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbnZhciBzcGFjZXNoaXBJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5zcGFjZXNoaXBJbWFnZS5vbmxvYWQgPSByZW5kZXI7XHJcbnZhciBwbGF5ZXJJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG52YXIgY2FsZWJJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG52YXIgcXVpbm5JbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG52YXIgbWFya0ltYWdlID0gbmV3IEltYWdlKCk7XHJcbnZhciBlZGRpZUltYWdlID0gbmV3IEltYWdlKCk7XHJcbnZhciBiZWF0cmljZUltYWdlID0gbmV3IEltYWdlKCk7XHJcblxyXG5mdW5jdGlvbiByZW5kZXIoKSB7XHJcblx0Y29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRjb250ZXh0LmRyYXdJbWFnZShzcGFjZXNoaXBJbWFnZSwgZGlzcGxheVBhbmVsLngsIGRpc3BsYXlQYW5lbC55LCAxMDAwLCA1MDApO1xyXG5cdGRpc3BsYXlQbGF5ZXIoKTtcclxuXHRkaXNwbGF5Q2FsZWIoKTtcclxuXHRkaXNwbGF5UXVpbm4oKTtcclxuXHRkaXNwbGF5TWFyaygpO1xyXG5cdGRpc3BsYXlFZGRpZSgpO1xyXG5cdGRpc3BsYXlCZWF0cmljZSgpO1xyXG5cdGRpc3BsYXlUZXh0QW5kQWN0aW9ucygpO1xyXG59XHJcblxyXG52YXIgbWFwUG9zaXRpb25zID0ge1xyXG5cdFwiRU5HSU5FU1wiOiB7eDogMjc1LCB5OiAxMTB9LFxyXG5cdFwiQ09DS1BJVFwiOiB7eDogODYwLCB5OiAyMzB9LFxyXG5cdFwiU1RPUkFHRVwiOiB7eDogNTQ1LCB5OiAxMTB9LFxyXG5cdFwiRE9DVE9SUyBPRkZJQ0VcIjoge3g6IDcyNSwgeTogMzUwfSxcclxuXHRcIk1BSU4gQVJFQVwiOiB7eDogNDY1LCB5OiAyNDB9LFxyXG5cdFwiRVNDQVBFIFBPRFwiOiB7eDogMjI0LCB5OiA0MDh9LFxyXG5cdFwiVFJBTlNQT1JUIFJPT01cIjoge3g6IDM3MCwgeTogMzYwfSxcclxuXHRcIk1PTklUT1JJTkcgUk9PTVwiOiB7eDogNTM1LCB5OiAzNjB9LFxyXG5cdFwiQkFUSFJPT01cIjoge3g6IDg1LCB5OiAyNDB9LFxyXG5cdFwiTUFMRSBCRURST09NXCI6IHt4OiA4NSwgeTogMzMwfSxcclxuXHRcIkZFTSBCRURST09NXCI6IHt4OiA4NSwgeTogMTUwfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheVBsYXllcigpIHtcclxuXHR2YXIgY3VyckxvY2F0aW9uID0gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pO1xyXG5cdGlmICghaXNVbmRlZmluZWQobWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0pKVxyXG5cdFx0Y29udGV4dC5kcmF3SW1hZ2UocGxheWVySW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5Q2FsZWIoKSB7XHJcblx0dmFyIGN1cnJMb2NhdGlvbiA9IGdldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwiY3VycmVudExvY2F0aW9uXCIpO1xyXG5cdGNvbnRleHQuZHJhd0ltYWdlKGNhbGViSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5UXVpbm4oKSB7XHJcblx0dmFyIGN1cnJMb2NhdGlvbiA9IGdldEFnZW50VmFyaWFibGUoUXVpbm4sIFwiY3VycmVudExvY2F0aW9uXCIpO1xyXG5cdGNvbnRleHQuZHJhd0ltYWdlKHF1aW5uSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5TWFyaygpIHtcclxuXHR2YXIgY3VyckxvY2F0aW9uID0gZ2V0QWdlbnRWYXJpYWJsZShNYXJrLCBcImN1cnJlbnRMb2NhdGlvblwiKTtcclxuXHRjb250ZXh0LmRyYXdJbWFnZShtYXJrSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5RWRkaWUoKSB7XHJcblx0dmFyIGN1cnJMb2NhdGlvbiA9IGdldEFnZW50VmFyaWFibGUoRWRkaWUsIFwiY3VycmVudExvY2F0aW9uXCIpO1xyXG5cdGNvbnRleHQuZHJhd0ltYWdlKGVkZGllSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QmVhdHJpY2UoKSB7XHJcblx0dmFyIGN1cnJMb2NhdGlvbiA9IGdldEFnZW50VmFyaWFibGUoQmVhdHJpY2UsIFwiY3VycmVudExvY2F0aW9uXCIpO1xyXG5cdGNvbnRleHQuZHJhd0ltYWdlKGJlYXRyaWNlSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xyXG59XHJcblxyXG5zcGFjZXNoaXBJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9zaGlwX21heWJlLnBuZ1wiO1xyXG5wbGF5ZXJJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9UYXlsb3IucG5nXCI7XHJcbmNhbGViSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvQ2FsZWIucG5nXCI7XHJcbnF1aW5uSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvUXVpbm4ucG5nXCI7XHJcbm1hcmtJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9NYXJrLnBuZ1wiO1xyXG5lZGRpZUltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL0VkZGllLnBuZ1wiO1xyXG5iZWF0cmljZUltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL0JlYXRyaWNlLnBuZ1wiO1xyXG5cclxudmFyIGN1cnJlbnRTZWxlY3Rpb247XHJcbnZhciB5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcclxudmFyIHlPZmZzZXRJbmNyZW1lbnQgPSAyNTtcclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlUZXh0QW5kQWN0aW9ucygpIHtcclxuXHRjb250ZXh0LmNsZWFyUmVjdCh0ZXh0UGFuZWwueCwgdGV4dFBhbmVsLnksIDUwMCwgMTAwMCk7XHJcblx0eU9mZnNldCA9IGFjdGlvbnNQYW5lbC55ICsgMjU7XHJcblxyXG5cdGNvbnRleHQuZm9udCA9IFwiMTVwdCBDYWxpYnJpXCI7XHJcblx0Y29udGV4dC5maWxsU3R5bGUgPSAncGluayc7XHJcblx0Y29uc29sZS5sb2coXCJBY3Rpb25zIGVmZmVjdCB0ZXh0OiBcIiArIHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCk7XHJcblx0dmFyIHRleHRUb0Rpc3BsYXkgPSB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQubGVuZ3RoICE9IDAgPyB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgOiB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dDtcclxuXHRjb250ZXh0LmZpbGxUZXh0KHRleHRUb0Rpc3BsYXksIHRleHRQYW5lbC54LCB0ZXh0UGFuZWwueSArIDIwKTtcclxuXHJcblx0Y29udGV4dC5mb250ID0gXCIxNXB0IENhbGlicmlcIjtcclxuXHRjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgdXNlckFjdGlvblRleHQgPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0W2ldO1xyXG5cdFx0Y29udGV4dC5maWxsVGV4dCh1c2VyQWN0aW9uVGV4dCwgYWN0aW9uc1BhbmVsLnggKyAyMCwgeU9mZnNldCk7XHJcblx0XHRpZiAoaSA9PSAwKSB7XHJcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSBpO1xyXG5cdFx0fVxyXG5cdFx0eU9mZnNldCArPSB5T2Zmc2V0SW5jcmVtZW50O1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheUFycm93KCk7XHJcblx0Y29uc29sZS5sb2coXCJ3aXJlczogXCIgKyBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QXJyb3coKSB7XHJcblx0aWYodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCl7XHJcblx0XHRjb250ZXh0LmNsZWFyUmVjdChhY3Rpb25zUGFuZWwueCwgYWN0aW9uc1BhbmVsLnksIDIwLCAxMDAwKTtcclxuXHRcdGNvbnRleHQuZmlsbFRleHQoXCI+IFwiLCA1MjAsIGFjdGlvbnNQYW5lbC55ICsgMjUgKyAoY3VycmVudFNlbGVjdGlvbiAqIHlPZmZzZXRJbmNyZW1lbnQpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vVXNlciBpbnB1dFxyXG5mdW5jdGlvbiBrZXlQcmVzcyhlKSB7XHJcblx0aWYgKGUua2V5Q29kZSA9PSAxMykge1xyXG5cdFx0dmFyIHNlbGVjdGVkQWN0aW9uID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dFtjdXJyZW50U2VsZWN0aW9uXTtcclxuXHRcdGlmKCFpc1VuZGVmaW5lZChzZWxlY3RlZEFjdGlvbikpe1xyXG5cdFx0XHRleGVjdXRlVXNlckFjdGlvbihzZWxlY3RlZEFjdGlvbik7XHJcblx0XHRcdHdvcmxkVGljaygpO1xyXG5cdFx0XHRyZW5kZXIoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGtleURvd24oZSkge1xyXG5cdGlmIChlLmtleUNvZGUgPT0gNDApIHsvL2Rvd25cclxuXHRcdGlmICh1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24rKztcclxuXHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IGN1cnJlbnRTZWxlY3Rpb24gJSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDtcclxuXHRcdFx0ZGlzcGxheUFycm93KCk7XHJcblx0XHR9XHJcblx0fSBlbHNlIGlmIChlLmtleUNvZGUgPT0gMzgpIHsvL3VwXHJcblx0XHRpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uLS07XHJcblx0XHRcdGlmIChjdXJyZW50U2VsZWN0aW9uIDwgMClcclxuXHRcdFx0XHRjdXJyZW50U2VsZWN0aW9uID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggLSAxO1xyXG5cdFx0XHRkaXNwbGF5QXJyb3coKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBrZXlQcmVzcywgZmFsc2UpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlEb3duLCBmYWxzZSk7IiwiaW1wb3J0IFF1ZXVlIGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL1F1ZXVlXCI7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBlbnVtIFN0YXR1cyB7XHJcbiAgICBSVU5OSU5HLFxyXG4gICAgU1VDQ0VTUyxcclxuICAgIEZBSUxVUkVcclxufVxyXG5cclxuZnVuY3Rpb24gdGVybWluYXRlQW5kUmV0dXJuKGlkOiBudW1iZXIsIGJsYWNrYm9hcmQ6IGFueSwgc3RhdHVzOiBTdGF0dXMpIHtcclxuICAgIGRlbGV0ZSBibGFja2JvYXJkW2lkXTtcclxuICAgIHJldHVybiBzdGF0dXM7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEVmZmVjdCA9ICgpID0+IHZvaWRcclxuZXhwb3J0IHR5cGUgUHJlY29uZGl0aW9uID0gKCkgPT4gYm9vbGVhblxyXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXHJcbmV4cG9ydCB0eXBlIEFjdGlvblRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgR3VhcmRUaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrLCBuZWdhdGU/OiBib29sZWFuKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBTZXF1ZW5jZS9TZWxlY3RvclxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXHJcblxyXG52YXIgYmxhY2tib2FyZCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0QWN0aW9uVGljayhpZDogbnVtYmVyKTogQWN0aW9uVGljayB7XHJcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkID0gMSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcmVjb25kaXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lID0gdGlja3NSZXF1aXJlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmxhY2tib2FyZFtpZF0udGlja3NEb25lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcclxuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBhc3RUaWNrLCBuZWdhdGUgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZWVkID8gZXhlY3V0ZShhc3RUaWNrKSA6IFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcclxuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0b3JUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcclxuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGUoYXN0VGljazogVGljayk6IFN0YXR1cyB7XHJcbiAgICByZXR1cm4gYXN0VGljaygpO1xyXG59XHJcblxyXG52YXIgZ2xvYmFsSWRDb3VudGVyID0gMDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb24ocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0QWN0aW9uVGljayhnbG9iYWxJZENvdW50ZXIrKykocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2ssIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBzdWNjZXNzIG9mIGEgY2hpbGRcclxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcclxuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXHJcbiAqIEByZXR1cm5zIHtUaWNrfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRTZXF1ZW5jZVRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxyXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xyXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcclxuICogQHJldHVybnMge1RpY2t9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0b3IoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xyXG59XHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0gQVBJcyAtLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbi8vMC4gdXRpbGl0aWVzXHJcbi8vIG1pbiBhbmQgbWF4IGFyZSBpbmNsdXNpdmVcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmROdW1iZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcblxyXG4vLzEuIHN0b3J5IGluc3RhbmNlXHJcblxyXG4vLzEuMSBsb2NhdGlvbnNcclxudmFyIGxvY2F0aW9uR3JhcGggPSB7fTtcclxuXHJcbi8vYWRkIHRvIGJvdGggc2lkZXNcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2F0aW9uKGxvY2F0aW9uTmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IFtdO1xyXG4gICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdLmNvbmNhdChhZGphY2VudExvY2F0aW9ucyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID0gW107XHJcblxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dLnB1c2gobG9jYXRpb25OYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFkamFjZW50KGxvY2F0aW9uMTogc3RyaW5nLCBsb2NhdGlvbjI6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFyZSBhZGphY2VudDogXCIgKyBsb2NhdGlvbjEgKyBcIiwgXCIrbG9jYXRpb24yKTtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0gPT0gdW5kZWZpbmVkIHx8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24yXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWl0aGVyIG9uZS9ib3RoIGxvY2F0aW9ucyB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXVtpXSA9PSBsb2NhdGlvbjIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8vcGF0aGZpbmRpbmcgcHJpbWl0aXZlc1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dExvY2F0aW9uKHN0YXJ0OiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdmFyIHZpc2l0ZWQgPSB7fTtcclxuICAgIHZhciBwcmV2aW91cyA9IHt9O1xyXG4gICAgZm9yICh2YXIga2V5IGluIGxvY2F0aW9uR3JhcGgpIHtcclxuICAgICAgICB2aXNpdGVkW2tleV0gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgbXlRdWV1ZSA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XHJcbiAgICBteVF1ZXVlLmVucXVldWUoc3RhcnQpO1xyXG5cclxuICAgIHdoaWxlICghbXlRdWV1ZS5pc0VtcHR5KCkpIHtcclxuICAgICAgICB2YXIgY3VycmVudDogc3RyaW5nID0gbXlRdWV1ZS5kZXF1ZXVlKCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gbG9jYXRpb25HcmFwaFtjdXJyZW50XTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF2aXNpdGVkW25laWdoYm9yc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgIG15UXVldWUuZW5xdWV1ZShuZWlnaGJvcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgdmlzaXRlZFtuZWlnaGJvcnNbaV1dID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yc1tpXV0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBkZXN0aW5hdGlvbjtcclxuICAgIGlmIChjdXJyZW50ID09IHN0YXJ0KVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgd2hpbGUgKHByZXZpb3VzW2N1cnJlbnRdICE9IHN0YXJ0KSB7XHJcbiAgICAgICAgY3VycmVudCA9IHByZXZpb3VzW2N1cnJlbnRdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG4vLzEuMiBhZ2VudHNcclxudmFyIGFnZW50cyA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFnZW50KGFnZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICBhZ2VudHMucHVzaChhZ2VudE5hbWUpO1xyXG4gICAgcmV0dXJuIGFnZW50TmFtZTtcclxufVxyXG5cclxuLy8xLjMgaXRlbXNcclxudmFyIGl0ZW1zID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShpdGVtTmFtZTogc3RyaW5nKSB7XHJcbiAgICBpdGVtcy5wdXNoKGl0ZW1OYW1lKTtcclxuICAgIHJldHVybiBpdGVtTmFtZTtcclxufVxyXG5cclxuLy8xLjQgdmFyaWFibGVzXHJcbnZhciB2YXJpYWJsZXMgPSB7fTtcclxudmFyIGFnZW50VmFyaWFibGVzID0ge307XHJcbnZhciBpdGVtVmFyaWFibGVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICB2YXJpYWJsZXNbdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YXJOYW1lO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pKVxyXG4gICAgICAgIGFnZW50VmFyaWFibGVzW2FnZW50XSA9IHt9O1xyXG5cclxuICAgIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgIGlmIChpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBub3Qgc2V0IVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFyaWFibGVzW3Zhck5hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBhZ2VudCBcIiArIGFnZW50ICsgXCIgbm90IHNldCFcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWYXJpYWJsZU5vdFNldCh2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNBZ2VudFZhcmlhYmxlTm90U2V0KGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pKVxyXG4gICAgICAgIGl0ZW1WYXJpYWJsZXNbaXRlbV0gPSB7fTtcclxuXHJcbiAgICBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSB8fCBpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGl0ZW0gXCIgKyBpdGVtICsgXCIgbm90IHNldCFcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXTtcclxufVxyXG5cclxuXHJcbi8vMlxyXG4vL2FnZW50LWJlaGF2aW9yIHRyZWUgbWFwcGluZ1xyXG52YXIgYWdlbnRUcmVlcyA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFRyZWVUb0FnZW50KGFnZW50OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcclxuICAgIGFnZW50VHJlZXNbYWdlbnRdID0gdHJlZTtcclxufVxyXG5cclxuLy8zLjFcclxuLy91c2VyIGFjdGlvbnNcclxuLy9UT0RPIGFkZCB2YXJpYWJsZXMgdG8gdXNlciBhY3Rpb24gdGV4dHNcclxudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IHtcclxuICAgIHRleHQ6IFwiXCIsXHJcbiAgICB1c2VyQWN0aW9uc1RleHQ6IFtdLFxyXG4gICAgYWN0aW9uRWZmZWN0c1RleHQ6IFwiXCJcclxufVxyXG52YXIgdXNlckludGVyYWN0aW9uVHJlZXMgPSBbXTtcclxudmFyIHVzZXJBY3Rpb25zID0ge307XHJcblxyXG5mdW5jdGlvbiBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpIHtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ID0gXCJcIjtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQgPSBbXTtcclxuICAgIHVzZXJBY3Rpb25zID0ge307Ly97XCJHbyB0byBsb2NhdGlvbiBYXCIgOiBlZmZlY3RcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uVHJlZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBleGVjdXRlKHVzZXJJbnRlcmFjdGlvblRyZWVzW2ldKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24gPSAodGV4dDogc3RyaW5nKSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgKz0gXCJcXG5cIiArIHRleHQsIDBcclxuICAgICk7XHJcbmV4cG9ydCBsZXQgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQgPSAodGV4dDogc3RyaW5nKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgKz0gXCJcXG5cIiArIHRleHQ7XHJcblxyXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb25UcmVlID0gKHRleHQ6IHN0cmluZywgZWZmZWN0VHJlZTogVGljaykgPT4gYWN0aW9uKFxyXG4gICAgKCkgPT4gdHJ1ZSxcclxuICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgZWZmZWN0VHJlZSksIDBcclxuKTtcclxuXHJcbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdDogKCkgPT4gYW55KSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBhY3Rpb24oKCk9PnRydWUsIGVmZmVjdCwgMCkpLCAwXHJcbiAgICApO1xyXG5cclxuZnVuY3Rpb24gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcclxuICAgIHVzZXJBY3Rpb25zW3RleHRdID0gdHJlZTtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQucHVzaCh0ZXh0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGljazogVGljaykge1xyXG4gICAgdXNlckludGVyYWN0aW9uVHJlZXMucHVzaCh0aWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVVc2VyQWN0aW9uKHRleHQ6IHN0cmluZykge1xyXG4gICAgLy9leGVjdXRlIHRoZSB1c2VyIGFjdGlvblxyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ID0gXCJcIjtcclxuICAgIHZhciB1c2VyQWN0aW9uRWZmZWN0VHJlZSA9IHVzZXJBY3Rpb25zW3RleHRdO1xyXG4gICAgZXhlY3V0ZSh1c2VyQWN0aW9uRWZmZWN0VHJlZSk7XHJcbn1cclxuXHJcbi8vNC5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCkge1xyXG4gICAgcmV0dXJuIHVzZXJJbnRlcmFjdGlvbk9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdvcmxkVGljaygpIHtcclxuICAgIC8vYWxsIGFnZW50IHRpY2tzXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0cmVlID0gYWdlbnRUcmVlc1thZ2VudHNbaV1dO1xyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodHJlZSkpIHtcclxuICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJleGVjdXRpbmdBZ2VudFwiLCBhZ2VudHNbaV0pO1xyXG4gICAgICAgICAgICBleGVjdXRlKHRyZWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XHJcbn0iXX0=
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL21hZGRpZS50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsNEJBQWdCLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDOUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsNEJBQWdCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDN0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsNEJBQWdCLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDOUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsNEJBQWdCLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDakUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENB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QUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQVZELDhCQVVDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgYXJyYXlzID0gcmVxdWlyZShcIi4vYXJyYXlzXCIpO1xudmFyIExpbmtlZExpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgKiBDcmVhdGVzIGFuIGVtcHR5IExpbmtlZCBMaXN0LlxuICAgICogQGNsYXNzIEEgbGlua2VkIGxpc3QgaXMgYSBkYXRhIHN0cnVjdHVyZSBjb25zaXN0aW5nIG9mIGEgZ3JvdXAgb2Ygbm9kZXNcbiAgICAqIHdoaWNoIHRvZ2V0aGVyIHJlcHJlc2VudCBhIHNlcXVlbmNlLlxuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKi9cbiAgICBmdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xuICAgICAgICAvKipcbiAgICAgICAgKiBGaXJzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAqIExhc3Qgbm9kZSBpbiB0aGUgbGlzdFxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICogQHByaXZhdGVcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAqIE51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbGlzdFxuICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICogQHByaXZhdGVcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEFkZHMgYW4gZWxlbWVudCB0byB0aGlzIGxpc3QuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIGFkZGVkLlxuICAgICogQHBhcmFtIHtudW1iZXI9fSBpbmRleCBvcHRpb25hbCBpbmRleCB0byBhZGQgdGhlIGVsZW1lbnQuIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZFxuICAgICogdGhlIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGlzIGxpc3QuXG4gICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBhZGRlZCBvciBmYWxzZSBpZiB0aGUgaW5kZXggaXMgaW52YWxpZFxuICAgICogb3IgaWYgdGhlIGVsZW1lbnQgaXMgdW5kZWZpbmVkLlxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGluZGV4KSkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5FbGVtZW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5uRWxlbWVudHMgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdOb2RlID0gdGhpcy5jcmVhdGVOb2RlKGl0ZW0pO1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDAgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgLy8gSW5zZXJ0IGF0IHRoZSBlbmQuXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlLm5leHQgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIC8vIENoYW5nZSBmaXJzdCBub2RlLlxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSBwcmV2Lm5leHQ7XG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubkVsZW1lbnRzKys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xuICAgICogZW1wdHkuXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlyc3ROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICogQHJldHVybiB7Kn0gdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcbiAgICAqIGVtcHR5LlxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGRlc2lyZWQgaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXNcbiAgICAgKiBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCk7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlXG4gICAgICogc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoZSBMaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhpcyBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZVxuICAgICAqIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhpcyBsaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcbiAgICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgICAqXG4gICAgICAgKiA8cHJlPlxuICAgICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgICAqIH1cbiAgICAgICAqIDwvcHJlPlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcbiAgICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgZmFsc2VcbiAgICAgICAqIG90aGVyd2lzZS5cbiAgICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pbmRleE9mKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSByZW1vdmVkIGZyb20gdGhpcyBsaXN0LCBpZiBwcmVzZW50LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGxpc3QgY29udGFpbmVkIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA8IDEgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXG4gICAgICogQHBhcmFtIHtMaW5rZWRMaXN0fSBvdGhlciB0aGUgb3RoZXIgbGlzdC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xuICAgICAqIGFyZSBjdXN0b20gb2JqZWN0cyB5b3Ugc2hvdWxkIHByb3ZpZGUgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlXG4gICAgICogdGhlID09PSBvcGVyYXRvciBpcyB1c2VkIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIExpbmtlZExpc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlci5zaXplKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHNBdXgodGhpcy5maXJzdE5vZGUsIG90aGVyLmZpcnN0Tm9kZSwgZXFGKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFsc0F1eCA9IGZ1bmN0aW9uIChuMSwgbjIsIGVxRikge1xuICAgICAgICB3aGlsZSAobjEgIT09IG51bGwgJiYgbjIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghZXFGKG4xLmVsZW1lbnQsIG4yLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbjEgPSBuMS5uZXh0O1xuICAgICAgICAgICAgbjIgPSBuMi5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZ2l2ZW4gaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gcmVtb3ZlZCBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXMgb3V0IG9mIGJvdW5kcy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzIHx8IHRoaXMuZmlyc3ROb2RlID09PSBudWxsIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMSkge1xuICAgICAgICAgICAgLy9GaXJzdCBub2RlIGluIHRoZSBsaXN0LlxuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5maXJzdE5vZGUubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzLm5leHQgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gbnVsbCAmJiBwcmV2aW91cy5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHByZXZpb3VzLm5leHQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gcHJldmlvdXMubmV4dC5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubkVsZW1lbnRzLS07XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgbGlzdCBpbiBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soY3VycmVudE5vZGUuZWxlbWVudCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldmVyc2VzIHRoZSBvcmRlciBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaW5rZWQgbGlzdCAobWFrZXMgdGhlIGxhc3RcbiAgICAgKiBlbGVtZW50IGZpcnN0LCBhbmQgdGhlIGZpcnN0IGVsZW1lbnQgbGFzdCkuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xuICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGVtcCA9IGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IHByZXZpb3VzO1xuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xuICAgICAgICAgICAgY3VycmVudCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMubGFzdE5vZGU7XG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSB0ZW1wO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0IGluIHByb3BlclxuICAgICAqIHNlcXVlbmNlLlxuICAgICAqIEByZXR1cm4ge0FycmF5LjwqPn0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCxcbiAgICAgKiBpbiBwcm9wZXIgc2VxdWVuY2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goY3VycmVudE5vZGUuZWxlbWVudCk7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzIDw9IDA7XG4gICAgfTtcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5cy50b1N0cmluZyh0aGlzLnRvQXJyYXkoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLm5vZGVBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gKHRoaXMubkVsZW1lbnRzIC0gMSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgbm9kZSAhPSBudWxsOyBpKyspIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWxlbWVudDogaXRlbSxcbiAgICAgICAgICAgIG5leHQ6IG51bGxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5rZWRMaXN0O1xufSgpKTsgLy8gRW5kIG9mIGxpbmtlZCBsaXN0XG5leHBvcnRzLmRlZmF1bHQgPSBMaW5rZWRMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlua2VkTGlzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMaW5rZWRMaXN0XzEgPSByZXF1aXJlKFwiLi9MaW5rZWRMaXN0XCIpO1xudmFyIFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW1wdHkgcXVldWUuXG4gICAgICogQGNsYXNzIEEgcXVldWUgaXMgYSBGaXJzdC1Jbi1GaXJzdC1PdXQgKEZJRk8pIGRhdGEgc3RydWN0dXJlLCB0aGUgZmlyc3RcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBxdWV1ZSB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xuICAgICAqIGltcGxlbWVudGF0aW9uIHVzZXMgYSBsaW5rZWQgbGlzdCBhcyBhIGNvbnRhaW5lci5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBRdWV1ZSgpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpbmtlZExpc3RfMS5kZWZhdWx0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMubGlzdC5maXJzdCgpO1xuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZUVsZW1lbnRBdEluZGV4KDApO1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMsIGJ1dCBkb2VzIG5vdCByZW1vdmUsIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgc3RhY2sgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yLCBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsXG4gICAgICogZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChlbGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmNvbnRhaW5zKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpIDw9IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5saXN0LmNsZWFyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBxdWV1ZSBpblxuICAgICAqIEZJRk8gb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBRdWV1ZTtcbn0oKSk7IC8vIEVuZCBvZiBxdWV1ZVxuZXhwb3J0cy5kZWZhdWx0ID0gUXVldWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBpdGVtXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMDtcbn1cbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcbi8qKlxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBjaGFuZ2VkIGFmdGVyIHRoaXMgY2FsbC5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheSBlcXVhbFxuICogdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB3aG9zZSBmcmVxdWVuY3kgaXMgdG8gYmUgZGV0ZXJtaW5lZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKiBlcXVhbCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZnJlcXVlbmN5KGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgZnJlcSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgZnJlcSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmcmVxO1xufVxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIHNwZWNpZmllZCBhcnJheXMgYXJlIGVxdWFsIHRvIG9uZSBhbm90aGVyLlxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxuICogb2YgZWxlbWVudHMsIGFuZCBhbGwgY29ycmVzcG9uZGluZyBwYWlycyBvZiBlbGVtZW50cyBpbiB0aGUgdHdvXG4gKiBhcnJheXMgYXJlIGVxdWFsIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgdGhlIG90aGVyIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHR3byBhcnJheXMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5MS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWVxdWFscyhhcnJheTFbaV0sIGFycmF5MltpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuZXF1YWxzID0gZXF1YWxzO1xuLyoqXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSB0byBjb3B5LlxuICogQHJldHVybiB7QXJyYXl9IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKi9cbmZ1bmN0aW9uIGNvcHkoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KCk7XG59XG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuLyoqXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBzd2FwIGVsZW1lbnRzLlxuICogQHBhcmFtIHtudW1iZXJ9IGkgdGhlIGluZGV4IG9mIG9uZSBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGlzIGRlZmluZWQgYW5kIHRoZSBpbmRleGVzIGFyZSB2YWxpZC5cbiAqL1xuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xuICAgIGlmIChpIDwgMCB8fCBpID49IGFycmF5Lmxlbmd0aCB8fCBqIDwgMCB8fCBqID49IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0ZW1wID0gYXJyYXlbaV07XG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICBhcnJheVtqXSA9IHRlbXA7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnN3YXAgPSBzd2FwO1xuZnVuY3Rpb24gdG9TdHJpbmcoYXJyYXkpIHtcbiAgICByZXR1cm4gJ1snICsgYXJyYXkudG9TdHJpbmcoKSArICddJztcbn1cbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcbiAqIHN0YXJ0aW5nIGZyb20gaW5kZXggMCB0byBsZW5ndGggLSAxLlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIGl0ZXJhdGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGVsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5leHBvcnRzLmhhcyA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn07XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29tcGFyZSBlbGVtZW50IG9yZGVyLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlKGEsIGIpIHtcbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0Q29tcGFyZSA9IGRlZmF1bHRDb21wYXJlO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG59XG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICckcycgKyBpdGVtO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICckbycgKyBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0VG9TdHJpbmcgPSBkZWZhdWx0VG9TdHJpbmc7XG4vKipcbiogSm9pbnMgYWxsIHRoZSBwcm9wZXJpZXMgb2YgdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgam9pbiBzdHJpbmdcbiovXG5mdW5jdGlvbiBtYWtlU3RyaW5nKGl0ZW0sIGpvaW4pIHtcbiAgICBpZiAoam9pbiA9PT0gdm9pZCAwKSB7IGpvaW4gPSAnLCc7IH1cbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHRvcmV0ID0gJ3snO1xuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLmhhcyhpdGVtLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIGpvaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBwcm9wICsgJzonICsgaXRlbVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9yZXQgKyAnfSc7XG4gICAgfVxufVxuZXhwb3J0cy5tYWtlU3RyaW5nID0gbWFrZVN0cmluZztcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYykge1xuICAgIHJldHVybiAodHlwZW9mIGZ1bmMpID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyB1bmRlZmluZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqKSA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBzdHJpbmcuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcbi8qKlxuICogUmV2ZXJzZXMgYSBjb21wYXJlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHJldmVyc2VDb21wYXJlRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGNvbXBhcmVGdW5jdGlvbikgfHwgIWlzRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGQsIHYpICogLTE7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5yZXZlcnNlQ29tcGFyZUZ1bmN0aW9uID0gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbjtcbi8qKlxuICogUmV0dXJucyBhbiBlcXVhbCBmdW5jdGlvbiBnaXZlbiBhIGNvbXBhcmUgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gY29tcGFyZVRvRXF1YWxzKGNvbXBhcmVGdW5jdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGEsIGIpID09PSAwO1xuICAgIH07XG59XG5leHBvcnRzLmNvbXBhcmVUb0VxdWFscyA9IGNvbXBhcmVUb0VxdWFscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiLyogLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNjcmlwdGluZy50c1wiLz4gKi9cbmltcG9ydCB7XG5cdGFkZEFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxuXHRnZXRSYW5kTnVtYmVyLCBnZXRWYXJpYWJsZSwgc2VxdWVuY2UsIHNlbGVjdG9yLCBleGVjdXRlLCBQcmVjb25kaXRpb24sIGdldEFnZW50VmFyaWFibGUsIG5lZ19ndWFyZCwgZ3VhcmQsXG5cdGlzVmFyaWFibGVOb3RTZXQsIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiwgYWRkVXNlckFjdGlvbiwgYWRkVXNlckludGVyYWN0aW9uVHJlZSwgaW5pdGlhbGl6ZSxcblx0Z2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXG5cdGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0LCBhcmVBZGphY2VudCwgYWRkVXNlckFjdGlvblRyZWVcbn0gZnJvbSBcIi4vc2NyaXB0aW5nXCI7XG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsXCI7XG5cbi8vIDEuIERlZmluZSBTdGF0ZVxuXG4vLyBMb2NhdGlvbnNcbnZhciBTVE9SQUdFID0gXCJTVE9SQUdFXCI7XG52YXIgRE9DVE9SU19PRkZJQ0UgPSBcIkRPQ1RPUlMgT0ZGSUNFXCI7XG52YXIgRU5HSU5FUyA9IFwiRU5HSU5FU1wiO1xudmFyIENPQ0tQSVQgPSBcIkNPQ0tQSVRcIjtcbnZhciBFU0NBUEVfUE9EID0gXCJFU0NBUEUgUE9EXCI7XG52YXIgVFJBTlNQT1JUX1JPT00gPSBcIlRSQU5TUE9SVCBST09NXCI7XG52YXIgTU9OSVRPUklOR19ST09NID0gXCJNT05JVE9SSU5HIFJPT01cIjtcbnZhciBNQUlOX0FSRUEgPSBcIk1BSU4gQVJFQVwiO1xudmFyIEZFTV9CRURST09NID0gXCJGRU0gQkVEUk9PTVwiO1xudmFyIE1BTEVfQkVEUk9PTSA9IFwiTUFMRSBCRURST09NXCI7XG52YXIgQkFUSFJPT00gPSBcIkJBVEhST09NXCI7XG52YXIgVU5LTk9XTiA9IFwiVU5LTk9XTlwiO1xuXG4vLyBBZGQgTG9jYXRpb25zXG5hZGRMb2NhdGlvbihFTkdJTkVTLCBbU1RPUkFHRSwgTUFJTl9BUkVBXSk7XG5hZGRMb2NhdGlvbihTVE9SQUdFLCBbRU5HSU5FUywgRE9DVE9SU19PRkZJQ0VdKTtcbmFkZExvY2F0aW9uKERPQ1RPUlNfT0ZGSUNFLCBbU1RPUkFHRSwgTUFJTl9BUkVBLCBDT0NLUElULCBNT05JVE9SSU5HX1JPT01dKTtcbmFkZExvY2F0aW9uKENPQ0tQSVQsIFtET0NUT1JTX09GRklDRV0pO1xuYWRkTG9jYXRpb24oRVNDQVBFX1BPRCwgW01BSU5fQVJFQV0pO1xuYWRkTG9jYXRpb24oVFJBTlNQT1JUX1JPT00sIFtNT05JVE9SSU5HX1JPT00sIE1BSU5fQVJFQV0pO1xuYWRkTG9jYXRpb24oTU9OSVRPUklOR19ST09NLCBbVFJBTlNQT1JUX1JPT00sIERPQ1RPUlNfT0ZGSUNFXSk7XG5hZGRMb2NhdGlvbihNQUlOX0FSRUEsIFtFTkdJTkVTLCBTVE9SQUdFLCBET0NUT1JTX09GRklDRSwgVFJBTlNQT1JUX1JPT00sIEVTQ0FQRV9QT0RdKTtcbmFkZExvY2F0aW9uKEZFTV9CRURST09NLCBbTUFJTl9BUkVBLCBCQVRIUk9PTV0pO1xuYWRkTG9jYXRpb24oTUFMRV9CRURST09NLCBbTUFJTl9BUkVBLCBCQVRIUk9PTV0pO1xuYWRkTG9jYXRpb24oQkFUSFJPT00sIFtNQUlOX0FSRUEsIEZFTV9CRURST09NLCBNQUxFX0JFRFJPT01dKTtcblxuLy8gYWdlbnRzXG52YXIgQ2FsZWIgPSBhZGRBZ2VudChcIkNhbGViXCIpO1xudmFyIFF1aW5uID0gYWRkQWdlbnQoXCJRdWlublwiKTtcbnZhciBNYXJrID0gYWRkQWdlbnQoXCJNYXJrXCIpO1xudmFyIEVkZGllID0gYWRkQWdlbnQoXCJFZGRpZVwiKTtcbnZhciBCZWF0cmljZSA9IGFkZEFnZW50KFwiQmVhdHJpY2VcIik7XG5cbi8vIGl0ZW1zXG52YXIgd2lyZXMxID0gYWRkSXRlbShcIndpcmVzMVwiKTtcbnZhciB3aXJlczIgPSBhZGRJdGVtKFwid2lyZXMyXCIpO1xuXG5zZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBTVE9SQUdFKTtcbnNldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIsIE1PTklUT1JJTkdfUk9PTSk7XG52YXIgd2lyZXNDb2xsZWN0ZWQgPSBzZXRWYXJpYWJsZShcIndpcmVzQ29sbGVjdGVkXCIsIDApO1xuXG4vLyAvLyB2YXJpYWJsZXNcbnNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwiY3VycmVudExvY2F0aW9uXCIsIENPQ0tQSVQpO1xuXG4vL1F1aW5uXG5zZXRBZ2VudFZhcmlhYmxlKFF1aW5uLCBcImN1cnJlbnRMb2NhdGlvblwiLCBET0NUT1JTX09GRklDRSk7XG5cbi8vTWFya1xuc2V0QWdlbnRWYXJpYWJsZShNYXJrLCBcImN1cnJlbnRMb2NhdGlvblwiLCBUUkFOU1BPUlRfUk9PTSk7XG5cbi8vRWRkaWVcbnNldEFnZW50VmFyaWFibGUoRWRkaWUsIFwiY3VycmVudExvY2F0aW9uXCIsIFNUT1JBR0UpO1xuXG4vL0JlYXRyaWNlXG5zZXRBZ2VudFZhcmlhYmxlKEJlYXRyaWNlLCBcImN1cnJlbnRMb2NhdGlvblwiLCBFTkdJTkVTKTtcblxuLy8gUGxheWVyXG52YXIgcGxheWVyTG9jYXRpb24gPSBzZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIsIE1BSU5fQVJFQSk7XG52YXIgd2lyZXNDb2xsZWN0ZWQgPSBzZXRWYXJpYWJsZShcIndpcmVzQ29sbGVjdGVkXCIsIDApO1xuXG5cbi8vIEtub3dsZWRnZSBmb3IgQ2FsZWIgXG5zZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImxhc3RTZWVuOndpcmVzMVwiLCBVTktOT1dOKVxuc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJsYXN0U2Vlbjp3aXJlczJcIiwgVU5LTk9XTilcbnNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46cGxheWVyXCIsIFVOS05PV04pXG5cblxuXG5cblxuXG5cbi8vIC8vIDIuIERlZmluZSBCVHNcbi8vIC8vIGNyZWF0ZSBncm91bmQgYWN0aW9uc1xuXG4vLyBUb2RvIGZyb20gaGVyZVxuLy8gZnVuY3Rpb24gZnVuY3Rpb25fbmFtZShhcmd1bWVudCkge1xuLy8gXHQvLyBib2R5Li4uXG4vLyB9XG5cbmxldCBzZXRSYW5kTnVtYmVyID0gYWN0aW9uKFxuXHQoKSA9PiB0cnVlLFxuXHQoKSA9PiBzZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIiwgXG5cdFx0XHRnZXRSYW5kTnVtYmVyKDEsIDExKSksXG5cdFx0XHQwXG4pO1xuXG4vLyBmdW5jdGlvbiBjaG9vc2VEZXN0aW5hdGlvbkZvckFnZW50KGFnZW50LCBkZXN0aW5hdGlvbk51bWJlcj1nZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikpIHtcbi8vIFx0Ly8gYm9keS4uLlxuLy8gfVxuXG5cblxuXG5cbmxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIEVOR0lORVMpLCAwKTtcbmxldCBjaG9vc2VTVE9SQUdFID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAyLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIFNUT1JBR0UpLCAwKTtcbmxldCBjaG9vc2VET0NUT1JTX09GRklDRSA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMywgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBET0NUT1JTX09GRklDRSksIDApO1xubGV0IGNob29zZUNPQ0tQSVQgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDQsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgQ09DS1BJVCksIDApO1xubGV0IGNob29zZUVTQ0FQRV9QT0QgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDUsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgRVNDQVBFX1BPRCksIDApO1xubGV0IGNob29zZVRSQU5TUE9SVF9ST09NID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSA2LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIFRSQU5TUE9SVF9ST09NKSwgMCk7XG5sZXQgY2hvb3NlTU9OSVRPUklOR19ST09NID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSA3LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIE1PTklUT1JJTkdfUk9PTSksIDApO1xubGV0IGNob29zZU1BSU5fQVJFQSA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gOCwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBNQUlOX0FSRUEpLCAwKTtcbmxldCBjaG9vc2VGRU1fQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gOSwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBGRU1fQkVEUk9PTSksIDApO1xubGV0IGNob29zZU1BTEVfQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMTAsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgTUFMRV9CRURST09NKSwgMCk7XG5sZXQgY2hvb3NlQkFUSFJPT00gPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDExLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIEJBVEhST09NKSwgMCk7XG5cblxuXG5sZXQgYXREZXN0aW5hdGlvbkFnZW50ID0gZnVuY3Rpb24oYWdlbnROYW1lKXtcblx0cmV0dXJuICgpID0+IGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImRlc3RpbmF0aW9uXCIpID09IGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImN1cnJlbnRMb2NhdGlvblwiKTtcbn1cblxuXG5sZXQgYXREZXN0aW5hdGlvbkNhbGViOiBQcmVjb25kaXRpb24gPSBhdERlc3RpbmF0aW9uQWdlbnQoQ2FsZWIpXG5sZXQgc2V0RGVzdGluYXRpb25DYWxlYlByZWNvbmQ6IFByZWNvbmRpdGlvbiA9ICgpID0+IGlzVmFyaWFibGVOb3RTZXQoXCJkZXN0aW5hdGlvblwiKSB8fCBhdERlc3RpbmF0aW9uQ2FsZWIoKTtcblxuLy8gLy8gY3JlYXRlIGJlaGF2aW9yIHRyZWVzXG5sZXQgc2V0TmV4dERlc3RpbmF0aW9uID0gc2VxdWVuY2UoW1xuXHRzZXRSYW5kTnVtYmVyLFxuXHRzZWxlY3RvcihbXG5cdFx0Y2hvb3NlRU5HSU5FUyxcblx0XHRjaG9vc2VDT0NLUElULFxuXHRcdGNob29zZVNUT1JBR0UsXG5cdFx0Y2hvb3NlRE9DVE9SU19PRkZJQ0UsXG5cdFx0Y2hvb3NlQkFUSFJPT00sXG5cdFx0Y2hvb3NlTUFMRV9CRURST09NLFxuXHRcdGNob29zZUZFTV9CRURST09NLFxuXHRcdGNob29zZU1BSU5fQVJFQSxcblx0XHRjaG9vc2VNT05JVE9SSU5HX1JPT00sXG5cdFx0Y2hvb3NlVFJBTlNQT1JUX1JPT00sXG5cdFx0Y2hvb3NlRVNDQVBFX1BPRFxuXHRcdFx0ICAgXG5cdF0pXG5dKTtcblxubGV0IGdvdG9OZXh0TG9jYXRpb25BZ2VudCA9IGZ1bmN0aW9uKGFnZW50TmFtZSl7XG5cdHJldHVybiAgYWN0aW9uKFxuXHRcdCgpID0+IHRydWUsXG5cdFx0KCkgPT4ge1xuXHRcdFx0c2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsIFwiY3VycmVudExvY2F0aW9uXCIsIGdldE5leHRMb2NhdGlvbihnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJjdXJyZW50TG9jYXRpb25cIiksIGdldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIikpKTtcblx0XHRcdGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwiIGlzIGF0OiBcIiArIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcIkhlbGxvOiBcIiArIGdldEFnZW50VmFyaWFibGUoQ2FsZWIsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XG5cdFx0fSxcblx0XHQwXG5cdCk7XG59XG5cblxubGV0IGdvdG9OZXh0TG9jYXRpb25DYWxlYiA9IGdvdG9OZXh0TG9jYXRpb25BZ2VudChDYWxlYik7XG5sZXQgZ290b05leHRMb2NhdGlvblF1aW5uID0gZ290b05leHRMb2NhdGlvbkFnZW50KFF1aW5uKTtcbmxldCBnb3RvTmV4dExvY2F0aW9uTWFyayA9IGdvdG9OZXh0TG9jYXRpb25BZ2VudChNYXJrKTtcbmxldCBnb3RvTmV4dExvY2F0aW9uRWRkaWUgPSBnb3RvTmV4dExvY2F0aW9uQWdlbnQoRWRkaWUpO1xubGV0IGdvdG9OZXh0TG9jYXRpb25CZWF0cmljZSA9IGdvdG9OZXh0TG9jYXRpb25BZ2VudChCZWF0cmljZSk7XG5cblxubGV0IGxhc3RTZWVuQnlBZ2VudCA9IGZ1bmN0aW9uKGFnZW50TmFtZSl7XG5cdHJldHVybiBzZXF1ZW5jZShbXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0YWN0aW9uKFxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXG5cdFx0XHRcdFx0KCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcblx0XHRcdFx0XHQvL2VmZmVjdFxuXHRcdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwiIHNlZXMgLSBJdGVtOiB3aXJlczEgfCBMb2NhdGlvbjogXCIrIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpO1xuXHRcdFx0XHRcdFx0c2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsIFwibGFzdFNlZW46d2lyZXMxXCIsICBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXG5cdFx0XHRcdFx0MFxuXHRcdFx0XHQpLFxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXG5cdFx0XSksXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0YWN0aW9uKFxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXG5cdFx0XHRcdFx0KCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMyLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcblx0XHRcdFx0XHQvL2VmZmVjdFxuXHRcdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwic2VlcyAtIEl0ZW06IHdpcmVzMiB8IExvY2F0aW9uOiBcIitnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcblx0XHRcdFx0XHRcdHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImxhc3RTZWVuOndpcmVzMlwiLCAgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vdGltZSB0YWtlblxuXHRcdFx0XHRcdDBcblx0XHRcdFx0KSxcblx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7fSwwKVxuXHRcdF0pLFxuXHRcdHNlbGVjdG9yKFtcblx0XHRcdGFjdGlvbihcblx0XHRcdFx0XHQvL3ByZWNvbmRpdGlvblxuXHRcdFx0XHRcdCgpID0+IGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykgPT0gZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSxcblx0XHRcdFx0XHQvL2VmZmVjdFxuXHRcdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwic2VlcyAtIFBlcnNvbjogUGxheWVyIHwgTG9jYXRpb246IFwiK2dldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpO1xuXHRcdFx0XHRcdFx0c2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsIFwibGFzdFNlZW46cGxheWVyXCIsICBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXG5cdFx0XHRcdFx0MFxuXHRcdFx0XHQpLFxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXG5cdFx0XSlcblx0XSk7XG59O1xuXG5cblxubGV0IGxhc3RTZWVuQnlDYWxlYiA9IGxhc3RTZWVuQnlBZ2VudChDYWxlYilcbmxldCBsYXN0U2VlbkJ5UXVpbm4gPSBsYXN0U2VlbkJ5QWdlbnQoUXVpbm4pXG5sZXQgbGFzdFNlZW5CeU1hcmsgPSBsYXN0U2VlbkJ5QWdlbnQoTWFyaylcbmxldCBsYXN0U2VlbkJ5RWRkaWUgPSBsYXN0U2VlbkJ5QWdlbnQoRWRkaWUpXG5sZXQgbGFzdFNlZW5CeUJlYXRyaWNlID0gbGFzdFNlZW5CeUFnZW50KEJlYXRyaWNlKVxuXG5cbi8vIGxldCBmaW5kSXRlbSA9IGFjdGlvbihcbi8vICAgICAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKENhbGViLCAnY3VycmVudExvY2F0aW9uJykgPT0gZ2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIiksXG4vLyAgICAgKCkgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIkNhbGViIGZvdW5kIC0gSXRlbTogd2lyZXMxXCIpXG5cblxuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvXCIpO1xuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhnZXRBZ2VudFZhcmlhYmxlKENhbGViLCAnY3VycmVudExvY2F0aW9uJykgPT0gZ2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xuLy8gICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJDYWxlYiBmb3VuZCB0aGUgd2lyZXMxLlwiKVxuLy8gICAgIH0sIFxuLy8gICAgIDBcbi8vICk7XG5cbi8vIGxldCBlYXRQbGF5ZXIgPSBhY3Rpb24oKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pLFxuLy8gICAgICgpID0+IHtcbi8vICAgICAgICAgc2V0VmFyaWFibGUoXCJlbmRHYW1lXCIsIFwibG9zZVwiKTtcbi8vICAgICAgICAgc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFwiTkFcIik7XG4vLyAgICAgfSwgMFxuLy8gKTtcblxuLy90aGlzIG1lc3Ncbi8vIGxldCBjb252ZXJzYXRpb24gPSBhY3Rpb24oKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pLFxuLy8gICAgICgpID0+IHtcbi8vICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBoYXBwZW4gdG8gcnVuIGludG8gQ2FsZWIuXCIpLFxuLy8gICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiQ2FsZWI6IEhhdmUgeW91IG5vdCBmb3VuZCB0aGUgd2lyZXMgeWV0PyBEaWQgeW91IG5vdCBjaGVjayBzdG9yYWdlP1wiKSxcbi8vICAgICB9LFxuLy8gKTtcblxuLy8gbGV0IHNlYXJjaCA9IHNlbGVjdG9yKFtcbi8vICAgICBmaW5kSXRlbSxcbi8vICAgICBzZXF1ZW5jZShbXG4vLyAgICAgICAgIHNlbGVjdG9yKFtcbi8vICAgICAgICAgICAgIGd1YXJkKHNldERlc3RpbmF0aW9uUHJlY29uZCwge30sIHNldE5leHREZXN0aW5hdGlvbiksXG4vLyAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge1xuLy8gICAgICAgICAgICAgfSwge30sIDApXG4vLyAgICAgICAgIF0pLFxuLy8gICAgICAgICBnb3RvTmV4dExvY2F0aW9uLFxuLy8gICAgICAgICBmaW5kSXRlbVxuLy8gICAgIF0pXG4vLyBdKTtcblxubGV0IHNlYXJjaCA9IHNlcXVlbmNlKFtcblx0XHRzZWxlY3RvcihbXG5cdFx0XHRndWFyZChzZXREZXN0aW5hdGlvbkNhbGViUHJlY29uZCwgc2V0TmV4dERlc3RpbmF0aW9uKSxcblx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XG5cdFx0XHR9LDApXG5cdFx0XSksXG5cdFx0Z290b05leHRMb2NhdGlvbkNhbGViLFxuXHRdKTtcblxuXG4vLyBsZXQgc2VhcmNoID0gc2VxdWVuY2UoW1xuLy8gICAgICAgICBzZWxlY3RvcihbXG4vLyAgICAgICAgICAgICBndWFyZChzZXREZXN0aW5hdGlvblByZWNvbmQsIHNldE5leHREZXN0aW5hdGlvbiksXG4vLyAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge1xuLy8gICAgICAgICAgICAgfSwwKVxuLy8gICAgICAgICBdKSxcbi8vICAgICAgICAgZ290b05leHRMb2NhdGlvbixcbi8vICAgICBdKTtcblxubGV0IENhbGViQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlDYWxlYixcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaCwgbGFzdFNlZW5CeUNhbGViXG5cdF0pXG5dKTtcblxubGV0IFF1aW5uQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlRdWlubixcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaCwgbGFzdFNlZW5CeVF1aW5uXG5cdF0pXG5dKTtcblxubGV0IE1hcmtCVCA9IHNlcXVlbmNlKFtcblx0bGFzdFNlZW5CeU1hcmssXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2gsIGxhc3RTZWVuQnlNYXJrXG5cdF0pXG5dKTtcblxubGV0IEVkZGllQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlFZGRpZSxcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaCwgbGFzdFNlZW5CeUVkZGllXG5cdF0pXG5dKTtcblxubGV0IEJlYXRyaWNlQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlCZWF0cmljZSxcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaCwgbGFzdFNlZW5CeUJlYXRyaWNlXG5cdF0pXG5dKTtcblxuLy8gLy9hdHRhY2ggYmVoYXZpb3VyIHRyZWVzIHRvIGFnZW50c1xuYXR0YWNoVHJlZVRvQWdlbnQoQ2FsZWIsIENhbGViQlQpO1xuYXR0YWNoVHJlZVRvQWdlbnQoUXVpbm4sIFF1aW5uQlQpO1xuYXR0YWNoVHJlZVRvQWdlbnQoTWFyaywgTWFya0JUKTtcbmF0dGFjaFRyZWVUb0FnZW50KEVkZGllLCBFZGRpZUJUKTtcbmF0dGFjaFRyZWVUb0FnZW50KEJlYXRyaWNlLCBCZWF0cmljZUJUKTtcblxuLy8gLy8gMy4gQ29uc3RydWN0IHN0b3J5XG4vLyAvLyBjcmVhdGUgdXNlciBhY3Rpb25zXG5cbnZhciBzdGFydFN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTUFJTl9BUkVBLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHNoaXAncyBtYWluIGFyZWEuXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIGZvcndhcmQgdG8gZW50ZXIgdGhlIGVuZ2luZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRU5HSU5FUykpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIGVhc3QgdG8gZW50ZXIgdGhlIGRvY3RvcidzIG9mZmljZS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIERPQ1RPUlNfT0ZGSUNFKSksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gd2VzdCB0byBlbnRlciB0aGUgZmVtYWxlcycgYmVkcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEZFTV9CRURST09NKSksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gd2VzdCB0byBlbnRlciB0aGUgYmF0aHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQVRIUk9PTSkpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHdlc3QgdG8gZW50ZXIgdGhlIG1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFMRV9CRURST09NKSksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGggdG8gZW50ZXIgdGhlIGVzY2FwZSBwb2QuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFU0NBUEVfUE9EKSksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gaW50byB0aGUgdHJhbnNwb3J0IHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUUkFOU1BPUlRfUk9PTSkpLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHN0YXJ0U3RhdGVCVCk7XG52YXIgYmNTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEVOR0lORVMsXG5cdHNlcXVlbmNlKFtcblx0XHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZW5naW5lIHJvb20uXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkhlYWQgZWFzdCBpbnRvIHRoZSBzdG9yYWdlIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBTVE9SQUdFKSksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShiY1N0YXRlQlQpO1xudmFyIGJyU3RhdGVCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBTVE9SQUdFLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZWQgaW50byB0aGUgc3RvcmFnZSByb29tLlwiKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRE9DVE9SU19PRkZJQ0UpKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIGJhY2sgaW50byB0aGUgZW5naW5lIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFTkdJTkVTKSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoYnJTdGF0ZUJUKTtcbnZhciBxdWFydGVyczFCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBET0NUT1JTX09GRklDRSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgc3RvcmFnZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgU1RPUkFHRSkpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgaW50byB0aGUgY29ja3BpdC5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIENPQ0tQSVQpKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyB0byB0aGUgbW9uaXRvcmluZyByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTU9OSVRPUklOR19ST09NKSksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShxdWFydGVyczFCVCk7XG52YXIgbXJTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IENPQ0tQSVQsXG5cdHNlcXVlbmNlKFtcblx0XHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGZvcndhcmQgaW50byB0aGUgY29ja3BpdC5cIiksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBET0NUT1JTX09GRklDRSkpLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKG1yU3RhdGVCVCk7XG52YXIgcXVhcnRlcnMyQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTU9OSVRPUklOR19ST09NLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBET0NUT1JTX09GRklDRSkpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHRvIHRoZSB0cmFuc3BvcnQgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRSQU5TUE9SVF9ST09NKSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUocXVhcnRlcnMyQlQpO1xudmFyIG1lZGljYWxCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBUUkFOU1BPUlRfUk9PTSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSB0cmFuc3BvcnQgcm9vbSB3aGVyZSB0aGUgdGVsZXBvcnRlciBpcyBsb2NhdGVkLlwiKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFeGl0IHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1PTklUT1JJTkdfUk9PTSkpLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKG1lZGljYWxCVCk7XG52YXIgbGFiQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRVNDQVBFX1BPRCxcblx0c2VxdWVuY2UoW1xuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBlc2NhcGUgcG9kLlwiKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFeGl0IGludG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGxhYkJUKTtcbnZhciB0clN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRkVNX0JFRFJPT00sXG5cdHNlcXVlbmNlKFtcblx0XHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIGZlbWFsZXMnIGJlZHJvb20uXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgc291dGggdG8gdGhlIGJhdGhyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkFUSFJPT00pKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFeGl0IGludG8gdGhlIG1haW4gcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHRyU3RhdGVCVCk7XG52YXIgdGNTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEJBVEhST09NLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBpbnRvIHRoZSBiYXRocm9vbS5cIiksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBzb3V0aCBpbnRvIHRoZSBtYWxlcycgYmVkcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BTEVfQkVEUk9PTSkpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIG5vcnRoIGludG8gdGhlIGZlbWFsZXMnIGJlZHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBGRU1fQkVEUk9PTSkpLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHRjU3RhdGVCVCk7XG5cbnZhciB0bFN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTUFMRV9CRURST09NLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBpbnRvIHRoZSBtYWxlcycgYmVkcm9vbS5cIiksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIGJhdGhyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkFUSFJPT00pKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGxTdGF0ZUJUKTtcblxudmFyIHdpcmVzMUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugbm90aWNlIHdpcmVzIG9uIHRoZSBncm91bmQuXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvblRyZWUoXCJQaWNrIHVwIHRoZSB3aXJlcy5cIixcblx0XHRcdFx0c2VxdWVuY2UoW1xuXHRcdFx0XHRcdGFjdGlvbigoKT0+dHJ1ZSwgKCkgPT4ge1xuXHRcdFx0XHRcdGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiWW91IHBpY2sgdXAgdGhlIHdpcmVzLlwiKTtcblx0XHRcdFx0XHRzZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInBsYXllclwiKTtcblx0XHRcdFx0XHRzZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCwgZ2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQpICsgMSk7XG5cdFx0XHRcdH0sIDApLFxuXHRcdFx0XHRcdC8vIGFjdGlvbigoKT0+dHJ1ZSwgKCkgPT4ge1xuXHRcdFx0XHRcdC8vICAgICBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIldvdyB5b3Uga25vdyBob3cgdG8gcGljayB1cCB0aGluZ3MuXCIpfSwgMClcblx0XHRcdFx0XSlcblx0XHRcdClcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZSh3aXJlczFCVCk7XG5cbnZhciB3aXJlczJCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMyLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5vdGljZSB3aXJlcyBvbiB0aGUgZ3JvdW5kLlwiKSxcblx0XHRcdGFkZFVzZXJBY3Rpb24oXCJQaWNrIHVwIHRoZSB3aXJlcy5cIiwgKCkgPT4ge1xuXHRcdFx0XHRkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIllvdSBwaWNrIHVwIHRoZSB3aXJlcy5cIik7XG5cdFx0XHRcdHNldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpO1xuXHRcdFx0XHRzZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCwgZ2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQpICsgMSk7XG5cdFx0XHR9KVxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHdpcmVzMkJUKTtcblxuXG4vLyAvLzQuIFJ1biB0aGUgd29ybGRcbmluaXRpYWxpemUoKTtcbnZhciB1c2VySW50ZXJhY3Rpb25PYmplY3QgPSBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKTtcblxuLy8gLy9SRU5ERVJJTkctLS0tLVxudmFyIGRpc3BsYXlQYW5lbCA9IHt4OiA1MDAsIHk6IDB9O1xudmFyIHRleHRQYW5lbCA9IHt4OiA1MDAsIHk6IDUwMX07XG52YXIgYWN0aW9uc1BhbmVsID0ge3g6IDUyMCwgeTogNTUwfTtcblxudmFyIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXknKTtcbnZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbnZhciBzcGFjZXNoaXBJbWFnZSA9IG5ldyBJbWFnZSgpO1xuc3BhY2VzaGlwSW1hZ2Uub25sb2FkID0gcmVuZGVyO1xudmFyIHBsYXllckltYWdlID0gbmV3IEltYWdlKCk7XG52YXIgY2FsZWJJbWFnZSA9IG5ldyBJbWFnZSgpO1xudmFyIHF1aW5uSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBtYXJrSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBlZGRpZUltYWdlID0gbmV3IEltYWdlKCk7XG52YXIgYmVhdHJpY2VJbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG5cdGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cdGNvbnRleHQuZHJhd0ltYWdlKHNwYWNlc2hpcEltYWdlLCBkaXNwbGF5UGFuZWwueCwgZGlzcGxheVBhbmVsLnksIDUwMCwgNTAwKTtcblx0ZGlzcGxheVBsYXllcigpO1xuXHRkaXNwbGF5Q2FsZWIoKTtcblx0ZGlzcGxheVF1aW5uKCk7XG5cdGRpc3BsYXlNYXJrKCk7XG5cdGRpc3BsYXlFZGRpZSgpO1xuXHRkaXNwbGF5QmVhdHJpY2UoKTtcblx0ZGlzcGxheVRleHRBbmRBY3Rpb25zKCk7XG59XG5cbnZhciBtYXBQb3NpdGlvbnMgPSB7XG5cdFwiRU5HSU5FU1wiOiB7eDogMTE1LCB5OiAxMzN9LFxuXHRcIkNPQ0tQSVRcIjoge3g6IDM5MywgeTogMjM4fSxcblx0XCJTVE9SQUdFXCI6IHt4OiAyNjAsIHk6IDE0N30sXG5cdFwiRE9DVE9SUyBPRkZJQ0VcIjoge3g6IDMwMiwgeTogMjUwfSxcblx0XCJNQUlOIEFSRUFcIjoge3g6IDE2NSwgeTogMjUwfSxcblx0XCJFU0NBUEUgUE9EXCI6IHt4OiAxMDIsIHk6IDM1N30sXG5cdFwiVFJBTlNQT1JUIFJPT01cIjoge3g6IDIyOCwgeTogMzQzfSxcblx0XCJNT05JVE9SSU5HIFJPT01cIjoge3g6IDMwOCwgeTogMzIwfSxcblx0XCJCQVRIUk9PTVwiOiB7eDogMjQsIHk6IDI0NX0sXG5cdFwiTUFMRSBCRURST09NXCI6IHt4OiAyNCwgeTogMzI1fSxcblx0XCJGRU0gQkVEUk9PTVwiOiB7eDogMjQsIHk6IDE3MH1cbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlQbGF5ZXIoKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbik7XG5cdGlmICghaXNVbmRlZmluZWQobWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0pKVxuXHRcdGNvbnRleHQuZHJhd0ltYWdlKHBsYXllckltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgMzAsIDMwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUNhbGViKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJjdXJyZW50TG9jYXRpb25cIik7XG5cdGNvbnRleHQuZHJhd0ltYWdlKGNhbGViSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCAzMCwgMzApO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5UXVpbm4oKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBnZXRBZ2VudFZhcmlhYmxlKFF1aW5uLCBcImN1cnJlbnRMb2NhdGlvblwiKTtcblx0Y29udGV4dC5kcmF3SW1hZ2UocXVpbm5JbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDI1LCAyNSk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlNYXJrKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gZ2V0QWdlbnRWYXJpYWJsZShNYXJrLCBcImN1cnJlbnRMb2NhdGlvblwiKTtcblx0Y29udGV4dC5kcmF3SW1hZ2UobWFya0ltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgMzAsIDMwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUVkZGllKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gZ2V0QWdlbnRWYXJpYWJsZShFZGRpZSwgXCJjdXJyZW50TG9jYXRpb25cIik7XG5cdGNvbnRleHQuZHJhd0ltYWdlKGVkZGllSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCAzMCwgMzApO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5QmVhdHJpY2UoKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBnZXRBZ2VudFZhcmlhYmxlKEJlYXRyaWNlLCBcImN1cnJlbnRMb2NhdGlvblwiKTtcblx0Y29udGV4dC5kcmF3SW1hZ2UoYmVhdHJpY2VJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDMwLCAzMCk7XG59XG5cbnNwYWNlc2hpcEltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL2ZpbmFsaXplZF9zaGlwX21hcF9kaWdpLnBuZ1wiO1xucGxheWVySW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvVGF5bG9yLnBuZ1wiO1xuY2FsZWJJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9DYWxlYi5wbmdcIjtcbnF1aW5uSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvUXVpbm4ucG5nXCI7XG5tYXJrSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvTWFyay5wbmdcIjtcbmVkZGllSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvRWRkaWUucG5nXCI7XG5iZWF0cmljZUltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL0JlYXRyaWNlLnBuZ1wiO1xuXG52YXIgY3VycmVudFNlbGVjdGlvbjtcbnZhciB5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcbnZhciB5T2Zmc2V0SW5jcmVtZW50ID0gMjU7XG5cbmZ1bmN0aW9uIGRpc3BsYXlUZXh0QW5kQWN0aW9ucygpIHtcblx0Y29udGV4dC5jbGVhclJlY3QodGV4dFBhbmVsLngsIHRleHRQYW5lbC55LCA1MDAsIDEwMDApO1xuXHR5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcblxuXHRjb250ZXh0LmZvbnQgPSBcIjE1cHQgQ2FsaWJyaVwiO1xuXHRjb250ZXh0LmZpbGxTdHlsZSA9ICdwaW5rJztcblx0Y29uc29sZS5sb2coXCJBY3Rpb25zIGVmZmVjdCB0ZXh0OiBcIiArIHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCk7XG5cdHZhciB0ZXh0VG9EaXNwbGF5ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0Lmxlbmd0aCAhPSAwID8gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0IDogdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQ7XG5cdGNvbnRleHQuZmlsbFRleHQodGV4dFRvRGlzcGxheSwgdGV4dFBhbmVsLngsIHRleHRQYW5lbC55ICsgMjApO1xuXG5cdGNvbnRleHQuZm9udCA9IFwiMTVwdCBDYWxpYnJpXCI7XG5cdGNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHVzZXJBY3Rpb25UZXh0ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dFtpXTtcblx0XHRjb250ZXh0LmZpbGxUZXh0KHVzZXJBY3Rpb25UZXh0LCBhY3Rpb25zUGFuZWwueCArIDIwLCB5T2Zmc2V0KTtcblx0XHRpZiAoaSA9PSAwKSB7XG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uID0gaTtcblx0XHR9XG5cdFx0eU9mZnNldCArPSB5T2Zmc2V0SW5jcmVtZW50O1xuXHR9XG5cblx0ZGlzcGxheUFycm93KCk7XG5cdGNvbnNvbGUubG9nKFwid2lyZXM6IFwiICsgZ2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQpKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUFycm93KCkge1xuXHRpZih1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKXtcblx0XHRjb250ZXh0LmNsZWFyUmVjdChhY3Rpb25zUGFuZWwueCwgYWN0aW9uc1BhbmVsLnksIDIwLCAxMDAwKTtcblx0XHRjb250ZXh0LmZpbGxUZXh0KFwiPiBcIiwgNTIwLCBhY3Rpb25zUGFuZWwueSArIDI1ICsgKGN1cnJlbnRTZWxlY3Rpb24gKiB5T2Zmc2V0SW5jcmVtZW50KSk7XG5cdH1cbn1cblxuLy9Vc2VyIGlucHV0XG5mdW5jdGlvbiBrZXlQcmVzcyhlKSB7XG5cdGlmIChlLmtleUNvZGUgPT0gMTMpIHtcblx0XHR2YXIgc2VsZWN0ZWRBY3Rpb24gPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0W2N1cnJlbnRTZWxlY3Rpb25dO1xuXHRcdGlmKCFpc1VuZGVmaW5lZChzZWxlY3RlZEFjdGlvbikpe1xuXHRcdFx0ZXhlY3V0ZVVzZXJBY3Rpb24oc2VsZWN0ZWRBY3Rpb24pO1xuXHRcdFx0d29ybGRUaWNrKCk7XG5cdFx0XHRyZW5kZXIoKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24ga2V5RG93bihlKSB7XG5cdGlmIChlLmtleUNvZGUgPT0gNDApIHsvL2Rvd25cblx0XHRpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xuXHRcdFx0Y3VycmVudFNlbGVjdGlvbisrO1xuXHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IGN1cnJlbnRTZWxlY3Rpb24gJSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDtcblx0XHRcdGRpc3BsYXlBcnJvdygpO1xuXHRcdH1cblx0fSBlbHNlIGlmIChlLmtleUNvZGUgPT0gMzgpIHsvL3VwXG5cdFx0aWYgKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApIHtcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24tLTtcblx0XHRcdGlmIChjdXJyZW50U2VsZWN0aW9uIDwgMClcblx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoIC0gMTtcblx0XHRcdGRpc3BsYXlBcnJvdygpO1xuXHRcdH1cblx0fVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwga2V5UHJlc3MsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleURvd24sIGZhbHNlKTsiLCJpbXBvcnQgUXVldWUgZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWVcIjtcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcblxuZXhwb3J0IGVudW0gU3RhdHVzIHtcbiAgICBSVU5OSU5HLFxuICAgIFNVQ0NFU1MsXG4gICAgRkFJTFVSRVxufVxuXG5mdW5jdGlvbiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQ6IG51bWJlciwgYmxhY2tib2FyZDogYW55LCBzdGF0dXM6IFN0YXR1cykge1xuICAgIGRlbGV0ZSBibGFja2JvYXJkW2lkXTtcbiAgICByZXR1cm4gc3RhdHVzO1xufVxuXG5leHBvcnQgdHlwZSBFZmZlY3QgPSAoKSA9PiB2b2lkXG5leHBvcnQgdHlwZSBQcmVjb25kaXRpb24gPSAoKSA9PiBib29sZWFuXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXG5leHBvcnQgdHlwZSBBY3Rpb25UaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcikgPT4gVGlja1xuLyoqXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xuICovXG5leHBvcnQgdHlwZSBHdWFyZFRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2ssIG5lZ2F0ZT86IGJvb2xlYW4pID0+IFRpY2tcbi8qKlxuICogU2VxdWVuY2UvU2VsZWN0b3JcbiAqL1xuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXG5cbnZhciBibGFja2JvYXJkID0ge307XG5cbmZ1bmN0aW9uIGdldEFjdGlvblRpY2soaWQ6IG51bWJlcik6IEFjdGlvblRpY2sge1xuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQgPSAxKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJlY29uZGl0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA9IHRpY2tzUmVxdWlyZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgYXN0VGljaywgbmVnYXRlID0gZmFsc2UpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2VlZCA/IGV4ZWN1dGUoYXN0VGljaykgOiBTdGF0dXMuRkFJTFVSRTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3RvclRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlKGFzdFRpY2s6IFRpY2spOiBTdGF0dXMge1xuICAgIHJldHVybiBhc3RUaWNrKCk7XG59XG5cbnZhciBnbG9iYWxJZENvdW50ZXIgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gYWN0aW9uKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcik6IFRpY2sge1xuICAgIHJldHVybiBnZXRBY3Rpb25UaWNrKGdsb2JhbElkQ291bnRlcisrKShwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1YXJkKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrKTogVGljayB7XG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBDeWNsZXMgb3ZlciBpdHMgY2hpbGRyZW46IGl0ZXJhdGVzIHRvIHRoZSBuZXh0IGNoaWxkIG9uIHN1Y2Nlc3Mgb2YgYSBjaGlsZFxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xuICogQHJldHVybnMge1RpY2t9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZShhc3RUaWNrczogVGlja1tdKTogVGljayB7XG4gICAgcmV0dXJuIGdldFNlcXVlbmNlVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xufVxuXG4vKipcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxuICogU3VjY2VlZHMgaWYgZXZlbiBvbmUgc3VjY2VlZHMsIGVsc2UgZmFpbHNcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xuICogQHJldHVybnMge1RpY2t9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Rvcihhc3RUaWNrczogVGlja1tdKTogVGljayB7XG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xufVxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tIEFQSXMgLS0tLS0tLS0tLS0tLS0tICovXG5cbi8vMC4gdXRpbGl0aWVzXG4vLyBtaW4gYW5kIG1heCBhcmUgaW5jbHVzaXZlXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZE51bWJlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xufVxuXG4vLzEuIHN0b3J5IGluc3RhbmNlXG5cbi8vMS4xIGxvY2F0aW9uc1xudmFyIGxvY2F0aW9uR3JhcGggPSB7fTtcblxuLy9hZGQgdG8gYm90aCBzaWRlc1xuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2F0aW9uKGxvY2F0aW9uTmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcbiAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID09IHVuZGVmaW5lZClcbiAgICAgICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gW107XG4gICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdLmNvbmNhdChhZGphY2VudExvY2F0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50TG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9IFtdO1xuXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dLnB1c2gobG9jYXRpb25OYW1lKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmVBZGphY2VudChsb2NhdGlvbjE6IHN0cmluZywgbG9jYXRpb24yOiBzdHJpbmcpOmJvb2xlYW4ge1xuICAgIGNvbnNvbGUubG9nKFwiQXJlIGFkamFjZW50OiBcIiArIGxvY2F0aW9uMSArIFwiLCBcIitsb2NhdGlvbjIpO1xuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0gPT0gdW5kZWZpbmVkIHx8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24yXSA9PSB1bmRlZmluZWQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVpdGhlciBvbmUvYm90aCBsb2NhdGlvbnMgdW5kZWZpbmVkXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXVtpXSA9PSBsb2NhdGlvbjIpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vL3BhdGhmaW5kaW5nIHByaW1pdGl2ZXNcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0TG9jYXRpb24oc3RhcnQ6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdmFyIHZpc2l0ZWQgPSB7fTtcbiAgICB2YXIgcHJldmlvdXMgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbG9jYXRpb25HcmFwaCkge1xuICAgICAgICB2aXNpdGVkW2tleV0gPSBmYWxzZTtcbiAgICB9XG4gICAgdmlzaXRlZFtzdGFydF0gPSB0cnVlO1xuXG4gICAgdmFyIG15UXVldWUgPSBuZXcgUXVldWU8c3RyaW5nPigpO1xuICAgIG15UXVldWUuZW5xdWV1ZShzdGFydCk7XG5cbiAgICB3aGlsZSAoIW15UXVldWUuaXNFbXB0eSgpKSB7XG4gICAgICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBteVF1ZXVlLmRlcXVldWUoKTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gbG9jYXRpb25HcmFwaFtjdXJyZW50XTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF2aXNpdGVkW25laWdoYm9yc1tpXV0pIHtcbiAgICAgICAgICAgICAgICBteVF1ZXVlLmVucXVldWUobmVpZ2hib3JzW2ldKTtcbiAgICAgICAgICAgICAgICB2aXNpdGVkW25laWdoYm9yc1tpXV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yc1tpXV0gPSBjdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IGRlc3RpbmF0aW9uO1xuICAgIGlmIChjdXJyZW50ID09IHN0YXJ0KVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB3aGlsZSAocHJldmlvdXNbY3VycmVudF0gIT0gc3RhcnQpIHtcbiAgICAgICAgY3VycmVudCA9IHByZXZpb3VzW2N1cnJlbnRdO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50O1xufVxuXG4vLzEuMiBhZ2VudHNcblxuY2xhc3MgQWdlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIiBjb25zdHJ1Y3RvclwiKVxuICAgIH1cbn1cblxudmFyIGFnZW50czogQWdlbnRbXTtcbi8vIHZhciBhZ2VudHMgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFnZW50KGFnZW50TmFtZTogc3RyaW5nKSB7XG4gICAgXG4gICAgdmFyIGFnZW50ID0gbmV3IEFnZW50KGFnZW50TmFtZSk7XG4gICAgYWdlbnRzLnB1c2goYWdlbnQpO1xuICAgIC8vIGNvbnNvbGUubG9nKGFnZW50Lm5hbWUgKyBcIiBjcmVhdGVkXCIpXG4gICAgcmV0dXJuIGFnZW50O1xufVxuXG4vLzEuMyBpdGVtc1xuXG5jbGFzcyBJdGVtIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxufVxuXG52YXIgaXRlbXM6IEl0ZW1bXTtcbi8vIHZhciBpdGVtcyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShpdGVtTmFtZTogc3RyaW5nKSB7XG4gICAgdmFyIGl0ZW0gPSBuZXcgSXRlbShpdGVtTmFtZSk7XG4gICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICByZXR1cm4gaXRlbTtcbn1cblxuLy8xLjQgdmFyaWFibGVzXG52YXIgdmFyaWFibGVzID0ge307XG52YXIgYWdlbnRWYXJpYWJsZXMgPSB7fTtcbnZhciBpdGVtVmFyaWFibGVzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB2YXJpYWJsZXNbdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFyTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFnZW50VmFyaWFibGUoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkpXG4gICAgICAgIGFnZW50VmFyaWFibGVzW2FnZW50XSA9IHt9O1xuXG4gICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoaXNVbmRlZmluZWQodmFyaWFibGVzW3Zhck5hbWVdKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIG5vdCBzZXQhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB2YXJpYWJsZXNbdmFyTmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgYWdlbnQgXCIgKyBhZ2VudCArIFwiIG5vdCBzZXQhXCIpXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFyaWFibGVOb3RTZXQodmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZW50VmFyaWFibGVOb3RTZXQoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSlcbiAgICAgICAgaXRlbVZhcmlhYmxlc1tpdGVtXSA9IHt9O1xuXG4gICAgaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSB8fCBpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBpdGVtIFwiICsgaXRlbSArIFwiIG5vdCBzZXQhXCIpXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV07XG59XG5cblxuLy8yXG4vL2FnZW50LWJlaGF2aW9yIHRyZWUgbWFwcGluZ1xudmFyIGFnZW50VHJlZXMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFRyZWVUb0FnZW50KGFnZW50OiBBZ2VudCwgdHJlZTogVGljaykge1xuICAgIGFnZW50VHJlZXNbYWdlbnQubmFtZV0gPSB0cmVlO1xufVxuXG4vLzMuMVxuLy91c2VyIGFjdGlvbnNcbi8vVE9ETyBhZGQgdmFyaWFibGVzIHRvIHVzZXIgYWN0aW9uIHRleHRzXG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0ge1xuICAgIHRleHQ6IFwiXCIsXG4gICAgdXNlckFjdGlvbnNUZXh0OiBbXSxcbiAgICBhY3Rpb25FZmZlY3RzVGV4dDogXCJcIlxufVxudmFyIHVzZXJJbnRlcmFjdGlvblRyZWVzID0gW107XG52YXIgdXNlckFjdGlvbnMgPSB7fTtcblxuZnVuY3Rpb24gcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKSB7XG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgPSBcIlwiO1xuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQgPSBbXTtcbiAgICB1c2VyQWN0aW9ucyA9IHt9Oy8ve1wiR28gdG8gbG9jYXRpb24gWFwiIDogZWZmZWN0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25UcmVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBleGVjdXRlKHVzZXJJbnRlcmFjdGlvblRyZWVzW2ldKTtcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uID0gKHRleHQ6IHN0cmluZykgPT5cbiAgICBhY3Rpb24oXG4gICAgICAgICgpID0+IHRydWUsXG4gICAgICAgICgpID0+IHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ICs9IFwiXFxuXCIgKyB0ZXh0LCAwXG4gICAgKTtcbmV4cG9ydCBsZXQgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQgPSAodGV4dDogc3RyaW5nKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgKz0gXCJcXG5cIiArIHRleHQ7XG5cbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvblRyZWUgPSAodGV4dDogc3RyaW5nLCBlZmZlY3RUcmVlOiBUaWNrKSA9PiBhY3Rpb24oXG4gICAgKCkgPT4gdHJ1ZSxcbiAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGVmZmVjdFRyZWUpLCAwXG4pO1xuXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb24gPSAodGV4dDogc3RyaW5nLCBlZmZlY3Q6ICgpID0+IGFueSkgPT5cbiAgICBhY3Rpb24oXG4gICAgICAgICgpID0+IHRydWUsXG4gICAgICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgYWN0aW9uKCgpPT50cnVlLCBlZmZlY3QsIDApKSwgMFxuICAgICk7XG5cbmZ1bmN0aW9uIG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dDogc3RyaW5nLCB0cmVlOiBUaWNrKSB7XG4gICAgdXNlckFjdGlvbnNbdGV4dF0gPSB0cmVlO1xuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQucHVzaCh0ZXh0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGljazogVGljaykge1xuICAgIHVzZXJJbnRlcmFjdGlvblRyZWVzLnB1c2godGljayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlVXNlckFjdGlvbih0ZXh0OiBzdHJpbmcpIHtcbiAgICAvL2V4ZWN1dGUgdGhlIHVzZXIgYWN0aW9uXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ID0gXCJcIjtcbiAgICB2YXIgdXNlckFjdGlvbkVmZmVjdFRyZWUgPSB1c2VyQWN0aW9uc1t0ZXh0XTtcbiAgICBleGVjdXRlKHVzZXJBY3Rpb25FZmZlY3RUcmVlKTtcbn1cblxuLy80LlxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCgpIHtcbiAgICByZXR1cm4gdXNlckludGVyYWN0aW9uT2JqZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd29ybGRUaWNrKCkge1xuICAgIC8vYWxsIGFnZW50IHRpY2tzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyZWUgPSBhZ2VudFRyZWVzW2FnZW50c1tpXS5uYW1lXTtcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0cmVlKSkge1xuICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJleGVjdXRpbmdBZ2VudFwiLCBhZ2VudHNbaV0ubmFtZSk7XG4gICAgICAgICAgICBleGVjdXRlKHRyZWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XG59Il19
