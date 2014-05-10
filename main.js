// click the gallerie button after x seconds
var secondsToWaitGallerie = 5;


// preload 3 images 
// if hovering over image it loads another image
var standardWaitBeforeLoadTimeInMS = 1000;
preloadImage(3, standardWaitBeforeLoadTimeInMS, 0);







var oldTitle = "";
$('#image-title').bind("DOMSubtreeModified", function() {
    if ($(this).html() !== oldTitle) {
        autoClickGallery();
        counter = -1;
        preloadImage(2, standardWaitBeforeLoadTimeInMS);
        oldTitle = $(this).html();
    }
});


var index = 0;
var counter = -1;
autoClickGallery();


function autoClickGallery() {
    setTimeout(function() {
        $("#album-truncated a").click();
    }, secondsToWaitGallerie * 1000);
}

function preloadImage(howMany, delay, from) {
    if (from === undefined) {
        from = counter + 1;
        index = 0;
    }

    setTimeout(function() {
        $("a.image-link").each(function(i) {

            var current = $(this);
            var dataLevel = current.parent().parent().parent().parent().attr("data-level");
            if (dataLevel === "0") {
                if (index >= from && index < from + howMany) {
                    var link = current.attr("href");

                    current.on("mouseenter", function() {
                        eval("preloadImage(1, 1)");
                    });


                    current.css("color", "#F1B400");
                    var tmpHTML = current.html();
                    current.html(tmpHTML + '<img height="10px" src="http://s.imgur.com/images/caption-reply-loader.gif">');
                    var img = new Image();
                    img.onload = function() {
                        current.css("color", "#85BF25");
                        current.html(tmpHTML);
                    }
                    img.src = link;
                    counter++;
                }
                index++;
            }
        });
    }, delay);
}

function cons(msg) {
    console.log(msg);
}