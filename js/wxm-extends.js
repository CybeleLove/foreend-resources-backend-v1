$(function() {
    /**
     * 扩展String方法
     */
    $.extend(String.prototype, {
        isPositiveInteger: function() {
            return (new RegExp(/^[1-9]\d*$/).test(this))
        },
        isInteger: function() {
            return (new RegExp(/^\d+$/).test(this))
        },
        isNumber: function(value, element) {
            return (new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(this))
        },
        trim: function() {
            return this.replace(/(^\s*)|(\s*$)|\r|\n/g, '')
        },
        startsWith: function(pattern) {
            return this.indexOf(pattern) === 0
        },
        endsWith: function(pattern) {
            var d = this.length - pattern.length
            return d >= 0 && this.lastIndexOf(pattern) === d
        },
        replaceSuffix: function(index) {
            return this.replace(/\[[0-9]+\]/, '[' + index + ']').replace('#index#', index)
        },
        replaceSuffix2: function(index) {
            return this.replace(/\-(i)([0-9]+)$/, '-i' + index).replace('#index#', index)
        },
        trans: function() {
            return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
        },
        encodeTXT: function() {
            return (this).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll(' ', '&nbsp;')
        },
        replaceAll: function(os, ns) {
            return this.replace(new RegExp(os, 'gm'), ns)
        },
        /*替换占位符为对应选择器的值*/ //{^(.|\#)[A-Za-z0-9_-\s]*}
        replacePlh: function($box) {
            $box = $box || $(document)
            return this.replace(/{\/?[^}]*}/g, function($1) {
                var $input = $box.find($1.replace(/[{}]+/g, ''))

                return $input && $input.val() ? $input.val() : $1
            })
        },
        replaceMsg: function(holder) {
            return this.replace(new RegExp('({.*})', 'g'), holder)
        },
        replaceTm: function($data) {
            if (!$data) return this

            return this.replace(RegExp('({[A-Za-z_]+[A-Za-z0-9_-]*})', 'g'), function($1) {
                return $data[$1.replace(/[{}]+/g, '')]
            })
        },
        replaceTmById: function(_box) {
            var $parent = _box || $(document)

            return this.replace(RegExp('({[A-Za-z_]+[A-Za-z0-9_-]*})', 'g'), function($1) {
                var $input = $parent.find('#' + $1.replace(/[{}]+/g, ''))
                return $input.val() ? $input.val() : $1
            })
        },
        isFinishedTm: function() {
            return !(new RegExp('{\/?[^}]*}').test(this))
        },
        skipChar: function(ch) {
            if (!this || this.length === 0) return ''
            if (this.charAt(0) === ch) return this.substring(1).skipChar(ch)
            return this
        },
        isValidPwd: function() {
            return (new RegExp(/^([_]|[a-zA-Z0-9]){6,32}$/).test(this))
        },
        isValidMail: function() {
            return (new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.trim()))
        },
        isSpaces: function() {
            for (var i = 0; i < this.length; i += 1) {
                var ch = this.charAt(i)

                if (ch != ' ' && ch != '\n' && ch != '\t' && ch != '\r') return false
            }
            return true
        },
        isPhone: function() {
            return (new RegExp(/(^([0-9]{3,4}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0-9]{3,4}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/).test(this))
        },
        isUrl: function() {
            return (new RegExp(/^[a-zA-z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/).test(this))
        },
        isExternalUrl: function() {
            return this.isUrl() && this.indexOf('://' + document.domain) == -1
        },
        toBool: function() {
            return (this.toLowerCase() === 'true') ? true : false
        },
        toJson: function() {
            var json = this

            try {
                if (typeof json == 'object') json = json.toString()
                if (!json.trim().match("^\{(.+:.+,*){1,}\}$")) return this
                else return JSON.parse(this)
            } catch (e) {
                return this
            }
        },
        /**
         * String to Function
         * 参数(方法字符串或方法名)： 'function(){...}' 或 'getName' 或 'USER.getName' 均可
         * Author: K'naan
         */
        toFunc: function() {
            if (!this || this.length == 0) return undefined
            //if ($.isFunction(this)) return this

            if (this.startsWith('function')) {
                return (new Function('return ' + this))()
            }

            var m_arr = this.split('.')
            var fn = window

            for (var i = 0; i < m_arr.length; i++) {
                fn = fn[m_arr[i]]
            }

            if (typeof fn === 'function') {
                return fn
            }

            return undefined
        },
        setUrlParam: function(key, value) {
            var str = '',
                url = this

            if (url.indexOf('?') != -1)
                str = url.substr(url.indexOf('?') + 1)
            else
                return url + '?' + key + '=' + value

            var returnurl = '',
                setparam = '',
                arr, modify = '0'

            if (str.indexOf('&') != -1) {
                arr = str.split('&')

                for (var i in arr) {
                    if (arr[i].split('=')[0] == key) {
                        setparam = value
                        modify = '1'
                    } else {
                        setparam = arr[i].split('=')[1]
                    }
                    returnurl = returnurl + arr[i].split('=')[0] + '=' + setparam + '&'
                }

                returnurl = returnurl.substr(0, returnurl.length - 1)
                if (modify == '0') {
                    if (returnurl == str)
                        returnurl = returnurl + '&' + key + '=' + value
                }
            } else {
                if (str.indexOf('=') != -1) {
                    arr = str.split('=')
                    if (arr[0] == key) {
                        setparam = value
                        modify = '1'
                    } else {
                        setparam = arr[1]
                    }
                    returnurl = arr[0] + '=' + setparam
                    if (modify == '0') {
                        if (returnurl == str)
                            returnurl = returnurl + '&' + key + '=' + value
                    }
                } else {
                    returnurl = key + '=' + value
                }
            }
            return url.substr(0, url.indexOf('?')) + '?' + returnurl
        }
    });
});