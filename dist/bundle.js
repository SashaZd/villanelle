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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL21hZGRpZS50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFJLFlBQVksR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JJLENBQUM7QUFFRDtJQUNDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDeEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEksQ0FBQztBQUVEO0lBQ0MsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztJQUN6QyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNySSxDQUFDO0FBRUQ7SUFDQyxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDO0lBQzVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hJLENBQUM7QUFF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LENBQUM7QUFDckQsQ0FBQztBQUVELGdDQUF1QyxJQUFVO0lBQzdDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRkQsd0RBRUM7QUFFRCwyQkFBa0MsSUFBWTtJQUMxQyx5QkFBeUI7SUFDekIscUJBQXFCLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzdDLElBQUksb0JBQW9CLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFMRCw4Q0FLQztBQUVELElBQUk7QUFDSjtJQUNJLHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQUZELGdDQUVDO0FBRUQ7SUFDSSxPQUFPLHFCQUFxQixDQUFDO0FBQ2pDLENBQUM7QUFGRCw0REFFQztBQUVEO0lBQ0ksaUJBQWlCO0lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQVZELDhCQVVDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG52YXIgYXJyYXlzID0gcmVxdWlyZShcIi4vYXJyYXlzXCIpO1xyXG52YXIgTGlua2VkTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgKiBDcmVhdGVzIGFuIGVtcHR5IExpbmtlZCBMaXN0LlxyXG4gICAgKiBAY2xhc3MgQSBsaW5rZWQgbGlzdCBpcyBhIGRhdGEgc3RydWN0dXJlIGNvbnNpc3Rpbmcgb2YgYSBncm91cCBvZiBub2Rlc1xyXG4gICAgKiB3aGljaCB0b2dldGhlciByZXByZXNlbnQgYSBzZXF1ZW5jZS5cclxuICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAqL1xyXG4gICAgZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcclxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTGFzdCBub2RlIGluIHRoZSBsaXN0XHJcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0XHJcbiAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBBZGRzIGFuIGVsZW1lbnQgdG8gdGhpcyBsaXN0LlxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIGFkZGVkLlxyXG4gICAgKiBAcGFyYW0ge251bWJlcj19IGluZGV4IG9wdGlvbmFsIGluZGV4IHRvIGFkZCB0aGUgZWxlbWVudC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkXHJcbiAgICAqIHRoZSBlbGVtZW50IGlzIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhpcyBsaXN0LlxyXG4gICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBhZGRlZCBvciBmYWxzZSBpZiB0aGUgaW5kZXggaXMgaW52YWxpZFxyXG4gICAgKiBvciBpZiB0aGUgZWxlbWVudCBpcyB1bmRlZmluZWQuXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5uRWxlbWVudHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLm5FbGVtZW50cyB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld05vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoaXRlbSk7XHJcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAwIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cclxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IHRoaXMubkVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIC8vIEluc2VydCBhdCB0aGUgZW5kLlxyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlLm5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgLy8gQ2hhbmdlIGZpcnN0IG5vZGUuXHJcbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcclxuICAgICAgICAgICAgaWYgKHByZXYgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHByZXYubmV4dDtcclxuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uRWxlbWVudHMrKztcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xyXG4gICAgKiBlbXB0eS5cclxuICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5maXJzdE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4geyp9IHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXHJcbiAgICAqIGVtcHR5LlxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZGVzaXJlZCBpbmRleC5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzXHJcbiAgICAgKiBvdXQgb2YgYm91bmRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCk7XHJcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGVcclxuICAgICAqIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGUgTGlzdCBkb2VzIG5vdCBjb250YWluIHRoaXMgZWxlbWVudC5cclxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBsaXN0IGFyZVxyXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XHJcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICogfVxyXG4gICAgICogPC9wcmU+XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxyXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlXHJcbiAgICAgKiBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoaXMgbGlzdCBkb2VzIG5vdCBjb250YWluIHRoZVxyXG4gICAgICogZWxlbWVudC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXHJcbiAgICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXHJcbiAgICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgICAqXHJcbiAgICAgICAqIDxwcmU+XHJcbiAgICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcclxuICAgICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAgICogfVxyXG4gICAgICAgKiA8L3ByZT5cclxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxyXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxyXG4gICAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXHJcbiAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgZmFsc2VcclxuICAgICAgICogb3RoZXJ3aXNlLlxyXG4gICAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmluZGV4T2YoaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxyXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcclxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXHJcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXHJcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cclxuICAgICAqXHJcbiAgICAgKiA8cHJlPlxyXG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xyXG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAqIH1cclxuICAgICAqIDwvcHJlPlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSByZW1vdmVkIGZyb20gdGhpcyBsaXN0LCBpZiBwcmVzZW50LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgbGlzdCBjb250YWluZWQgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPCAxIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xyXG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBsaXN0LlxyXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3R9IG90aGVyIHRoZSBvdGhlciBsaXN0LlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcclxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xyXG4gICAgICogYXJlIGN1c3RvbSBvYmplY3RzIHlvdSBzaG91bGQgcHJvdmlkZSBhIGZ1bmN0aW9uLCBvdGhlcndpc2VcclxuICAgICAqIHRoZSA9PT0gb3BlcmF0b3IgaXMgdXNlZCB0byBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbnRzLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlciwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgTGlua2VkTGlzdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVyLnNpemUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsc0F1eCh0aGlzLmZpcnN0Tm9kZSwgb3RoZXIuZmlyc3ROb2RlLCBlcUYpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFsc0F1eCA9IGZ1bmN0aW9uIChuMSwgbjIsIGVxRikge1xyXG4gICAgICAgIHdoaWxlIChuMSAhPT0gbnVsbCAmJiBuMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoIWVxRihuMS5lbGVtZW50LCBuMi5lbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG4xID0gbjEubmV4dDtcclxuICAgICAgICAgICAgbjIgPSBuMi5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZ2l2ZW4gaW5kZXguXHJcbiAgICAgKiBAcmV0dXJuIHsqfSByZW1vdmVkIGVsZW1lbnQgb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMgfHwgdGhpcy5maXJzdE5vZGUgPT09IG51bGwgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZWxlbWVudDtcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDEpIHtcclxuICAgICAgICAgICAgLy9GaXJzdCBub2RlIGluIHRoZSBsaXN0LlxyXG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5maXJzdE5vZGUubmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChwcmV2aW91cy5uZXh0ID09PSB0aGlzLmxhc3ROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gbnVsbCAmJiBwcmV2aW91cy5uZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcHJldmlvdXMubmV4dC5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IHByZXZpb3VzLm5leHQubmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgbGlzdCBpbiBvcmRlci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xyXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxyXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGN1cnJlbnROb2RlLmVsZW1lbnQpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldmVyc2VzIHRoZSBvcmRlciBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaW5rZWQgbGlzdCAobWFrZXMgdGhlIGxhc3RcclxuICAgICAqIGVsZW1lbnQgZmlyc3QsIGFuZCB0aGUgZmlyc3QgZWxlbWVudCBsYXN0KS5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRlbXAgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IHByZXZpb3VzO1xyXG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZW1wID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmxhc3ROb2RlO1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSB0ZW1wO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0IGluIHByb3BlclxyXG4gICAgICogc2VxdWVuY2UuXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheS48Kj59IGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QsXHJcbiAgICAgKiBpbiBwcm9wZXIgc2VxdWVuY2UuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFycmF5ID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goY3VycmVudE5vZGUuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cyA8PSAwO1xyXG4gICAgfTtcclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBhcnJheXMudG9TdHJpbmcodGhpcy50b0FycmF5KCkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubm9kZUF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPT09ICh0aGlzLm5FbGVtZW50cyAtIDEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgbm9kZSAhPSBudWxsOyBpKyspIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jcmVhdGVOb2RlID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbGVtZW50OiBpdGVtLFxyXG4gICAgICAgICAgICBuZXh0OiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTGlua2VkTGlzdDtcclxufSgpKTsgLy8gRW5kIG9mIGxpbmtlZCBsaXN0XHJcbmV4cG9ydHMuZGVmYXVsdCA9IExpbmtlZExpc3Q7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZExpc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIExpbmtlZExpc3RfMSA9IHJlcXVpcmUoXCIuL0xpbmtlZExpc3RcIik7XHJcbnZhciBRdWV1ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBxdWV1ZS5cclxuICAgICAqIEBjbGFzcyBBIHF1ZXVlIGlzIGEgRmlyc3QtSW4tRmlyc3QtT3V0IChGSUZPKSBkYXRhIHN0cnVjdHVyZSwgdGhlIGZpcnN0XHJcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBxdWV1ZSB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xyXG4gICAgICogaW1wbGVtZW50YXRpb24gdXNlcyBhIGxpbmtlZCBsaXN0IGFzIGEgY29udGFpbmVyLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFF1ZXVlKCkge1xyXG4gICAgICAgIHRoaXMubGlzdCA9IG5ldyBMaW5rZWRMaXN0XzEuZGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzLmxpc3QuZmlyc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZUVsZW1lbnRBdEluZGV4KDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMsIGJ1dCBkb2VzIG5vdCByZW1vdmUsIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5maXJzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgc3RhY2sgYXJlXHJcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IsIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgKHBldDEsIHBldDIpIHtcclxuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XHJcbiAgICAgKiB9XHJcbiAgICAgKiA8L3ByZT5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXHJcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCxcclxuICAgICAqIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5jb250YWlucyhlbGVtLCBlcXVhbHNGdW5jdGlvbik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcclxuICAgICAqIG90aGVyd2lzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCkgPD0gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgcXVldWUuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxpc3QuY2xlYXIoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHF1ZXVlIGluXHJcbiAgICAgKiBGSUZPIG9yZGVyLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXHJcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXHJcbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmxpc3QuZm9yRWFjaChjYWxsYmFjayk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFF1ZXVlO1xyXG59KCkpOyAvLyBFbmQgb2YgcXVldWVcclxuZXhwb3J0cy5kZWZhdWx0ID0gUXVldWU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgaXRlbVxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXHJcbiAqL1xyXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxyXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXHJcbiAqL1xyXG5mdW5jdGlvbiBsYXN0SW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIC0xO1xyXG59XHJcbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwO1xyXG59XHJcbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGNoYW5nZWQgYWZ0ZXIgdGhpcyBjYWxsLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pO1xyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLnJlbW92ZSA9IHJlbW92ZTtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5IGVxdWFsXHJcbiAqIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHdob3NlIGZyZXF1ZW5jeSBpcyB0byBiZSBkZXRlcm1pbmVkLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXlcclxuICogZXF1YWwgdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBmcmVxdWVuY3koYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIHZhciBmcmVxID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICBmcmVxKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZyZXE7XHJcbn1cclxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBzcGVjaWZpZWQgYXJyYXlzIGFyZSBlcXVhbCB0byBvbmUgYW5vdGhlci5cclxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxyXG4gKiBvZiBlbGVtZW50cywgYW5kIGFsbCBjb3JyZXNwb25kaW5nIHBhaXJzIG9mIGVsZW1lbnRzIGluIHRoZSB0d29cclxuICogYXJyYXlzIGFyZSBlcXVhbCBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyLlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiB0aGUgb3RoZXIgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgdHdvIGFycmF5cyBhcmUgZXF1YWxcclxuICovXHJcbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBsZW5ndGggPSBhcnJheTEubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICghZXF1YWxzKGFycmF5MVtpXSwgYXJyYXkyW2ldKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0cy5lcXVhbHMgPSBlcXVhbHM7XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IHRvIGNvcHkuXHJcbiAqIEByZXR1cm4ge0FycmF5fSBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheVxyXG4gKi9cclxuZnVuY3Rpb24gY29weShhcnJheSkge1xyXG4gICAgcmV0dXJuIGFycmF5LmNvbmNhdCgpO1xyXG59XHJcbmV4cG9ydHMuY29weSA9IGNvcHk7XHJcbi8qKlxyXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIHN3YXAgZWxlbWVudHMuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIHRoZSBpbmRleCBvZiBvbmUgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgaXMgZGVmaW5lZCBhbmQgdGhlIGluZGV4ZXMgYXJlIHZhbGlkLlxyXG4gKi9cclxuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xyXG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gYXJyYXkubGVuZ3RoIHx8IGogPCAwIHx8IGogPj0gYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcclxuICAgIGFycmF5W2ldID0gYXJyYXlbal07XHJcbiAgICBhcnJheVtqXSA9IHRlbXA7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLnN3YXAgPSBzd2FwO1xyXG5mdW5jdGlvbiB0b1N0cmluZyhhcnJheSkge1xyXG4gICAgcmV0dXJuICdbJyArIGFycmF5LnRvU3RyaW5nKCkgKyAnXSc7XHJcbn1cclxuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xyXG4vKipcclxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcclxuICogc3RhcnRpbmcgZnJvbSBpbmRleCAwIHRvIGxlbmd0aCAtIDEuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBpdGVyYXRlLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcclxuICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxyXG4gKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICovXHJcbmZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIGFycmF5XzEgPSBhcnJheTsgX2kgPCBhcnJheV8xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcclxuICAgICAgICBpZiAoY2FsbGJhY2soZWxlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbmV4cG9ydHMuaGFzID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xyXG4gICAgcmV0dXJuIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XHJcbn07XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbXBhcmUgZWxlbWVudCBvcmRlci5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZShhLCBiKSB7XHJcbiAgICBpZiAoYSA8IGIpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhID09PSBiKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHRDb21wYXJlID0gZGVmYXVsdENvbXBhcmU7XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XHJcbiAgICByZXR1cm4gYSA9PT0gYjtcclxufVxyXG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xyXG4vKipcclxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb252ZXJ0IGFuIG9iamVjdCB0byBhIHN0cmluZy5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0VG9TdHJpbmcoaXRlbSkge1xyXG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gJyRzJyArIGl0ZW07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJyRvJyArIGl0ZW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHRUb1N0cmluZyA9IGRlZmF1bHRUb1N0cmluZztcclxuLyoqXHJcbiogSm9pbnMgYWxsIHRoZSBwcm9wZXJpZXMgb2YgdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgam9pbiBzdHJpbmdcclxuKi9cclxuZnVuY3Rpb24gbWFrZVN0cmluZyhpdGVtLCBqb2luKSB7XHJcbiAgICBpZiAoam9pbiA9PT0gdm9pZCAwKSB7IGpvaW4gPSAnLCc7IH1cclxuICAgIGlmIChpdGVtID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0udG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciB0b3JldCA9ICd7JztcclxuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5oYXMoaXRlbSwgcHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgam9pbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBwcm9wICsgJzonICsgaXRlbVtwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG9yZXQgKyAnfSc7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5tYWtlU3RyaW5nID0gbWFrZVN0cmluZztcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmMpIHtcclxuICAgIHJldHVybiAodHlwZW9mIGZ1bmMpID09PSAnZnVuY3Rpb24nO1xyXG59XHJcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIHVuZGVmaW5lZC5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcclxuICAgIHJldHVybiAodHlwZW9mIG9iaikgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBzdHJpbmcuXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xyXG59XHJcbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcclxuLyoqXHJcbiAqIFJldmVyc2VzIGEgY29tcGFyZSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGNvbXBhcmVGdW5jdGlvbikgfHwgIWlzRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCwgdikge1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGQsIHYpICogLTE7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnJldmVyc2VDb21wYXJlRnVuY3Rpb24gPSByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uO1xyXG4vKipcclxuICogUmV0dXJucyBhbiBlcXVhbCBmdW5jdGlvbiBnaXZlbiBhIGNvbXBhcmUgZnVuY3Rpb24uXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGFyZVRvRXF1YWxzKGNvbXBhcmVGdW5jdGlvbikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKSA9PT0gMDtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlVG9FcXVhbHMgPSBjb21wYXJlVG9FcXVhbHM7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiLyogLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNjcmlwdGluZy50c1wiLz4gKi9cclxuaW1wb3J0IHtcclxuXHRhZGRBZ2VudCwgc2V0QWdlbnRWYXJpYWJsZSwgYWRkSXRlbSwgYWRkTG9jYXRpb24sIHNldFZhcmlhYmxlLCBnZXROZXh0TG9jYXRpb24sIGFjdGlvbixcclxuXHRnZXRSYW5kTnVtYmVyLCBnZXRWYXJpYWJsZSwgc2VxdWVuY2UsIHNlbGVjdG9yLCBleGVjdXRlLCBQcmVjb25kaXRpb24sIGdldEFnZW50VmFyaWFibGUsIG5lZ19ndWFyZCwgZ3VhcmQsXHJcblx0aXNWYXJpYWJsZU5vdFNldCwgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uLCBhZGRVc2VyQWN0aW9uLCBhZGRVc2VySW50ZXJhY3Rpb25UcmVlLCBpbml0aWFsaXplLFxyXG5cdGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCwgZXhlY3V0ZVVzZXJBY3Rpb24sIHdvcmxkVGljaywgYXR0YWNoVHJlZVRvQWdlbnQsIHNldEl0ZW1WYXJpYWJsZSwgZ2V0SXRlbVZhcmlhYmxlLFxyXG5cdGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0LCBhcmVBZGphY2VudCwgYWRkVXNlckFjdGlvblRyZWUsIEFnZW50XHJcbn0gZnJvbSBcIi4vc2NyaXB0aW5nXCI7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcclxuXHJcbi8vIDEuIERlZmluZSBTdGF0ZVxyXG5cclxuLy8gTG9jYXRpb25zXHJcbnZhciBTVE9SQUdFID0gXCJTVE9SQUdFXCI7XHJcbnZhciBET0NUT1JTX09GRklDRSA9IFwiRE9DVE9SUyBPRkZJQ0VcIjtcclxudmFyIEVOR0lORVMgPSBcIkVOR0lORVNcIjtcclxudmFyIENPQ0tQSVQgPSBcIkNPQ0tQSVRcIjtcclxudmFyIEVTQ0FQRV9QT0QgPSBcIkVTQ0FQRSBQT0RcIjtcclxudmFyIFRSQU5TUE9SVF9ST09NID0gXCJUUkFOU1BPUlQgUk9PTVwiO1xyXG52YXIgTU9OSVRPUklOR19ST09NID0gXCJNT05JVE9SSU5HIFJPT01cIjtcclxudmFyIE1BSU5fQVJFQSA9IFwiTUFJTiBBUkVBXCI7XHJcbnZhciBGRU1fQkVEUk9PTSA9IFwiRkVNIEJFRFJPT01cIjtcclxudmFyIE1BTEVfQkVEUk9PTSA9IFwiTUFMRSBCRURST09NXCI7XHJcbnZhciBCQVRIUk9PTSA9IFwiQkFUSFJPT01cIjtcclxudmFyIFVOS05PV04gPSBcIlVOS05PV05cIjtcclxuXHJcbi8vIEFkZCBMb2NhdGlvbnNcclxuYWRkTG9jYXRpb24oRU5HSU5FUywgW1NUT1JBR0UsIE1BSU5fQVJFQV0pO1xyXG5hZGRMb2NhdGlvbihTVE9SQUdFLCBbRU5HSU5FUywgRE9DVE9SU19PRkZJQ0VdKTtcclxuYWRkTG9jYXRpb24oRE9DVE9SU19PRkZJQ0UsIFtTVE9SQUdFLCBNQUlOX0FSRUEsIENPQ0tQSVQsIE1PTklUT1JJTkdfUk9PTV0pO1xyXG5hZGRMb2NhdGlvbihDT0NLUElULCBbRE9DVE9SU19PRkZJQ0VdKTtcclxuYWRkTG9jYXRpb24oRVNDQVBFX1BPRCwgW01BSU5fQVJFQV0pO1xyXG5hZGRMb2NhdGlvbihUUkFOU1BPUlRfUk9PTSwgW01PTklUT1JJTkdfUk9PTSwgTUFJTl9BUkVBXSk7XHJcbmFkZExvY2F0aW9uKE1PTklUT1JJTkdfUk9PTSwgW1RSQU5TUE9SVF9ST09NLCBET0NUT1JTX09GRklDRV0pO1xyXG5hZGRMb2NhdGlvbihNQUlOX0FSRUEsIFtFTkdJTkVTLCBTVE9SQUdFLCBET0NUT1JTX09GRklDRSwgVFJBTlNQT1JUX1JPT00sIEVTQ0FQRV9QT0RdKTtcclxuYWRkTG9jYXRpb24oRkVNX0JFRFJPT00sIFtNQUlOX0FSRUEsIEJBVEhST09NXSk7XHJcbmFkZExvY2F0aW9uKE1BTEVfQkVEUk9PTSwgW01BSU5fQVJFQSwgQkFUSFJPT01dKTtcclxuYWRkTG9jYXRpb24oQkFUSFJPT00sIFtNQUlOX0FSRUEsIEZFTV9CRURST09NLCBNQUxFX0JFRFJPT01dKTtcclxuXHJcbi8vIGFnZW50c1xyXG52YXIgQ2FsZWIgPSBhZGRBZ2VudChcIkNhbGViXCIpO1xyXG52YXIgUXVpbm4gPSBhZGRBZ2VudChcIlF1aW5uXCIpO1xyXG52YXIgTWFyayA9IGFkZEFnZW50KFwiTWFya1wiKTtcclxudmFyIEVkZGllID0gYWRkQWdlbnQoXCJFZGRpZVwiKTtcclxudmFyIEJlYXRyaWNlID0gYWRkQWdlbnQoXCJCZWF0cmljZVwiKTtcclxuXHJcbi8vIGl0ZW1zXHJcbnZhciB3aXJlczEgPSBhZGRJdGVtKFwid2lyZXMxXCIpO1xyXG52YXIgd2lyZXMyID0gYWRkSXRlbShcIndpcmVzMlwiKTtcclxuXHJcblxyXG53aXJlczEuc2V0Q3VycmVudExvY2F0aW9uKFNUT1JBR0UpO1xyXG53aXJlczIuc2V0Q3VycmVudExvY2F0aW9uKE1PTklUT1JJTkdfUk9PTSk7XHJcblxyXG4vLyBzZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBTVE9SQUdFKTtcclxuLy8gc2V0SXRlbVZhcmlhYmxlKHdpcmVzMiwgXCJjdXJyZW50TG9jYXRpb25cIiwgTU9OSVRPUklOR19ST09NKTtcclxuXHJcbi8vIHZhciB3aXJlc0NvbGxlY3RlZCA9IHNldFZhcmlhYmxlKFwid2lyZXNDb2xsZWN0ZWRcIiwgMCk7XHJcblxyXG4vLyAvLyB2YXJpYWJsZXNcclxuLy9DYWxlYlxyXG4vLyBzZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImN1cnJlbnRMb2NhdGlvblwiLCBDT0NLUElUKTtcclxuQ2FsZWIuc2V0Q3VycmVudExvY2F0aW9uKENPQ0tQSVQpO1xyXG5cclxuLy9RdWlublxyXG4vLyBzZXRBZ2VudFZhcmlhYmxlKFF1aW5uLCBcImN1cnJlbnRMb2NhdGlvblwiLCBET0NUT1JTX09GRklDRSk7XHJcblF1aW5uLnNldEN1cnJlbnRMb2NhdGlvbihET0NUT1JTX09GRklDRSk7XHJcblxyXG4vL01hcmtcclxuLy8gc2V0QWdlbnRWYXJpYWJsZShNYXJrLCBcImN1cnJlbnRMb2NhdGlvblwiLCBUUkFOU1BPUlRfUk9PTSk7XHJcbk1hcmsuc2V0Q3VycmVudExvY2F0aW9uKFRSQU5TUE9SVF9ST09NKTtcclxuXHJcbi8vRWRkaWVcclxuLy8gc2V0QWdlbnRWYXJpYWJsZShFZGRpZSwgXCJjdXJyZW50TG9jYXRpb25cIiwgU1RPUkFHRSk7XHJcbkVkZGllLnNldEN1cnJlbnRMb2NhdGlvbihTVE9SQUdFKTtcclxuXHJcbi8vQmVhdHJpY2VcclxuLy8gc2V0QWdlbnRWYXJpYWJsZShCZWF0cmljZSwgXCJjdXJyZW50TG9jYXRpb25cIiwgRU5HSU5FUyk7XHJcbkJlYXRyaWNlLnNldEN1cnJlbnRMb2NhdGlvbihFTkdJTkVTKTtcclxuXHJcbi8vIFBsYXllclxyXG52YXIgcGxheWVyTG9jYXRpb24gPSBzZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIsIE1BSU5fQVJFQSk7XHJcbnZhciB3aXJlc0NvbGxlY3RlZCA9IHNldFZhcmlhYmxlKFwid2lyZXNDb2xsZWN0ZWRcIiwgMCk7XHJcblxyXG5cclxuLy8gS25vd2xlZGdlIFxyXG5DYWxlYi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcclxuUXVpbm4uc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XHJcbk1hcmsuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XHJcbkVkZGllLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xyXG5CZWF0cmljZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcclxuXHJcbi8vIHNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46d2lyZXMxXCIsIFVOS05PV04pXHJcbi8vIHNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46d2lyZXMyXCIsIFVOS05PV04pXHJcbi8vIHNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwibGFzdFNlZW46cGxheWVyXCIsIFVOS05PV04pXHJcblxyXG5DYWxlYi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcclxuLy8gQ2FsZWIuc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24ocGxheWVyLCBVTktOT1dOKTtcclxuUXVpbm4uc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XHJcbi8vIFF1aW5uLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XHJcbk1hcmsuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XHJcbi8vIE1hcmsuc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24ocGxheWVyLCBVTktOT1dOKTtcclxuRWRkaWUuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XHJcbi8vIEVkZGllLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XHJcbkJlYXRyaWNlLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIFVOS05PV04pO1xyXG4vLyBCZWF0cmljZS5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xyXG5cclxuXHJcbi8vIEdvYWxzIGZvciB0aGUgcGxheWVyXHJcblxyXG4vLyAwOiBVbmtub3duL0luaXRpYWwgU3RhdGVcclxuLy8gMTogRm91bmQgb3V0IGFib3V0IEZhdWx0OjEuIE5ldyBHb2FsLiAob25seSBvY2N1cnMgaWYgc3RhdHVzPTApXHJcbi8vIDI6IEZpeGVkIEZhdWx0OjEgKG9ubHkgb2NjdXJzIGlmIHN0YXR1cz0xKVxyXG4vLyAzOiBGb3VuZCBvdXQgYWJvdXQgRmF1bHQ6Mi4gTmV3IEdvYWwgKG9ubHkgb2NjdXJzIGlmIHN0YXR1cz0yKVxyXG4vLyA0OiBGaXhlZCBGYXVsdDoyIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9MykgXHJcbi8vIGV0Yy4gZXRjLlxyXG52YXIgZ29hbF9icm9rZW5fdHJhbnNwb3J0ID0gc2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIiwgMCk7XHRcdC8vIG1heDo0XHJcbnZhciBnb2FsX2Jyb2tlbl9lbmdpbmVzID0gc2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiLCAwKTtcclxudmFyIGdvYWxfYnJva2VuX3N0b3JhZ2UgPSBzZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIsIDApO1xyXG52YXIgZ29hbF9icm9rZW5fY29ja3BpdCA9IHNldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIiwgMCk7XHJcbnZhciBnb2FsX2Jyb2tlbl9tYWluID0gc2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIsIDApO1xyXG52YXIgZ29hbF9icm9rZW5fZHIgPSBzZXRWYXJpYWJsZShcIkRSX09GRklDRTpCcm9rZW5cIiwgMCk7XHJcbnZhciBnb2FsX2Jyb2tlbl9tb25pdG9yaW5nID0gc2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIsIDApO1xyXG52YXIgZ29hbF9icm9rZW5fZXNjYXBlID0gc2V0VmFyaWFibGUoXCJFU0NBUEVfUE9EOkJyb2tlblwiLCAwKTtcclxuXHJcbi8vIC8vIDIuIERlZmluZSBCVHNcclxuLy8gLy8gY3JlYXRlIGdyb3VuZCBhY3Rpb25zXHJcblxyXG4vLyBUb2RvIGZyb20gaGVyZVxyXG4vLyBmdW5jdGlvbiBmdW5jdGlvbl9uYW1lKGFyZ3VtZW50KSB7XHJcbi8vIFx0Ly8gYm9keS4uLlxyXG4vLyB9XHJcblxyXG5cclxuZnVuY3Rpb24gc2V0TmV4dERlc3RpbmF0aW9uRm9yQWdlbnQoYWdlbnQ6IEFnZW50LCBkZXN0aW5hdGlvbjogc3RyaW5nID0gXCJVTktOT1dOXCIpIHtcclxuXHJcblx0aWYoZGVzdGluYXRpb24gPT0gXCJVTktOT1dOXCIpe1xyXG5cdFx0bGV0IHNldFJhbmROdW1iZXIgPSBhY3Rpb24oXHJcblx0XHRcdCgpID0+IHRydWUsXHJcblx0XHRcdCgpID0+IGFnZW50LnJhbmROdW1iZXIgPSBnZXRSYW5kTnVtYmVyKDEsIDExKSxcclxuXHRcdFx0MFxyXG5cdFx0KTtcclxuXHJcblx0XHQvLyBTYXNoYSBUb2RvOiBXb3JrIG9uIHVzaW5nIHRoZSBBZ2VudC9JdGVtIHR5cGVzIGZvciBkZXN0aW5hdGlvbnNcclxuXHRcdGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFTkdJTkVTLCAwKTtcclxuXHRcdGxldCBjaG9vc2VTVE9SQUdFID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMiwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBTVE9SQUdFLCAwKTtcclxuXHRcdGxldCBjaG9vc2VET0NUT1JTX09GRklDRSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDMsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRE9DVE9SU19PRkZJQ0UsIDApO1xyXG5cdFx0bGV0IGNob29zZUNPQ0tQSVQgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA0LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IENPQ0tQSVQsIDApO1xyXG5cdFx0bGV0IGNob29zZUVTQ0FQRV9QT0QgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA1LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEVTQ0FQRV9QT0QsIDApO1xyXG5cdFx0bGV0IGNob29zZVRSQU5TUE9SVF9ST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNiwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBUUkFOU1BPUlRfUk9PTSwgMCk7XHJcblx0XHRsZXQgY2hvb3NlTU9OSVRPUklOR19ST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gNywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNT05JVE9SSU5HX1JPT00sIDApO1xyXG5cdFx0bGV0IGNob29zZU1BSU5fQVJFQSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDgsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gTUFJTl9BUkVBLCAwKTtcclxuXHRcdGxldCBjaG9vc2VGRU1fQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDksICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRkVNX0JFRFJPT00sIDApO1xyXG5cdFx0bGV0IGNob29zZU1BTEVfQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDEwLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XHJcblx0XHRsZXQgY2hvb3NlQkFUSFJPT00gPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSAxMSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBCQVRIUk9PTSwgMCk7XHJcblxyXG5cdFx0bGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlcXVlbmNlKFtcclxuXHRcdFx0c2V0UmFuZE51bWJlcixcclxuXHRcdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHRcdGNob29zZUVOR0lORVMsXHJcblx0XHRcdFx0Y2hvb3NlQ09DS1BJVCxcclxuXHRcdFx0XHRjaG9vc2VTVE9SQUdFLFxyXG5cdFx0XHRcdGNob29zZURPQ1RPUlNfT0ZGSUNFLFxyXG5cdFx0XHRcdGNob29zZUJBVEhST09NLFxyXG5cdFx0XHRcdGNob29zZU1BTEVfQkVEUk9PTSxcclxuXHRcdFx0XHRjaG9vc2VGRU1fQkVEUk9PTSxcclxuXHRcdFx0XHRjaG9vc2VNQUlOX0FSRUEsXHJcblx0XHRcdFx0Y2hvb3NlTU9OSVRPUklOR19ST09NLFxyXG5cdFx0XHRcdGNob29zZVRSQU5TUE9SVF9ST09NLFxyXG5cdFx0XHRcdGNob29zZUVTQ0FQRV9QT0RcclxuXHRcdFx0XSlcclxuXHRcdF0pO1xyXG5cdFx0cmV0dXJuIHNldE5leHREZXN0aW5hdGlvbjtcclxuXHJcblx0fVxyXG5cdGVsc2V7XHJcblx0XHRsZXQgY2hvb3NlRU5HSU5FUyA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBFTkdJTkVTLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEVOR0lORVMsIDApO1xyXG5cdFx0bGV0IGNob29zZVNUT1JBR0UgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gU1RPUkFHRSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBTVE9SQUdFLCAwKTtcclxuXHRcdGxldCBjaG9vc2VET0NUT1JTX09GRklDRSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBET0NUT1JTX09GRklDRSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBET0NUT1JTX09GRklDRSwgMCk7XHJcblx0XHRsZXQgY2hvb3NlQ09DS1BJVCA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBDT0NLUElULCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IENPQ0tQSVQsIDApO1xyXG5cdFx0bGV0IGNob29zZUVTQ0FQRV9QT0QgPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gRVNDQVBFX1BPRCwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBFU0NBUEVfUE9ELCAwKTtcclxuXHRcdGxldCBjaG9vc2VUUkFOU1BPUlRfUk9PTSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBUUkFOU1BPUlRfUk9PTSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBUUkFOU1BPUlRfUk9PTSwgMCk7XHJcblx0XHRsZXQgY2hvb3NlTU9OSVRPUklOR19ST09NID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IE1PTklUT1JJTkdfUk9PTSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNT05JVE9SSU5HX1JPT00sIDApO1xyXG5cdFx0bGV0IGNob29zZU1BSU5fQVJFQSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBNQUlOX0FSRUEsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gTUFJTl9BUkVBLCAwKTtcclxuXHRcdGxldCBjaG9vc2VGRU1fQkVEUk9PTSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBGRU1fQkVEUk9PTSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBGRU1fQkVEUk9PTSwgMCk7XHJcblx0XHRsZXQgY2hvb3NlTUFMRV9CRURST09NID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IE1BTEVfQkVEUk9PTSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNQUxFX0JFRFJPT00sIDApO1xyXG5cdFx0bGV0IGNob29zZUJBVEhST09NID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEJBVEhST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEJBVEhST09NLCAwKTtcclxuXHJcblxyXG5cdFx0bGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlbGVjdG9yKFtcclxuXHRcdFx0Y2hvb3NlRU5HSU5FUyxcclxuXHRcdFx0Y2hvb3NlQ09DS1BJVCxcclxuXHRcdFx0Y2hvb3NlU1RPUkFHRSxcclxuXHRcdFx0Y2hvb3NlRE9DVE9SU19PRkZJQ0UsXHJcblx0XHRcdGNob29zZUJBVEhST09NLFxyXG5cdFx0XHRjaG9vc2VNQUxFX0JFRFJPT00sXHJcblx0XHRcdGNob29zZUZFTV9CRURST09NLFxyXG5cdFx0XHRjaG9vc2VNQUlOX0FSRUEsXHJcblx0XHRcdGNob29zZU1PTklUT1JJTkdfUk9PTSxcclxuXHRcdFx0Y2hvb3NlVFJBTlNQT1JUX1JPT00sXHJcblx0XHRcdGNob29zZUVTQ0FQRV9QT0RcclxuXHRcdF0pO1xyXG5cclxuXHRcdHJldHVybiBzZXROZXh0RGVzdGluYXRpb247XHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbmxldCBzZXREZXN0aW5hdGlvblByZWNvbmRGb3JBZ2VudCA9IGZ1bmN0aW9uKGFnZW50OiBBZ2VudCl7XHJcblx0bGV0IHNldERlc3RpbmF0aW9uUHJlY29uZDogUHJlY29uZGl0aW9uID0gKCkgPT4gaXNVbmRlZmluZWQoYWdlbnQuZGVzdGluYXRpb24pIHx8IGFnZW50LmRlc3RpbmF0aW9uID09IGFnZW50LmN1cnJlbnRMb2NhdGlvbjtcclxuXHRyZXR1cm4gc2V0RGVzdGluYXRpb25QcmVjb25kO1x0XHJcbn1cclxuXHJcbi8vIC8vIGNyZWF0ZSBiZWhhdmlvciB0cmVlc1xyXG5cclxuXHJcbmxldCBnb3RvTmV4dExvY2F0aW9uRm9yQWdlbnQgPSBmdW5jdGlvbihhZ2VudDogQWdlbnQpe1xyXG5cdHJldHVybiAgYWN0aW9uKFxyXG5cdFx0KCkgPT4gdHJ1ZSxcclxuXHRcdCgpID0+IHtcclxuXHRcdFx0YWdlbnQuY3VycmVudExvY2F0aW9uID0gZ2V0TmV4dExvY2F0aW9uKGFnZW50LmN1cnJlbnRMb2NhdGlvbiwgYWdlbnQuZGVzdGluYXRpb24pO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhhZ2VudCwgXCIgYXQ6IFwiLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xyXG5cdFx0fSxcclxuXHRcdDBcclxuXHQpO1xyXG59XHJcblxyXG5cclxubGV0IGxhc3RTZWVuQnlBZ2VudCA9IGZ1bmN0aW9uKGFnZW50KXtcclxuXHRyZXR1cm4gc2VxdWVuY2UoW1xyXG5cdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHRhY3Rpb24oXHJcblx0XHRcdFx0XHQvL3ByZWNvbmRpdGlvblxyXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uID09IHdpcmVzMS5jdXJyZW50TG9jYXRpb24sXHJcblx0XHRcdFx0XHQvLyAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50LCAnY3VycmVudExvY2F0aW9uJykgPT0gZ2V0SXRlbVZhcmlhYmxlKHdpcmVzMSwgXCJjdXJyZW50TG9jYXRpb25cIiksXHJcblx0XHRcdFx0XHQvL2VmZmVjdFxyXG5cdFx0XHRcdFx0KCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhhZ2VudCArIFwiIHNlZXMgLSBJdGVtOiB3aXJlczEgfCBMb2NhdGlvbjogXCIrIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XHJcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwiIHNlZXMgLSBJdGVtOiB3aXJlczEgfCBMb2NhdGlvbjogXCIrIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpO1xyXG5cdFx0XHRcdFx0XHQvLyBzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczFcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXHJcblx0XHRcdFx0XHRcdGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXHJcblx0XHRcdFx0XHQwXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXHJcblx0XHRdKSxcclxuXHRcdHNlbGVjdG9yKFtcclxuXHRcdFx0YWN0aW9uKFxyXG5cdFx0XHRcdFx0Ly9wcmVjb25kaXRpb25cclxuXHRcdFx0XHRcdCgpID0+IGFnZW50LmN1cnJlbnRMb2NhdGlvbiA9PSB3aXJlczIuY3VycmVudExvY2F0aW9uLFxyXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMyLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcclxuXHRcdFx0XHRcdC8vZWZmZWN0XHJcblx0XHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50ICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMiB8IExvY2F0aW9uOiBcIisgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcclxuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coYWdlbnROYW1lICsgXCJzZWVzIC0gSXRlbTogd2lyZXMyIHwgTG9jYXRpb246IFwiK2dldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpO1xyXG5cdFx0XHRcdFx0XHRhZ2VudC5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xyXG5cdFx0XHRcdFx0XHQvLyBzZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgXCJsYXN0U2Vlbjp3aXJlczJcIiwgIGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ly90aW1lIHRha2VuXHJcblx0XHRcdFx0XHQwXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0YWN0aW9uKCgpID0+IHRydWUsICgpID0+IHt9LDApXHJcblx0XHRdKSxcclxuXHRcdHNlbGVjdG9yKFtcclxuXHRcdFx0YWN0aW9uKFxyXG5cdFx0XHRcdFx0Ly9wcmVjb25kaXRpb25cclxuXHRcdFx0XHRcdCgpID0+IGFnZW50LmN1cnJlbnRMb2NhdGlvbiAgPT0gZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSxcclxuXHRcdFx0XHRcdC8vICgpID0+IGdldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykgPT0gZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSxcclxuXHRcdFx0XHRcdC8vZWZmZWN0XHJcblx0XHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50ICsgXCIgc2VlcyAtIFBlcnNvbjogUGxheWVyIHwgTG9jYXRpb246IFwiKyBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xyXG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhhZ2VudE5hbWUgKyBcInNlZXMgLSBQZXJzb246IFBsYXllciB8IExvY2F0aW9uOiBcIitnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKTtcclxuXHRcdFx0XHRcdFx0Ly8gYWdlbnQuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcclxuXHRcdFx0XHRcdFx0YWdlbnQuc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24oJ3BsYXllcicsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XHJcblx0XHRcdFx0XHRcdC8vIHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImxhc3RTZWVuOnBsYXllclwiLCAgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQvL3RpbWUgdGFrZW5cclxuXHRcdFx0XHRcdDBcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge30sMClcclxuXHRcdF0pXHJcblx0XSk7XHJcbn07XHJcblxyXG5cclxuLy8gbGV0IGZpbmRJdGVtID0gYWN0aW9uKFxyXG4vLyAgICAgKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpLFxyXG4vLyAgICAgKCkgPT4ge1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FsZWIgZm91bmQgLSBJdGVtOiB3aXJlczFcIilcclxuXHJcblxyXG4vLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG9cIik7XHJcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coZ2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuLy8gICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJDYWxlYiBmb3VuZCB0aGUgd2lyZXMxLlwiKVxyXG4vLyAgICAgfSwgXHJcbi8vICAgICAwXHJcbi8vICk7XHJcblxyXG4vLyBsZXQgZWF0UGxheWVyID0gYWN0aW9uKCgpID0+IGdldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSxcclxuLy8gICAgICgpID0+IHtcclxuLy8gICAgICAgICBzZXRWYXJpYWJsZShcImVuZEdhbWVcIiwgXCJsb3NlXCIpO1xyXG4vLyAgICAgICAgIHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBcIk5BXCIpO1xyXG4vLyAgICAgfSwgMFxyXG4vLyApO1xyXG5cclxuLy90aGlzIG1lc3NcclxuLy8gbGV0IGNvbnZlcnNhdGlvbiA9IGFjdGlvbigoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKENhbGViLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiksXHJcbi8vICAgICAoKSA9PiB7XHJcbi8vICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBoYXBwZW4gdG8gcnVuIGludG8gQ2FsZWIuXCIpLFxyXG4vLyAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJDYWxlYjogSGF2ZSB5b3Ugbm90IGZvdW5kIHRoZSB3aXJlcyB5ZXQ/IERpZCB5b3Ugbm90IGNoZWNrIHN0b3JhZ2U/XCIpLFxyXG4vLyAgICAgfSxcclxuLy8gKTtcclxuXHJcbi8vIGxldCBzZWFyY2ggPSBzZWxlY3RvcihbXHJcbi8vICAgICBmaW5kSXRlbSxcclxuLy8gICAgIHNlcXVlbmNlKFtcclxuLy8gICAgICAgICBzZWxlY3RvcihbXHJcbi8vICAgICAgICAgICAgIGd1YXJkKHNldERlc3RpbmF0aW9uUHJlY29uZCwge30sIHNldE5leHREZXN0aW5hdGlvbiksXHJcbi8vICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XHJcbi8vICAgICAgICAgICAgIH0sIHt9LCAwKVxyXG4vLyAgICAgICAgIF0pLFxyXG4vLyAgICAgICAgIGdvdG9OZXh0TG9jYXRpb24sXHJcbi8vICAgICAgICAgZmluZEl0ZW1cclxuLy8gICAgIF0pXHJcbi8vIF0pO1xyXG5cclxubGV0IHNlYXJjaEZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50KXtcclxuXHRsZXQgc2VhcmNoID0gc2VxdWVuY2UoW1xyXG5cdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHRndWFyZChzZXREZXN0aW5hdGlvblByZWNvbmRGb3JBZ2VudChhZ2VudCksIHNldE5leHREZXN0aW5hdGlvbkZvckFnZW50KGFnZW50KSksXHJcblx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XHJcblx0XHRcdH0sMClcclxuXHRcdF0pLFxyXG5cdFx0Z290b05leHRMb2NhdGlvbkZvckFnZW50KGFnZW50KSxcclxuXHRdKTtcclxuXHJcblx0cmV0dXJuIHNlYXJjaFxyXG59XHJcblxyXG5sZXQgQ2FsZWJCVCA9IHNlcXVlbmNlKFtcclxuXHRsYXN0U2VlbkJ5QWdlbnQoQ2FsZWIpLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdHNlYXJjaEZvckFnZW50KENhbGViKSwgbGFzdFNlZW5CeUFnZW50KENhbGViKVxyXG5cdF0pXHJcbl0pO1xyXG5cclxubGV0IFF1aW5uQlQgPSBzZXF1ZW5jZShbXHJcblx0bGFzdFNlZW5CeUFnZW50KFF1aW5uKSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRzZWFyY2hGb3JBZ2VudChRdWlubiksIGxhc3RTZWVuQnlBZ2VudChRdWlubilcclxuXHRdKVxyXG5dKTtcclxuXHJcbmxldCBNYXJrQlQgPSBzZXF1ZW5jZShbXHJcblx0bGFzdFNlZW5CeUFnZW50KE1hcmspLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdHNlYXJjaEZvckFnZW50KE1hcmspLCBsYXN0U2VlbkJ5QWdlbnQoTWFyaylcclxuXHRdKVxyXG5dKTtcclxuXHJcbmxldCBFZGRpZUJUID0gc2VxdWVuY2UoW1xyXG5cdGxhc3RTZWVuQnlBZ2VudChFZGRpZSksXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0c2VhcmNoRm9yQWdlbnQoRWRkaWUpLCBsYXN0U2VlbkJ5QWdlbnQoRWRkaWUpXHJcblx0XSlcclxuXSk7XHJcblxyXG5sZXQgQmVhdHJpY2VCVCA9IHNlcXVlbmNlKFtcclxuXHRsYXN0U2VlbkJ5QWdlbnQoQmVhdHJpY2UpLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdHNlYXJjaEZvckFnZW50KEJlYXRyaWNlKSwgbGFzdFNlZW5CeUFnZW50KEJlYXRyaWNlKVxyXG5cdF0pXHJcbl0pO1xyXG5cclxuLy8gLy9hdHRhY2ggYmVoYXZpb3VyIHRyZWVzIHRvIGFnZW50c1xyXG5hdHRhY2hUcmVlVG9BZ2VudChDYWxlYiwgQ2FsZWJCVCk7XHJcbmF0dGFjaFRyZWVUb0FnZW50KFF1aW5uLCBRdWlubkJUKTtcclxuYXR0YWNoVHJlZVRvQWdlbnQoTWFyaywgTWFya0JUKTtcclxuYXR0YWNoVHJlZVRvQWdlbnQoRWRkaWUsIEVkZGllQlQpO1xyXG5hdHRhY2hUcmVlVG9BZ2VudChCZWF0cmljZSwgQmVhdHJpY2VCVCk7XHJcblxyXG4vLyAvLyAzLiBDb25zdHJ1Y3Qgc3RvcnlcclxuLy8gLy8gY3JlYXRlIHVzZXIgYWN0aW9uc1xyXG5cclxuXHJcbnNldFZhcmlhYmxlKFwidGhlU3RhcnRcIiwwKTtcclxuc2V0VmFyaWFibGUoXCJFbmdpbmVTdGFydFwiLDApO1xyXG5zZXRWYXJpYWJsZShcIlN0b3JhZ2VTdGFydFwiLDApO1xyXG5zZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIiwwKTtcclxuc2V0VmFyaWFibGUoXCJDb2NrcGl0U3RhcnRcIiwwKTtcclxuc2V0VmFyaWFibGUoXCJNb25pdG9yaW5nU3RhcnRcIiwwKTtcclxuc2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiLDApO1xyXG5zZXRWYXJpYWJsZShcIkVzY2FwZVN0YXJ0XCIsMCk7XHJcblxyXG52YXIgTWFpbkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1BSU5fQVJFQSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgLy8gZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBzaGlwJ3MgbWFpbiBhcmVhLlwiKSxcclxuICAgICAgICAgICAgc2VsZWN0b3IoW1xyXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiKSA9PSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSXQgd2FzIGEgc2ltcGxlIG1pc3Npb246IGxhbmQgb24gdGhlIG5ld2x5LWRpc2NvdmVyZWQgcGxhbmV0IFNpZ3Vyb24sIHRlbGVwb3J0IGNyZXcgbWVtYmVycyBkb3duIHRvIGl0cyBzdXJmYWNlLCBhbmQgc2VjdXJlIGFuZCBkb2N1bWVudCBuZXcgaW5mb3JtYXRpb24uIEV2ZXJ5dGhpbmcgd2VudCBhd3J5IGR1cmluZyBwaGFzZSB0d28uIEFzIG1vc3Qgb2YgdGhlIGNyZXcgZ2F0aGVyZWQgaW50byB0aGUgdHJhbnNwb3J0IGJheSwgdGhlIGNvbW1hbmRlciBhbmQgYSBmZXcgb3RoZXJzIHN0YXllZCBiZWhpbmQgdG8gbW9uaXRvciB0aGUgZXhwbG9yYXRpb24uIFRoZSB0ZWxlcG9ydGF0aW9uIHByb2Nlc3MgYmVnYW4sIHlldCBpbW1lZGlhdGVseSBhIG1hc3NpdmUgc3lzdGVtcyBmYWlsdXJlIG9jY3VycmVkLiBUaG9zZSB3aG8gaGFkIGJlZW4gYXdhaXRpbmcgdGVsZXBvcnRhdGlvbiB3ZXJlIGdvbmUsIGFzc3VtZWQgdG8gaGF2ZSBiZWVuIGxvc3QgaW4gc3BhY2UuIFRoZSBjb21tYW5kZXIgY29tZXMgdG8gYXMgdGhlIHNoaXAgaXMgcGx1bW1ldGluZyBmcm9tIG9yYml0LCB0aGVpciBjcmV3bWF0ZXMgeWVsbGluZyBhdCBlYWNoIG90aGVyLiBUaGVyZSBpcyBvbmx5IG9uZSBlc2NhcGUgcG9kIHJlbWFpbmluZy4gQXMgY29tbWFuZGVyLCB5b3UgYXJlIGVxdWlwcGVkIHdpdGggYSBzcGVjaWFsIGludGVyYWN0aXZlIG1hcCBhbGxvd2luZyB5b3UgdG8gc2VlIHRoZSBwb3NpdGlvbnMgb2YgeW91ciBjcmV3bWF0ZXMgYXQgYWxsIHRpbWVzLiBZb3UgbXVzdCB1dGlsaXplIHRoZSBtYXAgaW4gb3JkZXIgdG8gdGFrZSBjb250cm9sIG9mIHRoZSBzaGlwIGFuZCByZW1haW5pbmcgY3JldyB0byBzYXZlIGV2ZXJ5b25lIGZyb20gY2VydGFpbiBkZWF0aC5cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fbWFpbikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcclxuXHJcbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJ0aGVTdGFydFwiKSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBzaGlwJ3MgbWFpbiBhcmVhLlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkdvIG5vcnRoIHRvIGVudGVyIHRoZSBlbmdpbmUgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEVOR0lORVMpKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIG5vcnRoZWFzdCB0byBlbnRlciB0aGUgc3RvcmFnZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgU1RPUkFHRSkpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gZWFzdCB0byBlbnRlciB0aGUgY29ja3BpdC5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIENPQ0tQSVQpKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHNvdXRoZWFzdCB0byBlbnRlciB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRE9DVE9SU19PRkZJQ0UpKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHNvdXRoIGludG8gdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1PTklUT1JJTkdfUk9PTSkpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGggaW50byB0aGUgdHJhbnNwb3J0IHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUUkFOU1BPUlRfUk9PTSkpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGh3ZXN0IHRvIGVudGVyIHRoZSBlc2NhcGUgcG9kLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRVNDQVBFX1BPRCkpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gd2VzdCB0byBlbnRlciB0aGUgYmF0aHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQVRIUk9PTSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcclxuICAgICAgICAgICAgICAgXHRcdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSA9PSAwLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSXQgaGFzIGJlZW4gaG91cnMgc2luY2UgdGhlIGNyZXcgbGFzdCBhdGUuIFRoZSByZXNpZGVudCBzaGlwIG1vbSBjb3VsZCBoZWxwIHByZXBhcmUgc29tZSBmb29kLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIsIDEpO1xyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIpID09IDEsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gcHJlcGFyZSBmb29kIGZvciB0aGUgY3Jldy5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIikgPT0gMixcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBjcmV3IHdhcyBhYmxlIHRvIGVhdCwgYnV0IHRoZSBraXRjaGVuIHdhcyBsZWZ0IGEgbWVzcy4gU29tZW9uZSBuZWVkcyB0byBjbGVhbiBpdC5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIikgPT0gMyxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBjbGVhbiB0aGUga2l0Y2hlbi5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgIF0pLCAgICBcclxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShNYWluQlQpO1xyXG5cclxudmFyIEVuZ2luZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEVOR0lORVMsXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0XHRzZWxlY3RvcihbXHJcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVuZ2luZVN0YXJ0XCIpID09IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgZW5naW5lIHJvb20gaXMgd2hlcmUgQmVhdHJpY2Ugc3BlbmRzIG1vc3Qgb2YgaGVyIHRpbWUuIFNoZeKAmXMgYSBuYXR1cmFsIHdoZW4gaXQgY29tZXMgdG8gcHJvYmxlbSBzb2x2aW5nLCBidXQgaGVyIHVuYXBwcm9hY2hhYmxlIGFuZCB1bmZyaWVuZGx5IHBlcnNvbmFsaXR5IHR1cm5lZCBtYW55IGluZmx1ZW50aWFsIGNvbW1hbmRlcnMgYXdheSBmcm9tIGhlci4gRGVzcGl0ZSBoZXIgcGVyc29uYWxpdHksIGhlciBlbmdpbmVlcmluZyBza2lsbHMgYXJlIHNlY29uZC10by1ub25lLi4uZ3JhbnRlZCBzaGUgaXMgdGhlIG9ubHkgZW5naW5lZXIgbGVmdC5cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkVuZ2luZVN0YXJ0XCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fZW5naW5lcykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxyXG5cclxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVuZ2luZVN0YXJ0XCIpID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZW5naW5lIHJvb20uXCIpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiSGVhZCBlYXN0IGludG8gdGhlIHN0b3JhZ2Ugcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFNUT1JBR0UpKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXHJcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxyXG4gICAgICAgICAgICAgICBcdFx0XHRzZWxlY3RvcihbXHJcblx0XHRcdCAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSAwLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiSW4gb3JkZXIgdG8gZml4IHRoZSBlbmdpbmVzLCByZXBsYWNlbWVudCB3aXJlcyBtdXN0IGJlIGZvdW5kLiBBbiBlbmdpbmVlciBvciBqYW5pdG9yIHNob3VsZCBrbm93IHdoZXJlIHRoZXkgYXJlLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiLCAxKTtcclxuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gMSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgcmVwbGFjZW1lbnQgd2lyZXMuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSAyLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHdpcmVzIHdlcmUgZm91bmQsIGJ1dCB0aGUgdG9vbCBib3ggc2VlbXMgdG8gYmUgbWlzc2luZy4gQ2FsZWIgbWlnaHQgaGF2ZSB0YWtlbiBpdC5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSAzLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiQmVmb3JlIHRoZSBlbmdpbmVzIGNhbiBiZSBmaXhlZCwgeW91IG5lZWQgdG8gZmluZCBhIHRvb2wgYm94LlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDQsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJXaXRoIGJveCBhY3F1aXJlZCwgdGhlIHdpcmVzIGNhbiBub3cgYmUgcmVwbGFjZWQuIEFuIGVuZ2luZWVyIHNob3VsZCBrbm93IGhvdyB0byBkbyBpdC5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSA1LFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gaGF2ZSB0aGUgd2lyZXMgcmVwbGFjZWQgaW4gdGhlIGVuZ2luZSByb29tLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDYsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgZW5naW5lJ3Mgbm93IGZpeGVkLCBidXQgaXQgc3RpbGwgbmVlZHMgdG8gYmUgcmVzdGFydGVkLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDcsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gcmVzdGFydCB0aGUgdGVsZXBvcnRlci5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgIF0pLCAgICBcclxuICAgICAgICAgICAgICAgXHQvL09wdGlvbmFsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXHJcbiAgICAgICAgICAgIF0pLFxyXG5cdFx0XVxyXG5cdCkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEVuZ2luZUJUKTtcclxuXHJcbnZhciBTdG9yYWdlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gU1RPUkFHRSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRcdHNlbGVjdG9yKFtcclxuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU3RvcmFnZVN0YXJ0XCIpID09IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgc3RvcmFnZSByb29tIGlzIHdoZXJlIEVkZGllIHNwZW5kcyBoaXMgdGltZSBhbmQgc3RvcmVzIGhpcyBqYW5pdG9yIGVxdWlwbWVudC4gT2xkIGFzIGhlIGlzLCBoZSBzdGlsbCBkb2VzIGhpcyBiZXN0IHRvIGNvbnRyaWJ1dGUgdG8gdGhlIHRlYW0gaW4gd2hhdGV2ZXIgd2F5IGhlIGNhbiwgZGVzcGl0ZSBsYWNraW5nIHRlY2huaWNhbCBza2lsbHMgdGhlIG90aGVyIGNyZXdtYXRlcyBlbXBsb3kuIEFsdGhvdWdoIGhlIGlzIGEgd2VsbC1rbm93biBoZXJvIGFtb25nIG1pbGl0YXJ5IHBlcnNvbm5lbCwgaGlzIGNyZXdtYXRlcyBjb250aW51ZSB0byByZW1haW4gb2JsaXZpb3VzIHRvIHRoZSBmYWN0IHRoYXQgdGhlIG1hbiB3aG8gc2NydWJzIHRoZWlyIHRvaWxldHMgaGFkIGJlZW4gb25lIG9mIHRoZSBtb3N0IGFjY29tcGxpc2hlZCBtaWxpdGFyeSBvZmZpY2VycyB0aGUgdW5pdmVyc2UgaGFkIGV2ZXIgc2Vlbi5cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJTdG9yYWdlU3RhcnRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9zdG9yYWdlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIikgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdKSksXHJcblxyXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU3RvcmFnZVN0YXJ0XCIpID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlZCBpbnRvIHRoZSBzdG9yYWdlIHJvb20uXCIpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSB3ZXN0IGludG8gdGhlIGVuZ2luZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRU5HSU5FUykpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcclxuICAgICAgICAgICAgICAgICAgICBdKSksXHJcbiAgICAgICAgICAgICAgIFx0c2VsZWN0b3IoW1xyXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIikgPT0gMCxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBzdG9yYWdlIHJvb20gaXMgYSBtZXNzLiBBIGphbml0b3Igd291bGQgYmUgYWJsZSB0byBtYWtlIHNlbnNlIG9mIGl0IGFsbC5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIiwgMSk7XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpID09IDEsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gcmVvcmdhbml6ZSB0aGUgc3RvcmFnZSByb29tLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIikgPT0gMixcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIk5vdyB0aGF0IHRoZSBzdG9yYWdlIHJvb20gaXMgY2xlYW4sIHRoZSByZXBsYWNlbWVudCB3aXJlcyBjYW4gYnkgZm91bmQuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSA9PSAzLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiRmluZCBzb21lb25lIHRvIHJldHJpZXZlIHRoZSB3aXJlcy5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgIF0pLCAgICBcclxuXHJcbiAgICAgICAgICAgICAgIFx0Ly9PcHRpb25hbFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxyXG4gICAgICAgICAgICBdKSxcclxuXHRcdF1cclxuXHQpKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShTdG9yYWdlQlQpO1xyXG5cclxudmFyIERyT2ZmaWNlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRE9DVE9SU19PRkZJQ0UsXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0XHRzZWxlY3RvcihbXHJcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIikgPT0gMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkRyLiBRdWlubiBzcGVuZHMgYSBsb3Qgb2YgdGltZSBpbiBoZXIgb2ZmaWNlIGxvb2tpbmcgYWZ0ZXIgcGF0aWVudHMuIFNoZSBwdXRzIGFsbCBvdGhlcnMgYWJvdmUgaGVyc2VsZjsgc2hlIGlzIGNvbnN0YW50bHkgY29uY2VybmVkIHdpdGggdGhlIHdlbGwtYmVpbmcgb2YgaGVyIGNyZXdtYXRlcy4gVGhlIHByb3NwZWN0IG9mIGhlciBwYXRpZW50cyBkeWluZyBzdGlsbCBrZWVwcyBoZXIgdXAgYXQgbmlnaHQsIGJ1dCBoZXIgZGV0ZXJtaW5hdGlvbiB0byBzYXZlIGFzIG1hbnkgcGVvcGxlIGFzIHNoZSBjYW4gaXMgd2hhdCBrZWVwcyBoZXIgZ29pbmcuIEhlciBtYXRlcm5hbCBpbnN0aW5jdHMgZm9sbG93IGhlciBmcm9tIGhlciBob3VzZSB0byB0aGUgc2hpcC5cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9kcikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIkRSX09GRklDRTpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcclxuXHJcbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEck9mZmljZVN0YXJ0XCIpID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgbm9ydGhlYXN0IGludG8gdGhlIGNvY2twaXQuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT0NLUElUKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyB3ZXN0IGludG8gdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1PTklUT1JJTkdfUk9PTSkpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcclxuICAgICAgICAgICAgICAgICAgICBdKSksXHJcbiAgICAgICAgICAgICAgIFx0XHRcdHNlbGVjdG9yKFtcclxuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkRSX09GRklDRTpCcm9rZW5cIikgPT0gMCxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWUgY3Jld21hdGVzIG1heSBoYXZlIHN1c3RhaW5lZCBpbmp1cmllcy4gRmluZCB0aGUgZG9jdG9yLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIsIDEpO1xyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIpID09IDEsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gY2hlY2sgdGhlIGNyZXcncyBoZWFsdGguXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIpID09IDIsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21lIG1pbm9yIGluanVyaWVzIHdlcmUgc3VzdGFpbmVkLiBGaW5kIHRoZSBkb2N0b3IgdG8gaGVhbCB0aGUgY3JldydzIGluanVyaWVzLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAzLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiRmluZCBzb21lb25lIHRvIGhlYWwgdGhlIGNyZXcncyBpbmp1cmllcy5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgXSksICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcclxuICAgICAgICAgICAgXSksXHJcblx0XHRdXHJcblx0KSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoRHJPZmZpY2VCVCk7XHJcblxyXG52YXIgQ29ja3BpdEJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IENPQ0tQSVQsXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0XHRzZWxlY3RvcihbXHJcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNvY2twaXRTdGFydFwiKSA9PSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGNvY2twaXQgaXMgd2hlcmUgVGF5bG9yIHBpbG90cyB0aGUgc2hpcCwgYnV0IENhbGViIHNwZW5kcyBhIGxvdCBvZiBoaXMgdGltZSB0aGVyZSBhcyB3ZWxsLiBDYWxlYiBydW5zIHRoaW5ncyB2ZXJ5IGRpZmZlcmVudGx5IGZyb20gVGF5bG9yOyBoZSBpcyBhIGRlbWFuZGluZyBsZWFkZXIgd2hvIGhhcnNobHkgY3JpdGljaXplcyBoaXMgY3Jld21hdGVzIHdoZW4gZmFpbHVyZXMgb2NjdXIuIEhlIHNlY3JldGx5IGxvYXRoZXMgVGF5bG9yOyB0aGVpciBwZXJzb25hbGl0aWVzIGNsYXNoIGFsbC10b28tZnJlcXVlbnRseSwgYW5kIHRoZWlyIHBvc2l0aW9uIG9uIHRoZSBzaGlwIGRlc3BpdGUgaGlzIG9sZGVyIGFnZSBpcyBhIGNvbnN0YW50IHNvdXJjZSBvZiBhbmdlciB0byB0aGUgb2ZmaWNlci5cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkNvY2twaXRTdGFydFwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX2NvY2twaXQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcclxuXHJcbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDb2NrcGl0U3RhcnRcIikgPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgZm9yd2FyZCBpbnRvIHRoZSBjb2NrcGl0LlwiKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgc291dGh3ZXN0IGludG8gdGhlIGRvY3RvcidzIG9mZmljZS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIERPQ1RPUlNfT0ZGSUNFKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxyXG5cdFx0XSkpLFxyXG5cdFx0XHRcdFx0XHRzZWxlY3RvcihbXHJcblx0XHRcdCAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSA9PSAwLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiTm93IHRoYXQgdGhlIHNoaXAgaXMgYmFjayBvbmxpbmUsIHlvdSB3aWxsIG5lZWQgdG8gY29udGFjdCBhIHN1cHBvcnQgc2hpcC4gQW4gb2ZmaWNlciB3b3VsZCBiZSBwZXJmZWN0IGZvciB0aGUgam9iLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiLCAxKTtcclxuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIikgPT0gMSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBjb250YWN0IGEgc3VwcG9ydCBzaGlwLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIikgPT0gMixcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkEgc3VwcG9ydCBzaGlwIGhhcyBub3cgYmVlbiBjb250YWN0ZWQsIGJ1dCB0aGUgc2hpcCBtdXN0IGdldCByZWFkeSB0byBiZSBtb3ZlZC5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpID09IDMsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gcHJlcGFyZSB0aGUgc2hpcCB0byBtb3ZlLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIF0pLFxyXG5cdFx0XVxyXG5cdCkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKENvY2twaXRCVCk7XHJcblxyXG52YXIgTW9uaXRvcmluZ0JUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1PTklUT1JJTkdfUk9PTSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRcdHNlbGVjdG9yKFtcclxuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTW9uaXRvcmluZ1N0YXJ0XCIpID09IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgbW9uaXRvcmluZyByb29tIGlzIHB1cnBvc2VkIHRvIHNlZSBpbnRvIHRoZSB0cmFuc3BvcnQgcm9vbSwgdGh1cyB3YXRjaGluZyBmb3Igc2lnbnMgb2YgdHJvdWJsZSB3aXRoIHRoZSB0cmFuc3BvcnRlci5cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIk1vbml0b3JpbmdTdGFydFwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX21vbml0b3JpbmcpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIikgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdKSksXHJcblxyXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTW9uaXRvcmluZ1N0YXJ0XCIpID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgbW9uaXRvcmluZyByb29tLlwiKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgZWFzdCBpbnRvIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBET0NUT1JTX09GRklDRSkpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gd2VzdCBpbnRvIHRoZSB0cmFuc3BvcnQgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRSQU5TUE9SVF9ST09NKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxyXG5cdFx0XHRdKSksXHJcbiAgICAgICAgICAgICAgIFx0XHRcdHNlbGVjdG9yKFtcclxuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIikgPT0gMCxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBtb25pdG9yaW5nIHJvb20gbmVlZHMgdG8gYmUgaW5zcGVjdGVkIHRvIG5vdGUgYW55IG1hbGZ1bmN0aW9ucy5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiLCAxKTtcclxuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAxLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGluc3BlY3QgdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIikgPT0gMixcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIk5vdGhpbmcgaXMgd3JvbmcgaW4gdGhlIG1vbml0b3Jpbmcgcm9vbSwgYnV0IHNvbWUgYnJva2VuIHNoYXJkcyBmbGV3IGluIGZyb20gdGhlIGFkamFjZW50IHJvb20uIEEgamFuaXRvciB3b3VsZCBoYXZlIGl0IGNsZWFuZWQgdXAgaW4gbm8gdGltZS5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIikgPT0gMyxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBjbGVhbiB0aGUgbW9uaXRvcmluZyByb29tLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgXSksXHJcblxyXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXHJcbiAgICAgICAgICAgIF0pLFxyXG5cdFx0XVxyXG5cdCkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKE1vbml0b3JpbmdCVCk7XHJcblxyXG52YXIgVHJhbnNwb3J0QlQgPSBndWFyZChcclxuXHQoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gVFJBTlNQT1JUX1JPT00sXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0XHRzZWxlY3RvcihbXHJcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRyYW5zcG9ydFN0YXJ0XCIpID09IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJXaGVyZSB0aGUgdHJhbnNwb3J0ZXIgaXMgbG9jYXRlZCBhbmQgd2hlcmUgdGhlIGZhaWx1cmUgb2NjdXJyZWQuIE1hcmsgdGhlIHRyYW5zcG9ydCBvZmZpY2VyIG9mdGVuIHdvcmtzIGluIGhlcmUuIE1hcmsgaXMgYW4gb2xkZXIgY3Jld21hdGUgd2hvIGF2b2lkcyB0aGUgc3BvdGxpZ2h0IGxpa2UgdGhlIHBsYWd1ZS4gSGlzIGFueGlldHkgbGV2ZWxzIHNob3QgdXAgcmFwaWRseSBhZnRlciB0aGUgZmFpbHVyZSwgYW5kIGhlIGlzIGV4Y2Vzc2l2ZWx5IHdvcnJpZWQgdGhhdCB0aGUgcmVzdCBvZiB0aGUgY3JldyBibGFtZXMgdGhlIGZhaWx1cmUgb24gaGltLlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiVHJhbnNwb3J0U3RhcnRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl90cmFuc3BvcnQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcclxuXHJcbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiKSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICAgICBcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgdHJhbnNwb3J0IHJvb20gd2hlcmUgdGhlIHRlbGVwb3J0ZXIgaXMgbG9jYXRlZC5cIiksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIGVhc3QgaW50byB0aGUgbW9uaXRvcmluZyByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTU9OSVRPUklOR19ST09NKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFeGl0IHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcclxuXHJcblx0XHRcdFx0XHRcdC8vIEdvYWwgb3B0aW9ucyBmb3IgdGhlIHJvb20gLT4gT25seSBzaG93aW5nIHRoZXNlIHdoZW4gdGhlIG1haW4gaGVscCB0ZXh0IGlzIG9mZi4gXHJcblx0XHRcdFx0XHRcdHNlbGVjdG9yKFtcclxuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAwLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlcmUgc2VlbXMgdG8gYmUgYSBwcm9ibGVtIHdpdGggdGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUuIE1heWJlIGEgdHJhbnNwb3J0IG9mZmljZXIgY291bGQgY2hlY2sgaXQgb3V0LlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIiwgMSk7XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAxLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGxvb2sgYXQgdGhlIHRlbGVwb3J0ZXIgc29md2FyZS5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAyLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHNvZnR3YXJlIHdhcyBsb29rZWQgb3ZlciwgYnV0IGJlZm9yZSBpdCBjYW4gYmUgcmVzdGFydGVkLCB0aGUgcm9vbSBtdXN0IGJlIGNsZWFuZWQuIFNvdW5kcyBsaWtlIGEgamFuaXRvcidzIGpvYi5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAzLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gY2xlYW4gdGhlIHJvb20gYmVmb3JlIGFueSBvdGhlciBwcm9ncmVzcyBpcyBtYWRlLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDQsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgcm9vbSBpcyBjbGVhbmVkLCBzbyBub3cgdGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUgY2FuIGJlIHJlc3RhcnRlZC5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA1LFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIHJlc3RhcnQgdGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gNixcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSB0ZWxlcG9ydGVyIHNvZnR3YXJlIHdhcyByZXN0YXJ0ZWQsIGJ1dCBub3cgaXQgbmVlZHMgdG8gYmUgcmVjb25maWd1cmVkIHRvIG1hdGNoIHRoZSBzZXR0aW5ncyBvZiB0aGUgc2hpcC5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA3LFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIHJlY29uZmlndXJlIHRoZSBzb2Z0d2FyZS5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA4LFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUgaXMgbm93IGdvb2QgdG8gZ28sIHNvIGFsbCB0aGF0IGlzIGxlZnQgaXMgdG8gcmVzdGFydCB0aGUgdGVsZXBvcnRlciBpdHNlbGYuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gOSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byByZXN0YXJ0IHRoZSB0ZWxlcG9ydGVyLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0XHRcdFx0XSlcclxuXHRcdFx0XHRcdF0pLFxyXG5cdFx0XHRcdClcclxuXHJcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcclxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgXHJcblx0XHRdKVxyXG5cdCk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoVHJhbnNwb3J0QlQpO1xyXG5cclxudmFyIEVzY2FwZVBvZEJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEVTQ0FQRV9QT0QsXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0c2VsZWN0b3IoW1xyXG4gICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVzY2FwZVN0YXJ0XCIpID09IDAsXHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlcmUgaXMgb25seSBvbmUgZXNjYXBlIHBvZCBhYm9hcmQgdGhpcyBzaGlwLiBJZiBhbnkgY3Jld21hdGUgYmVjb21lcyB0b28gZmVhcmZ1bCBvZiB0aGVpciBjdXJyZW50IHNpdHVhdGlvbiwgdGhleSB3aWxsIGF0dGVtcHQgdG8gbGVhdmUgaW4gaXQuXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJOZXh0LlwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiRXNjYXBlU3RhcnRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX2VzY2FwZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIikgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcdF0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVzY2FwZVN0YXJ0XCIpID09IDEsXHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICBcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZXNjYXBlIHBvZC5cIiksXHJcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcclxuXHRcdFx0XHRdKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBcdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIikgPT0gMCxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBlc2NhcGUgcG9kIG5lZWRzIHRvIGJlIGluc3BlY3RlZCBmb3Igc2lnbnMgb2YgbWFsZnVuY3Rpb25zLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJFU0NBUEVfUE9EOkJyb2tlblwiLCAxKTtcclxuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIikgPT0gMSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBpbnNwZWN0IHRoZSBlc2NhcGUgcG9kLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICBdKSxcclxuICAgICAgICBdKSxcclxuXHRdKVxyXG4pO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEVzY2FwZVBvZEJUKTtcclxuXHJcbnZhciBGQmVkcm9vbUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEZFTV9CRURST09NLFxyXG5cdHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIGZlbWFsZXMnIGJlZHJvb20uXCIpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBiYXRocm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJBVEhST09NKSksXHJcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcclxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcclxuICAgICAgICAgICAgXSksXHJcblx0XHQpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEZCZWRyb29tQlQpO1xyXG5cclxudmFyIEJhdGhyb29tQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQkFUSFJPT00sXHJcblx0c2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgXHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIGJhdGhyb29tLlwiKSxcclxuXHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHNvdXRoIGludG8gdGhlIG1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFMRV9CRURST09NKSksXHJcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBub3J0aCBpbnRvIHRoZSBmZW1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRkVNX0JFRFJPT00pKSxcclxuXHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXHJcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcclxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcclxuICAgICAgICAgICAgXSksXHJcblx0XHQpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEJhdGhyb29tQlQpO1xyXG5cclxudmFyIE1CZWRyb29tQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTUFMRV9CRURST09NLFxyXG5cdHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIG1hbGVzJyBiZWRyb29tLlwiKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byBiYXRocm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJBVEhST09NKSksXHJcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcclxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcclxuICAgICAgICAgICAgXSksXHJcblx0XHQpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKE1CZWRyb29tQlQpO1xyXG5cclxudmFyIHdpcmVzMUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IHdpcmVzMS5jdXJyZW50TG9jYXRpb24sIC8vICBnZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiKVxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5vdGljZSB3aXJlcyBvbiB0aGUgZ3JvdW5kLlwiKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvblRyZWUoXCJQaWNrIHVwIHRoZSB3aXJlcy5cIixcclxuXHRcdFx0XHRzZXF1ZW5jZShbXHJcblx0XHRcdFx0XHRhY3Rpb24oKCk9PnRydWUsICgpID0+IHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgd2lyZXMuXCIpO1xyXG5cdFx0XHRcdFx0XHRzZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInBsYXllclwiKTtcclxuXHRcdFx0XHRcdFx0c2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQsIGdldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkKSArIDEpO1xyXG5cdFx0XHRcdFx0fSwgMCksXHJcblx0XHRcdFx0XHQvLyBhY3Rpb24oKCk9PnRydWUsICgpID0+IHtcclxuXHRcdFx0XHRcdC8vICAgICBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIldvdyB5b3Uga25vdyBob3cgdG8gcGljayB1cCB0aGluZ3MuXCIpfSwgMClcclxuXHRcdFx0XHRdKVxyXG5cdFx0XHQpXHJcblx0XHRdXHJcblx0KSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUod2lyZXMxQlQpO1xyXG5cclxudmFyIHdpcmVzMkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IHdpcmVzMi5jdXJyZW50TG9jYXRpb24sIC8vIGdldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIpLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5vdGljZSB3aXJlcyBvbiB0aGUgZ3JvdW5kLlwiKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvbihcIlBpY2sgdXAgdGhlIHdpcmVzLlwiLCAoKSA9PiB7XHJcblx0XHRcdFx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgd2lyZXMuXCIpO1xyXG5cdFx0XHRcdHNldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpO1xyXG5cdFx0XHRcdHNldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkLCBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkgKyAxKTtcclxuXHRcdFx0fSlcclxuXHRcdF1cclxuXHQpKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZSh3aXJlczJCVCk7XHJcblxyXG5cclxuLy8gLy80LiBSdW4gdGhlIHdvcmxkXHJcbmluaXRpYWxpemUoKTtcclxudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCgpO1xyXG5cclxuLy8gLy9SRU5ERVJJTkctLS0tLVxyXG52YXIgZGlzcGxheVBhbmVsID0ge3g6IDI1MCwgeTogMH07XHJcbnZhciB0ZXh0UGFuZWwgPSB7eDogMjcwLCB5OiA1MDF9O1xyXG52YXIgYWN0aW9uc1BhbmVsID0ge3g6IDUyMCwgeTogNTUwfTtcclxuXHJcbnZhciBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5Jyk7XHJcbnZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG52YXIgc3BhY2VzaGlwSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuc3BhY2VzaGlwSW1hZ2Uub25sb2FkID0gcmVuZGVyO1xyXG52YXIgcGxheWVySW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxudmFyIGNhbGViSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxudmFyIHF1aW5uSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxudmFyIG1hcmtJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG52YXIgZWRkaWVJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG52YXIgYmVhdHJpY2VJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG5cdGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblx0Y29udGV4dC5kcmF3SW1hZ2Uoc3BhY2VzaGlwSW1hZ2UsIGRpc3BsYXlQYW5lbC54LCBkaXNwbGF5UGFuZWwueSwgMTAwMCwgNTAwKTtcclxuXHRkaXNwbGF5UGxheWVyKCk7XHJcblx0ZGlzcGxheUNhbGViKCk7XHJcblx0ZGlzcGxheVF1aW5uKCk7XHJcblx0ZGlzcGxheU1hcmsoKTtcclxuXHRkaXNwbGF5RWRkaWUoKTtcclxuXHRkaXNwbGF5QmVhdHJpY2UoKTtcclxuXHRkaXNwbGF5VGV4dEFuZEFjdGlvbnMoKTtcclxufVxyXG5cclxudmFyIG1hcFBvc2l0aW9ucyA9IHtcclxuXHRcIkVOR0lORVNcIjoge3g6IDI4NSwgeTogMTA4fSxcclxuXHRcIkNPQ0tQSVRcIjoge3g6IDg2MCwgeTogMjMwfSxcclxuXHRcIlNUT1JBR0VcIjoge3g6IDU1MCwgeTogMTA2fSxcclxuXHRcIkRPQ1RPUlMgT0ZGSUNFXCI6IHt4OiA3MjUsIHk6IDM1MH0sXHJcblx0XCJNQUlOIEFSRUFcIjoge3g6IDQ4MCwgeTogMjQwfSxcclxuXHRcIkVTQ0FQRSBQT0RcIjoge3g6IDIyNCwgeTogNDA4fSxcclxuXHRcIlRSQU5TUE9SVCBST09NXCI6IHt4OiAzNzAsIHk6IDM1OH0sXHJcblx0XCJNT05JVE9SSU5HIFJPT01cIjoge3g6IDUzNSwgeTogMzYwfSxcclxuXHRcIkJBVEhST09NXCI6IHt4OiA4NSwgeTogMjQwfSxcclxuXHRcIk1BTEUgQkVEUk9PTVwiOiB7eDogODUsIHk6IDMzMH0sXHJcblx0XCJGRU0gQkVEUk9PTVwiOiB7eDogODUsIHk6IDE1MH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlQbGF5ZXIoKSB7XHJcblx0dmFyIGN1cnJMb2NhdGlvbiA9IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKTtcclxuXHRpZiAoIWlzVW5kZWZpbmVkKG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dKSlcclxuXHRcdGNvbnRleHQuZHJhd0ltYWdlKHBsYXllckltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUNhbGViKCkge1xyXG5cdHZhciBjdXJyTG9jYXRpb24gPSBDYWxlYi5jdXJyZW50TG9jYXRpb247XHJcblx0Y29udGV4dC5kcmF3SW1hZ2UoY2FsZWJJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlRdWlubigpIHtcclxuXHR2YXIgY3VyckxvY2F0aW9uID0gUXVpbm4uY3VycmVudExvY2F0aW9uO1xyXG5cdGNvbnRleHQuZHJhd0ltYWdlKHF1aW5uSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5TWFyaygpIHtcclxuXHR2YXIgY3VyckxvY2F0aW9uID0gTWFyay5jdXJyZW50TG9jYXRpb247XHJcblx0Y29udGV4dC5kcmF3SW1hZ2UobWFya0ltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUVkZGllKCkge1xyXG5cdHZhciBjdXJyTG9jYXRpb24gPSBFZGRpZS5jdXJyZW50TG9jYXRpb247XHJcblx0Y29udGV4dC5kcmF3SW1hZ2UoZWRkaWVJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlCZWF0cmljZSgpIHtcclxuXHR2YXIgY3VyckxvY2F0aW9uID0gQmVhdHJpY2UuY3VycmVudExvY2F0aW9uO1xyXG5cdGNvbnRleHQuZHJhd0ltYWdlKGJlYXRyaWNlSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xyXG59XHJcblxyXG5zcGFjZXNoaXBJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9zaGlwLnBuZ1wiO1xyXG5wbGF5ZXJJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9UYXlsb3IzLnBuZ1wiO1xyXG5jYWxlYkltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL0NhbGViLnBuZ1wiO1xyXG5xdWlubkltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL1F1aW5uLnBuZ1wiO1xyXG5tYXJrSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvTWFyay5wbmdcIjtcclxuZWRkaWVJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9FZGRpZS5wbmdcIjtcclxuYmVhdHJpY2VJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9CZWF0cmljZS5wbmdcIjtcclxuXHJcbnZhciBjdXJyZW50U2VsZWN0aW9uO1xyXG52YXIgeU9mZnNldCA9IGFjdGlvbnNQYW5lbC55ICsgMjU7XHJcbnZhciB5T2Zmc2V0SW5jcmVtZW50ID0gMjU7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHdyYXBUZXh0KHRleHQpIHtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIldyYXAgVGV4dFwiKTtcclxuICAgIHZhciB3YT10ZXh0LnNwbGl0KFwiIFwiKSxcclxuICAgICAgICBwaHJhc2VBcnJheT1bXSxcclxuICAgICAgICBsYXN0UGhyYXNlPXdhWzBdLFxyXG4gICAgICAgIG1lYXN1cmU9MCxcclxuICAgICAgICBzcGxpdENoYXI9XCIgXCI7XHJcbiAgICBpZiAod2EubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICByZXR1cm4gd2FcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpPTE7aTx3YS5sZW5ndGg7aSsrKSB7XHJcbiAgICAgICAgdmFyIHc9d2FbaV07XHJcbiAgICAgICAgbWVhc3VyZT1jb250ZXh0Lm1lYXN1cmVUZXh0KGxhc3RQaHJhc2Urc3BsaXRDaGFyK3cpLndpZHRoO1xyXG4gICAgICAgIGlmIChtZWFzdXJlPDEwMDApIHtcclxuICAgICAgICAgICAgbGFzdFBocmFzZSs9KHNwbGl0Q2hhcit3KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwaHJhc2VBcnJheS5wdXNoKGxhc3RQaHJhc2UpO1xyXG4gICAgICAgICAgICBsYXN0UGhyYXNlPXc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpPT09d2EubGVuZ3RoLTEpIHtcclxuICAgICAgICAgICAgcGhyYXNlQXJyYXkucHVzaChsYXN0UGhyYXNlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHBocmFzZUFycmF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VGV4dEFuZEFjdGlvbnMoKSB7XHJcblx0Y29udGV4dC5jbGVhclJlY3QodGV4dFBhbmVsLngsIHRleHRQYW5lbC55LCA1MDAsIDEwMDApO1xyXG5cdFxyXG5cclxuXHRjb250ZXh0LmZvbnQgPSBcIjE1cHQgQ2FsaWJyaVwiO1xyXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gJ3BpbmsnO1xyXG5cdGNvbnNvbGUubG9nKFwiQWN0aW9ucyBlZmZlY3QgdGV4dDogXCIgKyB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQpO1xyXG5cdHZhciB0ZXh0VG9EaXNwbGF5ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0Lmxlbmd0aCAhPSAwID8gd3JhcFRleHQodXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0KSA6IHdyYXBUZXh0KHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0KTtcclxuXHJcblxyXG5cdC8vIGNvbnNvbGUubG9nKHRleHRUb0Rpc3BsYXkpO1xyXG5cdGFjdGlvbnNQYW5lbC55ID0gdGV4dFRvRGlzcGxheS5sZW5ndGgqMjUrdGV4dFBhbmVsLnkrMjA7XHJcblx0eU9mZnNldCA9IGFjdGlvbnNQYW5lbC55ICsgMjU7XHJcblxyXG5cdGZvcih2YXIgaT0wOyBpPHRleHRUb0Rpc3BsYXkubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRjb250ZXh0LmZpbGxUZXh0KHRleHRUb0Rpc3BsYXlbaV0sIHRleHRQYW5lbC54LCB0ZXh0UGFuZWwueSsyNSppKzIwKTtcdFxyXG5cdH1cclxuXHRcclxuXHJcblx0Y29udGV4dC5mb250ID0gXCIxNXB0IENhbGlicmlcIjtcclxuXHRjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgdXNlckFjdGlvblRleHQgPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0W2ldO1xyXG5cdFx0Y29udGV4dC5maWxsVGV4dCh1c2VyQWN0aW9uVGV4dCwgYWN0aW9uc1BhbmVsLnggKyAyMCwgeU9mZnNldCk7XHJcblx0XHRpZiAoaSA9PSAwKSB7XHJcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSBpO1xyXG5cdFx0fVxyXG5cdFx0eU9mZnNldCArPSB5T2Zmc2V0SW5jcmVtZW50O1xyXG5cdH1cclxuXHJcblx0ZGlzcGxheUFycm93KCk7XHJcblx0Y29uc29sZS5sb2coXCJ3aXJlczogXCIgKyBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QXJyb3coKSB7XHJcblx0aWYodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCl7XHJcblx0XHRjb250ZXh0LmNsZWFyUmVjdChhY3Rpb25zUGFuZWwueCwgYWN0aW9uc1BhbmVsLnksIDIwLCAxMDAwKTtcclxuXHRcdGNvbnRleHQuZmlsbFRleHQoXCI+IFwiLCA1MjAsIGFjdGlvbnNQYW5lbC55ICsgMjUgKyAoY3VycmVudFNlbGVjdGlvbiAqIHlPZmZzZXRJbmNyZW1lbnQpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vVXNlciBpbnB1dFxyXG5mdW5jdGlvbiBrZXlQcmVzcyhlKSB7XHJcblx0aWYgKGUua2V5Q29kZSA9PSAxMykge1xyXG5cdFx0dmFyIHNlbGVjdGVkQWN0aW9uID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dFtjdXJyZW50U2VsZWN0aW9uXTtcclxuXHRcdGlmKCFpc1VuZGVmaW5lZChzZWxlY3RlZEFjdGlvbikpe1xyXG5cdFx0XHRleGVjdXRlVXNlckFjdGlvbihzZWxlY3RlZEFjdGlvbik7XHJcblx0XHRcdHdvcmxkVGljaygpO1xyXG5cdFx0XHRyZW5kZXIoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGtleURvd24oZSkge1xyXG5cdGlmIChlLmtleUNvZGUgPT0gNDApIHsvL2Rvd25cclxuXHRcdGlmICh1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24rKztcclxuXHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IGN1cnJlbnRTZWxlY3Rpb24gJSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDtcclxuXHRcdFx0ZGlzcGxheUFycm93KCk7XHJcblx0XHR9XHJcblx0fSBlbHNlIGlmIChlLmtleUNvZGUgPT0gMzgpIHsvL3VwXHJcblx0XHRpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uLS07XHJcblx0XHRcdGlmIChjdXJyZW50U2VsZWN0aW9uIDwgMClcclxuXHRcdFx0XHRjdXJyZW50U2VsZWN0aW9uID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggLSAxO1xyXG5cdFx0XHRkaXNwbGF5QXJyb3coKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBrZXlQcmVzcywgZmFsc2UpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlEb3duLCBmYWxzZSk7IiwiaW1wb3J0IFF1ZXVlIGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL1F1ZXVlXCI7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcclxuXHJcbmludGVyZmFjZSBEaWN0aW9uYXJ5PFQ+IHsgW2tleTogc3RyaW5nXTogVDsgfVxyXG5cclxuZXhwb3J0IGVudW0gU3RhdHVzIHtcclxuICAgIFJVTk5JTkcsXHJcbiAgICBTVUNDRVNTLFxyXG4gICAgRkFJTFVSRVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQ6IG51bWJlciwgYmxhY2tib2FyZDogYW55LCBzdGF0dXM6IFN0YXR1cykge1xyXG4gICAgZGVsZXRlIGJsYWNrYm9hcmRbaWRdO1xyXG4gICAgcmV0dXJuIHN0YXR1cztcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRWZmZWN0ID0gKCkgPT4gdm9pZFxyXG5leHBvcnQgdHlwZSBQcmVjb25kaXRpb24gPSAoKSA9PiBib29sZWFuXHJcbmV4cG9ydCB0eXBlIFRpY2sgPSAoKSA9PiBTdGF0dXNcclxuZXhwb3J0IHR5cGUgQWN0aW9uVGljayA9IChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgZWZmZWN0OiBFZmZlY3QsIHRpY2tzUmVxdWlyZWQ/OiBudW1iZXIpID0+IFRpY2tcclxuLyoqXHJcbiAqIFRoZSBndWFyZCB0aWNrIGlzIHRvIGFkZCBhIHByZWNvbmRpdGlvbiB0byB0aGUgY29tcG9zaXRlIHRpY2tzXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBHdWFyZFRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2ssIG5lZ2F0ZT86IGJvb2xlYW4pID0+IFRpY2tcclxuLyoqXHJcbiAqIFNlcXVlbmNlL1NlbGVjdG9yXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBDb21wb3NpdGVUaWNrID0gKGFzdFRpY2tzOiBUaWNrW10pID0+IFRpY2tcclxuXHJcbnZhciBibGFja2JvYXJkID0ge307XHJcblxyXG5mdW5jdGlvbiBnZXRBY3Rpb25UaWNrKGlkOiBudW1iZXIpOiBBY3Rpb25UaWNrIHtcclxuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQgPSAxKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHByZWNvbmRpdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPSB0aWNrc1JlcXVpcmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLkZBSUxVUkU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEd1YXJkVGljaygpOiBHdWFyZFRpY2sge1xyXG4gICAgcmV0dXJuIChwcmVjb25kaXRpb24sIGFzdFRpY2ssIG5lZ2F0ZSA9IGZhbHNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHByb2NlZWQgPSBuZWdhdGUgPyAhcHJlY29uZGl0aW9uKCkgOiBwcmVjb25kaXRpb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2NlZWQgPyBleGVjdXRlKGFzdFRpY2spIDogU3RhdHVzLkZBSUxVUkU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZXF1ZW5jZVRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xyXG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZWxlY3RvclRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xyXG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZShhc3RUaWNrOiBUaWNrKTogU3RhdHVzIHtcclxuICAgIHJldHVybiBhc3RUaWNrKCk7XHJcbn1cclxuXHJcbnZhciBnbG9iYWxJZENvdW50ZXIgPSAwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdGlvbihwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgZWZmZWN0OiBFZmZlY3QsIHRpY2tzUmVxdWlyZWQ/OiBudW1iZXIpOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRBY3Rpb25UaWNrKGdsb2JhbElkQ291bnRlcisrKShwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGd1YXJkKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5lZ19ndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljaywgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDeWNsZXMgb3ZlciBpdHMgY2hpbGRyZW46IGl0ZXJhdGVzIHRvIHRoZSBuZXh0IGNoaWxkIG9uIHN1Y2Nlc3Mgb2YgYSBjaGlsZFxyXG4gKiBTdWNjZWVkcyBpZiBhbGwgc3VjY2VlZCwgZWxzZSBmYWlsc1xyXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcclxuICogQHJldHVybnMge1RpY2t9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VxdWVuY2UoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldFNlcXVlbmNlVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBmYWlsdXJlIG9mIGEgY2hpbGQodGhpbmsgb2YgaXQgYXMgaWYtZWxzZSBibG9ja3MpXHJcbiAqIFN1Y2NlZWRzIGlmIGV2ZW4gb25lIHN1Y2NlZWRzLCBlbHNlIGZhaWxzXHJcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xyXG4gKiBAcmV0dXJucyB7VGlja31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Rvcihhc3RUaWNrczogVGlja1tdKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0U2VsZWN0b3JUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XHJcbn1cclxuXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLSBBUElzIC0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuLy8wLiB1dGlsaXRpZXNcclxuLy8gbWluIGFuZCBtYXggYXJlIGluY2x1c2l2ZVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZE51bWJlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuXHJcbi8vMS4gc3RvcnkgaW5zdGFuY2VcclxuXHJcbi8vMS4xIGxvY2F0aW9uc1xyXG4vLyB2YXIgbG9jYXRpb25HcmFwaDogRGljdGlvbmFyeTxMb2NhdGlvbj4gPSB7fTtcclxuXHJcbnZhciBsb2NhdGlvbkdyYXBoID0ge307XHJcblxyXG4vLyAvLyBcclxuLy8gY2xhc3MgTG9jYXRpb24ge1xyXG4vLyAgICAgYWRqYWNlbnRMb2NhdGlvbnM6IERpY3Rpb25hcnk8TG9jYXRpb25bXT47XHJcblxyXG4vLyAgICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgYWRqYWNlbnRMb2NhdGlvbnM6IHN0cmluZ1tdKSB7XHJcbi8vICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuXHJcbi8vICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4vLyAgICAgICAgICAgICBpZihhZGphY2VudExvY2F0aW9uc1tpXSBpbiBsb2NhdGlvbkdyYXBoKXtcclxuXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZXtcclxuLy8gICAgICAgICAgICAgICAgIHZhciBuZXdfbG9jYXRpb24gPSBuZXcgTG9jYXRpb24oKVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuXHJcbi8vYWRkIHRvIGJvdGggc2lkZXNcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2F0aW9uKGxvY2F0aW9uTmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IFtdO1xyXG4gICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdLmNvbmNhdChhZGphY2VudExvY2F0aW9ucyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID0gW107XHJcblxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dLnB1c2gobG9jYXRpb25OYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFkamFjZW50KGxvY2F0aW9uMTogc3RyaW5nLCBsb2NhdGlvbjI6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFyZSBhZGphY2VudDogXCIgKyBsb2NhdGlvbjEgKyBcIiwgXCIrbG9jYXRpb24yKTtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0gPT0gdW5kZWZpbmVkIHx8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24yXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWl0aGVyIG9uZS9ib3RoIGxvY2F0aW9ucyB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXVtpXSA9PSBsb2NhdGlvbjIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8vcGF0aGZpbmRpbmcgcHJpbWl0aXZlc1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dExvY2F0aW9uKHN0YXJ0OiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdmFyIHZpc2l0ZWQgPSB7fTtcclxuICAgIHZhciBwcmV2aW91cyA9IHt9O1xyXG4gICAgZm9yICh2YXIga2V5IGluIGxvY2F0aW9uR3JhcGgpIHtcclxuICAgICAgICB2aXNpdGVkW2tleV0gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgbXlRdWV1ZSA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XHJcbiAgICBteVF1ZXVlLmVucXVldWUoc3RhcnQpO1xyXG5cclxuICAgIHdoaWxlICghbXlRdWV1ZS5pc0VtcHR5KCkpIHtcclxuICAgICAgICB2YXIgY3VycmVudDogc3RyaW5nID0gbXlRdWV1ZS5kZXF1ZXVlKCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gbG9jYXRpb25HcmFwaFtjdXJyZW50XTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF2aXNpdGVkW25laWdoYm9yc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgIG15UXVldWUuZW5xdWV1ZShuZWlnaGJvcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgdmlzaXRlZFtuZWlnaGJvcnNbaV1dID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yc1tpXV0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBkZXN0aW5hdGlvbjtcclxuICAgIGlmIChjdXJyZW50ID09IHN0YXJ0KVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgd2hpbGUgKHByZXZpb3VzW2N1cnJlbnRdICE9IHN0YXJ0KSB7XHJcbiAgICAgICAgY3VycmVudCA9IHByZXZpb3VzW2N1cnJlbnRdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG4vLzEuMiBhZ2VudHNcclxuXHJcbmV4cG9ydCBjbGFzcyBBZ2VudCB7XHJcbiAgICBjdXJyZW50TG9jYXRpb246IHN0cmluZztcclxuICAgIGRlc3RpbmF0aW9uOiBzdHJpbmc7XHJcbiAgICBsYXN0U2Vlbkl0ZW06IHtbaXRlbU5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcclxuICAgIGxhc3RTZWVuUGVyc29uOiB7W2l0ZW1OYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XHJcbiAgICByYW5kTnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgY29uc3RydWN0b3JcIilcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdXJyZW50TG9jYXRpb24oY3VycmVudGxvY2F0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gY3VycmVudGxvY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExhc3RTYXdJdGVtQXRMb2NhdGlvbihpdGVtOiBJdGVtLCBhdExvY2F0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMubGFzdFNlZW5JdGVtW2l0ZW0ubmFtZV0gPSBhdExvY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKGFnZW50TmFtZTogc3RyaW5nLCBhdExvY2F0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMubGFzdFNlZW5QZXJzb25bYWdlbnROYW1lXSA9IGF0TG9jYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGVzdGluYXRpb24oZGVzdGluYXRpb246IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc1NlZW5JdGVtKGl0ZW06IEl0ZW0pe1xyXG4gICAgICAgIGlmKGl0ZW0ubmFtZSBpbiB0aGlzLmxhc3RTZWVuSXRlbSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiOiBzYXcgaXRlbTpcIitpdGVtLm5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy90aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2hlcmVJc0l0ZW0oaXRlbTogSXRlbSl7XHJcbiAgICAgICAgaWYoaXRlbS5uYW1lIGluIHRoaXMubGFzdFNlZW5JdGVtKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCI6IHNhdyBpdGVtOlwiK2l0ZW0ubmFtZSArIFwiIGF0IGxvY2F0aW9uOlwiK3RoaXMubGFzdFNlZW5JdGVtW2l0ZW0ubmFtZV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0U2Vlbkl0ZW1baXRlbS5uYW1lXVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxudmFyIGFnZW50czogQXJyYXk8QWdlbnQ+ID0gbmV3IEFycmF5PEFnZW50PigpO1xyXG4vLyB2YXIgYWdlbnRzID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQWdlbnQoYWdlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiQWRkaW5nOiBcIithZ2VudE5hbWUpO1xyXG4gICAgdmFyIGFnZW50ID0gbmV3IEFnZW50KGFnZW50TmFtZSk7XHJcbiAgICBjb25zb2xlLmxvZyhhZ2VudCk7XHJcbiAgICBhZ2VudHMucHVzaChhZ2VudCk7XHJcbiAgICByZXR1cm4gYWdlbnQ7XHJcbn1cclxuXHJcbi8vMS4zIGl0ZW1zXHJcblxyXG4vLyBUb2RvXHJcbmNsYXNzIEl0ZW0ge1xyXG4gICAgY3VycmVudExvY2F0aW9uOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VycmVudExvY2F0aW9uKGN1cnJlbnRsb2NhdGlvbjogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGN1cnJlbnRsb2NhdGlvbjtcclxuICAgIH1cclxufVxyXG5cclxudmFyIGl0ZW1zOiBBcnJheTxJdGVtPiA9IG5ldyBBcnJheTxJdGVtPigpO1xyXG4vLyB2YXIgaXRlbXMgPSBbXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJdGVtKGl0ZW1OYW1lOiBzdHJpbmcpIHtcclxuICAgIHZhciBpdGVtID0gbmV3IEl0ZW0oaXRlbU5hbWUpO1xyXG4gICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgIHJldHVybiBpdGVtO1xyXG59XHJcblxyXG4vLzEuNCB2YXJpYWJsZXNcclxudmFyIHZhcmlhYmxlcyA9IHt9O1xyXG52YXIgYWdlbnRWYXJpYWJsZXMgPSB7fTtcclxudmFyIGl0ZW1WYXJpYWJsZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIHZhcmlhYmxlc1t2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhck5hbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkpXHJcbiAgICAgICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdID0ge307XHJcblxyXG4gICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIG5vdCBzZXQhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB2YXJpYWJsZXNbdmFyTmFtZV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGFnZW50IFwiICsgYWdlbnQgKyBcIiBub3Qgc2V0IVwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhcmlhYmxlTm90U2V0KHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FnZW50VmFyaWFibGVOb3RTZXQoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSB8fCBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0pO1xyXG59XHJcblxyXG4vLyB0b2RvXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRJdGVtVmFyaWFibGUoaXRlbTogSXRlbSwgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtLm5hbWVdKSlcclxuICAgICAgICBpdGVtVmFyaWFibGVzW2l0ZW0ubmFtZV0gPSB7fTtcclxuXHJcbiAgICBpdGVtVmFyaWFibGVzW2l0ZW0ubmFtZV1bdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pIHx8IGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgaXRlbSBcIiArIGl0ZW0gKyBcIiBub3Qgc2V0IVwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdO1xyXG59XHJcblxyXG5cclxuLy8yXHJcbi8vYWdlbnQtYmVoYXZpb3IgdHJlZSBtYXBwaW5nXHJcblxyXG52YXIgYWdlbnRUcmVlczoge1thZ2VudE5hbWU6IHN0cmluZ10gOiBUaWNrfSA9IHt9O1xyXG4vLyB2YXIgYWdlbnRUcmVlcyA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFRyZWVUb0FnZW50KGFnZW50OiBBZ2VudCwgdHJlZTogVGljaykge1xyXG4gICAgYWdlbnRUcmVlc1thZ2VudC5uYW1lXSA9IHRyZWU7XHJcbn1cclxuXHJcbi8vMy4xXHJcbi8vdXNlciBhY3Rpb25zXHJcbi8vVE9ETyBhZGQgdmFyaWFibGVzIHRvIHVzZXIgYWN0aW9uIHRleHRzXHJcbnZhciB1c2VySW50ZXJhY3Rpb25PYmplY3QgPSB7XHJcbiAgICB0ZXh0OiBcIlwiLFxyXG4gICAgdXNlckFjdGlvbnNUZXh0OiBbXSxcclxuICAgIGFjdGlvbkVmZmVjdHNUZXh0OiBcIlwiXHJcbn1cclxudmFyIHVzZXJJbnRlcmFjdGlvblRyZWVzID0gW107XHJcbnZhciB1c2VyQWN0aW9ucyA9IHt9O1xyXG5cclxuZnVuY3Rpb24gcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKSB7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCA9IFwiXCI7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0ID0gW107XHJcbiAgICB1c2VyQWN0aW9ucyA9IHt9Oy8ve1wiR28gdG8gbG9jYXRpb24gWFwiIDogZWZmZWN0XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVzZXJJbnRlcmFjdGlvblRyZWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZXhlY3V0ZSh1c2VySW50ZXJhY3Rpb25UcmVlc1tpXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uID0gKHRleHQ6IHN0cmluZykgPT5cclxuICAgIGFjdGlvbihcclxuICAgICAgICAoKSA9PiB0cnVlLFxyXG4gICAgICAgICgpID0+IHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ICs9IFwiXFxuXCIgKyB0ZXh0LFxyXG4gICAgICAgIDBcclxuICAgICk7XHJcbmV4cG9ydCBsZXQgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQgPSAodGV4dDogc3RyaW5nKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgKz0gXCJcXG5cIiArIHRleHQ7XHJcblxyXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb25UcmVlID0gKHRleHQ6IHN0cmluZywgZWZmZWN0VHJlZTogVGljaykgPT4gYWN0aW9uKFxyXG4gICAgKCkgPT4gdHJ1ZSxcclxuICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgZWZmZWN0VHJlZSksIDBcclxuKTtcclxuXHJcbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdDogKCkgPT4gYW55KSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBhY3Rpb24oKCk9PnRydWUsIGVmZmVjdCwgMCkpLCAwXHJcbiAgICApO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vICAgICByZXR1cm4gXHJcbi8vIH1cclxuXHJcblxyXG5mdW5jdGlvbiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQ6IHN0cmluZywgdHJlZTogVGljaykge1xyXG4gICAgdXNlckFjdGlvbnNbdGV4dF0gPSB0cmVlO1xyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5wdXNoKHRleHQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlckludGVyYWN0aW9uVHJlZSh0aWNrOiBUaWNrKSB7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25UcmVlcy5wdXNoKHRpY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVVzZXJBY3Rpb24odGV4dDogc3RyaW5nKSB7XHJcbiAgICAvL2V4ZWN1dGUgdGhlIHVzZXIgYWN0aW9uXHJcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgPSBcIlwiO1xyXG4gICAgdmFyIHVzZXJBY3Rpb25FZmZlY3RUcmVlID0gdXNlckFjdGlvbnNbdGV4dF07XHJcbiAgICBleGVjdXRlKHVzZXJBY3Rpb25FZmZlY3RUcmVlKTtcclxufVxyXG5cclxuLy80LlxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKSB7XHJcbiAgICByZXR1cm4gdXNlckludGVyYWN0aW9uT2JqZWN0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd29ybGRUaWNrKCkge1xyXG4gICAgLy9hbGwgYWdlbnQgdGlja3NcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWdlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRyZWUgPSBhZ2VudFRyZWVzW2FnZW50c1tpXS5uYW1lXTtcclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRyZWUpKSB7XHJcbiAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiZXhlY3V0aW5nQWdlbnRcIiwgYWdlbnRzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICBleGVjdXRlKHRyZWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XHJcbn1cclxuXHJcblxyXG5cclxuIl19
