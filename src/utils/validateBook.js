const isValid = book => {
  return !Object.entries(book).some(key => key[1] === "" || key[1] === null);
};

export default isValid;
