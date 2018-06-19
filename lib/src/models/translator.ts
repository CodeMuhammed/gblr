export class Segment {
    public isOpen?: boolean = false;
    public title: string = '--';
    public translations: Translation[] = [];
    public matchedSearch?: boolean;
}

export class Translation {
    public keyword: string = '--';
    public value: string = '--';
    public matchedSearch?: boolean;
}

export class Language {
  public id?: string;
  public name: string;
  public symbol: string;
  public segments: Segment[] = [];
}