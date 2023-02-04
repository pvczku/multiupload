const button = document.querySelectorAll("button#delete");
console.log(document.querySelectorAll("button#delete"));
for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", deleteFile(i));
}

function deleteFile(i) {
  return function () {
    if (confirm("czy na pewno chcesz usunąć?")) {
      const filePath = document.querySelectorAll("button#delete")[i].value;
      const body = JSON.stringify({ path: filePath }); // body czyli przesyłane na serwer dane

      const headers = { "Content-Type": "application/json" }; // nagłowek czyli typ danych
      fetch("/delete", { method: "post", body, headers }) // fetch
        .then((response) => response.json())
        .then(
          (data) => console.log(data) // dane odpowiedzi z serwera
        );
      setTimeout(() => {
        window.location.reload();
      }, 1);
    }
  };
}
