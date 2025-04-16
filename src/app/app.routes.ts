import { Routes } from '@angular/router';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { AgentFormComponent } from './components/agent-form/agent-form.component';

export const routes: Routes = [
  { path: '', component: AgentListComponent },
  { path: 'agent/new', component: AgentFormComponent },
  { path: 'agent/edit/:id', component: AgentFormComponent }
];