class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.head == null) {
      this.head = newNode;
    } else {
      let head = this.head;
      while (head.next != null) {
        head = head.next;
      }
      head.next = newNode;
    }
    return this.drawInsert(300);
  }

  drawInsert(time) {
    const promise = new Promise((res, rej) => {
      const nodes = [];
      let head = this.head;
      while (head != null) {
        nodes.push(head);
        head = head.next;
      }
      if (nodes.length > 0) {
        let j = 1;
        for (let i = 0; i < nodes.length; i++) {
          setTimeout(() => {
            nodes[i].drawNode("red");
          }, time * j++);

          setTimeout(() => {
            nodes[i].drawNode("blue");
          }, time * j++);

          setTimeout(() => {
            nodes[i].drawPointer();
            if (i == nodes.length - 1) {
              res(true);
            }
          }, time * j++);
        }
      } else {
        res(true);
      }
    });
    return promise;
  }

  delete(value) {
    if (this.head == null) {
      return Promise.resolve(true);
    } else if (this.head.next == null) {
      if (this.head.data == value) {
        this.head.drawNode("black");
        this.head = null;
      }
    } else if (this.head.data == value) {
      this.head.drawNode("black");
      this.head.clearPointer("rgba(220, 220, 220, 1)");
      this.head.clearPointer("rgba(220, 220, 220, 1)");
      this.head = this.head.next;
    } else {
      let nextNode = this.head;
      while (nextNode != null) {
        if (nextNode.data == value) {
          nextNode.isRemoved = true;
          break;
        }
        nextNode = nextNode.next;
      }
      this.drawDelete(300);
    }
    return Promise.resolve(true);
  }

  drawDelete(time) {
    const promise = new Promise((res, rej) => {
      const nodes = [];
      let head = this.head;
      while (head != null) {
        nodes.push(head);
        head = head.next;
      }
      if (nodes.length > 0) {
        let j = 1;
        for (let i = 0; i < nodes.length; i++) {
          setTimeout(() => {
            nodes[i].drawNode("red");
          }, time * j++);
          if (nodes[i].isRemoved == true) {
            setTimeout(() => {
              nodes[i].drawNode("black");
            }, time * j++);

            setTimeout(() => {
              nodes[i].clearPointer("rgba(220, 220, 220, 1)");
              nodes[i].clearPointer("rgba(220, 220, 220, 1)");
              nodes[i].ctx.clearRect(nodes[i].x-1,nodes[i].y-1,nodes[i].width+2,nodes[i].height+2);
              if (i == nodes.length - 1) {
                res(true);
              }
            }, time * j++);

            if (i - 1 >= 0) {
              setTimeout(() => {
                nodes[i - 1].clearPointer("rgba(220, 220, 220, 1)");
                nodes[i - 1].clearPointer("rgba(220, 220, 220, 1)");
                nodes[i - 1].drawNode("blue");
              }, time * j++);
              setTimeout(() => {
                nodes[i - 1].next = nodes[i].next;
                nodes[i - 1].drawPointer();
              }, time * j++);
            }
            res(true);
            return promise;
          } else {
            setTimeout(() => {
              nodes[i].drawNode("blue");
            }, time * j++);

            setTimeout(() => {
              nodes[i].drawPointer();
              if (i == nodes.length - 1) {
                res(true);
              }
            }, time * j++);
          }
        }
      } else {
        res(true);
      }
    });
    return promise;
  }

  draw(time) {
    const nodes = [];
    let head = this.head;
    while (head != null) {
      nodes.push(head);
      head = head.next;
    }
    if (nodes.length > 0) {
      let j = 1;
      setTimeout(() => {
        nodes[0].drawNode();
      }, time * j++);
      for (let i = 1; i < nodes.length; i++) {
        setTimeout(() => {
          nodes[i - 1].next.drawNode();
        }, time * j++);
        setTimeout(() => {
          nodes[i - 1].drawPointer();
        }, time * j++);
      }
    }
  }

  clearNode(node, metaData, color) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        node.ctx.clearRect(
          node.x - 1,
          node.y - 1,
          node.width + 2,
          node.height + 2
        );
        res(true);
      }, metaData.time);
      metaData.time += metaData.animationTime;
    });
  }
}

function Node(data) {
  this.data = data.data;
  this.next = null;
  this.x = data.x;
  this.y = data.y;
  this.color = data.color;
  this.ctx = data.context;
  this.width = data.width;
  this.height = data.height;
  this.isRemoved = false;
  this.drawNode = function (color) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color ? color : this.color;
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.font = `${this.height / 2}px serif`;
    this.ctx.fillText(this.data, this.x + 2, this.y + this.height / 1.5);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.moveTo(this.x + this.width - this.width / 5, this.y);
    this.ctx.lineTo(this.x + this.width - this.width / 5, this.y + this.height);
    this.ctx.stroke();
    if (false) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "white";
      this.ctx.arc(
        this.x + this.width - this.height / 7,
        this.y + this.height / 2,
        this.height / 7,
        0,
        2 * Math.PI
      );
      this.ctx.stroke();
    } else {
      this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.arc(
        this.x + this.width - this.height / 7,
        this.y + this.height / 2,
        this.height / 7,
        0,
        2 * Math.PI
      );
      this.ctx.fill();
    }
    this.ctx.closePath();
  };

  this.drawPointer = function (color) {
    if (this.next != null) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = color ? color : "white";
      this.ctx.moveTo(this.x + this.width, this.y + this.height / 2);
      this.ctx.lineTo(this.next.x, this.next.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  };

  this.clearPointer = function (color) {
    if (this.next != null) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = color;
      this.ctx.moveTo(this.x + this.width, this.y + this.height / 2);
      this.ctx.lineTo(this.next.x, this.next.y);
      this.ctx.stroke();
    }
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(
      this.x + this.width - this.height / 7,
      this.y + this.height / 2,
      this.height / 7,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  };
}
