const adviceID = document.querySelector('#adviceID');
const adviceText = document.querySelector('#adviceText');
const adviceGenerator = document.querySelector('#adviceGenerator');

const fetchAdvice = async(id) => {
    const adviceByID = await fetch(`https://api.adviceslip.com/advice/${id}`)
    const byIDData = await adviceByID.json();

    adviceID.innerText = byIDData.slip.id
    adviceText.innerText = `"${byIDData.slip.advice}"`
}

let maxAdvices = 224;
let randomNumberOnLoad = Math.floor(Math.random() * maxAdvices);
fetchAdvice(`${randomNumberOnLoad}`);

adviceGenerator.addEventListener('click', () => {
    let randomNumberOnClick = Math.floor(Math.random() * maxAdvices);

    fetchAdvice(`${randomNumberOnClick}`);
    randomNumberOnLoad = randomNumberOnClick;
})

const nextBtn = document.querySelector('#next');
const backBtn = document.querySelector('#back');
const arrowBtns = document.querySelectorAll('[data-arrowBtn]')

// Goes to the next advice based on the ID, not random
arrowBtns.forEach((item) => {
    item.addEventListener('click', () => {
        switch (item) {
            case nextBtn:
                if(randomNumberOnLoad >= maxAdvices) {
                    fetchAdvice(`1`)
                    randomNumberOnLoad = 1;
                    return
                }
                fetchAdvice(`${randomNumberOnLoad + 1}`)
                randomNumberOnLoad += 1;
                break;

            case backBtn:
                if(randomNumberOnLoad <= 1) {
                    fetchAdvice(maxAdvices)
                    randomNumberOnLoad = maxAdvices;
                    return
                }
                fetchAdvice(`${randomNumberOnLoad - 1}`)
                randomNumberOnLoad -= 1;
                break;
        }
    })
})
