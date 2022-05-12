window.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(quotes => quotes.map(quote => renderQuote(quote)))
})

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
    btn1.className = 'btn-success'
    btn1.innerHTML = `
        Likes: <span>${quote.likes.length}</span>
    `
    blockquote.appendChild(btn1)
    const btn2 = document.createElement('button')
    btn2.className = 'btn-danger'
    btn2.textContent = 'Delete'
    blockquote.appendChild(btn2)
    document.getElementById('quote-list').appendChild(li)
}