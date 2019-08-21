//menuNormalize
//= source/normalizeMenu.js
//= timeline.js
//menuNormalize

normalizeMenu();
window.onload = function() {
    //normalizeMenu();

    if (document.getElementById('process')) {
        startCircle.start();
        var steps = initSteps();
        $('#process').click(function(e) {
            if (e.metaKey) {
                steps.forEach(function(step) {
                    step.start();
                });
            }
        });
    }

    var divs = document.querySelectorAll('.video-js');


    for (i = 0; i < divs.length; ++i) {
        video = videojs(divs[i]);

        video.on('pause', function() {
            this.bigPlayButton.el().style.display = 'block';
        });

        video.on('play', function() {
            this.bigPlayButton.el().style.display = 'none';
        });
    }
    if (document.querySelector('#timeline-vertical') ){
        if(!window.IntersectionObserver) {
            //polyfill
            Array.from(document.querySelector('#timeline').getElementsByClassName("timeline-item")).forEach((item) =>{
                item.classList.add("displayed");
            });
        }
        else{
            
            new Timeline('#timeline-vertical');
        }
    }
};