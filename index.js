var onClap = require('clap.js');
var colors = ['#58A55C', '#5186EC', '#D95040', '#F2BD42'];
var levelStep = 42;
var initialRadius = 100;
var getData = require('./data.js');
var tree = {
  children: [getData()],
  path: '0',
};

var orderedChildren = makeOrderedChildren(tree);
var getSunBurstPath = require('./get-sunburst-path.js');

var sceneContent = getSunBurstPath(tree.children[0], {
  wrap: true,
  colors: colors,
  levelStep: levelStep,
  initialRadius: initialRadius,
  // Rotate it a bit, so that part 0 starts at the top.
  startAngle: -Math.PI / 2,
  stroke: 'white',
  centerText: 'Click Here',
  beforeArcClose: beforeArcClose,
  beforeLabelClose: beforeLabelClose
});

var scene = document.body.querySelector('.diagram-container');
scene.innerHTML = sceneContent;

var tooltipManager = createTooltipManager(document.querySelector('.tooltip'));
var textReader = createTextReader(document.querySelector('.content'));

document.body.addEventListener('mousemove', handleMouseMove);
onClap(document.body, handleMouseClick);
// document.body.addEventListener('click', handleMouseClick);
document.querySelector('.close').addEventListener('click', closeDetails);

function closeDetails() {
  textReader.hide();
}

function beforeArcClose(child) {
  var level = child.path.split(':').length;
  return {
    'class': 'arc level-' + level
  }
}

function beforeLabelClose() {
  return {
    text: {
      dy: 5,
      fill: 'white'
    }
  }
}

function handleMouseClick(e) {
  var path = e.target.getAttribute('data-path');
  if (!path) {
    return;
  }
  e.preventDefault();

  var treeElement = getTreeElementByPath(path);
  textReader.show(treeElement);
  tooltipManager.hide();
}

function createTextReader(domEl) {
  var header = domEl.querySelector('h3');
  var content = domEl.querySelector('.details');
  var prevBtn = document.querySelector('.prev');
  var nextBtn = document.querySelector('.next');

  return {
    show: show,
    hide: hide
  };

  function show(tree) {
    document.body.classList.add('content-open');
    domEl.style.display = 'flex';
    var htmlContent = tree.html;
    if (tree.renderToC) {
      htmlContent += renderToC(tree);
    }
    content.innerHTML = htmlContent
    header.innerText = tree.name;
    content.parentElement.scrollTop = 0;

    var next = orderedChildren.getNext(tree)
    if (!next) next = tree;
    if (next) {
      nextBtn.style.display = 'block';
      nextBtn.innerText = 'Next';
      nextBtn.setAttribute('data-path', next.path);
    } else {
      nextBtn.style.display = 'none';
    }

    var prev = orderedChildren.getPrev(tree);
    if (prev) {
      prevBtn.style.display = 'block';
      prevBtn.innerText = 'Prev';
      prevBtn.setAttribute('data-path', prev.path);
    } else {
      prevBtn.style.display = 'none';
    }

  }
  function hide() {
    domEl.style.display = 'none';
    document.body.classList.remove('content-open');
  }
}

function renderToC(root) {
  var content = ['<ul>'];
  root.children.forEach(function(child) {
    content.push(
      '<li><a href="#" class="no-tooltip" data-path="' + child.path + '">' + child.name + '</a></li>'
    )
  })
  content.push('</ul>')
  return content.join('\n');
}

function handleMouseMove(e) {
  var path = e.target.getAttribute('data-path');
  if (!path || e.target.classList.contains('no-tooltip')) {
    tooltipManager.hide();
    return;
  }
  
  var treeElement = getTreeElementByPath(path);
  tooltipManager.showTooltip(treeElement, e);
}

function createTooltipManager(domEl) {
  var tooltipWidth = 300;
  var lastText;
  var height = 0;
  var hidden = true;

  return {
    showTooltip: showTooltip,
    hide: hide
  };

  function hide() {
    domEl.style.display = 'none';
    hidden = true;
  }

  function showTooltip(tree, e) {
    if (hidden) {
      domEl.style.display = 'block';
      hidden = false;
    }
    if (lastText !== tree.name) {
      domEl.innerText = tree.name;
      lastText = tree.name;
      height = domEl.getBoundingClientRect().height;
    }
    var x = e.clientX - tooltipWidth / 2;
    if (x + tooltipWidth > window.innerWidth) {
      x = window.innerWidth - tooltipWidth;
    }
    if (x < 0) x = 0;

    var y = e.clientY - height;
    if (y < 0) y = 0;

    domEl.style.left = x + 'px';
    domEl.style.top = y + 'px';
  }
}

function getTreeElementByPath(path) {
  var root = tree;

  path.split(':').forEach(function (idx) {
    root = root.children[idx];
  });

  return root;
}

function makeOrderedChildren(tree) {
  var lookup = new Map();
  var treeMemory = [];
  memorizeTree(tree);

  return {
    getNext: getNext,
    getPrev: getPrev
  };

  function getNext(treeElement) {
    return advance(treeElement, 1);
  }

  function getPrev(treeElement) {
    return advance(treeElement, -1)
  }

  function advance(treeElement, dx) {
    var idx = lookup.get(treeElement) + dx;
    if (!Number.isFinite(idx)) return;
    if (idx < 0 || idx >= treeMemory.length) return;
    return treeMemory[idx];
  }

  function memorizeTree(tree) {
    if (tree.startAngle !== 0) {
      treeMemory.push(tree);
      lookup.set(tree, treeMemory.length - 1);
    }
    if (tree.children) {
      tree.children.forEach(memorizeTree);
    }
  }
}
