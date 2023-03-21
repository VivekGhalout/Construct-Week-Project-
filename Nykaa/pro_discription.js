console.log("hello")

var ele = JSON.parse(localStorage.getItem("iteam_details2"));
console.log(ele);

display_pro(ele);
// localStorage.removeItem("iteam_details");

function display_pro(ele) {

    document.getElementById("pro_det_container_main").innerText = "";
// console.log(disc_product)
    // disc_product.map(function (ele, index) {
        
        var pro_det_container = document.createElement("div");
        pro_det_container.setAttribute("id", "pro_det_container");

        var pro_img_div = document.createElement("pro_img_div");
        pro_img_div.setAttribute("id", "pro_img_div");

        var heart = document.createElement("div");
        heart.setAttribute("class", "heart");

        var image = document.createElement("img");
        image.setAttribute("src", "https://img.icons8.com/neon/1x/hearts.png");

        heart.append(image);

        var main_img = document.createElement("div");
        main_img.setAttribute("class", "main_img");

        var image2 = document.createElement("img");
        image2.setAttribute("src", ele.image_url);

        main_img.append(image2);

        pro_img_div.append(heart, main_img);



        var pro_dis_div = document.createElement("div");
        pro_dis_div.setAttribute("id", "pro_dis_div");

        var upper_details_div = document.createElement("div");
        upper_details_div.setAttribute("id", upper_details_div);

        var name_div = document.createElement("div");
        name_div.setAttribute("id", "name_div");

        var name = document.createElement("p");
        name.textContent = ele.pro_name;

        name_div.append(name);

        var rating_div = document.createElement("div");
        rating_div.setAttribute("id", "rating_div");

        var rat = document.createElement("p");
        rat.textContent = ele.rating;

        var span = document.createElement("span");
        span.textContent = "| rating & reviews";

        rat.append(span);

        rating_div.append(rat);


        var mrp_div = document.createElement("div");
        mrp_div.setAttribute("id", "mrp_div");

        var mrp = document.createElement("p");
        mrp.textContent = "MRP: ";

        var str_price = document.createElement("span");
        str_price.setAttribute("id", "str_price");
        str_price.textContent = "₹"+ele.strikeoffprice;

        var act_price = document.createElement("span");
        act_price.setAttribute("id", "act_price");
        act_price.textContent = "₹" + ele.price;

        var off_pr = document.createElement("span");
        off_pr.setAttribute("id", "off_pr");
        off_pr.textContent = ele.off + "% Off";

        mrp.append(str_price, act_price, off_pr);
        mrp_div.append(mrp);

        var tax_div = document.createElement("div");
        tax_div.setAttribute("id", "tax_div");

        var tax_text = document.createElement("p");
        tax_text.textContent = "inclusive of all taxes";

        tax_div.append(tax_text);

        var offer_div = document.createElement("div");
        offer_div.setAttribute("id", "offer_div");

        var off_text1 = document.createElement("p");
        off_text1.textContent = "• Additional 10% Off on all orders above 999+";

        var off_text2 = document.createElement("p");
        off_text2.textContent = "View More Offers";

        offer_div.append(off_text1, off_text2);
        upper_details_div.append(name_div, rating_div, mrp_div, tax_div, offer_div);



        var mid_details_div = document.createElement("div");
        mid_details_div.setAttribute("id", "mid_details_div");

        var cart_btn = document.createElement("div");
        cart_btn.setAttribute("id", "cart_btn");

        var add_cart = document.createElement("button");
        add_cart.setAttribute("id", "add_cart");
        add_cart.textContent = "Add to Bag";
        add_cart.addEventListener("click", function () {
            addToCart(ele);
        });

        cart_btn.append(add_cart);

        var delev_opt = document.createElement("div");
        delev_opt.setAttribute("id", "delev_opt");

        var d_pincode = document.createElement("div");
        d_pincode.setAttribute("class", "d_pincode");

        var loc_img = document.createElement("img");
        loc_img.setAttribute("id", "loc_img")
        loc_img.setAttribute("src", "location.png")

        var address = document.createElement("p");
        address.setAttribute("id", "address");
        address.textContent = "Delivery Options ";

        var div = document.createElement("div");

        var pincode = document.createElement("input");
        pincode.setAttribute("id", "pincode");
        pincode.setAttribute("type", "text");
        pincode.setAttribute("placeholder", "Enter Pincode");
        pincode.setAttribute("tabindex", "10");

        var check = document.createElement("input");
        check.setAttribute("id", "check");
        check.setAttribute("type", "button");
        check.setAttribute("value", "Check");
        check.addEventListener("click", function(){
            pincodeFunc();
        });

        div.append(pincode, check);
        d_pincode.append(loc_img, address, div);
        delev_opt.append(d_pincode);
        mid_details_div.append(cart_btn, delev_opt);



        var bottom_div = document.createElement("div");
        bottom_div.setAttribute("id", "bottom_div");

        var div1 = document.createElement("div");

        var img1 = document.createElement("img");
        img1.setAttribute("src", "gen_pro.png");

        var p1 = document.createElement("p");
        p1.textContent = "100% Genuine Products";

        div1.append(img1, p1);

        var div2 = document.createElement("div");

        var img2 = document.createElement("img");
        img2.setAttribute("src", "undo.png");

        var p2 = document.createElement("p");
        p2.textContent = "Easy Return Policy";

        div2.append(img2, p2);

        var div3 = document.createElement("div");

        var p3 = document.createElement("p");
        p3.textContent = "Sold by :NYKAA E RETA....";

        div3.append(p3);
        bottom_div.append(div1, div2, div3);
        pro_dis_div.append(upper_details_div, mid_details_div, bottom_div);
        pro_det_container.append(pro_img_div, pro_dis_div);

        document.getElementById("pro_det_container_main").append(pro_det_container);


    // });
}

// display_pro(disc_product);

var cartArr = JSON.parse(localStorage.getItem("cartProducts")) || [];

function addToCart(elem) {
    cartArr.push(elem);
    console.log(elem);
    localStorage.setItem("cartProducts", JSON.stringify(cartArr));
}

async function pincodeFunc() {
    let pincode = document.getElementById('pincode').value;
    let res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    let data = await res.json();
    let address = document.getElementById('address');
    address.innerText = `${data[0].PostOffice[0].District},${data[0].PostOffice[0].Circle} ${"\n"}Your area is serviceable${"\n"}
    Delivery Within 2 Days${"\n"}Cash on Delivery available on orders above ₹499${"\n"}`;

}