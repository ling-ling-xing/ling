// ==UserScript==
// @name         停用剪切板
// @namespace    vz
// @version     2.0
// @description  拦截网页写入剪切板响应
// @run-at       document-start
// @match        *://*/*
// @grant        vz-lingmiao
// ==/UserScript==

(function() {
    'use strict';
    
    // 拦截现代API（不用箭头函数）
    if (navigator.clipboard && navigator.clipboard.writeText) {
        var originalWriteText = navigator.clipboard.writeText;
        navigator.clipboard.writeText = function(text) {
            console.log('拦截到剪贴板写入');
            return Promise.resolve(); 
        };
    }
    
    // 拦截传统方式
    if (document.execCommand) {
        var originalExecCommand = document.execCommand;
        document.execCommand = function(command, showUI, value) {
            if (command === 'copy' || command === 'cut') {
                console.log('拦截到复制操作');
                return true;
            }
            return originalExecCommand.call(this, command, showUI, value);
        };
    }
    
    // 拦截copy事件
    document.addEventListener('copy', function(e) {
        e.stopPropagation();
    }, true);
})();