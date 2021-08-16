let cartBtns = document.querySelectorAll('.add-to-cart');
let cartBody = document.querySelector('.offcanvas-body')
let size = document.querySelector('.cart-size')
let localData = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];

cartBtns.forEach(function (cartBtn, i) {
    cartBtn.parentNode.addEventListener('click', main)
})

function main() {
    let clickedImg = this.parentNode.parentNode.parentNode.childNodes[1];
    let clickedName = this.parentNode.parentNode.parentNode.childNodes[3].childNodes[1];
    let clickedPrice = this.parentNode.parentNode.parentNode.childNodes[3].childNodes[3];

    let obj = {
        img: clickedImg.src,
        name: clickedName.innerText,
        price: clickedPrice.innerText
    }
    localData.push(obj)
    localStorage.setItem('cartData', JSON.stringify(localData));

    let toast = document.createElement('div')
    toast.classList.add('toast-main');
    toast.innerHTML += `<div class="toast show bg-success text-light align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        You're cart has been updated !!!
     </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>`;
    document.body.appendChild(toast);

    function removeToast() {
        let removeT = document.querySelector('.toast-main')
        removeT.remove()
    }
    setTimeout(removeToast,1000);
}

function interval() {
    cartBody.innerHTML = ``;
    if (localData.length >= cartBody.childNodes.length) {
        for (i = 0; i < localData.length; i++) {
            let parsedImg = JSON.parse(localStorage.getItem('cartData'))[i].img;
            let parsedName = JSON.parse(localStorage.getItem('cartData'))[i].name;
            let parsedPrice = JSON.parse(localStorage.getItem('cartData'))[i].price;

            let sideCart = document.createElement('div')
            sideCart.innerHTML = `<div class="container border p-3 my-3">
            <div class="row">
                <div class="col-3">
                    <img class="img-fluid" src="${parsedImg}" alt="">
                </div>
                <div class="col-9">
                    <p class="h4">${parsedName}</p>
                    <p class="mb-1">${parsedPrice}</p>
                </div>
            </div>
        </div>`;
        
        cartBody.appendChild(sideCart)
        }
    }
    size.innerHTML = localData.length

}


setInterval(interval, 100)
// interval()