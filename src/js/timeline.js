'use strict';
class Timeline {
    constructor(selector) {
        this.el = document.querySelector(selector);
        this.items =this.el.getElementsByClassName("timeline-item");
        this.init();
    }

    init(){
        if(!'IntersectionObserver' in window &&
        !'IntersectionObserverEntry' in window &&
        !'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
            //polyfill
            Array.from(this.items).forEach((item) =>{
                item.classList.add("displayed");
            });
        }
        else{
            Array.from(this.items).forEach((item) =>{
                this.createObserver(item);
            });
        }
    };

    createObserver(el) {
        var observer;
      
        var options = {
          root: null,
          rootMargin: "0px",
          threshold: .6
        };

        observer = new IntersectionObserver(this.handleIntersect, options);
        observer.observe(el);
    }
    handleIntersect(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("displayed");
          } 
        });
      }
}