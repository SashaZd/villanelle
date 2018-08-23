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
            scripting_1.action(function () { return true; }, function () { return agent.destination = destination; }, 0)
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
                // Quinn
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
                // Beatrice or Eddie
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
                scripting_1.displayDescriptionAction("You need to find someone to restart the engine."),
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
                // Eddie
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
                // Quinn
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
                // Caleb
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
                // Caleb or Mark
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
                        //Mark
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
                // Caleb
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
        scripting_1.displayDescriptionAction("You see " + agent.name + "."),
        scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 1; }, scripting_1.sequence([
            scripting_1.addUserAction("Tell " + agent.name + " to inspect the teleporter software.", function () { return addGoalToAgent("TRANSPORT_ROOM:Broken", agent, TRANSPORT_ROOM); }),
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("ENGINE_ROOM:Broken") == 1; }, scripting_1.sequence([
            scripting_1.addUserAction("Tell " + agent.name + " to find replacement wires for the engine.", function () { return addGoalToAgent("ENGINE_ROOM:Broken", agent, ENGINES); }),
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("STORAGE:Broken") == 1; }, scripting_1.sequence([
            scripting_1.addUserAction("Tell " + agent.name + " to reorganize the storage room.", function () { return addGoalToAgent("STORAGE:Broken", agent, STORAGE); }),
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("DR_OFFICE:Broken") == 1; }, scripting_1.sequence([
            scripting_1.addUserAction("Tell " + agent.name + " to check the health of the crew.", function () { return addGoalToAgent("DR_OFFICE:Broken", agent, DOCTORS_OFFICE); }),
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("COCKPIT:Broken") == 1; }, scripting_1.sequence([
            scripting_1.addUserAction("Tell " + agent.name + " to contact a support ship.", function () { return addGoalToAgent("COCKPIT:Broken", agent, COCKPIT); }),
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("MONITORING_ROOM:Broken") == 1; }, scripting_1.sequence([
            scripting_1.addUserAction("Tell " + agent.name + " to inspect the monitoring room.", function () { return addGoalToAgent("MONITORING_ROOM:Broken", agent, MONITORING_ROOM); }),
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("MAIN_AREA:Broken") == 1; }, scripting_1.sequence([
            scripting_1.addUserAction("Tell " + agent.name + " to prepare food for the crew.", function () { return addGoalToAgent("MAIN_AREA:Broken", agent, MAIN_AREA); }),
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("ESCAPE_POD:Broken") == 1; }, scripting_1.sequence([
            scripting_1.addUserAction("Tell " + agent.name + " to inspect the escape pod.", function () { return addGoalToAgent("ESCAPE_POD:Broken", agent, ESCAPE_POD); }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL21hZGRpZS50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ3ZJLENBQUM7QUFFRDtJQUNDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDekMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztJQUN6QyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNySSxDQUFDO0FBRUQ7SUFDQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BJLENBQUM7QUFFRDtJQUNDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDekMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxD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Q0FLQztBQUVELElBQUk7QUFDSjtJQUNJLHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQUZELGdDQUVDO0FBRUQ7SUFDSSxPQUFPLHFCQUFxQixDQUFDO0FBQ2pDLENBQUM7QUFGRCw0REFFQztBQUVEO0lBQ0ksaUJBQWlCO0lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQVZELDhCQVVDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgYXJyYXlzID0gcmVxdWlyZShcIi4vYXJyYXlzXCIpO1xudmFyIExpbmtlZExpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgKiBDcmVhdGVzIGFuIGVtcHR5IExpbmtlZCBMaXN0LlxuICAgICogQGNsYXNzIEEgbGlua2VkIGxpc3QgaXMgYSBkYXRhIHN0cnVjdHVyZSBjb25zaXN0aW5nIG9mIGEgZ3JvdXAgb2Ygbm9kZXNcbiAgICAqIHdoaWNoIHRvZ2V0aGVyIHJlcHJlc2VudCBhIHNlcXVlbmNlLlxuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKi9cbiAgICBmdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xuICAgICAgICAvKipcbiAgICAgICAgKiBGaXJzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAqIExhc3Qgbm9kZSBpbiB0aGUgbGlzdFxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICogQHByaXZhdGVcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAqIE51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbGlzdFxuICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICogQHByaXZhdGVcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEFkZHMgYW4gZWxlbWVudCB0byB0aGlzIGxpc3QuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIGFkZGVkLlxuICAgICogQHBhcmFtIHtudW1iZXI9fSBpbmRleCBvcHRpb25hbCBpbmRleCB0byBhZGQgdGhlIGVsZW1lbnQuIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZFxuICAgICogdGhlIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGlzIGxpc3QuXG4gICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBhZGRlZCBvciBmYWxzZSBpZiB0aGUgaW5kZXggaXMgaW52YWxpZFxuICAgICogb3IgaWYgdGhlIGVsZW1lbnQgaXMgdW5kZWZpbmVkLlxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGluZGV4KSkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5FbGVtZW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5uRWxlbWVudHMgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdOb2RlID0gdGhpcy5jcmVhdGVOb2RlKGl0ZW0pO1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDAgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgLy8gSW5zZXJ0IGF0IHRoZSBlbmQuXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlLm5leHQgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIC8vIENoYW5nZSBmaXJzdCBub2RlLlxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSBwcmV2Lm5leHQ7XG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubkVsZW1lbnRzKys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xuICAgICogZW1wdHkuXG4gICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlyc3ROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICogQHJldHVybiB7Kn0gdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcbiAgICAqIGVtcHR5LlxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGRlc2lyZWQgaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXNcbiAgICAgKiBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCk7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlXG4gICAgICogc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoZSBMaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhpcyBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZVxuICAgICAqIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhpcyBsaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcbiAgICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgICAqXG4gICAgICAgKiA8cHJlPlxuICAgICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgICAqIH1cbiAgICAgICAqIDwvcHJlPlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcbiAgICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgZmFsc2VcbiAgICAgICAqIG90aGVyd2lzZS5cbiAgICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pbmRleE9mKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSByZW1vdmVkIGZyb20gdGhpcyBsaXN0LCBpZiBwcmVzZW50LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGxpc3QgY29udGFpbmVkIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA8IDEgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXG4gICAgICogQHBhcmFtIHtMaW5rZWRMaXN0fSBvdGhlciB0aGUgb3RoZXIgbGlzdC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xuICAgICAqIGFyZSBjdXN0b20gb2JqZWN0cyB5b3Ugc2hvdWxkIHByb3ZpZGUgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlXG4gICAgICogdGhlID09PSBvcGVyYXRvciBpcyB1c2VkIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIExpbmtlZExpc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlci5zaXplKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHNBdXgodGhpcy5maXJzdE5vZGUsIG90aGVyLmZpcnN0Tm9kZSwgZXFGKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFsc0F1eCA9IGZ1bmN0aW9uIChuMSwgbjIsIGVxRikge1xuICAgICAgICB3aGlsZSAobjEgIT09IG51bGwgJiYgbjIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghZXFGKG4xLmVsZW1lbnQsIG4yLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbjEgPSBuMS5uZXh0O1xuICAgICAgICAgICAgbjIgPSBuMi5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZ2l2ZW4gaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gcmVtb3ZlZCBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXMgb3V0IG9mIGJvdW5kcy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzIHx8IHRoaXMuZmlyc3ROb2RlID09PSBudWxsIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMSkge1xuICAgICAgICAgICAgLy9GaXJzdCBub2RlIGluIHRoZSBsaXN0LlxuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5maXJzdE5vZGUubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzLm5leHQgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gbnVsbCAmJiBwcmV2aW91cy5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHByZXZpb3VzLm5leHQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gcHJldmlvdXMubmV4dC5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubkVsZW1lbnRzLS07XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgbGlzdCBpbiBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soY3VycmVudE5vZGUuZWxlbWVudCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldmVyc2VzIHRoZSBvcmRlciBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaW5rZWQgbGlzdCAobWFrZXMgdGhlIGxhc3RcbiAgICAgKiBlbGVtZW50IGZpcnN0LCBhbmQgdGhlIGZpcnN0IGVsZW1lbnQgbGFzdCkuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xuICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGVtcCA9IGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IHByZXZpb3VzO1xuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xuICAgICAgICAgICAgY3VycmVudCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMubGFzdE5vZGU7XG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSB0ZW1wO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0IGluIHByb3BlclxuICAgICAqIHNlcXVlbmNlLlxuICAgICAqIEByZXR1cm4ge0FycmF5LjwqPn0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCxcbiAgICAgKiBpbiBwcm9wZXIgc2VxdWVuY2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goY3VycmVudE5vZGUuZWxlbWVudCk7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzIDw9IDA7XG4gICAgfTtcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5cy50b1N0cmluZyh0aGlzLnRvQXJyYXkoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLm5vZGVBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gKHRoaXMubkVsZW1lbnRzIC0gMSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgbm9kZSAhPSBudWxsOyBpKyspIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWxlbWVudDogaXRlbSxcbiAgICAgICAgICAgIG5leHQ6IG51bGxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5rZWRMaXN0O1xufSgpKTsgLy8gRW5kIG9mIGxpbmtlZCBsaXN0XG5leHBvcnRzLmRlZmF1bHQgPSBMaW5rZWRMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlua2VkTGlzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMaW5rZWRMaXN0XzEgPSByZXF1aXJlKFwiLi9MaW5rZWRMaXN0XCIpO1xudmFyIFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW1wdHkgcXVldWUuXG4gICAgICogQGNsYXNzIEEgcXVldWUgaXMgYSBGaXJzdC1Jbi1GaXJzdC1PdXQgKEZJRk8pIGRhdGEgc3RydWN0dXJlLCB0aGUgZmlyc3RcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBxdWV1ZSB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xuICAgICAqIGltcGxlbWVudGF0aW9uIHVzZXMgYSBsaW5rZWQgbGlzdCBhcyBhIGNvbnRhaW5lci5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBRdWV1ZSgpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpbmtlZExpc3RfMS5kZWZhdWx0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMubGlzdC5maXJzdCgpO1xuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZUVsZW1lbnRBdEluZGV4KDApO1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMsIGJ1dCBkb2VzIG5vdCByZW1vdmUsIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgc3RhY2sgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yLCBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsXG4gICAgICogZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChlbGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmNvbnRhaW5zKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpIDw9IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5saXN0LmNsZWFyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBxdWV1ZSBpblxuICAgICAqIEZJRk8gb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBRdWV1ZTtcbn0oKSk7IC8vIEVuZCBvZiBxdWV1ZVxuZXhwb3J0cy5kZWZhdWx0ID0gUXVldWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBpdGVtXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMDtcbn1cbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcbi8qKlxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBjaGFuZ2VkIGFmdGVyIHRoaXMgY2FsbC5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheSBlcXVhbFxuICogdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB3aG9zZSBmcmVxdWVuY3kgaXMgdG8gYmUgZGV0ZXJtaW5lZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKiBlcXVhbCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZnJlcXVlbmN5KGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgZnJlcSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgZnJlcSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmcmVxO1xufVxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIHNwZWNpZmllZCBhcnJheXMgYXJlIGVxdWFsIHRvIG9uZSBhbm90aGVyLlxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxuICogb2YgZWxlbWVudHMsIGFuZCBhbGwgY29ycmVzcG9uZGluZyBwYWlycyBvZiBlbGVtZW50cyBpbiB0aGUgdHdvXG4gKiBhcnJheXMgYXJlIGVxdWFsIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgdGhlIG90aGVyIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHR3byBhcnJheXMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5MS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWVxdWFscyhhcnJheTFbaV0sIGFycmF5MltpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuZXF1YWxzID0gZXF1YWxzO1xuLyoqXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSB0byBjb3B5LlxuICogQHJldHVybiB7QXJyYXl9IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKi9cbmZ1bmN0aW9uIGNvcHkoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KCk7XG59XG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuLyoqXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBzd2FwIGVsZW1lbnRzLlxuICogQHBhcmFtIHtudW1iZXJ9IGkgdGhlIGluZGV4IG9mIG9uZSBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGlzIGRlZmluZWQgYW5kIHRoZSBpbmRleGVzIGFyZSB2YWxpZC5cbiAqL1xuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xuICAgIGlmIChpIDwgMCB8fCBpID49IGFycmF5Lmxlbmd0aCB8fCBqIDwgMCB8fCBqID49IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0ZW1wID0gYXJyYXlbaV07XG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICBhcnJheVtqXSA9IHRlbXA7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnN3YXAgPSBzd2FwO1xuZnVuY3Rpb24gdG9TdHJpbmcoYXJyYXkpIHtcbiAgICByZXR1cm4gJ1snICsgYXJyYXkudG9TdHJpbmcoKSArICddJztcbn1cbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcbiAqIHN0YXJ0aW5nIGZyb20gaW5kZXggMCB0byBsZW5ndGggLSAxLlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIGl0ZXJhdGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGVsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5leHBvcnRzLmhhcyA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn07XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29tcGFyZSBlbGVtZW50IG9yZGVyLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlKGEsIGIpIHtcbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0Q29tcGFyZSA9IGRlZmF1bHRDb21wYXJlO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG59XG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICckcycgKyBpdGVtO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICckbycgKyBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0VG9TdHJpbmcgPSBkZWZhdWx0VG9TdHJpbmc7XG4vKipcbiogSm9pbnMgYWxsIHRoZSBwcm9wZXJpZXMgb2YgdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgam9pbiBzdHJpbmdcbiovXG5mdW5jdGlvbiBtYWtlU3RyaW5nKGl0ZW0sIGpvaW4pIHtcbiAgICBpZiAoam9pbiA9PT0gdm9pZCAwKSB7IGpvaW4gPSAnLCc7IH1cbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHRvcmV0ID0gJ3snO1xuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLmhhcyhpdGVtLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIGpvaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBwcm9wICsgJzonICsgaXRlbVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9yZXQgKyAnfSc7XG4gICAgfVxufVxuZXhwb3J0cy5tYWtlU3RyaW5nID0gbWFrZVN0cmluZztcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYykge1xuICAgIHJldHVybiAodHlwZW9mIGZ1bmMpID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyB1bmRlZmluZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqKSA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBzdHJpbmcuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcbi8qKlxuICogUmV2ZXJzZXMgYSBjb21wYXJlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHJldmVyc2VDb21wYXJlRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGNvbXBhcmVGdW5jdGlvbikgfHwgIWlzRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGQsIHYpICogLTE7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5yZXZlcnNlQ29tcGFyZUZ1bmN0aW9uID0gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbjtcbi8qKlxuICogUmV0dXJucyBhbiBlcXVhbCBmdW5jdGlvbiBnaXZlbiBhIGNvbXBhcmUgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gY29tcGFyZVRvRXF1YWxzKGNvbXBhcmVGdW5jdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGEsIGIpID09PSAwO1xuICAgIH07XG59XG5leHBvcnRzLmNvbXBhcmVUb0VxdWFscyA9IGNvbXBhcmVUb0VxdWFscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiLyogLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNjcmlwdGluZy50c1wiLz4gKi9cbmltcG9ydCB7XG5cdGFkZEFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxuXHRnZXRSYW5kTnVtYmVyLCBnZXRWYXJpYWJsZSwgc2VxdWVuY2UsIHNlbGVjdG9yLCBleGVjdXRlLCBQcmVjb25kaXRpb24sIGdldEFnZW50VmFyaWFibGUsIG5lZ19ndWFyZCwgZ3VhcmQsXG5cdGlzVmFyaWFibGVOb3RTZXQsIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiwgYWRkVXNlckFjdGlvbiwgYWRkVXNlckludGVyYWN0aW9uVHJlZSwgaW5pdGlhbGl6ZSxcblx0Z2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXG5cdGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0LCBhcmVBZGphY2VudCwgYWRkVXNlckFjdGlvblRyZWUsIEFnZW50XG59IGZyb20gXCIuL3NjcmlwdGluZ1wiO1xuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xuXG4vLyAxLiBEZWZpbmUgU3RhdGVcblxuLy8gTG9jYXRpb25zXG52YXIgU1RPUkFHRSA9IFwiU1RPUkFHRVwiO1xudmFyIERPQ1RPUlNfT0ZGSUNFID0gXCJET0NUT1JTIE9GRklDRVwiO1xudmFyIEVOR0lORVMgPSBcIkVOR0lORVNcIjtcbnZhciBDT0NLUElUID0gXCJDT0NLUElUXCI7XG52YXIgRVNDQVBFX1BPRCA9IFwiRVNDQVBFIFBPRFwiO1xudmFyIFRSQU5TUE9SVF9ST09NID0gXCJUUkFOU1BPUlQgUk9PTVwiO1xudmFyIE1PTklUT1JJTkdfUk9PTSA9IFwiTU9OSVRPUklORyBST09NXCI7XG52YXIgTUFJTl9BUkVBID0gXCJNQUlOIEFSRUFcIjtcbnZhciBGRU1fQkVEUk9PTSA9IFwiRkVNIEJFRFJPT01cIjtcbnZhciBNQUxFX0JFRFJPT00gPSBcIk1BTEUgQkVEUk9PTVwiO1xudmFyIEJBVEhST09NID0gXCJCQVRIUk9PTVwiO1xudmFyIFVOS05PV04gPSBcIlVOS05PV05cIjtcblxuLy8gQWRkIExvY2F0aW9uc1xuYWRkTG9jYXRpb24oRU5HSU5FUywgW1NUT1JBR0UsIE1BSU5fQVJFQV0pO1xuYWRkTG9jYXRpb24oU1RPUkFHRSwgW0VOR0lORVMsIERPQ1RPUlNfT0ZGSUNFXSk7XG5hZGRMb2NhdGlvbihET0NUT1JTX09GRklDRSwgW1NUT1JBR0UsIE1BSU5fQVJFQSwgQ09DS1BJVCwgTU9OSVRPUklOR19ST09NXSk7XG5hZGRMb2NhdGlvbihDT0NLUElULCBbRE9DVE9SU19PRkZJQ0VdKTtcbmFkZExvY2F0aW9uKEVTQ0FQRV9QT0QsIFtNQUlOX0FSRUFdKTtcbmFkZExvY2F0aW9uKFRSQU5TUE9SVF9ST09NLCBbTU9OSVRPUklOR19ST09NLCBNQUlOX0FSRUFdKTtcbmFkZExvY2F0aW9uKE1PTklUT1JJTkdfUk9PTSwgW1RSQU5TUE9SVF9ST09NLCBET0NUT1JTX09GRklDRV0pO1xuYWRkTG9jYXRpb24oTUFJTl9BUkVBLCBbRU5HSU5FUywgU1RPUkFHRSwgRE9DVE9SU19PRkZJQ0UsIFRSQU5TUE9SVF9ST09NLCBFU0NBUEVfUE9EXSk7XG5hZGRMb2NhdGlvbihGRU1fQkVEUk9PTSwgW01BSU5fQVJFQSwgQkFUSFJPT01dKTtcbmFkZExvY2F0aW9uKE1BTEVfQkVEUk9PTSwgW01BSU5fQVJFQSwgQkFUSFJPT01dKTtcbmFkZExvY2F0aW9uKEJBVEhST09NLCBbTUFJTl9BUkVBLCBGRU1fQkVEUk9PTSwgTUFMRV9CRURST09NXSk7XG5cbi8vIGFnZW50c1xudmFyIENhbGViID0gYWRkQWdlbnQoXCJDYWxlYlwiKTtcbnZhciBRdWlubiA9IGFkZEFnZW50KFwiUXVpbm5cIik7XG52YXIgTWFyayA9IGFkZEFnZW50KFwiTWFya1wiKTtcbnZhciBFZGRpZSA9IGFkZEFnZW50KFwiRWRkaWVcIik7XG52YXIgQmVhdHJpY2UgPSBhZGRBZ2VudChcIkJlYXRyaWNlXCIpO1xuXG4vLyBpdGVtc1xudmFyIHdpcmVzMSA9IGFkZEl0ZW0oXCJ3aXJlczFcIik7XG52YXIgd2lyZXMyID0gYWRkSXRlbShcIndpcmVzMlwiKTtcblxuXG53aXJlczEuc2V0Q3VycmVudExvY2F0aW9uKFNUT1JBR0UpO1xud2lyZXMyLnNldEN1cnJlbnRMb2NhdGlvbihNT05JVE9SSU5HX1JPT00pO1xuXG4vLyBzZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBTVE9SQUdFKTtcbi8vIHNldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIsIE1PTklUT1JJTkdfUk9PTSk7XG5cbi8vIHZhciB3aXJlc0NvbGxlY3RlZCA9IHNldFZhcmlhYmxlKFwid2lyZXNDb2xsZWN0ZWRcIiwgMCk7XG5cbi8vIC8vIHZhcmlhYmxlc1xuLy9DYWxlYlxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJjdXJyZW50TG9jYXRpb25cIiwgQ09DS1BJVCk7XG5DYWxlYi5zZXRDdXJyZW50TG9jYXRpb24oQ09DS1BJVCk7XG5cbi8vUXVpbm5cbi8vIHNldEFnZW50VmFyaWFibGUoUXVpbm4sIFwiY3VycmVudExvY2F0aW9uXCIsIERPQ1RPUlNfT0ZGSUNFKTtcblF1aW5uLnNldEN1cnJlbnRMb2NhdGlvbihET0NUT1JTX09GRklDRSk7XG5cbi8vTWFya1xuLy8gc2V0QWdlbnRWYXJpYWJsZShNYXJrLCBcImN1cnJlbnRMb2NhdGlvblwiLCBUUkFOU1BPUlRfUk9PTSk7XG5NYXJrLnNldEN1cnJlbnRMb2NhdGlvbihUUkFOU1BPUlRfUk9PTSk7XG5cbi8vRWRkaWVcbi8vIHNldEFnZW50VmFyaWFibGUoRWRkaWUsIFwiY3VycmVudExvY2F0aW9uXCIsIFNUT1JBR0UpO1xuRWRkaWUuc2V0Q3VycmVudExvY2F0aW9uKFNUT1JBR0UpO1xuXG4vL0JlYXRyaWNlXG4vLyBzZXRBZ2VudFZhcmlhYmxlKEJlYXRyaWNlLCBcImN1cnJlbnRMb2NhdGlvblwiLCBFTkdJTkVTKTtcbkJlYXRyaWNlLnNldEN1cnJlbnRMb2NhdGlvbihFTkdJTkVTKTtcblxuLy8gUGxheWVyXG52YXIgcGxheWVyTG9jYXRpb24gPSBzZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIsIE1BSU5fQVJFQSk7XG52YXIgd2lyZXNDb2xsZWN0ZWQgPSBzZXRWYXJpYWJsZShcIndpcmVzQ29sbGVjdGVkXCIsIDApO1xuXG5cbi8vIEtub3dsZWRnZSBcbkNhbGViLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xuUXVpbm4uc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XG5NYXJrLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xuRWRkaWUuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XG5CZWF0cmljZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcblxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJsYXN0U2Vlbjp3aXJlczFcIiwgVU5LTk9XTilcbi8vIHNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46d2lyZXMyXCIsIFVOS05PV04pXG4vLyBzZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImxhc3RTZWVuOnBsYXllclwiLCBVTktOT1dOKVxuXG5DYWxlYi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcbi8vIENhbGViLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5RdWlubi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcbi8vIFF1aW5uLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XG5NYXJrLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIFVOS05PV04pO1xuLy8gTWFyay5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xuRWRkaWUuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XG4vLyBFZGRpZS5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xuQmVhdHJpY2Uuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XG4vLyBCZWF0cmljZS5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xuXG5cbi8vIEdvYWxzIGZvciB0aGUgcGxheWVyXG5cbi8vIDA6IFVua25vd24vSW5pdGlhbCBTdGF0ZVxuLy8gMTogRm91bmQgb3V0IGFib3V0IEZhdWx0OjEuIE5ldyBHb2FsLiAob25seSBvY2N1cnMgaWYgc3RhdHVzPTApXG4vLyAyOiBGaXhlZCBGYXVsdDoxIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9MSlcbi8vIDM6IEZvdW5kIG91dCBhYm91dCBGYXVsdDoyLiBOZXcgR29hbCAob25seSBvY2N1cnMgaWYgc3RhdHVzPTIpXG4vLyA0OiBGaXhlZCBGYXVsdDoyIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9MykgXG4vLyBldGMuIGV0Yy5cbnZhciBnb2FsX2Jyb2tlbl90cmFuc3BvcnQgPSBzZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiLCAwKTtcdFx0Ly8gbWF4OjRcbnZhciBnb2FsX2Jyb2tlbl9lbmdpbmVzID0gc2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiLCAwKTtcbnZhciBnb2FsX2Jyb2tlbl9zdG9yYWdlID0gc2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiLCAwKTtcbnZhciBnb2FsX2Jyb2tlbl9jb2NrcGl0ID0gc2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiLCAwKTtcbnZhciBnb2FsX2Jyb2tlbl9tYWluID0gc2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIsIDApO1xudmFyIGdvYWxfYnJva2VuX2RyID0gc2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIsIDApO1xudmFyIGdvYWxfYnJva2VuX21vbml0b3JpbmcgPSBzZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIiwgMCk7XG52YXIgZ29hbF9icm9rZW5fZXNjYXBlID0gc2V0VmFyaWFibGUoXCJFU0NBUEVfUE9EOkJyb2tlblwiLCAwKTtcblxuLy8gLy8gMi4gRGVmaW5lIEJUc1xuLy8gLy8gY3JlYXRlIGdyb3VuZCBhY3Rpb25zXG5cbi8vIFRvZG8gZnJvbSBoZXJlXG4vLyBmdW5jdGlvbiBmdW5jdGlvbl9uYW1lKGFyZ3VtZW50KSB7XG4vLyBcdC8vIGJvZHkuLi5cbi8vIH1cblxuXG5mdW5jdGlvbiBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudDogQWdlbnQsIGRlc3RpbmF0aW9uOiBzdHJpbmcgPSBcIlVOS05PV05cIikge1xuXG5cdGlmKGRlc3RpbmF0aW9uID09IFwiVU5LTk9XTlwiKXtcblx0XHRsZXQgc2V0UmFuZE51bWJlciA9IGFjdGlvbihcblx0XHRcdCgpID0+IHRydWUsXG5cdFx0XHQoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID0gZ2V0UmFuZE51bWJlcigxLCAxMSksXG5cdFx0XHQwXG5cdFx0KTtcblxuXHRcdC8vIFNhc2hhIFRvZG86IFdvcmsgb24gdXNpbmcgdGhlIEFnZW50L0l0ZW0gdHlwZXMgZm9yIGRlc3RpbmF0aW9uc1xuXHRcdGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFTkdJTkVTLCAwKTtcblx0XHRsZXQgY2hvb3NlU1RPUkFHRSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDIsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gU1RPUkFHRSwgMCk7XG5cdFx0bGV0IGNob29zZURPQ1RPUlNfT0ZGSUNFID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBET0NUT1JTX09GRklDRSwgMCk7XG5cdFx0bGV0IGNob29zZUNPQ0tQSVQgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA0LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IENPQ0tQSVQsIDApO1xuXHRcdGxldCBjaG9vc2VFU0NBUEVfUE9EID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFU0NBUEVfUE9ELCAwKTtcblx0XHRsZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA2LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IFRSQU5TUE9SVF9ST09NLCAwKTtcblx0XHRsZXQgY2hvb3NlTU9OSVRPUklOR19ST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNT05JVE9SSU5HX1JPT00sIDApO1xuXHRcdGxldCBjaG9vc2VNQUlOX0FSRUEgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA4LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BSU5fQVJFQSwgMCk7XG5cdFx0bGV0IGNob29zZUZFTV9CRURST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gOSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBGRU1fQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZU1BTEVfQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDEwLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XG5cdFx0bGV0IGNob29zZUJBVEhST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMTEsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQkFUSFJPT00sIDApO1xuXG5cdFx0bGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlcXVlbmNlKFtcblx0XHRcdHNldFJhbmROdW1iZXIsXG5cdFx0XHRzZWxlY3RvcihbXG5cdFx0XHRcdGNob29zZUVOR0lORVMsXG5cdFx0XHRcdGNob29zZUNPQ0tQSVQsXG5cdFx0XHRcdGNob29zZVNUT1JBR0UsXG5cdFx0XHRcdGNob29zZURPQ1RPUlNfT0ZGSUNFLFxuXHRcdFx0XHRjaG9vc2VCQVRIUk9PTSxcblx0XHRcdFx0Y2hvb3NlTUFMRV9CRURST09NLFxuXHRcdFx0XHRjaG9vc2VGRU1fQkVEUk9PTSxcblx0XHRcdFx0Y2hvb3NlTUFJTl9BUkVBLFxuXHRcdFx0XHRjaG9vc2VNT05JVE9SSU5HX1JPT00sXG5cdFx0XHRcdGNob29zZVRSQU5TUE9SVF9ST09NLFxuXHRcdFx0XHRjaG9vc2VFU0NBUEVfUE9EXG5cdFx0XHRdKVxuXHRcdF0pO1xuXHRcdHJldHVybiBzZXROZXh0RGVzdGluYXRpb247XG5cblx0fVxuXHRlbHNle1xuXHRcdHJldHVybiBzZXF1ZW5jZShbXG5cdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbiwgMClcblx0XHRdKTtcblxuXHRcdC8vIGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEVOR0lORVMsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRU5HSU5FUywgMCk7XG5cdFx0Ly8gbGV0IGNob29zZVNUT1JBR0UgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gU1RPUkFHRSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBTVE9SQUdFLCAwKTtcblx0XHQvLyBsZXQgY2hvb3NlRE9DVE9SU19PRkZJQ0UgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRE9DVE9SU19PRkZJQ0UsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRE9DVE9SU19PRkZJQ0UsIDApO1xuXHRcdC8vIGxldCBjaG9vc2VDT0NLUElUID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IENPQ0tQSVQsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQ09DS1BJVCwgMCk7XG5cdFx0Ly8gbGV0IGNob29zZUVTQ0FQRV9QT0QgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRVNDQVBFX1BPRCwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFU0NBUEVfUE9ELCAwKTtcblx0XHQvLyBsZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gVFJBTlNQT1JUX1JPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gVFJBTlNQT1JUX1JPT00sIDApO1xuXHRcdC8vIGxldCBjaG9vc2VNT05JVE9SSU5HX1JPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gTU9OSVRPUklOR19ST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1PTklUT1JJTkdfUk9PTSwgMCk7XG5cdFx0Ly8gbGV0IGNob29zZU1BSU5fQVJFQSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBNQUlOX0FSRUEsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gTUFJTl9BUkVBLCAwKTtcblx0XHQvLyBsZXQgY2hvb3NlRkVNX0JFRFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRkVNX0JFRFJPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRkVNX0JFRFJPT00sIDApO1xuXHRcdC8vIGxldCBjaG9vc2VNQUxFX0JFRFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gTUFMRV9CRURST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XG5cdFx0Ly8gbGV0IGNob29zZUJBVEhST09NID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEJBVEhST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEJBVEhST09NLCAwKTtcblxuXG5cdFx0Ly8gbGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlbGVjdG9yKFtcblx0XHQvLyBcdGNob29zZUVOR0lORVMsXG5cdFx0Ly8gXHRjaG9vc2VDT0NLUElULFxuXHRcdC8vIFx0Y2hvb3NlU1RPUkFHRSxcblx0XHQvLyBcdGNob29zZURPQ1RPUlNfT0ZGSUNFLFxuXHRcdC8vIFx0Y2hvb3NlQkFUSFJPT00sXG5cdFx0Ly8gXHRjaG9vc2VNQUxFX0JFRFJPT00sXG5cdFx0Ly8gXHRjaG9vc2VGRU1fQkVEUk9PTSxcblx0XHQvLyBcdGNob29zZU1BSU5fQVJFQSxcblx0XHQvLyBcdGNob29zZU1PTklUT1JJTkdfUk9PTSxcblx0XHQvLyBcdGNob29zZVRSQU5TUE9SVF9ST09NLFxuXHRcdC8vIFx0Y2hvb3NlRVNDQVBFX1BPRFxuXHRcdC8vIF0pO1xuXG5cdFx0Ly8gcmV0dXJuIHNldE5leHREZXN0aW5hdGlvbjtcblx0fVxuXG59XG5cblxubGV0IHNldERlc3RpbmF0aW9uUHJlY29uZEZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50KXtcblx0bGV0IHNldERlc3RpbmF0aW9uUHJlY29uZDogUHJlY29uZGl0aW9uID0gKCkgPT4gaXNVbmRlZmluZWQoYWdlbnQuZGVzdGluYXRpb24pIHx8IGFnZW50LmRlc3RpbmF0aW9uID09IGFnZW50LmN1cnJlbnRMb2NhdGlvbjtcblx0cmV0dXJuIHNldERlc3RpbmF0aW9uUHJlY29uZDtcdFxufVxuXG4vLyAvLyBjcmVhdGUgYmVoYXZpb3IgdHJlZXNcblxuXG4vLyBsZXQgZ290b05leHRMb2NhdGlvbkZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50KXtcbi8vIFx0cmV0dXJuIGFnZW50LmdldE5leHRMb2NhdGlvbigpXG5cbi8vIFx0Ly8gcmV0dXJuICBhY3Rpb24oXG4vLyBcdC8vIFx0KCkgPT4gdHJ1ZSxcbi8vIFx0Ly8gXHQoKSA9PiB7XG4vLyBcdC8vIFx0XHRhZ2VudC5jdXJyZW50TG9jYXRpb24gPSBnZXROZXh0TG9jYXRpb24oYWdlbnQuY3VycmVudExvY2F0aW9uLCBhZ2VudC5kZXN0aW5hdGlvbik7XG4vLyBcdC8vIFx0XHRjb25zb2xlLmxvZyhhZ2VudCwgXCIgYXQ6IFwiLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuLy8gXHQvLyBcdH0sXG4vLyBcdC8vIFx0MFxuLy8gXHQvLyApO1xuLy8gfVxuXG5cbmxldCBsYXN0U2VlbkJ5QWdlbnQgPSBmdW5jdGlvbihhZ2VudCl7XG5cdHJldHVybiBzZXF1ZW5jZShbXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0YWN0aW9uKFxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uID09IHdpcmVzMS5jdXJyZW50TG9jYXRpb24sXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudCwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuXHRcdFx0XHRcdC8vZWZmZWN0XG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gSXRlbTogd2lyZXMxIHwgTG9jYXRpb246IFwiKyBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coYWdlbnROYW1lICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMSB8IExvY2F0aW9uOiBcIisgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSk7XG5cdFx0XHRcdFx0XHQvLyBzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczFcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXG5cdFx0XHRcdFx0XHRhZ2VudC5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXG5cdFx0XHRcdFx0MFxuXHRcdFx0XHQpLFxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXG5cdFx0XSksXG5cdFx0c2VsZWN0b3IoW1xuXHRcdFx0YWN0aW9uKFxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uID09IHdpcmVzMi5jdXJyZW50TG9jYXRpb24sXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMyLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcblx0XHRcdFx0XHQvL2VmZmVjdFxuXHRcdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50ICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMiB8IExvY2F0aW9uOiBcIisgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwic2VlcyAtIEl0ZW06IHdpcmVzMiB8IExvY2F0aW9uOiBcIitnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcblx0XHRcdFx0XHRcdGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHQvLyBzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczJcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvL3RpbWUgdGFrZW5cblx0XHRcdFx0XHQwXG5cdFx0XHRcdCksXG5cdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge30sMClcblx0XHRdKSxcblx0XHRzZWxlY3RvcihbXG5cdFx0XHRhY3Rpb24oXG5cdFx0XHRcdFx0Ly9wcmVjb25kaXRpb25cblx0XHRcdFx0XHQoKSA9PiBhZ2VudC5jdXJyZW50TG9jYXRpb24gID09IGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIiksXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpLFxuXHRcdFx0XHRcdC8vZWZmZWN0XG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gUGVyc29uOiBQbGF5ZXIgfCBMb2NhdGlvbjogXCIrIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhhZ2VudE5hbWUgKyBcInNlZXMgLSBQZXJzb246IFBsYXllciB8IExvY2F0aW9uOiBcIitnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcblx0XHRcdFx0XHRcdC8vIGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XG5cdFx0XHRcdFx0XHRhZ2VudC5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbigncGxheWVyJywgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcblx0XHRcdFx0XHRcdC8vIHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImxhc3RTZWVuOnBsYXllclwiLCAgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vdGltZSB0YWtlblxuXHRcdFx0XHRcdDBcblx0XHRcdFx0KSxcblx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7fSwwKVxuXHRcdF0pXG5cdF0pO1xufTtcblxuXG4vLyBUb2RvOiBIYXMgdG8gYmUgYSBiZXR0ZXIgd2F5IHRvIHJldHVybiBhIGJlaGF2aW91ciB0cmVlIHRvIGdvIHRvIHRoZSBuZXh0IGRlc3RpbmF0aW9uIGZvciBhbiBhZ2VudC4gXG4vLyBUb2RvOiBNb3ZlIHRvIHNjcmlwdGluZyB1bmRlciBBZ2VudCBpbnN0ZWFkLiBcblxubGV0IHNlYXJjaEZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50LCBkZXN0aW5hdGlvbjogc3RyaW5nID0gXCJVTktOT1dOXCIpe1xuXHRpZihkZXN0aW5hdGlvbiA9PSBcIlVOS05PV05cIil7XG5cdFx0bGV0IHNlYXJjaCA9IHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcblx0XHRcdFx0Z3VhcmQoc2V0RGVzdGluYXRpb25QcmVjb25kRm9yQWdlbnQoYWdlbnQpLCBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudCkpLFxuXHRcdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge1xuXHRcdFx0XHR9LDApXG5cdFx0XHRdKSxcblx0XHRcdGFnZW50LmdldE5leHRMb2NhdGlvbigpXG5cdFx0XHQvLyBnb3RvTmV4dExvY2F0aW9uRm9yQWdlbnQoYWdlbnQpLFxuXHRcdF0pO1x0XG5cdFx0cmV0dXJuIHNlYXJjaFxuXHR9XG5cdGVsc2V7XG5cdFx0bGV0IHNlYXJjaCA9IHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcblx0XHRcdFx0Z3VhcmQoc2V0RGVzdGluYXRpb25QcmVjb25kRm9yQWdlbnQoYWdlbnQpLCBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudCwgZGVzdGluYXRpb24pKSxcblx0XHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcblx0XHRcdFx0fSwwKVxuXHRcdFx0XSksXG5cdFx0XHRhZ2VudC5nZXROZXh0TG9jYXRpb24oKVxuXHRcdFx0Ly8gZ290b05leHRMb2NhdGlvbkZvckFnZW50KGFnZW50KSxcblx0XHRdKTtcdFxuXHRcdHJldHVybiBzZWFyY2hcblx0fVxufVxuXG5sZXQgQ2FsZWJCVCA9IHNlcXVlbmNlKFtcblx0bGFzdFNlZW5CeUFnZW50KENhbGViKSxcblx0c2VxdWVuY2UoW1xuXHRcdHNlYXJjaEZvckFnZW50KENhbGViKSwgbGFzdFNlZW5CeUFnZW50KENhbGViKVxuXHRdKVxuXSk7XG5cbmxldCBRdWlubkJUID0gc2VxdWVuY2UoW1xuXHRsYXN0U2VlbkJ5QWdlbnQoUXVpbm4pLFxuXHRzZXF1ZW5jZShbXG5cdFx0c2VhcmNoRm9yQWdlbnQoUXVpbm4pLCBsYXN0U2VlbkJ5QWdlbnQoUXVpbm4pXG5cdF0pXG5dKTtcblxubGV0IE1hcmtCVCA9IHNlcXVlbmNlKFtcblx0bGFzdFNlZW5CeUFnZW50KE1hcmspLFxuXHRzZXF1ZW5jZShbXG5cdFx0c2VhcmNoRm9yQWdlbnQoTWFyayksIGxhc3RTZWVuQnlBZ2VudChNYXJrKVxuXHRdKVxuXSk7XG5cbmxldCBFZGRpZUJUID0gc2VxdWVuY2UoW1xuXHRsYXN0U2VlbkJ5QWdlbnQoRWRkaWUpLFxuXHRzZXF1ZW5jZShbXG5cdFx0c2VhcmNoRm9yQWdlbnQoRWRkaWUpLCBsYXN0U2VlbkJ5QWdlbnQoRWRkaWUpXG5cdF0pXG5dKTtcblxubGV0IEJlYXRyaWNlQlQgPSBzZXF1ZW5jZShbXG5cdGxhc3RTZWVuQnlBZ2VudChCZWF0cmljZSksXG5cdHNlcXVlbmNlKFtcblx0XHRzZWFyY2hGb3JBZ2VudChCZWF0cmljZSksIGxhc3RTZWVuQnlBZ2VudChCZWF0cmljZSlcblx0XSlcbl0pO1xuXG4vLyAvL2F0dGFjaCBiZWhhdmlvdXIgdHJlZXMgdG8gYWdlbnRzXG5hdHRhY2hUcmVlVG9BZ2VudChDYWxlYiwgQ2FsZWJCVCk7XG5hdHRhY2hUcmVlVG9BZ2VudChRdWlubiwgUXVpbm5CVCk7XG5hdHRhY2hUcmVlVG9BZ2VudChNYXJrLCBNYXJrQlQpO1xuYXR0YWNoVHJlZVRvQWdlbnQoRWRkaWUsIEVkZGllQlQpO1xuYXR0YWNoVHJlZVRvQWdlbnQoQmVhdHJpY2UsIEJlYXRyaWNlQlQpO1xuXG4vLyAvLyAzLiBDb25zdHJ1Y3Qgc3Rvcnlcbi8vIC8vIGNyZWF0ZSB1c2VyIGFjdGlvbnNcblxuXG5zZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIkVuZ2luZVN0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIlN0b3JhZ2VTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJEck9mZmljZVN0YXJ0XCIsMCk7XG5zZXRWYXJpYWJsZShcIkNvY2twaXRTdGFydFwiLDApO1xuc2V0VmFyaWFibGUoXCJNb25pdG9yaW5nU3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiVHJhbnNwb3J0U3RhcnRcIiwwKTtcbnNldFZhcmlhYmxlKFwiRXNjYXBlU3RhcnRcIiwwKTtcblxuXG52YXIgTWFpbkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1BSU5fQVJFQSxcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHNoaXAncyBtYWluIGFyZWEuXCIpLFxuICAgICAgICAgICAgc2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwidGhlU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSXQgd2FzIGEgc2ltcGxlIG1pc3Npb246IGxhbmQgb24gdGhlIG5ld2x5LWRpc2NvdmVyZWQgcGxhbmV0IFNpZ3Vyb24sIHRlbGVwb3J0IGNyZXcgbWVtYmVycyBkb3duIHRvIGl0cyBzdXJmYWNlLCBhbmQgc2VjdXJlIGFuZCBkb2N1bWVudCBuZXcgaW5mb3JtYXRpb24uIEV2ZXJ5dGhpbmcgd2VudCBhd3J5IGR1cmluZyBwaGFzZSB0d28uIEFzIG1vc3Qgb2YgdGhlIGNyZXcgZ2F0aGVyZWQgaW50byB0aGUgdHJhbnNwb3J0IGJheSwgdGhlIGNvbW1hbmRlciBhbmQgYSBmZXcgb3RoZXJzIHN0YXllZCBiZWhpbmQgdG8gbW9uaXRvciB0aGUgZXhwbG9yYXRpb24uIFRoZSB0ZWxlcG9ydGF0aW9uIHByb2Nlc3MgYmVnYW4sIHlldCBpbW1lZGlhdGVseSBhIG1hc3NpdmUgc3lzdGVtcyBmYWlsdXJlIG9jY3VycmVkLiBUaG9zZSB3aG8gaGFkIGJlZW4gYXdhaXRpbmcgdGVsZXBvcnRhdGlvbiB3ZXJlIGdvbmUsIGFzc3VtZWQgdG8gaGF2ZSBiZWVuIGxvc3QgaW4gc3BhY2UuIFRoZSBjb21tYW5kZXIgY29tZXMgdG8gYXMgdGhlIHNoaXAgaXMgcGx1bW1ldGluZyBmcm9tIG9yYml0LCB0aGVpciBjcmV3bWF0ZXMgeWVsbGluZyBhdCBlYWNoIG90aGVyLiBUaGVyZSBpcyBvbmx5IG9uZSBlc2NhcGUgcG9kIHJlbWFpbmluZy4gQXMgY29tbWFuZGVyLCB5b3UgYXJlIGVxdWlwcGVkIHdpdGggYSBzcGVjaWFsIGludGVyYWN0aXZlIG1hcCBhbGxvd2luZyB5b3UgdG8gc2VlIHRoZSBwb3NpdGlvbnMgb2YgeW91ciBjcmV3bWF0ZXMgYXQgYWxsIHRpbWVzLiBZb3UgbXVzdCB1dGlsaXplIHRoZSBtYXAgaW4gb3JkZXIgdG8gdGFrZSBjb250cm9sIG9mIHRoZSBzaGlwIGFuZCByZW1haW5pbmcgY3JldyB0byBzYXZlIGV2ZXJ5b25lIGZyb20gY2VydGFpbiBkZWF0aC5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwidGhlU3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fbWFpbikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIikgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgc2hpcCdzIG1haW4gYXJlYS5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiR28gbm9ydGggdG8gZW50ZXIgdGhlIGVuZ2luZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRU5HSU5FUykpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIG5vcnRoZWFzdCB0byBlbnRlciB0aGUgc3RvcmFnZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgU1RPUkFHRSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIGVhc3QgdG8gZW50ZXIgdGhlIGNvY2twaXQuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT0NLUElUKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGhlYXN0IHRvIGVudGVyIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBET0NUT1JTX09GRklDRSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHNvdXRoIGludG8gdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1PTklUT1JJTkdfUk9PTSkpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHNvdXRoIGludG8gdGhlIHRyYW5zcG9ydCByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVFJBTlNQT1JUX1JPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBzb3V0aHdlc3QgdG8gZW50ZXIgdGhlIGVzY2FwZSBwb2QuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFU0NBUEVfUE9EKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gd2VzdCB0byBlbnRlciB0aGUgYmF0aHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQVRIUk9PTSkpLFxuICAgICAgICAgICAgICAgICAgICBdKSksXG4gICAgICAgICAgICAgICBcdFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSA9PSAwLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJJdCBoYXMgYmVlbiBob3VycyBzaW5jZSB0aGUgY3JldyBsYXN0IGF0ZS4gVGhlIHJlc2lkZW50IHNoaXAgbW9tIGNvdWxkIGhlbHAgcHJlcGFyZSBzb21lIGZvb2QuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gUXVpbm5cblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIiwgMSk7XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIpID09IDEsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkZpbmQgc29tZW9uZSB0byBwcmVwYXJlIGZvb2QgZm9yIHRoZSBjcmV3LlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgY3JldyB3YXMgYWJsZSB0byBlYXQsIGJ1dCB0aGUga2l0Y2hlbiB3YXMgbGVmdCBhIG1lc3MuIFNvbWVvbmUgbmVlZHMgdG8gY2xlYW4gaXQuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAvLyBRdWlubiBvciBFZGRpZVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIpID09IDMsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBjbGVhbiB0aGUga2l0Y2hlbi5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgIF0pLCAgICBcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShNYWluQlQpO1xuXG52YXIgRW5naW5lQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRU5HSU5FUyxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIikgPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGVuZ2luZSByb29tIGlzIHdoZXJlIEJlYXRyaWNlIHNwZW5kcyBtb3N0IG9mIGhlciB0aW1lLiBTaGXigJlzIGEgbmF0dXJhbCB3aGVuIGl0IGNvbWVzIHRvIHByb2JsZW0gc29sdmluZywgYnV0IGhlciB1bmFwcHJvYWNoYWJsZSBhbmQgdW5mcmllbmRseSBwZXJzb25hbGl0eSB0dXJuZWQgbWFueSBpbmZsdWVudGlhbCBjb21tYW5kZXJzIGF3YXkgZnJvbSBoZXIuIERlc3BpdGUgaGVyIHBlcnNvbmFsaXR5LCBoZXIgZW5naW5lZXJpbmcgc2tpbGxzIGFyZSBzZWNvbmQtdG8tbm9uZS4uLmdyYW50ZWQgc2hlIGlzIHRoZSBvbmx5IGVuZ2luZWVyIGxlZnQuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkVuZ2luZVN0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX2VuZ2luZXMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVuZ2luZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBlbmdpbmUgcm9vbS5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiSGVhZCBlYXN0IGludG8gdGhlIHN0b3JhZ2Ugcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFNUT1JBR0UpKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuICAgICAgICAgICAgICAgICAgICBdKSksXG4gICAgICAgICAgICAgICBcdFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSW4gb3JkZXIgdG8gZml4IHRoZSBlbmdpbmVzLCByZXBsYWNlbWVudCB3aXJlcyBtdXN0IGJlIGZvdW5kLiBBbiBlbmdpbmVlciBvciBqYW5pdG9yIHNob3VsZCBrbm93IHdoZXJlIHRoZXkgYXJlLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJlYXRyaWNlIG9yIEVkZGllXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9Pntcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiLCAxKTtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDEsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgcmVwbGFjZW1lbnQgd2lyZXMuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgd2lyZXMgd2VyZSBmb3VuZCwgYnV0IHRoZSB0b29sIGJveCBzZWVtcyB0byBiZSBtaXNzaW5nLiBDYWxlYiBtaWdodCBoYXZlIHRha2VuIGl0LlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgLy8gQmVhdHJpY2Ugb3IgQ2FsZWJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDMsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkJlZm9yZSB0aGUgZW5naW5lcyBjYW4gYmUgZml4ZWQsIHlvdSBuZWVkIHRvIGZpbmQgYSB0b29sIGJveC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSA0LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJXaXRoIGJveCBhY3F1aXJlZCwgdGhlIHdpcmVzIGNhbiBub3cgYmUgcmVwbGFjZWQuIEFuIGVuZ2luZWVyIHNob3VsZCBrbm93IGhvdyB0byBkbyBpdC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIC8vIEJlYXRyaWNlXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSA1LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBoYXZlIHRoZSB3aXJlcyByZXBsYWNlZCBpbiB0aGUgZW5naW5lIHJvb20uXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gNixcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGVuZ2luZSdzIG5vdyBmaXhlZCwgYnV0IGl0IHN0aWxsIG5lZWRzIHRvIGJlIHJlc3RhcnRlZC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIC8vIEJlYXRyaWNlXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSA3LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gcmVzdGFydCB0aGUgZW5naW5lLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgXSksICAgIFxuICAgICAgICAgICAgICAgXHQvL09wdGlvbmFsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoRW5naW5lQlQpO1xuXG52YXIgU3RvcmFnZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFNUT1JBR0UsXG5cdHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlN0b3JhZ2VTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgc3RvcmFnZSByb29tIGlzIHdoZXJlIEVkZGllIHNwZW5kcyBoaXMgdGltZSBhbmQgc3RvcmVzIGhpcyBqYW5pdG9yIGVxdWlwbWVudC4gT2xkIGFzIGhlIGlzLCBoZSBzdGlsbCBkb2VzIGhpcyBiZXN0IHRvIGNvbnRyaWJ1dGUgdG8gdGhlIHRlYW0gaW4gd2hhdGV2ZXIgd2F5IGhlIGNhbiwgZGVzcGl0ZSBsYWNraW5nIHRlY2huaWNhbCBza2lsbHMgdGhlIG90aGVyIGNyZXdtYXRlcyBlbXBsb3kuIEFsdGhvdWdoIGhlIGlzIGEgd2VsbC1rbm93biBoZXJvIGFtb25nIG1pbGl0YXJ5IHBlcnNvbm5lbCwgaGlzIGNyZXdtYXRlcyBjb250aW51ZSB0byByZW1haW4gb2JsaXZpb3VzIHRvIHRoZSBmYWN0IHRoYXQgdGhlIG1hbiB3aG8gc2NydWJzIHRoZWlyIHRvaWxldHMgaGFkIGJlZW4gb25lIG9mIHRoZSBtb3N0IGFjY29tcGxpc2hlZCBtaWxpdGFyeSBvZmZpY2VycyB0aGUgdW5pdmVyc2UgaGFkIGV2ZXIgc2Vlbi5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4geyAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIlN0b3JhZ2VTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9zdG9yYWdlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTdG9yYWdlU3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZWQgaW50byB0aGUgc3RvcmFnZSByb29tLlwiKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHdlc3QgaW50byB0aGUgZW5naW5lIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFTkdJTkVTKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuICAgICAgICAgICAgICAgXHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHN0b3JhZ2Ugcm9vbSBpcyBhIG1lc3MuIEEgamFuaXRvciB3b3VsZCBiZSBhYmxlIHRvIG1ha2Ugc2Vuc2Ugb2YgaXQgYWxsLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVkZGllXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9Pntcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiLCAxKTtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpID09IDEsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkZpbmQgc29tZW9uZSB0byByZW9yZ2FuaXplIHRoZSBzdG9yYWdlIHJvb20uXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJOb3cgdGhhdCB0aGUgc3RvcmFnZSByb29tIGlzIGNsZWFuLCB0aGUgcmVwbGFjZW1lbnQgd2lyZXMgY2FuIGJ5IGZvdW5kLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgLy9CZWF0cmljZSBvciBFZGRpZVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSA9PSAzLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gcmV0cmlldmUgdGhlIHdpcmVzLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgXSksICAgIFxuXG4gICAgICAgICAgICAgICBcdC8vT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShTdG9yYWdlQlQpO1xuXG52YXIgRHJPZmZpY2VCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBET0NUT1JTX09GRklDRSxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRHJPZmZpY2VTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJEci4gUXVpbm4gc3BlbmRzIGEgbG90IG9mIHRpbWUgaW4gaGVyIG9mZmljZSBsb29raW5nIGFmdGVyIHBhdGllbnRzLiBTaGUgcHV0cyBhbGwgb3RoZXJzIGFib3ZlIGhlcnNlbGY7IHNoZSBpcyBjb25zdGFudGx5IGNvbmNlcm5lZCB3aXRoIHRoZSB3ZWxsLWJlaW5nIG9mIGhlciBjcmV3bWF0ZXMuIFRoZSBwcm9zcGVjdCBvZiBoZXIgcGF0aWVudHMgZHlpbmcgc3RpbGwga2VlcHMgaGVyIHVwIGF0IG5pZ2h0LCBidXQgaGVyIGRldGVybWluYXRpb24gdG8gc2F2ZSBhcyBtYW55IHBlb3BsZSBhcyBzaGUgY2FuIGlzIHdoYXQga2VlcHMgaGVyIGdvaW5nLiBIZXIgbWF0ZXJuYWwgaW5zdGluY3RzIGZvbGxvdyBoZXIgZnJvbSBoZXIgaG91c2UgdG8gdGhlIHNoaXAuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fZHIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEck9mZmljZVN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgbm9ydGhlYXN0IGludG8gdGhlIGNvY2twaXQuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT0NLUElUKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gd2VzdCBpbnRvIHRoZSBtb25pdG9yaW5nIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNT05JVE9SSU5HX1JPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuICAgICAgICAgICAgICAgICAgICBdKSksXG4gICAgICAgICAgICAgICBcdFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAwLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21lIGNyZXdtYXRlcyBtYXkgaGF2ZSBzdXN0YWluZWQgaW5qdXJpZXMuIEZpbmQgdGhlIGRvY3Rvci5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBRdWlublxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiLCAxKTtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkRSX09GRklDRTpCcm9rZW5cIikgPT0gMSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiRmluZCBzb21lb25lIHRvIGNoZWNrIHRoZSBjcmV3J3MgaGVhbHRoLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21lIG1pbm9yIGluanVyaWVzIHdlcmUgc3VzdGFpbmVkLiBGaW5kIHRoZSBkb2N0b3IgdG8gaGVhbCB0aGUgY3JldydzIGluanVyaWVzLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgLy8gUXVpbm5cblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAzLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gaGVhbCB0aGUgY3JldydzIGluanVyaWVzLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICBdKSwgICAgICAgIFxuXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxuICAgICAgICAgICAgXSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoRHJPZmZpY2VCVCk7XG5cbnZhciBDb2NrcGl0QlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQ09DS1BJVCxcblx0c2VxdWVuY2UoW1xuXHRcdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ29ja3BpdFN0YXJ0XCIpID09IDAsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBjb2NrcGl0IGlzIHdoZXJlIFRheWxvciBwaWxvdHMgdGhlIHNoaXAsIGJ1dCBDYWxlYiBzcGVuZHMgYSBsb3Qgb2YgaGlzIHRpbWUgdGhlcmUgYXMgd2VsbC4gQ2FsZWIgcnVucyB0aGluZ3MgdmVyeSBkaWZmZXJlbnRseSBmcm9tIFRheWxvcjsgaGUgaXMgYSBkZW1hbmRpbmcgbGVhZGVyIHdobyBoYXJzaGx5IGNyaXRpY2l6ZXMgaGlzIGNyZXdtYXRlcyB3aGVuIGZhaWx1cmVzIG9jY3VyLiBIZSBzZWNyZXRseSBsb2F0aGVzIFRheWxvcjsgdGhlaXIgcGVyc29uYWxpdGllcyBjbGFzaCBhbGwtdG9vLWZyZXF1ZW50bHksIGFuZCB0aGVpciBwb3NpdGlvbiBvbiB0aGUgc2hpcCBkZXNwaXRlIGhpcyBvbGRlciBhZ2UgaXMgYSBjb25zdGFudCBzb3VyY2Ugb2YgYW5nZXIgdG8gdGhlIG9mZmljZXIuXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkNvY2twaXRTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9jb2NrcGl0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDb2NrcGl0U3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGludG8gdGhlIGNvY2twaXQuXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgc291dGh3ZXN0IGludG8gdGhlIGRvY3RvcidzIG9mZmljZS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIERPQ1RPUlNfT0ZGSUNFKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRdKSksXG5cdFx0XHRcdFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiTm93IHRoYXQgdGhlIHNoaXAgaXMgYmFjayBvbmxpbmUsIHlvdSB3aWxsIG5lZWQgdG8gY29udGFjdCBhIHN1cHBvcnQgc2hpcC4gQW4gb2ZmaWNlciB3b3VsZCBiZSBwZXJmZWN0IGZvciB0aGUgam9iLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbGViXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9Pntcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiLCAxKTtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpID09IDEsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBjb250YWN0IGEgc3VwcG9ydCBzaGlwLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIikgPT0gMixcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiQSBzdXBwb3J0IHNoaXAgaGFzIG5vdyBiZWVuIGNvbnRhY3RlZCwgYnV0IHRoZSBzaGlwIG11c3QgZ2V0IHJlYWR5IHRvIGJlIG1vdmVkLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgLy8gQ2FsZWJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIikgPT0gMyxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIHByZXBhcmUgdGhlIHNoaXAgdG8gbW92ZS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgXSksXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoQ29ja3BpdEJUKTtcblxudmFyIE1vbml0b3JpbmdCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBNT05JVE9SSU5HX1JPT00sXG5cdHNlcXVlbmNlKFtcblx0XHRcdHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1vbml0b3JpbmdTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgbW9uaXRvcmluZyByb29tIGlzIHB1cnBvc2VkIHRvIHNlZSBpbnRvIHRoZSB0cmFuc3BvcnQgcm9vbSwgdGh1cyB3YXRjaGluZyBmb3Igc2lnbnMgb2YgdHJvdWJsZSB3aXRoIHRoZSB0cmFuc3BvcnRlci5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiTW9uaXRvcmluZ1N0YXJ0XCIsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX21vbml0b3JpbmcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG5cbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNb25pdG9yaW5nU3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBlYXN0IGludG8gdGhlIGRvY3RvcidzIG9mZmljZS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIERPQ1RPUlNfT0ZGSUNFKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gd2VzdCBpbnRvIHRoZSB0cmFuc3BvcnQgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRSQU5TUE9SVF9ST09NKSksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblx0XHRcdF0pKSxcbiAgICAgICAgICAgICAgIFx0XHRcdHNlbGVjdG9yKFtcblx0XHRcdCAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIpID09IDAsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBtb25pdG9yaW5nIHJvb20gbmVlZHMgdG8gYmUgaW5zcGVjdGVkIHRvIG5vdGUgYW55IG1hbGZ1bmN0aW9ucy5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBDYWxlYiBvciBNYXJrXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9Pntcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIsIDEpO1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAxLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gaW5zcGVjdCB0aGUgbW9uaXRvcmluZyByb29tLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJOb3RoaW5nIGlzIHdyb25nIGluIHRoZSBtb25pdG9yaW5nIHJvb20sIGJ1dCBzb21lIGJyb2tlbiBzaGFyZHMgZmxldyBpbiBmcm9tIHRoZSBhZGphY2VudCByb29tLiBBIGphbml0b3Igd291bGQgaGF2ZSBpdCBjbGVhbmVkIHVwIGluIG5vIHRpbWUuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAvLyBFZGRpZVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIpID09IDMsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBjbGVhbiB0aGUgbW9uaXRvcmluZyByb29tLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgXSksXG5cbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHRdXG5cdCkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShNb25pdG9yaW5nQlQpO1xuXG52YXIgVHJhbnNwb3J0QlQgPSBndWFyZChcblx0KCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFRSQU5TUE9SVF9ST09NLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRzZWxlY3RvcihbXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJXaGVyZSB0aGUgdHJhbnNwb3J0ZXIgaXMgbG9jYXRlZCBhbmQgd2hlcmUgdGhlIGZhaWx1cmUgb2NjdXJyZWQuIE1hcmsgdGhlIHRyYW5zcG9ydCBvZmZpY2VyIG9mdGVuIHdvcmtzIGluIGhlcmUuIE1hcmsgaXMgYW4gb2xkZXIgY3Jld21hdGUgd2hvIGF2b2lkcyB0aGUgc3BvdGxpZ2h0IGxpa2UgdGhlIHBsYWd1ZS4gSGlzIGFueGlldHkgbGV2ZWxzIHNob3QgdXAgcmFwaWRseSBhZnRlciB0aGUgZmFpbHVyZSwgYW5kIGhlIGlzIGV4Y2Vzc2l2ZWx5IHdvcnJpZWQgdGhhdCB0aGUgcmVzdCBvZiB0aGUgY3JldyBibGFtZXMgdGhlIGZhaWx1cmUgb24gaGltLlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl90cmFuc3BvcnQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcblxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRyYW5zcG9ydFN0YXJ0XCIpID09IDEsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgXHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHRyYW5zcG9ydCByb29tIHdoZXJlIHRoZSB0ZWxlcG9ydGVyIGlzIGxvY2F0ZWQuXCIpLFxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgZWFzdCBpbnRvIHRoZSBtb25pdG9yaW5nIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNT05JVE9SSU5HX1JPT00pKSxcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFeGl0IHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcblxuXHRcdFx0XHRcdFx0Ly8gR29hbCBvcHRpb25zIGZvciB0aGUgcm9vbSAtPiBPbmx5IHNob3dpbmcgdGhlc2Ugd2hlbiB0aGUgbWFpbiBoZWxwIHRleHQgaXMgb2ZmLiBcblx0XHRcdFx0XHRcdHNlbGVjdG9yKFtcblx0XHRcdCAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlcmUgc2VlbXMgdG8gYmUgYSBwcm9ibGVtIHdpdGggdGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUuIE1heWJlIGEgdHJhbnNwb3J0IG9mZmljZXIgY291bGQgY2hlY2sgaXQgb3V0LlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgXHQvL01hcmtcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIiwgMSk7XG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGxvb2sgYXQgdGhlIHRlbGVwb3J0ZXIgc29md2FyZS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAyLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgc29mdHdhcmUgd2FzIGxvb2tlZCBvdmVyLCBidXQgYmVmb3JlIGl0IGNhbiBiZSByZXN0YXJ0ZWQsIHRoZSByb29tIG11c3QgYmUgY2xlYW5lZC4gU291bmRzIGxpa2UgYSBqYW5pdG9yJ3Mgam9iLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgLy8gRWRkaWVcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDMsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGNsZWFuIHRoZSByb29tIGJlZm9yZSBhbnkgb3RoZXIgcHJvZ3Jlc3MgaXMgbWFkZS5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA0LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgcm9vbSBpcyBjbGVhbmVkLCBzbyBub3cgdGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUgY2FuIGJlIHJlc3RhcnRlZC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIC8vIE1hcmtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDUsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byByZXN0YXJ0IHRoZSB0ZWxlcG9ydGVyIHNvZnR3YXJlLlwiKSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDYsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSB0ZWxlcG9ydGVyIHNvZnR3YXJlIHdhcyByZXN0YXJ0ZWQsIGJ1dCBub3cgaXQgbmVlZHMgdG8gYmUgcmVjb25maWd1cmVkIHRvIG1hdGNoIHRoZSBzZXR0aW5ncyBvZiB0aGUgc2hpcC5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIC8vIE1hcmtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDcsXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byByZWNvbmZpZ3VyZSB0aGUgc29mdHdhcmUuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gOCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUgaXMgbm93IGdvb2QgdG8gZ28sIHNvIGFsbCB0aGF0IGlzIGxlZnQgaXMgdG8gcmVzdGFydCB0aGUgdGVsZXBvcnRlciBpdHNlbGYuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAvLyBNYXJrXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA5LFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gcmVzdGFydCB0aGUgdGVsZXBvcnRlci5cIiksXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcblx0XHRcdFx0XHRcdF0pXG5cdFx0XHRcdFx0XSksXG5cdFx0XHRcdClcblxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBcblx0XHRdKVxuXHQpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShUcmFuc3BvcnRCVCk7XG5cbnZhciBFc2NhcGVQb2RCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBFU0NBUEVfUE9ELFxuXHRzZXF1ZW5jZShbXG5cdFx0c2VsZWN0b3IoW1xuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiKSA9PSAwLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlcmUgaXMgb25seSBvbmUgZXNjYXBlIHBvZCBhYm9hcmQgdGhpcyBzaGlwLiBJZiBhbnkgY3Jld21hdGUgYmVjb21lcyB0b28gZmVhcmZ1bCBvZiB0aGVpciBjdXJyZW50IHNpdHVhdGlvbiwgdGhleSB3aWxsIGF0dGVtcHQgdG8gbGVhdmUgaW4gaXQuXCIpLFxuICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX2VzY2FwZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIpID09IDApXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcdF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRXNjYXBlU3RhcnRcIikgPT0gMSxcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgXHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGVzY2FwZSBwb2QuXCIpLFxuXHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuXHRcdFx0XHRdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFx0XHRzZWxlY3RvcihbXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIikgPT0gMCxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGVzY2FwZSBwb2QgbmVlZHMgdG8gYmUgaW5zcGVjdGVkIGZvciBzaWducyBvZiBtYWxmdW5jdGlvbnMuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FsZWJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIsIDEpO1xuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcblx0XHRcdCAgICAgICAgICAgICAgICApLFxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIikgPT0gMSxcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGluc3BlY3QgdGhlIGVzY2FwZSBwb2QuXCIpLFxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxuXHRcdFx0ICAgICAgICAgICAgICAgICksXG5cdFx0XHQgICAgICAgIF0pLFxuICAgICAgICBdKSxcblx0XSlcbik7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEVzY2FwZVBvZEJUKTtcblxudmFyIEZCZWRyb29tQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRkVNX0JFRFJPT00sXG5cdHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgaW50byB0aGUgZmVtYWxlcycgYmVkcm9vbS5cIiksXG5cdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgYmF0aHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQVRIUk9PTSkpLFxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdCk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEZCZWRyb29tQlQpO1xuXG52YXIgQmF0aHJvb21CVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBCQVRIUk9PTSxcblx0c2VxdWVuY2UoW1xuICAgICAgICAgICAgIFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBpbnRvIHRoZSBiYXRocm9vbS5cIiksXG5cdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgc291dGggaW50byB0aGUgbWFsZXMnIGJlZHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUxFX0JFRFJPT00pKSxcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBub3J0aCBpbnRvIHRoZSBmZW1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRkVNX0JFRFJPT00pKSxcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcbiAgICAgICAgICAgIF0pLFxuXHRcdCk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEJhdGhyb29tQlQpO1xuXG52YXIgTUJlZHJvb21CVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBNQUxFX0JFRFJPT00sXG5cdHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBpbnRvIHRoZSBtYWxlcycgYmVkcm9vbS5cIiksXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIGJhdGhyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkFUSFJPT00pKSxcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXG4gICAgICAgICAgICBdKSxcblx0XHQpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShNQmVkcm9vbUJUKTtcblxudmFyIHdpcmVzMUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IHdpcmVzMS5jdXJyZW50TG9jYXRpb24sIC8vICBnZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiKVxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugbm90aWNlIHdpcmVzIG9uIHRoZSBncm91bmQuXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvblRyZWUoXCJQaWNrIHVwIHRoZSB3aXJlcy5cIixcblx0XHRcdFx0c2VxdWVuY2UoW1xuXHRcdFx0XHRcdGFjdGlvbigoKT0+dHJ1ZSwgKCkgPT4ge1xuXHRcdFx0XHRcdFx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgd2lyZXMuXCIpO1xuXHRcdFx0XHRcdFx0c2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIik7XG5cdFx0XHRcdFx0XHRzZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCwgZ2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQpICsgMSk7XG5cdFx0XHRcdFx0fSwgMCksXG5cdFx0XHRcdFx0Ly8gYWN0aW9uKCgpPT50cnVlLCAoKSA9PiB7XG5cdFx0XHRcdFx0Ly8gICAgIGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiV293IHlvdSBrbm93IGhvdyB0byBwaWNrIHVwIHRoaW5ncy5cIil9LCAwKVxuXHRcdFx0XHRdKVxuXHRcdFx0KVxuXHRcdF1cblx0KSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHdpcmVzMUJUKTtcblxudmFyIHdpcmVzMkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IHdpcmVzMi5jdXJyZW50TG9jYXRpb24sIC8vIGdldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuXHRzZXF1ZW5jZShbXG5cdFx0XHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugbm90aWNlIHdpcmVzIG9uIHRoZSBncm91bmQuXCIpLFxuXHRcdFx0YWRkVXNlckFjdGlvbihcIlBpY2sgdXAgdGhlIHdpcmVzLlwiLCAoKSA9PiB7XG5cdFx0XHRcdGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiWW91IHBpY2sgdXAgdGhlIHdpcmVzLlwiKTtcblx0XHRcdFx0c2V0SXRlbVZhcmlhYmxlKHdpcmVzMiwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIik7XG5cdFx0XHRcdHNldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkLCBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkgKyAxKTtcblx0XHRcdH0pXG5cdFx0XVxuXHQpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUod2lyZXMyQlQpO1xuXG5sZXQgYWRkR29hbFRvQWdlbnQgPSBmdW5jdGlvbihnb2FsLCBhZ2VudCwgZGVzdGluYXRpb24pIHtcblx0bGV0IG5ld0FnZW50VHJlZSA9IHNlcXVlbmNlKFtcblx0XHRsYXN0U2VlbkJ5QWdlbnQoYWdlbnQpLFxuXHRcdHNlcXVlbmNlKFtcblx0XHRcdHNlYXJjaEZvckFnZW50KGFnZW50LCBkZXN0aW5hdGlvbiksIGxhc3RTZWVuQnlBZ2VudChhZ2VudClcblx0XHRdKVxuXHRdKTtcblx0YXR0YWNoVHJlZVRvQWdlbnQoYWdlbnQsIG5ld0FnZW50VHJlZSk7XG59XG5cblxubGV0IHBsYXllclNlZXNBZ2VudCA9IGZ1bmN0aW9uKGFnZW50KSB7XG5cdHZhciBwbGF5ZXJTZWVzQWdlbnQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gYWdlbnQuY3VycmVudExvY2F0aW9uLFxuXHQgICAgc2VxdWVuY2UoW1xuXHQgICAgXHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugc2VlIFwiK2FnZW50Lm5hbWUrXCIuXCIpLFxuXHQgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAxLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gaW5zcGVjdCB0aGUgdGVsZXBvcnRlciBzb2Z0d2FyZS5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIiwgYWdlbnQsIFRSQU5TUE9SVF9ST09NKSksXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORV9ST09NOkJyb2tlblwiKSA9PSAxLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gZmluZCByZXBsYWNlbWVudCB3aXJlcyBmb3IgdGhlIGVuZ2luZS5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJFTkdJTkVfUk9PTTpCcm9rZW5cIiwgYWdlbnQsIEVOR0lORVMpKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIikgPT0gMSxcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJUZWxsIFwiICsgYWdlbnQubmFtZSArIFwiIHRvIHJlb3JnYW5pemUgdGhlIHN0b3JhZ2Ugcm9vbS5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJTVE9SQUdFOkJyb2tlblwiLCBhZ2VudCwgU1RPUkFHRSkpLFxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIpID09IDEsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiVGVsbCBcIiArIGFnZW50Lm5hbWUgKyBcIiB0byBjaGVjayB0aGUgaGVhbHRoIG9mIHRoZSBjcmV3LlwiLCAoKSA9PiBhZGRHb2FsVG9BZ2VudChcIkRSX09GRklDRTpCcm9rZW5cIiwgYWdlbnQsIERPQ1RPUlNfT0ZGSUNFKSksXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpID09IDEsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiVGVsbCBcIiArIGFnZW50Lm5hbWUgKyBcIiB0byBjb250YWN0IGEgc3VwcG9ydCBzaGlwLlwiLCAoKSA9PiBhZGRHb2FsVG9BZ2VudChcIkNPQ0tQSVQ6QnJva2VuXCIsIGFnZW50LCBDT0NLUElUKSksXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIikgPT0gMSxcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJUZWxsIFwiICsgYWdlbnQubmFtZSArIFwiIHRvIGluc3BlY3QgdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIsIGFnZW50LCBNT05JVE9SSU5HX1JPT00pKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9BUkVBOkJyb2tlblwiKSA9PSAxLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gcHJlcGFyZSBmb29kIGZvciB0aGUgY3Jldy5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJNQUlOX0FSRUE6QnJva2VuXCIsIGFnZW50LCBNQUlOX0FSRUEpKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIikgPT0gMSxcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJUZWxsIFwiICsgYWdlbnQubmFtZSArIFwiIHRvIGluc3BlY3QgdGhlIGVzY2FwZSBwb2QuXCIsICgpID0+IGFkZEdvYWxUb0FnZW50KFwiRVNDQVBFX1BPRDpCcm9rZW5cIiwgYWdlbnQsIEVTQ0FQRV9QT0QpKSxcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIC8vICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAzLFxuICAgICAgICAgICAgLy8gICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIC8vICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gY2xlYW4gdGhlIHRyYW5zcG9ydCByb29tLlwiLCAoKSA9PiBhZGRHb2FsVG9BZ2VudChcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiLCBhZ2VudCwgVFJBTlNQT1JUX1JPT00pKSxcbiAgICAgICAgICAgIC8vICAgICBdKVxuICAgICAgICAgICAgLy8gKSwgXG4gICAgICAgICAgICAvLyAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVfUk9PTTpCcm9rZW5cIikgPT0gMyxcbiAgICAgICAgICAgIC8vICAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICAvLyAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJUZWxsIFwiICsgYWdlbnQubmFtZSArIFwiIHRvIGZpbmQgYSB0b29sIGtpdC5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJFTkdJTkVfUk9PTTpCcm9rZW5cIiwgYWdlbnQsIEVOR0lORVMpKSxcbiAgICAgICAgICAgIC8vICAgICBdKVxuICAgICAgICAgICAgLy8gKSxcbiAgICAgICAgICAgIC8vICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpID09IDMsXG4gICAgICAgICAgICAvLyAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgLy8gICAgICAgICBhZGRVc2VyQWN0aW9uKFwiVGVsbCBcIiArIGFnZW50Lm5hbWUgKyBcIiB0byByZXRyaWV2ZSB0aGUgcmVwbGFjZW1lbnQgd2lyZXNcIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJTVE9SQUdFOkJyb2tlblwiLCBhZ2VudCwgU1RPUkFHRSkpLFxuICAgICAgICAgICAgLy8gICAgIF0pXG4gICAgICAgICAgICAvLyApLFxuICAgICAgICAgICAgLy8gIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAzLFxuICAgICAgICAgICAgLy8gICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIC8vICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gaGVhbCB0aGUgY3JldydzIGluanVyaWVzLlwiLCAoKSA9PiBhZGRHb2FsVG9BZ2VudChcIkRSX09GRklDRTpCcm9rZW5cIiwgYWdlbnQsIERPQ1RPUlNfT0ZGSUNFKSksXG4gICAgICAgICAgICAvLyAgICAgXSlcbiAgICAgICAgICAgIC8vICksXG4gICAgICAgICAgICAvLyAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSA9PSAzLFxuICAgICAgICAgICAgLy8gICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIC8vICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gcHJlcGFyZSB0aGUgc2hpcCB0byBtb3ZlLlwiLCAoKSA9PiBhZGRHb2FsVG9BZ2VudChcIkNPQ0tQSVQ6QnJva2VuXCIsIGFnZW50LCBDT0NLUElUKSksXG4gICAgICAgICAgICAvLyAgICAgXSlcbiAgICAgICAgICAgIC8vICksXG4gICAgICAgICAgICAvLyAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIpID09IDMsXG4gICAgICAgICAgICAvLyAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgLy8gICAgICAgICBhZGRVc2VyQWN0aW9uKFwiVGVsbCBcIiArIGFnZW50Lm5hbWUgKyBcIiB0byBjbGVhbiB0aGUgbW9uaXRvcmluZyByb29tLlwiLCAoKSA9PiBhZGRHb2FsVG9BZ2VudChcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIiwgYWdlbnQsIE1PTklUT1JJTkdfUk9PTSkpLFxuICAgICAgICAgICAgLy8gICAgIF0pXG4gICAgICAgICAgICAvLyApLFxuICAgICAgICAgICAgLy8gIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9BUkVBOkJyb2tlblwiKSA9PSAzLFxuICAgICAgICAgICAgLy8gICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIC8vICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gY2xlYW4gdGhlIGtpdGNoZW4uXCIsICgpID0+IGFkZEdvYWxUb0FnZW50KFwiTUFJTl9BUkVBOkJyb2tlblwiLCBhZ2VudCwgTUFJTl9BUkVBKSksXG4gICAgICAgICAgICAvLyAgICAgXSlcbiAgICAgICAgICAgIC8vICksXG4gICAgICAgICAgICAvLyBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA1LFxuICAgICAgICAgICAgLy8gICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIC8vICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gcmVzdGFydCB0aGUgdGVsZXBvcnRlciBzb2Z0d2FyZS5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIiwgYWdlbnQsIFRSQU5TUE9SVF9ST09NKSksXG4gICAgICAgICAgICAvLyAgICAgXSlcbiAgICAgICAgICAgIC8vICksIFxuICAgICAgICAgICAgLy8gIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FX1JPT006QnJva2VuXCIpID09IDUsXG4gICAgICAgICAgICAvLyAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgLy8gICAgICAgICBhZGRVc2VyQWN0aW9uKFwiVGVsbCBcIiArIGFnZW50Lm5hbWUgKyBcIiB0byBmaW5kIHRoZSB3aXJlcy5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJFTkdJTkVfUk9PTTpCcm9rZW5cIiwgYWdlbnQsIEVOR0lORVMpKSxcbiAgICAgICAgICAgIC8vICAgICBdKVxuICAgICAgICAgICAgLy8gKSwgXG4gICAgICAgICAgICAvLyBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA3LFxuICAgICAgICAgICAgLy8gICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIC8vICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gcmVjb25maWd1cmUgdGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUuXCIsICgpID0+IGFkZEdvYWxUb0FnZW50KFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIsIGFnZW50LCBUUkFOU1BPUlRfUk9PTSkpLFxuICAgICAgICAgICAgLy8gICAgIF0pXG4gICAgICAgICAgICAvLyApLCBcbiAgICAgICAgICAgIC8vICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORV9ST09NOkJyb2tlblwiKSA9PSA3LFxuICAgICAgICAgICAgLy8gICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIC8vICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gcmVzdGFydCB0aGUgZW5naW5lLlwiLCAoKSA9PiBhZGRHb2FsVG9BZ2VudChcIkVOR0lORV9ST09NOkJyb2tlblwiLCBhZ2VudCwgRU5HSU5FUykpLFxuICAgICAgICAgICAgLy8gICAgIF0pXG4gICAgICAgICAgICAvLyApLFxuICAgICAgICAgICAgIC8vIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDksXG4gICAgICAgICAgICAvLyAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgLy8gICAgICAgICBhZGRVc2VyQWN0aW9uKFwiVGVsbCBcIiArIGFnZW50Lm5hbWUgKyBcIiB0byByZWNvbmZpZ3VyZSB0aGUgdGVsZXBvcnRlci5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIiwgYWdlbnQsIFRSQU5TUE9SVF9ST09NKSksXG4gICAgICAgICAgICAvLyAgICAgXSlcbiAgICAgICAgICAgIC8vICksIFxuXHRcdF0pXG5cdCk7XG5cdGFkZFVzZXJJbnRlcmFjdGlvblRyZWUocGxheWVyU2Vlc0FnZW50KTtcbn1cblxucGxheWVyU2Vlc0FnZW50KENhbGViKVxucGxheWVyU2Vlc0FnZW50KFF1aW5uKVxucGxheWVyU2Vlc0FnZW50KE1hcmspXG5wbGF5ZXJTZWVzQWdlbnQoQmVhdHJpY2UpXG5cblxuLy8gLy80LiBSdW4gdGhlIHdvcmxkXG5pbml0aWFsaXplKCk7XG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCk7XG5cbi8vIC8vUkVOREVSSU5HLS0tLS1cbnZhciBkaXNwbGF5UGFuZWwgPSB7eDogMjUwLCB5OiAwfTtcbnZhciB0ZXh0UGFuZWwgPSB7eDogMjcwLCB5OiA1MDF9O1xudmFyIGFjdGlvbnNQYW5lbCA9IHt4OiA1MjAsIHk6IDU1MH07XG5cbnZhciBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5Jyk7XG52YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG52YXIgc3BhY2VzaGlwSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnNwYWNlc2hpcEltYWdlLm9ubG9hZCA9IHJlbmRlcjtcbnZhciBwbGF5ZXJJbWFnZSA9IG5ldyBJbWFnZSgpO1xudmFyIGNhbGViSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBxdWlubkltYWdlID0gbmV3IEltYWdlKCk7XG52YXIgbWFya0ltYWdlID0gbmV3IEltYWdlKCk7XG52YXIgZWRkaWVJbWFnZSA9IG5ldyBJbWFnZSgpO1xudmFyIGJlYXRyaWNlSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXHRjb250ZXh0LmRyYXdJbWFnZShzcGFjZXNoaXBJbWFnZSwgZGlzcGxheVBhbmVsLngsIGRpc3BsYXlQYW5lbC55LCAxMDAwLCA1MDApO1xuXHRkaXNwbGF5UGxheWVyKCk7XG5cdGRpc3BsYXlDYWxlYigpO1xuXHRkaXNwbGF5UXVpbm4oKTtcblx0ZGlzcGxheU1hcmsoKTtcblx0ZGlzcGxheUVkZGllKCk7XG5cdGRpc3BsYXlCZWF0cmljZSgpO1xuXHRkaXNwbGF5VGV4dEFuZEFjdGlvbnMoKTtcbn1cblxudmFyIG1hcFBvc2l0aW9ucyA9IHtcblx0XCJFTkdJTkVTXCI6IHt4OiAyODUsIHk6IDEwOH0sXG5cdFwiQ09DS1BJVFwiOiB7eDogODYwLCB5OiAyMzB9LFxuXHRcIlNUT1JBR0VcIjoge3g6IDU1MCwgeTogMTA2fSxcblx0XCJET0NUT1JTIE9GRklDRVwiOiB7eDogNzI1LCB5OiAzNTB9LFxuXHRcIk1BSU4gQVJFQVwiOiB7eDogNDgwLCB5OiAyNDB9LFxuXHRcIkVTQ0FQRSBQT0RcIjoge3g6IDIyNCwgeTogNDA4fSxcblx0XCJUUkFOU1BPUlQgUk9PTVwiOiB7eDogMzcwLCB5OiAzNTh9LFxuXHRcIk1PTklUT1JJTkcgUk9PTVwiOiB7eDogNTM1LCB5OiAzNjB9LFxuXHRcIkJBVEhST09NXCI6IHt4OiA4NSwgeTogMjQwfSxcblx0XCJNQUxFIEJFRFJPT01cIjoge3g6IDg1LCB5OiAzMzB9LFxuXHRcIkZFTSBCRURST09NXCI6IHt4OiA4NSwgeTogMTUwfVxufTtcblxuZnVuY3Rpb24gZGlzcGxheVBsYXllcigpIHtcblx0dmFyIGN1cnJMb2NhdGlvbiA9IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKTtcblx0aWYgKCFpc1VuZGVmaW5lZChtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXSkpXG5cdFx0Y29udGV4dC5kcmF3SW1hZ2UocGxheWVySW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5Q2FsZWIoKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBDYWxlYi5jdXJyZW50TG9jYXRpb247XG5cdGNvbnRleHQuZHJhd0ltYWdlKGNhbGViSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5UXVpbm4oKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBRdWlubi5jdXJyZW50TG9jYXRpb247XG5cdGNvbnRleHQuZHJhd0ltYWdlKHF1aW5uSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5TWFyaygpIHtcblx0dmFyIGN1cnJMb2NhdGlvbiA9IE1hcmsuY3VycmVudExvY2F0aW9uO1xuXHRjb250ZXh0LmRyYXdJbWFnZShtYXJrSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5RWRkaWUoKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBFZGRpZS5jdXJyZW50TG9jYXRpb247XG5cdGNvbnRleHQuZHJhd0ltYWdlKGVkZGllSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5QmVhdHJpY2UoKSB7XG5cdHZhciBjdXJyTG9jYXRpb24gPSBCZWF0cmljZS5jdXJyZW50TG9jYXRpb247XG5cdGNvbnRleHQuZHJhd0ltYWdlKGJlYXRyaWNlSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xufVxuXG5zcGFjZXNoaXBJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9zaGlwLnBuZ1wiO1xucGxheWVySW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvVGF5bG9yMy5wbmdcIjtcbmNhbGViSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvQ2FsZWIucG5nXCI7XG5xdWlubkltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL1F1aW5uLnBuZ1wiO1xubWFya0ltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL01hcmsucG5nXCI7XG5lZGRpZUltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL0VkZGllLnBuZ1wiO1xuYmVhdHJpY2VJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9CZWF0cmljZS5wbmdcIjtcblxudmFyIGN1cnJlbnRTZWxlY3Rpb247XG52YXIgeU9mZnNldCA9IGFjdGlvbnNQYW5lbC55ICsgMjU7XG52YXIgeU9mZnNldEluY3JlbWVudCA9IDI1O1xuXG5cblxuZnVuY3Rpb24gd3JhcFRleHQodGV4dCkge1xuXG4gICAgY29uc29sZS5sb2coXCJXcmFwIFRleHRcIik7XG4gICAgdmFyIHdhPXRleHQuc3BsaXQoXCIgXCIpLFxuICAgICAgICBwaHJhc2VBcnJheT1bXSxcbiAgICAgICAgbGFzdFBocmFzZT13YVswXSxcbiAgICAgICAgbWVhc3VyZT0wLFxuICAgICAgICBzcGxpdENoYXI9XCIgXCI7XG4gICAgaWYgKHdhLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgIHJldHVybiB3YVxuICAgIH1cblxuICAgIGZvciAodmFyIGk9MTtpPHdhLmxlbmd0aDtpKyspIHtcbiAgICAgICAgdmFyIHc9d2FbaV07XG4gICAgICAgIG1lYXN1cmU9Y29udGV4dC5tZWFzdXJlVGV4dChsYXN0UGhyYXNlK3NwbGl0Q2hhcit3KS53aWR0aDtcbiAgICAgICAgaWYgKG1lYXN1cmU8MTAwMCkge1xuICAgICAgICAgICAgbGFzdFBocmFzZSs9KHNwbGl0Q2hhcit3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBocmFzZUFycmF5LnB1c2gobGFzdFBocmFzZSk7XG4gICAgICAgICAgICBsYXN0UGhyYXNlPXc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGk9PT13YS5sZW5ndGgtMSkge1xuICAgICAgICAgICAgcGhyYXNlQXJyYXkucHVzaChsYXN0UGhyYXNlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHBocmFzZUFycmF5O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5VGV4dEFuZEFjdGlvbnMoKSB7XG5cdGNvbnRleHQuY2xlYXJSZWN0KHRleHRQYW5lbC54LCB0ZXh0UGFuZWwueSwgNTAwLCAxMDAwKTtcblx0XG5cblx0Y29udGV4dC5mb250ID0gXCIxNXB0IENhbGlicmlcIjtcblx0Y29udGV4dC5maWxsU3R5bGUgPSAncGluayc7XG5cdGNvbnNvbGUubG9nKFwiQWN0aW9ucyBlZmZlY3QgdGV4dDogXCIgKyB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQpO1xuXHR2YXIgdGV4dFRvRGlzcGxheSA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dC5sZW5ndGggIT0gMCA/IHdyYXBUZXh0KHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCkgOiB3cmFwVGV4dCh1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCk7XG5cblxuXHQvLyBjb25zb2xlLmxvZyh0ZXh0VG9EaXNwbGF5KTtcblx0YWN0aW9uc1BhbmVsLnkgPSB0ZXh0VG9EaXNwbGF5Lmxlbmd0aCoyNSt0ZXh0UGFuZWwueSsyMDtcblx0eU9mZnNldCA9IGFjdGlvbnNQYW5lbC55ICsgMjU7XG5cblx0Zm9yKHZhciBpPTA7IGk8dGV4dFRvRGlzcGxheS5sZW5ndGg7IGkrKyl7XG5cdFx0XHRjb250ZXh0LmZpbGxUZXh0KHRleHRUb0Rpc3BsYXlbaV0sIHRleHRQYW5lbC54LCB0ZXh0UGFuZWwueSsyNSppKzIwKTtcdFxuXHR9XG5cdFxuXG5cdGNvbnRleHQuZm9udCA9IFwiMTVwdCBDYWxpYnJpXCI7XG5cdGNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHVzZXJBY3Rpb25UZXh0ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dFtpXTtcblx0XHRjb250ZXh0LmZpbGxUZXh0KHVzZXJBY3Rpb25UZXh0LCBhY3Rpb25zUGFuZWwueCArIDIwLCB5T2Zmc2V0KTtcblx0XHRpZiAoaSA9PSAwKSB7XG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uID0gaTtcblx0XHR9XG5cdFx0eU9mZnNldCArPSB5T2Zmc2V0SW5jcmVtZW50O1xuXHR9XG5cblx0ZGlzcGxheUFycm93KCk7XG5cdGNvbnNvbGUubG9nKFwid2lyZXM6IFwiICsgZ2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQpKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUFycm93KCkge1xuXHRpZih1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKXtcblx0XHRjb250ZXh0LmNsZWFyUmVjdChhY3Rpb25zUGFuZWwueCwgYWN0aW9uc1BhbmVsLnksIDIwLCAxMDAwKTtcblx0XHRjb250ZXh0LmZpbGxUZXh0KFwiPiBcIiwgNTIwLCBhY3Rpb25zUGFuZWwueSArIDI1ICsgKGN1cnJlbnRTZWxlY3Rpb24gKiB5T2Zmc2V0SW5jcmVtZW50KSk7XG5cdH1cbn1cblxuLy9Vc2VyIGlucHV0XG5mdW5jdGlvbiBrZXlQcmVzcyhlKSB7XG5cdGlmIChlLmtleUNvZGUgPT0gMTMpIHtcblx0XHR2YXIgc2VsZWN0ZWRBY3Rpb24gPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0W2N1cnJlbnRTZWxlY3Rpb25dO1xuXHRcdGlmKCFpc1VuZGVmaW5lZChzZWxlY3RlZEFjdGlvbikpe1xuXHRcdFx0ZXhlY3V0ZVVzZXJBY3Rpb24oc2VsZWN0ZWRBY3Rpb24pO1xuXHRcdFx0d29ybGRUaWNrKCk7XG5cdFx0XHRyZW5kZXIoKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24ga2V5RG93bihlKSB7XG5cdGlmIChlLmtleUNvZGUgPT0gNDApIHsvL2Rvd25cblx0XHRpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xuXHRcdFx0Y3VycmVudFNlbGVjdGlvbisrO1xuXHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IGN1cnJlbnRTZWxlY3Rpb24gJSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDtcblx0XHRcdGRpc3BsYXlBcnJvdygpO1xuXHRcdH1cblx0fSBlbHNlIGlmIChlLmtleUNvZGUgPT0gMzgpIHsvL3VwXG5cdFx0aWYgKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApIHtcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24tLTtcblx0XHRcdGlmIChjdXJyZW50U2VsZWN0aW9uIDwgMClcblx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoIC0gMTtcblx0XHRcdGRpc3BsYXlBcnJvdygpO1xuXHRcdH1cblx0fVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwga2V5UHJlc3MsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleURvd24sIGZhbHNlKTsiLCJpbXBvcnQgUXVldWUgZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWVcIjtcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcblxuaW50ZXJmYWNlIERpY3Rpb25hcnk8VD4geyBba2V5OiBzdHJpbmddOiBUOyB9XG5cbmV4cG9ydCBlbnVtIFN0YXR1cyB7XG4gICAgUlVOTklORyxcbiAgICBTVUNDRVNTLFxuICAgIEZBSUxVUkVcbn1cblxuZnVuY3Rpb24gdGVybWluYXRlQW5kUmV0dXJuKGlkOiBudW1iZXIsIGJsYWNrYm9hcmQ6IGFueSwgc3RhdHVzOiBTdGF0dXMpIHtcbiAgICBkZWxldGUgYmxhY2tib2FyZFtpZF07XG4gICAgcmV0dXJuIHN0YXR1cztcbn1cblxuZXhwb3J0IHR5cGUgRWZmZWN0ID0gKCkgPT4gdm9pZFxuZXhwb3J0IHR5cGUgUHJlY29uZGl0aW9uID0gKCkgPT4gYm9vbGVhblxuZXhwb3J0IHR5cGUgVGljayA9ICgpID0+IFN0YXR1c1xuZXhwb3J0IHR5cGUgQWN0aW9uVGljayA9IChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgZWZmZWN0OiBFZmZlY3QsIHRpY2tzUmVxdWlyZWQ/OiBudW1iZXIpID0+IFRpY2tcbi8qKlxuICogVGhlIGd1YXJkIHRpY2sgaXMgdG8gYWRkIGEgcHJlY29uZGl0aW9uIHRvIHRoZSBjb21wb3NpdGUgdGlja3NcbiAqL1xuZXhwb3J0IHR5cGUgR3VhcmRUaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrLCBuZWdhdGU/OiBib29sZWFuKSA9PiBUaWNrXG4vKipcbiAqIFNlcXVlbmNlL1NlbGVjdG9yXG4gKi9cbmV4cG9ydCB0eXBlIENvbXBvc2l0ZVRpY2sgPSAoYXN0VGlja3M6IFRpY2tbXSkgPT4gVGlja1xuXG52YXIgYmxhY2tib2FyZCA9IHt9O1xuXG5mdW5jdGlvbiBnZXRBY3Rpb25UaWNrKGlkOiBudW1iZXIpOiBBY3Rpb25UaWNrIHtcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkID0gMSkgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByZWNvbmRpdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPSB0aWNrc1JlcXVpcmVkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZS0tO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuRkFJTFVSRTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0R3VhcmRUaWNrKCk6IEd1YXJkVGljayB7XG4gICAgcmV0dXJuIChwcmVjb25kaXRpb24sIGFzdFRpY2ssIG5lZ2F0ZSA9IGZhbHNlKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvY2VlZCA9IG5lZ2F0ZSA/ICFwcmVjb25kaXRpb24oKSA6IHByZWNvbmRpdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHByb2NlZWQgPyBleGVjdXRlKGFzdFRpY2spIDogU3RhdHVzLkZBSUxVUkU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFNlcXVlbmNlVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZFN0YXR1cyA9IGV4ZWN1dGUoYXN0VGlja3NbYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4XSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5TVUNDRVNTKVxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0b3JUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5TVUNDRVNTKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZShhc3RUaWNrOiBUaWNrKTogU3RhdHVzIHtcbiAgICByZXR1cm4gYXN0VGljaygpO1xufVxuXG52YXIgZ2xvYmFsSWRDb3VudGVyID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGlvbihwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgZWZmZWN0OiBFZmZlY3QsIHRpY2tzUmVxdWlyZWQ/OiBudW1iZXIpOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0QWN0aW9uVGljayhnbG9iYWxJZENvdW50ZXIrKykocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmVnX2d1YXJkKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrKTogVGljayB7XG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljaywgdHJ1ZSk7XG59XG5cbi8qKlxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBzdWNjZXNzIG9mIGEgY2hpbGRcbiAqIFN1Y2NlZWRzIGlmIGFsbCBzdWNjZWVkLCBlbHNlIGZhaWxzXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcbiAqIEByZXR1cm5zIHtUaWNrfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VxdWVuY2UoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xuICAgIHJldHVybiBnZXRTZXF1ZW5jZVRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcbn1cblxuLyoqXG4gKiBDeWNsZXMgb3ZlciBpdHMgY2hpbGRyZW46IGl0ZXJhdGVzIHRvIHRoZSBuZXh0IGNoaWxkIG9uIGZhaWx1cmUgb2YgYSBjaGlsZCh0aGluayBvZiBpdCBhcyBpZi1lbHNlIGJsb2NrcylcbiAqIFN1Y2NlZWRzIGlmIGV2ZW4gb25lIHN1Y2NlZWRzLCBlbHNlIGZhaWxzXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcbiAqIEByZXR1cm5zIHtUaWNrfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0b3IoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xuICAgIHJldHVybiBnZXRTZWxlY3RvclRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcbn1cblxuXG4vKi0tLS0tLS0tLS0tLS0tLSBBUElzIC0tLS0tLS0tLS0tLS0tLSAqL1xuXG4vLzAuIHV0aWxpdGllc1xuLy8gbWluIGFuZCBtYXggYXJlIGluY2x1c2l2ZVxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmROdW1iZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cblxuLy8xLiBzdG9yeSBpbnN0YW5jZVxuXG4vLzEuMSBsb2NhdGlvbnNcbi8vIHZhciBsb2NhdGlvbkdyYXBoOiBEaWN0aW9uYXJ5PExvY2F0aW9uPiA9IHt9O1xuXG52YXIgbG9jYXRpb25HcmFwaCA9IHt9O1xuXG4vLyAvLyBcbi8vIGNsYXNzIExvY2F0aW9uIHtcbi8vICAgICBhZGphY2VudExvY2F0aW9uczogRGljdGlvbmFyeTxMb2NhdGlvbltdPjtcblxuLy8gICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIGFkamFjZW50TG9jYXRpb25zOiBzdHJpbmdbXSkge1xuLy8gICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4vLyAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnRMb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcbi8vICAgICAgICAgICAgIGlmKGFkamFjZW50TG9jYXRpb25zW2ldIGluIGxvY2F0aW9uR3JhcGgpe1xuXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgICAgIHZhciBuZXdfbG9jYXRpb24gPSBuZXcgTG9jYXRpb24oKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG5cbi8vICAgICB9XG4vLyB9XG5cblxuLy9hZGQgdG8gYm90aCBzaWRlc1xuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2F0aW9uKGxvY2F0aW9uTmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcbiAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID09IHVuZGVmaW5lZClcbiAgICAgICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gW107XG4gICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdLmNvbmNhdChhZGphY2VudExvY2F0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50TG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9IFtdO1xuXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dLnB1c2gobG9jYXRpb25OYW1lKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmVBZGphY2VudChsb2NhdGlvbjE6IHN0cmluZywgbG9jYXRpb24yOiBzdHJpbmcpOmJvb2xlYW4ge1xuICAgIGNvbnNvbGUubG9nKFwiQXJlIGFkamFjZW50OiBcIiArIGxvY2F0aW9uMSArIFwiLCBcIitsb2NhdGlvbjIpO1xuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0gPT0gdW5kZWZpbmVkIHx8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24yXSA9PSB1bmRlZmluZWQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVpdGhlciBvbmUvYm90aCBsb2NhdGlvbnMgdW5kZWZpbmVkXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXVtpXSA9PSBsb2NhdGlvbjIpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vL3BhdGhmaW5kaW5nIHByaW1pdGl2ZXNcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0TG9jYXRpb24oc3RhcnQ6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdmFyIHZpc2l0ZWQgPSB7fTtcbiAgICB2YXIgcHJldmlvdXMgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbG9jYXRpb25HcmFwaCkge1xuICAgICAgICB2aXNpdGVkW2tleV0gPSBmYWxzZTtcbiAgICB9XG4gICAgdmlzaXRlZFtzdGFydF0gPSB0cnVlO1xuXG4gICAgdmFyIG15UXVldWUgPSBuZXcgUXVldWU8c3RyaW5nPigpO1xuICAgIG15UXVldWUuZW5xdWV1ZShzdGFydCk7XG5cbiAgICB3aGlsZSAoIW15UXVldWUuaXNFbXB0eSgpKSB7XG4gICAgICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBteVF1ZXVlLmRlcXVldWUoKTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gbG9jYXRpb25HcmFwaFtjdXJyZW50XTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF2aXNpdGVkW25laWdoYm9yc1tpXV0pIHtcbiAgICAgICAgICAgICAgICBteVF1ZXVlLmVucXVldWUobmVpZ2hib3JzW2ldKTtcbiAgICAgICAgICAgICAgICB2aXNpdGVkW25laWdoYm9yc1tpXV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yc1tpXV0gPSBjdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IGRlc3RpbmF0aW9uO1xuICAgIGlmIChjdXJyZW50ID09IHN0YXJ0KVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB3aGlsZSAocHJldmlvdXNbY3VycmVudF0gIT0gc3RhcnQpIHtcbiAgICAgICAgY3VycmVudCA9IHByZXZpb3VzW2N1cnJlbnRdO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50O1xufVxuXG4vLzEuMiBhZ2VudHNcblxuZXhwb3J0IGNsYXNzIEFnZW50IHtcbiAgICBjdXJyZW50TG9jYXRpb246IHN0cmluZztcbiAgICBkZXN0aW5hdGlvbjogc3RyaW5nO1xuICAgIGN1cnJlbnRCZWhhdmlvclRyZWU6IFRpY2tbXTtcblxuICAgIC8vIFNwZWNpZmljIHRvIE1hZGRpZSdzIGdhbWU/IE1vdmUgdG8gbGliIGZuPyBcbiAgICBsYXN0U2Vlbkl0ZW06IHtbaXRlbU5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBsYXN0U2VlblBlcnNvbjoge1tpdGVtTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHJhbmROdW1iZXI6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgY29uc3RydWN0b3JcIilcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TG9jYXRpb24oY3VycmVudGxvY2F0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGN1cnJlbnRsb2NhdGlvbjtcbiAgICB9XG5cbiAgICBnZXROZXh0TG9jYXRpb24oKXtcbiAgICAgICAgcmV0dXJuIGFjdGlvbihcbiAgICAgICAgICAgICgpID0+IHRydWUsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBnZXROZXh0TG9jYXRpb24odGhpcy5jdXJyZW50TG9jYXRpb24sIHRoaXMuZGVzdGluYXRpb24pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSwgXCIgYXQ6IFwiLCB0aGlzLmN1cnJlbnRMb2NhdGlvbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAwXG4gICAgKTtcbiAgICB9XG5cbiAgICBzZXREZXN0aW5hdGlvbihkZXN0aW5hdGlvbjogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgIH1cblxuICAgIHNldEJlaGF2aW9yVHJlZShiZWhhdmlvclRyZWU6IFRpY2tbXSl7XG4gICAgICAgIHRoaXMuY3VycmVudEJlaGF2aW9yVHJlZSA9IGJlaGF2aW9yVHJlZTtcbiAgICB9XG5cbiAgICAvLyBTZWVtcyBzcGVjaWZpYyB0byBNYWRkaWUncyBnYW1lPyBNb3ZlIHRvIGEgbGliIGZ1bmN0aW9uP1xuICAgIHNldExhc3RTYXdJdGVtQXRMb2NhdGlvbihpdGVtOiBJdGVtLCBhdExvY2F0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdID0gYXRMb2NhdGlvbjtcbiAgICB9XG5cbiAgICBzZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihhZ2VudE5hbWU6IHN0cmluZywgYXRMb2NhdGlvbjogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5sYXN0U2VlblBlcnNvblthZ2VudE5hbWVdID0gYXRMb2NhdGlvbjtcbiAgICB9XG5cbiAgICBoYXNTZWVuSXRlbShpdGVtOiBJdGVtKXtcbiAgICAgICAgaWYoaXRlbS5uYW1lIGluIHRoaXMubGFzdFNlZW5JdGVtKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiOiBzYXcgaXRlbTpcIitpdGVtLm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vdGhpcy5sYXN0U2Vlbkl0ZW1baXRlbS5uYW1lXVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aGVyZUlzSXRlbShpdGVtOiBJdGVtKXtcbiAgICAgICAgaWYoaXRlbS5uYW1lIGluIHRoaXMubGFzdFNlZW5JdGVtKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiOiBzYXcgaXRlbTpcIitpdGVtLm5hbWUgKyBcIiBhdCBsb2NhdGlvbjpcIit0aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG52YXIgYWdlbnRzOiBBcnJheTxBZ2VudD4gPSBuZXcgQXJyYXk8QWdlbnQ+KCk7XG4vLyB2YXIgYWdlbnRzID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBZ2VudChhZ2VudE5hbWU6IHN0cmluZykge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQWRkaW5nOiBcIithZ2VudE5hbWUpO1xuICAgIHZhciBhZ2VudCA9IG5ldyBBZ2VudChhZ2VudE5hbWUpO1xuICAgIGNvbnNvbGUubG9nKGFnZW50KTtcbiAgICBhZ2VudHMucHVzaChhZ2VudCk7XG4gICAgcmV0dXJuIGFnZW50O1xufVxuXG4vLzEuMyBpdGVtc1xuXG4vLyBUb2RvXG5jbGFzcyBJdGVtIHtcbiAgICBjdXJyZW50TG9jYXRpb246IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TG9jYXRpb24oY3VycmVudGxvY2F0aW9uOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGN1cnJlbnRsb2NhdGlvbjtcbiAgICB9XG59XG5cbnZhciBpdGVtczogQXJyYXk8SXRlbT4gPSBuZXcgQXJyYXk8SXRlbT4oKTtcbi8vIHZhciBpdGVtcyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShpdGVtTmFtZTogc3RyaW5nKSB7XG4gICAgdmFyIGl0ZW0gPSBuZXcgSXRlbShpdGVtTmFtZSk7XG4gICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICByZXR1cm4gaXRlbTtcbn1cblxuLy8xLjQgdmFyaWFibGVzXG52YXIgdmFyaWFibGVzID0ge307XG52YXIgYWdlbnRWYXJpYWJsZXMgPSB7fTtcbnZhciBpdGVtVmFyaWFibGVzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB2YXJpYWJsZXNbdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFyTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFnZW50VmFyaWFibGUoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkpXG4gICAgICAgIGFnZW50VmFyaWFibGVzW2FnZW50XSA9IHt9O1xuXG4gICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoaXNVbmRlZmluZWQodmFyaWFibGVzW3Zhck5hbWVdKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIG5vdCBzZXQhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB2YXJpYWJsZXNbdmFyTmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgYWdlbnQgXCIgKyBhZ2VudCArIFwiIG5vdCBzZXQhXCIpXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFyaWFibGVOb3RTZXQodmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZW50VmFyaWFibGVOb3RTZXQoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKTtcbn1cblxuLy8gdG9kb1xuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW1WYXJpYWJsZShpdGVtOiBJdGVtLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtLm5hbWVdKSlcbiAgICAgICAgaXRlbVZhcmlhYmxlc1tpdGVtLm5hbWVdID0ge307XG5cbiAgICBpdGVtVmFyaWFibGVzW2l0ZW0ubmFtZV1bdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXSkgfHwgaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgaXRlbSBcIiArIGl0ZW0gKyBcIiBub3Qgc2V0IVwiKVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdO1xufVxuXG5cbi8vMlxuLy9hZ2VudC1iZWhhdmlvciB0cmVlIG1hcHBpbmdcblxudmFyIGFnZW50VHJlZXM6IHtbYWdlbnROYW1lOiBzdHJpbmddIDogVGlja30gPSB7fTtcbi8vIHZhciBhZ2VudFRyZWVzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hUcmVlVG9BZ2VudChhZ2VudDogQWdlbnQsIHRyZWU6IFRpY2spIHtcbiAgICBhZ2VudFRyZWVzW2FnZW50Lm5hbWVdID0gdHJlZTtcbn1cblxuLy8zLjFcbi8vdXNlciBhY3Rpb25zXG4vL1RPRE8gYWRkIHZhcmlhYmxlcyB0byB1c2VyIGFjdGlvbiB0ZXh0c1xudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IHtcbiAgICB0ZXh0OiBcIlwiLFxuICAgIHVzZXJBY3Rpb25zVGV4dDogW10sXG4gICAgYWN0aW9uRWZmZWN0c1RleHQ6IFwiXCJcbn1cbnZhciB1c2VySW50ZXJhY3Rpb25UcmVlcyA9IFtdO1xudmFyIHVzZXJBY3Rpb25zID0ge307XG5cbmZ1bmN0aW9uIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCkge1xuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ID0gXCJcIjtcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0ID0gW107XG4gICAgdXNlckFjdGlvbnMgPSB7fTsvL3tcIkdvIHRvIGxvY2F0aW9uIFhcIiA6IGVmZmVjdFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uVHJlZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZXhlY3V0ZSh1c2VySW50ZXJhY3Rpb25UcmVlc1tpXSk7XG4gICAgfVxufVxuXG5leHBvcnQgbGV0IGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcpID0+XG4gICAgYWN0aW9uKFxuICAgICAgICAoKSA9PiB0cnVlLFxuICAgICAgICAoKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCArPSBcIlxcblwiICsgdGV4dCxcbiAgICAgICAgMFxuICAgICk7XG5leHBvcnQgbGV0IGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0ID0gKHRleHQ6IHN0cmluZykgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ICs9IFwiXFxuXCIgKyB0ZXh0O1xuXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb25UcmVlID0gKHRleHQ6IHN0cmluZywgZWZmZWN0VHJlZTogVGljaykgPT4gYWN0aW9uKFxuICAgICgpID0+IHRydWUsXG4gICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBlZmZlY3RUcmVlKSwgMFxuKTtcblxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uID0gKHRleHQ6IHN0cmluZywgZWZmZWN0OiAoKSA9PiBhbnkpID0+XG4gICAgYWN0aW9uKFxuICAgICAgICAoKSA9PiB0cnVlLFxuICAgICAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGFjdGlvbigoKT0+dHJ1ZSwgZWZmZWN0LCAwKSksIDBcbiAgICApO1xuXG5cblxuXG5cbi8vICAgICByZXR1cm4gXG4vLyB9XG5cblxuZnVuY3Rpb24gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcbiAgICB1c2VyQWN0aW9uc1t0ZXh0XSA9IHRyZWU7XG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5wdXNoKHRleHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlckludGVyYWN0aW9uVHJlZSh0aWNrOiBUaWNrKSB7XG4gICAgdXNlckludGVyYWN0aW9uVHJlZXMucHVzaCh0aWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVVc2VyQWN0aW9uKHRleHQ6IHN0cmluZykge1xuICAgIC8vZXhlY3V0ZSB0aGUgdXNlciBhY3Rpb25cbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgPSBcIlwiO1xuICAgIHZhciB1c2VyQWN0aW9uRWZmZWN0VHJlZSA9IHVzZXJBY3Rpb25zW3RleHRdO1xuICAgIGV4ZWN1dGUodXNlckFjdGlvbkVmZmVjdFRyZWUpO1xufVxuXG4vLzQuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCkge1xuICAgIHJldHVybiB1c2VySW50ZXJhY3Rpb25PYmplY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3b3JsZFRpY2soKSB7XG4gICAgLy9hbGwgYWdlbnQgdGlja3NcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJlZSA9IGFnZW50VHJlZXNbYWdlbnRzW2ldLm5hbWVdO1xuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRyZWUpKSB7XG4gICAgICAgICAgICBzZXRWYXJpYWJsZShcImV4ZWN1dGluZ0FnZW50XCIsIGFnZW50c1tpXS5uYW1lKTtcbiAgICAgICAgICAgIGV4ZWN1dGUodHJlZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcbn1cblxuXG5cbiJdfQ==
