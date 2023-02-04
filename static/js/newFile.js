const newFile = document.getElementById("newFile");
const fileCancel = document.getElementById("fileDialogCancel");
const fileOk = document.getElementById("fileDialogOk");
const fileInput = document.getElementById("newFileInput");

newFile.addEventListener("click", openNewFileDialog);
fileOk.addEventListener("click", createNewFile);
fileCancel.addEventListener("click", cancelCreateNewFile);

function openNewFileDialog() {
  let dialog = document.getElementById("fileDialog");
  dialog.open = true;
}

function createNewFile() {
  if (fileInput.value) {
    const body = JSON.stringify({ fileName: fileInput.value }); // body czyli przesyłane na serwer dane

    const headers = { "Content-Type": "application/json" }; // nagłowek czyli typ danych
    fetch("/createFile", { method: "post", body, headers }) // fetch
      .then((response) => response.json())
      .then(
        (data) => console.log(data) // dane odpowiedzi z serwera
      );
    fileInput.value = "";
    cancelCreateNewFile();
    setTimeout(() => {
      window.location.reload();
    }, 1);
  } else {
    alert("Podaj nazwę pliku");
  }
}

function cancelCreateNewFile() {
  let dialog = document.getElementById("fileDialog");
  dialog.open = false;
}
