$globalScope.$Language = new (class {

  private __Language: any;
  constructor(language: string) {
    try {
      this.__Language = $globalScope.$SimpleCache.Use(`Language-${language.substr(0, 2).toUpperCase()}`);
      this.Translate(document.body);
    } catch {
      console.log('Language:', language, 'is not supported, using EN as default');
    }
  }

  public Translate(translateNode: Element) {
    if (0 == translateNode.children.length && (translateNode.textContent!.trim() in this.__Language)) {
      translateNode.textContent = this.__Language[translateNode.textContent!.trim()];
    } else {
      for (const childElement of translateNode.children) this.Translate(childElement);
    }
  }

})('zh');