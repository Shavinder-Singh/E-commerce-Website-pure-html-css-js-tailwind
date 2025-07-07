// temporaray store data and for operating functions like load more reviews most helpful
var fade_filter_container = document.querySelector(".fade_filter_container");

let currentIndex = 0;
let allProducts = [];


function initailProducts() {

  fetch('../../jsonfiles/products.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      const initProducts = data.slice(currentIndex, currentIndex + 9);
      console.log(initProducts)
      generateProducts(initProducts);
      currentIndex += 9;
    })
}

function show_moreCategories() {
  const show_morebtn = document.querySelector(".show_morebtn_categoriespage");

  show_morebtn.addEventListener("click", () => {
    const moreproducts = allProducts.slice(currentIndex, currentIndex + 9);


    if (moreproducts.length === 0) {
      const show_morebtn_categoriespage = document.querySelector(".show_morebtn_categoriespage");
      show_morebtn_categoriespage.style.display = "none"
      return;
    }
    generateProducts(moreproducts, true)
    currentIndex += 10;
  })
}
show_moreCategories();
initailProducts()

function generateProducts(review) {
  const category_swiper = document.querySelector(".category_swiper");
  const count_products_category_page = document.querySelector(".count_products_category_page");
  const count_products_category_page_laptop = document.querySelector(".count_products_category_page_laptop");
  count_products_category_page.innerHTML = `Showing 1-${review.length} of  ${allProducts.length} Products`;
  count_products_category_page_laptop.innerHTML = `Showing 1-${review.length} of  ${allProducts.length} Products`;

  review.forEach(item => {
    // discount shows
    let discounts = "";
    if (item.discount && item.discount > 0) {
      discounts = `
                                  <span
                                class=" bg-[#ff00001a] rounded-[62px] px-[5px] py-[6px] lg:px-[13px] lg:py-[6px]">
                                 <span class="text-[#FF3333] opacity-[100%] font-medium text-[10px] lg:text-[12px] block font-satoshimedium relative top-0">
                                    -${item.discount}%
                                 </span><span>`;
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


    category_swiper.innerHTML += `
        <div class="w-[100%]" id="${item.id}" onclick="redirectProduct_detailPage(${item.id})">
        <div class="  flex items-start flex-col">
          <div class="category_page_slider_image_wrapper w-[100%] h-[175px] lg:h-[100px]  mb-[10px] lg:mb-[16px] lg:w-[100%] lg:h-[298px] flex items-center">
            <img src="${item.image}" alt="tshirt"
              class="w-[100%] h-[100%] object-center  rounded-[12px] md:hidden">
            <img src="${item.image}" alt="tshirt"
              class="w-[100%] h-[100%] object-center  rounded-[12px] hidden md:flex">
          </div>
          <div class="mb-[4px] lg:mb-[8px] w-[95%]">
            <p class="font-satoshibold text-[16px] lg:text-[20px] text-left truncate">${item.title}</p>
          </div>
          <div class="mb-[4px] lg:mb-[8px] flex items-center gap-[11px] lg:gap-[13px]">
            <div class="flex gap-[4.44px] lg:gap-[5.31px]">
             ${stars}

            </div>
            <div class="text-[12px] font-satoshiregular  lg:text-[14px]">${item.rating}/<span
                class="text-[#000000] opacity-[60%]">5</span>
            </div>
          </div>
          <div class="font-satoshibold flex items-center gap-[5px] lg:gap-[10px] whitespace-nowrap"><span
              class="text-[20px] lg:text-[24px]">$${item.price}</span>${lessPrice}
            ${discounts}
          </div>
        </div>
      </div>
        
        `;
  })
}


function redirectProduct_detailPage(id) {
  window.location.href = "../productdetailpage/productdetail.html";
  localStorage.setItem("ProductId", JSON.parse(id))
}

function category_filter() {
  const category_btns = document.querySelectorAll(".category_btn li");
  category_btns.forEach(btn => {
    btn.addEventListener("click", () => {
      category_btns.forEach(b => {
        b.classList.remove("selected");
        b.classList.remove("text-red-900");
      });

      btn.classList.add("selected");
      btn.classList.add("text-red-900");
      // remove other filters class
    });
  });
}




function size_filter() {
  const size_btn = document.querySelectorAll(".size_btn button");
  size_btn.forEach(btn => {
    btn.addEventListener("click", () => {
      size_btn.forEach(b => {
        b.classList.remove("selected");
        b.classList.remove("bg-black", "opacity-[100%]", "text-white");

      });

      btn.classList.add("selected");
      btn.classList.add("bg-black", "opacity-[100%]", "text-white");

      // remove other filters class
    });
  });
}


function color_filter() {
  const colors_btn = document.querySelectorAll(".colors_btn span");
  colors_btn.forEach(btn => {
    btn.addEventListener("click", () => {
      colors_btn.forEach(b => {
        b.classList.remove("selected");
        b.classList.remove("text-red-900");

        const tick_icon = b.querySelector(".tick_icon_filter");
        if (tick_icon) {
          tick_icon.classList.add("hidden");
        }
      });

      btn.classList.add("selected");
      btn.classList.add("text-red-900");

      const tick_icon = btn.querySelector(".tick_icon_filter");
      if (tick_icon) {
        tick_icon.classList.remove("hidden");
      }
    });
  });

}


function price_filter() {
  const minVal = document.querySelector(".min-range").value;
  const maxVal = document.querySelector(".max-range").value;
  const rangeInput = document.querySelector(".range-input").value;
}


// Toggle each section inside Dress Style
document.querySelectorAll(".dress_style_btn_open").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest("li");
    const dropdown = parent.querySelector(".dress_style_btn");
    const icon = btn.querySelector(".accordian_icon_dress");

    // Check current state
    const isOpen = dropdown.classList.contains("max-h-[1000px]");

    // Collapse all sections 
    document.querySelectorAll(".dress_style_btn").forEach((el) => {
      el.classList.remove("max-h-[1000px]");
      el.classList.add("max-h-0");
      el.classList.remove("pt-[10px]")
    });
    document.querySelectorAll(".accordian_icon_dress").forEach((el) => {
      el.classList.remove("rotate-90");
    });

    // Toggle current
    if (!isOpen) {
      dropdown.classList.remove("max-h-[1000px]");
      dropdown.classList.add("max-h-[1000px]");
      icon.classList.add("rotate-90");
      dropdown.classList.add("pt-[10px]")
    }
  });
});

