/* ==========================================================================
   DEEPESH KUMAR JAIN - SAP JOULE 63 AGENTS & N8N AGENT MATRIX
   Interactive catalog data, domain filtering, and architecture modal handler
   ========================================================================== */

const PRODUCTION_AGENTS_DATA = [
  {
    id: "agent-1",
    title: "Autonomous Opportunity Scout & Proposal Agent",
    category: "Lead Acquisition & GenAI",
    status: "Production",
    badgeType: "flagship",
    badgeLabel: "Flagship Agent",
    description: "Scrapes global marketplaces & RFP platforms, extracts requirements with NLP, scores relevance against skills matrix, drafts customized proposals, and pushes instant alerts to mobile.",
    stack: ["Apify", "n8n", "OpenAI GPT-4o", "Airtable", "Telegram API", "WhatsApp Bot"],
    metrics: "4.1s cycle time • 96% qualification accuracy • 12+ proposals daily",
    architecture: {
      input: "Live RSS / Webhook / Web Scraping (Upwork, Freelance platforms, Enterprise RFPs)",
      processing: "n8n Webhook -> NLP entity extraction -> OpenAI GPT-4o scoring against Deepesh's past work -> Markdown proposal formatting",
      output: "Airtable CRM record creation + High-priority push alerts to Telegram & WhatsApp with 1-click bid submission link"
    }
  },
  {
    id: "agent-2",
    title: "SAP Joule Studio 63 Agent Catalog & Mapping Engine",
    category: "ERP & Joule Studio",
    status: "GA / Live",
    badgeType: "joule",
    badgeLabel: "SAP Enterprise",
    description: "A comprehensive mapped matrix of SAP's 63 ready-to-use Joule agents across S/4HANA, SuccessFactors, and Ariba, mapped by business area, GA / Beta status, and integration triggers.",
    stack: ["SAP Joule Studio", "SAP BTP", "S/4HANA", "Event Mesh", "Excel / Airtable Matrix"],
    metrics: "63 Agents Documented • 5 Core ERP Domains • Enterprise Reference",
    architecture: {
      input: "SAP Discovery Center & Joule Studio Developer Catalog",
      processing: "Classification by domain (Finance, Procurement, HRMS, Supply Chain) + API accessibility + trigger specification",
      output: "Searchable enterprise catalog powering Tayana Solutions & enterprise transformation roadmaps"
    }
  },
  {
    id: "agent-3",
    title: "AI Sales Assistant & Lead Qualification Agent",
    category: "Sales & Inbound CRM",
    status: "Production",
    badgeType: "n8n",
    badgeLabel: "n8n Multi-Agent",
    description: "Self-hosted inbound conversation bot that engages prospective enterprise clients, validates project scope and budget fit, and schedules discovery calls automatically.",
    stack: ["n8n", "Claude 3.5 Sonnet", "Google Calendar API", "HubSpot CRM", "Webhooks"],
    metrics: "85% auto-qualification rate • Zero latency lead capture • 24/7 active",
    architecture: {
      input: "Website contact forms, chatbot interactions, email triggers",
      processing: "Intent detection, budget boundary checking, calendar availability query, CRM enrichment",
      output: "Confirmed calendar invite with Google Meet link + enriched CRM record"
    }
  },
  {
    id: "agent-4",
    title: "Automated Technical Proposal & BRD Generator",
    category: "Business Analysis",
    status: "Production",
    badgeType: "flagship",
    badgeLabel: "Enterprise BA",
    description: "Leverages Deepesh's 3+ years as an ERP Functional Business Analyst to synthesize client briefs into enterprise-grade BRD (Business Requirements Document) and SRS drafts.",
    stack: ["n8n", "OpenAI GPT-4", "Google Docs API", "Markdown Parser", "PDF Engine"],
    metrics: "Reduced BRD turnaround by 75% • High-fidelity functional specs",
    architecture: {
      input: "Raw client discovery notes, transcripts, or RFP documents",
      processing: "Functional requirement extraction, user story breakdown, risk matrix computation, ERP compliance verification",
      output: "Formatted Google Docs / PDF specification ready for executive stakeholder review"
    }
  },
  {
    id: "agent-5",
    title: "Customer Support & Frustration Recovery Agent",
    category: "Customer Experience",
    status: "Production",
    badgeType: "n8n",
    badgeLabel: "Sentiment AI",
    description: "Continuously monitors customer support tickets, scores customer sentiment, detects frustration anomalies, and drafts empathetic troubleshooting responses using RAG.",
    stack: ["n8n", "Zendesk API", "Qdrant Vector DB", "GPT-4o Mini", "Slack Webhook"],
    metrics: "68% faster ticket triage • 94% customer recovery satisfaction",
    architecture: {
      input: "Incoming support tickets & email complaints",
      processing: "Sentiment index calculation (-1.0 to +1.0) -> Vector search in troubleshooting base -> empathetic resolution drafting",
      output: "Auto-reply to customer with resolution steps + Slack escalation alert for severe tickets"
    }
  },
  {
    id: "agent-6",
    title: "Enterprise Timesheet & Compliance Audit Agent",
    category: "HRMS & Operations",
    status: "Production",
    badgeType: "flagship",
    badgeLabel: "Compliance Bot",
    description: "Automated audit flow that reconciles consultant timesheets against project billable milestones, detects hours anomalies, and reminds team members before payroll deadlines.",
    stack: ["n8n", "Jira / ClickUp API", "Google Sheets", "Email Automation", "Slack Bot"],
    metrics: "100% on-time submission • Zero billing discrepancy • Full audit trail",
    architecture: {
      input: "Weekly scheduled cron trigger (Friday 4:00 PM)",
      processing: "Time-tracking API pull -> compare logged hours vs expected work plan -> flag gaps & overtime",
      output: "Personalized gentle reminders via Slack/Email + consolidated executive summary"
    }
  },
  {
    id: "agent-7",
    title: "ERP Multi-Module Knowledge-Base RAG Agent",
    category: "Enterprise Intelligence",
    status: "Production",
    badgeType: "joule",
    badgeLabel: "RAG Knowledge",
    description: "Trained on exhaustive documentation for HRMS, Recruitment, Performance Management, Contract Management, Procurement, and Finance (PCM Morocco, PNG tax, Kenya trade).",
    stack: ["n8n", "ChromaDB", "FastAPI", "OpenAI Embeddings", "Copilot Studio"],
    metrics: "Instant compliance answers • Verified against global tax & ERP standards",
    architecture: {
      input: "Natural language query from functional consultants or auditors",
      processing: "Semantic chunking & vector search across 500+ pages of ERP compliance blueprints",
      output: "Precise answer with source document citation, T-codes, and process flow diagram link"
    }
  }
];

