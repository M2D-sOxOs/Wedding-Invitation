$globalScope.$Opening = new (class {

  constructor() {
    this.GeniGone();
  }

  public async GeniGone() {
    const audioElement = document.createElement('audio');
    audioElement.src = '/Assets/Ding.mp3';
    audioElement.autoplay = true;
    document.body.appendChild(audioElement);

    let dingCount = 0;
    audioElement.addEventListener('ended', () => {
      dingCount++;
      switch (dingCount) {
        case 1:
          audioElement.play();
          break;
        case 2:
          $globalScope.$Geni.Speeding(this.DoLoad);
          document.body.removeChild(audioElement);
          break;
      }
    })
    audioElement.addEventListener('play', () => {
      setTimeout(() => {
        $globalScope.$Geni.Tick();
      }, 100);
    });
    try {
      await audioElement.play();
    } catch {
      $globalScope.$Geni.Speeding(this.DoLoad);
      document.body.removeChild(audioElement);
    }
  }

  public DoLoad = () => {
    $globalScope.$MusicControl.Load();
    $globalScope.$Address.Load();
    $globalScope.$Copyright.Load();
  }
})();