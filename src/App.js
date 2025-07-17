import { useEffect, useState } from "react";

const program = {
  Lundi: {
    title: "Haut du corps & Core",
    rounds: 3,
    restBetweenRounds: 60,
    exercises: [
      { name: "Pompes classiques", duration: 30 },
      { name: "Pompes triceps", duration: 30 },
      { name: "Pompes diamants", duration: 30 },
      { name: "Planche dynamique", duration: 45 },
      { name: "Planche statique", duration: 45 }
    ],
    restBetweenExercises: 30
  }
};

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  speechSynthesis.speak(utterance);
}

export default function App() {
  const [day] = useState("Lundi");
  const [step, setStep] = useState(0);
  const session = program[day];
  const totalSteps = session.rounds * (session.exercises.length + 1) - 1;

  const currentRound = Math.floor(step / (session.exercises.length + 1)) + 1;
  const isRest = step % (session.exercises.length + 1) === session.exercises.length;
  const currentExercise = session.exercises[step % (session.exercises.length + 1)];

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  useEffect(() => {
    if (isRest) {
      speak(`Repos. Round ${currentRound + 1}`);
    } else {
      speak(`Prochain exercice : ${currentExercise.name}`);
    }
  }, [step, day]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Séance du {day}</h1>
      <h2>Round {currentRound} / {session.rounds}</h2>
      {isRest ? (
        <div style={{ color: "orange" }}>Repos : {session.restBetweenRounds} sec</div>
      ) : (
        <div>
          <strong>{currentExercise.name}</strong><br />
          Durée : {currentExercise.duration} sec
        </div>
      )}
      <button onClick={handleNext}>Suivant</button>
    </div>
  );
}