// Sample subset of the 63 SAP Joule Studio Ready-to-Use Agents Mapped by Deepesh
const JOULE_AGENTS_CATALOG = [
  { id: "JOULE-01", name: "PO Approval & Line Item Anomaly Agent", domain: "Procurement", system: "SAP S/4HANA", status: "GA", trigger: "Event Mesh", desc: "Automates purchase order validation, checks supplier risk scores, and detects price variances." },
  { id: "JOULE-02", name: "Vendor Invoice Matching & Reconciliation", domain: "Finance", system: "SAP S/4HANA", status: "GA", trigger: "Document Ingestion", desc: "3-way matching between PO, goods receipt, and vendor invoice with variance flags." },
  { id: "JOULE-03", name: "Candidate Screening & Job Match Agent", domain: "HRMS", system: "SuccessFactors", status: "GA", trigger: "Application Webhook", desc: "Extracts resume skills and evaluates candidate relevance score against job requisition criteria." },
  { id: "JOULE-04", name: "Employee Onboarding Journey Assistant", domain: "HRMS", system: "SuccessFactors", status: "GA", trigger: "Hire Event", desc: "Guides new hires through setup tasks, equipment requests, and compliance policy signoffs." },
  { id: "JOULE-05", name: "Supply Chain Disruption & Buffer Recommender", domain: "Supply Chain", system: "SAP IBP", status: "Beta", trigger: "Telemetry / Telematics", desc: "Monitors global logistics routes and predicts lead time slippages with rerouting advice." },
  { id: "JOULE-06", name: "Contract Expiry & Renewal Intelligence", domain: "Procurement", system: "SAP Ariba", status: "GA", trigger: "Scheduled Cron", desc: "Identifies contracts expiring within 90 days and drafts renegotiation terms." },
  { id: "JOULE-07", name: "General Ledger Anomaly & Fraud Detector", domain: "Finance", system: "SAP S/4HANA", status: "Early Access", trigger: "Closing Period", desc: "Scans GL journal entries for unusual off-hours postings or account code deviations." },
  { id: "JOULE-08", name: "IT Service Desk Ticket Auto-Remediator", domain: "IT / Admin", system: "SAP BTP / Service Cloud", status: "GA", trigger: "Ticket Created", desc: "Resolves SAP user role assignments, password resets, and license allocations autonomously." },
  { id: "JOULE-09", name: "Travel & Expense Receipt Auditor", domain: "Finance", system: "SAP Concur", status: "GA", trigger: "Expense Submission", desc: "Validates OCR receipts against corporate travel policies and per-diem thresholds." },
  { id: "JOULE-10", name: "Inventory Stockout Predictor & Reorder Bot", domain: "Supply Chain", system: "SAP S/4HANA MM", status: "Beta", trigger: "Threshold Event", desc: "Predicts stock depletion based on seasonal run rates and drafts automated PR." },
  { id: "JOULE-11", name: "Tax Compliance & Regulatory Report Generator", domain: "Finance", system: "SAP S/4HANA", status: "GA", trigger: "Monthly Close", desc: "Cross-checks transactions against regional tax requirements (PCM Morocco, PNG, etc.)." },
  { id: "JOULE-12", name: "Performance Review Assistant & Goal Tracker", domain: "HRMS", system: "SuccessFactors", status: "Beta", trigger: "Quarterly Cycle", desc: "Synthesizes feedback from peers and milestones into drafted appraisal summaries." }
];

