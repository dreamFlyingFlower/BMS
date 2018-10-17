/**
 * 利用node环境自带的编码和加密功能,Buffer对象为node自带
 */
import common from './common';
// node自带的文件处理对象
const fs = require("fs");
export default{
  base64Encode,
  base64Decode,
  base64ImgEncode,
  base64ImgDecode,
  hexEncode,
  hexDecode,
  md5,
  aesEncode,
  aesDecode,
  urlEncode,
  urlDecode,
  paramEncode,
  paramDecode
}

function base64Encode(value){
  if(common.isBlank(value)){
    throw new TypeError("value can not be null");
  }
  return new Buffer(value).toString("base64");
}

function base64Decode(value){
  if(common.isBlank(value)){
    return;
  }
  return new Buffer(value,"base64").toString("utf8");
}

function base64ImgEncode(file){
  let bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString("base64");
}

function base64ImgDecode(base64Img,filePath){
  let bitmap = new Buffer(base64Img,"base64");
  fs.writeFileSync(filePath);
}

function hexEncode(value){
  if(common.isBlank(value)){
    throw new TypeError("value can not be null");
  }
  return new Buffer(value).toString("hex")
}

function hexDecode(value){
  if(common.isBlank(value)){
    return;
  }
  return new Buffer(value,"hex").toString("utf8");
}

function md5(){

}

function aesEncode(){
  if(common.isBlank(value)){
    throw new TypeError("value can not be null");
  }
}

function aesDecode(){
  if(common.isBlank(value)){
    return;
  }
}

/**
 * 对url整体进行编码,特殊字符串不编码,但是不要带%,会报错,若必须有,则将%换成%25
 */
function urlEncode(value){
  if(common.isBlank(value)){
    throw new TypeError("value can not be null");
  }
  return encodeURI(value)
}

function urlDecode(value){
  if(common.isBlank(value)){
    return;
  }
  return decodeURI(value)
}

/**
 * 只对参数进行编码,特殊字符串也进行编码,但是不要带%,会报错,若必须有,则将%换成%25
 */
function paramEncode(value){
  if(common.isBlank(value)){
    throw new TypeError("value can not be null");
  }
  return encodeURIComponent(value)
}

/**
 * 只对参数进行解码
 */
function paramDecode(value){
  if(common.isBlank(value)){
    return;
  }
  return decodeURIComponent(value)
}