function dressStyle_filter() {
  const dress_style_btn = document.querySelectorAll(".dress_style_btn li");
  dress_style_btn.forEach(btn => {
    btn.addEventListener("click", () => {
      dress_style_btn.forEach(b => {
        b.classList.remove("selected");
        b.classList.remove("text-red-900");
      });

      btn.classList.add("selected");
      btn.classList.add("text-red-900");
      // remove other filters class
    });
  });
}

dressStyle_filter();
price_filter();
color_filter();
category_filter();
size_filter();

document.querySelector(".apply_filter").addEventListener("click", applyfilter);

function applyfilter() {
  console.log("applyfilter called");

  const selectedCategory = document.querySelector(".category_btn .selected");
  const selectedSize = document.querySelector(".size_btn .selected");
  const selectedColor = document.querySelector(".colors_btn .selected");
  const selectedStyle = document.querySelector(".dress_style_btn .selected");




  const chooseCategory = selectedCategory
    ? selectedCategory.textContent.trim().toLowerCase()
    : null;

  const chooseSize = selectedSize
    ? selectedSize.textContent.trim().toLowerCase()
    : null;

  const chooseColor = selectedColor
    ? selectedColor.getAttribute("data-color").trim().toLowerCase()
    : null;

  const chooseStyle = selectedStyle
    ? selectedStyle.textContent.trim().toLowerCase()
    : null;


  const rangeminVal = parseInt(document.querySelector(".min-range").value);
  const rangemaxVal = parseInt(document.querySelector(".max-range").value);
  // 
  const FilterData = allProducts.filter(item => {
    console.log(item)
    const matchCategory = chooseCategory
      ? item.category.toLowerCase().includes(chooseCategory)
      : true;

    const matchSize = chooseSize
      ? item.sizes.map(size => size.toLowerCase()).includes(chooseSize)
      : true;

    const matchColor = chooseColor
      ? Object.values(item.colors).map(color => color.toLowerCase()).includes(chooseColor)
      : true;



    // Price Filter

    const MatchPrice = item.price >= rangeminVal && item.price <= rangemaxVal;

    const MatchStyle = chooseStyle
      ? (item.dress_style || []).map(styles => styles.toLowerCase()).includes(chooseStyle)
      : true;


    document.querySelector(".category_swiper").innerHTML = "";
    return matchCategory && matchSize && matchColor && MatchPrice && MatchStyle;

  });


  generateProducts(FilterData);
  fade_filter_container.classList.add("hidden");
}

