import { Routes } from '@angular/router';
import { ExtraOptions } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { SplashComponent } from './splash/splash.component';
import { HowtoComponent } from './howto/howto.component';
import { TriviaComponent } from './trivia/trivia.component';
import { BoardComponent } from './board/board.component';
import { EndpageComponent } from './endpage/endpage.component';


export const routes: Routes = [
        { path: '', redirectTo: '/splash', pathMatch: 'full' },
        {path: 'create', component: CreateComponent},
        {path: 'splash', component: SplashComponent},
        {path: 'howto', component: HowtoComponent},
        {path: 'board', component: BoardComponent},
        {path: 'trivia', component: TriviaComponent},
        {path: 'end', component: EndpageComponent},

];

export const routerOptions: ExtraOptions = {
    scrollOffset:[0,0],
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
};

