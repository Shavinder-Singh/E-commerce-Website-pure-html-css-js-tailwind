// Announcement Bar Code


fetch('../../jsonfiles/announcement.json')
    .then(res => res.json())
    .then(data => {
        const announcements = data.announcements.filter(item => item.visible === true);
        // dom items
        const announcement_container = document.querySelector(".announcement_container");
        const p = document.createElement("p");
        p.classList.add("text-[12px]", "md:text-[14px]", "whitespace-nowrap", "font-[100]", "text-[#FFFFFF]", "text-center", "font-satoshi", "transition-opacity", "duration-500", "opacity-0");
        let index = 0;
        if (announcements)
            p.classList.add("text-[12px]", "md:text-[14px]", "font-[100]", "text-[#FFFFFF]", "text-center", "font-satoshi", "transition-opacity", "duration-0", "opacity-100");

        p.innerHTML = " ";
        const userData = JSON.parse(localStorage.getItem("LoggedIn")) || [];
        console.log(userData);

        if (userData.length > 0) {
            p.innerHTML = ` Welcome! <a href="#" class="underline-offset-1 underline">${userData[0].name}</a>`;

        }
        else {
            p.innerHTML = ` Welcome! <a href="#" class="underline-offset-1 underline font-satoshimedium">Sign Up
                    Now</a>`;
        }


        setInterval(() => {
            p.classList.remove('opacity-100');
            p.classList.add('opacity-0');

            setTimeout(() => {
                p.classList.remove('opacity-0');
                p.classList.add('opacity-100');
                //if index is greater than announcements length
                if (index >= announcements.length) {
                    index = 0;
                }
                // for initial temporary announcement


                //showing all announcements
                if (userData.length > 0) {
                    p.innerHTML = ` Welcome! <a href="#" class="underline-offset-1 underline">${userData[0].name}</a>`;
                    const data = announcements[index];
                    p.innerHTML = ` ${data.text}`;
                }
                else {
                    const data = announcements[index];
                    p.innerHTML = ` ${data.text} <a href="../../pages/formpage/signup.html" class="underline-offset-1 underline"> Sign Up
                        Now</a>`;
                }

                // console.log(data.text);
                index++;
            }, 500);
        }, 2000);


        announcement_container.appendChild(p);
    })
// Announcement Bar Code
function closeAnnouncement() {
    const announcement_bar = document.querySelector(".announcement_bar");
    announcement_bar.style.display = "none";
}
