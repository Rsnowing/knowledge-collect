const fs = require('fs');
const path = require('path')
// console.log(__dirname);
// console.log(path.resolve('../../'));
console.log(process.cwd());

const CUR_PATH = path.join(process.cwd(), '.')
const EXCLUDE = /assets|.git/ // 不想生成目录的文件夹名称

let summary = {} // 目录

getDir(CUR_PATH)


/**
 * 
 * @param {String} curpath 当前路径
 */
function getDir(curpath) {
  fs.readdir(curpath, (err, res) => {
    if (err) throw new Error(err)
    res.forEach(filePath => {
      let fpath = path.join(CUR_PATH, filePath)
      const isDirectory = fs.statSync(fpath).isDirectory()
      if (isDirectory && !EXCLUDE.test(filePath)) {
        summary[filePath] = []
        getFile(fpath, summary[filePath])
      }
    })
    getSummary(summary)
    write()
  })
}

/**
 * @param {String} curpath 文件路径 
 */
function getFile(curpath, data) {
  const dirs = fs.readdirSync(curpath)
  dirs.forEach((file, index) => {
    let fpath = path.join(curpath, file)
    const isDirectory = fs.statSync(fpath).isDirectory()
    if (isDirectory) {
      const dir = {}
      dir[file] = []
      data.push(dir)
      getFile(fpath, data[index][file])
    } else {
      const extension = path.extname(file); //  获取后缀名
      const fileName = path.basename(file, extension); // 获取没有后缀的文件名
      
      // 转换路径格式 ** path.relative
      let formateRoute = path.relative(process.cwd(), fpath)
      formateRoute = formateRoute.replace(/\\/g, '/')
      data.push({ path: formateRoute, name: fileName })
    }
  })
}

let md = ''
function getSummary(obj, count = 1) {
  const map = {
    1: [``, `  `],
    2: [`  `, `    `]
  }
  for(let key in obj) {
    var space1 = map[count][0]
    var space2 = map[count][1]
    if (Array.isArray(obj[key])) {
      let isTop = true
      obj[key].forEach((item, index) => {
        if (item.path && isTop) {
          md += `${space1}* [${key}](${item.path})\n`
          isTop = false
        }

        if (item.path) {
          md +=`${space2}* [${item.name}](${item.path})\n`
        } else {
          getSummary(item, 2)
        }
      })
    }
    md += `\n`
  }
}

function write() {
  const pa = path.join(CUR_PATH, '_sidebar.md')
  fs.writeFile(pa, md, "utf8", err => {
    if (err) throw err;
    console.log("文件已被保存");
  });
}


