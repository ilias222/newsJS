class CreateNewElementHTML {
    constructor(node_Element, name_Element, value_Element){
        this.node_Element = node_Element;
        this.name_Element = name_Element;
        this.value_Element = value_Element;
    }

    createElement () {
        const element = document.createElement(this.node_Element);
        element.name = this.name_Element;
        element.value = this.value_Element;
        return element;
    
    }
}

let datas = new FormData();
const elem = new CreateNewElementHTML();
const dat = new Date();

    function cookisPare(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

document.querySelector('.auth-sectionUp').addEventListener('submit', (e) => {
    e.preventDefault();
    
    datas.append('id', 1);
    datas.append('firstName', document.querySelector('.names1').value);
    datas.append('lastName', document.querySelector('.names2').value);
    datas.append('email', document.querySelector('.emeilR').value);
    datas.append('roles', 'user');
    datas.append('password', document.querySelector('.pass-user').value);
    datas.append('files', document.querySelector('.avatar-user').files[0], document.querySelector('.avatar-user').value);
    console.log(datas.getAll('firstName'))
    console.log(datas.getAll('lastName'))
    console.log(datas.getAll('email'))
    console.log(datas.getAll('roles'))
    console.log(datas.getAll('password'))
    console.log(datas.getAll('files'))
    fetch('http://localhost:3000/users', {
        method: "post",
        body: datas,
      }).then(req => req.text()).then(item => console.log(item))

})