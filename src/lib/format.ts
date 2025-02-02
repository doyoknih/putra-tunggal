const formatIDR = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

// const formatDate = (date: Date): string => {
//   return new Intl.DateTimeFormat("id-ID", {
//     weekday: "long", // Full weekday name (e.g., "Kamis")
//     day: "2-digit", // Day of the month (e.g., "19")
//     month: "long", // Full month name (e.g., "September")
//     year: "numeric", // Full year (e.g., "2024")
//   }).format(date);
// };

const formatDate = (date: string): string => {
  // Mengonversi string ISO 8601 menjadi objek Date
  const parsedDate = new Date(date);

  // Memastikan bahwa parsing berhasil
  if (isNaN(parsedDate.getTime())) {
    return "Tanggal tidak valid"; // Menangani jika parsing gagal
  }

  // Menggunakan Intl.DateTimeFormat untuk format tanggal
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long", // Nama hari lengkap (e.g., "Senin")
    day: "2-digit", // Tanggal dengan dua digit (e.g., "11")
    month: "long", // Nama bulan lengkap (e.g., "Januari")
    year: "numeric", // Tahun lengkap (e.g., "2025")
  }).format(parsedDate);
};

const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();

  // Periksa apakah ulang tahun tahun ini belum terlewati
  const isBirthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  if (!isBirthdayPassed) {
    age--;
  }

  return age;
};

export { formatIDR, formatDate, calculateAge };
