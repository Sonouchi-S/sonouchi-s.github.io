/////////////////////////////
//*おみくじ機能を規定、実行する*
//作成者:Shu,X:https://x.com/shu1483072
//作成日:2025/01/01,更新日2025/03/23
//使用言語:JavaScript
//依存関係:ブラウザ:Chrome134.0.6998.118（Official Build）
//実行方法:/DOCS/index.html
//ライセンス:
//注意事項:
//prefix:jshead
//
//・おみくじクラスの設定
//・占い実行処理
/////////////////////////////

//おみくじクラスの設定
class Mikuji{
    constructor(getName){//コンストラクタ 入力名の取得、占い結果の設定
        this.name=getName;
        this.values=Math.floor(Math.random()*11);
    }
    uranai(val){//占い実行結果の設定
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

//「占う」ボタン押下で占い実行
function startUranai(){
    //おみくじクラスのインスタンス化
    const thisUser = new Mikuji(
        getId('getName').value
    );

    if(thisUser.name=='メイサー'){//入力名がメイサーの時の処理
        meisarGimmick();
        thisUser.values=10;
    }

    thisUser.uranai(thisUser.values);//クラスの占い実行、結果の設定完了
    getId("setName").innerHTML=thisUser.name;//入力した名前を画面に表示



    //本文の表示とアニメーション
    let aboutText=getId("about");
    aboutText.animate(
        [
            {opacity:0
                ,width:0
                ,fontSize:0
            }
            ,{opacity:1
                ,width:"256px"
                ,fontSize:"16px"
            }
        ]
        ,{
            duration:500
            ,delay:600
        }
    );

    window.setTimeout(//占い結果の内容(about)を時間差で表示
        ()=>{
            aboutText.innerHTML=thisUser.about;
            aboutText.className='abouts';
        },700
    );

    //結果の表示とアニメーション
    let resultText=getId("result");
    resultText.animate(
        [
            {opacity:0
            }
            ,{opacity:1
            }
        ]
        ,{duration:500
            ,delay:600
        }
    );

    window.setTimeout(//占い結果(result)を表示
        ()=>{
            resultText.innerHTML=thisUser.result;
            resultText.className='result';
        },700
    );
}
