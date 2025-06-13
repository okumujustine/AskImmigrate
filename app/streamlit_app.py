import streamlit as st
from chat_logic import chat

st.set_page_config(page_title="RAG Assistant", layout="centered")

st.title("🦜🔗 RAG Assistant")

session = st.text_input("Session ID", value="default")
question = st.text_input("Your question")

if st.button("Ask"):
    if not question:
        st.warning("Enter a question first.")
    else:
        with st.spinner("Thinking…"):
            response = chat(session, question)
        st.markdown("**Answer:**")
        st.write(response)
