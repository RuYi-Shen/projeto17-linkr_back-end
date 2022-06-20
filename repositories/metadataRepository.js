import urlMetadata from 'url-metadata';

async function metadata(url) {
    let infos;
    await urlMetadata(url).then((result) => {
        const title = result.title;
        const image = result.image;
        const description = result.description;
        infos = {title, image, description};
    });
    return infos;
  }

export default async function loadMetaDatas(row) {
    const infos = await metadata(row.url);

    return infos;
}