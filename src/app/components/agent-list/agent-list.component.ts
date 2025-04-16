import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Agent } from '../../models/agent.model';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="header-section">
        <h2>AI Agents Directory</h2>
        <p class="subtitle">Manage and configure your intelligent agents</p>
      </div>
      
      <div class="actions">
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            placeholder="Search agents..."
            (input)="filterAgents()"
            class="search-input"
          />
        </div>
        <button [routerLink]="['/agent/new']" class="create-btn">
          <i class="fas fa-plus"></i> Create Agent
        </button>
      </div>

      <div class="agents-grid">
        @for (agent of filteredAgents; track agent.id) {
          <div class="agent-card">
            <div class="card-header">
              <h3>{{ agent.name }}</h3>
              <div class="model-info">
                <span class="model-badge">{{ agent.model }}</span>
                <span class="submodel-badge">{{ agent.submodel }}</span>
              </div>
            </div>
            <p class="description">{{ agent.description }}</p>
            <div class="card-actions">
              <button [routerLink]="['/agent/edit', agent.id]" class="action-btn edit-btn">
                <i class="fas fa-cog"></i> Configure
              </button>
              <button (click)="deleteAgent(agent.id!)" class="action-btn delete-btn">
                <i class="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    .header-section {
      text-align: center;
      margin-bottom: 2rem;
    }
    .subtitle {
      color: #666;
      font-size: 1.1rem;
    }
    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .search-container {
      position: relative;
      flex: 1;
      max-width: 400px;
    }
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }
    .search-input {
      padding: 12px 12px 12px 40px;
      width: 100%;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    .search-input:focus {
      border-color: #2196F3;
      outline: none;
      box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
    }
    .create-btn {
      padding: 12px 24px;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }
    .create-btn:hover {
      background-color: #1976D2;
      transform: translateY(-1px);
    }
    .agents-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }
    .agent-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    .agent-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    }
    .card-header {
      margin-bottom: 1rem;
    }
    .card-header h3 {
      margin: 0;
      color: #333;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    .model-info {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .model-badge {
      background-color: #E3F2FD;
      color: #1976D2;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .submodel-badge {
      background-color: #F3E5F5;
      color: #7B1FA2;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .description {
      color: #666;
      margin-bottom: 1.5rem;
      line-height: 1.5;
      flex-grow: 1;
    }
    .card-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }
    .action-btn {
      flex: 1;
      padding: 8px 16px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    .edit-btn {
      background-color: #E3F2FD;
      color: #1976D2;
    }
    .edit-btn:hover {
      background-color: #BBDEFB;
    }
    .delete-btn {
      background-color: #FFEBEE;
      color: #D32F2F;
    }
    .delete-btn:hover {
      background-color: #FFCDD2;
    }
  `]
})
export class AgentListComponent implements OnInit {
  agents: Agent[] = [];
  filteredAgents: Agent[] = [];
  searchTerm: string = '';

  constructor(private agentService: AgentService) {}

  ngOnInit() {
    this.agentService.getAgents().subscribe(agents => {
      this.agents = agents;
      this.filterAgents();
    });
  }

  filterAgents() {
    if (!this.searchTerm) {
      this.filteredAgents = this.agents;
      return;
    }
    
    const search = this.searchTerm.toLowerCase();
    this.filteredAgents = this.agents.filter(agent => 
      agent.name.toLowerCase().includes(search) ||
      agent.description.toLowerCase().includes(search)
    );
  }

  deleteAgent(id: string) {
    if (confirm('Are you sure you want to delete this agent?')) {
      this.agentService.deleteAgent(id);
    }
  }
}