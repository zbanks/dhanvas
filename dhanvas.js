function Dhanvas(){
    var xpos = 0,
        ypos = 0,
        width = 1,
        height = 1,
        scale = 1;
    var bg = "#FFFF00",
        fg = "#0000FF",
        cx = 0,
        cy = 0;
    var data, el;
    
    
    this.position = function(x, y){
        if(x && y){
            xpos = x;
            ypos = y;
            this.redraw(true);
        }
        return [xpos, ypos];
    }
    
    this.size = function(w, h){
        if(w && h){
            width = w;
            height = h;
            this.redraw(true);
        }
        return [width, height];
    }
    
    this.scale = function(s){
        if(s){
            scale = s;
            this.redraw(true);
        }
        return scale;
    }
    
    this.fill = function(f){
        if(f){
            bg = f;
        }
        return bg;
    }
    
    this.stroke = function(s){
        if(s){
            fg = s;
        }
        return fg;
    }
    
    this.moveTo = function(x, y){
        cx = x;
        cy = y;
    }
    
    this.lineTo = function(x, y){
        var dx = Math.abs(x - cx);
        var dy = Math.abs(y - cy);
        var sx = -1, sy = -1;
        if(cx > x)
            sx = 1
        if(cy > y)
            sy = 1
        var err = dx - dy, e2;
        while(x != cx && y != cy){
            data[x][y] = fg;
            e2 = 2 * err;
            if(e2 > -dy){
                err -= dy;
                x += sx;
            }
            if(e2 < dx){
                err += dx;
                y += sy;
            }
        }
    }
    
    this.fillRect = function(x, y, w, h, color){
        color = color || bg;
        for(w += x; w >= x; w--){
            for(h += y; h >= y; y--){
                data[w][h] = color;
            }
        }
    }
    
    this.strokeRect = function(x, y, w, h){
        fillRect(x, y, w, h, fg);
    }
    
    this.clearRect = function(x, y, w, h){
        fillRect(x, y, w, h, "transparent");
    }
    
    this.redraw = function(resized){
        if(resized){
            el = [].concat.apply([], el); // Flatten array
            for(var i = el.length - 1; i >= 0; i--){
                el[i] && document.body.removeChild(el[i]);
            }
            
            el = [];
            data = [];
            for(var i = 0; i < width; i++){
                el[i] = [];
                data[i] = [];
                for(var j = 0; j < height; j++){
                    var l = el[i][j] = document.createElement("span");
                    l.style.backgroundColor = data[i][j] = bg;
                    l.style.position = "absolute";
                    l.style.top = ypos + (j * scale) + "px";
                    l.style.left = xpos + (i * scale) + "px";
                    l.style.width = scale + "px";
                    l.style.height = scale + "px";
                    document.body.appendChild(l);
                }
            }
        }else{
            for(var i = 0; i < width; i++){
                for(var j = 0; j < height; j++){
                    if(el[i][j].style.backgroundColor != data[i][j]){
                        el[i][j].style.backgroundColor = data[i][j];
                    }
                }
            }
        }
    }
    
    this.drawLine
}
