// temporaray store data and for operating functions like load more reviews most helpful
var latest_btn_content = document.querySelector(".latest_btn_content");
var old_btn_content = document.querySelector(".old_btn_content");


let allReviews = [];
fetch('../../jsonfiles/reviews.json')
    .then(res => res.json())
    .then(data => {
        const slicedData = data.reviews.slice(1, 7);
        const getData = JSON.parse(localStorage.getItem("UserReview")) || [];
        allReviews = [...slicedData, ...getData];
        // how many count 
        const review_count = document.querySelector(".review_count");
        review_count.innerHTML = `(  ${allReviews.length} )`;

        generateReview(allReviews);
    })


const stars = document.querySelectorAll(".rating_wrapper span");
let selectedRating = 0;
const filledStar = `
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
	<path d="M 45.002 75.502 c 2.862 0 5.72 0.684 8.326 2.051 l 19.485 10.243 l -3.721 -21.678 c -1.002 -5.815 0.926 -11.753 5.164 -15.877 L 90 34.895 l -21.768 -3.161 c -5.838 -0.85 -10.884 -4.514 -13.499 -9.806 L 44.998 2.205 l -9.73 19.717 c -2.615 5.292 -7.661 8.962 -13.499 9.811 L 0 34.895 L 15.749 50.25 c 4.224 4.111 6.156 10.044 5.16 15.863 l -3.721 21.682 l 19.466 -10.238 C 39.268 76.19 42.135 75.502 45.002 75.502 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,207,100); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
</g>
</svg>
`;
const emptyStar = `
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 122.879 117.188" enable-background="new 0 0 122.879 117.188" xml:space="preserve"><g><path d="M64.395,1.969l15.713,36.79l39.853,3.575c1.759,0.152,3.06,1.701,2.907,3.459c-0.073,0.857-0.479,1.604-1.079,2.129 l0.002,0.001L91.641,74.25l8.917,39.021c0.395,1.723-0.683,3.439-2.406,3.834c-0.883,0.203-1.763,0.018-2.466-0.441L61.441,96.191 L27.087,116.73c-1.516,0.906-3.48,0.412-4.387-1.104c-0.441-0.736-0.55-1.58-0.373-2.355h-0.003l8.918-39.021L1.092,47.924 c-1.329-1.163-1.463-3.183-0.301-4.512c0.591-0.676,1.405-1.042,2.235-1.087l39.748-3.566l15.721-36.81 c0.692-1.627,2.572-2.384,4.199-1.692C63.494,0.597,64.084,1.225,64.395,1.969L64.395,1.969z M74.967,43.023L61.441,11.351 L47.914,43.023l-0.004-0.001c-0.448,1.051-1.447,1.826-2.665,1.932l-34.306,3.078l25.819,22.545c0.949,0.74,1.438,1.988,1.152,3.24 l-7.674,33.578l29.506-17.641c0.986-0.617,2.274-0.672,3.342-0.033l29.563,17.674l-7.673-33.578l0.003-0.002 c-0.252-1.109,0.096-2.318,1.012-3.119l25.955-22.664L77.815,44.97C76.607,44.932,75.472,44.208,74.967,43.023L74.967,43.023z"/></g></svg>
       `;
stars.forEach(star => {
    star.addEventListener("click", () => {
        selectedRating = parseInt(star.getAttribute("data-starVal"));

        console.log(selectedRating)
        // 
        stars.forEach(s => {
            const value = parseInt(s.getAttribute("data-starVal"));
            s.innerHTML = value <= selectedRating ? filledStar : emptyStar
        });

    })

})
// submit Form
function submitform() {
    const review_form = document.querySelector(".review_form");
    review_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();;
        const message = document.getElementById("message").value.trim();;

        const UserReview = {
            id: 999,
            user: name,
            review: message,
            rating: selectedRating
        }

        const getreview = JSON.parse(localStorage.getItem("UserReview")) || [];
        const removeDuplicate = getreview.filter(item => item.id !== UserReview.id);

        removeDuplicate.push(UserReview);

        localStorage.setItem("UserReview", JSON.stringify(removeDuplicate));
        generateReview(removeDuplicate); // Display updated

        document.body.style.overflow = "scroll"
        document.documentElement.style.overflow = "scroll"
        var Addreview_box_wrapper = document.querySelector(".Addreview_box_wrapper");;
        Addreview_box_wrapper.classList.add("hidden");



        product_detail_reviews_section.innerHTML = ""; // clear old reviews


        if (name.length <= 1) {
            alert("s")
        }


    })
}


