//////////////////////
// ゲームキャラ定義 //
///////////////////
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

const people1 = [
    ["Name1"
        , "../img/1.png"
        ,"../img/2.png"
    ]
    , { Q: "Q1"
        , Sel1: "Sel1"
        , Sel2: "Sel2"
        , Ans: "Sel1"
        , TrueText: "HappyEnd!"
        , FalseText: "BadEnd..." 
    }
    , { Q: "Q2"
        , Sel1: "Sel1"
        , Sel2: "Sel2"
        , Ans: "Sel2"
        , TrueText: "HappyEnd!"
        , FalseText: "BadEnd..." 
    }
    , { Q: "Q3"
        , Sel1: "Sel1"
        , Sel2: "Sel2"
        , Ans: "Sel2"
        , TrueText: "HappyEnd!"
        , FalseText: "BadEnd..."
    }
];

const people2 = [
    ["Name1"
        , "../img/1.png"
        ,"../img/2.png"
    ]
    , { Q: "Q1"
        , Sel1: "Sel1"
        , Sel2: "Sel2"
        , Ans: "Sel1"
        , TrueText: "HappyEnd!"
        , FalseText: "BadEnd..." 
    }
    , { Q: "Q2"
        , Sel1: "Sel1"
        , Sel2: "Sel2"
        , Ans: "Sel2"
        , TrueText: "HappyEnd!"
        , FalseText: "BadEnd..." 
    }
    , { Q: "Q3"
        , Sel1: "Sel1"
        , Sel2: "Sel2"
        , Ans: "Sel2"
        , TrueText: "HappyEnd!"
        , FalseText: "BadEnd..." 
    }
];

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
        dispS1.innerHTML = "One more challenge!";//選択ボタンに次文字を上書き
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
        getId('submitBtn').addEventListener('click',()=>{//テキスト入力ボタンの設定
            let messages=getId('getText').value;//テキストの取得
            let messenger=getId('messenger').value;
            messages=escapeHTML(messages);
            messages=messages.replace(/\n/g, '<br>');
            getId('InputText').innerHTML = messages;//テキストの入力
            messenger=escapeHTML(messenger);
            getId('nameArea').innerHTML=messenger;
        });

        function escapeHTML(str) {
            return str.replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&#039;');
          }

    }else {//3以下である時
        Chara.questSet(inc);//クラスに次の課題をセット
        setQuest();//質問の表示実行
        dispS1.removeEventListener('click', nextStage);//nextStageのアクションを削除
        dispS1.addEventListener('click', selectAnswer);//selectAnswerのアクションを追加
        dispS2.addEventListener('click', selectAnswer);//同上
    }
}

function imgSelect(){//メッセージカードの選択
    if(Chara.name=='Name1'){//選択したキャラ名がName1の場合
        return '../img/Clear3.png';
    }else if(Chara.name=='Name2'){//選択したキャラがName2の場合
        return '../img/Clear1.png';
    }else{//それ以外の場合
        return '../img/Clear2.png';
    }
}


