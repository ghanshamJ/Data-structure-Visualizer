class BST {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new BSTNode(data);
    const metaData = {
      time: 1000,
      animationTime: 200,
      level: 6,
      currentLevel: 1,
    };
    if (this.root == null) {
      this.root = newNode;
      return this.drawInsert(newNode, metaData);
    } else if (this.root.data > newNode.data) {
      this.drawInsert(this.root, metaData);
      return this.insertRec(this.root, newNode, metaData);
    } else {
      this.drawInsert(this.root, metaData);
      return this.insertRec(this.root, newNode, metaData);
    }
    //console.log(this.root);
    // return Promise.resolve(true);
  }

  insertRec(rootNode, newNode, metaData) {
    if (rootNode.data > newNode.data) {
      if (rootNode.left == null) {
        newNode.x =
          rootNode.x -
          newNode.width -
          metaData.level *
            10 *
            ((metaData.level - metaData.currentLevel) / metaData.currentLevel);
        newNode.y = rootNode.y + newNode.height + metaData.level * 10;
        rootNode.left = newNode;
        return this.drawInsert(newNode, metaData);
      } else {
        this.drawInsert(rootNode.left, metaData);
        metaData.currentLevel += 1;
        return this.insertRec(rootNode.left, newNode, metaData);
      }
    } else {
      if (rootNode.right == null) {
        newNode.x =
          newNode.width +
          rootNode.x +
          metaData.level *
            10 *
            ((metaData.level - metaData.currentLevel) / metaData.currentLevel);
        newNode.y = rootNode.y + newNode.height + metaData.level * 10;
        rootNode.right = newNode;
        return this.drawInsert(newNode, metaData);
      } else {
        this.drawInsert(rootNode.right, metaData);
        metaData.currentLevel += 1;
        return this.insertRec(rootNode.right, newNode, metaData);
      }
    }
  }

  drawInsert(node, metaData) {
    const promise = new Promise((res, rej) => {
      setTimeout(() => {
        node.drawNode("red");
      }, metaData.time);
      metaData.time += metaData.animationTime;
      setTimeout(() => {
        node.drawNode("rgb(31,9,117)");
      }, metaData.time);
      metaData.time += metaData.animationTime;
      setTimeout(() => {
        node.drawLeftPointer("white");
      }, metaData.time);
      metaData.time += metaData.animationTime;
      setTimeout(() => {
        node.drawRightPointer("white");
        res(true);
      }, metaData.time);
      metaData.time += metaData.animationTime;
      //   if (node.left == null && node.right == null) {
      //     setTimeout(() => {
      //         res(true);
      //       }, metaData.time);

      //   } else if (node.left != null && node.right != null) {
      //     setTimeout(() => {
      //       node.drawLeftPointer("white");
      //     }, metaData.time);
      //     metaData.time += metaData.animationTime;
      //     setTimeout(() => {
      //       node.drawRightPointer("white");
      //       res(true);
      //     }, metaData.time);
      //     metaData.time += metaData.animationTime;
      //   } else if (node.left != null) {
      //     setTimeout(() => {
      //       node.drawLeftPointer("white");
      //       res(true);
      //     }, metaData.time);
      //     metaData.time += metaData.animationTime;
      //   } else {
      //     setTimeout(() => {
      //       node.drawRightPointer("white");
      //       res(true);
      //     }, metaData.time);
      //     metaData.time += metaData.animationTime;
      //   }
    });

    return promise;
  }

  search(value) {
    const metaData = {
      time: 1000,
      animationTime: 200,
      level: 7,
      currentLevel: 1,
    };
    return this.searchRec(this.root, value, metaData);
  }

  searchRec(rootNode, value, metaData) {
    if (rootNode.data == value) {
      return this.drawSearch(rootNode, metaData, "rgb(221, 5, 203)");
    }
    if (rootNode.data > value) {
      if (rootNode.left == null) {
        return this.drawSearch(rootNode, metaData);
      } else {
        this.drawSearch(rootNode, metaData);
        return this.searchRec(rootNode.left, value, metaData);
      }
    } else {
      if (rootNode.right == null) {
        return this.drawSearch(rootNode, metaData);
      } else {
        this.drawSearch(rootNode, metaData);
        return this.searchRec(rootNode.right, value, metaData);
      }
    }
  }

  drawSearch(node, metaData, color) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        node.drawNode("yellow");
      }, metaData.time);
      metaData.time += metaData.animationTime;
      setTimeout(() => {
        if (color) {
          node.drawNode(color);
        } else {
          node.drawNode("rgb(31,9,117)");
        }
      }, metaData.time);
      metaData.time += metaData.animationTime;
      setTimeout(() => {
        node.drawLeftPointer("white");
      }, metaData.time);
      metaData.time += metaData.animationTime;
      setTimeout(() => {
        node.drawRightPointer("white");
        res(true);
      }, metaData.time);
      metaData.time += metaData.animationTime;
    });
  }

  delete(value) {
    const metaData = {
      time: 1000,
      animationTime: 200,
      level: 7,
      currentLevel: 1,
    };
    if (this.root == null) {
      return Promise.resolve(false);
    } else if (this.root.left == null && this.root.right == null) {
      this.drawDelete(this.root, metaData);
      if (this.root.data == value) {
        this.drawDelete(this.root, metaData, "black");
        this.clearNode(this.root, metaData);
        return new Promise((res, rej) => {
          setTimeout(() => {
            this.root = null;
            res(true);
          }, metaData.time);
        });
      }else{
        return Promise.resolve(false);
      }
    } else {
      return this.deleteRec(this.root, null, value, metaData);
    }
  }

  deleteRec(rootNode, prevNode, value, metaData) {
    if (rootNode.data == value) {
      //leaf node deletion
      if (rootNode.left == null && rootNode.right == null) {
        //this.drawDelete(rootNode, metaData, "black");
        this.clearNode(rootNode, metaData, "black");
        if (prevNode.data > rootNode.data) {
          return new Promise((res, rej) => {
            setTimeout(() => {
              //this.drawDelete(prevNode, metaData);
              prevNode.clearLeftPointer("rgba(220, 220, 220, 1)");
              prevNode.clearLeftPointer("rgba(220, 220, 220, 1)");
              prevNode.left = null;
              res(true);
            }, metaData.time);
          });
        } else {
          return new Promise((res, rej) => {
            setTimeout(() => {
              //this.drawDelete(prevNode, metaData);
              prevNode.clearRightPointer("rgba(220, 220, 220, 1)");
              prevNode.clearRightPointer("rgba(220, 220, 220, 1)");
              prevNode.right = null;
              res(true);
            }, metaData.time);
          });
        }
        //this.drawDelete(rootNode, metaData, "black");
      }
      // both childs present
      else if (rootNode.left != null && rootNode.right != null) {
        this.drawDelete(rootNode, metaData);
        this.drawDelete(rootNode, metaData, "black");
        const obj = this.inorderRec(rootNode.right, rootNode, metaData);
        const successorNode = obj.successor;
        const succPrevNode = obj.successorPrev;
        //this.drawDelete(rootNode, metaData, "black");
        // this.drawDelete(succPrevNode, metaData, "red");
        this.drawDelete(successorNode, metaData, "black");
        setTimeout(() => {
          if (rootNode == succPrevNode) {
            rootNode.data = successorNode.data;
            rootNode.clearRightPointer("rgba(220, 220, 220, 1)");
            rootNode.clearRightPointer("rgba(220, 220, 220, 1)");
            successorNode.clearRightPointer("rgba(220, 220, 220, 1)");
            successorNode.clearRightPointer("rgba(220, 220, 220, 1)");
            rootNode.right = successorNode.right;
            successorNode.right = null;
          } else {
            rootNode.data = successorNode.data;
            succPrevNode.clearLeftPointer("rgba(220, 220, 220, 1)");
            succPrevNode.clearLeftPointer("rgba(220, 220, 220, 1)");
            successorNode.clearRightPointer("rgba(220, 220, 220, 1)");
            successorNode.clearRightPointer("rgba(220, 220, 220, 1)");
            succPrevNode.left = successorNode.right;
            successorNode.right = null;
          }
        }, metaData.time);
        metaData.time += metaData.animationTime;
        this.clearNode(successorNode, metaData, "black");
        if (rootNode != succPrevNode) {
          return this.drawDelete(succPrevNode, metaData, "rgb(31,9,117)");
        }
        return this.drawDelete(rootNode, metaData, "rgb(31,9,117)");
      }
      //only child present
      else {
        if (rootNode.left != null) {
          this.drawDelete(rootNode, metaData, "black");
          this.drawDelete(rootNode.left, metaData, "black");
          this.clearNode(rootNode.left, metaData, "black");
          new Promise((res, rej) => {
            setTimeout(() => {
              rootNode.clearLeftPointer("rgba(220, 220, 220, 1)");
              rootNode.clearLeftPointer("rgba(220, 220, 220, 1)");
              let tempNode = rootNode.left;
              tempNode.clearLeftPointer("rgba(220, 220, 220, 1)");
              tempNode.clearLeftPointer("rgba(220, 220, 220, 1)");
              tempNode.clearRightPointer("rgba(220, 220, 220, 1)");
              tempNode.clearRightPointer("rgba(220, 220, 220, 1)");
              rootNode.data = tempNode.data;
              rootNode.left = tempNode.left;
              rootNode.right = tempNode.right;

              console.log(rootNode);
              res(true);
            }, metaData.time);
          });
          metaData.time += metaData.animationTime;
          return this.drawDelete(rootNode, metaData, "rgb(31,9,117)");
        } else {
          this.drawDelete(rootNode, metaData, "black");
          this.drawDelete(rootNode.right, metaData, "black");
          this.clearNode(rootNode.right, metaData, "black");
          new Promise((res, rej) => {
            setTimeout(() => {
              rootNode.clearRightPointer("rgba(220, 220, 220, 1)");
              rootNode.clearRightPointer("rgba(220, 220, 220, 1)");
              let tempNode = rootNode.right;
              tempNode.clearLeftPointer("rgba(220, 220, 220, 1)");
              tempNode.clearLeftPointer("rgba(220, 220, 220, 1)");
              tempNode.clearRightPointer("rgba(220, 220, 220, 1)");
              tempNode.clearRightPointer("rgba(220, 220, 220, 1)");
              rootNode.data = tempNode.data;
              rootNode.left = tempNode.left;
              rootNode.right = tempNode.right;
              res(true);
            }, metaData.time);
          });
          metaData.time += metaData.animationTime;
          return this.drawDelete(rootNode, metaData, "rgb(31,9,117)");
        }
      }
    } else if (rootNode.data > value) {
      if (rootNode.left == null) {
        return this.drawDelete(rootNode, metaData);
      } else {
        this.drawDelete(rootNode, metaData);
        return this.deleteRec(rootNode.left, rootNode, value, metaData);
      }
    } else {
      if (rootNode.right == null) {
        return this.drawDelete(rootNode, metaData);
      } else {
        this.drawDelete(rootNode, metaData);
        return this.deleteRec(rootNode.right, rootNode, value, metaData);
      }
    }
  }

  inorderRec(rootNode, prevNode, metaData) {
    if (rootNode.left == null) {
      return { successor: rootNode, successorPrev: prevNode };
    }
    this.drawDelete(rootNode, metaData);
    return this.inorderRec(rootNode.left, rootNode, metaData);
  }

  drawDelete(node, metaData, color) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        node.drawNode("yellow");
      }, metaData.time);
      metaData.time += metaData.animationTime;
      setTimeout(() => {
        if (color) {
          node.drawNode(color);
        } else {
          node.drawNode("rgb(31,9,117)");
        }
      }, metaData.time);
      metaData.time += metaData.animationTime;
      setTimeout(() => {
        node.drawLeftPointer("white");
      }, metaData.time);
      metaData.time += metaData.animationTime;
      setTimeout(() => {
        node.drawRightPointer("white");
        res(true);
      }, metaData.time);
      metaData.time += metaData.animationTime;
    });
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
function BSTNode(data) {
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
    this.ctx.fillStyle = color ? color : this.color;
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.arc(
      this.x + this.height / 7,
      this.y + this.height / 2,
      this.height / 7,
      0,
      2 * Math.PI
    );
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.moveTo(this.x + this.width / 5, this.y);
    this.ctx.lineTo(this.x + this.width / 5, this.y + this.height);
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
    this.ctx.moveTo(this.x + this.width - this.width / 5, this.y);
    this.ctx.lineTo(this.x + this.width - this.width / 5, this.y + this.height);
    this.ctx.stroke();
    this.ctx.closePath();

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

    this.ctx.closePath();
  };

  this.drawRightPointer = function (color) {
    if (this.right != null) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = color ? color : "white";
      this.ctx.moveTo(this.x + this.width, this.y + this.height / 2);
      this.ctx.lineTo(this.right.x + this.right.width / 2, this.right.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  };

  this.drawLeftPointer = function (color) {
    if (this.left != null) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = color ? color : "white";
      this.ctx.moveTo(this.x, this.y + this.height / 2);
      this.ctx.lineTo(this.left.x + this.left.width / 2, this.left.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  };

  //   this.clearRightPointer = function (color) {
  //     if (this.right != null) {
  //       this.ctx.beginPath();
  //       this.ctx.lineWidth = 2;
  //       this.ctx.strokeStyle = color;
  //       this.ctx.moveTo(this.x + this.width, this.y + this.height / 2);
  //       this.ctx.lineTo(this.right.x, this.right.y);
  //       this.ctx.stroke();
  //     }
  //     this.ctx.closePath();
  //     this.ctx.beginPath();
  //     this.ctx.fillStyle = "red";
  //     this.ctx.arc(
  //       this.x + this.width - this.height / 7,
  //       this.y + this.height / 2,
  //       this.height / 7,
  //       0,
  //       2 * Math.PI
  //     );
  //     this.ctx.fill();
  //   };

  this.clearLeftPointer = function (color) {
    if (this.left != null) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = color;
      this.ctx.moveTo(this.x, this.y + this.height / 2);
      this.ctx.lineTo(this.left.x + this.left.width / 2, this.left.y);
      this.ctx.stroke();
    }
  };

  this.clearRightPointer = function (color) {
    if (this.right != null) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = color;
      this.ctx.moveTo(this.x + this.width, this.y + this.height / 2);
      this.ctx.lineTo(this.right.x + this.right.width / 2, this.right.y);
      this.ctx.stroke();
    }
  };
}
