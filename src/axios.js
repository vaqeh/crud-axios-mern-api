import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CobaAxios() {
const [belanja, setBelanja] = useState([]);
  const [isEdit, setisEdit] = useState(null);

  const ambilData = (res) => {
    axios.get("http://localhost:3006/belanja").then((res) => {
      setBelanja(res.data);
      console.log( 'data', res.data);
    });
  };

  useEffect(() => {
    ambilData();
  }, []);

  const save = (e) => {
    // console.log("e", e.target.nama.value);
    // console.log("e", e.target.harga.value);
    e.preventDefault();
    // bawaan onsubmit itu akan mereload ulang, biar tidak mereload ulang, maka pakai e.preventDefault

    const data = {
      nama: e.target.nama.value,
      harga: e.target.harga.value,
    };

    axios.post("http://localhost:3006/belanja", data).then(() => ambilData());

    // e.target.nama.value = "";
    // e.target.harga.value = "";
  };

  const del = (id, e) => {
    // console.log("e", e.target.innerHTML);
    axios.delete("http://localhost:3006/belanja/" + id).then(() => ambilData());
  };

  const edit = (e, id) => {
    e.preventDefault();
    const data = {
      nama: e.target.nama.value,
      harga: e.target.harga.value,
    };
    axios
      // .patch("http://localhost:4000/belanja/" + id, data)
      // patch ganti sebagian
      .put("http://localhost:3006/belanja/" + id, data)
      // put ganti totalitas
      .then(() => ambilData());
    setisEdit(null);
  };

//   console.log("isEdit", isEdit);

  // buat algoritma isEdit

  // 1. buat state isEdit dengan initialvalue null
  // 2. Operator ternari :
  //    >> map makanan dengan parameter value index
  //    >> jika isEdit sama dengan index, maka munculkan sebagai input:
  //          # input value.nama
  //          # input value.harga
  //          # button close
  //           . Dalam button close tambahkan onClick yang isinya merubah isEdit menjadi null
  //    >> else / jika isEdit tidak sama dengan index, maka maka munculkan div seperti biasa yang berisi :
  //          # value.nama
  //          # value.harga
  //          # value.gambar
  //          # button edit
  //    >> Dalam button edit tambahkan onClick yang isinya merubah state isEdit menjadi index

  return (
    <div>
      <form onSubmit={save}>
        {/* event onsubmit khusus utk form */}
        <input
          name="nama"
          placeholder="nama barang"
          type={""}
          className="border border-red-800"
        ></input>
        <input
          name="harga"
          placeholder="harga"
          type={"number"}
          className="border border-red-800"
        ></input>
        <button type="submit">save</button>
      </form>
      <div>
        {belanja.map((value, index) =>
          isEdit === index ? (
            <form onSubmit={(e) => edit(e, value.id)}>
              <input
                name="nama"
                className="border border-yellow-500"
                defaultValue={value.nama}
              ></input>
              <input
                name="harga"
                className="border border-yellow-500"
                defaultValue={value.harga}
              ></input>
              <button type="button" onClick={() => setisEdit(null)}>
                close
              </button>
              <button type="submit">save</button>
            </form>
          ) : (
            <div className="flex gap-6">
              <div>{value.nama}</div>
              <div>{value.harga}</div>
              <button onClick={(e) => del(value.id, e)}>delete</button>
              <button onClick={() => setisEdit(index)}>edit</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// operator ternary:
// a ? b :c
// jika a maka b
// jika tidak maka c

// TUGAS:
// coba ulangi dan pahami urut berdasarkan algoritma buatan sendiri 3x

// ALGORITM :
// Buat state makanan diisi initialvalue array kosong sebagai wadah di frontend
// Buat function ambilData yang di dalamnya terdapat axios.get dan then. Get dari alamat backendnya ("http://localhost:3006/belanja") dan then (.then) membawa data dari res / objecknya
// Untuk mengakses data dari res / objeck tersebut menggunakan keynya (yaitu : .data), karena yang dibutuhkan hanya data saja, bukan res / objeck secara utuh
// Simpan data tersebut  di dlm state dg setState
// Buat useEffect snippet dan masukkan variabel ambilData di dalamnya
// Buat  form di dalamnya :
//    >> input name=nama,
//    >> input name=harga dengan type number,
//    >> input name=gambar dengan type file,
//    >> button save type submit

// Buat function onSave yang isinya :
//      onSave = (e) => {
//        e.preventDefault();
//        const nama = e.target.nama.value;
//        const harga = e.target.harga.value;
//        const gambar = e.target.gambar.value;
// kirim data yang berisi nama,harga, dan gambar ke backend dengan axios.post , lalu (then) get kembali dg ambilData (function diatasnya)
// Buat function del yang isinya axios.delete ,lalu (then) get kembali dg ambilData (variabel diatasnya)
// Delete berdasarkan id

// Buat button edit mode
// Buat button close edit mode
// Buat operator ternari :
// >> buat useState dengan initialvalue false
// >> berikan  onCklik pada button edit mode yg isinya merubah state isEdit menjadi true >> setIsedit(true)
// >> berikan  onCklik pada button close edit yang isinya  merubah state isEdit menjadi false >> setIsedit(false)
// map makanan berdasarkan keynya.
// Jika isEdit false maka muculkan :
//     div nama, harga, gambar dan button delete yang diberi funcion onCLik del per id pada valuenya (seperti biasanya)
// Jika true (else) maka muculkan:
//      input nama dan input harga

