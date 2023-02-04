const newDirectory = document.getElementById("newDirectory");
const directoryCancel = document.getElementById("folderDialogCancel");
const directoryOk = document.getElementById("folderDialogOk");
const directoryInput = document.getElementById("newDirectoryInput");

newDirectory.addEventListener("click", openNewDirectoryDialog);
directoryOk.addEventListener("click", createNewDirectory);
directoryCancel.addEventListener("click", cancelCreateNewDirectory);

function openNewDirectoryDialog() {
  let dialog = document.getElementById("folderDialog");
  dialog.open = true;
}

function createNewDirectory() {
  if (directoryInput.value) {
    const body = JSON.stringify({ dirName: directoryInput.value }); // body czyli przesyłane na serwer dane

    const headers = { "Content-Type": "application/json" }; // nagłowek czyli typ danych
    fetch("/createFolder", { method: "post", body, headers }) // fetch
      .then((response) => response.json())
      .then(
        (data) => console.log(data) // dane odpowiedzi z serwera
      );
    directoryInput.value = "";
    cancelCreateNewDirectory();
    setTimeout(() => {
      window.location.reload();
    }, 1);
  } else {
    alert("Podaj nazwę katalogu");
  }
}

function cancelCreateNewDirectory() {
  let dialog = document.getElementById("folderDialog");
  dialog.open = false;
}
