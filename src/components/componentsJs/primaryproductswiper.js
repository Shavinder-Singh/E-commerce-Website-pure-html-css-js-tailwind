
const fileLinks = [
    { selector: ".swiper_arrivals" },
    { selector: ".swiper_topselling" },
    { selector: ".otherproducts" },
]


function productId() {
    fileLinks.forEach(target => {
        const container = document.querySelector(target.selector);
        if (!container) return;
        fetch("../../components/swiper.html")
            .then(res => res.text())
            .then(html => {
                container.innerHTML = html;
                fetch('../../jsonfiles/products.json')
                    .then(res => res.json())
                    .then(data => {


                        const primary_swiper_wrapper = container.querySelector('.primary_swiper_wrapper');
                        const product = data.sort(() => Math.random() - 0.5);

                        product.forEach(item => {
                            // discount shows
                            let discounts = "";
                            if (item.discount && item.discount > 0) {
                                discounts = `
                                  <span
                                class=" bg-[#ff00001a] rounded-[62px] px-[5px] py-[6px]">
                                 <span class="text-[#FF3333] opacity-[100%] font-medium text-[10px] lg:text-[12px] block font-satoshimedium relative top-0">
                                    -${item.discount}%
                                 </span><span>`;
                            }
                            else {
                                discounts = `<span class="hidden">
        
                                 </span>`;
                            }
                            // minus sign price
                            let lessPrice = "";
                            if (item.price && item.discount && item.discount > 0) {

                                let discountAmonut = Math.floor((item.discount * item.price) / 100);
                                discountPrice = Math.floor(discountAmonut - item.price);
                                lessPrice = `
                                  <span
                                class="text-[20px] lg:text-[24px] font-satoshibold line-through text-[#000000] opacity-40">$${discountPrice}</span>                                  
                                 `;
                            }

                            // showing Stars
                            let stars = "";
                            if (item.rating) {
                                let fullStar = Math.floor((item.rating));
                                let halfStar = item.rating % 1 > 0.2;
                                for (let i = 0; i < fullStar; i++) {
                                    stars += `<div>
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.73375 0.279785L9.92481 4.99779L15.089 5.62367L11.279 9.16544L12.2795 14.2703L7.73375 11.7412L3.18796 14.2703L4.18853 9.16544L0.378517 5.62367L5.54268 4.99779L7.73375 0.279785Z" fill="#FFC633"></path>
                                </svg>
                                    </div>`;
                                }
                                if (halfStar) {
                                    // for (let i = 0; i < halfStar; i++) {
                                    stars += `<div>
                                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.45422 14.2703L8.00001 11.7412V0.279785L5.80894 4.99779L0.644775 5.62367L4.45478 9.16544L3.45422 14.2703Z" fill="#FFC633"></path>
                                </svg>
                                    </div>`;
                                    // }
                                }
                            }
                            primary_swiper_wrapper.innerHTML += `
                <div class="swiper-slide swiper_slide_primary_products"  id=${item.id} onclick="displayProductId(${item.id})">

                <div class="swiper_slide_box flex items-start flex-col w-[100%]">
                        <div class="w-[198px] h-[200px] lg:w-[270px] p-[10px] lg:h-[270px] rounded-[33.42px] 2xl:w-[295px]  2xl:h-[298px] mb-[10px] lg:mb-[16px]">
                            <img src="${item.image}" alt="tshirt"
                                class="w-[100%] h-[100%] object-contain rounded-[13.42px] md:hidden">
                            <img src="${item.image}" alt="tshirt"
                                class="w-[100%] h-[100%]  rounded-[30.42px] hidden md:flex">
                        </div>
                        <div class="mb-[4px] lg:mb-[8px] w-[95%]">
                            <p class="font-satoshibold text-[16px] lg:text-[20px] text-left truncate">${item.title}
                            
                            </p>
                        </div>
                        <div class="mb-[4px] flex items-center gap-[11px]">
                            <div class="flex gap-[4.44px] lg:gap-[5.31px]">
                            ${stars}

                            </div>
                            <div class="text-[12px] font-satoshiregular  lg:text-[14px]">${item.rating}/<span
                                    class="text-[#000000] opacity-[60%] font-satoshiregular">5</span>
                            </div>
                        </div>
                        <div class="font-satoshibold flex items-center gap-[5px] lg:gap-[10px]"><span class="text-[20px] lg:text-[24px] whitespace-nowrap">$ ${item.price}</span>
                        ${lessPrice}
                        ${discounts} 

                        </div>
                        </div>
                    </div>
                `;
                        })

                    })
            })
    })
}


function displayProductId(id) {
    console.log("Product id", id);
    localStorage.setItem("ProductId", id);
    window.location.href = "../../pages/productdetailpage/productdetail.html"
}
productId();
