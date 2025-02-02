const currentYear = new Date().getFullYear();
const dataTahun = Array.from({ length: 10 }, (_, index) => {
  const year = currentYear - index;
  return { value: year.toString(), label: year.toString() };
});

export { dataTahun };
