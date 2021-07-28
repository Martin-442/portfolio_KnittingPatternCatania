
function listenerOnGrid() {
    const allGrid = document.querySelectorAll('.container .item');
    for (const i of allGrid) {
        // console.log('i: ', i);
        i.addEventListener('click', clickOnGridElement, false); 
    }
}

listenerOnGrid(); 

function clickOnGridElement(e) {
    // if (!e.target.classList.contains('item')) e.preventDefault();
    console.log('e.target: ', e.target);
    // console.log('this: ', this);
    console.log('e: ', e);
    console.log('e.pageX: ', e.pageX);
    console.log('e.pageY: ', e.pageY);
    console.log('e.offsetX: ', e.offsetX);
    console.log('e.offsetY: ', e.offsetY);
    console.log('e.target.clientHeight: ', e.target.clientHeight);
    console.log('e.target.clientWidth: ', e.target.clientWidth);
    console.log('e.target.offsetLeft: ', e.target.offsetLeft);
    console.log('e.target.offsetTop: ', e.target.offsetTop);
    openContextMenu();
    navigation.style.marginLeft = e.clientX + 'px';
    navigation.style.marginTop = e.clientY + 'px';

}