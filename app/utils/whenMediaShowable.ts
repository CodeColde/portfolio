const isPlaying = (video: HTMLVideoElement) => !video.paused && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;

const whenMediaShowable = (el: Element) => {
  if (el instanceof HTMLImageElement) {
    return el.decode().catch(() => undefined);
  }
  if (el instanceof HTMLVideoElement && el.currentSrc && !isPlaying(el) && !el.error) {
    return new Promise<void>(resolve => {
      el.addEventListener("playing", () => resolve(), { once: true });
      el.addEventListener("error", () => resolve(), { once: true });
    });
  }
  return Promise.resolve();
};

export default whenMediaShowable;
