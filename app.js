/* ===== EDIT ME: your WhatsApp number & products ===== */
const WA="918209408477";
const UPI_ID="8949106245@ybl";
const UPI_NAME="Bliss and Co";
const PRODUCTS=[
{id:"best-friends-birthday-surprise-box",name:"Best Friends Birthday Surprise Box",price:1500,img:"best-friends-birthday-surprise-box.jpg",customizationQuote:true,desc:"A personalised birthday surprise box for your best friend. Starting price; customisation charges vary by your choices and are confirmed before payment."},
{id:"birthday-led-surprise-box",name:"Birthday LED Surprise Box",price:1800,img:"birthday-led-surprise-box.jpg",customizationQuote:true,desc:"A birthday gift box with a photo display and decorative lights. Starting price; customisation charges vary by your choices and are confirmed before payment."},
{id:"pink-floral-birthday-gift-box",name:"Pink Floral Birthday Gift Box",price:1400,img:"pink-floral-birthday-gift-box.jpg",customizationQuote:true,desc:"A floral birthday gift box with personalised details. Starting price; customisation charges vary by your choices and are confirmed before payment."},
{id:"pink-birthday-beauty-gift-box",name:"Pink Birthday Beauty Gift Box",price:1700,img:"pink-birthday-beauty-gift-box.jpg",customizationQuote:true,desc:"A pink birthday gift box with beauty-themed surprises. Starting price; customisation charges vary by your choices and are confirmed before payment."},
{id:"birthday-girl-celebration-gift-box",name:"Birthday Girl Celebration Gift Box",price:2000,img:"birthday-girl-celebration-gift-box.jpg",customizationQuote:true,desc:"A glowing birthday celebration box with a personalised theme. Starting price; customisation charges vary by your choices and are confirmed before payment."},
{id:"dark-chocolate-bar",name:"Dark Chocolate Bar",price:59,img:"1.jpg",desc:"A rich, intense dark chocolate bar."},
{id:"pure-milk-chocolate",name:"Pure Milk Chocolate",price:59,img:"2.jpg",desc:"A smooth, creamy milk chocolate."},
{id:"twin-bliss-bar",name:"Twin Bliss Bar",price:69,img:"3.jpg",desc:"A delightful combination of two premium chocolates."},
{id:"oreo-crunch-bar",name:"Oreo Crunch Bar",price:79,img:"5.jpg",desc:"A delicious combination of Oreo cookies and dark chocolate."},
{id:"rainbow-drizzle-bar",name:"Rainbow Drizzle Bar",price:59,img:"6.jpg",desc:"A vibrant mix of colours and flavours."},
{id:"nutty-cocoa-bar",name:"Nutty Cocoa Bar",price:99,img:"15.jpg",desc:"A nutty, cocoa-rich treat."},
{id:"love-you-chocolate-bar",name:"Love You Chocolate Bar",price:99,img:"8.jpg",desc:"A heartfelt gift for someone you love."},
{id:"raksha-bandhan-chocolate-duo",name:"Raksha Bandhan Chocolate Duo",price:99,img:"9.jpg",desc:"A special gift for Raksha Bandhan."},
{id:"raksha-bond-treats",name:"Raksha Bond Treats",price:59,img:"11.jpg",desc:"Premium chocolate bars for celebrating sibling bonds."},
{id:"birthday-chocolate-gift-wrapping",name:"Birthday Chocolate Gift Wrapping",price:59,img:"12.jpg",desc:"A thoughtful chocolate gift for a special birthday."},
{id:"couple-birthday-chocolate-bar",name:"Couple Birthday Chocolate Bar",price:59,img:"14.jpg",desc:"A personalised chocolate treat for birthday celebrations."},
{id:"bliss-assorted-chocolate-tub",name:"Bliss Assorted Chocolate Tub",price:99,img:"box1.jpg",desc:"Ten handcrafted treats in four varieties: dark, milk, white and mixed."},
{id:"golden-heart-chocolate-box",name:"Golden Heart Chocolate Box",price:69,img:"box2.jpg",desc:"A thoughtful golden gift filled with chocolate joy."},
{id:"1-kg-pure-dark-chocolate",name:"1 KG Pure Dark Chocolate",price:650,img:"Dark.jpg",desc:"A rich, indulgent dark chocolate in a convenient 1 KG pack."},
{id:"1-kg-pure-milk-chocolate",name:"1 KG Pure Milk Chocolate",price:800,img:"pure_milk.jpg",desc:"A creamy, smooth milk chocolate in a convenient 1 KG pack."},
{id:"1-kg-mix-dark-and-milk-chocolate",name:"1 KG Mix (Dark & Milk) Chocolate",price:700,img:"dark&milk.jpg",desc:"A delightful blend of dark and milk chocolate."},
{id:"1-kg-dark-tutti-frutti-chocolate",name:"1 KG Dark Tutti Frutti Chocolate",price:700,img:"tutti_futti.jpg",desc:"A rich, indulgent dark chocolate with a delightful twist."},
{id:"1-kg-dark-with-dry-fruit-chocolate",name:"1 KG Dark With Dry Fruit Chocolate",price:800,img:"dry_fruit.jpg",desc:"A rich, indulgent dark chocolate infused with dry fruits."},
{id:"1-kg-dark-with-oreo-chocolate",name:"1 KG Dark With Oreo Chocolate",price:750,img:"oreo.jpg",desc:"A rich, indulgent dark chocolate with Oreo cookie bits."},
{id:"royal-snack-celebration-hamper",name:"Royal Snack Celebration Hamper",price:399,img:"hamper1.jpg",desc:"Assorted chips, beverages, namkeen and tasty snacks for birthdays and celebrations."},
{id:"red-ribbon-celebration-hamper",name:"Red Ribbon Celebration Hamper",price:459,img:"hamper4.jpg",desc:"A beautifully packed hamper with chocolates, namkeen, juices and snacks for every occasion."},
{id:"chocolate-lovers-gift-tray",name:"Chocolate Lover’s Gift Tray",price:599,img:"hamper5.jpg",desc:"A delightful collection of chocolates, candy bars and sweet treats for chocolate lovers."},
{id:"festive-crunch-hamper",name:"Festive Crunch Hamper",price:399,img:"hamper6.jpg",desc:"A festive basket filled with crunchy snacks, namkeen, drinks and chocolates."},
];
/* ==================================================== */
const $=s=>document.querySelector(s),inr=n=>"₹"+n.toLocaleString("en-IN");
let cart=JSON.parse(localStorage.getItem("bliss")||"{}");
const pg=location.pathname.split("/").pop()||"index.html";
const nav=[["index.html","Home"],["shop.html","Shop"],["contact.html","Contact"],["privacy.html","Privacy"],["refund.html","Refunds"]];
document.body.insertAdjacentHTML("afterbegin",`<header><div class="wrap"><a class="logo" href="index.html"><img src="bliss_logo-optimized.jpg" alt="Bliss logo" width="42" height="42" fetchpriority="high" decoding="async">BLISS & Co.</a>
<nav id="nav">${nav.map(n=>`<a href="${n[0]}" class="${pg==n[0]?"on":""}">${n[1]}</a>`).join("")}</nav>
<button class="btn" id="cartBtn">Cart <b id="cnt">0</b></button><button class="btn menu" id="menu" aria-label="Menu">☰</button></div></header>
<aside id="drawer"><div style="display:flex;justify-content:space-between"><h3>Your cart 🍫</h3><button class="q" id="x" aria-label="Close cart">×</button></div><div id="items"></div>
<div class="order-totals" id="orderTotals" aria-live="polite"></div><div class="coupon-box"><label for="coupon">First order? Save ₹100 on orders above ₹499</label><div class="coupon-controls"><input id="coupon" autocomplete="off" placeholder="Coupon code NEW100" aria-describedby="couponMessage"><button class="btn secondary" id="applyCoupon" type="button">Apply</button></div><p class="delivery-note">Orders below ₹499 have a ₹99 delivery charge.</p><p id="customizationNote" class="customization-note" hidden>Gift-box prices are starting prices. Customisation charges and the final total will be confirmed on WhatsApp before payment.</p><p id="couponMessage" aria-live="polite"></p></div>
<div class="checkout-fields"><label for="nm">Name</label><input id="nm" name="name" autocomplete="name" placeholder="Your full name" required>
<label for="ph">Mobile number</label><input id="ph" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="10-digit mobile number" pattern="[0-9]{10}" maxlength="10" required>
<label for="pin">PIN code</label><input id="pin" name="pincode" type="text" inputmode="numeric" autocomplete="postal-code" placeholder="6-digit PIN code" pattern="[0-9]{6}" maxlength="6" required>
<label for="ad">Delivery address</label><input id="ad" name="address" autocomplete="street-address" placeholder="Full delivery address" required>
</div><button class="btn pink" id="buy">Order on WhatsApp</button></aside>`);
document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap"><div><h3>BLISS & Co.</h3><p>Made for good moments.<br>FSSAI Licence: 22226067001108</p></div>
<div><a href="privacy.html">Privacy Policy</a><a href="refund.html">Refund Policy</a><a href="contact.html">Contact Us</a></div>
<div><a href="https://www.instagram.com/blisschocolate01">Instagram</a><a href="https://www.facebook.com/profile.php?id=61594523811024">Facebook</a><a href="mailto:blisschocolate01@gmail.com">blisschocolate01@gmail.com</a><a href="tel:+918209408477">+91 8209408477</a></div>
<p style="width:100%;opacity:.6">© 2026 Bliss & Co. Jaipur</p></div></footer>`);
document.body.insertAdjacentHTML("beforeend",`<div id="pay" class="payback" role="dialog" aria-modal="true" aria-labelledby="payTitle" aria-hidden="true"><div class="paybox">
<button class="q pay-close" id="px" type="button" aria-label="Close payment">×</button>
<span class="eyebrow">UPI PAYMENT</span><h2 id="payTitle">Pay ₹<span id="pamt"></span> via UPI</h2>
<div id="qr" aria-label="UPI payment QR code"></div><p>UPI ID: <b>${UPI_ID}</b></p>
<button class="btn secondary copy-upi" id="copyUpi" type="button">Copy UPI ID</button>
<a class="btn" id="plink" href="#" aria-label="Open a UPI app to pay">Pay with UPI app</a>
<p class="small" id="paymentInstructions">Pay using PhonePe or any UPI app, or scan the QR code. After completing the payment, continue to WhatsApp and attach a screenshot of your payment.</p>
<p id="paymentStatus" class="payment-status" aria-live="polite"></p>
<p class="payment-note">Payment is not verified automatically. We will confirm it after checking our UPI account.</p>
<button class="btn secondary" id="pdone" type="button">Continue for order</button>
</div></div>`);
const save=()=>{localStorage.setItem("bliss",JSON.stringify(cart));draw()};
let couponApplied=false;
function toast(t){const e=document.createElement("div");e.className="toast";e.textContent=t;document.body.append(e);setTimeout(()=>e.remove(),1500)}
function orderAmounts(subtotal){
const delivery=subtotal>0&&subtotal<499?99:0;
const discount=couponApplied&&subtotal>=500&&localStorage.getItem("blissNew100Used")!=="true"?100:0;
return{delivery,discount,total:subtotal+delivery-discount};
}
function draw(){let c=0,s=0,h="";for(const id in cart){const p=PRODUCTS.find(x=>x.id==id);if(!p)continue;const q=cart[id];c+=q;s+=p.price*q;
h+=`<div class="row"><img src="${p.img}" alt="${p.name}"><span>${p.name}<br>${p.customizationQuote?"From ":""}${p.price?inr(p.price):"Price on WhatsApp"}${p.customizationQuote?" + customisation charges":""}</span><button class="q" data-d="${id}" aria-label="Remove one ${p.name}">−</button>${q}<button class="q" data-a="${id}" aria-label="Add one ${p.name}">+</button></div>`}
if(couponApplied&&s<500){couponApplied=false;$("#couponMessage").textContent="NEW100 needs at least ₹500 in your cart.";$("#couponMessage").className="coupon-error"}
const{delivery,discount,total}=orderAmounts(s);
$("#cnt").textContent=c;$("#items").innerHTML=h||"<p>Cart is empty. Go pick something sweet!</p>";
const hasCustomItem=Object.keys(cart).some(id=>{const product=PRODUCTS.find(item=>item.id===id);return product&&product.customizationQuote});
$("#customizationNote").hidden=!hasCustomItem;
$("#orderTotals").innerHTML=hasCustomItem?`<div><span>Base product subtotal</span><span>${inr(s)}</span></div>${discount?`<div class="discount-row"><span>NEW100 discount</span><span>−${inr(discount)}</span></div>`:""}<div><span>Delivery &amp; customisation</span><span>To confirm</span></div><div class="total-row"><strong>Base total</strong><strong>${inr(s-discount)}</strong></div>`:`<div><span>Subtotal</span><span>${inr(s)}</span></div><div><span>Delivery</span><span>${delivery?inr(delivery):s?"Free":"—"}</span></div>${discount?`<div class="discount-row"><span>NEW100 discount</span><span>−${inr(discount)}</span></div>`:""}<div class="total-row"><strong>Total</strong><strong>${inr(total)}</strong></div>`}
$("#items").onclick=e=>{const a=e.target.dataset.a,d=e.target.dataset.d;if(a)cart[a]++;if(d&&--cart[d]<1)delete cart[d];save()};
$("#cartBtn").onclick=()=>$("#drawer").classList.add("open");$("#x").onclick=()=>$("#drawer").classList.remove("open");
$("#menu").onclick=()=>$("#nav").classList.toggle("show");
$("#applyCoupon").onclick=()=>{const code=$("#coupon").value.trim().toUpperCase(),subtotal=Object.keys(cart).reduce((sum,id)=>{const item=PRODUCTS.find(product=>product.id===id);return sum+(item?item.price*cart[id]:0)},0);
if(code!=="NEW100"){couponApplied=false;$("#couponMessage").textContent="Enter the code NEW100 to apply your offer.";$("#couponMessage").className="coupon-error"}
else if(localStorage.getItem("blissNew100Used")==="true"){couponApplied=false;$("#couponMessage").textContent="NEW100 has already been used for this browser.";$("#couponMessage").className="coupon-error"}
else if(subtotal<500){couponApplied=false;$("#couponMessage").textContent="NEW100 is for first orders above ₹499. Add more items to use it.";$("#couponMessage").className="coupon-error"}
else{couponApplied=true;$("#couponMessage").textContent="NEW100 applied — ₹100 off your first order!";$("#couponMessage").className="coupon-success"}
draw()};
["ph","pin"].forEach(id=>$("#"+id).addEventListener("input",e=>{e.target.value=e.target.value.replace(/\D/g,"")}));
let order=null,qrCodeLoad=null;
function loadQrCode(){
if(window.QRCode)return Promise.resolve();
if(!qrCodeLoad){qrCodeLoad=new Promise((resolve,reject)=>{const script=document.createElement("script");script.src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";script.onload=()=>window.QRCode?resolve():reject(new Error("QR code library loaded without QRCode support"));script.onerror=()=>reject(new Error("Could not load QR code generator"));document.head.append(script)})}
return qrCodeLoad
}
function openPayment(orderDetails){
order=orderDetails;
const paymentUrl=`upi://pay?${new URLSearchParams({pa:UPI_ID,pn:UPI_NAME,am:order.total.toFixed(2),cu:"INR",tn:"Bliss Chocolate order"})}`;
const phonePayment=window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
$("#pay").classList.toggle("phone-payment",phonePayment);
$("#pamt").textContent=order.total.toLocaleString("en-IN");
$("#plink").href=paymentUrl;
$("#plink").textContent=phonePayment?`Open UPI app to pay ${inr(order.total)}`:"Pay with UPI app";
$("#plink").setAttribute("aria-label",phonePayment?`Open a UPI app to pay ${inr(order.total)}`:"Pay with a UPI app");
$("#paymentInstructions").textContent=phonePayment
?"Tap the button to open a UPI app on your phone. Complete the payment, return to this page, then continue to WhatsApp and attach your payment screenshot."
:"Scan the QR code with your phone, or use a UPI app. After paying, continue to WhatsApp and attach your payment screenshot.";
$("#qr").setAttribute("aria-hidden",phonePayment?"true":"false");
$("#plink").onclick=()=>{$("#paymentStatus").textContent="Finish paying in your UPI app, then return to this page and continue to WhatsApp."};
$("#paymentStatus").textContent="";
if(!phonePayment)$("#qr").innerHTML="<p class=\"qr-status\">Loading payment QR code…</p>";
$("#pay").classList.add("open");$("#pay").setAttribute("aria-hidden","false");$("#px").focus();
if(!phonePayment){
loadQrCode().then(()=>{if(!$("#pay").classList.contains("open"))return;$("#qr").innerHTML="";new window.QRCode($("#qr"),{text:paymentUrl,width:180,height:180})})
.catch(error=>{qrCodeLoad=null;console.error(error);$("#qr").innerHTML="<p class=\"qr-status qr-error\">QR code could not be loaded. Use “Pay with UPI app” or pay directly to the UPI ID above.</p>"});
}
}
function closePayment(){$("#pay").classList.remove("open");$("#pay").setAttribute("aria-hidden","true");$("#buy").focus()}
$("#buy").onclick=()=>{if(!Object.keys(cart).length)return toast("Cart is empty");const fields=["nm","ph","pin","ad"];for(const id of fields){if(!$("#"+id).reportValidity())return}
const n=$("#nm").value.trim(),phone=$("#ph").value.trim(),pin=$("#pin").value.trim(),address=$("#ad").value.trim();
if(!n)return toast("Enter your name");if(!/^\d{10}$/.test(phone))return toast("Enter a valid 10-digit mobile number");if(!/^\d{6}$/.test(pin))return toast("Enter a valid 6-digit PIN code");if(!address)return toast("Enter your delivery address");
let lines=[],s=0;for(const id in cart){const p=PRODUCTS.find(x=>x.id===id);if(!p)continue;s+=p.price*cart[id];lines.push(`• ${p.name} x${cart[id]} = ${inr(p.price*cart[id])}`)}
if(!s)return toast("Your cart has no priced items");
const amounts=orderAmounts(s);
if(couponApplied&&!amounts.discount)return toast("NEW100 is only for first orders above ₹499");
const hasCustomItem=Object.keys(cart).some(id=>{const product=PRODUCTS.find(item=>item.id===id);return product&&product.customizationQuote});
if(hasCustomItem){
const message=[`Hi Bliss & Co.! I would like a customisation quote for these gift boxes:`,...lines,"",`Base product subtotal: ${inr(s)}`,couponApplied&&amounts.discount?`NEW100 requested: -${inr(amounts.discount)} (please confirm eligibility)`:"","Please share the available customisation options and charges, delivery fee, and final total before I make payment.",`Name: ${n}`,`Mobile: ${phone}`,`PIN code: ${pin}`,`Address: ${address}`].filter(Boolean).join("\n");
open(`https://wa.me/${WA}?text=${encodeURIComponent(message)}`,"_blank");return;
}
openPayment({lines:lines.join("\n"),s,delivery:amounts.delivery,discount:amounts.discount,total:amounts.total,n,phone,pin,address});
};
function sendPaidOrder(){
if(!order)return toast("Start checkout again to create your order");
const lines=[`Hi Bliss & Co.! I have sent payment via UPI (customer-reported; please verify in your account).`,"",order.lines,"",`Subtotal: ${inr(order.s)}`,`Delivery: ${order.delivery?inr(order.delivery):"Free"}`];
if(order.discount)lines.push(`Coupon NEW100: -${inr(order.discount)}`);
lines.push(`Total paid: ${inr(order.total)}`,`Name: ${order.n}`,`Mobile: ${order.phone}`,`PIN code: ${order.pin}`,`Address: ${order.address}`,"","I will attach my payment screenshot in this WhatsApp chat.");
open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join("\n"))}`,"_blank");
if(order.discount){localStorage.setItem("blissNew100Used","true");couponApplied=false;$("#couponMessage").textContent="NEW100 has been used for this browser.";$("#couponMessage").className="coupon-error"}
closePayment();
}
$("#px").onclick=closePayment;$("#pdone").onclick=sendPaidOrder;
$("#copyUpi").onclick=async()=>{try{await navigator.clipboard.writeText(UPI_ID);$("#paymentStatus").textContent="UPI ID copied. Paste it into your UPI app to pay."}catch(error){console.error(error);$("#paymentStatus").textContent="Copy isn’t available here. You can enter the UPI ID shown above in your UPI app."}};
$("#pay").addEventListener("click",event=>{if(event.target===$("#pay"))closePayment()});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&$("#pay").classList.contains("open"))closePayment()});
const g=$("#grid");if(g){const l=+g.dataset.limit||99;g.innerHTML=PRODUCTS.slice(0,l).map(p=>`<article class="card"><img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async"><div><h3>${p.name}</h3><p>${p.desc}</p><span class="price">${p.customizationQuote?"From ":""}${p.price?inr(p.price):"Price on WhatsApp"}${p.customizationQuote?" + customisation charges":""}</span><button class="btn" data-add="${p.id}">Add to cart</button></div></article>`).join("");
g.onclick=e=>{const i=e.target.dataset.add;if(i){cart[i]=(cart[i]||0)+1;save();toast("Added to cart ✓")}}}
const f=$("#enq");if(f){const phoneField=f.elements.namedItem("p");phoneField.addEventListener("input",e=>{e.target.value=e.target.value.replace(/\D/g,"")});f.onsubmit=e=>{e.preventDefault();if(!f.reportValidity())return;const v=Object.fromEntries(new FormData(f));open(`https://wa.me/${WA}?text=${encodeURIComponent(`Hi Bliss & Co.! Enquiry from ${v.n}\nPhone: ${v.p}\nEmail: ${v.e}\n${v.m}`)}`,"_blank")}};
draw();
