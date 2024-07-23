;(function(){
    setTimeout(function(){
        var selector = 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code';
        var elements = document.querySelectorAll(selector);
        for(var i=0,el;el=elements[i++];){
            var code = el.textContent;
            el.innerHTML = hanabi && hanabi(code) || code;
        }
    });
})();