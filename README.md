# AskImmigrate: Navigate US Immigration with an AI SideKick 🤖🇺🇸
## AAIDC2025
A developer repository and toolkit for building an AI-powered chat assistant that answers U.S. immigration questions using official forms, policy PDFs, and JSON data.

---

## Overview

AskImmigrate gives everyone—from first-time applicants to experienced advocates—a friendly, conversational guide to U.S. immigration. It reads official forms, policy PDFs, and your own JSON data, then finds the exact passages you need. No more wrestling with legal jargon or searching through stacks of documents: just ask your question and get clear, reliable answers to help you move closer to your American Dream.

## Target Audience

- Anyone seeking clear, quick answers about U.S. immigration processes
- Prospective immigrants planning for visas, green cards, or citizenship
- Legal advocates and community organizations supporting applicants
- Developers building chat-based or document-driven AI tools

## Prerequisites

- Python 3.10 or higher
- Basic familiarity with Python scripting
- Access to a Groq API key
- Ability to install Python packages via pip

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/okumujustine/AskImmigrate.git
   cd AskImmigrate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Environment Setup

1. Create a `.env` file in the project root.
2. Add your Groq key:
   ```bash
   GROQ_API_KEY=your-groq-api-key
   ```
3. Ensure JSON and PDF source files are accessible on disk.

## Usage

### CLI Interface

1. Ingest documents and JSON:
   ```bash
   python embed_documents.py
   ```
2. Launch the terminal chat with a question:
   ```bash
   python cli.py --question "What is the F1 visa?"
   ```
3. List all previous chat sessions:
   ```bash
   python cli.py --list_sessions
   ```
4. Continue a past session (replace \<session\_id> with the ID from list):
   ```bash
   python cli.py --session_id <session_id> --question "Next question text"
   ```

### React Application

1. **Run the back-end server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
2. Navigate to the `react-app` directory:
   ```bash
   cd react-app
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser at [http://localhost:3000](http://localhost:3000) to chat with AskImmigrate in the web UI.

## Methodology

1. **Ingestion**: split PDFs and JSON into text chunks
2. **Embedding**: compute embeddings with HuggingFace MiniLM
3. **Indexing**: store embeddings in Chroma vector DB
4. **Prompt Construction**: build system and user prompts via LangChain
5. **Query**: run semantic search + LLM call (Groq) to generate answers

## Performance

- Ingestion: \~100 documents per minute on moderate hardware
- Query: <500 ms per lookup and response on GPU-enabled machine
- Embedding dimension: 768 floats per chunk

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit with clear messages
4. Push to your fork
5. Open a pull request

## Changelog

- **v1.0.0** (Jun 2025): Initial release with ingestion, indexing, chat interface

## Citation

If you use AskImmigrate in academic work, please cite:

```
Geoffrey Duncan Opiyo, Justine Okumu, Deo Mugabe, Hillary Arinda (2025). AskImmigrate: An AI-powered chat assistant for U.S. immigration. GitHub. https://github.com/okumujustine/AskImmigrate
```

## Contact

Maintainers:&#x20;

1. Geoffrey Duncan Opiyo ([dunkygeoffrey39@gmail.com](mailto\:dunkygeoffrey39@gmail.com))

2. Justine Okumu ([okumujustine01@gmail.com](mailto\:okumujustine01@gmail.com))

3. Deo Mugabe([deo.mugabe7@gmail.com](mailto\:deo.mugabe7@gmail.com))

4. Hillary Arinda ([arinda.hillary@gmail.com](mailto\:arinda.hillary@gmail.com))

   GitHub Issues: [https://github.com/okumujustine/AskImmigrate/issues](https://github.com/dunky-star/AskImmigrate/issues)

