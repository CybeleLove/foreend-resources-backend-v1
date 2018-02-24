/**
 * 页面DOM结构加载完后执行
 */

$(function() {
    // 设置页面布局
    wxm.resize.index();
    // 初始化左侧菜单栏
    wxm.aside.init();
    // 开启提示工具
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});

/**
 * 浏览器尺寸改变时触发
 * jQuery的$(window).resize()只能获取放大的触发事件
 */
window.onresize = function() {
    // 设置页面布局
    wxm.resize.index();
    // 给指定元素初始渲染滚动条
    $(document).find('[data-toggle="scroll"]').each(function() {
        wxm.Scroll.draw(this);
    });
};

// 生成重置尺寸命名空间
wxm.namespace(wxm.resize);
wxm.resize = {
    /**
     * 变量
     */
    vars: {
        interval: 0 // 主区域定时器返回值
    },
    /**
     * 设置页面尺寸布局
     */
    index: function() {
        // 获取主区域对象
        var $wrapper = $('.wxm-wrapper');
        // 隐藏主区域，以便精准算出相应容器高度
        //$wrapper.hide();

        // 文档高度
        var winHeight = $(window).height();
        // 导航高度
        var navHeight = $('body>nav').outerHeight();
        // 文档页脚高度
        var footerHeight = $('body>footer').outerHeight();

        // 设置内容区域高度
        $wrapper.height(winHeight - navHeight - footerHeight - 5);
        $('.wxm-page').height($wrapper.height() - $('.wxm-tab').outerHeight());
        // 显示主区域
        //$wrapper.show();

        // 设置主区域内部尺寸布局
        wxm.resize.wrapper();
        // 设置菜单区域高度
        wxm.resize.menu();

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
        //$container.hide();

        // 主区域宽度
        var wrapperWidth = $('.wxm-wrapper').width();
        // 左侧菜单栏宽度
        var asideWidth = $aside.outerWidth();
        // 左侧菜单栏左移量
        var left = $aside.position().left;
        // 左侧菜单栏可视宽度
        var differ = asideWidth + left;
        // 最终宽度
        var width = wrapperWidth - differ - 12;

        if (width > $container.outerWidth()) {
            $container.width(width);
            /*$('.wxm-console').html('wrapperWidth:' + wrapperWidth +
                ' width:' + width +
                ' left:' + left +
                ' differ:' + differ +
                ' container:' + $container.outerWidth());*/
        } else {
            clearInterval(wxm.resize.vars.interval);
            wxm.resize.vars.interval = setInterval(function() {
                if ($container.width() > width) {
                    $container.width($container.width() - 15);
                } else {
                    $container.width(width);
                    clearInterval(wxm.resize.vars.interval);
                }
                /* $('.wxm-console').html('wrapperWidth:' + wrapperWidth +
                     ' width:' + width +
                     ' left:' + left +
                     ' differ:' + differ +
                     ' container:' + $container.outerWidth());*/
            }, 10);
        }
        // 显示内容区域
        //$container.show();
    },
    /**
     * 设置菜单区域高度
     */
    menu: function() {
        // 获取侧边菜单栏高度
        var asideHeight = $('.wxm-aside').height();
        // 获取用户信息容器高度
        var userBoxHeight = $('.wxm-user').outerHeight();
        // 设置菜单区域高度
        $('.wxm-menu').height(asideHeight - userBoxHeight);
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
        wxm.aside.events.clicks.other();
    },
    /**
     * 变量
     */
    vars: {
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
            if ($i.hasClass('fa fa-lock')) {
                $i.removeClass('fa fa-lock');
                $i.addClass('fa fa-unlock');
            } else if ($i.hasClass('fa fa-unlock')) {
                $i.removeClass('fa fa-unlock');
                $i.addClass('fa fa-lock');
            }
        },
        /**
         * 滑动侧边菜单栏
         * @param  {[event]} e           [触发事件对象]
         * @param  {[boolean]} wrapperFlag [是否重置主内容区尺寸]
         */
        asideSlide: function(e, wrapperFlag) {
            var $aside = $('.wxm-aside');
            var type = e.type;
            var asideWidth = $aside.width();
            wrapperFlag = wrapperFlag || false;
            //var index = 1; // TODO
            //$('.wxm-console').html(type); // TODO

            clearInterval(wxm.aside.vars.slide);
            if (!wxm.aside.vars.lock) {
                if ('mouseenter' == type) {
                    wxm.aside.vars.slide = setInterval(function() {
                        // 将侧边菜单栏移出屏幕
                        if ($aside.position().left < 0) {
                            $aside.css('left', $aside.position().left + 15 + 'px');
                        } else {
                            $aside.css('left', 0);
                            clearInterval(wxm.aside.vars.slide);
                        }
                        //$('.wxm-console').html('wrapper:' + $('.wxm-wrapper').outerWidth() + ' container:' + $('.wxm-container').outerWidth() + ' left:' + $aside.position().left + ' differ:' + ($('.wxm-wrapper').outerWidth() - $('.wxm-container').outerWidth() - $aside.position().left)); // TODO
                        //$('.wxm-console').html('asideWidth:' + asideWidth + ' left:' + $aside.position().left + ' index:' + index++); // TODO
                    }, 10);
                } else {
                    wxm.aside.vars.slide = setInterval(function() {
                        // 将侧边菜单栏移入屏幕
                        if (asideWidth + $aside.position().left >= 0) {
                            $aside.css('left', $aside.position().left - 25 + 'px');
                        } else {
                            $aside.css('left', -$aside.outerWidth() + 5 + 'px');
                            $aside.addClass('light');
                            clearInterval(wxm.aside.vars.slide);
                        }
                        //$('.wxm-console').html('wrapper:' + $('.wxm-wrapper').outerWidth() + ' container:' + $('.wxm-container').outerWidth() + ' left:' + $aside.position().left + ' differ:' + ($('.wxm-wrapper').outerWidth() - $('.wxm-container').outerWidth() - $aside.position().left)); // TODO
                        //$('.wxm-console').html('asideWidth:' + asideWidth + ' left:' + $aside.position().left + ' index:' + index++); // TODO
                        if (!wrapperFlag) {
                            wxm.resize.wrapper();
                        }

                    }, 10);
                }
            }
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
                $('.wxm-aside-lock').off('mouseover.wxm-aside-lock').off('mouseout.wxm-aside-lock').on('mouseover.wxm-aside-lock', function() {
                    wxm.aside.funs.iconSwitch($(this));
                }).on('mouseout.wxm-aside-lock', function() {
                    wxm.aside.funs.iconSwitch($(this));
                });
            },
            /**
             * 侧边菜单栏鼠标滑动事件
             */
            aside: function() {
                $('.wxm-aside').off('mouseenter.wxm-aside').on('mouseenter.wxm-aside', function(event) {
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
                    if ($i.hasClass('fa fa-lock')) {
                        wxm.aside.vars.lock = true;
                        $('.wxm-aside').removeClass('light');
                        thiz.attr('data-original-title', '解除锁定，自动隐藏导航栏');
                        wxm.resize.wrapper();
                    } else if ($i.hasClass('fa fa-unlock')) {
                        wxm.aside.vars.lock = false;
                        thiz.attr('data-original-title', '保持锁定，始终显示导航栏');
                    }
                    wxm.aside.funs.asideSlide(event);
                    // 重新绑定鼠标滑出事件
                    thiz.off('mouseout.wxm-aside-lock').on('mouseout.wxm-aside-lock', function(event) {
                        wxm.aside.events.mouses.lock();
                    });
                });
            },
            /**
             * 其他元素点击事件
             */
            other: function() {
                $('.wxm-navbar, .wxm-container, .wxm-footer').off('click.wxm-other').on('click.wxm-other', function(event) {
                    wxm.aside.funs.asideSlide(event, true);
                });
            }
        }
    }
};