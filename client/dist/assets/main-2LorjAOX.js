(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const h=document.getElementById("navbar"),S=document.querySelectorAll(".nav-link"),w=document.querySelectorAll("section");window.addEventListener("scroll",()=>{window.scrollY>80?h.classList.add("scrolled"):h.classList.remove("scrolled");let t="";w.forEach(e=>{const n=e.offsetTop-200;window.scrollY>=n&&(t=e.getAttribute("id"))}),S.forEach(e=>{e.classList.remove("active"),e.getAttribute("href")===`#${t}`&&e.classList.add("active")})});const b=document.getElementById("mobileToggle"),d=document.getElementById("navLinks");b.addEventListener("click",()=>{d.classList.toggle("open");const t=d.classList.contains("open");b.setAttribute("aria-expanded",t)});d.querySelectorAll(".nav-link").forEach(t=>{t.addEventListener("click",()=>{d.classList.remove("open")})});const A=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(e.target.classList.add("visible"),A.unobserve(e.target))})},{threshold:.1,rootMargin:"0px 0px -60px 0px"});document.querySelectorAll(".reveal").forEach(t=>{A.observe(t)});function k(){document.querySelectorAll(".stat-number[data-count]").forEach(t=>{const e=parseInt(t.dataset.count,10),n=2e3,a=performance.now();function s(o){const i=o-a,c=Math.min(i/n,1),$=1-Math.pow(1-c,3);t.textContent=Math.round(e*$).toLocaleString("fr-FR"),c<1&&requestAnimationFrame(s)}requestAnimationFrame(s)})}const g=document.querySelector(".hero-stats");if(g){const t=new IntersectionObserver(e=>{e[0].isIntersecting&&(k(),t.unobserve(g))},{threshold:.5});t.observe(g)}document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const n=document.querySelector(t.getAttribute("href"));n&&n.scrollIntoView({behavior:"smooth",block:"start"})})});const f=document.getElementById("portfolioFilters"),y=document.getElementById("portfolioGrid"),M=[{id:1,name:"Bancaire",slug:"bancaire"},{id:2,name:"Commercial",slug:"commercial"},{id:3,name:"Hôtellerie",slug:"hotellerie"},{id:4,name:"Industriel",slug:"industriel"}],v=[{id:1,title:"Agence Bancaire — Casablanca",client:"Banque Populaire",category_name:"Bancaire",category_slug:"bancaire",description:"Aménagement complet d'une agence bancaire avec mobilier sur-mesure et habillage bois.",image_url:""},{id:2,title:"Boutique Luxe — Marrakech",client:"Client Privé",category_name:"Commercial",category_slug:"commercial",description:"Conception et réalisation d'un espace commercial haut de gamme.",image_url:""},{id:3,title:"Hôtel 5 Étoiles — Rabat",client:"Groupe Hôtelier",category_name:"Hôtellerie",category_slug:"hotellerie",description:"Agencement des suites et espaces communs d'un hôtel de prestige.",image_url:""},{id:4,title:"Siège Social — Casablanca",client:"Entreprise Industrielle",category_name:"Industriel",category_slug:"industriel",description:"Rénovation et aménagement d'un siège social avec cloisons et mobilier technique.",image_url:""},{id:5,title:"Centre d'Affaires — Tanger",client:"CIH Bank",category_name:"Bancaire",category_slug:"bancaire",description:"Agencement d'un centre d'affaires bancaire moderne.",image_url:""},{id:6,title:"Restaurant Gastronomique — Fès",client:"Chef Étoilé",category_name:"Hôtellerie",category_slug:"hotellerie",description:"Création d'un intérieur chaleureux mêlant bois noble et modernité.",image_url:""}],E=["linear-gradient(135deg, #1a1510, #2a2015)","linear-gradient(135deg, #151a18, #152a22)","linear-gradient(135deg, #1a1518, #2a1520)","linear-gradient(135deg, #15171a, #15202a)","linear-gradient(135deg, #1a1a15, #2a2a15)","linear-gradient(135deg, #181518, #28152a)","linear-gradient(135deg, #151a1a, #152a2a)","linear-gradient(135deg, #1a1815, #2a2215)"];function T(){x(),_(v)}function x(){const t=document.createElement("button");t.className="filter-btn active",t.textContent="Tous",t.dataset.slug="all",t.addEventListener("click",()=>L("all")),f.appendChild(t),M.forEach(e=>{const n=document.createElement("button");n.className="filter-btn",n.textContent=e.name,n.dataset.slug=e.slug,n.addEventListener("click",()=>L(e.slug)),f.appendChild(n)})}function L(t){f.querySelectorAll(".filter-btn").forEach(n=>{n.classList.toggle("active",n.dataset.slug===t)});const e=t==="all"?v:v.filter(n=>n.category_slug===t);_(e)}function _(t){if(t.length===0){y.innerHTML='<p class="portfolio-empty">Aucun projet dans cette catégorie.</p>';return}y.innerHTML=t.map((e,n)=>`
      <div class="project-card" data-id="${e.id}">
        <div class="project-card-image" style="background: ${E[n%E.length]}; ${e.image_url?`background-image: url(${e.image_url}); background-size: cover; background-position: center;`:""}">
          <div class="project-card-overlay">
            <div>
              <span style="color: var(--accent); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">${e.category_name||""}</span>
            </div>
          </div>
        </div>
        <div class="project-card-info">
          <span class="project-card-category">${e.category_name||"Non classé"}</span>
          <h3 class="project-card-title">${e.title}</h3>
          <span class="project-card-client">${e.client||""}</span>
          ${e.description?`<p class="project-card-desc">${e.description}</p>`:""}
        </div>
      </div>
    `).join("")}T();const l=document.getElementById("contactForm"),C=document.getElementById("formFeedback");document.getElementById("contactSubmit");const I="contact@france-agencement.ma";l&&l.addEventListener("submit",t=>{t.preventDefault();const e=new FormData(l),n=e.get("name")||"",a=e.get("email")||"",s=e.get("phone")||"",o=e.get("message")||"",i=encodeURIComponent(`Demande de contact — ${n}`),c=encodeURIComponent(`Nom : ${n}
Email : ${a}
Téléphone : ${s}

${o}`);window.location.href=`mailto:${I}?subject=${i}&body=${c}`,C.textContent="✓ Votre client email va s'ouvrir. Si ce n'est pas le cas, envoyez votre message directement à "+I,C.className="form-feedback success",l.reset()});const q=document.getElementById("chatbot"),N=document.getElementById("chatbotToggle"),p=document.getElementById("chatbotMessages"),u=document.getElementById("chatbotInput"),F=document.getElementById("chatbotSend"),r={services:`Nous proposons une gamme complète de services :

🪵 **Menuiserie sur-mesure** — mobilier, cloisons, habillages
🏢 **Agencement intérieur** — banques, commerces, hôtels
🔧 **Métallerie** — structures et ouvrages métalliques
📐 **Conception 3D** — modélisation et plans d'exécution
🏗️ **Installation** — pose et finitions sur site`,devis:`Pour obtenir un devis personnalisé :

1. Remplissez le formulaire de contact ci-dessous
2. Décrivez votre projet en détail
3. Notre équipe vous contactera sous 48h

Vous pouvez aussi nous appeler au **+212 522 96 30 00**`,horaires:`Nos horaires d'ouverture :

📅 **Lundi - Vendredi** : 8h00 - 18h00
📅 **Samedi** : 8h00 - 13h00
📅 **Dimanche** : Fermé

Nous sommes disponibles par téléphone aux mêmes horaires.`,localisation:`Nous sommes situés à :

📍 **Zone Industrielle du Sahel**
Had Soualem, Maroc

📞 +212 522 96 30 00
📧 contact@france-agencement.ma

Notre usine de **6 000 m²** est facilement accessible depuis l'autoroute Casablanca-El Jadida.`,default:`Merci pour votre message ! Pour une réponse personnalisée, je vous invite à :

• Remplir notre **formulaire de contact**
• Appeler le **+212 522 96 30 00**
• Envoyer un email à **contact@france-agencement.ma**

Notre équipe sera ravie de vous assister.`};N.addEventListener("click",()=>{q.classList.toggle("open"),q.classList.contains("open")&&u.focus()});document.addEventListener("click",t=>{if(t.target.classList.contains("suggestion-btn")){const e=t.target.dataset.question,n=t.target.textContent;m(n,"user");const a=document.getElementById("chatbotSuggestions");a&&a.remove(),setTimeout(()=>{m(r[e]||r.default,"bot")},600)}});F.addEventListener("click",B);u.addEventListener("keydown",t=>{t.key==="Enter"&&B()});function B(){const t=u.value.trim();t&&(m(t,"user"),u.value="",setTimeout(()=>{let e=r.default;const n=t.toLowerCase();n.includes("service")||n.includes("menuiserie")||n.includes("quoi")?e=r.services:n.includes("devis")||n.includes("prix")||n.includes("coût")||n.includes("tarif")?e=r.devis:n.includes("horaire")||n.includes("ouvert")||n.includes("heure")?e=r.horaires:(n.includes("adresse")||n.includes("où")||n.includes("situé")||n.includes("localisation"))&&(e=r.localisation),m(e,"bot")},800))}function m(t,e){const n=document.createElement("div");if(n.className=`chat-message ${e}`,e==="bot"){const a=t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>");n.innerHTML=`<p>${a}</p>`}else n.innerHTML=`<p>${t}</p>`;p.appendChild(n),p.scrollTop=p.scrollHeight}
