$(function() {

    getAllValidNumbers();

    function getAllValidNumbers() {
        var storageNumbers = localStorage.getItem("AFTLuckyNumbers2017");
        storageNumbers = $.parseJSON(storageNumbers);
        console.log("getAllValidNumbers : ");
        console.log(storageNumbers);
        initSlots(storageNumbers);
    }

    var spinnerAudioEl = "spinner-audio";
    var winAudioEl = "win-audio";
    var $lottoBtn = $("#lotto-btn");
    var $confetti = $("#confetti");

    function initSlots(validNumbers) {
        $(".slot").jSlots({
            spinner: "#lotto-btn",
            candidateNumbers: validNumbers,
            onStart: function() {
                $lottoBtn.attr("disabled", true);
                $(".slot").find("li").removeClass("winner");
                audio.play(spinnerAudioEl);
            },
            onEnd: function(finalNumbers) {
                console.log("on End");
                console.log(finalNumbers);
                var effectDelay = window.finalSpeed;
                setTimeout(function() {
	                audio.pause(spinnerAudioEl);
                    audio.play(winAudioEl);
                    $confetti.fadeIn("slow");
                }, effectDelay);
                setTimeout(function() {
	                audio.end(spinnerAudioEl);
                    $lottoBtn.attr("disabled", false);
                    $confetti.fadeOut("slow");
                }, effectDelay + 8000);
            }
        });
    }

});