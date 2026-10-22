/* AnySales storefront demo. Replace example products and configure your real order channel before launch. */
const PRODUCTS = [
  {id:1,name:"Organizador multiuso",category:"Casa",price:850,description:"Mais ordem para os pequenos espaços.",emoji:"🧺",tone:"#e7edff",tag:"MAIS PRÁTICO"},
  {id:2,name:"Suporte para telemóvel",category:"Acessórios",price:650,description:"Mantém o teu telemóvel sempre à mão.",emoji:"📱",tone:"#e6f3f1",tag:"DIA A DIA"},
  {id:3,name:"Protector solar para carro",category:"Carro",price:1200,description:"Ajuda a reduzir a exposição directa ao sol.",emoji:"🚘",tone:"#fff0df",tag:"PARA O CARRO"},
  {id:4,name:"Luz LED portátil",category:"Casa",price:950,description:"Iluminação prática onde precisares.",emoji:"💡",tone:"#fff5d9",tag:"ESCOLHA ÚTIL"},
  {id:5,name:"Garrafa reutilizável",category:"Acessórios",price:700,description:"Leva a tua bebida contigo durante o dia.",emoji:"🥤",tone:"#e3f1ff",tag:"EM MOVIMENTO"},
  {id:6,name:"Organizador para carro",category:"Carro",price:1100,description:"Ajuda a manter os essenciais arrumados.",emoji:"🚗",tone:"#e9eafa",tag:"MAIS ORDEM"},
  {id:7,name:"Luminária de mesa",category:"Casa",price:1450,description:"Um toque funcional para o teu espaço.",emoji:"🪔",tone:"#f8e9dc",tag:"PARA O TEU ESPAÇO"},
  {id:8,name:"Bolsa de acessórios",category:"Acessórios",price:780,description:"Guarda os pequenos essenciais num só lugar.",emoji:"👝",tone:"#f8e7ef",tag:"ORGANIZAÇÃO"}
];
const cart = new Map();
const $ = (selector) => document.querySelector(selector);
const money = (value) => new Intl.NumberFormat("pt-MZ",{maximumFractionDigits:0}).format(value) + " MT";
let toastTimer;
function showToast(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600)}
function renderProducts(){
  const term=$("#product-search").value.trim().toLocaleLowerCase("pt");
  const category=$("#category-filter").value;
  const visible=PRODUCTS.filter(p=>(category==="all"||p.category===category)&&[p.name,p.category,p.description].some(v=>v.toLocaleLowerCase("pt").includes(term)));
  $("#product-grid").innerHTML=visible.map(p=>`<article class="product-card">
    <div class="product-image" style="background:${p.tone}"><span class="art-backdrop" style="background:color-mix(in srgb,${p.tone},#fff 18%)"></span><span class="product-art" aria-hidden="true">${p.emoji}</span><span class="product-tag">${p.tag}</span></div>
    <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p>
    <div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Adicionar ${p.name} ao carrinho">+</button></div></div></article>`).join("");
  $("#empty-state").hidden=visible.length>0;
}
function cartCount(){return [...cart.values()].reduce((sum,item)=>sum+item.quantity,0)}
function cartTotal(){return [...cart.values()].reduce((sum,item)=>sum+item.product.price*item.quantity,0)}
function addToCart(id){const product=PRODUCTS.find(p=>p.id===id);if(!product)return;const item=cart.get(id);if(item)item.quantity++;else cart.set(id,{product,quantity:1});renderCart();showToast(product.name+" adicionado ao carrinho.")}
function changeQuantity(id,delta){const item=cart.get(id);if(!item)return;item.quantity+=delta;if(item.quantity<=0)cart.delete(id);renderCart()}
function renderCart(){
  $("#cart-count").textContent=cartCount();
  const items=[...cart.values()];
  $("#cart-items").innerHTML=items.map(({product:p,quantity})=>`<div class="cart-line"><div class="cart-line-art" style="background:${p.tone}">${p.emoji}</div><div><h3>${p.name}</h3><p>${money(p.price)} cada</p><div class="quantity-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Diminuir quantidade">−</button><span>${quantity}</span><button data-qty="${p.id}" data-delta="1" aria-label="Aumentar quantidade">+</button></div></div><div><strong style="font-size:11px">${money(p.price*quantity)}</strong><br><button class="remove-item" data-remove="${p.id}">Remover</button></div></div>`).join("");
  $("#cart-empty").hidden=items.length>0;$("#cart-footer").hidden=items.length===0;$("#cart-total").textContent=money(cartTotal());
}
function openCart(){$("#cart-overlay").hidden=false;$("#cart-drawer").classList.add("is-open");$("#cart-drawer").setAttribute("aria-hidden","false");document.body.classList.add("cart-open");$("#close-cart").focus()}
function closeCart(){$("#cart-overlay").hidden=true;$("#cart-drawer").classList.remove("is-open");$("#cart-drawer").setAttribute("aria-hidden","true");document.body.classList.remove("cart-open");$("#open-cart").focus()}
$("#product-grid").addEventListener("click",event=>{const button=event.target.closest("[data-add]");if(button)addToCart(Number(button.dataset.add))});
$("#cart-items").addEventListener("click",event=>{const qty=event.target.closest("[data-qty]");const remove=event.target.closest("[data-remove]");if(qty)changeQuantity(Number(qty.dataset.qty),Number(qty.dataset.delta));if(remove){cart.delete(Number(remove.dataset.remove));renderCart()}});
$("#product-search").addEventListener("input",renderProducts);$("#category-filter").addEventListener("change",renderProducts);
$("#open-cart").addEventListener("click",openCart);$("#close-cart").addEventListener("click",closeCart);$("#cart-overlay").addEventListener("click",closeCart);
$("#continue-shopping").addEventListener("click",closeCart);
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&$("#cart-drawer").classList.contains("is-open"))closeCart()});
$("#checkout-button").addEventListener("click",()=>{
  const lines=[...cart.values()].map(({product,quantity})=>`- ${product.name} x${quantity}: ${money(product.price*quantity)}`).join("\n");
  const message=`Olá, AnySales! Gostaria de confirmar a disponibilidade e fazer esta encomenda:\n\n${lines}\n\nTotal estimado: ${money(cartTotal())}\n\nPodem confirmar o custo de entrega e as opções de pagamento?`;
  /* Configure the store's real WhatsApp number before launch. No destination is guessed here. */
  const phone=window.ANYSALES_WHATSAPP_NUMBER;
  if(!phone){showToast("Carrinho pronto. O contacto WhatsApp da loja ainda precisa de ser configurado.");const blob=new Blob([message],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download="encomenda-anysales.txt";link.click();URL.revokeObjectURL(url);return}
  window.open("https://wa.me/"+String(phone).replace(/\D/g,"")+"?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
});
$("#year").textContent=new Date().getFullYear();renderProducts();renderCart();