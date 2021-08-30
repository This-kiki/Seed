export function getImgs(content) {
  var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim
  var imgsrcArr = []
  let tem
  while ((tem = reg.exec(content))) {
    imgsrcArr.push(tem[2])
  }
  // console.log(JSON.stringify(imgsrcArr))
  return JSON.stringify(imgsrcArr)
}
export function getImg(content) {
  var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim
  var imgsrcArr = []
  let tem
  while ((tem = reg.exec(content))) {
    imgsrcArr.push(tem[2])
  }
  // console.log(JSON.stringify(imgsrcArr))
  if(imgsrcArr[0]){
    return imgsrcArr[0]
  }else {
    return ''
  }
}