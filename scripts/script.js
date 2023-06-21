
const banner_header = document.querySelector('.banner_text');
const upper_header = document.querySelector('.upper_inner_header');
const lower_header = document.querySelector('.lower_inner_header');
const main = document.querySelector("main");
const sections = document.querySelectorAll("section");


const upper_headerBoxTopInt = upper_header.getBoundingClientRect().top;
const lower_headerBoxTopInt = lower_header.getBoundingClientRect().bottom;
const banner_headerTopInt = banner_header.getBoundingClientRect().top;
const main_BoxTopInt = main.getBoundingClientRect().top;

const observer = new IntersectionObserver(enteries => {   
    enteries.forEach(entry =>{
        if(entry.isIntersecting){        
        
            if(entry.target == banner_header){
                let title = entry.target.querySelectorAll('span.blast');
                title.forEach((letter,index)=>{
                    letter.style.transform = 'translateX(0px) translateY(0px) translateZ(0px)';
                    letter.style["transition-delay"]=300+index*100 +"ms";
                    letter.style["transition-duration"]="800ms";
                    letter.style.opacity = "1";
                });
                observer.unobserve(entry.target);
            }
            if(entry.target.nodeName == "SECTION" && entry.target.className != "banner_section" && entry.target.className != "intro_section" && entry.target.className != "map_section"){
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }
            function animateOnScroll(){ 

                let headerBoxTop = 0;
                let currentPos = 0; 
                let windowHeight = window.innerHeight; 
                
                if(entry.target == main){
                    let small_screen = document.querySelector('.small_screen_header');
                    let large_screen = document.querySelector('.large_screen_header');
                    let main_BoxTop = main.getBoundingClientRect().top;                 
                    if(main_BoxTop < -83){
                        small_screen.classList.add("show");
                        large_screen.classList.add("show");
                    }else if(main_BoxTop < -100){
                        large_screen.classList.add("show");
                    }else{
                        small_screen.classList.remove("show");
                        large_screen.classList.remove("show");
                    }
                    
                }               
                if(entry.target == upper_header){
                    headerBoxTop = entry.target.getBoundingClientRect().top;
                    currentPos = 400*(upper_headerBoxTopInt - headerBoxTop -10)/(upper_headerBoxTopInt-10);
                    if(currentPos>=0 && currentPos <= 400){                    
                        entry.target.style.transform = 'translate3d(-'+ currentPos +'px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1)';                   
                    } 
                }                 
                if(entry.target == lower_header){
                    headerBoxTop = entry.target.getBoundingClientRect().bottom;      
                    currentPos = 400*(lower_headerBoxTopInt - headerBoxTop -10)/(lower_headerBoxTopInt-10);
                    if(currentPos>=0 && currentPos <= 400){                    
                        entry.target.style.transform =  'translate3d('+ currentPos +'px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1)'; 
                    } 
                }
                
           
                
            }
            
            window.addEventListener('scroll',animateOnScroll);
           
        } else{
            window.removeEventListener('scroll',animateOnScroll);        
        }
    });
});

observer.observe(banner_header);
observer.observe(upper_header);
observer.observe(lower_header);
observer.observe(main);
sections.forEach(section=>{
    observer.observe(section);
})



//---- Small Screen Menu toggle click event---------

const menuToggle = document.querySelector(".menu_toggle");
const overlayBackground = document.querySelector("#overlay_background");
const smallMenuList = document.querySelector(".small_menu_list");
const smallScreenHeader = document.querySelector(".small_screen_header");
const menuAnchor = document.querySelectorAll(".small_menu_list li a");
const smallMenuClose = document.querySelector('#close_small_menu');


menuToggle.addEventListener("click",() =>{
    document.querySelector("body").classList.toggle("toggle_menu");
    document.querySelector("body").classList.toggle("restore");
});

overlayBackground.addEventListener("click",()=>{
    document.querySelector("body").classList.toggle("toggle_menu");
    document.querySelector("body").classList.toggle("restore");
});

smallMenuClose.addEventListener("click",()=>{
    document.querySelector("body").classList.toggle("toggle_menu");
    document.querySelector("body").classList.toggle("restore");
});


