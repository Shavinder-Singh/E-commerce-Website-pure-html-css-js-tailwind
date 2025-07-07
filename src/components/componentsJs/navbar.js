let swiperInstance;

function initSearchSwiper() {
    if (swiperInstance) {
        swiperInstance.destroy(true, true); // destroy old one
    }
    swiperInstance = new Swiper(".search_slider", {
        slidesPerView: 2,
        spaceBetween: 20,
        breakpoints: {
            320: { slidesPerView: 2, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 20 },
        }
    });
}

// mobile menu bar opens or close code---------------------------------------------------------1
var menu_bar = document.querySelector(".menu_bar");
var mobile_nav = document.querySelector(".mobile_nav");
var close_icon_menubar = document.querySelector(".close_icon_menubar");
// open CartSideBar for laptop and then mobile---------------------------------------------------------2
var cart_icon = document.querySelector(".cart_icon");
var cartsidebar_wrapper = document.querySelector(".cartsidebar_wrapper");
var close_icon_cartsidebar = document.querySelector(".close_icon_cartsidebar");
var cart_icon_mobile = document.querySelector(".cart_icon_mobile");
// code for opening Searchbar in mobile or laptop---------------------------------------------------------3
const searchIcon = document.querySelector(".mobile_searchbarIcon");
const searchItemsWrapper = document.querySelector(".search_bar_items_wrapper");
var searchbar_secondclose_icon = document.querySelector(".searchbarclose_icon_second");
var searchBarMobile = document.querySelector(".search_bar_mobile");
const searchInput = document.getElementById("search_bar2");
// fade div
var fade_wrapper_cart = document.querySelector(".fade_wrapper_cart");

// count items --- cart icon count
var count_addItems = document.querySelector(".count_addItems");
var count_addItems_mobile = document.querySelector(".count_addItems_mobile");

// Flags for  Menu,Cart,Search
let isMenubarOpen = false;
let isOpenCartbar = false;
let isSearchVisible = false;



// Menubar Code
menu_bar.addEventListener("click", () => {
    if (!isMenubarOpen) {
        mobile_nav.classList.add("left-[0px]", "z-[999]");
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        isMenubarOpen = true;
    }
})
close_icon_menubar.addEventListener("click", () => {
    if (isMenubarOpen) {
        mobile_nav.classList.remove("left-[0px]");
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
        isMenubarOpen = false;
    }
});






// cart icon laptop open or close cartbar
if (!window.location.href.includes("cartpage.html")) {
    cart_icon.addEventListener("click", () => {
        if (!isOpenCartbar) {
            cartsidebar_wrapper.classList.remove("opacity-0", "right-[-100%]", "md:right-[-449px]");
            cartsidebar_wrapper.classList.add("opacity-100", "right-0");
            document.body.style.overflowY = "hidden"
            document.documentElement.style.overflowY = "hidden"
            fade_wrapper_cart.classList.remove("hidden")

            isOpenCartbar = true;
        }
    });

    close_icon_cartsidebar.addEventListener("click", () => {
        if (isOpenCartbar) {
            cartsidebar_wrapper.classList.remove("opacity-100", "right-0");
            cartsidebar_wrapper.classList.add("opacity-0", "right-[-100%]", "md:right-[-449px]");
            document.body.style.overflowY = "auto"
            document.documentElement.style.overflowY = "auto"
            fade_wrapper_cart.classList.add("hidden")

            isOpenCartbar = false;
        }
    });
}
// cart icon Mobile open or close cartbar

cart_icon_mobile.addEventListener("click", () => {
    if (!isOpenCartbar) {
        mobile_nav.classList.add("hidden")
        cartsidebar_wrapper.classList.add("opacity-100", "right-0");
        cartsidebar_wrapper.classList.remove("opacity-0", "right-[-100%]", "md:right-[-449px]");
        document.body.style.overflowY = "hidden"
        document.documentElement.style.overflowY = "hidden"
        fade_wrapper_cart.classList.remove("hidden");
    }
})

close_icon_cartsidebar.addEventListener("click", () => {
    if (!isOpenCartbar) {
        cartsidebar_wrapper.classList.remove("opacity-100", "right-0");
        cartsidebar_wrapper.classList.add("opacity-0", "right-[-100%]", "md:right-[-449px]");
        document.body.style.overflowY = "auto"
        document.documentElement.style.overflowY = "auto"
        fade_wrapper_cart.classList.add("hidden")
        setTimeout(() => {
            mobile_nav.classList.remove("hidden")
        }, 500);
    }

})


