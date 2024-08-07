import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAjxjGgc1_HHBUGoXM1kFq4aXiV--plwZE",
  authDomain: "pasarcemerlang-11fa3.firebaseapp.com",
  projectId: "pasarcemerlang-11fa3",
  storageBucket: "pasarcemerlang-11fa3.appspot.com",
  messagingSenderId: "390685080124",
  appId: "1:390685080124:web:6a69ed5fd39c3fc21da139",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarJadwalMataPelajaran() {
  const refDokumen = collection(db, "jadwal-mapel");
  const kueri = query(refDokumen, orderBy("hari"));
  const cuplikanKueri = await getDocs(kueri);
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().hari,
      jam: dok.data().jam,
      waktu: dok.data().waktu,
      kelas: dok.data().kelas,
      mapel: dok.data().mapel,
      guruMapel: dok.data().guruMapel,
    });
  });
  return hasil;
}
export async function tambahDaftarJadwalMataPelajaran(hari, jam, waktu, kelas, mapel, guruMapel) {
  try {
    const dokRef = await addDoc(collection(db, 'jadwal-mapel'), {
      hari: hari,
      jam: jam,
      waktu: waktu,
      kelas: kelas,
      mapel: mapel,
      guruMapel: guruMapel,
    });
    console.log('berhasil menambah jadwal mapel ' + dokRef.id);
  }

  catch (e) {
    console.log('gagal menambah jadwal mapel ' + e);
  }

}

export async function hapusDaftarJadwalMataPelajaran(docId) {
  await deleteDoc(doc(db, "jadwal-mapel", docId));
}
export async function ubahDaftarJadwalMataPelajaran(docId, hari, jam, waktu, kelas, mapel, guruMapel) {
  await updateDoc(doc(db, "jadwal-mapel", docId), {
    hari: hari,
    jam: jam,
    waktu: waktu,
    kelas: kelas,
    mapel: mapel,
    guruMapel: guruMapel,

  });
}

export async function ambilDaftarJadwalMataPelajaran(docId) {
  const docRef = await doc(db, "jadwal-mapel", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}