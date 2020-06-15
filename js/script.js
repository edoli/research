function publicationTag(thumbnail, title, authors, conference, materials) {
    let getThumbnail = () => {
        let ext = thumbnail.slice(thumbnail.length - 3, thumbnail.length).toLowerCase();
        if (ext == 'mp4') {
            return `<video class="pub-thumbnail img-fluid" autoplay loop muted playsinline src="images/${thumbnail}"></video>`;
        } else {
            return `<img class="pub-thumbnail img-fluid" src="images/${thumbnail}" alt="">`;
        }
    }

    return `
    <div class="d-flex flex-column flex-md-row pub-item">
        ${getThumbnail()}
        
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
                    let link = '';
                    let path = item.path;
                    let ext = path.split('.').pop().toLowerCase();
                    let isHttp = path.slice(0, 4).toLowerCase() === 'http';
                    let isCode = false;
                    if (isHttp) {
                        icon = '<i class="fas fa-link"></i>';
                        link = `${item.path}`;
                    } else if (isCode) {
                        icon = '<i class="fas fa-file-code"></i>';
                    } else  {
                        if (ext == 'pdf') {
                            icon = '<i class="fas fa-file-pdf"></i>';
                        } else if (ext == 'zip') {
                            icon = '<i class="fas fa-file-archive"></i>';
                        } else if (ext == 'mp4' || ext == 'avi' || ext == 'mkv' || ext == 'mov') {
                            icon = '<i class="fas fa-file-video"></i>';
                        }  else if (ext == 'mp3' || ext == 'ogg' || ext == 'wav' || ext == 'mp4a') {
                            icon = '<i class="fas fa-file-audio"></i>';
                        } else if (ext == 'ppt' || ext == 'pptx') {
                            icon = '<i class="fas fa-file-powerpoint"></i>';
                        }  else if (ext == 'xls' || ext == 'xlsx') {
                            icon = '<i class="fas fa-file-excel"></i>';
                        }  else if (ext == 'doc' || ext == 'docx') {
                            icon = '<i class="fas fa-file-word"></i>';
                        } else {
                            icon = '<i class="fas fa-file-alt"></i>';
                        }
                        link = `statics/${item.path}`;
                    }
                    return `<a href="${link}" class="btn btn-primary pub-material">${icon} ${item.name}</a>`;
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