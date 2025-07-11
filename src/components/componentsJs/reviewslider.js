let allReviews = [];

fetch('../../jsonfiles/reviews.json')
  .then(res => res.json())
  .then(data => {
    
    // let slicedData = data.reviews.slice(1, 3);
    const getData = JSON.parse(localStorage.getItem("UserReview")) || [];

    allReviews = [...data.reviews, ...getData];
    generateReview(allReviews.slice(0, 10));
    console.log(allReviews)
  })



function generateReview(review) {
  const swiper_wrapper_reviews = document.querySelector(".swiper_wrapper_reviews");
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

    swiper_wrapper_reviews.innerHTML += `
        <div class="swiper-slide ">
                <div class="swiper_box ">
          <div class="p-[24px] review_homepage_box  border-[1px] border-black/10 rounded-[20px] md:px-[32px] md:py-[28px]">
            <div class="flex gap-[5.5px] mb-[12px]">
             ${stars}
            </div>
            <div class="mb-[8px] flex gap-[5.78px] items-center">
              <p class="font-satoshibold text-[16px] font-bold leading-[22px] md:text-[20px]">${item.user}</p>
              <span><svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.5 1.97095C7.97338 1.97095 6.48104 2.42364 5.2117 3.27179C3.94235 4.11994 2.95302 5.32544 2.36881 6.73586C1.78459 8.14628 1.63174 9.69826 1.92957 11.1956C2.2274 12.6928 2.96254 14.0682 4.04202 15.1477C5.12151 16.2272 6.49686 16.9623 7.99415 17.2601C9.49144 17.558 11.0434 17.4051 12.4538 16.8209C13.8643 16.2367 15.0698 15.2473 15.9179 13.978C16.7661 12.7087 17.2188 11.2163 17.2188 9.6897C17.2166 7.64322 16.4027 5.68118 14.9556 4.2341C13.5085 2.78703 11.5465 1.97311 9.5 1.97095ZM12.8888 8.32853L8.73258 12.4848C8.67744 12.54 8.61195 12.5838 8.53987 12.6137C8.46779 12.6435 8.39053 12.6589 8.3125 12.6589C8.23448 12.6589 8.15721 12.6435 8.08513 12.6137C8.01305 12.5838 7.94757 12.54 7.89243 12.4848L6.11118 10.7035C5.99976 10.5921 5.93717 10.441 5.93717 10.2834C5.93717 10.1259 5.99976 9.97478 6.11118 9.86337C6.22259 9.75196 6.37369 9.68937 6.53125 9.68937C6.68881 9.68937 6.83992 9.75196 6.95133 9.86337L8.3125 11.2253L12.0487 7.48837C12.1038 7.4332 12.1693 7.38944 12.2414 7.35959C12.3135 7.32973 12.3907 7.31437 12.4688 7.31437C12.5468 7.31437 12.624 7.32973 12.6961 7.35959C12.7682 7.38944 12.8337 7.4332 12.8888 7.48837C12.944 7.54353 12.9878 7.60903 13.0176 7.6811C13.0475 7.75318 13.0628 7.83043 13.0628 7.90845C13.0628 7.98646 13.0475 8.06371 13.0176 8.13579C12.9878 8.20787 12.944 8.27336 12.8888 8.32853Z"
                    fill="#01AB31" />
                </svg>
              </span>
            </div>
            <div>
              <p
                class="leading-[20px] md:leading-[22px] text-[14px] font-satoshiregular text-[#000000] opacity-[60%] md:text-[16px]">
                ${item.review}
              </p>
            </div>
          </div>
          </div>
        </div>       
           `;
  })
}

