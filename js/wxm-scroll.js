// 生成Tab页面命名空间
wxm.namespace('wxm.Scroll');
wxm.Scroll = function(element, options) {
    this.$element = $(element);
    this.options = options;
    this.tools = this.TOOLS();

    this.init();
};

// 滚动条计数，用于赋值data-id
wxm.Scroll.index = 1;

wxm.Scroll.DEFAULTS = {
    clsPrefix: 'wxm-scroll-', // class前缀
    dataIdPrefix: 'wxmScrollAuto_', // data-id前缀
    template: '<div class="wxm-scroll-vertical-box" data-target="#dataTarget#"><div class="wxm-scroll-top"><i class="fa fa-caret-up"></i><i class="fa fa-angle-up"></i></div><div class="wxm-scroll-middle"></div><div class="wxm-scroll-bottom"><i class="fa fa-angle-down"></i><i class="fa fa-caret-down"></i></div></div>',
    iconHeight: 23 * 2 // 滚动条图标高度
};

// 滚动条工具
wxm.Scroll.prototype.TOOLS = function() {
    var that = this;
    var tools = {
        getDefaults: function() {
            return wxm.Scroll.DEFAULTS;
        },
        /**
         * 获取目标元素data-id
         */
        getDataId: function() {
            return that.$element.attr('data-id') || wxm.Scroll.DEFAULTS.dataIdPrefix + (that.$element.attr('id') || wxm.Scroll.index++);
        },
        /**
         * 获取触发元素高度
         */
        getElementHeight: function() {
            return that.$element.outerHeight();
        },
        /**
         * 获取触发元素父元素高度
         */
        getParentHeight: function() {
            return that.$element.parent().outerHeight();
        },
        /**
         * 获取滚动条滚动元素高度
         */
        getScrollHeight: function() {
            var parentHeight = this.getParentHeight();
            var eleHeight = this.getElementHeight();
            var scale = parentHeight / (eleHeight - parentHeight) + (parentHeight % (eleHeight - parentHeight) == 0 ? 0 : 1);
            return (parentHeight - wxm.Scroll.DEFAULTS.iconHeight) * scale / (scale + 1);
        },
        /**
         * 获取滚动条预留高度
         */
        getRemainHeight: function() {
            return this.getParentHeight() - wxm.Scroll.DEFAULTS.iconHeight - this.getScrollHeight();
        }
    };
    return tools;
};

// 滚动条初始化
wxm.Scroll.prototype.init = function() {
    var that = this;
    var tools = that.tools;
    var $element = that.$element;
    var $parent = $element.parent();
    var dataId = tools.getDataId();

    if (!$element.attr('data-id')) {
        // 给目标元素添加data-id
        $element.attr('data-id', dataId);
        // 给父元素添加滚动条子元素
        $parent.append('<!-- 滚动条元素目标对象为data-id:' + dataId + '的元素 -->').append(wxm.Scroll.DEFAULTS.template.replace('#dataTarget#', dataId));
        // 获取滚动条滚动块
        var $middle = $parent.find('div[data-target=' + dataId + '] > .wxm-scroll-middle');
        // 获取滚动条高度
        var scrollHeight = tools.getScrollHeight();
        // 设置滚动快高度
        $middle.height(scrollHeight);
    }


    // 

    // $parent.on('mousewheel DOMMouseScroll', function(e) {

    // });
    $middle.off('mousedown.scroll.middle.data-api').on('mousedown.scroll.middle.data-api', function(event) {
        event = wxm.event.getEvent(event);
        if (event.which != 1) return;
        var $target = $(event.target);
        var offsetY = event.offsetY;

        $(document).off('mousemove.scroll.middle.data-api').on('mousemove.scroll.middle.data-api', function(event) {
            var top = event.offsetY - offsetY;
            var remainHeight = tools
            if (top < 0) {
                top = 0;
            } else if (top > remainHeight) {
                top = remainHeight;
            }
            $middle.off('mousedown.scroll.middle.data-api').on('mousedown.scroll.middle.data-api', function(event) {
                // 获取事件
                event = wxm.event.getEvent(event);
                // 滚动条滚动块触发生成元素
                var $mask = $('<div class="wxm-scroll-mask"></div>');
                // 鼠标距离触发元素顶端距离
                var eventOffset = event.offsetY;
                // 触发元素top值
                var moddleTop = $(event.target).css('top').replace('px', '');
                // 触发元素top值为零时，距离浏览器顶端距离
                var eventTop = event.pageY - eventOffset - middleTop;


                $(document.body).append('<!-- 滚动条滚动块点击生成元素 -->').append($mask);


                $mask.html('pageY:' + event.pageY + ' offset:' + event.offsetY + 'client:' + event.clientY + 'top:' + moddleTop); // TODO

                // 鼠标移动事件
                $(document).off('mousemove.scroll.document.data-api').on('mousemove.scroll.document.data-api', function(event) {
                    $mask.html('pageY:' + event.pageY + ' offset:' + event.offsetY + 'client:' + event.clientY); // TODO

                    event.preventDefault();
                }).off('mouseup.scroll.middle.data-api').on('mouseup.scroll.middle.data-api', function(event) {
                    $('.wxm-scroll-mask').remove();
                });
            });
            $target.css('top', top + 'px');
            //getMousePos(event);
            //$('.wxm-console').html('offsetY:' + offsetY + ' top:' + top + 'pageY:' + event.pageY + ' new-offsetY:' + event.offsetY);
            $('.wxm-console').html('buttons:' + event.buttons);
            //console.dir(event);
        }).off('mouseout.scroll.middle.data-api').on('mouseout.scroll.middle.data-api', function(event) {
            $(document).off('mousemove.scroll.middle.data-api');
            //$middle.off('mousedown.scroll.middle.data-api');
        });
        event.preventDefault();
    });
    /*
        $target.off('mouseup.scroll.middle.data-api').on('mouseup.scroll.middle.data-api', function(event) {
            $target.off('mousemove.scroll.middle.data-api');
            event.preventDefault();
        });*/

};


