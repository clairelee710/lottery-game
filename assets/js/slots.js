(function($) {

    $.jSlots = function(el, options) {

        var base = this;
        base.$el = $(el);
        base.el = el;

        base.$el.data("jSlots", base);

        base.init = function() {

            base.options = $.extend({}, $.jSlots.defaultOptions, options);

            base.setup();
            base.bindEvents();

        };

        // --------------------------------------------------------------------- //
        // DEFAULT OPTIONS
        // --------------------------------------------------------------------- //

        $.jSlots.defaultOptions = {
            number: 3, // Number: number of slots
            winnerNumber: 1, // Number or Array: list item number(s) upon which to trigger a win, 1-based index, NOT ZERO-BASED
            spinner: '', // CSS Selector: element to bind the start event to
            spinEvent: 'click', // String: event to start slots on this event
            onStart: $.noop, // Function: runs on spin start,
            onEnd: $.noop, // Function: run on spin end. It is passed (finalNumbers:Array). finalNumbers gives the index of the li each slot stopped on in order.
            onWin: $.noop, // Function: run on winning number. It is passed (winCount:Number, winners:Array)
            easing: 'swing', // String: easing type for final spin
            time: 15000, // Number: total time of spin animation
            loops: 10, // Number: times it will spin during the animation
            candidateNumbers: [] // *ADDED* Array: list an array matching the number of slots. Pass empty array for random results.
        };

        // --------------------------------------------------------------------- //
        // HELPERS
        // --------------------------------------------------------------------- //

        base.randomRange = function(low, high) {
            return Math.floor(Math.random() * (1 + high - low)) + low;
        };

        // --------------------------------------------------------------------- //
        // VARS
        // --------------------------------------------------------------------- //

        base.isSpinning = false;
        base.spinSpeed = 0;
        base.winCount = 0;
        base.doneCount = 0;

        base.$liHeight = 0;
        base.$liWidth = 0;

        base.winners = [];
        base.allSlots = [];
        base.luckyNumber = "";

        // --------------------------------------------------------------------- //
        // FUNCTIONS
        // --------------------------------------------------------------------- //


        base.setup = function() {

            // set sizes

            var $list = base.$el;
            var $li = $list.find('li').first();

            base.$liHeight = $li.outerHeight();
            base.$liWidth = $li.outerWidth();

            base.liCount = base.$el.children().length;

            base.listHeight = base.$liHeight * base.liCount;

            base.increment = (base.options.time / base.options.loops) / base.options.loops;

            $list.css('position', 'relative');

            $li.clone().appendTo($list);

            base.$wrapper = $list.wrap('<div class="jSlots-wrapper"></div>').parent();

            // remove original, so it can be recreated as a Slot
            base.$el.remove();

            // clone lists
            for (var i = base.options.number - 1; i >= 0; i--) {
                base.allSlots.push(new base.Slot());
            }

        };

        base.bindEvents = function() {
            $(base.options.spinner).bind(base.options.spinEvent, function(event) {
                if (!base.isSpinning) {
                    base.playSlots();
                }
            });
            $(document).keypress(function(e) {
                var keycode = (e.keyCode ? e.keyCode : e.which);
                if (keycode == '13') {
                    if (!base.isSpinning) {
                        base.playSlots();
                    }
                }
            });
        };

        // Slot contstructor
        base.Slot = function() {

            this.spinSpeed = 0;
            this.el = base.$el.clone().appendTo(base.$wrapper)[0];
            this.$el = $(this.el);
            this.loopCount = 0;
            this.number = 0;

        };

        base.Slot.prototype = {

            // do one rotation
            spinElement: function() {

                var that = this;
                that.$el.css('top', -base.listHeight)
                    .animate({ 'top': '0px' }, that.spinSpeed, 'linear', function() {
                        that.lowerSpeed();
                    });

            },

            lowerSpeed: function() {

                this.spinSpeed += base.increment;
                this.loopCount++;

                if (this.loopCount < base.options.loops) {

                    this.spinElement();

                } else {

                    this.finalLoopRotation();

                }

            },

            getLuckyNumber: function() {
                var endNum;
                if (base.options.candidateNumbers.length > 0 && !base.luckyNumber) {
                    var max = base.options.candidateNumbers.length - 1;
                    var randomIndex = base.randomRange(0, max);
                    var number = base.options.candidateNumbers[randomIndex].number;
                    var numberArray = ("" + number).split("");
                    base.luckyNumber = number;
                    endNum = numberArray[base.allSlots.indexOf(this)];
                    base.options.candidateNumbers.splice(randomIndex, 1);
                    localStorage.setItem("AFTLuckyNumbers2017", JSON.stringify(base.options.candidateNumbers));
                } else {
                    var numberArray = ("" + base.luckyNumber).split("");
                    endNum = numberArray[base.allSlots.indexOf(this)];
                    if (base.allSlots.indexOf(this) == 2) {
                        if ($.isFunction(base.options.onEnd)) {
                            base.options.onEnd(base.luckyNumber);
                        }
                        setTimeout(function() {
                            base.isSpinning = false;
                            base.luckyNumber = null;
                        }, 6000);
                    }
                }

                return endNum;
            },

            finalLoopRotation: function() {

                var that = this;
                var currentNumber = this.getLuckyNumber();
                var finalPos = -((base.$liHeight * currentNumber));
                var finalSpeed = ((this.spinSpeed * 0.5) * (base.liCount)) / currentNumber;
                window.finalSpeed = finalSpeed == Infinity ? 500 : finalSpeed;
                that.$el.css('top', -base.listHeight)
                    .animate({ 'top': finalPos }, finalSpeed, base.options.easing);
            }
        };
        base.playSlots = function() {

            base.isSpinning = true;
            base.winCount = 0;
            base.doneCount = 0;
            base.winners = [];

            if ($.isFunction(base.options.onStart)) {
                base.options.onStart();
            }

            $.each(base.allSlots, function(index, val) {
                this.spinSpeed = 0;
                this.loopCount = 0;
                this.spinElement();
            });

        };

        base.init();
    };


    // --------------------------------------------------------------------- //
    // JQUERY FN
    // --------------------------------------------------------------------- //

    $.fn.jSlots = function(options) {
        if (this.length) {
            return this.each(function() {
                (new $.jSlots(this, options));
            });
        }
    };

})(jQuery);