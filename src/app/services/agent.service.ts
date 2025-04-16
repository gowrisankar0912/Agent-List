import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Agent } from '../models/agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private agents: Agent[] = [
    {
      id: '1',
      name: 'Customer Support Agent',
      model: 'GPT-4',
      submodel: 'Turbo',
      description: 'An AI agent specialized in handling customer support inquiries with empathy and efficiency.',
      systemPrompt: 'You are a helpful customer support representative for a tech company.',
      userPrompt: 'Please help me with my issue regarding...',
      decisionPrompt: 'Based on the customer\'s issue, determine the priority and appropriate department.'
    },
    {
      id: '2',
      name: 'Content Writer',
      model: 'Claude',
      submodel: '2.1',
      description: 'Creative AI writer capable of generating engaging blog posts and articles.',
      systemPrompt: 'You are a professional content writer with expertise in digital marketing.',
      userPrompt: 'Write an article about...',
      decisionPrompt: 'Analyze the topic and determine the best content structure and tone.'
    },
    {
      id: '3',
      name: 'Code Assistant',
      model: 'GPT-4',
      submodel: 'Advanced',
      description: 'Technical AI assistant for code review and programming help.',
      systemPrompt: 'You are an experienced software developer with expertise in multiple programming languages.',
      userPrompt: 'Help me debug this code...',
      decisionPrompt: 'Evaluate the code issue and suggest the most efficient solution.'
    }
  ];
  private agentsSubject = new BehaviorSubject<Agent[]>(this.agents);

  getAgents(): Observable<Agent[]> {
    return this.agentsSubject.asObservable();
  }

  addAgent(agent: Agent): void {
    agent.id = Date.now().toString();
    this.agents.push(agent);
    this.agentsSubject.next([...this.agents]);
  }

  updateAgent(agent: Agent): void {
    const index = this.agents.findIndex(a => a.id === agent.id);
    if (index !== -1) {
      this.agents[index] = agent;
      this.agentsSubject.next([...this.agents]);
    }
  }

  deleteAgent(id: string): void {
    this.agents = this.agents.filter(agent => agent.id !== id);
    this.agentsSubject.next([...this.agents]);
  }

  getAgentById(id: string): Agent | undefined {
    return this.agents.find(agent => agent.id === id);
  }
}