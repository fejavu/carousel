function Carousel($ct) {
  this.init($ct);
  this.bind();
}

Carousel.prototype = {
  init:function($ct){
    this.$imgCt = $ct.find('.imgCt');
    this.$imgs = $ct.find('.imgCt>li');
    this.$forward = $ct.find('.forward');
    this.$back = $ct.find('.back');
    this.$dots = $ct.find('.dots span');
    this.$imgWidth = this.$imgs.width();
    this.$imgCount = this.$imgs.length;
    this.index = 0;
    this.isAnimate = false;
    
    this.$imgCt.append(this.$imgs.first().clone());
    this.$imgCt.prepend(this.$imgs.last().clone());
    
    this.$imgCt.css({'left':'-'+this.$imgWidth+'px'});
    
    this.$imgCt.width((this.$imgs.length + 2)*this.$imgs.width());
  },
  
  bind:function(){
    var _this = this;
    
    this.$forward.on('click',function(){
      _this.showNext(1);
    });
    
    this.$back.on('click',function(){
      _this.showPre(1);
    });
    
    this.$dots.on('click',function(){
      var index = $(this).index();
      if(index > _this.index) {
        _this.showNext(index - _this.index);
      }else {
        _this.showPre(_this.index - index);
      }
    });
    
  },
  
  showNext:function(len) {
    var _this = this;
    if(_this.isAnimate) return;
    _this.isAnimate = true;
    this.$imgCt.animate({
      'left':'-=' + _this.$imgWidth*len + 'px'
    }, function(){
      _this.index += len;
      if(_this.index === _this.$imgCount) {
        _this.$imgCt.css({'left': '-' + _this.$imgWidth + 'px'});
        _this.index = 0;
      }
      _this.setDots();
      _this.isAnimate = false;
    });
    
  },
  
  showPre:function(len) {
    var _this = this;
    if(_this.isAnimate) return;
    _this.isAnimate = true;
    this.$imgCt.animate({
      left:'+=' + _this.$imgWidth*len
    }, function(){
      _this.index -= len;
      if(_this.index < 0) {
        _this.$imgCt.css({'left': '-' + _this.$imgWidth*_this.$imgCount + 'px'});
        _this.index = _this.$imgCount - 1;
      }
      _this.setDots();
      _this.isAnimate = false;
    });
  },
  
  setDots:function() {
    var _this = this;
    this.$dots.eq(_this.index).addClass('active')
        .siblings().removeClass('active');
  },
  
};

var firstCarousel = new Carousel($('.carousel').eq(0));
var secondCarousel = new Carousel($('.carousel').eq(1));