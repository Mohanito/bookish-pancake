import axios from 'axios';
import FormData from 'form-data';

// Free tier - move to .env later
const API_KEY = 155890118188957;

const ocrRequest = async (imageURL, base64) => {

    const form = new FormData();
    // form.append('file', {
    //     uri: imageURL,
    //     type: 'image/jpeg',
    //     name: 'file'
    // });
    form.append('base64Image', `data:image/jpeg;base64,${base64}`);

    try {
        const response = await axios({
            // url: 'https://cat-fact.herokuapp.com/facts',
            // method: 'GET'
            url: 'https://api.ocr.space/parse/image',
            method: 'POST',
            data: form,
            headers: {
                'apikey': API_KEY,
                'language': 'eng',
                'filetype': 'JPG',
                'content-type': 'multipart/form-data'
                // 'detectOrientation', true
            }
        })
        // .then((res) => {
        //     console.log('ocr api finished');
        //     response = res;
        //     // console.log(response);
        // })
        // .catch((e) => {
        //     console.log(e);
        //     return e;
        // });
        return response.data;

    } catch (error) {
        console.log(e);
        return '';
    }

}

export default ocrRequest;