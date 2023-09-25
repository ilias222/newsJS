document.querySelector('.container-paralex').addEventListener('mousemove', (e) => {
    const item_1 = document.querySelector('.p-item-1');

    let clientX = (e.clientX / window.innerWidth * 30) - 10;
    let clientY = (e.clientX / window.innerHeight * 30) - 5;

    console.log(clientX, clientY)
    console.log(item_1)

    item_1.setAttribute("style", "padding: " + clientX + "px " + clientY + "px;");

})