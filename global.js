console.log('ITS ALIVE!')

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector))
}

// let navLinks = $$('nav a')
// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
// );
// currentLink?.classList.add('current');

let pages = [
    {url: '', title: 'home'},
    {url: 'resume/', title: 'resume'},
    {url: 'projects/', title: 'projects'},
    {url: 'https://github.com/nicolastoon', title: 'github'},
    {url: 'contact/', title: 'contact'},
]

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    nav.insertAdjacentHTML('beforeend', `<a href='${url}'>${title}</a>`)
}