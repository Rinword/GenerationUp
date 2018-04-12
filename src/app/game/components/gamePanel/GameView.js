// // import _createjs from 'createjs';
// import createjs from 'createjs-easeljs';
//
// export default class Game {
//     constructor(context){
//         this.mainStage = new createjs.Stage(context);
//         let mapCells = new createjs.Container();
//         let width = this.mainStage.canvas.clientWidth;
//         let height = this.mainStage.canvas.clientHeight;
//
//         let cellBasis = 10; //размер одной клетки
//
//         let xLines = Math.floor(height / cellBasis);
//         let yLines = Math.floor(width / cellBasis);
//
//         for( let i = 1; i < xLines; i++) {
//             let line = new createjs.Shape();
//             line.graphics.moveTo(0, i * cellBasis).setStrokeStyle(1).beginStroke("#c7c7c7").lineTo(width, i * cellBasis);
//             mapCells.addChild(line);
//         }
//
//         for( let i = 1; i < yLines; i++) {
//             let line = new createjs.Shape();
//             line.graphics.moveTo(i * cellBasis, 0).setStrokeStyle(1).beginStroke("#c7c7c7").lineTo(i * cellBasis, height);
//             mapCells.addChild(line);
//         }
//     }
//
//
//     refresh() {
//         //по хорошему здесь получать все данные из объекта игры, и вносить изменения перед update
//         this.mainStage.update();
//     }
//
//     setGame(game) {
//         this.game = game;
//     }
// }
