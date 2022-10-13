const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider__section");
let sliderSectionLast = sliderSection[sliderSection.length -1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");

slider.insertAdjacentElement("afterbegin", sliderSectionLast);

function Next() {
	let sliderSectionFirst = document.querySelectorAll(".slider__section") [0];
	slider.style.marginLeft = "-200%";
	slider.style.transition = "all 0.5s";
	setTimeout(function() {
		slider.style.transition = "none";
		slider.insertAdjacentElement("beforeend", sliderSectionFirst);
		slider.style.marginLeft = "-100%";
	}, 500);
}

function Prev() {
	let sliderSection = document.querySelectorAll(".slider__section");
	let sliderSectionLast = sliderSection[sliderSection.length -1];
	slider.style.marginLeft = "0";
	slider.style.transition = "all 0.5s";
	setTimeout(function() {
		slider.style.transition = "none";
		slider.insertAdjacentElement("afterbegin", sliderSectionLast);
		slider.style.marginLeft = "-100%";
	}, 500);
}

btnRight.addEventListener ("click",function(){
	Next();
});

btnLeft.addEventListener ("click",function(){
	Prev();
});
setInterval(function(){
  Next();
}, 5000);


let btnMenu = document.getElementById('btn-menu');
let mainNav = document.getElementById('main-nav');
btnMenu.addEventListener('click', function(){
  mainNav.classList.toggle('mostrar');
});

document.addEventListener("keyup", e=> {

	if (e.target.matches("#buscador")) {

		if (e.key === "Escape")e.target.value = ""

		document.querySelectorAll(".product").forEach(fruit =>{
			fruit.textContent.toLowerCase().includes(e.target.value.toLowerCase())
			?fruit.classList.remove("filtro")
			:fruit.classList.add("filtro")
		})
	}
})

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
	cart.classList.add("active");
};
closeCart.onclick = () => {
	cart.classList.remove("active");
};

if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready)
}else{
	ready();
}

function ready(){
	var removeCartButtons = document.getElementsByClassName("cart-remove")
	console.log(removeCartButtons)
	for (var i = 0; i < removeCartButtons.length; i++){
		var button = removeCartButtons[i]
		button.addEventListener("click", removeCartItem);
	}

	var quantityInputs = document.getElementsByClassName("cart-quantity");
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}
	var addCart = document.getElementsByClassName("add-cart");
	for (var i = 0; i < addCart.length; i++) {
		var button = addCart[i];
		button.addEventListener("click", addCartClicked);
	}

	document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
	alert("You order is placed");
	var cartContent = document.getElementsByClassName("cart-content")[0];
	while (cartContent.hasChildNodes()) {
		cartContent.removeChild(cartContent.firstChild);
	}
	updatetotal();
}

function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updatetotal();
}

function quantityChanged(event){
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updatetotal();
}

function addCartClicked(event) {
	var button = event.target;
	var shopProducts = button.parentElement;
	var title = shopProducts.getElementsByClassName("product__title")[0].innerText;
	var price = shopProducts.getElementsByClassName("product__price")[0].innerText;
	var productImg = shopProducts.getElementsByClassName("product__img")[0].src;
	addProductToCart(title, price, productImg);
	updatetotal();
}
function addProductToCart(title, price, productImg) {
	var cartShopBox = document.createElement("div");
	cartShopBox.classList.add("cart-box");
	var cartItems = document.getElementsByClassName("cart-content")[0];
	var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
	for (var i = 0; i < cartItemsNames.length; i++)	{
		if (cartItemsNames[i].innerText == title) {
		alert("You have already add this item to cart");
		return;
	}
}
var cartBoxContent = `
				<img src="${productImg}" class="cart-img">
				<div class="detail-box">
					<div class="cart-product-title">${title}</div>
					<div class="cart-price">${price}</div>
					<input type="number" value="1" name="" class="cart-quantity">
				</div>
				<i class="fa-solid fa-trash cart-remove"></i>`;
	cartShopBox.innerHTML = cartBoxContent;
	cartItems.append(cartShopBox);
	cartShopBox
				.getElementsByClassName("cart-remove")[0]
				.addEventListener("click", removeCartItem);
	cartShopBox
				.getElementsByClassName("cart-quantity")[0]
				.addEventListener("change", quantityChanged);
}

function updatetotal() {
	var cartContent = document.getElementsByClassName("cart-content")[0];
	var cartBoxes = cartContent.getElementsByClassName("cart-box");
	var total = 0;
	for (var i = 0; i < cartBoxes.length; i++) {
		var cartBox = cartBoxes[i];
		var priceElement = cartBox.getElementsByClassName("cart-price")[0];
		var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
		var price = parseFloat(priceElement.innerText.replace("$", ""));
		var quantity = quantityElement.value;
		total = total + price * quantity;
}

		total = Math.round (total * 100) / 100;

		document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

let productos = [];
let resultado = 0;

function agregar(producto, precio) {
    console.log(producto, precio);
    productos.push(producto);
    resultado = resultado + precio;
    document.getElementById("chequear").innerHTML = `Pagar $${resultado}`
}

function pagar() {
    window.alert(productos.join(", \n"));
}
