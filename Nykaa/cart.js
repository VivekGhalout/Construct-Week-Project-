document.querySelector("button").addEventListener("click", check);
var cart = JSON.parse(localStorage.getItem("cartProducts")) || [];

function getPrdouctCard(productName, productQty, productPrice, discountPrice, productImage, index) {
  return `
  <div style="border-radius: 10px; border: 1px solid rgb(0 19 37 / 8%); margin: 15px;">
        <div style="display: flex; justify-content: space-between; padding: 10px;">
          <div style="display: flex;">
            <div style="width: 40%; overflow: hidden;">
              <img style="width: 100%;" src="${productImage}">
            </div>
            <div style="width: 60%; padding: 0 10px; text-align: left; font-size: 14px;">
              <div>${productName}</div>
              <div></div>
            </div>
          </div>
          <div>
            <i onclick="delrow(${index})"class="fa fa-trash" style="cursor: pointer; color: rgb(94 83 83 / 50%); font-size: 16px;"></i>
          </div>
        </div>
        <div style="padding: 0px 5px;">
          <hr style="border: none; border-bottom: 1px solid rgb(112 112 112 / 19%);">
        <div style="display: flex; justify-content: space-between;padding: 10px;">
          <div style="color: rgb(0, 19, 37); font-size: 16px;">
            Quantity : <span class="productQty"><select onchange="updateQty(event, ${index})" style="border: none;outline: none;font-size: 18px;">
                <option ${productQty === 1 ? "selected" : ""} value="1">1</option>
                <option ${productQty === 2 ? "selected" : ""} value="2">2</option>
                <option ${productQty === 3 ? "selected" : ""} value="3">3</option>
                <option ${productQty === 4 ? "selected" : ""} value="4">4</option>
                <option ${productQty === 5 ? "selected" : ""} value="5">5</option>
              </select>
            </span>
          </div>
          <div style="color: rgb(0, 19, 37); font-size: 16px; font-weight: 600;">
            <span class="productPrice"  style="color: rgb(118, 146, 173);"><del>₹${productPrice}</del></span> <span class="discountPrice">₹${discountPrice}</span>
          </div>
        </div>
        </div>
      </div>`;
}

const couponHTML = `
<div id="Offer">    
      <div style="text-align: center;">
        <div id="trp">
          <p> Coupons <i class="fa fa-info-circle"></i></p>
        </div>
        <input placeholder="Enter Coupon Code" type="text" id="promo">
        <button onclick="check()">Apply</button>
      </div> <br>
    </div>
`;


function updateQty(event, position) {
  var cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  cart.forEach((item, index) => {
    if (index === position) {
      item.productQty = parseInt(event.target.value);
    }
  });
  localStorage.setItem("cartProducts", JSON.stringify(cart))
  displayCart(cart);
  caltotal(cart);
  displayCartItemsCount(cart);
}
var itemscount = localStorage.getItem("countitem")
function displayCartItemsCount(cart) {
  var cartItemsCount = cart && cart.length;
  var cartCountValue = "";
  if (cartItemsCount === 1) {
    cartCountValue = " 1 item";

  } else if (cartItemsCount > 1) {
    cartCountValue = " " + cartItemsCount + " items";

  }
  document.getElementById("per").innerHTML = cartCountValue;
  localStorage.setItem("countitem", cartCountValue)
}
function displayCart(cart) {
  document.querySelector("#bagItems").innerHTML = "";
  cart.map(function (elem, index) {
    var card = getPrdouctCard(elem.pro_name, elem.productQty || 1, elem.strikeoffprice, elem.price, elem.image_url, index);
    var div = document.createElement("div");
    div.innerHTML = card;
    document.querySelector("#bagItems").append(div);
  });
  if (cart && cart.length) {
    var couponDiv = document.createElement("div")
    couponDiv.innerHTML = couponHTML;
    document.querySelector("#bagItems").append(couponDiv);
  }
}

function delrow(index) {
  var cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  cart = cart.filter((item, i) => i !== index);
  localStorage.setItem("cartProducts", JSON.stringify(cart))
  displayCart(cart);
  caltotal(cart);
  displayCartItemsCount(cart);
  if (cart.length === 0) {
    document.getElementById("grandTotalParent").style.display = "none";
    document.getElementById("child").style.display = "block";
    var offerElement = document.getElementById("Offer");
    if (offerElement)
      offerElement.style.display = "none";
  }
}
var pert = localStorage.getItem("cartvalue");
var aaa = 0;
function caltotal() {
  var cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  var carval = 0;
  for (var i = 0; i < cart.length; i++) {
    carval += parseInt(cart[i].price) * (cart[i] && cart[i].productQty || 1);

  }
  document.getElementById("grandTotalPrice").textContent = carval;
  localStorage.setItem("cartvalue", carval);
  aaa = carval;
}


function check() {
  var cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  var total = 0;
  cart.forEach((item) => {
    total = total + Number(item.price);
  });
  var ch = document.getElementById("promo").value;
  if (ch == "makeup0" || ch == "kratika98" || ch == "makeup30" || ch == "krati98") {
    var temp = document.createElement("p");
    temp.setAttribute("class", "krp");
    alert(temp = " 30% off applied");
    //  document.getElementById("Offer").append(temp);
    var change = (aaa * 3) / 10;
    var updated_val = aaa - change;
    document.getElementById("grandTotalPrice").textContent = updated_val;
    localStorage.setItem("cartvalue", updated_val);
  }
}

// for calling cart
function showNykkaCart() {
  var cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  var offerElement = document.getElementById("Offer");
  if (cart && cart.length > 0) {
    document.getElementById("child").style.display = "none";
    document.getElementById("grandTotalParent").style.display = "block";
    if (offerElement)
      document.getElementById("Offer").style.display = "block";
  } else {
    document.getElementById("grandTotalParent").style.display = "none";
    document.getElementById("child").style.display = "block";
    if (offerElement)
      document.getElementById("Offer").style.display = "none";
  }
  var cartelements = document.getElementsByClassName("nykkacart");
  for (let i = 0; i < cartelements.length; i++) {
    var element = cartelements[i];
    if (element.style.display === "block") {
      element.style.display = "none";
      document.querySelector(".nykaacartinnerdiv").style.display = "none";
    } else {
      displayCartItemsCount(cart);
      caltotal(cart)
      displayCart(cart);
      element.style.display = "block";
      if (element.id === "nykaacartdiv") {
        setTimeout(() => {
          document.querySelector(".nykaacartinnerdiv").style.display = "block";
        }, 1000);
      }
    }
  };
}