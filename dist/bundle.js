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
var searchForAgent = function (agent, destination) {
    if (destination === void 0) { destination = "UNKNOWN"; }
    if (destination == "UNKNOWN") {
        var search = scripting_1.sequence([
            scripting_1.selector([
                scripting_1.guard(setDestinationPrecondForAgent(agent), setNextDestinationForAgent(agent)),
                scripting_1.action(function () { return true; }, function () {
                }, 0)
            ]),
            gotoNextLocationForAgent(agent),
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
            gotoNextLocationForAgent(agent),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL21hZGRpZS50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JJLENBQUM7QUFFRDtJQUNDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDekMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUN4QyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwSSxDQUFDO0FBRUQ7SUFDQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JJLENBQUM7QUFFRDtJQUNDLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDNUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDeEksQ0FBQztBQUVELGNBQWMsQ0FBQyxHQUFHLEdBQUcsb0JBQW9CLENBQUM7QUFDMUMsV0FBVyxDQUFDLEdBQUcsR0FBRyx1QkFBdUIsQ0FBQztBQUMxQyxVQUFVLENBQUMsR0FBRyxHQUFHLHFCQUFxQixDQUFDO0FBQ3ZDLFVBQVUsQ0FBQyxHQUFHLEdBQUcscUJBQXFCLENBQUM7QUFDdkMsU0FBUyxDQUFDLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQztBQUNyQyxVQUFVLENBQUMsR0FBRyxHQUFHLHFCQUFxQixDQUFDO0FBQ3ZDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsd0JBQXdCLENBQUM7QUFFN0MsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNsQyxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUkxQixrQkFBa0IsSUFBSTtJQUVsQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLElBQUksRUFBRSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ2xCLFdBQVcsR0FBQyxFQUFFLEVBQ2QsVUFBVSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDaEIsT0FBTyxHQUFDLENBQUMsRUFDVCxTQUFTLEdBQUMsR0FBRyxDQUFDO0lBQ2xCLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDaEIsT0FBTyxFQUFFLENBQUE7S0FDWjtJQUVELEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFFO1FBQzFCLElBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLE9BQU8sR0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzFELElBQUksT0FBTyxHQUFDLElBQUksRUFBRTtZQUNkLFVBQVUsSUFBRSxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QjthQUFNO1lBQ0gsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QixVQUFVLEdBQUMsQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLEtBQUcsRUFBRSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUU7WUFDakIsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QixNQUFNO1NBQ1Q7S0FFSjtJQUVELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFFRDtJQUNDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUd2RCxPQUFPLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztJQUM5QixPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDL0UsSUFBSSxhQUFhLEdBQUcscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUduSyw4QkFBOEI7SUFDOUIsWUFBWSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFDLEVBQUUsR0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztJQUN4RCxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFOUIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7UUFDdkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUM7S0FDdEU7SUFHRCxPQUFPLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztJQUM5QixPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcscUJBQXFCLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0RSxJQUFJLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1gsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyxJQUFJLGdCQUFnQixDQUFDO0tBQzVCO0lBRUQsWUFBWSxFQUFFLENBQUM7SUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyx1QkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUVEO0lBQ0MsSUFBRyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztRQUNwRCxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0tBQ3pGO0FBQ0YsQ0FBQztBQUVELFlBQVk7QUFDWixrQkFBa0IsQ0FBQztJQUNsQixJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFO1FBQ3BCLElBQUksY0FBYyxHQUFHLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzdFLElBQUcsQ0FBQyxrQkFBVyxDQUFDLGNBQWMsQ0FBQyxFQUFDO1lBQy9CLDZCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xDLHFCQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBRSxDQUFDO1NBQ1Q7S0FDRDtBQUNGLENBQUM7QUFFRCxpQkFBaUIsQ0FBQztJQUNqQixJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLEVBQUMsTUFBTTtRQUMzQixJQUFJLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3RELGdCQUFnQixFQUFFLENBQUM7WUFDbkIsZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcscUJBQXFCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztZQUNuRixZQUFZLEVBQUUsQ0FBQztTQUNmO0tBQ0Q7U0FBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLEVBQUMsSUFBSTtRQUNoQyxJQUFJLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3RELGdCQUFnQixFQUFFLENBQUM7WUFDbkIsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDO2dCQUN2QixnQkFBZ0IsR0FBRyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNyRSxZQUFZLEVBQUUsQ0FBQztTQUNmO0tBQ0Q7QUFDRixDQUFDO0FBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdkQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7O0FDcG1DckQsK0RBQTBEO0FBQzFELDZEQUFpRTtBQUlqRSxJQUFZLE1BSVg7QUFKRCxXQUFZLE1BQU07SUFDZCx5Q0FBTyxDQUFBO0lBQ1AseUNBQU8sQ0FBQTtJQUNQLHlDQUFPLENBQUE7QUFDWCxDQUFDLEVBSlcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBSWpCO0FBRUQsNEJBQTRCLEVBQVUsRUFBRSxVQUFlLEVBQUUsTUFBYztJQUNuRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBZUQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBRXBCLHVCQUF1QixFQUFVO0lBQzdCLE9BQU8sVUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLGFBQWlCO1FBQWpCLDhCQUFBLEVBQUEsaUJBQWlCO1FBQzNDLE9BQU87WUFDSCxJQUFJLFlBQVksRUFBRSxFQUFFO2dCQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNqQixVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNwQixVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztpQkFDNUM7Z0JBRUQsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtvQkFDOUIsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUMzQixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7aUJBQ3pCO3FCQUFNO29CQUNILE1BQU0sRUFBRSxDQUFDO29CQUNULE9BQU8sa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzdEO2FBQ0o7aUJBQU07Z0JBQ0gsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQUVEO0lBQ0ksT0FBTyxVQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBYztRQUFkLHVCQUFBLEVBQUEsY0FBYztRQUN6QyxPQUFPO1lBQ0gsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4RCxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3ZELENBQUMsQ0FBQTtJQUNMLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFFRCx5QkFBeUIsRUFBVTtJQUMvQixPQUFPLFVBQUMsUUFBUTtRQUNaLE9BQU87WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNqQixVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQzthQUNuQztZQUVELE9BQU8sVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUNsRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUVqRSxJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUMsT0FBTztvQkFDN0IsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO3FCQUNyQixJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUMsT0FBTztvQkFDbEMsT0FBTyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDekQsSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLE9BQU87b0JBQ2xDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUE7SUFDTCxDQUFDLENBQUE7QUFDTCxDQUFDO0FBRUQseUJBQXlCLEVBQVU7SUFDL0IsT0FBTyxVQUFDLFFBQVE7UUFDWixPQUFPO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDakIsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7YUFDbkM7WUFFRCxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDbEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFFakUsSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLE9BQU87b0JBQzdCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztxQkFDckIsSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLE9BQU87b0JBQ2xDLE9BQU8sa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ3pELElBQUksV0FBVyxJQUFJLE1BQU0sQ0FBQyxPQUFPO29CQUNsQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQzthQUN4QztZQUNELE9BQU8sa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQUVELGlCQUF3QixPQUFhO0lBQ2pDLE9BQU8sT0FBTyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUZELDBCQUVDO0FBRUQsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBRXhCLGdCQUF1QixZQUEwQixFQUFFLE1BQWMsRUFBRSxhQUFzQjtJQUNyRixPQUFPLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUE7QUFDaEYsQ0FBQztBQUZELHdCQUVDO0FBRUQsZUFBc0IsWUFBMEIsRUFBRSxPQUFhO0lBQzNELE9BQU8sWUFBWSxFQUFFLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFGRCxzQkFFQztBQUVELG1CQUEwQixZQUEwQixFQUFFLE9BQWE7SUFDL0QsT0FBTyxZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFGRCw4QkFFQztBQUVEOzs7OztHQUtHO0FBQ0gsa0JBQXlCLFFBQWdCO0lBQ3JDLE9BQU8sZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUZELDRCQUVDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxrQkFBeUIsUUFBZ0I7SUFDckMsT0FBTyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRkQsNEJBRUM7QUFHRCx5Q0FBeUM7QUFFekMsY0FBYztBQUNkLDRCQUE0QjtBQUM1Qix1QkFBOEIsR0FBVyxFQUFFLEdBQVc7SUFDbEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDN0QsQ0FBQztBQUZELHNDQUVDO0FBRUQsbUJBQW1CO0FBRW5CLGVBQWU7QUFDZixnREFBZ0Q7QUFFaEQsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBRXZCLE1BQU07QUFDTixtQkFBbUI7QUFDbkIsaURBQWlEO0FBRWpELHNFQUFzRTtBQUN0RSw0QkFBNEI7QUFFNUIsK0RBQStEO0FBQy9ELHlEQUF5RDtBQUV6RCxnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLG9EQUFvRDtBQUNwRCxnQkFBZ0I7QUFDaEIsWUFBWTtBQUVaLFFBQVE7QUFDUixJQUFJO0FBR0osbUJBQW1CO0FBQ25CLHFCQUE0QixZQUFvQixFQUFFLGlCQUEyQjtJQUN6RSxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxTQUFTO1FBQ3hDLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckMsYUFBYSxDQUFDLFlBQVksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUVwRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQy9DLElBQUksYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUztZQUNoRCxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFN0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzFEO0FBQ0wsQ0FBQztBQVhELGtDQVdDO0FBRUQscUJBQTRCLFNBQWlCLEVBQUUsU0FBaUI7SUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNELElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxFQUFDO1FBQy9FLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUNuRCxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RELElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBQztZQUN6QyxPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBYkQsa0NBYUM7QUFFRCx3QkFBd0I7QUFDeEIseUJBQWdDLEtBQWEsRUFBRSxXQUFtQjtJQUM5RCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLEtBQUssSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDeEI7SUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRXRCLElBQUksT0FBTyxHQUFHLElBQUksZUFBSyxFQUFVLENBQUM7SUFDbEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3ZCLElBQUksT0FBTyxHQUFXLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QyxJQUFJLE9BQU8sS0FBSyxXQUFXLEVBQUU7WUFDekIsTUFBTTtTQUNUO1FBQ0QsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzdCLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7YUFDcEM7U0FDSjtLQUNKO0lBRUQsSUFBSSxPQUFPLEdBQVcsV0FBVyxDQUFDO0lBQ2xDLElBQUksT0FBTyxJQUFJLEtBQUs7UUFDaEIsT0FBTyxPQUFPLENBQUM7SUFDbkIsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxFQUFFO1FBQy9CLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDL0I7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBbkNELDBDQW1DQztBQUVELFlBQVk7QUFFWjtJQU9JLGVBQW1CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBSi9CLGlCQUFZLEdBQWlDLEVBQUUsQ0FBQztRQUNoRCxtQkFBYyxHQUFpQyxFQUFFLENBQUM7UUFDbEQsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUduQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVELGtDQUFrQixHQUFsQixVQUFtQixlQUF1QjtRQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsd0NBQXdCLEdBQXhCLFVBQXlCLElBQVUsRUFBRSxVQUFrQjtRQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDOUMsQ0FBQztJQUVELDBDQUEwQixHQUExQixVQUEyQixTQUFpQixFQUFFLFVBQWtCO1FBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ2hELENBQUM7SUFFRCw4QkFBYyxHQUFkLFVBQWUsV0FBbUI7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQUVELDJCQUFXLEdBQVgsVUFBWSxJQUFVO1FBQ2xCLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFDO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELE9BQU8sSUFBSSxDQUFDLENBQUMsOEJBQThCO1NBQzlDO2FBQ0c7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFRCwyQkFBVyxHQUFYLFVBQVksSUFBVTtRQUNsQixJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksRUFBQztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxHQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEcsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN0QzthQUNHO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUwsWUFBQztBQUFELENBaERBLEFBZ0RDLElBQUE7QUFoRFksc0JBQUs7QUFrRGxCLElBQUksTUFBTSxHQUFpQixJQUFJLEtBQUssRUFBUyxDQUFDO0FBQzlDLG1CQUFtQjtBQUVuQixrQkFBeUIsU0FBaUI7SUFDdEMscUNBQXFDO0lBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBTkQsNEJBTUM7QUFFRCxXQUFXO0FBRVgsT0FBTztBQUNQO0lBR0ksY0FBbUIsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELGlDQUFrQixHQUFsQixVQUFtQixlQUF1QjtRQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUMzQyxDQUFDO0lBQ0wsV0FBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBRUQsSUFBSSxLQUFLLEdBQWdCLElBQUksS0FBSyxFQUFRLENBQUM7QUFDM0Msa0JBQWtCO0FBRWxCLGlCQUF3QixRQUFnQjtJQUNwQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFKRCwwQkFJQztBQUVELGVBQWU7QUFDZixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDbkIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUV2QixxQkFBNEIsT0FBZSxFQUFFLEtBQVU7SUFDbkQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMzQixPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBSEQsa0NBR0M7QUFFRCwwQkFBaUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxLQUFVO0lBQ3ZFLElBQUksa0JBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUUvQixjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3ZDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFORCw0Q0FNQztBQUVELHFCQUE0QixPQUFlO0lBQ3ZDLElBQUksa0JBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUM7UUFDakQsT0FBTztLQUNWO0lBQ0QsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQU5ELGtDQU1DO0FBRUQsMEJBQWlDLEtBQWEsRUFBRSxPQUFlO0lBQzNELElBQUksa0JBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxrQkFBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFO1FBQ25GLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLE9BQU8sR0FBRyxhQUFhLEdBQUcsS0FBSyxHQUFHLFdBQVcsQ0FBQyxDQUFBO1FBQ3hFLE9BQU87S0FDVjtJQUNELE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFORCw0Q0FNQztBQUVELDBCQUFpQyxPQUFlO0lBQzVDLE9BQU8sa0JBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRkQsNENBRUM7QUFFRCwrQkFBc0MsS0FBYSxFQUFFLE9BQWU7SUFDaEUsT0FBTyxrQkFBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLGtCQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDN0YsQ0FBQztBQUZELHNEQUVDO0FBRUQsT0FBTztBQUNQLHlCQUFnQyxJQUFVLEVBQUUsT0FBZSxFQUFFLEtBQVU7SUFDbkUsSUFBSSxrQkFBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFbEMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDMUMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQU5ELDBDQU1DO0FBRUQseUJBQWdDLElBQVksRUFBRSxPQUFlO0lBQ3pELElBQUksa0JBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxrQkFBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFO1FBQy9FLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLE9BQU8sR0FBRyxZQUFZLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFBO1FBQ3RFLE9BQU87S0FDVjtJQUNELE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFORCwwQ0FNQztBQUdELEdBQUc7QUFDSCw2QkFBNkI7QUFFN0IsSUFBSSxVQUFVLEdBQWlDLEVBQUUsQ0FBQztBQUNsRCx1QkFBdUI7QUFFdkIsMkJBQWtDLEtBQVksRUFBRSxJQUFVO0lBQ3RELFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLENBQUM7QUFGRCw4Q0FFQztBQUVELEtBQUs7QUFDTCxjQUFjO0FBQ2QseUNBQXlDO0FBQ3pDLElBQUkscUJBQXFCLEdBQUc7SUFDeEIsSUFBSSxFQUFFLEVBQUU7SUFDUixlQUFlLEVBQUUsRUFBRTtJQUNuQixpQkFBaUIsRUFBRSxFQUFFO0NBQ3hCLENBQUE7QUFDRCxJQUFJLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztBQUM5QixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFFckI7SUFDSSxxQkFBcUIsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2hDLHFCQUFxQixDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDM0MsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFBLDhCQUE4QjtJQUMvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BDO0FBQ0wsQ0FBQztBQUVVLFFBQUEsd0JBQXdCLEdBQUcsVUFBQyxJQUFZO0lBQy9DLE9BQUEsTUFBTSxDQUNGLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxFQUNWLGNBQU0sT0FBQSxxQkFBcUIsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBekMsQ0FBeUMsRUFDL0MsQ0FBQyxDQUNKO0FBSkQsQ0FJQyxDQUFDO0FBQ0ssUUFBQSx1QkFBdUIsR0FBRyxVQUFDLElBQVksSUFBSyxPQUFBLHFCQUFxQixDQUFDLGlCQUFpQixJQUFJLElBQUksR0FBRyxJQUFJLEVBQXRELENBQXNELENBQUM7QUFFbkcsUUFBQSxpQkFBaUIsR0FBRyxVQUFDLElBQVksRUFBRSxVQUFnQixJQUFLLE9BQUEsTUFBTSxDQUNyRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksRUFDVixjQUFNLE9BQUEsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxFQUFyQyxDQUFxQyxFQUFFLENBQUMsQ0FDakQsRUFIa0UsQ0FHbEUsQ0FBQztBQUVTLFFBQUEsYUFBYSxHQUFHLFVBQUMsSUFBWSxFQUFFLE1BQWlCO0lBQ3ZELE9BQUEsTUFBTSxDQUNGLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxFQUNWLGNBQU0sT0FBQSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQUksT0FBQSxJQUFJLEVBQUosQ0FBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUF0RCxDQUFzRCxFQUFFLENBQUMsQ0FDbEU7QUFIRCxDQUdDLENBQUM7QUFNTixjQUFjO0FBQ2QsSUFBSTtBQUdKLDZCQUE2QixJQUFZLEVBQUUsSUFBVTtJQUNqRCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUVELGdDQUF1QyxJQUFVO0lBQzdDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRkQsd0RBRUM7QUFFRCwyQkFBa0MsSUFBWTtJQUMxQyx5QkFBeUI7SUFDekIscUJBQXFCLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzdDLElBQUksb0JBQW9CLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFMRCw4Q0FLQztBQUVELElBQUk7QUFDSjtJQUNJLHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQUZELGdDQUVDO0FBRUQ7SUFDSSxPQUFPLHFCQUFxQixDQUFDO0FBQ2pDLENBQUM7QUFGRCw0REFFQztBQUVEO0lBQ0ksaUJBQWlCO0lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQVZELDhCQVVDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgYXJyYXlzID0gcmVxdWlyZShcIi4vYXJyYXlzXCIpO1xudmFyIExpbmtlZExpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgKiBDcmVhdGVzIGFuIGVtcHR5IExpbmtlZCBMaXN0LlxuICAgICogQGNsYXNzIEEgbGlua2VkIGxpc3QgaXMgYSBkYXRhIHN0cnVjdHVyZSBjb25zaXN0aW5nIG9mIGEgZ3JvdXAgb2Ygbm9kZXNcbiAgICAqIHdoaWNoIHRvZ2V0aGVyIHJlcHJlc2VudCBhIHNlcXVlbmNlLlxuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKi9cbiAgICBmdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xuICAgICAgICAvKipcbiAgICAgICAgKiBGaXJzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAqIExhc3Qgbm9kZSBpbiB0aGUgbGlzdFxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICogQHByaXZhdGVcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAqIE51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbGlzdFxuICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICogQHByaXZhdGVcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEFkZHMgYW4gZWxlbWVudCB0byB0aGlzIGxpc3QuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIGFkZGVkLlxuICAgICogQHBhcmFtIHtudW1iZXI9fSBpbmRleCBvcHRpb25hbCBpbmRleCB0byBhZGQgdGhlIGVsZW1lbnQuIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZFxuICAgICogdGhlIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGlzIGxpc3QuXG4gICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBhZGRlZCBvciBmYWxzZSBpZiB0aGUgaW5kZXggaXMgaW52YWxpZFxuICAgICogb3IgaWYgdGhlIGVsZW1lbnQgaXMgdW5kZWZpbmVkLlxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGluZGV4KSkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5FbGVtZW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5uRWxlbWVudHMgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdOb2RlID0gdGhpcy5jcmVhdGVOb2RlKGl0ZW0pO1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDAgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgLy8gSW5zZXJ0IGF0IHRoZSBlbmQuXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlLm5leHQgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIC8vIENoYW5nZSBmaXJzdCBub2RlLlxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSBwcmV2Lm5leHQ7XG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubkVsZW1lbnRzKys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xuICAgICogZW1wdHkuXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlyc3ROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICogQHJldHVybiB7Kn0gdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcbiAgICAqIGVtcHR5LlxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGRlc2lyZWQgaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXNcbiAgICAgKiBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCk7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlXG4gICAgICogc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoZSBMaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhpcyBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZVxuICAgICAqIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhpcyBsaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcbiAgICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgICAqXG4gICAgICAgKiA8cHJlPlxuICAgICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgICAqIH1cbiAgICAgICAqIDwvcHJlPlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcbiAgICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgZmFsc2VcbiAgICAgICAqIG90aGVyd2lzZS5cbiAgICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pbmRleE9mKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSByZW1vdmVkIGZyb20gdGhpcyBsaXN0LCBpZiBwcmVzZW50LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGxpc3QgY29udGFpbmVkIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA8IDEgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXG4gICAgICogQHBhcmFtIHtMaW5rZWRMaXN0fSBvdGhlciB0aGUgb3RoZXIgbGlzdC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xuICAgICAqIGFyZSBjdXN0b20gb2JqZWN0cyB5b3Ugc2hvdWxkIHByb3ZpZGUgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlXG4gICAgICogdGhlID09PSBvcGVyYXRvciBpcyB1c2VkIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIExpbmtlZExpc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlci5zaXplKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHNBdXgodGhpcy5maXJzdE5vZGUsIG90aGVyLmZpcnN0Tm9kZSwgZXFGKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFsc0F1eCA9IGZ1bmN0aW9uIChuMSwgbjIsIGVxRikge1xuICAgICAgICB3aGlsZSAobjEgIT09IG51bGwgJiYgbjIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghZXFGKG4xLmVsZW1lbnQsIG4yLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbjEgPSBuMS5uZXh0O1xuICAgICAgICAgICAgbjIgPSBuMi5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZ2l2ZW4gaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gcmVtb3ZlZCBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXMgb3V0IG9mIGJvdW5kcy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzIHx8IHRoaXMuZmlyc3ROb2RlID09PSBudWxsIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMSkge1xuICAgICAgICAgICAgLy9GaXJzdCBub2RlIGluIHRoZSBsaXN0LlxuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5maXJzdE5vZGUubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzLm5leHQgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gbnVsbCAmJiBwcmV2aW91cy5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHByZXZpb3VzLm5leHQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gcHJldmlvdXMubmV4dC5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubkVsZW1lbnRzLS07XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgbGlzdCBpbiBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soY3VycmVudE5vZGUuZWxlbWVudCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldmVyc2VzIHRoZSBvcmRlciBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaW5rZWQgbGlzdCAobWFrZXMgdGhlIGxhc3RcbiAgICAgKiBlbGVtZW50IGZpcnN0LCBhbmQgdGhlIGZpcnN0IGVsZW1lbnQgbGFzdCkuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xuICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGVtcCA9IGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IHByZXZpb3VzO1xuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xuICAgICAgICAgICAgY3VycmVudCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMubGFzdE5vZGU7XG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSB0ZW1wO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0IGluIHByb3BlclxuICAgICAqIHNlcXVlbmNlLlxuICAgICAqIEByZXR1cm4ge0FycmF5LjwqPn0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCxcbiAgICAgKiBpbiBwcm9wZXIgc2VxdWVuY2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goY3VycmVudE5vZGUuZWxlbWVudCk7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzIDw9IDA7XG4gICAgfTtcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5cy50b1N0cmluZyh0aGlzLnRvQXJyYXkoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLm5vZGVBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gKHRoaXMubkVsZW1lbnRzIC0gMSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgbm9kZSAhPSBudWxsOyBpKyspIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWxlbWVudDogaXRlbSxcbiAgICAgICAgICAgIG5leHQ6IG51bGxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5rZWRMaXN0O1xufSgpKTsgLy8gRW5kIG9mIGxpbmtlZCBsaXN0XG5leHBvcnRzLmRlZmF1bHQgPSBMaW5rZWRMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlua2VkTGlzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMaW5rZWRMaXN0XzEgPSByZXF1aXJlKFwiLi9MaW5rZWRMaXN0XCIpO1xudmFyIFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW1wdHkgcXVldWUuXG4gICAgICogQGNsYXNzIEEgcXVldWUgaXMgYSBGaXJzdC1Jbi1GaXJzdC1PdXQgKEZJRk8pIGRhdGEgc3RydWN0dXJlLCB0aGUgZmlyc3RcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBxdWV1ZSB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xuICAgICAqIGltcGxlbWVudGF0aW9uIHVzZXMgYSBsaW5rZWQgbGlzdCBhcyBhIGNvbnRhaW5lci5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBRdWV1ZSgpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpbmtlZExpc3RfMS5kZWZhdWx0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMubGlzdC5maXJzdCgpO1xuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZUVsZW1lbnRBdEluZGV4KDApO1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMsIGJ1dCBkb2VzIG5vdCByZW1vdmUsIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgc3RhY2sgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yLCBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsXG4gICAgICogZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChlbGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmNvbnRhaW5zKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpIDw9IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5saXN0LmNsZWFyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBxdWV1ZSBpblxuICAgICAqIEZJRk8gb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBRdWV1ZTtcbn0oKSk7IC8vIEVuZCBvZiBxdWV1ZVxuZXhwb3J0cy5kZWZhdWx0ID0gUXVldWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBpdGVtXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMDtcbn1cbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcbi8qKlxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBjaGFuZ2VkIGFmdGVyIHRoaXMgY2FsbC5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheSBlcXVhbFxuICogdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB3aG9zZSBmcmVxdWVuY3kgaXMgdG8gYmUgZGV0ZXJtaW5lZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKiBlcXVhbCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZnJlcXVlbmN5KGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgZnJlcSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgZnJlcSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmcmVxO1xufVxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIHNwZWNpZmllZCBhcnJheXMgYXJlIGVxdWFsIHRvIG9uZSBhbm90aGVyLlxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxuICogb2YgZWxlbWVudHMsIGFuZCBhbGwgY29ycmVzcG9uZGluZyBwYWlycyBvZiBlbGVtZW50cyBpbiB0aGUgdHdvXG4gKiBhcnJheXMgYXJlIGVxdWFsIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgdGhlIG90aGVyIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHR3byBhcnJheXMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5MS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWVxdWFscyhhcnJheTFbaV0sIGFycmF5MltpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuZXF1YWxzID0gZXF1YWxzO1xuLyoqXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSB0byBjb3B5LlxuICogQHJldHVybiB7QXJyYXl9IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKi9cbmZ1bmN0aW9uIGNvcHkoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KCk7XG59XG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuLyoqXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBzd2FwIGVsZW1lbnRzLlxuICogQHBhcmFtIHtudW1iZXJ9IGkgdGhlIGluZGV4IG9mIG9uZSBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGlzIGRlZmluZWQgYW5kIHRoZSBpbmRleGVzIGFyZSB2YWxpZC5cbiAqL1xuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xuICAgIGlmIChpIDwgMCB8fCBpID49IGFycmF5Lmxlbmd0aCB8fCBqIDwgMCB8fCBqID49IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0ZW1wID0gYXJyYXlbaV07XG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICBhcnJheVtqXSA9IHRlbXA7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnN3YXAgPSBzd2FwO1xuZnVuY3Rpb24gdG9TdHJpbmcoYXJyYXkpIHtcbiAgICByZXR1cm4gJ1snICsgYXJyYXkudG9TdHJpbmcoKSArICddJztcbn1cbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcbiAqIHN0YXJ0aW5nIGZyb20gaW5kZXggMCB0byBsZW5ndGggLSAxLlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIGl0ZXJhdGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGVsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5leHBvcnRzLmhhcyA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn07XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29tcGFyZSBlbGVtZW50IG9yZGVyLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlKGEsIGIpIHtcbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0Q29tcGFyZSA9IGRlZmF1bHRDb21wYXJlO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG59XG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICckcycgKyBpdGVtO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICckbycgKyBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0VG9TdHJpbmcgPSBkZWZhdWx0VG9TdHJpbmc7XG4vKipcbiogSm9pbnMgYWxsIHRoZSBwcm9wZXJpZXMgb2YgdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgam9pbiBzdHJpbmdcbiovXG5mdW5jdGlvbiBtYWtlU3RyaW5nKGl0ZW0sIGpvaW4pIHtcbiAgICBpZiAoam9pbiA9PT0gdm9pZCAwKSB7IGpvaW4gPSAnLCc7IH1cbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHRvcmV0ID0gJ3snO1xuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLmhhcyhpdGVtLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIGpvaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBwcm9wICsgJzonICsgaXRlbVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9yZXQgKyAnfSc7XG4gICAgfVxufVxuZXhwb3J0cy5tYWtlU3RyaW5nID0gbWFrZVN0cmluZztcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYykge1xuICAgIHJldHVybiAodHlwZW9mIGZ1bmMpID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyB1bmRlZmluZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqKSA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBzdHJpbmcuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcbi8qKlxuICogUmV2ZXJzZXMgYSBjb21wYXJlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHJldmVyc2VDb21wYXJlRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGNvbXBhcmVGdW5jdGlvbikgfHwgIWlzRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGQsIHYpICogLTE7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5yZXZlcnNlQ29tcGFyZUZ1bmN0aW9uID0gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbjtcbi8qKlxuICogUmV0dXJucyBhbiBlcXVhbCBmdW5jdGlvbiBnaXZlbiBhIGNvbXBhcmUgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gY29tcGFyZVRvRXF1YWxzKGNvbXBhcmVGdW5jdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGEsIGIpID09PSAwO1xuICAgIH07XG59XG5leHBvcnRzLmNvbXBhcmVUb0VxdWFscyA9IGNvbXBhcmVUb0VxdWFscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiLyogLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNjcmlwdGluZy50c1wiLz4gKi9cbmltcG9ydCB7XG5cdGFkZEFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxuXHRnZXRSYW5kTnVtYmVyLCBnZXRWYXJpYWJsZSwgc2VxdWVuY2UsIHNlbGVjdG9yLCBleGVjdXRlLCBQcmVjb25kaXRpb24sIGdldEFnZW50VmFyaWFibGUsIG5lZ19ndWFyZCwgZ3VhcmQsXG5cdGlzVmFyaWFibGVOb3RTZXQsIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiwgYWRkVXNlckFjdGlvbiwgYWRkVXNlckludGVyYWN0aW9uVHJlZSwgaW5pdGlhbGl6ZSxcblx0Z2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXG5cdGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0LCBhcmVBZGphY2VudCwgYWRkVXNlckFjdGlvblRyZWUsIEFnZW50XG59IGZyb20gXCIuL3NjcmlwdGluZ1wiO1xuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xuXG4vLyAxLiBEZWZpbmUgU3RhdGVcblxuLy8gTG9jYXRpb25zXG52YXIgU1RPUkFHRSA9IFwiU1RPUkFHRVwiO1xudmFyIERPQ1RPUlNfT0ZGSUNFID0gXCJET0NUT1JTIE9GRklDRVwiO1xudmFyIEVOR0lORVMgPSBcIkVOR0lORVNcIjtcbnZhciBDT0NLUElUID0gXCJDT0NLUElUXCI7XG52YXIgRVNDQVBFX1BPRCA9IFwiRVNDQVBFIFBPRFwiO1xudmFyIFRSQU5TUE9SVF9ST09NID0gXCJUUkFOU1BPUlQgUk9PTVwiO1xudmFyIE1PTklUT1JJTkdfUk9PTSA9IFwiTU9OSVRPUklORyBST09NXCI7XG52YXIgTUFJTl9BUkVBID0gXCJNQUlOIEFSRUFcIjtcbnZhciBGRU1fQkVEUk9PTSA9IFwiRkVNIEJFRFJPT01cIjtcbnZhciBNQUxFX0JFRFJPT00gPSBcIk1BTEUgQkVEUk9PTVwiO1xudmFyIEJBVEhST09NID0gXCJCQVRIUk9PTVwiO1xudmFyIFVOS05PV04gPSBcIlVOS05PV05cIjtcblxuLy8gQWRkIExvY2F0aW9uc1xuYWRkTG9jYXRpb24oRU5HSU5FUywgW1NUT1JBR0UsIE1BSU5fQVJFQV0pO1xuYWRkTG9jYXRpb24oU1RPUkFHRSwgW0VOR0lORVMsIERPQ1RPUlNfT0ZGSUNFXSk7XG5hZGRMb2NhdGlvbihET0NUT1JTX09GRklDRSwgW1NUT1JBR0UsIE1BSU5fQVJFQSwgQ09DS1BJVCwgTU9OSVRPUklOR19ST09NXSk7XG5hZGRMb2NhdGlvbihDT0NLUElULCBbRE9DVE9SU19PRkZJQ0VdKTtcbmFkZExvY2F0aW9uKEVTQ0FQRV9QT0QsIFtNQUlOX0FSRUFdKTtcbmFkZExvY2F0aW9uKFRSQU5TUE9SVF9ST09NLCBbTU9OSVRPUklOR19ST09NLCBNQUlOX0FSRUFdKTtcbmFkZExvY2F0aW9uKE1PTklUT1JJTkdfUk9PTSwgW1RSQU5TUE9SVF9ST09NLCBET0NUT1JTX09GRklDRV0pO1xuYWRkTG9jYXRpb24oTUFJTl9BUkVBLCBbRU5HSU5FUywgU1RPUkFHRSwgRE9DVE9SU19PRkZJQ0UsIFRSQU5TUE9SVF9ST09NLCBFU0NBUEVfUE9EXSk7XG5hZGRMb2NhdGlvbihGRU1fQkVEUk9PTSwgW01BSU5fQVJFQSwgQkFUSFJPT01dKTtcbmFkZExvY2F0aW9uKE1BTEVfQkVEUk9PTSwgW01BSU5fQVJFQSwgQkFUSFJPT01dKTtcbmFkZExvY2F0aW9uKEJBVEhST09NLCBbTUFJTl9BUkVBLCBGRU1fQkVEUk9PTSwgTUFMRV9CRURST09NXSk7XG5cbi8vIGFnZW50c1xudmFyIENhbGViID0gYWRkQWdlbnQoXCJDYWxlYlwiKTtcbnZhciBRdWlubiA9IGFkZEFnZW50KFwiUXVpbm5cIik7XG52YXIgTWFyayA9IGFkZEFnZW50KFwiTWFya1wiKTtcbnZhciBFZGRpZSA9IGFkZEFnZW50KFwiRWRkaWVcIik7XG52YXIgQmVhdHJpY2UgPSBhZGRBZ2VudChcIkJlYXRyaWNlXCIpO1xuXG4vLyBpdGVtc1xudmFyIHdpcmVzMSA9IGFkZEl0ZW0oXCJ3aXJlczFcIik7XG52YXIgd2lyZXMyID0gYWRkSXRlbShcIndpcmVzMlwiKTtcblxuXG53aXJlczEuc2V0Q3VycmVudExvY2F0aW9uKFNUT1JBR0UpO1xud2lyZXMyLnNldEN1cnJlbnRMb2NhdGlvbihNT05JVE9SSU5HX1JPT00pO1xuXG4vLyBzZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBTVE9SQUdFKTtcbi8vIHNldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIsIE1PTklUT1JJTkdfUk9PTSk7XG5cbi8vIHZhciB3aXJlc0NvbGxlY3RlZCA9IHNldFZhcmlhYmxlKFwid2lyZXNDb2xsZWN0ZWRcIiwgMCk7XG5cbi8vIC8vIHZhcmlhYmxlc1xuLy9DYWxlYlxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJjdXJyZW50TG9jYXRpb25cIiwgQ09DS1BJVCk7XG5DYWxlYi5zZXRDdXJyZW50TG9jYXRpb24oQ09DS1BJVCk7XG5cbi8vUXVpbm5cbi8vIHNldEFnZW50VmFyaWFibGUoUXVpbm4sIFwiY3VycmVudExvY2F0aW9uXCIsIERPQ1RPUlNfT0ZGSUNFKTtcblF1aW5uLnNldEN1cnJlbnRMb2NhdGlvbihET0NUT1JTX09GRklDRSk7XG5cbi8vTWFya1xuLy8gc2V0QWdlbnRWYXJpYWJsZShNYXJrLCBcImN1cnJlbnRMb2NhdGlvblwiLCBUUkFOU1BPUlRfUk9PTSk7XG5NYXJrLnNldEN1cnJlbnRMb2NhdGlvbihUUkFOU1BPUlRfUk9PTSk7XG5cbi8vRWRkaWVcbi8vIHNldEFnZW50VmFyaWFibGUoRWRkaWUsIFwiY3VycmVudExvY2F0aW9uXCIsIFNUT1JBR0UpO1xuRWRkaWUuc2V0Q3VycmVudExvY2F0aW9uKFNUT1JBR0UpO1xuXG4vL0JlYXRyaWNlXG4vLyBzZXRBZ2VudFZhcmlhYmxlKEJlYXRyaWNlLCBcImN1cnJlbnRMb2NhdGlvblwiLCBFTkdJTkVTKTtcbkJlYXRyaWNlLnNldEN1cnJlbnRMb2NhdGlvbihFTkdJTkVTKTtcblxuLy8gUGxheWVyXG52YXIgcGxheWVyTG9jYXRpb24gPSBzZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIsIE1BSU5fQVJFQSk7XG52YXIgd2lyZXNDb2xsZWN0ZWQgPSBzZXRWYXJpYWJsZShcIndpcmVzQ29sbGVjdGVkXCIsIDApO1xuXG5cbi8vIEtub3dsZWRnZSBcbkNhbGViLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xuUXVpbm4uc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XG5NYXJrLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xuRWRkaWUuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XG5CZWF0cmljZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcblxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJsYXN0U2Vlbjp3aXJlczFcIiwgVU5LTk9XTilcbi8vIHNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46d2lyZXMyXCIsIFVOS05PV04pXG4vLyBzZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImxhc3RTZWVuOnBsYXllclwiLCBVTktOT1dOKVxuXG5DYWxlYi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcbi8vIENhbGViLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5RdWlubi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcbi8vIFF1aW5uLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5NYXJrLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIFVOS05PV04pO1xuLy8gTWFyay5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xuRWRkaWUuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XG4vLyBFZGRpZS5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xuQmVhdHJpY2Uuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XG4vLyBCZWF0cmljZS5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xuXG5cbi8vIEdvYWxzIGZvciB0aGUgcGxheWVyXG5cbi8vIDA6IFVua25vd24vSW5pdGlhbCBTdGF0ZVxuLy8gMTogRm91bmQgb3V0IGFib3V0IEZhdWx0OjEuIE5ldyBHb2FsLiAob25seSBvY2N1cnMgaWYgc3RhdHVzPTApXG4vLyAyOiBGaXhlZCBGYXVsdDoxIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9MSlcbi8vIDM6IEZvdW5kIG91dCBhYm91dCBGYXVsdDoyLiBOZXcgR29hbCAob25seSBvY2N1cnMgaWYgc3RhdHVzPTIpXG4vLyA0OiBGaXhlZCBGYXVsdDoyIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9MykgXG4vLyBldGMuIGV0Yy5cbnZhciBnb2FsX2Jyb2tlbl90cmFuc3BvcnQgPSBzZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiLCAwKTtcdFx0Ly8gbWF4OjRcbnZhciBnb2FsX2Jyb2tlbl9lbmdpbmVzID0gc2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiLCAwKTtcbnZhciBnb2FsX2Jyb2tlbl9zdG9yYWdlID0gc2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiLCAwKTtcbnZhciBnb2FsX2Jyb2tlbl9jb2NrcGl0ID0gc2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiLCAwKTtcbnZhciBnb2FsX2Jyb2tlbl9tYWluID0gc2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIsIDApO1xudmFyIGdvYWxfYnJva2VuX2RyID0gc2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIsIDApO1xudmFyIGdvYWxfYnJva2VuX21vbml0b3JpbmcgPSBzZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIiwgMCk7XG52YXIgZ29hbF9icm9rZW5fZXNjYXBlID0gc2V0VmFyaWFibGUoXCJFU0NBUEVfUE9EOkJyb2tlblwiLCAwKTtcblxuLy8gLy8gMi4gRGVmaW5lIEJUc1xuLy8gLy8gY3JlYXRlIGdyb3VuZCBhY3Rpb25zXG5cbi8vIFRvZG8gZnJvbSBoZXJlXG4vLyBmdW5jdGlvbiBmdW5jdGlvbl9uYW1lKGFyZ3VtZW50KSB7XG4vLyBcdC8vIGJvZHkuLi5cbi8vIH1cblxuXG5mdW5jdGlvbiBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudDogQWdlbnQsIGRlc3RpbmF0aW9uOiBzdHJpbmcgPSBcIlVOS05PV05cIikge1xuXG5cdGlmKGRlc3RpbmF0aW9uID09IFwiVU5LTk9XTlwiKXtcblx0XHRsZXQgc2V0UmFuZE51bWJlciA9IGFjdGlvbihcblx0XHRcdCgpID0+IHRydWUsXG5cdFx0XHQoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID0gZ2V0UmFuZE51bWJlcigxLCAxMSksXG5cdFx0XHQwXG5cdFx0KTtcblxuXHRcdC8vIFNhc2hhIFRvZG86IFdvcmsgb24gdXNpbmcgdGhlIEFnZW50L0l0ZW0gdHlwZXMgZm9yIGRlc3RpbmF0aW9uc1xuXHRcdGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFTkdJTkVTLCAwKTtcblx0XHRsZXQgY2hvb3NlU1RPUkFHRSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDIsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gU1RPUkFHRSwgMCk7XG5cdFx0bGV0IGNob29zZURPQ1RPUlNfT0ZGSUNFID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBET0NUT1JTX09GRklDRSwgMCk7XG5cdFx0bGV0IGNob29zZUNPQ0tQSVQgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA0LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IENPQ0tQSVQsIDApO1xuXHRcdGxldCBjaG9vc2VFU0NBUEVfUE9EID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFU0NBUEVfUE9ELCAwKTtcblx0XHRsZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA2LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IFRSQU5TUE9SVF9ST09NLCAwKTtcblx0XHRsZXQgY2hvb3NlTU9OSVRPUklOR19ST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNT05JVE9SSU5HX1JPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNQUlOX0FSRUEgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA4LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BSU5fQVJFQSwgMCk7XG5cdFx0bGV0IGNob29zZUZFTV9CRURST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gOSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBGRU1fQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZU1BTEVfQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDEwLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZUJBVEhST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMTEsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQkFUSFJPT00sIDApO1xuXG5cdFx0bGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlcXVlbmNlKFtcblx0XHRcdHNldFJhbmROdW1iZXIsXG5cdFx0XHRzZWxlY3RvcihbXG5cdFx0XHRcdGNob29zZUVOR0lORVMsXG5cdFx0XHRcdGNob29zZUNPQ0tQSVQsXG5cdFx0XHRcdGNob29zZVNUT1JBR0UsXG5cdFx0XHRcdGNob29zZURPQ1RPUlNfT0ZGSUNFLFxuXHRcdFx0XHRjaG9vc2VCQVRIUk9PTSxcblx0XHRcdFx0Y2hvb3NlTUFMRV9CRURST09NLFxuXHRcdFx0XHRjaG9vc2VGRU1fQkVEUk9PTSxcblx0XHRcdFx0Y2hvb3NlTUFJTl9BUkVBLFxuXHRcdFx0XHRjaG9vc2VNT05JVE9SSU5HX1JPT00sXG5cdFx0XHRcdGNob29zZVRSQU5TUE9SVF9ST09NLFxuXHRcdFx0XHRjaG9vc2VFU0NBUEVfUE9EXG5cdFx0XHRdKVxuXHRcdF0pO1xuXHRcdHJldHVybiBzZXROZXh0RGVzdGluYXRpb247XG5cblx0fVxuXHRlbHNle1xuXHRcdGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEVOR0lORVMsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRU5HSU5FUywgMCk7XG5cdFx0bGV0IGNob29zZVNUT1JBR0UgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gU1RPUkFHRSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBTVE9SQUdFLCAwKTtcblx0XHRsZXQgY2hvb3NlRE9DVE9SU19PRkZJQ0UgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRE9DVE9SU19PRkZJQ0UsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRE9DVE9SU19PRkZJQ0UsIDApO1xuXHRcdGxldCBjaG9vc2VDT0NLUElUID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IENPQ0tQSVQsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQ09DS1BJVCwgMCk7XG5cdFx0bGV0IGNob29zZUVTQ0FQRV9QT0QgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRVNDQVBFX1BPRCwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFU0NBUEVfUE9ELCAwKTtcblx0XHRsZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gVFJBTlNQT1JUX1JPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gVFJBTlNQT1JUX1JPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNT05JVE9SSU5HX1JPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gTU9OSVRPUklOR19ST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1PTklUT1JJTkdfUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZU1BSU5fQVJFQSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBNQUlOX0FSRUEsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gTUFJTl9BUkVBLCAwKTtcblx0XHRsZXQgY2hvb3NlRkVNX0JFRFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRkVNX0JFRFJPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRkVNX0JFRFJPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNQUxFX0JFRFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gTUFMRV9CRURST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZUJBVEhST09NID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEJBVEhST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEJBVEhST09NLCAwKTtcblxuXG5cdFx0bGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlbGVjdG9yKFtcblx0XHRcdGNob29zZUVOR0lORVMsXG5cdFx0XHRjaG9vc2VDT0NLUElULFxuXHRcdFx0Y2hvb3NlU1RPUkFHRSxcblx0XHRcdGNob29zZURPQ1RPUlNfT0ZGSUNFLFxuXHRcdFx0Y2hvb3NlQkFUSFJPT00sXG5cdFx0XHRjaG9vc2VNQUxFX0JFRFJPT00sXG5cdFx0XHRjaG9vc2VGRU1fQkVEUk9PTSxcblx0XHRcdGNob29zZU1BSU5fQVJFQSxcblx0XHRcdGNob29zZU1PTklUT1JJTkdfUk9PTSxcblx0XHRcdGNob29zZVRSQU5TUE9SVF9ST09NLFxuXHRcdFx0Y2hvb3NlRVNDQVBFX1BPRFxuXHRcdF0pO1xuXG5cdFx0cmV0dXJuIHNldE5leHREZXN0aW5hdGlvbjtcblx0fVxuXG59XG5cblxubGV0IHNldERlc3RpbmF0aW9uUHJlY29uZEZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50KXtcblx0bGV0IHNldERlc3RpbmF0aW9uUHJlY29uZDogUHJlY29uZGl0aW9uID0gKCkgPT4gaXNVbmRlZmluZWQoYWdlbnQuZGVzdGluYXRpb24pIHx8IGFnZW50LmRlc3RpbmF0aW9uID09IGFnZW50LmN1cnJlbnRMb2NhdGlvbjtcblx0cmV0dXJuIHNldERlc3RpbmF0aW9uUHJlY29uZDtcdFxufVxuXG4vLyAvLyBjcmVhdGUgYmVoYXZpb3IgdHJlZXNcblxuXG5sZXQgZ290b05leHRMb2NhdGlvbkZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50KXtcblx0cmV0dXJuICBhY3Rpb24oXG5cdFx0KCkgPT4gdHJ1ZSxcblx0XHQoKSA9PiB7XG5cdFx0XHRhZ2VudC5jdXJyZW50TG9jYXRpb24gPSBnZXROZXh0TG9jYXRpb24oYWdlbnQuY3VycmVudExvY2F0aW9uLCBhZ2VudC5kZXN0aW5hdGlvbik7XG5cdFx0XHRjb25zb2xlLmxvZyhhZ2VudCwgXCIgYXQ6IFwiLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdH0sXG5cdFx0MFxuXHQpO1xufVxuXG5cbmxldCBsYXN0U2VlbkJ5QWdlbnQgPSBmdW5jdGlvbihhZ2VudCl7XG5cdHJldHVybiBzZXF1ZW5jZShbXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0YWN0aW9uKFxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uID09IHdpcmVzMS5jdXJyZW50TG9jYXRpb24sXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudCwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuXHRcdFx0XHRcdC8vZWZmZWN0XG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gSXRlbTogd2lyZXMxIHwgTG9jYXRpb246IFwiKyBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coYWdlbnROYW1lICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMSB8IExvY2F0aW9uOiBcIisgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSk7XG5cdFx0XHRcdFx0XHQvLyBzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczFcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXG5cdFx0XHRcdFx0XHRhZ2VudC5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXG5cdFx0XHRcdFx0MFxuXHRcdFx0XHQpLFxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXG5cdFx0XSksXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0YWN0aW9uKFxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uID09IHdpcmVzMi5jdXJyZW50TG9jYXRpb24sXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMyLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcblx0XHRcdFx0XHQvL2VmZmVjdFxuXHRcdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50ICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMiB8IExvY2F0aW9uOiBcIisgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwic2VlcyAtIEl0ZW06IHdpcmVzMiB8IExvY2F0aW9uOiBcIitnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcblx0XHRcdFx0XHRcdGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHQvLyBzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczJcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvL3RpbWUgdGFrZW5cblx0XHRcdFx0XHQwXG5cdFx0XHRcdCksXG5cdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge30sMClcblx0XHRdKSxcblx0XHRzZWxlY3RvcihbXG5cdFx0XHRhY3Rpb24oXG5cdFx0XHRcdFx0Ly9wcmVjb25kaXRpb25cblx0XHRcdFx0XHQoKSA9PiBhZ2VudC5jdXJyZW50TG9jYXRpb24gID09IGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIiksXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpLFxuXHRcdFx0XHRcdC8vZWZmZWN0XG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gUGVyc29uOiBQbGF5ZXIgfCBMb2NhdGlvbjogXCIrIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhhZ2VudE5hbWUgKyBcInNlZXMgLSBQZXJzb246IFBsYXllciB8IExvY2F0aW9uOiBcIitnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcblx0XHRcdFx0XHRcdC8vIGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHRhZ2VudC5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbigncGxheWVyJywgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdC8vIHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImxhc3RTZWVuOnBsYXllclwiLCAgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vdGltZSB0YWtlblxuXHRcdFx0XHRcdDBcblx0XHRcdFx0KSxcblx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7fSwwKVxuXHRcdF0pXG5cdF0pO1xufTtcblxubGV0IHNlYXJjaEZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50LCBkZXN0aW5hdGlvbjogc3RyaW5nID0gXCJVTktOT1dOXCIpe1xuXHRpZihkZXN0aW5hdGlvbiA9PSBcIlVOS05PV05cIil7XG5cdFx0bGV0IHNlYXJjaCA9IHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcblx0XHRcdFx0Z3VhcmQoc2V0RGVzdGluYXRpb25QcmVjb25kRm9yQWdlbnQoYWdlbnQpLCBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudCkpLFxuXHRcdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge1xuXHRcdFx0XHR9LDApXG5cdFx0XHRdKSxcblx0XHRcdGdvdG9OZXh0TG9jYXRpb25Gb3JBZ2VudChhZ2VudCksXG5cdFx0XSk7XHRcblx0XHRyZXR1cm4gc2VhcmNoXG5cdH1cblx0ZWxzZXtcblx0XHRsZXQgc2VhcmNoID0gc2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuXHRcdFx0XHRndWFyZChzZXREZXN0aW5hdGlvblByZWNvbmRGb3JBZ2VudChhZ2VudCksIHNldE5leHREZXN0aW5hdGlvbkZvckFnZW50KGFnZW50LCBkZXN0aW5hdGlvbikpLFxuXHRcdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge1xuXHRcdFx0XHR9LDApXG5cdFx0XHRdKSxcblx0XHRcdGdvdG9OZXh0TG9jYXRpb25Gb3JBZ2VudChhZ2VudCksXG5cdFx0XSk7XHRcblx0XHRyZXR1cm4gc2VhcmNoXG5cdH1cbn1cblxubGV0IENhbGViQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlBZ2VudChDYWxlYiksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChDYWxlYiksIGxhc3RTZWVuQnlBZ2VudChDYWxlYilcblx0XSlcbl0pO1xuXG5sZXQgUXVpbm5CVCA9IHNlcXVlbmNlKFtcblx0bGFzdFNlZW5CeUFnZW50KFF1aW5uKSxcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaEZvckFnZW50KFF1aW5uKSwgbGFzdFNlZW5CeUFnZW50KFF1aW5uKVxuXHRdKVxuXSk7XG5cbmxldCBNYXJrQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlBZ2VudChNYXJrKSxcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaEZvckFnZW50KE1hcmspLCBsYXN0U2VlbkJ5QWdlbnQoTWFyaylcblx0XSlcbl0pO1xuXG5sZXQgRWRkaWVCVCA9IHNlcXVlbmNlKFtcblx0bGFzdFNlZW5CeUFnZW50KEVkZGllKSxcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaEZvckFnZW50KEVkZGllKSwgbGFzdFNlZW5CeUFnZW50KEVkZGllKVxuXHRdKVxuXSk7XG5cbmxldCBCZWF0cmljZUJUID0gc2VxdWVuY2UoW1xuXHRsYXN0U2VlbkJ5QWdlbnQoQmVhdHJpY2UpLFxuXHRzZXF1ZW5jZShbXG5cdFx0c2VhcmNoRm9yQWdlbnQoQmVhdHJpY2UpLCBsYXN0U2VlbkJ5QWdlbnQoQmVhdHJpY2UpXG5cdF0pXG5dKTtcblxuLy8gLy9hdHRhY2ggYmVoYXZpb3VyIHRyZWVzIHRvIGFnZW50c1xuYXR0YWNoVHJlZVRvQWdlbnQoQ2FsZWIsIENhbGViQlQpO1xuYXR0YWNoVHJlZVRvQWdlbnQoUXVpbm4sIFF1aW5uQlQpO1xuYXR0YWNoVHJlZVRvQWdlbnQoTWFyaywgTWFya0JUKTtcbmF0dGFjaFRyZWVUb0FnZW50KEVkZGllLCBFZGRpZUJUKTtcbmF0dGFjaFRyZWVUb0FnZW50KEJlYXRyaWNlLCBCZWF0cmljZUJUKTtcblxuLy8gLy8gMy4gQ29uc3RydWN0IHN0b3J5XG4vLyAvLyBjcmVhdGUgdXNlciBhY3Rpb25zXG5cblxuc2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJFbmdpbmVTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJTdG9yYWdlU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiRHJPZmZpY2VTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJDb2NrcGl0U3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiTW9uaXRvcmluZ1N0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIlRyYW5zcG9ydFN0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIkVzY2FwZVN0YXJ0XCIsMCk7XG5cblxudmFyIE1haW5CVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBNQUlOX0FSRUEsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgLy8gZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBzaGlwJ3MgbWFpbiBhcmVhLlwiKSxcbiAgICAgICAgICAgIHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkl0IHdhcyBhIHNpbXBsZSBtaXNzaW9uOiBsYW5kIG9uIHRoZSBuZXdseS1kaXNjb3ZlcmVkIHBsYW5ldCBTaWd1cm9uLCB0ZWxlcG9ydCBjcmV3IG1lbWJlcnMgZG93biB0byBpdHMgc3VyZmFjZSwgYW5kIHNlY3VyZSBhbmQgZG9jdW1lbnQgbmV3IGluZm9ybWF0aW9uLiBFdmVyeXRoaW5nIHdlbnQgYXdyeSBkdXJpbmcgcGhhc2UgdHdvLiBBcyBtb3N0IG9mIHRoZSBjcmV3IGdhdGhlcmVkIGludG8gdGhlIHRyYW5zcG9ydCBiYXksIHRoZSBjb21tYW5kZXIgYW5kIGEgZmV3IG90aGVycyBzdGF5ZWQgYmVoaW5kIHRvIG1vbml0b3IgdGhlIGV4cGxvcmF0aW9uLiBUaGUgdGVsZXBvcnRhdGlvbiBwcm9jZXNzIGJlZ2FuLCB5ZXQgaW1tZWRpYXRlbHkgYSBtYXNzaXZlIHN5c3RlbXMgZmFpbHVyZSBvY2N1cnJlZC4gVGhvc2Ugd2hvIGhhZCBiZWVuIGF3YWl0aW5nIHRlbGVwb3J0YXRpb24gd2VyZSBnb25lLCBhc3N1bWVkIHRvIGhhdmUgYmVlbiBsb3N0IGluIHNwYWNlLiBUaGUgY29tbWFuZGVyIGNvbWVzIHRvIGFzIHRoZSBzaGlwIGlzIHBsdW1tZXRpbmcgZnJvbSBvcmJpdCwgdGhlaXIgY3Jld21hdGVzIHllbGxpbmcgYXQgZWFjaCBvdGhlci4gVGhlcmUgaXMgb25seSBvbmUgZXNjYXBlIHBvZCByZW1haW5pbmcuIEFzIGNvbW1hbmRlciwgeW91IGFyZSBlcXVpcHBlZCB3aXRoIGEgc3BlY2lhbCBpbnRlcmFjdGl2ZSBtYXAgYWxsb3dpbmcgeW91IHRvIHNlZSB0aGUgcG9zaXRpb25zIG9mIHlvdXIgY3Jld21hdGVzIGF0IGFsbCB0aW1lcy4gWW91IG11c3QgdXRpbGl6ZSB0aGUgbWFwIGluIG9yZGVyIHRvIHRha2UgY29udHJvbCBvZiB0aGUgc2hpcCBhbmQgcmVtYWluaW5nIGNyZXcgdG8gc2F2ZSBldmVyeW9uZSBmcm9tIGNlcnRhaW4gZGVhdGguXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX21haW4pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHNoaXAncyBtYWluIGFyZWEuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkdvIG5vcnRoIHRvIGVudGVyIHRoZSBlbmdpbmUgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEVOR0lORVMpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBub3J0aGVhc3QgdG8gZW50ZXIgdGhlIHN0b3JhZ2Ugcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFNUT1JBR0UpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBlYXN0IHRvIGVudGVyIHRoZSBjb2NrcGl0LlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQ09DS1BJVCkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHNvdXRoZWFzdCB0byBlbnRlciB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRE9DVE9SU19PRkZJQ0UpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBzb3V0aCBpbnRvIHRoZSBtb25pdG9yaW5nIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNT05JVE9SSU5HX1JPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBzb3V0aCBpbnRvIHRoZSB0cmFuc3BvcnQgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRSQU5TUE9SVF9ST09NKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGh3ZXN0IHRvIGVudGVyIHRoZSBlc2NhcGUgcG9kLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRVNDQVBFX1BPRCkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHdlc3QgdG8gZW50ZXIgdGhlIGJhdGhyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkFUSFJPT00pKSxcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuICAgICAgICAgICAgICAgXHRcdFx0c2VsZWN0b3IoW1xuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSXQgaGFzIGJlZW4gaG91cnMgc2luY2UgdGhlIGNyZXcgbGFzdCBhdGUuIFRoZSByZXNpZGVudCBzaGlwIG1vbSBjb3VsZCBoZWxwIHByZXBhcmUgc29tZSBmb29kLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIiwgMSk7XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIpID09IDEsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkZpbmQgc29tZW9uZSB0byBwcmVwYXJlIGZvb2QgZm9yIHRoZSBjcmV3LlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgY3JldyB3YXMgYWJsZSB0byBlYXQsIGJ1dCB0aGUga2l0Y2hlbiB3YXMgbGVmdCBhIG1lc3MuIFNvbWVvbmUgbmVlZHMgdG8gY2xlYW4gaXQuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIpID09IDMsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBjbGVhbiB0aGUga2l0Y2hlbi5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgIF0pLCAgICBcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShNYWluQlQpO1xuXG52YXIgRW5naW5lQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRU5HSU5FUyxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGVuZ2luZSByb29tIGlzIHdoZXJlIEJlYXRyaWNlIHNwZW5kcyBtb3N0IG9mIGhlciB0aW1lLiBTaGXigJlzIGEgbmF0dXJhbCB3aGVuIGl0IGNvbWVzIHRvIHByb2JsZW0gc29sdmluZywgYnV0IGhlciB1bmFwcHJvYWNoYWJsZSBhbmQgdW5mcmllbmRseSBwZXJzb25hbGl0eSB0dXJuZWQgbWFueSBpbmZsdWVudGlhbCBjb21tYW5kZXJzIGF3YXkgZnJvbSBoZXIuIERlc3BpdGUgaGVyIHBlcnNvbmFsaXR5LCBoZXIgZW5naW5lZXJpbmcgc2tpbGxzIGFyZSBzZWNvbmQtdG8tbm9uZS4uLmdyYW50ZWQgc2hlIGlzIHRoZSBvbmx5IGVuZ2luZWVyIGxlZnQuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkVuZ2luZVN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX2VuZ2luZXMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVuZ2luZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBlbmdpbmUgcm9vbS5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiSGVhZCBlYXN0IGludG8gdGhlIHN0b3JhZ2Ugcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFNUT1JBR0UpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuICAgICAgICAgICAgICAgICAgICBdKSksXG4gICAgICAgICAgICAgICBcdFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSW4gb3JkZXIgdG8gZml4IHRoZSBlbmdpbmVzLCByZXBsYWNlbWVudCB3aXJlcyBtdXN0IGJlIGZvdW5kLiBBbiBlbmdpbmVlciBvciBqYW5pdG9yIHNob3VsZCBrbm93IHdoZXJlIHRoZXkgYXJlLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIsIDEpO1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gMSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCByZXBsYWNlbWVudCB3aXJlcy5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDIsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSB3aXJlcyB3ZXJlIGZvdW5kLCBidXQgdGhlIHRvb2wgYm94IHNlZW1zIHRvIGJlIG1pc3NpbmcuIENhbGViIG1pZ2h0IGhhdmUgdGFrZW4gaXQuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gMyxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiQmVmb3JlIHRoZSBlbmdpbmVzIGNhbiBiZSBmaXhlZCwgeW91IG5lZWQgdG8gZmluZCBhIHRvb2wgYm94LlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDQsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIldpdGggYm94IGFjcXVpcmVkLCB0aGUgd2lyZXMgY2FuIG5vdyBiZSByZXBsYWNlZC4gQW4gZW5naW5lZXIgc2hvdWxkIGtub3cgaG93IHRvIGRvIGl0LlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDUsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGhhdmUgdGhlIHdpcmVzIHJlcGxhY2VkIGluIHRoZSBlbmdpbmUgcm9vbS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSA2LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgZW5naW5lJ3Mgbm93IGZpeGVkLCBidXQgaXQgc3RpbGwgbmVlZHMgdG8gYmUgcmVzdGFydGVkLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDcsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byByZXN0YXJ0IHRoZSB0ZWxlcG9ydGVyLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgXSksICAgIFxuICAgICAgICAgICAgICAgXHQvL09wdGlvbmFsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoRW5naW5lQlQpO1xuXG52YXIgU3RvcmFnZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFNUT1JBR0UsXG5cdHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlN0b3JhZ2VTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgc3RvcmFnZSByb29tIGlzIHdoZXJlIEVkZGllIHNwZW5kcyBoaXMgdGltZSBhbmQgc3RvcmVzIGhpcyBqYW5pdG9yIGVxdWlwbWVudC4gT2xkIGFzIGhlIGlzLCBoZSBzdGlsbCBkb2VzIGhpcyBiZXN0IHRvIGNvbnRyaWJ1dGUgdG8gdGhlIHRlYW0gaW4gd2hhdGV2ZXIgd2F5IGhlIGNhbiwgZGVzcGl0ZSBsYWNraW5nIHRlY2huaWNhbCBza2lsbHMgdGhlIG90aGVyIGNyZXdtYXRlcyBlbXBsb3kuIEFsdGhvdWdoIGhlIGlzIGEgd2VsbC1rbm93biBoZXJvIGFtb25nIG1pbGl0YXJ5IHBlcnNvbm5lbCwgaGlzIGNyZXdtYXRlcyBjb250aW51ZSB0byByZW1haW4gb2JsaXZpb3VzIHRvIHRoZSBmYWN0IHRoYXQgdGhlIG1hbiB3aG8gc2NydWJzIHRoZWlyIHRvaWxldHMgaGFkIGJlZW4gb25lIG9mIHRoZSBtb3N0IGFjY29tcGxpc2hlZCBtaWxpdGFyeSBvZmZpY2VycyB0aGUgdW5pdmVyc2UgaGFkIGV2ZXIgc2Vlbi5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4geyAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIlN0b3JhZ2VTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9zdG9yYWdlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTdG9yYWdlU3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZWQgaW50byB0aGUgc3RvcmFnZSByb29tLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHdlc3QgaW50byB0aGUgZW5naW5lIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFTkdJTkVTKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuICAgICAgICAgICAgICAgXHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHN0b3JhZ2Ugcm9vbSBpcyBhIG1lc3MuIEEgamFuaXRvciB3b3VsZCBiZSBhYmxlIHRvIG1ha2Ugc2Vuc2Ugb2YgaXQgYWxsLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIsIDEpO1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIikgPT0gMSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiRmluZCBzb21lb25lIHRvIHJlb3JnYW5pemUgdGhlIHN0b3JhZ2Ugcm9vbS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpID09IDIsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIk5vdyB0aGF0IHRoZSBzdG9yYWdlIHJvb20gaXMgY2xlYW4sIHRoZSByZXBsYWNlbWVudCB3aXJlcyBjYW4gYnkgZm91bmQuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSA9PSAzLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gcmV0cmlldmUgdGhlIHdpcmVzLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgXSksICAgIFxuXG4gICAgICAgICAgICAgICBcdC8vT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShTdG9yYWdlQlQpO1xuXG52YXIgRHJPZmZpY2VCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBET0NUT1JTX09GRklDRSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRHJPZmZpY2VTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJEci4gUXVpbm4gc3BlbmRzIGEgbG90IG9mIHRpbWUgaW4gaGVyIG9mZmljZSBsb29raW5nIGFmdGVyIHBhdGllbnRzLiBTaGUgcHV0cyBhbGwgb3RoZXJzIGFib3ZlIGhlcnNlbGY7IHNoZSBpcyBjb25zdGFudGx5IGNvbmNlcm5lZCB3aXRoIHRoZSB3ZWxsLWJlaW5nIG9mIGhlciBjcmV3bWF0ZXMuIFRoZSBwcm9zcGVjdCBvZiBoZXIgcGF0aWVudHMgZHlpbmcgc3RpbGwga2VlcHMgaGVyIHVwIGF0IG5pZ2h0LCBidXQgaGVyIGRldGVybWluYXRpb24gdG8gc2F2ZSBhcyBtYW55IHBlb3BsZSBhcyBzaGUgY2FuIGlzIHdoYXQga2VlcHMgaGVyIGdvaW5nLiBIZXIgbWF0ZXJuYWwgaW5zdGluY3RzIGZvbGxvdyBoZXIgZnJvbSBoZXIgaG91c2UgdG8gdGhlIHNoaXAuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fZHIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEck9mZmljZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgbm9ydGhlYXN0IGludG8gdGhlIGNvY2twaXQuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT0NLUElUKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gd2VzdCBpbnRvIHRoZSBtb25pdG9yaW5nIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNT05JVE9SSU5HX1JPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuICAgICAgICAgICAgICAgICAgICBdKSksXG4gICAgICAgICAgICAgICBcdFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAwLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21lIGNyZXdtYXRlcyBtYXkgaGF2ZSBzdXN0YWluZWQgaW5qdXJpZXMuIEZpbmQgdGhlIGRvY3Rvci5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9Pntcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIsIDEpO1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAxLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gY2hlY2sgdGhlIGNyZXcncyBoZWFsdGguXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIpID09IDIsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWUgbWlub3IgaW5qdXJpZXMgd2VyZSBzdXN0YWluZWQuIEZpbmQgdGhlIGRvY3RvciB0byBoZWFsIHRoZSBjcmV3J3MgaW5qdXJpZXMuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIpID09IDMsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkZpbmQgc29tZW9uZSB0byBoZWFsIHRoZSBjcmV3J3MgaW5qdXJpZXMuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgIF0pLCAgICAgICAgXG5cbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShEck9mZmljZUJUKTtcblxudmFyIENvY2twaXRCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBDT0NLUElULFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRzZWxlY3RvcihbXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDb2NrcGl0U3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGNvY2twaXQgaXMgd2hlcmUgVGF5bG9yIHBpbG90cyB0aGUgc2hpcCwgYnV0IENhbGViIHNwZW5kcyBhIGxvdCBvZiBoaXMgdGltZSB0aGVyZSBhcyB3ZWxsLiBDYWxlYiBydW5zIHRoaW5ncyB2ZXJ5IGRpZmZlcmVudGx5IGZyb20gVGF5bG9yOyBoZSBpcyBhIGRlbWFuZGluZyBsZWFkZXIgd2hvIGhhcnNobHkgY3JpdGljaXplcyBoaXMgY3Jld21hdGVzIHdoZW4gZmFpbHVyZXMgb2NjdXIuIEhlIHNlY3JldGx5IGxvYXRoZXMgVGF5bG9yOyB0aGVpciBwZXJzb25hbGl0aWVzIGNsYXNoIGFsbC10b28tZnJlcXVlbnRseSwgYW5kIHRoZWlyIHBvc2l0aW9uIG9uIHRoZSBzaGlwIGRlc3BpdGUgaGlzIG9sZGVyIGFnZSBpcyBhIGNvbnN0YW50IHNvdXJjZSBvZiBhbmdlciB0byB0aGUgb2ZmaWNlci5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiQ29ja3BpdFN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX2NvY2twaXQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIikgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNvY2twaXRTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGZvcndhcmQgaW50byB0aGUgY29ja3BpdC5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBzb3V0aHdlc3QgaW50byB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRE9DVE9SU19PRkZJQ0UpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuXHRcdF0pKSxcblx0XHRcdFx0XHRcdHNlbGVjdG9yKFtcblx0XHRcdCAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSA9PSAwLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJOb3cgdGhhdCB0aGUgc2hpcCBpcyBiYWNrIG9ubGluZSwgeW91IHdpbGwgbmVlZCB0byBjb250YWN0IGEgc3VwcG9ydCBzaGlwLiBBbiBvZmZpY2VyIHdvdWxkIGJlIHBlcmZlY3QgZm9yIHRoZSBqb2IuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIiwgMSk7XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSA9PSAxLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gY29udGFjdCBhIHN1cHBvcnQgc2hpcC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpID09IDIsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkEgc3VwcG9ydCBzaGlwIGhhcyBub3cgYmVlbiBjb250YWN0ZWQsIGJ1dCB0aGUgc2hpcCBtdXN0IGdldCByZWFkeSB0byBiZSBtb3ZlZC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpID09IDMsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBwcmVwYXJlIHRoZSBzaGlwIHRvIG1vdmUuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIF0pLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKENvY2twaXRCVCk7XG5cbnZhciBNb25pdG9yaW5nQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTU9OSVRPUklOR19ST09NLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRzZWxlY3RvcihbXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNb25pdG9yaW5nU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIG1vbml0b3Jpbmcgcm9vbSBpcyBwdXJwb3NlZCB0byBzZWUgaW50byB0aGUgdHJhbnNwb3J0IHJvb20sIHRodXMgd2F0Y2hpbmcgZm9yIHNpZ25zIG9mIHRyb3VibGUgd2l0aCB0aGUgdHJhbnNwb3J0ZXIuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIk1vbml0b3JpbmdTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9tb25pdG9yaW5nKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTW9uaXRvcmluZ1N0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBtb25pdG9yaW5nIHJvb20uXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgZWFzdCBpbnRvIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBET0NUT1JTX09GRklDRSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHdlc3QgaW50byB0aGUgdHJhbnNwb3J0IHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUUkFOU1BPUlRfUk9PTSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXG5cdFx0XHRdKSksXG4gICAgICAgICAgICAgICBcdFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAwLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgbW9uaXRvcmluZyByb29tIG5lZWRzIHRvIGJlIGluc3BlY3RlZCB0byBub3RlIGFueSBtYWxmdW5jdGlvbnMuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiLCAxKTtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIikgPT0gMSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGluc3BlY3QgdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIikgPT0gMixcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiTm90aGluZyBpcyB3cm9uZyBpbiB0aGUgbW9uaXRvcmluZyByb29tLCBidXQgc29tZSBicm9rZW4gc2hhcmRzIGZsZXcgaW4gZnJvbSB0aGUgYWRqYWNlbnQgcm9vbS4gQSBqYW5pdG9yIHdvdWxkIGhhdmUgaXQgY2xlYW5lZCB1cCBpbiBubyB0aW1lLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAzLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gY2xlYW4gdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgIF0pLFxuXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoTW9uaXRvcmluZ0JUKTtcblxudmFyIFRyYW5zcG9ydEJUID0gZ3VhcmQoXG5cdCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBUUkFOU1BPUlRfUk9PTSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVHJhbnNwb3J0U3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiV2hlcmUgdGhlIHRyYW5zcG9ydGVyIGlzIGxvY2F0ZWQgYW5kIHdoZXJlIHRoZSBmYWlsdXJlIG9jY3VycmVkLiBNYXJrIHRoZSB0cmFuc3BvcnQgb2ZmaWNlciBvZnRlbiB3b3JrcyBpbiBoZXJlLiBNYXJrIGlzIGFuIG9sZGVyIGNyZXdtYXRlIHdobyBhdm9pZHMgdGhlIHNwb3RsaWdodCBsaWtlIHRoZSBwbGFndWUuIEhpcyBhbnhpZXR5IGxldmVscyBzaG90IHVwIHJhcGlkbHkgYWZ0ZXIgdGhlIGZhaWx1cmUsIGFuZCBoZSBpcyBleGNlc3NpdmVseSB3b3JyaWVkIHRoYXQgdGhlIHJlc3Qgb2YgdGhlIGNyZXcgYmxhbWVzIHRoZSBmYWlsdXJlIG9uIGhpbS5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiVHJhbnNwb3J0U3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fdHJhbnNwb3J0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSB0cmFuc3BvcnQgcm9vbSB3aGVyZSB0aGUgdGVsZXBvcnRlciBpcyBsb2NhdGVkLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIGVhc3QgaW50byB0aGUgbW9uaXRvcmluZyByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTU9OSVRPUklOR19ST09NKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiRXhpdCB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXG5cblx0XHRcdFx0XHRcdC8vIEdvYWwgb3B0aW9ucyBmb3IgdGhlIHJvb20gLT4gT25seSBzaG93aW5nIHRoZXNlIHdoZW4gdGhlIG1haW4gaGVscCB0ZXh0IGlzIG9mZi4gXG5cdFx0XHRcdFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDAsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZXJlIHNlZW1zIHRvIGJlIGEgcHJvYmxlbSB3aXRoIHRoZSB0ZWxlcG9ydGVyIHNvZnR3YXJlLiBNYXliZSBhIHRyYW5zcG9ydCBvZmZpY2VyIGNvdWxkIGNoZWNrIGl0IG91dC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9Pntcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIFx0Ly8gSGludCBnaXZlbjogQXNrIE1hcmtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIiwgMSk7XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGxvb2sgYXQgdGhlIHRlbGVwb3J0ZXIgc29md2FyZS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgc29mdHdhcmUgd2FzIGxvb2tlZCBvdmVyLCBidXQgYmVmb3JlIGl0IGNhbiBiZSByZXN0YXJ0ZWQsIHRoZSByb29tIG11c3QgYmUgY2xlYW5lZC4gU291bmRzIGxpa2UgYSBqYW5pdG9yJ3Mgam9iLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDMsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGNsZWFuIHRoZSByb29tIGJlZm9yZSBhbnkgb3RoZXIgcHJvZ3Jlc3MgaXMgbWFkZS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA0LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgcm9vbSBpcyBjbGVhbmVkLCBzbyBub3cgdGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUgY2FuIGJlIHJlc3RhcnRlZC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA1LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gcmVzdGFydCB0aGUgdGVsZXBvcnRlciBzb2Z0d2FyZS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA2LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgdGVsZXBvcnRlciBzb2Z0d2FyZSB3YXMgcmVzdGFydGVkLCBidXQgbm93IGl0IG5lZWRzIHRvIGJlIHJlY29uZmlndXJlZCB0byBtYXRjaCB0aGUgc2V0dGluZ3Mgb2YgdGhlIHNoaXAuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gNyxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIHJlY29uZmlndXJlIHRoZSBzb2Z0d2FyZS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA4LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgdGVsZXBvcnRlciBzb2Z0d2FyZSBpcyBub3cgZ29vZCB0byBnbywgc28gYWxsIHRoYXQgaXMgbGVmdCBpcyB0byByZXN0YXJ0IHRoZSB0ZWxlcG9ydGVyIGl0c2VsZi5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA5LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gcmVzdGFydCB0aGUgdGVsZXBvcnRlci5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdFx0XHRcdF0pXG5cdFx0XHRcdFx0XSksXG5cdFx0XHRcdClcblxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBcblx0XHRdKVxuXHQpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShUcmFuc3BvcnRCVCk7XG5cbnZhciBFc2NhcGVQb2RCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBFU0NBUEVfUE9ELFxuXHRzZXF1ZW5jZShbXG5cdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlcmUgaXMgb25seSBvbmUgZXNjYXBlIHBvZCBhYm9hcmQgdGhpcyBzaGlwLiBJZiBhbnkgY3Jld21hdGUgYmVjb21lcyB0b28gZmVhcmZ1bCBvZiB0aGVpciBjdXJyZW50IHNpdHVhdGlvbiwgdGhleSB3aWxsIGF0dGVtcHQgdG8gbGVhdmUgaW4gaXQuXCIpLFxuICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX2VzY2FwZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcdF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRXNjYXBlU3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgXHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGVzY2FwZSBwb2QuXCIpLFxuXHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuXHRcdFx0XHRdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGVzY2FwZSBwb2QgbmVlZHMgdG8gYmUgaW5zcGVjdGVkIGZvciBzaWducyBvZiBtYWxmdW5jdGlvbnMuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIiwgMSk7XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFU0NBUEVfUE9EOkJyb2tlblwiKSA9PSAxLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gaW5zcGVjdCB0aGUgZXNjYXBlIHBvZC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgXSksXG4gICAgICAgIF0pLFxuXHRdKVxuKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoRXNjYXBlUG9kQlQpO1xuXG52YXIgRkJlZHJvb21CVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBGRU1fQkVEUk9PTSxcblx0c2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBpbnRvIHRoZSBmZW1hbGVzJyBiZWRyb29tLlwiKSxcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBiYXRocm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJBVEhST09NKSksXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAgICAgLy8gZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0KTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoRkJlZHJvb21CVCk7XG5cbnZhciBCYXRocm9vbUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEJBVEhST09NLFxuXHRzZXF1ZW5jZShbXG4gICAgICAgICAgICAgXHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIGJhdGhyb29tLlwiKSxcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBzb3V0aCBpbnRvIHRoZSBtYWxlcycgYmVkcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BTEVfQkVEUk9PTSkpLFxuXHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIG5vcnRoIGludG8gdGhlIGZlbWFsZXMnIGJlZHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBGRU1fQkVEUk9PTSkpLFxuXHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAgICAgLy8gZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0KTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoQmF0aHJvb21CVCk7XG5cbnZhciBNQmVkcm9vbUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1BTEVfQkVEUk9PTSxcblx0c2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIG1hbGVzJyBiZWRyb29tLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gYmF0aHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQVRIUk9PTSkpLFxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdCk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKE1CZWRyb29tQlQpO1xuXG52YXIgd2lyZXMxQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gd2lyZXMxLmN1cnJlbnRMb2NhdGlvbiwgLy8gIGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpXG5cdHNlcXVlbmNlKFtcblx0XHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBub3RpY2Ugd2lyZXMgb24gdGhlIGdyb3VuZC5cIiksXG5cdFx0XHRhZGRVc2VyQWN0aW9uVHJlZShcIlBpY2sgdXAgdGhlIHdpcmVzLlwiLFxuXHRcdFx0XHRzZXF1ZW5jZShbXG5cdFx0XHRcdFx0YWN0aW9uKCgpPT50cnVlLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIllvdSBwaWNrIHVwIHRoZSB3aXJlcy5cIik7XG5cdFx0XHRcdFx0XHRzZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInBsYXllclwiKTtcblx0XHRcdFx0XHRcdHNldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkLCBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkgKyAxKTtcblx0XHRcdFx0XHR9LCAwKSxcblx0XHRcdFx0XHQvLyBhY3Rpb24oKCk9PnRydWUsICgpID0+IHtcblx0XHRcdFx0XHQvLyAgICAgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJXb3cgeW91IGtub3cgaG93IHRvIHBpY2sgdXAgdGhpbmdzLlwiKX0sIDApXG5cdFx0XHRcdF0pXG5cdFx0XHQpXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUod2lyZXMxQlQpO1xuXG52YXIgd2lyZXMyQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gd2lyZXMyLmN1cnJlbnRMb2NhdGlvbiwgLy8gZ2V0SXRlbVZhcmlhYmxlKHdpcmVzMiwgXCJjdXJyZW50TG9jYXRpb25cIiksXG5cdHNlcXVlbmNlKFtcblx0XHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBub3RpY2Ugd2lyZXMgb24gdGhlIGdyb3VuZC5cIiksXG5cdFx0XHRhZGRVc2VyQWN0aW9uKFwiUGljayB1cCB0aGUgd2lyZXMuXCIsICgpID0+IHtcblx0XHRcdFx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgd2lyZXMuXCIpO1xuXHRcdFx0XHRzZXRJdGVtVmFyaWFibGUod2lyZXMyLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInBsYXllclwiKTtcblx0XHRcdFx0c2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQsIGdldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkKSArIDEpO1xuXHRcdFx0fSlcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZSh3aXJlczJCVCk7XG5cbmxldCBhZGRHb2FsVG9BZ2VudCA9IGZ1bmN0aW9uKGdvYWwsIGFnZW50LCBkZXN0aW5hdGlvbikge1xuXHRsZXQgbmV3QWdlbnRUcmVlID0gc2VxdWVuY2UoW1xuXHRcdGxhc3RTZWVuQnlBZ2VudChhZ2VudCksXG5cdFx0c2VxdWVuY2UoW1xuXHRcdFx0c2VhcmNoRm9yQWdlbnQoYWdlbnQsIGRlc3RpbmF0aW9uKSwgbGFzdFNlZW5CeUFnZW50KGFnZW50KVxuXHRcdF0pXG5cdF0pO1xuXHRhdHRhY2hUcmVlVG9BZ2VudChhZ2VudCwgbmV3QWdlbnRUcmVlKTtcbn1cblxuXG5sZXQgcGxheWVyU2Vlc0FnZW50ID0gZnVuY3Rpb24oYWdlbnQpIHtcblx0dmFyIHBsYXllclNlZXNBZ2VudCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBhZ2VudC5jdXJyZW50TG9jYXRpb24sXG5cdCAgICBzZXF1ZW5jZShbXG5cdCAgICBcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBzZWUgXCIrYWdlbnQubmFtZSksXG5cdCAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDEsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiVGVsbCBcIiArIGFnZW50Lm5hbWUgKyBcIiB0byBnbyBmaXggdGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUuXCIsICgpID0+IGFkZEdvYWxUb0FnZW50KFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIsIGFnZW50LCBUUkFOU1BPUlRfUk9PTSkpLFxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApLFxuXG4gICAgICAgICAgICAvLyBBZGQgdGhpcyAoMSlcbiAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FX1JPT006QnJva2VuXCIpID09IDEsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiVGVsbCBcIiArIGFnZW50Lm5hbWUgKyBcIiB0byBnbyBmaXggdGhlIHRoYXQgb3RoZXIgcHJvYmxlbSBzb2Z0d2FyZS5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJFTkdJTkVfUk9PTTpCcm9rZW5cIiwgYWdlbnQsIEVOR0lORVMpKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcblx0XHRdKVxuXHQpO1xuXHRhZGRVc2VySW50ZXJhY3Rpb25UcmVlKHBsYXllclNlZXNBZ2VudCk7XG59XG5cbnBsYXllclNlZXNBZ2VudChDYWxlYilcbnBsYXllclNlZXNBZ2VudChRdWlubilcbnBsYXllclNlZXNBZ2VudChNYXJrKVxucGxheWVyU2Vlc0FnZW50KEJlYXRyaWNlKVxuXG5cbi8vIC8vNC4gUnVuIHRoZSB3b3JsZFxuaW5pdGlhbGl6ZSgpO1xudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCgpO1xuXG4vLyAvL1JFTkRFUklORy0tLS0tXG52YXIgZGlzcGxheVBhbmVsID0ge3g6IDI1MCwgeTogMH07XG52YXIgdGV4dFBhbmVsID0ge3g6IDI3MCwgeTogNTAxfTtcbnZhciBhY3Rpb25zUGFuZWwgPSB7eDogNTIwLCB5OiA1NTB9O1xuXG52YXIgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheScpO1xudmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxudmFyIHNwYWNlc2hpcEltYWdlID0gbmV3IEltYWdlKCk7XG5zcGFjZXNoaXBJbWFnZS5vbmxvYWQgPSByZW5kZXI7XG52YXIgcGxheWVySW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBjYWxlYkltYWdlID0gbmV3IEltYWdlKCk7XG52YXIgcXVpbm5JbWFnZSA9IG5ldyBJbWFnZSgpO1xudmFyIG1hcmtJbWFnZSA9IG5ldyBJbWFnZSgpO1xudmFyIGVkZGllSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBiZWF0cmljZUltYWdlID0gbmV3IEltYWdlKCk7XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcblx0Y29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0Y29udGV4dC5kcmF3SW1hZ2Uoc3BhY2VzaGlwSW1hZ2UsIGRpc3BsYXlQYW5lbC54LCBkaXNwbGF5UGFuZWwueSwgMTAwMCwgNTAwKTtcblx0ZGlzcGxheVBsYXllcigpO1xuXHRkaXNwbGF5Q2FsZWIoKTtcblx0ZGlzcGxheVF1aW5uKCk7XG5cdGRpc3BsYXlNYXJrKCk7XG5cdGRpc3BsYXlFZGRpZSgpO1xuXHRkaXNwbGF5QmVhdHJpY2UoKTtcblx0ZGlzcGxheVRleHRBbmRBY3Rpb25zKCk7XG59XG5cbnZhciBtYXBQb3NpdGlvbnMgPSB7XG5cdFwiRU5HSU5FU1wiOiB7eDogMjg1LCB5OiAxMDh9LFxuXHRcIkNPQ0tQSVRcIjoge3g6IDg2MCwgeTogMjMwfSxcblx0XCJTVE9SQUdFXCI6IHt4OiA1NTAsIHk6IDEwNn0sXG5cdFwiRE9DVE9SUyBPRkZJQ0VcIjoge3g6IDcyNSwgeTogMzUwfSxcblx0XCJNQUlOIEFSRUFcIjoge3g6IDQ4MCwgeTogMjQwfSxcblx0XCJFU0NBUEUgUE9EXCI6IHt4OiAyMjQsIHk6IDQwOH0sXG5cdFwiVFJBTlNQT1JUIFJPT01cIjoge3g6IDM3MCwgeTogMzU4fSxcblx0XCJNT05JVE9SSU5HIFJPT01cIjoge3g6IDUzNSwgeTogMzYwfSxcblx0XCJCQVRIUk9PTVwiOiB7eDogODUsIHk6IDI0MH0sXG5cdFwiTUFMRSBCRURST09NXCI6IHt4OiA4NSwgeTogMzMwfSxcblx0XCJGRU0gQkVEUk9PTVwiOiB7eDogODUsIHk6IDE1MH1cbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlQbGF5ZXIoKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbik7XG5cdGlmICghaXNVbmRlZmluZWQobWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0pKVxuXHRcdGNvbnRleHQuZHJhd0ltYWdlKHBsYXllckltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUNhbGViKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gQ2FsZWIuY3VycmVudExvY2F0aW9uO1xuXHRjb250ZXh0LmRyYXdJbWFnZShjYWxlYkltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVF1aW5uKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gUXVpbm4uY3VycmVudExvY2F0aW9uO1xuXHRjb250ZXh0LmRyYXdJbWFnZShxdWlubkltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheU1hcmsoKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBNYXJrLmN1cnJlbnRMb2NhdGlvbjtcblx0Y29udGV4dC5kcmF3SW1hZ2UobWFya0ltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUVkZGllKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gRWRkaWUuY3VycmVudExvY2F0aW9uO1xuXHRjb250ZXh0LmRyYXdJbWFnZShlZGRpZUltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUJlYXRyaWNlKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gQmVhdHJpY2UuY3VycmVudExvY2F0aW9uO1xuXHRjb250ZXh0LmRyYXdJbWFnZShiZWF0cmljZUltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuc3BhY2VzaGlwSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvc2hpcC5wbmdcIjtcbnBsYXllckltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL1RheWxvcjMucG5nXCI7XG5jYWxlYkltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL0NhbGViLnBuZ1wiO1xucXVpbm5JbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9RdWlubi5wbmdcIjtcbm1hcmtJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9NYXJrLnBuZ1wiO1xuZWRkaWVJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9FZGRpZS5wbmdcIjtcbmJlYXRyaWNlSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvQmVhdHJpY2UucG5nXCI7XG5cbnZhciBjdXJyZW50U2VsZWN0aW9uO1xudmFyIHlPZmZzZXQgPSBhY3Rpb25zUGFuZWwueSArIDI1O1xudmFyIHlPZmZzZXRJbmNyZW1lbnQgPSAyNTtcblxuXG5cbmZ1bmN0aW9uIHdyYXBUZXh0KHRleHQpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiV3JhcCBUZXh0XCIpO1xuICAgIHZhciB3YT10ZXh0LnNwbGl0KFwiIFwiKSxcbiAgICAgICAgcGhyYXNlQXJyYXk9W10sXG4gICAgICAgIGxhc3RQaHJhc2U9d2FbMF0sXG4gICAgICAgIG1lYXN1cmU9MCxcbiAgICAgICAgc3BsaXRDaGFyPVwiIFwiO1xuICAgIGlmICh3YS5sZW5ndGggPD0gMSkge1xuICAgICAgICByZXR1cm4gd2FcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpPTE7aTx3YS5sZW5ndGg7aSsrKSB7XG4gICAgICAgIHZhciB3PXdhW2ldO1xuICAgICAgICBtZWFzdXJlPWNvbnRleHQubWVhc3VyZVRleHQobGFzdFBocmFzZStzcGxpdENoYXIrdykud2lkdGg7XG4gICAgICAgIGlmIChtZWFzdXJlPDEwMDApIHtcbiAgICAgICAgICAgIGxhc3RQaHJhc2UrPShzcGxpdENoYXIrdyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwaHJhc2VBcnJheS5wdXNoKGxhc3RQaHJhc2UpO1xuICAgICAgICAgICAgbGFzdFBocmFzZT13O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpPT09d2EubGVuZ3RoLTEpIHtcbiAgICAgICAgICAgIHBocmFzZUFycmF5LnB1c2gobGFzdFBocmFzZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBwaHJhc2VBcnJheTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRleHRBbmRBY3Rpb25zKCkge1xuXHRjb250ZXh0LmNsZWFyUmVjdCh0ZXh0UGFuZWwueCwgdGV4dFBhbmVsLnksIDUwMCwgMTAwMCk7XG5cdFxuXG5cdGNvbnRleHQuZm9udCA9IFwiMTVwdCBDYWxpYnJpXCI7XG5cdGNvbnRleHQuZmlsbFN0eWxlID0gJ3BpbmsnO1xuXHRjb25zb2xlLmxvZyhcIkFjdGlvbnMgZWZmZWN0IHRleHQ6IFwiICsgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0KTtcblx0dmFyIHRleHRUb0Rpc3BsYXkgPSB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQubGVuZ3RoICE9IDAgPyB3cmFwVGV4dCh1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQpIDogd3JhcFRleHQodXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQpO1xuXG5cblx0Ly8gY29uc29sZS5sb2codGV4dFRvRGlzcGxheSk7XG5cdGFjdGlvbnNQYW5lbC55ID0gdGV4dFRvRGlzcGxheS5sZW5ndGgqMjUrdGV4dFBhbmVsLnkrMjA7XG5cdHlPZmZzZXQgPSBhY3Rpb25zUGFuZWwueSArIDI1O1xuXG5cdGZvcih2YXIgaT0wOyBpPHRleHRUb0Rpc3BsYXkubGVuZ3RoOyBpKyspe1xuXHRcdFx0Y29udGV4dC5maWxsVGV4dCh0ZXh0VG9EaXNwbGF5W2ldLCB0ZXh0UGFuZWwueCwgdGV4dFBhbmVsLnkrMjUqaSsyMCk7XHRcblx0fVxuXHRcblxuXHRjb250ZXh0LmZvbnQgPSBcIjE1cHQgQ2FsaWJyaVwiO1xuXHRjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB1c2VyQWN0aW9uVGV4dCA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHRbaV07XG5cdFx0Y29udGV4dC5maWxsVGV4dCh1c2VyQWN0aW9uVGV4dCwgYWN0aW9uc1BhbmVsLnggKyAyMCwgeU9mZnNldCk7XG5cdFx0aWYgKGkgPT0gMCkge1xuXHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IGk7XG5cdFx0fVxuXHRcdHlPZmZzZXQgKz0geU9mZnNldEluY3JlbWVudDtcblx0fVxuXG5cdGRpc3BsYXlBcnJvdygpO1xuXHRjb25zb2xlLmxvZyhcIndpcmVzOiBcIiArIGdldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkKSk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlBcnJvdygpIHtcblx0aWYodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCl7XG5cdFx0Y29udGV4dC5jbGVhclJlY3QoYWN0aW9uc1BhbmVsLngsIGFjdGlvbnNQYW5lbC55LCAyMCwgMTAwMCk7XG5cdFx0Y29udGV4dC5maWxsVGV4dChcIj4gXCIsIDUyMCwgYWN0aW9uc1BhbmVsLnkgKyAyNSArIChjdXJyZW50U2VsZWN0aW9uICogeU9mZnNldEluY3JlbWVudCkpO1xuXHR9XG59XG5cbi8vVXNlciBpbnB1dFxuZnVuY3Rpb24ga2V5UHJlc3MoZSkge1xuXHRpZiAoZS5rZXlDb2RlID09IDEzKSB7XG5cdFx0dmFyIHNlbGVjdGVkQWN0aW9uID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dFtjdXJyZW50U2VsZWN0aW9uXTtcblx0XHRpZighaXNVbmRlZmluZWQoc2VsZWN0ZWRBY3Rpb24pKXtcblx0XHRcdGV4ZWN1dGVVc2VyQWN0aW9uKHNlbGVjdGVkQWN0aW9uKTtcblx0XHRcdHdvcmxkVGljaygpO1xuXHRcdFx0cmVuZGVyKCk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGtleURvd24oZSkge1xuXHRpZiAoZS5rZXlDb2RlID09IDQwKSB7Ly9kb3duXG5cdFx0aWYgKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApIHtcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24rKztcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSBjdXJyZW50U2VsZWN0aW9uICUgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGg7XG5cdFx0XHRkaXNwbGF5QXJyb3coKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IDM4KSB7Ly91cFxuXHRcdGlmICh1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKSB7XG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uLS07XG5cdFx0XHRpZiAoY3VycmVudFNlbGVjdGlvbiA8IDApXG5cdFx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAtIDE7XG5cdFx0XHRkaXNwbGF5QXJyb3coKTtcblx0XHR9XG5cdH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGtleVByZXNzLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlEb3duLCBmYWxzZSk7IiwiaW1wb3J0IFF1ZXVlIGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL1F1ZXVlXCI7XG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsXCI7XG5cbmludGVyZmFjZSBEaWN0aW9uYXJ5PFQ+IHsgW2tleTogc3RyaW5nXTogVDsgfVxuXG5leHBvcnQgZW51bSBTdGF0dXMge1xuICAgIFJVTk5JTkcsXG4gICAgU1VDQ0VTUyxcbiAgICBGQUlMVVJFXG59XG5cbmZ1bmN0aW9uIHRlcm1pbmF0ZUFuZFJldHVybihpZDogbnVtYmVyLCBibGFja2JvYXJkOiBhbnksIHN0YXR1czogU3RhdHVzKSB7XG4gICAgZGVsZXRlIGJsYWNrYm9hcmRbaWRdO1xuICAgIHJldHVybiBzdGF0dXM7XG59XG5cbmV4cG9ydCB0eXBlIEVmZmVjdCA9ICgpID0+IHZvaWRcbmV4cG9ydCB0eXBlIFByZWNvbmRpdGlvbiA9ICgpID0+IGJvb2xlYW5cbmV4cG9ydCB0eXBlIFRpY2sgPSAoKSA9PiBTdGF0dXNcbmV4cG9ydCB0eXBlIEFjdGlvblRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKSA9PiBUaWNrXG4vKipcbiAqIFRoZSBndWFyZCB0aWNrIGlzIHRvIGFkZCBhIHByZWNvbmRpdGlvbiB0byB0aGUgY29tcG9zaXRlIHRpY2tzXG4gKi9cbmV4cG9ydCB0eXBlIEd1YXJkVGljayA9IChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljaywgbmVnYXRlPzogYm9vbGVhbikgPT4gVGlja1xuLyoqXG4gKiBTZXF1ZW5jZS9TZWxlY3RvclxuICovXG5leHBvcnQgdHlwZSBDb21wb3NpdGVUaWNrID0gKGFzdFRpY2tzOiBUaWNrW10pID0+IFRpY2tcblxudmFyIGJsYWNrYm9hcmQgPSB7fTtcblxuZnVuY3Rpb24gZ2V0QWN0aW9uVGljayhpZDogbnVtYmVyKTogQWN0aW9uVGljayB7XG4gICAgcmV0dXJuIChwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZCA9IDEpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwcmVjb25kaXRpb24oKSkge1xuICAgICAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lID0gdGlja3NSZXF1aXJlZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYmxhY2tib2FyZFtpZF0udGlja3NEb25lID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS50aWNrc0RvbmUtLTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLkZBSUxVUkU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEd1YXJkVGljaygpOiBHdWFyZFRpY2sge1xuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBhc3RUaWNrLCBuZWdhdGUgPSBmYWxzZSkgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2NlZWQgPSBuZWdhdGUgPyAhcHJlY29uZGl0aW9uKCkgOiBwcmVjb25kaXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBwcm9jZWVkID8gZXhlY3V0ZShhc3RUaWNrKSA6IFN0YXR1cy5GQUlMVVJFO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRTZXF1ZW5jZVRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdG9yVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZFN0YXR1cyA9IGV4ZWN1dGUoYXN0VGlja3NbYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4XSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGUoYXN0VGljazogVGljayk6IFN0YXR1cyB7XG4gICAgcmV0dXJuIGFzdFRpY2soKTtcbn1cblxudmFyIGdsb2JhbElkQ291bnRlciA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb24ocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKTogVGljayB7XG4gICAgcmV0dXJuIGdldEFjdGlvblRpY2soZ2xvYmFsSWRDb3VudGVyKyspKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ19ndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2ssIHRydWUpO1xufVxuXG4vKipcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gc3VjY2VzcyBvZiBhIGNoaWxkXG4gKiBTdWNjZWVkcyBpZiBhbGwgc3VjY2VlZCwgZWxzZSBmYWlsc1xuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXG4gKiBAcmV0dXJucyB7VGlja31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0U2VxdWVuY2VUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XG59XG5cbi8qKlxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBmYWlsdXJlIG9mIGEgY2hpbGQodGhpbmsgb2YgaXQgYXMgaWYtZWxzZSBibG9ja3MpXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXG4gKiBAcmV0dXJucyB7VGlja31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdG9yKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0U2VsZWN0b3JUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XG59XG5cblxuLyotLS0tLS0tLS0tLS0tLS0gQVBJcyAtLS0tLS0tLS0tLS0tLS0gKi9cblxuLy8wLiB1dGlsaXRpZXNcbi8vIG1pbiBhbmQgbWF4IGFyZSBpbmNsdXNpdmVcbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kTnVtYmVyKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG59XG5cbi8vMS4gc3RvcnkgaW5zdGFuY2VcblxuLy8xLjEgbG9jYXRpb25zXG4vLyB2YXIgbG9jYXRpb25HcmFwaDogRGljdGlvbmFyeTxMb2NhdGlvbj4gPSB7fTtcblxudmFyIGxvY2F0aW9uR3JhcGggPSB7fTtcblxuLy8gLy8gXG4vLyBjbGFzcyBMb2NhdGlvbiB7XG4vLyAgICAgYWRqYWNlbnRMb2NhdGlvbnM6IERpY3Rpb25hcnk8TG9jYXRpb25bXT47XG5cbi8vICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcbi8vICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuLy8gICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50TG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgICAgICAgICBpZihhZGphY2VudExvY2F0aW9uc1tpXSBpbiBsb2NhdGlvbkdyYXBoKXtcblxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgZWxzZXtcbi8vICAgICAgICAgICAgICAgICB2YXIgbmV3X2xvY2F0aW9uID0gbmV3IExvY2F0aW9uKClcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuXG4vLyAgICAgfVxuLy8gfVxuXG5cbi8vYWRkIHRvIGJvdGggc2lkZXNcbmV4cG9ydCBmdW5jdGlvbiBhZGRMb2NhdGlvbihsb2NhdGlvbk5hbWU6IHN0cmluZywgYWRqYWNlbnRMb2NhdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9PSB1bmRlZmluZWQpXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IFtdO1xuICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXS5jb25jYXQoYWRqYWNlbnRMb2NhdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPSBbXTtcblxuICAgICAgICBsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXS5wdXNoKGxvY2F0aW9uTmFtZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJlQWRqYWNlbnQobG9jYXRpb24xOiBzdHJpbmcsIGxvY2F0aW9uMjogc3RyaW5nKTpib29sZWFuIHtcbiAgICBjb25zb2xlLmxvZyhcIkFyZSBhZGphY2VudDogXCIgKyBsb2NhdGlvbjEgKyBcIiwgXCIrbG9jYXRpb24yKTtcbiAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdID09IHVuZGVmaW5lZCB8fCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMl0gPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJFaXRoZXIgb25lL2JvdGggbG9jYXRpb25zIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV1baV0gPT0gbG9jYXRpb24yKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy9wYXRoZmluZGluZyBwcmltaXRpdmVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dExvY2F0aW9uKHN0YXJ0OiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhciB2aXNpdGVkID0ge307XG4gICAgdmFyIHByZXZpb3VzID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIGxvY2F0aW9uR3JhcGgpIHtcbiAgICAgICAgdmlzaXRlZFtrZXldID0gZmFsc2U7XG4gICAgfVxuICAgIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcblxuICAgIHZhciBteVF1ZXVlID0gbmV3IFF1ZXVlPHN0cmluZz4oKTtcbiAgICBteVF1ZXVlLmVucXVldWUoc3RhcnQpO1xuXG4gICAgd2hpbGUgKCFteVF1ZXVlLmlzRW1wdHkoKSkge1xuICAgICAgICB2YXIgY3VycmVudDogc3RyaW5nID0gbXlRdWV1ZS5kZXF1ZXVlKCk7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IGxvY2F0aW9uR3JhcGhbY3VycmVudF07XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdmlzaXRlZFtuZWlnaGJvcnNbaV1dKSB7XG4gICAgICAgICAgICAgICAgbXlRdWV1ZS5lbnF1ZXVlKG5laWdoYm9yc1tpXSk7XG4gICAgICAgICAgICAgICAgdmlzaXRlZFtuZWlnaGJvcnNbaV1dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1tuZWlnaGJvcnNbaV1dID0gY3VycmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBkZXN0aW5hdGlvbjtcbiAgICBpZiAoY3VycmVudCA9PSBzdGFydClcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgd2hpbGUgKHByZXZpb3VzW2N1cnJlbnRdICE9IHN0YXJ0KSB7XG4gICAgICAgIGN1cnJlbnQgPSBwcmV2aW91c1tjdXJyZW50XTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudDtcbn1cblxuLy8xLjIgYWdlbnRzXG5cbmV4cG9ydCBjbGFzcyBBZ2VudCB7XG4gICAgY3VycmVudExvY2F0aW9uOiBzdHJpbmc7XG4gICAgZGVzdGluYXRpb246IHN0cmluZztcbiAgICBsYXN0U2Vlbkl0ZW06IHtbaXRlbU5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBsYXN0U2VlblBlcnNvbjoge1tpdGVtTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHJhbmROdW1iZXI6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgY29uc3RydWN0b3JcIilcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TG9jYXRpb24oY3VycmVudGxvY2F0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGN1cnJlbnRsb2NhdGlvbjtcbiAgICB9XG5cbiAgICBzZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24oaXRlbTogSXRlbSwgYXRMb2NhdGlvbjogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5sYXN0U2Vlbkl0ZW1baXRlbS5uYW1lXSA9IGF0TG9jYXRpb247XG4gICAgfVxuXG4gICAgc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24oYWdlbnROYW1lOiBzdHJpbmcsIGF0TG9jYXRpb246IHN0cmluZyl7XG4gICAgICAgIHRoaXMubGFzdFNlZW5QZXJzb25bYWdlbnROYW1lXSA9IGF0TG9jYXRpb247XG4gICAgfVxuXG4gICAgc2V0RGVzdGluYXRpb24oZGVzdGluYXRpb246IHN0cmluZyl7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICB9XG5cbiAgICBoYXNTZWVuSXRlbShpdGVtOiBJdGVtKXtcbiAgICAgICAgaWYoaXRlbS5uYW1lIGluIHRoaXMubGFzdFNlZW5JdGVtKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiOiBzYXcgaXRlbTpcIitpdGVtLm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vdGhpcy5sYXN0U2Vlbkl0ZW1baXRlbS5uYW1lXVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aGVyZUlzSXRlbShpdGVtOiBJdGVtKXtcbiAgICAgICAgaWYoaXRlbS5uYW1lIGluIHRoaXMubGFzdFNlZW5JdGVtKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiOiBzYXcgaXRlbTpcIitpdGVtLm5hbWUgKyBcIiBhdCBsb2NhdGlvbjpcIit0aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG52YXIgYWdlbnRzOiBBcnJheTxBZ2VudD4gPSBuZXcgQXJyYXk8QWdlbnQ+KCk7XG4vLyB2YXIgYWdlbnRzID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBZ2VudChhZ2VudE5hbWU6IHN0cmluZykge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQWRkaW5nOiBcIithZ2VudE5hbWUpO1xuICAgIHZhciBhZ2VudCA9IG5ldyBBZ2VudChhZ2VudE5hbWUpO1xuICAgIGNvbnNvbGUubG9nKGFnZW50KTtcbiAgICBhZ2VudHMucHVzaChhZ2VudCk7XG4gICAgcmV0dXJuIGFnZW50O1xufVxuXG4vLzEuMyBpdGVtc1xuXG4vLyBUb2RvXG5jbGFzcyBJdGVtIHtcbiAgICBjdXJyZW50TG9jYXRpb246IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TG9jYXRpb24oY3VycmVudGxvY2F0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGN1cnJlbnRsb2NhdGlvbjtcbiAgICB9XG59XG5cbnZhciBpdGVtczogQXJyYXk8SXRlbT4gPSBuZXcgQXJyYXk8SXRlbT4oKTtcbi8vIHZhciBpdGVtcyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShpdGVtTmFtZTogc3RyaW5nKSB7XG4gICAgdmFyIGl0ZW0gPSBuZXcgSXRlbShpdGVtTmFtZSk7XG4gICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICByZXR1cm4gaXRlbTtcbn1cblxuLy8xLjQgdmFyaWFibGVzXG52YXIgdmFyaWFibGVzID0ge307XG52YXIgYWdlbnRWYXJpYWJsZXMgPSB7fTtcbnZhciBpdGVtVmFyaWFibGVzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB2YXJpYWJsZXNbdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFyTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFnZW50VmFyaWFibGUoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkpXG4gICAgICAgIGFnZW50VmFyaWFibGVzW2FnZW50XSA9IHt9O1xuXG4gICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoaXNVbmRlZmluZWQodmFyaWFibGVzW3Zhck5hbWVdKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIG5vdCBzZXQhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB2YXJpYWJsZXNbdmFyTmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgYWdlbnQgXCIgKyBhZ2VudCArIFwiIG5vdCBzZXQhXCIpXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFyaWFibGVOb3RTZXQodmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZW50VmFyaWFibGVOb3RTZXQoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKTtcbn1cblxuLy8gdG9kb1xuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW1WYXJpYWJsZShpdGVtOiBJdGVtLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtLm5hbWVdKSlcbiAgICAgICAgaXRlbVZhcmlhYmxlc1tpdGVtLm5hbWVdID0ge307XG5cbiAgICBpdGVtVmFyaWFibGVzW2l0ZW0ubmFtZV1bdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXSkgfHwgaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgaXRlbSBcIiArIGl0ZW0gKyBcIiBub3Qgc2V0IVwiKVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdO1xufVxuXG5cbi8vMlxuLy9hZ2VudC1iZWhhdmlvciB0cmVlIG1hcHBpbmdcblxudmFyIGFnZW50VHJlZXM6IHtbYWdlbnROYW1lOiBzdHJpbmddIDogVGlja30gPSB7fTtcbi8vIHZhciBhZ2VudFRyZWVzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hUcmVlVG9BZ2VudChhZ2VudDogQWdlbnQsIHRyZWU6IFRpY2spIHtcbiAgICBhZ2VudFRyZWVzW2FnZW50Lm5hbWVdID0gdHJlZTtcbn1cblxuLy8zLjFcbi8vdXNlciBhY3Rpb25zXG4vL1RPRE8gYWRkIHZhcmlhYmxlcyB0byB1c2VyIGFjdGlvbiB0ZXh0c1xudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IHtcbiAgICB0ZXh0OiBcIlwiLFxuICAgIHVzZXJBY3Rpb25zVGV4dDogW10sXG4gICAgYWN0aW9uRWZmZWN0c1RleHQ6IFwiXCJcbn1cbnZhciB1c2VySW50ZXJhY3Rpb25UcmVlcyA9IFtdO1xudmFyIHVzZXJBY3Rpb25zID0ge307XG5cbmZ1bmN0aW9uIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCkge1xuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ID0gXCJcIjtcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0ID0gW107XG4gICAgdXNlckFjdGlvbnMgPSB7fTsvL3tcIkdvIHRvIGxvY2F0aW9uIFhcIiA6IGVmZmVjdFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uVHJlZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZXhlY3V0ZSh1c2VySW50ZXJhY3Rpb25UcmVlc1tpXSk7XG4gICAgfVxufVxuXG5leHBvcnQgbGV0IGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcpID0+XG4gICAgYWN0aW9uKFxuICAgICAgICAoKSA9PiB0cnVlLFxuICAgICAgICAoKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCArPSBcIlxcblwiICsgdGV4dCxcbiAgICAgICAgMFxuICAgICk7XG5leHBvcnQgbGV0IGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0ID0gKHRleHQ6IHN0cmluZykgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ICs9IFwiXFxuXCIgKyB0ZXh0O1xuXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb25UcmVlID0gKHRleHQ6IHN0cmluZywgZWZmZWN0VHJlZTogVGljaykgPT4gYWN0aW9uKFxuICAgICgpID0+IHRydWUsXG4gICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBlZmZlY3RUcmVlKSwgMFxuKTtcblxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uID0gKHRleHQ6IHN0cmluZywgZWZmZWN0OiAoKSA9PiBhbnkpID0+XG4gICAgYWN0aW9uKFxuICAgICAgICAoKSA9PiB0cnVlLFxuICAgICAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGFjdGlvbigoKT0+dHJ1ZSwgZWZmZWN0LCAwKSksIDBcbiAgICApO1xuXG5cblxuXG5cbi8vICAgICByZXR1cm4gXG4vLyB9XG5cblxuZnVuY3Rpb24gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcbiAgICB1c2VyQWN0aW9uc1t0ZXh0XSA9IHRyZWU7XG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5wdXNoKHRleHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlckludGVyYWN0aW9uVHJlZSh0aWNrOiBUaWNrKSB7XG4gICAgdXNlckludGVyYWN0aW9uVHJlZXMucHVzaCh0aWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVVc2VyQWN0aW9uKHRleHQ6IHN0cmluZykge1xuICAgIC8vZXhlY3V0ZSB0aGUgdXNlciBhY3Rpb25cbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgPSBcIlwiO1xuICAgIHZhciB1c2VyQWN0aW9uRWZmZWN0VHJlZSA9IHVzZXJBY3Rpb25zW3RleHRdO1xuICAgIGV4ZWN1dGUodXNlckFjdGlvbkVmZmVjdFRyZWUpO1xufVxuXG4vLzQuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCkge1xuICAgIHJldHVybiB1c2VySW50ZXJhY3Rpb25PYmplY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3b3JsZFRpY2soKSB7XG4gICAgLy9hbGwgYWdlbnQgdGlja3NcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJlZSA9IGFnZW50VHJlZXNbYWdlbnRzW2ldLm5hbWVdO1xuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRyZWUpKSB7XG4gICAgICAgICAgICBzZXRWYXJpYWJsZShcImV4ZWN1dGluZ0FnZW50XCIsIGFnZW50c1tpXS5uYW1lKTtcbiAgICAgICAgICAgIGV4ZWN1dGUodHJlZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcbn1cblxuXG5cbiJdfQ==
