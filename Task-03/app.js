document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('add-book-form');
    const bookList = document.getElementById('books');
    const searchInput = document.getElementById('search');
    const historyList = document.getElementById('history');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('close-button');
    const modalHistory = document.getElementById('modal-history');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');

    let books = [];
    let history = [];

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const author = authorInput.value.trim();

        if (!title || !author) {
            alert('Please enter both title and author.');
            return;
        }

        const book = {
            title,
            author,
            id: Date.now(),
            borrowed: false,
            history: []
        };

        books.push(book);
        addToHistory(`Added: ${title} by ${author}`);
        displayBooks(books);

        bookForm.reset();
    });

    searchInput.addEventListener('input', () => {
        filterBooks();
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function filterBooks() {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks);
    }

    function displayBooks(books) {
        bookList.innerHTML = '';
        books.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `${book.title} by ${book.author} ${book.borrowed ? '<span class="borrowed">(Borrowed)</span>' : ''}`;

            const actions = document.createElement('div');
            actions.classList.add('actions');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editBook(book.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteBook(book.id));

            const borrowButton = document.createElement('button');
            borrowButton.textContent = book.borrowed ? 'Return' : 'Borrow';
            borrowButton.addEventListener('click', () => toggleBorrow(book.id));

            const historyButton = document.createElement('button');
            historyButton.textContent = 'History';
            historyButton.addEventListener('click', () => showHistory(book.id));

            actions.appendChild(editButton);
            actions.appendChild(deleteButton);
            actions.appendChild(borrowButton);
            actions.appendChild(historyButton);

            li.appendChild(actions);
            bookList.appendChild(li);
        });
    }

    function editBook(id) {
        const book = books.find(b => b.id === id);
        if (book) {
            titleInput.value = book.title;
            authorInput.value = book.author;
            books = books.filter(b => b.id !== id);
            displayBooks(books);
        }
    }

    function deleteBook(id) {
        const book = books.find(b => b.id === id);
        if (book) {
            books = books.filter(b => b.id !== id);
            addToHistory(`Deleted: ${book.title} by ${book.author}`);
            displayBooks(books);
        }
    }

    function toggleBorrow(id) {
        const book = books.find(b => b.id === id);
        if (book) {
            book.borrowed = !book.borrowed;
            book.history.push({
                action: book.borrowed ? 'Borrowed' : 'Returned',
                date: new Date().toLocaleString()
            });
            addToHistory(`${book.borrowed ? 'Borrowed' : 'Returned'}: ${book.title} by ${book.author}`);
            displayBooks(books);
        }
    }

    function showHistory(id) {
        const book = books.find(b => b.id === id);
        if (book) {
            modalHistory.innerHTML = '';
            book.history.forEach(event => {
                const li = document.createElement('li');
                li.textContent = `${event.date}: ${event.action}`;
                modalHistory.appendChild(li);
            });
            modal.style.display = 'block';
        }
    }

    function addToHistory(action) {
        const li = document.createElement('li');
        li.textContent = action;
        historyList.appendChild(li);
    }
});