// Toggle search bar on icon click
searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    isSearchVisible = !isSearchVisible;

    if (isSearchVisible) {
        searchBarMobile.classList.remove("hidden");
        searchItemsWrapper.classList.remove("hidden");
        searchItemsWrapper.style.display = "block";
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        searchInput.focus();
    } else {
        searchBarMobile.classList.add("hidden");
        searchItemsWrapper.classList.add("hidden");
        searchItemsWrapper.style.display = "none";
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
    }
});
searchbar_secondclose_icon.addEventListener("click", () => {
    searchItemsWrapper.style.display = "none";
    searchBarMobile.classList.add("hidden");
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    isSearchVisible = false;
})
window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
        searchBarMobile.classList.add("hidden");
        searchItemsWrapper.classList.add("hidden")
    }
})


// searchbar Js Code
fetch("../../jsonfiles/products.json")
    .then(res => res.json())
    .then(data => {
        fetch("../../jsonfiles/products.json")
            .then(res => res.json())
            .then(fakedata => {

                const sendData = data.map(realItem => {
                    const extraItem = fakedata.find(e => e.id === realItem.id) || {};
                    return { ...realItem, ...extraItem };
                })

                setTimeout(() => {
                    var search_bar = document.getElementById("search_bar");
                    var search_bar2 = document.getElementById("search_bar2");

                    [search_bar, search_bar2].forEach(bar => {
                        bar.addEventListener("input", () => {
                            var search_bar_items_wrapper = document.querySelector(".search_bar_items_wrapper");
                            search_bar_items_wrapper.style.display = "block";
                            document.body.style.overflowY = "hidden";
                            // 
                            var input = bar.value.toLowerCase();

                            var filterProduct = sendData.filter((item => item.title.toLowerCase().includes(input)));
                            var swiper_wrapper = document.querySelector(".swiper-wrapper");
                            swiper_wrapper.innerHTML = " ";
                            if (input == "") {
                                search_bar_items_wrapper.style.display = "none";
                                document.body.style.overflowY = "";
                                return;
                            }
                            filterProduct.slice(0, 9).map((item => {
                                var div = document.createElement("div");
                                div.classList.add("swiper-slide");
                                div.id = `${item.id}`;

                                div.innerHTML = `
              <div class="swiper_slide_box flex items-start flex-col pl-[17px]" onclick="redirectToDetailPage(${item.id})">
                   <div class="w-[198px] h-[200px] border[1px]  lg:w-[295px] lg:h-[298px] 2xl:w-[295px]  2xl:h-[298px] mb-[10px] lg:mb-[16px]">
                            <img src="${item.image}" alt="tshirt"
                                class="w-[100%] h-[100%] object-contain rounded-[12px] md:hidden">
                            <img src="${item.image}" alt="tshirt"
                                class="w-[100%] h-[100%] object-contain rounded-[12px] hidden md:flex">
                        </div>
                    <div class="mb-[4px] lg:mb-[8px] w-[95%]">
                        <p class="font-satoshibold text-[16px] lg:text-[20px] text-left truncate">${item.title}</p>
                    </div>
                    <div class="mb-[4px] flex items-center gap-[11px]">
                        <div class="flex gap-[4.44px] lg:gap-[5.31px]">
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.73375 0.279785L9.92481 4.99779L15.089 5.62367L11.279 9.16544L12.2795 14.2703L7.73375 11.7412L3.18796 14.2703L4.18853 9.16544L0.378517 5.62367L5.54268 4.99779L7.73375 0.279785Z"
                                    fill="#FFC633" />
                            </svg>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.73375 0.279785L9.92481 4.99779L15.089 5.62367L11.279 9.16544L12.2795 14.2703L7.73375 11.7412L3.18796 14.2703L4.18853 9.16544L0.378517 5.62367L5.54268 4.99779L7.73375 0.279785Z"
                                    fill="#FFC633" />
                            </svg>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.73375 0.279785L9.92481 4.99779L15.089 5.62367L11.279 9.16544L12.2795 14.2703L7.73375 11.7412L3.18796 14.2703L4.18853 9.16544L0.378517 5.62367L5.54268 4.99779L7.73375 0.279785Z"
                                    fill="#FFC633" />
                            </svg>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.73375 0.279785L9.92481 4.99779L15.089 5.62367L11.279 9.16544L12.2795 14.2703L7.73375 11.7412L3.18796 14.2703L4.18853 9.16544L0.378517 5.62367L5.54268 4.99779L7.73375 0.279785Z"
                                    fill="#FFC633" />
                            </svg>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.73375 0.279785L9.92481 4.99779L15.089 5.62367L11.279 9.16544L12.2795 14.2703L7.73375 11.7412L3.18796 14.2703L4.18853 9.16544L0.378517 5.62367L5.54268 4.99779L7.73375 0.279785Z"
                                    fill="#FFC633" />
                            </svg>
                            <svg width="8" height="15" viewBox="0 0 8 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.45422 14.2703L8.00001 11.7412V0.279785L5.80894 4.99779L0.644775 5.62367L4.45478 9.16544L3.45422 14.2703Z"
                                    fill="#FFC633" />
                            </svg>

                        </div>
                        <div class="text-[12px] font-satoshiregular  lg:text-[14px]">${item.rating} /<span
                                class="text-[#000000] opacity-[60%] font-satoshiregular"> 5</span>
                        </div>
                    </div>
                    <div class="font-satoshibold flex items-center gap-[5px] lg:gap-[10px]"><span class="text-[20px] lg:text-[24px]">$ ${item.price}</span> <span
                            class="text-[20px] lg:text-[24px] font-satoshibold line-through text-[#000000] opacity-40">$160</span> <span
                            class=" bg-[#ff00001a] rounded-[62px] px-[5px] py-[6px]"><span
                                class="text-[#FF3333] opacity-[100%] font-medium text-[10px] lg:text-[12px] block font-satoshimedium relative top-0">-30%</span></span>
                    </div>
                </div>
            `;
                                swiper_wrapper.appendChild(div)
                            }))
                            initSearchSwiper();

                        })

                    })
                }, 100);
            })
    })

