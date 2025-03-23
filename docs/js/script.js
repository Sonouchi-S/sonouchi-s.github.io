/////////////////////////////
//*メイン画面の動作、全画面の共通操作*
//作成者:Shu,X:https://x.com/shu1483072
//作成日:2024/12/30,更新日2025/03/23
//使用言語:JavaScript
//依存関係:ブラウザ:Chrome134.0.6998.118（Official Build）
//実行方法:/DOCS/index.html
//ライセンス:
//注意事項:全HTMLページの他スクリプトより先に表記実行する必要あり。
//prefix:jshead
//
//・id要素の取得
//・ヘッダーのリスト押下時の表示処理
//・特別サイト移動処理                  
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

//ハウル表示（バレンタインサイト移動仕様）
function meisarGimmick(){
    //リンク先の追加
    const insertPosition=getId('beforeTwitter');
    let aTag=document.createElement('a');
    aTag.setAttribute('id','whiteday')
    aTag.setAttribute('href','./whiteday/whiteday.html');
    insertPosition.before(aTag);

    //画像の追加
    aTag=getId('whiteday');
    const content=`<img src='uranai/meisar.png' class='meisarGimmick'>`;
    aTag.insertAdjacentHTML('afterbegin',content);

    //cookieの追加
    document.cookie='Meisar=meisar; Max-age=1800';
}

//cookieの設定を確認し、占い画面を自動表示する
const getCookie=document.cookie.split(";").find((row)=>row.startsWith("Meisar="))?.split("=")[1];
if(getCookie=='meisar'){
  headerClick('uranai');
}