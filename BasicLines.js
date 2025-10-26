
export function drawLineLeft(ctx, x, y, size, color){
    ctx.strokeStyle = color;
             ctx.lineWidth = 2;
             ctx.beginPath();
             ctx.moveTo(x, y);
             ctx.lineTo(x, y + size);
             ctx.stroke();
}

export function drawLineRight(ctx, x, y, size, color){
    ctx.strokeStyle = color;
             ctx.lineWidth = 2;
             ctx.beginPath();
             ctx.moveTo(x + size, y);
             ctx.lineTo(x + size, y + size);
             ctx.stroke();
}

export function drawLineTop(ctx, x, y, size, color){
    ctx.strokeStyle = color;
             ctx.lineWidth = 2;
             ctx.beginPath();
             ctx.moveTo(x, y);
             ctx.lineTo(x + size, y);
             ctx.stroke();
}

export function drawLineBottom(ctx, x, y, size, color){
    ctx.strokeStyle = color;
             ctx.lineWidth = 2;
             ctx.beginPath();
             ctx.moveTo(x, y + size);
             ctx.lineTo(x + size, y + size);
             ctx.stroke();
}

export function drawDiagLeft(ctx, x, y, size, color){
    ctx.strokeStyle = color;
             ctx.lineWidth = 2;
             ctx.beginPath();
             ctx.moveTo(x, y);
             ctx.lineTo(x + size, y + size);
             ctx.stroke();
}

export function drawDiagRight(ctx, x, y, size, color){
    ctx.strokeStyle = color;
             ctx.lineWidth = 2;
             ctx.beginPath();
             ctx.moveTo(x + size, y);
             ctx.lineTo(x, y + size);
             ctx.stroke();
}