function redirectToDetailPage(productid) {
    localStorage.setItem("ProductId", JSON.stringify(productid));
    window.location.href = "../../pages/productdetailpage/productdetail.html"
}






// cartsidebar
if (!window.location.href.includes("cartpage.html")) {
    function fetchedItems() {
        fetch("../../jsonfiles/products.json")
            .then(res => res.json())
            .then(data => {
                let MainData = [];
                const cartData = JSON.parse(localStorage.getItem("UpdatedData :")) || [];
                document.querySelector(".cart_Sidebar_products").innerHTML = "";


                if (!window.location.href.includes("cartpage.html")) {
                    if (cartData.length === 0) {
                        count_addItems.style.display = "none";
                        count_addItems.classList.remove("absolute", "top-[-12px]", "bg-black", "text-white", "right-[-11px]", "rounded-[62px]", "px-[7px]", "py-[2px]", "text-[12px]")
                        // for mobile cart count
                        count_addItems_mobile.style.display = "none";
                        count_addItems_mobile.classList.remove("absolute", "top-[-12px]", "bg-black", "text-white", "right-[-11px]", "rounded-[62px]", "px-[8px]", "py-[2px]", "text-[12px]")
                    }
                    else {
                        count_addItems.style.display = "block";
                        count_addItems.innerHTML = cartData.length;
                        count_addItems.classList.add("absolute", "top-[-12px]", "bg-black", "text-white", "right-[-11px]", "rounded-[62px]", "px-[7px]", "py-[2px]", "text-[12px]")
                        // for mobile cart count
                        count_addItems_mobile.style.display = "block";
                        count_addItems_mobile.innerHTML = cartData.length;
                        count_addItems_mobile.classList.add("absolute", "top-[-12px]", "bg-black", "text-white", "right-[-11px]", "rounded-[62px]", "px-[8px]", "py-[2px]", "text-[12px]")
                    }
                }
                cartData.forEach((item, index) => {

                    const matchedProduct = data.find(dataId => dataId.id == item.id);

                    if (matchedProduct) {
                        const fullproduct = {
                            ...matchedProduct,
                            sizes: item.size,
                            colors: item.color,
                            quantity: item.quantity,
                        }

                        MainData.push(fullproduct);
                        console.log(MainData);

                        document.querySelector(".cart_Sidebar_products").innerHTML = "";

                        MainData.forEach((item, index) => {
                            const cart_Sidebar_products = document.querySelector(".cart_Sidebar_products");
                            cart_Sidebar_products.innerHTML += `
                     <div data-id="${item.id} " 
                           class="product_card flex   p-[10px] gap-[14px] lg:gap-[16px] pb-[16px] mb-[16px] lg:pb-[24px] lg:mb-[24px] last:border-0 last:pb-[0px] last:mb-[0px] border-b-[1px] border-black/10">
                        <!-- cart image -->
                        <div class="w-[180px] h-[120px] xs:h-[125px] md:h-[130px]">
                            <img src="${item.image}" alt="CartProductImage"
                                class="w-[100%] h-[100%]  bg-no-repeat rounded-[8.66px] md:hidden">
                            <img src="${item.image}" alt="cart product Image"
                                class="hidden md:flex bg-no-repeat rounded-[8.66px] h-[100%] w-[100%]">
                        </div>
                        <!-- cart details -->
                        <div class="cart_Sidebar_products w-[100%]">
                            <div class="flex items-center justify-between w-[100%]">
                                <h1
                                    class="font-satoshibold text-[#000000] opacity-[100%] text-[16px] md:text-[18px] lg:text-[20px] lg:mb-[2px]">
                                   ${item.title}
                                </h1>
                                <span class="delete_icon" onclick="deleteProduct(${index})">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.875 3.75H13.75V3.125C13.75 2.62772 13.5525 2.15081 13.2008 1.79917C12.8492 1.44754 12.3723 1.25 11.875 1.25H8.125C7.62772 1.25 7.15081 1.44754 6.79917 1.79917C6.44754 2.15081 6.25 2.62772 6.25 3.125V3.75H3.125C2.95924 3.75 2.80027 3.81585 2.68306 3.93306C2.56585 4.05027 2.5 4.20924 2.5 4.375C2.5 4.54076 2.56585 4.69973 2.68306 4.81694C2.80027 4.93415 2.95924 5 3.125 5H3.75V16.25C3.75 16.5815 3.8817 16.8995 4.11612 17.1339C4.35054 17.3683 4.66848 17.5 5 17.5H15C15.3315 17.5 15.6495 17.3683 15.8839 17.1339C16.1183 16.8995 16.25 16.5815 16.25 16.25V5H16.875C17.0408 5 17.1997 4.93415 17.3169 4.81694C17.4342 4.69973 17.5 4.54076 17.5 4.375C17.5 4.20924 17.4342 4.05027 17.3169 3.93306C17.1997 3.81585 17.0408 3.75 16.875 3.75ZM8.75 13.125C8.75 13.2908 8.68415 13.4497 8.56694 13.5669C8.44973 13.6842 8.29076 13.75 8.125 13.75C7.95924 13.75 7.80027 13.6842 7.68306 13.5669C7.56585 13.4497 7.5 13.2908 7.5 13.125V8.125C7.5 7.95924 7.56585 7.80027 7.68306 7.68306C7.80027 7.56585 7.95924 7.5 8.125 7.5C8.29076 7.5 8.44973 7.56585 8.56694 7.68306C8.68415 7.80027 8.75 7.95924 8.75 8.125V13.125ZM12.5 13.125C12.5 13.2908 12.4342 13.4497 12.3169 13.5669C12.1997 13.6842 12.0408 13.75 11.875 13.75C11.7092 13.75 11.5503 13.6842 11.4331 13.5669C11.3158 13.4497 11.25 13.2908 11.25 13.125V8.125C11.25 7.95924 11.3158 7.80027 11.4331 7.68306C11.5503 7.56585 11.7092 7.5 11.875 7.5C12.0408 7.5 12.1997 7.56585 12.3169 7.68306C12.4342 7.80027 12.5 7.95924 12.5 8.125V13.125ZM12.5 3.75H7.5V3.125C7.5 2.95924 7.56585 2.80027 7.68306 2.68306C7.80027 2.56585 7.95924 2.5 8.125 2.5H11.875C12.0408 2.5 12.1997 2.56585 12.3169 2.68306C12.4342 2.80027 12.5 2.95924 12.5 3.125V3.75Z"
                                            fill="#FF3333" />
                                    </svg>
                                </span>
                            </div>
                            <div class="font-satoshi text-[#000000] opacity-[100%] text-[12px] lg:text-[14px] mb-[4px]">
                                <span class="font-satoshiregular ">Size: <span
                                        class="text-[#000000] opacity-[60%] font-satoshiregular">${item.sizes}</span></span>
                            </div>
                            <div
                                class="font-satoshi text-[#000000] opacity-[100%] text-[12px] lg:text-[14px] mb-[11px] lg:mb-[15px]">
                                <span class="font-satoshiregular ">Color: <span
                                        class="text-[#000000] opacity-[60%] font-satoshiregular">${item.colors}</span></span>
                            </div>
                            <div class="flex gap-[12px] justify-between items-center">
                                <h1
                                    class="total_price font-satoshibold text-[20px] lg:text-[24px] font-bold text-[#000000] opacity-[100%]">
                                    $${item.price * item.quantity}
                                </h1>
                              <div>
  <button 
    onclick="window.location.href='../cartpage/cartpage.html'" 
    class="font-satoshimedium text-[14px] lg:text-[16px] text-[#FFFFFF] bg-[#000000] opacity-100 rounded-[12px] py-[10px] px-[16px]">
    Get In Cart
  </button>
</div>


                            </div>
                        </div>
                    </div>
                    
                    `;
                        })
                    }



                })

            });
    }
    fetchedItems();


    window.fetchedItems = fetchedItems;//for send data worldwide global

}
if (!window.location.href.includes("cartpage.html")) {
    function deleteProduct(index) {
        const data = JSON.parse(localStorage.getItem("UpdatedData :")) || [];
        data.splice(index, 1);

        localStorage.setItem("UpdatedData :", JSON.stringify(data))
        fetchedItems();
    }
}







