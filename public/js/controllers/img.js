import imgService from '/js/services/img.js';


class SaveImg {

    async saveImg(img) {
        // console.log('saveProduct:', product);
        const savedImg = await imgService.post(img);
        return savedImg;
    }

}

const saveImg = new SaveImg();
export default saveImg;
