const myLibrary = [];
const grille = document.querySelector('.grille');
class Book{
    #id;
    constructor(title,author,pages,read)
    {
        this.#id = crypto.randomUUID();
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read;
    }
    getId()
    {
        return this.#id;
    }
    toggleRead()
    {
        this.read=!this.read;
    }
};
function addBookToLibrary(title,author,pages,read)
{
    let livre = new Book(title,author,pages,read);
    myLibrary.push(livre);
};
function loopTab (tab)
{
    grille.innerHTML='';
    for (let i=0;i<tab.length;i++)
    {
        let livre = document.createElement('div');
        livre.classList.add('livre');
        livre.dataset.id=tab[i].getId();
        let author = document.createElement('div');
        let title = document.createElement('div');
        let pages = document.createElement('div');
        const read = document.createElement('div');
        read.classList.add('btn', 'read');
        const remove = document.createElement('div');
        remove.classList.add('btn', 'remove');
        remove.dataset.id=tab[i].getId();
        read.dataset.id=tab[i].getId();
        author.textContent = tab[i].author;
        title.textContent=tab[i].title;
        pages.textContent=tab[i].pages;
        if(tab[i].read)
        {
            read.textContent="read";
        }
        else
        {
            read.textContent="not read yet";
            read.classList.add('no');
        }
        remove.textContent="remove";
        livre.appendChild(title)
        livre.appendChild(author);
        livre.appendChild(pages);
        livre.appendChild(read);
        livre.appendChild(remove);
        grille.appendChild(livre);
    }
};
const formBtn = document.querySelector('.formBtn');
const dialog = document.querySelector('dialog');
formBtn.addEventListener('click', ()=>{
    dialog.showModal();
});
const subBtn = document.getElementById('subBtn');
subBtn.addEventListener('click',()=>
{
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const readCheckBox = document.querySelector('input[type="checkbox"]');
    const read = readCheckBox.checked;
    addBookToLibrary(title,author,pages,read);
    form.reset();
    loopTab(myLibrary);
    dialog.close();
});
function deleteBook(tab,id)
{
    for (let i=0;i<tab.length;i++)
    {
        if (id == tab[i].getId())
        {
            tab.splice(i,1);
        }
    }
};
function changeRead(tab,id)
{
    for (let i=0;i<tab.length;i++)
    {
        if (id == tab[i].getId())
        {
            tab[i].toggleRead();
        }
    }
};
grille.addEventListener('click', (event)=>{
    let num = event.target.dataset.id;
    if (event.target.classList.contains('remove'))
    {
        deleteBook(myLibrary, num);
        loopTab(myLibrary);
    }
    if (event.target.classList.contains('read'))
    {
        if (event.target.textContent=="read")
        {
            event.target.textContent="not read yet";
            event.target.classList.add('no');
            changeRead(myLibrary,num);
        }
        else
        {
            event.target.textContent="read";
            event.target.classList.remove('no');
            changeRead(myLibrary,num);
        }
    }
});
