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