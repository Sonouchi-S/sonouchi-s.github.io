/////////////////////////////
//*ホワイトデー企画のメッセージカード作成・カードをpngで保存*
//作成者:Shu,X:https://x.com/shu1483072
//作成日:2025/03/09,更新日2025/03/23
//使用言語:JavaScript
//依存関係:必要なライブラリ:html2canvas.min.js,ブラウザ:Chrome134.0.6998.118（Official Build）
//実行方法:DOCS/whiteday/whiteday.html
//ライセンス:
// html2canvas v1.5.1
// https://html2canvas.hertzen.com/
// Copyright (c) 2023 Niklas von Hertzen
// Released under the MIT License
//注意事項:ライブラリのバージョン変更に伴い画像保存が機能しなくなる場合があるので、バージョン管理をしてください。
//prefix:jshead
/////////////////////////////


/////////////////////
// ゲームキャラ定義 //
////////////////////
class CharaSet {
    //コンストラクタ
    //特典の初期設定、イメージ画像の設定、質問文・解答の設定。    
    constructor(getArray) {
        //let i = 0;
        this.point = 0;
        this.name = getArray[0][0];
        this.Imgcode = getArray[0][1];
        this.ImgcodeFalse=getArray[0][2];
        this.Ques = getArray[1].Q;
        this.Sel1 = getArray[1].Sel1;
        this.Sel2 = getArray[1].Sel2;
        this.Ans = getArray[1].Ans;
        this.TrueText = getArray[1].TrueText;
        this.FalseText = getArray[1].FalseText;
        this.Arrays = getArray;
    }
    //特典の追加
    getScore() {
        return ++this.point;
    }
    questSet(i) {
        this.Ques = this.Arrays[i].Q;
        this.Sel1 = this.Arrays[i].Sel1;
        this.Sel2 = this.Arrays[i].Sel2;
        this.Ans = this.Arrays[i].Ans;
        this.TrueText = this.Arrays[i].TrueText;
        this.FalseText = this.Arrays[i].FalseText;
        return i;
    }
}

const people=[
    [""
        ,""
        ,""
    ]
    ,{Q:""
        , Sel1:""
        , Sel2:""
        , Ans:""
        , TrueText:""
        , FalseText:""
    }
    ,{Q:""
        , Sel1:""
        , Sel2:""
        , Ans:""
        , TrueText:""
        , FalseText:""
    }
    ,{Q:""
        , Sel1:""
        , Sel2:""
        , Ans:""
        , TrueText:""
        , FalseText:""
    }
]

const people1 = [
    ["ちゅーとりある！"
        , "../img/1.png"
        ,"../img/false1.png"
    ]
    , { Q: "こんにちは！今回は「ホワイトデーメッセージカードをGETして、メッセージを作ろう」という企画です！<br>メッセージカードは全部で5種類！ファン有志でつくったから、好きなカードを手に入れて、メッセージを入れてみてね！<br>早速ですが、①をクリックしてね！"
        , Sel1: "①こっちをクリック！"
        , Sel2: "②こっちはノータッチ！"
        , Ans: "Sel1"
        , TrueText: "ありがとう！<br>このように、質問に答えて正解と思った方の選択肢を選ぶ、を3問繰り返すよ！<br>3問正解でカードゲット！じゃあ、練習で次の問題いこう！"
        , FalseText: "あー！違う違う！①を選んでね！<br>間違えてもやり直し出来るから大丈夫だよ！<br>でも、押すなって言われると押したくなるよね！" 
    }
    , { Q: "じゃあ練習問題！大丈夫、間違えても同じ質問を答えることが出来るからね！<br>神崎メイサさんの誕生日はいつでしょーか？"
        , Sel1: "6月23日"
        , Sel2: "3月24日"
        , Ans: "Sel1"
        , TrueText: "正解!"
        , FalseText: "3月24日はデビュー日だよ！" 
    }
    , { Q: "これでチュートリアルおしまい！自由にメッセージカードを記入して、推しやリスナーに向けて自由にメッセージカードをツイートしてね！"
        , Sel1: "了解！"
        , Sel2: "お、おう...."
        , Ans: "Sel1"
        , TrueText: "メッセージの送り主の名前と、メッセージを記入して[表示]ボタンを押すと、カードに反映されるよ！<br>[カード出力（png）]を押したらカードが画像保存されるよ！<br>メッセージは長すぎるとカードからはみ出すから気を付けてね！"
        , FalseText: "！？！？！？！？！？！？"
    }
];

