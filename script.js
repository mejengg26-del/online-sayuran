alert("Script berhasil dimuat");
// ===============================
// KERANJANG BELANJA
// ===============================


// Ambil data keranjang

let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
// ===============================
// DATA STOK
// ===============================

let stok = JSON.parse(localStorage.getItem("stok"));

if (!stok) {

    stok = {

        "Bayam":25,
        "Kangkung":20,
        "Sawi Hijau":18,
        "Pakcoy":15,
        "Tomat":30,
        "Terong":18,
        "Mentimun":22,
        "Labu Siam":16,
        "Wortel":28,
        "Kentang":35,
        "Singkong":40,
        "Ubi Ungu":25,
        "Bawang Merah":20,
        "Bawang Putih":18,
        "Cabai Merah":15,
        "Cabai Rawit":12,
        "Jahe":14,
        "Kunyit":12,
        "Lengkuas":10

    };

    localStorage.setItem("stok", JSON.stringify(stok));

}



// ===============================
// TAMBAH KE KERANJANG
// ===============================

function tambahKeranjang(nama, harga, idInput){

    let jumlah = parseInt(document.getElementById(idInput).value);

    if(jumlah < 1){
        alert("Jumlah minimal 1");
        return;
    }

    if(stok[nama] < jumlah){
        alert("Stok tidak mencukupi!");
        return;
    }

    let produk = keranjang.find(item => item.nama === nama);

    if(produk){

        if(produk.jumlah + jumlah > stok[nama]){
            alert("Jumlah melebihi stok!");
            return;
        }

        produk.jumlah += jumlah;

    }else{

        keranjang.push({
            nama:nama,
            harga:harga,
            jumlah:jumlah
        });

    }

    simpanKeranjang();

    alert(nama + " berhasil ditambahkan ke keranjang.");

}



// ===============================
// SIMPAN DATA
// ===============================

function simpanKeranjang(){

    localStorage.setItem(
        "keranjang",
        JSON.stringify(keranjang)
    );

}



// ===============================
// TAMPILKAN KERANJANG
// ===============================


function tampilKeranjang(){


    let daftar = document.getElementById(
        "daftarKeranjang"
    );


    if(!daftar) return;



    daftar.innerHTML="";


    let total=0;



    keranjang.forEach((item,index)=>{


        let subtotal =
        item.harga * item.jumlah;



        total += subtotal;



        daftar.innerHTML += `


        <div class="produk-keranjang">


            <h3>
            ${item.nama}
            </h3>


            <p>
            Harga satuan :
            Rp${item.harga.toLocaleString('id-ID')}
            </p>


            <p>
            Jumlah :
            ${item.jumlah} ikat
            </p>



            <p>
            Subtotal :
            Rp${subtotal.toLocaleString('id-ID')}
            </p>



            <button onclick="kurang(${index})">
            -
            </button>



            <span>
            ${item.jumlah}
            </span>



            <button onclick="tambah(${index})">
            +
            </button>



            <button onclick="hapus(${index})">
            Hapus
            </button>


        </div>


        `;


    });



    let totalBelanja =
    document.getElementById("totalBelanja");



    if(totalBelanja){

        totalBelanja.innerHTML =
        "Rp" + total.toLocaleString('id-ID');

    }


}




// ===============================
// TAMBAH JUMLAH DI KERANJANG
// ===============================

function tambah(index){

    let nama = keranjang[index].nama;

    if(keranjang[index].jumlah >= stok[nama]){

        alert("Stok tidak mencukupi!");

        return;

    }

    keranjang[index].jumlah++;

    simpanKeranjang();

    tampilKeranjang();

}






// ===============================
// KURANG JUMLAH DI KERANJANG
// ===============================

function kurang(index){

    if(keranjang[index].jumlah > 1){

        keranjang[index].jumlah--;

    }else{

        keranjang.splice(index,1);

    }

    simpanKeranjang();

    tampilKeranjang();

}





// ===============================
// HAPUS PRODUK
// ===============================

function hapus(index){


    keranjang.splice(index,1);


    simpanKeranjang();


    tampilKeranjang();


}





// ===============================
// CHECKOUT
// ===============================

function checkout(){


    if(keranjang.length === 0){


        alert(
        "Keranjang masih kosong"
        );


        return;

    }



    window.location.href =
    "checkout.html";


}





// ===============================
// PESAN SELESAI
// ===============================

function pesanSekarang(){

    let stok = JSON.parse(localStorage.getItem("stok")) || {};

    keranjang.forEach(item => {

        if(stok[item.nama] !== undefined){

            stok[item.nama] -= item.jumlah;

            if(stok[item.nama] < 0){
                stok[item.nama] = 0;
            }

        }

    });

    localStorage.setItem("stok", JSON.stringify(stok));

    localStorage.removeItem("keranjang");

    alert("Pesanan berhasil dibuat!");

    window.location.href = "stook.html";

}






// Jalankan saat halaman keranjang dibuka

tampilKeranjang();
// ===============================
// PENCARIAN SEMUA PRODUK
// ===============================

function cariProduk() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const kataKunci = input.value.trim();

    if (kataKunci === "") {

        alert("Silakan masukkan nama sayuran yang ingin dicari.");

        input.focus();

        return;
    }

    // Kirim pencarian ke halaman kategori
    window.location.href =
        "kategori.html?search=" +
        encodeURIComponent(kataKunci);
}


// ===============================
// ENTER UNTUK MENCARI
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keypress", function (event) {

            if (event.key === "Enter") {

                cariProduk();

            }

        });

    }

});


