import moment from 'moment';

const News = function() {
    const news = document.querySelector("[data-js='news']");
    const moreBtn = document.querySelector("[data-js='news-btn-more']");
    const loader = document.querySelector("[data-js='loader']");
    let newsListContainer;
    let newsList = [];
    let size = 5;
    let sizeMoreNews = 2;
    if(news) {
        newsListContainer = document.querySelector('[data-js="news-list"]');
        var axios = require('axios');
        axios.get("https://my-json-server.typicode.com/TomaszJaworski/test-api/news")
            .then(response => {
                newsList = response.data;
                showNewsOnStart();
                if(moreBtn) moreBtn.addEventListener('click', showMoreNews);
            })
            .catch(function (err) {
                console.log("Problem z api", err);
            });
    }

    function createNews(item) {
        let singleNews = document.createElement('div');
        singleNews.classList.add("news__information", "is--show");
        let heading = document.createElement('div');
        heading.classList.add('news__information__heading');
        let title = document.createElement('h3');
        title.classList.add('news__information__title');
        title.textContent  = item.title;
        let date = document.createElement('p');
        date.classList.add('news__information__date');
        date.textContent = 'Data dodania: ' + moment(item.date).format("DD.MM.YYYY h:mm:ss");
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('news__information__img');
        let img = document.createElement('img');
        img.setAttribute('src', item.image);
        img.setAttribute('alt', 'obrazek wiadomości');
        imgDiv.appendChild(img);
        heading.appendChild(imgDiv);
        heading.appendChild(date);
        heading.appendChild(title);
        let desc = document.createElement('p');
        desc.classList.add('news__information__desc');
        desc.innerHTML = item.text;
        singleNews.appendChild(heading);
        singleNews.appendChild(desc);
        newsListContainer.appendChild(singleNews);
    }

    function showNewsOnStart() {
        size = size < newsList.length ? size : newsList.length;
        newsList.slice(0, size).map((item, i) => {
            createNews(item);
        });
        if(size == newsList.length) {
            moreBtn.classList.add('is--hide');
        }
    }

    function showMoreNews() {
        loader.classList.add('is--show');
        let firstNext = size;
        setTimeout(function(){
            if(size + sizeMoreNews < newsList.length) {
                newsList.slice(size, size + sizeMoreNews).map((item, i) => {
                    createNews(item);
                });
                size +=sizeMoreNews;
            } else {
                newsList.slice(size).map((item, i) => {
                    createNews(item);
                });
                moreBtn.classList.add('is--hide');
            }

            loader.classList.remove('is--show');
            let elementToScroll = document.querySelectorAll('.news__information')[firstNext].getBoundingClientRect().top;
            window.scrollTo(0, elementToScroll + window.scrollY - 15);
        }, 500);

    }
}

export default News;
