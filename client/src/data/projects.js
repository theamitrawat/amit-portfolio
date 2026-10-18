const preferredProjectOrder = [
  'enterprise-it-support-copilot',
  'medinsight-ai',
  'vendor-invoice-intelligence',
  'machine-failure-prediction',
]

export const projects = [
  {
    id: 'true-infra-solutions-dashboard',
    title: 'True Infra Solutions Dashboard',
    shortDescription:
      'Interactive demo business dashboard for construction and fit-out services, with project, client, financial, and AI-assisted analytics.',
    description:
      'Built a React dashboard that turns static sample project data into business insights for a construction and fit-out services demo. It includes an overview with KPIs and charts, filterable project tables, client summaries, deeper analytics, and an Ask AI page for natural-language questions about the sample data. The project is for learning and portfolio purposes, not official company work.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Recharts', 'Groq API'],
    thumbnailUrl: '/Projects%20Images/true_infra__solution.jpg',
    imageUrls: [],
    githubUrl: 'https://github.com/theamitrawat/True-Infra-Solutions-Dashboard',
    liveUrl: 'https://true-infra-solutions-dashboard.vercel.app/',
    featured: true,
    category: 'Frontend Development',
    highlights: [
      'Overview dashboard with project, revenue, cost, and profit KPIs',
      'Filterable project tables and client performance leaderboard',
      'Analytics for margins, monthly trends, markets, ratings, and services',
      'Ask AI interface for questions about dashboard data',
      'Built with React, Vite, Tailwind CSS, and Recharts',
    ],
    challenge:
      'Presenting project, client, service, and financial data in a clear way that makes business performance easy to explore.',
    solution:
      'Created an interactive multi-page dashboard with KPI cards, charts, filters, client summaries, and detailed analytics. Added a Groq-powered Ask AI page for natural-language questions about the sample business dataset.',
  },
  {
    id: 'customer-segmentation-analysis',
    title: 'Customer Behavior & Segmentation Analysis',
    shortDescription:
      'End-to-end customer analytics project using Python, SQL, and Power BI to explore shopping patterns and identify customer segments.',
    description:
      'Analyzed customer shopping behavior and purchasing patterns to identify customer segments, understand factors influencing purchases, and provide business recommendations. The workflow covers data cleaning and exploratory analysis in Python, customer and revenue analysis in SQL, and an interactive Power BI dashboard.',
    tags: ['Python', 'Pandas', 'NumPy', 'SQL', 'Power BI', 'EDA'],
    thumbnailUrl: '/Projects%20Images/customer_behavior_segmentation.jpg',
    imageUrls: [],
    githubUrl:
      'https://github.com/theamitrawat/Customer-Segmentation-Analysis-Python--SQL--Power-BI',
    liveUrl: null,
    featured: true,
    category: 'Data Analytics & BI',
    highlights: [
      'Cleaned and prepared customer data using Python',
      'Used SQL joins, aggregations, and CTEs for business analysis',
      'Analyzed customer segments, revenue contribution, and high-value customers',
      'Created a Power BI dashboard for sales trends, segments, and product performance',
      'Developed customer retention recommendations from the analysis',
    ],
    challenge:
      'Turning raw customer data into useful insights about shopping behavior, purchasing patterns, and customer value.',
    solution:
      'Built an end-to-end analysis workflow combining Python data preparation and exploratory analysis, SQL business queries, and Power BI visualizations to surface customer segments and actionable recommendations.',
  },
  {
    id: 'vendor-performance-analytics',
    title: 'Vendor Performance Analytics',
    shortDescription:
      'Python and SQLite analytics pipeline with a Power BI dashboard for vendor sales, profitability, freight, and inventory performance.',
    description:
      'Analyzed vendor, brand, purchasing, sales, freight, and inventory data for a retail liquor distribution business. Python ingestion and summary scripts load and combine data in SQLite; notebooks support exploratory analysis, KPI calculations, statistical testing, and visualizations; a Power BI dashboard presents vendor performance.',
    tags: ['Python', 'Pandas', 'SQLite', 'SQL', 'Power BI', 'Statistical Analysis'],
    thumbnailUrl: '/Projects%20Images/vendor_performance.jpg',
    imageUrls: [],
    githubUrl:
      'https://github.com/theamitrawat/Vendor-Performance-Analytics-Python-SQL-PowerBI',
    liveUrl: null,
    featured: true,
    category: 'Data Analytics & BI',
    highlights: [
      'Built a Python and SQLite data-ingestion and vendor-summary workflow',
      'Analyzed sales, profit margins, purchasing, freight, and inventory turnover',
      'Used statistical testing to compare vendor profit margins',
      'Presented vendor performance metrics in a Power BI dashboard',
    ],
    challenge:
      'Understanding vendor profitability, product margins, purchasing efficiency, and the impact of slow-moving inventory across large retail datasets.',
    solution:
      'Created a Python/SQLite pipeline to ingest and join vendor-related data, then used notebooks for KPI analysis, statistical testing, and visualization. Summarized the findings in a Power BI dashboard.',
  },
  {
    id: 'conversational-chatbot-langchain',
    title: 'End-to-End Conversational Chatbot',
    shortDescription:
      'Streamlit chatbot using LangChain and Groq with selectable language models, streaming responses, and session-based chat history.',
    description:
      'Built a browser-based conversational chatbot with Streamlit, LangChain, and Groq. Users can provide a Groq API key, choose a supported model, and chat with an AI assistant. The app streams responses, keeps chat history in Streamlit session state, shows example questions, and includes a clear-chat control.',
    tags: ['Python', 'Streamlit', 'LangChain', 'Groq API', 'LLM', 'Prompt Engineering'],
    thumbnailUrl: '/Projects%20Images/end_to_end_chatbot.jpg',
    imageUrls: [],
    githubUrl:
      'https://github.com/theamitrawat/End-To-End-Conversational-ChatBot-langchain',
    liveUrl: null,
    featured: true,
    category: 'AI / LLM Engineering',
    highlights: [
      'Select from multiple Groq language models in the sidebar',
      'Uses LangChain prompts and output parsing',
      'Streams AI responses in the chat interface',
      'Maintains chat history with Streamlit session state',
      'Includes example questions and a clear-chat button',
    ],
    challenge:
      'Making it straightforward to try different language models and have a responsive, continuous conversation in a simple browser interface.',
    solution:
      'Built a Streamlit chat experience that connects user-selected Groq models through LangChain, streams responses, and manages conversation history with session state.',
  },
  {
    id: 'enterprise-it-support-copilot',
    title: 'Enterprise IT Support Agentic RAG Copilot',
    shortDescription:
      'Agentic IT support assistant that searches a company knowledge base, evaluates retrieved evidence, and generates grounded answers.',
    description:
      'A web-based IT support assistant built with FastAPI, LangGraph, Groq, and ChromaDB. It searches a local company knowledge base first, grades the retrieved evidence, and uses Groq to generate grounded answers. When the private knowledge base is insufficient, it can optionally fall back to web search with Tavily.',
    tags: ['Python', 'FastAPI', 'LangGraph', 'Groq', 'ChromaDB', 'RAG', 'Tavily'],
    thumbnailUrl: '/Projects%20Images/Enterprise_IT_Support_Agentic_RAG_Copilot.jpg',
    imageUrls: [],
    githubUrl:
      'https://github.com/theamitrawat/Enterprise-IT-Support-Agentic-RAG-Copilot-main',
    liveUrl: 'https://enterprise-it-support-agentic-rag-9gzi.onrender.com/',
    featured: true,
    category: 'AI / LLM Engineering',
    highlights: [
      'Chat interface, JSON API, and document-upload endpoint',
      'Persistent ChromaDB storage with local deterministic embeddings',
      'Ingests PDF, TXT, Markdown, and DOCX documents',
      'Optional Tavily web-search fallback when internal knowledge is insufficient',
      'Docker and Render Blueprint deployment configuration',
    ],
    challenge:
      'IT support answers need to be grounded in company documentation, while avoiding unsupported responses when the available knowledge-base evidence is insufficient.',
    solution:
      'Built a LangGraph RAG workflow that retrieves information from a local ChromaDB knowledge base, grades the evidence, and generates grounded answers with Groq. Added document ingestion, a chat UI and JSON API, persistent storage, and optional Tavily web-search fallback.',
  },
  {
    id: 'insurance-premium-prediction-fastapi',
    title: 'Insurance Premium Prediction API',
    shortDescription:
      'FastAPI and scikit-learn service that predicts an insurance premium category from user and lifestyle features.',
    description:
      'Built a machine-learning API for insurance premium category prediction using FastAPI and a scikit-learn model. The service exposes a health endpoint and a validated prediction endpoint that takes user features such as BMI, age group, lifestyle risk, city tier, income, and occupation. The repository also includes a training script and dataset.',
    tags: ['Python', 'FastAPI', 'Scikit-Learn', 'Pandas', 'REST API', 'Machine Learning'],
    thumbnailUrl: '/Projects%20Images/insurance_premium_prediction.jpg',
    imageUrls: [],
    githubUrl: 'https://github.com/theamitrawat/insurance-premium-prediction-fastapi',
    liveUrl: null,
    featured: true,
    category: 'AI / Machine Learning',
    highlights: [
      'REST prediction endpoint at POST /predict',
      'Health endpoint reports model version and whether the model is loaded',
      'Uses scikit-learn to predict an insurance premium category',
      'Includes model training script and a 200-row dataset',
      'Docker configuration for running the API',
    ],
    challenge:
      'Insurance premium categories depend on several user attributes, making it useful to provide a simple API that accepts user features and returns a model prediction.',
    solution:
      'Implemented a FastAPI service around a trained scikit-learn model, with typed request and response schemas, a health check, and a prediction route. Added a training script and Dockerfile to support model training and API startup.',
  },
  {
    id: 'medinsight-ai',
    title: 'MedInsight AI — RAG Medical Assistant',
    shortDescription:
      'Production-grade RAG pipeline that answers medical queries from PDF, XML & CSV records with cited source snippets and streaming responses.',
    description:
      'Designed and built a Retrieval-Augmented Generation (RAG) medical assistant that ingests unstructured PDF, XML, and CSV medical records and answers user queries with context-grounded responses and cited source snippets — solving the problem of scattered, hard-to-search medical documentation. Features session-based chat history and one-click chat export.',
    tags: ['Python', 'LangChain', 'FAISS', 'ONNX Runtime', 'Groq API', 'Streamlit'],
    thumbnailUrl: '/Projects%20Images/medinsight_ai.jpg',
    imageUrls: [],
    githubUrl: 'https://github.com/theamitrawat/MedInsightAI',
    liveUrl: 'https://medinsightai-theamitrwt.streamlit.app/',
    featured: true,
    category: 'AI / LLM Engineering',
    highlights: [
      'ONNX-accelerated embeddings (all-MiniLM-L6-v2) for fast, lightweight inference',
      'FAISS vector indexing with similarity-based relevance scoring',
      'Groq-hosted LLM with streaming responses and prompt engineering',
      'Streamlit Cloud deployment — zero-config, production-ready',
    ],
    challenge:
      'Medical records are scattered across multiple formats (PDF, XML, CSV) and are hard to search or query in a unified way. Standard keyword search fails to retrieve contextually relevant information.',
    solution:
      'Engineered a full retrieval pipeline using ONNX-based embeddings (all-MiniLM-L6-v2), FAISS vector indexing, similarity-based relevance scoring, and prompt engineering to feed a Groq-hosted LLM. Delivered a production-style Streamlit app with streaming responses, session-based chat history, and chat export — kept lightweight for Streamlit Cloud deployment.',
  },
  {
    id: 'machine-failure-prediction',
    title: 'Predictive Maintenance Analytics Platform',
    shortDescription:
      'End-to-end ML platform using XGBoost to predict machine failures, compute health scores, and deliver actionable maintenance insights.',
    description:
      'Built an end-to-end predictive maintenance platform using an XGBoost classifier trained on 10,000 sensor records (11 features) to predict machine failures in advance and reduce unplanned downtime. Handles class imbalance via weighted loss (scale_pos_weight) and surfaces results through an interactive analytics dashboard.',
    tags: ['Python', 'XGBoost', 'Scikit-Learn', 'Streamlit', 'Plotly'],
    thumbnailUrl: '/Projects%20Images/machine_failure_and_maintainance.jpg',
    imageUrls: [],
    githubUrl:
      'https://github.com/theamitrawat/Machine-Failure-Prediction---Maintenance-Analytics-Platform',
    liveUrl:
      'https://machine-failure-prediction---maintenance-analytics-platform-it.streamlit.app/',
    featured: true,
    category: 'AI / Machine Learning',
    highlights: [
      'XGBoost classifier on 10,000 sensor records with 11 engineered features',
      'Class imbalance handled via scale_pos_weight — improved minority-class recall',
      'Live health score computation with 4-tier risk categorization',
      'Plotly dashboard with trend visualization and maintenance timeline estimates',
    ],
    challenge:
      'Industrial machines fail unexpectedly, causing costly unplanned downtime. Raw sensor data is hard to interpret and class imbalance makes failure prediction difficult with standard models.',
    solution:
      'Engineered the complete pipeline from preprocessing (label encoding, feature scaling) to model serialization and real-time inference. Designed a live analytics dashboard that computes health scores, categorizes risk into four tiers, estimates maintenance timelines, and visualizes trends through Plotly to support operator decision-making.',
  },
  {
    id: 'vendor-invoice-intelligence',
    title: 'Vendor Invoice Intelligence System',
    shortDescription:
      'ML-powered freight cost predictor (R² 0.963) and high-risk invoice classifier with a SQL-driven analytics dashboard.',
    description:
      'Built a freight cost prediction model (Linear Regression) achieving R² of 0.963 and RMSE of 124.66 — outperforming Random Forest and Decision Tree baselines — to automate logistics cost estimation from invoice data. Includes a Random Forest classifier for high-risk invoice flagging with an interactive Streamlit + Plotly dashboard.',
    tags: ['Python', 'Scikit-Learn', 'SQL', 'SQLite', 'Streamlit', 'Plotly'],
    thumbnailUrl: '/Projects%20Images/vendor_invoice_intelligence_system.jpg',
    imageUrls: [],
    githubUrl:
      'https://github.com/theamitrawat/Vendor-Invoice-Intelligence-System--Python--SQL--Scikit-Learn',
    liveUrl:
      'https://vendor-invoice-intelligence-system-theamitrawat.streamlit.app/',
    featured: true,
    category: 'AI / Machine Learning',
    highlights: [
      'Linear Regression freight model: R² = 0.963, RMSE = 124.66',
      'Outperforms Random Forest & Decision Tree baselines on the same dataset',
      'Random Forest classifier flags high-risk invoices with balanced class weights',
      'SQL-driven data pipelines joining vendor and purchase tables with 5 engineered features',
    ],
    challenge:
      'Manual logistics cost estimation was slow and error-prone. High-risk invoices were identified too late, reducing audit efficiency across vendor and purchase data.',
    solution:
      'Developed a Random Forest classifier with balanced class weights to flag high-risk invoices by joining vendor and purchase SQL tables and engineering 5 predictive features. Designed SQL-driven data pipelines and an interactive Streamlit + Plotly dashboard for freight prediction, invoice risk scoring, and model performance comparison.',
  },
].sort((first, second) => {
  const firstPosition = preferredProjectOrder.indexOf(first.id)
  const secondPosition = preferredProjectOrder.indexOf(second.id)

  if (firstPosition === -1 && secondPosition === -1) return 0
  if (firstPosition === -1) return 1
  if (secondPosition === -1) return -1
  return firstPosition - secondPosition
})
