import React from 'react';
import mainImg from '../static/main-photo.jpg';

const Greet = () => {
    return (
        <div className='container-fluid p-5 main-article d-md-flex justify-content-between'>
            <div>
                <img className='img-fluid mt-4' src={mainImg} alt={'MainPhoto'}/>
            </div>
            <div className='align-self-center ms-3'>
                Добро пожаловать на наш аукцион! Мы рады приветствовать вас в нашем уютном онлайн-магазине, где вы можете приобрести товары по самым выгодным ценам. Приятных вам покупок!
            </div>
        </div>
    );
};

export default Greet;