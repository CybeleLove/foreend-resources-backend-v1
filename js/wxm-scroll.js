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
    // 方向
    arrow: {
        UP: 'up', // 向上
        DOWN: 'down' // 向下
    },
    offset: 3, // 位移
    clsPrefix: 'wxm-scroll-', // class前缀
    dataIdPrefix: 'wxmScrollAuto_', // data-id前缀
    template: '<div class="wxm-scroll-vertical-box" data-target="#dataTarget#"><div class="wxm-scroll-top"><i class="fa fa-caret-up"></i><i class="fa fa-angle-up"></i></div><div class="wxm-scroll-middle"></div><div class="wxm-scroll-bottom"><i class="fa fa-angle-down"></i><i class="fa fa-caret-down"></i></div></div>'
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
         * 获取触发元素
         */
        getElement: function() {
            return that.$element;
        },
        /**
         * 获取触发元素高度
         */
        getElementHeight: function() {
            return that.$element.outerHeight();
        },
        /**
         * 获取触发元素margin-top
         */
        getElementMarginTop: function() {
            return parseInt(that.$element.css('margin-top').replace('px', ''));
        },
        /**
         * 获取滚动条容器
         */
        getScrollBox: function() {
            return that.$element.parents('.wxm-scroll');
        },
        /**
         * 获取滚动条容器高度
         */
        getScrollBoxHeight: function() {
            return this.getScrollBox().outerHeight();
        },
        /**
         * 获取滚动条顶部置顶按钮
         */
        getTopBtn: function() {
            return this.getScrollBox().find('div[data-target=' + this.getDataId() + '] > .wxm-scroll-top .fa-caret-up');
        },
        /**
         * 获取滚动条顶部图标高度
         */
        getTopIconHeight: function() {
            return this.getScrollBox().find('.wxm-scroll-top').outerHeight();
        },
        /**
         * 获取滚动条顶部向上按钮
         */
        getUpBtn: function() {
            return this.getScrollBox().find('div[data-target=' + this.getDataId() + '] > .wxm-scroll-top .fa-angle-up');
        },
        /**
         * 获取滚动条底部置底按钮
         */
        getBottomBtn: function() {
            return this.getScrollBox().find('div[data-target=' + this.getDataId() + '] > .wxm-scroll-bottom .fa-caret-down');
        },
        /**
         * 获取滚动条底部图标高度
         */
        getBottomIconHeight: function() {
            return this.getScrollBox().find('.wxm-scroll-bottom').outerHeight();
        },
        /**
         * 获取滚动条底部向下按钮
         */
        getDownBtn: function() {
            return this.getScrollBox().find('div[data-target=' + this.getDataId() + '] > .wxm-scroll-bottom .fa-angle-down');
        },
        /**
         * 获取滚动条图标总高度
         */
        getIconHeight: function() {
            return this.getTopIconHeight() + this.getBottomIconHeight();
        },
        /**
         * 获取触发元素滚动条父元素
         */
        getScrollParent: function() {
            return this.getScrollBox().find('.wxm-scroll-vertical-box');
        },
        /**
         * 获取触发元素滚动条父元素高度
         */
        getScrollParentHeight: function() {
            return this.getScrollParent().height();
        },
        /**
         * 获取触发元素滚动条滚动块
         */
        getScrollMiddle: function() {
            return this.getScrollBox().find('.wxm-scroll-middle');
        },
        /**
         * 获取滚动条滚动块元素top
         */
        getScrollTop: function() {
            return parseInt(this.getScrollMiddle().css('top').replace('px', ''));
        },
        /**
         * 获取滚动条滚动元素高度
         */
        calculateScrollHeight: function() {
            var scrollBoxHeight = this.getScrollBoxHeight();
            var eleHeight = this.getElementHeight();
            var scale = scrollBoxHeight / (eleHeight - scrollBoxHeight) + (scrollBoxHeight % (eleHeight - scrollBoxHeight) == 0 ? 0 : 1);
            return (scrollBoxHeight - this.getIconHeight()) * scale / (scale + 1);
        },
        /**
         * 获取滚动条滚动块与目标元素高度比例
         */
        getScrollScale: function() {
            return this.getElementHeight() / this.calculateScrollHeight();
        },
        /**
         * 获取滚动条预留高度
         */
        getRemainHeight: function() {
            return this.getScrollParentHeight() - this.getIconHeight() - this.getScrollMiddle().outerHeight();
        }
    };
    return tools;
};

