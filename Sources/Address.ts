$globalScope.$Address = new (class {

  private __Element!: HTMLElement;
  public Load() {
    const MusicControlContainer = document.createElement('div');
    MusicControlContainer.innerHTML = $globalScope.$SimpleCache.Use('AddressPage');
    $globalScope.$Language.Translate(MusicControlContainer);
    this.__Element = <HTMLElement>MusicControlContainer.children[0];
    document.body.appendChild(this.__Element);
    setTimeout(() => {
      this.__Element.classList.add('Shown');
    }, 300);
  }

  public Toggle() {
    this.__Element.classList.toggle('Maximized');
  }

  public Show() {
    this.__Element.classList.add('Maximized');
  }
});