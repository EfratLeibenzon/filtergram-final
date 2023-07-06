

export const uploadService = {
  uploadImg,
  // getSize
}

export const CLOUD_NAME = "duxmabf4n"

async function uploadImg(ev) {
  const UPLOAD_PRESET = "w1nxvekj"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

// function getSize(imageUrl) {

//   cloudinary.config({
//     cloud_name: CLOUD_NAME,
//     api_key: '735475296776624',
//     api_secret: 'KJHEJ6yMXU3nDTTnf7nYTjnYUIE'
//   })

//   // specify the URL of the image you want to get the dimensions of
//   // const imageUrl = 'https://res.cloudinary.com/dzte1natd/image/upload/v1677337587/sample_raw.jpg'

//   // call the getImage method to get the dimensions of the image
//   cloudinary.uploader.explicit(imageUrl, { type: 'fetch' }, function (error, result) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(result.width, result.height);
//     }
//   });
// }

