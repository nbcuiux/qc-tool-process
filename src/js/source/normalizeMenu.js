function normalizeMenu() {
    var pageHref = window.location.pathname,
        queryString = 'nav dl a[href$="'+ pageHref + '"]',
        activeMenuItem = document.querySelector(queryString),
        activeMenu = activeMenuItem ? activeMenuItem.parentNode.parentNode : undefined,
        activeParent = $(activeMenu).parents('.submenu').get(0);
    //console.log(activeMenuHeader.get(0), activeParentHeader.get(0));
    if (activeMenu) {
        activeMenuItem.classList.add('nav_selected');
        activeMenu.style.display = '';
        activeMenu.classList.remove('is-closed');
        activeMenu.classList.add('is-open');
    }
    if (activeParent) {
      activeParent.classList.remove('is-closed');
      activeParent.classList.add('is-open');
    }

    $('.js-menuHeader').click(handleMenuClick);
}

function handleMenuClick(e) {
  var menuList = $(e.target).next('.menu__list'),
      menuWrapper = menuList.children('.menu__wrapper'),
      menuItems = menuWrapper.children('.menu__item');


  if (menuList.hasClass('is-open') || menuList.hasClass('is-animatedOpen')) {
    menuList.removeClass('is-open is-animatedOpen').addClass('is-closed');
    menuWrapper.css('margin-top', -1 * menuWrapper.height());
  } else if (menuList.hasClass('is-closed')) {
    menuList.removeClass('is-closed').addClass('is-animatedOpen');
    menuWrapper.css('margin-top', 0);
  }
}
