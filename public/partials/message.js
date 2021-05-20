export function show(message, type, id) {
    let e = document.getElementById(id);
    e.setAttribute("class", `alert alert-${type} bg-${type} rounded-pill  mx-auto my-2 text-light`);
    e.innerText = message;
    e.style.display = "inline-block";
    setTimeout(() => {
      e.style.display = "none";
    }, 5*1000);
  }