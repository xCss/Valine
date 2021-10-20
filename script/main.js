(function () {

  var forEach = Array.prototype.forEach;
  var some = Array.prototype.some;

  var MAX_HEADER_DEPTH = 3;
  var scrolling = false;
  var scrollTimeout;
  var activeLink = document.querySelector('.sidebar-link.current');
  var allLinks = [];

  var forEach = Array.prototype.forEach;
  var some = Array.prototype.some;

  docsConfigRoot = docsConfigRoot || '/';

  var escapeEntityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }

  function escapeHtml(string) {
    return String(string).replace(/[&<>'"]/g, function(s) {
      return escapeEntityMap[s];
    });
  }

  // create sub links for h2s
  var h2s = document.querySelectorAll('.document-formatting h2')

  // find all h3s and nest them under their h2s
  var h3s = document.querySelectorAll('.document-formatting h3')

  var isAfter = function(e1, e2) {
    return e1.compareDocumentPosition(e2) & Node.DOCUMENT_POSITION_FOLLOWING;
  }

  var h2sWithH3s = [];
  var j = 0;
  for (var i = 0; i < h2s.length; i++) {
    var h2 = h2s[i];
    var nextH2 = h2s[i+1];
    var ourH3s = [];
    while (h3s[j] && isAfter(h2, h3s[j]) && (!nextH2 || !isAfter(nextH2, h3s[j]))) {
      ourH3s.push({ header: h3s[j] });
      j++;
    }

    h2sWithH3s.push({
      header: h2,
      subHeaders: ourH3s
    });
  }

  if (h2sWithH3s.length) {
    activeLink && createSubMenu(activeLink.parentNode, h2sWithH3s)
    var scroll = new SmoothScroll('a[href*="#"]', {
      speed: 400,
      offset: 20,
      after: function () {
        scrolling = false;
      }
    });
  }

  function createSubMenu (container, headers) {
    var subMenu = document.createElement('ul')
    subMenu.className = 'sub-menu'
    container.appendChild(subMenu)
    forEach.call(headers, function (h) {
      var link = createSubMenuLink(h.header)
      subMenu.appendChild(link)
      if (h.subHeaders) {
        createSubMenu(link, h.subHeaders)
      }
      makeHeaderLinkable(h.header)
    })
  }

  function createSubMenuLink (h) {
    allLinks.push(h)
    var headerLink = document.createElement('li')
    headerLink.innerHTML =
      '<a href="#' + encodeURIComponent(h.id) + '" data-scroll class="' + h.tagName + '"><span>' + escapeHtml(h.title || h.textContent) + '</span></a>'
    headerLink.firstChild.addEventListener('click', onLinkClick)
    return headerLink
  }

  function makeHeaderLinkable (h) {
    var anchor = document.createElement('a')
    anchor.className = 'anchor'
    anchor.href = '#' + encodeURIComponent(h.id)
    anchor.setAttribute('aria-hidden', true)
    anchor.setAttribute('data-scroll', '')
    anchor.innerHTML = '<span class="icon-link"></span>'
    anchor.addEventListener('click', onLinkClick)
    h.insertBefore(anchor, h.firstChild)

    var anchorOffset = document.createElement('div')
    anchorOffset.id = encodeURIComponent(h.id)
    anchorOffset.className = 'anchor-offset'
    h.insertBefore(anchorOffset, h.firstChild)

    h.removeAttribute("id");
  }

  function onLinkClick (e) {
    if (document.querySelector('.sub-menu').contains(e.target)) {
      setActive(e.target)
    }
    scrolling = true
    document.body.classList.remove('sidebar-open')
  }

  // setup active h3 update
  window.addEventListener('scroll', updateSidebar)
  window.addEventListener('resize', updateSidebar)

  function updateSidebar () {
    if (scrolling) return
    var doc = document.documentElement
    var top = doc && doc.scrollTop || document.body.scrollTop
    var last
    for (var i = 0; i < allLinks.length; i++) {
      var link = allLinks[i]
      if (link.offsetTop - 120 > top) {
        if (!last) last = link
        break
      } else {
        last = link
      }
    }
    if (last) {
      setActive(last)
    }
  }

  function setActive (link) {
    var previousActive = document.querySelector('.sub-menu .active')

    var hash = link.hash;
    if (!hash) {
      if (link.parentNode.tagName === 'A') {
        hash = link.parentNode.hash
      } else {
        hash = link.getElementsByTagName('a')[0].hash;
      }
    }
    var id = hash.slice(1);
    var currentActive = document.querySelector('.sub-menu a[href="#' + id + '"]');
    if (currentActive !== previousActive) {
      previousActive && previousActive.classList.remove('active')
      currentActive && currentActive.classList.add('active')
    }
  }


  // scroll sidebar page link into view on page load (except for the top link)
  var atRoot = location.pathname === '/' || location.pathname === '/index.html';
  if (!atRoot || location.hash !== '') {
    // hexo rewrites the URLs to be relative, so the current page has href="".
    var toc = document.querySelector('.item-toc a[href=""]'); 
    toc && toc.scrollIntoView();
  }

  function findCurrentVersion() {
    // First try the path ("master" branch, main domain), e.g.:
    // https://docs.domain.com/v1.2.3
    // https://docs.domain.com/v1.2.3/
    // https://docs.domain.com/v1.2.3/api/email.html

    var rootPath = docsConfigRoot.replace(/\/+$/g, '/');

    var pathVersionRegExp = new RegExp('^' + rootPath + 'v([^\/]\+)', 'i');

    var versionInPath = location.pathname.match(pathVersionRegExp);
    if (versionInPath && versionInPath[1]) {
      return versionInPath[1];
    }

    // Then try the hostname ("version" branches, subdomains; Netlify), e.g.:
    // https://version-1-2-3--docs.domain.com
    // https://version-1-2-3--docs.domain.com/
    // https://version-1-2-3--docs.domain.com/api/email.html
    var versionInHostname = location.hostname.match(/^version-([0-9-]+?)--/);
    if (versionInHostname && versionInHostname[1]) {
      return versionInHostname[1].replace(/-/g, ".");
    }
  }

  // version select
  // var currentVersion = findCurrentVersion();
  // var versionSelects = document.querySelectorAll('.version-select');
  // forEach.call(versionSelects, function (select) {
  //   if (currentVersion) {
  //     some.call(select.options, function (o) {
  //       if (o.value === "v" + currentVersion) {
  //         o.selected = true
  //         return true
  //       }
  //     })
  //   }

  //   select.addEventListener('change', function () {
  //     var targetPath = docsConfigRoot;
  //     if (select.selectedIndex !== 0) {
  //       targetPath = targetPath + select.value + '/'
  //     }
  //     location.assign(targetPath)
  //   })
  // })

  // fastclick to remove click delay in mobile browsers
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }

  // mobile
  document.querySelector('.js-sidebar-toggle')
    .addEventListener('click', function () {
      document.body.classList.toggle('sidebar-visible')
    });

  document.querySelector('.content')
    .addEventListener('click', function() {
      document.body.classList.remove('sidebar-visible')
    })
})()
