const $globalScope = new (class {

  [k: string]: any;

  DEBUG: boolean = false;

  $SimpleNetwork = new (class {
    public async Get(url: string, progress: (subPercentage: number) => void, useBlob: boolean = false): Promise<string> {
      return new Promise((resolve, reject) => {
        const xhrInstance = new XMLHttpRequest();
        xhrInstance.open('get', url);
        xhrInstance.addEventListener('progress', (e) => {
          progress(e.total ? e.loaded / e.total : 0);
        });
        if (useBlob) xhrInstance.responseType = 'blob';
        xhrInstance.addEventListener('readystatechange', (e) => {
          if (4 != xhrInstance.readyState) return;
          if (200 != xhrInstance.status) return reject();
          resolve(useBlob ? window.URL.createObjectURL(xhrInstance.response) : xhrInstance.responseText);
        });
        xhrInstance.send(null);
      })
    }
  });

  $SimpleCache = new (class {
    constructor(public readonly Manifest: string, public readonly Indicator: string) {
      this.__Random = Date.now().toString();
    }
    private __Files: any = {};
    private __Loaded: number = 0;
    private __Total: number = 0;
    private __Random: string;
    public async Run() {
      try {
        const loadFiles: any[] = JSON.parse(await $globalScope.$SimpleNetwork.Get(this.Manifest, () => { }));
        this.__Total = loadFiles.length;
        for (const loadFile of loadFiles) {
          switch (loadFile.Type) {
            case 'JSON':
              this.__Files[loadFile.ID] = JSON.parse(await $globalScope.$SimpleNetwork.Get(loadFile.Url + `?${this.__Random}`, (p) => this.__Progress(p)));
              break;
            case 'SCRIPT':
              this.__Files[loadFile.ID] = await $globalScope.$SimpleNetwork.Get(loadFile.Url + `?${this.__Random}`, (p) => this.__Progress(p));
              const module: any = { exports: {} };
              eval(this.__Files[loadFile.ID]);
              break;
            case 'CSS':
              this.__Files[loadFile.ID] = await $globalScope.$SimpleNetwork.Get(loadFile.Url + `?${this.__Random}`, (p) => this.__Progress(p));
              const styleElement = document.createElement('style');
              styleElement.innerHTML = this.__ReplaceBlob(this.__Files[loadFile.ID]);
              document.body.appendChild(styleElement);
              break;
            case 'HTML':
              this.__Files[loadFile.ID] = await $globalScope.$SimpleNetwork.Get(loadFile.Url + `?${this.__Random}`, (p) => this.__Progress(p));
              break;
            case 'FONT':
            case 'SOUND':
            case 'IMAGE':
              this.__Files[loadFile.ID] = await $globalScope.$SimpleNetwork.Get(loadFile.Url + `?${this.__Random}`, (p) => this.__Progress(p), true);
              break;
            default:
              console.error('Loading file with unknown type:', loadFile.Type);
              break;
          }
          this.__Loaded++;
        }
      } catch (e) {
        console.error(e);
        // location.href = '/Error.html';
      }
    }
    private __ReplaceBlob(content: string): string {
      const foundFiles = content.match(/url\((["'].*?\1)\)/g);
      if (!foundFiles) return content;
      for (const foundFile of foundFiles) {
        const fileId = foundFile.match(/^url\((["'])(.*?)\1\)$/)![2];
        if (this.__Files[fileId]) {
          content = content.replace(foundFile, `url('${this.__Files[fileId]}')`);
        } else {
          console.log('Cannot find blob file:', fileId);
        }
      }
      return content;
    }
    private __Progress(subPercentage: number) {
      if (!this.__Total) return;
      const indicatorElement = document.querySelector(this.Indicator);
      const stepValue = (1 / this.__Total) * 100;
      if (indicatorElement) indicatorElement.textContent = '' + Math.round(0 == this.__Loaded ? 0 : ((this.__Loaded / this.__Total * 100) + (subPercentage * stepValue))) + '%';
      if (100 == Math.round((this.__Loaded / this.__Total * 100) + (subPercentage * stepValue))) this.__OnReady.forEach(v => v());

    }
    public Use(id: string) {
      if (id in this.__Files) return this.__Files[id];
      throw 'Using non-exists file in cache';
    }

    private __OnReady: (() => void)[] = [];
    public Ready(readyCallback: () => void) {
      this.__OnReady.push(readyCallback);
    }
  })('/Scripts/Manifest.json', '.Indicator');

  $Geni = new (class {
    constructor() {
    }

    public Geni!: HTMLElement;
    public Loading!: HTMLElement;
    public async Run() {
      this.Geni = document.querySelector('div.Geni')!;
      this.Loading = document.querySelector('div.Loading')!;
      if (!this.Geni) return;
      this.Geni.addEventListener('transitionend', this.Rotate)
      this.Rotate();
    }

    public Angle = 0;
    public Rotate = () => {
      this.Angle += this.Speed;
      this.Geni.style.transform = `rotate(${this.Angle}deg)`
    }

    public Remove = (done: () => void) => {
      this.Loading.parentNode?.removeChild(this.Loading);
      done();
    }

    public Speed = 30;
    public Speeding(done: () => void) {
      this.Geni.removeEventListener('transitionend', this.Rotate);
      const speedingInterval = setInterval(() => {
        this.Speed += this.Speed / 2;
        if (10000 < this.Speed) {
          clearInterval(speedingInterval);
          this.Geni.style.transform = `rotate(${this.Angle}deg) scale(1000)`;
          this.Loading.style.opacity = '0';
          this.Loading.addEventListener('transitionend', () => this.Remove(done));
          return;
        }
        this.Angle += this.Speed;
        this.Geni.style.transform = `rotate(${this.Angle}deg)`
      }, 200);
    }

    public TickCount = 0;
    public Tick() {
      this.Geni.classList.add('Tick' + (this.TickCount++ % 2));
    }
  });

  constructor() {
    window.onload = async () => {
      $globalScope.$SimpleCache.Run();
      $globalScope.$Geni.Run();
      let currentMarginTop = 0;
      const subtitleSlider = setInterval(() => {
        const sliderElement: HTMLElement | null = document.querySelector('div.Subtitle');
        if (!sliderElement) return;
        currentMarginTop -= 20;
        if (0 == (sliderElement.offsetHeight + currentMarginTop)) currentMarginTop = -20;
        sliderElement.style.transform = `translateY(${currentMarginTop}px)`;
      }, 3000);

      this.$SimpleCache.Ready(() => {
        clearInterval(subtitleSlider);
        let nextSlide = Math.abs(currentMarginTop / 20) + 1;
        const sliderElement: HTMLElement | null = document.querySelector('div.Subtitle');
        if (!sliderElement) return;
        if (nextSlide >= sliderElement.children.length) nextSlide = 0;
        sliderElement.children[nextSlide].textContent = 'Ready for SHOW';
        this.$Language.Translate(sliderElement.children[nextSlide]);
        sliderElement.style.transform = `translateY(${nextSlide * -20}px)`;
      })
    };
  }
});


(<any>window).$globalScope = $globalScope;

document.addEventListener(
  'touchmove',
  function (e) {
    e.preventDefault();
  },
  false
);
