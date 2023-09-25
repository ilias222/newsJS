const blocCreate = document.querySelector('.form-create-news');
const createClick = document.querySelector('.buton-create-news');
const createNews = document.querySelector('.appNews');
const authorName = document.querySelector('.user-name').textContent;
console.log("AUTHOR", authorName)

fetch(`http://localhost:3000/news/${authorName}`)
.then(async result =>{
    const obj = await result.json()
    obj.map((item) => createNews.innerHTML += `<img src="${item.cover}" style="width: 200px; height: 100px"></p><a href="http://localhost:3000/news/catalog/${item.idNew}"><p>${item.title}</p></a><p>${item.dadtaMess}</p>`);
});


createClick.addEventListener('click', (e) => {

    blocCreate.innerHTML += 
    `
        <input type="file" class="images-title-news" value="Картинка новости" style="margin: 10px;">
        <input type="text" class="title-news" name="title" placeholder="Заголовок новости" style="margin: 10px;">
        <textarea class="descript-news" name="descript" cols="30" rows="10" placeholder="Текст новости" 
        style="margin: 10px;"></textarea>
        <input type="submit" style="margin: 10px;">
    `
})

