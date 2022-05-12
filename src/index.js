class Config {
    constructor(method, body) {
        this.method = method,
        this.headers = {
            "Content-type": "application/json"
        },
        this.body = JSON.stringify(body)
    }
}

window.addEventListener('DOMContentLoaded', fetchQuotes)

function fetchQuotes() {
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(quotes => {
        quotes.map(quote => renderQuote(quote))
        document.getElementById('new-quote-form').addEventListener('submit', (e) => {
            e.preventDefault()
            submitNewQuote()
        })
    })
}

function renderQuote(quote) {
    const li = document.createElement('li')
    li.className = 'quote-card'
    const blockquote = document.createElement('blockquote')
    blockquote.className = 'blockquote'
    li.appendChild(blockquote)
    const p = document.createElement('p')
    p.className = 'mb-0'
    p.textContent = quote.quote
    blockquote.appendChild(p)
    const footer = document.createElement('footer')
    footer.className = 'blockquote-footer'
    footer.textContent = quote.author
    blockquote.appendChild(footer)
    blockquote.appendChild(document.createElement('br'))
    const btn1 = document.createElement('button')
    btn1.id = `like-${quote.id}`
    btn1.className = 'btn-success'
    btn1.innerHTML = `
        Likes: <span>${quote.likes.length}</span>
    `
    blockquote.appendChild(btn1)
    btn1.addEventListener('click', e => handleLikes(e.target))
    const btn2 = document.createElement('button')
    btn2.className = 'btn-danger'
    btn2.textContent = 'Delete'
    blockquote.appendChild(btn2)
    document.getElementById('quote-list').appendChild(li)
}

function submitNewQuote() {
    const newQuote = document.getElementById('new-quote')
    const authorNewQuote = document.getElementById('author')
    const quoteBody = {
        author: authorNewQuote.value,
        likes: [],
        quote: newQuote.value
    }
    fetch('http://localhost:3000/quotes', new Config('POST', quoteBody))
    .then(res => res.json())
    .then(newQuote => renderQuote(newQuote))
    newQuote.value = ''
    authorNewQuote.value = ''
}

function handleLikes(btn) {
    btn.children[0].textContent = parseInt(btn.children[0].textContent, 10) + 1
    const likeBody = {
        quoteId: parseInt(btn.id.split('-')[1], 10),
        createdAt: 1234567
    }
    fetch('http://localhost:3000/likes', new Config('POST', likeBody))
    .then(res => res.json())
    .then(res => res)
    .catch(error => console.log('error', error))
}