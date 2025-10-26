

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

