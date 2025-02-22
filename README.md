# **Système d’IA pour le Filtrage et la Catégorisation des Propositions d’Activités de Startup**  
**Groupe 5 • 22 Février 2025**

## **Introduction**
Notre projet vise à développer un système basé sur l'IA pour filtrer et catégoriser automatiquement les propositions d'activités de startup soumises par des auto-entrepreneurs.  
L’objectif est de favoriser l’innovation en excluant les activités existantes et commerciales et en mettant en avant de nouvelles idées entrepreneuriales.

Nous avons traité un dataset multilingue (arabe et français), appliqué des techniques avancées de prétraitement, de normalisation et de filtrage basé sur des embeddings, puis utilisé des algorithmes de clustering pour regrouper les activités similaires.

---
![image](https://github.com/user-attachments/assets/610e8ac1-ff5d-4fb3-af0b-ae75f3e60b30)
![image](https://github.com/user-attachments/assets/60469aa0-8cba-4682-9e8f-98fbbcbd5218)
![image](https://github.com/user-attachments/assets/3d1583fe-caff-4f9b-a301-3460267c2e11)
![image](https://github.com/user-attachments/assets/928a884d-da9e-4fd4-915f-493fa8b4262a)
![image](https://github.com/user-attachments/assets/5c0ce8aa-38c2-4ba5-92b7-87d7cb007cbb)





## **Dataset**
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
Un dataset affiné contenant uniquement des idées de startup uniques.
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
**[Démonstration vidéo](https://drive.google.com/file/d/1wjg_jwlfW-muGzdvJ2uhVE0guoHod_is/view)**

---
## Installation et Exécution de l'Application

### Backend (Flask)

1. **Installer les dépendances**:
   ```bash
   pip install -r requirements.txt
   ```
2. **Exécuter le serveur Flask:**
  ```bash
  flask run
  ```
  Par défaut, l'application sera accessible sur http://127.0.0.1:5000/.

### Frontend (React)

1. **Aller dans le dossier du frontend:**
  ```bash
  cd frontend
  ```

2. **Installer les dépendances:**
  ```bash
  npm install
  ```

2. **Démarrer l'application React:**
  ```bash
  npm start
  ```
L'interface sera accessible sur http://localhost:3000/.