menuAnchor.forEach(anchor =>{
    anchor.addEventListener("click",()=>{
    document.querySelector("body").classList.toggle("toggle_menu");    
    anchor.parentElement.classList.add("active");

    let siblings = n => [...n.parentElement.children].filter(c=>c.nodeType == 1 && c!=n);    
    siblings(anchor.parentElement).forEach(li=>{
        li.classList.remove("active");
    })
   
});
});


//--- large menu submenu toggle-----------
document.querySelectorAll('.menu_item>a').forEach(ele =>{
    let siblings = n => [...n.parentElement.children].filter(c=>c.nodeType == 1 && c!=n);    
    ele.addEventListener("mouseenter",()=>{
        siblings(ele.parentElement).forEach(sibling=>{
            sibling.classList.remove("on");
        });
        ele.parentElement.classList.add("on");

    });
   
});

document.querySelectorAll('ul.submenu').forEach(ele =>{
    ele.addEventListener("mouseleave",()=>{
        ele.parentElement.classList.remove("on");
    });   
});

 //-------- preloader remove ------------
/*
 window.addEventListener("load", function(){
    setTimeout(()=> {        
     let fadeTarget = document.querySelector('.page-loader');
     fadeTarget.style.transition = "opacity 1s ease";    
     let fadeEffect = setInterval(function () {
         if (!fadeTarget.style.opacity) {
             fadeTarget.style.opacity = 1;
         }
         if (fadeTarget.style.opacity > 0) {
             fadeTarget.style.opacity -= 0.25;
         } else {
             clearInterval(fadeEffect);
         }
     }, 200);
     },1000);
     
    
});
*/

