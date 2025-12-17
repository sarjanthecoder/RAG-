"""
Embeddings Module
Handles vector embeddings and ChromaDB storage for RAG
"""

import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
from typing import List, Optional
import os


class EmbeddingsManager:
    """Manages embeddings and vector storage using ChromaDB"""
    
    def __init__(self, persist_directory: str = "./chroma_db", collection_name: str = "resume"):
        """
        Initialize the embeddings manager.
        
        Args:
            persist_directory: Directory to persist ChromaDB data
            collection_name: Name of the ChromaDB collection
        """
        self.persist_directory = persist_directory
        self.collection_name = collection_name
        
        # Initialize sentence transformer for embeddings
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Initialize ChromaDB client with persistence
        self.client = chromadb.Client(Settings(
            chroma_db_impl="duckdb+parquet",
            persist_directory=persist_directory,
            anonymized_telemetry=False
        ))
        
        # Get or create collection
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}
        )
    
    def add_documents(self, texts: List[str], metadatas: Optional[List[dict]] = None) -> None:
        """
        Add documents to the vector store.
        
        Args:
            texts: List of text chunks to embed and store
            metadatas: Optional list of metadata dicts for each chunk
        """
        if not texts:
            return
        
        # Generate embeddings
        embeddings = self.embedding_model.encode(texts).tolist()
        
        # Generate IDs
        existing_count = self.collection.count()
        ids = [f"doc_{existing_count + i}" for i in range(len(texts))]
        
        # Prepare metadatas
        if metadatas is None:
            metadatas = [{"source": "resume", "chunk_index": i} for i in range(len(texts))]
        
        # Add to collection
        self.collection.add(
            embeddings=embeddings,
            documents=texts,
            metadatas=metadatas,
            ids=ids
        )
    
    def search(self, query: str, n_results: int = 3) -> List[dict]:
        """
        Search for similar documents.
        
        Args:
            query: Search query text
            n_results: Number of results to return
            
        Returns:
            List of matching documents with scores
        """
        # Generate query embedding
        query_embedding = self.embedding_model.encode([query]).tolist()
        
        # Search collection
        results = self.collection.query(
            query_embeddings=query_embedding,
            n_results=n_results,
            include=["documents", "metadatas", "distances"]
        )
        
        # Format results
        documents = []
        if results["documents"] and results["documents"][0]:
            for i, doc in enumerate(results["documents"][0]):
                documents.append({
                    "content": doc,
                    "metadata": results["metadatas"][0][i] if results["metadatas"] else {},
                    "distance": results["distances"][0][i] if results["distances"] else 0
                })
        
        return documents
    
    def clear_collection(self) -> None:
        """Clear all documents from the collection"""
        self.client.delete_collection(self.collection_name)
        self.collection = self.client.get_or_create_collection(
            name=self.collection_name,
            metadata={"hnsw:space": "cosine"}
        )
    
    def get_document_count(self) -> int:
        """Get the number of documents in the collection"""
        return self.collection.count()
