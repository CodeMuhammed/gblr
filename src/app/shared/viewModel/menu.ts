import { SubMenu } from './submenu';

export class MenuItem {
    public title?: string;
    public showAll?: boolean;
    public backButtonEnabled?: boolean;
    public searchEnabled?: boolean;
    public searchActive?: boolean;
    public submenuItems: SubMenu[];

    constructor() {
        this.title = '';
        this.showAll = false;
        this.backButtonEnabled = false;
        this.searchEnabled = false;
        this.searchActive = false;
        this.submenuItems = [];
    }
}
