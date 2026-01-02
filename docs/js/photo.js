/////////////////////////////
//*カメラ撮影機能*
//作成者:Shu,X:https://x.com/shu1483072
//作成日:2024/12/30,更新日2025/05/05
//使用言語:JavaScript
//依存関係:必要なライブラリ:なし,ブラウザ:Chrome134.0.6998.118（Official Build）
//実行方法:/DOCS/index.html
//ライセンス:なし
//2026/01/02 写真撮影機能追加            
/////////////////////////////

const video = getId("myVideo");
const canvas = getId("picture");
const ctx = canvas.getContext("2d");
const frameImg = new Image();
frameImg.src = "../img/photo0.png"; // フレーム用の画像パス
let selectedEffect = "none"; // 初期エフェクトなし
let photoImg = 0; // 撮影した写真のImageオブジェクト
let textInput = getId("textInput"); // テキスト入力要素
// const txtArea= new Image();
// txtArea.src="../img/fukidashi.png";
const txtArea1= new Image();
txtArea1.src="../img/fukidashi1.png";
const cntImg= new Image();
cntImg.src="../img/cnt.png";


// シャッターボタンの動作
getId("shutter").addEventListener("click", () => {
  // カメラの解像度に合わせてCanvasのサイズを調整
  canvas.width = video.videoWidth??640;
  canvas.height = video.videoHeight??480;

// エフェクトを適用
  ctx.filter = selectedEffect;
// 写真を撮る（Videoの現在のフレームを描画）
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

// 合成する（例：右下に文字を入れる）
//   ctx.font = "bold 40px Arial";
//   ctx.fillStyle = "red";
//   ctx.fillText("SHOT ON MY TOOL", 20, canvas.height - 40);
// drawImageの後に重ねる
let positionX;
let positionY;
let newWidth;
let newHeight;
let heightRatio = frameImg.width / frameImg.height;
//if (canvas.height * heightRatio <= canvas.width) {
if(photoImg <= 1 ){
    // 立ち絵は高さに合わせる
    newWidth = canvas.height * heightRatio;
    newHeight = canvas.height;
    positionX = canvas.width - newWidth;
    positionY = canvas.height - canvas.height;
} else {
    newWidth = canvas.width*0.6;
    newHeight = newWidth / heightRatio;
    positionX = canvas.width - newWidth;
    positionY = canvas.height - newHeight;
}
ctx.drawImage(frameImg, positionX, positionY, newWidth, newHeight);
// テキストを描画
// if (textInput.value.trim() !== "") {
//     ctx.font = "bold 25px Arial";
//     ctx.fillStyle = "black";
//     ctx.drawImage(txtArea, 0, 0, 310, 130);
//     let txt = escapeHTML(textInput.value.replace(/\n/g, '')); // 改行を削除
//     for (let i = 1; i <= 3; i++){
//         let line = txt.substring((i-1)*12, i*12);
//         if(line.length > 0){
//             ctx.fillText(line, 5, 25 * i);
//         }
//     }
// }

if (textInput.value.trim() !== "") {
    ctx.font = "bold 25px Arial";
    ctx.fillStyle = "black";
    ctx.drawImage(txtArea1, 0, canvas.height - 130, 310, 130);
    let txt = escapeHTML(textInput.value.replace(/\n/g, '')); // 改行を削除
    for (let i = 1; i <= 3; i++){
        let line = txt.substring((i-1)*12, i*12);
        if(line.length > 0){
            ctx.fillText(line, 5, (canvas.height-90)+(25 * i));
        }
    }
}else if(getId("cnt").checked){
    ctx.drawImage(cntImg, 10, canvas.height - 80, canvas.width*0.4, cntImg.height/cntImg.width * (canvas.width*0.4));
}

// エフェクトを適用する
// canvas.style.filter = selectedEffect;
 canvas.style.display = "block";
});
/////////////////////////////////////////////////////////////////// 

 //保存（ダウンロード）
getId("save").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "photo.png";
  link.click();
});
////////////////////////////////////////////////////////////////////

//写真の選択
for (let i = 0; i <= 4; i++) {
  getId("photo" + i).addEventListener("click", () => {
    getId("photo" + i).style.border = "solid 2px #FF0000";
    photoImg = i;
    // 他の画像の枠線をリセット
    for (let j = 0; j <= 4; j++) {
      if (i !== j) {
        getId("photo" + j).style.border = "solid 2px #ffffff";
      }
    }
    frameImg.src = `../img/photo${i}.png`;
  });
}
////////////////////////////////////////////////////////////////////

//エフェクトの選択
const effects = document.querySelectorAll('input[type="radio"]');
effects.forEach(effect => {
  effect.addEventListener("change", () => {
    selectedEffect = effect.value;
  });
});
/////////////////////////////////////////////////////////////////////

// カメラの起動設定
const constraints = {
  video: { 
    facingMode: "environment" // 背面カメラを指定（自撮りは "user"）
  },
  audio: false
};

async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = getId('myVideo');
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("カメラのアクセスに失敗しました:", error);
  }
}
addEventListener('load',initCamera());
////////////////////////////////////////////////////////////////////////