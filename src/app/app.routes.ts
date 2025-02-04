import { Routes } from '@angular/router';
import { ProtocolComponent } from './protocol/protocol.component';
import { PersonalComponent } from './personal/personal.component';

export const routes: Routes = [
    {path: 'protocol', component: ProtocolComponent},
    {path: 'personal', component: PersonalComponent}
];  

