export function renderTemplate(content: string, comments?: string): string {
    return`
  <!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
  <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">
    ${content}
  </div>
  ${ comments && 
    `<div style="
    display: flex; 
    flex-direction: column; 
    flex-wrap: wrap; 
    justify-content: center; 
    align-content: center;
    ">
    ${comments}
    </div>
<form method="post" enctype="multipart/form-data"
  action="http://localhost:3000/news-comments">
    <div class="coments-user" style="
    border: solid 1px;
    padding: 30px;
    margin: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    ">
    <div class="input-group mb-3">
  <input type="file" name='comments' id='avatar'>
  <input type="text" name='nameUser' id="user-name" class="form-control" placeholder="Имя пользователя" aria-label="Имя пользователя" 
  aria-describedby="basic-addon1">
</div>

<div class="input-group mb-3">
  <input type="email" name='emailUser' id="user-email" class="form-control" placeholder="Электронная почта" aria-label="Имя получателя" 
  aria-describedby="basic-addon2">
  <div class="input-group-append">
    <span class="input-group-text" id="basic-addon2">@</span>
  </div>
</div>

<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">Ваш комментарий</span>
  </div>
  <textarea id="user-comment" name='commentUser' class="form-control" aria-label="With textarea"></textarea>
</div>

<input type="submit" id='comment-bottom' class="btn btn-primary">Отправить</button>
</div>
</form>
<script>
document.getElementById('comment-bottom').addEventListener('click', () => {

    const uuidNews = document.querySelector('.uuid').className.replace('uuid ', '');
    let element = document.createElement('input');
    element.value = uuidNews;
    element.name = 'uuidNews';
    document.querySelector('form').append(element);
  });
</script>
    `
}
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
    `
}