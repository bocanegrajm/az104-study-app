// AZ-104 Deep Dive Content Extension
// This file adds extensive additional concepts and quiz questions to each module

const DEEP_CONTENT = {
  1: {
    examWeight: "Part of 'Manage Azure identities & governance' — 20-25% of exam",
    extraConcepts: [
      {
        title: "What Is 'The Cloud' — Absolute Beginner Foundation",
        content: "Before we talk Azure, let's go back to basics. The cloud is simply someone else's computers — a LOT of them — sitting in massive data centers around the world. Instead of buying a $10,000 server and putting it in your closet, you rent computing power from Microsoft and pay monthly like a utility bill.\n\nThree cloud service models you MUST know:\n\n• IaaS (Infrastructure as a Service) — You rent the raw hardware (VMs, storage, networks). You manage the OS, patches, apps. Example: Azure Virtual Machines. Analogy: renting an empty lot and building your house.\n\n• PaaS (Platform as a Service) — Microsoft manages the infrastructure AND the OS/runtime. You just deploy your code. Example: Azure App Service. Analogy: renting a furnished apartment.\n\n• SaaS (Software as a Service) — Microsoft manages everything. You just use the software. Example: Microsoft 365, Teams. Analogy: staying at a hotel.\n\nAzure operates in 60+ regions worldwide, organized into geographies (Americas, Europe, Asia Pacific, Middle East, Africa) and region pairs (e.g., East US paired with West US) for disaster recovery. Each region has multiple Availability Zones (physically separate datacenters).",
        tips: ["The Shared Responsibility Model is fundamental: In IaaS, YOU manage the OS and up. In PaaS, the provider manages through the OS. In SaaS, the provider manages almost everything.", "Azure has a free tier — 12 months of popular services free + $200 credit for 30 days."]
      },
      {
        title: "Entra ID Editions & Licensing (Exam Critical)",
        content: "Entra ID comes in multiple editions. The exam LOVES testing which features require which edition:\n\n• Free — Included with any Azure subscription. Basic user/group management, SSO to cloud apps, basic security reports. Limited to 500,000 objects.\n\n• P1 (Premium 1) — Adds: Dynamic Groups, Conditional Access, Self-Service Password Reset (with writeback), Application Proxy, Microsoft Entra Connect Health, Group-based license assignment. This is the baseline for most enterprise features.\n\n• P2 (Premium 2) — Everything in P1 plus: Identity Protection (risk-based conditional access detects risky sign-ins like impossible travel), Privileged Identity Management (PIM — just-in-time admin access with approval workflows), and Access Reviews (periodic reviews of who has access to what).\n\nLicenses are assigned PER USER. Users need a Usage Location set before license assignment (two-letter country code). Without it, assignment fails — this is an exam trick question.\n\nGroup-based licensing (P1 required): Assign licenses to a group. When users join the group, they auto-get the license. When they leave, the license is freed up.",
        keyTerms: ["Free Edition", "P1 (Premium 1)", "P2 (Premium 2)", "Usage Location", "Group-based licensing", "Conditional Access = P1", "PIM = P2"],
        tips: ["Conditional Access requires P1. This is tested constantly.", "PIM and Identity Protection require P2.", "License assignment fails without Usage Location — exam gotcha!"],
        warning: "Know the edition boundaries cold: Dynamic Groups = P1. Conditional Access = P1. PIM = P2. Identity Protection = P2. SSPR writeback = P1."
      },
      {
        title: "User Types Deep Dive — Cloud, Synced, Guest & B2B",
        content: "Member Users (Internal):\n• Cloud-only users — Created directly in Entra ID portal, PowerShell, or Graph API. Managed entirely in the cloud.\n• Synced users — Created in on-premises AD DS and synced via Microsoft Entra Connect. Source of authority is on-premises — changes made in Entra ID for synced attributes get overwritten on next sync cycle.\n\nGuest Users (External / B2B):\n• Invited from outside your organization. They authenticate against THEIR home identity provider (their company's Entra ID, or a personal Microsoft/Google account).\n• Your tenant has a guest OBJECT that references their external identity.\n• Guest users have limited default permissions compared to members (can't enumerate directory, can't see other users by default).\n• B2B direct connect allows external users to access shared channels in Teams without creating guest objects.\n\nDeleted users go to the Recycle Bin. Recoverable for 30 days. After 30 days, permanently deleted.\n\nBulk Operations for large-scale management:\n• Bulk Create — Upload CSV with user properties.\n• Bulk Invite — CSV of email addresses for B2B invitations.\n• Bulk Delete — CSV of UPNs to remove.\n• Download Users — Export entire directory as CSV.",
        keyTerms: ["Cloud-only user", "Synced user", "Guest user (B2B)", "Entra Connect", "Bulk operations", "30-day soft delete"],
        tips: ["Synced users are managed on-premises. Changes in Entra ID portal may be overwritten on next sync.", "Guest users have limited default permissions — they can't enumerate the full directory.", "Deleted users: 30-day recovery window. After that, gone forever."]
      },
      {
        title: "Groups — Dynamic Rules, Nesting & Expiration",
        content: "Two group types: Security (permissions/access) and Microsoft 365 (collaboration — mailbox, SharePoint, Teams).\n\nThree membership types:\n• Assigned — Manual add/remove.\n• Dynamic User — Auto-managed by attribute rules. Example rule: (user.department -eq \"IT\") -and (user.jobTitle -contains \"Engineer\"). Requires P1.\n• Dynamic Device — Based on device attributes. Requires P1.\n\nDynamic rule operators: -eq, -ne, -startsWith, -contains, -match, -in, -notIn, -and, -or, -not.\n\nGroup nesting: Security groups CAN contain other groups. M365 groups CANNOT.\n\nGroup expiration: M365 groups can expire after 90, 180, or 365 days. Owners get renewal notices. Expired groups are soft-deleted (30-day recovery).\n\nNaming policy: Enforce prefixes/suffixes and block specific words in group names.",
        keyTerms: ["Security Group", "M365 Group", "Dynamic membership (P1)", "Group nesting", "Expiration policy", "Naming policy"],
        warning: "Dynamic groups: membership changes are NOT instant. Processing can take minutes to hours. You CANNOT manually add members to a dynamic group."
      },
      {
        title: "Self-Service Password Reset (SSPR) — Configuration Details",
        content: "SSPR can be enabled for: None, Selected groups, or All users.\n\nAuthentication methods (users pre-register):\n• Mobile app notification (Authenticator push)\n• Mobile app code (TOTP)\n• Email (alternate email)\n• Mobile phone (SMS or voice call)\n• Office phone (voice call)\n• Security questions (weakest — not recommended)\n\nAdmin configures: require 1 or 2 methods.\n\nSSPR with on-premises writeback: Requires P1 + Entra Connect with password writeback enabled. Without writeback, cloud password resets don't sync back to on-premises AD.\n\nRegistration enforcement: Force users to register on next sign-in. Re-confirmation period: how often users must reconfirm their methods.\n\nSecurity features: Smart lockout (blocks attackers based on location intelligence), banned password list (custom + Microsoft global list), password change/reset audit logging.",
        keyTerms: ["SSPR", "Authentication methods", "Password writeback (P1)", "Smart lockout", "Banned password list"],
        tips: ["SSPR writeback requires P1 and Entra Connect.", "If SSPR requires 2 methods and user only has 1 registered, they CAN'T reset.", "Combined registration lets users register for both SSPR and MFA simultaneously."]
      },
      {
        title: "Administrative Units (Delegated Administration)",
        content: "Administrative Units (AUs) restrict admin scope within your tenant. Problem: assigning 'User Administrator' gives power over ALL users. Solution: create an AU containing only Marketing users, then scope the role to that AU.\n\nAUs can contain: Users, Groups, Devices.\nMembership: Assigned (manual) or Dynamic (rule-based, P1).\nAUs require P1 for creation. Not all roles support AU scoping.\n\nCommon pattern: Regional IT teams manage only their region's users via scoped AUs.",
        keyTerms: ["Administrative Unit", "Scoped role assignment", "Delegated administration"],
        tips: ["AUs are a P1 feature.", "Only certain directory roles support AU scoping — not all.", "AUs provide administrative boundaries, not security boundaries."]
      }
    ],
    extraQuiz: [
      {
        q: "Which Entra ID edition is needed for Conditional Access policies?",
        options: ["Free", "P1 (Premium 1)", "P2 (Premium 2)", "Any edition"],
        correct: 1,
        explanation: "Conditional Access requires Entra ID P1 or P2. It is NOT available in the Free edition. This is one of the most tested features on the AZ-104 exam."
      },
      {
        q: "You delete a user account. After how many days is it permanently unrecoverable?",
        options: ["7 days", "14 days", "30 days", "90 days"],
        correct: 2,
        explanation: "Deleted users are soft-deleted and recoverable for 30 days. After 30 days, they are permanently (hard) deleted and cannot be recovered."
      },
      {
        q: "License assignment fails for a user. What's the most likely missing property?",
        options: ["Display name", "Usage Location", "Phone number", "Manager"],
        correct: 1,
        explanation: "License assignment requires a Usage Location to be set (two-letter country code like 'US'). Without it, the assignment fails."
      }
    ]
  },
  2: {
    examWeight: "Part of 'Manage Azure identities & governance' — 20-25% of exam",
    extraConcepts: [
      {
        title: "RBAC Custom Roles — JSON Structure Deep Dive",
        content: "Custom roles are defined in JSON with this structure:\n\n{\n  \"Name\": \"Custom Support Request\",\n  \"IsCustom\": true,\n  \"Description\": \"Allows creating support tickets\",\n  \"Actions\": [\"Microsoft.Support/*\"],\n  \"NotActions\": [\"Microsoft.Support/register/action\"],\n  \"DataActions\": [],\n  \"NotDataActions\": [],\n  \"AssignableScopes\": [\"/subscriptions/{sub-id}\"]\n}\n\nActions vs DataActions:\n• Actions = management plane operations (create VMs, manage networks, configure storage).\n• DataActions = data plane operations (read blob data, send queue messages, query database).\n\nCommon Actions patterns:\n• Microsoft.Compute/virtualMachines/* — All VM operations.\n• Microsoft.Storage/storageAccounts/listKeys/action — List storage keys.\n• */read — Read all resource types.\n\nAssignableScopes determines WHERE the role can be assigned. Can be subscriptions, resource groups, or management groups. You can list multiple scopes.\n\nCreation methods: Azure Portal, PowerShell (New-AzRoleDefinition), CLI (az role definition create), or REST API.",
        keyTerms: ["Actions", "NotActions", "DataActions", "NotDataActions", "AssignableScopes", "Management plane", "Data plane"],
        tips: ["Actions = management plane (configure resources). DataActions = data plane (access data within resources).", "You can have up to 5,000 custom roles per tenant.", "Custom roles take up to 5 minutes to propagate after creation."],
        warning: "Exam key: Know the JSON structure — Actions, NotActions, DataActions, AssignableScopes. Know the difference between management plane and data plane operations."
      },
      {
        title: "Azure Policy Effects — Complete Reference",
        content: "All seven policy effects in detail:\n\n1. Deny — BLOCKS non-compliant resource creation/modification. Most restrictive. Evaluated before ARM processes the request.\n\n2. Audit — Allows the resource but creates a warning event in the Activity Log. Resource shows as 'non-compliant'. No enforcement.\n\n3. Append — Adds additional fields/properties to a resource during creation/update. Example: add a specific network rule to all storage accounts.\n\n4. Modify — Changes properties on existing AND new resources. Example: add/update tags, change network access rules. Requires managed identity. Supports remediation tasks for existing resources.\n\n5. DeployIfNotExists — Deploys a related resource IF it doesn't exist. Example: deploy a Log Analytics extension to VMs that don't have it. Requires managed identity. Works on related resources, not the target itself.\n\n6. AuditIfNotExists — Checks if a related resource exists. If not, creates an audit event. Example: audit VMs that don't have endpoint protection installed.\n\n7. Disabled — The policy is inactive. Useful for testing/debugging without deleting.\n\nEvaluation order: Disabled > Append/Modify > Deny > Audit. Deny is evaluated BEFORE the resource is created.",
        keyTerms: ["Deny", "Audit", "Append", "Modify", "DeployIfNotExists", "AuditIfNotExists", "Disabled", "Evaluation order"],
        tips: ["Modify and DeployIfNotExists REQUIRE a managed identity.", "Deny is evaluated before the ARM request processes — the resource is never created.", "Policy evaluation order matters: Disabled → Append/Modify → Deny → Audit."]
      },
      {
        title: "Cost Management — Budgets, Alerts & Advisor",
        content: "Azure Cost Management + Billing: View, analyze, and optimize cloud spending.\n\n• Budgets — Set spending limits at subscription or resource group scope. Thresholds trigger alerts at configured percentages (e.g., 50%, 80%, 100%). Budgets can trigger Action Groups (email, webhook, automation).\n\n• Cost Alerts — Three types: Budget alerts, Credit alerts (EA), Department spending quotas.\n\n• Azure Advisor — Free best-practices engine with recommendations in 5 categories: Cost, Security, Reliability, Operational Excellence, Performance. Cost recommendations: unused resources, right-sizing, reserved instances.\n\n• Azure Pricing Calculator — Estimate costs BEFORE deployment.\n• Azure TCO Calculator — Compare on-premises vs Azure costs.\n\nKey exam point: Budgets ALERT but don't AUTO-STOP resources unless you configure automation.",
        keyTerms: ["Budget", "Cost Alert", "Azure Advisor", "Pricing Calculator", "TCO Calculator"],
        tips: ["Budgets send alerts but don't stop resources by default.", "Azure Advisor is free — the exam loves asking about it.", "Tags are essential for cost allocation — tag by cost center, department, project."]
      }
    ],
    extraQuiz: [
      {
        q: "Azure Policy with DeployIfNotExists effect requires what additional component?",
        options: ["A premium subscription", "A managed identity", "An Azure DevOps pipeline", "Global Admin permissions"],
        correct: 1,
        explanation: "DeployIfNotExists and Modify effects need a managed identity to make changes to resources on behalf of the policy. Azure auto-creates this identity during assignment."
      },
      {
        q: "You need a custom RBAC role that allows reading all resources AND starting/stopping VMs, but nothing else. What sections of the role definition do you configure?",
        options: ["Only Actions", "Actions and NotActions", "Only DataActions", "Only AssignableScopes"],
        correct: 1,
        explanation: "You set Actions to include */read and Microsoft.Compute/virtualMachines/start/action + .../restart/action + .../deallocate/action. Use NotActions to exclude anything you don't want within a broader wildcard. DataActions is for data-plane operations (not needed here)."
      },
      {
        q: "What is the evaluation order when a resource matches multiple Azure Policy effects?",
        options: ["Alphabetical order", "Disabled → Append/Modify → Deny → Audit", "Deny always runs first", "Random — depends on assignment order"],
        correct: 1,
        explanation: "Policy effects are evaluated in order: Disabled first (skipped), then Append/Modify (make changes), then Deny (block if non-compliant), then Audit (log warning). Deny happens BEFORE the resource is created."
      }
    ]
  },
  3: {
    examWeight: "Part of 'Deploy & manage compute resources' — 20-25% of exam",
    extraConcepts: [
      {
        title: "ARM Template JSON Structure — Deep Dive",
        content: "Every ARM template has this structure:\n\n{\n  \"$schema\": \"https://schema.management.azure.com/...\",\n  \"contentVersion\": \"1.0.0.0\",\n  \"parameters\": { },\n  \"variables\": { },\n  \"resources\": [ ],\n  \"outputs\": { }\n}\n\n• $schema — Defines the template language version. Different schemas for resource groups, subscriptions, management groups, and tenant-level deployments.\n• contentVersion — Your own version string for tracking changes.\n• parameters — Inputs the user provides at deployment time. Can have: type, defaultValue, allowedValues, minValue/maxValue, description.\n• variables — Computed values used within the template. Defined once, referenced many times.\n• resources — The actual Azure resources to deploy. Each has: type, apiVersion, name, location, properties, and optionally dependsOn.\n• outputs — Values returned after deployment (e.g., the public IP of a newly created VM).\n\nDependencies: Use 'dependsOn' to explicitly order resource creation. ARM also auto-detects implicit dependencies when you use reference() or resourceId() functions.\n\nTemplate functions: concat(), resourceGroup().location, parameters('name'), variables('name'), reference(), resourceId(), uniqueString().\n\nLinked/Nested templates: Break large templates into modules. A master template calls child templates. Child templates can be stored in Azure Storage with SAS tokens.",
        keyTerms: ["$schema", "parameters", "variables", "resources", "outputs", "dependsOn", "reference()", "resourceId()", "Linked templates"],
        tips: ["Templates are idempotent — running the same template twice produces the same result, no duplicates.", "Always use parameters for values that change between environments (dev/staging/prod).", "Incremental mode (default): adds/updates, doesn't delete. Complete mode: deletes resources NOT in the template."],
        warning: "Exam critical: Incremental mode vs Complete mode. Incremental = safe (doesn't delete). Complete = dangerous (DELETES anything not in the template). Default is Incremental."
      },
      {
        title: "Bicep — The Simpler Alternative",
        content: "Bicep is a domain-specific language that compiles to ARM JSON. Same engine, nicer syntax.\n\nBicep advantages:\n• No JSON boilerplate ($schema, contentVersion).\n• Cleaner syntax: 'param location string = 'eastus'' instead of JSON parameter objects.\n• Automatic dependency management — no need for dependsOn in most cases.\n• Native module support for code reuse.\n• Better IDE support with Bicep extension for VS Code.\n\nKey Bicep syntax:\n• param name string — Define parameters.\n• var name = 'value' — Define variables.\n• resource storageAccount 'Microsoft.Storage/storageAccounts@2021-02-01' = { ... } — Define resources.\n• output name string = resource.properties.id — Define outputs.\n\nConversion: az bicep decompile --file template.json → Converts ARM JSON to Bicep. Not always perfect, may need manual cleanup.",
        keyTerms: ["Bicep", "Compile to ARM JSON", "Decompile", "Modules"],
        tips: ["Bicep compiles to ARM JSON — they produce identical deployments.", "az bicep decompile converts JSON to Bicep. az bicep build converts Bicep to JSON.", "Bicep auto-detects dependencies in most cases — no dependsOn needed."]
      },
      {
        title: "Deployment Scopes & Methods",
        content: "ARM templates can target different scopes:\n\n• Resource Group deployment — Most common. Creates resources within a resource group.\n  PowerShell: New-AzResourceGroupDeployment\n  CLI: az deployment group create\n\n• Subscription deployment — Creates resource groups, policies, RBAC at subscription level.\n  PowerShell: New-AzSubscriptionDeployment\n  CLI: az deployment sub create\n\n• Management Group deployment — Policies and RBAC across multiple subscriptions.\n  CLI: az deployment mg create\n\n• Tenant deployment — Management groups, subscriptions at the tenant root.\n  CLI: az deployment tenant create\n\nCloud Shell provides both Bash and PowerShell with Azure CLI and PowerShell modules pre-installed. You can upload templates directly to Cloud Shell storage.\n\nWhat-If preview: az deployment group what-if — shows what WOULD change without actually deploying. Essential for validating changes before production deployment.",
        keyTerms: ["Resource Group deployment", "Subscription deployment", "Cloud Shell", "What-If", "PowerShell", "Azure CLI"],
        tips: ["Use what-if to preview changes before deploying to production.", "Cloud Shell has Azure tools pre-installed — no setup needed.", "Know the CLI commands: az deployment group create for resource groups, az deployment sub create for subscriptions."]
      }
    ],
    extraQuiz: [
      {
        q: "An ARM template uses 'Complete' deployment mode on a resource group that contains a VM not defined in the template. What happens to the VM?",
        options: ["Nothing — it stays", "It is DELETED", "It is moved to another resource group", "The deployment fails"],
        correct: 1,
        explanation: "Complete mode makes the resource group match the template EXACTLY. Resources not in the template are DELETED. This is why Incremental (the default) is safer."
      },
      {
        q: "You want to preview what an ARM deployment will change without actually deploying. What command do you use?",
        options: ["az deployment group validate", "az deployment group what-if", "az deployment group create --dry-run", "az deployment group preview"],
        correct: 1,
        explanation: "The what-if operation shows you what resources would be created, modified, or deleted — without actually making changes. Essential for production safety."
      }
    ]
  },
  4: {
    examWeight: "Part of 'Implement & manage virtual networking' — 15-20% of exam",
    extraConcepts: [
      {
        title: "IP Addressing & CIDR — The Math You Need",
        content: "CIDR (Classless Inter-Domain Routing) notation defines network size. The number after / tells how many bits are the network portion:\n\n• /8 = 16,777,216 addresses (255.0.0.0 mask)\n• /16 = 65,536 addresses (255.255.0.0 mask) — Common for VNets\n• /24 = 256 addresses (255.255.255.0 mask) — Common for subnets\n• /27 = 32 addresses — Minimum recommended subnet size\n• /28 = 16 addresses\n• /29 = 8 addresses — Minimum subnet size in Azure (but only 3 usable)\n• /32 = 1 address (single host)\n\nAzure reserves 5 IPs per subnet:\n• .0 — Network address\n• .1 — Default gateway\n• .2 and .3 — Azure DNS\n• .255 (last) — Broadcast\n\nSo a /24 subnet (256 addresses) has 251 usable. A /28 (16 addresses) has only 11 usable.\n\nPrivate IP ranges (RFC 1918):\n• 10.0.0.0 — 10.255.255.255 (10.0.0.0/8)\n• 172.16.0.0 — 172.31.255.255 (172.16.0.0/12)\n• 192.168.0.0 — 192.168.255.255 (192.168.0.0/16)\n\nPlan address spaces to avoid overlap, especially if you plan to peer VNets or connect to on-premises networks.",
        keyTerms: ["CIDR", "Subnet mask", "Private IP ranges", "Azure reserved IPs (5 per subnet)"],
        tips: ["/24 = 256 total, 251 usable. /27 = 32 total, 27 usable. /28 = 16 total, 11 usable.", "Azure ALWAYS reserves 5 IPs per subnet — this is tested.", "VNet address spaces MUST NOT overlap if you plan to peer them."],
        warning: "Exam math: You WILL be asked to calculate usable IPs. Remember: total addresses minus 5 Azure reserved = usable. Quick formula: 2^(32-prefix) - 5 = usable IPs."
      },
      {
        title: "NSG Rules — Priority, Evaluation & Default Rules",
        content: "NSG rules have: Priority (100-4096, lower = first), Direction (Inbound/Outbound), Source, Destination, Port, Protocol, Action (Allow/Deny).\n\nEvaluation: Rules processed in priority order. First match wins. Once a rule matches, no further rules are evaluated.\n\nDefault rules (cannot be deleted, lowest priority 65000-65500):\n• AllowVNetInBound (65000) — Allow all traffic within the VNet.\n• AllowAzureLoadBalancerInBound (65001) — Allow LB health probes.\n• DenyAllInBound (65500) — Deny everything else inbound.\n• AllowVNetOutBound (65000) — Allow outbound within VNet.\n• AllowInternetOutBound (65001) — Allow outbound to internet.\n• DenyAllOutBound (65500) — Deny everything else outbound.\n\nNSGs are stateful — if inbound traffic is allowed, the return traffic is automatically allowed without needing an outbound rule.\n\nNSG association: Can be attached to a subnet AND/OR a NIC. If both, BOTH are evaluated. Inbound: subnet NSG first, then NIC NSG. Outbound: NIC NSG first, then subnet NSG.\n\nService Tags simplify rules: Internet, VirtualNetwork, AzureLoadBalancer, AzureCloud, Storage, Sql, AzureActiveDirectory, etc.",
        keyTerms: ["Priority", "First match wins", "Default rules", "Stateful", "Service Tags", "Subnet NSG + NIC NSG"],
        tips: ["Lower priority number = evaluated FIRST = higher priority.", "NSGs are stateful — return traffic is auto-allowed.", "When NSG is on both subnet and NIC: inbound goes subnet→NIC, outbound goes NIC→subnet."],
        warning: "Exam favorite: NSG rule evaluation order. Lower priority number wins. If Deny at 100 and Allow at 200 — traffic is DENIED (100 is checked first)."
      },
      {
        title: "Azure DNS — Public & Private Zones",
        content: "Azure DNS hosts DNS zones and manages records.\n\nPublic DNS Zone: Resolves names from the internet. You create the zone in Azure, then update your domain registrar's nameservers to point to Azure DNS. Azure provides 4 nameservers per zone.\n\nPrivate DNS Zone: Resolves names within your VNets. Must be linked to VNets. Supports auto-registration — VMs in linked VNets automatically get DNS records. Perfect for internal name resolution without deploying DNS servers.\n\nRecord types: A (name→IPv4), AAAA (name→IPv6), CNAME (name→name), MX (mail), NS (nameservers), SOA (start of authority), TXT (text/verification), SRV (service), PTR (reverse lookup).\n\nRecord sets: Multiple records with the same name and type. Example: an A record set with multiple IPs for round-robin load balancing.\n\nImportant: Azure DNS does NOT let you purchase domain names — only host/manage DNS zones. You buy domains from a registrar (GoDaddy, Namecheap, etc.).",
        keyTerms: ["Public DNS Zone", "Private DNS Zone", "Virtual Network Link", "Auto-registration", "A Record", "CNAME", "Record Set"],
        tips: ["Azure DNS doesn't sell domains — only hosts zones.", "Private DNS zones need VNet links to work. Auto-registration creates records automatically.", "CNAME records cannot coexist with other record types at the same name (zone apex limitation)."]
      }
    ],
    extraQuiz: [
      {
        q: "You create a subnet with range 10.0.1.0/27. How many usable IP addresses do you have?",
        options: ["32", "27", "30", "24"],
        correct: 1,
        explanation: "/27 = 32 total addresses. Azure reserves 5. 32 - 5 = 27 usable addresses."
      },
      {
        q: "An NSG is attached to both a subnet AND a NIC. For INBOUND traffic, which is evaluated first?",
        options: ["NIC NSG first, then subnet NSG", "Subnet NSG first, then NIC NSG", "Only the subnet NSG applies", "They are evaluated simultaneously"],
        correct: 1,
        explanation: "For inbound traffic: subnet NSG is evaluated first, then NIC NSG. Both must allow the traffic for it to reach the VM. For outbound: it's reversed — NIC first, then subnet."
      }
    ]
  },
  5: {
    examWeight: "Part of 'Implement & manage virtual networking' — 15-20% of exam",
    extraConcepts: [
      {
        title: "VNet Peering — Detailed Configuration",
        content: "VNet Peering creates a direct, high-bandwidth connection between two VNets using Microsoft's backbone network.\n\nTwo types:\n• Regional peering — VNets in the same Azure region.\n• Global peering — VNets in different regions. Slightly higher latency.\n\nCritical details:\n• Must be created from BOTH sides — each VNet needs a peering link to the other.\n• Address spaces CANNOT overlap between peered VNets.\n• NON-TRANSITIVE — A↔B and B↔C does NOT mean A↔C. Each pair needs its own peering.\n• Traffic uses private IPs — never goes over the public internet.\n• You can control: Allow/block forwarded traffic, Allow/block gateway transit, Allow/block virtual network access.\n\nGateway transit: If VNet-A has a VPN Gateway, you can enable 'Allow gateway transit' on A and 'Use remote gateway' on B. This lets VNet-B use VNet-A's gateway to reach on-premises networks — no need for B to have its own gateway.\n\nHub-spoke topology: A common pattern. The 'hub' VNet has shared services (firewall, VPN gateway). 'Spoke' VNets peer to the hub. Spokes don't peer to each other — they route through the hub using UDRs.",
        keyTerms: ["Regional peering", "Global peering", "Non-transitive", "Gateway transit", "Hub-spoke topology"],
        tips: ["Peering is NON-TRANSITIVE — A↔B + B↔C ≠ A↔C.", "Address spaces CANNOT overlap between peered VNets.", "Gateway transit lets one VNet share its VPN gateway with peers."],
        warning: "Exam trap #1: Peering is NON-TRANSITIVE. Exam trap #2: You must create peering from BOTH sides. Exam trap #3: Overlapping address spaces prevent peering."
      },
      {
        title: "VPN Gateway vs ExpressRoute — Comparison Table",
        content: "VPN Gateway:\n• Connection: Encrypted tunnel over public internet.\n• Types: S2S (site-to-site for offices), P2S (point-to-site for individuals), VNet-to-VNet.\n• Bandwidth: Up to ~1.25 Gbps (depends on SKU).\n• Encryption: Always encrypted (IPsec/IKE).\n• Cost: Lower.\n• Setup: Requires GatewaySubnet (/27 or larger). Takes 30-45 minutes to deploy.\n• Use case: Remote offices, dev/test, smaller workloads.\n\nExpressRoute:\n• Connection: Private dedicated link through a connectivity provider (AT&T, Equinix, etc.).\n• Bandwidth: Up to 100 Gbps.\n• Encryption: NOT encrypted by default. Must add VPN on top for encryption.\n• Latency: Lower and more predictable than VPN.\n• Cost: Significantly higher.\n• Use case: Mission-critical workloads, large data transfers, regulatory compliance requiring private connectivity.\n\nCombination: You can use ExpressRoute as the primary connection with VPN Gateway as a failover.",
        keyTerms: ["Site-to-Site (S2S)", "Point-to-Site (P2S)", "GatewaySubnet", "ExpressRoute Circuit", "Private Peering", "Microsoft Peering"],
        tips: ["ExpressRoute does NOT encrypt by default — add VPN for encryption.", "VPN Gateway requires a GatewaySubnet — must be /27 or larger.", "P2S is for individual devices (laptops), S2S is for connecting entire networks."]
      }
    ],
    extraQuiz: [
      {
        q: "VNet-A (10.0.0.0/16) and VNet-B (10.0.0.0/16) have the same address space. Can you peer them?",
        options: ["Yes — peering works regardless", "No — overlapping address spaces prevent peering", "Only with Global Peering", "Only if they're in different regions"],
        correct: 1,
        explanation: "Overlapping address spaces prevent VNet peering. Azure wouldn't know how to route traffic between two networks with the same IP range. You must use non-overlapping address spaces."
      }
    ]
  },
  6: {
    examWeight: "Part of 'Implement & manage virtual networking' — 15-20% of exam",
    extraConcepts: [
      {
        title: "Load Balancer SKUs & Session Persistence",
        content: "Two SKUs:\n• Basic — Free, limited features, no SLA, no availability zones, max 300 instances. Being retired.\n• Standard — Zone-redundant, 99.99% SLA, up to 1000 instances, supports availability zones, outbound rules, diagnostics. Use this for production.\n\nSession persistence (stickiness) options:\n• None — Default. Each request may go to a different backend.\n• Client IP — Same client IP always goes to same backend.\n• Client IP and protocol — Same client IP + protocol goes to same backend.\n\nHealth probe types:\n• TCP — Check if port is open.\n• HTTP/HTTPS — Check for HTTP 200 response from a specific path.\n\nInbound NAT rules: Forward specific port on the frontend to a specific port on a specific backend VM. Example: Frontend port 50001 → VM1:3389, Frontend port 50002 → VM2:3389 (for RDP to individual VMs behind a load balancer).",
        keyTerms: ["Basic SKU", "Standard SKU", "Health probe", "Session persistence", "Inbound NAT rule", "Backend pool"],
        tips: ["Standard SKU is recommended for ALL production workloads.", "Basic SKU is being retired — the exam heavily favors Standard.", "Health probes: use HTTP probes for web apps (check a health endpoint), TCP for other services."]
      }
    ],
    extraQuiz: [
      {
        q: "You need Layer 7 load balancing with URL-based routing and a Web Application Firewall. Which service?",
        options: ["Azure Load Balancer", "Azure Application Gateway", "Azure Traffic Manager", "Azure Front Door"],
        correct: 1,
        explanation: "Application Gateway operates at Layer 7 (HTTP/HTTPS) and provides URL-based routing, SSL termination, and WAF. Load Balancer is Layer 4 only."
      }
    ]
  },
  7: {
    examWeight: "'Implement & manage storage' — 15-20% of exam",
    extraConcepts: [
      {
        title: "Storage Account Types & Performance Tiers",
        content: "Storage account types:\n• Standard general-purpose v2 (GPv2) — The recommended default. Supports all storage services (Blob, File, Queue, Table). Uses HDDs.\n• Premium block blobs — SSD-backed, low-latency block blob storage.\n• Premium file shares — SSD-backed Azure Files with SMB and NFS.\n• Premium page blobs — SSD-backed for VM disks (VHD files).\n\nRedundancy deep dive:\n• LRS (Locally Redundant) — 3 copies in ONE datacenter. Cheapest. 11 nines durability.\n• ZRS (Zone Redundant) — 3 copies across 3 availability zones in ONE region. Better availability.\n• GRS (Geo-Redundant) — 3 copies locally (LRS) + 3 async copies in paired region. 16 nines durability.\n• RA-GRS (Read-Access GRS) — GRS + read access to secondary region data.\n• GZRS — ZRS locally + GRS to paired region.\n• RA-GZRS — GZRS + read access to secondary.\n\nAccess tiers (per blob, not per account for GPv2):\n• Hot — Highest storage cost, lowest access cost. Active data.\n• Cool — Lower storage, higher access. 30-day minimum hold.\n• Cold — Even lower storage, higher access. 90-day minimum hold.\n• Archive — Cheapest storage, most expensive access. 180-day minimum. Offline — must rehydrate (hours).\n\nLifecycle management: Policies auto-transition blobs between tiers based on age. Example: Move to Cool after 30 days, Archive after 90 days, delete after 365 days.",
        keyTerms: ["GPv2", "LRS", "ZRS", "GRS", "RA-GRS", "Hot", "Cool", "Cold", "Archive", "Lifecycle management"],
        tips: ["RA-GRS allows READ from the secondary region. Regular GRS does NOT.", "Archive tier: offline storage, requires rehydration (up to 15 hours for standard priority).", "Lifecycle management rules can move, delete, or change tier based on last modified/accessed time."],
        warning: "Exam critical: Know ALL redundancy options and what they protect against. LRS = rack failure. ZRS = datacenter failure. GRS = region failure."
      },
      {
        title: "Storage Security — SAS Tokens, Access Keys & Network Rules",
        content: "Authentication methods (in order of security):\n1. Microsoft Entra ID (Azure AD) — Best. Role-based access using RBAC roles like 'Storage Blob Data Reader'.\n2. Shared Access Signatures (SAS) — Time-limited, scoped tokens.\n3. Access Keys — Root passwords to the storage account. Two keys for rotation.\n\nSAS Token types:\n• Account SAS — Grants access to one or more storage services.\n• Service SAS — Grants access to a specific service (Blob, File, Queue, Table).\n• User Delegation SAS — Most secure SAS. Signed with Entra ID credentials instead of account key. Only for Blob storage.\n\nSAS parameters: permissions (read/write/delete), start/expiry time, allowed IP ranges, allowed protocols (HTTPS only recommended), resource types.\n\nStored Access Policies: Attach to a container. Define permissions and expiry. SAS tokens can reference the policy — allows you to revoke SAS tokens by modifying the policy. Maximum 5 stored access policies per container.\n\nNetwork security:\n• Storage Firewall — Allow/deny traffic from specific IPs, VNets, or subnets.\n• Service Endpoints — Optimal routing from VNet to storage over Microsoft backbone.\n• Private Endpoints — Give storage a private IP in your VNet. Traffic never goes over the internet.\n• Public network access can be disabled entirely.",
        keyTerms: ["Access Keys", "SAS Token", "User Delegation SAS", "Stored Access Policy", "Service Endpoint", "Private Endpoint", "Storage Firewall"],
        tips: ["User Delegation SAS is the most secure SAS type — signed with Entra ID, not account keys.", "Access keys = root passwords. NEVER put them in code. Use SAS or Managed Identity instead.", "Private Endpoints > Service Endpoints for security (private IP vs optimal routing).", "Stored Access Policies let you revoke SAS tokens after issuance — very important."],
        warning: "Exam security question pattern: 'What's the MOST SECURE way to grant limited access to storage?' Answer: User Delegation SAS (if Blob) or Stored Access Policy-backed SAS."
      }
    ],
    extraQuiz: [
      {
        q: "You need to give a contractor read access to a specific blob container for 24 hours using the MOST secure method. What should you use?",
        options: ["Share the storage account access key", "Create a User Delegation SAS token", "Make the container public", "Create a new Entra ID user for the contractor"],
        correct: 1,
        explanation: "User Delegation SAS is the most secure SAS type. It's signed with Entra ID credentials (not account keys), time-limited, and scoped to specific permissions and containers."
      },
      {
        q: "A blob in the Archive tier needs to be accessed. What must happen first?",
        options: ["Nothing — it's immediately accessible", "The blob must be rehydrated to Hot or Cool tier (takes hours)", "The storage account must be upgraded", "You need to contact Microsoft support"],
        correct: 1,
        explanation: "Archive tier blobs are OFFLINE. They must be rehydrated (moved to Hot or Cool) before data can be read. Standard priority rehydration takes up to 15 hours. High priority is faster but costs more."
      }
    ]
  },
  8: {
    examWeight: "Part of 'Deploy & manage compute resources' — 20-25% of exam",
    extraConcepts: [
      {
        title: "VM Sizes, Series & Disk Types",
        content: "VM Size families (know the use cases):\n• B-series — Burstable. Baseline CPU with burst credits. Great for dev/test, small databases, low-traffic web servers. Cost-effective.\n• D-series — General purpose. Balanced CPU/memory. Most common for production.\n• E-series — Memory optimized. High memory-to-CPU ratio. Databases, caching, in-memory analytics.\n• F-series — Compute optimized. High CPU-to-memory ratio. Batch processing, gaming servers.\n• N-series — GPU-enabled. Machine learning, video rendering, gaming.\n• L-series — Storage optimized. High throughput, large local disks. Big data, data warehouses.\n\nDisk types:\n• Standard HDD — Cheapest. Max 500 IOPS. Dev/test, backups.\n• Standard SSD — Better latency. Max 6,000 IOPS. Web servers, light production.\n• Premium SSD — Production workloads. Up to 20,000 IOPS. Guaranteed performance.\n• Ultra Disk — Extreme performance. Up to 160,000 IOPS. Sub-millisecond latency. SAP HANA, transaction-heavy databases.\n\nManaged vs Unmanaged disks: ALWAYS use Managed Disks. Azure handles the storage account underneath. Unmanaged disks (you manage the storage account) are legacy.",
        keyTerms: ["B-series", "D-series", "E-series", "F-series", "N-series", "Standard HDD", "Standard SSD", "Premium SSD", "Ultra Disk", "Managed Disk"],
        tips: ["B-series is great for variable workloads — you accumulate CPU credits during low usage and burst during high.", "Premium SSD is required for single-instance VM SLA (99.9%).", "Always use Managed Disks — unmanaged is legacy and has no advantage."]
      },
      {
        title: "Availability Sets vs Availability Zones vs Scale Sets",
        content: "Three approaches to VM resilience:\n\n1. Availability Sets — Protect against hardware failures WITHIN a datacenter.\n   • Fault Domains (FD) — Separate racks with independent power/network. Up to 3 FDs.\n   • Update Domains (UD) — Groups that reboot sequentially during planned maintenance. Up to 20 UDs.\n   • SLA: 99.95% for 2+ VMs in an availability set.\n   • Free — no additional cost.\n\n2. Availability Zones — Protect against datacenter failures WITHIN a region.\n   • Each zone is a physically separate datacenter.\n   • At least 3 zones per enabled region.\n   • SLA: 99.99% for 2+ VMs across 2+ zones.\n   • Highest VM SLA available.\n\n3. Virtual Machine Scale Sets (VMSS) — Groups of identical, auto-scaling VMs.\n   • Scale from 0 to 1,000 instances (or 600 with custom images).\n   • Autoscale rules based on metrics (CPU, memory, queue depth, custom).\n   • Can span availability zones for both HA and auto-scaling.\n   • Supports rolling updates and automatic OS image upgrades.\n\nYou CANNOT change the availability option after VM creation. Choose before deploying.",
        keyTerms: ["Fault Domain", "Update Domain", "Availability Set (99.95%)", "Availability Zone (99.99%)", "VMSS", "Autoscale"],
        tips: ["Zones > Sets for SLA: 99.99% vs 99.95%.", "You can't change availability options after VM creation.", "Scale Sets support scale-to-zero and up to 1,000 instances.", "Single VM with Premium SSD = 99.9% SLA."],
        warning: "Know the SLAs: Single VM with Premium SSD = 99.9%. Availability Set = 99.95%. Availability Zones = 99.99%."
      }
    ],
    extraQuiz: [
      {
        q: "You need the highest possible SLA for your VMs. What should you use?",
        options: ["Single VM with Premium SSD (99.9%)", "Availability Set (99.95%)", "Availability Zones (99.99%)", "VM Scale Set without zones"],
        correct: 2,
        explanation: "Availability Zones provide 99.99% SLA — the highest for VMs. Each zone is a separate datacenter. You need 2+ VMs across 2+ zones."
      },
      {
        q: "You deployed a VM into an Availability Set. Can you later move it to an Availability Zone?",
        options: ["Yes — just change the setting in the portal", "No — you must recreate the VM", "Yes — with a PowerShell script", "Only during a maintenance window"],
        correct: 1,
        explanation: "You CANNOT change the availability option after VM creation. To move from an Availability Set to an Availability Zone, you must recreate the VM."
      }
    ]
  },
  9: {
    examWeight: "Part of 'Deploy & manage compute resources' — 20-25% of exam",
    extraConcepts: [
      {
        title: "App Service Plans — Tiers & Feature Matrix",
        content: "Every App Service runs on an App Service Plan which determines the compute resources and features:\n\n• Free (F1) — Shared infrastructure. 60 min/day compute. No SLA, no custom domains. Dev/test only.\n• Shared (D1) — Shared infrastructure. 240 min/day. Custom domains but no SSL bindings.\n• Basic (B1-B3) — Dedicated VMs. Up to 3 instances. No auto-scale, no slots. Small production.\n• Standard (S1-S3) — Dedicated VMs. Up to 10 instances. Auto-scale, 5 deployment slots, daily backups, VNet integration. Production tier.\n• Premium (P1v3-P3v3) — Enhanced performance. Up to 30 instances. 20 slots, more storage, staging environments. High-scale production.\n• Isolated (I1v2-I3v2) — Runs in your own App Service Environment (ASE) inside your VNet. Maximum isolation, scale, and security. Enterprise.\n\nKey feature boundaries:\n• Custom domains: Shared tier and above.\n• SSL certificates: Basic and above.\n• Deployment slots: Standard and above.\n• Auto-scale: Standard and above.\n• VNet integration: Standard and above.\n• 10 instances max: Standard. 30 instances: Premium. 100: Isolated.\n\nMultiple apps can share one App Service Plan — they share the same VM instances.",
        keyTerms: ["Free", "Shared", "Basic", "Standard", "Premium", "Isolated", "App Service Plan", "Deployment Slot"],
        tips: ["Deployment Slots require STANDARD tier or above. Not available in Free, Shared, or Basic.", "Multiple web apps can share one plan — cost optimization.", "Isolated tier runs in an App Service Environment (ASE) inside your VNet."],
        warning: "Exam question pattern: 'What's the minimum tier for <feature>?' Slots = Standard. Auto-scale = Standard. VNet integration = Standard."
      },
      {
        title: "Containers — ACI vs Container Apps vs AKS",
        content: "Three container options, from simplest to most complex:\n\n1. Azure Container Instances (ACI) — Simplest. Run a single container (or container group) without orchestration. No VMs, no Kubernetes. Starts in seconds. Per-second billing. Use for: batch jobs, CI/CD agents, quick demos, short-lived tasks.\n\n2. Azure Container Apps — Serverless containers with built-in scaling, traffic splitting, and Dapr integration. Built on Kubernetes but you DON'T manage the cluster. Scale-to-zero. Use for: microservices, APIs, event-driven apps, long-running web services.\n\n3. Azure Kubernetes Service (AKS) — Full Kubernetes cluster. You manage nodes, scaling, networking, upgrades. Maximum control and complexity. Use for: complex microservices architectures, teams with Kubernetes expertise.\n\nContainer Registry (ACR): A private Docker registry to store your container images. Tiers: Basic, Standard, Premium (with geo-replication).",
        keyTerms: ["ACI", "Container Apps", "AKS", "Container Registry (ACR)", "Scale-to-zero", "Container Group"],
        tips: ["ACI = quick and simple, short-lived tasks. Container Apps = serverless microservices. AKS = full Kubernetes.", "Container Apps can scale to zero — no cost when idle.", "ACR stores your images. Integrate with ACI, Container Apps, or AKS."]
      }
    ],
    extraQuiz: [
      {
        q: "You need a serverless container platform that auto-scales and supports traffic splitting between revisions. Which service?",
        options: ["Azure Container Instances", "Azure Container Apps", "Azure Kubernetes Service", "Azure App Service"],
        correct: 1,
        explanation: "Container Apps is the serverless container platform with built-in auto-scaling (including scale-to-zero), traffic splitting between revisions, and Dapr integration — without managing Kubernetes."
      }
    ]
  },
  10: {
    examWeight: "Part of 'Monitor & maintain Azure resources' — 10-15% of exam",
    extraConcepts: [
      {
        title: "Recovery Services Vault vs Backup Vault",
        content: "Azure has TWO vault types for backup:\n\n1. Recovery Services Vault — The older, broader vault. Supports:\n   • Azure VM backup\n   • Azure Files backup\n   • SQL Server in Azure VM\n   • SAP HANA in Azure VM\n   • On-premises (MARS agent, MABS, DPM)\n   • Azure Site Recovery\n\n2. Backup Vault — The newer vault type. Supports:\n   • Azure Disk Backup\n   • Azure Blob Backup\n   • Azure Database for PostgreSQL\n   • Azure Kubernetes Service (AKS)\n\nBoth vaults must be in the SAME region as the protected resources. You can use multiple vaults for different resource types.\n\nBackup policies define:\n• Schedule — How often (daily, weekly).\n• Retention — How long to keep backups (daily: X days, weekly: X weeks, monthly: X months, yearly: X years).\n• Snapshot retention — Instant restore from local snapshots (1-5 days for Standard, up to 30 for Enhanced).\n\nSoft delete: Deleted backup data retained for 14 extra days. Protects against ransomware/accidental deletion. Enabled by default.",
        keyTerms: ["Recovery Services Vault", "Backup Vault", "Backup Policy", "Soft Delete (14 days)", "Instant Restore", "MARS Agent"],
        tips: ["Recovery Services Vault = VM, Files, SQL, SAP, Site Recovery. Backup Vault = Disk, Blob, PostgreSQL, AKS.", "Vault must be in the SAME region as protected resources.", "Soft delete = 14 days of protection after backup deletion. Enabled by default."]
      },
      {
        title: "Azure Site Recovery — RPO, RTO & Failover",
        content: "Azure Site Recovery (ASR) replicates workloads for disaster recovery.\n\nKey metrics:\n• RPO (Recovery Point Objective) — Maximum acceptable DATA LOSS measured in time. RPO of 4 hours = your most recent recovery point is at most 4 hours old. Lower RPO = more frequent replication = less data loss.\n• RTO (Recovery Time Objective) — Maximum acceptable DOWNTIME. RTO of 2 hours = systems must be back up within 2 hours of a disaster.\n\nScenarios:\n• Azure-to-Azure — Replicate VMs from one region to another. Most common for Azure DR.\n• VMware-to-Azure — Replicate on-premises VMware VMs to Azure.\n• Hyper-V-to-Azure — Replicate Hyper-V VMs.\n• Physical servers-to-Azure.\n\nFailover types:\n• Test failover — Validates DR plan in an isolated network. No production impact.\n• Planned failover — Graceful failover with no data loss (source is shut down cleanly first).\n• Unplanned failover — Emergency failover when the primary site is down. Possible data loss up to RPO.\n• Failback — Returning to the original primary site after the disaster is resolved.\n\nRecovery Plans: Automate failover sequence. Can include PowerShell scripts, manual actions, and ordering (group 1 starts before group 2).",
        keyTerms: ["RPO", "RTO", "Test failover", "Planned failover", "Failback", "Recovery Plan"],
        tips: ["RPO = max data loss. RTO = max downtime. Know these cold.", "Test failover = safe validation. No production impact.", "Recovery Plans automate and sequence the failover of multiple VMs."],
        warning: "Exam must-know: RPO = data loss tolerance (time). RTO = downtime tolerance (time). Test failover uses an isolated network."
      }
    ],
    extraQuiz: [
      {
        q: "RTO of 2 hours means:",
        options: ["You can lose up to 2 hours of data", "Your systems must be restored within 2 hours", "Backups run every 2 hours", "Replication takes 2 hours"],
        correct: 1,
        explanation: "RTO (Recovery Time Objective) is the maximum acceptable DOWNTIME. Within 2 hours, systems must be operational again. RPO is the data loss metric."
      }
    ]
  },
  11: {
    examWeight: "Part of 'Monitor & maintain Azure resources' — 10-15% of exam",
    extraConcepts: [
      {
        title: "Azure Monitor Data Types — Metrics vs Logs",
        content: "Azure Monitor collects two fundamental data types:\n\n1. Metrics — Numerical time-series data collected at regular intervals.\n   • Lightweight, near-real-time (1-minute granularity).\n   • Examples: CPU percentage, disk IOPS, network bytes in/out, request count.\n   • Stored for 93 days (can be exported for longer retention).\n   • Visualized in Metrics Explorer with charts and dashboards.\n   • Used for: autoscale triggers, real-time dashboards, quick diagnosis.\n\n2. Logs — Rich, structured event data.\n   • Stored in Log Analytics Workspace.\n   • Queried with KQL (Kusto Query Language).\n   • Types: Activity Logs (control plane), Resource Logs (diagnostic data), Application Logs.\n   • Retained per workspace settings (31 days free, configurable up to 730 days).\n   • Used for: deep investigation, complex queries, compliance, auditing.\n\nActivity Log specifically captures management-plane operations: who created/deleted/modified resources, when, from where. Retained for 90 days. Can be exported to Log Analytics for longer retention and querying.\n\nDiagnostic Settings route resource-specific logs and metrics to destinations: Log Analytics Workspace, Storage Account, Event Hub, or Partner Solutions.",
        keyTerms: ["Metrics", "Logs", "Activity Log", "Diagnostic Settings", "Log Analytics Workspace", "KQL"],
        tips: ["Metrics = real-time, lightweight, 93-day retention. Logs = rich, queryable, configurable retention.", "Activity Log = control-plane audit trail (90-day default retention).", "Diagnostic Settings are per-resource — you must enable them on each resource you want to monitor."]
      },
      {
        title: "KQL (Kusto Query Language) — Basics for the Exam",
        content: "KQL is the query language for Log Analytics. It's NOT SQL — different syntax.\n\nBasic structure: TableName | operator | operator | ...\n\nEssential operators you should know:\n• where — Filter rows: Heartbeat | where TimeGenerated > ago(1h)\n• project — Select columns: ... | project Computer, TimeGenerated\n• summarize — Aggregate: ... | summarize count() by Computer\n• count — Count rows: ... | count\n• top — Top N rows: ... | top 10 by TimeGenerated desc\n• ago() — Time function: ago(1h), ago(7d), ago(30m)\n• extend — Add calculated column: ... | extend DurationMinutes = Duration / 60\n• render — Visualize: ... | render timechart\n\nCommon queries:\n• Find VMs not sending heartbeats: Heartbeat | summarize LastHeartbeat = max(TimeGenerated) by Computer | where LastHeartbeat < ago(5m)\n• Count errors: AzureDiagnostics | where Level == \"Error\" | summarize count() by ResourceId\n• Track activity: AzureActivity | where OperationName == \"Delete Virtual Machine\" | project Caller, TimeGenerated",
        keyTerms: ["KQL", "where", "project", "summarize", "count", "ago()", "extend", "render"],
        tips: ["KQL uses pipe (|) to chain operators, like Linux bash.", "ago() is used constantly: ago(1h) = 1 hour ago, ago(7d) = 7 days ago.", "The exam may show you a KQL query and ask what it does, or ask you to choose the right query for a scenario."]
      },
      {
        title: "Alerts, Action Groups & Alert Processing Rules",
        content: "Alert Rules have three components:\n1. Scope — What resource(s) to monitor.\n2. Condition — The signal and logic. Examples: CPU > 90% for 5 min, specific log query returns results, Activity Log event occurs.\n3. Actions — What to do when fired (via Action Groups).\n\nAlert types:\n• Metric alerts — Based on metric thresholds. Near-real-time.\n• Log alerts — Based on KQL queries. Run at configured intervals.\n• Activity log alerts — Based on control-plane events (VM deleted, role assigned, etc.).\n• Smart detection alerts — Application Insights auto-detects anomalies.\n\nSeverity levels: Sev 0 (Critical) → Sev 4 (Verbose).\n\nAction Groups define WHO to notify and HOW:\n• Email/SMS/Push/Voice\n• Azure Function, Logic App, Webhook\n• ITSM connector (ServiceNow, etc.)\n• Automation Runbook\n• Event Hub\n\nAction Groups are REUSABLE — one group can be shared across many alert rules.\n\nAlert Processing Rules: Control how alerts are handled. Examples:\n• Suppress notifications during maintenance windows.\n• Add action groups to all alerts in a subscription.\n• Filter which alerts trigger which actions.",
        keyTerms: ["Alert Rule", "Metric alert", "Log alert", "Activity log alert", "Severity (0-4)", "Action Group", "Alert Processing Rule"],
        tips: ["Action Groups are reusable — define once, attach to many alerts.", "Alert Processing Rules can suppress notifications during maintenance.", "Severity 0 = Critical, Severity 4 = Verbose. The exam tests this."]
      }
    ],
    extraQuiz: [
      {
        q: "You need to query Azure Monitor logs to find VMs that haven't sent a heartbeat in 5 minutes. Which language do you use?",
        options: ["SQL", "PowerShell", "KQL (Kusto Query Language)", "Python"],
        correct: 2,
        explanation: "Log Analytics uses KQL. The query would be: Heartbeat | summarize LastHeartbeat = max(TimeGenerated) by Computer | where LastHeartbeat < ago(5m)"
      },
      {
        q: "You want to suppress alert notifications during a scheduled maintenance window on Saturday night. What do you configure?",
        options: ["Disable all alert rules", "Create an Alert Processing Rule with suppression", "Delete the Action Group temporarily", "Change alert severity to Verbose"],
        correct: 1,
        explanation: "Alert Processing Rules can suppress notifications for specific time windows without disabling the alert rules themselves. The alerts still fire and are logged, but notifications are suppressed."
      }
    ]
  }
};

// Merge deep content into MODULES at runtime
if (typeof MODULES !== 'undefined') {
  MODULES.forEach(mod => {
    const deep = DEEP_CONTENT[mod.id];
    if (deep) {
      if (deep.examWeight) mod.examWeight = deep.examWeight;
      if (deep.extraConcepts) mod.concepts = [...mod.concepts, ...deep.extraConcepts];
      if (deep.extraQuiz) mod.quiz = [...mod.quiz, ...deep.extraQuiz];
    }
  });
}
