
import { gridX, gridY, currentColor, pattern } from './state.js';


export function drawLineLeft(ctx, x, y, size, color){
    if (!checkForCollision('line-left')){
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + size);
            ctx.stroke();
            return;
    } else {
        return;
    }
}
export function drawLineRight(ctx, x, y, size, color){

    if (!checkForCollision('line-right')){
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + size, y);
            ctx.lineTo(x + size, y + size);
            ctx.stroke();
            return;
    } else {
        return;
    }
}

export function drawLineTop(ctx, x, y, size, color){
    if (!checkForCollision('line-top')){
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y);
            ctx.stroke();
            return;
    } else {
        return;
    }
}

export function drawLineBottom(ctx, x, y, size, color){
    if (!checkForCollision('line-bottom')){
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, y + size);
            ctx.lineTo(x + size, y + size);
            ctx.stroke();
            return;
    } else {
        return;
    }
}
export function drawDiagLeft(ctx, x, y, size, color){
    if (!checkForCollision('diag-left')){
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y + size);
            ctx.stroke();
            return;
    } else {
        return;
    }
}

export function drawDiagRight(ctx, x, y, size, color){
    if (!checkForCollision('diag-right')){
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + size, y);
            ctx.lineTo(x, y + size);
            ctx.stroke();
            return;
    } else {
        return;
    }
}

export function checkForCollision(templateId){
    const newItem = { x: gridX, y: gridY, templateId: templateId, color: currentColor };
    const oldIndex = pattern.findIndex(item => item.x === gridX && item.y === gridY && item.templateId === templateId);
            if (oldIndex === -1){
                /*if (templateId === 'diag-right' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'diag-right')){
                    return true;
                }
                if (templateId === 'diag-left' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'diag-left')){
                    return true;
                }
                if (templateId === 'line-left' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'line-left')){
                    return true;
                }
                if (templateId === 'line-right' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'line-left')){
                    return true;
                }
                if (templateId === 'line-top' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'line-top')){
                    return true;
                }
                if (templateId === 'line-bottom' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'line-bottom')){
                    return true;
                }*/
                // No collision, add the item
                pattern.push(newItem);
                return false;            
            } else {
               // If the item already exists, remove it
                pattern.splice(oldIndex, 1);
                return true;
            }
}