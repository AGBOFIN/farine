# Farine De La Capitale

Site web professionnel et moderne pour Farine De La Capitale, une entreprise togolaise spécialisée dans la vente de farine instantanée pour la bouillie.

## 🚀 Technologies

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Laravel 12 (API REST), MySQL
- **Authentification**: Laravel Sanctum (JWT)
- **Design**: Couleurs inspirées de l'alimentation (jaune maïs, rouge, vert)

## 📋 Fonctionnalités

### Site Public
- **Accueil**: Hero moderne avec CTA WhatsApp et présentation des avantages
- **À propos**: Histoire, mission, qualité et engagement de l'entreprise
- **Notre farine**: Présentation du produit avec formats et prix en FCFA
- **Ingrédients**: Cartes illustrées (maïs, sorgho, banane plantain, soja, mil)
- **Pourquoi nous choisir**: 6 avantages clés avec icônes
- **Galerie**: Images des produits, logo et affiches
- **Témoignages**: Avis clients avec notation
- **Contact**: Informations de contact et carte Google Maps

### Intégrations
- **WhatsApp**: Bouton flottant et liens dynamiques avec messages préremplis
- **TikTok**: Intégration du profil et vidéos

### Administration
- **Tableau de bord**: Vue d'ensemble et statistiques
- **Gestion du contenu**: Modification de tous les textes du site
- **Gestion produit**: Prix, formats et images
- **Gestion ingrédients**: Ajout/modification/suppression
- **Galerie**: Upload et gestion des images
- **Témoignages**: Modération des avis clients
- **Paramètres**: Contact, réseaux sociaux et SEO

## 🛠️ Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- PHP 8.2+
- Composer
- MySQL 8+

### Frontend (Next.js)

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Démarrer en production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Backend (Laravel)

```bash
# Naviguer vers le dossier API
cd farine-api

# Installer les dépendances
composer install

# Configurer l'environnement
cp .env.example .env
php artisan key:generate

# Configurer la base de données dans .env
# DB_DATABASE=farine_capitale
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Exécuter les migrations
php artisan migrate

# Créer le lien de stockage
php artisan storage:link

# Lancer le serveur de développement
php artisan serve
```

L'API sera accessible sur [http://localhost:8000](http://localhost:8000)

## 📁 Structure du Projet

```
farine/                    # Frontend Next.js
├── src/
│   ├── app/              # Pages et routes
│   │   ├── admin/        # Administration
│   │   ├── a-propos/     # À propos
│   │   ├── contact/      # Contact
│   │   ├── ingredients/  # Ingrédients
│   │   ├── galerie/      # Galerie
│   │   ├── notre-farine/ # Produit
│   │   ├── temoignages/  # Témoignages
│   │   └── pourquoi-nous-choisir/ # Avantages
│   ├── components/       # Composants React
│   │   ├── admin/        # Composants admin
│   │   └── ui/           # Composants Shadcn UI
│   └── lib/              # Utilitaires et données
├── public/               # Fichiers statiques
└── package.json

farine-api/               # Backend Laravel (à créer)
├── app/
│   ├── Http/Controllers/ # Contrôleurs API
│   ├── Models/          # Modèles Eloquent
│   └── Http/Requests/   # Validation
├── database/
│   └── migrations/      # Migrations base de données
└── routes/
    └── api.php          # Routes API
```

## 🔐 Administration

Accédez au panneau d'administration via `/admin`

**Identifiants de démonstration**:
- Email: admin@farinedelacapitale.tg
- Mot de passe: (n'importe quel mot de passe en mode démo)

## 🎨 Design System

### Couleurs
- **Jaune maïs**: `#EAB308` - Couleur principale
- **Rouge accent**: `#DC2626` - Actions importantes
- **Vert santé**: `#16A34A` - Qualité et nature
- **Blanc**: Fond principal
- **Gris clair**: Sections alternatives

### Typographie
- **Police**: Inter (Google Fonts)
- **Tailles**: Responsive de base à heading

### Composants
- Shadcn UI pour les composants de base
- Framer Motion pour les animations
- Lucide React pour les icônes

## 📱 Responsive Design

Le site est optimisé pour:
- **Mobile**: < 768px
- **Tablette**: 768px - 1024px
- **Desktop**: > 1024px

## 🔗 Intégrations

### WhatsApp
Les liens WhatsApp sont générés dynamiquement avec des messages contextuels:
- Commande de produit
- Demande d'information
- Contact général

### TikTok
- Lien vers le profil dans le footer et page contact
- Section pour intégrer des vidéos (à implémenter avec l'API)

## 📊 SEO

- Sitemap XML automatique
- Robots.txt configuré
- Meta tags optimisés
- Open Graph pour le partage social
- Données structurées (à implémenter)

## 🚀 Déploiement

### Frontend (Vercel)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Backend (VPS)
```bash
# Sur le serveur
git clone <repository-url>
cd farine-api
composer install --optimize-autoloader
php artisan key:generate
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache

# Configurer Nginx/Apache
# Configurer Supervisor pour les queues (si utilisé)
```

## 📝 Notes de Développement

### État Actuel
- ✅ Frontend complet avec données simulées
- ✅ Administration fonctionnelle (mode démo)
- ⏳ Backend Laravel à créer (nécessite Composer)
- ⏳ Intégration API à implémenter

### Prochaines Étapes
1. Installer Composer et créer le projet Laravel
2. Configurer la base de données MySQL
3. Implémenter les migrations et modèles
4. Créer les endpoints API REST
5. Configurer Laravel Sanctum pour l'authentification
6. Connecter le frontend Next.js à l'API Laravel
7. Implémenter le upload d'images
8. Tester et déployer

## 🤝 Contribution

Ce projet est développé pour Farine De La Capitale. Pour toute modification ou question, contactez l'équipe de développement.

## 📄 Licence

Propriété de Farine De La Capitale. Tous droits réservés.