//filter open in mobile

function filteropen() {
  const filter_open_btn = document.querySelector(".filter_open_btn");
  const category_page_filter_mobile = document.querySelector(".category_page_filter_mobile");


  console.log(category_page_filter_mobile);



  filter_open_btn.addEventListener("click", () => {
    category_page_filter_mobile.classList.remove("hidden");
    fade_filter_container.classList.remove("hidden");

    category_page_filter_mobile.classList.add("overflow-y-scroll");

    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflow = "hidden";
  })
}


// close filter mobile
function closeFilter() {
  const close_icon_filter = document.querySelector(".close_icon_filter");
  const fade_filter_container = document.querySelector(".fade_filter_container");

  const category_page_filter_mobile = document.querySelector(".category_page_filter_mobile");

  close_icon_filter.addEventListener("click", () => {
    category_page_filter_mobile.classList.add("hidden")
    fade_filter_container.classList.add("hidden");

    document.body.style.overflowY = "auto";
    document.documentElement.style.overflow = "auto";
    category_page_filter_mobile.classList.remove("overflow-y-scroll");
  })
}
filteropen()
closeFilter();

// for close filter in mobile when applied
const apply_filter_btn_mobile = document.querySelector(".apply_filter_btn_mobile");
apply_filter_btn_mobile.addEventListener("click", () => {
  const apply_filter = document.querySelector(".category_page_filter_mobile");
  document.body.style.overflowY = "scroll";
  apply_filter.classList.add("hidden")
})




// const search_bar2 = document.getElementById("search_bar2");
// document.addEventListener("click", () => {
//   if (!search_bar2.contains(event.target)) {
//     search_bar2.classList.add("hidden")
//   }
// })

// open filters sublists
// ---------------------------------------------------------------------------------
const category_btn_open = document.querySelectorAll(".category_btn_open");
const category_btn = document.querySelectorAll(".category_btn");


let last = null;
category_btn_open.forEach(item => {
  item.addEventListener('click', (e) => {
    let list = item.nextElementSibling;
    let check = item.querySelector(".accordian_icon");


    console.log(check)
    if (list === last) {
      list.classList.add("h-0");
      list.classList.remove("h-[190px]");
      check.classList.remove("rotate-90");
      list.classList.remove("py-[10px]", "px-[5px]");
      last = null;
      // dressstyle_list_wrapper.classList.add("h-[300px]");
      // dressstyle_list_wrapper.classList.remove("h-[300px]");

    } else {

      document.querySelectorAll(".category_btn").forEach(ul => {
        ul.classList.add("h-0");
        ul.classList.remove("h-[190px]");
        list.classList.remove("py-[10px]", "px-[5px]");
      });
      document.querySelectorAll(".dress_style_btn").forEach(ul => {
        ul.classList.add("h-0");
        ul.classList.remove("h-[300px]");
      });
      document.querySelectorAll(".accordian_icon").forEach(icon => {
        icon.classList.remove("rotate-90");
      });
      list.classList.remove("h-0");
      list.classList.add("h-[190px]");
      check.classList.add("rotate-90")
      list.classList.add("py-[10px]", "px-[5px]");

      last = list;
    }



  })
})


