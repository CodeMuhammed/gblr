import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { User } from 'app/shared/model';
import { RouterService, UserService } from 'app/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    @ViewChild('nav') public nav;
    @Input() public items;

    public profile: User;
    public canOpen = true;

    constructor(
        private userService: UserService,
        private routerService: RouterService,
        private router: Router
    ) { }

    async ngOnInit() {
        this.routerService.sideMenuActive$.subscribe(status => {
            this.canOpen = status;
        });

        // we get the currenly signed in user
        this.profile = await this.userService.getCurrentUser();
    }

    public isOver(): boolean {
        return window.matchMedia(`(max-width: 960px)`).matches;
    }

    protected closeNav() {
        if (this.isOver()) {
            this.nav.close();
        }
    }

    public formatEmail(email: any) {
        const ttlIndex = email.indexOf('@');
        const ttl = email.substr(ttlIndex);
        const domain = email.substr(0, ttlIndex);
        const rest = domain.length > 8 ? '...' : '';

        email = domain.substr(0, 8) + rest + ttl;

        return email;
    }

    public handleFeedback(feedbackId: string) {
        const userRole = localStorage.getItem('user_role');
        const url = userRole === 'admin' ? 'schoolAdmin' : userRole;
        this.router.navigateByUrl(`${url}/feedback/${feedbackId}`);
    }
}
