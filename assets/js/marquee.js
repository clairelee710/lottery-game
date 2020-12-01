$(function() {
    $(document).keyup(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            return;
        }

        var sentence = "AFT YEAR END PARTY 2018 (^_^)";

        if (keycode == '49') {
            //No.1  Super Prize Macbook Pro 15' 256G * 1 
            sentence = "Macbook Pro 15' 256G";
        }

        if (keycode == '50') {
            //No.2  1st Prize Macbook Pro 13' 512G * 1
            sentence = "Macbook Pro 13' 512G";
        }

        if (keycode == '51') {
            //No.3  2nd Prize iPhone X 256G * 2
            sentence = "iPhone X 256G";
        }

        if (keycode == '52') {
            //No.4  3rd Prize iPhone X 64G * 2
            sentence = "iPhone X 64G";
        }

        if (keycode == '53') {
            //No.5  4th Prize iPad Pro 10.5' + Apple Pencil * 3
            sentence = "iPad Pro 10.5' + Apple Pencil";
        }

        if (keycode == '54') {
            //No.6  5th Prize iPad 128G * 4
            sentence = "iPad 128G";
        }
        var marquee = 
        	'<marquee direction="left" speed="normal" behavior="loop" class="marquee" id="marquee-top">' +
                '<span>' + sentence + '</span>'
                '<span>' + sentence + '</span>'
                '<span>' + sentence + '</span>'
            '</marquee>';

        $(".marquee-container").html(marquee);
    });
})