class ImagePreloader {
  public preloadImage(src: string, isSilent?: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => resolve();
      image.onerror = () => isSilent ? resolve() : reject();
    });
  }
}

export default new ImagePreloader();
