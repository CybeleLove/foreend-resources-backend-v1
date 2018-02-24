/* 引用YUI的命名空间代码 */
// 框架根结点

var wxm = window.wxm || {};

/**
 * 创建命名空间
 * @param  {String} ns 命名空间
 * @return {Object}    所申请命名空间的一个引用
 */
wxm.namespace = function(ns) {
    if (!ns || !ns.length) {
        return null;
    }
    var levels = ns.split(".");
    var nsobj = wxm;

    // 如果申请的命名空间是在wxm下的，直接忽略
    for (var i = ('wxm' == levels[0]) ? 1 : 0; i < levels.length; ++i) {
        // 如果当前命名空间下不存在，则新建一个关联数组
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]];
    }

    // 返回所申请命名空间的一个引用
    return nsobj;
};

/**
 * 通用事件集
 */
wxm.event = {
    // 添加句柄
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    // 删除句柄
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    // 获取事件
    getEvent: function(event) {
        return event ? event : window.event;
    },
    // 获取触发事件元素
    getElement: function(event) {
        return event.target || event.srcElement;
    },
    // 阻止默认动作
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 阻止冒泡行为
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    // 鼠标滚动滑轮是否向上
    isUp: function(event) {
        //console.dir(event); // TODO
        //WebKit内核，Trident内核 => mousewheel
        //Gecko内核 => DOMMouseScroll
        var value = event.originalEvent.wheelDelta || -event.originalEvent.detail;
        //event.originalEvent.wheelDelta => 120(up) or -120(down) 谷歌IE内核
        //event.originalEvent.detail => -3(up) or 3(down) 火狐内核
        return Math.max(-1, Math.min(1, value)) > 0 ? true : false;
    }
};
var index=0;
// 主要用于iframe内部点击事件，触发parent框架相应点击事件
$(document).on('click', function(event) {
    if (window != window.top) {
        $(window.parent.document).find('.wxm-navbar').click();
    }
})/*.off('mouseup.scroll.middle.data-api').on('mouseup.scroll.middle.data-api', function(event) {
    console.log(index++);
    if (window != window.top) {
        $(window.parent.document).off('mousemove.scroll.middle.data-api');
    } else {
        $(document).off('mousemove.scroll.middle.data-api');
    }
})*/;