const people2 = [
    ["あるメイサー"
        , "../img/w1.png"
        ,"../img/w2.png"
        ,`<li><p onclick="gameMake(people2)">あるメイサー</p></li>`
    ]
    , { Q: "Q1:Vtuber神崎メイサを知ってる？"
        , Sel1: "当然！"
        , Sel2: "どちら様？"
        , Ans: "Sel1"
        , TrueText: "あなたもメイサー(仮)にならないか？"
        , FalseText: "YouTubeで『神崎メイサ』と調べてみよう。素敵なVtuberが見つかるよ！" 
    }
    , { Q: "Q2:神崎メイサの魅力は何だと思いますか？"
        , Sel1: "歌が素敵で、トークが面白く、コラボやゲーム配信等、どんな枠でも楽しめるとこ！"
        , Sel2: "立ち絵が綺麗"
        , Ans: "Sel1"
        , TrueText: "あなたはすでにメイサー(仮)です！"
        , FalseText: "先ずはチャンネル登録をして気になったアーカイブを見て、神崎メイサの魅力を発見しましょう。" 
    }
    , { Q: "Q3:神崎メイサをYouTube以外にも楽しんでる？"
        , Sel1: "もちろんいろいろ登録しています。シチュボ最高！"
        , Sel2: "YouTube以外にも何かあるの？"
        , Ans: "Sel1"
        , TrueText: "あなたは素敵しいメイサー(仮)の一人ですね！これからも、神崎メイサとメイサー(仮)と一緒に楽しんで行きましょう！"
        , FalseText: "Twitter、TikTok、FANBOXもフォローしていろいろなコンテンツで神崎メイサを楽しみましょう！" 
    }
];

const people3 = [
    ["NightAgo"
        , "../img/1.png"
        ,"../img/false1.png"
        ,`<li><p onclick="gameMake(people3)">NightAgo</p></li>`
    ]
    , { Q: "Q1:今日って何の日か覚えてる？"
        , Sel1: "ホワイトデー？？"
        , Sel2: "円周率の日だよね？"
        , Ans: "Sel1"
        , TrueText: "正解！バレンタインデーのお返しを渡そうと思って"
        , FalseText: "そうそう、3.14159265ってね。帰ります。" 
    }
    , { Q: "Q2:お返し、何だと思う？"
        , Sel1: "そもそもあげてないけど…"
        , Sel2: "チョコレートでしょ！"
        , Ans: "Sel2"
        , TrueText: "今年はチョコレートじゃなくて形に残るものにしたんだ"
        , FalseText: "記憶喪失かな？？記憶作り直してきてね" 
    }
    , { Q: "Q3:形に残るものでプレゼントになるものなら分かるかな？"
        , Sel1: "お手紙とかかな？"
        , Sel2: "おまけ付きたんぽぽかな？"
        , Ans: "Sel1"
        , TrueText: "正解！それじゃあメッセージを書いてね！"
        , FalseText: "綿毛の根元におみくじついてるやつね、何それ…"
    }
];

const people4=[
    ["管理人"
        ,"../img/1.png"
        ,"../img/false1.png"
        ,`<li><p onclick="gameMake(people4)">管理人</p></li>`
    ]
    ,{Q:"こちらはランダムでカードを取得出来ます。準備はOK？"
        , Sel1:"OK!"
        , Sel2:"NO!"
        , Ans:"Sel1"
        , TrueText:"オッケー！じゃあ問題をだしちゃおっかな！"
        , FalseText:"あら、じゃあ待とうかな・・・？"
    }
    ,{Q:"Q1:神崎メイサさんのlit.linkに無い項目はどれ？"
        , Sel1:"血液型"
        , Sel2:"年齢"
        , Ans:"Sel1"
        , TrueText:"血液型は表記してないね！"
        , FalseText:"「成人済み」って表記がある！"
    }
    ,{Q:"Q2:神崎メイサさんがアカウントを登録していないSNSはどれ？"
        , Sel1:"TikTok"
        , Sel2:"Mixi2"
        , Ans:"Sel2"
        , TrueText:"これ意外なのよね！"
        , FalseText:"ひょっとして管理人が知らないだけで登録済みなのかな・・・？"
    }
]

//id要素取得Function
function getId(Id) { return document.getElementById(Id); }


/////////////////
//ゲーム実行定義//
////////////////
let Chara;
let inc = 1;
let displayImg = getId('gameImg');
let dispQ = getId('Quest');
let dispS1 = getId('Sel1');
let dispS2 = getId('Sel2');
const clearText="ゲームクリア！！メッセージカードを作れるよ！";

function gameMake(Ch) {//キャラ選択ボタンで発生するゲーム開始時の処理
    Chara = new CharaSet(Ch);
    inc=1;
    getId('GameClear').className='offDisplay';
    setQuest();
    dispS1.addEventListener('click', selectAnswer);//selectAnswerのアクションを追加
    dispS2.addEventListener('click', selectAnswer);//同上
    return Chara;
}

function setQuest() {//質問の表示
    displayImg.src = Chara.Imgcode;
    dispQ.innerHTML = Chara.Ques;
    dispS1.innerHTML = Chara.Sel1;
    dispS2.innerHTML = Chara.Sel2;
}

