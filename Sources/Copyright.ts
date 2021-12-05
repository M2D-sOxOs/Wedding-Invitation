$globalScope.$Copyright = new (class {

  private __Element!: HTMLElement;
  public Load() {
    const MusicControlContainer = document.createElement('div');
    MusicControlContainer.innerHTML = $globalScope.$SimpleCache.Use('CopyrightPage');
    $globalScope.$Language.Translate(MusicControlContainer);
    this.__Element = <HTMLElement>MusicControlContainer.children[0];
    document.body.appendChild(this.__Element);
  }
});