// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateSlideshow = `subscription OnCreateSlideshow {
  onCreateSlideshow {
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
export const onUpdateSlideshow = `subscription OnUpdateSlideshow {
  onUpdateSlideshow {
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
export const onDeleteSlideshow = `subscription OnDeleteSlideshow {
  onDeleteSlideshow {
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
export const onCreateSlide = `subscription OnCreateSlide {
  onCreateSlide {
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
export const onUpdateSlide = `subscription OnUpdateSlide {
  onUpdateSlide {
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
export const onDeleteSlide = `subscription OnDeleteSlide {
  onDeleteSlide {
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
