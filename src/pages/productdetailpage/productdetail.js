// showing each section below detail of Product
const sendProduct = {
    id: null,
    size: "S",
    color: "red",
    quantity: 1,
    price: null,
    countPrice: null,
    discount: null,
};

// product details users add something 
function getSize(button) {
    document.querySelectorAll(".size_btn").forEach(btn => {
        btn.classList.add("text-[#000000]", "bg-bggray");
        btn.classList.remove("text-white", "bg-black", "opacity-[100%]");
    })
    button.classList.remove("text-[#000000]", "bg-bggray");
    button.classList.add("text-white", "bg-black", "opacity-[100%]");
    sendProduct.size = button.value;

}
function getColor(color) {
    document.querySelectorAll(".colorTickIcon").forEach(btn => {
        btn.classList.add("hidden");
        btn.classList.remove("flex");
    })
    color.querySelector(".colorTickIcon").classList.add("flex");
    color.querySelector(".colorTickIcon").classList.remove("hidden");
    sendProduct.color = color.getAttribute("data-color");
}



let quantityCount = 1;

function updateQuantity(id) {
    quantityCount += id;
    if (quantityCount < 1) {
        quantityCount = 1;
    }
    const value = quantityCount;
    const quantity_number = document.querySelector(".quantity_number");
    quantity_number.textContent = value;
    sendProduct.quantity = value;
}
// write a review code
function senddata(productId) {
    const isLoggedIn = JSON.parse(localStorage.getItem("LoggedIn")) || [];
    if (!isLoggedIn.length > 0) {
        alert("First Fill Form");
        window.location.href = "../formpage/signup.html"
    }
    else {
        const cart = JSON.parse(localStorage.getItem("UpdatedData :")) || [];
        const isDuplicate = cart.some(item => item.id === sendProduct.id && item.size === sendProduct.size && item.color === sendProduct.color && item.quantity === sendProduct.quantity);

        if (isDuplicate) {
            alert("items is already added");
            return;
        }
        // cart = cart.filter(item => item.id !== sendProduct.id);
        cart.push(sendProduct);
        localStorage.setItem("UpdatedData :", JSON.stringify(cart));
        if (window.fetchedItems) {
            window.fetchedItems();
        }
        const fade_wrapper_cart = document.querySelector(".fade_wrapper_cart");
        const cartsidebar_wrapper = document.querySelector(".cartsidebar_wrapper");
        cartsidebar_wrapper.classList.remove("opacity-0", "hidden", "right-[-100%]", "md:right-[-449px]");
        cartsidebar_wrapper.classList.add("opacity-100", "right-0");
        document.body.style.overflowY = "hidden"
        document.documentElement.style.overflowY = "hidden"
        fade_wrapper_cart.classList.remove("hidden")



    }
}