// filter price open close

const price_filter_wrapper = document.querySelector(".price_filter_wrapper");
const filter_arrow = document.querySelector(".filter_arrow");

price_filter_wrapper.addEventListener("click", () => {
  const range_slider_container = document.querySelector(".range-slider-container");
  const tooltip_container = document.querySelector(".tooltip-container");


  const isOpen = range_slider_container.classList.contains("max-h-[1000px]");
  if (isOpen) {
    const accordian_price = document.querySelector(".accordian_price");

    range_slider_container.classList.add("max-h-0");
    range_slider_container.classList.remove("max-h-[1000px]")
    range_slider_container.classList.add("transition-all")
    accordian_price.classList.add("rotate-0");
    filter_arrow.classList.remove("rotate-[90deg]");
    filter_arrow.classList.add("rotate-[-90deg]");
    range_slider_container.classList.add("overflow-hidden", "opacity-0")

    tooltip_container.classList.remove("opacity-100")
    tooltip_container.classList.add("opacity-0")
  }

  else {
    const accordian_price = document.querySelector(".accordian_price");

    range_slider_container.classList.remove("max-h-0");
    range_slider_container.classList.add("max-h-[1000px]")
    range_slider_container.classList.add("transition-all")
    range_slider_container.classList.remove("overflow-hidden")
    range_slider_container.classList.add("opacity-100")


    tooltip_container.classList.remove("opacity-0");

    tooltip_container.classList.add("opacity-100");


    accordian_price.classList.add("rotate-90");
    filter_arrow.classList.add("rotate-[90deg]");


  }

})




const color_filter_wrapper = document.querySelector(".color_filter_wrapper");
const colors_arrow = document.querySelector(".colors_arrow");

color_filter_wrapper.addEventListener("click", () => {
  const colors_list_wrapper = document.querySelector(".colors_list_wrapper");

  const isOpen = colors_list_wrapper.classList.contains("max-h-[1000px]");
  if (isOpen) {
    const accordian_color = document.querySelector(".accordian_color");

    // colors_list_wrapper.classList.add("h-0");
    colors_list_wrapper.classList.remove("max-h-[1000px]")
    accordian_color.classList.add("rotate-0");
    colors_arrow.classList.remove("rotate-[178deg]");
    colors_arrow.classList.add("rotate-[0deg]");
  }
  else {
    const accordian_color = document.querySelector(".accordian_color");

    colors_list_wrapper.classList.add("max-h-[1000px]")
    accordian_color.classList.add("rotate-90");
    colors_arrow.classList.add("rotate-[178deg]");

  }

})

const size_filter_wrapper = document.querySelector(".size_filter_wrapper");
const size_arrow = document.querySelector(".size_arrow");

size_filter_wrapper.addEventListener("click", () => {
  const size_list_wrapper = document.querySelector(".size_list_wrapper");

  let isOpen = size_list_wrapper.classList.contains("max-h-[1000px]");
  if (isOpen) {
    const accordian_size = document.querySelector(".accordian_size");
    size_list_wrapper.classList.remove("max-h-[1000px]")

    size_list_wrapper.classList.add("transition-all")
    accordian_size.classList.add("rotate-0");
    size_arrow.classList.remove("rotate-[178deg]");
    size_arrow.classList.add("rotate-[0deg]");
  }
  else {
    const accordian_size = document.querySelector(".accordian_size");

    size_list_wrapper.classList.add("max-h-[1000px]")
    size_list_wrapper.classList.add("transition-all")
    accordian_size.classList.add("rotate-90")
    size_arrow.classList.add("rotate-[178deg]");

  }

})


