//Создание комментария
//Фарма создания комментария

let datas = new FormData();

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

function idRandom() {
  const dat = generateDat();
  const idNews = document.querySelector('.deletes').id;
  const randomOne = () => parseInt(Math.random()*1000);
  const randomHex =`${randomOne().toString(16)}-${randomOne().toString(16)}`;

  return `${randomHex}-${dat}-${idNews}-${randomHex}`
}

    function cookisPare(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

document.querySelector('.btn-primary').addEventListener('click', (e) => {
    e.preventDefault();

    let a
    try{
      a = document.querySelector('.cover-comment').files[0], document.querySelector('.cover-comment').value
    }catch(e){
      a = null;
    }
    
    datas.append('idNews', document.querySelector('.deletes').id);
    datas.append('id', idRandom());
    datas.append('idUser', cookisPare('idminis'));
    datas.append('comments', a);
    datas.append('message', document.querySelector('.form-control-mess').value);
    datas.append('nameuser', cookisPare('nameuser'));
    datas.append('emailUser', cookisPare('email'));
    datas.append('createAt', generateDat ());
    console.log(datas.getAll('id'))
    fetch('http://localhost:3000/news-comments/create', {
        method: "post",
        body: datas,
      }).then(req => req.text()).then(item => console.log(item))


})



