//----------------------متغیر و ثابت‌ها-------------------

const send = document.getElementById("send");
const inputSms = document.getElementById("inputSms");
const messagePage = document.querySelector("main");
const openMenuBtn = document.getElementById("openMenuBtn");
const otherMsg = document.querySelectorAll(".other");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const others = document.querySelectorAll(".otherPersons");
const name = document.querySelector("#name");
const profileImg = document.querySelector(".profile img");
//-------------------نمایش پیام نوشته شده توسط من----------
send.addEventListener("click", () => {
    sendMessage(inputSms.value);
});

inputSms.addEventListener("keydown", (e) => {
    if (window.innerWidth <= 900) return;
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(inputSms.value);
    }
});

inputSms.addEventListener("input", () => {
    inputSms.style.height = "55px";
    inputSms.style.height = inputSms.scrollHeight + "px";
    inputSms.dir = /[\u0590-\u08FF]/.test(inputSms.value) ? "rtl" : "ltr";
});

function sendMessage(text) {
    if (!text.trim()) return;
    const message = document.createElement("div");
    message.classList.add("message", "me");
    text = text.trim(); // میخوام فاصله های اضافی پاک شه
    message.textContent = text;
    message.dir = /[\u0590-\u08FF]/.test(text) ? "rtl" : "ltr";

    messagePage.appendChild(message);
    message.scrollIntoView({
        behavior: "smooth",
        block: "end",
    });
    inputSms.style.height = "55px";
    inputSms.focus();
    inputSms.value = "";
    inputSms.dir = "rtl"; // یا "ltr"، هر کدوم رو به عنوان حالت پیش‌فرض می‌خوای
}
// ---------------------نمایش منو---------------------

openMenuBtn.addEventListener("click", () => {
    if (window.innerWidth > 900) return;

    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
});

overlay.addEventListener("click", closeSidebar);

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
    }
});

function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
}

// ------------------------------صفحه‌ی چت----------------------------------

sidebar.addEventListener("click", (e) => {
    const person = e.target.closest(".otherPersons");
    if (person) {
        name.innerText = person.textContent.trim();
        if (person.textContent.trim() === "پیام‌های ذخیره") {
            profileImg.src = "public/images/savedMessage.png";

            otherMsg.forEach((i) => {
                i.style.display = "none";
            });
        } else {
            profileImg.src = "public/images/images.jpg";
            otherMsg.forEach((i) => {
                i.style.display = "block";
            });
        }
    }
});