// 滚动条初始化
wxm.Scroll.prototype.init = function() {
    var that = this;
    var tools = that.tools;
    var options = that.options;
    var $element = that.$element;
    var $parent = $element.parents('.wxm-scroll');
    var dataId = tools.getDataId();

    if (!$element.attr('data-id')) {
        // 给目标元素添加data-id
        $element.attr('data-id', dataId);
        // 给父元素添加滚动条子元素
        $parent.append('<!-- 滚动条元素目标对象为data-id:' + dataId + '的元素 -->').append(wxm.Scroll.DEFAULTS.template.replace('#dataTarget#', dataId));
        // 获取滚动条滚动块
        var $middle = tools.getScrollMiddle();
        // 获取滚动条置顶按钮
        var $topBtn = tools.getTopBtn();
        // 获取滚动条向上按钮
        var $upBtn = tools.getUpBtn();
        // 获取滚动条置底按钮
        var $bottomBtn = tools.getBottomBtn();
        // 获取滚动条向下按钮
        var $downBtn = tools.getDownBtn();
        // 获取滚动条滚动块高度
        var scrollHeight = tools.calculateScrollHeight();

        // 设置滚动块外间距
        $middle.css('margin-top', tools.getTopIconHeight() + 'px');
        $middle.css('margin-bottom', tools.getBottomIconHeight() + 'px');
        // 设置滚动块高度
        $middle.height(scrollHeight);

        // 滚动条滚动块鼠标事件
        $middle.off('mousedown.scroll.middle.data-api').on('mousedown.scroll.middle.data-api', function(event) {
            // 获取事件
            event = wxm.event.getEvent(event);
            // 对应的鼠标按钮[1:鼠标左键][2:鼠标中键(滚轮键)][3:鼠标右键]，只获取鼠标左键点击事件
            if (event.which != 1) return;
            // 事件触发目标
            var $target = $(event.target);
            // 鼠标距浏览器顶部Y坐标
            var clientY = event.clientY;
            // 遮罩层
            var $mask = $('<div class="wxm-scroll-mask" data-target="' + dataId + '"><div>');
            // 滚动条top
            var top = parseInt($target.css('top').replace('px', ''));

            // 鼠标距浏览器顶部Y坐标需减去滚动条top值
            clientY -= top;

            // 目标元素添加hover效果
            $target.addClass('hover');
            $target.parents('.wxm-scroll-vertical-box').addClass('hover');

            // 页面添加滚动条遮罩层
            $(document.body).append($mask);

            $mask.off('mousemove.scroll.middle.data-api').on('mousemove.scroll.middle.data-api', function(event) {
                // 获取事件
                event = wxm.event.getEvent(event);
                // 事件触发目标
                var $target = $(event.target);
                // 滚动条滚动块对应元素
                var $middle = tools.getScrollMiddle();
                // 获取滚动条top
                var top = event.offsetY - clientY;
                // 滚动条滚动块高度
                var scrollHeight = $middle.outerHeight();
                // 滚动条对应元素高度
                var elementHeight = $element.outerHeight();
                // 滚动条对应父元素高度
                var parentHeight = tools.getScrollParentHeight();
                // 比例
                var scale = elementHeight / scrollHeight;
                // 滚动条对应元素margin-top
                var elementMarginTop = 0;
                // 滚动条预留高度
                var remainHeight = tools.getRemainHeight();

                // 若滚动条top值小于0，则赋值为0
                if (top <= 0) {
                    top = 1;
                    elementMarginTop = 0;
                }
                // 若滚动条top值大于预留高度，则赋值为预留高度
                else if (top > remainHeight) {
                    top = remainHeight - 1 + 'px';
                    elementMarginTop = parentHeight - elementHeight + 'px';
                } else {
                    elementMarginTop = -(scale * top) + 'px';
                    top = top + 'px';
                }

                // 设置滚动条滚动块top值
                $middle.css('top', top);
                // 设置事件触发对应目标元素margin-top值
                $element.css('margin-top', elementMarginTop);
            }).off('mouseout.scroll.middle.data-api').on('mouseout.scroll.middle.data-api', function(event) {
                wxm.Scroll.mouseupOrMouseoutInMask(this);
            }).off('mouseup.scroll.middle.data-api').on('mouseup.scroll.middle.data-api', function(event) {
                wxm.Scroll.mouseupOrMouseoutInMask(this);
            });
            // 防止火狐浏览器，在点击滚动条后移动鼠标时，滚动块不移动
            event.preventDefault();
        });

        // 滚动条置顶按钮点击事件
        $topBtn.off('click.scroll.top.data-api').on('click.scroll.top.data-api', function(event) {
            // 获取事件
            event = wxm.event.getEvent(event);
            // 对应的鼠标按钮[1:鼠标左键][2:鼠标中键(滚轮键)][3:鼠标右键]，只获取鼠标左键点击事件
            if (event.which != 1) return;
            // 设置滚动条滚动块top值
            $middle.css('top', '1px');
            // 设置事件触发对应目标元素margin-top值
            $element.css('margin-top', 0);
        });

        // 滚动条置底按钮点击事件
        $bottomBtn.off('click.scroll.bottom.data-api').on('click.scroll.bottom.data-api', function(event) {
            // 获取事件
            event = wxm.event.getEvent(event);
            // 对应的鼠标按钮[1:鼠标左键][2:鼠标中键(滚轮键)][3:鼠标右键]，只获取鼠标左键点击事件
            if (event.which != 1) return;
            // 设置滚动条滚动块top值
            $middle.css('top', tools.getRemainHeight() - 1 + 'px');
            // 设置事件触发对应目标元素margin-top值
            $element.css('margin-top', tools.getScrollParentHeight() - $element.outerHeight() + 'px');
        });


        // 滚动条向上按钮点击事件
        $upBtn.off('mousedown.scroll.up.data-api').on('mousedown.scroll.up.data-api', function(event) {
            // 获取事件
            event = wxm.event.getEvent(event);
            // 对应的鼠标按钮[1:鼠标左键][2:鼠标中键(滚轮键)][3:鼠标右键]，只获取鼠标左键点击事件
            if (event.which != 1) return;
            // 事件触发目标
            var $target = $(event.target);
            // 鼠标点击滚动条向上按钮事件
            var interval = setInterval(function() {
                wxm.Scroll.mousedownOrClickInArrowIcon($target, options.arrow.UP);
            }, 80);
            // 按钮存放定时器值
            $target.attr('data-interval', interval);
        }).off('mouseup.scroll.up.data-api').on('mouseup.scroll.up.data-api', function(event) {
            // 获取事件
            event = wxm.event.getEvent(event);
            // 对应的鼠标按钮[1:鼠标左键][2:鼠标中键(滚轮键)][3:鼠标右键]，只获取鼠标左键点击事件
            if (event.which != 1) return;
            // 事件触发目标
            var $target = $(event.target);
            // 鼠标点击滚动条事件
            var interval = $target.attr('data-interval');
            // 取消定时器
            clearInterval(interval);
        });

        // 滚动条向下按钮点击事件
        $downBtn.off('mousedown.scroll.down.data-api').on('mousedown.scroll.down.data-api', function(event) {
            // 获取事件
            event = wxm.event.getEvent(event);
            // 对应的鼠标按钮[1:鼠标左键][2:鼠标中键(滚轮键)][3:鼠标右键]，只获取鼠标左键点击事件
            if (event.which != 1) return;
            // 事件触发目标
            var $target = $(event.target);
            // 鼠标点击滚动条向下按钮事件
            var interval = setInterval(function() {
                wxm.Scroll.mousedownOrClickInArrowIcon($target, options.arrow.DOWN);
            }, 80);
            // 按钮存放定时器值
            $target.attr('data-interval', interval);
        }).off('mouseup.scroll.down.data-api').on('mouseup.scroll.down.data-api', function(event) {
            // 获取事件
            event = wxm.event.getEvent(event);
            // 对应的鼠标按钮[1:鼠标左键][2:鼠标中键(滚轮键)][3:鼠标右键]，只获取鼠标左键点击事件
            if (event.which != 1) return;
            // 事件触发目标
            var $target = $(event.target);
            // 鼠标点击滚动条事件
            var interval = $target.attr('data-interval');
            // 取消定时器
            clearInterval(interval);
        });
    }
};