// open Review Box
function openReviewBox() {
    var addreview_box_wrapper = document.querySelector(".Addreview_box_wrapper");
    addreview_box_wrapper.classList.add("block");
    addreview_box_wrapper.classList.remove("hidden");
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"

}
// close Review Box
function close_icon_review_box() {
    selectedRating = 0;

    const stars = document.querySelectorAll(".rating_wrapper span");
    stars.forEach(s => {
        s.innerHTML = emptyStar;
    });
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";

    const writereview_btn = document.querySelector(".writereview_btn");
    writereview_btn.classList.add("none");
    const addreview_box_wrapper = document.querySelector(".Addreview_box_wrapper");
    addreview_box_wrapper.classList.add("hidden");
    addreview_box_wrapper.classList.remove("block");
    document.body.style.overflow = "auto"
    document.documentElement.style.overflow = "auto"

}


function generateReview(review) {
    const product_detail_reviews_section = document.querySelector(".product_detail_reviews_section");
    review.forEach(item => {
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
        // only user can edit review
        const IsloggedIn = JSON.parse(localStorage.getItem("LoggedIn")) || [];
        const currentUser = IsloggedIn[0]?.id;
        console.log(currentUser)
        // if written a review then show three dots

        product_detail_reviews_section.innerHTML += `
                <div id= "${item.id}"
                    class="review_box p-[24px] lg:px-[32px] lg:py-[28px] border-[1px] border-black/10 rounded-[20px] md:px-[32px] md:py-[28px]">
                    <div class="flex justify-between mb-[12px] lg:mb-[15px]">
                        <div class="flex gap-[5.5px] ">
                            ${stars}
                        </div>
                        <div class="relative top-0 group">

                        ${currentUser ? `<span class="hidden md:flex "  onclick="open_wrapper_edit_delete(${item.id})">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14.625 12C14.625 12.5192 14.471 13.0267 14.1826 13.4584C13.8942 13.8901 13.4842 14.2265 13.0045 14.4252C12.5249 14.6239 11.9971 14.6758 11.4879 14.5746C10.9787 14.4733 10.511 14.2233 10.1438 13.8562C9.77673 13.489 9.52673 13.0213 9.42544 12.5121C9.32415 12.0029 9.37614 11.4751 9.57482 10.9955C9.7735 10.5158 10.11 10.1058 10.5416 9.81739C10.9733 9.52895 11.4808 9.375 12 9.375C12.6962 9.375 13.3639 9.65156 13.8562 10.1438C14.3484 10.6361 14.625 11.3038 14.625 12ZM4.5 9.375C3.98083 9.375 3.47331 9.52895 3.04163 9.81739C2.60995 10.1058 2.2735 10.5158 2.07482 10.9955C1.87614 11.4751 1.82415 12.0029 1.92544 12.5121C2.02673 13.0213 2.27673 13.489 2.64385 13.8562C3.01096 14.2233 3.47869 14.4733 3.98789 14.5746C4.49709 14.6758 5.02489 14.6239 5.50455 14.4252C5.9842 14.2265 6.39417 13.8901 6.68261 13.4584C6.97105 13.0267 7.125 12.5192 7.125 12C7.125 11.3038 6.84844 10.6361 6.35616 10.1438C5.86387 9.65156 5.19619 9.375 4.5 9.375ZM19.5 9.375C18.9808 9.375 18.4733 9.52895 18.0416 9.81739C17.61 10.1058 17.2735 10.5158 17.0748 10.9955C16.8761 11.4751 16.8242 12.0029 16.9254 12.5121C17.0267 13.0213 17.2767 13.489 17.6438 13.8562C18.011 14.2233 18.4787 14.4733 18.9879 14.5746C19.4971 14.6758 20.0249 14.6239 20.5045 14.4252C20.9842 14.2265 21.3942 13.8901 21.6826 13.4584C21.971 13.0267 22.125 12.5192 22.125 12C22.125 11.6553 22.0571 11.3139 21.9252 10.9955C21.7933 10.677 21.5999 10.3876 21.3562 10.1438C21.1124 9.90009 20.823 9.70673 20.5045 9.57482C20.1861 9.4429 19.8447 9.375 19.5 9.375Z"
                                        fill="black" fill-opacity="0.4" />
                                </svg>
                            </span>`: `<div> </div>`}
                         
                            
                <div id="edit-menu-${item.id}"   
    class="edit_delete_review_list_wrapper max-h-0 cursor-pointer opacity-0 translate-y-0 group-hover:max-h-[1000px] group-hover:opacity-100 group-hover:translate-y-[10px]  absolute top-[20px] md:top-[30px]  left-[-102px]  lg:left-[-140px] 2xl:left-[-130px]   shadow-2xl z-[1]">
    <div class="bg-bggray  opacity-[100%] w-[128px] md:w-[142px] lg:w-[180px] rounded-[7px] flex flex-col gap-[10px]">
        <div  onclick="${item.id === currentUser ? `editfunc('${item.id}')` : `alert('Sorry! You cant Edit Others Reviews')`}"
            class="login_icon font-satoshiregular  text-[15px] lg:text-[20px] leading-[22px] whitespace-nowrap  text-[#000000] opacity-[60%] pt-[13px] pb-[5px] px-[19px]">
            Edit
        </div>
        <hr>
        <div  onclick="${item.id === currentUser ? `deletefunc('${item.id}')` : `alert('Delete Your owen Review Only')`}"
            class="signup_icon font-satoshiregular text-[15px] lg:text-[20px] leading-[22px] whitespace-nowrap  text-[#000000] opacity-[60%] py-[10px] pb-[15px] px-[19px]">
            Delete
        </div>
    </div>
    </div>

</div> 


                       
                    </div>

                    <div class="mb-[8px] lg:mb-[16.5px] flex gap-[5.78px] ">
                        <p class="font-satoshibold text-[16px] font-bold leading-[22px] md:text-[20px]">${item.user}</p>
                        <span><svg width="19" height="20" viewBox="0 0 19 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.5 1.97095C7.97338 1.97095 6.48104 2.42364 5.2117 3.27179C3.94235 4.11994 2.95302 5.32544 2.36881 6.73586C1.78459 8.14628 1.63174 9.69826 1.92957 11.1956C2.2274 12.6928 2.96254 14.0682 4.04202 15.1477C5.12151 16.2272 6.49686 16.9623 7.99415 17.2601C9.49144 17.558 11.0434 17.4051 12.4538 16.8209C13.8643 16.2367 15.0698 15.2473 15.9179 13.978C16.7661 12.7087 17.2188 11.2163 17.2188 9.6897C17.2166 7.64322 16.4027 5.68118 14.9556 4.2341C13.5085 2.78703 11.5465 1.97311 9.5 1.97095ZM12.8888 8.32853L8.73258 12.4848C8.67744 12.54 8.61195 12.5838 8.53987 12.6137C8.46779 12.6435 8.39053 12.6589 8.3125 12.6589C8.23448 12.6589 8.15721 12.6435 8.08513 12.6137C8.01305 12.5838 7.94757 12.54 7.89243 12.4848L6.11118 10.7035C5.99976 10.5921 5.93717 10.441 5.93717 10.2834C5.93717 10.1259 5.99976 9.97478 6.11118 9.86337C6.22259 9.75196 6.37369 9.68937 6.53125 9.68937C6.68881 9.68937 6.83992 9.75196 6.95133 9.86337L8.3125 11.2253L12.0487 7.48837C12.1038 7.4332 12.1693 7.38944 12.2414 7.35959C12.3135 7.32973 12.3907 7.31437 12.4688 7.31437C12.5468 7.31437 12.624 7.32973 12.6961 7.35959C12.7682 7.38944 12.8337 7.4332 12.8888 7.48837C12.944 7.54353 12.9878 7.60903 13.0176 7.6811C13.0475 7.75318 13.0628 7.83043 13.0628 7.90845C13.0628 7.98646 13.0475 8.06371 13.0176 8.13579C12.9878 8.20787 12.944 8.27336 12.8888 8.32853Z"
                                    fill="#01AB31" />
                            </svg>
                        </span>
                    </div>
                    <div class="flex flex-col gap-[16px] lg:gap-[24px]">
                        <p
                            class="leading-[20px] md:leading-[22px] text-[14px] font-satoshiregular text-[#000000] opacity-[60%] md:text-[15px] lg:text-[16px]">
                           
                            ${item.review}
                        </p>
                        <p
                            class="leading-[20px] md:leading-[22px] text-[14px] font-satoshimedium text-[#000000] opacity-[60%] md:text-[16px]">
                            ${item.date}</p>
                    </div>
                
                
            </div>
           
           `;
    })
}

