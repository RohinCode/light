//----------------------متغیر و ثابت‌ها-------------------

const send = document.getElementById("send");
const inputSms = document.getElementById("inputSms");
const messagePage = document.querySelector("main");
const openMenuBtn = document.getElementById("openMenuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");


//-------------------نمایش پیام نوشته شده توسط من----------
send.addEventListener("click", () => {
    sendMessage(inputSms.value);
});

inputSms.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(inputSms.value);
    }
});

inputSms.addEventListener("input", () => {
    inputSms.style.height = "55px";
    inputSms.style.height = inputSms.scrollHeight + "px";
});

function sendMessage(text) {
    if (!text.trim()) return;
    const message = document.createElement("div");
    message.classList.add("message", "me");
    message.textContent = text;
    messagePage.appendChild(message);
    inputSms.value = "";
    message.scrollIntoView({
        behavior: "smooth",
        block: "end",
    });
    inputSms.style.height = "55px";
    inputSms.focus();
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
