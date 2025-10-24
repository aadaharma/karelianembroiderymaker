import { drawLineRight, drawLineLeft, drawLineTop, drawLineBottom, drawDiagLeft, drawDiagRight } from './BasicLines.js';


export const templateLibrary = [
     {
         id: 'square',
         draw: (ctx, x, y, size, color) => {
             drawLineLeft(ctx, x, y, size, color);
             drawLineRight(ctx, x, y, size, color);
             drawLineTop(ctx, x, y, size, color);
             drawLineBottom(ctx, x, y, size, color);
         }
     },
     {
         id: 'cross',
         draw: (ctx, x, y, size, color) => { 
            drawDiagRight(ctx, x, y, size, color);
            drawDiagLeft(ctx, x, y, size, color);
         }
     },
     {
         id: 'diag-right',
         draw:(ctx, x, y, size, color) => {
            drawDiagRight(ctx, x, y, size, color);
         }
     },
     {
         id: 'diag-left',
         draw: (ctx, x, y, size, color) => {
            drawDiagLeft(ctx, x, y, size, color);
         }
     },
     {
         id: 'line-left',
         draw:(ctx, x, y, size, color) => {
            drawLineLeft(ctx, x, y, size, color);
         }
     },
     {
         id: 'line-right',
         draw:(ctx, x, y, size, color) => {
            drawLineRight(ctx, x, y, size, color);
         }
     },
     {
         id: 'line-top',
         draw: (ctx, x, y, size, color) => { 
            drawLineTop(ctx, x, y, size, color);
         }
     },
     {
         id: 'line-bottom',
         draw:(ctx, x, y, size, color) => {
            drawLineBottom(ctx, x, y, size, color);
         }
     },
     {
         id: 'erase',
         isEraser: true,
     }
 ];
