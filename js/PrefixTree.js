class TreeNode {
  constructor() {
    this.keys = new Map();
    this.end = false;
    this.refs = [];
  }
  setEnd() {
    this.end = true;
  }
  isEnd() {
    return this.end;
  }
  addRef(item) {
    this.refs.push(item);
  }
  getRefs() {
    return this.refs;
  }
}

class PrefixTree {
  constructor() {
    this.root = new TreeNode();
  }
  add(input, node = this.root, ref) {
    const word = input.toUpperCase();
    if (word.length === 0) {
      node.setEnd();
      node.addRef(ref);
      return;
    }
    if (!node.keys.has(word[0])) {
      node.keys.set(word[0], new TreeNode());
      return this.add(word.substr(1), node.keys.get(word[0]), ref);
    }
    return this.add(word.substr(1), node.keys.get(word[0]), ref);
  }

  hasWord(input) {
    let word = input.toUpperCase();
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      }
      node = node.keys.get(word[0]);
      word = word.substr(1);
    }
    return !!(node.keys.has(word) && node.keys.get(word).isEnd());
  }

  suggest(input) {
    let word = input.toUpperCase();
    let node = this.root;
    const result = [];

    while (word.length >= 1) {
      if (!node.keys.has(word[0])) {
        return [];
      }
      node = node.keys.get(word[0]);
      word = word.substr(1);
    }

    function search(node, string) {
      if (node.keys.size !== 0) {
        for (const letter of node.keys.keys()) {
          if (result.length >= 10) {
            break;
          }
          search(node.keys.get(letter), letter);
        }
        if (node.isEnd()) {
          const refs = node.getRefs();
          const len = refs.length > 10 ? 9 : refs.length;
          for (let i = 0; i < len; i++) {
            result.push(refs[i]);
          }
        }
      } else {
        const refs = node.getRefs();
        const len = refs.length > 10 ? 9 : refs.length;
        for (let i = 0; i < len; i++) {
          result.push(refs[i]);
        }
      }
    }
    search(node, '');

    return result;
  }

  createFromArray(arr) {
    if (!Array.isArray(arr) && arr.length === 0) {
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      const words = arr[i].split(' ');
      for (let j = 0; j < words.length; j++) {
        this.add(words[j], this.root, i);
      }
    }
  }
}

export default PrefixTree;
