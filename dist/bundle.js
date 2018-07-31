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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL21hZGRpZS50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUxELDhDQUtDO0FBRUQsSUFBSTtBQUNKO0lBQ0ksdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBRkQsZ0NBRUM7QUFFRDtJQUNJLE9BQU8scUJBQXFCLENBQUM7QUFDakMsQ0FBQztBQUZELDREQUVDO0FBRUQ7SUFDSSxpQkFBaUI7SUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQixXQUFXLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtLQUNKO0lBQ0QsdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBVkQsOEJBVUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbnZhciBhcnJheXMgPSByZXF1aXJlKFwiLi9hcnJheXNcIik7XHJcbnZhciBMaW5rZWRMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAqIENyZWF0ZXMgYW4gZW1wdHkgTGlua2VkIExpc3QuXHJcbiAgICAqIEBjbGFzcyBBIGxpbmtlZCBsaXN0IGlzIGEgZGF0YSBzdHJ1Y3R1cmUgY29uc2lzdGluZyBvZiBhIGdyb3VwIG9mIG5vZGVzXHJcbiAgICAqIHdoaWNoIHRvZ2V0aGVyIHJlcHJlc2VudCBhIHNlcXVlbmNlLlxyXG4gICAgKiBAY29uc3RydWN0b3JcclxuICAgICovXHJcbiAgICBmdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdFxyXG4gICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBMYXN0IG5vZGUgaW4gdGhlIGxpc3RcclxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBOdW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGxpc3RcclxuICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEFkZHMgYW4gZWxlbWVudCB0byB0aGlzIGxpc3QuXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgYWRkZWQuXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyPX0gaW5kZXggb3B0aW9uYWwgaW5kZXggdG8gYWRkIHRoZSBlbGVtZW50LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWRcclxuICAgICogdGhlIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGlzIGxpc3QuXHJcbiAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGFkZGVkIG9yIGZhbHNlIGlmIHRoZSBpbmRleCBpcyBpbnZhbGlkXHJcbiAgICAqIG9yIGlmIHRoZSBlbGVtZW50IGlzIHVuZGVmaW5lZC5cclxuICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpbmRleCkpIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5FbGVtZW50cztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMubkVsZW1lbnRzIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3Tm9kZSA9IHRoaXMuY3JlYXRlTm9kZShpdGVtKTtcclxuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDAgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBGaXJzdCBub2RlIGluIHRoZSBsaXN0LlxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gdGhpcy5uRWxlbWVudHMpIHtcclxuICAgICAgICAgICAgLy8gSW5zZXJ0IGF0IHRoZSBlbmQuXHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUubmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyBDaGFuZ2UgZmlyc3Qgbm9kZS5cclxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xyXG4gICAgICAgICAgICBpZiAocHJldiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gcHJldi5uZXh0O1xyXG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5FbGVtZW50cysrO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cclxuICAgICogQHJldHVybiB7Kn0gdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXHJcbiAgICAqIGVtcHR5LlxyXG4gICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpcnN0Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cclxuICAgICogQHJldHVybiB7Kn0gdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcclxuICAgICogZW1wdHkuXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5sYXN0Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBkZXNpcmVkIGluZGV4LlxyXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXNcclxuICAgICAqIG91dCBvZiBib3VuZHMuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4KTtcclxuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZS5lbGVtZW50O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZVxyXG4gICAgICogc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoZSBMaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhpcyBlbGVtZW50LlxyXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIGxpc3QgYXJlXHJcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxyXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxyXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgKlxyXG4gICAgICogPHByZT5cclxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcclxuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XHJcbiAgICAgKiB9XHJcbiAgICAgKiA8L3ByZT5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXHJcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2VcclxuICAgICAqIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhpcyBsaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhlXHJcbiAgICAgKiBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICAgICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcclxuICAgICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxyXG4gICAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cclxuICAgICAgICpcclxuICAgICAgICogPHByZT5cclxuICAgICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xyXG4gICAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICAgKiB9XHJcbiAgICAgICAqIDwvcHJlPlxyXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXHJcbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXHJcbiAgICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cclxuICAgICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBmYWxzZVxyXG4gICAgICAgKiBvdGhlcndpc2UuXHJcbiAgICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuaW5kZXhPZihpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbiB0aGlzIGxpc3QuXHJcbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxyXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcclxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxyXG4gICAgICpcclxuICAgICAqIDxwcmU+XHJcbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XHJcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xyXG4gICAgICogfVxyXG4gICAgICogPC9wcmU+XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpc3QsIGlmIHByZXNlbnQuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBsaXN0IGNvbnRhaW5lZCB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA8IDEgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5uZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubkVsZW1lbnRzLS07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnROb2RlO1xyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgbGlzdC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXHJcbiAgICAgKiBUd28gbGlzdHMgYXJlIGVxdWFsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBvcmRlci5cclxuICAgICAqIEBwYXJhbSB7TGlua2VkTGlzdH0gb3RoZXIgdGhlIG90aGVyIGxpc3QuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxyXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLiBJZiB0aGUgZWxlbWVudHMgaW4gdGhlIGxpc3RzXHJcbiAgICAgKiBhcmUgY3VzdG9tIG9iamVjdHMgeW91IHNob3VsZCBwcm92aWRlIGEgZnVuY3Rpb24sIG90aGVyd2lzZVxyXG4gICAgICogdGhlID09PSBvcGVyYXRvciBpcyB1c2VkIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVudHMuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBlcUYgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICAgICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBMaW5rZWRMaXN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXIuc2l6ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXF1YWxzQXV4KHRoaXMuZmlyc3ROb2RlLCBvdGhlci5maXJzdE5vZGUsIGVxRik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzQXV4ID0gZnVuY3Rpb24gKG4xLCBuMiwgZXFGKSB7XHJcbiAgICAgICAgd2hpbGUgKG4xICE9PSBudWxsICYmIG4yICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICghZXFGKG4xLmVsZW1lbnQsIG4yLmVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbjEgPSBuMS5uZXh0O1xyXG4gICAgICAgICAgICBuMiA9IG4yLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBnaXZlbiBpbmRleC5cclxuICAgICAqIEByZXR1cm4geyp9IHJlbW92ZWQgZWxlbWVudCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzIG91dCBvZiBib3VuZHMuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZUVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cyB8fCB0aGlzLmZpcnN0Tm9kZSA9PT0gbnVsbCB8fCB0aGlzLmxhc3ROb2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBlbGVtZW50O1xyXG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMSkge1xyXG4gICAgICAgICAgICAvL0ZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xyXG4gICAgICAgICAgICBpZiAocHJldmlvdXMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmZpcnN0Tm9kZS5uZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzLm5leHQgPT09IHRoaXMubGFzdE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzICE9PSBudWxsICYmIHByZXZpb3VzLm5leHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBwcmV2aW91cy5uZXh0LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gcHJldmlvdXMubmV4dC5uZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubkVsZW1lbnRzLS07XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBsaXN0IGluIG9yZGVyLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXHJcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXHJcbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soY3VycmVudE5vZGUuZWxlbWVudCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV2ZXJzZXMgdGhlIG9yZGVyIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpbmtlZCBsaXN0IChtYWtlcyB0aGUgbGFzdFxyXG4gICAgICogZWxlbWVudCBmaXJzdCwgYW5kIHRoZSBmaXJzdCBlbGVtZW50IGxhc3QpLlxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB2YXIgdGVtcCA9IG51bGw7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGVtcCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gcHJldmlvdXM7XHJcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcclxuICAgICAgICAgICAgY3VycmVudCA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlbXAgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMubGFzdE5vZGU7XHJcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHRlbXA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QgaW4gcHJvcGVyXHJcbiAgICAgKiBzZXF1ZW5jZS5cclxuICAgICAqIEByZXR1cm4ge0FycmF5LjwqPn0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCxcclxuICAgICAqIGluIHByb3BlciBzZXF1ZW5jZS5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcclxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChjdXJyZW50Tm9kZS5lbGVtZW50KTtcclxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cclxuICAgICAqL1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzIDw9IDA7XHJcbiAgICB9O1xyXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5cy50b1N0cmluZyh0aGlzLnRvQXJyYXkoKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5ub2RlQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gKHRoaXMubkVsZW1lbnRzIC0gMSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5maXJzdE5vZGU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleCAmJiBub2RlICE9IG51bGw7IGkrKykge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IGl0ZW0sXHJcbiAgICAgICAgICAgIG5leHQ6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBMaW5rZWRMaXN0O1xyXG59KCkpOyAvLyBFbmQgb2YgbGlua2VkIGxpc3RcclxuZXhwb3J0cy5kZWZhdWx0ID0gTGlua2VkTGlzdDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlua2VkTGlzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgTGlua2VkTGlzdF8xID0gcmVxdWlyZShcIi4vTGlua2VkTGlzdFwiKTtcclxudmFyIFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IHF1ZXVlLlxyXG4gICAgICogQGNsYXNzIEEgcXVldWUgaXMgYSBGaXJzdC1Jbi1GaXJzdC1PdXQgKEZJRk8pIGRhdGEgc3RydWN0dXJlLCB0aGUgZmlyc3RcclxuICAgICAqIGVsZW1lbnQgYWRkZWQgdG8gdGhlIHF1ZXVlIHdpbGwgYmUgdGhlIGZpcnN0IG9uZSB0byBiZSByZW1vdmVkLiBUaGlzXHJcbiAgICAgKiBpbXBsZW1lbnRhdGlvbiB1c2VzIGEgbGlua2VkIGxpc3QgYXMgYSBjb250YWluZXIuXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUXVldWUoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpbmtlZExpc3RfMS5kZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuYWRkKGVsZW0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBhbmQgcmVtb3ZlcyB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxyXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXHJcbiAgICAgKi9cclxuICAgIFF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMubGlzdC5maXJzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlRWxlbWVudEF0SW5kZXgoMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcywgYnV0IGRvZXMgbm90IHJlbW92ZSwgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cclxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LmZpcnN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cclxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBzdGFjayBhcmVcclxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciwgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxyXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxyXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XHJcbiAgICAgKlxyXG4gICAgICogPHByZT5cclxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSAocGV0MSwgcGV0Mikge1xyXG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcclxuICAgICAqIH1cclxuICAgICAqIDwvcHJlPlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcclxuICAgICAqIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LFxyXG4gICAgICogZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoZWxlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmNvbnRhaW5zKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBhbmQgb25seSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIG5vIGl0ZW1zOyBmYWxzZVxyXG4gICAgICogb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKSA8PSAwO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIGVsZW1lbnRzIGZyb20gdGhpcyBxdWV1ZS5cclxuICAgICAqL1xyXG4gICAgUXVldWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubGlzdC5jbGVhcigpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgcXVldWUgaW5cclxuICAgICAqIEZJRk8gb3JkZXIuXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcclxuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cclxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBRdWV1ZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGNhbGxiYWNrKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUXVldWU7XHJcbn0oKSk7IC8vIEVuZCBvZiBxdWV1ZVxyXG5leHBvcnRzLmRlZmF1bHQgPSBRdWV1ZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UXVldWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBpdGVtXHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LjRcclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcclxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXksIG9yIC0xIGlmIG5vdCBmb3VuZC5cclxuICovXHJcbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn1cclxuZXhwb3J0cy5pbmRleE9mID0gaW5kZXhPZjtcclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xyXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XHJcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5IG9yIC0xIGlmIG5vdCBmb3VuZC5cclxuICovXHJcbmZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLTE7XHJcbn1cclxuZXhwb3J0cy5sYXN0SW5kZXhPZiA9IGxhc3RJbmRleE9mO1xyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICByZXR1cm4gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDA7XHJcbn1cclxuZXhwb3J0cy5jb250YWlucyA9IGNvbnRhaW5zO1xyXG4vKipcclxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgYXJyYXkuXHJcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCBlbGVtZW50LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgY2hhbmdlZCBhZnRlciB0aGlzIGNhbGwuXHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmUoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XHJcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbik7XHJcbiAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xyXG4vKipcclxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXkgZXF1YWxcclxuICogdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBkZXRlcm1pbmUgdGhlIGZyZXF1ZW5jeSBvZiB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgd2hvc2UgZnJlcXVlbmN5IGlzIHRvIGJlIGRldGVybWluZWQuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cclxuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheVxyXG4gKiBlcXVhbCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cclxuICovXHJcbmZ1bmN0aW9uIGZyZXF1ZW5jeShhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcclxuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XHJcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgdmFyIGZyZXEgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIGZyZXErKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnJlcTtcclxufVxyXG5leHBvcnRzLmZyZXF1ZW5jeSA9IGZyZXF1ZW5jeTtcclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIHNwZWNpZmllZCBhcnJheXMgYXJlIGVxdWFsIHRvIG9uZSBhbm90aGVyLlxyXG4gKiBUd28gYXJyYXlzIGFyZSBjb25zaWRlcmVkIGVxdWFsIGlmIGJvdGggYXJyYXlzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyXHJcbiAqIG9mIGVsZW1lbnRzLCBhbmQgYWxsIGNvcnJlc3BvbmRpbmcgcGFpcnMgb2YgZWxlbWVudHMgaW4gdGhlIHR3b1xyXG4gKiBhcnJheXMgYXJlIGVxdWFsIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBvbmUgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIHRoZSBvdGhlciBhcnJheSB0byBiZSB0ZXN0ZWQgZm9yIGVxdWFsaXR5LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXHJcbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVtZW50cyBpbiB0aGUgYXJyYXlzLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSB0d28gYXJyYXlzIGFyZSBlcXVhbFxyXG4gKi9cclxuZnVuY3Rpb24gZXF1YWxzKGFycmF5MSwgYXJyYXkyLCBlcXVhbHNGdW5jdGlvbikge1xyXG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5MS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFlcXVhbHMoYXJyYXkxW2ldLCBhcnJheTJbaV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5leHBvcnRzLmVxdWFscyA9IGVxdWFscztcclxuLyoqXHJcbiAqIFJldHVybnMgc2hhbGxvdyBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheS5cclxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgdG8gY29weS5cclxuICogQHJldHVybiB7QXJyYXl9IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5XHJcbiAqL1xyXG5mdW5jdGlvbiBjb3B5KGFycmF5KSB7XHJcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KCk7XHJcbn1cclxuZXhwb3J0cy5jb3B5ID0gY29weTtcclxuLyoqXHJcbiAqIFN3YXBzIHRoZSBlbGVtZW50cyBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9ucyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gc3dhcCBlbGVtZW50cy5cclxuICogQHBhcmFtIHtudW1iZXJ9IGkgdGhlIGluZGV4IG9mIG9uZSBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIHRoZSBpbmRleCBvZiB0aGUgb3RoZXIgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBpcyBkZWZpbmVkIGFuZCB0aGUgaW5kZXhlcyBhcmUgdmFsaWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBzd2FwKGFycmF5LCBpLCBqKSB7XHJcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBhcnJheS5sZW5ndGggfHwgaiA8IDAgfHwgaiA+PSBhcnJheS5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgdGVtcCA9IGFycmF5W2ldO1xyXG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcclxuICAgIGFycmF5W2pdID0gdGVtcDtcclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmV4cG9ydHMuc3dhcCA9IHN3YXA7XHJcbmZ1bmN0aW9uIHRvU3RyaW5nKGFycmF5KSB7XHJcbiAgICByZXR1cm4gJ1snICsgYXJyYXkudG9TdHJpbmcoKSArICddJztcclxufVxyXG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmc7XHJcbi8qKlxyXG4gKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBhcnJheVxyXG4gKiBzdGFydGluZyBmcm9tIGluZGV4IDAgdG8gbGVuZ3RoIC0gMS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIGl0ZXJhdGUuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xyXG4gKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXHJcbiAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxyXG4gKi9cclxuZnVuY3Rpb24gZm9yRWFjaChhcnJheSwgY2FsbGJhY2spIHtcclxuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIGVsZSA9IGFycmF5XzFbX2ldO1xyXG4gICAgICAgIGlmIChjYWxsYmFjayhlbGUpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZm9yRWFjaCA9IGZvckVhY2g7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuZXhwb3J0cy5oYXMgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XHJcbiAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcclxufTtcclxuLyoqXHJcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29tcGFyZSBlbGVtZW50IG9yZGVyLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlKGEsIGIpIHtcclxuICAgIGlmIChhIDwgYikge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdENvbXBhcmUgPSBkZWZhdWx0Q29tcGFyZTtcclxuLyoqXHJcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gdGVzdCBlcXVhbGl0eS5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZhdWx0RXF1YWxzKGEsIGIpIHtcclxuICAgIHJldHVybiBhID09PSBiO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdEVxdWFscyA9IGRlZmF1bHRFcXVhbHM7XHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtKSB7XHJcbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XHJcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiAnJHMnICsgaXRlbTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAnJG8nICsgaXRlbS50b1N0cmluZygpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdFRvU3RyaW5nID0gZGVmYXVsdFRvU3RyaW5nO1xyXG4vKipcclxuKiBKb2lucyBhbGwgdGhlIHByb3BlcmllcyBvZiB0aGUgb2JqZWN0IHVzaW5nIHRoZSBwcm92aWRlZCBqb2luIHN0cmluZ1xyXG4qL1xyXG5mdW5jdGlvbiBtYWtlU3RyaW5nKGl0ZW0sIGpvaW4pIHtcclxuICAgIGlmIChqb2luID09PSB2b2lkIDApIHsgam9pbiA9ICcsJzsgfVxyXG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xyXG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcclxuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIHRvcmV0ID0gJ3snO1xyXG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChleHBvcnRzLmhhcyhpdGVtLCBwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBqb2luO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIHByb3AgKyAnOicgKyBpdGVtW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b3JldCArICd9JztcclxuICAgIH1cclxufVxyXG5leHBvcnRzLm1ha2VTdHJpbmcgPSBtYWtlU3RyaW5nO1xyXG4vKipcclxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYykge1xyXG4gICAgcmV0dXJuICh0eXBlb2YgZnVuYykgPT09ICdmdW5jdGlvbic7XHJcbn1cclxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcclxuLyoqXHJcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgdW5kZWZpbmVkLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xyXG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqKSA9PT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xyXG4vKipcclxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHN0cmluZy5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcclxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XHJcbn1cclxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xyXG4vKipcclxuICogUmV2ZXJzZXMgYSBjb21wYXJlIGZ1bmN0aW9uLlxyXG4gKiBAZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIHJldmVyc2VDb21wYXJlRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoY29tcGFyZUZ1bmN0aW9uKSB8fCAhaXNGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYSA9PT0gYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkLCB2KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oZCwgdikgKiAtMTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucmV2ZXJzZUNvbXBhcmVGdW5jdGlvbiA9IHJldmVyc2VDb21wYXJlRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGVxdWFsIGZ1bmN0aW9uIGdpdmVuIGEgY29tcGFyZSBmdW5jdGlvbi5cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wYXJlVG9FcXVhbHMoY29tcGFyZUZ1bmN0aW9uKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGEsIGIpID09PSAwO1xyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmNvbXBhcmVUb0VxdWFscyA9IGNvbXBhcmVUb0VxdWFscztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCIvKiAvLy8gPHJlZmVyZW5jZSBwYXRoPVwic2NyaXB0aW5nLnRzXCIvPiAqL1xyXG5pbXBvcnQge1xyXG5cdGFkZEFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxyXG5cdGdldFJhbmROdW1iZXIsIGdldFZhcmlhYmxlLCBzZXF1ZW5jZSwgc2VsZWN0b3IsIGV4ZWN1dGUsIFByZWNvbmRpdGlvbiwgZ2V0QWdlbnRWYXJpYWJsZSwgbmVnX2d1YXJkLCBndWFyZCxcclxuXHRpc1ZhcmlhYmxlTm90U2V0LCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24sIGFkZFVzZXJBY3Rpb24sIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUsIGluaXRpYWxpemUsXHJcblx0Z2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXHJcblx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQsIGFyZUFkamFjZW50LCBhZGRVc2VyQWN0aW9uVHJlZSwgQWdlbnRcclxufSBmcm9tIFwiLi9zY3JpcHRpbmdcIjtcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xyXG5cclxuLy8gMS4gRGVmaW5lIFN0YXRlXHJcblxyXG4vLyBMb2NhdGlvbnNcclxudmFyIFNUT1JBR0UgPSBcIlNUT1JBR0VcIjtcclxudmFyIERPQ1RPUlNfT0ZGSUNFID0gXCJET0NUT1JTIE9GRklDRVwiO1xyXG52YXIgRU5HSU5FUyA9IFwiRU5HSU5FU1wiO1xyXG52YXIgQ09DS1BJVCA9IFwiQ09DS1BJVFwiO1xyXG52YXIgRVNDQVBFX1BPRCA9IFwiRVNDQVBFIFBPRFwiO1xyXG52YXIgVFJBTlNQT1JUX1JPT00gPSBcIlRSQU5TUE9SVCBST09NXCI7XHJcbnZhciBNT05JVE9SSU5HX1JPT00gPSBcIk1PTklUT1JJTkcgUk9PTVwiO1xyXG52YXIgTUFJTl9BUkVBID0gXCJNQUlOIEFSRUFcIjtcclxudmFyIEZFTV9CRURST09NID0gXCJGRU0gQkVEUk9PTVwiO1xyXG52YXIgTUFMRV9CRURST09NID0gXCJNQUxFIEJFRFJPT01cIjtcclxudmFyIEJBVEhST09NID0gXCJCQVRIUk9PTVwiO1xyXG52YXIgVU5LTk9XTiA9IFwiVU5LTk9XTlwiO1xyXG5cclxuLy8gQWRkIExvY2F0aW9uc1xyXG5hZGRMb2NhdGlvbihFTkdJTkVTLCBbU1RPUkFHRSwgTUFJTl9BUkVBXSk7XHJcbmFkZExvY2F0aW9uKFNUT1JBR0UsIFtFTkdJTkVTLCBET0NUT1JTX09GRklDRV0pO1xyXG5hZGRMb2NhdGlvbihET0NUT1JTX09GRklDRSwgW1NUT1JBR0UsIE1BSU5fQVJFQSwgQ09DS1BJVCwgTU9OSVRPUklOR19ST09NXSk7XHJcbmFkZExvY2F0aW9uKENPQ0tQSVQsIFtET0NUT1JTX09GRklDRV0pO1xyXG5hZGRMb2NhdGlvbihFU0NBUEVfUE9ELCBbTUFJTl9BUkVBXSk7XHJcbmFkZExvY2F0aW9uKFRSQU5TUE9SVF9ST09NLCBbTU9OSVRPUklOR19ST09NLCBNQUlOX0FSRUFdKTtcclxuYWRkTG9jYXRpb24oTU9OSVRPUklOR19ST09NLCBbVFJBTlNQT1JUX1JPT00sIERPQ1RPUlNfT0ZGSUNFXSk7XHJcbmFkZExvY2F0aW9uKE1BSU5fQVJFQSwgW0VOR0lORVMsIFNUT1JBR0UsIERPQ1RPUlNfT0ZGSUNFLCBUUkFOU1BPUlRfUk9PTSwgRVNDQVBFX1BPRF0pO1xyXG5hZGRMb2NhdGlvbihGRU1fQkVEUk9PTSwgW01BSU5fQVJFQSwgQkFUSFJPT01dKTtcclxuYWRkTG9jYXRpb24oTUFMRV9CRURST09NLCBbTUFJTl9BUkVBLCBCQVRIUk9PTV0pO1xyXG5hZGRMb2NhdGlvbihCQVRIUk9PTSwgW01BSU5fQVJFQSwgRkVNX0JFRFJPT00sIE1BTEVfQkVEUk9PTV0pO1xyXG5cclxuLy8gYWdlbnRzXHJcbnZhciBDYWxlYiA9IGFkZEFnZW50KFwiQ2FsZWJcIik7XHJcbnZhciBRdWlubiA9IGFkZEFnZW50KFwiUXVpbm5cIik7XHJcbnZhciBNYXJrID0gYWRkQWdlbnQoXCJNYXJrXCIpO1xyXG52YXIgRWRkaWUgPSBhZGRBZ2VudChcIkVkZGllXCIpO1xyXG52YXIgQmVhdHJpY2UgPSBhZGRBZ2VudChcIkJlYXRyaWNlXCIpO1xyXG5cclxuLy8gaXRlbXNcclxudmFyIHdpcmVzMSA9IGFkZEl0ZW0oXCJ3aXJlczFcIik7XHJcbnZhciB3aXJlczIgPSBhZGRJdGVtKFwid2lyZXMyXCIpO1xyXG5cclxuXHJcbndpcmVzMS5zZXRDdXJyZW50TG9jYXRpb24oU1RPUkFHRSk7XHJcbndpcmVzMi5zZXRDdXJyZW50TG9jYXRpb24oTU9OSVRPUklOR19ST09NKTtcclxuXHJcbi8vIHNldEl0ZW1WYXJpYWJsZSh3aXJlczEsIFwiY3VycmVudExvY2F0aW9uXCIsIFNUT1JBR0UpO1xyXG4vLyBzZXRJdGVtVmFyaWFibGUod2lyZXMyLCBcImN1cnJlbnRMb2NhdGlvblwiLCBNT05JVE9SSU5HX1JPT00pO1xyXG5cclxuLy8gdmFyIHdpcmVzQ29sbGVjdGVkID0gc2V0VmFyaWFibGUoXCJ3aXJlc0NvbGxlY3RlZFwiLCAwKTtcclxuXHJcbi8vIC8vIHZhcmlhYmxlc1xyXG4vL0NhbGViXHJcbi8vIHNldEFnZW50VmFyaWFibGUoQ2FsZWIsIFwiY3VycmVudExvY2F0aW9uXCIsIENPQ0tQSVQpO1xyXG5DYWxlYi5zZXRDdXJyZW50TG9jYXRpb24oQ09DS1BJVCk7XHJcblxyXG4vL1F1aW5uXHJcbi8vIHNldEFnZW50VmFyaWFibGUoUXVpbm4sIFwiY3VycmVudExvY2F0aW9uXCIsIERPQ1RPUlNfT0ZGSUNFKTtcclxuUXVpbm4uc2V0Q3VycmVudExvY2F0aW9uKERPQ1RPUlNfT0ZGSUNFKTtcclxuXHJcbi8vTWFya1xyXG4vLyBzZXRBZ2VudFZhcmlhYmxlKE1hcmssIFwiY3VycmVudExvY2F0aW9uXCIsIFRSQU5TUE9SVF9ST09NKTtcclxuTWFyay5zZXRDdXJyZW50TG9jYXRpb24oVFJBTlNQT1JUX1JPT00pO1xyXG5cclxuLy9FZGRpZVxyXG4vLyBzZXRBZ2VudFZhcmlhYmxlKEVkZGllLCBcImN1cnJlbnRMb2NhdGlvblwiLCBTVE9SQUdFKTtcclxuRWRkaWUuc2V0Q3VycmVudExvY2F0aW9uKFNUT1JBR0UpO1xyXG5cclxuLy9CZWF0cmljZVxyXG4vLyBzZXRBZ2VudFZhcmlhYmxlKEJlYXRyaWNlLCBcImN1cnJlbnRMb2NhdGlvblwiLCBFTkdJTkVTKTtcclxuQmVhdHJpY2Uuc2V0Q3VycmVudExvY2F0aW9uKEVOR0lORVMpO1xyXG5cclxuLy8gUGxheWVyXHJcbnZhciBwbGF5ZXJMb2NhdGlvbiA9IHNldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIiwgTUFJTl9BUkVBKTtcclxudmFyIHdpcmVzQ29sbGVjdGVkID0gc2V0VmFyaWFibGUoXCJ3aXJlc0NvbGxlY3RlZFwiLCAwKTtcclxuXHJcblxyXG4vLyBLbm93bGVkZ2UgXHJcbkNhbGViLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xyXG5RdWlubi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcclxuTWFyay5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBVTktOT1dOKTtcclxuRWRkaWUuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgVU5LTk9XTik7XHJcbkJlYXRyaWNlLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczEsIFVOS05PV04pO1xyXG5cclxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJsYXN0U2Vlbjp3aXJlczFcIiwgVU5LTk9XTilcclxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJsYXN0U2Vlbjp3aXJlczJcIiwgVU5LTk9XTilcclxuLy8gc2V0QWdlbnRWYXJpYWJsZShDYWxlYiwgXCJsYXN0U2VlbjpwbGF5ZXJcIiwgVU5LTk9XTilcclxuXHJcbkNhbGViLnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIFVOS05PV04pO1xyXG4vLyBDYWxlYi5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xyXG5RdWlubi5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcclxuLy8gUXVpbm4uc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24ocGxheWVyLCBVTktOT1dOKTtcclxuTWFyay5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcclxuLy8gTWFyay5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihwbGF5ZXIsIFVOS05PV04pO1xyXG5FZGRpZS5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMyLCBVTktOT1dOKTtcclxuLy8gRWRkaWUuc2V0TGFzdFNhd1BlcnNvbkF0TG9jYXRpb24ocGxheWVyLCBVTktOT1dOKTtcclxuQmVhdHJpY2Uuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMiwgVU5LTk9XTik7XHJcbi8vIEJlYXRyaWNlLnNldExhc3RTYXdQZXJzb25BdExvY2F0aW9uKHBsYXllciwgVU5LTk9XTik7XHJcblxyXG5cclxuLy8gR29hbHMgZm9yIHRoZSBwbGF5ZXJcclxuXHJcbi8vIDA6IFVua25vd24vSW5pdGlhbCBTdGF0ZVxyXG4vLyAxOiBGb3VuZCBvdXQgYWJvdXQgRmF1bHQ6MS4gTmV3IEdvYWwuIChvbmx5IG9jY3VycyBpZiBzdGF0dXM9MClcclxuLy8gMjogRml4ZWQgRmF1bHQ6MSAob25seSBvY2N1cnMgaWYgc3RhdHVzPTEpXHJcbi8vIDM6IEZvdW5kIG91dCBhYm91dCBGYXVsdDoyLiBOZXcgR29hbCAob25seSBvY2N1cnMgaWYgc3RhdHVzPTIpXHJcbi8vIDQ6IEZpeGVkIEZhdWx0OjIgKG9ubHkgb2NjdXJzIGlmIHN0YXR1cz0zKSBcclxuLy8gZXRjLiBldGMuXHJcbnZhciBnb2FsX2Jyb2tlbl90cmFuc3BvcnQgPSBzZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiLCAwKTtcdFx0Ly8gbWF4OjRcclxudmFyIGdvYWxfYnJva2VuX2VuZ2luZXMgPSBzZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIsIDApO1xyXG52YXIgZ29hbF9icm9rZW5fc3RvcmFnZSA9IHNldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIiwgMCk7XHJcbnZhciBnb2FsX2Jyb2tlbl9jb2NrcGl0ID0gc2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiLCAwKTtcclxudmFyIGdvYWxfYnJva2VuX21haW4gPSBzZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIiwgMCk7XHJcbnZhciBnb2FsX2Jyb2tlbl9kciA9IHNldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiLCAwKTtcclxudmFyIGdvYWxfYnJva2VuX21vbml0b3JpbmcgPSBzZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIiwgMCk7XHJcbnZhciBnb2FsX2Jyb2tlbl9lc2NhcGUgPSBzZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIsIDApO1xyXG5cclxuLy8gLy8gMi4gRGVmaW5lIEJUc1xyXG4vLyAvLyBjcmVhdGUgZ3JvdW5kIGFjdGlvbnNcclxuXHJcbi8vIFRvZG8gZnJvbSBoZXJlXHJcbi8vIGZ1bmN0aW9uIGZ1bmN0aW9uX25hbWUoYXJndW1lbnQpIHtcclxuLy8gXHQvLyBib2R5Li4uXHJcbi8vIH1cclxuXHJcblxyXG5mdW5jdGlvbiBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudDogQWdlbnQsIGRlc3RpbmF0aW9uOiBzdHJpbmcgPSBcIlVOS05PV05cIikge1xyXG5cclxuXHRpZihkZXN0aW5hdGlvbiA9PSBcIlVOS05PV05cIil7XHJcblx0XHRsZXQgc2V0UmFuZE51bWJlciA9IGFjdGlvbihcclxuXHRcdFx0KCkgPT4gdHJ1ZSxcclxuXHRcdFx0KCkgPT4gYWdlbnQucmFuZE51bWJlciA9IGdldFJhbmROdW1iZXIoMSwgMTEpLFxyXG5cdFx0XHQwXHJcblx0XHQpO1xyXG5cclxuXHRcdC8vIFNhc2hhIFRvZG86IFdvcmsgb24gdXNpbmcgdGhlIEFnZW50L0l0ZW0gdHlwZXMgZm9yIGRlc3RpbmF0aW9uc1xyXG5cdFx0bGV0IGNob29zZUVOR0lORVMgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSAxLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEVOR0lORVMsIDApO1xyXG5cdFx0bGV0IGNob29zZVNUT1JBR0UgPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSAyLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IFNUT1JBR0UsIDApO1xyXG5cdFx0bGV0IGNob29zZURPQ1RPUlNfT0ZGSUNFID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMywgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBET0NUT1JTX09GRklDRSwgMCk7XHJcblx0XHRsZXQgY2hvb3NlQ09DS1BJVCA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDQsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQ09DS1BJVCwgMCk7XHJcblx0XHRsZXQgY2hvb3NlRVNDQVBFX1BPRCA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDUsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRVNDQVBFX1BPRCwgMCk7XHJcblx0XHRsZXQgY2hvb3NlVFJBTlNQT1JUX1JPT00gPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA2LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IFRSQU5TUE9SVF9ST09NLCAwKTtcclxuXHRcdGxldCBjaG9vc2VNT05JVE9SSU5HX1JPT00gPSBhY3Rpb24oKCkgPT4gYWdlbnQucmFuZE51bWJlciA9PSA3LCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1PTklUT1JJTkdfUk9PTSwgMCk7XHJcblx0XHRsZXQgY2hvb3NlTUFJTl9BUkVBID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gOCwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNQUlOX0FSRUEsIDApO1xyXG5cdFx0bGV0IGNob29zZUZFTV9CRURST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gOSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBGRU1fQkVEUk9PTSwgMCk7XHJcblx0XHRsZXQgY2hvb3NlTUFMRV9CRURST09NID0gYWN0aW9uKCgpID0+IGFnZW50LnJhbmROdW1iZXIgPT0gMTAsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gTUFMRV9CRURST09NLCAwKTtcclxuXHRcdGxldCBjaG9vc2VCQVRIUk9PTSA9IGFjdGlvbigoKSA9PiBhZ2VudC5yYW5kTnVtYmVyID09IDExLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEJBVEhST09NLCAwKTtcclxuXHJcblx0XHRsZXQgc2V0TmV4dERlc3RpbmF0aW9uID0gc2VxdWVuY2UoW1xyXG5cdFx0XHRzZXRSYW5kTnVtYmVyLFxyXG5cdFx0XHRzZWxlY3RvcihbXHJcblx0XHRcdFx0Y2hvb3NlRU5HSU5FUyxcclxuXHRcdFx0XHRjaG9vc2VDT0NLUElULFxyXG5cdFx0XHRcdGNob29zZVNUT1JBR0UsXHJcblx0XHRcdFx0Y2hvb3NlRE9DVE9SU19PRkZJQ0UsXHJcblx0XHRcdFx0Y2hvb3NlQkFUSFJPT00sXHJcblx0XHRcdFx0Y2hvb3NlTUFMRV9CRURST09NLFxyXG5cdFx0XHRcdGNob29zZUZFTV9CRURST09NLFxyXG5cdFx0XHRcdGNob29zZU1BSU5fQVJFQSxcclxuXHRcdFx0XHRjaG9vc2VNT05JVE9SSU5HX1JPT00sXHJcblx0XHRcdFx0Y2hvb3NlVFJBTlNQT1JUX1JPT00sXHJcblx0XHRcdFx0Y2hvb3NlRVNDQVBFX1BPRFxyXG5cdFx0XHRdKVxyXG5cdFx0XSk7XHJcblx0XHRyZXR1cm4gc2V0TmV4dERlc3RpbmF0aW9uO1xyXG5cclxuXHR9XHJcblx0ZWxzZXtcclxuXHRcdGxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEVOR0lORVMsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gRU5HSU5FUywgMCk7XHJcblx0XHRsZXQgY2hvb3NlU1RPUkFHRSA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBTVE9SQUdFLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IFNUT1JBR0UsIDApO1xyXG5cdFx0bGV0IGNob29zZURPQ1RPUlNfT0ZGSUNFID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IERPQ1RPUlNfT0ZGSUNFLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IERPQ1RPUlNfT0ZGSUNFLCAwKTtcclxuXHRcdGxldCBjaG9vc2VDT0NLUElUID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IENPQ0tQSVQsICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQ09DS1BJVCwgMCk7XHJcblx0XHRsZXQgY2hvb3NlRVNDQVBFX1BPRCA9IGFjdGlvbigoKSA9PiBkZXN0aW5hdGlvbiA9PSBFU0NBUEVfUE9ELCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEVTQ0FQRV9QT0QsIDApO1xyXG5cdFx0bGV0IGNob29zZVRSQU5TUE9SVF9ST09NID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IFRSQU5TUE9SVF9ST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IFRSQU5TUE9SVF9ST09NLCAwKTtcclxuXHRcdGxldCBjaG9vc2VNT05JVE9SSU5HX1JPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gTU9OSVRPUklOR19ST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1PTklUT1JJTkdfUk9PTSwgMCk7XHJcblx0XHRsZXQgY2hvb3NlTUFJTl9BUkVBID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IE1BSU5fQVJFQSwgKCkgPT4gYWdlbnQuZGVzdGluYXRpb24gPSBNQUlOX0FSRUEsIDApO1xyXG5cdFx0bGV0IGNob29zZUZFTV9CRURST09NID0gYWN0aW9uKCgpID0+IGRlc3RpbmF0aW9uID09IEZFTV9CRURST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IEZFTV9CRURST09NLCAwKTtcclxuXHRcdGxldCBjaG9vc2VNQUxFX0JFRFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gTUFMRV9CRURST09NLCAoKSA9PiBhZ2VudC5kZXN0aW5hdGlvbiA9IE1BTEVfQkVEUk9PTSwgMCk7XHJcblx0XHRsZXQgY2hvb3NlQkFUSFJPT00gPSBhY3Rpb24oKCkgPT4gZGVzdGluYXRpb24gPT0gQkFUSFJPT00sICgpID0+IGFnZW50LmRlc3RpbmF0aW9uID0gQkFUSFJPT00sIDApO1xyXG5cclxuXHJcblx0XHRsZXQgc2V0TmV4dERlc3RpbmF0aW9uID0gc2VsZWN0b3IoW1xyXG5cdFx0XHRjaG9vc2VFTkdJTkVTLFxyXG5cdFx0XHRjaG9vc2VDT0NLUElULFxyXG5cdFx0XHRjaG9vc2VTVE9SQUdFLFxyXG5cdFx0XHRjaG9vc2VET0NUT1JTX09GRklDRSxcclxuXHRcdFx0Y2hvb3NlQkFUSFJPT00sXHJcblx0XHRcdGNob29zZU1BTEVfQkVEUk9PTSxcclxuXHRcdFx0Y2hvb3NlRkVNX0JFRFJPT00sXHJcblx0XHRcdGNob29zZU1BSU5fQVJFQSxcclxuXHRcdFx0Y2hvb3NlTU9OSVRPUklOR19ST09NLFxyXG5cdFx0XHRjaG9vc2VUUkFOU1BPUlRfUk9PTSxcclxuXHRcdFx0Y2hvb3NlRVNDQVBFX1BPRFxyXG5cdFx0XSk7XHJcblxyXG5cdFx0cmV0dXJuIHNldE5leHREZXN0aW5hdGlvbjtcclxuXHR9XHJcblxyXG59XHJcblxyXG5cclxubGV0IHNldERlc3RpbmF0aW9uUHJlY29uZEZvckFnZW50ID0gZnVuY3Rpb24oYWdlbnQ6IEFnZW50KXtcclxuXHRsZXQgc2V0RGVzdGluYXRpb25QcmVjb25kOiBQcmVjb25kaXRpb24gPSAoKSA9PiBpc1VuZGVmaW5lZChhZ2VudC5kZXN0aW5hdGlvbikgfHwgYWdlbnQuZGVzdGluYXRpb24gPT0gYWdlbnQuY3VycmVudExvY2F0aW9uO1xyXG5cdHJldHVybiBzZXREZXN0aW5hdGlvblByZWNvbmQ7XHRcclxufVxyXG5cclxuLy8gLy8gY3JlYXRlIGJlaGF2aW9yIHRyZWVzXHJcblxyXG5cclxubGV0IGdvdG9OZXh0TG9jYXRpb25Gb3JBZ2VudCA9IGZ1bmN0aW9uKGFnZW50OiBBZ2VudCl7XHJcblx0cmV0dXJuICBhY3Rpb24oXHJcblx0XHQoKSA9PiB0cnVlLFxyXG5cdFx0KCkgPT4ge1xyXG5cdFx0XHRhZ2VudC5jdXJyZW50TG9jYXRpb24gPSBnZXROZXh0TG9jYXRpb24oYWdlbnQuY3VycmVudExvY2F0aW9uLCBhZ2VudC5kZXN0aW5hdGlvbik7XHJcblx0XHRcdGNvbnNvbGUubG9nKGFnZW50LCBcIiBhdDogXCIsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XHJcblx0XHR9LFxyXG5cdFx0MFxyXG5cdCk7XHJcbn1cclxuXHJcblxyXG5sZXQgbGFzdFNlZW5CeUFnZW50ID0gZnVuY3Rpb24oYWdlbnQpe1xyXG5cdHJldHVybiBzZXF1ZW5jZShbXHJcblx0XHRzZWxlY3RvcihbXHJcblx0XHRcdGFjdGlvbihcclxuXHRcdFx0XHRcdC8vcHJlY29uZGl0aW9uXHJcblx0XHRcdFx0XHQoKSA9PiBhZ2VudC5jdXJyZW50TG9jYXRpb24gPT0gd2lyZXMxLmN1cnJlbnRMb2NhdGlvbixcclxuXHRcdFx0XHRcdC8vICgpID0+IGdldEFnZW50VmFyaWFibGUoYWdlbnQsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcclxuXHRcdFx0XHRcdC8vZWZmZWN0XHJcblx0XHRcdFx0XHQoKSA9PiB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGFnZW50ICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMSB8IExvY2F0aW9uOiBcIisgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcclxuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coYWdlbnROYW1lICsgXCIgc2VlcyAtIEl0ZW06IHdpcmVzMSB8IExvY2F0aW9uOiBcIisgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSk7XHJcblx0XHRcdFx0XHRcdC8vIHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImxhc3RTZWVuOndpcmVzMVwiLCAgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSlcclxuXHRcdFx0XHRcdFx0YWdlbnQuc2V0TGFzdFNhd0l0ZW1BdExvY2F0aW9uKHdpcmVzMSwgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQvL3RpbWUgdGFrZW5cclxuXHRcdFx0XHRcdDBcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge30sMClcclxuXHRcdF0pLFxyXG5cdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHRhY3Rpb24oXHJcblx0XHRcdFx0XHQvL3ByZWNvbmRpdGlvblxyXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uID09IHdpcmVzMi5jdXJyZW50TG9jYXRpb24sXHJcblx0XHRcdFx0XHQvLyAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpID09IGdldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIpLFxyXG5cdFx0XHRcdFx0Ly9lZmZlY3RcclxuXHRcdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gSXRlbTogd2lyZXMyIHwgTG9jYXRpb246IFwiKyBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xyXG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhhZ2VudE5hbWUgKyBcInNlZXMgLSBJdGVtOiB3aXJlczIgfCBMb2NhdGlvbjogXCIrZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSk7XHJcblx0XHRcdFx0XHRcdGFnZW50LnNldExhc3RTYXdJdGVtQXRMb2NhdGlvbih3aXJlczIsIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XHJcblx0XHRcdFx0XHRcdC8vIHNldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCBcImxhc3RTZWVuOndpcmVzMlwiLCAgZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSlcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQvL3RpbWUgdGFrZW5cclxuXHRcdFx0XHRcdDBcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge30sMClcclxuXHRcdF0pLFxyXG5cdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHRhY3Rpb24oXHJcblx0XHRcdFx0XHQvL3ByZWNvbmRpdGlvblxyXG5cdFx0XHRcdFx0KCkgPT4gYWdlbnQuY3VycmVudExvY2F0aW9uICA9PSBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpLFxyXG5cdFx0XHRcdFx0Ly8gKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsICdjdXJyZW50TG9jYXRpb24nKSA9PSBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpLFxyXG5cdFx0XHRcdFx0Ly9lZmZlY3RcclxuXHRcdFx0XHRcdCgpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYWdlbnQgKyBcIiBzZWVzIC0gUGVyc29uOiBQbGF5ZXIgfCBMb2NhdGlvbjogXCIrIGFnZW50LmN1cnJlbnRMb2NhdGlvbik7XHJcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKGFnZW50TmFtZSArIFwic2VlcyAtIFBlcnNvbjogUGxheWVyIHwgTG9jYXRpb246IFwiK2dldEFnZW50VmFyaWFibGUoYWdlbnROYW1lLCAnY3VycmVudExvY2F0aW9uJykpO1xyXG5cdFx0XHRcdFx0XHQvLyBhZ2VudC5zZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24od2lyZXMxLCBhZ2VudC5jdXJyZW50TG9jYXRpb24pO1xyXG5cdFx0XHRcdFx0XHRhZ2VudC5zZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbigncGxheWVyJywgYWdlbnQuY3VycmVudExvY2F0aW9uKTtcclxuXHRcdFx0XHRcdFx0Ly8gc2V0QWdlbnRWYXJpYWJsZShhZ2VudE5hbWUsIFwibGFzdFNlZW46cGxheWVyXCIsICBnZXRBZ2VudFZhcmlhYmxlKGFnZW50TmFtZSwgJ2N1cnJlbnRMb2NhdGlvbicpKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdC8vdGltZSB0YWtlblxyXG5cdFx0XHRcdFx0MFxyXG5cdFx0XHRcdCksXHJcblx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7fSwwKVxyXG5cdFx0XSlcclxuXHRdKTtcclxufTtcclxuXHJcbmxldCBzZWFyY2hGb3JBZ2VudCA9IGZ1bmN0aW9uKGFnZW50OiBBZ2VudCwgZGVzdGluYXRpb246IHN0cmluZyA9IFwiVU5LTk9XTlwiKXtcclxuXHRpZihkZXN0aW5hdGlvbiA9PSBcIlVOS05PV05cIil7XHJcblx0XHRsZXQgc2VhcmNoID0gc2VxdWVuY2UoW1xyXG5cdFx0XHRzZWxlY3RvcihbXHJcblx0XHRcdFx0Z3VhcmQoc2V0RGVzdGluYXRpb25QcmVjb25kRm9yQWdlbnQoYWdlbnQpLCBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudCkpLFxyXG5cdFx0XHRcdGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XHJcblx0XHRcdFx0fSwwKVxyXG5cdFx0XHRdKSxcclxuXHRcdFx0Z290b05leHRMb2NhdGlvbkZvckFnZW50KGFnZW50KSxcclxuXHRcdF0pO1x0XHJcblx0XHRyZXR1cm4gc2VhcmNoXHJcblx0fVxyXG5cdGVsc2V7XHJcblx0XHRsZXQgc2VhcmNoID0gc2VxdWVuY2UoW1xyXG5cdFx0XHRzZWxlY3RvcihbXHJcblx0XHRcdFx0Z3VhcmQoc2V0RGVzdGluYXRpb25QcmVjb25kRm9yQWdlbnQoYWdlbnQpLCBzZXROZXh0RGVzdGluYXRpb25Gb3JBZ2VudChhZ2VudCwgZGVzdGluYXRpb24pKSxcclxuXHRcdFx0XHRhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge1xyXG5cdFx0XHRcdH0sMClcclxuXHRcdFx0XSksXHJcblx0XHRcdGdvdG9OZXh0TG9jYXRpb25Gb3JBZ2VudChhZ2VudCksXHJcblx0XHRdKTtcdFxyXG5cdFx0cmV0dXJuIHNlYXJjaFxyXG5cdH1cclxufVxyXG5cclxubGV0IENhbGViQlQgPSBzZXF1ZW5jZShbXHJcblx0bGFzdFNlZW5CeUFnZW50KENhbGViKSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRzZWFyY2hGb3JBZ2VudChDYWxlYiksIGxhc3RTZWVuQnlBZ2VudChDYWxlYilcclxuXHRdKVxyXG5dKTtcclxuXHJcbmxldCBRdWlubkJUID0gc2VxdWVuY2UoW1xyXG5cdGxhc3RTZWVuQnlBZ2VudChRdWlubiksXHJcblx0c2VxdWVuY2UoW1xyXG5cdFx0c2VhcmNoRm9yQWdlbnQoUXVpbm4pLCBsYXN0U2VlbkJ5QWdlbnQoUXVpbm4pXHJcblx0XSlcclxuXSk7XHJcblxyXG5sZXQgTWFya0JUID0gc2VxdWVuY2UoW1xyXG5cdGxhc3RTZWVuQnlBZ2VudChNYXJrKSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRzZWFyY2hGb3JBZ2VudChNYXJrKSwgbGFzdFNlZW5CeUFnZW50KE1hcmspXHJcblx0XSlcclxuXSk7XHJcblxyXG5sZXQgRWRkaWVCVCA9IHNlcXVlbmNlKFtcclxuXHRsYXN0U2VlbkJ5QWdlbnQoRWRkaWUpLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdHNlYXJjaEZvckFnZW50KEVkZGllKSwgbGFzdFNlZW5CeUFnZW50KEVkZGllKVxyXG5cdF0pXHJcbl0pO1xyXG5cclxubGV0IEJlYXRyaWNlQlQgPSBzZXF1ZW5jZShbXHJcblx0bGFzdFNlZW5CeUFnZW50KEJlYXRyaWNlKSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRzZWFyY2hGb3JBZ2VudChCZWF0cmljZSksIGxhc3RTZWVuQnlBZ2VudChCZWF0cmljZSlcclxuXHRdKVxyXG5dKTtcclxuXHJcbi8vIC8vYXR0YWNoIGJlaGF2aW91ciB0cmVlcyB0byBhZ2VudHNcclxuYXR0YWNoVHJlZVRvQWdlbnQoQ2FsZWIsIENhbGViQlQpO1xyXG5hdHRhY2hUcmVlVG9BZ2VudChRdWlubiwgUXVpbm5CVCk7XHJcbmF0dGFjaFRyZWVUb0FnZW50KE1hcmssIE1hcmtCVCk7XHJcbmF0dGFjaFRyZWVUb0FnZW50KEVkZGllLCBFZGRpZUJUKTtcclxuYXR0YWNoVHJlZVRvQWdlbnQoQmVhdHJpY2UsIEJlYXRyaWNlQlQpO1xyXG5cclxuLy8gLy8gMy4gQ29uc3RydWN0IHN0b3J5XHJcbi8vIC8vIGNyZWF0ZSB1c2VyIGFjdGlvbnNcclxuXHJcblxyXG5zZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIsMCk7XHJcbnNldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIiwwKTtcclxuc2V0VmFyaWFibGUoXCJTdG9yYWdlU3RhcnRcIiwwKTtcclxuc2V0VmFyaWFibGUoXCJEck9mZmljZVN0YXJ0XCIsMCk7XHJcbnNldFZhcmlhYmxlKFwiQ29ja3BpdFN0YXJ0XCIsMCk7XHJcbnNldFZhcmlhYmxlKFwiTW9uaXRvcmluZ1N0YXJ0XCIsMCk7XHJcbnNldFZhcmlhYmxlKFwiVHJhbnNwb3J0U3RhcnRcIiwwKTtcclxuc2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiLDApO1xyXG5cclxuXHJcbnZhciBNYWluQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTUFJTl9BUkVBLFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHNoaXAncyBtYWluIGFyZWEuXCIpLFxyXG4gICAgICAgICAgICBzZWxlY3RvcihbXHJcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIpID09IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJJdCB3YXMgYSBzaW1wbGUgbWlzc2lvbjogbGFuZCBvbiB0aGUgbmV3bHktZGlzY292ZXJlZCBwbGFuZXQgU2lndXJvbiwgdGVsZXBvcnQgY3JldyBtZW1iZXJzIGRvd24gdG8gaXRzIHN1cmZhY2UsIGFuZCBzZWN1cmUgYW5kIGRvY3VtZW50IG5ldyBpbmZvcm1hdGlvbi4gRXZlcnl0aGluZyB3ZW50IGF3cnkgZHVyaW5nIHBoYXNlIHR3by4gQXMgbW9zdCBvZiB0aGUgY3JldyBnYXRoZXJlZCBpbnRvIHRoZSB0cmFuc3BvcnQgYmF5LCB0aGUgY29tbWFuZGVyIGFuZCBhIGZldyBvdGhlcnMgc3RheWVkIGJlaGluZCB0byBtb25pdG9yIHRoZSBleHBsb3JhdGlvbi4gVGhlIHRlbGVwb3J0YXRpb24gcHJvY2VzcyBiZWdhbiwgeWV0IGltbWVkaWF0ZWx5IGEgbWFzc2l2ZSBzeXN0ZW1zIGZhaWx1cmUgb2NjdXJyZWQuIFRob3NlIHdobyBoYWQgYmVlbiBhd2FpdGluZyB0ZWxlcG9ydGF0aW9uIHdlcmUgZ29uZSwgYXNzdW1lZCB0byBoYXZlIGJlZW4gbG9zdCBpbiBzcGFjZS4gVGhlIGNvbW1hbmRlciBjb21lcyB0byBhcyB0aGUgc2hpcCBpcyBwbHVtbWV0aW5nIGZyb20gb3JiaXQsIHRoZWlyIGNyZXdtYXRlcyB5ZWxsaW5nIGF0IGVhY2ggb3RoZXIuIFRoZXJlIGlzIG9ubHkgb25lIGVzY2FwZSBwb2QgcmVtYWluaW5nLiBBcyBjb21tYW5kZXIsIHlvdSBhcmUgZXF1aXBwZWQgd2l0aCBhIHNwZWNpYWwgaW50ZXJhY3RpdmUgbWFwIGFsbG93aW5nIHlvdSB0byBzZWUgdGhlIHBvc2l0aW9ucyBvZiB5b3VyIGNyZXdtYXRlcyBhdCBhbGwgdGltZXMuIFlvdSBtdXN0IHV0aWxpemUgdGhlIG1hcCBpbiBvcmRlciB0byB0YWtlIGNvbnRyb2wgb2YgdGhlIHNoaXAgYW5kIHJlbWFpbmluZyBjcmV3IHRvIHNhdmUgZXZlcnlvbmUgZnJvbSBjZXJ0YWluIGRlYXRoLlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwidGhlU3RhcnRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9tYWluKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIpID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxyXG5cclxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcInRoZVN0YXJ0XCIpID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHNoaXAncyBtYWluIGFyZWEuXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiR28gbm9ydGggdG8gZW50ZXIgdGhlIGVuZ2luZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRU5HSU5FUykpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gbm9ydGhlYXN0IHRvIGVudGVyIHRoZSBzdG9yYWdlIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBTVE9SQUdFKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBlYXN0IHRvIGVudGVyIHRoZSBjb2NrcGl0LlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQ09DS1BJVCkpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGhlYXN0IHRvIGVudGVyIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBET0NUT1JTX09GRklDRSkpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiR28gc291dGggaW50byB0aGUgbW9uaXRvcmluZyByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTU9OSVRPUklOR19ST09NKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBzb3V0aCBpbnRvIHRoZSB0cmFuc3BvcnQgcm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRSQU5TUE9SVF9ST09NKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyBzb3V0aHdlc3QgdG8gZW50ZXIgdGhlIGVzY2FwZSBwb2QuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFU0NBUEVfUE9EKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyB3ZXN0IHRvIGVudGVyIHRoZSBiYXRocm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJBVEhST09NKSksXHJcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxyXG4gICAgICAgICAgICAgICBcdFx0XHRzZWxlY3RvcihbXHJcblx0XHRcdCAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNQUlOX1JPT006QnJva2VuXCIpID09IDAsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJJdCBoYXMgYmVlbiBob3VycyBzaW5jZSB0aGUgY3JldyBsYXN0IGF0ZS4gVGhlIHJlc2lkZW50IHNoaXAgbW9tIGNvdWxkIGhlbHAgcHJlcGFyZSBzb21lIGZvb2QuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9PntcclxuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIiwgMSk7XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIk1BSU5fUk9PTTpCcm9rZW5cIikgPT0gMSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkZpbmQgc29tZW9uZSB0byBwcmVwYXJlIGZvb2QgZm9yIHRoZSBjcmV3LlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSA9PSAyLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGNyZXcgd2FzIGFibGUgdG8gZWF0LCBidXQgdGhlIGtpdGNoZW4gd2FzIGxlZnQgYSBtZXNzLiBTb21lb25lIG5lZWRzIHRvIGNsZWFuIGl0LlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9ST09NOkJyb2tlblwiKSA9PSAzLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGNsZWFuIHRoZSBraXRjaGVuLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgXSksICAgIFxyXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKE1haW5CVCk7XHJcblxyXG52YXIgRW5naW5lQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRU5HSU5FUyxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRcdHNlbGVjdG9yKFtcclxuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIikgPT0gMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBlbmdpbmUgcm9vbSBpcyB3aGVyZSBCZWF0cmljZSBzcGVuZHMgbW9zdCBvZiBoZXIgdGltZS4gU2hl4oCZcyBhIG5hdHVyYWwgd2hlbiBpdCBjb21lcyB0byBwcm9ibGVtIHNvbHZpbmcsIGJ1dCBoZXIgdW5hcHByb2FjaGFibGUgYW5kIHVuZnJpZW5kbHkgcGVyc29uYWxpdHkgdHVybmVkIG1hbnkgaW5mbHVlbnRpYWwgY29tbWFuZGVycyBhd2F5IGZyb20gaGVyLiBEZXNwaXRlIGhlciBwZXJzb25hbGl0eSwgaGVyIGVuZ2luZWVyaW5nIHNraWxscyBhcmUgc2Vjb25kLXRvLW5vbmUuLi5ncmFudGVkIHNoZSBpcyB0aGUgb25seSBlbmdpbmVlciBsZWZ0LlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9lbmdpbmVzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdKSksXHJcblxyXG4gICAgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRW5naW5lU3RhcnRcIikgPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBlbmdpbmUgcm9vbS5cIiksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJIZWFkIGVhc3QgaW50byB0aGUgc3RvcmFnZSByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgU1RPUkFHRSkpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBtYWluIGFyZWEuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNQUlOX0FSRUEpKSxcclxuICAgICAgICAgICAgICAgICAgICBdKSksXHJcbiAgICAgICAgICAgICAgIFx0XHRcdHNlbGVjdG9yKFtcclxuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDAsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJJbiBvcmRlciB0byBmaXggdGhlIGVuZ2luZXMsIHJlcGxhY2VtZW50IHdpcmVzIG11c3QgYmUgZm91bmQuIEFuIGVuZ2luZWVyIG9yIGphbml0b3Igc2hvdWxkIGtub3cgd2hlcmUgdGhleSBhcmUuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9PntcclxuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIsIDEpO1xyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVTOkJyb2tlblwiKSA9PSAxLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCByZXBsYWNlbWVudCB3aXJlcy5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDIsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgd2lyZXMgd2VyZSBmb3VuZCwgYnV0IHRoZSB0b29sIGJveCBzZWVtcyB0byBiZSBtaXNzaW5nLiBDYWxlYiBtaWdodCBoYXZlIHRha2VuIGl0LlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDMsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJCZWZvcmUgdGhlIGVuZ2luZXMgY2FuIGJlIGZpeGVkLCB5b3UgbmVlZCB0byBmaW5kIGEgdG9vbCBib3guXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gNCxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIldpdGggYm94IGFjcXVpcmVkLCB0aGUgd2lyZXMgY2FuIG5vdyBiZSByZXBsYWNlZC4gQW4gZW5naW5lZXIgc2hvdWxkIGtub3cgaG93IHRvIGRvIGl0LlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVOR0lORVM6QnJva2VuXCIpID09IDUsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBoYXZlIHRoZSB3aXJlcyByZXBsYWNlZCBpbiB0aGUgZW5naW5lIHJvb20uXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gNixcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBlbmdpbmUncyBub3cgZml4ZWQsIGJ1dCBpdCBzdGlsbCBuZWVkcyB0byBiZSByZXN0YXJ0ZWQuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRU5HSU5FUzpCcm9rZW5cIikgPT0gNyxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byByZXN0YXJ0IHRoZSB0ZWxlcG9ydGVyLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgXSksICAgIFxyXG4gICAgICAgICAgICAgICBcdC8vT3B0aW9uYWxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcclxuICAgICAgICAgICAgXSksXHJcblx0XHRdXHJcblx0KSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoRW5naW5lQlQpO1xyXG5cclxudmFyIFN0b3JhZ2VCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBTVE9SQUdFLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0c2VsZWN0b3IoW1xyXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTdG9yYWdlU3RhcnRcIikgPT0gMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBzdG9yYWdlIHJvb20gaXMgd2hlcmUgRWRkaWUgc3BlbmRzIGhpcyB0aW1lIGFuZCBzdG9yZXMgaGlzIGphbml0b3IgZXF1aXBtZW50LiBPbGQgYXMgaGUgaXMsIGhlIHN0aWxsIGRvZXMgaGlzIGJlc3QgdG8gY29udHJpYnV0ZSB0byB0aGUgdGVhbSBpbiB3aGF0ZXZlciB3YXkgaGUgY2FuLCBkZXNwaXRlIGxhY2tpbmcgdGVjaG5pY2FsIHNraWxscyB0aGUgb3RoZXIgY3Jld21hdGVzIGVtcGxveS4gQWx0aG91Z2ggaGUgaXMgYSB3ZWxsLWtub3duIGhlcm8gYW1vbmcgbWlsaXRhcnkgcGVyc29ubmVsLCBoaXMgY3Jld21hdGVzIGNvbnRpbnVlIHRvIHJlbWFpbiBvYmxpdmlvdXMgdG8gdGhlIGZhY3QgdGhhdCB0aGUgbWFuIHdobyBzY3J1YnMgdGhlaXIgdG9pbGV0cyBoYWQgYmVlbiBvbmUgb2YgdGhlIG1vc3QgYWNjb21wbGlzaGVkIG1pbGl0YXJ5IG9mZmljZXJzIHRoZSB1bml2ZXJzZSBoYWQgZXZlciBzZWVuLlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIlN0b3JhZ2VTdGFydFwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX3N0b3JhZ2UpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcclxuXHJcbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTdG9yYWdlU3RhcnRcIikgPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmVkIGludG8gdGhlIHN0b3JhZ2Ugcm9vbS5cIiksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHdlc3QgaW50byB0aGUgZW5naW5lIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFTkdJTkVTKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcclxuICAgICAgICAgICAgICAgXHRzZWxlY3RvcihbXHJcblx0XHRcdCAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSA9PSAwLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHN0b3JhZ2Ugcm9vbSBpcyBhIG1lc3MuIEEgamFuaXRvciB3b3VsZCBiZSBhYmxlIHRvIG1ha2Ugc2Vuc2Ugb2YgaXQgYWxsLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiLCAxKTtcclxuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0fSwgMClcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiU1RPUkFHRTpCcm9rZW5cIikgPT0gMSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkZpbmQgc29tZW9uZSB0byByZW9yZ2FuaXplIHRoZSBzdG9yYWdlIHJvb20uXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSA9PSAyLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiTm93IHRoYXQgdGhlIHN0b3JhZ2Ugcm9vbSBpcyBjbGVhbiwgdGhlIHJlcGxhY2VtZW50IHdpcmVzIGNhbiBieSBmb3VuZC5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlNUT1JBR0U6QnJva2VuXCIpID09IDMsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gcmV0cmlldmUgdGhlIHdpcmVzLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgXSksICAgIFxyXG5cclxuICAgICAgICAgICAgICAgXHQvL09wdGlvbmFsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXHJcbiAgICAgICAgICAgIF0pLFxyXG5cdFx0XVxyXG5cdCkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKFN0b3JhZ2VCVCk7XHJcblxyXG52YXIgRHJPZmZpY2VCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBET0NUT1JTX09GRklDRSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRcdHNlbGVjdG9yKFtcclxuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRHJPZmZpY2VTdGFydFwiKSA9PSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiRHIuIFF1aW5uIHNwZW5kcyBhIGxvdCBvZiB0aW1lIGluIGhlciBvZmZpY2UgbG9va2luZyBhZnRlciBwYXRpZW50cy4gU2hlIHB1dHMgYWxsIG90aGVycyBhYm92ZSBoZXJzZWxmOyBzaGUgaXMgY29uc3RhbnRseSBjb25jZXJuZWQgd2l0aCB0aGUgd2VsbC1iZWluZyBvZiBoZXIgY3Jld21hdGVzLiBUaGUgcHJvc3BlY3Qgb2YgaGVyIHBhdGllbnRzIGR5aW5nIHN0aWxsIGtlZXBzIGhlciB1cCBhdCBuaWdodCwgYnV0IGhlciBkZXRlcm1pbmF0aW9uIHRvIHNhdmUgYXMgbWFueSBwZW9wbGUgYXMgc2hlIGNhbiBpcyB3aGF0IGtlZXBzIGhlciBnb2luZy4gSGVyIG1hdGVybmFsIGluc3RpbmN0cyBmb2xsb3cgaGVyIGZyb20gaGVyIGhvdXNlIHRvIHRoZSBzaGlwLlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiRHJPZmZpY2VTdGFydFwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX2RyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIpID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxyXG5cclxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkRyT2ZmaWNlU3RhcnRcIikgPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBkb2N0b3IncyBvZmZpY2UuXCIpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBub3J0aGVhc3QgaW50byB0aGUgY29ja3BpdC5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIENPQ0tQSVQpKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkdvIHdlc3QgaW50byB0aGUgbW9uaXRvcmluZyByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTU9OSVRPUklOR19ST09NKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJSZXR1cm4gdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcclxuICAgICAgICAgICAgICAgXHRcdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiRFJfT0ZGSUNFOkJyb2tlblwiKSA9PSAwLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZSBjcmV3bWF0ZXMgbWF5IGhhdmUgc3VzdGFpbmVkIGluanVyaWVzLiBGaW5kIHRoZSBkb2N0b3IuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9PntcclxuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIkRSX09GRklDRTpCcm9rZW5cIiwgMSk7XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkRSX09GRklDRTpCcm9rZW5cIikgPT0gMSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIkZpbmQgc29tZW9uZSB0byBjaGVjayB0aGUgY3JldydzIGhlYWx0aC5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkRSX09GRklDRTpCcm9rZW5cIikgPT0gMixcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWUgbWlub3IgaW5qdXJpZXMgd2VyZSBzdXN0YWluZWQuIEZpbmQgdGhlIGRvY3RvciB0byBoZWFsIHRoZSBjcmV3J3MgaW5qdXJpZXMuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIpID09IDMsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJGaW5kIHNvbWVvbmUgdG8gaGVhbCB0aGUgY3JldydzIGluanVyaWVzLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICBdKSwgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgXHQvLyBPcHRpb25hbFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiU29tZXRoaW5nIHNlZW1zIHRvIGhhdmUgZ29uZSB3cm9uZy4uLlwiKVxyXG4gICAgICAgICAgICBdKSxcclxuXHRcdF1cclxuXHQpKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShEck9mZmljZUJUKTtcclxuXHJcbnZhciBDb2NrcGl0QlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQ09DS1BJVCxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRcdHNlbGVjdG9yKFtcclxuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ29ja3BpdFN0YXJ0XCIpID09IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgY29ja3BpdCBpcyB3aGVyZSBUYXlsb3IgcGlsb3RzIHRoZSBzaGlwLCBidXQgQ2FsZWIgc3BlbmRzIGEgbG90IG9mIGhpcyB0aW1lIHRoZXJlIGFzIHdlbGwuIENhbGViIHJ1bnMgdGhpbmdzIHZlcnkgZGlmZmVyZW50bHkgZnJvbSBUYXlsb3I7IGhlIGlzIGEgZGVtYW5kaW5nIGxlYWRlciB3aG8gaGFyc2hseSBjcml0aWNpemVzIGhpcyBjcmV3bWF0ZXMgd2hlbiBmYWlsdXJlcyBvY2N1ci4gSGUgc2VjcmV0bHkgbG9hdGhlcyBUYXlsb3I7IHRoZWlyIHBlcnNvbmFsaXRpZXMgY2xhc2ggYWxsLXRvby1mcmVxdWVudGx5LCBhbmQgdGhlaXIgcG9zaXRpb24gb24gdGhlIHNoaXAgZGVzcGl0ZSBoaXMgb2xkZXIgYWdlIGlzIGEgY29uc3RhbnQgc291cmNlIG9mIGFuZ2VyIHRvIHRoZSBvZmZpY2VyLlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiQ29ja3BpdFN0YXJ0XCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fY29ja3BpdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxyXG5cclxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNvY2twaXRTdGFydFwiKSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGludG8gdGhlIGNvY2twaXQuXCIpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBzb3V0aHdlc3QgaW50byB0aGUgZG9jdG9yJ3Mgb2ZmaWNlLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRE9DVE9SU19PRkZJQ0UpKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXHJcblx0XHRdKSksXHJcblx0XHRcdFx0XHRcdHNlbGVjdG9yKFtcclxuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIpID09IDAsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJOb3cgdGhhdCB0aGUgc2hpcCBpcyBiYWNrIG9ubGluZSwgeW91IHdpbGwgbmVlZCB0byBjb250YWN0IGEgc3VwcG9ydCBzaGlwLiBBbiBvZmZpY2VyIHdvdWxkIGJlIHBlcmZlY3QgZm9yIHRoZSBqb2IuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9PntcclxuXHRcdFx0XHRcdCAgICAgICAgICAgIFx0XHRzZXRWYXJpYWJsZShcIkNPQ0tQSVQ6QnJva2VuXCIsIDEpO1xyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSA9PSAxLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGNvbnRhY3QgYSBzdXBwb3J0IHNoaXAuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSA9PSAyLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiQSBzdXBwb3J0IHNoaXAgaGFzIG5vdyBiZWVuIGNvbnRhY3RlZCwgYnV0IHRoZSBzaGlwIG11c3QgZ2V0IHJlYWR5IHRvIGJlIG1vdmVkLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiQ09DS1BJVDpCcm9rZW5cIikgPT0gMyxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBwcmVwYXJlIHRoZSBzaGlwIHRvIG1vdmUuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgXSksXHJcblx0XHRdXHJcblx0KSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoQ29ja3BpdEJUKTtcclxuXHJcbnZhciBNb25pdG9yaW5nQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTU9OSVRPUklOR19ST09NLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0c2VsZWN0b3IoW1xyXG4gICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNb25pdG9yaW5nU3RhcnRcIikgPT0gMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBtb25pdG9yaW5nIHJvb20gaXMgcHVycG9zZWQgdG8gc2VlIGludG8gdGhlIHRyYW5zcG9ydCByb29tLCB0aHVzIHdhdGNoaW5nIGZvciBzaWducyBvZiB0cm91YmxlIHdpdGggdGhlIHRyYW5zcG9ydGVyLlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk5leHQuXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiTW9uaXRvcmluZ1N0YXJ0XCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzOiBcIiwgZ2V0VmFyaWFibGUoZ29hbF9icm9rZW5fbW9uaXRvcmluZykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIk1PTklUT1JJTkdfUk9PTTpCcm9rZW5cIiksIGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0pKSxcclxuXHJcbiAgICAgICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNb25pdG9yaW5nU3RhcnRcIikgPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBtb25pdG9yaW5nIHJvb20uXCIpLFxyXG5cdFx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBlYXN0IGludG8gdGhlIGRvY3RvcidzIG9mZmljZS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIERPQ1RPUlNfT0ZGSUNFKSksXHJcblx0XHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJHbyB3ZXN0IGludG8gdGhlIHRyYW5zcG9ydCByb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVFJBTlNQT1JUX1JPT00pKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXHJcblx0XHRcdF0pKSxcclxuICAgICAgICAgICAgICAgXHRcdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAwLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIG1vbml0b3Jpbmcgcm9vbSBuZWVkcyB0byBiZSBpbnNwZWN0ZWQgdG8gbm90ZSBhbnkgbWFsZnVuY3Rpb25zLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpPT57XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdFx0c2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIsIDEpO1xyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIpID09IDEsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gaW5zcGVjdCB0aGUgbW9uaXRvcmluZyByb29tLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAyLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiTm90aGluZyBpcyB3cm9uZyBpbiB0aGUgbW9uaXRvcmluZyByb29tLCBidXQgc29tZSBicm9rZW4gc2hhcmRzIGZsZXcgaW4gZnJvbSB0aGUgYWRqYWNlbnQgcm9vbS4gQSBqYW5pdG9yIHdvdWxkIGhhdmUgaXQgY2xlYW5lZCB1cCBpbiBubyB0aW1lLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAzLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgdG8gZmluZCBzb21lb25lIHRvIGNsZWFuIHRoZSBtb25pdG9yaW5nIHJvb20uXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICBdKSxcclxuXHJcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcclxuICAgICAgICAgICAgXSksXHJcblx0XHRdXHJcblx0KSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoTW9uaXRvcmluZ0JUKTtcclxuXHJcbnZhciBUcmFuc3BvcnRCVCA9IGd1YXJkKFxyXG5cdCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBUUkFOU1BPUlRfUk9PTSxcclxuXHRzZXF1ZW5jZShbXHJcblx0XHRcdHNlbGVjdG9yKFtcclxuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVHJhbnNwb3J0U3RhcnRcIikgPT0gMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIldoZXJlIHRoZSB0cmFuc3BvcnRlciBpcyBsb2NhdGVkIGFuZCB3aGVyZSB0aGUgZmFpbHVyZSBvY2N1cnJlZC4gTWFyayB0aGUgdHJhbnNwb3J0IG9mZmljZXIgb2Z0ZW4gd29ya3MgaW4gaGVyZS4gTWFyayBpcyBhbiBvbGRlciBjcmV3bWF0ZSB3aG8gYXZvaWRzIHRoZSBzcG90bGlnaHQgbGlrZSB0aGUgcGxhZ3VlLiBIaXMgYW54aWV0eSBsZXZlbHMgc2hvdCB1cCByYXBpZGx5IGFmdGVyIHRoZSBmYWlsdXJlLCBhbmQgaGUgaXMgZXhjZXNzaXZlbHkgd29ycmllZCB0aGF0IHRoZSByZXN0IG9mIHRoZSBjcmV3IGJsYW1lcyB0aGUgZmFpbHVyZSBvbiBoaW0uXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJUcmFuc3BvcnRTdGFydFwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpczogXCIsIGdldFZhcmlhYmxlKGdvYWxfYnJva2VuX3RyYW5zcG9ydCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSwgZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxyXG5cclxuICAgICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRyYW5zcG9ydFN0YXJ0XCIpID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSB0cmFuc3BvcnQgcm9vbSB3aGVyZSB0aGUgdGVsZXBvcnRlciBpcyBsb2NhdGVkLlwiKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIk1vdmUgZWFzdCBpbnRvIHRoZSBtb25pdG9yaW5nIHJvb20uXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNT05JVE9SSU5HX1JPT00pKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIkV4aXQgdG8gdGhlIG1haW4gYXJlYS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1BSU5fQVJFQSkpLFxyXG5cclxuXHRcdFx0XHRcdFx0Ly8gR29hbCBvcHRpb25zIGZvciB0aGUgcm9vbSAtPiBPbmx5IHNob3dpbmcgdGhlc2Ugd2hlbiB0aGUgbWFpbiBoZWxwIHRleHQgaXMgb2ZmLiBcclxuXHRcdFx0XHRcdFx0c2VsZWN0b3IoW1xyXG5cdFx0XHQgICAgICAgICAgICBcdGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDAsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGVyZSBzZWVtcyB0byBiZSBhIHByb2JsZW0gd2l0aCB0aGUgdGVsZXBvcnRlciBzb2Z0d2FyZS4gTWF5YmUgYSB0cmFuc3BvcnQgb2ZmaWNlciBjb3VsZCBjaGVjayBpdCBvdXQuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCk9PntcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgXHQvLyBIaW50IGdpdmVuOiBBc2sgTWFya1xyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIsIDEpO1xyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHR9LCAwKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byBsb29rIGF0IHRoZSB0ZWxlcG9ydGVyIHNvZndhcmUuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMixcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSBzb2Z0d2FyZSB3YXMgbG9va2VkIG92ZXIsIGJ1dCBiZWZvcmUgaXQgY2FuIGJlIHJlc3RhcnRlZCwgdGhlIHJvb20gbXVzdCBiZSBjbGVhbmVkLiBTb3VuZHMgbGlrZSBhIGphbml0b3IncyBqb2IuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gMyxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGNsZWFuIHRoZSByb29tIGJlZm9yZSBhbnkgb3RoZXIgcHJvZ3Jlc3MgaXMgbWFkZS5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSA0LFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIHJvb20gaXMgY2xlYW5lZCwgc28gbm93IHRoZSB0ZWxlcG9ydGVyIHNvZnR3YXJlIGNhbiBiZSByZXN0YXJ0ZWQuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gNSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byByZXN0YXJ0IHRoZSB0ZWxlcG9ydGVyIHNvZnR3YXJlLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDYsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgdGVsZXBvcnRlciBzb2Z0d2FyZSB3YXMgcmVzdGFydGVkLCBidXQgbm93IGl0IG5lZWRzIHRvIGJlIHJlY29uZmlndXJlZCB0byBtYXRjaCB0aGUgc2V0dGluZ3Mgb2YgdGhlIHNoaXAuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gNyxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIHRvIGZpbmQgc29tZW9uZSB0byByZWNvbmZpZ3VyZSB0aGUgc29mdHdhcmUuXCIpLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIF0pXHJcblx0XHRcdCAgICAgICAgICAgICAgICApLFxyXG5cdFx0XHQgICAgICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJUUkFOU1BPUlRfUk9PTTpCcm9rZW5cIikgPT0gOCxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZSB0ZWxlcG9ydGVyIHNvZnR3YXJlIGlzIG5vdyBnb29kIHRvIGdvLCBzbyBhbGwgdGhhdCBpcyBsZWZ0IGlzIHRvIHJlc3RhcnQgdGhlIHRlbGVwb3J0ZXIgaXRzZWxmLlwiKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBdKVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgKSxcclxuXHRcdFx0ICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIpID09IDksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gcmVzdGFydCB0aGUgdGVsZXBvcnRlci5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdFx0XHRcdF0pXHJcblx0XHRcdFx0XHRdKSxcclxuXHRcdFx0XHQpXHJcblxyXG4gICAgICAgICAgICAgICBcdC8vIE9wdGlvbmFsXHJcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJTb21ldGhpbmcgc2VlbXMgdG8gaGF2ZSBnb25lIHdyb25nLi4uXCIpXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIFxyXG5cdFx0XSlcclxuXHQpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKFRyYW5zcG9ydEJUKTtcclxuXHJcbnZhciBFc2NhcGVQb2RCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBFU0NBUEVfUE9ELFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdHNlbGVjdG9yKFtcclxuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiKSA9PSAwLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRoZXJlIGlzIG9ubHkgb25lIGVzY2FwZSBwb2QgYWJvYXJkIHRoaXMgc2hpcC4gSWYgYW55IGNyZXdtYXRlIGJlY29tZXMgdG9vIGZlYXJmdWwgb2YgdGhlaXIgY3VycmVudCBzaXR1YXRpb24sIHRoZXkgd2lsbCBhdHRlbXB0IHRvIGxlYXZlIGluIGl0LlwiKSxcclxuICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTmV4dC5cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcIkVzY2FwZVN0YXJ0XCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXM6IFwiLCBnZXRWYXJpYWJsZShnb2FsX2Jyb2tlbl9lc2NhcGUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIpLCBnZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIpID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHRdKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgIFx0Z3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFc2NhcGVTdGFydFwiKSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgXHRkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGVzY2FwZSBwb2QuXCIpLFxyXG5cdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXHJcblx0XHRcdFx0XSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgXHRcdHNlbGVjdG9yKFtcclxuXHRcdFx0ICAgICAgICAgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIpID09IDAsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgZXNjYXBlIHBvZCBuZWVkcyB0byBiZSBpbnNwZWN0ZWQgZm9yIHNpZ25zIG9mIG1hbGZ1bmN0aW9ucy5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKT0+e1xyXG5cdFx0XHRcdFx0ICAgICAgICAgICAgXHRcdHNldFZhcmlhYmxlKFwiRVNDQVBFX1BPRDpCcm9rZW5cIiwgMSk7XHJcblx0XHRcdFx0XHQgICAgICAgICAgICBcdH0sIDApXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIpID09IDEsXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbmVlZCB0byBmaW5kIHNvbWVvbmUgdG8gaW5zcGVjdCB0aGUgZXNjYXBlIHBvZC5cIiksXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgXSlcclxuXHRcdFx0ICAgICAgICAgICAgICAgICksXHJcblx0XHRcdCAgICAgICAgXSksXHJcbiAgICAgICAgXSksXHJcblx0XSlcclxuKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShFc2NhcGVQb2RCVCk7XHJcblxyXG52YXIgRkJlZHJvb21CVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBGRU1fQkVEUk9PTSxcclxuXHRzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgaW50byB0aGUgZmVtYWxlcycgYmVkcm9vbS5cIiksXHJcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiUmV0dXJuIHRvIHRoZSBiYXRocm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJBVEhST09NKSksXHJcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcclxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcclxuICAgICAgICAgICAgXSksXHJcblx0XHQpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEZCZWRyb29tQlQpO1xyXG5cclxudmFyIEJhdGhyb29tQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQkFUSFJPT00sXHJcblx0c2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgXHRcdGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIGJhdGhyb29tLlwiKSxcclxuXHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHNvdXRoIGludG8gdGhlIG1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFMRV9CRURST09NKSksXHJcblx0XHRcdFx0XHRhZGRVc2VyQWN0aW9uKFwiTW92ZSBub3J0aCBpbnRvIHRoZSBmZW1hbGVzJyBiZWRyb29tLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRkVNX0JFRFJPT00pKSxcclxuXHRcdFx0XHRcdGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgbWFpbiBhcmVhLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUFJTl9BUkVBKSksXHJcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcclxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcclxuICAgICAgICAgICAgXSksXHJcblx0XHQpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKEJhdGhyb29tQlQpO1xyXG5cclxudmFyIE1CZWRyb29tQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTUFMRV9CRURST09NLFxyXG5cdHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGludG8gdGhlIG1hbGVzJyBiZWRyb29tLlwiKSxcclxuXHRcdFx0XHRcdFx0YWRkVXNlckFjdGlvbihcIlJldHVybiB0byBiYXRocm9vbS5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJBVEhST09NKSksXHJcbiAgICAgICAgICAgICAgIFx0Ly8gT3B0aW9uYWxcclxuICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGdvbmUgd3JvbmcuLi5cIilcclxuICAgICAgICAgICAgXSksXHJcblx0XHQpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKE1CZWRyb29tQlQpO1xyXG5cclxudmFyIHdpcmVzMUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IHdpcmVzMS5jdXJyZW50TG9jYXRpb24sIC8vICBnZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiKVxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5vdGljZSB3aXJlcyBvbiB0aGUgZ3JvdW5kLlwiKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvblRyZWUoXCJQaWNrIHVwIHRoZSB3aXJlcy5cIixcclxuXHRcdFx0XHRzZXF1ZW5jZShbXHJcblx0XHRcdFx0XHRhY3Rpb24oKCk9PnRydWUsICgpID0+IHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgd2lyZXMuXCIpO1xyXG5cdFx0XHRcdFx0XHRzZXRJdGVtVmFyaWFibGUod2lyZXMxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInBsYXllclwiKTtcclxuXHRcdFx0XHRcdFx0c2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQsIGdldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkKSArIDEpO1xyXG5cdFx0XHRcdFx0fSwgMCksXHJcblx0XHRcdFx0XHQvLyBhY3Rpb24oKCk9PnRydWUsICgpID0+IHtcclxuXHRcdFx0XHRcdC8vICAgICBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIldvdyB5b3Uga25vdyBob3cgdG8gcGljayB1cCB0aGluZ3MuXCIpfSwgMClcclxuXHRcdFx0XHRdKVxyXG5cdFx0XHQpXHJcblx0XHRdXHJcblx0KSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUod2lyZXMxQlQpO1xyXG5cclxudmFyIHdpcmVzMkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IHdpcmVzMi5jdXJyZW50TG9jYXRpb24sIC8vIGdldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIpLFxyXG5cdHNlcXVlbmNlKFtcclxuXHRcdFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5vdGljZSB3aXJlcyBvbiB0aGUgZ3JvdW5kLlwiKSxcclxuXHRcdFx0YWRkVXNlckFjdGlvbihcIlBpY2sgdXAgdGhlIHdpcmVzLlwiLCAoKSA9PiB7XHJcblx0XHRcdFx0ZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgd2lyZXMuXCIpO1xyXG5cdFx0XHRcdHNldEl0ZW1WYXJpYWJsZSh3aXJlczIsIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpO1xyXG5cdFx0XHRcdHNldFZhcmlhYmxlKHdpcmVzQ29sbGVjdGVkLCBnZXRWYXJpYWJsZSh3aXJlc0NvbGxlY3RlZCkgKyAxKTtcclxuXHRcdFx0fSlcclxuXHRcdF1cclxuXHQpKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZSh3aXJlczJCVCk7XHJcblxyXG5sZXQgYWRkR29hbFRvQWdlbnQgPSBmdW5jdGlvbihnb2FsLCBhZ2VudCwgZGVzdGluYXRpb24pIHtcclxuXHRsZXQgbmV3QWdlbnRUcmVlID0gc2VxdWVuY2UoW1xyXG5cdFx0bGFzdFNlZW5CeUFnZW50KGFnZW50KSxcclxuXHRcdHNlcXVlbmNlKFtcclxuXHRcdFx0c2VhcmNoRm9yQWdlbnQoYWdlbnQsIGRlc3RpbmF0aW9uKSwgbGFzdFNlZW5CeUFnZW50KGFnZW50KVxyXG5cdFx0XSlcclxuXHRdKTtcclxuXHRhdHRhY2hUcmVlVG9BZ2VudChhZ2VudCwgbmV3QWdlbnRUcmVlKTtcclxufVxyXG5cclxuXHJcbmxldCBwbGF5ZXJTZWVzQWdlbnQgPSBmdW5jdGlvbihhZ2VudCkge1xyXG5cdHZhciBwbGF5ZXJTZWVzQWdlbnQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gYWdlbnQuY3VycmVudExvY2F0aW9uLFxyXG5cdCAgICBzZXF1ZW5jZShbXHJcblx0ICAgIFx0ZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IHNlZSBcIithZ2VudC5uYW1lK1wiLlwiKSxcclxuXHQgICAgXHRndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIlRSQU5TUE9SVF9ST09NOkJyb2tlblwiKSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJUZWxsIFwiICsgYWdlbnQubmFtZSArIFwiIHRvIGluc3BlY3QgdGhlIHRlbGVwb3J0ZXIgc29mdHdhcmUuXCIsICgpID0+IGFkZEdvYWxUb0FnZW50KFwiVFJBTlNQT1JUX1JPT006QnJva2VuXCIsIGFnZW50LCBUUkFOU1BPUlRfUk9PTSkpLFxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJFTkdJTkVfUk9PTTpCcm9rZW5cIikgPT0gMSxcclxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiVGVsbCBcIiArIGFnZW50Lm5hbWUgKyBcIiB0byBmaW5kIHJlcGxhY2VtZW50IHdpcmVzIGZvciB0aGUgZW5naW5lLlwiLCAoKSA9PiBhZGRHb2FsVG9BZ2VudChcIkVOR0lORV9ST09NOkJyb2tlblwiLCBhZ2VudCwgRU5HSU5FUykpLFxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJTVE9SQUdFOkJyb2tlblwiKSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJUZWxsIFwiICsgYWdlbnQubmFtZSArIFwiIHRvIHJlb3JnYW5pemUgdGhlIHN0b3JhZ2Ugcm9vbS5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJTVE9SQUdFOkJyb2tlblwiLCBhZ2VudCwgU1RPUkFHRSkpLFxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJEUl9PRkZJQ0U6QnJva2VuXCIpID09IDEsXHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gY2hlY2sgdGhlIGhlYWx0aCBvZiB0aGUgY3Jldy5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJEUl9PRkZJQ0U6QnJva2VuXCIsIGFnZW50LCBET0NUT1JTX09GRklDRSkpLFxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJDT0NLUElUOkJyb2tlblwiKSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJUZWxsIFwiICsgYWdlbnQubmFtZSArIFwiIHRvIGNvbnRhY3QgYSBzdXBwb3J0IHNoaXAuXCIsICgpID0+IGFkZEdvYWxUb0FnZW50KFwiQ09DS1BJVDpCcm9rZW5cIiwgYWdlbnQsIENPQ0tQSVQpKSxcclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTU9OSVRPUklOR19ST09NOkJyb2tlblwiKSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJUZWxsIFwiICsgYWdlbnQubmFtZSArIFwiIHRvIGluc3BlY3QgdGhlIG1vbml0b3Jpbmcgcm9vbS5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJNT05JVE9SSU5HX1JPT006QnJva2VuXCIsIGFnZW50LCBNT05JVE9SSU5HX1JPT00pKSxcclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiTUFJTl9BUkVBOkJyb2tlblwiKSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJUZWxsIFwiICsgYWdlbnQubmFtZSArIFwiIHRvIHByZXBhcmUgZm9vZCBmb3IgdGhlIGNyZXcuXCIsICgpID0+IGFkZEdvYWxUb0FnZW50KFwiTUFJTl9BUkVBOkJyb2tlblwiLCBhZ2VudCwgTUFJTl9BUkVBKSksXHJcbiAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcIkVTQ0FQRV9QT0Q6QnJva2VuXCIpID09IDEsXHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlRlbGwgXCIgKyBhZ2VudC5uYW1lICsgXCIgdG8gaW5zcGVjdCB0aGUgZXNjYXBlIHBvZC5cIiwgKCkgPT4gYWRkR29hbFRvQWdlbnQoXCJFU0NBUEVfUE9EOkJyb2tlblwiLCBhZ2VudCwgRVNDQVBFX1BPRCkpLFxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgKSxcclxuXHRcdF0pXHJcblx0KTtcclxuXHRhZGRVc2VySW50ZXJhY3Rpb25UcmVlKHBsYXllclNlZXNBZ2VudCk7XHJcbn1cclxuXHJcbnBsYXllclNlZXNBZ2VudChDYWxlYilcclxucGxheWVyU2Vlc0FnZW50KFF1aW5uKVxyXG5wbGF5ZXJTZWVzQWdlbnQoTWFyaylcclxucGxheWVyU2Vlc0FnZW50KEJlYXRyaWNlKVxyXG5cclxuXHJcbi8vIC8vNC4gUnVuIHRoZSB3b3JsZFxyXG5pbml0aWFsaXplKCk7XHJcbnZhciB1c2VySW50ZXJhY3Rpb25PYmplY3QgPSBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKTtcclxuXHJcbi8vIC8vUkVOREVSSU5HLS0tLS1cclxudmFyIGRpc3BsYXlQYW5lbCA9IHt4OiAyNTAsIHk6IDB9O1xyXG52YXIgdGV4dFBhbmVsID0ge3g6IDI3MCwgeTogNTAxfTtcclxudmFyIGFjdGlvbnNQYW5lbCA9IHt4OiA1MjAsIHk6IDU1MH07XHJcblxyXG52YXIgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheScpO1xyXG52YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxudmFyIHNwYWNlc2hpcEltYWdlID0gbmV3IEltYWdlKCk7XHJcbnNwYWNlc2hpcEltYWdlLm9ubG9hZCA9IHJlbmRlcjtcclxudmFyIHBsYXllckltYWdlID0gbmV3IEltYWdlKCk7XHJcbnZhciBjYWxlYkltYWdlID0gbmV3IEltYWdlKCk7XHJcbnZhciBxdWlubkltYWdlID0gbmV3IEltYWdlKCk7XHJcbnZhciBtYXJrSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxudmFyIGVkZGllSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxudmFyIGJlYXRyaWNlSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlcigpIHtcclxuXHRjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdGNvbnRleHQuZHJhd0ltYWdlKHNwYWNlc2hpcEltYWdlLCBkaXNwbGF5UGFuZWwueCwgZGlzcGxheVBhbmVsLnksIDEwMDAsIDUwMCk7XHJcblx0ZGlzcGxheVBsYXllcigpO1xyXG5cdGRpc3BsYXlDYWxlYigpO1xyXG5cdGRpc3BsYXlRdWlubigpO1xyXG5cdGRpc3BsYXlNYXJrKCk7XHJcblx0ZGlzcGxheUVkZGllKCk7XHJcblx0ZGlzcGxheUJlYXRyaWNlKCk7XHJcblx0ZGlzcGxheVRleHRBbmRBY3Rpb25zKCk7XHJcbn1cclxuXHJcbnZhciBtYXBQb3NpdGlvbnMgPSB7XHJcblx0XCJFTkdJTkVTXCI6IHt4OiAyODUsIHk6IDEwOH0sXHJcblx0XCJDT0NLUElUXCI6IHt4OiA4NjAsIHk6IDIzMH0sXHJcblx0XCJTVE9SQUdFXCI6IHt4OiA1NTAsIHk6IDEwNn0sXHJcblx0XCJET0NUT1JTIE9GRklDRVwiOiB7eDogNzI1LCB5OiAzNTB9LFxyXG5cdFwiTUFJTiBBUkVBXCI6IHt4OiA0ODAsIHk6IDI0MH0sXHJcblx0XCJFU0NBUEUgUE9EXCI6IHt4OiAyMjQsIHk6IDQwOH0sXHJcblx0XCJUUkFOU1BPUlQgUk9PTVwiOiB7eDogMzcwLCB5OiAzNTh9LFxyXG5cdFwiTU9OSVRPUklORyBST09NXCI6IHt4OiA1MzUsIHk6IDM2MH0sXHJcblx0XCJCQVRIUk9PTVwiOiB7eDogODUsIHk6IDI0MH0sXHJcblx0XCJNQUxFIEJFRFJPT01cIjoge3g6IDg1LCB5OiAzMzB9LFxyXG5cdFwiRkVNIEJFRFJPT01cIjoge3g6IDg1LCB5OiAxNTB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5UGxheWVyKCkge1xyXG5cdHZhciBjdXJyTG9jYXRpb24gPSBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbik7XHJcblx0aWYgKCFpc1VuZGVmaW5lZChtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXSkpXHJcblx0XHRjb250ZXh0LmRyYXdJbWFnZShwbGF5ZXJJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlDYWxlYigpIHtcclxuXHR2YXIgY3VyckxvY2F0aW9uID0gQ2FsZWIuY3VycmVudExvY2F0aW9uO1xyXG5cdGNvbnRleHQuZHJhd0ltYWdlKGNhbGViSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5UXVpbm4oKSB7XHJcblx0dmFyIGN1cnJMb2NhdGlvbiA9IFF1aW5uLmN1cnJlbnRMb2NhdGlvbjtcclxuXHRjb250ZXh0LmRyYXdJbWFnZShxdWlubkltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheU1hcmsoKSB7XHJcblx0dmFyIGN1cnJMb2NhdGlvbiA9IE1hcmsuY3VycmVudExvY2F0aW9uO1xyXG5cdGNvbnRleHQuZHJhd0ltYWdlKG1hcmtJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLnksIDUwLCA1MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlFZGRpZSgpIHtcclxuXHR2YXIgY3VyckxvY2F0aW9uID0gRWRkaWUuY3VycmVudExvY2F0aW9uO1xyXG5cdGNvbnRleHQuZHJhd0ltYWdlKGVkZGllSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCA1MCwgNTApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QmVhdHJpY2UoKSB7XHJcblx0dmFyIGN1cnJMb2NhdGlvbiA9IEJlYXRyaWNlLmN1cnJlbnRMb2NhdGlvbjtcclxuXHRjb250ZXh0LmRyYXdJbWFnZShiZWF0cmljZUltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgNTAsIDUwKTtcclxufVxyXG5cclxuc3BhY2VzaGlwSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvc2hpcC5wbmdcIjtcclxucGxheWVySW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvVGF5bG9yMy5wbmdcIjtcclxuY2FsZWJJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9DYWxlYi5wbmdcIjtcclxucXVpbm5JbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9RdWlubi5wbmdcIjtcclxubWFya0ltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL01hcmsucG5nXCI7XHJcbmVkZGllSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvRWRkaWUucG5nXCI7XHJcbmJlYXRyaWNlSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvQmVhdHJpY2UucG5nXCI7XHJcblxyXG52YXIgY3VycmVudFNlbGVjdGlvbjtcclxudmFyIHlPZmZzZXQgPSBhY3Rpb25zUGFuZWwueSArIDI1O1xyXG52YXIgeU9mZnNldEluY3JlbWVudCA9IDI1O1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiB3cmFwVGV4dCh0ZXh0KSB7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJXcmFwIFRleHRcIik7XHJcbiAgICB2YXIgd2E9dGV4dC5zcGxpdChcIiBcIiksXHJcbiAgICAgICAgcGhyYXNlQXJyYXk9W10sXHJcbiAgICAgICAgbGFzdFBocmFzZT13YVswXSxcclxuICAgICAgICBtZWFzdXJlPTAsXHJcbiAgICAgICAgc3BsaXRDaGFyPVwiIFwiO1xyXG4gICAgaWYgKHdhLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHdhXHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaT0xO2k8d2EubGVuZ3RoO2krKykge1xyXG4gICAgICAgIHZhciB3PXdhW2ldO1xyXG4gICAgICAgIG1lYXN1cmU9Y29udGV4dC5tZWFzdXJlVGV4dChsYXN0UGhyYXNlK3NwbGl0Q2hhcit3KS53aWR0aDtcclxuICAgICAgICBpZiAobWVhc3VyZTwxMDAwKSB7XHJcbiAgICAgICAgICAgIGxhc3RQaHJhc2UrPShzcGxpdENoYXIrdyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGhyYXNlQXJyYXkucHVzaChsYXN0UGhyYXNlKTtcclxuICAgICAgICAgICAgbGFzdFBocmFzZT13O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaT09PXdhLmxlbmd0aC0xKSB7XHJcbiAgICAgICAgICAgIHBocmFzZUFycmF5LnB1c2gobGFzdFBocmFzZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBwaHJhc2VBcnJheTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheVRleHRBbmRBY3Rpb25zKCkge1xyXG5cdGNvbnRleHQuY2xlYXJSZWN0KHRleHRQYW5lbC54LCB0ZXh0UGFuZWwueSwgNTAwLCAxMDAwKTtcclxuXHRcclxuXHJcblx0Y29udGV4dC5mb250ID0gXCIxNXB0IENhbGlicmlcIjtcclxuXHRjb250ZXh0LmZpbGxTdHlsZSA9ICdwaW5rJztcclxuXHRjb25zb2xlLmxvZyhcIkFjdGlvbnMgZWZmZWN0IHRleHQ6IFwiICsgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0KTtcclxuXHR2YXIgdGV4dFRvRGlzcGxheSA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dC5sZW5ndGggIT0gMCA/IHdyYXBUZXh0KHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCkgOiB3cmFwVGV4dCh1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCk7XHJcblxyXG5cclxuXHQvLyBjb25zb2xlLmxvZyh0ZXh0VG9EaXNwbGF5KTtcclxuXHRhY3Rpb25zUGFuZWwueSA9IHRleHRUb0Rpc3BsYXkubGVuZ3RoKjI1K3RleHRQYW5lbC55KzIwO1xyXG5cdHlPZmZzZXQgPSBhY3Rpb25zUGFuZWwueSArIDI1O1xyXG5cclxuXHRmb3IodmFyIGk9MDsgaTx0ZXh0VG9EaXNwbGF5Lmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0Y29udGV4dC5maWxsVGV4dCh0ZXh0VG9EaXNwbGF5W2ldLCB0ZXh0UGFuZWwueCwgdGV4dFBhbmVsLnkrMjUqaSsyMCk7XHRcclxuXHR9XHJcblx0XHJcblxyXG5cdGNvbnRleHQuZm9udCA9IFwiMTVwdCBDYWxpYnJpXCI7XHJcblx0Y29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIHVzZXJBY3Rpb25UZXh0ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dFtpXTtcclxuXHRcdGNvbnRleHQuZmlsbFRleHQodXNlckFjdGlvblRleHQsIGFjdGlvbnNQYW5lbC54ICsgMjAsIHlPZmZzZXQpO1xyXG5cdFx0aWYgKGkgPT0gMCkge1xyXG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uID0gaTtcclxuXHRcdH1cclxuXHRcdHlPZmZzZXQgKz0geU9mZnNldEluY3JlbWVudDtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXlBcnJvdygpO1xyXG5cdGNvbnNvbGUubG9nKFwid2lyZXM6IFwiICsgZ2V0VmFyaWFibGUod2lyZXNDb2xsZWN0ZWQpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUFycm93KCkge1xyXG5cdGlmKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApe1xyXG5cdFx0Y29udGV4dC5jbGVhclJlY3QoYWN0aW9uc1BhbmVsLngsIGFjdGlvbnNQYW5lbC55LCAyMCwgMTAwMCk7XHJcblx0XHRjb250ZXh0LmZpbGxUZXh0KFwiPiBcIiwgNTIwLCBhY3Rpb25zUGFuZWwueSArIDI1ICsgKGN1cnJlbnRTZWxlY3Rpb24gKiB5T2Zmc2V0SW5jcmVtZW50KSk7XHJcblx0fVxyXG59XHJcblxyXG4vL1VzZXIgaW5wdXRcclxuZnVuY3Rpb24ga2V5UHJlc3MoZSkge1xyXG5cdGlmIChlLmtleUNvZGUgPT0gMTMpIHtcclxuXHRcdHZhciBzZWxlY3RlZEFjdGlvbiA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHRbY3VycmVudFNlbGVjdGlvbl07XHJcblx0XHRpZighaXNVbmRlZmluZWQoc2VsZWN0ZWRBY3Rpb24pKXtcclxuXHRcdFx0ZXhlY3V0ZVVzZXJBY3Rpb24oc2VsZWN0ZWRBY3Rpb24pO1xyXG5cdFx0XHR3b3JsZFRpY2soKTtcclxuXHRcdFx0cmVuZGVyKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBrZXlEb3duKGUpIHtcclxuXHRpZiAoZS5rZXlDb2RlID09IDQwKSB7Ly9kb3duXHJcblx0XHRpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRjdXJyZW50U2VsZWN0aW9uKys7XHJcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSBjdXJyZW50U2VsZWN0aW9uICUgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGg7XHJcblx0XHRcdGRpc3BsYXlBcnJvdygpO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IDM4KSB7Ly91cFxyXG5cdFx0aWYgKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0Y3VycmVudFNlbGVjdGlvbi0tO1xyXG5cdFx0XHRpZiAoY3VycmVudFNlbGVjdGlvbiA8IDApXHJcblx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoIC0gMTtcclxuXHRcdFx0ZGlzcGxheUFycm93KCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwga2V5UHJlc3MsIGZhbHNlKTtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93biwgZmFsc2UpOyIsImltcG9ydCBRdWV1ZSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9RdWV1ZVwiO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsXCI7XHJcblxyXG5pbnRlcmZhY2UgRGljdGlvbmFyeTxUPiB7IFtrZXk6IHN0cmluZ106IFQ7IH1cclxuXHJcbmV4cG9ydCBlbnVtIFN0YXR1cyB7XHJcbiAgICBSVU5OSU5HLFxyXG4gICAgU1VDQ0VTUyxcclxuICAgIEZBSUxVUkVcclxufVxyXG5cclxuZnVuY3Rpb24gdGVybWluYXRlQW5kUmV0dXJuKGlkOiBudW1iZXIsIGJsYWNrYm9hcmQ6IGFueSwgc3RhdHVzOiBTdGF0dXMpIHtcclxuICAgIGRlbGV0ZSBibGFja2JvYXJkW2lkXTtcclxuICAgIHJldHVybiBzdGF0dXM7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEVmZmVjdCA9ICgpID0+IHZvaWRcclxuZXhwb3J0IHR5cGUgUHJlY29uZGl0aW9uID0gKCkgPT4gYm9vbGVhblxyXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXHJcbmV4cG9ydCB0eXBlIEFjdGlvblRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgR3VhcmRUaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrLCBuZWdhdGU/OiBib29sZWFuKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBTZXF1ZW5jZS9TZWxlY3RvclxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXHJcblxyXG52YXIgYmxhY2tib2FyZCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0QWN0aW9uVGljayhpZDogbnVtYmVyKTogQWN0aW9uVGljayB7XHJcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkID0gMSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcmVjb25kaXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lID0gdGlja3NSZXF1aXJlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmxhY2tib2FyZFtpZF0udGlja3NEb25lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcclxuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBhc3RUaWNrLCBuZWdhdGUgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZWVkID8gZXhlY3V0ZShhc3RUaWNrKSA6IFN0YXR1cy5GQUlMVVJFO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcclxuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0b3JUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcclxuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLkZBSUxVUkUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGUoYXN0VGljazogVGljayk6IFN0YXR1cyB7XHJcbiAgICByZXR1cm4gYXN0VGljaygpO1xyXG59XHJcblxyXG52YXIgZ2xvYmFsSWRDb3VudGVyID0gMDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb24ocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0QWN0aW9uVGljayhnbG9iYWxJZENvdW50ZXIrKykocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2ssIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBzdWNjZXNzIG9mIGEgY2hpbGRcclxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcclxuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXHJcbiAqIEByZXR1cm5zIHtUaWNrfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRTZXF1ZW5jZVRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxyXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xyXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcclxuICogQHJldHVybnMge1RpY2t9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0b3IoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xyXG59XHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0gQVBJcyAtLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbi8vMC4gdXRpbGl0aWVzXHJcbi8vIG1pbiBhbmQgbWF4IGFyZSBpbmNsdXNpdmVcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmROdW1iZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcblxyXG4vLzEuIHN0b3J5IGluc3RhbmNlXHJcblxyXG4vLzEuMSBsb2NhdGlvbnNcclxuLy8gdmFyIGxvY2F0aW9uR3JhcGg6IERpY3Rpb25hcnk8TG9jYXRpb24+ID0ge307XHJcblxyXG52YXIgbG9jYXRpb25HcmFwaCA9IHt9O1xyXG5cclxuLy8gLy8gXHJcbi8vIGNsYXNzIExvY2F0aW9uIHtcclxuLy8gICAgIGFkamFjZW50TG9jYXRpb25zOiBEaWN0aW9uYXJ5PExvY2F0aW9uW10+O1xyXG5cclxuLy8gICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIGFkamFjZW50TG9jYXRpb25zOiBzdHJpbmdbXSkge1xyXG4vLyAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG4vLyAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnRMb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuLy8gICAgICAgICAgICAgaWYoYWRqYWNlbnRMb2NhdGlvbnNbaV0gaW4gbG9jYXRpb25HcmFwaCl7XHJcblxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGVsc2V7XHJcbi8vICAgICAgICAgICAgICAgICB2YXIgbmV3X2xvY2F0aW9uID0gbmV3IExvY2F0aW9uKClcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcblxyXG4vL2FkZCB0byBib3RoIHNpZGVzXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMb2NhdGlvbihsb2NhdGlvbk5hbWU6IHN0cmluZywgYWRqYWNlbnRMb2NhdGlvbnM6IHN0cmluZ1tdKSB7XHJcbiAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID09IHVuZGVmaW5lZClcclxuICAgICAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBbXTtcclxuICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXS5jb25jYXQoYWRqYWNlbnRMb2NhdGlvbnMpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnRMb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9IFtdO1xyXG5cclxuICAgICAgICBsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXS5wdXNoKGxvY2F0aW9uTmFtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcmVBZGphY2VudChsb2NhdGlvbjE6IHN0cmluZywgbG9jYXRpb24yOiBzdHJpbmcpOmJvb2xlYW4ge1xyXG4gICAgY29uc29sZS5sb2coXCJBcmUgYWRqYWNlbnQ6IFwiICsgbG9jYXRpb24xICsgXCIsIFwiK2xvY2F0aW9uMik7XHJcbiAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdID09IHVuZGVmaW5lZCB8fCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMl0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVpdGhlciBvbmUvYm90aCBsb2NhdGlvbnMgdW5kZWZpbmVkXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV1baV0gPT0gbG9jYXRpb24yKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG4vL3BhdGhmaW5kaW5nIHByaW1pdGl2ZXNcclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRMb2NhdGlvbihzdGFydDogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHZhciB2aXNpdGVkID0ge307XHJcbiAgICB2YXIgcHJldmlvdXMgPSB7fTtcclxuICAgIGZvciAodmFyIGtleSBpbiBsb2NhdGlvbkdyYXBoKSB7XHJcbiAgICAgICAgdmlzaXRlZFtrZXldID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2aXNpdGVkW3N0YXJ0XSA9IHRydWU7XHJcblxyXG4gICAgdmFyIG15UXVldWUgPSBuZXcgUXVldWU8c3RyaW5nPigpO1xyXG4gICAgbXlRdWV1ZS5lbnF1ZXVlKHN0YXJ0KTtcclxuXHJcbiAgICB3aGlsZSAoIW15UXVldWUuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IG15UXVldWUuZGVxdWV1ZSgpO1xyXG4gICAgICAgIGlmIChjdXJyZW50ID09PSBkZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IGxvY2F0aW9uR3JhcGhbY3VycmVudF07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdmlzaXRlZFtuZWlnaGJvcnNbaV1dKSB7XHJcbiAgICAgICAgICAgICAgICBteVF1ZXVlLmVucXVldWUobmVpZ2hib3JzW2ldKTtcclxuICAgICAgICAgICAgICAgIHZpc2l0ZWRbbmVpZ2hib3JzW2ldXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1tuZWlnaGJvcnNbaV1dID0gY3VycmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgY3VycmVudDogc3RyaW5nID0gZGVzdGluYXRpb247XHJcbiAgICBpZiAoY3VycmVudCA9PSBzdGFydClcclxuICAgICAgICByZXR1cm4gY3VycmVudDtcclxuICAgIHdoaWxlIChwcmV2aW91c1tjdXJyZW50XSAhPSBzdGFydCkge1xyXG4gICAgICAgIGN1cnJlbnQgPSBwcmV2aW91c1tjdXJyZW50XTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudDtcclxufVxyXG5cclxuLy8xLjIgYWdlbnRzXHJcblxyXG5leHBvcnQgY2xhc3MgQWdlbnQge1xyXG4gICAgY3VycmVudExvY2F0aW9uOiBzdHJpbmc7XHJcbiAgICBkZXN0aW5hdGlvbjogc3RyaW5nO1xyXG4gICAgbGFzdFNlZW5JdGVtOiB7W2l0ZW1OYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XHJcbiAgICBsYXN0U2VlblBlcnNvbjoge1tpdGVtTmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xyXG4gICAgcmFuZE51bWJlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiIGNvbnN0cnVjdG9yXCIpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VycmVudExvY2F0aW9uKGN1cnJlbnRsb2NhdGlvbjogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGN1cnJlbnRsb2NhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMYXN0U2F3SXRlbUF0TG9jYXRpb24oaXRlbTogSXRlbSwgYXRMb2NhdGlvbjogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdID0gYXRMb2NhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMYXN0U2F3UGVyc29uQXRMb2NhdGlvbihhZ2VudE5hbWU6IHN0cmluZywgYXRMb2NhdGlvbjogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmxhc3RTZWVuUGVyc29uW2FnZW50TmFtZV0gPSBhdExvY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERlc3RpbmF0aW9uKGRlc3RpbmF0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBoYXNTZWVuSXRlbShpdGVtOiBJdGVtKXtcclxuICAgICAgICBpZihpdGVtLm5hbWUgaW4gdGhpcy5sYXN0U2Vlbkl0ZW0pe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcIjogc2F3IGl0ZW06XCIraXRlbS5uYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vdGhpcy5sYXN0U2Vlbkl0ZW1baXRlbS5uYW1lXVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdoZXJlSXNJdGVtKGl0ZW06IEl0ZW0pe1xyXG4gICAgICAgIGlmKGl0ZW0ubmFtZSBpbiB0aGlzLmxhc3RTZWVuSXRlbSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArIFwiOiBzYXcgaXRlbTpcIitpdGVtLm5hbWUgKyBcIiBhdCBsb2NhdGlvbjpcIit0aGlzLmxhc3RTZWVuSXRlbVtpdGVtLm5hbWVdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdFNlZW5JdGVtW2l0ZW0ubmFtZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbnZhciBhZ2VudHM6IEFycmF5PEFnZW50PiA9IG5ldyBBcnJheTxBZ2VudD4oKTtcclxuLy8gdmFyIGFnZW50cyA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFnZW50KGFnZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFkZGluZzogXCIrYWdlbnROYW1lKTtcclxuICAgIHZhciBhZ2VudCA9IG5ldyBBZ2VudChhZ2VudE5hbWUpO1xyXG4gICAgY29uc29sZS5sb2coYWdlbnQpO1xyXG4gICAgYWdlbnRzLnB1c2goYWdlbnQpO1xyXG4gICAgcmV0dXJuIGFnZW50O1xyXG59XHJcblxyXG4vLzEuMyBpdGVtc1xyXG5cclxuLy8gVG9kb1xyXG5jbGFzcyBJdGVtIHtcclxuICAgIGN1cnJlbnRMb2NhdGlvbjogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1cnJlbnRMb2NhdGlvbihjdXJyZW50bG9jYXRpb246IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjdXJyZW50bG9jYXRpb247XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBpdGVtczogQXJyYXk8SXRlbT4gPSBuZXcgQXJyYXk8SXRlbT4oKTtcclxuLy8gdmFyIGl0ZW1zID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShpdGVtTmFtZTogc3RyaW5nKSB7XHJcbiAgICB2YXIgaXRlbSA9IG5ldyBJdGVtKGl0ZW1OYW1lKTtcclxuICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufVxyXG5cclxuLy8xLjQgdmFyaWFibGVzXHJcbnZhciB2YXJpYWJsZXMgPSB7fTtcclxudmFyIGFnZW50VmFyaWFibGVzID0ge307XHJcbnZhciBpdGVtVmFyaWFibGVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICB2YXJpYWJsZXNbdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YXJOYW1lO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pKVxyXG4gICAgICAgIGFnZW50VmFyaWFibGVzW2FnZW50XSA9IHt9O1xyXG5cclxuICAgIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgIGlmIChpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBub3Qgc2V0IVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFyaWFibGVzW3Zhck5hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBhZ2VudCBcIiArIGFnZW50ICsgXCIgbm90IHNldCFcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWYXJpYWJsZU5vdFNldCh2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNBZ2VudFZhcmlhYmxlTm90U2V0KGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKTtcclxufVxyXG5cclxuLy8gdG9kb1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbVZhcmlhYmxlKGl0ZW06IEl0ZW0sIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbS5uYW1lXSkpXHJcbiAgICAgICAgaXRlbVZhcmlhYmxlc1tpdGVtLm5hbWVdID0ge307XHJcblxyXG4gICAgaXRlbVZhcmlhYmxlc1tpdGVtLm5hbWVdW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSB8fCBpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGl0ZW0gXCIgKyBpdGVtICsgXCIgbm90IHNldCFcIilcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXTtcclxufVxyXG5cclxuXHJcbi8vMlxyXG4vL2FnZW50LWJlaGF2aW9yIHRyZWUgbWFwcGluZ1xyXG5cclxudmFyIGFnZW50VHJlZXM6IHtbYWdlbnROYW1lOiBzdHJpbmddIDogVGlja30gPSB7fTtcclxuLy8gdmFyIGFnZW50VHJlZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hUcmVlVG9BZ2VudChhZ2VudDogQWdlbnQsIHRyZWU6IFRpY2spIHtcclxuICAgIGFnZW50VHJlZXNbYWdlbnQubmFtZV0gPSB0cmVlO1xyXG59XHJcblxyXG4vLzMuMVxyXG4vL3VzZXIgYWN0aW9uc1xyXG4vL1RPRE8gYWRkIHZhcmlhYmxlcyB0byB1c2VyIGFjdGlvbiB0ZXh0c1xyXG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0ge1xyXG4gICAgdGV4dDogXCJcIixcclxuICAgIHVzZXJBY3Rpb25zVGV4dDogW10sXHJcbiAgICBhY3Rpb25FZmZlY3RzVGV4dDogXCJcIlxyXG59XHJcbnZhciB1c2VySW50ZXJhY3Rpb25UcmVlcyA9IFtdO1xyXG52YXIgdXNlckFjdGlvbnMgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCkge1xyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgPSBcIlwiO1xyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dCA9IFtdO1xyXG4gICAgdXNlckFjdGlvbnMgPSB7fTsvL3tcIkdvIHRvIGxvY2F0aW9uIFhcIiA6IGVmZmVjdFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25UcmVlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGV4ZWN1dGUodXNlckludGVyYWN0aW9uVHJlZXNbaV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcpID0+XHJcbiAgICBhY3Rpb24oXHJcbiAgICAgICAgKCkgPT4gdHJ1ZSxcclxuICAgICAgICAoKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCArPSBcIlxcblwiICsgdGV4dCxcclxuICAgICAgICAwXHJcbiAgICApO1xyXG5leHBvcnQgbGV0IGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0ID0gKHRleHQ6IHN0cmluZykgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ICs9IFwiXFxuXCIgKyB0ZXh0O1xyXG5cclxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uVHJlZSA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdFRyZWU6IFRpY2spID0+IGFjdGlvbihcclxuICAgICgpID0+IHRydWUsXHJcbiAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGVmZmVjdFRyZWUpLCAwXHJcbik7XHJcblxyXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb24gPSAodGV4dDogc3RyaW5nLCBlZmZlY3Q6ICgpID0+IGFueSkgPT5cclxuICAgIGFjdGlvbihcclxuICAgICAgICAoKSA9PiB0cnVlLFxyXG4gICAgICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgYWN0aW9uKCgpPT50cnVlLCBlZmZlY3QsIDApKSwgMFxyXG4gICAgKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyAgICAgcmV0dXJuIFxyXG4vLyB9XHJcblxyXG5cclxuZnVuY3Rpb24gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcclxuICAgIHVzZXJBY3Rpb25zW3RleHRdID0gdHJlZTtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQucHVzaCh0ZXh0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGljazogVGljaykge1xyXG4gICAgdXNlckludGVyYWN0aW9uVHJlZXMucHVzaCh0aWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVVc2VyQWN0aW9uKHRleHQ6IHN0cmluZykge1xyXG4gICAgLy9leGVjdXRlIHRoZSB1c2VyIGFjdGlvblxyXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ID0gXCJcIjtcclxuICAgIHZhciB1c2VyQWN0aW9uRWZmZWN0VHJlZSA9IHVzZXJBY3Rpb25zW3RleHRdO1xyXG4gICAgZXhlY3V0ZSh1c2VyQWN0aW9uRWZmZWN0VHJlZSk7XHJcbn1cclxuXHJcbi8vNC5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCkge1xyXG4gICAgcmV0dXJuIHVzZXJJbnRlcmFjdGlvbk9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdvcmxkVGljaygpIHtcclxuICAgIC8vYWxsIGFnZW50IHRpY2tzXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0cmVlID0gYWdlbnRUcmVlc1thZ2VudHNbaV0ubmFtZV07XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0cmVlKSkge1xyXG4gICAgICAgICAgICBzZXRWYXJpYWJsZShcImV4ZWN1dGluZ0FnZW50XCIsIGFnZW50c1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgZXhlY3V0ZSh0cmVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==
