/**
 * Copyright 2018 Andrei Kashcha (http://github.com/anvaka)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
module.exports = getSunBurstPath;

/**
 * For a given tree, builds SVG path that renders SunBurst
 * diagram
 * 
 * @param {Object} tree - a regular javascript object with single
 * property: tree.children - array of tree-children.
 * 
 * @param {Object} options - see below.
 */
function getSunBurstPath(tree, options) {
  // TODO: Validate options
  options = options || {};

  // Radius of the inner circle.
  var initialRadius = options.initialRadius;
  // width of a single level
  var levelStep = options.levelStep;
  // Array of colors. Applied only on the top level.
  var colors = options.colors;

  // Initial rotation of the circle in radians.
  var startAngle = options.startAngle || 0;

  // Below is implementation.
  var totalLeaves = countLeaves(tree);
  var pathElements = [];
  pathElements.push(circle(initialRadius));

  var level = 1;

  var path = '0';
  tree.path = path; // TODO: Don't really need to do this.
  tree.children.forEach(function (child, i) {
    var da = 2 * Math.PI * child.leaves / totalLeaves;
    var endAngle = startAngle + da;
    var arcPath = pieSlice(initialRadius, level * levelStep, startAngle, endAngle);
    var thisPath = path + ':' + i;
    child.path = thisPath;
    var baseColor = colors[i % colors.length];
    pathElements.push(arc(arcPath, baseColor, 0, thisPath));

    drawChildren(startAngle, endAngle, child, pathElements, level, baseColor, thisPath);

    startAngle += da;
  });

  return pathElements.join('\n');

  function drawChildren(startAngle, endAngle, tree, pathElements, level, color, path) {
    if (!tree.children) return;

    var arcLength = Math.abs(startAngle - endAngle);
    var totalLeaves = tree.leaves;
    tree.children.forEach(function (child, i) {
      var da = arcLength * child.leaves / totalLeaves;
      var endAngle = startAngle + da;
      var arcPath = pieSlice(initialRadius + level * levelStep, levelStep, startAngle, endAngle);
      var thisPath = path + ':' + i;
      child.path = thisPath;
      pathElements.push(arc(arcPath, color, level, thisPath));

      drawChildren(startAngle, endAngle, child, pathElements, level + 1, color, thisPath);

      startAngle += da;
    });
  }
}

function polarToCartesian(centerX, centerY, radius, angle) {
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  };
}

function arcSegment(radius, startAngle, endAngle) {
  var forward = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var cx = 0;
  var cy = 0;

  var start = polarToCartesian(cx, cy, radius, startAngle);
  var end = polarToCartesian(cx, cy, radius, endAngle);
  var da = Math.abs(startAngle - endAngle);
  var flip = da > Math.PI ? 1 : 0;
  var d = ["M", start.x, start.y, "A", radius, radius, 0, flip, forward, end.x, end.y].join(" ");

  return {
    d: d,
    start: start,
    end: end
  };
}

function pieSlice(r, width, startAngle, endAngle) {
  var inner = arcSegment(r, startAngle, endAngle);
  var out = arcSegment(r + width, endAngle, startAngle, 0);
  return inner.d + 'L' + out.start.x + ' ' + out.start.y + out.d + 'L' + inner.start.x + ' ' + inner.start.y;
}

function circle(r) {
  // TODO: Don't hard-code fill?
  return '<circle r=' + r + ' cx=0 cy=0 fill="#fafafa" data-path="0"></circle>';
}

function arc(pathData, color) {
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var path = arguments[3];

  // TODO: don't hard-code colors.
  return '<path d="' + pathData + '" stroke="white" fill="' + color + '" class="arc level-' + level + '" data-path="' + path + '"></path>';
}

function countLeaves(treeNode) {
  if (treeNode.leaves) return treeNode.leaves;

  var leaves = 0;
  if (treeNode.children) {
    treeNode.children.forEach(function (child) {
      leaves += countLeaves(child);
    });
  } else {
    leaves = 1;
  }
  treeNode.leaves = leaves;
  return leaves;
}