function headerClick(area){
    let offDisplayArea=document.querySelectorAll('div.onDisplay');
    offDisplayArea.forEach(items=>{items.className="offDisplay";});
    let targetArea=document.getElementById(area);
    targetArea.className="onDisplay";
    targetArea.animate({opacity:[0,1]},500);
}

let smallImg=document.querySelectorAll('img.smallImg');
let mainImg=document.getElementById('mainImg');
smallImg.forEach(smallImg=>{
    smallImg.addEventListener('mouseover',(targetimg)=>{
        mainImg.src=targetimg.target.src;
        mainImg.animate({opacity:[0,1]},500);
    });
});
