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

     /*{   id: 'kukkilintu',
         draw: (ctx, x, y, size, color) => {
            drawLineLeft(ctx, x, y, size, color);
            drawLineTop(ctx, x, y, size, color);
            drawLineRight(ctx, x, y, size, color);
            drawLineRight(ctx, x, y+size, size, color);
            drawLineTop(ctx, x+size, y+(size*2), size, color);
            drawDiagLeft(ctx, x+size, y+(size*2), size, color);
            drawLineRight(ctx, x+size, y+(size*3), size, color);
            drawLineBottom(ctx, x+(size*2), y+(size*2), size, color);
            drawLineTop(ctx, x+(size*2), y+(size*2), size, color);
            drawLineLeft(ctx, x+(size*2), y+(size), size, color);
            drawLineTop(ctx, x+(size*2), y+(size), size, color);
            drawLineTop(ctx, x+(size*3), y+(size*2), size, color);
            drawDiagRight(ctx, x+(size*3), y+(size*2), size, color);
            drawDiagRight(ctx, x+(size*4), y+(size), size, color);
            drawLineBottom(ctx, x+(size*4), y+(size), size, color);
            drawDiagLeft(ctx, x+(size*4), y+(size*2), size, color);
         }

     },*/
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


