// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/card';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-6 text-center rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-white">Bienvenue sur IpssiMétéo</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Découvrez la météo en temps réel pour n'importe quelle ville dans le monde</p>
        <Link 
          to="/pays" 
          className="inline-block px-6 py-3 bg-accent hover:bg-amber-600 text-lg font-medium text-white rounded-lg transition-colors"
        >
          Consulter la météo
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="h-full" title="Données Météo en 'Temps Réel'">
          <p>Accédez aux informations météorologiques les plus "récentes" pour toute les capitales du monde.</p>
        </Card>
        
        <Card className="h-full" title="Navigation Simple">
          <p>Interface intuitive permettant de naviguer facilement entre pays et villes pour consulter la météo.</p>
        </Card>
        
        <Card className="h-full" title='Prévisions "Détaillées"'>
          <p>Consultez les prévisions détaillées incluant température, humidité, vitesse du vent et plus encore.</p>
        </Card>
      </div>
    </div>
  );
}
