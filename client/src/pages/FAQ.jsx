import React from 'react';

const Faq = () => {
    return (
        <div className='container-fluid'>
            <h3 className='text-center mt-3'>FAQ проекта TheBestAuction</h3>

            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Что такое интернет-аукционы?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Интернет-аукционы - это торговые площадки в Интернете, где продавцы могут выставлять на продажу товары или услуги, а покупатели могут делать предложения и торговаться за цену. На интернет-аукционах могут быть как новые, так и бывшие в употреблении товары. Зачастую аукционы проводятся с использованием специальных программных платформ и позволяют участникам торгов покупать и продавать товары без привязки к местонахождению, участвовать в торгах в режиме online и получать уведомления об изменении цены и статуса товара.                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Как зарегистрироваться для участия в интрент-аукционе??
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Для участия в интернет-аукционе необходимо зарегистрироваться на сайте аукциона, создав аккаунт и указав свои персональные данные. После процедуры регистрации, вы сможете активно участвовать в торгах.                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Как победить в интернет-аукционе?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            1. Изучите правила и условия аукциона. Обратите внимание на сроки, комиссии, способы оплаты и доставки товаров.
                            <br/>
                            2. Контролируйте время аукциона и установите максимальную ставку заранее. Не забывайте о лимитах на ставки, которые часто бывают установлены аукционом.
                            <br/>
                            3. Следите за конкурентами и не паникуйте, если они делают более высокие ставки. Возможно, они оценивают продукт выше, чем он стоит.
                            <br/>

                            4. Изучите характеристики товара и бренд, чтобы правильно оценить его ценность и качество. Иногда брендовые товары не всегда оправдывают свою высокую цену.
                            <br/>

                            5. Избегайте торгов по выходным и праздничным дням. В эти дни количество участников аукциона может быть больше, что приводит к дополнительной конкуренции и ценам.
                            <br/>

                            6. Следите за новостями и акциями на аукционе. Иногда на аукционах проводятся специальные акции и скидки на определенные товары.
                            <br/>

                            7. Если у вас есть возможность, общайтесь со продавцом и уточняйте все свои вопросы по товару. Это позволит избежать недопонимания и ошибок при покупке.                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Как происходит оплата в интернет-аукционе?
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Данный проект - курсовая работа, в которой нет оплаты.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Какой принцип работы ставок у вашего проекта?
                        </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            У лота есть время начала ставок и время конца ставок. Когда время подходит к концу, лот убирается из выдачи, а у победителя он отобразится во вкладке "Победы".
                            <br/>Также у лота есть стартовая цена и цена шага. Стартовая цена является номиналом, а претендент на покупку данного лота должен поднять шаг, тем самым увеличив цену номинала или уже имеющегося шага у оппонента.
                            <br/>Мы боремся с людьми, ставящими в последнюю секунду, добавив скрипт "отсрочки". Когда до конца ставок остается менее 10 минут, то любая ставка добавит 5 минут к времени окончания ставок.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSix">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                            Какие товары/услуги будут продаваться чаще остальных?
                        </button>
                    </h2>
                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix"
                         data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            В нашем проекте особое предпочтение отдается антиквариату и памятным вещам.
                            <br/> Это не означает, что будут продаваться только товары данного типа. Следите за панелью лотов!
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Faq;