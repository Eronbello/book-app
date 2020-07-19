const isValid = book => {
  const teste = Object.entries(book)
    .filter(key => key[1] === "" || key[1] === null)
    .map(item => item[0]);
  console.log(teste);
  return !Object.entries(book).some(key => key[1] === "" || key[1] === null);
};

export default isValid;
