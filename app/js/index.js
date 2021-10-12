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
    if (target.classList.contains('actions-product__button')) {
      const productId = target.closest('.item-product').dataset.pid;
      addCart(target, productId);
      e.preventDefault();
    }

    if (
      target.classList.contains('cart-header__icon') ||
      target.closest('.cart-header__icon')
    ) {
      if (document.querySelector('.cart-list').children.length > 0) {
        document.querySelector('.cart-header__body').classList.toggle('active');
      }
      e.preventDefault();
    }

    if (target.classList.contains('cart-list__delete')) {
      const id = target.closest('.cart-list__item').dataset.cartPid;
      updateCart(target, id, false);
      e.preventDefault();
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

  const sliderMainList = document.querySelectorAll('[data-slider="main"]');
  Array.from(sliderMainList).map((sliderMain) => {
    const sliderBody = sliderMain.querySelector(
      '[data-slider="body"]'
    ).children;
    sliderBody[1].classList.add('second');
    sliderBody[sliderBody.length - 1].classList.add('last');
  });

  // CREATE BULLETS

  const bulletsList = document.querySelectorAll('.swiper-bullets');
  Array.from(bulletsList).map((bullets) => {
    const sliderMain = bullets.closest('[data-slider="main"]');
    const sliderBody = sliderMain.querySelector(
      '[data-slider="body"]'
    ).children;
    for (let i = 0; i < sliderBody.length - 1; i++) {
      const bullet = document.createElement('span');
      bullet.classList.add('swiper-bullet');
      bullets.append(bullet);
    }
  });

  // CONTROL CAROUSEL

  function carousel({ target }) {
    if (target.closest('[data-slider="control"]')) {
      const sliderMain = target.closest('[data-slider="main"]');
      const sliderBody = sliderMain.querySelector(
        '[data-slider="body"]'
      ).children;
      const bullets = sliderMain.querySelector('.swiper-bullets');
      const sliderBodyList = Array.from(sliderBody);
      const bulletsList = Array.from(bullets.children);
      const active = sliderMain.querySelector('.active');
      const last = sliderMain.querySelector('.last');
      const second = sliderMain.querySelector('.second');
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

	 ////                         Furniture Gallery                      ////

const furniture = document.querySelector('.furniture__body')

if (furniture) {
	const furnitureItems = furniture.querySelector('.furniture__items')
	const furnitureColumn = furniture.querySelectorAll('.furniture__column')

	const speed = furniture.dataset.speed

	let positionX = 0
	let xProcent = 0

	function setGalleryStyle () {
		let furnitureItemsWidth = 0
		furnitureColumn.forEach(e => {
			furnitureItemsWidth += e.offsetWidth
		})

		const furnitureDifferend = furnitureItemsWidth - furniture.offsetWidth
		const distX = Math.floor(xProcent - positionX)
		

		positionX = positionX + (distX * speed) 
		let position = furnitureDifferend / 200 * positionX

		furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`

		if (Math.abs(distX) > 0) {
			requestAnimationFrame(setGalleryStyle) 
		} else {
			furniture.classList.remove('init')
		}
	}
	furniture.addEventListener('mousemove', function (e) {
		const furnitureWidth = furniture.offsetWidth
		const coordX = e.pageX - furnitureWidth / 2
		
		xProcent = coordX / furnitureWidth * 200
		if(!furniture.classList.contains('init')) {
			requestAnimationFrame(setGalleryStyle)
			furniture.classList.add('init')
		}
	})
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
      let result = ``;
      if (productLabels.length > 0) {
        productLabels.forEach((label) => {
          const { type, value } = label;
          result += `<div class="item-product__label item-product__label-${type}">${value}</div>`;
        });
      } else {
      }
      //console.log(result)
      return result;
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
    productsItems.insertAdjacentHTML('beforeend', template);
  });
}

// ADD TO CARD

function addCart(button, id) {
  if (!button.classList.contains('hold')) {
    button.classList.add('hold');
    button.classList.add('fly');

    const cart = document.querySelector('.cart-header__icon');
    const product = document.querySelector(`[data-pid="${id}"]`);
    const image = product.querySelector('.item-product__image');

    const productFly = image.cloneNode(true);

    const productFlyWidth = image.offsetWidth;
    const productFlyHeight = image.offsetHeight;
    const productFlyTop = image.getBoundingClientRect().top;
    const productFlyLeft = image.getBoundingClientRect().left;

    productFly.setAttribute('class', 'fly-image');
    productFly.style.cssText = `
		left: ${productFlyLeft}px;
		top: ${productFlyTop}px;
		width: ${productFlyWidth}px;
		height: ${productFlyHeight}px;
		`;
    document.body.append(productFly);

    const cartFlyTop = cart.getBoundingClientRect().top;
    const cartFlyLeft = cart.getBoundingClientRect().left;

    productFly.style.cssText = `
		left: ${cartFlyLeft}px;
		top: ${cartFlyTop}px;
		width: 0px;
		height: 0px;
		opacity: 0;
		`;

    productFly.addEventListener('transitionend', function () {
      if (button.classList.contains('fly')) {
        productFly.remove();
        updateCart(button, id);
        button.classList.remove('fly');
      }
    });
  }
}
function updateCart(button, id, productAdd = true) {
  const cart = document.querySelector('.cart-header');
  const cartIcon = cart.querySelector('.cart-header__icon');
  const cartQuantity = cartIcon.querySelector('span');
  const cartProduct = document.querySelector(`[data-cart-pid="${id}"]`);
  const cartList = document.querySelector('.cart-list');

  if (productAdd) {
    if (cartQuantity) {
      cartQuantity.innerHTML = ++cartQuantity.innerHTML;
    } else {
      cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
    }
    if (!cartProduct) {
      const product = document.querySelector(`[data-pid="${id}"]`);
      const cartImage = product.querySelector('.item-product__image').innerHTML;
      const cartTitle = product.querySelector('.item-product__title').innerHTML;
      const cartProductContent = `
					<a href="#" class="cart-list__image">${cartImage}</a>
					<div class="cart-list__body">
						<a href="#" class="cart-list__title">${cartTitle}</a>
						<div class="cart-list__quantity">
							Количество: <span>1</span>
						</div>
						<a href="#" class="cart-list__delete">Удалить</a>
					</div>
					`;
      const cartLi = `<li class=cart-list__item data-cart-pid="${id}">${cartProductContent}</li>`;
      cartList.insertAdjacentHTML('beforeend', `${cartLi}`);
    } else {
      const cartQuantity = cartProduct.querySelector(
        '.cart-list__quantity span'
      );
      cartQuantity.innerHTML = ++cartQuantity.innerHTML;
    }
    button.classList.remove('hold');
  } else {
    const cartQuantityProduct = cartProduct.querySelector(
      '.cart-list__quantity span'
    );
    cartQuantityProduct.innerHTML = --cartQuantityProduct.innerHTML;
    if (!parseInt(cartQuantityProduct.innerHTML)) {
      cartProduct.remove();
    }
    const cartQuantityValue = --cartQuantity.innerHTML;

    if (cartQuantityValue > 0) {
      cartQuantity.innerHTML = cartQuantityValue;
    } else {
      cartQuantity.remove();
      document.querySelector('.cart-header__body').classList.remove('active');
    }
  }
}

 