const dressstyle_wrapper = document.querySelector(".dressstyle_wrapper");
dressstyle_wrapper.addEventListener("click", () => {
  const dressstyle_list_wrapper = document.querySelector(".dressstyle_list_wrapper");
  const accordian_arrow = document.querySelector(".accordian_arrow");

  const isOpen = dressstyle_list_wrapper.classList.contains("max-h-[1000px]");
  if (isOpen) {
    dressstyle_list_wrapper.classList.remove("max-h-[1000px]")
    dressstyle_list_wrapper.classList.add("max-h-0")
    accordian_arrow.classList.remove("rotate-90");
    accordian_arrow.classList.add("rotate-[0deg]");
  }
  else {

    dressstyle_list_wrapper.classList.remove("max-h-0")
    dressstyle_list_wrapper.classList.add("max-h-[1000px]")

    dressstyle_list_wrapper.classList.add("transition-all")
    accordian_arrow.classList.add("rotate-90");
    accordian_arrow.classList.remove("rotate-[0deg]");
  }

})


const rangeInputs = document.querySelectorAll(".range-input input");
const priceSlider = document.querySelector(".price-slider");
const minTooltip = document.querySelector(".min-tooltip");
const maxTooltip = document.querySelector(".max-tooltip");

const maxRange = parseInt(rangeInputs[0].max);
const priceGap = 150;

function updateSlider(event) {
  let minVal = parseInt(rangeInputs[0].value);
  let maxVal = parseInt(rangeInputs[1].value);

  // enforce minimum gap
  if (maxVal - minVal < priceGap) {
    if (event?.target?.classList.contains("min-range")) {
      minVal = maxVal - priceGap;
      rangeInputs[0].value = minVal;
    } else {
      maxVal = minVal + priceGap;
      rangeInputs[1].value = maxVal;
    }
  }

  const percentMin = (minVal / maxRange) * 100;
  const percentMax = (maxVal / maxRange) * 100;

  priceSlider.style.left = `${percentMin}%`;
  priceSlider.style.right = `${100 - percentMax}%`;

  minTooltip.style.left = `${percentMin}%`;
  maxTooltip.style.left = `${percentMax}%`;

  minTooltip.textContent = `$${minVal}`;
  maxTooltip.textContent = `$${maxVal}`;
}

rangeInputs.forEach(input => {
  input.addEventListener("input", updateSlider);
});

updateSlider(); // initialize



//Clear Filter when apply clear Button
// -----------------------------------------------------------------------------------------
const clear_filter_btn = document.querySelector(".clear_filter_btn");
clear_filter_btn.addEventListener("click", () => {
  document.querySelectorAll(".category_btn li").forEach(btn => btn.classList.remove("selected", "text-red-900"));
  document.querySelectorAll(".size_btn button").forEach(btn => btn.classList.remove("selected", "bg-black", "opacity-[100%]", "text-white"));
  document.querySelectorAll(".colors_btn span").forEach(btn => btn.classList.remove("selected", "text-red-900"));
  document.querySelectorAll(".tick_icon_filter").forEach(btn => btn.classList.add("hidden"));
  document.querySelectorAll(".dress_style_btn li").forEach(btn => btn.classList.remove("selected", "text-red-900"));
  fade_filter_container.classList.remove("hidden");
  fade_filter_container.classList.add("md:hidden");

  const rangeminVal = document.querySelector(".min-range");
  const rangemaxVal = document.querySelector(".max-range");
  rangeminVal.value = rangeminVal.min;
  rangemaxVal.value = rangemaxVal.max;
  updateSlider();
})


window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    fade_filter_container.classList.add("hidden");
    document.body.style.overflowY = "scroll";
    document.documentElement.style.overflowY = "scroll"
  }
})