//---- nav anchor tag click event to scoll smoothly

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.small_menu_list ul>li>a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//---- image modal function ----------
const imageModal =function(imgElement,imgSrc){

    if(window.innerWidth < 576){
        return;
    }
    const totalImages = imgElement.length;
    
    imgElement.forEach((image,index) => {
        image.addEventListener("click",()=>{    
            
            const figure_modal = `<div class="modal_bg" style="visibility:visible"></div>
            <div class="modal_wrap">
                <div class="modal_container">
                    <div class="modal_content">
                        <div class="modal_figure">
                           
                            <figure>
                            <img class="modal_img" src="${image.getAttribute(imgSrc)}" alt="${image.getAttribute("alt")}" style="max-height:${window.innerHeight}px">
                                <figcaption>
                                    <div class="modal_bottom_bar" style="display:none">
                                        <div class="modal_title">${image.getAttribute("alt")}</div>
                                        <div class="modal_counter">${index+1} of ${totalImages}</div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                        
                    </div>
                    <div class="modal_preloader">Loading...</div>
                    <button type="button" class="modal_arrow modal_arrow_left"></button>
                    <button type="button" class="modal_arrow modal_arrow_right"></button>
                    <button title="Close (Esc)" type="button" class="modal_close" style="display:none">&times</button>
                </div>
            </div>`;
            
            document.querySelector("html").style.overflow="hidden";
            document.querySelector("body").insertAdjacentHTML('beforeend',figure_modal);
            document.querySelector(".modal_container").style.opacity= "1";
            document.querySelector("img.modal_img").addEventListener("load",()=>{            
                document.querySelector(".modal_preloader").style.display = "none";        
                document.querySelector("img.modal_img").style.opacity = "1";                
                document.querySelector(".modal_bottom_bar").style.display = "block";
                document.querySelector("button.modal_close").style.display = "block";
                document.querySelector(".modal_wrap").style.overflow = "hidden auto";
                
                
                
            });

            
            const currentIndexInit = parseInt(document.querySelector(".modal_counter").textContent);
            
            if(currentIndexInit == 1){
                document.querySelector("button.modal_arrow_left").style.opacity = "0.3";
                
            }
            if(currentIndexInit == totalImages){
                document.querySelector("button.modal_arrow_right").style.opacity = "0.3";
            }
            if(totalImages == 1){
                document.querySelector("button.modal_arrow_left").style.opacity = "0";
                document.querySelector("button.modal_arrow_right").style.opacity = "0";
            }

            
            document.querySelector("button.modal_close").addEventListener("click",()=>{        
                document.querySelector(".modal_bg").remove();
                document.querySelector(".modal_wrap").remove();
                document.querySelector("html").style.removeProperty('overflow');
             
            });
    
            document.querySelector(".modal_wrap").addEventListener("click",()=>{    
                document.querySelector(".modal_bg").remove();
                document.querySelector(".modal_wrap").remove();
                document.querySelector("html").style.removeProperty('overflow');
            
            });

            document.querySelector(".modal_content").addEventListener("click",(event)=>{
                event.stopPropagation();
            });  
            
            // ----- right arrow click event ----------------
            document.querySelector("button.modal_arrow_right").addEventListener("click",(event)=>{
                event.stopPropagation();
            
                let currentIndex = parseInt(document.querySelector(".modal_counter").textContent);

                if(currentIndex < totalImages){
                    document.querySelector("img.modal_img").style.opacity = "0"; 
                    document.querySelector("img.modal_img").src = imgElement[currentIndex].getAttribute(imgSrc);
                    document.querySelector("img.modal_img").alt = imgElement[currentIndex].alt;                    
                    document.querySelector(".modal_preloader").style.display = "block";
                    document.querySelector("img.modal_img").addEventListener("load",()=>{ 
                        document.querySelector(".modal_preloader").style.display = "none";
                        document.querySelector("img.modal_img").style.opacity = "1"; 
                        document.querySelector(".modal_title").innerHTML = imgElement[currentIndex].alt;
                        document.querySelector(".modal_counter").innerHTML = currentIndex + 1 + " of "+ totalImages;
                    });
                    
                    if(currentIndex == totalImages - 1){
                        document.querySelector("button.modal_arrow_right").style.opacity = "0.3";
                    }else{
                        document.querySelector("button.modal_arrow_right").style.opacity = "1";
                    }
                    if(currentIndex + 1 > 1){
                        document.querySelector("button.modal_arrow_left").style.opacity = "1";
                    }
                }
                
            }); 
            // ----- left arrow click event ----------------
            document.querySelector("button.modal_arrow_left").addEventListener("click",(event)=>{
                event.stopPropagation();
               
                let currentIndex = parseInt(document.querySelector(".modal_counter").textContent);

                if(currentIndex <= totalImages && currentIndex > 1){
                    document.querySelector("img.modal_img").style.opacity = "0";
                    document.querySelector("img.modal_img").src = imgElement[currentIndex - 2].getAttribute(imgSrc);
                    document.querySelector("img.modal_img").alt = imgElement[currentIndex - 2].alt;
                    document.querySelector(".modal_preloader").style.display = "block";
                    document.querySelector("img.modal_img").addEventListener("load",()=>{
                        document.querySelector("img.modal_img").style.opacity = "1"; 
                        document.querySelector(".modal_title").innerHTML = imgElement[currentIndex - 2].alt;
                        document.querySelector(".modal_counter").innerHTML = currentIndex -1  + " of "+ totalImages;;
                     });
                    
                    if(currentIndex - 1 == 1){
                        document.querySelector("button.modal_arrow_left").style.opacity = "0.3";
                        
                    }else{
                        document.querySelector("button.modal_arrow_left").style.opacity = "1";
                    } 
                    if(currentIndex != totalImages - 1){
                        document.querySelector("button.modal_arrow_right").style.opacity = "1";
                    }                   
                }
                
            });

            // ---- escape, left and right arrow key down event ---------

            window.addEventListener("keydown",(event)=>{
                //event.stopPropagation();
                if (event.defaultPrevented) {
                    return; // Do nothing if the event was already processed
                }               
                switch(event.key){
                    case "ArrowLeft":                        
                        document.querySelector("button.modal_arrow_left").click();
                        break;
                    case "Left":                       
                        document.querySelector("button.modal_arrow_left").click();                        
                        break;
                    case "ArrowRight":
                        document.querySelector("button.modal_arrow_right").click();
                        break;
                    case "Right":
                        document.querySelector("button.modal_arrow_right").click();
                        break;
                    case "Escape":
                        document.querySelector("button.modal_close").click();
                        break;
                    case "Esc":
                        document.querySelector("button.modal_close").click();
                        break;
                    default:
                        return;
                    
                }
              
            },true);

            
          
        })
    })
}

imageModal(document.querySelectorAll(".gallery_img img"),"large-src");

