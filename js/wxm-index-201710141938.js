/**
 * 页面DOM结构加载完后执行
 */

$(function() {
    // 设置页面布局
    wxm.resize.index();
    // 初始化左侧菜单栏
    wxm.aside.init();
    // 开启提示工具
    $('[data-toggle="tooltip"]').tooltip();
});

/**
 * 浏览器尺寸改变时触发
 * jQuery的$(window).resize()只能获取放大的触发事件
 */
window.onresize = function() {
    // 设置页面布局
    setTimeout(function() {
        wxm.resize.index();
    }, 80);
};

// 生成重置尺寸命名空间
wxm.namespace(wxm.resize);
wxm.resize = {
    /**
     * 设置页面尺寸布局
     */
    index: function() {
        // 获取主区域对象
        var $wrapper = $('.wxm-wrapper');
        // 隐藏主区域，以便精准算出相应容器高度
        $wrapper.hide();

        // 文档高度
        var winHeight = $(window).height();
        // 导航高度
        var navHeight = $('body>nav').outerHeight();
        // 文档页脚高度
        var footerHeight = $('body>footer').outerHeight();

        // 设置内容区域高度
        $wrapper.height(winHeight - navHeight - footerHeight);
        // 显示主区域
        $wrapper.show();

        // 设置主区域内部尺寸布局
        wxm.resize.wrapper();

        /* $('.wxm-console').html('winHeight:' + winHeight + '<br>navHeight:' + navHeight +
             '<br>footerHeight:' + footerHeight + '<br>wrapper:' + $('.wxm-wrapper').height());*/
    },
    /**
     * 首页主区域内部尺寸布局
     */
    wrapper: function() {
        // 获取内容区域对象
        var $container = $('.wxm-container');
        // 获取侧边菜单栏对象
        var $aside = $('.wxm-aside');
        // 隐藏内容区域，以便精准算出相应容器高度
        $container.hide();

        // 主区域宽度
        var wrapperWidth = $('.wxm-wrapper').width();
        // 左侧菜单栏宽度
        var asideWidth = $aside.outerWidth();
        // 左侧菜单栏左移量
        var left = $aside.position().left;
        // 左侧菜单栏可视宽度
        var differ = asideWidth + left;

        // 设置内容区域宽度
        if (left == 0) {
            $container.width(wrapperWidth - asideWidth - 12);
        } else {
            $container.width(wrapperWidth - differ - 12);
        }
        // 显示内容区域
        $container.show();

        /*$('.wxm-console').html('wrapperWidth:' + wrapperWidth +
            ' asideWidth:' + asideWidth +
            ' left:' + left +
            ' differ:' + differ +
            ' container:' + $('.wxm-container').outerWidth());*/
    }
};

// 生成左侧菜单命名空间
wxm.namespace('wxm.aside');
wxm.aside = {
    /**
     * 初始化
     */
    init: function() {
        wxm.aside.events.mouses.lock();
        wxm.aside.events.mouses.aside();
        wxm.aside.events.clicks.lock();
    },
    /**
     * 变量
     */
    variables: {
        lock: true, // 侧边菜单栏是否锁定
        slide: 0 // 侧边菜单栏滑动定时器返回值
    },
    /**
     * 函数集
     */
    funs: {
        /**
         * 锁定图标切换
         * @param  {[Object]} obj 图标对象
         */
        iconSwitch: function(obj) {
            var $i = obj.find('i');
            if ($i.hasClass('icon-lock')) {
                $i.removeClass('icon-lock');
                $i.addClass('icon-unlock');
            } else if ($i.hasClass('icon-unlock')) {
                $i.removeClass('icon-unlock');
                $i.addClass('icon-lock');
            }
        },
        /**
         * 滑动侧边菜单栏
         */
        asideSlide: function(e) {
            var $aside = $('.wxm-aside');
            var type = e.type;
            var asideWidth = $aside.width();
            var index = 1;

            clearInterval(wxm.aside.variables.slide);

            if (!wxm.aside.variables.lock) {
                if ('mouseleave' == type) {
                    wxm.aside.variables.slide = setInterval(function() {
                        // 将侧边菜单栏移入屏幕
                        if (asideWidth + $aside.position().left >= 0) {
                            $aside.css('left', $aside.position().left - 5 + 'px');
                        } else {
                            clearInterval(wxm.aside.variables.slide);
                        }
                        wxm.resize.wrapper();
                    }, 10);
                } else if ('mouseenter' == type) {
                    wxm.aside.variables.slide = setInterval(function() {
                        // 将侧边菜单栏移出屏幕
                        if ($aside.position().left < 0) {
                            $aside.css('left', $aside.position().left + 5 + 'px');
                        } else {
                            clearInterval(wxm.aside.variables.slide);
                        }
                        wxm.resize.wrapper();
                    }, 10);
                }
            }
            /* $('.wxm-console').html('asideWidth:' + asideWidth + '<br>left:' + $aside.position().left + '<br>index:' + index++); // TODO*/
        }
    },
    /**
     * 事件集
     */
    events: {
        /**
         * 鼠标滑动事件
         */
        mouses: {
            /**
             * 锁定图标绑定鼠标滑动事件
             */
            lock: function() {
                $('.wxm-aside-lock').off('mouseleave.wxm-aside').off('mouseenter.wxm-aside').off('mouseover.wxm-aside-lock').off('mouseout.wxm-aside-lock').on('mouseleave.wxm-aside', function(event) {
                    wxm.event.stopPropagation(event);
                }).on('mouseenter.wxm-aside', function(event) {
                    wxm.event.stopPropagation(event);
                }).on('mouseover.wxm-aside-lock', function(event) {
                    wxm.aside.funs.iconSwitch($(this));
                }).on('mouseout.wxm-aside-lock', function(event) {
                    wxm.aside.funs.iconSwitch($(this));
                });
            },
            /**
             * 侧边菜单栏鼠标滑动事件
             */
            aside: function() {
                $('.wxm-aside').off('mouseleave.wxm-aside').off('mouseenter.wxm-aside').on('mouseleave.wxm-aside', function(event) {
                    wxm.aside.funs.asideSlide(event);
                }).on('mouseenter.wxm-aside', function(event) {
                    wxm.aside.funs.asideSlide(event);
                });
            }
        },
        /**
         * 鼠标点击事件
         */
        clicks: {
            /**
             * 锁定图标绑定鼠标点击事件
             */
            lock: function() {
                $('.wxm-aside-lock').off('click.wxm-aside-lock').on('click.wxm-aside-lock', function(event) {
                    var thiz = $(this);
                    // 更换提示内容
                    var $i = thiz.find('i');
                    if ($i.hasClass('icon-lock')) {
                        wxm.aside.variables.lock = true;
                        thiz.attr('data-original-title', '解锁菜单栏');
                    } else if ($i.hasClass('icon-unlock')) {
                        wxm.aside.variables.lock = false;
                        thiz.attr('data-original-title', '锁定菜单栏');
                    }
                    // 重新绑定鼠标滑出事件
                    thiz.off('mouseout.wxm-aside-lock').on('mouseout.wxm-aside-lock', function(event) {
                        wxm.aside.events.mouses.lock();
                    });
                });
            }
        }
    }
};