class CatalogManager {
  constructor() {
    this.agentsGrid = document.getElementById('agents-grid-container');
    this.catalogTableBody = document.getElementById('catalog-table-body');
    this.catalogSearch = document.getElementById('catalog-search-input');
    this.domainFilter = document.getElementById('catalog-domain-filter');
    this.agentTabs = document.querySelectorAll('.agent-tab-btn');
    this.modalOverlay = document.getElementById('agent-modal-overlay');
    this.modalClose = document.getElementById('agent-modal-close');
    this.modalBody = document.getElementById('agent-modal-content');

    this.init();
  }

  init() {
    this.renderProductionAgents('all');
    this.renderJouleCatalog();
    this.bindEvents();
  }

  renderProductionAgents(filter) {
    if (!this.agentsGrid) return;
    this.agentsGrid.innerHTML = '';

    const filtered = filter === 'all' 
      ? PRODUCTION_AGENTS_DATA 
      : PRODUCTION_AGENTS_DATA.filter(a => a.badgeType === filter || a.category.toLowerCase().includes(filter));

    filtered.forEach(agent => {
      const logoKey = agent.badgeType === 'joule' ? 'sapJoule' : (agent.badgeType === 'n8n' ? 'n8n' : 'powerAutomate');
      const logoSvg = (window.BRAND_LOGOS && window.BRAND_LOGOS[logoKey]) || '';

      const card = document.createElement('div');
      card.className = 'agent-card';
      card.innerHTML = `
        <div class="agent-badge-row">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            ${logoSvg ? `<div style="width: 28px; height: 28px; display: inline-flex;">${logoSvg}</div>` : ''}
            <span class="agent-type-badge badge-${agent.badgeType}">${agent.badgeLabel}</span>
          </div>
          <span class="agent-status-indicator">
            <span class="pulse-indicator"></span> ${agent.status}
          </span>
        </div>
        <h3 class="agent-title">${agent.title}</h3>
        <p class="agent-desc">${agent.description}</p>
        
        <div class="agent-tags">
          ${agent.stack.map(s => `<span class="agent-tag-pill">${s}</span>`).join('')}
        </div>

        <ul class="agent-features-list">
          <li class="agent-feature-item">
            <i class="fas fa-bolt"></i> <span><b>Metrics:</b> ${agent.metrics}</span>
          </li>
          <li class="agent-feature-item">
            <i class="fas fa-sitemap"></i> <span><b>Type:</b> ${agent.category}</span>
          </li>
        </ul>

        <div class="agent-card-footer">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-cyan);">Deepesh Verified Agent</span>
          <button class="btn-card-action" data-agent-id="${agent.id}">
            View Architecture <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      `;
      this.agentsGrid.appendChild(card);
    });

    // Attach click listeners to cards
    this.agentsGrid.querySelectorAll('.btn-card-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-agent-id');
        this.openAgentModal(id);
      });
    });
  }

  renderJouleCatalog(searchQuery = '', domain = 'all') {
    if (!this.catalogTableBody) return;
    this.catalogTableBody.innerHTML = '';

    const filtered = JOULE_AGENTS_CATALOG.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            agent.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            agent.system.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDomain = domain === 'all' || agent.domain.toLowerCase() === domain.toLowerCase();
      return matchesSearch && matchesDomain;
    });

    if (filtered.length === 0) {
      this.catalogTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
            No agents found matching "${searchQuery}". Deepesh has mapped 63 ready-to-use Joule agents.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(agent => {
      const row = document.createElement('tr');
      const statusClass = agent.status === 'GA' ? 'badge-status-ga' : agent.status === 'Beta' ? 'badge-status-beta' : 'badge-status-ea';

      row.innerHTML = `
        <td style="font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 600;">${agent.id}</td>
        <td>
          <div style="font-weight: 700; color: #fff;">${agent.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${agent.desc}</div>
        </td>
        <td><span style="font-weight: 600; color: #e2e8f0;">${agent.domain}</span></td>
        <td><span style="font-family: var(--font-mono); font-size: 0.78rem;">${agent.system}</span></td>
        <td><span class="${statusClass}">${agent.status}</span></td>
        <td><span style="font-size: 0.78rem; color: var(--accent-joule);">${agent.trigger}</span></td>
      `;
      this.catalogTableBody.appendChild(row);
    });
  }

  openAgentModal(id) {
    const agent = PRODUCTION_AGENTS_DATA.find(a => a.id === id);
    if (!agent) return;

    if (window.playUiSound) window.playUiSound('click');

    const logoKey = agent.badgeType === 'joule' ? 'sapJoule' : (agent.badgeType === 'n8n' ? 'n8n' : 'powerAutomate');
    const logoSvg = (window.BRAND_LOGOS && window.BRAND_LOGOS[logoKey]) || '';

    this.modalBody.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
        ${logoSvg ? `<div style="width: 32px; height: 32px; display: inline-flex;">${logoSvg}</div>` : ''}
        <span class="agent-type-badge badge-${agent.badgeType}">${agent.badgeLabel}</span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-emerald);">● Ready for Deployment</span>
      </div>
      <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1rem; color: #fff;">${agent.title}</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">${agent.description}</p>
      
      <div style="background: rgba(6, 9, 20, 0.7); border: 1px solid var(--border-glow); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-mono); color: var(--accent-cyan); font-size: 0.85rem; margin-bottom: 0.75rem;">
          <i class="fas fa-project-diagram"></i> ARCHITECTURE & WORKFLOW PIPELINE
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.85rem;">
          <div><b>1. Ingestion:</b> <span style="color: #cbd5e1;">${agent.architecture.input}</span></div>
          <div><b>2. Core Logic:</b> <span style="color: #cbd5e1;">${agent.architecture.processing}</span></div>
          <div><b>3. Delivery:</b> <span style="color: #cbd5e1;">${agent.architecture.output}</span></div>
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-mono); color: #fbbf24; font-size: 0.85rem; margin-bottom: 0.5rem;">TECH STACK ENGINES</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${agent.stack.map(s => `<span class="agent-tag-pill" style="font-size: 0.78rem; padding: 0.3rem 0.7rem;">${s}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">
          Built & Maintained by Deepesh Kumar Jain
        </div>
        <a href="#contact" class="btn-hire" onclick="document.getElementById('agent-modal-overlay').classList.remove('open')">
          Deploy This Agent For Your Business
        </a>
      </div>
    `;

    this.modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeAgentModal() {
    if (this.modalOverlay) {
      this.modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  bindEvents() {
    // Filter tabs for agents
    this.agentTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.agentTabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const filter = e.currentTarget.getAttribute('data-filter');
        this.renderProductionAgents(filter);
        if (window.playUiSound) window.playUiSound('click');
      });
    });

    // Catalog search & domain filter
    if (this.catalogSearch) {
      this.catalogSearch.addEventListener('input', (e) => {
        const query = e.target.value;
        const domain = this.domainFilter ? this.domainFilter.value : 'all';
        this.renderJouleCatalog(query, domain);
      });
    }

    if (this.domainFilter) {
      this.domainFilter.addEventListener('change', (e) => {
        const domain = e.target.value;
        const query = this.catalogSearch ? this.catalogSearch.value : '';
        this.renderJouleCatalog(query, domain);
      });
    }

    // Modal close button
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => {
        this.closeAgentModal();
      });
    }

    // Modal overlay click
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.closeAgentModal();
        }
      });
    }

    // Keyboard Escape to close modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay && this.modalOverlay.classList.contains('open')) {
        this.closeAgentModal();
      }
    });
  }
}

// Global modal trigger for 3D Scene clicks
window.showAgentNodeModal = (nodeData) => {
  const matchingAgent = PRODUCTION_AGENTS_DATA.find(a => 
    a.title.toLowerCase().includes(nodeData.name.toLowerCase()) || 
    nodeData.name.toLowerCase().includes(a.badgeType)
  ) || PRODUCTION_AGENTS_DATA[0];

  if (window.catalogManager) {
    window.catalogManager.openAgentModal(matchingAgent.id);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.catalogManager = new CatalogManager();
});
