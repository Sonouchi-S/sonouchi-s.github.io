/////////////////////////////
//*メイン画面の動作、全画面の共通操作*
//作成者:Shu,X:https://x.com/shu1483072
//作成日:2024/12/30,更新日2025/05/05
//使用言語:JavaScript
//依存関係:必要なライブラリ:html2canvas.min.js,ブラウザ:Chrome134.0.6998.118（Official Build）
//実行方法:/DOCS/index.html
//ライセンス:
// html2canvas v1.5.1
// https://html2canvas.hertzen.com/
// Copyright (c) 2023 Niklas von Hertzen
// Released under the MIT License
//注意事項:全HTMLページの他スクリプトより先に表記実行する必要あり。
//ライブラリのバージョン変更に伴い画像保存が機能しなくなる場合があるので、バージョン管理をしてください。
//prefix:jshead
//
//・id要素の取得
//・ヘッダーのリスト押下時の表示処理
//・特別サイト移動処理     
//2025/05/04　ハウルギミック・cookieの削除、png出力処理追加
//2025/05/05　トップページロード時のアニメーション追加
//2025/08/16  画像プリロード追加             
/////////////////////////////

//id要素の取得
function getId(Id) { return document.getElementById(Id);}

//ヘッダーのリスト押下時にメインタグへ表示する。
function headerClick(area){
    let offDisplayArea=document.querySelectorAll('div.onDisplay');
    offDisplayArea.forEach(items=>{
        items.className="offDisplay";
    });
    let targetArea=getId(area);
    targetArea.className="onDisplay";
    targetArea.animate({
        opacity:[0,1]}
        ,500
    );
}

//プロフィールの画像リストをマウスオーバーで表示変更
let smallImg=document.querySelectorAll('img.smallImg');
let mainImg=getId('mainImg');
smallImg.forEach(smallImg=>{
    smallImg.addEventListener('mouseover',(targetimg)=>{
        mainImg.src=targetimg.target.src;
        mainImg.animate({
            opacity:[0,1]}
            ,500
        );
    });
});

//png出力処理
async function outputPng(id,name) {//pngとしてダウンロード
    const msgCard = getId(id);//要素の取得
    const canvas = await html2canvas(msgCard);//取得した要素の画像化
    console.log(canvas);
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");//a要素の付与
    link.href = imgData;//画像をa要素にリンク
    link.download = name;//ダウンロード時の名称の付与
    document.body.appendChild(link);//ドキュメントにa要素の付与
    link.click();//a要素のクリック（ダウンロード実行）
    document.body.removeChild(link);//a要素の削除
}


//トップページアニメーション
class fadeCntl{
    countInt=1;
    setInt(){
        this.countInt++;
        if(this.countInt==1){return 1;}
        else if(this.countInt==2){return 2;}
        else if(this.countInt==3){return 3;}
        else{        
            this.countInt=1;
            return 1;
        }
    }
    kf=[
        { opacity:0},
        { opacity:1},
        { opacity:0},
    ];
    opt={
        duration: 4000
    };
    anmSet(id){
        getId(id).animate(this.kf,this.opt);
    }
}
// 画像プリロード
const preloadImages = () => {
    const images = ['../img/topPre1.png', '../img/topPre2.png'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};
preloadImages(); 

const fc=new fadeCntl();
window.setInterval(()=>{
        getId('fadeArea').className='imgFade'+fc.setInt();
        fc.anmSet('fadeArea');
},4000);

getId('loadAnmArea').addEventListener('load',loadAction());
function loadAction(){
    const kf1=[
        { opacity: 0, transform: 'translateY(80px)'}, // 初期状態（透明 & 下にある）
        { opacity: 1, transform: 'translateY(30px)'}, // フェードイン & 上へ移動
        { opacity: 0, transform: 'translateY(-20px)'} // フェードアウト & 上へ移動      
    ];
    const kf2=[
        { opacity: 0, transform: 'translateY(-20px)'}, // 初期状態（透明 & 上にある）
        { opacity: 1, transform: 'translateY(30px)'}, // フェードイン & 下へ移動
        { opacity: 0, transform: 'translateY(80px)'} // フェードアウト & 下へ移動      
    ];
    const opt={
        duration: 2000, // 1秒間
        easing: 'ease-in-out',
        iterations: 1, // 1回実行      
    };
    const img = document.createElement('img');
    img.id='Anm';
    img.style.position = 'absolute';
    img.src = '../img/topPre1.png'; 
    getId('loadAnmArea').insertAdjacentElement("afterbegin",img);
    getId('Anm').animate(kf1,opt);
    
    setTimeout(()=>{
    img.src='../img/topPre2.png';
    getId('Anm').remove();
    getId('loadAnmArea').insertAdjacentElement("afterbegin",img);
    getId('Anm').animate(kf2,opt);
    },2000);
    
    setTimeout(()=>{
        getId('loadAnmArea').remove();
        headerClick('topPage');
    },4000);
}