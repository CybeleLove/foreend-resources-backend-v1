
var currentIndex, // 当前页面索引 // TODO
    $tabBox, // 标签页盒子 // TODO
    $tabLeft, // 标签左侧 // TODO
    $tabRight, // 标签右侧 // TODO
    $tabBar, // 标签页栏 // TODO
    $tabItems, // 标签页集 // TODO
    $tabMore, // 标签缩略列表 // TODO
    $pageBox; // 页面盒子 // TODO

$(function() {
    var INIT_TABPAGE = function() {
        $tabBox = $('.wxm-tab'); // 标签页盒子 // TODO
        $tabLeft = $tabBox.find('.wxm-tab-left'); // 标签左侧 // TODO
        $tabRight = $tabBox.find('.wxm-tab-right'); // 标签右侧 // TODO
        $tabBar = $tabBox.find('.wxm-tab-bar'); // 标签页栏 // TODO
        $tabMore = $tabBox.find('.wxm-tab-more'); // 标签缩略列表 // TODO
        $tabHome = $tabBar.find('> li:first'); // 标签页主页选项卡
        $tabMoreHome = $tabMore.find('> li:first'); // 标签页主页选项卡
        $pageBox = $('.wxm-page'); // 页面盒子 // TODO
    };
    INIT_TABPAGE();
});

// 生成Tab页面命名空间
wxm.namespace('wxm.tabPage');
wxm.tabPage = function(element, options) {
    this.$element = $(element);
    this.options = options;
    this.tools    = this.TOOLS();
};

 wxm.tabPage.prototype.TOOLS = function() {
 };

 