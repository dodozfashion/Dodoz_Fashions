const params = new URL(location.href).searchParams;
const productId = params.get('productId');
let quantity = document.getElementById("productCount");

getData();

async function getData(){
    try {
        let response = await fetch('json/products.json');
        let json = await response.json();
        let product = json.find(item => item.id == productId); 

        if (product) {
            displayDetails(product);
        } else {
            console.error('Product not found');
        }
    } catch (error) {
        console.error('Error fetching the data', error);
    }
}

function displayDetails(product){
    let productDetails = document.getElementsByClassName('productDetails')[0];
    productDetails.setAttribute("data-id",product.id);

    document.getElementById("product_image").src = product.images[0];
    document.getElementById("product_image").alt = product.name;
    document.querySelector(".category_name").innerHTML = product.category;
    document.querySelector(".product_name").innerHTML = product.name;
    document.querySelector(".product_price").innerHTML = product.price;
    document.querySelector(".product_des").innerHTML = product.description;

    // Display sizes
    const sizeContainer = document.getElementById("sizeOptions");
    sizeContainer.innerHTML = ""; // clear previous
    if(product.sizes && product.sizes.length > 0){
        product.sizes.forEach(size => {
            const btn = document.createElement("button");
            btn.classList.add("size-btn");
            btn.innerText = size;
            btn.addEventListener("click", () => {
                document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
            });
            sizeContainer.appendChild(btn);
        });
    }


}

// Toast & Cart Animation
function showToast() {
    const toastOverlay = document.getElementById("toast-overlay");
    toastOverlay.classList.add("show");
    showCheckAnimation();
    setTimeout(() => {
        toastOverlay.classList.remove("show");
        showCart();
    }, 1000);
}

function showCart(){
    let body = document.querySelector('body');
    body.classList.add('showCart');
}

function showCheckAnimation(){
    const checkIconContainer = document.getElementById('checkIcon');
    checkIconContainer.innerHTML = '';
    const newCheckIcon = document.createElement('div');
    newCheckIcon.style.width = '100px';
    newCheckIcon.style.height = '100px';
    checkIconContainer.appendChild(newCheckIcon);

    lottie.loadAnimation({
        container: newCheckIcon,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'json/Animation check.json'
    });
}

// Quantity Buttons
document.getElementById("minus").addEventListener("click", function() {
    let value = parseInt(quantity.value) || 1; 
    if (value > 1) {
      quantity.value = value - 1;
    }
});

document.getElementById("plus").addEventListener("click", function() {
    let value = parseInt(quantity.value) || 1; 
    if (value < 999) {
      quantity.value = value + 1;
    }
});
