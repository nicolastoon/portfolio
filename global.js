console.log('ITS ALIVE!')

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector))
}

let pages = [
    {url: '', title: 'home'},
    {url: 'resume/', title: 'resume'},
    {url: 'projects/', title: 'projects'},
    {url: 'https://github.com/nicolastoon', title: 'github'},
    {url: 'contact/', title: 'contact'},
]
let nav = document.createElement('nav');
document.body.prepend(nav);
const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "/"                 
    : "/portfolio/";
for (let p of pages) {
    let url = !p.url.startsWith('http') ? BASE_PATH + p.url : p.url;
    let title = p.title;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }
    if (a.host !== location.host) {
        a.target = '_blank';
    }
}

let default_option = matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
let secondary = default_option === 'dark' ? 'light' : 'dark';
document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
        theme:
        <select>
            <option value='${default_option}'>${default_option} (system default)</option>
            <option value='${secondary}'>${secondary}</option>
        </select>
    </label>`,
);

let select = document.querySelector('select');
select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value;
});
if (localStorage.colorScheme) {
    document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}



