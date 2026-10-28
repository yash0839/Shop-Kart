import React from 'react'

const Brand = ({name,image}) => {
  return (
    <div className='card h-100 border-0 shodow-sm rounded-3'>
        <div className='card-body d-flex dlex-column align-items-center justify-content-center p-3'>
            <img src={image} alt={`${name} logo`}
            className='img-fluid md-3'
            style={{
                width: "100%",
                height:"75px",
                objectFit:"contain",
            }} 
             loading= "lazy"
            />
            <h6 className='fw-semibold text-dark md-0 text-center'>
                {name}
            </h6>

        </div>
      
    </div>
  )
}

export default Brand
