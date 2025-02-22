# **Système d’IA pour le Filtrage et la Catégorisation des Propositions d’Activités de Startup**  
**Groupe 5 • 22 Février 2025**

## **Introduction**
Notre projet vise à développer un système basé sur l'IA pour filtrer et catégoriser automatiquement les propositions d'activités de startup soumises par des auto-entrepreneurs.  
L’objectif est de favoriser l’innovation en excluant les activités existantes et commerciales et en mettant en avant de nouvelles idées entrepreneuriales.

Nous avons traité un jeu de données multilingue (arabe et français), appliqué des techniques avancées de prétraitement, de normalisation et de filtrage basé sur des embeddings, puis utilisé des algorithmes de clustering pour regrouper les activités similaires.

---

## **Jeu de Données**
Le dataset se compose de descriptions d’activités de startup classées en quatre sous-ensembles :
**AA (Arabe-Arabe)** : Activités uniquement en arabe.
**FF (Français-Français)** : Activités uniquement en français.
**FA (Français-Arabe)** : Activités avec description en français et en arabe.
**Mixte** : Combinaison de français et d’arabe dans la même cellule.

Chaque sous-ensemble a subi un prétraitement spécifique pour assurer une analyse efficace.

---

## **Méthodologie**
### **1. Prétraitement et Normalisation**
Suppression de la ponctuation, conversion en minuscules, tokenisation.
Normalisation des entrées pour garantir la cohérence.

### **2. Embeddings et Correspondance de Similarité**
Utilisation des modèles "paraphrase-multilingual-MiniLM-L12-v2" et "Alibaba-NLP/gte-multilingual-base".
Comparaison des activités avec les listes officielles pour identifier et supprimer celles déjà reconnues.

### **3. Filtrage des Activités Commerciales**
Application d'une liste de mots-clés commerciaux pour exclure les activités non innovantes.
Conservation des activités liées au e-commerce et aux services numériques.

### **4. Regroupement et Catégorisation**
Clustering des activités similaires pour créer des catégories de startups.
Validation par un administrateur pour s’assurer de la pertinence des catégories.

---

## **Résultats**
Un jeu de données affiné contenant uniquement des idées de startup uniques.
Une catégorisation automatique des activités via clustering.
Un tableau de bord administrateur permettant la validation des catégories et la gestion des soumissions.

---

## **Développement de l’Application Web**
Interface intuitive permettant aux auto-entrepreneurs de soumettre leurs idées.
Tableau de bord administrateur pour :
  - Consulter les propositions.
  - Valider les catégories.
  - Télécharger des fichiers pour un traitement en masse.

---

## **Conclusion**
Notre projet démontre le potentiel de l’intelligence artificielle dans le processus de filtrage et catégorisation des startups.  
En combinant automatisation et validation humaine, nous avons créé un système efficace qui favorise l’innovation entrepreneuriale.  

**Prochaines étapes** :
Améliorer le modèle d’IA et les algorithmes de clustering.
Explorer de nouvelles fonctionnalités pour renforcer l’expérience utilisateur.

---

## **Ressources**
**Lien vers le Drive du projet** : [ANAE_Hackathon_group5](#)  
**Démonstration vidéo** : FULLY AUTOMATED MINISTERY ACTIVITIES FILTERING SYSTEM.mp4
