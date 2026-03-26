import { Injectable } from '@angular/core';
import {
    Router,
    NavigationEnd,
    ActivatedRoute
} from '@angular/router';
import { filter } from 'rxjs/operators';


/**
 * @author Nabeel Ahmed
 */
@Injectable({
    providedIn: 'root'
})
// Todo: Refactor this service to use a more efficient approach for breadcrumb generation.
export class BreadcrumbService {

    private subscription: any;
    public breadcrumbs: { label: string, url: string }[] = [];

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {
        this.initBreadcrumbs();
    }

    private initBreadcrumbs(): void {
        this.subscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.generateBreadcrumbs());
    }

    private generateBreadcrumbs(): void {
        this.breadcrumbs = [];
        let url = '';
        let currentRoute = this.activatedRoute.root;
        while (currentRoute) {
            const childrenRoutes = currentRoute.children;
            currentRoute = null;
            for (const route of childrenRoutes) {
                if (route.outlet !== 'primary') {
                    continue;
                }
                const routeSnapshot = route.snapshot;
                const path = routeSnapshot.url.map(segment => segment.path).join('/');
                if (path) {
                    url += '/' + path;
                }
                const breadcrumb = routeSnapshot.data && routeSnapshot.data['breadcrumb'];
                if (breadcrumb) {
                    this.breadcrumbs.push({ label: breadcrumb, url });
                }
                currentRoute = route;
            }
        }
    }
    
    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
