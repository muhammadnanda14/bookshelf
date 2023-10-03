var formBook = document.getElementById("BooksForm");
var title = document.getElementById("judul");
var author = document.getElementById("penulis");
var year = document.getElementById("tahun");
var check = document.getElementById("centang");
var tableIncomplete = document.getElementById("tableIncomplete");
var tableComplete = document.getElementById("tableComplete");

var completedBookList = []; // Array untuk buku yang sudah dibaca
var incompletedBookList = []; // Array untuk buku yang belum dibaca

// Function untuk menyimpan data ke local storage
function saveToLocalStorage() {
  localStorage.setItem("completedBooks", JSON.stringify(completedBookList));
  localStorage.setItem("incompletedBooks", JSON.stringify(incompletedBookList));
}

// Function untuk memuat data dari local storage saat halaman dimuat
function loadFromLocalStorage() {
  const savedCompletedBooks = localStorage.getItem("completedBooks");
  const savedIncompletedBooks = localStorage.getItem("incompletedBooks");

  if (savedCompletedBooks) {
    completedBookList = JSON.parse(savedCompletedBooks);
  }

  if (savedIncompletedBooks) {
    incompletedBookList = JSON.parse(savedIncompletedBooks);
  }

  tableIncompleted(); // Tampilkan data dari local storage
  tableCompleted(); // Tampilkan data dari local storage
}

// Memanggil loadFromLocalStorage saat halaman dimuat
window.addEventListener("load", loadFromLocalStorage);

function addBook(event) {
  event.preventDefault();

  if (title.value != "" && author.value != "" && year.value != "") {
    var isComplete = check.checked;
    const newBook = {
      judul: title.value,
      penulis: author.value,
      tahun: year.value,
    };

    if (isComplete) {
      completedBookList.push(newBook);
    } else {
      incompletedBookList.push(newBook);
    }

    title.value = "";
    author.value = "";
    year.value = "";
    check.checked = false;

    saveToLocalStorage(); // Simpan data ke local storage

    if (isComplete) {
      tableCompleted();
    } else {
      tableIncompleted();
    }
  } else if (title.value === "") {
    alert("Judul Harus Diisi Terlebih Dahulu");
  } else if (author.value === "") {
    alert("Penulis Harus Diisi Terlebih Dahulu");
  } else if (year.value === "") {
    alert("Tahun Harus Diisi Terlebih Dahulu");
  } else {
    alert("Semua form harus diisi");
  }
}

function deleteBook(index, isComplete) {
  if (isComplete) {
    completedBookList.splice(index, 1);
  } else {
    incompletedBookList.splice(index, 1);
  }

  saveToLocalStorage(); // Simpan data ke local storage saat menghapus buku
  tableIncompleted();
  tableCompleted();
}

function markAsComplete(index) {
  const bookToMark = incompletedBookList[index];
  completedBookList.push(bookToMark);
  incompletedBookList.splice(index, 1);

  saveToLocalStorage(); // Simpan perubahan ke local storage
  tableIncompleted();
  tableCompleted();
}

function markAsIncomplete(index) {
  const bookToMark = completedBookList[index];
  incompletedBookList.push(bookToMark);
  completedBookList.splice(index, 1);

  saveToLocalStorage(); // Simpan perubahan ke local storage
  tableIncompleted();
  tableCompleted();
}

function tableIncompleted() {
  var notYet = "";

  if (incompletedBookList.length > 0) {
    notYet += `
      <table class="w-full text-sm text-gray-500">
      <thead class="text-gray-700 uppercase bg-blue-100 text-lg">
      <tr>
        <td scope="col" class="px-4 py-3">Nomor</td>
        <td scope="col" class="px-4 py-3">Judul</td>
        <td scope="col" class="px-6 py-3">Penulis</td>
        <td scope="col" class="px-6 py-3">Tahun</td>
        <td scope="col" class="px-6 py-3">Aksi</td>
      </tr>
      </thead>
      <tbody>`;

    for (let i = 0; i < incompletedBookList.length; i++) {
      notYet += `
        <tr class="bg-white border-b">
          <td class="px-4 py-4">${i + 1}</td>
          <td class="px-4 py-4">${incompletedBookList[i].judul}</td>
          <td class="px-6 py-4">${incompletedBookList[i].penulis}</td>
          <td class="px-6 py-4">${incompletedBookList[i].tahun}</td>
          <td class="px-6 py-4 text-2xl">
            <button onclick="markAsComplete(${i})">
              <span><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></span>
            </button> 
            <button style="margin-left: 17px;" onclick="deleteBook(${i}, false)">
              <span><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></span>
            </button>
          </td>
        </tr>`;
    }

    notYet += `
      </tbody>
      </table>`;
  }

  tableIncomplete.innerHTML = notYet;
}

function tableCompleted() {
  var done = "";
  if (completedBookList.length > 0) {
    done = `
    <table class="w-full text-sm text-gray-500">
    <thead class="text-gray-700 uppercase bg-blue-100 text-lg">
    <tr>
      <td scope="col" class="px-4 py-3">Nomor</td>
      <td scope="col" class="px-4 py-3">Judul</td>
      <td scope="col" class="px-6 py-3">Penulis</td>
      <td scope="col" class="px-6 py-3">Tahun</td>
      <td scope="col" class="px-6 py-3">Aksi</td>
    </tr>
    </thead>
    <tbody>`;

    for (let i = 0; i < completedBookList.length; i++) {
      done += `
    <tr class="bg-white border-b">
      <td class="px-4 py-4">${i + 1}</td>
      <td class="px-4 py-4">${completedBookList[i].judul}</td>
      <td class="px-6 py-4">${completedBookList[i].penulis}</td>
      <td class="px-6 py-4">${completedBookList[i].tahun}</td>
      <td class="px-6 py-4 text-2xl">
        <button onclick="markAsIncomplete(${i})">
          <span><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"/></svg></span>
        </button> 
        <button style="margin-left: 17px;" onclick="deleteBook(${i}, true)">
          <span><svg xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></span>
        </button>
      </td>
    </tr>`;
    }

    done += `
  </tbody>
  </table>`;
  }
  tableComplete.innerHTML = done;
}

// Memanggil tableIncompleted dan tableCompleted saat halaman dimuat
window.addEventListener("load", () => {
  tableIncompleted();
  tableCompleted();
});
