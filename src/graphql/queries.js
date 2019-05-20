// eslint-disable
// this is an auto generated file. This will be overwritten

export const getSlideshow = `query GetSlideshow($id: ID!) {
  getSlideshow(id: $id) {
    id
    title
    slides {
      items {
        id
        content
        order
        config
        owner
        files
      }
      nextToken
    }
    owner
  }
}
`;
export const listSlideshows = `query ListSlideshows(
  $filter: ModelslideshowFilterInput
  $limit: Int
  $nextToken: String
) {
  listSlideshows(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      slides {
        nextToken
      }
      owner
    }
    nextToken
  }
}
`;
export const getSlide = `query GetSlide($id: ID!) {
  getSlide(id: $id) {
    id
    content
    order
    config
    slideshow {
      id
      title
      slides {
        nextToken
      }
      owner
    }
    owner
    files
  }
}
`;
export const listSlides = `query ListSlides(
  $filter: ModelslideFilterInput
  $limit: Int
  $nextToken: String
) {
  listSlides(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      order
      config
      slideshow {
        id
        title
        owner
      }
      owner
      files
    }
    nextToken
  }
}
`;
