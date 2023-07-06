import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import { uploadBgImg } from './icons'

export function ImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })

  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && getCroppedImgUrl('' + secure_url)
  }

  function getCroppedImgUrl(imgUrl) {
    console.log('imgUrl', imgUrl)
    const idx = imgUrl.indexOf('upload') + 7
    let newUrl = imgUrl.substring(0, idx)
    newUrl += 'w_494,h_550,c_fill/' + imgUrl.substring(idx)
    console.log(newUrl)
    onUploaded(newUrl)

  }

  return (
    <div className="img-uploader">
      <header className='flex column'>
        <p>Create new post</p>
      </header>
      <main className='flex column'>
        {imgData.imgUrl && <img src={imgData.imgUrl} />}

        <section className='icon'>{uploadBgImg}</section>
        <p>Drag photos and videos here</p>
        <button className='input-btn'><span className='btn-txt'>Select from computer</span>
          <input className='img-input hidden' type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
        </button>
      </main>
    </div>
  )
}