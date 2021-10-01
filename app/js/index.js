window.onload = function () {
  document.addEventListener('click', documentActions);
  document.addEventListener('click', footerList);
  document.addEventListener('click', headerMenu);
  document.addEventListener('click', carousel);

  ////                         HEADER                      ////

  //CREATE BURGER-MENU

  function documentActions(e) {
    const target = e.target;
    if (target.classList.contains('search__icon')) {
      document.querySelector('.search__item').classList.toggle('active');
    } else if (
      document.querySelector('.search__item.active') &&
      !target.closest('.search__item')
    ) {
      document.querySelector('.search__item').classList.remove('active');
    }
    if (target.classList.contains('products__more')) {
      e.preventDefault();
      getProducts(target);
    }
  }

  //CONTROL BURGER-MENU

  const burgerMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');
  const menuList = document.querySelectorAll('.menu__item');
  const body = document.body;
  if (burgerMenu) {
    burgerMenu.addEventListener('click', function (e) {
      burgerMenu.classList.toggle('active');
      menuBody.classList.toggle('active');
      body.classList.toggle('lock');
      if (burgerMenu.classList.contains('active')) {
        document.addEventListener('click', function ({ target }) {
          if (!target.closest('.header__body')) {
            burgerMenu.classList.remove('active');
            menuBody.classList.remove('active');
            menuList.forEach((element) => {
              element.classList.remove('active');
            });
            body.classList.remove('lock');
          }
        });
      }
    });
  }

  //CONTROL SPOLERS

  function headerMenu({ target }) {
    if (target.classList.contains('menu__arrow')) {
      target.closest('.menu__item').classList.toggle('active');
    } else if (
      document.querySelector('.menu__item.active') &&
      !target.closest('.menu__sub-list')
    ) {
      document.querySelector('.menu__item').classList.remove('active');
    }
  }

  //CREATE ADAPTIVE HEADER BACKGROUND

  const header = document.querySelector('.header');

  const fn = function (entries) {
    if (entries[0].isIntersecting) {
      header.classList.remove('scroll');
    } else {
      header.classList.add('scroll');
    }
  };

  const headerObserver = new IntersectionObserver(fn);
  headerObserver.observe(header);

  ////                         FOOTER                      ////

  //CONTROL SPOLERS

  function footerList({ target }) {
    if (window.innerWidth < 480) {
      if (target.classList.contains('menu-footer__title')) {
        target.parentElement
          .querySelector('.menu-footer__list')
          .classList.toggle('active');
        target.parentElement
          .querySelector('.menu-footer__title')
          .classList.toggle('active');
      } else if (
        document.querySelector('.menu-footer__list.active') &&
        !target.closest('.menu-footer__list')
      ) {
        document.querySelectorAll('.menu-footer__list').forEach((element) => {
          element.classList.remove('active');
        });
        document.querySelectorAll('.menu-footer__title').forEach((element) => {
          element.classList.remove('active');
        });
      }
    }
  }

  ////                         Carousel                      ////

  // CREATE CAROUSEL IMAGE

  const sliderMain = document.querySelector('#slider');
  const sliderBody = sliderMain.querySelector('.slider-main__body').children;
  sliderBody[1].classList.add('second');
  sliderBody[sliderBody.length - 1].classList.add('last');

  // CREATE BULLETS

  const bullets = sliderMain.querySelector('.swiper-bullets');
  for (let i = 0; i < sliderBody.length - 1; i++) {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-bullet');
    bullets.append(bullet);
  }

  // CONTROL CAROUSEL

  function carousel({ target }) {
    if (target.closest('.controls-slider-main')) {
      const sliderBody =
        sliderMain.querySelector('.slider-main__body').children;
      const sliderBodyList = Array.from(sliderBody);
      const bulletsList = Array.from(bullets.children);
      const active = sliderMain.querySelector('.slider-main__slider.active');
      const last = sliderMain.querySelector('.slider-main__slider.last');
      const second = sliderMain.querySelector('.slider-main__slider.second');
      const activeId = sliderBodyList.indexOf(active);
      const lastId = sliderBodyList.indexOf(last);
      const secondId = sliderBodyList.indexOf(second);
      if (target.classList.contains('slider-arrow__prev')) {
        const newActiveId =
          activeId == 0 ? sliderBodyList.length - 1 : activeId - 1;
        const newLeftId = lastId == 0 ? sliderBodyList.length - 1 : lastId - 1;
        const newRightId =
          secondId == 0 ? sliderBodyList.length - 1 : secondId - 1;
        carouselRun(newActiveId, newLeftId, newRightId);
      } else if (target.classList.contains('slider-arrow__next')) {
        const newActiveId =
          activeId == sliderBodyList.length - 1 ? 0 : activeId + 1;
        const newLasttId = lastId == sliderBodyList.length - 1 ? 0 : lastId + 1;
        const newRightId =
          secondId == sliderBodyList.length - 1 ? 0 : secondId + 1;
        carouselRun(newActiveId, newLasttId, newRightId);
      }
      function carouselRun(newActiveId, newLasttId, newRightId) {
        sliderBodyList[activeId].classList.remove('active');
        bulletsList[activeId].classList.remove('swiper-bullet-active');
        sliderBodyList[lastId].classList.remove('last');
        sliderBodyList[secondId].classList.remove('second');
        sliderBodyList[newActiveId].classList.add('active');
        sliderBodyList[newLasttId].classList.add('last');
        sliderBodyList[newRightId].classList.add('second');
        bulletsList[newActiveId].classList.add('swiper-bullet-active');
      }
    }
  }
};