// showinf Product  on detail page
setTimeout(() => {
    const rating_reviews_btn = document.querySelector(".rating_reviews_btn");
    const faq_btn = document.querySelector(".faq_btn");

    const rating_reviews_wrapper = document.querySelector(".main_reviews_wrapper");
    const reviews_main_btns = document.querySelector(".reviews_main_btns");
    const faq_section = document.querySelector(".faq_section");


    fetch("../../jsonfiles/products.json")
        .then(res => res.json())
        .then(data => {
            const dataId = localStorage.getItem("ProductId") || [];
            const findedData = data.find(item => item.id == dataId);
            const product_detail_wrapper = document.querySelector(".product_detail_wrapper");
            // send to localstorage updated data
            sendProduct.id = findedData.id;
            sendProduct.price = findedData.price;
            sendProduct.discount += findedData.discount || 0;

            const sizes = findedData.sizes.map(size => {
                return `
                         <div>
                     <button value="${size}" onclick="getSize(this)" class="size_btn font-satoshiregular lg:text-[16px] text-[14px] xs:text-[14px] opacity-[60%] text-[#000000] bg-bggray rounded-[62px] py-[10px] px-[20px]">
                       ${size} 
                      </button>
                     </div>
                        `;
            }).join("");

            const colors = Object.values(findedData.colors).map(colors => {
                return `
              <div data-color="${colors}" class="relative top-0" value="${colors}" onclick="getColor(this)">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="${colors}" 
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="19.5677" r="19.5677" fill="${colors}" />
                                    </svg>

                                    <span class="colorTickIcon hidden absolute top-[11px] left-[10px] ">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="${colors}"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.9463 5.89809L7.48459 14.3598C7.41089 14.4337 7.32332 14.4924 7.22689 14.5325C7.13047 14.5725 7.02708 14.5931 6.92268 14.5931C6.81827 14.5931 6.71489 14.5725 6.61846 14.5325C6.52204 14.4924 6.43447 14.4337 6.36077 14.3598L2.65878 10.6578C2.58498 10.584 2.52645 10.4964 2.48652 10.4C2.44658 10.3036 2.42603 10.2002 2.42603 10.0959C2.42603 9.99153 2.44658 9.8882 2.48652 9.79179C2.52645 9.69537 2.58498 9.60777 2.65878 9.53398C2.73257 9.46019 2.82017 9.40166 2.91658 9.36172C3.01299 9.32178 3.11633 9.30123 3.22069 9.30123C3.32504 9.30123 3.42838 9.32178 3.52479 9.36172C3.6212 9.40166 3.7088 9.46019 3.7826 9.53398L6.92334 12.6747L14.8238 4.7756C14.9728 4.62657 15.1749 4.54285 15.3857 4.54285C15.5965 4.54285 15.7986 4.62657 15.9476 4.7756C16.0966 4.92462 16.1804 5.12675 16.1804 5.33751C16.1804 5.54826 16.0966 5.75039 15.9476 5.89942L15.9463 5.89809Z"
                                                fill="white" />
                                        </svg>
                                    </span>
                     </div>
                        `;
            }).join("");

            // minus sign price
            let lessPrice = "";
            if (findedData.price && findedData.discount && findedData.discount > 0) {

                const discountAmonut = Math.floor((findedData.discount * findedData.price) / 100);
                discountPrice = Math.floor(discountAmonut - findedData.price);
                lessPrice = `
                                  <span
                                class="text-[24px]  md:text-[29px] lg:text-[32px] 2xl:text-[40px] font-satoshibold line-through text-[#000000] opacity-40">$${discountPrice}</span>                                  
                                 `;
            }

            if (findedData) {

                // discounts show 
                let discounts = "";
                if (findedData.discount && findedData.discount > 0) {
                    discounts = `
                                  <span
                                class=" bg-[#ff00001a] rounded-[62px] px-[5px] py-[6px] md:px-[10px] md:py-[8px]">
                                 <span class="text-[#FF3333] opacity-100 font-medium text-[14px]  md:text-[16px] block font-satoshimedium relative top-0">
                                    -${findedData.discount}%
                                 </span><span>`;
                }
                else {
                    discounts = `<span class="hidden">
                        
                                 </span>`;
                }

                let stars = "";
                if (findedData.rating) {
                    const fullStar = Math.floor((findedData.rating));
                    const halfStar = findedData.rating % 1 > 0.2;
                    for (let i = 0; i < fullStar; i++) {
                        stars += `<div>
                                    <svg width="18.67" height="18.67" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.73375 0.279785L9.92481 4.99779L15.089 5.62367L11.279 9.16544L12.2795 14.2703L7.73375 11.7412L3.18796 14.2703L4.18853 9.16544L0.378517 5.62367L5.54268 4.99779L7.73375 0.279785Z" fill="#FFC633"></path>
                                </svg>
                                    </div>`;
                    }
                    if (halfStar) {
                        // for (let i = 0; i < halfStar; i++) {
                        stars += `<div>
                                   <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.51376 17.0512L9.00005 13.9989V0.166138L6.35566 5.86028L0.123047 6.61566L4.72133 10.8902L3.51376 17.0512Z" fill="#FFC633"/>
</svg>

                                    </div>`;
                        // }
                    }
                }

                product_detail_wrapper.innerHTML = `

                    
             <div
                    class="product_detail_image_wrapper  mb-[20px]  md:mb-[0px] md:w-[50%] ">
                    <div
                        class="big_image_wrapper w-[100%] h-[290px]   md:pb-[0px] md:mb-[10px] customlg:mb-[0px] mb-[12px] md:mt-[0px]">
                        <img src="${findedData.image}" alt="product image"
                            class=" w-[100%] h-[100%] big_image rounded-[20px] shadow-2xs ">
                       

                    </div>
                    <div
                        class="three_images_wrapper w-[100%] flex justify-evenly customlg:gap-[14px] gap-[12px]">
                        <div class="w-[112px]  h-[106px]  firstimageConvert rounded-[20px]   border-[1px] " >
                            <img src="${findedData.image}" alt="product image"  class="first_image_product_detail xs:p-[5px] w-[100%] h-[100%]     rounded-[20px]">

                        </div>
                        <div class="w-[111px]  h-[106px]  secondimageConvert rounded-[20px]">
                            <img src="${findedData.image}" alt="product image" class="second_image_product_detail filter grayscale  shadow-2xl  xs:p-[5px] w-[100%] h-[100%]      rounded-[20px]  ">

                        </div>
                        <div class="w-[111px]  h-[106px]  thirdimageConvert rounded-[20px]">
                            <img src="${findedData.image}" alt="product image" class="third_image_product_detail xs:p-[5px] filter  sepia-50 shadow-2xl w-[100%] h-[100%]    rounded-[20px] ">
                        
                        </div>
                    </div>

                </div>
                <!-- details -->
                <div class="md:w-[50%] 2xl:flex-1">
                    <div class="md:mb-[20px] 2xl:mb-[24px]">
                        <h1
                            class="mb-[12px] lg:mb-[14px] text-[24px] lg:text-[30px] xl:text-[40px]  font-integral font-bold text-[#000000] opacity-[100%]">
                            ${findedData.title}</h1>
                        <div class="flex gap-[16px] mb-[12px] items-center md:mb-[14.29px]">
                        <div class="flex gap-[5.36px] md:gap-[7.31]">
                           ${stars}
                           </div>
                           <div class="text-[#000000] opacity-[100%] text-[14px] md:text-[16px] font-satoshiregular">
                           ${findedData.rating}<span class="text-[#000000] opacity-[60%]  font-satoshiregular">/5</span>
                           </div>
                        </div>
                        <div class="mb-[10px] lg:mb-[20px]">
                            <div class="font-satoshi flex gap-[10px] md:gap-[12px] items-center">
                                <span
                                    class="font-satoshibold text-[24px]  md:text-[29px] lg:text-[32px] 2xl:text-[40px]">$${findedData.price}</span>
                                ${lessPrice}
                                ${discounts}
                            </div>
                        </div>
                        <div class="mb-[24px]">
                            <p
                                class="font-satoshiregular leading-[20px] text-[14px] lg:text-[16px] 2xl:text-[16px] lg:leading-[22px] text-[#000000] opacity-[60%] xs:max-w-[90%]">
                                ${findedData.description}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div
                            class="pt-[24px] lg:pt-[20px] 2xl:pt-[24px] mb-[24px] 2xl:mb-[24px] lg:mb-[24px] border-t-[1px] border-black/10  flex flex-col gap-[16px]">
                            <p class="font-satoshiregular text-[#000000] opacity-[60%] text-[14px] lg:text-[16px]">Select Colors</p>
                            <div class="flex gap-[12px] lg:gap-[16px]">
                               ${colors}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            class="pt-[24px] md:pt-[20px]  mb-[24px] 2xl:pt-[24px] 2xl:mb-[24px]  border-t-[1px] border-black/10  flex flex-col gap-[16px]">
                            <p class="font-satoshiregular text-[#000000] opacity-[60%] text-[14px] lg:text-[16px]">Choose Size </p>
                            <div class="flex gap-[8px] lg:gap-[12px] ">
                                  ${sizes}                              
                            </div>
                        </div>
                    </div>
                    <div class="pt-[24px] md:pt-[20px] 2xl:pt-[20px] border-t-[1px] border-black/10 ">
                        <div>
                            <div>
                                <div class="flex flex-col gap-[16px]">
                                    <div class="flex gap-[12px]">
                                        <div
                                            class="flex gap-[16px] px-[16px] py-[12px] text-[#000000] bg-bggray rounded-[62px] items-center">
                                            <span class="quantity_less_icon" onclick="updateQuantity(-1)">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                                        fill="black" />
                                                </svg>
                                            </span>
                                             <button value="1" min="1" 
                                                class="quantity_number font-satoshi lg:text-[16px] text-[12px] xs:text-[14px] opacity-[60%]">
                                                1
                                            </button>
                                            <span class="quantity_increase_icon" onclick="updateQuantity(+1)">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                                        fill="black" />
                                                </svg>

                                            </span>
                                        </div>
                                        <div class="w-[100%]">
                                            <button onclick="senddata(${findedData.id})"
                                                class="font-satoshimedium w-[100%] lg:text-[14px] 2xl:text-[16px] text-[12px] xs:text-[14px] bg-[#000000] opacity-[100%] text-secondary rounded-[62px] py-[16px] px-[20px]">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
                const big_image = document.querySelector(".big_image");
                const firstimageConvert = document.querySelector(".firstimageConvert");
                const secondimageConvert = document.querySelector(".secondimageConvert");
                const thirdimageConvert = document.querySelector(".thirdimageConvert");


                firstimageConvert.addEventListener("click", () => {
                    big_image.src = findedData.image;
                    big_image.classList.remove("filter", "grayscale", "sepia-50")
                    firstimageConvert.classList.add("border-[1px]")
                    secondimageConvert.classList.remove("border-[1px]")
                    thirdimageConvert.classList.remove("border-[1px]")


                })
                secondimageConvert.addEventListener("click", () => {
                    big_image.src = findedData.image;
                    big_image.classList.add("filter", "grayscale")
                    firstimageConvert.classList.remove("border-[1px]")

                    secondimageConvert.classList.add("border-[1px]")
                    thirdimageConvert.classList.remove("border-[1px]")



                })
                thirdimageConvert.addEventListener("click", () => {
                    big_image.src = findedData.image;
                    big_image.classList.add("filter", "sepia-50")

                    firstimageConvert.classList.remove("border-[1px]")
                    secondimageConvert.classList.remove("border-[1px]")
                    thirdimageConvert.classList.add("border-[1px]")


                })
            }
        });








    // when click on any btn show its inside div's like product detail , faq ,rating and reviewsF


    rating_reviews_btn.addEventListener("click", () => {
        faq_section.classList.add("opacity-[0]", "absolute");
        faq_section.classList.remove("opacity-[100%]");


        rating_reviews_wrapper.classList.add("opacity-[100%]", "z-[999]");
        rating_reviews_wrapper.classList.remove("absolute");
        rating_reviews_btn.classList.add("font-satoshimedium", "border-b-[2px]", "opacity-[100%]")

        faq_btn.classList.add("opacity-[60%]")
        faq_btn.classList.remove("font-satoshimedium", "border-b-[2px]", "opacity-[100%]")
        reviews_main_btns.classList.remove("hidden")


    })
    faq_btn.addEventListener("click", () => {
        rating_reviews_wrapper.classList.add("opacity-0", "absolute", "z-[0]");
        rating_reviews_wrapper.classList.remove("opacity-[100%]", "z-[999]");
        faq_section.classList.add("opacity-[100%]", "z-[999]");
        faq_section.classList.remove("absolute");
        faq_section.classList.remove("h-0");
        faq_section.classList.remove("overflow-hidden");

        reviews_main_btns.classList.add("hidden")
        faq_btn.classList.add("font-satoshimedium", "border-b-[2px]", "opacity-[100%]")

        rating_reviews_btn.classList.add("opacity-[60%]")
        rating_reviews_btn.classList.remove("font-satoshimedium", "border-b-[2px]", "opacity-[100%]")

    })
}, 100);
