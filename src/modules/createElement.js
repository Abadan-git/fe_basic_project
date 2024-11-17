export const createImage = ({image, alt}) => {
    const imgElement = document.createElement('img');
    imgElement.src = image.url;
    if (alt) {
        imgElement.alt = alt;
    }
    return  imgElement;
};

export const createOption = (options) => {
    const option = document.createElement('option');
    option.value = options.id;
    option.innerText = options.name;

    return  option;
};

