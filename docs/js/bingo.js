/////////////////////////////
//*ビンゴカードの作成・作成したカードでビンゴの実行・カードをpngで保存*
//作成者:Shu,X:https://x.com/shu1483072
//作成日:2025/03/22,更新日2025/03/23
//使用言語:JavaScript
//依存関係:必要なライブラリ:html2canvas.min.js,ブラウザ:Chrome134.0.6998.118（Official Build）
//実行方法:DOCS/bingo/Bingo.html
//ライセンス:
// html2canvas v1.5.1
// https://html2canvas.hertzen.com/
// Copyright (c) 2023 Niklas von Hertzen
// Released under the MIT License
//注意事項:ライブラリのバージョン変更に伴い画像保存が機能しなくなる場合があるので、バージョン管理をしてください。
//prefix:jshead
/////////////////////////////


//ビンゴ面の作成
let boards = document.querySelectorAll('.board');//ビンゴエリア（生成画面・実行画面の２つ）の要素を取得
//マスのidデータを格納するarea配列を生成
let mathCount = 4;//0~4計5マス
let area = [];//area配列
window.addEventListener('load', () => {//画面ロード時にarea配列の生成
    for (let k = 0; k <= mathCount; k++) {
        area[k] = [];
        for (let l = 0; l <= mathCount; l++) {
            area[k][l] = `Area${k}${l}`;
        }
    }

    //ビンゴカードのマスを自動生成する処理
    let action, preFix;//マスに組み込む関数actionとid名の接頭語preFixの設定
    boards.forEach(items => {//マスとそのidデータを生成。
        if (items.id == 'cBng') {
            action = '';
            preFix = 'c';
            inputEmt = 'input type="number" min="1" max="100"';
        } else if (items.id == 'oBng') {
            action = 'cellOpnCls';
            preFix = 'o';
            inputEmt = 'p class="cardsCell"';
        };
        for (let i = mathCount; i >= 0; i--) {
            let cells = `<div class="cells" id="${preFix}cells${i}"></div>`;
            items.insertAdjacentHTML("afterbegin", cells);
        }
        for (let j = mathCount; j >= 0; j--) {
            let boardCells = document.querySelector(`#${preFix}cells${j}`);
            for (let k = mathCount; k >= 0; k--) {
                let cell = `<div class="cell"><${inputEmt} id="${preFix}Area${j}${k}" onclick="${action}('${preFix}Area${j}${k}');"></${inputEmt}></div>`;
                boardCells.insertAdjacentHTML("afterbegin", cell);
            }
        }
    });
});

//ビンゴカードのマスを開閉する処理
function cellOpnCls(id) {
    getId(id).className = 
    getId(id).className == 'cardsCell' ? 'clickedCell' : 'cardsCell';
}

//ビンゴカードをJsonファイルとして保存
const json = new Object;//jsonObject
let jsonData = getId('dataExport');//保存ボタンのid要素取得
jsonData.addEventListener('click', () => {//保存ボタンクリック時の処理規定
    dataMethod['createJson']();
    let check = dataMethod['intCheck']();
    if (check.bl != true) {
        let msg = getId('resultMsg');
        msg.innerHTML = check.message;
    } else {
        dataMethod['dataExport']();
    }
});

//カードのJsonファイル指定時にマスの数字を自動出力
var formData = document.forms.myform;
formData.myfile.addEventListener('change', (e) => {
    dataMethod['dataImport'](e);
});

//dataMethodオブジェクト:ビンゴカードに関する各関数を格納・管理 
//JsonFileとして入出力、それに付随する処理を規定
const dataMethod = {
    "dataExport": () => {//Jsonファイルとして作成したビンゴカード情報を出力、保存。
        const blob = new Blob([JSON.stringify(json, null, 2)], {
            type: 'application/json',
        });
        const file = new File([blob], "data.json", { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = 'BingoCard.json'; // 出力するファイルの名前
        link.click();
        link.remove();
    },
    "dataImport": (e) => {//ビンゴカードの情報を保持するJsonファイルの読み込み。
        let preJson = e.target.files[0]; // ファイルを取得
        let reader = new FileReader();
        // ファイル読み込みが完了したときに実行される処理
        reader.onload = (event) => {
            try {
                let jsonItem = JSON.parse(event.target.result); // 結果をパース
                //console.log(jsonItem); // 正常に取得・パースされたJSONデータを表示
                for (let item in jsonItem) {
                    getId(item).innerHTML = jsonItem[item];
                }
            } catch (error) {
                console.error("JSONのパースに失敗しました:", error);
            }
        };
        // ファイルをテキストとして読み込む
        reader.readAsText(preJson);
    },
    "intCheck": () => {//ビンゴカードの入力値被りと入力不足の有無を確認
        let result={//結果の出力
            bl:""
            ,message:""
        };
        const checkSet = new Set();//データをSetに入力。重複した値があると片方しか残らないため、データの数が25未満になる。
        for (const value in json) {
            checkSet.add(json[value]);
        }
        if (checkSet.size != 25) {//データ数の確認
            result.bl=false;
            result.message = '入力した数字が足りないか、重複があります';
        } else {
            result.bl = true;
        }
        return result;
    },
    "createJson": () => {//
        for (i = 0; i <= 4; i++) {
            for (j = 0; j <= 4; j++) {
                let getInt = getId(`cArea${i}${j}`);
                json[`oArea${i}${j}`] = getInt.value;
            }
        }
    }
}

async function outputPng() {//pngとしてダウンロード
    const msgCard = getId('oBng');//要素の取得
    const canvas = await html2canvas(msgCard);//取得した要素の画像化
    console.log(canvas);
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");//a要素の付与
    link.href = imgData;//画像をa要素にリンク
    link.download = "BingoCard.png";//ダウンロード時の名称の付与
    document.body.appendChild(link);//ドキュメントにa要素の付与
    link.click();//a要素のクリック（ダウンロード実行）
    document.body.removeChild(link);//a要素の削除
}