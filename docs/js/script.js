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


//おみくじ機能
class Mikuji{
    constructor(getName){
        this.name=getName;
        this.values=Math.floor(Math.random()*11);
    }
    uranai(val){
        if(val>7){
            this.about="大吉じゃ～ん！やったね！";
            this.result= "大吉";
        }else if(val>5){
            this.about="今行動することがチャンスだ！一緒に頑張ろう！！";
            this.result= "中吉";
        }else if(val>3){
            this.about="小さな幸せに気付く年かも！ちょっとした事に取り組んでいこう！";
            this.result= "小吉";
        }else{
            this.about="おもったような成果が出ず悩む事もあるけれど大丈夫！ゆっくりいこう！";
            this.result= "吉";   
        }
    }
}

function startUranai(){
    const thisUser = new Mikuji(
        document.getElementById('getName').value
    );

    if(thisUser.name=='メイサー'){
        meisarGimmick();
        thisUser.values=10;
    }

    thisUser.uranai(thisUser.values);
    document.getElementById("setName").innerHTML=thisUser.name;



    //本文の表示とアニメーション
    let aboutText=document.getElementById("about");
    //about.className='abouts';
    aboutText.animate([{opacity:0,width:0,fontSize:0},{opacity:1,width:"256px",fontSize:"16px"}]
        ,{duration:500,delay:600});
    window.setTimeout(
        ()=>{
            aboutText.innerHTML=thisUser.about;
            aboutText.className='abouts';
        },700
    );

        //結果の表示とアニメーション
        let resultText=document.getElementById("result");
        resultText.animate([{opacity:0},{opacity:1}],{duration:500,delay:600});
        window.setTimeout(
            ()=>{
                resultText.innerHTML=thisUser.result;
                resultText.className='result';
            },700
        );
}

//ハウル表示（バレンタインサイト移動仕様）
function meisarGimmick(){
    //リンク先の追加
    const insertPosition=document.getElementById('beforeTwitter');
    let aTag=document.createElement('a');
    aTag.setAttribute('id','whiteday')
    aTag.setAttribute('href','./whiteday/whiteday.html');
    insertPosition.before(aTag);

    //画像の追加
    // const imgElement=document.createElement('img');
    // imgElement.src='uranai/meisar.png';
    // imgElement.className="meisarGimmick";
    aTag=document.getElementById('whiteday');
    const content=`<img src='uranai/meisar.png' class='meisarGimmick'>`;
    aTag.insertAdjacentHTML('afterbegin',content);

    //cookieの追加
    document.cookie='Meisar=meisar; Max-age=3600';
}

const getCookie=document.cookie.split(";").find((row)=>row.startsWith("Meisar="))?.split("=")[1];
if(getCookie=='meisar'){
  headerClick('uranai');
}