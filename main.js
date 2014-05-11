// click the gallerie button after x seconds
var secondsToWaitGallerie = 5;


// preload images 
// if hovering over image it loads another image
var standardWaitBeforeLoadTimeInMS = 1000;
preloadImage(2, standardWaitBeforeLoadTimeInMS, 0);

autoClickViewEntireAlbum();


/*
chrome.storage.sync.set({
    'value': "test"
}, function() {
    // Notify that we saved.
    alert('Settings saved');
});*/

chrome.storage.sync.get("value", function(obj) {
    console.log(obj);
});
/*
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});
*/

var oldTitle = "";
$('#image-title').bind("DOMSubtreeModified", function() {
    if ($(this).html() !== oldTitle) {
        autoClickViewEntireAlbum();
        counter = -1;
        preloadImage(2, standardWaitBeforeLoadTimeInMS);
        oldTitle = $(this).html();
    }
});

function autoClickViewEntireAlbum() {
    var scriptNode = document.createElement('script');
    scriptNode.textContent = autoClickGallery + '\nautoClickGallery(5);';
    document.body.appendChild(scriptNode);
}


var index = 0;
var counter = -1;

function autoClickGallery(seconds) {
    setTimeout(function() {
        $("a#album-truncated").click();
        $("a:contains('View the entire album, 12 images total (2 remaining).')").click();
    }, seconds * 1000);
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