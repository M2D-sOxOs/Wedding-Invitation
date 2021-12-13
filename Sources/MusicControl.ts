$globalScope.$MusicControl = new (class {

  private __Element!: HTMLElement;
  private __Audio!: HTMLAudioElement;
  private __AudioContext!: AudioContext;
  private __AudioGain!: GainNode;
  public Load() {
    const MusicControlContainer = document.createElement('div');
    MusicControlContainer.innerHTML = $globalScope.$SimpleCache.Use('MusicControlPage');
    $globalScope.$Language.Translate(MusicControlContainer);
    this.__Element = <HTMLElement>MusicControlContainer.children[0];
    document.body.appendChild(this.__Element);
    // this.Play();
    setTimeout(() => {
      this.__Element.classList.add('Shown');
    }, 300);
  }

  public Minimize() {
    this.__Element.classList.add('Minimized');
    this.__Audio = document.createElement('audio');
    this.__Audio.src = $globalScope.$SimpleCache.Use('Sound-Bgm-1');
    this.__Audio.autoplay = false;
    this.__AudioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
    this.__AudioGain = this.__AudioContext.createGain();
    this.__AudioGain.gain.value = 0;
    this.__AudioContext.createMediaElementSource(this.__Audio).connect(this.__AudioGain).connect(this.__AudioContext.destination);

    // this.__Audio.currentTime = 100;
    this.__Element.appendChild(this.__Audio);
    $globalScope.$Slider.Load();
    this.__Audio.addEventListener('ended', this.__Ended);
  }
  public Mute() {
    this.Minimize();
    this.__Element.addEventListener('transitionend', this.__Pause);
  }

  public Play() {
    this.Minimize();
    this.__Element.addEventListener('transitionend', this.__Play);
  }

  public Skip() {
    $globalScope.$Address.Show();
  }

  public Toggle() {
    if (!this.__Audio) return 0;
    if (0 == this.__AudioGain.gain.value) {
      this.TogglePlay();
    } else {
      this.ToggleMute();
    }
  }
  public TogglePlay() {
    const muting = setInterval(() => {
      if (1 == this.__AudioGain.gain.value) {
        clearInterval(muting);
        return;
      }
      this.__AudioGain.gain.value = Math.min(1, this.__AudioGain.gain.value + 0.1);
    }, 100);
    this.__Element.classList.add('Playing');
    this.__Element.classList.remove('Paused');
  }
  public ToggleMute() {
    const muting = setInterval(() => {
      if (0 == this.__AudioGain.gain.value) {
        clearInterval(muting);
        return;
      }
      this.__AudioGain.gain.value = Math.max(0, this.__AudioGain.gain.value - 0.1);
    }, 100);
    this.__Element.classList.add('Playing');
    this.__Element.classList.add('Paused');
  }

  private __Pause = (e: Event) => {
    if (e.target != this.__Element) return;
    this.__Audio.play();
    this.ToggleMute();
  }

  private __Ended = (e: Event) => {
    $globalScope.$Address.Show();
  }

  private __Play = (e: Event) => {
    if (e.target != this.__Element) return;
    this.__Audio.play();
    this.TogglePlay();
  }

  public Ticker(onTick: (t: number) => void) {
    setInterval(() => {
      onTick(this.__Audio.currentTime);
    }, 20);
  }
});
