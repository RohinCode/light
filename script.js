//----------------------متغیر و ثابت‌ها-------------------
const send = document.getElementById("send");
const inputSms = document.getElementById("inputSms");
const messagePage = document.querySelector("#container main");
const openMenuBtn = document.getElementById("openMenuBtn");
const otherMsg = document.querySelectorAll(".other");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const others = document.querySelectorAll(".otherPersons");
const name = document.querySelector("#name");
const profileImg = document.querySelector(".profile img");
const plus = document.getElementById("plus");
const addFriend = document.getElementById("addFriend");
const add = document.getElementById("add");
const personsList = document.getElementById("personsList");
const inpNum = document.getElementById("inpNum");
const inpName = document.getElementById("inpName");

// sflh';k;lk

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
    inputSms.dir = /[\u0590-\u08FF]/.test(inputSms.value) ? "rtl" : "ltr";
    messagePage.scrollTop = messagePage.scrollHeight;
});

function sendMessage(text) {
    if (!text.trim()) return;
    const message = document.createElement("div");
    message.classList.add("message", "me");
    text = text.trim(); // میخوام فاصله های اضافی پاک شه
    message.textContent = text;
    message.dir = /[\u0590-\u08FF]/.test(text) ? "rtl" : "ltr";

    messagePage.appendChild(message);
    messagePage.scrollTo({
        top: messagePage.scrollHeight,
        behavior: "smooth",
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

inputSms.addEventListener("focus", () => {
    setTimeout(() => {
        messagePage.scrollTop = messagePage.scrollHeight;
    }, 300);
});

// --------------------------------اضافه کردن  افراد-----------------------------

plus.addEventListener("click", () => {
    addFriend.classList.toggle("show");
});

add.addEventListener("click", () => {
    if (inpName.value.trim() === "" ) {
        addFriend.classList.remove("show");
    } else {
        const otherPersons = document.createElement("div");
        otherPersons.classList.add("otherPersons");
        const otherPersonsName = document.createElement("span");
        otherPersonsName.innerText = inpName.value;
        otherPersons.appendChild(otherPersonsName);
        personsList.appendChild(otherPersons);
        inpName.value = "";
        inpNum.value = "";
        addFriend.classList.remove("show");
    }
});


function updateHeight() {
    document.documentElement.style.setProperty(
        "--app-height",
        `${window.visualViewport.height}px`
    );
}

updateHeight();

window.visualViewport.addEventListener("resize", updateHeight);