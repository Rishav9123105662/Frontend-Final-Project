function init(){

    gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);


ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },

pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

}

init();

gsap.to(".box2 img",{
  scrollTrigger:{
    scroller:"#main",
    trigger:".box2",
    start:"top top",
    pin: true,
    // markers:true,
    scrub:1,
  },
  ease:"linear",
  top:"-100%",
  duration:2,
  onUpdate:(function(th){
    const three = document.querySelector(".three");
    var val =  three.getBoundingClientRect().top;
    var size = gsap.utils.mapRange(-10,10, 0.5, 2, Math.floor(val*0.01))
    three.style.transform = `translate(-50%, 0) scale(${size}) rotate3d(1,1,0, ${val*0.09}deg)`
  })
})

gsap.to(".text2-1 h1", {
  repeat:-1,
  x:"-100%",
  duration:3,
  ease: "linear",
})

let elems = document.querySelectorAll(".elems1");
elems.forEach(function(elem) {
  elem.addEventListener("mouseover", function(dets){
    elem.children[1].style.opacity = 1;
    elem.children[1].style.transform = `translate(-50%,-50%) translate(${dets.screenX*.3}px, -${dets.screenY*.05}px) rotate(${dets.screenX*.03}deg)`;
  })
 
 elem.addEventListener("mouseout", function(){
  elem.children[1].style.opacity = 0;
})
});

let texts = document.querySelectorAll(".text-4");

gsap.set(".text-4", {opacity: 0})

texts.forEach(t => {
    gsap.to(t, {
        scrollTrigger: {
            trigger: t,
            scroller: "#main",
            start: "top 100%"
        },
        opacity: 1,
        onStart: function(){
            $(t).textillate({ in: { effect: 'fadeInUp' } });
        }
    })
})


// $('.text-4').textillate({ in: { effect: 'fadeInUp' } });

let val = document.querySelector(".scene").getBoundingClientRect().left;

document.querySelector("#box").addEventListener("scroll", function(){
    let newval = document.querySelector(".scene").getBoundingClientRect().left;
    let skewedval = Math.floor((newval - val)*.4);
    document.querySelectorAll(".photo").forEach(photo => {
        photo.style.transform = `skew(${skewedval}deg)`;
    })
    val = newval;
})


document.querySelector("#cross").addEventListener("click", function(){
  document.querySelector("#fullnav").style.transform = "translateX(0%)"
});

document.querySelector(".menu").addEventListener("click", function(){
  document.querySelector("#fullnav").style.transform = "translateX(100%)"
});