/* ==========================================================================
   DEEPESH KUMAR JAIN - AUTHENTIC MULTI-WORKFLOW STUDIO ENGINE
   Showcase of 10 Enterprise Automation Workflows with 1-to-1 n8n Execution
   ========================================================================== */

const WORKFLOW_REGISTRY = {
  onboarding: {
    id: "onboarding",
    name: "Capstone: Enterprise Employee Onboarding & Provisioning Multi-Agent",
    badge: "13 Nodes | Active",
    category: "HR & IT Operations",
    stack: ["n8n", "PostgreSQL", "Slack", "Sub-Workflows", "Human Approval"],
    description: "Deepesh's real-world 13-node Capstone onboarding engine: performs duplicate checks in PostgreSQL, provisions department-specific IT & HR sub-workflows, and requests manager approval in Slack.",
    nodes: [
      {
        id: "node_webhook",
        name: "Webhook",
        type: "n8n-nodes-base.webhook",
        subtitle: "POST",
        iconKey: "webhook",
        hasTriggerBadge: true,
        position: [-288, 0],
        inputs: [],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { httpMethod: "POST", path: "employee-onboarding", responseMode: "responseNode" }
      },
      {
        id: "node_sql_duplicates",
        name: "SQL_CheckDuplicates",
        type: "n8n-nodes-base.postgres",
        subtitle: "executeQuery",
        iconKey: "postgres",
        position: [-80, -16],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { operation: "executeQuery", query: "SELECT * FROM capstone_employees WHERE email = '{{$json.body.email}}'" }
      },
      {
        id: "node_if_duplicate",
        name: "IF_Duplicate",
        type: "n8n-nodes-base.if",
        subtitle: "conditions",
        iconKey: "ifNode",
        position: [64, -160],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "true_out", label: "true" }, { id: "false_out", label: "false" }],
        parameters: { conditions: "length > 0" }
      },
      {
        id: "node_respond_webhook",
        name: "Respond to Webhook",
        type: "n8n-nodes-base.respondToWebhook",
        subtitle: "respondWith",
        iconKey: "respondWebhook",
        position: [336, -320],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { respondWith: "json", responseBody: '{\n  "status": "Duplicate Employee Found"\n}' }
      },
      {
        id: "node_sql_create_profile",
        name: "SQL_CreateProfile",
        type: "n8n-nodes-base.postgres",
        subtitle: "executeQuery",
        iconKey: "postgres",
        position: [192, 96],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { operation: "executeQuery", query: "INSERT INTO capstone_employees (full_name, email, department, role)\nVALUES ('{{$json.body.full_name}}', '{{$json.body.email}}', '{{$json.body.department}}', '{{$json.body.role}}')\nRETURNING *" }
      },
      {
        id: "node_sql_create_checklist",
        name: "SQL_CreateChecklist",
        type: "n8n-nodes-base.postgres",
        subtitle: "executeQuery",
        iconKey: "postgres",
        position: [384, -64],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { operation: "executeQuery", query: "INSERT INTO capstone_onboarding_tasks (employee_id, task_name, status)\nVALUES ({{$json.employee_id}}, 'Employee Onboarding', 'Pending')" }
      },
      {
        id: "node_route_dept",
        name: "Route_Department",
        type: "n8n-nodes-base.switch",
        subtitle: "model: Rules",
        iconKey: "switchNode",
        position: [528, -208],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "branch_0", label: "0" }, { id: "branch_1", label: "1" }, { id: "branch_2", label: "2" }],
        parameters: { rules: "Branch 0: Engineering | Branch 1: HR | Branch 2: General" }
      },
      {
        id: "node_call_it_provision",
        name: "Call 'WF_B_IT_Provision_Worker'",
        type: "n8n-nodes-base.executeWorkflow",
        subtitle: "Workflow: rOqCLUxPpBbt...",
        iconKey: "executeWorkflow",
        position: [752, -416],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { workflowName: "WF_B_IT_Provision_Worker", workflowId: "rOqCLUxPpBbttXND" }
      },
      {
        id: "node_call_hr_provision",
        name: "Call 'WF_C_HR_Provision_Worker'",
        type: "n8n-nodes-base.executeWorkflow",
        subtitle: "Workflow: XJJprW1glTsx...",
        iconKey: "executeWorkflow",
        position: [768, -192],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { workflowName: "WF_C_HR_Provision_Worker", workflowId: "XJJprW1glTsx8rxi" }
      },
      {
        id: "node_call_hr_provision_2",
        name: "Call 'WF_C_HR_Provision_Worker'1",
        type: "n8n-nodes-base.executeWorkflow",
        subtitle: "Workflow: XJJprW1glTsx...",
        iconKey: "executeWorkflow",
        position: [704, 48],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { workflowName: "WF_C_HR_Provision_Worker", workflowId: "XJJprW1glTsx8rxi" }
      },
      {
        id: "node_merge",
        name: "Merge",
        type: "n8n-nodes-base.merge",
        subtitle: "append",
        iconKey: "mergeNode",
        position: [1040, -192],
        inputs: [{ id: "merge_in_0", label: "Input 1" }, { id: "merge_in_1", label: "Input 2" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { mode: "append" }
      },
      {
        id: "node_slack",
        name: "Send a message",
        type: "n8n-nodes-base.slack",
        subtitle: "post: message",
        iconKey: "slack",
        position: [1200, -192],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { channel: "all-kirti", text: "🚀 New Employee Approval Request: Name: {{$json.full_name}}, Dept: {{$json.department}}, Role: {{$json.role}}" }
      },
      {
        id: "node_wait",
        name: "Wait",
        type: "n8n-nodes-base.wait",
        subtitle: "webhook",
        iconKey: "waitNode",
        position: [1376, -192],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { resume: "webhook", limitWaitTime: true }
      },
      {
        id: "node_sql_update_approval",
        name: "SQL_UpdateApproval",
        type: "n8n-nodes-base.postgres",
        subtitle: "executeQuery",
        iconKey: "postgres",
        position: [1600, -192],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { operation: "executeQuery", query: "UPDATE capstone_employees\nSET approval_status = 'approved'\nWHERE employee_id = {{$json.employee_id}};" }
      }
    ],
    connections: [
      { from: "node_webhook", outPort: "main_out", to: "node_sql_duplicates", inPort: "main_in" },
      { from: "node_sql_duplicates", outPort: "main_out", to: "node_if_duplicate", inPort: "main_in" },
      { from: "node_if_duplicate", outPort: "true_out", to: "node_respond_webhook", inPort: "main_in" },
      { from: "node_if_duplicate", outPort: "false_out", to: "node_sql_create_profile", inPort: "main_in" },
      { from: "node_sql_create_profile", outPort: "main_out", to: "node_sql_create_checklist", inPort: "main_in" },
      { from: "node_sql_create_checklist", outPort: "main_out", to: "node_route_dept", inPort: "main_in" },
      { from: "node_route_dept", outPort: "branch_0", to: "node_call_it_provision", inPort: "main_in" },
      { from: "node_route_dept", outPort: "branch_1", to: "node_call_hr_provision", inPort: "main_in" },
      { from: "node_route_dept", outPort: "branch_2", to: "node_call_hr_provision_2", inPort: "main_in" },
      { from: "node_call_it_provision", outPort: "main_out", to: "node_merge", inPort: "merge_in_0" },
      { from: "node_call_hr_provision", outPort: "main_out", to: "node_merge", inPort: "merge_in_1" },
      { from: "node_call_hr_provision_2", outPort: "main_out", to: "node_merge", inPort: "merge_in_1" },
      { from: "node_merge", outPort: "main_out", to: "node_slack", inPort: "main_in" },
      { from: "node_slack", outPort: "main_out", to: "node_wait", inPort: "main_in" },
      { from: "node_wait", outPort: "main_out", to: "node_sql_update_approval", inPort: "main_in" }
    ],
    flowSequence: [
      { nodeId: "node_webhook", latency: 350, log: "[Webhook] Received POST /employee-onboarding payload: { full_name: 'Deepesh Kumar Jain', email: 'jaindeepesh213@gmail.com', department: 'Engineering' }" },
      { nodeId: "node_sql_duplicates", wireId: "wire-node_webhook-node_sql_duplicates", latency: 450, log: "[SQL_CheckDuplicates] Executed query: SELECT * FROM capstone_employees WHERE email = 'jaindeepesh213@gmail.com' -> Returned 0 rows (New Employee)." },
      { nodeId: "node_if_duplicate", wireId: "wire-node_sql_duplicates-node_if_duplicate", latency: 350, log: "[IF_Duplicate] Evaluated condition length > 0: FALSE. Directing to Profile Creation branch." },
      { nodeId: "node_sql_create_profile", wireId: "wire-node_if_duplicate-node_sql_create_profile", latency: 550, log: "[SQL_CreateProfile] INSERT INTO capstone_employees executed -> Created Employee Record #EMP-1042." },
      { nodeId: "node_sql_create_checklist", wireId: "wire-node_sql_create_profile-node_sql_create_checklist", latency: 400, log: "[SQL_CreateChecklist] Inserted onboarding checklist tasks for employee #EMP-1042." },
      { nodeId: "node_route_dept", wireId: "wire-node_sql_create_checklist-node_route_dept", latency: 400, log: "[Route_Department] Switch Node: department == 'Engineering' matched -> Triggered Branch 0 (IT Provisioning)." },
      { nodeId: "node_call_it_provision", wireId: "wire-node_route_dept-node_call_it_provision", latency: 750, log: "[Call 'WF_B_IT_Provision_Worker'] Sub-workflow 'rOqCLUxPpBbttXND' executed successfully. Provisioned GitHub & AWS Access." },
      { nodeId: "node_merge", wireId: "wire-node_call_it_provision-node_merge", latency: 350, log: "[Merge] Aggregated output payloads from worker sub-workflow into unified onboarding object." },
      { nodeId: "node_slack", wireId: "wire-node_merge-node_slack", latency: 500, log: "[Send a message] Dispatched Slack approval notification to channel #all-kirti for Deepesh Kumar Jain." },
      { nodeId: "node_wait", wireId: "wire-node_slack-node_wait", latency: 600, log: "[Wait] Webhook resumption gate activated. Manager one-click approval token received." },
      { nodeId: "node_sql_update_approval", wireId: "wire-node_wait-node_sql_update_approval", latency: 450, log: "[SQL_UpdateApproval] UPDATE capstone_employees SET approval_status = 'approved' -> SUCCESS." }
    ]
  },

  rfp_scout: {
    id: "rfp_scout",
    name: "Autonomous Opportunity Scout & RFP Bid Generator",
    badge: "7 Nodes | Active",
    category: "Lead Acquisition & GenAI",
    stack: ["Apify", "n8n", "OpenAI GPT-4o", "Airtable", "Telegram", "WhatsApp"],
    description: "Scrapes global marketplaces & RFP platforms, extracts requirements with NLP, scores relevance against Deepesh's skills matrix, and drafts customized proposals with mobile alerts.",
    nodes: [
      {
        id: "rfp_apify",
        name: "Apify Market Scraper",
        type: "n8n-nodes-base.apify",
        subtitle: "runActor: rfp_crawler",
        iconKey: "apify",
        hasTriggerBadge: true,
        position: [-280, 0],
        inputs: [],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { actorId: "apify/upwork-freelance-scraper", searchTerms: "n8n, SAP Joule, Power Automate" }
      },
      {
        id: "rfp_filter",
        name: "Filter Active RFPs",
        type: "n8n-nodes-base.filter",
        subtitle: "budget > $2000",
        iconKey: "switchNode",
        position: [-60, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { condition: "item.budget >= 2000 AND item.verifiedClient == true" }
      },
      {
        id: "rfp_gpt4o",
        name: "GPT-4o Proposal Drafter",
        type: "n8n-nodes-base.openAi",
        subtitle: "model: gpt-4o",
        iconKey: "openai",
        position: [180, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { model: "gpt-4o", temperature: 0.3, promptTemplate: "Analyze RFP scope and generate tailored proposal referencing Deepesh's ERP & automation portfolio." }
      },
      {
        id: "rfp_if_score",
        name: "IF Score > 85%",
        type: "n8n-nodes-base.if",
        subtitle: "relevanceScore >= 85",
        iconKey: "ifNode",
        position: [420, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "true_out", label: "true" }, { id: "false_out", label: "false" }],
        parameters: { condition: "$json.score >= 85" }
      },
      {
        id: "rfp_airtable",
        name: "Airtable CRM Lead",
        type: "n8n-nodes-base.airtable",
        subtitle: "appendRecord: Leads",
        iconKey: "airtable",
        position: [680, -140],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { baseId: "appRfpLeads", table: "ActiveProposals" }
      },
      {
        id: "rfp_telegram",
        name: "Telegram Push Alert",
        type: "n8n-nodes-base.telegram",
        subtitle: "sendMessage",
        iconKey: "telegram",
        position: [940, -140],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { chatId: "@deepesh_automation_alerts", parseMode: "HTML" }
      },
      {
        id: "rfp_whatsapp",
        name: "WhatsApp 1-Click Bid",
        type: "n8n-nodes-base.whatsapp",
        subtitle: "sendTemplate",
        iconKey: "whatsapp",
        position: [680, 140],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { recipient: "+91 8305676129", templateName: "new_high_value_bid_alert" }
      }
    ],
    connections: [
      { from: "rfp_apify", outPort: "main_out", to: "rfp_filter", inPort: "main_in" },
      { from: "rfp_filter", outPort: "main_out", to: "rfp_gpt4o", inPort: "main_in" },
      { from: "rfp_gpt4o", outPort: "main_out", to: "rfp_if_score", inPort: "main_in" },
      { from: "rfp_if_score", outPort: "true_out", to: "rfp_airtable", inPort: "main_in" },
      { from: "rfp_if_score", outPort: "false_out", to: "rfp_whatsapp", inPort: "main_in" },
      { from: "rfp_airtable", outPort: "main_out", to: "rfp_telegram", inPort: "main_in" }
    ],
    flowSequence: [
      { nodeId: "rfp_apify", latency: 500, log: "[Apify Market Scraper] Pulled 24 new RFP opportunities matching criteria 'n8n & SAP Automation'." },
      { nodeId: "rfp_filter", wireId: "wire-rfp_apify-rfp_filter", latency: 350, log: "[Filter Active RFPs] Filtered 6 enterprise verified clients with budget >= $2,000." },
      { nodeId: "rfp_gpt4o", wireId: "wire-rfp_filter-rfp_gpt4o", latency: 850, log: "[GPT-4o Proposal Drafter] Extracted key deliverable constraints & synthesized custom proposal." },
      { nodeId: "rfp_if_score", wireId: "wire-rfp_gpt4o-rfp_if_score", latency: 300, log: "[IF Score > 85%] Calculated Skill Fit Score = 94.2% -> TRUE." },
      { nodeId: "rfp_airtable", wireId: "wire-rfp_if_score-rfp_airtable", latency: 450, log: "[Airtable CRM Lead] Created new lead record in pipeline with drafted bid." },
      { nodeId: "rfp_telegram", wireId: "wire-rfp_airtable-rfp_telegram", latency: 350, log: "[Telegram Push Alert] Sent instant push alert to Deepesh with 1-click bid submission link." }
    ]
  },

  joule_po: {
    id: "joule_po",
    name: "SAP Joule Studio S/4HANA PO Anomaly & Approval Agent",
    badge: "7 Nodes | Active",
    category: "ERP & Joule Studio",
    stack: ["SAP Joule Studio", "S/4HANA", "SAP Event Mesh", "Teams", "BAPI"],
    description: "Real-time enterprise pipeline integrating SAP Event Mesh: monitors S/4HANA Purchase Orders, uses Joule reasoning to detect price/vendor anomalies, and routes Teams approval.",
    nodes: [
      {
        id: "joule_event_mesh",
        name: "SAP Event Mesh",
        type: "sap.eventMesh.trigger",
        subtitle: "PO.Created.v1",
        iconKey: "sap",
        hasTriggerBadge: true,
        position: [-280, 0],
        inputs: [],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { eventTopic: "sap/s4hana/ce/purchaseorder/v1/PurchaseOrder/Created" }
      },
      {
        id: "joule_ai_agent",
        name: "SAP Joule Studio AI",
        type: "sap.joule.agent",
        subtitle: "PO Anomaly Skill",
        iconKey: "sapJoule",
        position: [-60, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { agentSkill: "procurement.anomalyDetection", toleranceThreshold: "5.0%" }
      },
      {
        id: "joule_s4_query",
        name: "S/4HANA BAPI Query",
        type: "sap.s4hana.bapi",
        subtitle: "BAPI_PO_GETDETAIL",
        iconKey: "sap",
        position: [180, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { bapiName: "BAPI_PO_GETDETAIL1", poNumber: "{{$json.PurchaseOrder}}" }
      },
      {
        id: "joule_if_anomaly",
        name: "IF Anomaly > $50k",
        type: "n8n-nodes-base.if",
        subtitle: "amount > 50000",
        iconKey: "ifNode",
        position: [420, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "true_out", label: "true" }, { id: "false_out", label: "false" }],
        parameters: { condition: "$json.TotalAmount >= 50000 OR $json.RiskScore > 0.75" }
      },
      {
        id: "joule_teams",
        name: "Teams Adaptive Card",
        type: "n8n-nodes-base.microsoftTeams",
        subtitle: "postCard: VP Approval",
        iconKey: "powerAutomate",
        position: [680, -140],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { channel: "Executive Procurement", cardType: "ActionableCard" }
      },
      {
        id: "joule_wait",
        name: "Wait for 1-Click Sign",
        type: "n8n-nodes-base.wait",
        subtitle: "webhookApproval",
        iconKey: "waitNode",
        position: [940, -140],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { resumeOn: "webhook", timeout: "24h" }
      },
      {
        id: "joule_commit",
        name: "S/4HANA PO Release",
        type: "sap.s4hana.bapi",
        subtitle: "BAPI_PO_RELEASE",
        iconKey: "sap",
        position: [1200, -140],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { bapiName: "BAPI_PO_RELEASE", releaseCode: "VP1" }
      }
    ],
    connections: [
      { from: "joule_event_mesh", outPort: "main_out", to: "joule_ai_agent", inPort: "main_in" },
      { from: "joule_ai_agent", outPort: "main_out", to: "joule_s4_query", inPort: "main_in" },
      { from: "joule_s4_query", outPort: "main_out", to: "joule_if_anomaly", inPort: "main_in" },
      { from: "joule_if_anomaly", outPort: "true_out", to: "joule_teams", inPort: "main_in" },
      { from: "joule_teams", outPort: "main_out", to: "joule_wait", inPort: "main_in" },
      { from: "joule_wait", outPort: "main_out", to: "joule_commit", inPort: "main_in" }
    ],
    flowSequence: [
      { nodeId: "joule_event_mesh", latency: 400, log: "[SAP Event Mesh] Intercepted event PO.Created.v1: PurchaseOrder #4500019284 ($64,250 USD)." },
      { nodeId: "joule_ai_agent", wireId: "wire-joule_event_mesh-joule_ai_agent", latency: 650, log: "[SAP Joule Studio AI] Anomaly Detected: Unit price exceeds 3-month rolling median by 14.8%." },
      { nodeId: "joule_s4_query", wireId: "wire-joule_ai_agent-joule_s4_query", latency: 500, log: "[S/4HANA BAPI Query] Pulled vendor master & line items for Supplier #100428 (Apex Steel Corp)." },
      { nodeId: "joule_if_anomaly", wireId: "wire-joule_s4_query-joule_if_anomaly", latency: 300, log: "[IF Anomaly > $50k] PO Total $64,250 >= $50,000 threshold -> Route to VP Teams Approval." },
      { nodeId: "joule_teams", wireId: "wire-joule_if_anomaly-joule_teams", latency: 450, log: "[Teams Adaptive Card] Dispatched interactive 1-click Approval Card to VP Procurement." },
      { nodeId: "joule_wait", wireId: "wire-joule_teams-joule_wait", latency: 600, log: "[Wait for 1-Click Sign] Digital signature token verified from Teams payload." },
      { nodeId: "joule_commit", wireId: "wire-joule_wait-joule_commit", latency: 550, log: "[S/4HANA PO Release] Executed BAPI_PO_RELEASE with status 'COMPLETED_APPROVED'." }
    ]
  },

  sales_assistant: {
    id: "sales_assistant",
    name: "AI Inbound Sales Assistant & Calendar Booking Bot",
    badge: "6 Nodes | Active",
    category: "Inbound Sales & CRM",
    stack: ["n8n", "Claude 3.5 Sonnet", "Google Calendar", "HubSpot CRM", "Webhooks"],
    description: "Self-hosted inbound conversation agent that qualifies prospective enterprise leads, validates budget/timeline compatibility, and books calendar discovery calls autonomously.",
    nodes: [
      {
        id: "sales_hook",
        name: "Inbound Lead Webhook",
        type: "n8n-nodes-base.webhook",
        subtitle: "POST /lead",
        iconKey: "webhook",
        hasTriggerBadge: true,
        position: [-280, 0],
        inputs: [],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { httpMethod: "POST", path: "inbound-sales-lead" }
      },
      {
        id: "sales_claude",
        name: "Claude 3.5 Intent Parser",
        type: "n8n-nodes-base.anthropic",
        subtitle: "claude-3-5-sonnet",
        iconKey: "claude",
        position: [-60, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { model: "claude-3-5-sonnet", prompt: "Evaluate project intent, enterprise maturity, and implementation urgency." }
      },
      {
        id: "sales_hubspot",
        name: "HubSpot CRM Enricher",
        type: "n8n-nodes-base.hubspot",
        subtitle: "contact: upsert",
        iconKey: "airtable",
        position: [180, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { objectType: "contacts", updateIfExists: true }
      },
      {
        id: "sales_if_budget",
        name: "IF Enterprise Qualified",
        type: "n8n-nodes-base.if",
        subtitle: "budgetTier == 'Tier 1'",
        iconKey: "ifNode",
        position: [440, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "true_out", label: "true" }, { id: "false_out", label: "false" }],
        parameters: { conditions: "$json.estimatedBudget >= 5000" }
      },
      {
        id: "sales_gcal",
        name: "Google Calendar Booking",
        type: "n8n-nodes-base.googleCalendar",
        subtitle: "createEvent: Discovery",
        iconKey: "googleDocs",
        position: [700, -120],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { calendarId: "primary", addGoogleMeet: true }
      },
      {
        id: "sales_slack",
        name: "Slack Rep Alert",
        type: "n8n-nodes-base.slack",
        subtitle: "channel: #deals",
        iconKey: "slack",
        position: [960, -120],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { channel: "#enterprise-deals", text: "🎯 New Enterprise Discovery Call Booked with {{$json.company}}!" }
      }
    ],
    connections: [
      { from: "sales_hook", outPort: "main_out", to: "sales_claude", inPort: "main_in" },
      { from: "sales_claude", outPort: "main_out", to: "sales_hubspot", inPort: "main_in" },
      { from: "sales_hubspot", outPort: "main_out", to: "sales_if_budget", inPort: "main_in" },
      { from: "sales_if_budget", outPort: "true_out", to: "sales_gcal", inPort: "main_in" },
      { from: "sales_gcal", outPort: "main_out", to: "sales_slack", inPort: "main_in" }
    ],
    flowSequence: [
      { nodeId: "sales_hook", latency: 350, log: "[Inbound Lead Webhook] Ingested inquiry: { company: 'FinTech Global Ltd', need: 'SAP S/4HANA AI Joule Automation' }" },
      { nodeId: "sales_claude", wireId: "wire-sales_hook-sales_claude", latency: 750, log: "[Claude 3.5 Intent Parser] Intent classified as 'Enterprise Implementation'. Confidence: 98%." },
      { nodeId: "sales_hubspot", wireId: "wire-sales_claude-sales_hubspot", latency: 450, log: "[HubSpot CRM Enricher] Synced company domain, LinkedIn profile, and verified tech stack." },
      { nodeId: "sales_if_budget", wireId: "wire-sales_hubspot-sales_if_budget", latency: 300, log: "[IF Enterprise Qualified] Budget Verified ($15k+) -> Approved for priority executive booking." },
      { nodeId: "sales_gcal", wireId: "wire-sales_if_budget-sales_gcal", latency: 500, log: "[Google Calendar Booking] Auto-scheduled 45-min Architecture Deep Dive + Generated Google Meet link." },
      { nodeId: "sales_slack", wireId: "wire-sales_gcal-sales_slack", latency: 400, log: "[Slack Rep Alert] Posted deal announcement to #enterprise-deals with complete brief." }
    ]
  },

  support_sentiment: {
    id: "support_sentiment",
    name: "Customer Sentiment Triage & Auto-Recovery Agent",
    badge: "7 Nodes | Active",
    category: "Customer Experience",
    stack: ["n8n", "Zendesk", "ChromaDB", "GPT-4o Mini", "Slack Escalation"],
    description: "Monitors incoming Zendesk tickets, calculates sentiment score (-1.0 to +1.0), pulls answers from ChromaDB vector knowledge base, and drafts empathetic resolutions.",
    nodes: [
      {
        id: "cs_hook",
        name: "Zendesk Webhook",
        type: "n8n-nodes-base.webhook",
        subtitle: "ticket: created",
        iconKey: "zendesk",
        hasTriggerBadge: true,
        position: [-280, 0],
        inputs: [],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { event: "ticket.created", source: "zendesk_api" }
      },
      {
        id: "cs_sentiment",
        name: "Sentiment Scorer",
        type: "n8n-nodes-base.openAi",
        subtitle: "sentimentAnalyzer",
        iconKey: "openai",
        position: [-60, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { model: "gpt-4o-mini", task: "sentiment_score_and_frustration_index" }
      },
      {
        id: "cs_chroma",
        name: "ChromaDB KB Search",
        type: "n8n-nodes-base.vectorStore",
        subtitle: "similarity: 0.88",
        iconKey: "chroma",
        position: [180, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { collection: "support_kb", topK: 3 }
      },
      {
        id: "cs_if_angry",
        name: "IF Frustrated",
        type: "n8n-nodes-base.if",
        subtitle: "score < -0.4",
        iconKey: "ifNode",
        position: [420, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "true_out", label: "true" }, { id: "false_out", label: "false" }],
        parameters: { condition: "$json.sentimentScore <= -0.4" }
      },
      {
        id: "cs_gpt_draft",
        name: "Empathetic Draft Generator",
        type: "n8n-nodes-base.openAi",
        subtitle: "draftResponse",
        iconKey: "openai",
        position: [680, -140],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { tone: "empathic_and_action_oriented", includeTroubleshootingSteps: true }
      },
      {
        id: "cs_reply",
        name: "Zendesk Auto-Reply",
        type: "n8n-nodes-base.zendesk",
        subtitle: "updateTicket: Public",
        iconKey: "zendesk",
        position: [940, -140],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { status: "pending", publicReply: true }
      },
      {
        id: "cs_slack_esc",
        name: "Slack Escalation",
        type: "n8n-nodes-base.slack",
        subtitle: "channel: #crit-support",
        iconKey: "slack",
        position: [680, 140],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { channel: "#critical-support", alertLevel: "HIGH_PRIORITY" }
      }
    ],
    connections: [
      { from: "cs_hook", outPort: "main_out", to: "cs_sentiment", inPort: "main_in" },
      { from: "cs_sentiment", outPort: "main_out", to: "cs_chroma", inPort: "main_in" },
      { from: "cs_chroma", outPort: "main_out", to: "cs_if_angry", inPort: "main_in" },
      { from: "cs_if_angry", outPort: "true_out", to: "cs_gpt_draft", inPort: "main_in" },
      { from: "cs_if_angry", outPort: "false_out", to: "cs_slack_esc", inPort: "main_in" },
      { from: "cs_gpt_draft", outPort: "main_out", to: "cs_reply", inPort: "main_in" }
    ],
    flowSequence: [
      { nodeId: "cs_hook", latency: 350, log: "[Zendesk Webhook] Received Ticket #TKT-8912: 'API Gateway returning 504 on bulk sync'." },
      { nodeId: "cs_sentiment", wireId: "wire-cs_hook-cs_sentiment", latency: 450, log: "[Sentiment Scorer] Scored Sentiment: -0.62 (Frustrated). Escalation threshold reached." },
      { nodeId: "cs_chroma", wireId: "wire-cs_sentiment-cs_chroma", latency: 500, log: "[ChromaDB KB Search] Retrieved 3 exact troubleshooting matches for 504 timeout fix." },
      { nodeId: "cs_if_angry", wireId: "wire-cs_chroma-cs_if_angry", latency: 300, log: "[IF Frustrated] Sentiment -0.62 <= -0.4 -> TRUE." },
      { nodeId: "cs_gpt_draft", wireId: "wire-cs_if_angry-cs_gpt_draft", latency: 700, log: "[Empathetic Draft Generator] Composed apology + 3-step workaround configuration." },
      { nodeId: "cs_reply", wireId: "wire-cs_gpt_draft-cs_reply", latency: 400, log: "[Zendesk Auto-Reply] Successfully published response to client within 2.8 seconds total." }
    ]
  },

  brd_generator: {
    id: "brd_generator",
    name: "Automated Technical Proposal & BRD/SRS Generator",
    badge: "6 Nodes | Active",
    category: "Functional Business Analysis",
    stack: ["n8n", "OpenAI GPT-4", "Google Docs API", "Markdown Parser", "PDF Engine"],
    description: "Leverages Deepesh's 3.5 years of ERP Business Analysis experience: synthesizes raw client discovery transcripts into structured BRD, SRS, and RFP compliance documentation.",
    nodes: [
      {
        id: "brd_upload",
        name: "Discovery Transcript",
        type: "n8n-nodes-base.webhook",
        subtitle: "POST /transcript",
        iconKey: "webhook",
        hasTriggerBadge: true,
        position: [-280, 0],
        inputs: [],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { httpMethod: "POST", format: "json_or_text" }
      },
      {
        id: "brd_extract",
        name: "GPT-4 Functional Parser",
        type: "n8n-nodes-base.openAi",
        subtitle: "extractUserStories",
        iconKey: "openai",
        position: [-60, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { model: "gpt-4", task: "functional_requirement_breakdown" }
      },
      {
        id: "brd_matrix",
        name: "ERP Compliance Matcher",
        type: "n8n-nodes-base.code",
        subtitle: "alignModules",
        iconKey: "sap",
        position: [180, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { language: "javascript", modules: ["HRMS", "Procurement", "Finance"] }
      },
      {
        id: "brd_gdocs",
        name: "Google Docs Assembler",
        type: "n8n-nodes-base.googleDocs",
        subtitle: "createDocument",
        iconKey: "googleDocs",
        position: [440, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { templateDocId: "brd_enterprise_standard_v2" }
      },
      {
        id: "brd_pdf",
        name: "Executive PDF Engine",
        type: "n8n-nodes-base.executeCommand",
        subtitle: "generatePdfReport",
        iconKey: "executeWorkflow",
        position: [700, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { command: "weasyprint document.html output.pdf" }
      },
      {
        id: "brd_email",
        name: "Stakeholder Dispatch",
        type: "n8n-nodes-base.emailSend",
        subtitle: "sendWithAttachment",
        iconKey: "slack",
        position: [960, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { subject: "Approved BRD & Architecture Specification Ready for Review" }
      }
    ],
    connections: [
      { from: "brd_upload", outPort: "main_out", to: "brd_extract", inPort: "main_in" },
      { from: "brd_extract", outPort: "main_out", to: "brd_matrix", inPort: "main_in" },
      { from: "brd_matrix", outPort: "main_out", to: "brd_gdocs", inPort: "main_in" },
      { from: "brd_gdocs", outPort: "main_out", to: "brd_pdf", inPort: "main_in" },
      { from: "brd_pdf", outPort: "main_out", to: "brd_email", inPort: "main_in" }
    ],
    flowSequence: [
      { nodeId: "brd_upload", latency: 350, log: "[Discovery Transcript] Ingested 45-minute discovery call transcript (14,200 words)." },
      { nodeId: "brd_extract", wireId: "wire-brd_upload-brd_extract", latency: 850, log: "[GPT-4 Functional Parser] Extracted 18 User Stories, 4 Non-Functional Requirements, and Risk Matrix." },
      { nodeId: "brd_matrix", wireId: "wire-brd_extract-brd_matrix", latency: 400, log: "[ERP Compliance Matcher] Mapped requirements against SAP S/4HANA & Tax schemas." },
      { nodeId: "brd_gdocs", wireId: "wire-brd_matrix-brd_gdocs", latency: 600, log: "[Google Docs Assembler] Populated 22-page executive BRD document." },
      { nodeId: "brd_pdf", wireId: "wire-brd_gdocs-brd_pdf", latency: 500, log: "[Executive PDF Engine] Compiled polished PDF with custom architecture diagrams." },
      { nodeId: "brd_email", wireId: "wire-brd_pdf-brd_email", latency: 450, log: "[Stakeholder Dispatch] Dispatched deliverable to client steering committee." }
    ]
  },

  timesheet_audit: {
    id: "timesheet_audit",
    name: "Enterprise Timesheet & Payroll Compliance Audit Flow",
    badge: "6 Nodes | Active",
    category: "Operations & HRMS",
    stack: ["n8n", "Cron Schedule", "Jira API", "ClickUp", "Google Sheets", "Slack"],
    description: "Scheduled Friday cron flow: cross-references logged timesheets against sprint milestone allocations, flags gaps, updates Sheets, and sends friendly reminders.",
    nodes: [
      {
        id: "ts_cron",
        name: "Friday 4PM Cron",
        type: "n8n-nodes-base.cron",
        subtitle: "0 16 * * 5",
        iconKey: "cron",
        hasTriggerBadge: true,
        position: [-280, 0],
        inputs: [],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { triggerTimes: "Every Friday at 16:00" }
      },
      {
        id: "ts_jira",
        name: "Jira / ClickUp Ingest",
        type: "n8n-nodes-base.jira",
        subtitle: "getWorklogs",
        iconKey: "jira",
        position: [-60, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { jql: "worklogDate >= startOfWeek() AND project in (ERP, AI)" }
      },
      {
        id: "ts_calc",
        name: "Hours Reconciler",
        type: "n8n-nodes-base.code",
        subtitle: "calcDiscrepancy",
        iconKey: "switchNode",
        position: [180, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { expectedHoursPerWeek: 40, tolerance: 2 }
      },
      {
        id: "ts_if_gap",
        name: "IF Discrepancy > 2h",
        type: "n8n-nodes-base.if",
        subtitle: "logged < 38h",
        iconKey: "ifNode",
        position: [440, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "true_out", label: "true" }, { id: "false_out", label: "false" }],
        parameters: { condition: "$json.totalLoggedHours < 38" }
      },
      {
        id: "ts_sheets",
        name: "Google Sheets Ledger",
        type: "n8n-nodes-base.googleSheets",
        subtitle: "appendRow: Audit",
        iconKey: "sheets",
        position: [700, -120],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { spreadsheetId: "payroll_audit_2026", sheetName: "Exceptions" }
      },
      {
        id: "ts_slack_remind",
        name: "Slack Friendly Bot",
        type: "n8n-nodes-base.slack",
        subtitle: "dmConsultant",
        iconKey: "slack",
        position: [700, 120],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { message: "Friendly reminder: your timesheet is at {{$json.logged}}h. Please submit by 6 PM!" }
      }
    ],
    connections: [
      { from: "ts_cron", outPort: "main_out", to: "ts_jira", inPort: "main_in" },
      { from: "ts_jira", outPort: "main_out", to: "ts_calc", inPort: "main_in" },
      { from: "ts_calc", outPort: "main_out", to: "ts_if_gap", inPort: "main_in" },
      { from: "ts_if_gap", outPort: "true_out", to: "ts_sheets", inPort: "main_in" },
      { from: "ts_if_gap", outPort: "false_out", to: "ts_slack_remind", inPort: "main_in" }
    ],
    flowSequence: [
      { nodeId: "ts_cron", latency: 300, log: "[Friday 4PM Cron] Scheduled trigger fired. Initiating weekly payroll compliance scan." },
      { nodeId: "ts_jira", wireId: "wire-ts_cron-ts_jira", latency: 550, log: "[Jira / ClickUp Ingest] Fetched 42 consultant worklogs for active sprints." },
      { nodeId: "ts_calc", wireId: "wire-ts_jira-ts_calc", latency: 350, log: "[Hours Reconciler] Evaluated 42 timesheets: 38 compliant (40h+), 4 missing hours." },
      { nodeId: "ts_if_gap", wireId: "wire-ts_calc-ts_if_gap", latency: 300, log: "[IF Discrepancy > 2h] Flagged 4 consultants with unlogged milestones." },
      { nodeId: "ts_sheets", wireId: "wire-ts_if_gap-ts_sheets", latency: 450, log: "[Google Sheets Ledger] Recorded audit ledger rows with consultant IDs and delta hours." },
      { nodeId: "ts_slack_remind", wireId: "wire-ts_if_gap-ts_slack_remind", latency: 400, log: "[Slack Friendly Bot] Dispatched personalized 1-click reminders to 4 team members." }
    ]
  },

  erp_rag: {
    id: "erp_rag",
    name: "ERP Multi-Module Compliance & Tax RAG Agent",
    badge: "6 Nodes | Active",
    category: "Enterprise Intelligence",
    stack: ["n8n", "ChromaDB", "FastAPI", "OpenAI Embeddings", "Copilot Studio"],
    description: "Trained on 500+ pages of enterprise ERP blueprints across HRMS, Procurement, Morocco PCM, PNG tax, and Kenya trade workflows for sub-second compliance citations.",
    nodes: [
      {
        id: "rag_query",
        name: "Consultant Query",
        type: "n8n-nodes-base.webhook",
        subtitle: "POST /ask-erp",
        iconKey: "webhook",
        hasTriggerBadge: true,
        position: [-280, 0],
        inputs: [],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { query: "How is VAT reconciled in Kenya trade workflows under SAP S/4HANA?" }
      },
      {
        id: "rag_embed",
        name: "OpenAI Embedder",
        type: "n8n-nodes-base.openAi",
        subtitle: "text-embedding-3-small",
        iconKey: "openai",
        position: [-60, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { model: "text-embedding-3-small", dimensions: 1536 }
      },
      {
        id: "rag_chroma",
        name: "ChromaDB ERP Docs",
        type: "n8n-nodes-base.vectorStore",
        subtitle: "vectorSearch: top_k: 4",
        iconKey: "chroma",
        position: [180, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { collection: "tayana_erp_blueprints", distance: "cosine" }
      },
      {
        id: "rag_tcode",
        name: "S/4HANA T-Code Validator",
        type: "n8n-nodes-base.code",
        subtitle: "verifyTCodes",
        iconKey: "sap",
        position: [440, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { verifiedCodes: ["FB60", "F-43", "ME21N", "MIRO"] }
      },
      {
        id: "rag_copilot",
        name: "Copilot Studio Reasoner",
        type: "n8n-nodes-base.copilotStudio",
        subtitle: "synthesizeAnswer",
        iconKey: "copilotStudio",
        position: [700, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { responseMode: "grounded_with_citations" }
      },
      {
        id: "rag_response",
        name: "Audit Response Stream",
        type: "n8n-nodes-base.respondToWebhook",
        subtitle: "streamJSON",
        iconKey: "respondWebhook",
        position: [960, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { status: 200, returnCitations: true }
      }
    ],
    connections: [
      { from: "rag_query", outPort: "main_out", to: "rag_embed", inPort: "main_in" },
      { from: "rag_embed", outPort: "main_out", to: "rag_chroma", inPort: "main_in" },
      { from: "rag_chroma", outPort: "main_out", to: "rag_tcode", inPort: "main_in" },
      { from: "rag_tcode", outPort: "main_out", to: "rag_copilot", inPort: "main_in" },
      { from: "rag_copilot", outPort: "main_out", to: "rag_response", inPort: "main_in" }
    ],
    flowSequence: [
      { nodeId: "rag_query", latency: 350, log: "[Consultant Query] Received question: 'VAT accounting entries for Kenya trade workflow under S/4HANA'." },
      { nodeId: "rag_embed", wireId: "wire-rag_query-rag_embed", latency: 400, log: "[OpenAI Embedder] Generated 1536-dimensional semantic query embedding." },
      { nodeId: "rag_chroma", wireId: "wire-rag_embed-rag_chroma", latency: 500, log: "[ChromaDB ERP Docs] Retrieved 4 relevant blueprint sections from Kenya Trade Tax Compliance doc." },
      { nodeId: "rag_tcode", wireId: "wire-rag_chroma-rag_tcode", latency: 350, log: "[S/4HANA T-Code Validator] Validated transaction code MIRO (Invoice Verification) & tax codes." },
      { nodeId: "rag_copilot", wireId: "wire-rag_tcode-rag_copilot", latency: 750, log: "[Copilot Studio Reasoner] Grounded explanation with specific ledger debit/credit postings." },
      { nodeId: "rag_response", wireId: "wire-rag_copilot-rag_response", latency: 300, log: "[Audit Response Stream] Returned verified answer with page references in 2.65 seconds." }
    ]
  },

  pa_invoice: {
    id: "pa_invoice",
    name: "Microsoft Power Automate Invoice OCR & ERP Flow",
    badge: "6 Nodes | Active",
    category: "Power Platform & Cloud Flows",
    stack: ["Power Automate", "AI Builder", "SharePoint", "Teams", "SAP S/4HANA"],
    description: "Enterprise cloud flow: ingests multi-page vendor invoice PDFs from Outlook, extracts line items with AI Builder Form Recognizer, routes Teams approval, and commits to SAP.",
    nodes: [
      {
        id: "pa_email",
        name: "Outlook Invoice Ingest",
        type: "pa.trigger.outlook",
        subtitle: "When a new email arrives",
        iconKey: "powerAutomate",
        hasTriggerBadge: true,
        position: [-280, 0],
        inputs: [],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { folder: "AP_Invoices", hasAttachment: true }
      },
      {
        id: "pa_aibuilder",
        name: "AI Builder Form OCR",
        type: "pa.action.aiBuilder",
        subtitle: "Extract invoice data",
        iconKey: "powerAutomate",
        position: [-60, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { model: "Invoice Processing Prebuilt Model", confidenceThreshold: 0.85 }
      },
      {
        id: "pa_sharepoint",
        name: "SharePoint Archive",
        type: "pa.action.sharepoint",
        subtitle: "Create item: AP_Ledger",
        iconKey: "sheets",
        position: [180, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { siteAddress: "https://tayana.sharepoint.com/sites/finance", listName: "Invoices" }
      },
      {
        id: "pa_approval",
        name: "Teams Manager Approval",
        type: "pa.action.teams",
        subtitle: "Post adaptive card",
        iconKey: "powerAutomate",
        position: [440, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { approvalType: "Approve/Reject - First to respond", assignedTo: "finance-lead@tayana.com" }
      },
      {
        id: "pa_if_appr",
        name: "IF Approved",
        type: "pa.action.condition",
        subtitle: "Outcome == 'Approve'",
        iconKey: "ifNode",
        position: [700, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "true_out", label: "true" }, { id: "false_out", label: "false" }],
        parameters: { condition: "equals(body('Start_and_wait_for_an_approval')?['outcome'], 'Approve')" }
      },
      {
        id: "pa_sap_commit",
        name: "SAP S/4HANA Commit",
        type: "pa.action.sapBapi",
        subtitle: "BAPI_ACC_DOCUMENT_POST",
        iconKey: "sap",
        position: [960, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { bapi: "BAPI_ACC_DOCUMENT_POST", documentType: "KR (Vendor Invoice)" }
      }
    ],
    connections: [
      { from: "pa_email", outPort: "main_out", to: "pa_aibuilder", inPort: "main_in" },
      { from: "pa_aibuilder", outPort: "main_out", to: "pa_sharepoint", inPort: "main_in" },
      { from: "pa_sharepoint", outPort: "main_out", to: "pa_approval", inPort: "main_in" },
      { from: "pa_approval", outPort: "main_out", to: "pa_if_appr", inPort: "main_in" },
      { from: "pa_if_appr", outPort: "true_out", to: "pa_sap_commit", inPort: "main_in" }
    ],
    flowSequence: [
      { nodeId: "pa_email", latency: 350, log: "[Outlook Invoice Ingest] Received invoice attachment: 'INV-2026-904.pdf' from Acme Logistics ($8,450)." },
      { nodeId: "pa_aibuilder", wireId: "wire-pa_email-pa_aibuilder", latency: 750, log: "[AI Builder Form OCR] Extracted Vendor, Subtotal, Tax ID, and 4 line items with 98.4% confidence." },
      { nodeId: "pa_sharepoint", wireId: "wire-pa_aibuilder-pa_sharepoint", latency: 450, log: "[SharePoint Archive] Archived PDF to Document Center & created metadata row." },
      { nodeId: "pa_approval", wireId: "wire-pa_sharepoint-pa_approval", latency: 500, log: "[Teams Manager Approval] Generated actionable Adaptive Card in Teams with 1-click Approve." },
      { nodeId: "pa_if_appr", wireId: "wire-pa_approval-pa_if_appr", latency: 300, log: "[IF Approved] Outcome == 'Approve' -> TRUE." },
      { nodeId: "pa_sap_commit", wireId: "wire-pa_if_appr-pa_sap_commit", latency: 600, log: "[SAP S/4HANA Commit] BAPI_ACC_DOCUMENT_POST created SAP Accounting Document #19000042." }
    ]
  },

  arbitrage_bot: {
    id: "arbitrage_bot",
    name: "Financial Currency & Commodity Arbitrage Monitoring Bot",
    badge: "6 Nodes | Active",
    category: "Financial Automation & Trading",
    stack: ["FastAPI", "n8n", "PostgreSQL", "Telegram API", "Multi-Condition Switch"],
    description: "High-frequency pipeline ingesting live forex and commodity prices, calculating cross-exchange spreads, detecting arbitrage opportunities > 1.8%, and alerting traders.",
    nodes: [
      {
        id: "arb_webhook",
        name: "FastAPI Price Stream",
        type: "n8n-nodes-base.webhook",
        subtitle: "POST /market-tick",
        iconKey: "fastapi",
        hasTriggerBadge: true,
        position: [-280, 0],
        inputs: [],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { httpMethod: "POST", frequency: "Sub-second batch" }
      },
      {
        id: "arb_calc",
        name: "Spread Margin Calculator",
        type: "n8n-nodes-base.code",
        subtitle: "calcArbitrageSpread",
        iconKey: "switchNode",
        position: [-60, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { formula: "((ExchangeB - ExchangeA) / ExchangeA) * 100" }
      },
      {
        id: "arb_postgres",
        name: "Postgres Tick Ledger",
        type: "n8n-nodes-base.postgres",
        subtitle: "insertRateTick",
        iconKey: "postgres",
        position: [180, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { table: "market_spread_history", retention: "30_days" }
      },
      {
        id: "arb_if_spread",
        name: "IF Spread > 1.8%",
        type: "n8n-nodes-base.if",
        subtitle: "spreadPct >= 1.8",
        iconKey: "ifNode",
        position: [440, 0],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "true_out", label: "true" }, { id: "false_out", label: "false" }],
        parameters: { condition: "$json.spreadPct >= 1.8" }
      },
      {
        id: "arb_telegram",
        name: "Telegram Execution Bot",
        type: "n8n-nodes-base.telegram",
        subtitle: "dispatchAlert: High",
        iconKey: "telegram",
        position: [700, -120],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { channel: "@arbitrage_signals_vip", format: "HTML" }
      },
      {
        id: "arb_commit",
        name: "Trade Signal Commit",
        type: "n8n-nodes-base.postgres",
        subtitle: "recordSignal",
        iconKey: "postgres",
        position: [700, 120],
        inputs: [{ id: "main_in", label: "" }],
        outputs: [{ id: "main_out", label: "" }],
        parameters: { table: "executed_arbitrage_orders", status: "TRIGGERED" }
      }
    ],
    connections: [
      { from: "arb_webhook", outPort: "main_out", to: "arb_calc", inPort: "main_in" },
      { from: "arb_calc", outPort: "main_out", to: "arb_postgres", inPort: "main_in" },
      { from: "arb_postgres", outPort: "main_out", to: "arb_if_spread", inPort: "main_in" },
      { from: "arb_if_spread", outPort: "true_out", to: "arb_telegram", inPort: "main_in" },
      { from: "arb_if_spread", outPort: "false_out", to: "arb_commit", inPort: "main_in" }
    ],
    flowSequence: [
      { nodeId: "arb_webhook", latency: 300, log: "[FastAPI Price Stream] Received batch tick: USD/INR, EUR/USD, Gold (XAU) across 3 liquidity pools." },
      { nodeId: "arb_calc", wireId: "wire-arb_webhook-arb_calc", latency: 350, log: "[Spread Margin Calculator] Identified XAU/USD spread: Pool A ($2,642.10) vs Pool B ($2,695.40) -> 2.02% spread." },
      { nodeId: "arb_postgres", wireId: "wire-arb_calc-arb_postgres", latency: 400, log: "[Postgres Tick Ledger] Logged high-frequency tick data to market_spread_history." },
      { nodeId: "arb_if_spread", wireId: "wire-arb_postgres-arb_if_spread", latency: 250, log: "[IF Spread > 1.8%] Spread 2.02% >= 1.80% threshold -> TRUE." },
      { nodeId: "arb_telegram", wireId: "wire-arb_if_spread-arb_telegram", latency: 350, log: "[Telegram Execution Bot] Dispatched high-priority trade trigger: 'ARBITRAGE OPPORTUNITY: XAU +2.02%'." }
    ]
  }
};

class AuthenticN8nCanvasEngine {
  constructor() {
    this.container = document.getElementById('n8n-canvas-wrapper');
    this.stage = document.getElementById('n8n-canvas-stage');
    this.wiresSvg = document.getElementById('n8n-wires-svg');
    this.triggerBtn = document.getElementById('sim-trigger-btn');
    this.dockExecBtn = document.getElementById('n8n-dock-execute-btn');
    this.canvasExecBtn = document.getElementById('n8n-canvas-execute-btn');
    this.consoleLogs = document.getElementById('sim-console-output');
    this.themeToggleBtn = document.getElementById('n8n-theme-toggle');
    this.workflowSelect = document.getElementById('n8n-workflow-select');
    this.titleEl = document.querySelector('.n8n-header-title');
    this.badgeEl = document.getElementById('n8n-header-badge');
    this.isRunning = false;

    this.currentWorkflowId = 'onboarding';
    this.currentWorkflow = WORKFLOW_REGISTRY[this.currentWorkflowId];

    if (!this.container || !this.stage) return;

    this.init();
  }

  init() {
    this.renderWorkflow(this.currentWorkflowId);

    if (this.triggerBtn) {
      this.triggerBtn.addEventListener('click', () => this.executeWorkflow());
    }
    if (this.dockExecBtn) {
      this.dockExecBtn.addEventListener('click', () => this.executeWorkflow());
    }
    if (this.canvasExecBtn) {
      this.canvasExecBtn.addEventListener('click', () => this.executeWorkflow());
    }

    if (this.workflowSelect) {
      this.workflowSelect.addEventListener('change', (e) => {
        this.switchWorkflow(e.target.value);
      });
    }

    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => {
        this.container.classList.toggle('dark-mode');
        const wrapper = document.getElementById('simulator-wrapper');
        if (wrapper) wrapper.classList.toggle('dark-canvas');
        const isDark = this.container.classList.contains('dark-mode');
        this.themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        this.drawConnectingWires();
      });
    }

    // Dock zoom & reset buttons
    const zoomBtn = document.getElementById('n8n-dock-zoom');
    if (zoomBtn) {
      zoomBtn.addEventListener('click', () => {
        const curScale = this.stage.style.transform === 'scale(0.85)' ? 'scale(1)' : 'scale(0.85)';
        this.stage.style.transform = curScale;
        this.stage.style.transformOrigin = '0 0';
        setTimeout(() => this.drawConnectingWires(), 50);
      });
    }

    const resetBtn = document.getElementById('n8n-dock-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.stage.style.transform = 'scale(1)';
        this.container.scrollLeft = 0;
        this.container.scrollTop = 0;
        setTimeout(() => this.drawConnectingWires(), 50);
      });
    }

    // Initial canvas view aligned to top-left
    setTimeout(() => {
      this.container.scrollLeft = 0;
      this.container.scrollTop = 0;
    }, 100);

    window.addEventListener('resize', () => this.drawConnectingWires());
  }

  switchWorkflow(workflowId) {
    if (!WORKFLOW_REGISTRY[workflowId]) return;
    this.currentWorkflowId = workflowId;
    this.currentWorkflow = WORKFLOW_REGISTRY[workflowId];

    if (this.workflowSelect) this.workflowSelect.value = workflowId;
    if (this.titleEl) this.titleEl.textContent = this.currentWorkflow.name;
    if (this.badgeEl) this.badgeEl.textContent = this.currentWorkflow.badge;

    this.renderWorkflow(workflowId);

    if (this.consoleLogs) {
      this.consoleLogs.innerHTML = `
        <div class="log-line">
          <span class="log-time">[${new Date().toLocaleTimeString()}]</span>
          <span class="log-info">Loaded workflow: ${this.currentWorkflow.name} (${this.currentWorkflow.nodes.length} nodes ready).</span>
        </div>
      `;
    }

    if (window.showToast) window.showToast(`Loaded ${this.currentWorkflow.name}`);
  }

  renderWorkflow(workflowId) {
    const wf = WORKFLOW_REGISTRY[workflowId] || this.currentWorkflow;
    this.currentWorkflow = wf;

    this.renderNodes(wf);
    setTimeout(() => this.drawConnectingWires(), 50);
  }

  getNodePortCoords(nodeId, portId, isOutput) {
    const node = this.currentWorkflow.nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };

    const leftPx = (node.position[0] + 320) * 0.95 + 40;
    const topPx = (node.position[1] + 430) * 0.72 + 35;

    let portYOffset = 38; // Default center 50%
    if (portId === 'true_out' || portId === 'branch_0' || portId === 'merge_in_0') {
      portYOffset = 19; // 25% (upper branch)
    } else if (portId === 'branch_1') {
      portYOffset = 38; // 50% (middle branch)
    } else if (portId === 'false_out' || portId === 'branch_2' || portId === 'merge_in_1') {
      portYOffset = 57; // 75% (lower branch)
    }

    const x = isOutput ? leftPx + 76 : leftPx;
    const y = topPx + portYOffset;
    return { x, y };
  }

  renderNodes(wf) {
    this.stage.innerHTML = '';

    // Re-insert SVG overlay inside stage
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'n8n-wires-svg');
    svg.setAttribute('id', 'n8n-wires-svg');
    this.stage.appendChild(svg);
    this.wiresSvg = svg;

    wf.nodes.forEach(node => {
      const el = document.createElement('div');
      el.className = 'n8n-node-wrapper';
      el.id = node.id;

      const leftPx = (node.position[0] + 320) * 0.95 + 40;
      const topPx = (node.position[1] + 430) * 0.72 + 35;

      el.style.left = `${leftPx}px`;
      el.style.top = `${topPx}px`;

      const logoSvg = window.BRAND_LOGOS[node.iconKey] || window.BRAND_LOGOS.n8n;

      let portsHtml = '';

      // Inputs
      if (node.inputs.length === 1) {
        portsHtml += `<div class="n8n-port n8n-port-input" data-port="${node.inputs[0].id}"></div>`;
      } else if (node.inputs.length > 1) {
        node.inputs.forEach((inp, idx) => {
          const topClass = idx === 0 ? 'port-branch-0' : 'port-branch-2';
          const labelClass = idx === 0 ? 'label-input-1' : 'label-input-2';
          portsHtml += `
            <div class="n8n-port n8n-port-input ${topClass}" data-port="${inp.id}"></div>
            <span class="n8n-port-label ${labelClass}">${inp.label}</span>
          `;
        });
      }

      // Outputs
      if (node.outputs.length === 1) {
        portsHtml += `<div class="n8n-port n8n-port-output" data-port="${node.outputs[0].id}"></div>`;
      } else if (node.outputs.length === 2) {
        portsHtml += `
          <div class="n8n-port n8n-port-output port-branch-0" data-port="${node.outputs[0].id}"></div>
          <span class="n8n-port-label label-true">true</span>
          <div class="n8n-port n8n-port-output port-branch-2" data-port="${node.outputs[1].id}"></div>
          <span class="n8n-port-label label-false">false</span>
        `;
      } else if (node.outputs.length === 3) {
        portsHtml += `
          <div class="n8n-port n8n-port-output port-branch-0" data-port="${node.outputs[0].id}"></div>
          <span class="n8n-port-label label-branch-0">0</span>
          <div class="n8n-port n8n-port-output port-branch-1" data-port="${node.outputs[1].id}"></div>
          <span class="n8n-port-label label-branch-1">1</span>
          <div class="n8n-port n8n-port-output port-branch-2" data-port="${node.outputs[2].id}"></div>
          <span class="n8n-port-label label-branch-2">2</span>
        `;
      }

      el.innerHTML = `
        <div class="n8n-node-box">
          ${node.hasTriggerBadge ? '<span class="n8n-trigger-badge"><i class="fas fa-bolt"></i></span>' : ''}
          <div class="n8n-status-pill">1 item</div>
          ${portsHtml}
          <div class="n8n-node-icon-inner">${logoSvg}</div>
        </div>
        <div class="n8n-node-caption">
          <div class="n8n-node-name">${node.name}</div>
          <div class="n8n-node-subtitle">${node.subtitle}</div>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openNodeInspector(node);
      });

      this.stage.appendChild(el);
    });
  }

  drawConnectingWires() {
    if (!this.wiresSvg) return;
    this.wiresSvg.innerHTML = '';

    this.currentWorkflow.connections.forEach((conn) => {
      const p1 = this.getNodePortCoords(conn.from, conn.outPort, true);
      const p2 = this.getNodePortCoords(conn.to, conn.inPort, false);

      const dx = Math.max(35, (p2.x - p1.x) * 0.5);
      const d = `M ${p1.x} ${p1.y} C ${p1.x + dx} ${p1.y}, ${p2.x - dx} ${p2.y}, ${p2.x} ${p2.y}`;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('class', 'n8n-wire-path');
      path.setAttribute('id', `wire-${conn.from}-${conn.to}`);

      this.wiresSvg.appendChild(path);
    });
  }

  executeWorkflow() {
    if (this.isRunning) return;
    this.isRunning = true;

    if (this.triggerBtn) {
      this.triggerBtn.disabled = true;
      this.triggerBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Executing Flow...`;
    }
    if (this.dockExecBtn) {
      this.dockExecBtn.disabled = true;
      this.dockExecBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
    }
    if (this.canvasExecBtn) {
      this.canvasExecBtn.disabled = true;
      this.canvasExecBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Executing flow...</span>`;
    }

    if (window.playUiSound) window.playUiSound('run');

    const nodeEls = this.stage.querySelectorAll('.n8n-node-wrapper');
    const wires = this.wiresSvg.querySelectorAll('.n8n-wire-path');

    // Reset visual states
    nodeEls.forEach(n => n.classList.remove('running', 'completed'));
    wires.forEach(w => w.classList.remove('active', 'completed'));

    this.consoleLogs.innerHTML = `
      <div class="log-line">
        <span class="log-time">[${new Date().toLocaleTimeString()}]</span>
        <span class="log-info">=== STARTING EXECUTION: ${this.currentWorkflow.name} ===</span>
      </div>
    `;

    const flowSequence = this.currentWorkflow.flowSequence;
    let delay = 200;

    flowSequence.forEach((step, idx) => {
      setTimeout(() => {
        // Complete previous
        if (idx > 0) {
          const prevEl = document.getElementById(flowSequence[idx - 1].nodeId);
          if (prevEl) {
            prevEl.classList.remove('running');
            prevEl.classList.add('completed');
          }
          if (flowSequence[idx - 1].wireId) {
            const prevWire = document.getElementById(flowSequence[idx - 1].wireId);
            if (prevWire) {
              prevWire.classList.remove('active');
              prevWire.classList.add('completed');
            }
          }
        }

        // Run current
        const curEl = document.getElementById(step.nodeId);
        if (curEl) curEl.classList.add('running');
        if (step.wireId) {
          const curWire = document.getElementById(step.wireId);
          if (curWire) curWire.classList.add('active');
        }

        // Log line
        const line = document.createElement('div');
        line.className = 'log-line';
        line.innerHTML = `<span class="log-time">[${new Date().toLocaleTimeString()}]</span> <span class="log-info">${step.log}</span>`;
        this.consoleLogs.appendChild(line);
        this.consoleLogs.scrollTop = this.consoleLogs.scrollHeight;

        if (window.playUiSound) window.playUiSound('beep');
      }, delay);

      delay += step.latency;
    });

    // Complete all
    setTimeout(() => {
      const last = flowSequence[flowSequence.length - 1];
      const lastEl = document.getElementById(last.nodeId);
      if (lastEl) {
        lastEl.classList.remove('running');
        lastEl.classList.add('completed');
      }

      if (this.triggerBtn) {
        this.triggerBtn.disabled = false;
        this.triggerBtn.innerHTML = `<i class="fas fa-play"></i> Run Flow Again`;
      }
      if (this.dockExecBtn) {
        this.dockExecBtn.disabled = false;
        this.dockExecBtn.innerHTML = `<i class="fas fa-play"></i>`;
      }
      if (this.canvasExecBtn) {
        this.canvasExecBtn.disabled = false;
        this.canvasExecBtn.innerHTML = `<i class="fas fa-play"></i> <span>Execute workflow</span>`;
      }

      this.isRunning = false;

      const finalLine = document.createElement('div');
      finalLine.className = 'log-line';
      finalLine.innerHTML = `<span class="log-time">[${new Date().toLocaleTimeString()}]</span> <span class="log-success">✔ Workflow executed with 100% success (${flowSequence.length}/${flowSequence.length} nodes completed)!</span>`;
      this.consoleLogs.appendChild(finalLine);
      this.consoleLogs.scrollTop = this.consoleLogs.scrollHeight;

      if (window.playUiSound) window.playUiSound('success');
      if (window.showToast) window.showToast(`🚀 ${this.currentWorkflow.name} executed with 100% success!`);
    }, delay + 400);
  }

  openNodeInspector(node) {
    if (window.playUiSound) window.playUiSound('click');

    const modal = document.getElementById('agent-modal-overlay');
    const content = document.getElementById('agent-modal-content');

    if (!modal || !content) return;

    content.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
        <span style="background: rgba(255, 109, 90, 0.15); color: #ff6d5a; border: 1px solid rgba(255, 109, 90, 0.4); font-family: var(--font-mono); font-size: 0.75rem; padding: 0.25rem 0.65rem; border-radius: var(--radius-full);">
          ${node.type}
        </span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #10b981;">● Node Ready</span>
      </div>
      <h2 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; margin-bottom: 0.4rem;">${node.name}</h2>
      <p style="font-size: 0.85rem; color: #94a3b8; font-family: var(--font-mono); margin-bottom: 1.25rem;">Subtitle / Action: ${node.subtitle}</p>

      <div style="background: #090d1a; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-mono); font-size: 0.78rem; color: #ff6d5a; text-transform: uppercase; margin-bottom: 0.75rem;">
          <i class="fas fa-code"></i> Node Parameters & Configuration
        </h4>
        <pre style="font-family: var(--font-mono); font-size: 0.8rem; color: #cbd5e1; white-space: pre-wrap; word-break: break-all; line-height: 1.5;">${JSON.stringify(node.parameters, null, 2)}</pre>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
        <span style="font-size: 0.75rem; color: #64748b; font-family: var(--font-mono);">Workflow Node Inspector</span>
        <button class="btn-hire" onclick="document.getElementById('agent-modal-overlay').classList.remove('open')">Close Node</button>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// Global functions for external buttons to load any workflow into the canvas
window.loadWorkflowIntoStudio = function(workflowId) {
  if (window.authenticN8nCanvasEngine) {
    window.authenticN8nCanvasEngine.switchWorkflow(workflowId);
    const canvasSection = document.getElementById('simulator');
    if (canvasSection) {
      canvasSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

window.WORKFLOW_REGISTRY = WORKFLOW_REGISTRY;

document.addEventListener('DOMContentLoaded', () => {
  window.authenticN8nCanvasEngine = new AuthenticN8nCanvasEngine();
});
