export function show(message, type, id) {
    let e = document.getElementById(id);
    e.setAttribute("class", `alert alert-${type} bg-${type} rounded-pill text-end me-3 my-2`);
    e.innerText = message;
    e.style.display = "inline-block";
    setTimeout(() => {
      e.style.display = "none";
    }, 10*1000);
  }