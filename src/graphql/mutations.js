// eslint-disable
// this is an auto generated file. This will be overwritten

export const createSlideshow = `mutation CreateSlideshow($input: CreateSlideshowInput!) {
  createSlideshow(input: $input) {
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
export const updateSlideshow = `mutation UpdateSlideshow($input: UpdateSlideshowInput!) {
  updateSlideshow(input: $input) {
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
export const deleteSlideshow = `mutation DeleteSlideshow($input: DeleteSlideshowInput!) {
  deleteSlideshow(input: $input) {
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
export const createSlide = `mutation CreateSlide($input: CreateSlideInput!) {
  createSlide(input: $input) {
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
export const updateSlide = `mutation UpdateSlide($input: UpdateSlideInput!) {
  updateSlide(input: $input) {
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
export const deleteSlide = `mutation DeleteSlide($input: DeleteSlideInput!) {
  deleteSlide(input: $input) {
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