// 刷新滚动条
wxm.Scroll.prototype.refresh = function() {
    // 当前域
    var that = this;
    // 滚动条工具
    var tools = that.tools;
    // 当前对象元素
    var $element = that.$element;
    // 获取滚动条滚动块
    var $middle = tools.getScrollMiddle();
    // 获取滚动条滚动块高度
    var scrollHeight = tools.calculateScrollHeight();
    // 获取滚动条滚动块与目标元素高度比例
    var scale = tools.getScrollScale();
    // 滚动条对应元素高度
    var elementHeight = tools.getElementHeight();
    // 滚动条对应父元素高度
    var parentHeight = tools.getScrollParentHeight();
    // 获取滚动条对应元素margin-top
    var elementMarginTop = tools.getElementMarginTop();
    // 获取滚动条滚动块top
    var top = -(elementMarginTop / scale);

    // 设置滚动条高度
    $middle.height(scrollHeight);

    // 获取滚动条预留高度
    var remainHeight = tools.getScrollParentHeight() - tools.getIconHeight() - $middle.outerHeight();

    // 若滚动条top值小于0，则赋值为0
    if (top <= 0) {
        top = 1;
        elementMarginTop = 0;
    }
    // 若滚动条top值大于预留高度，则赋值为预留高度
    else if (top > remainHeight) {
        top = remainHeight - 1 + 'px';
        elementMarginTop = parentHeight - elementHeight + 'px';
    } else {
        elementMarginTop = -(scale * top) + 'px';
        top = top + 'px';
    }

    // 设置滚动条top值
    $middle.css('top', top);
    // 设置事件触发对应目标元素margin-top值
    $element.css('margin-top', elementMarginTop);
};

