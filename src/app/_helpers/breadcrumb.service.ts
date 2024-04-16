import { Injectable } from '@angular/core';
import {
    Router,
    NavigationEnd,
    ActivatedRoute
} from '@angular/router';
import { filter } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {

    public breadcrumbs: { label: string, url: string }[] = [];

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.breadcrumbs = [];
                let currentRoute = this.activatedRoute.root;
                let url = '';
                do {
                    const childrenRoutes = currentRoute.children;
                    currentRoute = null;
                    childrenRoutes.forEach(route => {
                        if (route.outlet === 'primary') {
                            const routeSnapshot = route.snapshot;
                            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
                            if (routeSnapshot.data && routeSnapshot.data['breadcrumb']) {
                                this.breadcrumbs.push({ label: routeSnapshot.data['breadcrumb'], url: url });
                            }
                            currentRoute = route;
                        }
                    });
                } while (currentRoute);
            });
    }
}
