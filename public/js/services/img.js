class SaveImg {
    
    
    async post(img) {
        
        const fData =  new FormData()
        fData.append('imgurl',img)
        
            try {
                return await fetch('/upload', {
                    method: 'POST',
                    body: fData,
                }).then(r => r.json());
            } catch (error) {
                console.error('ERROR POST', error);
            }
        
    }

}

const saveImg = new SaveImg();

export default saveImg;
