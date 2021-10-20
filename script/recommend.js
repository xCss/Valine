var recommend = [{
    title:'新客户无门槛领取总价值高达2775元代金券，每种代金券限量500张，先到先得。',
    img:'tx-ticket.jpg',
    url:'https://cloud.tencent.com/redirect.php?redirect=1025&cps_key=7facb411fb6ab10a34bb4a99665ac802'
},{
    title:'腾讯云云服务器新购特惠，最低2折起，1核1G3年仅794.73元，即0.73元/日。',
    img:'tx-new.jpg',
    url:'https://cloud.tencent.com/redirect.php?redirect=1010&cps_key=7facb411fb6ab10a34bb4a99665ac802'
},{
    title:'腾讯云云服务器新购特惠，最低2折起，1核1G3年仅794.73元，即0.73元/日。',
    img:'tx-new.jpg',
    url:'https://cloud.tencent.com/redirect.php?redirect=1010&cps_key=7facb411fb6ab10a34bb4a99665ac802'
},{
    title:'腾讯云服务器安全可靠高性能，多种配置供您选择',
    img:'tx-buy.jpg',
    url:'https://cloud.tencent.com/redirect.php?redirect=1001&cps_key=7facb411fb6ab10a34bb4a99665ac802'
}];

(function(){
    setTimeout(function(){
        var custom = document.querySelector('.custom-recommend');
        if(custom){
            var rand = Math.floor(Math.random()*3);
            var tag = recommend[rand];
            var a = document.createElement('a');
            var img = document.createElement('img');
            img.setAttribute('style','width:100%;');
            img.setAttribute('class','nofancybox');
            img.setAttribute('src','/images/recommend/'+tag.img);
            img.setAttribute('alt',tag.title);
            a.appendChild(img);
            a.setAttribute('title',tag.title);
            a.setAttribute('target','_blank');
            a.setAttribute('href',tag.url);
            custom.appendChild(a);
        }
    })
})();