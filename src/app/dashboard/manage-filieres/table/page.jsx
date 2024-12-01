"use client";
import React from "react";
import Timetable from "./timeTable";

const timetableData = [
  {
    id: 1,
    jour: "LUNDI",
    seance: "SEANCE_1",
    typeSeance: "COURS",
    chargeHoraire: {
      id: 10,
      filiere: {
        id: 6,
        name: "G.Info1",
        capacity: 60,
      },
      matiere: {
        id: 6,
        name: "Electricite 2",
      },
      heuresCours: 10,
      heuresTP: 6,
      heuresTD: 22,
    },
    salle: {
      id: 1,
      name: "K1",
      location: "Khadija Etage 1",
      numberOfSeats: 200,
      type: "COURS",
    },
    user: {
      id: 12,
      username: "prof1",
      password: "password1",
      email: "prof1@example.com",
      role: "PROFESSEUR",
      verificationToken: "token1",
      validate: true,
    },
  },
  {
    id: 2,
    jour: "LUNDI",
    seance: "SEANCE_2",
    typeSeance: "TD",
    chargeHoraire: {
      id: 10,
      filiere: {
        id: 6,
        name: "G.Info1",
        capacity: 60,
      },
      matiere: {
        id: 6,
        name: "Electricite 2",
      },
      heuresCours: 10,
      heuresTP: 6,
      heuresTD: 22,
    },
    salle: {
      id: 3,
      name: "K3",
      location: "Khadija Etage 2",
      numberOfSeats: 20,
      type: "TD",
    },
    user: {
      id: 12,
      username: "prof1",
      password: "password1",
      email: "prof1@example.com",
      role: "PROFESSEUR",
      verificationToken: "token1",
      validate: true,
    },
  },
  {
    id: 3,
    jour: "JEUDI",
    seance: "SEANCE_4",
    typeSeance: "TD",
    chargeHoraire: {
      id: 11,
      filiere: {
        id: 6,
        name: "G.Info1",
        capacity: 60,
      },
      matiere: {
        id: 8,
        name: "Analyse 1",
      },
      heuresCours: 10,
      heuresTP: 6,
      heuresTD: 22,
    },
    salle: {
      id: 3,
      name: "K3",
      location: "Khadija Etage 2",
      numberOfSeats: 20,
      type: "TD",
    },
    user: {
      id: 17,
      username: "prof6",
      password: "password6",
      email: "prof6@example.com",
      role: "PROFESSEUR",
      verificationToken: "token6",
      validate: true,
    },
  },
  {
    id: 4,
    jour: "JEUDI",
    seance: "SEANCE_1",
    typeSeance: "TP",
    chargeHoraire: {
      id: 8,
      filiere: {
        id: 6,
        name: "G.Info1",
        capacity: 60,
      },
      matiere: {
        id: 4,
        name: "Macanique 2",
      },
      heuresCours: 20,
      heuresTP: 6,
      heuresTD: 22,
    },
    salle: {
      id: 4,
      name: "K4",
      location: "Khadija Etage 2",
      numberOfSeats: 20,
      type: "TP",
    },
    user: {
      id: 15,
      username: "prof4",
      password: "password4",
      email: "prof4@example.com",
      role: "PROFESSEUR",
      verificationToken: "token4",
      validate: true,
    },
  },
  {
    id: 5,
    jour: "JEUDI",
    seance: "SEANCE_2",
    typeSeance: "TP",
    chargeHoraire: {
      id: 8,
      filiere: {
        id: 6,
        name: "G.Info1",
        capacity: 60,
      },
      matiere: {
        id: 4,
        name: "Macanique 2",
      },
      heuresCours: 20,
      heuresTP: 6,
      heuresTD: 22,
    },
    salle: {
      id: 4,
      name: "K4",
      location: "Khadija Etage 2",
      numberOfSeats: 20,
      type: "TP",
    },
    user: {
      id: 15,
      username: "prof4",
      password: "password4",
      email: "prof4@example.com",
      role: "PROFESSEUR",
      verificationToken: "token4",
      validate: true,
    },
  },
  {
    id: 6,
    jour: "JEUDI",
    seance: "SEANCE_3",
    typeSeance: "TP",
    chargeHoraire: {
      id: 10,
      filiere: {
        id: 6,
        name: "G.Info1",
        capacity: 60,
      },
      matiere: {
        id: 6,
        name: "Electricite 2",
      },
      heuresCours: 10,
      heuresTP: 6,
      heuresTD: 22,
    },
    salle: {
      id: 4,
      name: "K4",
      location: "Khadija Etage 2",
      numberOfSeats: 20,
      type: "TP",
    },
    user: {
      id: 15,
      username: "prof4",
      password: "password4",
      email: "prof4@example.com",
      role: "PROFESSEUR",
      verificationToken: "token4",
      validate: true,
    },
  },
];

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Weekly Timetable</h1>
      <Timetable data={timetableData} />
    </div>
  );
}

export default Home;
