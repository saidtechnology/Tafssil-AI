from typing import Dict, Optional
from app.config import settings


class AINotesGenerator:
    def __init__(self):
        self.ollama_host = settings.ollama_host
        self.model = "deepseek-r1:7b"

    def generate_notes(self, measurements: Dict, model_type: str, fabric: Optional[str] = None) -> Dict:
        prompt = self._build_prompt(measurements, model_type, fabric)
        try:
            import ollama
            client = ollama.Client(host=self.ollama_host)
            response = client.generate(model=self.model, prompt=prompt)
            return {"notes": response.response, "source": "ai"}
        except Exception as e:
            return {
                "notes": "AI notes unavailable. Ensure Ollama is running.",
                "source": "fallback",
                "error": str(e),
            }

    def _build_prompt(self, measurements: Dict, model_type: str, fabric: Optional[str]) -> str:
        return f"""You are a professional tailor. Analyze these measurements and provide recommendations.

Model: {model_type}
Measurements: {measurements}
Fabric: {fabric or 'Not specified'}

Provide:
1. Fit observations
2. Fabric recommendations
3. Adjustment suggestions
4. Potential issues"""
