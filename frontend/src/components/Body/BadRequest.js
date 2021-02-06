import React, {useRef, useEffect} from 'react';

const BadRequest = () => {
  const header1 = useRef(null)
  const header2 = useRef(null)
  const text1 = useRef(null)
  const text2 = useRef(null)
  const image = useRef(null)

  useEffect(() => {
      header1.current.classList.remove('begin')
      header2.current.classList.remove('begin')
      text1.current.classList.remove('begin')
      text2.current.classList.remove('begin')
      image.current.classList.remove('begin')
  }, [])

  return (
    <>
      <div className='bad-request-container'>
        <video autoPlay muted src='https://cdn.videvo.net/videvo_files/video/free/2013-10/small_watermarked/Background_08_preview.webm' 
        type='video/webm' loop />
        <div className='bad-request-header header1 begin' ref={header1}>404</div>
        <div className='bad-request-header header2 begin' ref={header2}>Page Not Found</div>
        <div className='bad-request-text text1 begin' ref={text1}>Lost in the travel of time and space are you?</div>
        <div className='bad-request-text text2 begin' ref={text2}> Here's a fellow sojourner to keep you company</div>
        <br></br>
        <img className='bad-request-img begin' src='/pictures/giphy.gif' ref={image}/>
      </div>
    </>
  )
}

export default BadRequest