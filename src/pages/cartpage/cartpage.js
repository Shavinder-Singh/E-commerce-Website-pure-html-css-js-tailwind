
function fetchedItems() {
    fetch("../../jsonfiles/products.json")
        .then(res => res.json())
        .then(data => {
            let MainData = [];
            const cartData = JSON.parse(localStorage.getItem("UpdatedData :")) || [];
            document.querySelector(".cart_list_wrapper").innerHTML = "";
            cartData.forEach(item => {
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

                    document.querySelector(".cart_list_wrapper").innerHTML = "";

                    MainData.forEach((item, index) => {
                        const cart_list_wrapper = document.querySelector(".cart_list_wrapper");
                        cart_list_wrapper.innerHTML += `
                     <div data-id="${item.id}"
                        class="product_card flex gap-[14px] lg:gap-[16px] pb-[16px] mb-[16px] lg:pb-[24px] lg:mb-[24px] last:border-0 last:pb-[0px] last:mb-[0px] border-b-[1px] border-black/10">
                        <!-- cart image -->
                        <div class="w-[180px] h-[120px] xs:h-[125px] md:h-[130px] lg:xs:h-[120px] lg:w-[160px]">
                            <img src="${item.image}" alt="CartProductImage"
                                class="w-[100%] h-[100%]  bg-no-repeat rounded-[8.66px] md:hidden">
                            <img src="${item.image}" alt="cart product Image"
                                class="hidden md:flex bg-no-repeat rounded-[8.66px] h-[100%] w-[100%]">
                        </div>
                        <!-- cart details -->
                        <div class="cart_list_wrapper w-[100%]">
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
                                <div
                                    class="flex gap-[20px] px-[20px] py-[12px] text-[#000000] bg-bggray rounded-[62px] items-center">
                                    <span class="quantity_less_icon" onclick="updateQuantity(${index},-1)">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                                fill="black" />
                                        </svg>
                                    </span>
                                    <button class="quantity_number font-satoshimedium text-[14px] text-[#000000] opacity-[100%]" data-count="1">
                                        ${item.quantity}
                                    </button>
                                    <span class="quantity_increase_icon" onclick="updateQuantity(${index},+1)"> 
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                                fill="black" />
                                        </svg>

                                    </span>
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


// show summary total's all
function renderSummary() {
    const orderData = JSON.parse(localStorage.getItem("UpdatedData :")) || [];
    var order_summary_wrapper = document.querySelector(".order_summary_wrapper");
    let subtotal = 0;
    let discountAmount = 0;
    let totalPrice = 0;
    const deliveryFees = 15;
    if (orderData.length == 0) {
        order_summary_wrapper.innerHTML = "";
    }
    orderData.forEach(item => {
        let itemTotal = parseFloat(item.price) * parseInt(item.quantity);
        subtotal += itemTotal;
        if (item.discount) {
            discountAmount += parseFloat(item.discount / 100) * parseFloat(itemTotal);
        }
        totalPrice = subtotal - discountAmount + deliveryFees;


    });
    orderData.forEach(item => {
        order_summary_wrapper.innerHTML = `
         <ul class="pb-[20px] border-black/10 border-b-[1px] flex flex-col gap-[20px]">
                        <li class="flex justify-between"><span
                                class="font-satoshiregular text-[16px] lg:text-[20px] text-[#000000] opacity-[60%]">Subtotal</span>
                            <span
                                class="font-satoshibold text-[16px] lg:text-[20px] text-[#000000] opacity-[100%]">$${subtotal}</span>
                        </li>
                        <li class="flex justify-between"><span
                                class="font-satoshiregular text-[16px] lg:text-[20px] text-[#000000] opacity-[60%]">Discount</span>
                            <span
                                class="font-satoshibold text-[16px] lg:text-[20px] text-[#FF3333] opacity-[100%]">$${discountAmount.toFixed(2)}</span>
                        </li>
                        <li class="flex justify-between"><span
                                class="font-satoshiregular text-[16px] lg:text-[20px] text-[#000000] opacity-[60%]">Delivery Fee</span>
                            <span
                                class="font-satoshibold text-[16px] lg:text-[20px] text-[#000000] opacity-[100%]">$${deliveryFees}</span>
                        </li>
                    </ul>
                    <div class="pt-[20px] flex justify-between mb-[16px] lg:mb-[24px]">
                        <span
                            class="font-satoshiregular text-[16px] lg:text-[20px] text-[#000000] opacity-[100%]">Total</span>
                        <span
                            class="font-satoshibold text-[20px] lg:text-[24px] text-[#000000] opacity-[100%]">$${totalPrice}</span>
                    </div>
        
        `;
    })
}


function updateQuantity(index, numberChange) {
    const data = JSON.parse(localStorage.getItem("UpdatedData :")) || [];

    let product = data[index];
    product.quantity = parseInt(product.quantity) + numberChange;
    product.countPrice = parseFloat(product.quantity) * parseFloat(product.price);
    // product.price = parseFloat(product.quantity) * parseFloat(product.price);

    if (product.quantity < 1) product.quantity = 1;
    const cards = document.querySelectorAll(".product_card");
    const card = cards[index];

    const quantity_number = card.querySelector(".quantity_number");
    const total_price = card.querySelector(".total_price");



    quantity_number.textContent = product.quantity;
    total_price.textContent = parseFloat(product.quantity) * parseFloat(product.price);

    data[index] = product;
    localStorage.setItem("UpdatedData :", JSON.stringify(data))
    renderSummary();
}

function deleteProduct(index) {
    const data = JSON.parse(localStorage.getItem("UpdatedData :")) || [];
    data.splice(index, 1);

    localStorage.setItem("UpdatedData :", JSON.stringify(data))
    fetchedItems();
    renderSummary();

}

// checkout
function checkout() {
    const getProduct = JSON.parse(localStorage.getItem("UpdatedData :")) || [];
    const getUser = JSON.parse(localStorage.getItem("LoggedIn")) || [];


    var notification_checkout = document.querySelector(".notification_checkout");
    var owner_name_cart_page = document.querySelector(".owner_name_cart_page");
    var cart_orders_notification = document.querySelector(".cart_orders_notification");
    const checkProduct = getProduct.filter(item => item);
    const getUsername = getUser.filter(item => item.name);
    console.log(getUsername)

    console.log(checkProduct.length)
    if (checkProduct.length > 0) {


        notification_checkout.classList.remove("hidden")
        notification_checkout.classList.add("flex");
        document.body.classList.add("overflow-hidden");
        owner_name_cart_page.textContent = ` ${getUsername[0].name}`;
        cart_orders_notification.textContent = `${checkProduct.length}`;


        setTimeout(() => {
            notification_checkout.classList.add("hidden")
            notification_checkout.classList.remove("flex")
            document.body.classList.remove("overflow-hidden")

        }, 5000);
        localStorage.removeItem("UpdatedData :");
        fetchedItems();
        renderSummary();
    }
    else {
        alert("Select Item First");
    }

}
fetchedItems();
renderSummary();

