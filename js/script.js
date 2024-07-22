
let getThumbnail = (thumbnail, isHover) => {
    let ext = thumbnail.slice(thumbnail.length - 3, thumbnail.length).toLowerCase();
    let className = "pub-thumbnail-content";
    if (isHover) {
        className += " thumbnail-hover"
    }
    if (ext == 'mp4') {
        if (isHover) {
            return `<video class="${className}" loop muted playsinline onmouseover="this.play()" onmouseout="this.pause();" src="images/${thumbnail}"></video>`;
        } else {
            let thumbnailImage = thumbnail.slice(0, -4) + '.jpg';
            return `<video class="${className}" loop muted playsinline onmouseover="this.play()" onmouseout="this.pause();" src="images/${thumbnail}" poster="images/${thumbnailImage}"></video>`;
        }
    } else {
        return `<img class="${className}" src="images/${thumbnail}" alt="">`;
    }
}

function publicationTag(thumbnail, thumbnailHover, title, authors, conference, materials) {
    return `
    <div class="d-flex flex-column flex-md-row pub-item">
        <div class="pub-thumbnail">
            ${thumbnailHover !== undefined ? getThumbnail(thumbnailHover, true) : ""}
            ${getThumbnail(thumbnail, false)}
        </div>
        
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
                        if (path.includes("github.com")) {
                            icon = '<i class="fa-brands fa-github"></i>';
                        } else {
                            icon = '<i class="fas fa-link"></i>';
                        }
                        link = `${path}`;
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

function otherTag(thumbnail, thumbnailHover, title, link, content) {
    return `
    <div class="d-flex flex-column flex-md-row pub-item">
        <div class="pub-thumbnail">
            ${thumbnailHover !== undefined ? getThumbnail(thumbnailHover, true) : ""}
            ${getThumbnail(thumbnail, false)}
        </div>
        
        <div class="flex-fill d-flex flex-column pub-content">
            <div class="pub-title"><a href="${link}">${title}</a></div>
            <div class="pub-conference">${content}</div>
        </div>
    </div>
    `;
}


$.getJSON('statics/data.json', (data) => {
    let publicationsElem = $('.publications');

    data.publications.forEach((publication) => {
        let {thumbnail, thumbnailHover, title, authors, conference, materials} = publication;
        let tag = publicationTag(thumbnail, thumbnailHover, title, authors, conference, materials);
        publicationsElem.append(tag);
    });
});

$.getJSON('statics/tool_data.json', (data) => {
    let toolsElem = $('.tools');

    data.tools.forEach((tool) => {
        let {thumbnail, thumbnailHover, title, link, content} = tool;
        let tag = otherTag(thumbnail, thumbnailHover, title, link, content);
        toolsElem.append(tag);
    });
});


