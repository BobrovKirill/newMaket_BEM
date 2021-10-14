////                         Furniture Gallery                      ////

const furniture = document.querySelector('.furniture__body');

if (furniture) {
  const furnitureItems = furniture.querySelector('.furniture__items');
  const furnitureColumn = furniture.querySelectorAll('.furniture__column');

  const speed = furniture.dataset.speed;

  let positionX = 0;
  let xProcent = 0;

  function setGalleryStyle() {
    let furnitureItemsWidth = 0;
    furnitureColumn.forEach((e) => {
      furnitureItemsWidth += e.offsetWidth;
    });

    const furnitureDifferend = furnitureItemsWidth - furniture.offsetWidth;
    const distX = Math.floor(xProcent - positionX);

    positionX = positionX + distX * speed;
    let position = (furnitureDifferend / 200) * positionX;

    furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

    if (Math.abs(distX) > 0) {
      requestAnimationFrame(setGalleryStyle);
    } else {
      furniture.classList.remove('init');
    }
  }
  furniture.addEventListener('mousemove', function (e) {
    const furnitureWidth = furniture.offsetWidth;
    const coordX = e.pageX - furnitureWidth / 2;

    xProcent = (coordX / furnitureWidth) * 200;
    if (!furniture.classList.contains('init')) {
      requestAnimationFrame(setGalleryStyle);
      furniture.classList.add('init');
    }
  });
}
