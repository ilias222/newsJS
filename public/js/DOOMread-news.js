import { CreateNewElementHTML } from "/js/create-Element.js";

const itemTitle = document.querySelector('.title-news');
const itemDescrib = document.querySelector('.describ-news')
const itemAuthor = document.querySelector('.author-news').id;
const itemNews = itemTitle.id;

// Если нажата кнопка редактировать в детальной новости с комментами

document.querySelector('.commen').addEventListener('click', (e) => {

    const fileCover = new CreateNewElementHTML('input', 'file', 'file-cover', 'file-readNews', '').createElement();
    const readTitle = new CreateNewElementHTML('input', 'textarea', 'title-news', 'title-readNews', '').createElement();
    const readDescrib = new CreateNewElementHTML('input', 'textarea', 'describ-news', 'describ-readNews', '').createElement();
    const readForm = new CreateNewElementHTML('form', '', '', 'form-read-news', '').createElement();
    const readSubmit = new CreateNewElementHTML('input', 'submit', '', 'button-read-news', 'Отправить').createElement();
    readTitle.value = itemTitle.textContent;
    readDescrib.value = itemDescrib.textContent;

    if(e.target.textContent == 'Редактировать'){ 
        e.target.textContent = 'отмена'

        document.querySelector('.img-fluid').after(readForm);
        document.querySelector('.form-read-news').append(fileCover);
        document.querySelector('.form-read-news').append(readTitle);
        document.querySelector('.form-read-news').append(readDescrib);
        document.querySelector('.form-read-news').append(readSubmit);
        document.querySelector('.title-news').remove();
        document.querySelector('.describ-news').remove();

        document.querySelector('.form-read-news').addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('id News', itemTitle.id)
            let datas = new FormData();
            console.log(fileCover.files[0], fileCover.value)
            datas.append('file', fileCover.files[0], fileCover.value);
            datas.append('title', readTitle.value);
            datas.append('describ', readDescrib.value);
            datas.append('author', itemAuthor);
            datas.append('id', itemNews);

            fetch('http://localhost:3000/news/read-news',{
                method: 'POST',
                body: datas
            }).then(item => {
                if(item.status == 201){
                    const alert = new CreateNewElementHTML('p', '', '', 'alert-readNews', '').createElement();
                    alert.textContent = 'Новость изменена';
                    alert.style = `font-size: 36px;
                    background-color: bisque;
                    color: crimson;
                    border-radius: 50px;
                    padding: 0px 50px;
                    text-align-last: center;`

                    document.querySelector('.form-read-news').after(alert);
                    setTimeout(function(){
                        location.reload();
                    }, 5000);
                }
            })
        })

    }else{
        e.target.textContent = 'Редактировать';

        document.querySelector('.form-read-news').after(itemDescrib);
        document.querySelector('.form-read-news').after(itemTitle);
        document.querySelector('.form-read-news').remove();

    }

});

