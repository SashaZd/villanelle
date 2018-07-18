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
            scripting_1.displayDescriptionAction("It was a simple mission: land on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Part two was when everything went awry. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed dead. The commander comes to as the ship is plummeting from orbit, their crewmates yelling at each other. There is only one escape pod remaining. As commander, you are equipped with a special ineractive map allowing you to see the positions of your crewmates at all times. You must utilize the map in order to take control of the ship and remaining crew to save everyone from certain death."),
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
                    scripting_1.displayDescriptionAction("There seems to be a problem with the teleporter software. Maybe Mark could check it out."),
                    scripting_1.action(function () { return true; }, function () {
                        scripting_1.setVariable("TRANSPORT_ROOM:Broken", 1);
                    }, 0)
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 1; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("You need to find someone to look at the teleporter sofware."),
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 2; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("The first thing was fixed, but now the second thing is broken? Go find EFG to fix the same."),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL21hZGRpZS50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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WUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztJQUN6QyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNySSxDQUFDO0FBRUQ7SUFDQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BJLENBQUM7QUFFRDtJQUNDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDekMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUM1QyxPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENB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LFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDekIscUJBQXFCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsZ0NBQXVDLElBQVU7SUFDN0Msb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFGRCx3REFFQztBQUVELDJCQUFrQyxJQUFZO0lBQzFDLHlCQUF5QjtJQUN6QixxQkFBcUIsQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDN0MsSUFBSSxvQkFBb0IsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUxELDhDQUtDO0FBRUQsSUFBSTtBQUNKO0lBQ0ksdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBRkQsZ0NBRUM7QUFFRDtJQUNJLE9BQU8scUJBQXFCLENBQUM7QUFDakMsQ0FBQztBQUZELDREQUVDO0FBRUQ7SUFDSSxpQkFBaUI7SUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQixXQUFXLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtLQUNKO0lBQ0QsdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBVkQsOEJBVUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbnZhciBhcnJheXMgPSByZXF1aXJlKFwiLi9hcnJheXNcIik7XG52YXIgTGlua2VkTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAqIENyZWF0ZXMgYW4gZW1wdHkgTGlua2VkIExpc3QuXG4gICAgKiBAY2xhc3MgQSBsaW5rZWQgbGlzdCBpcyBhIGRhdGEgc3RydWN0dXJlIGNvbnNpc3Rpbmcgb2YgYSBncm91cCBvZiBub2Rlc1xuICAgICogd2hpY2ggdG9nZXRoZXIgcmVwcmVzZW50IGEgc2VxdWVuY2UuXG4gICAgKiBAY29uc3RydWN0b3JcbiAgICAqL1xuICAgIGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAqIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICogTGFzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0XG4gICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICogQWRkcyBhbiBlbGVtZW50IHRvIHRoaXMgbGlzdC5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgYWRkZWQuXG4gICAgKiBAcGFyYW0ge251bWJlcj19IGluZGV4IG9wdGlvbmFsIGluZGV4IHRvIGFkZCB0aGUgZWxlbWVudC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkXG4gICAgKiB0aGUgZWxlbWVudCBpcyBhZGRlZCB0byB0aGUgZW5kIG9mIHRoaXMgbGlzdC5cbiAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGFkZGVkIG9yIGZhbHNlIGlmIHRoZSBpbmRleCBpcyBpbnZhbGlkXG4gICAgKiBvciBpZiB0aGUgZWxlbWVudCBpcyB1bmRlZmluZWQuXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaW5kZXgpKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMubkVsZW1lbnRzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLm5FbGVtZW50cyB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld05vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoaXRlbSk7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMCB8fCB0aGlzLmxhc3ROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBGaXJzdCBub2RlIGluIHRoZSBsaXN0LlxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IHRoaXMubkVsZW1lbnRzKSB7XG4gICAgICAgICAgICAvLyBJbnNlcnQgYXQgdGhlIGVuZC5cbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUubmV4dCA9IG5ld05vZGU7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gQ2hhbmdlIGZpcnN0IG5vZGUuXG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgaWYgKHByZXYgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHByZXYubmV4dDtcbiAgICAgICAgICAgIHByZXYubmV4dCA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uRWxlbWVudHMrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICogQHJldHVybiB7Kn0gdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXG4gICAgKiBlbXB0eS5cbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5maXJzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXG4gICAgKiBAcmV0dXJuIHsqfSB0aGUgbGFzdCBlbGVtZW50IGluIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xuICAgICogZW1wdHkuXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5sYXN0Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZGVzaXJlZCBpbmRleC5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpc1xuICAgICAqIG91dCBvZiBib3VuZHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZWxlbWVudEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4KTtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGVcbiAgICAgKiBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhlIExpc3QgZG9lcyBub3QgY29udGFpbiB0aGlzIGVsZW1lbnQuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIGxpc3QgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlXG4gICAgICogb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGlzIGxpc3QgZG9lcyBub3QgY29udGFpbiB0aGVcbiAgICAgKiBlbGVtZW50LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxuICAgICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAgICpcbiAgICAgICAqIDxwcmU+XG4gICAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAgICogfVxuICAgICAgICogPC9wcmU+XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxuICAgICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBmYWxzZVxuICAgICAgICogb3RoZXJ3aXNlLlxuICAgICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmluZGV4T2YoaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpc3QsIGlmIHByZXNlbnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgbGlzdCBjb250YWluZWQgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzIDwgMSB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubkVsZW1lbnRzLS07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnROb2RlO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgbGlzdC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cbiAgICAgKiBUd28gbGlzdHMgYXJlIGVxdWFsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBvcmRlci5cbiAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3R9IG90aGVyIHRoZSBvdGhlciBsaXN0LlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLiBJZiB0aGUgZWxlbWVudHMgaW4gdGhlIGxpc3RzXG4gICAgICogYXJlIGN1c3RvbSBvYmplY3RzIHlvdSBzaG91bGQgcHJvdmlkZSBhIGZ1bmN0aW9uLCBvdGhlcndpc2VcbiAgICAgKiB0aGUgPT09IG9wZXJhdG9yIGlzIHVzZWQgdG8gY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiBlbGVtZW50cy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob3RoZXIsIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcUYgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgTGlua2VkTGlzdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVyLnNpemUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsc0F1eCh0aGlzLmZpcnN0Tm9kZSwgb3RoZXIuZmlyc3ROb2RlLCBlcUYpO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAcHJpdmF0ZVxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzQXV4ID0gZnVuY3Rpb24gKG4xLCBuMiwgZXFGKSB7XG4gICAgICAgIHdoaWxlIChuMSAhPT0gbnVsbCAmJiBuMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFlcUYobjEuZWxlbWVudCwgbjIuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuMSA9IG4xLm5leHQ7XG4gICAgICAgICAgICBuMiA9IG4yLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBnaXZlbiBpbmRleC5cbiAgICAgKiBAcmV0dXJuIHsqfSByZW1vdmVkIGVsZW1lbnQgb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZUVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMgfHwgdGhpcy5maXJzdE5vZGUgPT09IG51bGwgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAxKSB7XG4gICAgICAgICAgICAvL0ZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmZpcnN0Tm9kZS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJldmlvdXMubmV4dCA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByZXZpb3VzICE9PSBudWxsICYmIHByZXZpb3VzLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcHJldmlvdXMubmV4dC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBwcmV2aW91cy5uZXh0Lm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBsaXN0IGluIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhjdXJyZW50Tm9kZS5lbGVtZW50KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV2ZXJzZXMgdGhlIG9yZGVyIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpbmtlZCBsaXN0IChtYWtlcyB0aGUgbGFzdFxuICAgICAqIGVsZW1lbnQgZmlyc3QsIGFuZCB0aGUgZmlyc3QgZWxlbWVudCBsYXN0KS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgdGVtcCA9IG51bGw7XG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0ZW1wID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gcHJldmlvdXM7XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBjdXJyZW50ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5sYXN0Tm9kZTtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHRlbXA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QgaW4gcHJvcGVyXG4gICAgICogc2VxdWVuY2UuXG4gICAgICogQHJldHVybiB7QXJyYXkuPCo+fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0LFxuICAgICAqIGluIHByb3BlciBzZXF1ZW5jZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChjdXJyZW50Tm9kZS5lbGVtZW50KTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHMgPD0gMDtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJyYXlzLnRvU3RyaW5nKHRoaXMudG9BcnJheSgpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubm9kZUF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAodGhpcy5uRWxlbWVudHMgLSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleCAmJiBub2RlICE9IG51bGw7IGkrKykge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY3JlYXRlTm9kZSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbGVtZW50OiBpdGVtLFxuICAgICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIExpbmtlZExpc3Q7XG59KCkpOyAvLyBFbmQgb2YgbGlua2VkIGxpc3RcbmV4cG9ydHMuZGVmYXVsdCA9IExpbmtlZExpc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MaW5rZWRMaXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIExpbmtlZExpc3RfMSA9IHJlcXVpcmUoXCIuL0xpbmtlZExpc3RcIik7XG52YXIgUXVldWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBxdWV1ZS5cbiAgICAgKiBAY2xhc3MgQSBxdWV1ZSBpcyBhIEZpcnN0LUluLUZpcnN0LU91dCAoRklGTykgZGF0YSBzdHJ1Y3R1cmUsIHRoZSBmaXJzdFxuICAgICAqIGVsZW1lbnQgYWRkZWQgdG8gdGhlIHF1ZXVlIHdpbGwgYmUgdGhlIGZpcnN0IG9uZSB0byBiZSByZW1vdmVkLiBUaGlzXG4gICAgICogaW1wbGVtZW50YXRpb24gdXNlcyBhIGxpbmtlZCBsaXN0IGFzIGEgY29udGFpbmVyLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFF1ZXVlKCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBuZXcgTGlua2VkTGlzdF8xLmRlZmF1bHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhbmQgcmVtb3ZlcyB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlRWxlbWVudEF0SW5kZXgoMCk7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcywgYnV0IGRvZXMgbm90IHJlbW92ZSwgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3QuZmlyc3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBzdGFjayBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IsIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSAocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCxcbiAgICAgKiBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuY29udGFpbnMoZWxlbSwgZXF1YWxzRnVuY3Rpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBhbmQgb25seSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIG5vIGl0ZW1zOyBmYWxzZVxuICAgICAqIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCkgPD0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgcXVldWUuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxpc3QuY2xlYXIoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHF1ZXVlIGluXG4gICAgICogRklGTyBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goY2FsbGJhY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXVlO1xufSgpKTsgLy8gRW5kIG9mIHF1ZXVlXG5leHBvcnRzLmRlZmF1bHQgPSBRdWV1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGl0ZW1cbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LjRcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXksIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZXhwb3J0cy5pbmRleE9mID0gaW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5IG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbGFzdEluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZXhwb3J0cy5sYXN0SW5kZXhPZiA9IGxhc3RJbmRleE9mO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAqL1xuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwO1xufVxuZXhwb3J0cy5jb250YWlucyA9IGNvbnRhaW5zO1xuLyoqXG4gKiBSZW1vdmVzIHRoZSBmaXJzdCBvY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGZyb20gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGNoYW5nZWQgYWZ0ZXIgdGhpcyBjYWxsLlxuICovXG5mdW5jdGlvbiByZW1vdmUoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5yZW1vdmUgPSByZW1vdmU7XG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5IGVxdWFsXG4gKiB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBkZXRlcm1pbmUgdGhlIGZyZXF1ZW5jeSBvZiB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHdob3NlIGZyZXF1ZW5jeSBpcyB0byBiZSBkZXRlcm1pbmVkLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXlcbiAqIGVxdWFsIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmcmVxdWVuY3koYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBmcmVxID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICBmcmVxKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZyZXE7XG59XG5leHBvcnRzLmZyZXF1ZW5jeSA9IGZyZXF1ZW5jeTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gc3BlY2lmaWVkIGFycmF5cyBhcmUgZXF1YWwgdG8gb25lIGFub3RoZXIuXG4gKiBUd28gYXJyYXlzIGFyZSBjb25zaWRlcmVkIGVxdWFsIGlmIGJvdGggYXJyYXlzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyXG4gKiBvZiBlbGVtZW50cywgYW5kIGFsbCBjb3JyZXNwb25kaW5nIHBhaXJzIG9mIGVsZW1lbnRzIGluIHRoZSB0d29cbiAqIGFycmF5cyBhcmUgZXF1YWwgYW5kIGFyZSBpbiB0aGUgc2FtZSBvcmRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBvbmUgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiB0aGUgb3RoZXIgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVtZW50cyBpbiB0aGUgYXJyYXlzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgdHdvIGFycmF5cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gZXF1YWxzKGFycmF5MSwgYXJyYXkyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkxLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZXF1YWxzKGFycmF5MVtpXSwgYXJyYXkyW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5lcXVhbHMgPSBlcXVhbHM7XG4vKipcbiAqIFJldHVybnMgc2hhbGxvdyBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IHRvIGNvcHkuXG4gKiBAcmV0dXJuIHtBcnJheX0gYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXlcbiAqL1xuZnVuY3Rpb24gY29weShhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5jb25jYXQoKTtcbn1cbmV4cG9ydHMuY29weSA9IGNvcHk7XG4vKipcbiAqIFN3YXBzIHRoZSBlbGVtZW50cyBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9ucyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIHN3YXAgZWxlbWVudHMuXG4gKiBAcGFyYW0ge251bWJlcn0gaSB0aGUgaW5kZXggb2Ygb25lIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBqIHRoZSBpbmRleCBvZiB0aGUgb3RoZXIgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgaXMgZGVmaW5lZCBhbmQgdGhlIGluZGV4ZXMgYXJlIHZhbGlkLlxuICovXG5mdW5jdGlvbiBzd2FwKGFycmF5LCBpLCBqKSB7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gYXJyYXkubGVuZ3RoIHx8IGogPCAwIHx8IGogPj0gYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcbiAgICBhcnJheVtpXSA9IGFycmF5W2pdO1xuICAgIGFycmF5W2pdID0gdGVtcDtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuc3dhcCA9IHN3YXA7XG5mdW5jdGlvbiB0b1N0cmluZyhhcnJheSkge1xuICAgIHJldHVybiAnWycgKyBhcnJheS50b1N0cmluZygpICsgJ10nO1xufVxuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuLyoqXG4gKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBhcnJheVxuICogc3RhcnRpbmcgZnJvbSBpbmRleCAwIHRvIGxlbmd0aCAtIDEuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gaXRlcmF0ZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBhcnJheV8xID0gYXJyYXk7IF9pIDwgYXJyYXlfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGVsZSA9IGFycmF5XzFbX2ldO1xuICAgICAgICBpZiAoY2FsbGJhY2soZWxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZm9yRWFjaCA9IGZvckVhY2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmV4cG9ydHMuaGFzID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuICAgIHJldHVybiBfaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufTtcbi8qKlxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb21wYXJlIGVsZW1lbnQgb3JkZXIuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmUoYSwgYikge1xuICAgIGlmIChhIDwgYikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHRDb21wYXJlID0gZGVmYXVsdENvbXBhcmU7XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gdGVzdCBlcXVhbGl0eS5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWZhdWx0RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSA9PT0gYjtcbn1cbmV4cG9ydHMuZGVmYXVsdEVxdWFscyA9IGRlZmF1bHRFcXVhbHM7XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29udmVydCBhbiBvYmplY3QgdG8gYSBzdHJpbmcuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdFRvU3RyaW5nKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuICAgICAgICByZXR1cm4gJyRzJyArIGl0ZW07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJyRvJyArIGl0ZW0udG9TdHJpbmcoKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHRUb1N0cmluZyA9IGRlZmF1bHRUb1N0cmluZztcbi8qKlxuKiBKb2lucyBhbGwgdGhlIHByb3BlcmllcyBvZiB0aGUgb2JqZWN0IHVzaW5nIHRoZSBwcm92aWRlZCBqb2luIHN0cmluZ1xuKi9cbmZ1bmN0aW9uIG1ha2VTdHJpbmcoaXRlbSwgam9pbikge1xuICAgIGlmIChqb2luID09PSB2b2lkIDApIHsgam9pbiA9ICcsJzsgfVxuICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdG9yZXQgPSAneyc7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gaXRlbSkge1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuaGFzKGl0ZW0sIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgam9pbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIHByb3AgKyAnOicgKyBpdGVtW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3JldCArICd9JztcbiAgICB9XG59XG5leHBvcnRzLm1ha2VTdHJpbmcgPSBtYWtlU3RyaW5nO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZnVuYykgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIHVuZGVmaW5lZC5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvYmopID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHN0cmluZy5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuLyoqXG4gKiBSZXZlcnNlcyBhIGNvbXBhcmUgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoY29tcGFyZUZ1bmN0aW9uKSB8fCAhaXNGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQsIHYpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oZCwgdikgKiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLnJldmVyc2VDb21wYXJlRnVuY3Rpb24gPSByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uO1xuLyoqXG4gKiBSZXR1cm5zIGFuIGVxdWFsIGZ1bmN0aW9uIGdpdmVuIGEgY29tcGFyZSBmdW5jdGlvbi5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBjb21wYXJlVG9FcXVhbHMoY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYSwgYikgPT09IDA7XG4gICAgfTtcbn1cbmV4cG9ydHMuY29tcGFyZVRvRXF1YWxzID0gY29tcGFyZVRvRXF1YWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCIvKiAvLy8gPHJlZmVyZW5jZSBwYXRoPVwic2NyaXB0aW5nLnRzXCIvPiAqL1xuaW1wb3J0IHtcblx0YWRkQWdlbnQsIHNldEFnZW50VmFyaWFibGUsIGFkZEl0ZW0sIGFkZExvY2F0aW9uLCBzZXRWYXJpYWJsZSwgZ2V0TmV4dExvY2F0aW9uLCBhY3Rpb24sXG5cdGdldFJhbmROdW1iZXIsIGdldFZhcmlhYmxlLCBzZXF1ZW5jZSwgc2VsZWN0b3IsIGV4ZWN1dGUsIFByZWNvbmRpdGlvbiwgZ2V0QWdlbnRWYXJpYWJsZSwgbmVnX2d1YXJkLCBndWFyZCxcblx0aXNWYXJpYWJsZU5vdFNldCwgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uLCBhZGRVc2VyQWN0aW9uLCBhZGRVc2VySW50ZXJhY3Rpb25UcmVlLCBpbml0aWFsaXplLFxuXHRnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QsIGV4ZWN1dGVVc2VyQWN0aW9uLCB3b3JsZFRpY2ssIGF0dGFjaFRyZWVUb0FnZW50LCBzZXRJdGVtVmFyaWFibGUsIGdldEl0ZW1WYXJpYWJsZSxcblx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQsIGFyZUFkamFjZW50LCBhZGRVc2VyQWN0aW9uVHJlZSwgQWdlbnRcbn0gZnJvbSBcIi4vc2NyaXB0aW5nXCI7XG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsXCI7XG5cbi8vIDEuIERlZmluZSBTdGF0ZVxuXG4vLyBMb2NhdGlvbnNcbnZhciBTVE9SQUdFID0gXCJTVE9SQUdFXCI7XG52YXIgRE9DVE9SU19PRkZJQ0UgPSBcIkRPQ1RPUlMgT0ZGSUNFXCI7XG52YXIgRU5HSU5FUyA9IFwiRU5HSU5FU1wiO1xudmFyIENPQ0tQSVQgPSBcIkNPQ0tQSVRcIjtcbnZhciBFU0NBUEVfUE9EID0gXCJFU0NBUEUgUE9EXCI7XG52YXIgVFJBTlNQT1JUX1JPT00gPSBcIlRSQU5TUE9SVCBST09NXCI7XG52YXIgTU9OSVRPUklOR19ST09NID0gXCJNT05JVE9SSU5HIFJPT01cIjtcbnZhciBNQUlOX0FSRUEgPSBcIk1BSU4gQVJFQVwiO1xudmFyIEZFTV9CRURST09NID0gXCJGRU0gQkVEUk9PTVwiO1xudmFyIE1BTEVfQkVEUk9PTSA9IFwiTUFMRSBCRURST09NXCI7XG52YXIgQkFUSFJPT00gPSBcIkJBVEhST09NXCI7XG52YXIgVU5LTk9XTiA9IFwiVU5LTk9XTlwiO1xuXG4vLyBBZGQgTG9jYXRpb25zXG5hZGRMb2NhdGlvbihFTkdJTkVTLCBbU1RPUkFHRSwgTUFJTl9BUkVBXSk7XG5hZGRMb2NhdGlvbihTVE9SQUdFLCBbRU5HSU5FUywgRE9DVE9SU19PRkZJQ0VdKTtcbmFkZExvY2F0aW9uKERPQ1RPUlNfT0ZGSUNFLCBbU1RPUkFHRSwgTUFJTl9BUkVBLCBDT0NLUElULCBNT05JVE9SSU5HX1JPT01dKTtcbmFkZExvY2F0aW9uKENPQ0tQSVQsIFtET0NUT1JTX09GRklDRV0pO1xuYWRkTG9jYXRpb24oRVNDQVBFX1BPRCwgW01BSU5fQVJFQV0pO1xuYWRkTG9jYXRpb24oVFJBTlNQT1JUX1JPT00sIFtNT05JVE9SSU5HX1JPT00sIE1BSU5fQVJFQV0pO1xuYWRkTG9jYXRpb24oTU9OSVRPUklOR19ST09NLCBbVFJBTlNQT1JUX1JPT00sIERPQ1RPUlNfT0ZGSUNFXSk7XG5hZGRMb2NhdGlvbihNQUlOX0FSRUEsIFtFTkdJTkVTLCBTVE9SQUdFLCBET0NUT1JTX09GRklDRSwgVFJBTlNQT1JUX1JPT00sIEVTQ0FQRV9QT0RdKTtcbmFkZExvY2F0aW9uKEZFTV9CRURST09NLCBbTUFJTl9BUkVBLCBCQVRIUk9PTV0pO1xuYWRkTG9jYXRpb24oTUFMRV9CRURST09NLCBbTUFJTl9BUkVBLCBCQVRIUk9PTV0pO1xuYWRkTG9jYXRpb24oQkFUSFJPT00sIFtNQUlOX0FSRUEsIEZFTV9CRURST09NLCBNQUxFX0JFRFJPT01dKTtcblxuLy8gYWdlbnRzXG52YXIgQ2FsZWIgPSBhZGRBZ2VudChcIkNhbGViXCIpO1xudmFyIFF1aW5uID0gYWRkQWdlbnQoXCJRdWlublwiKTtcbnZhciBNYXJrID0gYWRkQWdlbnQoXCJNYXJrXCIpO1xudmFyIEVkZGllID0gYWRkQWdlbnQoXCJFZGRpZVwiKTtcbnZhciBCZWF0cmljZSA9IGFkZEFnZW50KFwiQmVhdHJpY2VcIik7XG5cbi8vIGl0ZW1zXG52YXIgd2lyZXMxID0gYWRkSXRlbShcIndpcmVzMVwiKTtcbnZhciB3aXJlczIgPSBhZGRJdGVtKFwid2lyZXMyXCIpO1xuXG5cbndpcmVzMS5zZXRDdXJyZW50TG9jYXRpb24oU1RPUkFHRSk7XG53aXJlczIuc2V0Q3VycmVudExvY2F0aW9uKE1PTklUT1JJTkdfUk9PTSk7XG5cbi8vIHNldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIsIFNUT1JBR0UpO1xuLy8gc2V0SXRlbVZhcmlhYmxlKHdpcmVzMiwgXCJjdXJyZW50TG9jYXRpb25cIiwgTU9OSVRPUklOR19ST09NKTtcblxuLy8gdmFyIHdpcmVzQ29sbGVjdGVkID0gc2V0VmFyaWFibGUoXCJ3aXJlc0NvbGxlY3RlZFwiLCAwKTtcblxuLy8gLy8gdmFyaWFibGVzXG4vL0NhbGViXG4vLyBzZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImN1cnJlbnRMb2NhdGlvblwiLCBDT0NLUElUKTtcbkNhbGViLnNldEN1cnJlbnRMb2NhdGlvbihDT0NLUElUKTtcblxuLy9RdWlublxuLy8gc2V0QWdlbnRWYXJpYWJsZShRdWlubiwgXCJjdXJyZW50TG9jYXRpb25cIiwgRE9DVE9SU19PRkZJQ0UpO1xuUXVpbm4uc2V0Q3VycmVudExvY2F0aW9uKERPQ1RPUlNfT0ZGSUNFKTtcblxuLy9NYXJrXG4vLyBzZXRBZ2VudFZhcmlhYmxlKE1hcmssIFwiY3VycmVudExvY2F0aW9uXCIsIFRSQU5TUE9SVF9ST09NKTtcbk1hcmsuc2V0Q3VycmVudExvY2F0aW9uKFRSQU5TUE9SVF9ST09NKTtcblxuLy9FZGRpZVxuLy8gc2V0QWdlbnRWYXJpYWJsZShFZGRpZSwgXCJjdXJyZW50TG9jYXRpb25cIiwgU1RPUkFHRSk7XG5FZGRpZS5zZXRDdXJyZW50TG9jYXRpb24oU1RPUkFHRSk7XG5cbi8vQmVhdHJpY2Vcbi8vIHNldEFnZW50VmFyaWFibGUoQmVhdHJpY2UsIFwiY3VycmVudExvY2F0aW9uXCIsIEVOR0lORVMpO1xuQmVhdHJpY2Uuc2V0Q3VycmVudExvY2F0aW9uKEVOR0lORVMpO1xuXG4vLyBQbGF5ZXJcbnZhciBwbGF5ZXJMb2NhdGlvbiA9IHNldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIiwgTUFJTl9BUkVBKTtcbnZhciB3aXJlc0NvbGxlY3RlZCA9IHNldFZhcmlhYmxlKFwid2lyZXNDb2xsZWN0ZWRcIiwgMCk7XG5cblxuLy8gS25vd2xlZGdlIFxuQ2FsZWIuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XG5RdWlubi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcbk1hcmsuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XG5FZGRpZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcbkJlYXRyaWNlLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xuXG4vLyBzZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImxhc3RTZWVuOndpcmVzMVwiLCBVTktOT1dOKVxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJsYXN0U2Vlbjp3aXJlczJcIiwgVU5LTk9XTilcbi8vIHNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46cGxheWVyXCIsIFVOS05PV04pXG5cbkNhbGViLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIFVOS05PV04pO1xuLy8gQ2FsZWIuc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24ocGxheWVyLCBVTktOT1dOKTtcblF1aW5uLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIFVOS05PV04pO1xuLy8gUXVpbm4uc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24ocGxheWVyLCBVTktOT1dOKTtcbk1hcmsuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XG4vLyBNYXJrLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5FZGRpZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcbi8vIEVkZGllLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5CZWF0cmljZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcbi8vIEJlYXRyaWNlLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5cblxuLy8gR29hbHMgZm9yIHRoZSBwbGF5ZXJcblxuLy8gMDogVW5rbm93bi9Jbml0aWFsIFN0YXRlXG4vLyAxOiBGb3VuZCBvdXQgYWJvdXQgRmF1bHQ6MS4gTmV3IEdvYWwuIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9MClcbi8vIDI6IEZpeGVkIEZhdWx0OjEgKG9ubHkgb2NjdXJzIGlmIHN0YXR1cz0xKVxuLy8gMzogRm91bmQgb3V0IGFib3V0IEZhdWx0OjIuIE5ldyBHb2FsIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9Milcbi8vIDQ6IEZpeGVkIEZhdWx0OjIgKG9ubHkgb2NjdXJzIGlmIHN0YXR1cz0zKSBcbi8vIGV0Yy4gZXRjLlxudmFyIGdvYWxfYnJva2VuX3RyYW5zcG9ydCA9IHNldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIsIDApO1x0XHQvLyBtYXg6NFxuXG5cblxuLy8gLy8gMi4gRGVmaW5lIEJUc1xuLy8gLy8gY3JlYXRlIGdyb3VuZCBhY3Rpb25zXG5cbi8vIFRvZG8gZnJvbSBoZXJlXG4vLyBmdW5jdGlvbiBmdW5jdGlvbl9uYW1lKGFyZ3VtZW50KSB7XG4vLyBcdC8vIGJvZHkuLi5cbi8vIH1cblxuXG5mdW5jdGlvbiBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudDogQWdlbnQsIGRlc3RpbmF0aW9uOiBzdHJpbmcgPSBcIlVOS05PV05cIikge1xuXG5cdGlmKGRlc3RpbmF0aW9uID09IFwiVU5LTk9XTlwiKXtcblx0XHRsZXQgc2V0UmFuZE51bWJlciA9IGFjdGlvbihcblx0XHRcdCgpID0+IHRydWUsXG5cdFx0XHQoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID0gZ2V0UmFuZE51bWJlcigxLCAxMSksXG5cdFx0XHQwXG5cdFx0KTtcblxuXHRcdC8vIFNhc2hhIFRvZG86IFdvcmsgb24gdXNpbmcgdGhlIEFnZW50L0l0ZW0gdHlwZXMgZm9yIGRlc3RpbmF0aW9uc1xuXHRcdGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFTkdJTkVTLCAwKTtcblx0XHRsZXQgY2hvb3NlU1RPUkFHRSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDIsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gU1RPUkFHRSwgMCk7XG5cdFx0bGV0IGNob29zZURPQ1RPUlNfT0ZGSUNFID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBET0NUT1JTX09GRklDRSwgMCk7XG5cdFx0bGV0IGNob29zZUNPQ0tQSVQgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA0LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IENPQ0tQSVQsIDApO1xuXHRcdGxldCBjaG9vc2VFU0NBUEVfUE9EID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFU0NBUEVfUE9ELCAwKTtcblx0XHRsZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA2LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IFRSQU5TUE9SVF9ST09NLCAwKTtcblx0XHRsZXQgY2hvb3NlTU9OSVRPUklOR19ST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNT05JVE9SSU5HX1JPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNQUlOX0FSRUEgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA4LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BSU5fQVJFQSwgMCk7XG5cdFx0bGV0IGNob29zZUZFTV9CRURST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gOSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBGRU1fQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZU1BTEVfQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDEwLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZUJBVEhST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMTEsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQkFUSFJPT00sIDApO1xuXG5cdFx0bGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlcXVlbmNlKFtcblx0XHRcdHNldFJhbmROdW1iZXIsXG5cdFx0XHRzZWxlY3RvcihbXG5cdFx0XHRcdGNob29zZUVOR0lORVMsXG5cdFx0XHRcdGNob29zZUNPQ0tQSVQsXG5cdFx0XHRcdGNob29zZVNUT1JBR0UsXG5cdFx0XHRcdGNob29zZURPQ1RPUlNfT0ZGSUNFLFxuXHRcdFx0XHRjaG9vc2VCQVRIUk9PTSxcblx0XHRcdFx0Y2hvb3NlTUFMRV9CRURST09NLFxuXHRcdFx0XHRjaG9vc2VGRU1fQkVEUk9PTSxcblx0XHRcdFx0Y2hvb3NlTUFJTl9BUkVBLFxuXHRcdFx0XHRjaG9vc2VNT05JVE9SSU5HX1JPT00sXG5cdFx0XHRcdGNob29zZVRSQU5TUE9SVF9ST09NLFxuXHRcdFx0XHRjaG9vc2VFU0NBUEVfUE9EXG5cdFx0XHRdKVxuXHRcdF0pO1xuXHRcdHJldHVybiBzZXROZXh0RGVzdGluYXRpb247XG5cblx0fVxuXHRlbHNle1xuXHRcdGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEVOR0lORVMsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRU5HSU5FUywgMCk7XG5cdFx0bGV0IGNob29zZVNUT1JBR0UgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gU1RPUkFHRSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBTVE9SQUdFLCAwKTtcblx0XHRsZXQgY2hvb3NlRE9DVE9SU19PRkZJQ0UgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRE9DVE9SU19PRkZJQ0UsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRE9DVE9SU19PRkZJQ0UsIDApO1xuXHRcdGxldCBjaG9vc2VDT0NLUElUID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IENPQ0tQSVQsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQ09DS1BJVCwgMCk7XG5cdFx0bGV0IGNob29zZUVTQ0FQRV9QT0QgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRVNDQVBFX1BPRCwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFU0NBUEVfUE9ELCAwKTtcblx0XHRsZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gVFJBTlNQT1JUX1JPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gVFJBTlNQT1JUX1JPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNT05JVE9SSU5HX1JPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gTU9OSVRPUklOR19ST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1PTklUT1JJTkdfUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZU1BSU5fQVJFQSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBNQUlOX0FSRUEsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gTUFJTl9BUkVBLCAwKTtcblx0XHRsZXQgY2hvb3NlRkVNX0JFRFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRkVNX0JFRFJPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRkVNX0JFRFJPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNQUxFX0JFRFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gTUFMRV9CRURST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZUJBVEhST09NID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEJBVEhST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEJBVEhST09NLCAwKTtcblxuXG5cdFx0bGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlbGVjdG9yKFtcblx0XHRcdGNob29zZUVOR0lORVMsXG5cdFx0XHRjaG9vc2VDT0NLUElULFxuXHRcdFx0Y2hvb3NlU1RPUkFHRSxcblx0XHRcdGNob29zZURPQ1RPUlNfT0ZGSUNFLFxuXHRcdFx0Y2hvb3NlQkFUSFJPT00sXG5cdFx0XHRjaG9vc2VNQUxFX0JFRFJPT00sXG5cdFx0XHRjaG9vc2VGRU1fQkVEUk9PTSxcblx0XHRcdGNob29zZU1BSU5fQVJFQSxcblx0XHRcdGNob29zZU1PTklUT1JJTkdfUk9PTSxcblx0XHRcdGNob29zZVRSQU5TUE9SVF9ST09NLFxuXHRcdFx0Y2hvb3NlRVNDQVBFX1BPRFxuXHRcdF0pO1xuXG5cdFx0cmV0dXJuIHNldE5leHREZXN0aW5hdGlvbjtcblx0fVxuXG59XG5cblxubGV0IHNldERlc3RpbmF0aW9uUHJlY29uZEZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50KXtcblx0bGV0IHNldERlc3RpbmF0aW9uUHJlY29uZDogUHJlY29uZGl0aW9uID0gKCkgPT4gaXNVbmRlZmluZWQoYWdlbnQuZGVzdGluYXRpb24pIHx8IGFnZW50LmRlc3RpbmF0aW9uID09IGFnZW50LmN1cnJlbnRMb2NhdGlvbjtcblx0cmV0dXJuIHNldERlc3RpbmF0aW9uUHJlY29uZDtcdFxufVxuXG4vLyAvLyBjcmVhdGUgYmVoYXZpb3IgdHJlZXNcblxuXG5sZXQgZ290b05leHRMb2NhdGlvbkZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50KXtcblx0cmV0dXJuICBhY3Rpb24oXG5cdFx0KCkgPT4gdHJ1ZSxcblx0XHQoKSA9PiB7XG5cdFx0XHRhZ2VudC5jdXJyZW50TG9jYXRpb24gPSBnZXROZXh0TG9jYXRpb24oYWdlbnQuY3VycmVudExvY2F0aW9uLCBhZ2VudC5kZXN0aW5hdGlvbik7XG5cdFx0XHRjb25zb2xlLmxvZyhhZ2VudCwgXCIgYXQ6IFwiLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdH0sXG5cdFx0MFxuXHQpO1xufVxuXG5cbmxldCBsYXN0U2VlbkJ5QWdlbnQgPSBmdW5jdGlvbihhZ2VudCl7XG5cdHJldHVybiBzZXF1ZW5jZShbXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0YWN0aW9uKFxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uID09IHdpcmVzMS5jdXJyZW50TG9jYXRpb24sXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudCwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuXHRcdFx0XHRcdC8vZWZmZWN0XG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gSXRlbTogd2lyZXMxIHwgTG9jYXRpb246IFwiKyBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coYWdlbnROYW1lICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMSB8IExvY2F0aW9uOiBcIisgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSk7XG5cdFx0XHRcdFx0XHQvLyBzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczFcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXG5cdFx0XHRcdFx0XHRhZ2VudC5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXG5cdFx0XHRcdFx0MFxuXHRcdFx0XHQpLFxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXG5cdFx0XSksXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0YWN0aW9uKFxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uID09IHdpcmVzMi5jdXJyZW50TG9jYXRpb24sXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMyLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcblx0XHRcdFx0XHQvL2VmZmVjdFxuXHRcdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50ICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMiB8IExvY2F0aW9uOiBcIisgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwic2VlcyAtIEl0ZW06IHdpcmVzMiB8IExvY2F0aW9uOiBcIitnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcblx0XHRcdFx0XHRcdGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHQvLyBzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczJcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvL3RpbWUgdGFrZW5cblx0XHRcdFx0XHQwXG5cdFx0XHRcdCksXG5cdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge30sMClcblx0XHRdKSxcblx0XHRzZWxlY3RvcihbXG5cdFx0XHRhY3Rpb24oXG5cdFx0XHRcdFx0Ly9wcmVjb25kaXRpb25cblx0XHRcdFx0XHQoKSA9PiBhZ2VudC5jdXJyZW50TG9jYXRpb24gID09IGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIiksXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpLFxuXHRcdFx0XHRcdC8vZWZmZWN0XG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gUGVyc29uOiBQbGF5ZXIgfCBMb2NhdGlvbjogXCIrIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhhZ2VudE5hbWUgKyBcInNlZXMgLSBQZXJzb246IFBsYXllciB8IExvY2F0aW9uOiBcIitnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcblx0XHRcdFx0XHRcdC8vIGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHRhZ2VudC5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbigncGxheWVyJywgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdC8vIHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImxhc3RTZWVuOnBsYXllclwiLCAgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vdGltZSB0YWtlblxuXHRcdFx0XHRcdDBcblx0XHRcdFx0KSxcblx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7fSwwKVxuXHRcdF0pXG5cdF0pO1xufTtcblxuXG4vLyBsZXQgZmluZEl0ZW0gPSBhY3Rpb24oXG4vLyAgICAgKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuLy8gICAgICgpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJDYWxlYiBmb3VuZCAtIEl0ZW06IHdpcmVzMVwiKVxuXG5cbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoZWxsb1wiKTtcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcbi8vICAgICAgICAgLy8gZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiQ2FsZWIgZm91bmQgdGhlIHdpcmVzMS5cIilcbi8vICAgICB9LCBcbi8vICAgICAwXG4vLyApO1xuXG4vLyBsZXQgZWF0UGxheWVyID0gYWN0aW9uKCgpID0+IGdldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSxcbi8vICAgICAoKSA9PiB7XG4vLyAgICAgICAgIHNldFZhcmlhYmxlKFwiZW5kR2FtZVwiLCBcImxvc2VcIik7XG4vLyAgICAgICAgIHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBcIk5BXCIpO1xuLy8gICAgIH0sIDBcbi8vICk7XG5cbi8vdGhpcyBtZXNzXG4vLyBsZXQgY29udmVyc2F0aW9uID0gYWN0aW9uKCgpID0+IGdldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSxcbi8vICAgICAoKSA9PiB7XG4vLyAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgaGFwcGVuIHRvIHJ1biBpbnRvIENhbGViLlwiKSxcbi8vICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkNhbGViOiBIYXZlIHlvdSBub3QgZm91bmQgdGhlIHdpcmVzIHlldD8gRGlkIHlvdSBub3QgY2hlY2sgc3RvcmFnZT9cIiksXG4vLyAgICAgfSxcbi8vICk7XG5cbi8vIGxldCBzZWFyY2ggPSBzZWxlY3RvcihbXG4vLyAgICAgZmluZEl0ZW0sXG4vLyAgICAgc2VxdWVuY2UoW1xuLy8gICAgICAgICBzZWxlY3RvcihbXG4vLyAgICAgICAgICAgICBndWFyZChzZXREZXN0aW5hdGlvblByZWNvbmQsIHt9LCBzZXROZXh0RGVzdGluYXRpb24pLFxuLy8gICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcbi8vICAgICAgICAgICAgIH0sIHt9LCAwKVxuLy8gICAgICAgICBdKSxcbi8vICAgICAgICAgZ290b05leHRMb2NhdGlvbixcbi8vICAgICAgICAgZmluZEl0ZW1cbi8vICAgICBdKVxuLy8gXSk7XG5cbmxldCBzZWFyY2hGb3JBZ2VudCA9IGZ1bmN0aW9uKGFnZW50OiBBZ2VudCl7XG5cdGxldCBzZWFyY2ggPSBzZXF1ZW5jZShbXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0Z3VhcmQoc2V0RGVzdGluYXRpb25QcmVjb25kRm9yQWdlbnQoYWdlbnQpLCBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudCkpLFxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcblx0XHRcdH0sMClcblx0XHRdKSxcblx0XHRnb3RvTmV4dExvY2F0aW9uRm9yQWdlbnQoYWdlbnQpLFxuXHRdKTtcblxuXHRyZXR1cm4gc2VhcmNoXG59XG5cbmxldCBDYWxlYkJUID0gc2VxdWVuY2UoW1xuXHRsYXN0U2VlbkJ5QWdlbnQoQ2FsZWIpLFxuXHRzZXF1ZW5jZShbXG5cdFx0c2VhcmNoRm9yQWdlbnQoQ2FsZWIpLCBsYXN0U2VlbkJ5QWdlbnQoQ2FsZWIpXG5cdF0pXG5dKTtcblxubGV0IFF1aW5uQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlBZ2VudChRdWlubiksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChRdWlubiksIGxhc3RTZWVuQnlBZ2VudChRdWlubilcblx0XSlcbl0pO1xuXG5sZXQgTWFya0JUID0gc2VxdWVuY2UoW1xuXHRsYXN0U2VlbkJ5QWdlbnQoTWFyayksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChNYXJrKSwgbGFzdFNlZW5CeUFnZW50KE1hcmspXG5cdF0pXG5dKTtcblxubGV0IEVkZGllQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlBZ2VudChFZGRpZSksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChFZGRpZSksIGxhc3RTZWVuQnlBZ2VudChFZGRpZSlcblx0XSlcbl0pO1xuXG5sZXQgQmVhdHJpY2VCVCA9IHNlcXVlbmNlKFtcblx0bGFzdFNlZW5CeUFnZW50KEJlYXRyaWNlKSxcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaEZvckFnZW50KEJlYXRyaWNlKSwgbGFzdFNlZW5CeUFnZW50KEJlYXRyaWNlKVxuXHRdKVxuXSk7XG5cbi8vIC8vYXR0YWNoIGJlaGF2aW91ciB0cmVlcyB0byBhZ2VudHNcbmF0dGFjaFRyZWVUb0FnZW50KENhbGViLCBDYWxlYkJUKTtcbmF0dGFjaFRyZWVUb0FnZW50KFF1aW5uLCBRdWlubkJUKTtcbmF0dGFjaFRyZWVUb0FnZW50KE1hcmssIE1hcmtCVCk7XG5hdHRhY2hUcmVlVG9BZ2VudChFZGRpZSwgRWRkaWVCVCk7XG5hdHRhY2hUcmVlVG9BZ2VudChCZWF0cmljZSwgQmVhdHJpY2VCVCk7XG5cbi8vIC8vIDMuIENvbnN0cnVjdCBzdG9yeVxuLy8gLy8gY3JlYXRlIHVzZXIgYWN0aW9uc1xuXG5cbnNldFZhcmlhYmxlKFwidGhlU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiU3RvcmFnZVN0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiQ29ja3BpdFN0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIk1vbml0b3JpbmdTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiLDApO1xuXG52YXIgTWFpbkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1BSU5fQVJFQSxcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHNoaXAncyBtYWluIGFyZWEuXCIpLFxuICAgICAgICAgICAgc2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwidGhlU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSXQgd2FzIGEgc2ltcGxlIG1pc3Npb246IGxhbmQgb24gdGhlIG5ld2x5LWRpc2NvdmVyZWQgcGxhbmV0IFNpZ3Vyb24sIHRlbGVwb3J0IGNyZXcgbWVtYmVycyBkb3duIHRvIGl0cyBzdXJmYWNlLCBhbmQgc2VjdXJlIGFuZCBkb2N1bWVudCBuZXcgaW5mb3JtYXRpb24uIFBhcnQgdHdvIHdhcyB3aGVuIGV2ZXJ5dGhpbmcgd2VudCBhd3J5LiBBcyBtb3N0IG9mIHRoZSBjcmV3IGdhdGhlcmVkIGludG8gdGhlIHRyYW5zcG9ydCBiYXksIHRoZSBjb21tYW5kZXIgYW5kIGEgZmV3IG90aGVycyBzdGF5ZWQgYmVoaW5kIHRvIG1vbml0b3IgdGhlIGV4cGxvcmF0aW9uLiBUaGUgdGVsZXBvcnRhdGlvbiBwcm9jZXNzIGJlZ2FuLCB5ZXQgaW1tZWRpYXRlbHkgYSBtYXNzaXZlIHN5c3RlbXMgZmFpbHVyZSBvY2N1cnJlZC4gVGhvc2Ugd2hvIGhhZCBiZWVuIGF3YWl0aW5nIHRlbGVwb3J0YXRpb24gd2VyZSBnb25lLCBhc3N1bWVkIGRlYWQuIFRoZSBjb21tYW5kZXIgY29tZXMgdG8gYXMgdGhlIHNoaXAgaXMgcGx1bW1ldGluZyBmcm9tIG9yYml0LCB0aGVpciBjcmV3bWF0ZXMgeWVsbGluZyBhdCBlYWNoIG90aGVyLiBUaGVyZSBpcyBvbmx5IG9uZSBlc2NhcGUgcG9kIHJlbWFpbmluZy4gQXMgY29tbWFuZGVyLCB5b3UgYXJlIGVxdWlwcGVkIHdpdGggYSBzcGVjaWFsIGluZXJhY3RpdmUgbWFwIGFsbG93aW5nIHlvdSB0byBzZWUgdGhlIHBvc2l0aW9ucyBvZiB5b3VyIGNyZXdtYXRlcyBhdCBhbGwgdGltZXMuIFlvdSBtdXN0IHV0aWxpemUgdGhlIG1hcCBpbiBvcmRlciB0byB0YWtlIGNvbnRyb2wgb2YgdGhlIHNoaXAgYW5kIHJlbWFpbmluZyBjcmV3IHRvIHNhdmUgZXZlcnlvbmUgZnJvbSBjZXJ0YWluIGRlYXRoLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgc2hpcCdzIG1haW4gYXJlYS5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiR28gbm9ydGggdG8gZW50ZXIgdGhlIGVuZ2luZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRU5HSU5FUykpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIG5vcnRoZWFzdCB0byBlbnRlciB0aGUgc3RvcmFnZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgU1RPUkFHRSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIGVhc3QgdG8gZW50ZXIgdGhlIGNvY2twaXQuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT0NLUElUKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGhlYXN0IHRvIGVudGVyIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBET0NUT1JTX09GRklDRSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHNvdXRoIGludG8gdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1PTklUT1JJTkdfUk9PTSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHNvdXRoIGludG8gdGhlIHRyYW5zcG9ydCByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVFJBTlNQT1JUX1JPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBzb3V0aHdlc3QgdG8gZW50ZXIgdGhlIGVzY2FwZSBwb2QuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFU0NBUEVfUE9EKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gd2VzdCB0byBlbnRlciB0aGUgYmF0aHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQVRIUk9PTSkpLFxuXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKE1haW5CVCk7XG5cbnZhciBFbmdpbmVCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBFTkdJTkVTLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRzZWxlY3RvcihbXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFbmdpbmVTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgZW5naW5lIHJvb20gaXMgd2hlcmUgQmVhdHJpY2Ugc3BlbmRzIG1vc3Qgb2YgaGVyIHRpbWUuIFNoZeKAmXMgYSBuYXR1cmFsIHdoZW4gaXQgY29tZXMgdG8gcHJvYmxlbSBzb2x2aW5nLCBidXQgaGVyIHVuYXBwcm9hY2hhYmxlIGFuZCB1bmZyaWVuZGx5IHBlcnNvbmFsaXR5IHR1cm5lZCBtYW55IGluZmx1ZW50aWFsIGNvbW1hbmRlcnMgYXdheSBmcm9tIGhlci4gRGVzcGl0ZSBoZXIgcGVyc29uYWxpdHksIGhlciBlbmdpbmVlcmluZyBza2lsbHMgYXJlIHNlY29uZC10by1ub25lLi4uZ3JhbnRlZCBzaGUgaXMgdGhlIG9ubHkgZW5naW5lZXIgbGVmdC5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFbmdpbmVTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZW5naW5lIHJvb20uXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkhlYWQgZWFzdCBpbnRvIHRoZSBzdG9yYWdlIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBTVE9SQUdFKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdC8vT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShFbmdpbmVCVCk7XG5cbnZhciBTdG9yYWdlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gU1RPUkFHRSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU3RvcmFnZVN0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBzdG9yYWdlIHJvb20gaXMgd2hlcmUgRWRkaWUgc3BlbmRzIGhpcyB0aW1lIGFuZCBzdG9yZXMgaGlzIGphbml0b3IgZXF1aXBtZW50LiBPbGQgYXMgaGUgaXMsIGhlIHN0aWxsIGRvZXMgaGlzIGJlc3QgdG8gY29udHJpYnV0ZSB0byB0aGUgdGVhbSBpbiB3aGF0ZXZlciB3YXkgaGUgY2FuLCBkZXNwaXRlIGxhY2tpbmcgdGVjaG5pY2FsIHNraWxscyB0aGUgb3RoZXIgY3Jld21hdGVzIGVtcGxveS4gQWx0aG91Z2ggaGUgaXMgYSB3ZWxsLWtub3duIGhlcm8gYW1vbmcgbWlsaXRhcnkgcGVyc29ubmVsLCBoaXMgY3Jld21hdGVzIGNvbnRpbnVlIHRvIHJlbWFpbiBvYmxpdmlvdXMgdG8gdGhlIGZhY3QgdGhhdCB0aGUgbWFuIHdobyBzY3J1YnMgdGhlaXIgdG9pbGV0cyBoYWQgYmVlbiBvbmUgb2YgdGhlIG1vc3QgYWNjb21wbGlzaGVkIG1pbGl0YXJ5IG9mZmljZXJzIHRoZSB1bml2ZXJzZSBoYWQgZXZlciBzZWVuLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiU3RvcmFnZVN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU3RvcmFnZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmVkIGludG8gdGhlIHN0b3JhZ2Ugcm9vbS5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBpbnRvIHRoZSBlbmdpbmUgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEVOR0lORVMpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Ly9PcHRpb25hbFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKFN0b3JhZ2VCVCk7XG5cbnZhciBEck9mZmljZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IERPQ1RPUlNfT0ZGSUNFLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRzZWxlY3RvcihbXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEck9mZmljZVN0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkRyLiBRdWlubiBzcGVuZHMgYSBsb3Qgb2YgdGltZSBpbiBoZXIgb2ZmaWNlIGxvb2tpbmcgYWZ0ZXIgcGF0aWVudHMuIFNoZSBwdXRzIGFsbCBvdGhlcnMgYWJvdmUgaGVyc2VsZjsgc2hlIGlzIGNvbnN0YW50bHkgY29uY2VybmVkIHdpdGggdGhlIHdlbGwtYmVpbmcgb2YgaGVyIGNyZXdtYXRlcy4gVGhlIHByb3NwZWN0IG9mIGhlciBwYXRpZW50cyBkeWluZyBzdGlsbCBrZWVwcyBoZXIgdXAgYXQgbmlnaHQsIGJ1dCBoZXIgZGV0ZXJtaW5hdGlvbiB0byBzYXZlIGFzIG1hbnkgcGVvcGxlIGFzIHNoZSBjYW4gaXMgd2hhdCBrZWVwcyBoZXIgZ29pbmcuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEck9mZmljZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgaW50byB0aGUgY29ja3BpdC5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIENPQ0tQSVQpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyB0byB0aGUgbW9uaXRvcmluZyByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTU9OSVRPUklOR19ST09NKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoRHJPZmZpY2VCVCk7XG5cbnZhciBDb2NrcGl0QlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQ09DS1BJVCxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ29ja3BpdFN0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBjb2NrcGl0IGlzIHdoZXJlIFRheWxvciBwaWxvdHMgdGhlIHNoaXAsIGJ1dCBDYWxlYiBzcGVuZHMgYSBsb3Qgb2YgaGlzIHRpbWUgdGhlcmUgYXMgd2VsbC4gQ2FsZWIgcnVucyB0aGluZ3MgdmVyeSBkaWZmZXJlbnRseSBmcm9tIFRheWxvcjsgaGUgaXMgYSBkZW1hbmRpbmcgbGVhZGVyIHdobyBoYXJzaGx5IGNyaXRpY2l6ZXMgaGlzIGNyZXdtYXRlcyB3aGVuIGZhaWx1cmVzIG9jY3VyLiBIZSBzZWNyZXRseSBsb2F0aGVzIFRheWxvcjsgdGhlaXIgcGVyc29uYWxpdGllcyBjbGFzaCBhbGwtdG9vLWZyZXF1ZW50bHksIGFuZCB0aGVpciBwb3NpdGlvbiBvbiB0aGUgc2hpcCBkZXNwaXRlIGhpcyBvbGRlciBhZ2UgaXMgYSBjb25zdGFudCBzb3VyY2Ugb2YgYW5nZXIgdG8gdGhlIG9mZmljZXIuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkNvY2twaXRTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNvY2twaXRTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGZvcndhcmQgaW50byB0aGUgY29ja3BpdC5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRE9DVE9SU19PRkZJQ0UpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuXHRcdF0pKSxcblxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKENvY2twaXRCVCk7XG5cbnZhciBNb25pdG9yaW5nQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTU9OSVRPUklOR19ST09NLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRzZWxlY3RvcihbXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNb25pdG9yaW5nU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIG1vbml0b3Jpbmcgcm9vbSBpcyBwdXJwb3NlZCB0byBzZWUgaW50byB0aGUgdHJhbnNwb3J0IHJvb20sIHRodXMgd2F0Y2hpbmcgZm9yIHNpZ25zIG9mIHRyb3VibGUgd2l0aCB0aGUgdHJhbnNwb3J0ZXIuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIk1vbml0b3JpbmdTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1vbml0b3JpbmdTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgbW9uaXRvcmluZyByb29tLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHRvIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBET0NUT1JTX09GRklDRSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHRvIHRoZSB0cmFuc3BvcnQgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRSQU5TUE9SVF9ST09NKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRcdF0pKSxcblxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKE1vbml0b3JpbmdCVCk7XG5cbnZhciBUcmFuc3BvcnRCVCA9IGd1YXJkKFxuXHQoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gVFJBTlNQT1JUX1JPT00sXG5cdHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRyYW5zcG9ydFN0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIldoZXJlIHRoZSB0cmFuc3BvcnRlciBpcyBsb2NhdGVkIGFuZCB3aGVyZSB0aGUgZmFpbHVyZSBvY2N1cnJlZC4gTWFyayBvZnRlbiB3b3JrcyBpbiBoZXJlLiBNYXJrIGlzIGFuIG9sZGVyIGNyZXdtYXRlIHdobyBhdm9pZHMgdGhlIHNwb3RsaWdodCBsaWtlIHRoZSBwbGFndWUuIEhpcyBhbnhpZXR5IGxldmVscyBzaG90IHVwIHJhcGlkbHkgYWZ0ZXIgdGhlIGZhaWx1cmUsIGFuZCBoZSBpcyBleGNlc3NpdmVseSB3b3JyaWVkIHRoYXQgdGhlIHJlc3Qgb2YgdGhlIGNyZXcgYmxhbWVzIHRoZSBmYWlsdXJlIG9uIGhpbS5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiVHJhbnNwb3J0U3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fdHJhbnNwb3J0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiKSA9PSAxLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgIFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSB0cmFuc3BvcnQgcm9vbSB3aGVyZSB0aGUgdGVsZXBvcnRlciBpcyBsb2NhdGVkLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIGludG8gdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1PTklUT1JJTkdfUk9PTSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkV4aXQgdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuXG5cdFx0XHRcdFx0XHQvLyBHb2FsIG9wdGlvbnMgZm9yIHRoZSByb29tIC0+IE9ubHkgc2hvd2luZyB0aGVzZSB3aGVuIHRoZSBtYWluIGhlbHAgdGV4dCBpcyBvZmYuIFxuXHRcdFx0XHRcdFx0c2VsZWN0b3IoW1xuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAwLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGVyZSBzZWVtcyB0byBiZSBhIHByb2JsZW0gd2l0aCB0aGUgdGVsZXBvcnRlciBzb2Z0d2FyZS4gTWF5YmUgTWFyayBjb3VsZCBjaGVjayBpdCBvdXQuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIsIDEpO1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDEsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBsb29rIGF0IHRoZSB0ZWxlcG9ydGVyIHNvZndhcmUuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMixcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGZpcnN0IHRoaW5nIHdhcyBmaXhlZCwgYnV0IG5vdyB0aGUgc2Vjb25kIHRoaW5nIGlzIGJyb2tlbj8gR28gZmluZCBFRkcgdG8gZml4IHRoZSBzYW1lLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0XHRcdFx0XSlcblx0XHRcdFx0XHRdKSxcblx0XHRcdFx0KVxuXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAgICAgLy8gZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIFxuXHRcdF0pXG5cdCk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKFRyYW5zcG9ydEJUKTtcblxudmFyIEVzY2FwZVBvZEJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEVTQ0FQRV9QT0QsXG5cdHNlcXVlbmNlKFtcblx0XHRzZWxlY3RvcihbXG4gICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVzY2FwZVN0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGVyZSBpcyBvbmx5IG9uZSBlc2NhcGUgcG9kIGFib2FyZCB0aGlzIHNoaXAuIElmIGFueSBjcmV3bWF0ZSBiZWNvbWVzIHRvbyBmZWFyZnVsIG9mIHRoZWlyIGN1cnJlbnQgc2l0dWF0aW9uLCB0aGV5IHdpbGwgYXR0ZW1wdCB0byBsZWF2ZSBpbiBpdC5cIiksXG4gICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkVzY2FwZVN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXHRdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVzY2FwZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgIFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBlc2NhcGUgcG9kLlwiKSxcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRcdFx0XSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICAvLyBPcHRpb25hbFxuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICBdKSxcblx0XSlcbik7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEVzY2FwZVBvZEJUKTtcblxudmFyIEZCZWRyb29tQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRkVNX0JFRFJPT00sXG5cdHNlcXVlbmNlKFtcblx0XHRcdC8vIHNlbGVjdG9yKFtcbiAgIC8vICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIpID09IDAsXG4gICAvLyAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgIC8vICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkl0IHdhcyBhIHNpbXBsZSBtaXNzaW9uOiBhbmQgb24gdGhlIG5ld2x5LWRpc2NvdmVyZWQgcGxhbmV0IFNpZ3Vyb24sIHRlbGVwb3J0IGNyZXcgbWVtYmVycyBkb3duIHRvIGl0cyBzdXJmYWNlLCBhbmQgc2VjdXJlIGFuZCBkb2N1bWVudCBuZXcgaW5mb3JtYXRpb24uIFBhcnQgdHdvIHdhcyB3aGVuIGV2ZXJ5dGhpbmcgd2VudCBhd3J5LiBBcyBtb3N0IG9mIHRoZSBjcmV3IGdhdGhlcmVkIGludG8gdGhlIHRyYW5zcG9ydCBiYXksIHRoZSBjb21tYW5kZXIgYW5kIGEgZmV3IG90aGVycyBzdGF5ZWQgYmVoaW5kIHRvIG1vbml0b3IgdGhlIGV4cGxvcmF0aW9uLiBUaGUgdGVsZXBvcnRhdGlvbiBwcm9jZXNzIGJlZ2FuLCB5ZXQgaW1tZWRpYXRlbHkgYSBtYXNzaXZlIHN5c3RlbXMgZmFpbHVyZSBvY2N1cnJlZC4gVGhvc2Ugd2hvIGhhZCBiZWVuIGF3YWl0aW5nIHRlbGVwb3J0YXRpb24gd2VyZSBnb25lLCBhc3N1bWVkIGRlYWQuIFRoZSBjb21tYW5kZXIgY29tZXMgdG8gYXMgdGhlIHNoaXAgaXMgcGx1bW1ldGluZyBmcm9tIG9yYml0LCBoaXMgY3Jld21hdGVzIHllbGxpbmcgYXQgZWFjaCBvdGhlci4gVGhlcmUgaXMgb25seSBvbmUgZXNjYXBlIHBvZCByZW1haW5pbmcuIFlvdSBtdXN0IHRha2UgY29udHJvbCBvZiB0aGUgc2hpcCBhbmQgcmVtYWluaW5nIGNyZXcgdG8gc2F2ZSBldmVyeW9uZSBmcm9tIGNlcnRhaW4gZGVhdGguXCIpLFxuICAgLy8gICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIsIDEpO1xuICAgLy8gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgIC8vICAgICAgICAgICAgICAgICAgXSkpLFxuXG4gICAvLyAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwidGhlU3RhcnRcIikgPT0gMSxcbiAgIC8vICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIGZlbWFsZXMnIGJlZHJvb20uXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgYmF0aHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQVRIUk9PTSkpLFxuLy8gXSkpLFxuXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAgICAgLy8gZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0Ly8gXVxuXHRcdCk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEZCZWRyb29tQlQpO1xuXG52YXIgQmF0aHJvb21CVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBCQVRIUk9PTSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0Ly8gc2VsZWN0b3IoW1xuICAgLy8gICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwidGhlU3RhcnRcIikgPT0gMCxcbiAgIC8vICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgLy8gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSXQgd2FzIGEgc2ltcGxlIG1pc3Npb246IGFuZCBvbiB0aGUgbmV3bHktZGlzY292ZXJlZCBwbGFuZXQgU2lndXJvbiwgdGVsZXBvcnQgY3JldyBtZW1iZXJzIGRvd24gdG8gaXRzIHN1cmZhY2UsIGFuZCBzZWN1cmUgYW5kIGRvY3VtZW50IG5ldyBpbmZvcm1hdGlvbi4gUGFydCB0d28gd2FzIHdoZW4gZXZlcnl0aGluZyB3ZW50IGF3cnkuIEFzIG1vc3Qgb2YgdGhlIGNyZXcgZ2F0aGVyZWQgaW50byB0aGUgdHJhbnNwb3J0IGJheSwgdGhlIGNvbW1hbmRlciBhbmQgYSBmZXcgb3RoZXJzIHN0YXllZCBiZWhpbmQgdG8gbW9uaXRvciB0aGUgZXhwbG9yYXRpb24uIFRoZSB0ZWxlcG9ydGF0aW9uIHByb2Nlc3MgYmVnYW4sIHlldCBpbW1lZGlhdGVseSBhIG1hc3NpdmUgc3lzdGVtcyBmYWlsdXJlIG9jY3VycmVkLiBUaG9zZSB3aG8gaGFkIGJlZW4gYXdhaXRpbmcgdGVsZXBvcnRhdGlvbiB3ZXJlIGdvbmUsIGFzc3VtZWQgZGVhZC4gVGhlIGNvbW1hbmRlciBjb21lcyB0byBhcyB0aGUgc2hpcCBpcyBwbHVtbWV0aW5nIGZyb20gb3JiaXQsIGhpcyBjcmV3bWF0ZXMgeWVsbGluZyBhdCBlYWNoIG90aGVyLiBUaGVyZSBpcyBvbmx5IG9uZSBlc2NhcGUgcG9kIHJlbWFpbmluZy4gWW91IG11c3QgdGFrZSBjb250cm9sIG9mIHRoZSBzaGlwIGFuZCByZW1haW5pbmcgY3JldyB0byBzYXZlIGV2ZXJ5b25lIGZyb20gY2VydGFpbiBkZWF0aC5cIiksXG4gICAvLyAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwidGhlU3RhcnRcIiwgMSk7XG4gICAvLyAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgLy8gICAgICAgICAgICAgICAgICBdKSksXG5cbiAgIC8vICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiKSA9PSAxLFxuICAgLy8gICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgaW50byB0aGUgYmF0aHJvb20uXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgc291dGggaW50byB0aGUgbWFsZXMnIGJlZHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUxFX0JFRFJPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIG5vcnRoIGludG8gdGhlIGZlbWFsZXMnIGJlZHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBGRU1fQkVEUk9PTSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcbi8vIF0pKSxcblxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdC8vIF1cblx0XHQpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShCYXRocm9vbUJUKTtcblxudmFyIE1CZWRyb29tQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTUFMRV9CRURST09NLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHQvLyBzZWxlY3RvcihbXG4gICAvLyAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiKSA9PSAwLFxuICAgLy8gICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAvLyAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJJdCB3YXMgYSBzaW1wbGUgbWlzc2lvbjogYW5kIG9uIHRoZSBuZXdseS1kaXNjb3ZlcmVkIHBsYW5ldCBTaWd1cm9uLCB0ZWxlcG9ydCBjcmV3IG1lbWJlcnMgZG93biB0byBpdHMgc3VyZmFjZSwgYW5kIHNlY3VyZSBhbmQgZG9jdW1lbnQgbmV3IGluZm9ybWF0aW9uLiBQYXJ0IHR3byB3YXMgd2hlbiBldmVyeXRoaW5nIHdlbnQgYXdyeS4gQXMgbW9zdCBvZiB0aGUgY3JldyBnYXRoZXJlZCBpbnRvIHRoZSB0cmFuc3BvcnQgYmF5LCB0aGUgY29tbWFuZGVyIGFuZCBhIGZldyBvdGhlcnMgc3RheWVkIGJlaGluZCB0byBtb25pdG9yIHRoZSBleHBsb3JhdGlvbi4gVGhlIHRlbGVwb3J0YXRpb24gcHJvY2VzcyBiZWdhbiwgeWV0IGltbWVkaWF0ZWx5IGEgbWFzc2l2ZSBzeXN0ZW1zIGZhaWx1cmUgb2NjdXJyZWQuIFRob3NlIHdobyBoYWQgYmVlbiBhd2FpdGluZyB0ZWxlcG9ydGF0aW9uIHdlcmUgZ29uZSwgYXNzdW1lZCBkZWFkLiBUaGUgY29tbWFuZGVyIGNvbWVzIHRvIGFzIHRoZSBzaGlwIGlzIHBsdW1tZXRpbmcgZnJvbSBvcmJpdCwgaGlzIGNyZXdtYXRlcyB5ZWxsaW5nIGF0IGVhY2ggb3RoZXIuIFRoZXJlIGlzIG9ubHkgb25lIGVzY2FwZSBwb2QgcmVtYWluaW5nLiBZb3UgbXVzdCB0YWtlIGNvbnRyb2wgb2YgdGhlIHNoaXAgYW5kIHJlbWFpbmluZyBjcmV3IHRvIHNhdmUgZXZlcnlvbmUgZnJvbSBjZXJ0YWluIGRlYXRoLlwiKSxcbiAgIC8vICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiLCAxKTtcbiAgIC8vICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAvLyAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgLy8gICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIpID09IDEsXG4gICAvLyAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBpbnRvIHRoZSBtYWxlcycgYmVkcm9vbS5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIGJhdGhyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkFUSFJPT00pKSxcbi8vIF0pKSxcblxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdC8vIF1cblx0XHQpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShNQmVkcm9vbUJUKTtcblxudmFyIHdpcmVzMUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IHdpcmVzMS5jdXJyZW50TG9jYXRpb24sIC8vICBnZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiKVxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugbm90aWNlIHdpcmVzIG9uIHRoZSBncm91bmQuXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvblRyZWUoXCJQaWNrIHVwIHRoZSB3aXJlcy5cIixcblx0XHRcdFx0c2VxdWVuY2UoW1xuXHRcdFx0XHRcdGFjdGlvbigoKT0+dHJ1ZSwgKCkgPT4ge1xuXHRcdFx0XHRcdFx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgd2lyZXMuXCIpO1xuXHRcdFx0XHRcdFx0c2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIik7XG5cdFx0XHRcdFx0XHRzZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCwgZ2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQpICsgMSk7XG5cdFx0XHRcdFx0fSwgMCksXG5cdFx0XHRcdFx0Ly8gYWN0aW9uKCgpPT50cnVlLCAoKSA9PiB7XG5cdFx0XHRcdFx0Ly8gICAgIGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiV293IHlvdSBrbm93IGhvdyB0byBwaWNrIHVwIHRoaW5ncy5cIil9LCAwKVxuXHRcdFx0XHRdKVxuXHRcdFx0KVxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHdpcmVzMUJUKTtcblxudmFyIHdpcmVzMkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IHdpcmVzMi5jdXJyZW50TG9jYXRpb24sIC8vIGdldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugbm90aWNlIHdpcmVzIG9uIHRoZSBncm91bmQuXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIlBpY2sgdXAgdGhlIHdpcmVzLlwiLCAoKSA9PiB7XG5cdFx0XHRcdGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiWW91IHBpY2sgdXAgdGhlIHdpcmVzLlwiKTtcblx0XHRcdFx0c2V0SXRlbVZhcmlhYmxlKHdpcmVzMiwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIik7XG5cdFx0XHRcdHNldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkLCBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkgKyAxKTtcblx0XHRcdH0pXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUod2lyZXMyQlQpO1xuXG5cbi8vIC8vNC4gUnVuIHRoZSB3b3JsZFxuaW5pdGlhbGl6ZSgpO1xudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCgpO1xuXG4vLyAvL1JFTkRFUklORy0tLS0tXG52YXIgZGlzcGxheVBhbmVsID0ge3g6IDI1MCwgeTogMH07XG52YXIgdGV4dFBhbmVsID0ge3g6IDI3MCwgeTogNTAxfTtcbnZhciBhY3Rpb25zUGFuZWwgPSB7eDogNTIwLCB5OiA1NTB9O1xuXG52YXIgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheScpO1xudmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxudmFyIHNwYWNlc2hpcEltYWdlID0gbmV3IEltYWdlKCk7XG5zcGFjZXNoaXBJbWFnZS5vbmxvYWQgPSByZW5kZXI7XG52YXIgcGxheWVySW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBjYWxlYkltYWdlID0gbmV3IEltYWdlKCk7XG52YXIgcXVpbm5JbWFnZSA9IG5ldyBJbWFnZSgpO1xudmFyIG1hcmtJbWFnZSA9IG5ldyBJbWFnZSgpO1xudmFyIGVkZGllSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBiZWF0cmljZUltYWdlID0gbmV3IEltYWdlKCk7XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcblx0Y29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0Y29udGV4dC5kcmF3SW1hZ2Uoc3BhY2VzaGlwSW1hZ2UsIGRpc3BsYXlQYW5lbC54LCBkaXNwbGF5UGFuZWwueSwgMTAwMCwgNTAwKTtcblx0ZGlzcGxheVBsYXllcigpO1xuXHRkaXNwbGF5Q2FsZWIoKTtcblx0ZGlzcGxheVF1aW5uKCk7XG5cdGRpc3BsYXlNYXJrKCk7XG5cdGRpc3BsYXlFZGRpZSgpO1xuXHRkaXNwbGF5QmVhdHJpY2UoKTtcblx0ZGlzcGxheVRleHRBbmRBY3Rpb25zKCk7XG59XG5cbnZhciBtYXBQb3NpdGlvbnMgPSB7XG5cdFwiRU5HSU5FU1wiOiB7eDogMjg1LCB5OiAxMDh9LFxuXHRcIkNPQ0tQSVRcIjoge3g6IDg2MCwgeTogMjMwfSxcblx0XCJTVE9SQUdFXCI6IHt4OiA1NTAsIHk6IDEwNn0sXG5cdFwiRE9DVE9SUyBPRkZJQ0VcIjoge3g6IDcyNSwgeTogMzUwfSxcblx0XCJNQUlOIEFSRUFcIjoge3g6IDQ4MCwgeTogMjQwfSxcblx0XCJFU0NBUEUgUE9EXCI6IHt4OiAyMjQsIHk6IDQwOH0sXG5cdFwiVFJBTlNQT1JUIFJPT01cIjoge3g6IDM3MCwgeTogMzU4fSxcblx0XCJNT05JVE9SSU5HIFJPT01cIjoge3g6IDUzNSwgeTogMzYwfSxcblx0XCJCQVRIUk9PTVwiOiB7eDogODUsIHk6IDI0MH0sXG5cdFwiTUFMRSBCRURST09NXCI6IHt4OiA4NSwgeTogMzMwfSxcblx0XCJGRU0gQkVEUk9PTVwiOiB7eDogODUsIHk6IDE1MH1cbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlQbGF5ZXIoKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbik7XG5cdGlmICghaXNVbmRlZmluZWQobWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0pKVxuXHRcdGNvbnRleHQuZHJhd0ltYWdlKHBsYXllckltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUNhbGViKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gQ2FsZWIuY3VycmVudExvY2F0aW9uO1xuXHRjb250ZXh0LmRyYXdJbWFnZShjYWxlYkltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVF1aW5uKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gUXVpbm4uY3VycmVudExvY2F0aW9uO1xuXHRjb250ZXh0LmRyYXdJbWFnZShxdWlubkltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheU1hcmsoKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBNYXJrLmN1cnJlbnRMb2NhdGlvbjtcblx0Y29udGV4dC5kcmF3SW1hZ2UobWFya0ltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUVkZGllKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gRWRkaWUuY3VycmVudExvY2F0aW9uO1xuXHRjb250ZXh0LmRyYXdJbWFnZShlZGRpZUltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUJlYXRyaWNlKCkge1xuXHR2YXIgY3VyckxvY2F0aW9uID0gQmVhdHJpY2UuY3VycmVudExvY2F0aW9uO1xuXHRjb250ZXh0LmRyYXdJbWFnZShiZWF0cmljZUltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcbn1cblxuc3BhY2VzaGlwSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvc2hpcC5wbmdcIjtcbnBsYXllckltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL1RheWxvcjMucG5nXCI7XG5jYWxlYkltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL0NhbGViLnBuZ1wiO1xucXVpbm5JbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9RdWlubi5wbmdcIjtcbm1hcmtJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9NYXJrLnBuZ1wiO1xuZWRkaWVJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9FZGRpZS5wbmdcIjtcbmJlYXRyaWNlSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvQmVhdHJpY2UucG5nXCI7XG5cbnZhciBjdXJyZW50U2VsZWN0aW9uO1xudmFyIHlPZmZzZXQgPSBhY3Rpb25zUGFuZWwueSArIDI1O1xudmFyIHlPZmZzZXRJbmNyZW1lbnQgPSAyNTtcblxuXG5cbmZ1bmN0aW9uIHdyYXBUZXh0KHRleHQpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiV3JhcCBUZXh0XCIpO1xuICAgIHZhciB3YT10ZXh0LnNwbGl0KFwiIFwiKSxcbiAgICAgICAgcGhyYXNlQXJyYXk9W10sXG4gICAgICAgIGxhc3RQaHJhc2U9d2FbMF0sXG4gICAgICAgIG1lYXN1cmU9MCxcbiAgICAgICAgc3BsaXRDaGFyPVwiIFwiO1xuICAgIGlmICh3YS5sZW5ndGggPD0gMSkge1xuICAgICAgICByZXR1cm4gd2FcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpPTE7aTx3YS5sZW5ndGg7aSsrKSB7XG4gICAgICAgIHZhciB3PXdhW2ldO1xuICAgICAgICBtZWFzdXJlPWNvbnRleHQubWVhc3VyZVRleHQobGFzdFBocmFzZStzcGxpdENoYXIrdykud2lkdGg7XG4gICAgICAgIGlmIChtZWFzdXJlPDEwMDApIHtcbiAgICAgICAgICAgIGxhc3RQaHJhc2UrPShzcGxpdENoYXIrdyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwaHJhc2VBcnJheS5wdXNoKGxhc3RQaHJhc2UpO1xuICAgICAgICAgICAgbGFzdFBocmFzZT13O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpPT09d2EubGVuZ3RoLTEpIHtcbiAgICAgICAgICAgIHBocmFzZUFycmF5LnB1c2gobGFzdFBocmFzZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBwaHJhc2VBcnJheTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRleHRBbmRBY3Rpb25zKCkge1xuXHRjb250ZXh0LmNsZWFyUmVjdCh0ZXh0UGFuZWwueCwgdGV4dFBhbmVsLnksIDUwMCwgMTAwMCk7XG5cdFxuXG5cdGNvbnRleHQuZm9udCA9IFwiMTVwdCBDYWxpYnJpXCI7XG5cdGNvbnRleHQuZmlsbFN0eWxlID0gJ3BpbmsnO1xuXHRjb25zb2xlLmxvZyhcIkFjdGlvbnMgZWZmZWN0IHRleHQ6IFwiICsgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0KTtcblx0dmFyIHRleHRUb0Rpc3BsYXkgPSB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQubGVuZ3RoICE9IDAgPyB3cmFwVGV4dCh1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQpIDogd3JhcFRleHQodXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQpO1xuXG5cblx0Ly8gY29uc29sZS5sb2codGV4dFRvRGlzcGxheSk7XG5cdGFjdGlvbnNQYW5lbC55ID0gdGV4dFRvRGlzcGxheS5sZW5ndGgqMjUrdGV4dFBhbmVsLnkrMjA7XG5cdHlPZmZzZXQgPSBhY3Rpb25zUGFuZWwueSArIDI1O1xuXG5cdGZvcih2YXIgaT0wOyBpPHRleHRUb0Rpc3BsYXkubGVuZ3RoOyBpKyspe1xuXHRcdFx0Y29udGV4dC5maWxsVGV4dCh0ZXh0VG9EaXNwbGF5W2ldLCB0ZXh0UGFuZWwueCwgdGV4dFBhbmVsLnkrMjUqaSsyMCk7XHRcblx0fVxuXHRcblxuXHRjb250ZXh0LmZvbnQgPSBcIjE1cHQgQ2FsaWJyaVwiO1xuXHRjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB1c2VyQWN0aW9uVGV4dCA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHRbaV07XG5cdFx0Y29udGV4dC5maWxsVGV4dCh1c2VyQWN0aW9uVGV4dCwgYWN0aW9uc1BhbmVsLnggKyAyMCwgeU9mZnNldCk7XG5cdFx0aWYgKGkgPT0gMCkge1xuXHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IGk7XG5cdFx0fVxuXHRcdHlPZmZzZXQgKz0geU9mZnNldEluY3JlbWVudDtcblx0fVxuXG5cdGRpc3BsYXlBcnJvdygpO1xuXHRjb25zb2xlLmxvZyhcIndpcmVzOiBcIiArIGdldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkKSk7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlBcnJvdygpIHtcblx0aWYodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCl7XG5cdFx0Y29udGV4dC5jbGVhclJlY3QoYWN0aW9uc1BhbmVsLngsIGFjdGlvbnNQYW5lbC55LCAyMCwgMTAwMCk7XG5cdFx0Y29udGV4dC5maWxsVGV4dChcIj4gXCIsIDUyMCwgYWN0aW9uc1BhbmVsLnkgKyAyNSArIChjdXJyZW50U2VsZWN0aW9uICogeU9mZnNldEluY3JlbWVudCkpO1xuXHR9XG59XG5cbi8vVXNlciBpbnB1dFxuZnVuY3Rpb24ga2V5UHJlc3MoZSkge1xuXHRpZiAoZS5rZXlDb2RlID09IDEzKSB7XG5cdFx0dmFyIHNlbGVjdGVkQWN0aW9uID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dFtjdXJyZW50U2VsZWN0aW9uXTtcblx0XHRpZighaXNVbmRlZmluZWQoc2VsZWN0ZWRBY3Rpb24pKXtcblx0XHRcdGV4ZWN1dGVVc2VyQWN0aW9uKHNlbGVjdGVkQWN0aW9uKTtcblx0XHRcdHdvcmxkVGljaygpO1xuXHRcdFx0cmVuZGVyKCk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGtleURvd24oZSkge1xuXHRpZiAoZS5rZXlDb2RlID09IDQwKSB7Ly9kb3duXG5cdFx0aWYgKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApIHtcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24rKztcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSBjdXJyZW50U2VsZWN0aW9uICUgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGg7XG5cdFx0XHRkaXNwbGF5QXJyb3coKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IDM4KSB7Ly91cFxuXHRcdGlmICh1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKSB7XG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uLS07XG5cdFx0XHRpZiAoY3VycmVudFNlbGVjdGlvbiA8IDApXG5cdFx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAtIDE7XG5cdFx0XHRkaXNwbGF5QXJyb3coKTtcblx0XHR9XG5cdH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGtleVByZXNzLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlEb3duLCBmYWxzZSk7IiwiaW1wb3J0IFF1ZXVlIGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL1F1ZXVlXCI7XG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsXCI7XG5cbmludGVyZmFjZSBEaWN0aW9uYXJ5PFQ+IHsgW2tleTogc3RyaW5nXTogVDsgfVxuXG5leHBvcnQgZW51bSBTdGF0dXMge1xuICAgIFJVTk5JTkcsXG4gICAgU1VDQ0VTUyxcbiAgICBGQUlMVVJFXG59XG5cbmZ1bmN0aW9uIHRlcm1pbmF0ZUFuZFJldHVybihpZDogbnVtYmVyLCBibGFja2JvYXJkOiBhbnksIHN0YXR1czogU3RhdHVzKSB7XG4gICAgZGVsZXRlIGJsYWNrYm9hcmRbaWRdO1xuICAgIHJldHVybiBzdGF0dXM7XG59XG5cbmV4cG9ydCB0eXBlIEVmZmVjdCA9ICgpID0+IHZvaWRcbmV4cG9ydCB0eXBlIFByZWNvbmRpdGlvbiA9ICgpID0+IGJvb2xlYW5cbmV4cG9ydCB0eXBlIFRpY2sgPSAoKSA9PiBTdGF0dXNcbmV4cG9ydCB0eXBlIEFjdGlvblRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKSA9PiBUaWNrXG4vKipcbiAqIFRoZSBndWFyZCB0aWNrIGlzIHRvIGFkZCBhIHByZWNvbmRpdGlvbiB0byB0aGUgY29tcG9zaXRlIHRpY2tzXG4gKi9cbmV4cG9ydCB0eXBlIEd1YXJkVGljayA9IChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljaywgbmVnYXRlPzogYm9vbGVhbikgPT4gVGlja1xuLyoqXG4gKiBTZXF1ZW5jZS9TZWxlY3RvclxuICovXG5leHBvcnQgdHlwZSBDb21wb3NpdGVUaWNrID0gKGFzdFRpY2tzOiBUaWNrW10pID0+IFRpY2tcblxudmFyIGJsYWNrYm9hcmQgPSB7fTtcblxuZnVuY3Rpb24gZ2V0QWN0aW9uVGljayhpZDogbnVtYmVyKTogQWN0aW9uVGljayB7XG4gICAgcmV0dXJuIChwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZCA9IDEpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwcmVjb25kaXRpb24oKSkge1xuICAgICAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lID0gdGlja3NSZXF1aXJlZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYmxhY2tib2FyZFtpZF0udGlja3NEb25lID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS50aWNrc0RvbmUtLTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLkZBSUxVUkU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEd1YXJkVGljaygpOiBHdWFyZFRpY2sge1xuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBhc3RUaWNrLCBuZWdhdGUgPSBmYWxzZSkgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHByb2NlZWQgPSBuZWdhdGUgPyAhcHJlY29uZGl0aW9uKCkgOiBwcmVjb25kaXRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBwcm9jZWVkID8gZXhlY3V0ZShhc3RUaWNrKSA6IFN0YXR1cy5GQUlMVVJFO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRTZXF1ZW5jZVRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdG9yVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZFN0YXR1cyA9IGV4ZWN1dGUoYXN0VGlja3NbYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4XSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGUoYXN0VGljazogVGljayk6IFN0YXR1cyB7XG4gICAgcmV0dXJuIGFzdFRpY2soKTtcbn1cblxudmFyIGdsb2JhbElkQ291bnRlciA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb24ocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKTogVGljayB7XG4gICAgcmV0dXJuIGdldEFjdGlvblRpY2soZ2xvYmFsSWRDb3VudGVyKyspKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ19ndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2ssIHRydWUpO1xufVxuXG4vKipcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gc3VjY2VzcyBvZiBhIGNoaWxkXG4gKiBTdWNjZWVkcyBpZiBhbGwgc3VjY2VlZCwgZWxzZSBmYWlsc1xuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXG4gKiBAcmV0dXJucyB7VGlja31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0U2VxdWVuY2VUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XG59XG5cbi8qKlxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBmYWlsdXJlIG9mIGEgY2hpbGQodGhpbmsgb2YgaXQgYXMgaWYtZWxzZSBibG9ja3MpXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXG4gKiBAcmV0dXJucyB7VGlja31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdG9yKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0U2VsZWN0b3JUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XG59XG5cblxuLyotLS0tLS0tLS0tLS0tLS0gQVBJcyAtLS0tLS0tLS0tLS0tLS0gKi9cblxuLy8wLiB1dGlsaXRpZXNcbi8vIG1pbiBhbmQgbWF4IGFyZSBpbmNsdXNpdmVcbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kTnVtYmVyKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG59XG5cbi8vMS4gc3RvcnkgaW5zdGFuY2VcblxuLy8xLjEgbG9jYXRpb25zXG4vLyB2YXIgbG9jYXRpb25HcmFwaDogRGljdGlvbmFyeTxMb2NhdGlvbj4gPSB7fTtcblxudmFyIGxvY2F0aW9uR3JhcGggPSB7fTtcblxuLy8gLy8gXG4vLyBjbGFzcyBMb2NhdGlvbiB7XG4vLyAgICAgYWRqYWNlbnRMb2NhdGlvbnM6IERpY3Rpb25hcnk8TG9jYXRpb25bXT47XG5cbi8vICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcbi8vICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuLy8gICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50TG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgICAgICAgICBpZihhZGphY2VudExvY2F0aW9uc1tpXSBpbiBsb2NhdGlvbkdyYXBoKXtcblxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgZWxzZXtcbi8vICAgICAgICAgICAgICAgICB2YXIgbmV3X2xvY2F0aW9uID0gbmV3IExvY2F0aW9uKClcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuXG4vLyAgICAgfVxuLy8gfVxuXG5cbi8vYWRkIHRvIGJvdGggc2lkZXNcbmV4cG9ydCBmdW5jdGlvbiBhZGRMb2NhdGlvbihsb2NhdGlvbk5hbWU6IHN0cmluZywgYWRqYWNlbnRMb2NhdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9PSB1bmRlZmluZWQpXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IFtdO1xuICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXS5jb25jYXQoYWRqYWNlbnRMb2NhdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPSBbXTtcblxuICAgICAgICBsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXS5wdXNoKGxvY2F0aW9uTmFtZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJlQWRqYWNlbnQobG9jYXRpb24xOiBzdHJpbmcsIGxvY2F0aW9uMjogc3RyaW5nKTpib29sZWFuIHtcbiAgICBjb25zb2xlLmxvZyhcIkFyZSBhZGphY2VudDogXCIgKyBsb2NhdGlvbjEgKyBcIiwgXCIrbG9jYXRpb24yKTtcbiAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdID09IHVuZGVmaW5lZCB8fCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMl0gPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJFaXRoZXIgb25lL2JvdGggbG9jYXRpb25zIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV1baV0gPT0gbG9jYXRpb24yKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy9wYXRoZmluZGluZyBwcmltaXRpdmVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dExvY2F0aW9uKHN0YXJ0OiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhciB2aXNpdGVkID0ge307XG4gICAgdmFyIHByZXZpb3VzID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIGxvY2F0aW9uR3JhcGgpIHtcbiAgICAgICAgdmlzaXRlZFtrZXldID0gZmFsc2U7XG4gICAgfVxuICAgIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcblxuICAgIHZhciBteVF1ZXVlID0gbmV3IFF1ZXVlPHN0cmluZz4oKTtcbiAgICBteVF1ZXVlLmVucXVldWUoc3RhcnQpO1xuXG4gICAgd2hpbGUgKCFteVF1ZXVlLmlzRW1wdHkoKSkge1xuICAgICAgICB2YXIgY3VycmVudDogc3RyaW5nID0gbXlRdWV1ZS5kZXF1ZXVlKCk7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IGxvY2F0aW9uR3JhcGhbY3VycmVudF07XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdmlzaXRlZFtuZWlnaGJvcnNbaV1dKSB7XG4gICAgICAgICAgICAgICAgbXlRdWV1ZS5lbnF1ZXVlKG5laWdoYm9yc1tpXSk7XG4gICAgICAgICAgICAgICAgdmlzaXRlZFtuZWlnaGJvcnNbaV1dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1tuZWlnaGJvcnNbaV1dID0gY3VycmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBkZXN0aW5hdGlvbjtcbiAgICBpZiAoY3VycmVudCA9PSBzdGFydClcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgd2hpbGUgKHByZXZpb3VzW2N1cnJlbnRdICE9IHN0YXJ0KSB7XG4gICAgICAgIGN1cnJlbnQgPSBwcmV2aW91c1tjdXJyZW50XTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudDtcbn1cblxuLy8xLjIgYWdlbnRzXG5cbmV4cG9ydCBjbGFzcyBBZ2VudCB7XG4gICAgY3VycmVudExvY2F0aW9uOiBzdHJpbmc7XG4gICAgZGVzdGluYXRpb246IHN0cmluZztcbiAgICBsYXN0U2Vlbkl0ZW06IHtbaXRlbU5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBsYXN0U2VlblBlcnNvbjoge1tpdGVtTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHJhbmROdW1iZXI6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgY29uc3RydWN0b3JcIilcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TG9jYXRpb24oY3VycmVudGxvY2F0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGN1cnJlbnRsb2NhdGlvbjtcbiAgICB9XG5cbiAgICBzZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24oaXRlbTogSXRlbSwgYXRMb2NhdGlvbjogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5sYXN0U2Vlbkl0ZW1baXRlbS5uYW1lXSA9IGF0TG9jYXRpb247XG4gICAgfVxuXG4gICAgc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24oYWdlbnROYW1lOiBzdHJpbmcsIGF0TG9jYXRpb246IHN0cmluZyl7XG4gICAgICAgIHRoaXMubGFzdFNlZW5QZXJzb25bYWdlbnROYW1lXSA9IGF0TG9jYXRpb247XG4gICAgfVxuXG4gICAgc2V0RGVzdGluYXRpb24oZGVzdGluYXRpb246IHN0cmluZyl7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICB9XG5cbiAgICBoYXNTZWVuSXRlbShpdGVtOiBJdGVtKXtcbiAgICAgICAgaWYoaXRlbS5uYW1lIGluIHRoaXMubGFzdFNlZW5JdGVtKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiOiBzYXcgaXRlbTpcIitpdGVtLm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vdGhpcy5sYXN0U2Vlbkl0ZW1baXRlbS5uYW1lXVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aGVyZUlzSXRlbShpdGVtOiBJdGVtKXtcbiAgICAgICAgaWYoaXRlbS5uYW1lIGluIHRoaXMubGFzdFNlZW5JdGVtKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiOiBzYXcgaXRlbTpcIitpdGVtLm5hbWUgKyBcIiBhdCBsb2NhdGlvbjpcIit0aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG52YXIgYWdlbnRzOiBBcnJheTxBZ2VudD4gPSBuZXcgQXJyYXk8QWdlbnQ+KCk7XG4vLyB2YXIgYWdlbnRzID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBZ2VudChhZ2VudE5hbWU6IHN0cmluZykge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQWRkaW5nOiBcIithZ2VudE5hbWUpO1xuICAgIHZhciBhZ2VudCA9IG5ldyBBZ2VudChhZ2VudE5hbWUpO1xuICAgIGNvbnNvbGUubG9nKGFnZW50KTtcbiAgICBhZ2VudHMucHVzaChhZ2VudCk7XG4gICAgcmV0dXJuIGFnZW50O1xufVxuXG4vLzEuMyBpdGVtc1xuXG4vLyBUb2RvXG5jbGFzcyBJdGVtIHtcbiAgICBjdXJyZW50TG9jYXRpb246IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TG9jYXRpb24oY3VycmVudGxvY2F0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGN1cnJlbnRsb2NhdGlvbjtcbiAgICB9XG59XG5cbnZhciBpdGVtczogQXJyYXk8SXRlbT4gPSBuZXcgQXJyYXk8SXRlbT4oKTtcbi8vIHZhciBpdGVtcyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShpdGVtTmFtZTogc3RyaW5nKSB7XG4gICAgdmFyIGl0ZW0gPSBuZXcgSXRlbShpdGVtTmFtZSk7XG4gICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICByZXR1cm4gaXRlbTtcbn1cblxuLy8xLjQgdmFyaWFibGVzXG52YXIgdmFyaWFibGVzID0ge307XG52YXIgYWdlbnRWYXJpYWJsZXMgPSB7fTtcbnZhciBpdGVtVmFyaWFibGVzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB2YXJpYWJsZXNbdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFyTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFnZW50VmFyaWFibGUoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkpXG4gICAgICAgIGFnZW50VmFyaWFibGVzW2FnZW50XSA9IHt9O1xuXG4gICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoaXNVbmRlZmluZWQodmFyaWFibGVzW3Zhck5hbWVdKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIG5vdCBzZXQhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB2YXJpYWJsZXNbdmFyTmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgYWdlbnQgXCIgKyBhZ2VudCArIFwiIG5vdCBzZXQhXCIpXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFyaWFibGVOb3RTZXQodmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZW50VmFyaWFibGVOb3RTZXQoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKTtcbn1cblxuLy8gdG9kb1xuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW1WYXJpYWJsZShpdGVtOiBJdGVtLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtLm5hbWVdKSlcbiAgICAgICAgaXRlbVZhcmlhYmxlc1tpdGVtLm5hbWVdID0ge307XG5cbiAgICBpdGVtVmFyaWFibGVzW2l0ZW0ubmFtZV1bdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXSkgfHwgaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgaXRlbSBcIiArIGl0ZW0gKyBcIiBub3Qgc2V0IVwiKVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdO1xufVxuXG5cbi8vMlxuLy9hZ2VudC1iZWhhdmlvciB0cmVlIG1hcHBpbmdcblxudmFyIGFnZW50VHJlZXM6IHtbYWdlbnROYW1lOiBzdHJpbmddIDogVGlja30gPSB7fTtcbi8vIHZhciBhZ2VudFRyZWVzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hUcmVlVG9BZ2VudChhZ2VudDogQWdlbnQsIHRyZWU6IFRpY2spIHtcbiAgICBhZ2VudFRyZWVzW2FnZW50Lm5hbWVdID0gdHJlZTtcbn1cblxuLy8zLjFcbi8vdXNlciBhY3Rpb25zXG4vL1RPRE8gYWRkIHZhcmlhYmxlcyB0byB1c2VyIGFjdGlvbiB0ZXh0c1xudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IHtcbiAgICB0ZXh0OiBcIlwiLFxuICAgIHVzZXJBY3Rpb25zVGV4dDogW10sXG4gICAgYWN0aW9uRWZmZWN0c1RleHQ6IFwiXCJcbn1cbnZhciB1c2VySW50ZXJhY3Rpb25UcmVlcyA9IFtdO1xudmFyIHVzZXJBY3Rpb25zID0ge307XG5cbmZ1bmN0aW9uIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCkge1xuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ID0gXCJcIjtcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0ID0gW107XG4gICAgdXNlckFjdGlvbnMgPSB7fTsvL3tcIkdvIHRvIGxvY2F0aW9uIFhcIiA6IGVmZmVjdFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uVHJlZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZXhlY3V0ZSh1c2VySW50ZXJhY3Rpb25UcmVlc1tpXSk7XG4gICAgfVxufVxuXG5leHBvcnQgbGV0IGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcpID0+XG4gICAgYWN0aW9uKFxuICAgICAgICAoKSA9PiB0cnVlLFxuICAgICAgICAoKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCArPSBcIlxcblwiICsgdGV4dCxcbiAgICAgICAgMFxuICAgICk7XG5leHBvcnQgbGV0IGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0ID0gKHRleHQ6IHN0cmluZykgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ICs9IFwiXFxuXCIgKyB0ZXh0O1xuXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb25UcmVlID0gKHRleHQ6IHN0cmluZywgZWZmZWN0VHJlZTogVGljaykgPT4gYWN0aW9uKFxuICAgICgpID0+IHRydWUsXG4gICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBlZmZlY3RUcmVlKSwgMFxuKTtcblxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uID0gKHRleHQ6IHN0cmluZywgZWZmZWN0OiAoKSA9PiBhbnkpID0+XG4gICAgYWN0aW9uKFxuICAgICAgICAoKSA9PiB0cnVlLFxuICAgICAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGFjdGlvbigoKT0+dHJ1ZSwgZWZmZWN0LCAwKSksIDBcbiAgICApO1xuXG5cblxuXG5cbi8vICAgICByZXR1cm4gXG4vLyB9XG5cblxuZnVuY3Rpb24gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcbiAgICB1c2VyQWN0aW9uc1t0ZXh0XSA9IHRyZWU7XG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5wdXNoKHRleHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlckludGVyYWN0aW9uVHJlZSh0aWNrOiBUaWNrKSB7XG4gICAgdXNlckludGVyYWN0aW9uVHJlZXMucHVzaCh0aWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVVc2VyQWN0aW9uKHRleHQ6IHN0cmluZykge1xuICAgIC8vZXhlY3V0ZSB0aGUgdXNlciBhY3Rpb25cbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgPSBcIlwiO1xuICAgIHZhciB1c2VyQWN0aW9uRWZmZWN0VHJlZSA9IHVzZXJBY3Rpb25zW3RleHRdO1xuICAgIGV4ZWN1dGUodXNlckFjdGlvbkVmZmVjdFRyZWUpO1xufVxuXG4vLzQuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCkge1xuICAgIHJldHVybiB1c2VySW50ZXJhY3Rpb25PYmplY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3b3JsZFRpY2soKSB7XG4gICAgLy9hbGwgYWdlbnQgdGlja3NcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJlZSA9IGFnZW50VHJlZXNbYWdlbnRzW2ldLm5hbWVdO1xuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRyZWUpKSB7XG4gICAgICAgICAgICBzZXRWYXJpYWJsZShcImV4ZWN1dGluZ0FnZW50XCIsIGFnZW50c1tpXS5uYW1lKTtcbiAgICAgICAgICAgIGV4ZWN1dGUodHJlZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcbn1cblxuXG5cbiJdfQ==
