import React from 'react';
import Logo from 'media/logo.ico';

const ImagenLogo = () => {
    return (
        <div>
            <img className='mx-auto h-45 w-auto rounded-3xl ' src={Logo} alt='Workflow' />
        </div>
    )
}

export default ImagenLogo;

