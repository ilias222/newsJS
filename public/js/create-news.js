//Создание новой новости
//Форма создания новости

// Нужна проверка id автора, емейла, для отображения кнопки - редактировать и удалить
// На сервере сделать проверку id новости, автора, емейла, для валидации запроса на удаления и изменения

const cook = document.cookie.replace(/(?:(?:^|.*;\s*)authorize\s*\=\s*([^;]*).*$)|^.*$/, "$1");
// console.log(document.cookie.replace(/(?:(?:^|.*;\s*)idminis\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
// /(?:(?:^|.*;s*)idminis\s*\=s*([^;]*).*$)|^.*$/
let datas = new FormData()

function parserCookie (key_Name) {
    const reg = new RegExp(`(?:(?:^|.*;\\s*)${key_Name}\\s*\\=\\s*([^;]*).*$)|^.*$`) 
    return document.cookie.replace(reg, "$1")
}

// Date format YYYY-MM-DD, type: text
function generateDat () {
    const dat = new Date()
    const datYear = dat.getFullYear();
    let datMoth = dat.getMonth() + 1 ;
    let datDay = dat.getDate();

    if(parseInt(datMoth) < 10){
        datMoth = `0${datMoth}`;
    }
    if(parseInt(datDay) < 10){
        datDay = `0${datDay}`;
    }

    return `${datYear}-${datMoth}-${datDay}`
}

function idNews (id_user){
    const idUser = id_user;
    const idCategories = 1;
    const idRamdomGroub = parseInt(Math.random() * 10);
    const idRamdomNumer = parseInt(Math.random() * 100);
    return parseInt(idUser + '' + idCategories + '' + idRamdomGroub + '' + idRamdomNumer);
}

fetch(`http://localhost:3000/users/users/${parserCookie('idminis')}`)
.then( respons => respons.json())
.then(result => {
    console.log(result)
    datas.append('id', `${idNews(result.id)}`);
    datas.append('authorid', `${result.id}`);
    datas.append('author', `${result.firstName} ${result.lastName}`);
    datas.append('dataMess', generateDat());
    datas.append('categoryid', '1');
}
);

document.querySelector('.form-create-news').addEventListener('submit', (e) => {
    e.preventDefault();
    datas.append('file', document.querySelector('.images-title-news').files[0], document.querySelector('.images-title-news').value);
    datas.append('title', document.querySelector('.title-news').value);
    datas.append('descript', document.querySelector('.descript-news').value);
    ///////////////
    console.log(datas.getAll('file'));
    console.log(datas.getAll('id'));
    console.log(datas.getAll('title'));

    fetch('http://localhost:3000/news/create', {
      method: "POST",
      body: datas,
    });
});
