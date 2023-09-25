import { News } from 'src/news/news.service';

export function mapNews(news: News[]) {
    let htmlNews: string = '';
    news.map((item) => htmlNews += renderNews(item))
    return htmlNews;
}

export function renderNews(item: News) {
  return `
  <div class="card" style="width: 18rem; margin: 10px;">
  <img class="card-img-top" src="${item.imgTitle}" alt="Card image cap"
  style="object-position: top; object-fit: cover; max-height: 150px; width: 100%;">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text">${item.descript}</p>
    <a href="#" class="btn btn-primary">Автор: ${item.author}</a>
    <p class="card-text" style="font-size: 11px;">${item.dataMess}</p>
  </div>
</div>
  `
}

export function renderNewsItem(item: News): string {
    return`
    <div class="uuid ${item.id}" style="display: flex; flex-direction: colums; jstify-content: top; margin: 10px">
      <img src="${item.imgTitle}" alt="Card image cap"
      style="max-width: 200px; object-position: top; object-fit: cover; max-height: 250px;">
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text" style="
        background-color: gray; 
        color: #FFFFFF;
        max-width: 300px;
        padding: 10px;
        ">${item.descript}</p>
      </div>
    </div>
    <section>
      <div>
        <p style="margin-left: 80px; margin-right: 100px; margin-bottom: 80px; margin-top: 20px;
        padding: 30px;">
         ${item.text}
        </p>
      </div>
    </section>
`
}

export function mapComments(comentItem) {
    let htmlComment: string = ''
    if(comentItem.length > 0){
    comentItem.map((item) => htmlComment += renderComment(item))
    return htmlComment;
    }
    return "Пока нет комментариев";
}

export function renderComment(item) {
    return `
    <div class="card" style="width: 18rem; margin: 10px;">
    <div class="card-body">
        <img src='${item.avatar || '../../../../../comments/2989786.webp'}' style="object-position: top; object-fit: cover; max-height: 150px; width: 100%;">
        <h5 class="card-title">${item.names}</h5>
        <p class="card-text">${item.comment}</p>
        <p class="card-text" style="font-size: 11px;">${item.date}</p>
    </div>
    <button type="button" class="btn btn-primary">Комментировать</button>
    </div>
    `
}
