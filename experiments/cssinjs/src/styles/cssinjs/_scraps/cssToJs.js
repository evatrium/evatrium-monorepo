// yoinked from goober
let newRule = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g;
let ruleClean = /\/\*[^]*?\*\/|\s\s+|\n/g;
export const cssStringToJss = (val) => {
  let tree = [{}],
    block;
  while ((block = newRule.exec(val.replace(ruleClean, '')))) {
    if (block[4]) tree.shift();
    if (block[3]) {
      tree.unshift((tree[0][block[3]] = tree[0][block[3]] || {}));
    } else if (!block[4]) {
      tree[0][block[1]] = block[2];
    }
  }
  return tree[0];
};