// Drop Down 
function open_wrapper_edit_delete(id) {
    const edit_menu = document.querySelector(`.edit_delete_review_list_wrapper[id=edit-menu-${id}]`);
    if (edit_menu) {
        edit_menu.classList.toggle("hidden");
    }
}


// edit 
function editfunc(id) {
    console.log(id)
    const data = JSON.parse(localStorage.getItem("UserReview")) || [];
    // let check = data.find(item => item.id === id);

    var addreview_box_wrapper = document.querySelector(".Addreview_box_wrapper");
    addreview_box_wrapper.classList.remove("hidden");


    review_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const message = document.getElementById("message").value.trim();

        const UserReview = {
            id: 999,
            user: name,
            review: message,
            rating: selectedRating

        }

        const getreview = JSON.parse(localStorage.getItem("UserReview")) || [];
        getreview.filter(item => item.id !== UserReview.id);
        getreview.push(UserReview);
        localStorage.setItem("UserReview", JSON.stringify(getreview));
        product_detail_reviews_section.innerHTML = "";
        generateReview(getreview);

    });
}
document.addEventListener("submit", function (e) {
    if (e.target.classList.contains("review_form")) {
        setTimeout(() => {
            window.location.reload();
        }, 300); // Delay to ensure localStorage updates first
    }
});

