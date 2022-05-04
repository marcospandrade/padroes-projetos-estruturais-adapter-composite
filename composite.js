function Node(name) {
    this.children = [];
    this.name = name;
}

Node.prototype = {
    add: function (child) {
        this.children.push(child);
    },

    hasChildren: function () {
        return this.children.length > 0;
    },

    getChild: function () {
        if (this.hasChildren) {
            traverse(1, this.name, this.children);
        } else {
            return this.name;
        }
    },

    remove: function (child) {
        if (!this.hasChildren) {
            return;
        }
        var listChildrenLength = this.children.length;
        for (var i = 0; i < listChildrenLength; i++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                return;
            }
        }
    }

    // getChild: function (i) {
    //     return this.children[i];
    // }
};

// recursively traverse a (sub)tree

function traverse(indent, name, childrenNode) {
    console.log(Array(indent++).join('--') + name);

    for (var i = 0, len = childrenNode.length; i < len; i++) {
        traverse(indent, childrenNode[i].name, childrenNode[i].children);
    }
}

function run() {
    var tree = new Node('root');
    var left = new Node('left');
    var right = new Node('right');
    var leftleft = new Node('leftleft');
    var leftright = new Node('leftright');
    var rightleft = new Node('rightleft');
    var rightright = new Node('rightright');

    tree.add(left);

    tree.add(right);
    tree.remove(right); // note: remove
    tree.add(right);

    left.add(leftleft);
    left.add(leftright);

    right.add(left);
    right.add(rightleft);
    right.add(rightright);

    rightleft.getChild();
}

run();
