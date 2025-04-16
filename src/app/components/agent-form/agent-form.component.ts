import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../../models/agent.model';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="form-header">
        <h2>{{ isEditMode ? 'Edit Agent' : 'Create Agent' }}</h2>
        <p class="subtitle">{{ isEditMode ? 'Modify your agent\'s configuration' : 'Configure a new AI agent' }}</p>
      </div>
      
      <form (ngSubmit)="onSubmit()" #agentForm="ngForm" class="agent-form">
        <div class="form-grid">
          <div class="form-section basic-info">
            <h3>Basic Information</h3>
            <div class="form-group">
              <label for="name">Agent Name</label>
              <input
                type="text"
                id="name"
                name="name"
                [(ngModel)]="agent.name"
                required
                placeholder="Enter agent name"
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="model">Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  [(ngModel)]="agent.model"
                  required
                  placeholder="e.g., GPT-4, Claude"
                />
              </div>

              <div class="form-group">
                <label for="submodel">Submodel</label>
                <input
                  type="text"
                  id="submodel"
                  name="submodel"
                  [(ngModel)]="agent.submodel"
                  required
                  placeholder="e.g., Turbo, 2.1"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                name="description"
                [(ngModel)]="agent.description"
                required
                placeholder="Describe the agent's purpose and capabilities"
              ></textarea>
            </div>
          </div>

          <div class="form-section prompt-config">
            <h3>Prompt Configuration</h3>
            
            <div class="form-group">
              <label for="systemPrompt">
                System Prompt
                <i class="fas fa-info-circle tooltip-trigger">
                  <span class="tooltip">
                    Define the AI's role and behavior. This sets the context and boundaries for how the agent should operate.
                  </span>
                </i>
              </label>
              <textarea
                id="systemPrompt"
                name="systemPrompt"
                [(ngModel)]="agent.systemPrompt"
                required
                placeholder="You are a helpful assistant specialized in..."
              ></textarea>
            </div>

            <div class="form-group">
              <label for="userPrompt">
                User Prompt Template
                <i class="fas fa-info-circle tooltip-trigger">
                  <span class="tooltip">
                    Create a template for user inputs. This helps structure how users should interact with the agent.
                  </span>
                </i>
              </label>
              <textarea
                id="userPrompt"
                name="userPrompt"
                [(ngModel)]="agent.userPrompt"
                required
                placeholder="Please help me with..."
              ></textarea>
            </div>

            <div class="form-group">
              <label for="decisionPrompt">
                Decision Prompt
                <i class="fas fa-info-circle tooltip-trigger">
                  <span class="tooltip">
                    Guide the agent's decision-making process. This helps determine how the agent should analyze and respond to inputs.
                  </span>
                </i>
              </label>
              <textarea
                id="decisionPrompt"
                name="decisionPrompt"
                [(ngModel)]="agent.decisionPrompt"
                required
                placeholder="Analyze the input and determine..."
              ></textarea>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" (click)="onCancel()" class="cancel-btn">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button type="submit" [disabled]="!agentForm.form.valid" class="save-btn">
            <i class="fas fa-save"></i> {{ isEditMode ? 'Update' : 'Create' }} Agent
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    .form-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .subtitle {
      color: #666;
      margin-top: 0.5rem;
    }
    .agent-form {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .form-section {
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .form-section h3 {
      color: #333;
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }
    .tooltip-trigger {
      position: relative;
      cursor: help;
      color: #666;
    }
    .tooltip {
      visibility: hidden;
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      width: 200px;
      text-align: center;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .tooltip::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #333 transparent transparent transparent;
    }
    .tooltip-trigger:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: white;
    }
    input:focus, textarea:focus {
      border-color: #2196F3;
      outline: none;
      box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
    }
    textarea {
      min-height: 120px;
      resize: vertical;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }
    .cancel-btn, .save-btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }
    .cancel-btn {
      background-color: #f44336;
      color: white;
    }
    .cancel-btn:hover {
      background-color: #d32f2f;
    }
    .save-btn {
      background-color: #4CAF50;
      color: white;
    }
    .save-btn:hover {
      background-color: #388E3C;
    }
    .save-btn:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
      .container {
        padding: 1rem;
      }
    }
  `]
})
export class AgentFormComponent implements OnInit {
  agent: Agent = {
    name: '',
    model: '',
    submodel: '',
    description: '',
    systemPrompt: '',
    userPrompt: '',
    decisionPrompt: ''
  };
  isEditMode = false;

  constructor(
    private agentService: AgentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const existingAgent = this.agentService.getAgentById(id);
      if (existingAgent) {
        this.agent = { ...existingAgent };
      }
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.agentService.updateAgent(this.agent);
    } else {
      this.agentService.addAgent(this.agent);
    }
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}