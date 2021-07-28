let contextMenu = { 'catania' : [
    { 'left' : 1, 'right' : 8, 'name' : 'odd', "color": "_neutrals" },
    { 'left' : 2, 'right' : 3, 'name' : '1', "color": "00110" },
    { 'left' : 4, 'right' : 5, 'name' : '3', "color": "00393" },
    { 'left' : 6, 'right' : 7, 'name' : '5', "color": "00429" },
    { 'left' : 9, 'right' : 16, 'name' : 'even', "color": "_brownTones" },
    { 'left' : 10, 'right' : 11, 'name' : '2', "color": "00436" },
    { 'left' : 12, 'right' : 13, 'name' : '4', "color": "00437" },
    { 'left' : 14, 'right' : 15, 'name' : '6', "color": "00438" },
]};
/* above needs to be replaced by variable schachenmayrCatania from schachenmayrCatania.js */
contextMenu = schachenmayrCatania;

/* create template elements from index.html div.navigation */ 
const navigation = document.querySelector('.navigation');
const navSub2li = document.querySelector('.navigation .sub2 li');
navSub2li.remove();
const navSub2ul = document.querySelector('.navigation .sub2');
navSub2ul.remove();
const navSub1li = document.querySelector('.navigation .sub1 li');
navSub1li.remove();
const navSub1ul = document.querySelector('.navigation .sub1');
navSub1ul.remove();
const navSub0li = document.querySelector('.navigation .sub0 li');
navSub0li.remove();
const navSub0ul = document.querySelector('.navigation .sub0');
navSub0ul.remove();

function appendNav(origin, child) {
    origin.appendChild(child.cloneNode(true));
    return origin;
}

function createContextMenu(navArray) {
    /* build nav UL*/
    appendNav(navigation, navSub0ul);
    for (const sub0 of navArray.filter(f => (f.left + 1) != f.right )) {
        const thisNavSub0 = navSub0li;
        thisNavSub0.className = 'sub0 ' + 'l' + sub0.left + ' ' + 'r' + sub0.right;
        appendNav(navigation.querySelector('ul'), thisNavSub0);
        const actualUlClass = '.l' + sub0.left;
        navigation.querySelector(actualUlClass);

        /* build sub UL */ 
        appendNav(navigation.querySelector(actualUlClass), navSub1ul)
        for (const sub1 of navArray.filter(f => f.left>sub0.left && f.left<sub0.right )) {
            const thisNavSub1 = navSub1li;
            thisNavSub1.id = sub1.color;
            thisNavSub1.className = 'sub1 ' + 'l' + sub1.left + ' ' + 'r' + sub1.right;
            appendNav(navigation.querySelector(actualUlClass + ' ul'), thisNavSub1);
        }
    }
}

function fillContextMenu(navArray) {
    for (const i of navArray) {
        /* identify elements by their classes */
        const myElement = navigation.querySelector('.l' + i.left + '.r' + i.right);
        if ((i.left + 1) !== i.right) {
            /* main menu item where l+1!=r */
            myElement.querySelector('button').addEventListener('click', toggleSubMenu);
            myElement.querySelector('button').style.color = 'red';
        } else {
            /* sub menu element where l+1=r */
            myElement.querySelector('button').addEventListener('click', contextMenuAction);
            myElement.querySelector('button').classList.add('catania' + i.color);
        }
        myElement.querySelector('button').innerText = i.name;
    }
}

function toggleSubMenu(e) {
    this.parentNode.querySelector('ul').classList.toggle('hidden');
}
function contextMenuAction(e) {
    // console.log('e: ', e);
    // console.log('actualGridElement: ', actualGridElement);
    // console.log('this.className: ', this.className);
    // console.log('actualGridElement.srcElement.classList: ', actualGridElement.srcElement.classList);
    actualGridElement.srcElement.className = this.className;
}

function closeAllSubMenus(navArray) { /* close sub menus */
    for (const i of navArray) {
        /* identify elements by their classes */
        const myElement = navigation.querySelector('.l' + i.left + '.r' + i.right);
        if ((i.left + 1) !== i.right) {
            /* main menu item where l+1!=r */
            myElement.querySelector('ul').classList.toggle('hidden');
        }
    }
}

function closeContextMenu() { 
    document.querySelector('.navigation').classList.add('hidden');
}
function openContextMenu() { 
    document.querySelector('.navigation').classList.remove('hidden');
}

createContextMenu(contextMenu.catania);
fillContextMenu(contextMenu.catania);
closeAllSubMenus(contextMenu.catania);
closeContextMenu();

// console.log('navigation: ', navigation);

document.querySelector('.closeNav').addEventListener('click', closeContextMenu);