// More Products content

async function getProducts(button) {
  if (!button.classList.contains('hold')) {
    button.classList.add('hold');
    const file = '../json/products.json';
    let response = await fetch(file, {
      method: 'GET',
    });
    if (response.ok) {
      let result = await response.json();
      loadProduct(result);
      button.classList.remove('hold');
      button.remove();
    } else {
      alert('ошибка');
    }
  }
}

function loadProduct(data) {
  const productsItems = document.querySelector('.products__items');
  data.products.forEach((item) => {
    const productId = item.id;
    const productUrl = item.url;
    const productTitle = item.title;
    const productText = item.text;
    const productLabels = item.labels;
    const productImage = item.image;
    const productPrice = item.price;
    const productPriceOld = item.priceOld;
    const productShareUrl = item.shareUrl;
    const productLikeUrl = item.likeUrl;

		function labelsRender(productLabels) {
			let result = ``
			if (productLabels.length > 0) {
				productLabels.forEach (label => {
					const {type, value} = label
					result += `<div class="item-product__label item-product__label-${type}">${value}</div>`
				})
			} else {
			}
			//console.log(result)
			return result
		}

    let template = `
					<div class="products__wrapper">
						<article class="products__item item-product" data-pid=${productId}>
              <div class="item-product__labels">
								${labelsRender(productLabels)}
              </div>
							<a class="item-product__image" href=${productUrl}>
								<img src="../images/products/${productImage}" alt="product1">
							</a>
              <div class="item-product__body">
                <div class="item-product__content"> 
                  <h3 class="item-product__title">${productTitle}</h3>
                  <div class="item-product__text">${productText}</div>
                </div>
                <div class="item-product__prices"> 
                  <div class="item-product__price">${productPrice}</div>
                  <div class="item-product__price item-product__price-old">${productPriceOld}</div>
                </div>
                <div class="item-product__actions actions-product">
                  <div class="actions-product__body"><a class="actions-product__button btn btn-white" href="#">Add to cart</a><a class="actions-product__link icon-share" href=${productShareUrl}>Share</a><a class="actions-product__link icon-favorite" href=${productLikeUrl}>Like</a></div>
                </div>
              </div>
            </article>
					</div>
		`;
		productsItems.insertAdjacentHTML('beforeend', template)
  });
  
}
