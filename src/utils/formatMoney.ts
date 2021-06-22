export default (val: Number) => {
  if (val == 0) return "0";
  let s = [' trăm', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' nghìn nghìn tỷ']
  let e = Math.abs(Math.floor(Math.log(Math.abs(+val)) / Math.log(1000)));
  if (e < 2 ) return (+val / Math.pow(1000, e))
  return (+val / Math.pow(1000, e)) + "" + s[e];
}