const textarea = document.querySelector("textarea");
const btn = document.querySelector(".btn-primary");

btn.addEventListener("click", () => {
  const value = textarea.value.trim();

  if (!value) {
    alert("Please write a short explanation or click Skip.");
    return;
  }

  // Here you can send data to backend
  console.log("User explanation:", value);

  // redirect example
  // window.location.href = "/dashboard.html";
});