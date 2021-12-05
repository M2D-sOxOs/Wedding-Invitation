$globalScope.$Slider = new (class {

  private __Element!: HTMLElement;
  private __Keyframes: { Time: number, Callback?: () => void, Frame?: string, Text?: string, ShowStep?: string }[] = [
    {
      Time: 0.1,
      Callback: () => {
        this.__Element.classList.add('Shown');
      }
    },
    {
      Time: 0.1,
      Frame: 'F0-0',
      ShowStep: 'S0'
    },
    {
      Time: 2.1,
      Frame: 'F0-1',
      ShowStep: 'S0'
    },
    {
      Time: 4.5,
      Frame: 'F0-2',
      ShowStep: 'S0'
    },
    {
      Time: 7.5,
      Frame: 'F1',
      ShowStep: 'S0'
    },
    {
      Time: 14.6,
      Frame: 'F1',
      ShowStep: 'S1'
    },
    {
      Time: 17.8,
      Frame: 'F2',
      ShowStep: 'S0'
    },
    {
      Time: 22.1,
      Frame: 'F3',
      ShowStep: 'S0'
    },
    {
      Time: 26.5,
      Frame: 'F4',
      ShowStep: 'S0'
    },
    {
      Time: 28.7,
      Frame: 'F5',
      ShowStep: 'S0'
    },
    {
      Time: 30.9,
      Frame: 'F6',
      ShowStep: 'S0'
    },
    {
      Time: 35.2,
      Frame: 'F7',
      ShowStep: 'S0'
    },
    {
      Time: 37.5,
      Frame: 'F8',
      Text: 'Did you notice your problem?',
      ShowStep: 'S0'
    },
    {
      Time: 39.7,
      Frame: 'F9',
      ShowStep: 'S0'
    },
    {
      Time: 41.9,
      Frame: 'F10',
      Text: 'Sorry, just next time',
      ShowStep: 'S0'
    },
    {
      Time: 44,
      Frame: 'F11',
      ShowStep: 'S0'
    },
    {
      Time: 46.2,
      Frame: 'F12',
      Text: 'You always told me so',
      ShowStep: 'S0'
    },
    {
      Time: 48.3,
      Frame: 'F13',
      ShowStep: 'S0'
    },
    {
      Time: 50.5,
      Frame: 'F14',
      Text: 'This time is different',
      ShowStep: 'S0'
    },
    {
      Time: 52.6,
      Frame: 'F15',
      Text: 'Because',
      ShowStep: 'S0'
    },
    {
      Time: 54.9,
      Frame: 'F16',
      ShowStep: 'S0'
    },
    {
      Time: 57,
      Frame: 'F17',
      ShowStep: 'S0'
    },
    {
      Time: 59.1,
      Frame: 'F18',
      ShowStep: 'S0'
    },
    {
      Time: 61.4,
      Frame: 'F19',
      ShowStep: 'S0'
    },
    {
      Time: 63.6,
      Frame: 'F20',
      ShowStep: 'S0'
    },
    {
      Time: 65.7,
      Frame: 'F21',
      ShowStep: 'S0'
    },
    {
      Time: 67.9,
      Frame: 'F22',
      ShowStep: 'S0'
    },
    {
      Time: 70.2,
      Frame: 'F23',
      ShowStep: 'S0'
    },
    {
      Time: 72.3,
      Frame: 'F24',
      ShowStep: 'S0'
    },
    {
      Time: 74.5,
      Frame: 'F25',
      ShowStep: 'S0'
    },
    {
      Time: 76.8,
      Frame: 'F26',
      ShowStep: 'S0'
    },
    {
      Time: 79,
      Frame: 'F27',
      ShowStep: 'S0'
    },
    {
      Time: 81.1,
      Frame: 'F28',
      ShowStep: 'S0'
    },
    {
      Time: 83.3,
      Frame: 'F29',
      ShowStep: 'S0'
    },
    {
      Time: 85.4,
      Frame: 'F30',
      ShowStep: 'S0'
    },
    {
      Time: 89.8,
      Frame: 'F31',
      ShowStep: 'S0'
    },
    {
      Time: 103,
      Frame: 'F32',
      Text: 'WE ARE MARRIED',
      ShowStep: 'S0'
    },
    {
      Time: 108,
      Frame: 'F32',
      ShowStep: 'S1'
    }
  ];

  private __KeyframeIndex = 0;

  constructor() {
  }

  public Load() {
    const SliderContainer = document.createElement('div');
    SliderContainer.innerHTML = $globalScope.$SimpleCache.Use('SliderPage');
    $globalScope.$Language.Translate(SliderContainer);
    this.__Element = <HTMLElement>SliderContainer.children[0];
    document.body.appendChild(this.__Element);
    $globalScope.$MusicControl.Ticker(this.__Ticker);
  }

  private __Frames: string[] = [];
  private __Ticker = (t: number) => {
    if (!this.__Keyframes[this.__KeyframeIndex]) return;
    if (t >= this.__Keyframes[this.__KeyframeIndex].Time) {
      if ((t - this.__Keyframes[this.__KeyframeIndex].Time) < 1) {
        if (this.__Keyframes[this.__KeyframeIndex].Callback) this.__Keyframes[this.__KeyframeIndex].Callback!();
        if (this.__Keyframes[this.__KeyframeIndex].Frame) {
          this.__Frames.push(this.__Keyframes[this.__KeyframeIndex].Frame!);
          if (!this.__Element.querySelector('.' + this.__Keyframes[this.__KeyframeIndex].Frame)) {
            const nextElement = document.createElement('div');
            nextElement.className = `Frame ${this.__Keyframes[this.__KeyframeIndex].Frame}`;
            if ($globalScope.DEBUG) nextElement.textContent = this.__Keyframes[this.__KeyframeIndex].Text! || this.__Keyframes[this.__KeyframeIndex].Frame!;
            else nextElement.textContent = this.__Keyframes[this.__KeyframeIndex].Text!;
            $globalScope.$Language.Translate(nextElement);
            this.__Element.appendChild(nextElement);
          }
          this.__Element.querySelector('.' + this.__Keyframes[this.__KeyframeIndex].Frame!)?.classList.add(this.__Keyframes[this.__KeyframeIndex].ShowStep!);
          if (4 < this.__Frames.length) {
            const element = this.__Element.querySelector('.' + this.__Frames.shift())!;
            if (element) this.__Element.removeChild(element);
          }
          if (this.__Keyframes[this.__KeyframeIndex + 1]) {
            if (!this.__Element.querySelector('.' + this.__Keyframes[this.__KeyframeIndex + 1].Frame!)) {
              const nextElement = document.createElement('div');
              nextElement.className = `Frame ${this.__Keyframes[this.__KeyframeIndex + 1].Frame}`;
              if ($globalScope.DEBUG) nextElement.textContent = this.__Keyframes[this.__KeyframeIndex + 1].Text! || this.__Keyframes[this.__KeyframeIndex + 1].Frame!;
              else nextElement.textContent = this.__Keyframes[this.__KeyframeIndex + 1].Text!
              $globalScope.$Language.Translate(nextElement);
              this.__Element.appendChild(nextElement);
            }
          }
        }
      }
      this.__KeyframeIndex++;
    }
  }
});