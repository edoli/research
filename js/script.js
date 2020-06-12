function publicationTag(thumbnail, title, authors, conference, materials) {
    return `
    <div class="d-flex flex-column flex-md-row pub-item">
        <img class="pub-thumbnail img-fluid" src="images/${thumbnail}" alt="">
        
        <div class="flex-fill d-flex flex-column pub-content">
        <div class="pub-title">${title}</div>
        <div class="pub-authors">${authors.map((author) => {
            if (author == 'Daniel S. Jeon') {
                return `<strong>${author}</strong>`
            } else {
                return `${author}`
            }
        }).join(', ')}</div>
        <div class="pub-conference">${conference}</div>
        <div class="flex-fill"></div>
        <div>
        ${materials.map((item) => {
            let icon = '';
            let path = item.path;
            let ext = path.slice(path.length - 3, path.length).toLowerCase();
            if (ext == 'pdf') {
                icon = '<i class="fas fa-file-pdf"></i>';
            } else if (ext == 'zip') {
                icon = '<i class="fas fa-file-archive"></i>';
            } else if (ext == 'mp4') {
                icon = '<i class="fas fa-file-video"></i>';
            }
            return `<a href="statics/${item.path}" class="btn btn-primary pub-material">${icon} ${item.name}</a>`;
        }).join('')}
        </div>
        </div>
    </div>
    `;
}

$.getJSON('statics/data.json', (data) => {
    let publicationsElem = $('.publications');

    data.publications.forEach((publication) => {
        let {thumbnail, title, authors, conference, materials} = publication;
        let tag = publicationTag(thumbnail, title, authors, conference, materials);
        publicationsElem.append(tag);
    });
});