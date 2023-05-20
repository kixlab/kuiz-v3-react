export const QUESTION_IDEA_GENERATION_PROMPT = (material: string) => `
Give three IDEAS (not questions) for making multiple choice questions from MATERIAL.

MATERIAL:
Laws
Work and energy
Examples
- Uniformly accelerated motion
- Uniform circular motion
- Harmonic motion
- Objects with variable mass
Rigid-body motion and rotation
- Center of mass
- Rotational analogues of Newton's laws
- Multi-body gravitational system
Relation to other physcial theories
- Thermodynamics and statistical pyhsics
- Electromagnetism
- Special relativity
- General relativity
- Quantum mechanics

IDEAS:
Newton's laws of motion
Limitations to Newton's laws
Publication date of Newton's laws

---

MAETERIAL:
Ethics fields' approaches
- Robot ethics
- Machine ethics
- Ethics principles of articificial intelligence
Ethical challenges
- Bias in AI systems
- Robot rights
- Artificial suffering
- Threats to human dignity
- Liability for self-driving cars
- Weaponization of AI
- Opaque algorithms
Singularity
Actors in AI ethics
- Intergovernmental initiatives
- Governmental initiatives
- Academic initiatives
- NGO initiatives
- Private organizations

IDEAS:
Ethics principles of artificial intelligence (transparency, accountability, and open source)
Ethical challenges including bias, privacy, and safety
Different actors in the AI ecosystem

---

MATERIAL:
${material}

IDEAS:
`
