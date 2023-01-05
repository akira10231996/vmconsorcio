export const phoneFormatter = (phone: String): String => {
  if (phone == "") {
    return "";
  }
  let val = phone.replace(/ /gm, "");
  val = val.replaceAll(")", "");
  val = val.replaceAll("(", "");
  if (val.length >= 10) {
    val = val.substring(0, 10);
  }
  let newPhone = `(${val.substring(0, 2)}) ${val.substring(
    2,
    6
  )} ${val.substring(6, val.length)}`;
  return newPhone;
};
