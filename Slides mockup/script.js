const head_title = document.createElement('h1');
head_title.innerHTML = 'Interesting Cat Breeds';
document.body.appendChild(head_title);

const mainWrapper = document.createElement('div');
mainWrapper.classList.add('wrapper');
document.body.appendChild(mainWrapper);

const slidesBox = document.createElement('div');
slidesBox.classList.add('slideContainer');
mainWrapper.appendChild(slidesBox);

const slideZero = document.createElement('div');
slideZero.classList.add('slide');
slideZero.classList.add('active');
slidesBox.appendChild(slideZero);

const imgZero = document.createElement('img');
imgZero.src = './img/img_1.jpg';
slideZero.appendChild(imgZero);

const slideFirst = document.createElement('div');
slideFirst.classList.add('slide');
slidesBox.appendChild(slideFirst);

const imgFirst = document.createElement('img');
imgFirst.src = './img/img_2.jpg';
slideFirst.appendChild(imgFirst);

const slideSecond = document.createElement('div');
slideSecond.classList.add('slide');
slidesBox.appendChild(slideSecond);

const imgSecond = document.createElement('img');
imgSecond.src = './img/img_3.jpeg';
slideSecond.appendChild(imgSecond);

const slideThird = document.createElement('div');
slideThird.classList.add('slide');
slidesBox.appendChild(slideThird);

const imgThird = document.createElement('img');
imgThird.src = './img/img_4.jpeg';
slideThird.appendChild(imgThird);

const slideFourth = document.createElement('div');
slideFourth.classList.add('slide');
slidesBox.appendChild(slideFourth);

const imgFourth = document.createElement('img');
imgFourth.src = './img/img_5.jpg';
slideFourth.appendChild(imgFourth);

const slideFifth = document.createElement('div');
slideFifth.classList.add('slide');
slidesBox.appendChild(slideFifth);

const imgFifth = document.createElement('img');
imgFifth.src = './img/img_6.jpg';
slideFifth.appendChild(imgFifth);

const slideSixth = document.createElement('div');
slideSixth.classList.add('slide'); 
slidesBox.appendChild(slideSixth);

const imgSixth = document.createElement('img');
imgSixth.src = './img/img_7.jpg';
slideSixth.appendChild(imgSixth);

const btnPrev = document.createElement('button');
btnPrev.classList.add('btn-prev');
btnPrev.innerText = '';
slidesBox.insertBefore(btnPrev, slideZero);

const btnNext = document.createElement('button');
btnNext.classList.add('btn-next');
btnNext.innerText = '';
slidesBox.appendChild(btnNext);

const dotWrap = document.createElement('div');
dotWrap.classList.add('dotsWrapper');
document.body.appendChild(dotWrap);

const dotZero = document.createElement('span');
dotZero.classList.add('dot');
dotZero.classList.add('active');
dotWrap.appendChild(dotZero);

const dotFirst = document.createElement('span');
dotFirst.classList.add('dot');
dotWrap.appendChild(dotFirst);

const dotSecond = document.createElement('span');
dotSecond.classList.add('dot');
dotWrap.appendChild(dotSecond);

const dotThird = document.createElement('span');
dotThird.classList.add('dot');
dotWrap.appendChild(dotThird);

const dotFourth = document.createElement('span');
dotFourth.classList.add('dot');
dotWrap.appendChild(dotFourth);

const dotFifth = document.createElement('span');
dotFifth.classList.add('dot');
dotWrap.appendChild(dotFifth);

const dotSixth = document.createElement('span');
dotSixth.classList.add('dot');
dotWrap.appendChild(dotSixth);


const slides = document.querySelectorAll('.slide'); 
const dots = document.querySelectorAll('.dot');

let index = 0;

const activeSlide = n => {
    for(let slide of slides) {
        slide.classList.remove('active'); 
    }
    slides[n].classList.add('active');
}

const activeDot = n => {
    for(let dot of dots) {
        dot.classList.remove('active');
    } 
    dots[n].classList.add('active');
}

const prepareCurrentSlide = index => {
    activeSlide(index);
    activeDot(index);
}

const nextSlide = () => {
    index = index === slides.length - 1 ? 0 : index + 1;
    prepareCurrentSlide(index);
}

const prevSlide = () => {
    index = index === 0 ? slides.length - 1 : index - 1;
    prepareCurrentSlide(index);
}

dots.forEach((item, indexDot)=> {
    item.addEventListener('click', () => {
        index = indexDot;
        prepareCurrentSlide(index);
    })
})


setInterval(nextSlide, 10000);
btnPrev.addEventListener('click', prevSlide);
btnNext.addEventListener('click', nextSlide);