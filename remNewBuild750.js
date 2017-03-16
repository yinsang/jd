window.mobileUtil = (function(win, doc) {
        var UA = navigator.userAgent,
                isAndroid = /android|adr/gi.test(UA),
                isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid, // 据说某些国产机的UA会同时包含 android iphone 字符
                isMobile = isAndroid || isIos;  // 粗略的判断
        var userURL = document.URL 
        var ifShared =     /winzoom|utm_source/gi.test(userURL) 

        return {
            ifShared:ifShared,
            isAndroid: isAndroid,
            isIos: isIos,
            isMobile: isMobile,

            isNewsApp: /NewsApp\/[\d\.]+/gi.test(UA),
            isWeixin: /MicroMessenger/gi.test(UA),
            isQQ: /QQ\/\d/gi.test(UA),
            isYixin: /YiXin/gi.test(UA),
            isWeibo: /Weibo/gi.test(UA),
            isTXWeibo: /T(?:X|encent)MicroBlog/gi.test(UA),

            tapEvent: isMobile ? 'tap' : 'click',

            /**
             * 缩放页面
             */
            fixScreen: function() {
                var metaEl = doc.querySelector('meta[name="viewport"]'),
                        metaCtt = metaEl ? metaEl.content : '',
                        matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
                        matchWidth = metaCtt.match(/width=([^,\s]+)/);
                //console.log(metaCtt)
                if ( !metaEl ) { // REM
                    var docEl = doc.documentElement,
                            maxwidth = docEl.dataset.mw || 750, // 每 dpr 大页面宽度
                            dpr = isIos ? Math.min(win.devicePixelRatio, 3) : 1,
                            scale = 1 / dpr,
                            tid;

                    docEl.removeAttribute('data-mw');
                    docEl.dataset.dpr = dpr;
                    metaEl = doc.createElement('meta');
                    metaEl.name = 'viewport';
                    metaEl.content = fillScale(scale);
                    docEl.firstElementChild.appendChild(metaEl);

                    var refreshRem = function() {
                        var width = docEl.getBoundingClientRect().width;
                        if (width / dpr > maxwidth) {
                            width = maxwidth * dpr;
                        }
                        var rem = width / 7.5;
                        docEl.style.fontSize = rem + 'px';
                        if(window.location.href.indexOf('/visualediting/visualEditing.html?veBean.pageInstanceId')>-1){
                            docEl.style.fontSize = '42.6666666666667px';
                        }
                    };

                    win.addEventListener('resize', function() {
                        clearTimeout(tid);
                        tid = setTimeout(refreshRem, 300);
                    }, false);
                    win.addEventListener('pageshow', function(e) {
                        if (e.persisted) {
                            clearTimeout(tid);
                            tid = setTimeout(refreshRem, 300);
                        }
                    }, false);

                    refreshRem();
                } else if ( isMobile && !matchScale && ( matchWidth && matchWidth[1] != 'device-width' ) ) { // 定宽
                    var width = parseInt(matchWidth[1]),
                            iw = win.innerWidth || width,
                            ow = win.outerWidth || iw,
                            sw = win.screen.width || iw,
                            saw = win.screen.availWidth || iw,
                            ih = win.innerHeight || width,
                            oh = win.outerHeight || ih,
                            ish = win.screen.height || ih,
                            sah = win.screen.availHeight || ih,
                            w = Math.min(iw,ow,sw,saw,ih,oh,ish,sah),
                            scale = w / width;

                    if ( scale < 1 ) {
                        metaEl.content = metaCtt + ',' + fillScale(scale);
                    }
                }
                else{
                    //tmp process\
                    var docEl = doc.documentElement,
                            maxwidth = docEl.dataset.mw || 750, // 每 dpr 大页面宽度
                            dpr= isIos ? Math.min(win.devicePixelRatio, 3) : 1, //设备上物理像素和设备独立像素的比(iphone4\5\6 2, iphone6 plus 3)
                            scale = 1 / dpr,
                            tid;
                    //console.log(dpr)
                    docEl.removeAttribute('data-mw');
                    docEl.dataset.dpr = dpr;
                    metaEl = doc.querySelector('meta[name="viewport"]');
                    //metaEl.content = fillScale(scale);
                    var tArray = metaEl.content.split(',');
                    //metaEl.content = tArray[0]+ ',' + fillScale(scale) + ',' + tArray[3];

                    var refreshRem = function() {
                        var width = docEl.getBoundingClientRect().width; //获取屏幕宽度
                        if (width / dpr > maxwidth) {
                            width = maxwidth * dpr;
                        }
                        //console.log(width)
                        var rem = width / 7.5;
                        docEl.style.fontSize = rem + 'px';
                        if(window.location.href.indexOf('/visualediting/visualEditing.html?veBean.pageInstanceId')>-1){
                            docEl.style.fontSize = '42.6666666666667px';
                        }
                    };

                    win.addEventListener('resize', function() {
                        clearTimeout(tid);
                        tid = setTimeout(refreshRem, 300);
                    }, false);
                    win.addEventListener('pageshow', function(e) {
                        if (e.persisted) {
                            clearTimeout(tid);
                            tid = setTimeout(refreshRem, 300);
                        }
                    }, false);

                    refreshRem();
                }

                function fillScale(scale) {
                    return 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
                }
            },

            /**
             * 转href参数成键值对
             * @param href {string} 指定的href，默认为当前页href
             * @returns {object} 键值对
             */
            getSearch: function(href) {
                href = href || win.location.search;
                var data = {},reg = new RegExp( "([^?=&]+)(=([^&]*))?", "g" );
                href && href.replace(reg,function( $0, $1, $2, $3 ){
                    data[ $1 ] = $3;
                });
                return data;
            }
        };
    })(window, document);
    // 默认直接适配页面
    mobileUtil.fixScreen(); 
    console.log("rem file insert success")
