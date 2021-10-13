
class  Queue{
    constructor(size){
        this.max = 11;
        this.array = [];
        this.tos = -1;
        this.enqueue = function(data){
            if(this.max==this.tos){
                return Promise.resolve(false);
            }
            if(this.tos>=0){
            data.y = this.array[this.tos].y-this.array[this.tos].height-2;
            }
            this.array[++this.tos] = new QueueNode(data);
            return Promise.resolve(
            this.array[this.tos].drawNode());
        }
        this.dequeue = function(){

            if(this.tos==-1){
                return Promise.resolve(false);
            }
            this.array[this.tos].clearNode();
            this.array[this.tos] = null;
            this.tos--;
            return Promise.resolve(true);
        }
        this.peek = function(){
            
            return Promise.resolve(this.tos);
        }
    }
}
function QueueNodeNode(data) {
    this.data = data.data;
    this.left = null;
    this.right = null;
    this.x = data.x;
    this.y = data.y;
    this.color = data.color;
    this.ctx = data.context;
    this.width = data.width;
    this.height = data.height;
    this.isRemoved = false;

    this.drawNode = function (color) {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'blue';//color ? color : this.color;
      this.ctx.rect(this.x, this.y, this.width, this.height);
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.strokeStyle = "white";
      this.ctx.moveTo(this.x  , this.y);
      this.ctx.lineTo(this.x  , this.y + this.height);
      this.ctx.stroke();
      this.ctx.closePath();
  
      this.ctx.beginPath();
      this.ctx.strokeStyle = "white";
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x + this.width, this.y);
      this.ctx.stroke();
      this.ctx.closePath();
  
      this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.font = `${this.height / 2}px serif`;
      this.ctx.fillText(
        this.data,
        this.x + this.width / 4.5,
        this.y + this.height / 1.5
      );
      this.ctx.closePath();
  
      this.ctx.beginPath();
      this.ctx.strokeStyle = "white";
      this.ctx.moveTo(this.x + this.width , this.y);
      this.ctx.lineTo(this.x + this.width , this.y + this.height);
      this.ctx.stroke();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.strokeStyle = "white";
      this.ctx.moveTo(this.x, this.y+this.height);
      this.ctx.lineTo(this.x + this.width, this.y + this.height);
      this.ctx.stroke();
      this.ctx.closePath();
 
    };

    this.clearNode = function () {
        this.ctx.clearRect(this.x-1, this.y-2, this.width+1, this.height+2);
    }
  }