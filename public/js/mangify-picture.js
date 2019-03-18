/*
  图片局部放大的功能：
    1. 能够放在任意的 div 中进行局部放大

  传入的参数：
    参数1：需要添加局部放大位置的元素
    参数2：小图片位置
    参数3、4：小图片显示区域的宽和高
    参数5：大图片位置
    参数6、7：大图片显示区域大小
    参数8：蒙版的宽度
    参数9：蒙版的高度

*/
window.mangify = function (el, smallImgSrc, smallImgWidth, smallImgHeight, bigImgSrc, bigImgWidth, bigImgHeight, maskWidth, maskHeight){

  // function Mangify(el, smallImgSrc, smallImgWidth, smallImgHeight, bigImgSrc, bigImgWidth, bigImgHeight, maskWidth, maskHeight) {
  //   this.el = el;
  //   // 小图片
  //   this.smallImgSrc = smallImgSrc;
  //   this.smallImgHeight = smallImgHeight;
  //   this.smallImgWidth = smallImgWidth;
  //   // 大图片
  //   this.bigImgSrc = bigImgSrc;
  //   this.bigImgHeight = bigImgHeight;
  //   this.bigImgWidth = bigImgWidth;
  //   // 蒙版大小
  //   this.maskHeight = maskHeight;
  //   this.maskWidth = maskWidth;
  // }





  // 需要添加局部放大图的位置
  var body = el;

  // 整个图片区域
  var pictureContainer = document.createElement('div');
  pictureContainer.setAttribute('id', 'picture-container');
  

  var wsmall = document.createElement('div');
  wsmall.setAttribute('id', 'wsmall');
  pictureContainer.appendChild(wsmall);

  // wsmall区域
  var smallImg = document.createElement('img');
  if (!smallImgSrc) {
    smallImg.src = './public/images/small.jpg';
  } else {
    smallImg.src = smallImgSrc;
  }
  wsmall.appendChild(smallImg);
  // wbig 区域
  var wbig = document.createElement('div');
  wbig.setAttribute('id', 'wbig');
  var bigImg = document.createElement('img');
  if (!bigImgSrc) {
    bigImg.src = './public/images/large.jpg';
  } else {
    bigImg.src = bigImgSrc;
  }
  wbig.appendChild(bigImg);

  wsmall.appendChild(wbig);

  body.appendChild(pictureContainer);


  // CSS 区域
  // 图片展示区域
  pictureContainerStyle = 'box-sizing: border-box;';
  pictureContainer.setAttribute('style', pictureContainerStyle);
  // 缩小图
  wsmallStyle = 'position: relative; ' +
                'border: 1px solid #bababa;';
  wsmall.setAttribute('style', wsmallStyle);
  if (!smallImgHeight && !smallImgWidth) {
    wsmall.style.width = '350' + 'px';
    wsmall.style.height = '350' + 'px';
  } else {
    wsmall.style.width = smallImgWidth + 'px';
    wsmall.style.height = smallImgHeight + 'px';
  }

  smallImgStyle = 'width: 100%;' +
                  'height: 100%;';
  smallImg.setAttribute('style', smallImgStyle);
  // 放大图
  wbigStyle = 'position: absolute; ' +
              'z-index: 3; ' +
              'top: 0; ' +
              'left: 100%; ' +
              'margin-left: 4px; ' +
              'overflow: hidden; ' +
              'display: none; ' +
              'border: 1px solid #0F9B4E; ';
  wbig.setAttribute('style', wbigStyle);
  bigImgStyle = 'width: 800px; ' +
                'height: 800px; ' +
                'position: relative;';
  if (!bigImgHeight && !bigImgWidth) {
    bigImg.style.width = 800 + 'px';
    bigImg.style.height = 800 + 'px';
  } else {
    bigImg.style.width = bigImgWidth + 'px';
    bigImg.style.height = bigImgHeight + 'px';
  }
  bigImg.setAttribute('style', bigImgStyle);
  // 蒙版区域
  wmaskStyle = 'position: absolute; ' +
               'z-Index: 2; ' +
               'width: 175px; ' +
               'height: 175px; ' +
               'box-sizing: border-box; ' +
               'background: #FEDE4F; ' +
               'border: 1px solid #dadada; ' +
               'opacity: 0.5; ' +
               'filter: alpha(opacity=50);';
    
  var ow = 350;
  var oh = 350;
  var mw = 175;
  var mh = 175;
  var bw = 800;
  var bh = 800;
  //计算放大容器的大小。
  var bigcw = (bw / ow) * mw;
  var bigch = (bh / oh) * mh;
  // 设置放大图片显示的区域大小
  // var wbig = document.getElementById('wbig');
  wbig.style.width = bigcw + 'px';
  wbig.style.height = bigch + 'px';

  // 绑定鼠标移动事件
  wsmall.addEventListener('mousemove', function(event) {
    var x = event.clientX;
    var y = event.clientY;
    var rect = this.getBoundingClientRect();
    var left = rect.left - document.documentElement.clientLeft;
    var top = rect.top - document.documentElement.clientTop;
    var offx = x - left;
    var offy = y - top;
    // wconsole.innerText = 'offsetX: ' + offx + ' --------- offsexY: ' + offy;
    // 显示蒙版区域
    var wmask = document.getElementById('wmask');
    // this.childNodes
    if (!wmask) {
      wmask = document.createElement('div');
      wmask.setAttribute('id', 'wmask');
      wmask.setAttribute('style', wmaskStyle);
      if (!maskHeight && !maskWidth) {
        wmask.style.width = 175 + 'px';
        wmask.style.height = 175 + 'px';
      } else {
        wmask.style.width = maskWidth + 'px';
        wmask.style.height = maskHeight + 'px';
      }
      this.appendChild(wmask);
    } else {
      wmask.style.display = 'block';
    }

    var mx = offx - mw / 2;
    var my = offy - mh / 2;
    if (mx < 0) { mx = 0; }
    if (mx > ow - mw) { mx = ow - mw; }
    if (my < 0) { my = 0; }
    if (my > oh - mh) { my = oh - mh; }
    wmask.style.left = mx + 'px';
    wmask.style.top = my + 'px';
    //大图的偏移位置
    var bx = -(bw / ow) * mx;
    var by = -(bh / oh) * my;
    wbig.firstElementChild.style.left = bx + 'px';
    wbig.firstElementChild.style.top = by + 'px';
    var wbigCSSDisplay = window.getComputedStyle(wbig).display;
    if (wbigCSSDisplay == 'none') {
      wbig.style.display = 'block';
    }
  });

  wsmall.addEventListener('mouseleave', function() {
    // 鼠标离开后隐藏大图片
    wbig.style.display = 'none';
    // 鼠标离开后隐藏蒙版
    var wmask = document.getElementById('wmask');
    if (wmask) {
      wmask.style.display = 'none';
    }
  });
};
  