// 刷新滚动条
wxm.Scroll.prototype.refresh = function() {
    // 当前域
    var that = this;
    // 滚动条工具
    var tools = that.tools;
    // 当前对象元素
    var $element = that.$element;
    // 当前对象父元素
    var $parent = $element.parent();
    // 当前对象data-id
    var dataId = tools.getDataId();
    // 获取滚动条滚动块
    var $middle = $parent.find('div[data-target=' + dataId + '] > .wxm-scroll-middle');
    // 获取滚动条高度
    var scrollHeight = tools.getScrollHeight();
    // 设置滚动快高度
    $middle.height(scrollHeight);
    console.log('scrollHeight:' + scrollHeight + ' eleHeight:' + tools.getElementHeight() + ' parentHeight:' + tools.getParentHeight() + ' iconHeight:' + (wxm.Scroll.DEFAULTS.iconHeight * 2) + ' remainHeight:' + tools.getRemainHeight());
};

// 滚动条渲染
wxm.Scroll.draw = function(_this) {
    var $thiz = $(_this);
    var $parent = $thiz.parent();
    var selfId = $thiz.attr('id') || $thiz.attr('data-id');

    setTimeout(function() {
        $('.wxm-console').html('outerHeight' + $thiz.outerHeight() + ' parentHeight' + $parent.height());
        // 目标元素高度小于父容器
        if ($thiz.outerHeight() <= $parent.height()) {
            // 删除目标元素对应的滚动条data-id
            if ($thiz.attr('data-id') && $thiz.attr('data-id').startsWith(wxm.Scroll.DEFAULTS.dataIdPrefix)) {
                $thiz.removeAttr('data-id');
            }
            // 删除目标元素对应滚动条元素
            if ('undefined' != typeof($parent.find('div[data-target^=' + wxm.Scroll.DEFAULTS.dataIdPrefix + ']'))) {
                $parent.find('div[data-target^=' + wxm.Scroll.DEFAULTS.dataIdPrefix + ']').remove();
            }
            // 删除目标元素data
            $thiz.removeData('wxm.scroll');
            return;
        }

        // 若目标元素的id或data-id存在
        if (!selfId) {
            // 生成滚动条
            $thiz.scroll();
        } else {
            // 刷新滚动条（尺寸）
            $thiz.scroll('refresh');
        }

    }, 20);
};

function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    $('.wxm-console').html('x' + x + ' y' + y);
}

// SCROLL PLUGIN DEFINITION
// =======================
function Plugin(option, _relatedTarget) {
    return this.each(function() {
        var $this = $(this);
        var data = $this.data('wxm.scroll');
        var options = $.extend({}, wxm.Scroll.DEFAULTS, $this.data(), typeof option == 'object' && option);

        if (!data) $this.data('wxm.scroll', (data = new wxm.Scroll(this, options)));
        if (typeof option == 'string') data[option](_relatedTarget);
    });
}

var old = $.fn.scroll;

$.fn.scroll = Plugin;
$.fn.scroll.Constructor = wxm.Scroll;

// NAVTAB NO CONFLICT
// =================

$.fn.scroll.noConflict = function() {
    $.fn.scroll = old;
    return this;
};

// APPLY TO STANDARD SCROLL ELEMENTS
// ===================================
// 给指定元素初始渲染滚动条
$(document).find('[data-toggle="scroll"]').each(function() {
    wxm.Scroll.draw(this);
});

// 鼠标滚动事件
// $('.wxm-scroll').on('mousewheel DOMMouseScroll', function(e) {
//     var isUp = wxm.event.isUp(e);
//     $('.wxm-console').html(isUp ? 'up' : 'down');
// });