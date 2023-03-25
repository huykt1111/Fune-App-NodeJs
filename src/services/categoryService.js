import db from "../models/index";
const gets = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await db.Category.findAll();
      console.log(categories)
      resolve(categories)
    } catch (error) {
      reject(error);
    }
  })
}
module.exports = {
  gets
}