//delete
function deletefunc(id) {
    const data = JSON.parse(localStorage.getItem("UserReview")) || [];
    const updatedData = data.filter(item => item.id != id);
    localStorage.setItem("UserReview", JSON.stringify(updatedData));

    allReviews = allReviews.filter(item => item.id != id);
    var review_box = document.querySelector(`.review_box[id="${id}"]`);
    if (review_box) {
        console.log(review_box);
        review_box.remove();

    }
    document.querySelector(".product_detail_reviews_section").innerHTML = "";
    generateReview(allReviews);

    // Update count
    const review_count = document.querySelector(".review_count");
    review_count.innerHTML = `(  ${allReviews.length} )`;


}



//load more reviews
let index = 1;
function loadMoreReviews() {
    var product_detail_reviews_section = document.querySelector(".product_detail_reviews_section");

    product_detail_reviews_section.innerHTML = "";

    var load_more_reviews = document.querySelector(".load_more_reviews");
    load_more_reviews.addEventListener("click", () => {
        const load_more = allReviews.slice(index, index + 2);
        index += 2;
        console.log(index)
        generateReview(load_more);
        if (index >= allReviews.length) {
            load_more_reviews.style.display = "none";
            console.log("No More revieews")
            return;
        }

    })

}


function highRated() {
    index = 1;
    const loadHighRating = allReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    document.querySelector(".product_detail_reviews_section").innerHTML = "";
    document.querySelector(".load_more_reviews").style.display = "block";

    generateReview(loadHighRating.slice(0, index));


}
function lowRated() {
    index = 1;
    const loadLowRating = allReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    document.querySelector(".product_detail_reviews_section").innerHTML = "";
    document.querySelector(".load_more_reviews").style.display = "block";

    generateReview(loadLowRating.slice(0, index));
}





let selectedBtn = true;
old_btn_content.addEventListener("click", () => {
    selectedBtn = !selectedBtn;
    if (selectedBtn) {
        old_btn_content.innerHTML = "Old";
        latest_btn_content.innerHTML = "Latest";
        document.querySelector(".product_detail_reviews_section").innerHTML = "";
        document.querySelector(".load_more_reviews").style.display = "block";
        const lowRatingUpdated = allReviews.sort((a, b) => b.rating - a.rating);
        generateReview(lowRatingUpdated.slice(0, index));

    }
    else {
        old_btn_content.innerHTML = "Latest";
        latest_btn_content.innerHTML = "Old";
        document.querySelector(".product_detail_reviews_section").innerHTML = "";
        document.querySelector(".load_more_reviews").style.display = "block";
        const HighRatingUpdated = allReviews.sort((a, b) => a.rating - b.rating);
        generateReview(HighRatingUpdated.slice(0, index));
    }
    console.log(selectedBtn ? true : false)

})


submitform();
lowRated();
highRated();
loadMoreReviews();






