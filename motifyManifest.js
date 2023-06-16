const fs = require('fs')

//process.env.UNI_INPUT_DIR为项目所在的绝对路径，经测试，相对路径会找不到文件
const isRevert = process.argv[process.argv.length - 1] === 'revert'

const manifestPath = './src/manifest.json';
// 读取 manifest.json
let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' })
function replaceManifest(path, value) {
  const arr = path.split('.')
  const len = arr.length
  const lastItem = arr[len - 1]

  let i = 0
  let ManifestArr = Manifest.split(/\n/)

  for (let index = 0; index < ManifestArr.length; index++) {
    const item = ManifestArr[index]
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
    if (i === len) {
      const hasComma = /,/.test(item)
      ManifestArr[index] = item.replace(new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`), `"${lastItem}": ${value}${hasComma ? ',' : ''}`)
      break;
    }
  }

  Manifest = ManifestArr.join('\n')
}
// 修改
if(process.env.NODE_ENV === 'production'){
  if(process.env.UNI_CUSTOM_SCRIPT == 'mp-prod'){
    replaceManifest('mp-weixin.appid', '"wxb885e72da2b17376"')
  }
}

// 复原
if(isRevert){
  replaceManifest('mp-weixin.appid', '"wxb885e72da2b17376"')
}

// 重新写入
fs.writeFileSync(manifestPath, Manifest, {
  "flag": "w"
})