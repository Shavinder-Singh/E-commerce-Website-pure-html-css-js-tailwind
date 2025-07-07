fetch('../../jsonfiles/faq.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            const faq_section_wrapper = document.querySelector(".faq_section_wrapper");
            faq_section_wrapper.innerHTML += `
         <div id="${item.id}"
                        class=" p-[24px] lg:px-[10px] lg:py-[20px] border-[1px] border-black/10 rounded-[20px] md:px-[32px] md:py-[28px]">
                        <div class=" wrapper_faq flex flex-col md:justify-between lg:mb-[15px]">
                            <div
                                class="open_faq_btn rounded-[10px]  w-[100%] flex bg-bggray p-[10px]  justify-between items-center">
                                <div>
                                    <span
                                        class="leading-[20px] md:leading-[22px] text-[14px] font-satoshimedium text-[#000000] opacity-[60%] md:text-[16px]">Q.</span>
                                    <span
                                        class="leading-[20px] md:leading-[22px] text-[14px] font-satoshimedium text-[#000000] opacity-[60%] md:text-[16px]">${item.question}</span>
                                </div>
                                <div class="">
                                    <span class="minus_icon">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20"
                                            height="20" viewBox="0 0 256 256" xml:space="preserve">
                                            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
                                                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                                <path
                                                    d="M 86.5 48.5 h -83 C 1.567 48.5 0 46.933 0 45 s 1.567 -3.5 3.5 -3.5 h 83 c 1.933 0 3.5 1.567 3.5 3.5 S 88.433 48.5 86.5 48.5 z"
                                                    style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(29,29,27); fill-rule: nonzero; opacity: 1;"
                                                    transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                                <path
                                                    d="M 86.5 48.5 h -83 C 1.567 48.5 0 46.933 0 45 s 1.567 -3.5 3.5 -3.5 h 83 c 1.933 0 3.5 1.567 3.5 3.5 S 88.433 48.5 86.5 48.5 z"
                                                    style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(29,29,27); fill-rule: nonzero; opacity: 1;"
                                                    transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                                            </g>
                                        </svg>
                                    </span>
                                    <span class="plus_icon hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-plus">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 5l0 14" />
                                            <path d="M5 12l14 0" />
                                        </svg>
                                    </span>

                                </div>

                            </div>
                            <div
                                class="faq_answer_box max-h-0 flex flex-col gap-[16px] lg:gap-[24px]  overflow-hidden">
                                <p
                                    class="leading-[20px] md:leading-[22px] text-[14px] font-satoshiregular text-[#000000] opacity-[60%] md:text-[15px] lg:text-[16px]">
                                   ${item.answer}
                                </p>
                                <p
                                    class="leading-[20px] md:leading-[22px] text-[14px] font-satoshimedium text-[#000000] opacity-[60%] md:text-[16px]">
                                    Posted on August 14, 2023</p>
                            </div>
                        </div>
                    </div>
        `
        })
        //dom select  elements
        const open_faq_btn = document.querySelectorAll(".open_faq_btn");
        const faq_answer_box = document.querySelectorAll(".faq_answer_box");

        open_faq_btn.forEach(item => {
            const parent = item.closest(".wrapper_faq");
            if (!parent) return;

            const answerBox = parent.querySelector(".faq_answer_box");
            const plusIcon = parent.querySelector(".plus_icon");
            const minusIcon = parent.querySelector(".minus_icon");

            item.addEventListener("click", () => {
                const isOpen = answerBox.classList.contains("max-h-[10000px]");

                // Close all boxes
                faq_answer_box.forEach(box => {
                    box.classList.remove("max-h-[10000px]", "pt-[10px]");
                    box.classList.add("max-h-0", "pt-[0px]");
                });

                // Reset all icons
                document.querySelectorAll(".plus_icon").forEach(p => p.classList.add("hidden"));
                document.querySelectorAll(".minus_icon").forEach(m => m.classList.remove("hidden"));

                if (!isOpen) {
                    // Open this one
                    answerBox.classList.remove("max-h-0", "pt-[0px]");
                    answerBox.classList.add("max-h-[10000px]", "pt-[10px]");

                    // Toggle icons for this item
                    plusIcon.classList.remove("hidden");
                    minusIcon.classList.add("hidden");
                }
            });
        });

    })


