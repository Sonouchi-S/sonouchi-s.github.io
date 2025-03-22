//ビンゴ面の作成
let boards = document.querySelectorAll('.board');//ビンゴ面の要素を取得
//マスのidデータを格納する配列を生成
let mathCount=4;//0~4計5マス
let area=[];
window.addEventListener('load',()=>{
    for(let k=0;k<=mathCount;k++){
        area[k]=[];
        for(let l=0;l<=mathCount;l++){
           area[k][l]=`Area${k}${l}`; 
        }
    }
//マスとそのidデータを生成。
let action, preFix;
boards.forEach(items=>{
    if(items.id=='cBng'){
        action='';
        preFix='c';
        inputEmt='input type="number" min="1" max="100"';
    }else if(items.id=='oBng'){
        action='outputInt';
        preFix='o';
        inputEmt='p class="cardsCell"';
    };
for(let i=mathCount;i>=0;i--){
    let cells=`<div class="cells" id="${preFix}cells${i}"></div>`;
    items.insertAdjacentHTML("afterbegin",cells);
}
for(let j=mathCount;j>=0;j--){
    let boardCells=document.querySelector(`#${preFix}cells${j}`);
    for(let k=mathCount;k>=0;k--){
        let cell=`<div class="cell"><${inputEmt} id="${preFix}Area${j}${k}" onclick="${action}('${preFix}Area${j}${k}');"></${inputEmt}></div>`;
        boardCells.insertAdjacentHTML("afterbegin",cell);        
    }
}
});
});

//ビンゴカードのマス空け
function outputInt(id){
    getId(id).className=getId(id).className=='cardsCell'?'clickedCell':'cardsCell';
}

//ビンゴカード出力
const json=new Object;//jsonObject
let jsonData=getId('dataExport');
jsonData.addEventListener('click',()=>{
    dataMethod['createJson']();
    let check=dataMethod['intCheck']();
    if(check!=true){
        let msg=getId('resultMsg');
        msg.innerHTML=check;
    }else{
        dataMethod['dataExport']();
    }
});

//カードの出力
var formData = document.forms.myform;
formData.myfile.addEventListener('change',(e)=>{
    dataMethod['dataImport'](e);
});

//JsonFileの出力・取り込み・チェック・生成
const dataMethod={
    "dataExport":()=>{
        const blob = new Blob([JSON.stringify(json, null, 2)], {
            type: 'application/json',
          });
          const file = new File([blob],"data.json",{type:'application/json'});
          const link = document.createElement('a');
          link.href = URL.createObjectURL(file);
          link.download = 'BingoCard.json'; // 出力するファイルの名前
          link.click();
          link.remove();
    },
    "dataImport":(e)=>{
        let preJson = e.target.files[0]; // ファイルを取得
        let reader = new FileReader();
        // ファイル読み込みが完了したときに実行される処理
        reader.onload = (event) => {
          try {
            let jsonItem = JSON.parse(event.target.result); // 結果をパース
            //console.log(jsonItem); // 正常に取得・パースされたJSONデータを表示
            for(let item in jsonItem){
                getId(item).innerHTML=jsonItem[item];
            }
          } catch (error) {
            console.error("JSONのパースに失敗しました:", error);
          }
        };
        // ファイルをテキストとして読み込む
        reader.readAsText(preJson);  
        
    },
    "intCheck":()=>{
        let message;//結果の出力
        const checkSet=new Set();
        for(const value in json){
            checkSet.add(json[value]);
        }
        if(checkSet.size!=25){
            message='入力した数字が足りないか、重複があります';
        }else{
            message = true;
        }
        return message;
    },
    "createJson":()=>{
        for(i=0; i<=4;i++){
            for(j=0;j<=4;j++){
                let getInt=getId(`cArea${i}${j}`);
                json[`oArea${i}${j}`] = getInt.value;
            }
        }
    }
}

async function outputPng(){//pngとしてダウンロード
    const msgCard=getId('oBng');//要素の取得
    const canvas=await html2canvas(msgCard);//取得した要素の画像化
    console.log(canvas);
    const imgData=canvas.toDataURL("image/png");
    const link=document.createElement("a");//a要素の付与
    link.href=imgData;//画像をa要素にリンク
    link.download="BingoCard.png";//ダウンロード時の名称の付与
    document.body.appendChild(link);//ドキュメントにa要素の付与
    link.click();//a要素のクリック（ダウンロード実行）
    document.body.removeChild(link);//a要素の削除
}