function selectAnswer() {//回答選択時の実行
    if (Chara.Ans == this.id) {//正解を選択した場合。
        ++inc;
        Chara.getScore();//点数加算
        dispQ.innerHTML = Chara.TrueText;//テキストの表示
        dispS1.innerHTML = "Next!";//選択ボタンに次文字を上書き
        dispS2.innerHTML = "";//選択ボタンの文字列削除
        dispS1.removeEventListener('click', selectAnswer);//selectAnswerのアクションを削除
        dispS2.removeEventListener('click', selectAnswer);//同上
        dispS1.addEventListener('click', nextStage);//nextStageのアクションを追加
    } else {//不正解を選択した場合
        displayImg.src =Chara.ImgcodeFalse;
        dispQ.innerHTML=Chara.FalseText;
        dispS1.innerHTML = "もう1回!";//選択ボタンに次文字を上書き
        dispS2.innerHTML = "";//選択ボタンの文字列削除
        dispS1.removeEventListener('click', selectAnswer);//selectAnswerのアクションを削除
        dispS2.removeEventListener('click', selectAnswer);//同上
        dispS1.addEventListener('click', nextStage);//nextStageのアクションを追加
    }
}

function nextStage() {//次へを押下した時実行
    if(inc>=4){//得点が4以上になった時
        dispS1.innerHTML="";
        dispS1.removeEventListener('click', nextStage);//nextStageのアクションを削除
        dispQ.innerHTML=clearText;
        getId('GameClear').className='ondisplay';
        let url=imgSelect();//画像の選択
        getId('ImgArea').style.backgroundImage = `url(${url})`;//画像URLの挿入
        getId('createPng').addEventListener('click',()=>{//画像ダウンロードボタンの生成
            outputPng();
        });
        getId('submitBtn').addEventListener('click',()=>{//テキスト入力ボタンの設定
            let messages=getId('getText').value;//テキストの取得
            let messenger=getId('messenger').value;//名前の取得
            messages=escapeHTML(messages);//エスケープ処理
            messages=messages.replace(/\n/g, '<br>');
            getId('InputText').innerHTML = messages;//テキストの出力
            messenger=escapeHTML(messenger);//エスケープ処理
            getId('nameArea').innerHTML=messenger;//名前の出力            
        });
        function escapeHTML(str) {//エスケープ処理
            return str.replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&#039;');
          }
    }else {//3以下である時
        if(Chara.name=='NightAgo' && inc==3){//特殊ギミック
            Chara.questSet(inc);//クラスに次の課題をセット
            setQuest();//質問の表示実行
            dispS1.removeEventListener('click', nextStage);//nextStageのアクションを削除
            dispS1.addEventListener('click', selectAnswer);//selectAnswerのアクションを追加
            dispS2.addEventListener('click',()=>{//間違い押下時の基本挙動に、サイト頭へ飛ばす挙動追加
                displayImg.src =Chara.ImgcodeFalse;
                dispQ.innerHTML=Chara.FalseText;
                dispS1.innerHTML = "もう1回!";//選択ボタンに次文字を上書き
                dispS2.innerHTML = "";//選択ボタンの文字列削除
                dispS1.removeEventListener('click', selectAnswer);//selectAnswerのアクションを削除
                dispS2.removeEventListener('click', selectAnswer);//同上
                dispS1.addEventListener('click', //サイト頭へ飛ばす。
                    ()=>{
                        window.location.href = '../index.html';
                    }
                );
            });           
        }else{
        Chara.questSet(inc);//クラスに次の課題をセット
        setQuest();//質問の表示実行
        dispS1.removeEventListener('click', nextStage);//nextStageのアクションを削除
        dispS1.addEventListener('click', selectAnswer);//selectAnswerのアクションを追加
        dispS2.addEventListener('click', selectAnswer);//同上
        }
    }
}

function imgSelect(){//メッセージカードの選択
    if(Chara.name=='あるメイサー'){//ロムエッグさん選出キャラの場合
        return '../img/Clear4.JPG';
    }else if(Chara.name=='NightAgo'){//アゴり手さん選出キャラの場合
        return '../img/Clear5.jpg';
    }else if(Chara.name=='ちゅーとりある！'){//ちゅーとりあるの場合
        {
            getId('charaInsert').insertAdjacentHTML('beforeend',people2[0][3]);
            getId('charaInsert').insertAdjacentHTML('beforeend',people3[0][3]);
            getId('charaInsert').insertAdjacentHTML('beforeend',people4[0][3]);
        }
        return '../img/Clear3.png';
    }else{//それ以外の場合
        let number = Math.round(Math.random()*10);
        if(number<=4){
            return '../img/Clear1.png';
        }else if (number<=7){
            return '../img/Clear5.jpg';
        }else{
            return '../img/Clear2.png';
        }
    }
}

async function outputPng(){//pngとしてダウンロード
    const msgCard=getId('ImgArea');//要素の取得
    const canvas=await html2canvas(msgCard);//取得した要素の画像化
    console.log(canvas);
    const imgData=canvas.toDataURL("image/png");
    const link=document.createElement("a");//a要素の付与
    link.href=imgData;//画像をa要素にリンク
    link.download="MessageCard.png";//ダウンロード時の名称の付与
    document.body.appendChild(link);//ドキュメントにa要素の付与
    link.click();//a要素のクリック（ダウンロード実行）
    document.body.removeChild(link);//a要素の削除
}