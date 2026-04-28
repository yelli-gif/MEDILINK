# Guide d'Hébergement Medilink 🚀

Ce guide vous explique comment héberger votre frontend sur Vercel tout en gardant votre backend sur votre PC pour la présentation.

## 1. Hébergement Frontend sur Vercel

### Option A : Via GitHub (Recommandé)
1. Poussez votre code sur un dépôt GitHub.
2. Allez sur [Vercel](https://vercel.com/) et importez le dépôt.
3. **Important :** Dans les paramètres du projet Vercel, ajoutez les variables d'environnement suivantes :
   * `VITE_API_LOT1`
   * `VITE_API_LOT2`
   * `VITE_API_LOT3`
   * `VITE_API_LOT4`
   * `VITE_API_LOT5`
   
> [!NOTE]
> Si votre backend reste sur votre PC, vous devrez utiliser une solution comme **ngrok** ou **localtunnel** pour exposer vos ports locaux (8081-8085) sur internet, puis mettre ces URLs publiques dans Vercel.

### Option B : Via Vercel CLI (Ligne de commande)
1. Ouvrez un terminal dans `Frontend/medilink-unified`.
2. Tapez `npx vercel`.
3. Suivez les instructions pour déployer.

---

## 2. Connecter le Frontend (Cloud) au Backend (Local)

Comme vous l'avez mentionné, si le backend reste sur votre PC :
1. **Pare-feu :** Assurez-vous que votre pare-feu Windows autorise les connexions entrantes sur les ports 8081 à 8085.
2. **IP Publique :** Si tous les membres sont sur le même WiFi, ils peuvent utiliser votre adresse IP locale (ex: `http://192.168.1.15:8081`).
3. **Tunneling (Conseillé pour le Cloud) :**
   Utilisez **ngrok** pour créer des URLs publiques temporaires :
   ```bash
   ngrok http 8081
   ngrok http 8082
   # ...etc
   ```
   Ensuite, mettez les URLs générées par ngrok dans les variables d'environnement de Vercel.

---

## 3. Configuration CORS
Le backend est déjà configuré pour accepter `http://localhost:5173`. 
**Attention :** Une fois le frontend déployé, vous devrez peut-être ajouter l'URL Vercel (ex: `https://medilink.vercel.app`) dans la configuration CORS de vos microservices Spring Boot.

Dans chaque microservice, vérifiez la classe `WebConfig` ou l'annotation `@CrossOrigin` :
```java
@CrossOrigin(origins = {"http://localhost:5173", "https://votre-app.vercel.app"})
```
