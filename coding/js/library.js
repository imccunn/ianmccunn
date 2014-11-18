/**  A library object. Library contains shelves, and shelves 
 *  contain books whereby books have various properties and can 
 *  be shelved and unshelved.
 *  
 *  By Ian. McCunn, @ianmccunn
 */

var lib = (function () {
    'use strict';

    var LIB_BOOK_CAP = 100,
        LIB_SHELF_CAP = 20,
        LIB_BOOK_PER_SHELF_CAP = 20;

    /**
     *     Library object contains shelves and books. The books property of library always contains all 
     *     books but those books can be shelved or not. Optionally, you can set a shelf and book capacity otherwise
     *     those values will default to the above constants.
     *
     *     Define a new Library: var lib1 = new lib.Library();
     *  
     * @param {integer} numShelves [number of shelves within the Library]
     * @param {integer} numBooks   [number of books within the library]
     */
    function Library(numShelves, numBooks) {
        this.shelves = []; // shelf objects in library
        this.books = []; // book objects in library
        this.libShelfCap = numShelves | LIB_SHELF_CAP; // max number of shelves in library
        this.libBookCap = numBooks | LIB_BOOK_CAP; // max number of books in library
        this.initAll();
    }

    Library.prototype = {
        constructor: Library,

        // Pushes book objects into library books array and initializes them
        initBooks: function () {
            for (var i = 0; i < this.libBookCap; i++) {
                this.books[i] = new Book();
                this.books[i].init();
            }
        },

        // Pushes shelf objects into library shelves array and initializes them
        initShelves: function () {
            for (var i = 0; i < this.libShelfCap; i++) {
                this.shelves[i] = new Shelf();
                this.shelves[i].id = 100 + i;
            }
        },
        initAll: function () {
            this.initBooks();
            this.initShelves();
        },

        /**
         *     Pushes all book objects of library into the shelve objects via enshelf()
         *     
         * @return {none} 
         */
        shelveAllBooks: function () {
            var j = 0;
            for (var i = 0; i < this.books.length; i++) {
                var shelfp = this.shelves[j];
                this.books[i].enshelf(shelfp);
                if (j < this.shelves.length - 1) {
                    if (i % 20 === 0) j++;
                }
            }
        },

        /**
         *     Returns an array of just the strings of book titles from each book object (book.title)
         *     
         * @return {array} of strings
         */
        getAllBookTitles: function () {
            var allBookTitles = [];
            for (var i = 0; i < this.books.length; i++) {
                allBookTitles.push(this.books[i].title);
            }
            return allBookTitles;
        },
        getAllBookBound: function () {
            var bound = [];
            for (var i = 0; i < this.books.length; i++) {
                bound.push(this.books[i].bound);
            }
            return bound;
        },
        getAllBookYears: function () {
            var years = [];
            for (var i = 0; i < this.books.length; i++) {
                years.push(this.books[i].publish_date);
            }
            return years;
        }
    };

    /**
     *     Shelf Object. 
     *     
     *     Each shelf has an id, capacity, and an array which holds the book objects.
     */
    function Shelf() {
        this.id = 0;
        this.capacity = LIB_BOOK_PER_SHELF_CAP;
        this.books = [];
        //this.dimensions = {w: 1, l: 1, h: 1}; //in
    }

    Shelf.prototype = {
        constructor: Shelf
    };

    /**
     *     Book Object
     *
     *     Each book has a number of standard properties for any particular book. 
     *     For this exercise the are non-essential but the title, publish date, and number of pages
     *     are generated procedurally.
     */
    function Book() {
        this.id = 0;
        this.title = 'none';
        this.bound = 'paperback'; // paperback or hardcover
        this.author = 'anonymous';
        this.publish_date = 0;
        this.num_pages = 0;
        this.book_language = 'none'; // english or otherwise
        this.shelf_id = -1;
    }

    Book.prototype = {
        constructor: Book,
        init: function (targetShelf) {
            this.id = this.genRandomId();
            this.title = this.genRandomTitle();
            this.bound = this.genRandBound();
            this.author = 'Anonymous';
            this.publish_date = this.genRandYear();
            this.num_pages = Math.floor(Math.random() * 2000 + 500);
            this.book_language = 'en';
            this.shelf_id = -1;
        },
        genRandomId: function () {
            return Math.floor(Math.random() * 100000);
        },
        get: function () {
            return this;
        },

        /**
         *     Pushes the book object into the passed library shelf container
         *     
         * @param  {obj} shelf [library shelf object]
         * @return {none} 
         */
        enshelf: function (shelf) {
            this.shelf_id = shelf.id;
            shelf.books.push(this);
        },

        /**
         *      Removes this book from the passed library, shelf object.
         *      Broadly, if the book is not on the passed shelf object, an error is thrown.
         *     
         * @param  {obj} shelf [library shelf object]
         * @return {none}
         */
        unshelf: function (shelf) {
            if (this.shelf_id === -1) {
                return "Book is not shelved.";
            } else {
                // make sure book is on passed 'shelf'
                if (shelf.id === this.shelf_id) {
                    // the book is on the shelf
                    // find index of book on said shelf
                    for (var i = 0; i < shelf.books.length; i++) {
                        if (this.id === shelf.books[i].id) {
                            // remove the book from the shelf
                            shelf.books.splice(i, 1);
                            // reset id of book to indicate unshelved
                            this.shelf_id = -1;
                        }
                    }
                } else {
                    throw ("This book is not on the passed shelf.");
                }
            }
        },

        /**
         *      Generate a pseudo-random title for the book.
         *      
         * @return {string} [the contsructed string which is the resulting title]
         */
        genRandomTitle: function () {

            var rTitle = ''; // book title string that will be returned

            var noun = [
                'Sun', 'Pulsar', 'Quasar', 'Mars',
                'Venus', 'Sol', 'Shift', 'Rift', 'Vega', 'Anteres', 'War',
                'Star', 'Warp', 'Archon', 'Hyperspace', 'Colonists', 'Colony', 'Stories',
                'Terra', 'Terraformation', 'Doctrine', 'Structure', 'Code', 'Subversion',
                'Progeny', 'Hallucination', 'Prison', 'Outpost', 'Data Structure',
                'Art', 'Music', 'Construction', 'Construct', 'Fracture', 'Data', 'Cybernetics',
                'Machine', 'Planet', 'Symmetry', 'Technology', 'Undefined', 'Void'];

            // index of random noun
            var rNounI = function () {
                return Math.floor(Math.random() * noun.length);
            };

            var adjective = [
                'Primordial', 'Black', 'Blue', 'Red', 'Venerated',
                'Ancient', 'Glinting', 'Terraformed', 'White', 'Arcadian', 'Zealous',
                'Stolen', 'Only', 'First', 'Final', 'Forgotten', 'Broken', 'Absent',
                'Silent', 'Fallen', 'Volatile', 'Transparent', 'Fragile', 'Molecular',
                'Bio', 'Organic', 'Biological', 'Ethereal', 'Vagrant', 'Transient', 'Structured',
                'Cyber', 'Wandering', 'Ulterior', 'Rebuilt', 'Fractured', 'Structured', 'Derelict',
                'Coded', 'Written', 'Null', 'Cerulean', 'Cosmic'];

            // index of a random adjective
            var rAdjI = function () {
                return Math.floor(Math.random() * adjective.length);
            };

            var rRomanNumeral = function () {
                var p = 5;
                var romanNum;
                var rnum = Math.floor(Math.random() * (p - 1) + 2);

                switch (rnum) {
                    case 2:
                        romanNum = 'II';
                        break;
                    case 3:
                        romanNum = 'III';
                        break;
                    case 4:
                        romanNum = 'IV';
                        break;
                    case 5:
                        romanNum = 'V';
                        break;
                    default:
                        romanNum = -1;
                        break;
                }
                return romanNum;

            };

            var titleTypeSelect = Math.floor(Math.random() * 7 + 1);

            // Here we create a title by choosing random indices of the noun and adj array literals and 
            // concatenating them in different, mostly, sensical ways.
            switch (titleTypeSelect) {
                case 1:
                    rTitle = adjective[rAdjI()] + ' ' + noun[rNounI()];
                    break;
                case 2:
                    rTitle = noun[rNounI()] + ' ' + noun[rNounI()];
                    break;
                case 3:
                    rTitle = 'The ' + adjective[rAdjI()] + ' ' + noun[rNounI()];
                    break;
                case 4:
                    rTitle = adjective[rAdjI()] + ' ' + noun[rNounI()] + ' ' + rRomanNumeral();
                    break;
                case 5:
                    rTitle = noun[rNounI()] + ' of the ' + adjective[rAdjI()];
                    break;
                case 6:
                    rTitle = 'The ' + noun[rNounI()] + ' of the ' + adjective[rAdjI()];
                    break;
                case 7:
                    rTitle = noun[rNounI()] + ' of the ' + adjective[rAdjI()] + ' ' + rRomanNumeral();
                    break;
                case 8:
                    rTitle = noun[rNounI()] + ' ' + noun[rNounI()] + ' ' + rRomanNumeral();
                    break;
                case 9:
                    rTitle = 'The ' + adjective[rAdjI()] + ' ' + noun[rNounI()] + ' ' + rRomanNumeral();
                    break;
                default:
                    rTitle = 'Untitled';
                    break;
            }

            return rTitle;
        },

        genRandBound: function () {
            var s = Math.floor(Math.random() * 2 + 1);
            var r;
            switch (s) {
                case 1:
                    r = 'Hardcover';
                    break;
                case 2:
                    r = 'Paperback';
                    break;
            }
            return r;
        },
        genRandYear: function () {
            return Math.floor(Math.random() * (4000 - 2050) + 2050);
        }
    };

    // Outputs an unordered list of all book titles
    function toDOM(lib) {
        var allBookTitles = lib.getAllBookTitles();
        var outDiv = document.createElement('div');
        outDiv.id = 'output';
        outDiv.innerHTML = '<ul>';
        for (var i = 0; i < allBookTitles.length; i++) {
            outDiv.innerHTML += '<li>' + allBookTitles[i] + '</li>';
        }
        outDiv.innerHTML += '</ul>';
        document.body.appendChild(outDiv);
    }

    return {
        Library: Library,
        Shelf: Shelf,
        Book: Book,
        toDOM: toDOM
    };

})();