// 鼠标点击滚动条位移按钮事件
wxm.Scroll.mousedownOrClickInArrowIcon = function($target, arrow) {

    // 若方向为空，则退出
    if (!arrow) {
        return;
    }

    // 滚动条容器
    var $box = $target.parents('.wxm-scroll');
    // 事件触发对应目标元素data-id
    var dataId = $box.find('.wxm-scroll-vertical-box').attr('data-target');
    // 事件触发对应目标元素
    var $element = $box.find('[data-id="' + dataId + '"]');
    // 事件触发对应目标元素data，及初始化选项、工具
    var data = $element.data('wxm.scroll'),
        options = data.options,
        tools = data.tools;
    // 滚动条滚动块对应元素
    var $middle = tools.getScrollMiddle();
    // 滚动条滚动块top
    var top = tools.getScrollTop();
    // 滚动条滚动块高度
    var scrollHeight = tools.calculateScrollHeight();
    // 滚动条对应元素高度
    var elementHeight = tools.getElementHeight();
    // 滚动条对应父元素高度
    var parentHeight = tools.getScrollParentHeight();
    // 比例
    var scale = elementHeight / scrollHeight;
    // 事件触发对应目标元素margin-top
    var elementMarginTop = 0;
    // 滚动条预留高度
    var remainHeight = tools.getRemainHeight();

    // 设置位移
    if (arrow == options.arrow.UP) {
        top -= options.offset;
    } else if (arrow == options.arrow.DOWN) {
        top += options.offset;
    }

    // 若滚动条top值小于0，则赋值为0
    if (top <= 0) {
        top = 1;
        elementMarginTop = 0;
    }
    // (*基本不会执行*)若滚动条top值大于预留高度，则赋值为预留高度
    else if (top > remainHeight) {
        top = remainHeight - 1 + 'px';
        elementMarginTop = parentHeight - elementHeight + 'px';
    } else {
        elementMarginTop = -(scale * top) + 'px';
        top = top + 'px';
    }

    // 设置滚动条滚动块top值
    $middle.css('top', top);
    // 设置事件触发对应目标元素margin-top值
    $element.css('margin-top', elementMarginTop);
};

// 遮罩层鼠标放开或鼠标离开滚动条事件
wxm.Scroll.mouseupOrMouseoutInMask = function(_this) {
    // 获取当前对象
    var $thiz = $(_this);
    // 当前对象对应目标滚动条data-id
    var dataId = $thiz.attr('data-target');
    // 事件触发对应目标元素
    var $box = $('.wxm-scroll-vertical-box[data-target=' + dataId + ']');
    // 删除滚动条hover效果
    $box.removeClass('hover');
    $box.find('.wxm-scroll-middle').removeClass('hover');
    // 删除当前对象
    $thiz.remove();
};

// 滚动条渲染
wxm.Scroll.draw = function(_this) {
    var $thiz = $(_this);
    var $parent = $thiz.parents('.wxm-scroll');
    var selfId = $thiz.attr('id') || $thiz.attr('data-id');
    // 定时器计数器，防止页面初始化完成之前，所需元素高度未确定
    var index = 1;

    var interval = setInterval(function() {
        // 执行次数大于5次则停止定时器
        if (index > 5) {
            clearInterval(interval);
        }
        index++;

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
        // 取消定时器
        clearInterval(interval);
    }, 10);
};

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
$('.wxm-scroll').on('mousewheel DOMMouseScroll', function(e) {
    // 鼠标滚轮
    var isUp = wxm.event.isUp(e);

    $('.wxm-console').html(isUp ? 'up' : 'down');

});

// 鼠标滚动事件
$('.wxm-scroll').on('mousewheel DOMMouseScroll', function(e) {
    // 当前对象
    var $this = $(this);

    if (!$this.find('[data-toggle="scroll"]').attr('data-id')) return;

    // 鼠标滚轮方向是否向上
    var isUp = wxm.event.isUp(e);
    // 目标icon对象
    var $target;
    // 鼠标滚轮方向
    var arrow = isUp ? wxm.Scroll.DEFAULTS.arrow.UP : wxm.Scroll.DEFAULTS.arrow.DOWN;

    if (isUp) {
        $target = $this.find('.wxm-scroll-vertical-box .wxm-scroll-top .fa-angle-up');
    } else {
        $target = $this.find('.wxm-scroll-vertical-box .wxm-scroll-bottom .fa-angle-down');
    }
    wxm.Scroll.mousedownOrClickInArrowIcon($target, arrow);
});